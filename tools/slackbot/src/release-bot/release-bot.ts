/* eslint-disable no-console */
require('dotenv').config();
import { isValidJSON } from '@lg-tools/meta';
import { WebClient } from '@slack/web-api';
import chalk from 'chalk';

import {
  constructBasicUpdateText,
  constructShortUpdateText,
  constructUpdateTextWithChangelog,
} from './utils/constructUpdateText';
import { generateGreeting } from './utils/generateGreeting';
import { getSortedUpdates } from './utils/getSortedUpdates';
import { TEST_DATA } from './utils/test.data';
import { exists } from './utils/utils';
import {
  Channels,
  ComponentUpdateObject,
  isValidUpdatesArray,
  ReleaseBotOptions,
} from './release-bot.types';

export function releaseBot(
  updates: string | undefined,
  options: ReleaseBotOptions,
) {
  const { channel, test } = options;
  /**
   * Obtain a bot token by logging into the slack API docs here: https://api.slack.com/apps/A02H2UGAMDM
   * Click "OAuth & Permissions", and copy the "Bot User OAuth Token"
   */
  const botToken = process.env.SLACK_BOT_TOKEN;
  const channelName: keyof typeof Channels = test
    ? 'design-system-testing'
    : channel;

  // Exit if there's no bot token
  const isValidBotToken = exists(botToken) && typeof botToken === 'string';

  if (!isValidBotToken) {
    console.warn(chalk.yellow('Bot Token not found'));
    process.exit(1);
  }

  // Exit if the channel name is invalid
  const isValidChannel =
    exists(channelName) && Object.keys(Channels).includes(channelName);

  if (!isValidChannel) {
    console.warn(
      chalk.yellow(`Channel name incorrect. Received ${channelName}`),
    );
    process.exit(1);
  }

  const updatesArray = getUpdatesArray(updates, options);

  // Exit if the updates array is not valid
  if (!isValidUpdatesArray(updatesArray)) {
    const errMsg =
      updatesArray +
      `\nExpected array of objects with interface \`${chalk.black.yellowBright(
        `{name: "@xx/yy", version: "a.b.c"}`,
      )}\``;
    console.warn(chalk.yellow(errMsg));
    process.exit(1);
  }

  // Finally, once everything is checked, we run the slackbot
  runSlackbot(botToken, channelName, updatesArray, options);
}

/** The main slackbot logic */
async function runSlackbot(
  botToken: string,
  channel: string,
  updates: Array<ComponentUpdateObject>,
  { dry, verbose }: ReleaseBotOptions,
) {
  verbose && console.log({ updates, channel });
  const sortedUpdates = await getSortedUpdates(updates);
  verbose && console.log({ sortedUpdates });

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

  verbose && console.log({ updateStrings });

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
    console.warn('No updates to post.');
  }
}

function getUpdatesArray(
  updatesStr: string | undefined,
  { test }: ReleaseBotOptions,
): Array<ComponentUpdateObject> | string {
  if (!exists(updatesStr)) {
    if (test) return TEST_DATA;
    else return 'Updates argument is required.';
  }

  const isUpdatesValidJson: boolean = isValidJSON(updatesStr);
  const parsedUpdates = isUpdatesValidJson ? JSON.parse(updatesStr) : undefined;

  return isValidUpdatesArray(parsedUpdates)
    ? parsedUpdates
    : 'Updates argument is in an incorrect format.';
}
