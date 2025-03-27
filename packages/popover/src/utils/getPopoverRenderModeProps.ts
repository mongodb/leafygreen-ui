import { PopoverRenderModeProps, RenderMode } from '../Popover';
import {
  BasePopoverProps,
  DismissMode,
  ToggleEvent,
} from '../Popover/Popover.types';

/**
 *
 */
export type GetPopoverRenderModePropsArgs<R extends RenderMode = RenderMode> =
  Partial<BasePopoverProps> & {
    dismissMode?: DismissMode;
    onToggle?: (e: ToggleEvent) => void;
    onBeforeToggle?: (e: ToggleEvent) => void;
    portalClassName?: string;
    portalContainer?: HTMLElement | null;
    portalRef?: React.MutableRefObject<HTMLElement | null>;
    renderMode: R;
    scrollContainer?: HTMLElement | null;
  };

/**
 * Util function that returns relevant properties based on the `renderMode` prop
 * @internal
 */
export const getPopoverRenderModeProps = <R extends RenderMode>({
  dismissMode,
  onToggle,
  onBeforeToggle,
  portalClassName,
  portalContainer,
  portalRef,
  renderMode,
  scrollContainer,
  ...rest
}: GetPopoverRenderModePropsArgs<R>): PopoverRenderModeProps<R> => {
  if (renderMode === RenderMode.Inline) {
    return { renderMode, ...rest } as PopoverRenderModeProps<R>;
  }

  if (renderMode === RenderMode.Portal) {
    return {
      renderMode,
      portalClassName,
      portalContainer,
      portalRef,
      scrollContainer,
      ...rest,
    } as PopoverRenderModeProps<R>;
  }

  return {
    dismissMode,
    onToggle,
    onBeforeToggle,
    renderMode,
    ...rest,
  } as PopoverRenderModeProps<R>;
};
