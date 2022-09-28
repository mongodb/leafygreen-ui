import React, {
  forwardRef,
  createRef,
  useState,
  Ref,
  ReactElement,
  ReactNode,
} from 'react';

import PropTypes from 'prop-types';

import { uiColors } from '@leafygreen-ui/palette';
import Tooltip from '@leafygreen-ui/tooltip';
import { css, cx } from '@leafygreen-ui/emotion';
import { useMutationObserver } from '@leafygreen-ui/hooks';

import Stage from './Stage';
import Counter from './Counter';

import {
  getPipelineCounterTooltip,
  isStageElement,
  isElementOverflowed,
} from './utils';

import {
  getRootStyle,
  Size,
  layout,
  pipelineAttr,
  pipelineStages,
} from './styles';

interface StateForStyles {
  hasHiddenStages: boolean;
  size: Size;
}

export interface PipelineProps {
  /**
   * Content that will appear inside of the Pipeline component.
   */
  children: ReactNode;

  /**
   * Optional className prop to apply to Pipeline content container.
   */
  className?: string;

  /**
   * Alter the rendered size of the component
   */
  size: Size;
}

const getBaseStyle = ({ size }: StateForStyles): string =>
  cx(
    getRootStyle({ size }),
    css`
      counter-reset: hiddenCount;
      flex-direction: row;
    `,
  );

const getPipelineStyle = ({ size }: StateForStyles): string => {
  const { minWidth } = layout[size];

  return cx(
    getRootStyle({ size }),
    css`
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 100%;
      flex-wrap: wrap;
      overflow: hidden;
      list-style: none;
      padding: 0;
      margin: 0;
      min-width: ${minWidth}px;
    `,
  );
};

const getStatefulStyles = (state: StateForStyles) => ({
  base: getBaseStyle(state),
  pipeline: getPipelineStyle(state),
});

/**
 *
 * React Component to render top-level MongoDB Aggregations in a visual format.
 * Handles overflowed content gracefully by indicating how many other stages are hidden.
 *
 * ```
 * <Pipeline>
 *   <Stage>$match</Stage>
 *   <Stage>$addFields</Stage>
 *   <Stage>$limit</Stage>
 * </Pipeline>
 * ```
 *
 * @param props.children Content that will appear inside of the Pipeline component.
 * @param props.className Classname applied to Pipeline content container.
 * @param props.size Alters the rendered size of the component.
 * @param props.variant Alters the visual appearance of the component.
 */
const Pipeline = forwardRef(
  (
    { children, className = '', size = Size.XSmall, ...rest }: PipelineProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    // State
    const [pipelineNode, setPipelineNode] = useState<HTMLElement | null>(null);
    const [hasHiddenStages, setHasHiddenStages] = useState(false);
    const [tooltipText, setTooltipText] = useState<string>('');

    // Handlers

    /**
     * Determines whether the Pipeline element is overflowed.
     * If the Pipeline is overflowed, this means that we have stages which aren't visible and
     * so we should display the counter.
     */
    const handleCounterDisplay = () => {
      const result = isElementOverflowed(pipelineNode!);
      setHasHiddenStages(result);
    };

    // TODO: change this
    /**
     * Decorates the last visible stage with a className necessary for applying
     * the correct visual appearance. The mutation of the DOM is required otherwise the
     * Stage components will re-render, triggering an infinite loop on the
     * mutation observer.
     */
    const getAllHiddenStages = () => {
      const allStages = Array.from(
        pipelineNode!.children as HTMLCollectionOf<HTMLElement>,
      );

      const allHiddenStages = allStages
        .filter(element => element.dataset.stageVisible === 'false')
        .map(element => element.textContent);

      setTooltipText(getPipelineCounterTooltip(allHiddenStages));
    };

    /**
     * Callback for the Mutation Observer.
     * @param records The records for the observed mutation
     */
    const observeChanges = (records: Array<MutationRecord>) => {
      const types = records.map(r => r.type);
      const attrs = records.map(r => r.attributeName);

      if (attrs.includes('data-stage-visible') || types.includes('childList')) {
        handleCounterDisplay();
        getAllHiddenStages();
      }
    };

    // Effects
    useMutationObserver(
      pipelineNode,
      {
        childList: true,
        subtree: true,
        attributes: true,
      },
      observeChanges,
    );

    const childrenAsPipelineStages = React.Children.map(children, child => {
      const props = {
        size,
        intersectionNode: pipelineNode,
        ref: createRef<HTMLLIElement>(),
      };

      return isStageElement(child)
        ? React.cloneElement(child, props)
        : React.createElement(Stage, { ...props, children: child }); // eslint-disable-line react/no-children-prop
    });

    const {
      base: baseStyle,
      pipeline: pipelineStyle,
    } = getStatefulStyles({ hasHiddenStages, size });

    return (
      <div
        {...rest}
        {...pipelineAttr.prop}
        data-testid="pipeline"
        ref={ref}
        className={cx(baseStyle, className)}
      >
        <ol
          {...pipelineStages.prop}
          ref={setPipelineNode}
          data-testid="pipeline-stages"
          className={cx(pipelineStyle)}
        >
          {childrenAsPipelineStages}
        </ol>

        {hasHiddenStages && React.Children.count(childrenAsPipelineStages) > 0 && (
          <Tooltip
            align="top"
            justify="middle"
            trigger={<Counter size={size} />}
            triggerEvent="hover"
            darkMode={true}
          >
            {tooltipText}
          </Tooltip>
        )}
      </div>
    );
  },
);

Pipeline.displayName = 'Pipeline';

Pipeline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)).isRequired,
};

export default Pipeline;
