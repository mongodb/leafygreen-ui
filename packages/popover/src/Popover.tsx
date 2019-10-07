import React, {
  useMemo,
  Fragment,
  ReactNode,
  RefObject,
  ReactElement,
} from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  useViewportSize,
  useMutationObserver,
  useElementNode,
} from '@leafygreen-ui/hooks';
import Align from './Align';
import Justify from './Justify';
import { calculatePosition, getElementPosition } from './positionUtils';

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  pointer-events: none;
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

export interface PopoverProps {
  /**
   * Content that will appear inside of the popover component.
   */
  children: ReactNode;

  /**
   * Determines the active state of the popover component
   *
   * default: `false`
   */
  active: boolean;

  /**
   * Class name applied to popover content container.
   */
  className?: string;

  /**
   * Determines the alignment of the popover content relative to the trigger element
   *
   * default: `bottom`
   */
  align?: Align;

  /**
   * Determines the justification of the popover content relative to the trigger element
   *
   * default: `start`
   */
  justify?: Justify;

  /**
   * A reference to the element against which the popover component will be positioned.
   */
  refEl?: RefObject<HTMLElement>;

  /**
   * Specifies that the popover content will appear portaled to the end of the DOM,
   * rather than in the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing?: number;

  /**
   * Should the Popover auto adjust its content when the DOM changes (using MutationObserver).
   *
   * default: false
   */
  adjustOnMutation?: boolean;

  setAlignment?: (
    alignment: Align,
  ) => void | React.Dispatch<React.SetStateAction<Align>>;

  setJustification?: (
    justification: string,
  ) => void | React.Dispatch<React.SetStateAction<string>>;
}

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
  setAlignment = () => {},
  setJustification = () => {},
  adjustOnMutation = false,
  children,
  className,
  refEl,
  ...rest
}: PopoverProps): ReactElement {
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

  const { alignment, justification, positionCSS } = calculatePosition({
    useRelativePositioning: !usePortal,
    spacing,
    align,
    justify,
    referenceElPos,
    contentElPos,
  });

  setAlignment(alignment);
  setJustification(justification);

  const activeStyle = css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    position: ${usePortal ? '' : 'absolute'};
    pointer-events: initial;
  `;

  const Root = usePortal ? Portal : Fragment;

  return (
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
            { [activeStyle]: active },
            className,
          )}
        >
          {children}
        </div>
      </Root>
    </>
  );
}

Popover.displayName = 'Popover';

Popover.propTypes = {
  children: PropTypes.node,
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
