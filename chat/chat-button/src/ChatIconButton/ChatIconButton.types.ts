import { IconButtonProps } from '@leafygreen-ui/icon-button';

export type ChatIconButtonProps = Omit<
  Exclude<IconButtonProps<'button'>, { href: string }>,
  'children'
>;
