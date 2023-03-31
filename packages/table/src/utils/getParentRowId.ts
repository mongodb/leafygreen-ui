/**
 * `react-table`'s Row `id`s are configured so that the first nested row of Row with `id` '0' is: '0.0'.
 *
 * This function parses a Row's `id` to return its immediate parent Row's id if it exists, and returns `undefined` otherwise.
 *
 * @param childId `id` of the referenced row
 * @returns the `id` of the parent row
 */
function getParentRowId(childId?: string) {
  if (childId) {
    const childIds = childId.split('.');
    const parentId = childIds.slice(0, childIds.length - 1).join('.');
    return parentId.length > 0 ? parentId : undefined;
  }
}

export default getParentRowId;
