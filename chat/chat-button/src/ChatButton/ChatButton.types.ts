import { ButtonProps } from '@leafygreen-ui/button';

export type ChatButtonProps = Omit<
  Exclude<ButtonProps<'button'>, { href: string }>,
  'as'
>;
