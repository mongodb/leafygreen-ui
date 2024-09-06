import React, { forwardRef, Fragment, TransitionEventHandler, useMemo } from 'react';
import {
  autoUpdate,
  flip,
  hide,
  offset,
  useFloating,
  useMergeRefs,
  useTransitionStatus,
} from '@floating-ui/react';
import PropTypes from 'prop-types';

import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';

import { useReferenceElement } from '../Popover.hooks';
import {
  getPopoverStyles,
  hiddenPlaceholderStyle,
  TRANSITION_DURATION,
} from '../Popover.styles';
import {
  Align,
  Justify,
  PopoverComponentProps,
  PopoverProps,
} from '../Popover.types';
import {
  getExtendedPlacementValue,
  getFloatingPlacement,
  getWindowSafePlacementValues,
} from '../utils/positionUtils';

/**
 *
 * React Component that handles positioning of content relative to another element.
 *
 * ```
 * <button>
 *  <Popover active={true}>Hello world!</Popover>
 * </button>
 * ```
 * @param props.active Boolean to describe whether or not Popover is active.
 * @param props.spacing The spacing (in pixels) between the reference element, and the popover.
 * @param props.align Alignment of Popover component relative to another element: `top`, `bottom`, `left`, `right`, `center-horizontal`, `center-vertical`.
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`.
 * @param props.adjustOnMutation Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
 * @param props.children Content to appear inside of Popover container.
 * @param props.className Classname applied to Popover container.
 * @param props.popoverZIndex Number that controls the z-index of the popover element directly.
 * @param props.refEl Reference element that Popover component should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.portalClassName Classname applied to root element of the portal.
 * @param props.portalContainer HTML element that the popover is portaled within.
 * @param props.portalRef A ref for the Portal element.
 * @param props.scrollContainer HTML ancestor element that's scrollable to position the popover accurately within scrolling containers.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverComponentProps>(
  (
    {
      active = false,
      spacing = 10,
      align = Align.Bottom,
      justify = Justify.Start,
      adjustOnMutation = false,
      children,
      className,
      popoverZIndex,
      refEl,
      usePortal = true,
      portalClassName,
      portalContainer: portalContainerProp,
      portalRef,
      // portalRef: portalRefProp,
      scrollContainer: scrollContainerProp,
      onEntered,
      onExited,
      ...rest
    }: PopoverProps,
    fwdRef,
  ) => {
    const {
      portalContainer: portalContainerCtxVal,
      scrollContainer: scrollContainerCtxVal,
      setIsPopoverOpen,
    } = usePopoverContext();

    const portalContainer = portalContainerProp || portalContainerCtxVal;
    const scrollContainer = scrollContainerProp || scrollContainerCtxVal;

    // When usePortal is true and a scrollContainer is passed in
    // show a warning if the portalContainer is not inside of the scrollContainer.
    // Note: If no portalContainer is passed the portalContainer will be undefined and this warning will show up.
    // By default if no portalContainer is passed the <Portal> component will create a div and append it to the body.
    if (usePortal && scrollContainer) {
      if (!scrollContainer.contains(portalContainer as HTMLElement)) {
        consoleOnce.warn(
          'To ensure correct positioning make sure that the portalContainer element is inside of the scrollContainer',
        );
      }
    }

    const {
      placeholderRef,
      referenceElement,
      referenceElDocumentPos,
      renderHiddenPlaceholder,
    } = useReferenceElement(refEl, scrollContainer);

    const { context, floatingStyles, middlewareData, placement,
      refs,
    } =
      useFloating({
        elements: {
          reference: referenceElement,
        },
        middleware: [
          offset(
            ({ rects }) => {
              if (align === Align.CenterHorizontal) {
                return -rects.reference.width / 2 - rects.floating.width / 2;
              }

              if (align === Align.CenterVertical) {
                return -rects.reference.height / 2 - rects.floating.height / 2;
              }

              return spacing;
            },
            [align, spacing],
          ),
          flip({
            flipAlignment:
              adjustOnMutation &&
              align !== Align.CenterHorizontal &&
              align !== Align.CenterVertical,
          }),
          hide(),
        ],
        open: active,
        placement: getFloatingPlacement(align, justify),
        strategy: 'absolute',
        transform: false,
        whileElementsMounted: autoUpdate,
      });

    // const portalRef = useMergeRefs([portalRefProp, undefined]);
    const popoverRef = useMergeRefs([fwdRef, refs.setFloating]);

    const Root = useMemo(() => usePortal ? Portal : Fragment, [usePortal]);
    const portalProps = {
      className: portalContainer ? undefined : portalClassName,
      container: portalContainer ?? undefined,
      portalRef,
    };
    const rootProps = usePortal ? portalProps : {};

    const { isMounted, status } = useTransitionStatus(context, {
      duration: TRANSITION_DURATION,
    });

    const { align: windowSafeAlign, justify: windowSafeJustify } =
      getWindowSafePlacementValues(placement);
    const extendedPlacement = getExtendedPlacementValue({
      placement,
      align,
      justify,
    });

    const handleEnteredTransition = () => {
      setIsPopoverOpen(true);
      onEntered?.();
    };

    const handleExitedTransition = () => {
      setIsPopoverOpen(false);
      onExited?.();
    };

    const handleTransitionEnd: TransitionEventHandler<HTMLDivElement> = (e) => {
      /**
       * Only fire transition end events for the `transform` property to prevent
       * it from firing multiple times for each transition property.
       */
      if (e.propertyName !== 'transform') {
        return;
      }
      if (active) {
        handleEnteredTransition();
      } else {
        handleExitedTransition();
      }
    };

    const renderChildren = () => {
      if (children === null) {
        return null;
      }

      if (typeof children === 'function') {
        return children({
          align: windowSafeAlign,
          justify: windowSafeJustify,
          referenceElPos: referenceElDocumentPos,
        });
      }

      return children;
    };

    return (
      isMounted ?
      <>
        {renderHiddenPlaceholder && (
          /* Using <span> as placeholder to prevent validateDOMNesting warnings
          Warnings will still show up if `usePortal` is false */
          <span ref={placeholderRef} className={hiddenPlaceholderStyle} />
        )}
        <Root {...rootProps}>
          <div
            {...rest}
            ref={popoverRef}
            className={getPopoverStyles({
              className,
              floatingStyles,
              hidePopover: middlewareData.hide?.referenceHidden,
              popoverZIndex,
              spacing,
            })}
            data-placement={extendedPlacement}
            data-status={status}
            onTransitionEnd={handleTransitionEnd}
          >
            {renderChildren()}
          </div>
          </Root>
        </>
        : null
    );
  },
);

Popover.displayName = 'Popover';

Popover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  /// @ts-expect-error Types of property '[nominalTypeHack]' are incompatible.
  refEl: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  /// @ts-ignore Types of property '[nominalTypeHack]' are incompatible. - error only in R18
  usePortal: PropTypes.bool,
  /// @ts-ignore Types of property '[nominalTypeHack]' are incompatible. - error only in R18
  portalClassName: PropTypes.string,
  spacing: PropTypes.number,
  adjustOnMutation: PropTypes.bool,
};
