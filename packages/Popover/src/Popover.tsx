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
  getWindowSafeAlignment,
  getWindowSafeJustification,
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

interface PositionArgs {
  useRelativePositioning: boolean;
  spacing: number;
  align: Align;
  justify: Justify;
  referenceElPos: ReferencePosition;
  contentElPos: ContentPosition;
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
  hasMounted: boolean;
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
    hasMounted: false,
  };

  componentDidMount() {
    this.setState({ hasMounted: true });

    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  // TODO: debounce this
  handleWindowResize = () => {
    this.forceUpdate();
  };

  findCorrectReferenceElement(): HTMLElement | null {
    const { refEl } = this.props;
    let referenceElement: HTMLElement | null = null;

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

  // Returns the style object that is used to position and transition the popover component
  calculatePosition({
    useRelativePositioning,
    spacing,
    align,
    justify,
    referenceElPos,
    contentElPos,
  }: PositionArgs) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const windowSafeCommonArgs = {
      windowWidth,
      windowHeight,
      referenceElPos,
      contentElPos,
      spacing,
    };
    const alignment = getWindowSafeAlignment(align, windowSafeCommonArgs);
    const justification = getWindowSafeJustification(
      justify,
      alignment,
      windowSafeCommonArgs,
    );

    const transformOrigin = getTransformOrigin({
      alignment,
      justification,
    });

    const transform = getTransform(alignment, spacing);

    if (useRelativePositioning) {
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

  contentRef = React.createRef<HTMLDivElement>();
  placeholderRef = React.createRef<HTMLDivElement>();

  render() {
    const {
      children,
      active,
      className,
      usePortal,
      spacing,
      align,
      justify,
      ...rest
    } = this.props;
    const { hasMounted } = this.state;

    delete rest.refEl;

    let position;

    if (hasMounted) {
      const referenceElement = this.findCorrectReferenceElement();
      const referenceElPos = getElementPosition(referenceElement);
      const contentElPos = getElementPosition(this.contentRef.current);
      position = this.calculatePosition({
        useRelativePositioning: !usePortal,
        spacing,
        align,
        justify,
        referenceElPos,
        contentElPos,
      });
    } else {
      position = defaultElementPosition;
    }

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
