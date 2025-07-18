import { Variant as BannerVariant } from '@leafygreen-ui/banner';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Options to control the status of the SuggestionCard
 */
export const Status = {
  Available: 'Available',
  Apply: 'Apply',
  Success: 'Success',
  ApplyError: 'ApplyError',
  GeneralError: 'GeneralError',
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

/**
 * Properties for the status banner
 */
export interface StatusBannerProps {
  variant: BannerVariant;
  label?: string;
  description: string;
}

export interface SuggestionCardProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Determines rendering of the status banner:
   * - `'Available'` will render suggestions and the "Apply" button
   * - `'Success'` will render success banner with applied suggestions to replace button
   * - `'ApplyError'` will render error banner with instructions to manually apply suggestions
   * - `'GeneralError'` will render general error banner
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
  /**
   * Callback fired when the user clicks the "Retry" button
   */
  handleRetry: () => void;
}
