import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { ConfigurationParameters, State } from '../shared.types';

export interface SuggestedActionsProps
  extends React.ComponentPropsWithoutRef<'div'>,
    DarkModeProps {
  /**
   * Configuration parameters with their individual state values.
   * Each parameter includes a key, value, and state (unset/success/error).
   */
  configurationParameters: ConfigurationParameters;

  /**
   * Callback fired when the user clicks the "Apply" button
   */
  onClickApply: () => void;

  /**
   * Determines rendering of the SuggestedActions:
   * - `'Unset'` will render suggestions
   * - `'Apply'` will render suggestions and the "Apply" button
   * - `'Success'` will render success banner with applied suggestions
   * - `'Error'` will render error banner with instructions to manually apply suggestions
   */
  state: State;
}
