import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  Fragment,
  ReactNode,
  RefObject,
  ReactElement,
} from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { debounce } from 'lodash';
import { emotion } from '@leafygreen-ui/lib';
import { calculatePosition, getElementPosition } from './positionUtils';

const { css, cx } = emotion;

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  pointer-events: none;
  opacity: 0;
`;

export enum Align {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum Justify {
  Start = 'start',
  Middle = 'middle',
  End = 'end',
}

interface PopoverProps {
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
  align: Align;

  /**
   * Determines the justification of the popover content relative to the trigger element
   *
   * default: `start`
   */
  justify: Justify;

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
  usePortal: boolean;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing: number;
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
 * ---
 * @param props.children Content to appear inside of Popover container.
 * @param props.active Boolean to describe whether or not Popover is active.
 * @param props.className Classname applied to Popover container.
 * @param props.align Alignment of Popover component relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Popover component should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 */
function Popover({
  children,
  active,
  className,
  usePortal,
  spacing,
  align,
  justify,
  refEl,
  ...rest
}: PopoverProps): ReactElement {
  const placeholderRef: React.RefObject<HTMLDivElement> = useRef(null);
  const contentRef: React.RefObject<HTMLDivElement> = useRef(null);

  // We use this to force a re-render on window resize
  const [windowUpdateVal, setWindowUpdateVal] = useState(true);

  useEffect(() => {
    const forceUpdate = debounce(
      () => setWindowUpdateVal(!windowUpdateVal),
      100,
    );

    window.addEventListener('resize', forceUpdate);

    return () => window.removeEventListener('resize', forceUpdate);
  });

  let referenceElement: HTMLElement | null = null;

  if (refEl && refEl.current) {
    referenceElement = refEl.current;
  } else if (placeholderRef.current) {
    const parent = placeholderRef.current.parentNode;

    if (parent && parent instanceof HTMLElement) {
      referenceElement = parent;
    }
  }

  const referenceElPos = useMemo(() => getElementPosition(referenceElement), [
    referenceElement,
    windowUpdateVal,
  ]);

  const contentElPos = useMemo(() => getElementPosition(contentRef.current), [
    contentRef.current,
    windowUpdateVal,
  ]);

  const position = css(
    calculatePosition({
      useRelativePositioning: !usePortal,
      spacing,
      align,
      justify,
      referenceElPos,
      contentElPos,
    }),
  );

  const activeStyle = css`
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    position: ${usePortal ? '' : 'absolute'};
  `;

  const contentStyle = cx(
    rootPopoverStyle,
    position,
    { [activeStyle]: active },
    className,
  );

  const Root = usePortal ? Portal : Fragment;

  return (
    <>
      <div
        ref={placeholderRef}
        className={css`
          display: none;
        `}
      />
      <Root>
        <div {...rest} ref={contentRef} className={contentStyle}>
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
};

Popover.defaultProps = {
  children: undefined,
  align: Align.Bottom,
  justify: Justify.Start,
  active: false,
  usePortal: true,
  spacing: 10,
};

export default Popover;
