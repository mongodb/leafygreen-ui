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

type RefPosition = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
};

type AbsolutePositionObject = {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
};

const defaultRefPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
};

type Alignment = 'top' | 'bottom' | 'left' | 'right';
type Justify = 'start' | 'middle' | 'end';

// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
type Justification =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center-vertical'
  | 'center-horizontal';

type AbstractPosition = {
  alignment?: Alignment;
  justification?: Justification;
};

type Props = {
  children?: ReactNode;
  active?: boolean;
  className?: string;
  align?: Alignment;
  justify?: Justify;
  refEl?: RefObject<HTMLElement>;
  withoutPortal?: boolean;
  getUpdatePosition?: Function;
};

type DefaultProps = {
  align: Alignment;
  justify: Justify;
  active: boolean;
};

type State = {
  windowHeight: number;
  windowWidth: number;
  hasMounted: boolean;
  referenceElPos: RefPosition;
  contentElPos: RefPosition;
  referenceElement: HTMLElement | null;
};

export default class Popover extends Component<Props & DefaultProps, State> {
  static displayName = 'Popover';

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    className: PropTypes.string,
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    justify: PropTypes.oneOf(['start', 'middle', 'end']),
    refEl: PropTypes.object,
    withoutPortal: PropTypes.bool,
    getUpdatePosition: PropTypes.func,
  };

  static defaultProps: DefaultProps = {
    align: 'bottom',
    justify: 'start',
    active: false,
  };

  state = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
    referenceElPos: defaultRefPosition,
    contentElPos: defaultRefPosition,
    referenceElement: null,
  };

  componentDidMount() {
    this.setReferenceElement();
    this.setState({ hasMounted: true });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { align, justify } = this.props;
    const {
      windowWidth,
      windowHeight,
      referenceElement,
      referenceElPos,
    } = this.state;

    const posPropsUpdated =
      prevProps.align !== align || prevProps.justify !== justify;

    const windowUpdated =
      prevState.windowWidth !== windowWidth ||
      prevState.windowHeight !== windowHeight;

    if (!referenceElement || !referenceElPos) {
      this.setReferenceElement();
    }

    if (posPropsUpdated || windowUpdated) {
      this.updateReferencePositions();
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
        this.setContentElPosition();
      },
    );
  };

  updateReferencePositions() {
    const { referenceElement } = this.state;
    const newReferenceElPos = this.getRefPosition(referenceElement);
    const contentEl = this.contentRef && this.contentRef.current;

    if (!contentEl) {
      this.setState({
        referenceElPos: newReferenceElPos,
      });

      return;
    }

    this.setState({
      contentElPos: this.getRefPosition(contentEl),
      referenceElPos: newReferenceElPos,
    });
  }

  // Sets the element to position relative to based on passed props,
  // and stores it, and it's position in state.
  setReferenceElement() {
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

  setContentElPosition() {
    const { contentElPos } = this.state;
    const contentEl = this.contentRef && this.contentRef.current;

    if (contentEl && !contentElPos) {
      this.setState({
        contentElPos: this.getRefPosition(contentEl),
      });
    }
  }

  // Gets top offset, left offset, width and height dimensions for a node
  getRefPosition(element: HTMLElement | null) {
    if (!element) {
      return defaultRefPosition;
    }

    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { offsetHeight: height, offsetWidth: width } = element;

    return { top, bottom, left, right, height, width };
  }

  // Returns the style object that is used to position and transition the popover component
  calculatePosition() {
    const { withoutPortal } = this.props;
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
      this.setContentElPosition();
      return;
    }

    const alignment = this.getAlignment();
    const justification = this.getJustification(alignment);

    const transformOrigin = this.getTransformOrigin({
      alignment,
      justification,
    });

    const transform = this.getTransform(alignment);

    if (withoutPortal) {
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
  getAlignment() {
    const { align } = this.props;

    const alignments: {
      top: Array<Alignment>;
      bottom: Array<Alignment>;
      left: Array<Alignment>;
      right: Array<Alignment>;
    } = {
      top: ['top', 'bottom'],
      bottom: ['bottom', 'top'],
      left: ['left', 'right'],
      right: ['right', 'left'],
    };

    return (
      alignments[align].find(candidate => this.checkAlignment(candidate)) ||
      align
    );
  }

  // Determines the justification to render based on an order of justification fallbacks
  // Returns the first justification that doesn't collide with the window,
  // defaulting to the justify prop if all justifications fail.
  getJustification(alignment: Alignment) {
    const { justify } = this.props;

    let justifications: {
      start: Array<Justification>;
      middle: Array<Justification>;
      end: Array<Justification>;
    };

    switch (alignment) {
      case 'left':
      case 'right': {
        justifications = {
          start: ['top', 'bottom', 'center-vertical'],
          middle: ['center-vertical', 'bottom', 'top'],
          end: ['bottom', 'top', 'center-vertical'],
        };
        break;
      }

      case 'top':
      case 'bottom':
      default: {
        justifications = {
          start: ['left', 'right', 'center-horizontal'],
          middle: ['center-horizontal', 'right', 'left'],
          end: ['right', 'left', 'center-horizontal'],
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
  checkAlignment(alignment: Alignment) {
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
  checkJustification(justification: Justification) {
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
  checkHorizontalWindowCollision(left: number) {
    const { contentElPos } = this.state;
    const tooWide = left + contentElPos.width > this.state.windowWidth;

    return !(left < 0 || tooWide);
  }

  // Check if vertical position collides with edge of window
  checkVerticalWindowCollision(top: number) {
    const { contentElPos } = this.state;
    const tooTall = top + contentElPos.height > this.state.windowHeight;

    return !(top < 0 || tooTall);
  }

  // Returns the 'top' position in pixels for a valid alignment or justification.
  calcTop({ alignment, justification }: AbstractPosition) {
    const { referenceElPos, contentElPos } = this.state;

    switch (justification) {
      case 'top':
        return referenceElPos.top;

      case 'bottom':
        return referenceElPos.top + referenceElPos.height - contentElPos.height;

      case 'center-vertical':
        return (
          referenceElPos.top +
          referenceElPos.height / 2 -
          contentElPos.height / 2
        );
    }

    switch (alignment) {
      case 'top':
        return referenceElPos.top - contentElPos.height;

      case 'bottom':
      default:
        return referenceElPos.top + referenceElPos.height;
    }
  }

  // Returns the 'left' position in pixels for a valid alignment or justification.
  calcLeft({ alignment, justification }: AbstractPosition) {
    const { referenceElPos, contentElPos } = this.state;

    switch (alignment) {
      case 'left':
        return referenceElPos.left - contentElPos.width;

      case 'right':
        return referenceElPos.left + referenceElPos.width;
    }

    switch (justification) {
      case 'right':
        return referenceElPos.left + referenceElPos.width - contentElPos.width;

      case 'center-horizontal':
        return (
          referenceElPos.left +
          referenceElPos.width / 2 -
          contentElPos.width / 2
        );

      case 'left':
      default:
        return referenceElPos.left;
    }
  }

  // Returns positioning for an element absolutely positioned within it's relative parent
  calcPositionWithoutPortal({ alignment, justification }: AbstractPosition) {
    const { referenceElPos, contentElPos } = this.state;
    const positionObject: AbsolutePositionObject = {};

    switch (alignment) {
      case 'top':
        positionObject.bottom = '100%';
        break;

      case 'bottom':
        positionObject.top = '100%';
        break;

      case 'left':
        positionObject.right = '100%';
        break;

      case 'right':
        positionObject.left = '100%';
        break;
    }

    switch (justification) {
      case 'top':
        positionObject.top = 0;
        break;

      case 'bottom':
        positionObject.bottom = 0;
        break;

      case 'left':
        positionObject.left = 0;
        break;

      case 'right':
        positionObject.right = 0;
        break;

      case 'center-horizontal':
        positionObject.left = referenceElPos.width / 2 - contentElPos.width / 2;
        break;

      case 'center-vertical':
        positionObject.top =
          referenceElPos.height / 2 - contentElPos.height / 2;
        break;
    }

    return positionObject;
  }

  // Get transform styles for position object
  getTransform(alignment: string) {
    const transformAmount = 12;
    const scaleAmount = 0.8;

    switch (alignment) {
      case 'top':
        return `translate3d(0, ${transformAmount}px, 0) scale(${scaleAmount})`;

      case 'bottom':
        return `translate3d(0, -${transformAmount}px, 0) scale(${scaleAmount})`;

      case 'left':
        return `translate3d(${transformAmount}px, 0, 0) scale(${scaleAmount})`;

      case 'right':
        return `translate3d(-${transformAmount}px, 0, 0) scale(${scaleAmount})`;
    }
  }

  // Constructs the transform origin for any given pair of alignment / justification
  getTransformOrigin({ alignment, justification }: AbstractPosition) {
    let x: string = '';
    let y: string = '';

    switch (alignment) {
      case 'left':
        x = 'right';
        break;

      case 'right':
        x = 'left';
        break;

      case 'bottom':
        y = 'top';
        break;

      case 'top':
        y = 'bottom';
        break;
    }

    switch (justification) {
      case 'left':
        x = 'left';
        break;

      case 'right':
        x = 'right';
        break;

      case 'bottom':
        y = 'top';
        break;

      case 'top':
        y = 'bottom';
        break;

      case 'center-horizontal':
        x = 'center';
        break;

      case 'center-vertical':
        y = 'center';
        break;
    }

    return `${x} ${y}`;
  }

  contentRef = React.createRef<HTMLDivElement>();
  placeholderRef = React.createRef<HTMLDivElement>();

  render() {
    const { children, active, className, withoutPortal, ...rest } = this.props;

    delete rest.refEl;

    const position = this.calculatePosition();

    const Root = withoutPortal ? Fragment : Portal;

    const activeStyle = active && {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      position: withoutPortal && 'absolute',
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
