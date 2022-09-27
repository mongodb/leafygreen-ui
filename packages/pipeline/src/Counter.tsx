import React, { forwardRef, ReactElement, ReactNode, Ref } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { SegmentXs, SegmentS, SegmentM, SegmentL } from './svgs';

import {
  getRootStyle,
  getChildStyle,
  Size,
  layout,
  colors,
  counterAttr,
} from './styles';

interface StateForStyles {
  size?: Size;
}

interface CounterProps {
  /**
   * Content that will appear inside of the Counter component.
   */
  children?: ReactNode;

  /**
   * Classname applied to Counter content container.
   **/
  className?: string;

  /**
   * Alter the rendered size of the component. Inherited from the parent Pipeline component.
   */
  size: Size;
}

const segments: Record<Size, React.ComponentType<any>> = {
  [Size.XSmall]: SegmentXs,
  [Size.Small]: SegmentS,
  [Size.Normal]: SegmentM,
  [Size.Large]: SegmentL,
} as const;

const getBaseStyle = ({ size = Size.XSmall }: StateForStyles): string => {
  const { chevron, fontSize, fontWeight, gutter, height, lineHeight, counter } =
    layout[size];

  const { color, secondary } = colors;
  const outerSize = height / 2;
  const offset = outerSize + chevron.size * 2;

  return cx(
    getRootStyle({ size }),
    getChildStyle({ size }),
    css`
      background-color: ${secondary.backgroundColor};
      color: ${color};
      padding: ${gutter.vertical}px ${gutter.horizontal}px;
      // margin-right: ${offset}px;
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      line-height: ${lineHeight};
      flex: 1 1 auto;
      white-space: nowrap;
      z-index: 2;
      min-width: ${counter.minWidth}px;

      &::before {
        white-space: nowrap;
        content: '+' counter(hiddenCount);
      }
    `,
  );
};

const getCounterChevronStyle = ({
  size = Size.XSmall,
}: StateForStyles): string => {
  const { chevron, height } = layout[size];
  const { secondary } = colors;
  const outerSize = height / 2;

  // return cx(
  //   getChevronStyle({ size }),
  //   css`
  //     &::before {
  //       background-color: ${secondary.backgroundColor};
  //       box-shadow: 0 0 0 ${chevron.size}px transparent,
  //         0 0 0 ${outerSize}px transparent;
  //     }
  //   `,
  // );
  return css``;
};

const getStatefulStyles = (state: StateForStyles) => ({
  base: getBaseStyle(state),
  chevron: getCounterChevronStyle(state),
});

/**
 * # Counter
 *
 * React Component to render the counter for the number of hidden stages in the Pipeline component.
 *
 * ```
 * <Counter />
 * ```
 * @param props.className Classname applied to Counter content container.
 */
const Counter = forwardRef(
  (
    { className = '', children, size, ...rest }: CounterProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const { base: baseStyle } = getStatefulStyles({
      size,
    });
    const Icon = segments[size];

    return (
      <div
        {...rest}
        {...counterAttr.prop}
        data-testid="pipeline-counter"
        className={cx(baseStyle, className)}
        ref={ref}
      >
        {/* TODO: add classname prop */}
        <Icon/>
        {/* Children will be the tooltip provided by the Pipeline component */}
        {children}

        {/* <div
          {...counterChevronAttr.prop}
          data-testid="pipeline-counter-chevron"
          className={chevronStyle}
        /> */}
      </div>
    );
  },
);

Counter.displayName = 'Counter';

Counter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)).isRequired,
};

export default Counter;
