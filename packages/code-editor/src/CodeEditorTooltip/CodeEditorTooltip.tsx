import React from 'react';
import { CodeEditorTooltipProps } from './CodeEditorTooltip.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  getTooltipStyles,
  tooltipCodeStyles,
} from './CodeEditorTooltip.styles';
import { InlineCode } from '@leafygreen-ui/typography';

export function CodeEditorTooltip({ content, links }: CodeEditorTooltipProps) {
  const { theme } = useDarkMode();

  return (
    <div className={getTooltipStyles(theme)}>
      <InlineCode className={tooltipCodeStyles}>CodeEditorTooltip</InlineCode>
    </div>
  )
}
