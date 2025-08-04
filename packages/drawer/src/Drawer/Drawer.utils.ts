import { DRAWER_WIDTH, DRAWER_WITH_TOOLBAR_WIDTH } from '../constants';

import {
  DRAWER_MAX_WIDTH,
  DRAWER_MAX_WIDTH_WITH_TOOLBAR,
  DRAWER_MIN_WIDTH,
  DRAWER_MIN_WIDTH_WITH_TOOLBAR,
} from './Drawer.constants';
import { DisplayMode } from './Drawer.types';

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
}: {
  componentDisplayMode?: DisplayMode;
  contextDisplayMode?: DisplayMode;
  componentOpen?: boolean;
  contextOpen?: boolean;
  componentOnClose?: React.MouseEventHandler<HTMLButtonElement>;
  contextOnClose?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  // If the component has a displayMode prop, use that. Otherwise, use the context displayMode.
  const displayMode =
    componentDisplayMode ?? contextDisplayMode ?? DisplayMode.Overlay;

  // If the component has an open prop, use that. Otherwise, use the context open state.
  const open = componentOpen ?? contextOpen ?? false;

  // If the component has an onClose prop, use that. Otherwise, use the context onClose function.
  const onClose = componentOnClose ?? contextOnClose ?? undefined;

  return { displayMode, open, onClose };
};

/**
 * Returns the resolved drawer sizes based on whether a toolbar is present.
 * @returns
 */
export const getResolvedDrawerSizes = (hasToolbar?: boolean) => {
  const size = hasToolbar ? DRAWER_WITH_TOOLBAR_WIDTH : DRAWER_WIDTH;
  const resizableMinWidth = hasToolbar
    ? DRAWER_MIN_WIDTH_WITH_TOOLBAR
    : DRAWER_MIN_WIDTH;
  const resizableMaxWidth = hasToolbar
    ? DRAWER_MAX_WIDTH_WITH_TOOLBAR
    : DRAWER_MAX_WIDTH;

  return { size, resizableMinWidth, resizableMaxWidth };
};
