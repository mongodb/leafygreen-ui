import { ChartCardStates } from '@lg-charts/chart-card';

import { ChartStates } from '../Chart';

import { shouldShowTooltip } from './utils';

describe('@lg-chart/core/ChartTooltip/utils', () => {
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
