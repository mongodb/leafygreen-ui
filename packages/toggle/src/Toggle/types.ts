import {
  DarkModeProps,
  Either,
  HTMLElementProps,
  LgIdProps,
} from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Small: 'small',
  XSmall: 'xsmall',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

interface BaseToggleProps extends DarkModeProps, LgIdProps {
  /**
   * Sets the size of the toggle.
   *
   * @default 'default'
   */
  size?: Size;

  /**
   * Sets the checked state of the Toggle.
   */
  checked?: boolean;

  /**
   * Disables the Toggle.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * `onChange` fires when the internally-managed `checked` state of the component is updated. Receives the updated checked state of the toggle as its first argument, and the associated mouse event as the second.
   */
  onChange?: (
    checked: boolean,
    mouseEvent: React.MouseEvent<HTMLButtonElement>,
  ) => void;

  /**
   * Adds a className to the outermost element.
   */
  className?: string;
}

export type ToggleProps = Either<
  BaseToggleProps &
    Omit<HTMLElementProps<'button', never>, keyof BaseToggleProps>,
  'aria-label' | 'aria-labelledby'
>;
