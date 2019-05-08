import React, { Component, Fragment, ReactNode, RefObject } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { emotion } from '@leafygreen-ui/lib';

const { css, cx } = emotion;

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  pointer-events: none;
  opacity: 0;
`;

export enum Alignment {
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

// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
export enum Justification {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  CenterVertical = 'center-vertical',
  CenterHorizontal = 'center-horizontal',
}

interface RefPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

interface AbsolutePositionObject {
  top?: string | 0;
  bottom?: string | 0;
  left?: string | 0;
  right?: string | 0;
}

interface AbstractPosition {
  alignment?: Alignment;
  justification?: Justification;
}

interface Props {
  /**
   * Content that will appear inside of the popover component.
   */

  children?: ReactNode;

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
  align: Alignment;

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
  usePortal?: boolean;

  /**
   * Specifies the amount of spacing (in pixels) between the trigger element and the Popover content.
   *
   * default: `10`
   */
  spacing: number;
}
interface State {
  windowHeight: number;
  windowWidth: number;
  hasMounted: boolean;
  referenceElPos: RefPosition;
  contentElPos: RefPosition;
  referenceElement: HTMLElement | null;
}

const defaultRefPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

// Constructs the transform origin for any given pair of alignment / justification
function getTransformOrigin({
  alignment,
  justification,
}: AbstractPosition): string {
  let x = '';
  let y = '';

  switch (alignment) {
    case Alignment.Left:
      x = 'right';
      break;

    case Alignment.Right:
      x = 'left';
      break;

    case Alignment.Bottom:
      y = 'top';
      break;

    case Alignment.Top:
      y = 'bottom';
      break;
  }

  switch (justification) {
    case Justification.Left:
      x = 'left';
      break;

    case Justification.Right:
      x = 'right';
      break;

    case Justification.Bottom:
      y = 'bottom';
      break;

    case Justification.Top:
      y = 'top';
      break;

    case Justification.CenterHorizontal:
      x = 'center';
      break;

    case Justification.CenterVertical:
      y = 'center';
      break;
  }

  return `${x} ${y}`;
}

// Get transform styles for position object
function getTransform(alignment: Alignment, transformAmount: number): string {
  const scaleAmount = 0.8;

  switch (alignment) {
    case Alignment.Top:
      return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

    case Alignment.Bottom:
      return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

    case Alignment.Left:
      return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

    case Alignment.Right:
      return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
  }
}

/**
 * # Popover
 *
 * React Component that handles positioning of content relative to another element.
 *
 * `''
<button>
  <Popover active={true}>Hello world!</Popover>
