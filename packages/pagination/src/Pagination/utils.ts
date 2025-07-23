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
