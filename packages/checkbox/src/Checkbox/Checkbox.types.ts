import {
  createUniqueClassName,
  Either,
  HTMLElementProps,
  LgIdProps,
  Theme,
} from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

interface InternalCheckboxProps extends HTMLElementProps<'input'> {
  /**
   * Base font size of the component. Only effective when `size == 'default'`
   */
  baseFontSize?: BaseFontSize;
  /**
   * Determines whether or not the Checkbox will appear in dark mode.
   */
  darkMode?: boolean;

  /**
   * Whether the checkbox is checked. Manually setting this puts `Checkbox` into controlled mode.
   */
  checked?: boolean;

  /**
   * Element rendered as a label adjacent to the checkbox.
   */
  label?: React.ReactNode;

  /**
   * Description text rendered under the label.
   */
  description?: string;

  /**
   * Whether the checkbox is disabled
   *
   * @default `false`
   */
  disabled?: boolean;

  /**
   * Whether the label's font-weight is bold or regular.
   * If left `undefined` this prop will default to `true` if a description is provided,
   * otherwise defaults to `false`
   */
  bold?: boolean;

  /**
   * If `true`, the indeterminate icon will be rendered regardless of the `checked` prop.
   *
   * For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
   */
  indeterminate?: boolean;

  /**
   * Event handler for the `<input>` element.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether there should be animation when the checkbox's state changes
   *
   * @default `true`
   */
  animate?: boolean;
  ['aria-label']?: string;
  ['aria-labelledby']?: string;
}

export type CheckboxProps = Either<
  InternalCheckboxProps,
  'label' | 'aria-label' | 'aria-labelledby'
> &
  LgIdProps;

/**
 * Props for the internal Check SVG
 *
 * @internal
 */
export interface CheckProps {
  theme: Theme;
  isChecked: boolean;
  disabled: boolean;
  animate: boolean;
  selector: ReturnType<typeof createUniqueClassName>;
  indeterminate?: boolean;
}