</button>
    `''
 * ---
 * @param props.children Content to appear inside of Popover container.
 * @param props.active Boolean to describe whether or not Popover is active.
 * @param props.className Classname applied to Popover container.
 * @param props.align Alignment of Popover component relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Popover component relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Popover component should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 *
 *
 */
export default class Popover extends Component<Props, State> {
  static displayName = 'Popover';

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    className: PropTypes.string,
    align: PropTypes.oneOf(Object.values(Alignment)),
    justify: PropTypes.oneOf(Object.values(Justify)),
    refEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    usePortal: PropTypes.bool,
    spacing: PropTypes.number,
  };

  static defaultProps: Props = {
    align: Alignment.Bottom,
    justify: Justify.Start,
    active: false,
    usePortal: true,
    spacing: 10,
  };

  state: State = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
    referenceElPos: defaultRefPosition,
    contentElPos: defaultRefPosition,
    referenceElement: null,
  };

  componentDidMount() {
    this.setState({ hasMounted: true });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { align, justify, active } = this.props;
    const {
      windowWidth,
      windowHeight,
      referenceElement,
      referenceElPos,
    } = this.state;

    const posPropsUpdated =
      prevProps.active !== active ||
      prevProps.align !== align ||
      prevProps.justify !== justify;

    const windowUpdated =
      prevState.windowWidth !== windowWidth ||
      prevState.windowHeight !== windowHeight;

    if (!referenceElement || !referenceElPos) {
      this.setReferenceElement();
    }

    if (posPropsUpdated || windowUpdated) {
      const newReferenceElPos = this.getRefPosition(referenceElement);
      const contentEl = this.contentRef && this.contentRef.current;

      if (!contentEl) {
        this.setState({ referenceElPos: newReferenceElPos });

        return;
      }

      this.setState({
        contentElPos: this.getRefPosition(contentEl),
        referenceElPos: newReferenceElPos,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState(
      {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      },
      () => {
        const contentEl = this.contentRef.current;

        if (contentEl && !this.state.contentElPos) {
          this.setState({
            contentElPos: this.getRefPosition(contentEl),
          });
        }
      },
    );
  };

  // Sets the element to position relative to based on passed props,
  // and stores it, and it's position in state.
  setReferenceElement(): void {
    const { refEl: passedRef } = this.props;
    const { referenceElement, referenceElPos } = this.state;

    if (referenceElement) {
      if (!referenceElPos) {
        this.setState({
          referenceElPos: this.getRefPosition(referenceElement),
        });
      }

      return;
    }

    const newReferenceElement = (() => {
      if (passedRef && passedRef.current) {
        return passedRef.current;
      }

      if (this.placeholderRef && this.placeholderRef.current) {
        const parent = this.placeholderRef.current.parentNode;

        if (parent && parent instanceof HTMLElement) {
          return parent;
        }
      }

      return null;
    })();

    this.setState({
      referenceElement: newReferenceElement,
      referenceElPos: this.getRefPosition(newReferenceElement),
    });
  }

  // Gets top offset, left offset, width and height dimensions for a node
  getRefPosition(element: HTMLElement | null): RefPosition {
    if (!element) {
      return defaultRefPosition;
    }

    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { offsetHeight: height, offsetWidth: width } = element;

    return { top, bottom, left, right, height, width };
  }

  // Returns the style object that is used to position and transition the popover component
  calculatePosition() {
    const { usePortal, spacing, align } = this.props;
    const { referenceElement, contentElPos } = this.state;

    // Forced second render to make sure that
    // we have access to refs
    if (!this.state.hasMounted) {
      return;
    }

    if (!referenceElement) {
      this.setReferenceElement();
      return;
    }

    if (!contentElPos) {
      const contentEl = this.contentRef.current;

      if (contentEl) {
        this.setState({
          contentElPos: this.getRefPosition(contentEl),
        });
      }

      return;
    }

    const alignment = this.getWindowSafeAlignment(align);
    const justification = this.getJustification(alignment);

    const transformOrigin = getTransformOrigin({
      alignment,
      justification,
    });

    const transform = getTransform(alignment, spacing);

    if (!usePortal) {
      return {
        ...this.calcPositionWithoutPortal({ alignment, justification }),
        transformOrigin,
        transform,
      };
    }

    return {
      top: this.calcTop({ alignment, justification }),
      left: this.calcLeft({ alignment, justification }),
      transformOrigin,
      transform,
    };
  }

  // Determines the alignment to render based on an order of alignment fallbacks
  // Returns the first alignment that doesn't collide with the window,
  // defaulting to the align prop if all alignments fail.
  getWindowSafeAlignment(align: Alignment): Alignment {
    const alignments: {
      top: ReadonlyArray<Alignment>;
      bottom: ReadonlyArray<Alignment>;
      left: ReadonlyArray<Alignment>;
      right: ReadonlyArray<Alignment>;
    } = {
      top: [Alignment.Top, Alignment.Bottom],
      bottom: [Alignment.Bottom, Alignment.Top],
      left: [Alignment.Left, Alignment.Right],
      right: [Alignment.Right, Alignment.Left],
    };

    return (
      alignments[align].find(candidate => this.checkAlignment(candidate)) ||
      align
    );
  }

  // Determines the justification to render based on an order of justification fallbacks
  // Returns the first justification that doesn't collide with the window,
  // defaulting to the justify prop if all justifications fail.
  getJustification(alignment: Alignment): Justification {
    const { justify } = this.props;

    let justifications: {
      start: ReadonlyArray<Justification>;
      middle: ReadonlyArray<Justification>;
      end: ReadonlyArray<Justification>;
    };

    switch (alignment) {
      case 'left':
      case 'right': {
        justifications = {
          start: [
            Justification.Top,
            Justification.Bottom,
            Justification.CenterVertical,
          ],
          middle: [
            Justification.CenterVertical,
            Justification.Bottom,
            Justification.Top,
          ],
          end: [
            Justification.Bottom,
            Justification.Top,
            Justification.CenterVertical,
          ],
        };
        break;
      }

      case 'top':
      case 'bottom':
      default: {
        justifications = {
          start: [
            Justification.Left,
            Justification.Right,
            Justification.CenterHorizontal,
          ],
          middle: [
            Justification.CenterHorizontal,
            Justification.Right,
            Justification.Left,
          ],
          end: [
            Justification.Right,
            Justification.Left,
            Justification.CenterHorizontal,
          ],
        };
        break;
      }
    }

    return (
      justifications[justify].find(candidate => {
        return this.checkJustification(candidate);
      }) || justifications[justify][0]
    );
  }

  // Checks that an alignment will not cause the popover to collide with the window.
  checkAlignment(alignment: Alignment): boolean {
    const top = this.calcTop({ alignment });
    const left = this.calcLeft({ alignment });

    if (['top', 'bottom'].includes(alignment)) {
      return this.checkVerticalWindowCollision(top);
    }

    if (['left', 'right'].includes(alignment)) {
      return this.checkHorizontalWindowCollision(left);
    }

    return false;
  }

  // Checks that a justification will not cause the popover to collide with the window.
  checkJustification(justification: Justification): boolean {
    const top = this.calcTop({ justification });
    const left = this.calcLeft({ justification });

    if (['top', 'bottom', 'center-vertical'].includes(justification)) {
      return this.checkVerticalWindowCollision(top);
    }

    if (['left', 'right', 'center-horizontal'].includes(justification)) {
      return this.checkHorizontalWindowCollision(left);
    }

    return false;
  }

  // Check if horizontal position collides with edge of window
  checkHorizontalWindowCollision(left: number): boolean {
    const { contentElPos, windowWidth } = this.state;
    const tooWide = left + contentElPos.width > windowWidth;

    return !(left < 0 || tooWide);
  }

  // Check if vertical position collides with edge of window
  checkVerticalWindowCollision(top: number): boolean {
    const { contentElPos, windowHeight } = this.state;
    const tooTall = top + contentElPos.height > windowHeight;

    return !(top < 0 || tooTall);
  }

  // Returns the 'top' position in pixels for a valid alignment or justification.
  calcTop({ alignment, justification }: AbstractPosition) {
    const { spacing } = this.props;
    const { referenceElPos, contentElPos } = this.state;

    switch (justification) {
      case Justification.Top:
        return referenceElPos.top;

      case Justification.Bottom:
        return referenceElPos.top + referenceElPos.height - contentElPos.height;

      case Justification.CenterVertical:
        return (
          referenceElPos.top +
          referenceElPos.height / 2 -
          contentElPos.height / 2
        );
    }

    switch (alignment) {
      case Alignment.Top:
        return referenceElPos.top - contentElPos.height - spacing;

      case Alignment.Bottom:
      default:
        return referenceElPos.top + referenceElPos.height + spacing;
    }
  }

  // Returns the 'left' position in pixels for a valid alignment or justification.
  calcLeft({ alignment, justification }: AbstractPosition) {
    const { spacing } = this.props;
    const { referenceElPos, contentElPos } = this.state;

    switch (alignment) {
      case Alignment.Left:
        return referenceElPos.left - contentElPos.width - spacing;

      case Alignment.Right:
        return referenceElPos.left + referenceElPos.width + spacing;
    }

    switch (justification) {
      case Justification.Right:
        return referenceElPos.left + referenceElPos.width - contentElPos.width;

      case Justification.CenterHorizontal:
        return (
          referenceElPos.left +
          referenceElPos.width / 2 -
          contentElPos.width / 2
        );

      case Justification.Left:
      default:
        return referenceElPos.left;
    }
  }

  // Returns positioning for an element absolutely positioned within it's relative parent
  calcPositionWithoutPortal({ alignment, justification }: AbstractPosition) {
    const { spacing } = this.props;
    const { referenceElPos, contentElPos } = this.state;
    const positionObject: AbsolutePositionObject = {};

    switch (alignment) {
      case Alignment.Top:
        positionObject.bottom = `calc(100% + ${spacing}px)`;
        break;

      case Alignment.Bottom:
        positionObject.top = `calc(100% + ${spacing}px)`;
        break;

      case Alignment.Left:
        positionObject.right = `calc(100% + ${spacing}px)`;
        break;

      case Alignment.Right:
        positionObject.left = `calc(100% + ${spacing}px)`;
        break;
    }

    switch (justification) {
      case Justification.Top:
        positionObject.top = 0;
        break;

      case Justification.Bottom:
        positionObject.bottom = 0;
        break;

      case Justification.Left:
        positionObject.left = 0;
        break;

      case Justification.Right:
        positionObject.right = 0;
        break;

      case Justification.CenterHorizontal:
        positionObject.left = `${referenceElPos.width / 2 -
          contentElPos.width / 2}px`;
        break;

      case Justification.CenterVertical:
        positionObject.top = `${referenceElPos.height / 2 -
          contentElPos.height / 2}px`;
        break;
    }

    return positionObject;
  }

  contentRef = React.createRef<HTMLDivElement>();
  placeholderRef = React.createRef<HTMLDivElement>();

  render() {
    const { children, active, className, usePortal, ...rest } = this.props;

    delete rest.refEl;

    const position = this.calculatePosition();

    const Root = usePortal ? Portal : Fragment;

    const activeStyle = active && {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      position: !usePortal && 'absolute',
    };

    const style = css({ ...position, ...activeStyle });

    return (
      <>
        <div
          ref={this.placeholderRef}
          className={css`
            display: none;
          `}
        />
        <Root>
          <div
            {...rest}
            ref={this.contentRef}
            className={cx(rootPopoverStyle, style, className)}
          >
            {children}
          </div>
        </Root>
      </>
    );
  }
}
