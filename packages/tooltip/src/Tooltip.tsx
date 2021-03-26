import React, { useEffect, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import debounce from 'lodash/debounce';
import Popover, {
  PopoverProps,
  Align as PopoverAlign,
  Justify,
  ElementPosition,
} from '@leafygreen-ui/popover';
import { useEventListener, useEscapeKey } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import {
  HTMLElementProps,
  IdAllocator,
  isComponentType,
} from '@leafygreen-ui/lib';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { notchPositionStyles } from './tooltipUtils';

// The typographic styles below are largely copied from the Body component.
// We can't use the Body component here due to it rendering a paragraph tag,
// Which would conflict with any children passed to it containing a div.
const baseTypeStyle = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${uiColors.gray.dark3};
  font-weight: 400;
`;

const typeScale1 = css`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
`;

const typeScale2 = css`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
`;

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

const baseStyles = css`
  padding: 14px 16px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px -1px ${transparentize(0.8, uiColors.black)};
  cursor: default;
  overflow-wrap: break-word;
`;

const positionRelative = css`
  position: relative;
`;

const colorSet = {
  [Mode.Dark]: {
    tooltip: css`
      background-color: ${uiColors.gray.dark3};
      color: ${uiColors.gray.light1};
    `,
    children: css`
      color: ${uiColors.gray.light1};
    `,
    notch: css`
      background-color: ${uiColors.gray.dark3};
      box-shadow: 2px 2px 4px ${transparentize(0.9, uiColors.black)};
    `,
  },

  [Mode.Light]: {
    tooltip: css`
      background-color: ${uiColors.gray.light3};
      color: ${uiColors.gray.dark2};
      border: 1px solid ${uiColors.gray.light2};
    `,
    children: css`
      color: ${uiColors.gray.dark2};
    `,
    notch: css`
      background-color: ${uiColors.gray.light3};
      border: 1px solid ${uiColors.gray.light2};
      box-shadow: 2px 2px 4px ${transparentize(0.9, uiColors.black)};
    `,
  },
};

interface PopoverFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

type ModifiedPopoverProps = Omit<PopoverProps, 'active' | 'refEl'>;

type PortalProps = (
  {
    /**
     * Specifies that the popover content will appear portaled to the end of the DOM,
     * rather than in the DOM tree.
     *
     * default: `true`
     */
    usePortal?: true;

    /**
     * If using a portal, specifies a class name to apply to the root element of the portal.
     *
     * default: undefined
     */
    portalClassName?: string;

    /**
     * If using a portal, specifies the element to portal within.
     */
    portalContainer?: HTMLElement | null;

    /**
     * If using a portal, specifies the element to portal within.
     */
     scrollContainer?: HTMLElement | null;
  } | {
    usePortal: false;

    /**
     * If using a portal, specifies a class name to apply to the root element of the portal.
     *
     * default: undefined
     */
    portalClassName?: undefined;

    /**
     * If using a portal, specifies the element to portal within.
     */
    portalContainer?: null;
  }
);

export type TooltipProps = Omit<
  HTMLElementProps<'div'>,
  keyof ModifiedPopoverProps
> &
  ModifiedPopoverProps & {
    /**
     * A slot for the element used to trigger the `Tooltip`.
     * @default: hover
     */
    trigger: React.ReactElement | Function;

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
     * Whether the `Tooltip` will appear in dark mode.
     * @default: false
     */
    darkMode?: boolean;

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
  } & PortalProps;

const idAllocator = IdAllocator.create('tooltip');

const stopClickPropagation = (evt: React.MouseEvent) => {
  evt.preventDefault();
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
  usePortal = true,
  align = 'top',
  justify = 'start',
  spacing = 12,
  id,
  shouldClose,
  portalClassName,
  portalContainer,
  scrollContainer,
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
  const tooltipId = useMemo(() => existingId ?? idAllocator.generate(), [
    existingId,
  ]);

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
      if (triggerEvent === TriggerEvent.Hover) {
        return {
          onMouseEnter: debounce(() => {
            setOpen(true);
          }, 35),
          onMouseLeave: debounce(handleClose, 35),
          onFocus: () => setOpen(true),
          onBlur: handleClose,
        };
      }

      if (triggerProps && triggerProps.onClick) {
        return {
          onClick: (e: MouseEvent) => {
            // ensure that we don't close the tooltip when content inside tooltip is clicked
            if (e.target !== tooltipNode) {
              triggerProps.onClick();
              setOpen((curr: boolean) => !curr);
            }
          },
        };
      }

      return {
        onClick: (e: MouseEvent) => {
          // ensure that we don't close the tooltip when content inside tooltip is clicked
          if (e.target !== tooltipNode) {
            setOpen((curr: boolean) => !curr);
          }
        },
      };
    },
    [handleClose, setOpen, tooltipNode],
  );

  useEscapeKey(handleClose, { enabled: open });

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if (tooltipNode && !tooltipNode.contains(e.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose, tooltipNode],
  );

  useEventListener('click', handleBackdropClick, {
    enabled: open && triggerEvent === 'click',
  });

  const portalProps = usePortal
    ? { spacing, usePortal, portalClassName, portalContainer, scrollContainer }
    : { spacing, usePortal };

  const mode = darkMode ? Mode.Dark : Mode.Light;

  const active = enabled && open;

  const tooltip = (
    <Popover
      key="tooltip"
      active={active}
      align={align}
      justify={justify}
      adjustOnMutation={true}
      onClick={stopClickPropagation}
      {...portalProps}
    >
      {({ align, justify, referenceElPos }: PopoverFunctionParameters) => {
        const {
          notchContainer: notchContainerStyle,
          notch: notchStyle,
          tooltip: tooltipNotchStyle,
        } = notchPositionStyles(align, justify, referenceElPos);

        return (
          <div
            {...rest}
            role="tooltip"
            id={tooltipId}
            className={cx(
              baseStyles,
              tooltipNotchStyle,
              colorSet[mode].tooltip,
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
              <div className={cx(notchStyle, colorSet[mode].notch)} />
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
