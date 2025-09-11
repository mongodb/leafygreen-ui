/**
 * Options to control the state of the SuggestedActions
 */
export const State = {
  Unset: 'unset',
  Apply: 'apply',
  Success: 'success',
  Error: 'error',
} as const;
export type State = (typeof State)[keyof typeof State];

interface BaseConfigurationParameter {
  key: string;
  value: string;
}

interface UnsetConfigurationParameter extends BaseConfigurationParameter {
  state?: 'unset';
}

export interface SuccessConfigurationParameter
  extends BaseConfigurationParameter {
  state: 'success';
}

export interface ErrorConfigurationParameter
  extends BaseConfigurationParameter {
  state: 'error';
}

export type ConfigurationParameter =
  | SuccessConfigurationParameter
  | ErrorConfigurationParameter
  | UnsetConfigurationParameter;

/**
 * Array of configuration parameters, each with their own state.
 */
export type ConfigurationParameters = Array<ConfigurationParameter>;
