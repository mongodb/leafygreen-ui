import React, { forwardRef, ReactElement, Ref, useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';

import PipelineContext from './PipelineContext';
import {
  stageBaseStyles,
  stageSvgSizeStyles,
  stageSvgThemeStyles,
  stageTextSizeStyles,
  stageTextStyles,
  stageTextThemeStyles,
} from './styles';
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
 * @param props.threshold Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 */
const Stage = forwardRef(
  (
    { children, className = '', threshold = 0.8, ...rest }: StageProps,
    ref: Ref<HTMLLIElement>,
  ): ReactElement => {
    const { theme, size, isPipelineComponent, intersectionNode } =
      useContext(PipelineContext);
    // Effects
    const [setRef, isVisible] = useInView({
      threshold,
      root: intersectionNode,
    });

    // If Stage is used outside of Pipeline throw an error
    if (!isPipelineComponent) {
      throw Error('`Stage` must be a child of a `Pipeline` instance');
    }

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
        data-testid="pipeline-stage"
      >
        <span
          // if this ref is added to the <li> this component will keep re-rendering
          ref={setRef}
          className={cx(
            stageTextStyles,
            stageTextSizeStyles[size as Size],
            stageTextThemeStyles[theme],
          )}
          data-testid="pipeline-stage-item"
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
  threshold: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number.isRequired),
  ]),
};

export default Stage;
