import React from 'react';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';

import { tooltipTextStyles } from './styles';
import { palette } from '@leafygreen-ui/palette';

export interface TooltipTextProps {
  hiddenStages: Array<string | null>;
}

/**
 * # TooltipText
 *
 * React Component to render the TooltipText for the number of hidden hiddenStages in the Pipeline component.
 *
 * ```
 * <TooltipText />
 * ```
 * @internal
 */
const TooltipText = ({ hiddenStages }: TooltipTextProps) => {
  const tooltipChildren = [];

  if (hiddenStages.length > 0) {
    for (let i = 0; i < hiddenStages.length; i++) {
      if (i === 0) {
        tooltipChildren.push(
          <span key={`${hiddenStages[i]}-${i}`}>{hiddenStages[i]}</span>,
        );
      } else {
        tooltipChildren.push(
          <span key={`icon-${i}`}>
            <ChevronRight size={12} fill={palette.gray.base} />
          </span>,
        );
        tooltipChildren.push(
          <span key={`${hiddenStages[i]}-${i}`}>{hiddenStages[i]}</span>,
        );
      }
    }
  }

  return <div className={tooltipTextStyles}>{tooltipChildren}</div>;
};

TooltipText.displayName = 'TooltipText';

export default TooltipText;
