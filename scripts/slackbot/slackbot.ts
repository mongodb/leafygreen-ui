/* eslint-disable no-console */
require('dotenv').config();
import { WebClient } from '@slack/web-api';
import chalk from 'chalk';
import { Command } from 'commander';
import { isUndefined } from 'lodash';

import {
  constructBasicUpdateText,
  constructShortUpdateText,
  constructUpdateTextWithChangelog,
} from './utils/construcUpdateText';
import { generateGreeting } from './utils/generateGreeting';
import { getSortedUpdates } from './utils/getSortedUpdates';
import {
  Channels,
  ComponentUpdateObject,
  isValidUpdatesArray,
  Opts,
} from './slackbot.types';

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
  /**
   * Obtain a bot token by logging into the slack API docs here: https://api.slack.com/apps/A02H2UGAMDM
   * Click "OAuth & Permissions", and copy the "Bot User OAuth Token"
   */
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
  const sortedUpdates = await getSortedUpdates(updates);

  const updateStrings = {
    major:
      sortedUpdates.major.length > 0
        ? `*Major Changes*\n${sortedUpdates.major
            .map(constructUpdateTextWithChangelog)
            .join('\n')}`
        : '',
    minor:
      sortedUpdates.minor.length > 0
        ? `*Minor Changes*\n${sortedUpdates.minor
            .map(constructUpdateTextWithChangelog)
            .join('\n')}`
        : '',
    patch:
      sortedUpdates.patch.length > 0
        ? `*Patch Changes*\n${sortedUpdates.patch
            .map(constructBasicUpdateText)
            .join('\n')}`
        : '',
    deps:
      sortedUpdates.dependency.length > 0
        ? `*Dependency updates*\n${sortedUpdates.dependency
            .map(constructShortUpdateText)
            .join(', ')}`
        : '',
  };

  const web = new WebClient(botToken);

  /** Post to the channel */
  const updatesExist = Object.values(updateStrings).some(str => exists(str));

  if (updatesExist) {
    if (!dry) {
      const postMessage = async (text: string) => {
        text.length > 0 &&
          (await web.chat.postMessage({
            text,
            channel,
          }));
      };

      // post message(s) synchronously, in order;
      await postMessage(generateGreeting(updates.length));
      await postMessage(updateStrings.major);
      await postMessage(updateStrings.minor);
      await postMessage(updateStrings.patch);
      await postMessage(updateStrings.deps);

      console.log(`Sent message(s) to ${channel}`);
    } else {
      console.log('Dry run. Would have posted:');

      Object.values(updateStrings).forEach(str => {
        str && console.log(str);
      });
    }
  } else {
    console.warn('Missing message text. Did not send message.');
  }
}

/* UTILS */

function exists(arg?: string | Array<any>) {
  return !isUndefined(arg) && arg.length > 0;
}
