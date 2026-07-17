/**
 * Republishes packages `release` just published to npmjs, byte-for-byte, to another
 * registry (UXE-477 / LG-6236: independent per-registry packs were producing
 * different tarball bytes for the same version).
 *
 * `npm pack <name>@<version>` on a registry spec downloads the already-published
 * tarball rather than rebuilding, so republishing that file guarantees an identical
 * sha512 everywhere. The npmjs fetch uses an isolated --userconfig because an
 * ambient `@scope:registry` override beats an explicit `--registry` flag (confirmed
 * by hand) — for the same reason, publish below relies on that scope config instead
 * of passing `--registry`, with a check that it points where expected.
 *
 * Usage: republish-to-registry.mjs <registry-url> <published-packages-json>
 */
import { execFileSync } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

const [, , registry, publishedPackagesJson] = process.argv;

if (!registry || !publishedPackagesJson) {
  console.error(
    'Usage: republish-to-registry.mjs <registry-url> <published-packages-json>',
  );
  process.exit(2);
}

let packages;
try {
  packages = JSON.parse(publishedPackagesJson);
} catch (err) {
  console.error(`Could not parse published-packages JSON: ${err.message}`);
  process.exit(2);
}

if (!Array.isArray(packages) || packages.length === 0) {
  console.log('No published packages to republish.');
  process.exit(0);
}

const workDir = mkdtempSync(path.join(tmpdir(), 'leafygreen-republish-'));

try {
  // No scope overrides here, so this can't be redirected toward `registry`.
  const npmjsConfigPath = path.join(workDir, '.npmrc-npmjs-only');
  writeFileSync(npmjsConfigPath, 'registry=https://registry.npmjs.org\n');

  for (const { name, version } of packages) {
    const spec = `${name}@${version}`;

    console.log(`Fetching the published npmjs tarball for ${spec}...`);
    const packOutput = execFileSync(
      'npm',
      [
        'pack',
        spec,
        '--userconfig',
        npmjsConfigPath,
        '--pack-destination',
        workDir,
        '--json',
      ],
      { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'inherit'] },
    );
    const [{ filename }] = JSON.parse(packOutput);
    const tarballPath = path.join(workDir, filename);

    // Every LG package is scoped; an unscoped name means the scope-registry check
    // below can't run, so publish would rely on whatever the default registry is
    // instead of `registry` — fail loudly rather than silently mis-publish it.
    if (!name.startsWith('@')) {
      throw new Error(
        `${name} is unscoped, so its publish destination can't be verified against ` +
          `"${registry}". Refusing to publish it.`,
      );
    }

    // Catch a scope login-codeartifact.sh forgot to configure, instead of silently
    // publishing it somewhere else.
    const scope = name.split('/')[0];
    const configuredRegistry = execFileSync(
      'npm',
      ['config', 'get', `${scope}:registry`],
      { encoding: 'utf-8' },
    ).trim();
    if (configuredRegistry !== registry) {
      throw new Error(
        `${scope} is configured to publish to "${configuredRegistry}", not the ` +
          `expected "${registry}". Add ${scope} to login-codeartifact.sh's SCOPES ` +
          `list before publishing ${spec}.`,
      );
    }

    console.log(`Publishing ${spec} to ${registry}...`);
    try {
      const publishOutput = execFileSync('npm', ['publish', tarballPath], {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      console.log(publishOutput);
    } catch (err) {
      const stderr = err.stderr ?? '';
      // Makes re-runs idempotent: if a prior run already published packages 1..N-1
      // before failing on N, re-running shouldn't treat 1..N-1 as errors.
      if (
        /cannot publish over (the )?previously published version/i.test(stderr)
      ) {
        console.log(`${spec} is already published to ${registry} — skipping.`);
      } else {
        console.error(stderr);
        throw err;
      }
    }
  }

  console.log(`✔ Republished ${packages.length} package(s) to ${registry}`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
