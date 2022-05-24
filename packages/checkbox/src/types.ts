import {
  createUniqueClassName,
  Either,
  HTMLElementProps,
} from '@leafygreen-ui/lib';

interface InternalCheckboxProps extends HTMLElementProps<'input', never> {
  darkMode?: boolean;
  /**
   * Whether the checkbox is checked
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
   * default: `false`
   */
  disabled?: boolean;
  /**
   * If `true`, the indeterminate icon will be rendered regardless of the `checked` prop.
   *
   * For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
   */
  indeterminate?: boolean;
  className?: string;
  /**
   * Event handler for the `<input>` element.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether there should be animation when the checkbox's state changes
   *
   * default: `true`
   */
  animate?: boolean;
  ['aria-label']?: string;
  ['aria-labelledby']?: string;
}

export type CheckboxProps = Either<
  InternalCheckboxProps,
  'label' | 'aria-label' | 'aria-labelledby'
>;

export interface CheckProps {
  isChecked: boolean;
  disabled: boolean;
  animate: boolean;
  selector: ReturnType<typeof createUniqueClassName>;
  indeterminate?: boolean;
}
