/**
 * Options to control the status of the SuggestedActions
 */
export const Status = {
  Apply: 'apply',
  Success: 'success',
  Error: 'error',
} as const;
export type Status = (typeof Status)[keyof typeof Status];

/**
 * A single configuration parameter with its key, value, and current status
 */
export interface ConfigurationParameter {
  key: string;
  value: string;
  status?: Status; // Defaults to 'apply' if not specified
}

/**
 * Array of configuration parameters, each with their own status.
 */
export type ConfigurationParameters = Array<ConfigurationParameter>;
