import { ComponentUpdateObject } from '../slackbot.types';

export function generateOutputStrings({
  name,
  version,
}: ComponentUpdateObject) {
  const shortName = name.split('/')[1];
  const changelogUrl = `https://github.com/mongodb/leafygreen-ui/blob/main/packages/${shortName}/CHANGELOG.md`;
  const fullName = `${name}@${version}`;

  return {
    shortName,
    changelogUrl,
    fullName,
    name,
    version,
  };
}
