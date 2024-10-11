import { PopoverRenderModeProps, RenderMode } from '../Popover';

/**
 * Util function that returns relevant properties based on the `renderMode` prop
 * @internal
 */
export const getPopoverRenderModeProps = ({
  dismissMode,
  onToggle,
  portalClassName,
  portalContainer,
  portalRef,
  renderMode,
  scrollContainer,
}: {
  dismissMode?: PopoverRenderModeProps['dismissMode'];
  onToggle?: PopoverRenderModeProps['onToggle'];
  portalClassName?: PopoverRenderModeProps['portalClassName'];
  portalContainer?: PopoverRenderModeProps['portalContainer'];
  portalRef?: PopoverRenderModeProps['portalRef'];
  renderMode: RenderMode;
  scrollContainer?: PopoverRenderModeProps['scrollContainer'];
}): PopoverRenderModeProps => {
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
    renderMode,
  };
};
