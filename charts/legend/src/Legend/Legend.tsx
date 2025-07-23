import React, { forwardRef } from 'react';
import { useSeriesContext } from '@lg-charts/series-provider';

import { LegendCheckbox } from '../LegendCheckbox';

import { getLegendStyles } from './Legend.styles';
import { LegendProps } from './Legend.types';

export const Legend = forwardRef<HTMLDivElement, LegendProps>(
  (
    { className, series, seriesNameFormatter, showSelectAll = true, ...rest },
    fwdRef,
  ) => {
    const {
      isChecked,
      isSelectAllChecked,
      isSelectAllIndeterminate,
      toggleSeries,
      toggleSelectAll,
    } = useSeriesContext();

    return (
      <div {...rest} className={getLegendStyles({ className })} ref={fwdRef}>
        {showSelectAll && (
          <LegendCheckbox
            checked={isSelectAllChecked()}
            indeterminate={isSelectAllIndeterminate()}
            label="Select All"
            onChange={toggleSelectAll}
          />
        )}
        {series.map(name => {
          const formattedName = seriesNameFormatter
            ? seriesNameFormatter(name)
            : name;

          return (
            <LegendCheckbox
              key={name}
              checked={isChecked(name)}
              label={formattedName ?? name}
              name={name}
              onChange={() => toggleSeries(name)}
            />
          );
        })}
      </div>
    );
  },
);

Legend.displayName = 'Legend';
