import { buildPackage, buildTSDoc, buildTypescript } from '@lg-tools/build';
import { createPackage } from '@lg-tools/create';
import { installLeafyGreen } from '@lg-tools/install';
import { linkPackages, unlinkPackages } from '@lg-tools/link';
import { lint } from '@lg-tools/lint';
import { releaseBot } from '@lg-tools/slackbot';
import { test } from '@lg-tools/test';
import { update } from '@lg-tools/update';
import { validate } from '@lg-tools/validate';
import { Command } from 'commander';
import { sync as readPackageUpSync } from 'read-pkg-up';

const pkg = readPackageUpSync({ cwd: __dirname })?.packageJson;

const cli = new Command('lg');
cli
  .version(pkg?.version ?? '0.0.0')
  .description('Command line tools for the LeafyGreen UI library by MongoDB')
  .enablePositionalOptions(true);

/** Create */
cli
  .command('create')
  .description('Creates a new package with the provided name')
  .argument('<name>', 'The name of the package')
  .option(
    '-s, --scope [scope]',
    'The npm scope of the new package. Defaults to the first entry in lg.config.json scopes',
  )
  .option(
    '-d, --directory [directory]',
    'The directory to write the new package. Defaults to the first entry in lg.config.json scopes',
  )
  .action(createPackage);

/** Install */
cli
  .command('install')
  .description('Installs LeafyGreen packages to the current app')
  .argument('[packages...]', 'A list of packages to install')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option(
    '-W, --ignore-workspace-root-check',
    'Pass through flag for yarn',
    false,
  )
  .action(installLeafyGreen);

/** Link & Unlink */
cli
  .command('link')
  .description('Link local LeafyGreen packages to a destination app.')
  .argument('destination', 'The destination app path')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--scope <name>', 'The NPM organization')
  .option(
    '--packages <names...>',
    'Specific package names (requires `scope` option, or full package name)',
  )
  .action(linkPackages);

cli
  .command('unlink')
  .description('Unlink local LeafyGreen packages from a destination app.')
  .arguments('destination')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--noInstall', 'Skip the yarn install step', false)
  .option('--scope <name>', 'The NPM organization')
  .action(unlinkPackages);

/** Slackbot */
const slackbotCmd = cli.command('slackbot');

/**
 * This command is run by GitHub Actions immediately after \`changeset\`.
 *
 * Must have the \`.env\` variable "SLACK_BOT_TOKEN" set.
 * This is the "Bot User OAuth Token" found at https://api.slack.com/apps/A02H2UGAMDM/oauth, and should start with "xoxb-"
 *
 * To run this automatically, pass in an array of updates (in the format output by \`changeset\`) as the first argument.
 * i.e. \`yarn slackbot '[{"name": "@leafygreen-ui/sample", "version": "0.1.0"}]' \`
 *
 * Optionally pass in a channel name (defaults to 'leafygreen-ui-releases').
 * Valid channels are: \`${Object.keys(Channels).join('`, `')}\`.
 */
slackbotCmd
  .command('release')
  .arguments('[updates]')
  .description(
    'Notifies the MongoDB leafygreen-ui releases channel of any new packages.',
  )
  .option('-t, --test', 'Post to `design-system-testing`', false)
  .option('-d, --dry', 'Dry run. Does not post', false)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option(
    '-c, --channel <channel>',
    'Channel to post to.',
    'leafygreen-ui-releases',
  )
  .action(releaseBot);

/** Lint */
cli
  .command('lint')
  .description('Checks code and package.json formatting')
  .option('-f, --fix', 'fix linting errors', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('--pkgJsonOnly', 'run npmPackageJsonLint only', false)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(lint);

/** Test */
cli
  .command('test')
  .description('Tests leafygreen-ui packages with unified config.')
  .argument('[pass-through...]', 'Pass-through options for `jest`')
  .option('--watch', 'Watch all files you intend to test', false)
  .option('--ci', 'Runs tests with CI configuration', false)
  .option(
    '--config',
    'Specify a jest config file. By default will look for `jest.config.js` at the root, or use `@lg-tools/test/config`',
  )
  .allowUnknownOption(true)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(test);

/** Update */
cli
  .command('update')
  .alias('upgrade')
  .description(
    'Updates installed LeafyGreen packages based on the specified range',
  )
  .argument('[packages...]', 'A list of packages to update')
  .option('--scope', 'The npm scope of the packages', '@leafygreen-ui')
  .option(
    '--latest',
    'Ignores the version range specified in `package.json`',
    false,
  )
  .action(update);

/** Validate */
cli
  .command('validate')
  .description('Validates build integrity, and package.json dependencies')
  .option('--buildsOnly', 'Validates build integrity only', false)
  .option('--depsOnly', 'Validates package dependencies only', false)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('-f, --fix', 'Fixes issues found in dependency tree', false)
  .option(
    '--fix-tsconfig',
    "Fixes issues found in a package's tsconfig based on it's package.json",
    false,
  )
  .action(validate);

/** Build steps */
cli
  .command('build-package')
  .description('Builds a package')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(buildPackage);
cli
  .command('build-ts')
  .description("Builds a package's TypeScript definitions")
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(buildTypescript);
cli
  .command('build-tsdoc')
  .description("Builds a package's TSDoc file")
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(buildTSDoc);

cli.parse(process.argv);
