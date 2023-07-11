const { spawn } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const { Command } = require('commander');
const rootDir = process.cwd();
const eslintConfig = path.resolve(__dirname, '../config/eslint.config.js');
const prettierConfig = path.resolve(__dirname, '../config/prettier.config.js');
const npmPkgLintConfig = path.resolve(
  __dirname,
  '../config/npmpackagejsonlintrc.config.js',
);

const esLintExtensions = ['js', 'ts', 'tsx'];
const prettierExtensions = [...esLintExtensions, 'mjs', 'json', 'md', 'yml'];

const cli = new Command()
  .option('-f, --fix', 'fix linting errors', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .option('--verbose', 'verbose mode', false)
  .parse(process.argv);

const { fix, prettierOnly, eslintOnly, verbose } = cli.opts();

verbose &&
  console.log('Using config files:', {
    eslintConfig,
    prettierConfig,
    npmPkgLintConfig,
  });

// If prettierOnly or eslintOnly is true, run only that linter
if (prettierOnly || eslintOnly) {
  if (prettierOnly) {
    prettier();
  } else {
    eslint();
  }
  process.exit(0);
}

// Otherwise, run all linters

(async () => {
  await eslint();
  await prettier();
  await npmPkgJsonLint();
})();

/** Spawns an eslint job */
function eslint() {
  return new Promise(resolve => {
    console.log(chalk.blue('Running ESLint...'));
    spawn(
      'eslint',
      [
        '--config',
        eslintConfig,
        `${rootDir}/**/*.{${esLintExtensions.join(',')}}`,
        fix ? '--fix' : '--no-fix',
        verbose ? '' : '--quiet',
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}

/** Spawns a prettier job */
function prettier() {
  return new Promise(resolve => {
    console.log(chalk.magenta('Running Prettier...'));
    spawn(
      'prettier',
      [
        fix ? '--write' : '--check',
        '--config',
        prettierConfig,
        `${rootDir}/**/*.{${prettierExtensions.join(',')}}`,
      ],
      {
        stdio: 'inherit',
      },
    ).on('close', resolve);
  });
}

/** Spawns a npmPkgJsonLint job */
function npmPkgJsonLint() {
  return new Promise(resolve => {
    console.log(chalk.yellow('Running npmPkgJsonLint...'));
    spawn('npmPkgJsonLint', ['--configFile', npmPkgLintConfig, rootDir], {
      stdio: 'inherit',
    }).on('close', resolve);
  });
}
