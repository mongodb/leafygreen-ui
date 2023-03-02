import { uniq } from 'lodash';
import fetch from 'node-fetch';

import { ComponentUpdateObject } from '../slackbot.types';

import { generateOutputStrings } from './generateOutputStrings';

/**
 * Given a component update object
 * Parse the changelog text into separate majorUpdates, minorUpdates & patchUpdates arrays
 */
export async function parseChangeLog(component: ComponentUpdateObject) {
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
  const changeString = changelog
    .substring(start, end)
    .replace(/### ((Major)|(Minor)|(Patch)) Changes/g, '')
    .trim();

  return uniq(
    changeString
      .split(/\n- /g) // Split on each bullet
      .map(str =>
        str
          .replace(/[a-z0-9]+:/g, '') // remove GH Commit hashes
          .replace(/[[\]]/g, '') // Remove any square brackets
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
