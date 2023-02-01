export type AriaLabels = { label?: string } & Pick<
  JSX.IntrinsicElements['label'],
  'aria-label' | 'aria-labelledby'
>;

export interface LabelProps extends AriaLabels {
  id?: string;
}

export interface AccessibleFieldProps extends AriaLabels {
  id?: string;
  isDescriptionShown?: boolean;
  isErrorMessageShown?: boolean;
  ['aria-describedby']?: string;
}
