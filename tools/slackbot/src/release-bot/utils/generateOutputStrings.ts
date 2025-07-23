import { getLGConfig, getRootPackageJson } from '@lg-tools/meta';

import { ComponentUpdateObject } from '../release-bot.types';

interface OutputStrings {
  /** The name of the package on npm, including scope */
  name: string;
  /** The full name of the package with @version */
  fullName: string;
  /** The short name of the package, without scope */
  shortName: string;
  /** The npm scope of the package. Typically @leafygreen-ui */
  scope: string;
  /** The version number of the package */
  version: string;
  /** The url to the changelog on github */
  changelogUrl: string;
}

export function generateOutputStrings({
  name,
  version,
}: ComponentUpdateObject): OutputStrings {
  const [scope, shortName] = name.split('/');
  const lgConfig = getLGConfig();
  const packagePath = lgConfig.scopes[scope];
  const githubUrl = getRootPackageJson()?.['repository']?.['url']?.replace(
    /\.git/,
    '',
  );

  const changelogUrl = `${githubUrl}/blob/main/${packagePath}/${shortName}/CHANGELOG.md`;
  const fullName = `${name}@${version}`;

  return {
    name,
    fullName,
    shortName,
    scope,
    changelogUrl,
    version,
  };
}
