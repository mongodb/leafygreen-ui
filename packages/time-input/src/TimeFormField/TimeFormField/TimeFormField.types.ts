import { FormFieldProps } from '@leafygreen-ui/form-field';

export type TimeFormFieldProps = React.ComponentPropsWithoutRef<'div'> & {
  children: FormFieldProps['children'];
};
