import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Options to control the status of the SuggestionCard
 */
export const Status = {
  Unset: 'unset',
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

export interface SuggestionCardProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Determines rendering of the status banner:
   * - `'Unset'` will render suggestions
   * - `'Apply'` will render suggestions and the "Apply" button
   * - `'Success'` will render success banner with applied suggestions
   * - `'Error'` will render error banner with instructions to manually apply suggestions
   */
  status: Status;
  /**
   * Suggested configuration parameters as key-value pairs
   */
  suggestedConfigurationParameters: ConfigurationParameters;
  /**
   * Parameters that were successfully applied
   */
  appliedParameters?: ConfigurationParameters;
  /**
   * Parameters that failed to apply
   */
  failedParameters?: ConfigurationParameters;
  /**
   * Callback fired when the user clicks the "Apply" button
   */
  onClickApply: () => void;
}
