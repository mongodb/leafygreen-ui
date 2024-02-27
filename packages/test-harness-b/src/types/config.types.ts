export interface Config {
  testIdAttribute: string;
  /**
   * WARNING: `unstable` prefix means this API may change in patch and minor releases.
   * @param cb
   */
  unstable_advanceTimersWrapper(
    cb: (...args: Array<unknown>) => unknown,
  ): unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncWrapper(cb: (...args: Array<any>) => any): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventWrapper(cb: (...args: Array<any>) => any): void;
  asyncUtilTimeout: number;
  computedStyleSupportsPseudoElements: boolean;
  defaultHidden: boolean;
  /** default value for the `ignore` option in `ByText` queries */
  defaultIgnore: string;
  showOriginalStackTrace: boolean;
  throwSuggestions: boolean;
  getElementError: (message: string | null, container: Element) => Error;
}

export interface ConfigFn {
  (existingConfig: Config): Partial<Config>;
}

// @ts-ignore
export function configure(configDelta: ConfigFn | Partial<Config>): void;
// @ts-ignore
export function getConfig(): Config;
