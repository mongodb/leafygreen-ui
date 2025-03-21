import {
  GetPopoverRenderModeProps,
  PopoverRenderModeProps,
  RenderMode,
} from '../Popover';

/**
 * Util function that returns relevant properties based on the `renderMode` prop
 * @internal
 */
export const getPopoverRenderModeProps = ({
  dismissMode,
  onToggle,
  onBeforeToggle,
  portalClassName,
  portalContainer,
  portalRef,
  renderMode,
  scrollContainer,
}: GetPopoverRenderModeProps): PopoverRenderModeProps => {
  if (renderMode === RenderMode.Inline) {
    return { renderMode };
  }

  if (renderMode === RenderMode.Portal) {
    return {
      renderMode,
      portalClassName,
      portalContainer,
      portalRef,
      scrollContainer,
    };
  }

  return {
    dismissMode,
    onToggle,
    onBeforeToggle,
    renderMode,
  };
};
