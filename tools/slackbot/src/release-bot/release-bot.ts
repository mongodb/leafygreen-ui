/* eslint-disable no-console */
require('dotenv').config();
import { WebClient } from '@slack/web-api';
import chalk from 'chalk';
import { isUndefined } from 'lodash';

import {
  constructBasicUpdateText,
  constructShortUpdateText,
  constructUpdateTextWithChangelog,
} from './utils/constructUpdateText';
import { generateGreeting } from './utils/generateGreeting';
import { getSortedUpdates } from './utils/getSortedUpdates';
import {
  Channels,
  ComponentUpdateObject,
  isValidUpdatesArray,
  ReleaseBotOptions,
} from './release-bot.types';

export function releaseBot(updates: string, options: ReleaseBotOptions) {
  const { channel, test } = options;
  try {
    /**
     * Obtain a bot token by logging into the slack API docs here: https://api.slack.com/apps/A02H2UGAMDM
     * Click "OAuth & Permissions", and copy the "Bot User OAuth Token"
     */
    const botToken = process.env.SLACK_BOT_TOKEN;
    const channelName: keyof typeof Channels = test
      ? 'design-system-testing'
      : channel;
    const updatesArray: any = JSON.parse(updates);
    let errMsg = '';

    if (exists(botToken) && typeof botToken === 'string') {
      if (exists(channelName) && Object.keys(Channels).includes(channelName)) {
        if (exists(updatesArray) && isValidUpdatesArray(updatesArray)) {
          const channel: string =
            Channels[channelName as keyof typeof Channels];
          runSlackbot(botToken, channel, updatesArray, options);
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

/* UTILS */

function exists(arg?: string | Array<any>) {
  return !isUndefined(arg) && arg.length > 0;
}
