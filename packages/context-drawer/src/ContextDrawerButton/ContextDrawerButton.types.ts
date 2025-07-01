import { ButtonProps } from '@leafygreen-ui/button';

export interface ContextDrawerButtonProps
  extends Pick<ButtonProps, 'children' | 'className' | 'disabled' | 'onClick'> {
  /**
   * Determines whether the trigger is in the 'open' state.
   * @default false
   */
  isOpen?: boolean;
}
