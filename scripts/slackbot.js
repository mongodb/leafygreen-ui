require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const { sample } = require('lodash');

const updatesArray = JSON.parse(process.argv[2]);
// const channel = 'C02JA6UG886'; // design-system-testing
// const channel = 'GGGR7AXHP'; // design-system-team
const channel = "C01CBLPFD35"; // leafygreen-ui-releases

try {
  const botToken = process.env.SLACK_BOT_TOKEN;

  if (exists(botToken) && exists(updatesArray)) {
    const greeting = getGreeting(updatesArray.length);

    const updatesString = updatesArray
      .map(({ name, version }) => {
        const shortName = name.split('/')[1];
        const changelogUrl = `https://github.com/mongodb/leafygreen-ui/blob/main/packages/${shortName}/CHANGELOG.md`;
        const fullName = `${name}@${version}`;
        return `*<${changelogUrl} | ${fullName}>*`;
      })
      .join('\n\n');
    const web = new WebClient(botToken);

    const text = `${greeting}\n\n${updatesString}`;

    if (exists(text)) {
      // post message
      web.chat.postMessage({ text, channel });
      // eslint-disable-next-line no-console
      console.log(`Sent message to ${channel}`);
    } else {
      console.warn('Missing message text. Did not send message.');
    }
  } else {
    console.warn(
      exists(botToken) ? 'Updates array not found' : 'Bot token not found',
    );
  }
} catch (error) {
  console.error(`Error:`, error.message);
}

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
