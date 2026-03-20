export const getCurrentRangeString = (
  itemsPerPage: number,
  currentPage: number,
  numTotalItems?: number,
) => {
  return `${itemsPerPage * (currentPage - 1) + 1} - ${Math.min(
    itemsPerPage * currentPage,
    numTotalItems ?? itemsPerPage * currentPage,
  )}`;
};

export const getRangeMaxString = (numTotalItems?: number) => {
  if (!numTotalItems) return 'many';

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
