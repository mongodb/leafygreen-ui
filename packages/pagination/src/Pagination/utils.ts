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
  return numTotalItems ? `${numTotalItems} items` : 'many';
};

export const getTotalNumPages = (numItems: number, itemsPerPage: number) => {
  return Math.ceil(numItems / itemsPerPage);
};

export const validateCurrentPage = <T extends number>({
  currentPage,
  numTotalItems,
  itemsPerPage,
}: {
  currentPage: number;
  numTotalItems?: number;
  itemsPerPage: T;
}) => {
  return (
    currentPage < 1 ||
    (numTotalItems &&
      getTotalNumPages(numTotalItems, itemsPerPage) < currentPage)
  );
};

export const validateItemsPerPage = <T extends number>({
  itemsPerPage,
  itemsPerPageOptions,
}: {
  itemsPerPage: T;
  itemsPerPageOptions: Array<T>;
}) => {
  return !itemsPerPageOptions.includes(itemsPerPage);
};
