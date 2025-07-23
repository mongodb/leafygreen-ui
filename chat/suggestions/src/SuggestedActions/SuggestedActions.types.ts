import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { ParametersByStatus, Status } from '../shared.types';

export interface SuggestedActionsProps
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  /**
   * Determines rendering of the status banner:
   * - `'Apply'` will render suggestions and the "Apply" button
   * - `'Success'` will render success banner with applied suggestions
   * - `'Error'` will render error banner with instructions to manually apply suggestions
   */
  status: Status;
  /**
   * Configuration parameters organized by their status
   */
  configurationParameters: ParametersByStatus;
  /**
   * Callback fired when the user clicks the "Apply" button
   */
  onClickApply: () => void;
}
