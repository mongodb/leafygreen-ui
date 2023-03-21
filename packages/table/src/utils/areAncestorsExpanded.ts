import { TableContextValues } from '../TableContext/TableContext.types';
import { LGRowData } from '../useLeafyGreenTable';

/**
 * Returns whether a given row has _all_ ancestor rows expanded
 */
export function getAreAncestorsExpanded<
  T extends LGRowData,
  VS extends boolean,
>(
  /** The starting id */
  startId: string,
  /** The parent getter function */
  getParentRow: TableContextValues<T, VS>['getParentRow'],
) {
  if (!getParentRow) return false;

  let id = startId;
  let parent = getParentRow(id);
  let isExpanded;

  while (parent) {
    isExpanded = (isExpanded ?? true) && parent?.getIsExpanded();
    id = parent.id;
    parent = getParentRow(id);
  }

  return isExpanded;
}
