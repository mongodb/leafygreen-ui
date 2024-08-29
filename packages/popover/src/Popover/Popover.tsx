import React, { forwardRef, useEffect } from 'react';
import {
  autoUpdate,
  flip,
  hide,
  offset,
  useFloating,
  useTransitionStatus,
} from '@floating-ui/react';
import PropTypes from 'prop-types';

import { useForwardedRef } from '@leafygreen-ui/hooks';
import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';

import {
  useContentNode,
  usePopoverPositioning,
  useReferenceElement,
} from '../Popover.hooks';
import { getPopoverStyles } from '../Popover.styles';
import {
  Align,
  Justify,
  PopoverComponentProps,
  PopoverProps,
} from '../Popover.types';
import {
  calculatePosition,
  getFloatingPlacement,
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
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`, `fit`.
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
      scrollContainer: scrollContainerProp,
      onToggle,
      ...rest
    }: PopoverProps,
    fwdRef,
  ) => {
    const popoverRef = useForwardedRef(fwdRef, null);

    const {
      portalContainer: portalContainerCtxVal,
      scrollContainer: scrollContainerCtxVal,
      // setIsPopoverOpen,
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
      HiddenPlaceholder,
      placeholderRef,
      referenceElement,
      renderHiddenPlaceholder,
    } = useReferenceElement(refEl);
    const { contentNode, ContentWrapper, setContentNode } = useContentNode();

    const {
      contentElDocumentPos,
      contentElViewportPos,
      isReadyToRender,
      referenceElDocumentPos,
      referenceElViewportPos,
    } = usePopoverPositioning({
      active,
      adjustOnMutation,
      align,
      contentNode,
      justify,
      referenceElement,
      scrollContainer,
    });

    const floatingPlacement = getFloatingPlacement(align, justify);
    const { context, floatingStyles, middlewareData, placement } = useFloating({
      elements: {
        reference: referenceElement,
        floating: popoverRef.current,
      },
      middleware: [
        offset(({ rects }) => {
          if (align === Align.CenterHorizontal) {
            return -rects.reference.height / 2 - rects.floating.height / 2;
          }

          if (align === Align.CenterVertical) {
            return -rects.reference.width / 2 - rects.floating.width / 2;
          }

          return spacing;
        }),
        flip(),
        hide(),
      ],
      open: active && isReadyToRender,
      placement: floatingPlacement,
      strategy: 'absolute',
      transform: false,
      whileElementsMounted: autoUpdate,
    });

    const { status } = useTransitionStatus(context);

    useEffect(() => {
      // @ts-expect-error
      popoverRef.current?.addEventListener('toggle', onToggle);
      // @ts-expect-error
      return () => popoverRef.current?.removeEventListener('toggle', onToggle);
    }, []);

    useEffect(() => {
      if (active) {
        // @ts-expect-error
        popoverRef.current?.showPopover();
      } else {
        // @ts-expect-error
        popoverRef.current?.hidePopover();
      }
    }, [active]);

    if (!isReadyToRender) {
      return null;
    }

    const { align: windowSafeAlign, justify: windowSafeJustify } =
      calculatePosition({
        useRelativePositioning: !usePortal,
        spacing,
        align,
        justify,
        referenceElViewportPos,
        referenceElDocumentPos,
        contentElViewportPos,
        contentElDocumentPos,
        scrollContainer,
      });

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
      <>
        {renderHiddenPlaceholder && <HiddenPlaceholder ref={placeholderRef} />}
        <div
          {...rest}
          ref={popoverRef}
          // @ts-expect-error
          popover="auto"
          className={getPopoverStyles({
            className,
            floatingStyles,
            hidePopover: middlewareData.hide?.referenceHidden,
            spacing,
          })}
          data-placement={placement}
          data-status={status}
        >
          <ContentWrapper ref={setContentNode}>
            {renderChildren()}
          </ContentWrapper>
        </div>
      </>
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
