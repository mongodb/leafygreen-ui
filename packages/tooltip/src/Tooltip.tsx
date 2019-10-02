import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverProps, Align, Justify } from '@leafygreen-ui/popover';
import Portal from '@leafygreen-ui/portal';
import { useEventListener } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize, triangle } from 'polished';
import debounce from 'lodash/debounce';
import { trianglePosition } from './tooltipUtils';

export const TriggerEvent = {
  Hover: 'hover',
  Click: 'click',
} as const;

type TriggerEvent = typeof TriggerEvent[keyof typeof TriggerEvent];

export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

const baseStyles = css`
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px 15px 16px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
`;

const tooltipVariants: { readonly [K in Variant]: string } = {
  [Variant.Dark]: css`
    background-color: ${uiColors.gray.dark3};
    color: ${uiColors.gray.light1};
  `,

  [Variant.Light]: css`
    background-color: ${uiColors.gray.light3};
    color: ${uiColors.gray.dark2};
    border: 1px solid ${uiColors.gray.light2};
  `,
};

const escapeKeyCode = 27;

interface TooltipProps
  extends Omit<PopoverProps, 'active' | 'spacing' | 'refEl' | 'usePortal'> {
  /**
   * A slot for the element used to trigger the Tooltip. Passing a trigger allows
   * Tooltip to control opening and closing itself internally.
   */
  trigger: React.ReactElement | Function;

  /**
   * Determines if a `hover` or `click` event will trigger the opening of a Tooltip.
   */
  triggerEvent?: TriggerEvent;

  /**
   * Determines the open state of the Tooltip
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Tooltip.
   *
   */
  setOpen?: (
    open: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the Tooltip will be `light` or `dark`.
   */
  variant?: Variant;

  /**
   * id given to Tooltip content.
   */
  id?: string;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;
}

/**
 * @param props.children Content to appear inside of Tooltip.
 * @param props.open Boolean to describe whether or not Tooltip is open.
 * @param props.setOpen Callback to change the open state of the Tooltip.
 * @param props.variant Whether the Tooltip should be `dark` or `light`.
 * @param props.className Classname applied to Tooltip.
 * @param props.align Alignment of Tooltip relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Tooltip relative to another element: `start`, `middle`, `end`.
 * @param props.trigger Trigger element can be ReactNode or function, and, if present, internally manages active state of Tooltip.
 * @param props.triggerEvent Whether the Tooltip should be triggered by a `click` or `hover`.
 * @param props.id id given to Tooltip content
 */
function Tooltip({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  className,
  children,
  trigger,
  variant = Variant.Light,
  triggerEvent = TriggerEvent.Hover,
  align = 'top',
  justify = 'start',
  id,
  shouldClose,
  ...rest
}: TooltipProps) {
  const isControlled = !!controlledSetOpen;
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledSetOpen : uncontrolledSetOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tooltipId =
    id || `tooltip-${Math.floor(Math.random() * Math.floor(10))}`;

  const triggerEventMap = {
    click: {
      onClick: () => setOpen && setOpen(!open),
    },

    hover: {
      onMouseEnter: debounce(() => {
        setOpen && setOpen(!open);

        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      }, 250),
      onMouseLeave: debounce(() => {
        handleClose();

        if (triggerRef.current) {
          // BY: no particular reason for this but felt like it looked better to leave the focus for a bit longer
          setTimeout(() => (triggerRef.current as HTMLElement).blur(), 150);
        }
      }, 250),
    },
  };

  const handleClose = () => {
    if (!shouldClose || shouldClose()) {
      setOpen && setOpen(false);
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();

    if (e.keyCode === escapeKeyCode) {
      handleClose();
    }
  };

  useEventListener('keydown', handleEscape);

  const handleBackdropClick = (e: MouseEvent) => {
    const tooltipReference = tooltipRef && tooltipRef.current;

    if (
      triggerEvent === 'click' &&
      tooltipReference &&
      !tooltipReference.contains(e.target as HTMLElement)
    ) {
      handleClose();
    }
  };

  const enabled = open;

  useEventListener('click', handleBackdropClick, { enabled });

  const triggerEvents = triggerEventMap[triggerEvent];

  const triggerRect =
    triggerRef &&
    triggerRef.current &&
    triggerRef.current.getBoundingClientRect();

  const triangleStyle = trianglePosition(align, triggerRect, 'pink');

  const tooltip = (
    <>
      {open && (
        <Portal>
          <div className={triangleStyle} />
        </Portal>
      )}

      <Popover
        key="popover"
        active={open}
        align={align}
        justify={justify}
        usePortal={true}
        adjustOnMutation={true}
        spacing={15}
      >
        <div
          {...rest}
          role="tooltip"
          id={tooltipId}
          className={cx(className, baseStyles, tooltipVariants[variant])}
          ref={tooltipRef}
        >
          {children}
        </div>
      </Popover>
    </>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        ...triggerEvents,
        ref: triggerRef,
        children: tooltip,
        'aria-describedby': tooltipId,
      });
    }

    return React.cloneElement(trigger, {
      ...triggerEvents,
      children: [...trigger.props.children, tooltip],
      ref: triggerRef,
      'aria-describedby': tooltipId,
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
  variant: PropTypes.oneOf(Object.values(Variant)),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  shouldClose: PropTypes.func,
};

export default Tooltip;
