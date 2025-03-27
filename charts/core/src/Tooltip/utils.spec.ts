import { ChartCardStates } from '@lg-charts/chart-card';

import { ChartStates } from '../Chart';

import { SortDirection, SortKey, SortOrder } from './Tooltip.types';
import { getSortOrder, shouldShowTooltip } from './utils';

describe('@lg-chart/core/Tooltip/utils', () => {
  describe('getSortOrder', () => {
    test('should return SortOrder.ValueAsc when direction is SortDirection.Asc and key is SortKey.Value', () => {
      const result = getSortOrder(SortDirection.Asc, SortKey.Value);
      expect(result).toEqual(SortOrder.ValueAsc);
    });

    test('should return SortOrder.SeriesAsc when direction is SortDirection.Asc and key is SortKey.Name', () => {
      const result = getSortOrder(SortDirection.Asc, SortKey.Name);
      expect(result).toEqual(SortOrder.SeriesAsc);
    });

    test('should return SortOrder.ValueDesc when direction is SortDirection.Desc and key is SortKey.Value', () => {
      const result = getSortOrder(SortDirection.Desc, SortKey.Value);
      expect(result).toEqual(SortOrder.ValueDesc);
    });

    test('should return SortOrder.SeriesDesc when direction is SortDirection.Desc and key is SortKey.Name', () => {
      const result = getSortOrder(SortDirection.Desc, SortKey.Name);
      expect(result).toEqual(SortOrder.SeriesDesc);
    });
  });

  describe('shouldShowTooltip', () => {
    test('should return true when chartState and chartCardState are undefined', () => {
      const result = shouldShowTooltip({});
      expect(result).toEqual(true);
    });

    test('should return false when chartState is ChartStates.Dragging', () => {
      const result = shouldShowTooltip({ chartState: ChartStates.Dragging });
      expect(result).toEqual(false);
    });

    test('should return false when chartState is ChartStates.Overlay', () => {
      const result = shouldShowTooltip({ chartState: ChartStates.Overlay });
      expect(result).toEqual(false);
    });

    test('should return false when chartCardState is ChartCardStates.Dragging', () => {
      const result = shouldShowTooltip({
        chartCardState: ChartCardStates.Dragging,
      });
      expect(result).toEqual(false);
    });

    test('should return false when chartCardState is ChartCardStates.Overlay', () => {
      const result = shouldShowTooltip({
        chartCardState: ChartCardStates.Overlay,
      });
      expect(result).toEqual(false);
    });
  });
});
