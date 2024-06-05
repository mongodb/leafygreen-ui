import { type TableContextValues } from '../TableContext';
import { LGRowData } from '../useLeafyGreenTable';

/**
 * Returns whether a given row has _all_ ancestor rows expanded. E.g. parents of parent
 */
export function getAreAncestorsExpanded<T extends LGRowData>(
  /** The parent id */
  parentId: string | undefined,
  /** The row getter function */
  getRowById: TableContextValues<T>['getRowById'],
) {
  if (!getRowById) return false;

  let parent = getRowById(parentId);
  let isExpanded;

  while (parent) {
    isExpanded = (isExpanded ?? true) && parent?.getIsExpanded();
    parent = getRowById(parent.parentId || undefined); // If parentId is 0, return undefined
  }

  return isExpanded;
}
