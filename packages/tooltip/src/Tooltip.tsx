import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import debounce from 'lodash/debounce';
import Popover, {
  PopoverProps,
  Align as PopoverAlign,
  Justify,
  ElementPosition,
} from '@leafygreen-ui/popover';
import {
  useEventListener,
  useEscapeKey,
  useIdAllocator,
} from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import {
  DarkModeProps,
  HTMLElementProps,
  isComponentType,
} from '@leafygreen-ui/lib';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { notchPositionStyles } from './tooltipUtils';
import SvgNotch from './Notch';
import { borderRadius, notchWidth } from './tooltipConstants';

export const TriggerEvent = {
  Hover: 'hover',
  Click: 'click',
} as const;

type TriggerEvent = typeof TriggerEvent[keyof typeof TriggerEvent];

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

export const Align = {
  Top: PopoverAlign.Top,
  Bottom: PopoverAlign.Bottom,
  Left: PopoverAlign.Left,
  Right: PopoverAlign.Right,
} as const;

export type Align = typeof Align[keyof typeof Align];

export { Justify };

// The typographic styles below are largely copied from the Body component.
// We can't use the Body component here due to it rendering a paragraph tag,
// Which would conflict with any children passed to it containing a div.
const baseTypeStyle = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.gray.light1};
  font-weight: 400;
`;

const typeScale1 = css`
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0px;
`;

const typeScale2 = css`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
`;

const baseStyles = css`
  display: flex;
  align-items: center;
  border-radius: ${borderRadius}px;
  padding: 12px ${borderRadius}px;
  box-shadow: 0px 2px 4px -1px ${transparentize(0.85, palette.black)};
  cursor: default;
  overflow-wrap: break-word;
  width: fit-content;
  max-width: 256px;
`;

const positionRelative = css`
  position: relative;
`;

const colorSet = {
  [Mode.Light]: {
    tooltip: css`
      background-color: ${palette.black};
      color: ${palette.gray.light1};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.black,
  },
  [Mode.Dark]: {
    tooltip: css`
      background-color: ${palette.gray.light3};
      color: ${uiColors.gray.dark3};
    `,
    children: css`
      color: inherit;
    `,
    notchFill: palette.gray.light3,
  },
};

const minSize = notchWidth + 2 * borderRadius;
const minHeightStyle = css`
  min-height: ${minSize}px;
`;
interface PopoverFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

type ModifiedPopoverProps = Omit<PopoverProps, 'active'>;

export type TooltipProps = Omit<
  HTMLElementProps<'div'>,
  keyof ModifiedPopoverProps
> &
  ModifiedPopoverProps &
  DarkModeProps & {
    /**
     * A slot for the element used to trigger the `Tooltip`.
     */
    trigger?: React.ReactElement | Function;

    /**
     * Determines if a `hover` or `click` event will trigger the opening of a `Tooltip`.
     * @default: 'hover'
     */
    triggerEvent?: TriggerEvent;

    /**
     * Controls component and determines the open state of the `Tooltip`
     * @default: `false`
     */
    open?: boolean;

    /**
     * Callback to change the open state of the `Tooltip`.
     */
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * id given to `Tooltip` content.
     */
    id?: string;

    /**
     * Callback to determine whether or not `Tooltip` should close when user tries to close it.
     *
     */
    shouldClose?: () => boolean;

    /**
     * Enables Tooltip to trigger based on the event specified by `triggerEvent`.
     * @default: true
     */
    enabled?: boolean;
  };

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
 * @param props.darkMode Whether the Tooltip will apepar in dark mode.
 * @param props.className Classname applied to Tooltip.
 * @param props.align Alignment of Tooltip relative to trigger: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Tooltip relative to trigger: `start`, `middle`, `end`.
 * @param props.trigger Trigger element can be ReactNode or function.
 * @param props.triggerEvent Whether the Tooltip should be triggered by a `click` or `hover`.
 * @param props.id id given to Tooltip content.
 * @param props.usePortal Determines whether or not Tooltip will be Portaled
 * @param props.portalClassName Classname applied to root element of the portal.
 */
