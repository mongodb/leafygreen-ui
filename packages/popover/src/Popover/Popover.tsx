import React, { forwardRef, Fragment } from 'react';
import { Transition } from 'react-transition-group';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react';
import PropTypes from 'prop-types';

import { useMergeRefs } from '@leafygreen-ui/hooks';
import { usePopoverContext } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { spacing as spacingToken } from '@leafygreen-ui/tokens';

import {
  getExtendedPlacementValues,
  getFloatingPlacement,
  getOffsetValue,
  getWindowSafePlacementValues,
} from '../utils/positionUtils';

import {
  useContentNode,
  usePopoverProps,
  useReferenceElement,
} from './Popover.hooks';
import {
  contentClassName,
  getPopoverStyles,
  hiddenPlaceholderStyle,
  TRANSITION_DURATION,
} from './Popover.styles';
import {
  Align,
  DismissMode,
  Justify,
  PopoverComponentProps,
  PopoverProps,
  RenderMode,
} from './Popover.types';

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
 * @param props.renderMode Options to render the popover element: `inline`, `portal`, `top-layer`.
 * @param props.portalClassName Classname applied to root element of the portal.
 * @param props.portalContainer HTML element that the popover is portaled within.
 * @param props.portalRef A ref for the Portal element.
 * @param props.scrollContainer HTML ancestor element that's scrollable to position the popover accurately within scrolling containers.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverComponentProps>(
  (
    {
      active = false,
      adjustOnMutation = false,
      align = Align.Bottom,
      children,
      className,
      justify = Justify.Start,
      refEl,
      ...rest
    }: PopoverProps,
    fwdRef,
  ) => {
    const {
      renderMode,
      /** top layer props */
      dismissMode = DismissMode.Auto,
      onToggle,
      /** portal props */
      usePortal,
      portalClassName,
      portalContainer,
      portalRef,
      scrollContainer,
      /** react-transition-group props */
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      /** style props */
      popoverZIndex,
      spacing = spacingToken[100],
      ...restProps
    } = usePopoverProps(rest);
    const { setIsPopoverOpen } = usePopoverContext();

    /**
     * When `usePortal` is true and a `scrollContainer` is defined,
     * log a warning if the `portalContainer` is not inside of the `scrollContainer`.
     *
     * Note: If no `portalContainer` is provided,
     * the `Portal` component will create a `div` and append it to the body.
     */
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

    const { placeholderRef, referenceElement, referenceElDocumentPos } =
      useReferenceElement(refEl, scrollContainer);
    const { contentNodeRef, setContentNode } = useContentNode();

    const { context, floatingStyles, placement, refs } = useFloating({
      elements: {
        reference: referenceElement,
      },
      middleware: [
        offset(
          ({ rects }) => getOffsetValue(align, spacing, rects),
          [align, spacing],
        ),
        flip({
          mainAxis: adjustOnMutation,
          crossAxis: adjustOnMutation,
        }),
      ],
      open: active,
      placement: getFloatingPlacement(align, justify),
      strategy: 'absolute',
      transform: false,
      whileElementsMounted: autoUpdate,
    });

    const popoverRef = useMergeRefs<HTMLDivElement>([refs.setFloating, fwdRef]);

    const { align: windowSafeAlign, justify: windowSafeJustify } =
      getWindowSafePlacementValues(placement);
    const { placement: extendedPlacement, transformAlign } =
      getExtendedPlacementValues({
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

    const handleEnter = (isAppearing: boolean) => {
      console.log('[POPOVER] handleEnter');

      if (renderMode === RenderMode.TopLayer) {
        // @ts-expect-error - Popover API not currently supported in react v18 https://github.com/facebook/react/pull/27981
        refs.floating.current?.showPopover?.();
        // @ts-expect-error - `toggle` event not supported pre-typescript v5
        refs.floating.current?.addEventListener('toggle', onToggle);
      }
      setIsPopoverOpen(true);
      onEnter?.(isAppearing);
    };

    const handleExited = () => {
      console.log('[POPOVER] handleExited');

      if (renderMode === RenderMode.TopLayer) {
        console.log('[POPOVER] removing event listener');
        // @ts-expect-error - `toggle` event not supported pre-typescript v5
        refs.floating.current?.removeEventListener('toggle', onToggle);
        // @ts-expect-error - Popover API not currently supported in react v18 https://github.com/facebook/react/pull/27981
        refs.floating.current?.hidePopover?.();
      }
      setIsPopoverOpen(false);
      onExited?.();
    };

    return (
      <>
        <span ref={placeholderRef} className={hiddenPlaceholderStyle} />
        <Transition
          nodeRef={contentNodeRef}
          in={context.open}
          timeout={{
            appear: TRANSITION_DURATION,
            enter: 0,
            exit: TRANSITION_DURATION,
          }}
          onEnter={handleEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={handleExited}
          mountOnEnter
          unmountOnExit
          appear
        >
          {state => (
            <>
              {/* Using <span> as placeholder to prevent validateDOMNesting warnings
            Warnings will still show up if `usePortal` is false */}
              <Root {...rootProps}>
                <div
                  ref={popoverRef}
                  className={getPopoverStyles({
                    className,
                    floatingStyles,
                    placement: extendedPlacement,
                    popoverZIndex,
                    spacing,
                    state,
                    transformAlign,
                  })}
                  // @ts-expect-error - `popover` attribute is not typed in current version of `@types/react` https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69670
                  // eslint-disable-next-line react/no-unknown-property
                  popover={
                    renderMode === RenderMode.TopLayer ? dismissMode : undefined
                  }
                  {...restProps}
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
  renderMode: PropTypes.oneOf(Object.values(RenderMode)),
  /// @ts-ignore Types of property '[nominalTypeHack]' are incompatible. - error only in R18
  portalClassName: PropTypes.string,
  spacing: PropTypes.number,
  adjustOnMutation: PropTypes.bool,
};
