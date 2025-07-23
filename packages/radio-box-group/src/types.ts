import { HTMLElementProps } from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Compact: 'compact',
  Full: 'full',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export interface RadioBoxProps extends Omit<HTMLElementProps<'input'>, 'size'> {
  /**
   * Indicates whether or not the box will be checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback to be executed when a RadioBox is selected.
   * @default () => {}
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Name passed to each RadioBox belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines size of RadioBox components ['default', 'compact', 'full'].
   * @default 'default''
   */
  size?: Size;

  /**
   * Determines what RadioBox will be checked on default. Component will be controlled if this prop is used.
   */
  value: string | number;

  /**
   * Boolean that determines if the RadioBox is disabled.
   */
  disabled?: boolean;

  /**
   * Id for RadioBox and respective label.
   */
  id?: string;

  /**
   * Content that will appear inside of the RadioBox component's label.
   */
  children?: React.ReactNode;

  /**
   * If RadioBoxGroup is uncontrolled, the default property makes this RadioBox checked on the initial render.
   */
  default?: boolean;

  /**
   * Toggles Dark Mode
   */
  darkMode?: boolean;
}

export interface RadioBoxGroupProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear inside of RadioBoxGroup component.
   * @type `<RadioBox />`
   */
  children?: React.ReactNode;

  /**
   * Callback to be executed when a RadioBox is selected.
   * @default () => {}
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Name passed to each RadioBox belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines what RadioBox will be checked on default. Component will be controlled if this prop is used.
   */
  value?: string | number;

  /**
   * Determines size of RadioBox components ['default', 'compact', 'full'].
   * @default 'default''
   */
  size?: Size;

  /**
   * Toggles Dark Mode
   */
  darkMode?: boolean;
}
