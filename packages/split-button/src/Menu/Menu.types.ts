import {
  MenuProps as SBMenuProps,
  SplitButtonProps,
} from '../SplitButton/SplitButton.types';

export type MenuProps = Pick<
  SplitButtonProps,
  'variant' | 'size' | 'baseFontSize'
> &
  SBMenuProps & {
    containerRef: React.RefObject<HTMLElement>;
  };
