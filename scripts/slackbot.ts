/* eslint-disable no-console */
require('dotenv').config();
import { WebClient } from '@slack/web-api';
import _, { isUndefined, sample } from 'lodash';
import { Command } from 'commander';
import chalk from 'chalk';
import fetch from 'node-fetch';

interface ComponentUpdateObject {
  name: string;
  version: string;
  updates?: Array<string>;
}
interface SortedUpdates {
  major: Array<ComponentUpdateObject>;
  minor: Array<ComponentUpdateObject>;
  patch: Array<ComponentUpdateObject>;
  /** Components with only a dependency update patch   */
  dependency: Array<ComponentUpdateObject>;
}

const isComponentUpdateObject = (obj: any): obj is ComponentUpdateObject =>
  typeof obj === 'object' &&
  Object.prototype.hasOwnProperty.call(obj, 'name') &&
  Object.prototype.hasOwnProperty.call(obj, 'version');
const isValidUpdatesArray = (arr: any): arr is Array<ComponentUpdateObject> =>
  Array.isArray(arr) && arr.every(isComponentUpdateObject);

const Channels = {
  'design-system-testing': 'C02JA6UG886',
  'design-system-team': 'GGGR7AXHP',
  'leafygreen-ui-releases': 'C01CBLPFD35',
} as const;

interface Opts {
  channel: keyof typeof Channels;
  test: boolean;
  dry: boolean;
}

const cli = new Command('slackbot')
  .arguments('<updates>')
  .option(
    '-c, --channel <channel>',
    'Channel to post to.',
    'leafygreen-ui-releases',
  )
  .option('--test', 'Post to `design-system-testing`', false)
  .option('--dry', 'Dry run. Does not post', false)
  .parse(process.argv);

cli.addHelpText(
  'after',
  `
  Runs the update announcement Slackbot.
  This command is run by GitHub Actions immediately after \`changeset\`.

  Must have the \`.env\` variable "SLACK_BOT_TOKEN" set.
  This is the "Bot User OAuth Token" found at https://api.slack.com/apps/A02H2UGAMDM/oauth, and should start with "xoxb-"

  To run this automatically, pass in an array of updates (in the format output by \`changeset\`) as the first argument.
  i.e. \`yarn slackbot '[{"name": "@leafygreen-ui/sample", "version": "0.1.0"}]' \`

  Optionally pass in a channel name (defaults to 'leafygreen-ui-releases').
  Valid channels are: ${Object.keys(Channels).join(', ')}.
`,
);

const { channel, test, dry }: Opts = cli.opts();

try {
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channelName: keyof typeof Channels = test
    ? 'design-system-testing'
    : channel;
  const updatesArray: any = JSON.parse(cli.args[0]);
  let errMsg = '';

  if (exists(botToken) && typeof botToken === 'string') {
    if (exists(channelName) && Object.keys(Channels).includes(channelName)) {
      if (exists(updatesArray) && isValidUpdatesArray(updatesArray)) {
        const channel: string = Channels[channelName as keyof typeof Channels];
        slackbot(botToken, channel, updatesArray);
      } else {
        errMsg =
          'Updates array not found/incorrect format. Expected array of `{name: "@xx/yy", version: "a.b.c"}`';
      }
    } else {
      errMsg = `Channel name incorrect. Received ${channelName}`;
    }
  } else {
    errMsg = 'Bot Token not found';
  }
  console.warn(chalk.yellow(errMsg));
} catch (error: any) {
  console.error(`Error:`, error.message);
}

