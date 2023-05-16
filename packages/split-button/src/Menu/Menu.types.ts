import { SplitButtonProps } from '../SplitButton/SplitButton.types';

export type MenuProps = Pick<
  SplitButtonProps,
  'variant' | 'align' | 'justify' | 'size' | 'menuItems' | 'baseFontSize'
> & {
  containerRef: React.RefObject<HTMLElement>;
};
