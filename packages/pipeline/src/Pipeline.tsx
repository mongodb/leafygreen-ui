import React, {
  createRef,
  forwardRef,
  ReactElement,
  Ref,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useMutationObserver } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import Tooltip, { Align, Justify, RenderMode } from '@leafygreen-ui/tooltip';

import Counter from './Counter';
import { PipelineContext } from './PipelineContext';
import Stage from './Stage';
import {
  basePipelineListStyles,
  basePipelineStyles,
  baseSizeStyles,
  counterVisibleStyles,
  tooltipStyles,
} from './styles';
import TooltipText from './TooltipText';
import { PipelineProps, Size } from './types';

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
    {
      children,
      className = '',
      size = Size.Normal,
      darkMode: darkModeProp,
      ...rest
    }: PipelineProps,
    ref: Ref<HTMLDivElement>,
  ): ReactElement => {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    // State
    const [pipelineNode, setPipelineNode] = useState<HTMLElement | null>(null);
    const [hiddenStages, setHiddenStages] = useState<Array<string | null>>([]);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const providerData = useMemo(() => {
      return {
        theme,
        size,
        isPipelineComponent: true,
        intersectionNode: pipelineNode,
      };
    }, [pipelineNode, size, theme]);

    // Handlers
    /**
     * Sets the hidden stages. The mutation of the DOM is required otherwise the
     * Stage components will re-render, triggering an infinite loop on the
     * mutation observer.
     */
    const setAllHiddenStagesText = () => {
      const allStages =
        Array.from(pipelineNode!.children as HTMLCollectionOf<HTMLElement>) ||
        [];

      const allHiddenStages = allStages
        .filter(element => element.dataset.stageVisible === 'false')
        .map(element => element.textContent);

      setHiddenStages(allHiddenStages);
    };

    /**
     * Callback for the Mutation Observer.
     * @param records The records for the observed mutation
     */
    const observeChanges = (records: Array<MutationRecord>) => {
      const types = records.map(r => r.type);
      const attrs = records.map(r => r.attributeName);

      if (attrs.includes('data-stage-visible') || types.includes('childList')) {
        setAllHiddenStagesText();
      }
    };

    /**
     * Callback to handle mouse enter event on the Counter component to immediately open tooltip on hover.
     */
    const handleMouseEnter = () => {
      setTooltipOpen(true);
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
        ref: createRef<HTMLLIElement>(),
      };

      if (isComponentType(child, 'Stage')) {
        const { children, ...rest } = child.props;
        const combinedProps = {
          ...props,
          ...rest,
        };
        return <Stage {...combinedProps}>{children}</Stage>;
      }

      return <Stage {...props}>{child}</Stage>;
    });

    return (
      <PipelineContext.Provider value={providerData}>
        <div
          {...rest}
          data-testid="pipeline"
          ref={ref}
          className={cx(baseSizeStyles[size], basePipelineStyles, className)}
        >
          <ol
            ref={setPipelineNode}
            data-testid="pipeline-stages"
            className={cx(basePipelineListStyles)}
          >
            {childrenAsPipelineStages}
          </ol>

          {/* Removing the component was causing an unmounted error so instead we're hiding it with css */}
          <Tooltip
            align={Align.Top}
            className={tooltipStyles}
            darkMode={darkMode}
            justify={Justify.Middle}
            open={tooltipOpen}
            renderMode={RenderMode.TopLayer}
            setOpen={setTooltipOpen}
            trigger={
              <Counter
                className={cx({
                  [counterVisibleStyles]: !!hiddenStages.length,
                })}
                onMouseEnter={handleMouseEnter}
              />
            }
            triggerEvent="hover"
          >
            <TooltipText hiddenStages={hiddenStages} />
          </Tooltip>
        </div>
      </PipelineContext.Provider>
    );
  },
);

Pipeline.displayName = 'Pipeline';

Pipeline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)).isRequired,
  darkMode: PropTypes.bool,
};

export default Pipeline;
