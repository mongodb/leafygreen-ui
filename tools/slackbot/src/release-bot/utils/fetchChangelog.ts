import fetch from 'node-fetch';

import { ComponentUpdateObject } from '../release-bot.types';

import { generateOutputStrings } from './generateOutputStrings';

export async function fetchChangelogText(
  component: ComponentUpdateObject,
): Promise<string> {
  const { shortName } = generateOutputStrings(component);
  const rawChangelogUrl = `https://raw.githubusercontent.com/mongodb/leafygreen-ui/main/packages/${shortName}/CHANGELOG.md`;
  const response = await fetch(rawChangelogUrl);
  return await response.text();
}

export async function fetchLatestChangelogText(
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
