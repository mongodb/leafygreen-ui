import { FormFieldProps } from '@leafygreen-ui/form-field';

export type TimeFormFieldInputContainerProps =
  React.ComponentPropsWithoutRef<'div'> & {
    children: FormFieldProps['children'];
    onInputClick?: React.MouseEventHandler<HTMLDivElement>;
  };
