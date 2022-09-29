import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { SegmentXs, SegmentS, SegmentM, SegmentL } from './svgs';

import {
  Size,
  counterAttr,
  counterThemeStyles,
  counterBaseStyles,
  counterSizeStyles,
  svgLayer1Styles,
  svgLayer2Styles,
  baseSizeStyles,
} from './styles';
import PipelineContext from './PipelineContext';

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
    const Icon = segments[size];
    const { theme } = useContext(PipelineContext);

    return (
      <div
        {...rest}
        {...counterAttr.prop}
        data-testid="pipeline-counter"
        className={cx(
          baseSizeStyles[size],
          counterBaseStyles,
          counterSizeStyles[size],
          counterThemeStyles[theme],
          className,
        )}
        ref={ref}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <div className={css`
          position: absolute;
          width: 100%;
          height: 100%;

          display: flex;

          & > * {
            width: 50%;
          }

        `}>
        {/* TODO: Explain whats happening here */}
        <div>
        <Icon className={cx(svgLayer1Styles)} />
        </div>
        <div>
        <Icon className={cx(svgLayer2Styles)} />
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
  size: PropTypes.oneOf(Object.values(Size)).isRequired,
};

export default Counter;
