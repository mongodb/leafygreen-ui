import React, { Component, Fragment, ReactNode, RefObject } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { emotion } from '@leafygreen-ui/lib';
import {
  getTransformOrigin,
  getTransform,
  getElementPosition,
  defaultElementPosition,
  calcRelativePosition,
  calcLeft,
  calcTop,
} from './positionUtils';

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

export interface RefPosition {
  top: number;
  bottom: number;
  left: number;
  right: number;
  height: number;
  width: number;
}

export type ReferencePosition = RefPosition;
export type ContentPosition = RefPosition;

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
  referenceElPos: ReferencePosition;
  contentElPos: ContentPosition;
  referenceElement: HTMLElement | null;
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
    align: PropTypes.oneOf(Object.values(Align)),
    justify: PropTypes.oneOf(Object.values(Justify)),
    refEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    usePortal: PropTypes.bool,
    spacing: PropTypes.number,
  };

  static defaultProps: Props = {
    align: Align.Bottom,
    justify: Justify.Start,
    active: false,
    usePortal: true,
    spacing: 10,
  };

  state: State = {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    hasMounted: false,
    referenceElPos: defaultElementPosition,
    contentElPos: defaultElementPosition,
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
      const newReferenceElPos = getElementPosition(referenceElement);
      const contentEl = this.contentRef && this.contentRef.current;

      if (!contentEl) {
        this.setState({ referenceElPos: newReferenceElPos });

        return;
      }

      this.setState({
        contentElPos: getElementPosition(contentEl),
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
            contentElPos: getElementPosition(contentEl),
          });
        }
      },
    );
  };

  findCorrectReferenceElement(): HTMLElement | undefined {
    const { refEl } = this.props;
    let referenceElement: HTMLElement | undefined;

    if (refEl && refEl.current) {
      referenceElement = refEl.current;
    } else if (this.placeholderRef.current) {
      const parent = this.placeholderRef.current.parentNode;

      if (parent && parent instanceof HTMLElement) {
        referenceElement = parent;
      }
    }

    return referenceElement;
  }

  // Sets the element to position relative to based on passed props,
  // and stores it, and it's position in state.
  setReferenceElement(): void {
    const newReferenceElement = this.findCorrectReferenceElement();

    if (newReferenceElement) {
      this.setState({
        referenceElement: newReferenceElement,
        referenceElPos: getElementPosition(newReferenceElement),
      });
    }
  }

  // Returns the style object that is used to position and transition the popover component
  calculatePosition() {
    const { usePortal, spacing, align } = this.props;
    const {
      hasMounted,
      referenceElement,
      referenceElPos,
      contentElPos,
    } = this.state;

    // Forced second render to make sure that
    // we have access to refs
    if (!hasMounted) {
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
          contentElPos: getElementPosition(contentEl),
        });
      }

      return;
    }

    const alignment = this.getWindowSafeAlignment(align);
    const justification = this.getWindowSafeJustification(alignment);

    const transformOrigin = getTransformOrigin({
      alignment,
      justification,
    });

    const transform = getTransform(alignment, spacing);

    if (!usePortal) {
      return {
        ...calcRelativePosition({
          alignment,
          justification,
          referenceElPos,
          contentElPos,
          spacing,
        }),
        transformOrigin,
        transform,
      };
    }

    return {
      top: calcTop({
        alignment,
        justification,
        contentElPos,
        referenceElPos,
        spacing,
      }),
      left: calcLeft({
        alignment,
        justification,
        contentElPos,
        referenceElPos,
        spacing,
      }),
      transformOrigin,
      transform,
    };
  }

  // Determines the alignment to render based on an order of alignment fallbacks
  // Returns the first alignment that doesn't collide with the window,
  // defaulting to the align prop if all alignments fail.
  getWindowSafeAlignment(align: Align): Align {
    const { spacing } = this.props;
    const {
      contentElPos,
      windowWidth,
      windowHeight,
      referenceElPos,
    } = this.state;

    const alignments: {
      top: ReadonlyArray<Align>;
      bottom: ReadonlyArray<Align>;
      left: ReadonlyArray<Align>;
      right: ReadonlyArray<Align>;
    } = {
      top: [Align.Top, Align.Bottom],
      bottom: [Align.Bottom, Align.Top],
      left: [Align.Left, Align.Right],
      right: [Align.Right, Align.Left],
    };

    return (
      alignments[align].find(alignment => {
        // Check that an alignment will not cause the popover to collide with the window.

        if ([Align.Top, Align.Bottom].includes(alignment)) {
          const top = calcTop({
            alignment,
            contentElPos,
            referenceElPos,
            spacing,
          });
          return this.safelyWithinVerticalWindow({
            top,
            windowHeight,
            contentHeight: contentElPos.height,
          });
        }

        if ([Align.Left, Align.Right].includes(alignment)) {
          const left = calcLeft({
            alignment,
            contentElPos,
            referenceElPos,
            spacing,
          });
          return this.safelyWithinHorizontalWindow({
            left,
            windowWidth,
            contentWidth: contentElPos.width,
          });
        }

        return false;
      }) || align
    );
  }

  // Determines the justification to render based on an order of justification fallbacks
  // Returns the first justification that doesn't collide with the window,
  // defaulting to the justify prop if all justifications fail.
  getWindowSafeJustification(alignment: Align): Justification {
    const { justify, spacing } = this.props;
    const {
      contentElPos,
      windowWidth,
      windowHeight,
      referenceElPos,
    } = this.state;

    let justifications: {
      [Justify.Start]: ReadonlyArray<Justification>;
      [Justify.Middle]: ReadonlyArray<Justification>;
      [Justify.End]: ReadonlyArray<Justification>;
    };

    switch (alignment) {
      case Align.Left:
      case Align.Right: {
        justifications = {
          [Justify.Start]: [
            Justification.Top,
            Justification.Bottom,
            Justification.CenterVertical,
          ],
          [Justify.Middle]: [
            Justification.CenterVertical,
            Justification.Bottom,
            Justification.Top,
          ],
          [Justify.End]: [
            Justification.Bottom,
            Justification.Top,
            Justification.CenterVertical,
          ],
        };
        break;
      }

      case Align.Top:
      case Align.Bottom:
      default: {
        justifications = {
          [Justify.Start]: [
            Justification.Left,
            Justification.Right,
            Justification.CenterHorizontal,
          ],
          [Justify.Middle]: [
            Justification.CenterHorizontal,
            Justification.Right,
            Justification.Left,
          ],
          [Justify.End]: [
            Justification.Right,
            Justification.Left,
            Justification.CenterHorizontal,
          ],
        };
        break;
      }
    }

    return (
      justifications[justify].find(justification => {
        // Check that a justification will not cause the popover to collide with the window.

        if (
          [
            Justification.Top,
            Justification.Bottom,
            Justification.CenterVertical,
          ].includes(justification)
        ) {
          const top = calcTop({
            justification,
            contentElPos,
            referenceElPos,
            spacing,
          });
          return this.safelyWithinVerticalWindow({
            top,
            windowHeight,
            contentHeight: contentElPos.height,
          });
        }

        if (
          [
            Justification.Left,
            Justification.Right,
            Justification.CenterHorizontal,
          ].includes(justification)
        ) {
          const left = calcLeft({
            justification,
            contentElPos,
            referenceElPos,
            spacing,
          });
          return this.safelyWithinHorizontalWindow({
            left,
            windowWidth,
            contentWidth: contentElPos.width,
          });
        }

        return false;
      }) || justifications[justify][0]
    );
  }

  // Check if horizontal position is safely within edge of window
  safelyWithinHorizontalWindow({
    left,
    windowWidth,
    contentWidth,
  }: {
    left: number;
    windowWidth: number;
    contentWidth: number;
  }): boolean {
    const tooWide = left + contentWidth > windowWidth;

    return left >= 0 && !tooWide;
  }

  // Check if vertical position is safely within edge of window
  safelyWithinVerticalWindow({
    top,
    windowHeight,
    contentHeight,
  }: {
    top: number;
    windowHeight: number;
    contentHeight: number;
  }): boolean {
    const tooTall = top + contentHeight > windowHeight;

    return top >= 0 && !tooTall;
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

    const style = css({ ...position, ...activeStyle } as {});

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