async function slackbot(
  botToken: string,
  channel: string,
  updates: Array<ComponentUpdateObject>,
) {
  const sortedUpdates: SortedUpdates = {
    major: [],
    minor: [],
    patch: [],
    dependency: [],
  };

  for (const component of updates) {
    const { majorUpdates, minorUpdates, patchUpdates } = await parseChangeLog(
      component,
    );

    if (majorUpdates)
      sortedUpdates.major.push({ ...component, updates: majorUpdates });
    else if (minorUpdates)
      sortedUpdates.minor.push({ ...component, updates: minorUpdates });
    else if (patchUpdates) {
      if (!patchUpdates[0].includes('Updated dependencies')) {
        sortedUpdates.patch.push(component);
      } else {
        sortedUpdates.dependency.push(component);
      }
    }
  }

  const constructBasicUpdateText = (component: ComponentUpdateObject) => {
    const { fullName, changelogUrl } = generateOutputStrings(component);
    return `*<${changelogUrl} | ${fullName}>*`;
  };

  const constructUpdateTextWithChangelog = (
    component: ComponentUpdateObject,
  ) => {
    const { updates } = component;
    return (
      constructBasicUpdateText(component) +
      '\n' +
      updates?.map(u => `\t• ${u}\n`)
    );
  };

  const constructShortUpdateText = (component: ComponentUpdateObject) => {
    const { shortName, changelogUrl } = generateOutputStrings(component);
    return `<${changelogUrl} | ${shortName}@${component.version}>`;
  };

  const majorUpdatesString = sortedUpdates.major
    .map(constructUpdateTextWithChangelog)
    .join('\n');
  const minorUpdatesString = sortedUpdates.minor
    .map(constructUpdateTextWithChangelog)
    .join('\n');
  const patchUpdatesString = sortedUpdates.patch
    .map(constructBasicUpdateText)
    .join('\n');
  const depsUpdatesString = sortedUpdates.dependency
    .map(constructShortUpdateText)
    .join(', ');

  const web = new WebClient(botToken);

  /** Post to the channel */
  if (
    exists(
      majorUpdatesString ||
        minorUpdatesString ||
        patchUpdatesString ||
        depsUpdatesString,
    )
  ) {
    if (!dry) {
      // post message(s) synchronously
      await web.chat.postMessage({
        text: getGreeting(updates.length),
        channel,
      });
      majorUpdatesString.length > 0 &&
        (await web.chat.postMessage({
          text: `*Major Changes*\n${majorUpdatesString}`,
          channel,
        }));
      minorUpdatesString.length > 0 &&
        (await web.chat.postMessage({
          text: `*Minor Changes*\n${minorUpdatesString}`,
          channel,
        }));
      patchUpdatesString.length > 0 &&
        (await web.chat.postMessage({
          text: `*Patch Changes*\n${patchUpdatesString}`,
          channel,
        }));
      depsUpdatesString.length > 0 &&
        (await web.chat.postMessage({
          text: `*Dependency updates*\n${depsUpdatesString}`,
          channel,
        }));
      console.log(`Sent message(s) to ${channel}`);
    } else {
      console.log('Dry run. Would have posted:');
      majorUpdatesString &&
        console.log(`*Major Changes*\n${majorUpdatesString}`);
      minorUpdatesString &&
        console.log(`*Minor Changes*\n${minorUpdatesString}`);
      patchUpdatesString &&
        console.log(`*Patch Changes*\n${patchUpdatesString}`);
      depsUpdatesString &&
        console.log(`*Dependency updates*\n${depsUpdatesString}`);
    }
  } else {
    console.warn('Missing message text. Did not send message.');
  }
}

/* UTILS */

function exists(arg?: string | Array<any>) {
  return !isUndefined(arg) && arg.length > 0;
}

function getGreeting(length: number) {
  const EMOJIS = [
    ':wave:',
    ':lefty_wave:',
    ':blob-wave:',
    ':blob-dance:',
    ':blob_excited:',
    ':celebrate:',
    ':tada:',
    ':sparkles:',
    ':rocket:',
    ':boom:',
    ':zap:',
    ':fire:',
    ':seedling:',
    ':herb:',
    ':leaves:',
    ':leafy_green:',
  ];

  const NYCTime = new Date().getUTCHours() - 5;
  const timeOfDay = getTimeOfDay(NYCTime);
  const GREETINGS = [
    'Hey there!',
    'Hello there!',
    'Hi there!',
    `Good ${timeOfDay}!`,
  ];

  const emoji = sample(EMOJIS);
  const greeting = sample(GREETINGS);
  const intro =
    length > 1
      ? 'Some new LeafyGreen updates today'
      : `Just one LeafyGreen update this ${timeOfDay}`;

  return `${emoji} ${greeting} ${intro}`;
}

