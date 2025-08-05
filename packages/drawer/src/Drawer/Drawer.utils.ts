import { DRAWER_TOOLBAR_WIDTH, DRAWER_WIDTHS } from '../constants';
import {
  DRAWER_MAX_WIDTH,
  DRAWER_MAX_WIDTH_WITH_TOOLBAR,
  DRAWER_MIN_WIDTH,
  DRAWER_MIN_WIDTH_WITH_TOOLBAR,
} from '../constants';

import { DisplayMode, Size } from './Drawer.types';

/**
 * Returns the width of the drawer based on the size.
 * @param size - The size of the drawer.
 * @returns An object containing the default width and width with toolbar.
 */
export const getDrawerWidth = ({ size }: { size: Size }) => {
  return {
    default: DRAWER_WIDTHS[size],
    withToolbar: DRAWER_WIDTHS[size] - DRAWER_TOOLBAR_WIDTH,
  };
};

/**
 * Resolves the drawer props based on the component and context props.
 * @returns An object containing the resolved displayMode, open state, and onClose function.
 */
export const useResolvedDrawerProps = ({
  componentDisplayMode,
  contextDisplayMode,
  componentOpen,
  contextOpen,
  componentOnClose,
  contextOnClose,
  componentSize,
  contextSize,
}: {
  componentDisplayMode?: DisplayMode;
  contextDisplayMode?: DisplayMode;
  componentOpen?: boolean;
  contextOpen?: boolean;
  componentOnClose?: React.MouseEventHandler<HTMLButtonElement>;
  contextOnClose?: React.MouseEventHandler<HTMLButtonElement>;
  componentSize?: Size;
  contextSize?: Size;
}) => {
  const displayMode =
    componentDisplayMode ?? contextDisplayMode ?? DisplayMode.Overlay;
  const open = componentOpen ?? contextOpen ?? false;
  const onClose = componentOnClose ?? contextOnClose ?? undefined;
  const size = componentSize ?? contextSize ?? Size.Default;

  return { displayMode, open, onClose, size };
};

/**
 * Returns the resolved drawer sizes based on whether a toolbar is present.
 * @returns
 */
export const getResolvedDrawerSizes = (size: Size, hasToolbar?: boolean) => {
  const drawerWidths = getDrawerWidth({ size });
  const initialSize = hasToolbar
    ? drawerWidths.withToolbar
    : drawerWidths.default;
  const resizableMinWidth = hasToolbar
    ? DRAWER_MIN_WIDTH_WITH_TOOLBAR
    : DRAWER_MIN_WIDTH;
  const resizableMaxWidth = hasToolbar
    ? DRAWER_MAX_WIDTH_WITH_TOOLBAR
    : DRAWER_MAX_WIDTH;

  return { initialSize, resizableMinWidth, resizableMaxWidth };
};
