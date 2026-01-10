import {
  ButtonProps as BaseButtonProps,
  Variant as BaseButtonVariant,
} from '@leafygreen-ui/button';

export type ButtonProps = Omit<BaseButtonProps, 'size'>;
export const ButtonVariant = BaseButtonVariant;
