export type AriaLabels = { label?: string } & Pick<
  JSX.IntrinsicElements['label'],
  'aria-label' | 'aria-labelledby'
>;

export interface LabelProps extends AriaLabels {
  id?: string;
}

export interface AccessibleFieldProps extends AriaLabels {
  /**
   * id used on the input element. One will be created if not supplied.
   */
  id?: string;

  /**
   * Determines if the input has an associated visible description.
   */
  isDescriptionShown?: boolean;

  /**
   *Determines if the input has an associated visible error message.
   */
  isErrorMessageShown?: boolean;

  ['aria-describedby']?: string;
}
