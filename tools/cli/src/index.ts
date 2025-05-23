import { buildPackage, buildTSDoc, buildTypescript } from '@lg-tools/build';
import { migrator } from '@lg-tools/codemods';
import { createPackage } from '@lg-tools/create';
import { installLeafyGreen } from '@lg-tools/install';
import { linkPackages, unlinkPackages } from '@lg-tools/link';
import { lint } from '@lg-tools/lint';
import { mergePromptsVSCode } from '@lg-tools/prompt-kit';
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
    `The npm scope of the new package. Valid scopes are defined in the \`package.json\` \`"lg.scopes"\` property. Defaults to the first entry in \`lg.scopes\`. The directory is determined by the mapping defined in \`lg.scopes\``,
  )
  .option(
    '-d, --directory [directory]',
    `The directory to write the new package. Defaults to mapped directory of \`--scope\``,
  )
  .option(
    '-p, --parent [parent]',
    'Identifies the parent component of the new component. Creates a sub-component to the provided parent.',
  )
  .option(
    '-v, --verbose',
    'Prints additional information to the console',
    false,
  )
  .option(
    '-d, --dry',
    'Run without making any changes to the filesystem',
    false,
  )
  .action(createPackage);

/** Install */
cli
  .command('install')
  .description('Installs LeafyGreen packages to the current app')
  .argument('[packages...]', 'A list of packages to install')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('-d, --dry', 'Dry run. Does not install any packages.', false)
  .option(
    '-e, --essentials',
    'Install only essential packages (includes `leafygreen-provider`, `lg-emotion` and `lib`)',
    false,
  )
  .option(
    '-b, --basic',
    'Install only basic packages. (Essentials, plus some select core components)',
    false,
  )
  .option('--ui', 'Install all `@leafygreen-ui` scoped packages', true)
  .option('--charts', 'Install all `@lg-charts` packages', false)
  .option('--chat', 'Install all `@lg-chat` packages', false)
  .allowUnknownOption(true)
  .action(installLeafyGreen);

/** Link & Unlink */
cli
  .command('link')
  .description('Link local LeafyGreen packages to a destination app.')
  .argument('[destination]', 'The destination app path')
  .option('--to <destination>', 'Alias for `destination`')
  .option(
    '--from <source>',
    'When running from a consuming application, defines the source of linked packages',
  )
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
  .option('--noInstall', 'Skip the pnpm install step', false)
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
 * i.e. \`pnpm slackbot '[{"name": "@leafygreen-ui/sample", "version": "0.1.0"}]' \`
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
  .option('--react17', 'Runs tests in a React17 environment', false)
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

/** Migrator */
cli
  .command('codemod')
  .description('Runs codemod transformations to upgrade LG components')
  .argument(
    '[codemod]',
    'One of the codemods from: https://github.com/mongodb/leafygreen-ui/blob/main/tools/codemods/README.md#codemods-1',
  )
  .argument(
    '[path]',
    'Files or directory to transform. Can be a glob like like src/**.test.js',
  )
  .option('--list', 'List all available codemods', false)
  .option(
    '-i, --ignore <items...>',
    'Glob patterns to ignore. E.g. -i **/node_modules/** **/.next/**',
    false,
  )
  .option('-d, --dry', 'dry run (no changes are made to files)', false)
  .option(
    '-p, --print',
    'print transformed files to stdout, useful for development',
    false,
  )
  .option(
    '-f, --force',
    'Bypass Git safety checks and forcibly run codemods',
    false,
  )
  .option(
    '--packages <packages...>',
    'Specific package names to transform. E.g. --packages @leafygreen-ui/button @leafygreen-ui/menu',
  )
  .action(migrator);

/** Build steps */
cli
  .command('build-package')
  .description('Builds a package')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(buildPackage);
cli
  .command('build-ts')
  .description("Builds a package's TypeScript definitions")
  .argument('[pass-through...]', 'Pass-through options for `tsc`')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option(
    '--downlevel',
    'Builds all TS downlevel targets based on the typesVersions field in package.json',
    false,
  )
  .option(
    '-u, --update',
    'Update package.json typesVersions and exports fields',
    false,
  )
  .allowUnknownOption(true)
  .action(buildTypescript);
cli
  .command('build-tsdoc')
  .description("Builds a package's TSDoc file")
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(buildTSDoc);

/** Merge editor settings */
cli
  .command('merge-prompts-vscode')
  .description('Merges the prompts settings into the VSCode settings file')
  .option('-d, --dry', 'Dry run. Does not write to the filesystem.', false)
  .option(
    '-v, --verbose',
    'Prints additional information to the console',
    false,
  )
  .action(mergePromptsVSCode);

cli.parse(process.argv);
