import { SortDirection, SortKey, SortOrder } from './Tooltip.types';
import { getSortOrder } from './utils';

describe('@lg-chart/core/Tooltip/utils', () => {
  describe('getSortOrder', () => {
    it('should return SortOrder.ValueAsc when direction is SortDirection.Asc and key is SortKey.Value', () => {
      const result = getSortOrder(SortDirection.Asc, SortKey.Value);
      expect(result).toEqual(SortOrder.ValueAsc);
    });

    it('should return SortOrder.SeriesAsc when direction is SortDirection.Asc and key is SortKey.Name', () => {
      const result = getSortOrder(SortDirection.Asc, SortKey.Name);
      expect(result).toEqual(SortOrder.SeriesAsc);
    });

    it('should return SortOrder.ValueDesc when direction is SortDirection.Desc and key is SortKey.Value', () => {
      const result = getSortOrder(SortDirection.Desc, SortKey.Value);
      expect(result).toEqual(SortOrder.ValueDesc);
    });

    it('should return SortOrder.SeriesDesc when direction is SortDirection.Desc and key is SortKey.Name', () => {
      const result = getSortOrder(SortDirection.Desc, SortKey.Name);
      expect(result).toEqual(SortOrder.SeriesDesc);
    });
  });
});
