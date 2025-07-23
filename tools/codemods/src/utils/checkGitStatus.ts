/* eslint-disable no-console */
import chalk from 'chalk';
import isGitClean from 'is-git-clean';

/**
 * Check whether a Git directory is in a "clean" state, meaning there are no uncommitted changes or untracked files in the repository
 * @param force boolean. Whether to forcibly continue even though the git directory is not clean
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
        chalk.greenBright('🥬 Thank you for using @lg-tools/codemods!'),
      );
      console.log(
        chalk.yellow(
          '\nBut before we continue, please stash or commit your git changes. \nYou may use the --force flag to override this safety check.\n',
        ),
      );
      process.exit(1);
    }
  }
}
