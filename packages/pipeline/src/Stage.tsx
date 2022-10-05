import React, { forwardRef, Ref, ReactElement, useContext } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { cx } from '@leafygreen-ui/emotion';
import {
  stageTextThemeStyles,
  stageTextStyles,
  stageBaseStyles,
  stageSvgThemeStyles,
  stageTextSizeStyles,
  stageSvgSizeStyles,
} from './styles';
import PipelineContext from './PipelineContext';
import { Size, StageProps } from './types';

/**
 * # Stage
 *
 * React Component to render an individual MongoDB Aggregation stage.
 * To be used in conjunction with Pipeline component as a child.
 *
 * ```
 * <Pipeline>
 *   <Stage>$match</Stage>
 *   <Stage>$addFields</Stage>
 *   <Stage>$limit</Stage>
 * </Pipeline>
 * ```
 * @param props.children Content that will appear inside of the Stage component.
 * @param props.className Classname applied to Stage content container.
 * @param props.intersectionNode The DOM node to use as the root node for the intersectionObserver. Defaults to window when null or undefined.
 * @param props.size Alters the rendered size of the component.
 * @param props.threshold Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 * @param props.variant Alters the visual appearance of the component.
 */
const Stage = forwardRef(
  (
    {
      children,
      className = '',
      intersectionNode,
      size,
      threshold = 0.8,
      ...rest
    }: StageProps,
    ref: Ref<HTMLLIElement>,
  ): ReactElement => {
    // Effects
    const [setRef, isVisible] = useInView({
      threshold,
      root: intersectionNode,
    });

    const { theme } = useContext(PipelineContext);

    return (
      <li
        {...rest}
        ref={ref}
        data-stage-visible={isVisible}
        className={cx(
          stageBaseStyles,
          stageSvgThemeStyles[theme],
          stageSvgSizeStyles[size as Size],
          className,
        )}
      >
        <span
          // if this ref is added to the <li> this component will keep re-rendering
          ref={setRef}
          className={cx(
            stageTextStyles,
            stageTextSizeStyles[size as Size],
            stageTextThemeStyles[theme],
          )}
          data-testid="pipeline-stage"
        >
          {children}
        </span>
      </li>
    );
  },
);

Stage.displayName = 'Stage';

Stage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intersectionNode: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  size: PropTypes.oneOf(Object.values(Size)),
  threshold: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number.isRequired),
  ]),
};

export default Stage;
