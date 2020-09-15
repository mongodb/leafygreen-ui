import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Popover, {
  PopoverProps,
  Align as PopoverAlign,
  Justify,
  ElementPosition,
} from '@leafygreen-ui/popover';
import { Body } from '@leafygreen-ui/typography';
import { useEventListener, useEscapeKey } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  OneOf,
  HTMLElementProps,
  IdAllocator,
  typeIs,
} from '@leafygreen-ui/lib';
import { transparentize } from 'polished';
import debounce from 'lodash/debounce';
import { trianglePosition } from './tooltipUtils';

/**
 * Converts any type to an array of that type if it isn't already an array,
 * or an empty array for nullish values.
 * */
function toArray(item: null | undefined): [];
function toArray<T>(item: Array<T>): Array<T>;
function toArray<T>(item: T): Array<T>;
function toArray<T>(item: T) {
  if (item == null) {
    return [];
  }

  if (typeIs.array(item)) {
    return item;
  }

  return [item];
}

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
  box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
  cursor: default;
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
      box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
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
      box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
    `,
  },
};

interface PopoverFunctionParameters {
  align: Align;
  justify: Justify;
  referenceElPos: ElementPosition;
}

type ModifiedPopoverProps = Omit<PopoverProps, 'active' | 'refEl'>;

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
  } & OneOf<
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
       * @default: undefined
       */
      portalClassName?: string;
    },
    {
      usePortal: false;
    }
  >;

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
  ...rest
}: TooltipProps) {
  const isControlled = typeof controlledOpen === 'boolean';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  // typescript is not recognizing isControlled checks that controlledSetOpen exists
  const setOpen =
    isControlled && controlledSetOpen ? controlledSetOpen : uncontrolledSetOpen;

  const tooltipRef = useRef<HTMLDivElement>(null);

  const existingId = id ?? tooltipRef.current?.id;
  const tooltipId = useMemo(() => existingId ?? idAllocator.generate(), [
    existingId,
  ]);

  const createTriggerProps = (
    triggerEvent: TriggerEvent,
    triggerProps?: any,
  ) => {
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
          if (e.target !== tooltipRef.current) {
            triggerProps.onClick();
            setOpen((curr: boolean) => !curr);
          }
        },
      };
    }

    return {
      onClick: (e: MouseEvent) => {
        // ensure that we don't close the tooltip when content inside tooltip is clicked
        if (e.target !== tooltipRef.current) {
          setOpen((curr: boolean) => !curr);
        }
      },
    };
  };

  const handleClose = () => {
    if (typeof shouldClose !== 'function' || shouldClose()) {
      setOpen(false);
    }
  };

  useEscapeKey(handleClose, { enabled: open });

  const handleBackdropClick = (e: MouseEvent) => {
    const tooltipReference = tooltipRef && tooltipRef.current;

    if (
      tooltipReference &&
      !tooltipReference.contains(e.target as HTMLElement)
    ) {
      handleClose();
    }
  };

  useEventListener('click', handleBackdropClick, {
    enabled: open && triggerEvent === 'click',
  });

  const portalProps = usePortal
    ? { spacing, usePortal, portalClassName }
    : { spacing, usePortal };

  const mode = darkMode ? Mode.Dark : Mode.Light;

  const tooltip = (
    <Popover
      key="tooltip"
      active={enabled && open}
      align={align}
      justify={justify}
      adjustOnMutation={true}
      onClick={stopClickPropagation}
      {...portalProps}
    >
      {({ align, justify, referenceElPos }: PopoverFunctionParameters) => {
        const triangleStyle = trianglePosition(
          align,
          justify,
          referenceElPos,
        ) as { containerStyle: string; notchStyle: string };

        return (
          <div
            {...rest}
            role="tooltip"
            id={tooltipId}
            className={cx(baseStyles, colorSet[mode].tooltip, className)}
            ref={tooltipRef}
          >
            <div className={triangleStyle.containerStyle}>
              <div
                className={cx(triangleStyle.notchStyle, colorSet[mode].notch)}
              />
            </div>
            <Body className={colorSet[mode].children}>{children}</Body>
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
        'aria-describedby': tooltipId,
        children: tooltip,
      });
    }

    const { children: triggerChildren } = trigger.props;

    return React.cloneElement(trigger, {
      ...createTriggerProps(triggerEvent, trigger.props),
      'aria-describedby': tooltipId,
      children: [...toArray(triggerChildren), tooltip],
      className: cx(trigger.props.className, positionRelative),
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
