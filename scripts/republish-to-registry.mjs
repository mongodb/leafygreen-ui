/**
 * Republishes packages that changesets/action just published to npmjs, byte-for-byte,
 * to a second registry (see LG-6236 / UXE-477: independent per-registry builds were
 * producing different tarball bytes and dependency ranges for the same version).
 *
 * `npm pack <name>@<version>` against a registry spec downloads the exact tarball
 * already published for that version — it does not rebuild or re-pack from source —
 * so publishing that same file elsewhere guarantees an identical sha512 across
 * registries, instead of each registry getting its own independently-packed artifact.
 *
 * The npmjs fetch uses an isolated --userconfig so it can't be redirected by a
 * `@scope:registry` override (e.g. one written to ~/.npmrc by login-codeartifact.sh) —
 * without that, the "fetch from npmjs" step would silently fetch from the very
 * registry we're trying to keep in sync with it. (Confirmed by hand: even an
 * explicit `--registry` flag loses to an existing `@scope:registry` entry, for both
 * `npm pack` and `npm publish` — so publish below deliberately does NOT pass
 * `--registry` and instead relies on login-codeartifact.sh's scope config, with a
 * check that it actually points where we expect.)
 *
 * Usage: republish-to-registry.mjs <registry-url> <published-packages-json>
 *   <published-packages-json> is changesets/action's `publishedPackages` output:
 *   a JSON array of { name, version }. <registry-url> is only used to sanity-check
 *   the ambient scope config below — the actual publish destination and auth come
 *   from ~/.npmrc, as already set up by login-codeartifact.sh.
 */
import { execFileSync } from 'child_process';
import { mkdtempSync, writeFileSync } from 'fs';
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

// Isolated config with no scope overrides, so the npmjs fetch below can't be
// hijacked by a @scope:registry entry pointing at `registry`.
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

  // A `@scope:registry` entry always wins over an explicit `--registry` flag on
  // publish, so we can't pass `registry` directly here — but that means a scope
  // login-codeartifact.sh forgot to configure would silently publish somewhere else
  // entirely. Catch that instead of letting it happen quietly.
  const scope = name.startsWith('@') ? name.split('/')[0] : null;
  if (scope) {
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
  }

  console.log(`Publishing ${spec} to ${registry}...`);
  execFileSync('npm', ['publish', tarballPath], { stdio: 'inherit' });
}

console.log(`✔ Republished ${packages.length} package(s) to ${registry}`);
