/**
 * Fails (exit 1) if any package's `version` field changed without a
 * corresponding CHANGELOG.md update (LG-5521).
 *
 * Modes:
 *  - default: compares the working tree against HEAD. Run after
 *    `changeset version` to catch silent changelog-generation failures
 *    before the Version Packages PR is created.
 *  - --base <ref>: compares <ref>...HEAD (merge-base diff). Used in PR CI
 *    to fail the Version Packages PR itself if changelogs are missing.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const baseArgIndex = process.argv.indexOf('--base');
const base = baseArgIndex > -1 ? process.argv[baseArgIndex + 1] : null;

if (baseArgIndex > -1 && !base) {
  console.error('Usage: validate-changelogs.mjs [--base <ref>]');
  process.exit(2);
}

const git = args =>
  execFileSync('git', args, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] });

/** Ref whose file contents represent the "old" state */
const oldRef = base ? git(['merge-base', base, 'HEAD']).trim() : 'HEAD';

// In default mode, include untracked files: a package's first-ever CHANGELOG.md
// is newly created by `changeset version` and not yet staged, so it wouldn't
// otherwise appear in `git diff HEAD`.
const changedFiles = new Set(
  (base
    ? git(['diff', '--name-only', `${oldRef}..HEAD`])
    : git(['diff', '--name-only', 'HEAD']) +
      '\n' +
      git(['ls-files', '--others', '--exclude-standard'])
  )
    .split('\n')
    .filter(Boolean),
);

/** Returns parsed JSON at `ref`, or null if the file doesn't exist there */
function readJsonAtRef(ref, file) {
  try {
    return JSON.parse(git(['show', `${ref}:${file}`]));
  } catch {
    return null;
  }
}

function readJsonCurrent(file) {
  if (base) return readJsonAtRef('HEAD', file);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : null;
}

const missingChangelogs = [];

for (const file of changedFiles) {
  if (!file.endsWith('/package.json')) continue;

  const oldPkg = readJsonAtRef(oldRef, file);
  const newPkg = readJsonCurrent(file);

  // deleted package, private package, or no version
  if (!newPkg || newPkg.private || !newPkg.version) continue;
  // new package: didn't exist in the old ref, so it has no changelog to update yet
  if (!oldPkg) continue;
  // no version bump
  if (oldPkg.version === newPkg.version) continue;

  const changelog = path.posix.join(path.posix.dirname(file), 'CHANGELOG.md');
  if (!changedFiles.has(changelog)) {
    missingChangelogs.push(`${newPkg.name}@${newPkg.version} (${changelog})`);
  }
}

if (missingChangelogs.length > 0) {
  console.error(
    `✘ ${missingChangelogs.length} package version(s) bumped without a CHANGELOG.md update:\n` +
      missingChangelogs.map(p => `  - ${p}`).join('\n') +
      '\n\nThis usually means `changeset version` failed to generate changelogs (see LG-5521).',
  );
  process.exit(1);
}

console.log('✔ All version bumps have corresponding CHANGELOG.md updates');
