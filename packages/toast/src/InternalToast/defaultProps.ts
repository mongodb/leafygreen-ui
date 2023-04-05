import { ToastProps, Variant } from '../Toast.types';

export const defaultToastProps: Required<
  Pick<ToastProps, 'variant' | 'progress' | 'dismissible' | 'timeout'>
> = {
  variant: Variant.Note,
  progress: 1.0,
  timeout: 6_000,
  dismissible: true,
};
