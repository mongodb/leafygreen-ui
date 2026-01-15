import { ButtonProps as LGButtonProps } from '@leafygreen-ui/button';

export interface ButtonProps extends Omit<LGButtonProps<'button'>, 'size'> {}
