interface DownlevelVersion {
  /** If the consuming application's TS version satisfies the condition... */
  condition: `${'<' | '>' | ''}${number}.${number}`;
  /** ...we should use this version of the package */
  target: `${number}.${number}`;
}

// TS Downlevel mapping
export const DOWNLEVEL_VERSIONS = [
  // No downlevelling for now
] as const satisfies Readonly<Array<DownlevelVersion>>;

// Packages to exclude from typesVersions updates
// These packages are CLI-only, and don't need to be down-leveled
export const EXCLUDED_PACKAGES = [
  'lg-scripts',
  '@lg-tools/build',
  '@lg-tools/cli',
  '@lg-tools/create',
  '@lg-tools/install',
  '@lg-tools/link',
  '@lg-tools/slackbot',
  '@lg-tools/build',
  '@lg-tools/test',
  '@lg-tools/update',
  '@lg-tools/validate',
];
