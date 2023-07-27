export interface LintCommandOptions {
  fix: boolean;
  eslintOnly: boolean;
  prettierOnly: boolean;
  pkgJsonOnly: boolean;
  verbose: boolean;
}

export type LintFn = (
  options: Pick<LintCommandOptions, 'fix' | 'verbose'>,
) => Promise<boolean>;
