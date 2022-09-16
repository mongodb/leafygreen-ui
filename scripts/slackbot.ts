require('dotenv').config();
import { WebClient } from '@slack/web-api';
import { isUndefined, sample } from 'lodash';
// import fetch from 'node-fetch';
import { Command } from 'commander';
import chalk from 'chalk';

interface ComponentUpdateObject {
  name: string;
  version: string;
}
interface SortedUpdates {
  major: Array<ComponentUpdateObject>;
  minor: Array<ComponentUpdateObject>;
  patch: Array<ComponentUpdateObject>;
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

const cli = new Command('slackbot')
  .arguments('<updates>')
  .option(
    '-c, --channel <channel>',
    'Channel to post to.',
    'leafygreen-ui-releases',
  )
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
`)

try {
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channelName = cli.opts()['channel'];
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
      errMsg = `Channel name incorrect. Recieved ${channelName}`;
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
  const sortedUpdates: SortedUpdates = updates.reduce(
    (updates: SortedUpdates, component: ComponentUpdateObject) => {
      if (component.version.endsWith('.0.0')) updates.major.push(component);
      else if (component.version.endsWith('.0')) updates.minor.push(component);
      else updates.patch.push(component);
      return updates;
    },
    {
      major: [] as Array<ComponentUpdateObject>,
      minor: [] as Array<ComponentUpdateObject>,
      patch: [] as Array<ComponentUpdateObject>,
    },
  );

  const majorUpdatesString = (
    await Promise.all(sortedUpdates.major.map(parseMajorChangeString))
  ).join('\n');

  const minorUpdatesString = sortedUpdates.minor
    .map(parseMinorChangeString)
    .join('\n');

  const patchUpdatesString = sortedUpdates.patch
    .map(parsePatchChangeString)
    .join('\n');

  const greeting = getGreeting(updates.length);
  const allUpdateStrings = [greeting];

  if (majorUpdatesString.length > 0)
    allUpdateStrings.push(`*Major Changes*\n${majorUpdatesString}`);
  if (minorUpdatesString.length > 0)
    allUpdateStrings.push(`*Minor Changes*\n${minorUpdatesString}`);
  if (patchUpdatesString.length > 0)
    allUpdateStrings.push(`*Patch Changes*\n${patchUpdatesString}`);

  const web = new WebClient(botToken);

  const text = allUpdateStrings.join('\n\n');

  if (exists(text)) {
    // post message
    web.chat.postMessage({ text, channel });
    // eslint-disable-next-line no-console
    console.log(`Sent message to ${channel}`);
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
  };
}

function parseMinorChangeString(component: ComponentUpdateObject) {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
}

function parsePatchChangeString(component: ComponentUpdateObject) {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
}

// // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// async function fetchChangelogText(component: ComponentUpdateObject) {
//   const { shortName } = generateOutputStrings(component);
//   const rawChangelogUrl = `https://raw.githubusercontent.com/mongodb/leafygreen-ui/main/packages/${shortName}/CHANGELOG.md`;
//   const response = await fetch(rawChangelogUrl);
//   return await response.text();
// }

async function parseMajorChangeString(component: ComponentUpdateObject) {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  // TODO: decide how we want to format the changelog text
  // const changelogText = await fetchChangelogText(component)
  // copy until the second H2
  // const startIndex = changelogText.indexOf(component.version) + component.version.length
  // const relevantChangelog = changelogText.substring(
  //   startIndex,
  //   changelogText.indexOf('\n## ', startIndex)
  // )
  // .replace(/###/, '')
  // .trim()
  return `*<${changelogUrl} | ${fullName}>*`;
}
