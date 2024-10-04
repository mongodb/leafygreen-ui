import { RenderMode } from '../Popover/Popover.types';

export function getRenderMode(
  renderMode?: RenderMode,
  usePortal?: boolean,
): RenderMode {
  if (usePortal !== undefined) {
    if (usePortal) {
      return RenderMode.Portal;
    }

    return RenderMode.Inline;
  }

  if (renderMode === undefined) {
    return RenderMode.TopLayer;
  }

  return renderMode;
}
