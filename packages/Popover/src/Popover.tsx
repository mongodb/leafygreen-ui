import React, { Component, Fragment } from 'react';
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

const divRef = css`
  display: none;
`;

type RefPosition = {
  top: number,
  bottom: number,
  left: number,
  right: number,
  height: number,
  width: number,
}

type AbsolutePositioning = {
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
}

const defaultRefPosition = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
}

type Alignment = 'top' | 'bottom' | 'left' | 'right'
type Justify = 'start' | 'middle' | 'end'

// We transform 'middle' into 'center-vertical' or 'center-horizontal' for internal use,
// So both Justify and Justification are needed, where the same is not true for Alignment.
type Justification = 'top' | 'bottom' | 'left' | 'right' | 'center-vertical' | 'center-horizontal'

type Props = {
  children?: React.ReactNode,
  active: boolean,
  className?: string,
  align: 'top' | 'bottom' | 'left' | 'right',
  justify: Justify,
  refEl?: React.RefObject<HTMLElement>,
  withoutPortal?: boolean,
  getUpdatePosition?: Function,
}

type State = {
  windowHeight: number,
  windowWidth: number,
  hasMounted: boolean,
  referenceElPos: RefPosition,
}

export default class Popover extends Component<Props, State> {
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

  static defaultProps: Props = {
    align: 'top',
    justify: 'start',
    active: false,
  };

