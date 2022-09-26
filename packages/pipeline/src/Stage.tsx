import React, { forwardRef, ReactNode, Ref, ReactElement } from 'react';
import PropTypes from 'prop-types';
import mergeRefs from 'react-merge-refs';
import { useInView } from 'react-intersection-observer';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  getRootStyle,
  getChildStyle,
  getChevronStyle,
  Size,
  layout,
  colors,
  stageAttr,
  stageChevronAttr,
} from './styles';

interface StateForStyles {
  size?: Size;
}

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

const getBaseStyle = ({ size = Size.XSmall }: StateForStyles): string => {
  const {
    borderRadius,
    chevron,
    fontSize,
    fontWeight,
    gutter,
    height,
    lineHeight,
  } = layout[size];

  const { color, primary } = colors;
  const outerSize = height / 2;
  const offset = outerSize + chevron.size * 2;

  return cx(
    getRootStyle({ size }),
    getChildStyle({ size }),
    css`
      background-color: ${primary.backgroundColor};
      color: ${color};
      // padding: ${gutter.vertical}px ${gutter.horizontal}px;
      padding: ${gutter.vertical}px ${chevron.gutter}px ${gutter.vertical}px ${gutter.horizontal}px;

      // margin-right: ${offset}px;
      font-size: ${fontSize}px;
      font-weight: ${fontWeight};
      line-height: ${lineHeight};
      flex: 1 1 auto;
      white-space: nowrap;
      z-index: 1;

      &:first-of-type {
        border-top-left-radius: ${borderRadius}px;
        border-bottom-left-radius: ${borderRadius}px;
      }

      &[data-stage-visible='false'] {
        counter-increment: hiddenCount;
      }

      // span {
      //   background-color: ${primary.backgroundColor};
      // color: ${color};
      // // padding: ${gutter.vertical}px ${gutter.horizontal}px;
      // padding: ${gutter.vertical}px ${chevron.gutter}px ${gutter.vertical}px ${gutter.horizontal}px;
      // }

      &:last-of-type {
        // padding: ${gutter.vertical}px ${gutter.horizontal}px;
        &::after {
          content: '';
          width: ${chevron.lastSize}px;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='15' height='48' viewBox='0 0 15 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H0.572721C2.47768 0 4.21713 1.08246 5.05854 2.79152L14.4127 21.7915C15.0983 23.184 15.0983 24.816 14.4127 26.2085L5.05855 45.2085C4.21713 46.9175 2.47768 48 0.572721 48H0V0Z' fill='%23C3E7FE'/%3E%3C/svg%3E%0A");
          background-color: white;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    right: 0;
    background-position: -1px 0px;
        }
      }

      &:not(&:last-of-type) {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H7.72009C6.97388 0 6.49054 0.787842 6.82867 1.45312L14.087 15.7346C14.8105 17.1582 14.8105 18.8418 14.087 20.2654L6.82867 34.5469C6.49054 35.2122 6.97388 36 7.72009 36H0C1.89386 36 3.62518 34.9299 4.47211 33.2361L10.9721 20.2361C11.6759 18.8285 11.676 17.1716 10.9721 15.7639L4.47211 2.76392C3.62518 1.07007 1.89386 0 0 0Z' fill='white'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: auto;
        background-position: right;
        // padding: ${gutter.vertical}px ${chevron.gutter}px ${gutter.vertical}px ${gutter.horizontal}px;
      }
    `,
  );
};

const getStageChevronStyle = ({
  size = Size.XSmall,
}: StateForStyles): string => {
  const { chevron, height } = layout[size];
  const { primary } = colors;
  const outerSize = height / 2;

  // return cx(
  //   getChevronStyle({ size }),
  //   css`
  //     &::before {
  //       background-color: ${primary.backgroundColor};
  //       box-shadow: 0 0 0 ${chevron.size}px ${uiColors.white},
  //         0 0 0 ${outerSize}px ${primary.backgroundColor};
  //     }
  //   `,
  // );

  return css`
    // position: absolute;
    // right: 0;
    // height: 100%;
    // width: ${chevron.gutter}px;
    // overflow: hidden;

    // background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H7.72009C6.97388 0 6.49054 0.787842 6.82867 1.45312L14.087 15.7346C14.8105 17.1582 14.8105 18.8418 14.087 20.2654L6.82867 34.5469C6.49054 35.2122 6.97388 36 7.72009 36H0C1.89386 36 3.62518 34.9299 4.47211 33.2361L10.9721 20.2361C11.6759 18.8285 11.676 17.1716 10.9721 15.7639L4.47211 2.76392C3.62518 1.07007 1.89386 0 0 0Z' fill='white'/%3E%3C/svg%3E");
    //   background-repeat: no-repeat;
    //   background-size: contain;

    // // &::before {
    // //   content: '';
    // //   height: 100%;
    // //   width: 100%;
    // //   display: inline-block;
    // //   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H7.72009C6.97388 0 6.49054 0.787842 6.82867 1.45312L14.087 15.7346C14.8105 17.1582 14.8105 18.8418 14.087 20.2654L6.82867 34.5469C6.49054 35.2122 6.97388 36 7.72009 36H0C1.89386 36 3.62518 34.9299 4.47211 33.2361L10.9721 20.2361C11.6759 18.8285 11.676 17.1716 10.9721 15.7639L4.47211 2.76392C3.62518 1.07007 1.89386 0 0 0Z' fill='white'/%3E%3C/svg%3E");
    // //   background-repeat: no-repeat;
    // //   background-size: contain;
    // // }
  `;
};

const getStatefulStyles = (state: StateForStyles) => ({
  base: getBaseStyle(state),
  chevron: getStageChevronStyle(state),
});

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

    const { base: baseStyle, chevron: chevronStyle } = getStatefulStyles({
      size,
    });

    return (
      <li
        {...rest}
        {...stageAttr.prop}
        ref={mergeRefs([setRef, ref])}
        data-testid="pipeline-stage"
        data-stage-visible={isVisible}
        className={cx(baseStyle, className)}
      >
        <span>
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
