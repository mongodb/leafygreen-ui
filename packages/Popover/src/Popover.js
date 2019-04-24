import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { emotion } from '@leafygreen-ui/lib';
import { cx } from 'emotion';

const { css } = emotion;

const rootPopoverStyle = css`
  transition: transform 150ms ease-in-out, opacity 150ms ease-in-out;
  position: absolute;
  top: 0;
  pointer-events: none;
  opacity: 0;
`;

const divRef = css`
  display: none;
`;

export default class Popover extends Component {
  static displayName = 'Popover';

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    className: PropTypes.string,
    align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    justify: PropTypes.oneOf(['start', 'middle', 'end']),
    refEl: PropTypes.any,
    withoutPortal: PropTypes.bool,
    getUpdatePosition: PropTypes.func,
  };

  static defaultProps = {
    align: 'top',
    justify: 'start',
  };

  state = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
  };

  componentDidMount() {
    const { refEl } = this.props;
    const referenceElPos = refEl && this.getRefPosition(refEl);
    this.setState({ hasMounted: true, referenceElPos });

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState) {
    const { align, justify } = this.props;
    const { windowWidth, windowHeight } = this.state;

    const posPropsUpdated =
      prevProps.align !== align || prevProps.justify !== justify;
    const windowUpdated =
      prevState.windowWidth !== windowWidth ||
      prevState.windowHeight !== windowHeight;

    if (posPropsUpdated || windowUpdated) {
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
  getParentRef() {
    const { withoutPortal } = this.props;

    if (withoutPortal) {
      return this.getRefPosition({
        current: this.contentRef.current.parentNode,
      });
    } else {
      return this.getRefPosition({
        current: this.createRefEl.current.parentNode,
      });
    }
  }

  // Sets referenceElPos in state based on our determination of an appropriate reference element
  setRefEl() {
    const { refEl } = this.props;

    if (!refEl) {
      const referenceElPos = this.getParentRef();
      this.setState({ referenceElPos });
    }
  }

  // Gets top offset, left offset, width and height dimensions for a node
  getRefPosition({ current }) {
    if (!current) {
      return {};
    }

    const { top, bottom, left, right } = current.getBoundingClientRect();
    const height = current.offsetHeight;
    const width = current.offsetWidth;

    return { top, bottom, left, right, height, width };
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
      return this.setRefEl();
    }

    const alignment = this.getAlignment();
    const justification = this.getJustification(alignment);

    const top = withoutPortal
      ? this.calcWithoutPortalTop({ alignment, justification })
      : this.calcTop({ alignment, justification });
    const left = withoutPortal
      ? this.calcWithoutPortalLeft({ alignment, justification })
      : this.calcLeft({ alignment, justification });
    const transformOrigin = this.getTransformOrigin({
      alignment,
      justification,
    });
    const transform = this.getTransform(alignment);

    return {
      top,
      left,
      transformOrigin,
      transform,
    };
  }

  // Determines the alignment to render based on an order of alignment fallbacks
  // Returns the first alignment that doesn't collide with the window,
  // defaulting to the align prop if all alignments fail.
  getAlignment() {
    const { align } = this.props;
    const alignments = {
      top: ['top', 'bottom'],
      bottom: ['bottom', 'top'],
      left: ['left', 'right'],
      right: ['right', 'left'],
    };

    let validAlignment = align;

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
  getJustification(alignment) {
    const { justify } = this.props;
    let justifications = {};

    switch (alignment) {
      case 'top':
      case 'bottom': {
        justifications = {
          start: ['left', 'right', 'center'],
          middle: ['center-horizontal', 'right', 'left'],
          end: ['right', 'left', 'center'],
        };
        break;
      }

      case 'left':
      case 'right': {
        justifications = {
          start: ['top', 'bottom', 'center'],
          middle: ['center-vertical', 'bottom', 'top'],
          end: ['bottom', 'top', 'center'],
        };
        break;
      }
    }

    let validJustification = false;

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
  checkAlignment(alignment) {
    const { withoutPortal } = this.props;
    const top = withoutPortal
      ? this.calcWithoutPortalTop({ alignment })
      : this.calcTop({ alignment });
    const left = withoutPortal
      ? this.calcWithoutPortalLeft({ alignment })
      : this.calcLeft({ alignment });

    if (['top', 'bottom'].includes(alignment)) {
      return this.checkVerticalWindowCollision(top);
    }

    if (['left', 'right'].includes(alignment)) {
      return this.checkHorizontalWindowCollision(left);
    }
  }

  // Checks that a justification will not cause the popover to collide with the window.
  checkJustification(justification) {
    const { withoutPortal } = this.props;
    const top = withoutPortal
      ? this.calcWithoutPortalTop({ justification })
      : this.calcTop({ justification });
    const left = withoutPortal
      ? this.calcWithoutPortalLeft({ justification })
      : this.calcLeft({ justification });

    if (['top', 'bottom', 'center-vertical'].includes(justification)) {
      return this.checkVerticalWindowCollision(top);
    }

    if (['left', 'right', 'center-horizontal'].includes(justification)) {
      return this.checkHorizontalWindowCollision(left);
    }
  }

  // Check if horizontal position collides with edge of window
  checkHorizontalWindowCollision(left) {
    const contentRefPos = this.getRefPosition(this.contentRef);
    const tooWide = left + contentRefPos.width > this.state.windowWidth;

    return !(left < 0 || tooWide);
  }

  // Check if vertical position collides with edge of window
  checkVerticalWindowCollision(top) {
    const contentRefPos = this.getRefPosition(this.contentRef);
    const tooTall = top + contentRefPos.height > this.state.windowHeight;

    return !(top < 0 || tooTall);
  }

  // Returns the 'top' position in pixels for a valid alignment or justification.
  calcTop({ alignment, justification }) {
    const { referenceElPos } = this.state;
    const contentRefPos = this.getRefPosition(this.contentRef);

    if (alignment) {
      switch (alignment) {
        case 'top':
          return referenceElPos.top - contentRefPos.height;

        case 'bottom':
          return referenceElPos.top + referenceElPos.height;
      }
    }

    if (justification) {
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
    }
  }

  calcWithoutPortalTop({ alignment, justification }) {
    const contentRefPos = this.getRefPosition(this.contentRef);

    if (alignment) {
      switch (alignment) {
        case 'top':
          return `${0 - contentRefPos.height}px`;

        case 'bottom':
          return '100%';
      }
    }

    if (justification) {
      switch (justification) {
        case 'top':
          return 0;

        case 'bottom':
          return `calc(100% - ${contentRefPos.height}px)`;

        case 'center-vertical':
          return `calc(50% - ${contentRefPos.height / 2}px)`;
      }
    }
  }

  // Returns the 'left' position in pixels for a valid alignment or justification.
  calcLeft({ alignment, justification }) {
    const { referenceElPos } = this.state;
    const contentRefPos = this.getRefPosition(this.contentRef);

    if (alignment) {
      switch (alignment) {
        case 'left':
          return referenceElPos.left - contentRefPos.width;

        case 'right':
          return referenceElPos.left + referenceElPos.width;
      }
    }

    if (justification) {
      switch (justification) {
        case 'left':
          return referenceElPos.left;

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
      }
    }
  }

  calcWithoutPortalLeft({ alignment, justification }) {
    const contentRefPos = this.getRefPosition(this.contentRef);

    if (contentRefPos && alignment) {
      switch (alignment) {
        case 'left':
          return `${0 - contentRefPos.width}px`;

        case 'right':
          return '100%';
      }
    }

    if (justification) {
      switch (justification) {
        case 'left':
          return 0;

        case 'right':
          return `calc(100% - ${contentRefPos.width}px)`;

        case 'center-horizontal':
          return `calc(50% - ${contentRefPos.width}px / 2)`;
      }
    }
  }

  // Get transform styles for position object
  getTransform(alignment) {
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
  getTransformOrigin({ alignment, justification }) {
    let x, y;

    switch (alignment) {
      case 'left':
        x = 'right';
        break;

      case 'right':
        x = 'left';
        break;

      case 'bottom':
        y = 'bottom';
        break;

      case 'top':
        y = 'top';
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

  contentRef = React.createRef();
  createRefEl = React.createRef();

  render() {
    const {
      children,
      active,
      className,
      withoutPortal,
      refEl,
      ...rest
    } = this.props;

    // const { position } = this.state;
    const position = this.calculatePosition();

    const Root = withoutPortal ? Fragment : Portal;

    const activeStyle = {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      pointerEvents: 'initial',
    };

    const style = { ...position, ...(active && activeStyle) };

    return (
      <>
        <div ref={this.createRefEl} className={divRef} />
        <Root>
          <div
            {...rest}
            ref={this.contentRef}
            className={cx(className, rootPopoverStyle)}
            style={style}
          >
            {children}
          </div>
        </Root>
      </>
    );
  }
}
