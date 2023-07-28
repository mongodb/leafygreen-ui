import { ComponentUpdateObject } from '../release-bot.types';

import { generateOutputStrings } from './generateOutputStrings';

export const constructBasicUpdateText = (component: ComponentUpdateObject) => {
  const { fullName, changelogUrl } = generateOutputStrings(component);
  return `*<${changelogUrl} | ${fullName}>*`;
};

export const constructUpdateTextWithChangelog = (
  component: ComponentUpdateObject,
) => {
  const { updates } = component;
  const updatesStr = updates ? '\n' + updates?.map(u => `\t• ${u}\n`) : '';

  return constructBasicUpdateText(component) + updatesStr;
};

export const constructShortUpdateText = (component: ComponentUpdateObject) => {
  const { shortName, changelogUrl } = generateOutputStrings(component);
  return `<${changelogUrl} | ${shortName}@${component.version}>`;
};
