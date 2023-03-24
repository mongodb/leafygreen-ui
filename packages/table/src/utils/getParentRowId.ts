function getParentRowId(childId?: string) {
  if (childId) {
    const childIds = childId.split('.'); // ['0']
    const parentId = childIds.slice(0, childIds.length - 1).join('.'); // []
    return parentId.length > 0 ? parentId : undefined;
  }
}

export default getParentRowId;
