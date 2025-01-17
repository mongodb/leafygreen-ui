export interface LintCommandOptions {
  /** Auto-fixes lint issues that are fixable */
  fix: boolean;
  /** Logs additional information to the console */
  verbose: boolean;
  eslintOnly: boolean;
  prettierOnly: boolean;
  pkgJsonOnly: boolean;
}

export type BaseLintRunnerOptions = Pick<LintCommandOptions, 'fix' | 'verbose'>;

export type LintFn = (options: BaseLintRunnerOptions) => Promise<boolean>;
