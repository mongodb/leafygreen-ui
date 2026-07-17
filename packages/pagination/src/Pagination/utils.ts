export const getCurrentRangeString = (
  itemsPerPage: number,
  currentPage: number,
  numTotalItems?: number,
) => {
  // 0 is a valid total (e.g. a filtered table with no matches); render an empty
  // range rather than a nonsensical "1 - 0".
  if (numTotalItems === 0) return '0 - 0';

  return `${itemsPerPage * (currentPage - 1) + 1} - ${Math.min(
    itemsPerPage * currentPage,
    numTotalItems ?? itemsPerPage * currentPage,
  )}`;
};

export const getRangeMaxString = (numTotalItems?: number) => {
  // Only an unknown total (undefined) renders "many"; a known total of 0 is a
  // valid empty state and renders "0 items".
  if (numTotalItems === undefined) return 'many';

  return numTotalItems === 1 ? '1 item' : `${numTotalItems} items`;
};

export const getTotalNumPages = (
  numTotalItems: number,
  itemsPerPage: number,
) => {
  return Math.ceil(numTotalItems / itemsPerPage);
};

export const isCurrentPageValid = <T extends number>({
  currentPage,
  numTotalItems,
  itemsPerPage,
}: {
  currentPage: number;
  numTotalItems?: number;
  itemsPerPage: T;
}) => {
  if (currentPage < 1) return false;

  if (
    numTotalItems &&
    getTotalNumPages(numTotalItems, itemsPerPage) < currentPage
  ) {
    return false;
  }

  return true;
};

export const areItemsPerPageValid = <T extends number>({
  itemsPerPage,
  itemsPerPageOptions,
}: {
  itemsPerPage: T;
  itemsPerPageOptions: Array<T>;
}) => {
  return itemsPerPageOptions.includes(itemsPerPage);
};
