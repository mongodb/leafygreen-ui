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
 * Parameters for the suggested configuration
 */
export interface SuggestedConfigurationParameters {
  clusterTier: string;
  price: string;
  cloudProvider: string;
  storage: string;
  ram: string;
  vCPUs: string;
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
   * Suggested configuration parameters:
   * - clusterTier: string
   * - cloudProvider: string
   * - storage: string
   * - ram: string
   * - vCPUs: string
   */
  suggestedConfigurationParameters: SuggestedConfigurationParameters;
  /**
   * Callback fired when the user clicks the "Apply" button
   */
  handleApply: () => void;
}
