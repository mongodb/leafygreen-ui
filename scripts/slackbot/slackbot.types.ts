export const Channels = {
  'design-system-testing': 'C02JA6UG886',
  'design-system-team': 'GGGR7AXHP',
  'leafygreen-ui-releases': 'C01CBLPFD35',
} as const;

export interface Opts {
  channel: keyof typeof Channels;
  test: boolean;
  dry: boolean;
}

export interface ComponentUpdateObject {
  name: string;
  version: string;
  updates?: Array<string>;
}
export interface SortedUpdates {
  major: Array<ComponentUpdateObject>;
  minor: Array<ComponentUpdateObject>;
  patch: Array<ComponentUpdateObject>;
  /** Components with only a dependency update patch   */
  dependency: Array<ComponentUpdateObject>;
}

export const isComponentUpdateObject = (
  obj: any,
): obj is ComponentUpdateObject =>
  typeof obj === 'object' &&
  Object.prototype.hasOwnProperty.call(obj, 'name') &&
  Object.prototype.hasOwnProperty.call(obj, 'version');
export const isValidUpdatesArray = (
  arr: any,
): arr is Array<ComponentUpdateObject> =>
  Array.isArray(arr) && arr.every(isComponentUpdateObject);
