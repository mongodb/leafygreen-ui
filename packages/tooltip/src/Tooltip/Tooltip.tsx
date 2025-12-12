import React, {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useBackdropClick,
  useEscapeKey,
  useIdAllocator,
} from '@leafygreen-ui/hooks';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { getPopoverRenderModeProps, Popover } from '@leafygreen-ui/popover';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import SvgNotch from '../Notch';

import { useTooltipTriggerEventHandlers } from './utils/useTooltipTriggerEventHandlers';
import {
  getNotchFill,
  getTooltipStyles,
  getTriggerStyles,
  textStyles,
  tooltipPopoverStyles,
} from './Tooltip.styles';
import {
  DismissMode,
  PopoverFunctionParameters,
  RenderMode,
  TooltipProps,
  TooltipVariant,
  TriggerEvent,
} from './Tooltip.types';
import { notchPositionStyles } from './tooltipUtils';

const stopClickPropagation = (evt: React.MouseEvent) => {
  evt.stopPropagation();
};

/**
 * # Tooltip
 *
 * Tooltip component
 *
 * ```
<Tooltip
  align='top'
  justify='start'
  trigger={<button>trigger</button>}
  triggerEvent='hover'
>
  I am an uncontrolled Tooltip!
</Tooltip>
```
 * @param props.children Content to appear inside of Tooltip.
 * @param props.open Boolean to describe whether or not Tooltip is open.
 * @param props.setOpen Callback to change the open state of the Tooltip.
 * @param props.darkMode Whether the Tooltip will appear in dark mode.
 * @param props.className Classname applied to Tooltip.
 * @param props.align Alignment of Tooltip relative to trigger: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Tooltip relative to trigger: `start`, `middle`, `end`.
 * @param props.trigger Trigger element can be ReactNode or function.
 * @param props.triggerEvent Whether the Tooltip should be triggered by a `click` or `hover`.
 * @param props.id id given to Tooltip content.
 * @param props.renderMode Options to render the popover element: `inline`, `portal`, `top-layer`.
 * @param props.portalClassName Classname applied to root element of the portal.
 * @param props.portalRef A ref for the portal element
 * @param props.onClose Callback that is fired when the tooltip is closed.
 */
function Tooltip({
  initialOpen = false,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  darkMode: darkThemeProp,
  baseFontSize: baseFontSizeProp,
  triggerEvent = TriggerEvent.Hover,
  enabled = true,
  align = 'top',
  justify = 'start',
  spacing = 12,
  renderMode = RenderMode.TopLayer,
  onClose,
  id,
  shouldClose,
  portalClassName,
  portalContainer,
  portalRef,
  scrollContainer,
  popoverZIndex,
  refEl,
  className,
  children,
  trigger,
  variant = TooltipVariant.Default,
  ...rest
}: TooltipProps) {
  const isControlled = typeof controlledOpen === 'boolean';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(initialOpen);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  // typescript is not recognizing isControlled checks that controlledSetOpen exists
  const setOpen =
    isControlled && controlledSetOpen ? controlledSetOpen : uncontrolledSetOpen;

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const existingId = id ?? tooltipRef.current?.id;
  const tooltipId = useIdAllocator({ prefix: 'tooltip', id: existingId });
  const { darkMode: localDarkMode, theme } = useDarkMode(darkThemeProp);

  useEffect(() => {
    // If consumer is using Icon or Glyph component as trigger, the tooltip will not be visible as these components do not render their children
    if (trigger && isValidElement(trigger) && isComponentGlyph(trigger)) {
      console.warn(
        'Using a LeafyGreenUI Icon or Glyph component as a trigger will not render a Tooltip, as these components do not render their children. To use, please wrap your trigger element in another HTML tag.',
      );
    }
  }, [trigger]);

  const triggerComponent =
    typeof trigger === 'function' ? trigger({}) : trigger;

  const handleClose = useCallback(() => {
    if (typeof shouldClose !== 'function' || shouldClose()) {
      onClose?.();
      setOpen(false);
    }
  }, [setOpen, shouldClose, onClose]);

  useEscapeKey(handleClose, { enabled: open });

  useBackdropClick(handleClose, [tooltipRef], {
    enabled: open && triggerEvent === 'click',
  });

  const triggerEventHandlers = useTooltipTriggerEventHandlers({
    setState: setOpen,
    triggerEvent,
    tooltipRef,
    isEnabled: enabled,
    ...triggerComponent?.props,
  });

  const popoverProps = {
    popoverZIndex,
    refEl,
    spacing,
    ...getPopoverRenderModeProps({
      dismissMode: DismissMode.Manual,
      portalClassName,
      portalContainer,
      portalRef,
      renderMode,
      scrollContainer,
    }),
  } as const;

  const active = enabled && open;
  const isLeftOrRightAligned = ['left', 'right'].includes(align);
  const isCompact = variant === TooltipVariant.Compact;
  const showNotch = !isCompact;

  const tooltip = (
    <Popover
      key="tooltip"
      active={active}
      align={align}
      justify={justify}
      adjustOnMutation={true}
      onClick={stopClickPropagation}
      className={tooltipPopoverStyles}
      {...popoverProps}
    >
      {({ align, justify, referenceElPos }: PopoverFunctionParameters) => {
        const {
          notchContainer: notchContainerStyles,
          notch: notchStyles,
          tooltip: tooltipAdjustmentStyles,
        } = notchPositionStyles({
          align,
          justify,
          triggerRect: referenceElPos,
          isCompact,
        });

        return (
          // Establish a new DarkMode context so any LG components inherit the correct value
          // (since tooltip backgrounds are inverse to the outer context's theme)
          <LeafyGreenProvider darkMode={!localDarkMode}>
            <div
              role="tooltip"
              {...rest}
              id={tooltipId}
              className={getTooltipStyles({
                className,
                isCompact,
                isLeftOrRightAligned,
                tooltipAdjustmentStyles,
                theme,
              })}
              ref={tooltipRef}
            >
              <Body
                as="span"
                baseFontSize={isCompact ? undefined : baseFontSize}
                className={textStyles}
              >
                {children}
              </Body>
              {showNotch && (
                <div className={notchContainerStyles}>
                  <SvgNotch
                    className={notchStyles}
                    fill={getNotchFill(theme)}
                  />
                </div>
              )}
            </div>
          </LeafyGreenProvider>
        );
      }}
    </Popover>
  );

  if (triggerComponent) {
    return React.cloneElement(triggerComponent, {
      ...triggerEventHandlers,
      'aria-describedby': active ? tooltipId : undefined,
      children: (
        <>
          {triggerComponent.props.children}
          {tooltip}
        </>
      ),
      className: getTriggerStyles(triggerComponent.props.className),
    });
  }

  return tooltip;
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
