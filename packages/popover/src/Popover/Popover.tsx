import React, { forwardRef, Fragment } from 'react';
import { Transition } from 'react-transition-group';
import {
  autoUpdate,
  flip,
  offset,
  useFloating,
  useMergeRefs,
} from '@floating-ui/react';
import PropTypes from 'prop-types';

import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';

import { useContentNode, useReferenceElement } from '../Popover.hooks';
import {
  contentClassName,
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
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
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

    const Root = usePortal ? Portal : Fragment;
    const portalProps = {
      className: portalContainer ? undefined : portalClassName,
      container: portalContainer ?? undefined,
      portalRef,
    };
    const rootProps = usePortal ? portalProps : {};

    const {
      placeholderRef,
      referenceElement,
      referenceElDocumentPos,
      renderHiddenPlaceholder,
    } = useReferenceElement(refEl);
    const { contentNodeRef, setContentNode } = useContentNode();

    const { context, floatingStyles, placement, refs } = useFloating({
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
        flip(),
      ],
      open: active,
      placement: getFloatingPlacement(align, justify),
      strategy: 'absolute',
      transform: false,
      whileElementsMounted: adjustOnMutation ? autoUpdate : undefined,
    });

    const popoverRef = useMergeRefs<HTMLDivElement>([refs.setFloating, fwdRef]);

    const { align: windowSafeAlign, justify: windowSafeJustify } =
      getWindowSafePlacementValues(placement);
    const extendedPlacement = getExtendedPlacementValue({
      placement,
      align,
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
      <Transition
        nodeRef={contentNodeRef}
        in={context.open}
        timeout={TRANSITION_DURATION}
        mountOnEnter
        unmountOnExit
        appear
        onEntering={onEntering}
        onEnter={onEnter}
        onEntered={(...args) => {
          setIsPopoverOpen(true);
          onEntered?.(...args);
        }}
        onExiting={onExiting}
        onExit={onExit}
        onExited={(...args) => {
          setIsPopoverOpen(false);
          onExited?.(...args);
        }}
      >
        {state => (
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
                  placement: extendedPlacement,
                  popoverZIndex,
                  spacing,
                  state,
                })}
              >
                {/* We need to put `setContentNode` ref on this inner wrapper because
                placing the ref on the parent will create an infinite loop in some cases
                when dynamic styles are applied. */}
                <div ref={setContentNode} className={contentClassName}>
                  {renderChildren()}
                </div>
              </div>
            </Root>
          </>
        )}
      </Transition>
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
