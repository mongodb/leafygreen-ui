require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { sample } = require('lodash');
const fetch = require('node-fetch');

const updatesArray = JSON.parse(process.argv[2]);
// const channel = 'C02JA6UG886'; // design-system-testing
// const channel = 'GGGR7AXHP'; // design-system-team
const channel = 'C01CBLPFD35'; // leafygreen-ui-releases

try {
  const botToken = process.env.SLACK_BOT_TOKEN;

  if (exists(botToken) && exists(updatesArray)) {
    slackbot(botToken);
  } else {
    console.warn(
      exists(botToken) ? 'Updates array not found' : 'Bot token not found',
    );
  }
} catch (error) {
  console.error(`Error:`, error.message);
}

async function slackbot(botToken) {
  const sortedUpdates = updatesArray.reduce(
    (updates, component) => {
      if (component.version.endsWith('.0.0')) updates.major.push(component);
      else if (component.version.endsWith('.0')) updates.minor.push(component);
      else updates.patch.push(component);
      return updates;
    },
    {
      major: [],
      minor: [],
      patch: [],
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

  const greeting = getGreeting(updatesArray.length);
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

function exists(arg) {
  return !!arg && arg.length > 0;
}

function getGreeting(length) {
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

function getTimeOfDay(time) {
  if (time <= 12) return 'morning';
  else if (time <= 18) return 'afternoon';
  else return 'evening';
}

function generateOutputStrings({ name, version }) {
  const shortName = name.split('/')[1];
  const changelogUrl = `https://github.com/mongodb/leafygreen-ui/blob/main/packages/${shortName}/CHANGELOG.md`;
  const fullName = `${name}@${version}`;

  return {
    shortName,
    changelogUrl,
    fullName,
  };
}

function parseMinorChangeString(component) {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
}

function parsePatchChangeString(component) {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
}

// eslint-disable-next-line no-unused-vars
async function fetchChangelogText(component) {
  const { shortName } = generateOutputStrings(component);
  const rawChangelogUrl = `https://raw.githubusercontent.com/mongodb/leafygreen-ui/main/packages/${shortName}/CHANGELOG.md`;
  const response = await fetch(rawChangelogUrl);
  return await response.text();
}

async function parseMajorChangeString(component) {
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


var js = [{"name": "@leafygreen-ui/icon", "version": "11.10.1"},{"name": "@leafygreen-ui/menu", "version": "14.0.2"}]