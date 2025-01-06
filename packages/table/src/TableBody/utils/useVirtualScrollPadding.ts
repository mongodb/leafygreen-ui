import { LGRowData } from '../../useLeafyGreenTable';
import { LeafyGreenVirtualTable } from '../../useLeafyGreenVirtualTable';

/**
 *  `useVirtualScrollPadding` returns an object with the `paddingTop` and `paddingBottom` values calculated based on the virtualized table's current scroll state, which will be used to create the effect of virtual scrolling. For non-virtualized tables, both values will default to 0.
 *
 * @param isVirtual Whether this is a virtual table
 * @param virtualTable Available properties and methods return from the Virtualizer instance.
 * @returns An object containing the top and bottom padding values
 */
export const useVirtualScrollPadding = <T extends LGRowData>(
  isVirtual = false,
  virtualTable?: LeafyGreenVirtualTable<T>['virtual'],
) => {
  let paddingTop = 0;
  let paddingBottom = 0;

  if (isVirtual && virtualTable) {
    const virtualItems = virtualTable.getVirtualItems();
    const numOfVirtualItems = virtualItems.length || 0;
    const startOfFirstVirtualItem = virtualItems[0]?.start || 0;
    const endOfLastVirtualItem =
      virtualItems[virtualItems.length - 1]?.end || 0;
    const totalSizOfVirtualTable = virtualTable.getTotalSize() || 0;

    paddingTop = numOfVirtualItems > 0 ? startOfFirstVirtualItem : 0;
    paddingBottom =
      numOfVirtualItems > 0 ? totalSizOfVirtualTable - endOfLastVirtualItem : 0;
  }

  return {
    paddingTop,
    paddingBottom,
  };
};