function getTimeOfDay(time: number) {
  if (time <= 12) return 'morning';
  else if (time <= 18) return 'afternoon';
  else return 'evening';
}

function generateOutputStrings({ name, version }: ComponentUpdateObject) {
  const shortName = name.split('/')[1];
  const changelogUrl = `https://github.com/mongodb/leafygreen-ui/blob/main/packages/${shortName}/CHANGELOG.md`;
  const fullName = `${name}@${version}`;

  return {
    shortName,
    changelogUrl,
    fullName,
    name,
    version,
  };
}

async function fetchChangelogText(
  component: ComponentUpdateObject,
): Promise<string> {
  const { shortName } = generateOutputStrings(component);
  const rawChangelogUrl = `https://raw.githubusercontent.com/mongodb/leafygreen-ui/main/packages/${shortName}/CHANGELOG.md`;
  const response = await fetch(rawChangelogUrl);
  return await response.text();
}

async function fetchLatestChangelogText(
  component: ComponentUpdateObject,
): Promise<string> {
  const fullChangelogText = await fetchChangelogText(component);
  const { version } = component;
  const startIndex = fullChangelogText.indexOf(`## ${version}`);
  const endIndex = fullChangelogText.indexOf(
    `\n## `,
    startIndex + version.length,
  );
  const latestChangelog = fullChangelogText.substring(startIndex, endIndex);
  return latestChangelog;
}

/**
 * Given a component update object
 * Parse the changelog text into separate majorUpdates, minorUpdates & patchUpdates arrays
 */
async function parseChangeLog(component: ComponentUpdateObject) {
  const latestChangelog = await fetchLatestChangelogText(component);
  const majorUpdates = parseMajorChange(latestChangelog);
  const minorUpdates = parseMinorChange(latestChangelog);
  const patchUpdates = parsePatchChange(latestChangelog);

  return {
    majorUpdates,
    minorUpdates,
    patchUpdates,
  };
}

const majorChangeIndex = (changelog: string) =>
  changelog.indexOf(`### Major Changes`) >= 0
    ? changelog.indexOf(`### Major Changes`)
    : undefined;
const minorChangeIndex = (changelog: string) =>
  changelog.indexOf(`### Minor Changes`) >= 0
    ? changelog.indexOf(`### Minor Changes`)
    : undefined;
const patchChangeIndex = (changelog: string) =>
  changelog.indexOf(`### Patch Changes`) >= 0
    ? changelog.indexOf(`### Patch Changes`)
    : undefined;

const getChangesArray = (changelog: string, start: number, end: number) => {
  const changeString = changelog.substring(start + 17, end).trim();
  return _.uniq(
    changeString
      .split(/\n- /g) // Split on each bullet
      .map(str =>
        str
          .replace(/(- |\[)[a-z0-9]{8}]?:?/g, '') // remove GH Commit hashes
          .replace('-', '') // Remove any remaining dashes
          .trim(),
      ),
  );
};

function parseMajorChange(changelog: string): Array<string> | undefined {
  const startIndex = majorChangeIndex(changelog);

  if (startIndex) {
    const endIndex =
      minorChangeIndex(changelog) ??
      patchChangeIndex(changelog) ??
      changelog.length;
    const changes = getChangesArray(changelog, startIndex, endIndex);
    return changes;
  }
}

function parseMinorChange(changelog: string) {
  const startIndex = minorChangeIndex(changelog);

  if (startIndex) {
    const endIndex = patchChangeIndex(changelog) ?? changelog.length;
    const changes = getChangesArray(changelog, startIndex, endIndex);
    return changes;
  }
}

function parsePatchChange(changelog: string) {
  const startIndex = patchChangeIndex(changelog);

  if (startIndex) {
    const endIndex = changelog.length;
    const changes = getChangesArray(changelog, startIndex, endIndex);
    return changes;
  }
}
