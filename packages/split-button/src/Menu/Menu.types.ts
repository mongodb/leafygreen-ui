import {
  MenuProps as SBMenuProps,
  SplitButtonProps,
} from '../SplitButton/SplitButton.types';

export type MenuProps = Required<
  Pick<SplitButtonProps, 'variant' | 'size' | 'disabled'>
> &
  Pick<SplitButtonProps, 'baseFontSize'> &
  SBMenuProps & {
    containerRef: React.RefObject<HTMLElement>;
  };
