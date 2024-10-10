import { DarkModeProps } from '@leafygreen-ui/lib';

export interface ChartHeaderProps extends DarkModeProps {
  label?: string;

  /**
   * Close button options.
   */
  closeButtonProps?: {
    /**
     * Controls whether the close button is shown.
     */
    show?: boolean;
    /**
     * Callback for when the close button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

  /**
   * Expand button options.
   */
  expandButtonProps?: {
    /**
     * Controls whether the expand button is shown.
     */
    show: boolean;
    /**
     * Callback for when the expand button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

  /**
   * Reset button options.
   */
  resetButtonProps?: {
    /**
     * Controls whether the reset button is shown.
     */
    show: boolean;
    /**
     * Callback for when the expand button is clicked.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
}
