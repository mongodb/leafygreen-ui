import React, { useMemo, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { css, cx } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';
import {
  useViewportSize,
  useMutationObserver,
  useElementNode,
  useIsomorphicLayoutEffect,
  useObjectDependency,
  usePrevious,
} from '@leafygreen-ui/hooks';
import { Align, Justify, PopoverProps } from './types';
import {
  calculatePosition,
  getElementViewportPosition,
  getElementDocumentPosition,
} from './positionUtils';

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  opacity: 0;
`;

const mutationOptions = {
  // If attributes changes, such as className which affects layout
  attributes: true,
  // Watch if text changes in the node
  characterData: true,
  // Watch for any immediate children are modified
  childList: true,
  // Extend watching to entire sub tree to make sure we catch any modifications
  subtree: true,
};

/**
 * # Popover
 *
 * React Component that handles positioning of content relative to another element.
 *
 * ```
<button>
  <Popover active={true}>Hello world!</Popover>
</button>
```
 * @param props.children Content to appear inside of Popover container.
 * @param props.active Boolean to describe whether or not Popover is active.
 * @param props.className Classname applied to Popover container.
 * @param props.align Alignment of Popover component relative to another element: `top`, `bottom`, `left`, `right`, `center-horizontal`, `center-vertical`.
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`, `fit`.
 * @param props.refEl Reference element that Popover component should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.portalClassName Classname applied to root element of the portal.
 * @param props.adjustOnMutation Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
 */
function Popover({
  active = false,
  usePortal = true,
  spacing = 10,
  align = Align.Bottom,
  justify = Justify.Start,
  adjustOnMutation = false,
  children,
  className,
  portalClassName,
  refEl,
  ...rest
}: PopoverProps) {
  const [placeholderNode, setPlaceholderNode] = useElementNode();
  const [contentNode, setContentNode] = useElementNode();
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);

  // To remove StrictMode warnings produced by react-transition-group we need
  // to pass in a useRef object to the <Transition> component.
  // To do so we're shadowing the contentNode onto this nodeRef as
  // <Transition> only accepts useRef objects.
  const contentNodeRef = React.useRef(contentNode);
  contentNodeRef.current = contentNode;

  let referenceElement: HTMLElement | null = null;

  if (refEl && refEl.current) {
    referenceElement = refEl.current;
  } else if (placeholderNode) {
    const parent = placeholderNode.parentNode;

    if (parent && parent instanceof HTMLElement) {
      referenceElement = parent;
    }
  }

  const viewportSize = useViewportSize();

  const lastTimeRefElMutated = useMutationObserver(
    referenceElement,
    mutationOptions,
    () => Date.now(),
    adjustOnMutation,
  );

  const lastTimeContentElMutated = useMutationObserver(
    contentNode,
    mutationOptions,
    () => Date.now(),
    adjustOnMutation,
  );

  // We don't memoize these values as they're reliant on scroll positioning
  const referenceElViewportPos = useObjectDependency(
    getElementViewportPosition(referenceElement),
  );
  const contentElViewportPos = useObjectDependency(
    getElementViewportPosition(contentNode),
  );

  const referenceElDocumentPos = useObjectDependency(
    useMemo(
      () => getElementDocumentPosition(referenceElement),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        referenceElement,
        viewportSize,
        lastTimeRefElMutated,
        active,
        align,
        justify,
        forceUpdateCounter,
      ],
    ),
  );

  const contentElDocumentPos = useObjectDependency(
    useMemo(
      () => getElementDocumentPosition(contentNode),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        contentNode,
        viewportSize,
        lastTimeContentElMutated,
        active,
        align,
        justify,
        forceUpdateCounter,
      ],
    ),
  );

  const prevJustify = usePrevious<Justify>(justify);
  const prevAlign = usePrevious<Align>(align);

  const layoutMightHaveChanged =
    (prevJustify !== justify &&
      (justify === Justify.Fit || prevJustify === Justify.Fit)) ||
    (prevAlign !== align && justify === Justify.Fit);

  useIsomorphicLayoutEffect(() => {
    // justify={Justify.Fit} can cause the content's height/width to change
    // If we're switching to/from Fit, force an extra pass to make sure the popover is positioned correctly.
    // Also if we're switching between alignments and have Justify.Fit, it may switch between setting the width and
    // setting the height, so force an update in that case as well.
    if (layoutMightHaveChanged) {
      setForceUpdateCounter(n => n + 1);
    }
  }, [layoutMightHaveChanged]);

  // Don't render the popover initially since computing the position depends on
  // the window which isn't available if the component is rendered on server side.
  const [shouldRender, setShouldRender] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return null;
  }

  const {
    align: windowSafeAlign,
    justify: windowSafeJustify,
    positionCSS,
  } = calculatePosition({
    useRelativePositioning: !usePortal,
    spacing,
    align,
    justify,
    referenceElViewportPos,
    referenceElDocumentPos,
    contentElViewportPos,
    contentElDocumentPos,
  });

  const activeStyle = css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    position: ${usePortal ? '' : 'absolute'};
    pointer-events: initial;
  `;

  const Root = usePortal ? Portal : Fragment;
  const rootProps = usePortal ? { className: portalClassName } : {};

  const renderedChildren = (() => {
    if (!children) {
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
  })();

  return (
    <Transition
      nodeRef={contentNodeRef}
      in={active}
      timeout={{ exit: 150 }}
      mountOnEnter
      unmountOnExit
    >
      {(state: string) => (
        <>
          <div
            ref={setPlaceholderNode}
            className={css`
              display: none;
            `}
          />
          <Root {...rootProps}>
            <div
              {...rest}
              ref={setContentNode}
              className={cx(
                rootPopoverStyle,
                css(positionCSS),
                { [activeStyle]: state === 'entered' },
                className,
              )}
            >
              {renderedChildren}
            </div>
          </Root>
        </>
      )}
    </Transition>
  );
}

Popover.displayName = 'Popover';

Popover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  usePortal: PropTypes.bool,
  portalClassName: PropTypes.string,
  spacing: PropTypes.number,
  adjustOnMutation: PropTypes.bool,
};

Popover.defaultProps = {
  children: undefined,
  align: Align.Bottom,
  justify: Justify.Start,
  active: false,
  usePortal: true,
  spacing: 10,
  adjustOnMutation: false,
};

export default Popover;
