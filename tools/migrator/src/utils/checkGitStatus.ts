/* eslint-disable no-console */
import chalk from 'chalk';
import isGitClean from 'is-git-clean';

/**
 * Check whether a Git repository is in a "clean" state, meaning there are no uncommitted changes or untracked files in the repository
 * @param force boolean. Whether to forcibly continuing even though the git directory is not clean
 */
export function checkGitStatus(force?: boolean) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';

  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err: any) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(
        chalk.yellow(`WARNING: ${errorMessage}. Forcibly continuing.`),
      );
    } else {
      console.log(
        chalk.greenBright('🥬 Thank you for using @lg-tools/migrator!'),
      );
      console.log(
        chalk.red(
          '\nBut before we continue, please stash or commit your git changes.',
        ),
      );
      console.log(
        chalk.yellow(
          '\nYou may use the --force flag to override this safety check.',
        ),
      );
      process.exit(1);
    }
  }
}