function Tooltip({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  className,
  children,
  trigger,
  triggerEvent = TriggerEvent.Hover,
  darkMode = false,
  enabled = true,
  align = 'top',
  justify = 'start',
  spacing = 12,
  id,
  shouldClose,
  usePortal = true,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  refEl,
  ...rest
}: TooltipProps) {
  const isControlled = typeof controlledOpen === 'boolean';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const size = useBaseFontSize();
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  // typescript is not recognizing isControlled checks that controlledSetOpen exists
  const setOpen =
    isControlled && controlledSetOpen ? controlledSetOpen : uncontrolledSetOpen;

  const [tooltipNode, setTooltipNode] = useState<HTMLDivElement | null>(null);

  const existingId = id ?? tooltipNode?.id;
  const tooltipId = useIdAllocator({ prefix: 'tooltip', id: existingId });

  useEffect(() => {
    // If consumer is using Icon or Glyph component as trigger, the tooltip will not be visible as these components do not render their children
    if (
      (trigger && isComponentType(trigger, 'Icon')) ||
      isComponentGlyph(trigger)
    ) {
      console.warn(
        'Using a LeafyGreenUI Icon or Glyph component as a trigger will not render a Tooltip, as these components do not render their children. To use, please wrap your trigger element in another HTML tag.',
      );
    }
  }, [trigger]);

  const handleClose = useCallback(() => {
    if (typeof shouldClose !== 'function' || shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const createTriggerProps = useCallback(
    (triggerEvent: TriggerEvent, triggerProps?: any) => {
      switch (triggerEvent) {
        case TriggerEvent.Hover:
          return {
            onMouseEnter: debounce((e: MouseEvent) => {
              userTriggerHandler('onMouseEnter', e);
              setOpen(true);
            }, 35),
            onMouseLeave: debounce((e: MouseEvent) => {
              userTriggerHandler('onMouseLeave', e);
              handleClose();
            }, 35),
            onFocus: (e: MouseEvent) => {
              userTriggerHandler('onFocus', e);
              setOpen(true);
            },
            onBlur: (e: MouseEvent) => {
              userTriggerHandler('onBlur', e);
              handleClose();
            },
          };
        case TriggerEvent.Click:
        default:
          return {
            onClick: (e: MouseEvent) => {
              // ensure that we don't close the tooltip when content inside tooltip is clicked
              if (e.target !== tooltipNode) {
                userTriggerHandler('onClick', e);
                setOpen((curr: boolean) => !curr);
              }
            },
          };
      }

      function userTriggerHandler(handler: string, e: MouseEvent): void {
        // call any click handlers already on the trigger
        if (
          triggerProps &&
          triggerProps[handler] &&
          typeof triggerProps[handler] == 'function'
        )
          triggerProps[handler](e);
      }
    },
    [handleClose, setOpen, tooltipNode],
  );

  useEscapeKey(handleClose, { enabled: open });

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      /**
       * Close the tooltip iff the clicked target (e.target) is NOT the tooltip element
       *
       * This handler is added to the document.
       * No need to check whether the click target is the trigger node
       * since clicks on that element are stopped from propogating by the <Popover>
       */
      if (tooltipNode && !tooltipNode.contains(e.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose, tooltipNode],
  );

  useEventListener('click', handleBackdropClick, {
    enabled: open && triggerEvent === 'click',
  });

  const popoverProps = {
    refEl,
    popoverZIndex,
    ...(usePortal
      ? {
          spacing,
          usePortal,
          portalClassName,
          portalContainer,
          scrollContainer,
        }
      : { spacing, usePortal }),
  };

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const active = enabled && open;
  const isLeftOrRightAligned = ['left', 'right'].includes(align);

  const tooltip = (
    <Popover
      key="tooltip"
      active={active}
      align={align}
      justify={justify}
      adjustOnMutation={true}
      onClick={stopClickPropagation}
      className={cx({
        [css`
          // Try to fit all the content on one line (until it hits max-width)
          // Overrides default behavior, which is to set width to size of the trigger
          width: max-content;
        `]: !usePortal,
      })}
      {...popoverProps}
    >
      {({ align, justify, referenceElPos }: PopoverFunctionParameters) => {
        const {
          notchContainer: notchContainerStyle,
          notch: notchStyle,
          tooltip: tooltipNotchStyle,
        } = notchPositionStyles({
          align,
          justify,
          triggerRect: referenceElPos,
        });

        return (
          <div
            {...rest}
            role="tooltip"
            id={tooltipId}
            className={cx(
              baseStyles,
              tooltipNotchStyle,
              colorSet[mode].tooltip,
              {
                [minHeightStyle]: isLeftOrRightAligned,
              },
              className,
            )}
            ref={setTooltipNode}
          >
            <div
              className={cx(
                baseTypeStyle,
                size === 16 ? typeScale2 : typeScale1,
                colorSet[mode].children,
              )}
            >
              {children}
            </div>

            <div className={notchContainerStyle}>
              <SvgNotch
                className={cx(notchStyle)}
                fill={colorSet[mode].notchFill}
              />
            </div>
          </div>
        );
      }}
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        ...createTriggerProps(triggerEvent),
        className: positionRelative,
        'aria-describedby': active ? tooltipId : undefined,
        children: tooltip,
      });
    }

    return React.cloneElement(trigger, {
      ...createTriggerProps(triggerEvent, trigger.props),
      'aria-describedby': active ? tooltipId : undefined,
      children: (
        <>
          {trigger.props.children}
          {tooltip}
        </>
      ),
      className: cx(positionRelative, trigger.props.className),
    });
  }

  return tooltip;
}

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  triggerEvent: PropTypes.oneOf(Object.values(TriggerEvent)),
  darkMode: PropTypes.bool,
  enabled: PropTypes.bool,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  shouldClose: PropTypes.func,
  usePortal: PropTypes.bool,
  portalClassName: PropTypes.string,
};

export default Tooltip;
