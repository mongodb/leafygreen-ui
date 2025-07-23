import React, { ReactNode } from 'react';

import CursorIcon from '@leafygreen-ui/icon/dist/Cursor';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  closeButtonStyles,
  getHeaderStyles,
  pinTooltipNoteStyles,
} from './CustomTooltip.styles';
import { CustomTooltipProps } from './CustomTooltip.types';
import { SeriesList } from './SeriesList';

function formatDate(dateTimeStamp: number) {
  const date = new Date(dateTimeStamp);

  return (
    date.toLocaleString('en-US', {
      timeZone: 'UTC',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }) + ' (UTC)'
  );
}

export function CustomTooltip({
  chartId,
  darkMode,
  headerFormatter,
  seriesData,
  seriesNameFormatter,
  seriesValueFormatter,
  sort,
  tooltipPinned,
}: CustomTooltipProps) {
  const { theme } = useDarkMode(darkMode);

  if (seriesData.length === 0 || !seriesData[0].data[0]) {
    return null;
  }

  let axisValueLabel: ReactNode;

  if (headerFormatter) {
    axisValueLabel = headerFormatter(
      seriesData[0].axisType === 'xAxis.time'
        ? (seriesData[0].axisValue as number) // Should be num since axisType is time
        : seriesData[0].axisValueLabel,
    );
  } else {
    axisValueLabel =
      seriesData[0].axisType === 'xAxis.time'
        ? formatDate(seriesData[0].axisValue as number) // Should be num since axisType is time
        : seriesData[0].axisValueLabel;
  }

  return (
    <>
      <div className={getHeaderStyles(theme)}>
        <span>{axisValueLabel}</span>
        {tooltipPinned ? (
          <IconButton
            data-chartid={chartId}
            aria-label="Unpin tooltip"
            className={closeButtonStyles}
            darkMode={!darkMode}
          >
            <XIcon size="small" />
          </IconButton>
        ) : (
          <div className={pinTooltipNoteStyles}>
            <CursorIcon size={11} />
            <span>Click to Pin</span>
          </div>
        )}
      </div>
      <SeriesList
        data-chartid={chartId}
        seriesData={seriesData}
        seriesValueFormatter={seriesValueFormatter}
        seriesNameFormatter={seriesNameFormatter}
        sort={sort}
        theme={theme}
        tooltipPinned={tooltipPinned}
      />
    </>
  );
}
