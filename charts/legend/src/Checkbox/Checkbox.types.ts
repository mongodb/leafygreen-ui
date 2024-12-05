import {
  createUniqueClassName,
  Either,
  HTMLElementProps,
  LgIdProps,
  Theme,
} from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface CheckboxProps extends HTMLElementProps<'input'> {
  /**
   * Determines whether or not the Checkbox will appear in dark mode.
   */
  darkMode?: boolean;

  /**
   * Whether the checkbox is checked. Manually setting this puts `Checkbox` into controlled mode.
   */
  isChecked?: boolean;

  /**
   * Element rendered as a label adjacent to the checkbox.
   */
  label?: React.ReactNode;

  /**
   * Event handler for the `<input>` element.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

// export type CheckboxProps = Either<
//   InternalCheckboxProps,
//   'label' | 'aria-label' | 'aria-labelledby'
// > &
//   LgIdProps;

// /**
//  * Props for the internal Check SVG
//  *
//  * @internal
//  */
// export interface CheckProps {
//   theme: Theme;
//   isChecked: boolean;
// }
