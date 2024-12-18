import {
  MenuProps as SBMenuProps,
  SplitButtonProps,
} from '../SplitButton/SplitButton.types';

export type MenuProps = Required<
  Pick<SplitButtonProps, 'variant' | 'size' | 'disabled' | 'onItemClick'>
> &
  Pick<SplitButtonProps, 'baseFontSize'> &
  SBMenuProps & {
    containerRef: React.RefObject<HTMLElement>;
  };

export type ItemClickHandlerOptions = {
  /**
   * Closes the menu.
   */
  close(): void;

  /**
   * The element being clicked.
   */
  element: React.ReactElement<unknown>;
};

export type ItemClickHandler = (event: React.MouseEvent<unknown>, options: ItemClickHandlerOptions) => void;
