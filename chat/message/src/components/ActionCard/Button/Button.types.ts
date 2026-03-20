import { ButtonProps as LGButtonProps } from '@leafygreen-ui/button';

export interface ButtonProps
  extends Omit<
    Exclude<LGButtonProps<'button'>, { href: string }>,
    'as' | 'darkMode' | 'size'
  > {}
