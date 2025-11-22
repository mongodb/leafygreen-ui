import {
  MenuProps as SBMenuProps,
  SplitButtonProps,
} from '../SplitButton/SplitButton.types';
import { type GetLgIdsReturnType } from '../utils';

export type MenuProps = Required<
  Pick<SplitButtonProps, 'variant' | 'size' | 'disabled'>
> &
  Pick<SplitButtonProps, 'baseFontSize' | 'children'> &
  SBMenuProps & {
    containerRef: React.RefObject<HTMLElement>;
  } & { lgIds: GetLgIdsReturnType };