  state: State = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
    referenceElPos: defaultRefPosition
  };

  componentDidMount() {
    const { refEl } = this.props;
    const referenceElPos = refEl && this.getRefPosition(refEl) || defaultRefPosition;

    this.setState({ hasMounted: true, referenceElPos });

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { align, justify, refEl } = this.props;
    const { windowWidth, windowHeight } = this.state;

    const posPropsUpdated =
      prevProps.align !== align || prevProps.justify !== justify;

    const windowUpdated =
      prevState.windowWidth !== windowWidth ||
      prevState.windowHeight !== windowHeight;

    if (posPropsUpdated || windowUpdated) {
      if (!refEl) {
        this.setRefEl();
      } else {
        const referenceElPos = refEl && this.getRefPosition(refEl);
        this.setState({ referenceElPos });
      }

      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  };

  // If refEl is not a supplied prop, determines an appropriate refEl, rather than error
  // And sets referenceElPos in state based on our determination of an appropriate reference element
  setRefEl() {
    const { refEl } = this.props;

    if (refEl) {
      return
    }

    if (this.createRefEl && this.createRefEl.current) {
      this.setState({
        referenceElPos: this.getRefPosition({
          current: this.createRefEl.current.parentNode,
        })
      })
    }
  }

  // Gets top offset, left offset, width and height dimensions for a node
  getRefPosition({ current }) {
    if (!current) {
      return defaultRefPosition;
    }

    const { top, bottom, left, right } = current.getBoundingClientRect();
    const { offsetHeight: height, offsetWidth: width } = current;

    const position: RefPosition = { top, bottom, left, right, height, width }

    return position
  }

  // Returns the style object that is used to position and transition the popover component
  calculatePosition() {
    const { withoutPortal } = this.props;

    // Forced second render to make sure that
    // we have access to refs
    if (!this.state.hasMounted) {
      return;
    }

    if (!this.state.referenceElPos) {
      this.setRefEl();
      return;
    }

    const alignment = this.getAlignment();
    const justification = this.getJustification(alignment);

    let positionObject: AbsolutePositioning;

    if (withoutPortal) {
      positionObject = this.calcPositionWithoutPortal({ alignment, justification })
    } else {
      positionObject = {
        top: this.calcTop({ alignment, justification }),
        left: this.calcLeft({ alignment, justification }),
      }
    }

    const transformOrigin = this.getTransformOrigin({
      alignment,
      justification,
    });

    const transform = this.getTransform(alignment);

    return {
      ...positionObject,
      transformOrigin,
      transform,
    };
  }

  // Determines the alignment to render based on an order of alignment fallbacks
  // Returns the first alignment that doesn't collide with the window,
  // defaulting to the align prop if all alignments fail.
  getAlignment() {
    const { align } = this.props;

    interface AlignmentCandidates {
      top: Array<Alignment>,
      bottom: Array<Alignment>,
      left: Array<Alignment>,
      right: Array<Alignment>,
    }

    const alignments: AlignmentCandidates = {
      top: ['top', 'bottom'],
      bottom: ['bottom', 'top'],
      left: ['left', 'right'],
      right: ['right', 'left'],
    };

    let validAlignment: Alignment = align;

    alignments[align].some(candidate => {
      if (!this.checkAlignment(candidate)) {
        return false;
      }

      validAlignment = candidate;
      return true;
    });

    return validAlignment;
  }

  // Determines the justification to render based on an order of justification fallbacks
  // Returns the first justification that doesn't collide with the window,
  // defaulting to the justify prop if all justifications fail.
  getJustification(alignment: Alignment) {
    const { justify } = this.props;

    interface JustificationCandidates {
      start: Array<Justification>,
      middle: Array<Justification>,
      end: Array<Justification>,
    }

    let justifications: JustificationCandidates;

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

    let validJustification: Justification = justifications[justify][0];

    justifications[justify].some(candidate => {
      if (!this.checkJustification(candidate)) {
        return false;
      }

      validJustification = candidate;
      return true;
    });

    return validJustification;
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
  }

  // Check if horizontal position collides with edge of window
  checkHorizontalWindowCollision(left: number) {
    const contentRefPos: RefPosition = this.getRefPosition(this.contentRef);
    const tooWide = left + contentRefPos.width > this.state.windowWidth;

    return !(left < 0 || tooWide);
  }

  // Check if vertical position collides with edge of window
  checkVerticalWindowCollision(top: number) {
    const contentRefPos: RefPosition = this.getRefPosition(this.contentRef);
    const tooTall = top + contentRefPos.height > this.state.windowHeight;

    return !(top < 0 || tooTall);
  }

  // Returns the 'top' position in pixels for a valid alignment or justification.
  calcTop({ alignment, justification }: {alignment?: Alignment, justification?: Justification}) {
    const { referenceElPos } = this.state;
    const contentRefPos: RefPosition = this.getRefPosition(this.contentRef);

    if (this.contentRef.current) {
      switch (justification) {
        case 'top':
          return referenceElPos.top;

        case 'bottom':
          return (
            referenceElPos.top + referenceElPos.height - contentRefPos.height
          );

        case 'center-vertical':
          return (
            referenceElPos.top +
            referenceElPos.height / 2 -
            contentRefPos.height / 2
          );
      }

      switch (alignment) {
        case 'top':
          return referenceElPos.top - contentRefPos.height;

        case 'bottom':
        default:
          return referenceElPos.top + referenceElPos.height;
      }
    }

    return 0
  }

  // Returns the 'left' position in pixels for a valid alignment or justification.
  calcLeft({ alignment, justification }: {alignment?: Alignment, justification?: Justification}) {
    const { referenceElPos } = this.state;
    const contentRefPos: RefPosition = this.getRefPosition(this.contentRef);

    if (this.contentRef.current) {
      switch (alignment) {
        case 'left':
          return referenceElPos.left - contentRefPos.width;

        case 'right':
          return referenceElPos.left + referenceElPos.width;
      }

      switch (justification) {
        case 'right':
          return (
            referenceElPos.left + referenceElPos.width - contentRefPos.width
          );

        case 'center-horizontal':
          return (
            referenceElPos.left +
            referenceElPos.width / 2 -
            contentRefPos.width / 2
          );

        case 'left':
        default:
          return referenceElPos.left;
      }
    }

    return 0
  }

  // Returns positioning for an element absolutely positioned within it's relative parent
  calcPositionWithoutPortal({ alignment, justification }: {alignment?: Alignment, justification?: Justification}) {
    const { referenceElPos } = this.state
    const contentRefPos = this.getRefPosition(this.contentRef)

    const positionObject: AbsolutePositioning = {}

    if ((justification === 'center-vertical' || justification === 'center-horizontal') && !(referenceElPos && contentRefPos)) {
      return positionObject
    }
    
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
        positionObject.left = 0
        break;

      case 'right':
        positionObject.right = 0
        break;

      case 'center-horizontal':
        positionObject.left = referenceElPos.width / 2 - contentRefPos.width / 2
        break;

      case 'center-vertical':
        positionObject.top = referenceElPos.height / 2 - contentRefPos.height / 2
        break;
    }

    return positionObject
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
  getTransformOrigin({ alignment, justification }: {alignment?: Alignment, justification?: Justification}) {
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
  createRefEl = React.createRef<HTMLDivElement>();

  render() {
    const {
      children,
      active,
      className,
      withoutPortal,
      refEl,
      ...rest
    } = this.props;

    const position = this.calculatePosition();

    const Root = withoutPortal ? Fragment : Portal;

    const activeStyle = active && {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      position: withoutPortal && 'absolute',
    };

    const style = { ...position, ...activeStyle };

    return (
      <>
        <div ref={this.createRefEl} className={divRef} />
        <Root>
          <div
            {...rest}
            ref={this.contentRef}
            className={cx(rootPopoverStyle, className)}
            style={style}
          >
            {children}
          </div>
        </Root>
      </>
    );
  }
}
