import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Popover, { PopoverProps, Align, Justify } from '@leafygreen-ui/popover';
import { useEventListener, useHandleEscape } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';
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
  padding: 14px 16px;
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

const notchVariants = {
  [Variant.Dark]: css`
    background-color: ${uiColors.gray.dark3};
    box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
  `,
  [Variant.Light]: css`
    background-color: ${uiColors.gray.light3};
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0px 2px 4px ${transparentize(0.85, uiColors.black)};
  `,
};

interface TooltipProps
  extends Omit<PopoverProps, 'active' | 'spacing' | 'refEl' | 'usePortal'> {
  /**
   * A slot for the element used to trigger the `Tooltip`.
   */
  trigger: React.ReactElement | Function;

  /**
   * Determines if a `hover` or `click` event will trigger the opening of a `Tooltip`.
   */
  triggerEvent?: TriggerEvent;

  /**
   * Controls component and determines the open state of the `Tooltip`
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the `Tooltip`.
   */
  setOpen?: (
    open: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the `Tooltip` will be `light` or `dark`.
   */
  variant?: Variant;

  /**
   * id given to `Tooltip` content.
   */
  id?: string;

  /**
   * Callback to determine whether or not `Tooltip` should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;
}

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
  variant='light'
>
  I am an uncontrolled Tooltip!
</Tooltip>
```
 * @param props.children Content to appear inside of Tooltip.
 * @param props.open Boolean to describe whether or not Tooltip is open.
 * @param props.setOpen Callback to change the open state of the Tooltip.
 * @param props.variant Whether the Tooltip should be `dark` or `light`.
 * @param props.className Classname applied to Tooltip.
 * @param props.align Alignment of Tooltip relative to trigger: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Tooltip relative to trigger: `start`, `middle`, `end`.
 * @param props.trigger Trigger element can be ReactNode or function.
 * @param props.triggerEvent Whether the Tooltip should be triggered by a `click` or `hover`.
 * @param props.id id given to Tooltip content.
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
  // typescript is not recognizing isControlled checks that controlledSetOpen exists
  const setOpen = isControlled
    ? (controlledSetOpen as Function)
    : uncontrolledSetOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tooltipId = useMemo(
    () => id || `tooltip-${Math.floor(Math.random() * Math.floor(10))}`,
    [id],
  );

  const mapToTriggerEvent = (triggerType: TriggerEvent, triggerProps?: any) => {
    if (triggerType === TriggerEvent.Hover) {
      return {
        onMouseEnter: debounce(() => {
          setOpen(!open);
        }, 35),
        onMouseLeave: debounce(handleClose, 35),
        onFocus: () => setOpen(true),
        onBlur: handleClose,
      };
    }

    if (triggerProps.onClick) {
      return {
        onClick: () => {
          triggerProps.onClick();
          setOpen(!open);
        },
      };
    }

    return {
      onClick: () => setOpen(!open),
    };
  };

  const handleClose = () => {
    if (!shouldClose || shouldClose()) {
      setOpen(false);
    }
  };

  useHandleEscape(handleClose);

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

  useEventListener('click', handleBackdropClick, { enabled: open });

  const triggerRect =
    triggerRef &&
    triggerRef.current &&
    triggerRef.current.getBoundingClientRect();

  // We are doing this to get the final alignment and justification from Popover
  // And to make sure we're responding to not just the desired alignment, but the alignment
  // As a result of our calcPosition() function
  const [alignment, setAlignment] = useState(align);
  const [justification, setJustification] = useState(justify);

  const triangleStyle = trianglePosition(
    alignment,
    justification,
    triggerRect,
  ) as { containerStyle: string; notchStyle: string };

  const tooltip = (
    <Popover
      active={open}
      align={align}
      justify={justify}
      usePortal={true}
      adjustOnMutation={true}
      spacing={12}
      setAlignment={setAlignment}
      setJustification={setJustification as any}
    >
      <div
        {...rest}
        role="tooltip"
        id={tooltipId}
        className={cx(className, baseStyles, tooltipVariants[variant])}
        ref={tooltipRef}
      >
        <div className={triangleStyle.containerStyle}>
          <div
            className={cx(triangleStyle.notchStyle, notchVariants[variant])}
          />
        </div>
        {children}
      </div>
    </Popover>
  );

  const sharedTriggerProps = {
    ref: triggerRef,
    'aria-describedby': tooltipId,
  };

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        ...mapToTriggerEvent(triggerEvent),
        ...sharedTriggerProps,
        children: tooltip,
      });
    }

    return React.cloneElement(trigger, {
      ...mapToTriggerEvent(triggerEvent, trigger.props),
      ...sharedTriggerProps,
      children: [...trigger.props.children, tooltip],
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
