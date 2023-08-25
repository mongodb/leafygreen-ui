import { HTMLElementProps } from '@leafygreen-ui/lib';

import { Size } from '../types';

export interface RadioGroupProps extends HTMLElementProps<'div'> {
  /**
   * Determines whether or not the RadioGroup will appear in dark mode.
   *
   * @default false
   */
  darkMode?: boolean;

  /**
   * Callback to be executed when a Radio is selected.
   * Receives the associated event object as the first argument.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Content that will appear inside of RadioGroup component.
   *
   * Can be any node; however, only <Radio /> components, will be treated as belonging to the <RadioGroup /> compound component, and will receive internal state from <RadioGroup />
   *
   * @type `<Radio />`
   */
  children: React.ReactNode;

  /**
   * Name passed to each Radio belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines what radio will be checked on default. Component will be controlled if this prop is used.
   */
  value?: string | number | null;

  /**
   * Determines the size of the Radio components Can be 'small' or 'default.
   * (Use of xsmall should be limited to only Charts)
   * @default default
   */
  size?: Size;

  /**
   * Whether the label's font-weight is bold or regular.
   * If left `undefined` this prop will default to `true` if a description is provided,
   * otherwise defaults to `false`
   */
  bold?: boolean;
}
