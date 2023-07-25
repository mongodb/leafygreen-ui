import { ComponentUpdateObject } from '../slackbot.types';

import { generateOutputStrings } from './generateOutputStrings';

export const constructBasicUpdateText = (component: ComponentUpdateObject) => {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
};

export const constructUpdateTextWithChangelog = (
  component: ComponentUpdateObject,
) => {
  const { updates } = component;
  return (
    constructBasicUpdateText(component) + '\n' + updates?.map(u => `\t• ${u}\n`)
  );
};

export const constructShortUpdateText = (component: ComponentUpdateObject) => {
  const { shortName, changelogUrl } = generateOutputStrings(component);
  return `<${changelogUrl} | ${shortName}@${component.version}>`;
};
