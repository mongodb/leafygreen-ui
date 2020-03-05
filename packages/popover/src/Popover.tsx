import React, { useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import Portal from '@leafygreen-ui/portal';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  useViewportSize,
  useMutationObserver,
  useElementNode,
} from '@leafygreen-ui/hooks';
import { Align, Justify, PopoverProps } from './types';
import { calculatePosition, getElementPosition } from './positionUtils';

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
 * @param props.align Alignment of Popover component relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Popover component should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
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
  refEl,
  ...rest
}: PopoverProps) {
  const [placeholderNode, setPlaceholderNode] = useElementNode();
  const [contentNode, setContentNode] = useElementNode();

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

  const referenceElPos = useMemo(() => getElementPosition(referenceElement), [
    referenceElement,
    viewportSize,
    lastTimeRefElMutated,
    active,
    align,
    justify,
  ]);

  const contentElPos = useMemo(() => getElementPosition(contentNode), [
    contentNode,
    viewportSize,
    lastTimeContentElMutated,
    active,
    align,
    justify,
  ]);

  const {
    align: windowSafeAlign,
    justify: windowSafeJustify,
    positionCSS,
  } = calculatePosition({
    useRelativePositioning: !usePortal,
    spacing,
    align,
    justify,
    referenceElPos,
    contentElPos,
  });

  const activeStyle = css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    position: ${usePortal ? '' : 'absolute'};
    pointer-events: initial;
  `;

  const Root = usePortal ? Portal : Fragment;

  const renderedChildren = (() => {
    if (!children) {
      return null;
    }

    if (typeof children === 'function') {
      return children({
        align: windowSafeAlign,
        justify: windowSafeJustify,
        referenceElPos,
      });
    }

    return children;
  })();

  return (
    <Transition in={active} timeout={{ exit: 150 }} mountOnEnter unmountOnExit>
      {(state: string) => (
        <>
          <div
            ref={setPlaceholderNode}
            className={css`
              display: none;
            `}
          />
          <Root>
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
  refEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  usePortal: PropTypes.bool,
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
