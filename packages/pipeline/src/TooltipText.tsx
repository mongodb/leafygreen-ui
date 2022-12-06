import React from 'react';

import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { palette } from '@leafygreen-ui/palette';

import { tooltipTextStyles } from './styles';

export interface TooltipTextProps {
  hiddenStages: Array<string | null>;
}

/**
 * # TooltipText
 *
 * React Component to render the TooltipText for the number of hidden hiddenStages in the Pipeline component.
 *
 * input: ['one', 'two']
 * output:
 *  <div>
 *    <span>one</span>
 *    <span><Icon/></span>
 *    <span>two</span>
 *  </div>
 *
 * ```
 * <TooltipText />
 * ```
 * @internal
 */
const TooltipText = ({ hiddenStages }: TooltipTextProps) => {
  return (
    <div className={tooltipTextStyles}>
      {hiddenStages.map((hiddenStage: string | null, index: number) => {
        if (index === 0)
          return (
            <span key={`${hiddenStages[index]}-${index}`}>{hiddenStage}</span>
          );

        return (
          <React.Fragment key={`${hiddenStages[index]}-${index}`}>
            <span>
              <ChevronRight size={12} fill={palette.gray.base} />
            </span>
            <span>{hiddenStage}</span>{' '}
          </React.Fragment>
        );
      })}
    </div>
  );
};

TooltipText.displayName = 'TooltipText';

export default TooltipText;
