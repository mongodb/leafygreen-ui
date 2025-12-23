import { FormFieldProps } from '@leafygreen-ui/form-field';

export type TimeFormFieldProps = React.ComponentPropsWithRef<'div'> & {
  children: FormFieldProps['children'];
};
