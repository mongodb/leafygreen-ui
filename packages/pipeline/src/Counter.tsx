import React, { forwardRef, ReactElement, Ref, useContext } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import PipelineContext from './PipelineContext';
import {
  counterBaseStyles,
  counterSizeStyles,
  counterSvgBaseStyles,
  counterSvgColStyles,
  counterThemeStyles,
  svgLayer1Styles,
  svgLayer2Styles,
} from './styles';
import { SegmentL, SegmentM, SegmentS, SegmentXs } from './svgs';
import { CounterProps, Size } from './types';

const segments: Record<
  Size,
  React.ComponentType<React.PropsWithChildren<any>>
> = {
  [Size.XSmall]: SegmentXs,
  [Size.Small]: SegmentS,
  [Size.Normal]: SegmentM,
  [Size.Large]: SegmentL,
} as const;

/**
 * # Counter
 *
 * React Component to render the counter for the number of hidden stages in the Pipeline component.
 *
 * ```
 * <Counter />
 * ```
 * @internal
 * @param props.className Classname applied to Counter content container.
 */
const Counter = forwardRef(
  (
    { className = '', children, ...rest }: CounterProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const { theme, size } = useContext(PipelineContext);
    const Icon = segments[size];

    return (
      <div
        {...rest}
        data-testid="pipeline-counter"
        className={cx(
          counterBaseStyles,
          counterSizeStyles[size],
          counterThemeStyles[theme],
          className,
        )}
        ref={ref}
        // Adding this so on focus the tooltip will show up
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {/* The counter is a unique shape with focus and hover state that are not easily accomplished with css alone so we are using an SVG. The reason we have 2 SVGs is to mimic the behavior of a div expanding horizontally when the text increases since an SVG does not stretch horizontally while maintaining its height.*/}
        <div className={counterSvgBaseStyles}>
          <div className={counterSvgColStyles}>
            <Icon className={svgLayer1Styles} />
          </div>
          <div className={counterSvgColStyles}>
            <Icon className={svgLayer2Styles} />
          </div>
        </div>
        {/* Children will be the tooltip provided by the Pipeline component */}
        {children}
      </div>
    );
  },
);

Counter.displayName = 'Counter';

Counter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Counter;
