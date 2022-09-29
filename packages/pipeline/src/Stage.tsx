import React, {
  forwardRef,
  ReactNode,
  Ref,
  ReactElement,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import mergeRefs from 'react-merge-refs';
import { useInView } from 'react-intersection-observer';
import { cx } from '@leafygreen-ui/emotion';
import {
  Size,
  stageAttr,
  stageTextThemeStyles,
  stageTextStyles,
  stageBaseStyles,
  stageSvgThemeStyles,
  baseSizeStyles,
  stageTextBaseStyles,
  stageSvgSizeStyles,
} from './styles';
import PipelineContext from './PipelineContext';

export interface StageProps {
  /**
   * Content that will appear inside of the Stage component.
   **/
  children: ReactNode;

  /**
   * Classname applied to Stage content container.
   **/
  className?: string;

  /**
   * The DOM node to use as the root node for the intersectionObserver. Defaults to window when null or undefined.
   **/
  intersectionNode?: HTMLElement | null;

  /**
   * Alter the rendered size of the component. Inherited from the parent Pipeline component.
   */
  size?: Size;

  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's visibility
   * the observer's callback should be executed.
   */
  threshold?: number | Array<number>;
}

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
 * @param props.className ClassName applied to Stage content container.
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
        {...stageAttr.prop}
        ref={mergeRefs([setRef, ref])}

        data-testid="pipeline-stage"
        data-stage-visible={isVisible}
        className={cx(
          stageBaseStyles,
          baseSizeStyles[size as Size],
          stageSvgThemeStyles(theme),
          stageSvgSizeStyles[size as Size],
          className,
        )}
      >
        <span
          className={cx(
            stageTextStyles,
            stageTextBaseStyles[size as Size],
            stageTextThemeStyles[theme],
          )}
        >
          {children}
        </span>
        {/* <div
          data-testid="pipeline-stage-chevron"
          {...stageChevronAttr.prop}
          className={chevronStyle}
        /> */}
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
