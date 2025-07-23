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
 * Configuration parameters as key-value pairs
 */
export interface ConfigurationParameters {
  [key: string]: string;
}

/**
 * Configuration parameters organized by their status
 */
export type ParametersByStatus = {
  [status in Status]?: ConfigurationParameters;
};
