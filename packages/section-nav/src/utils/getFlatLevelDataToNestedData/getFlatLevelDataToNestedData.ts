import {
  FlatLevelData,
  NestedData,
  NestedDataItem,
} from '../getTransformToNestedData/getTransformToNestedData.types';

/**
 * Converts a flat array of items with level information into a nested tree structure.
 *
 * @param data - An array of items where each item has a `level`, `id`, and `label`.
 * @returns A nested data structure where each item can have `children`, determined by its level.
 *
 * @example
 * Input:
 * ```ts
 * [
 *   { level: 1, id: '1', label: 'Item 1' },
 *   { level: 2, id: '1.1', label: 'Item 1.1' },
 *   { level: 2, id: '1.2', label: 'Item 1.2' },
 *   { level: 1, id: '2', label: 'Item 2' },
 *   { level: 2, id: '2.1', label: 'Item 2.1' },
 *   { level: 3, id: '2.1.1', label: 'Item 2.1.1' },
 * ]
 * ```
 *
 * Output:
 * ```ts
 * [
 *   {
 *     id: '1',
 *     label: 'Item 1',
 *     children: [
 *       { id: '1.1', label: 'Item 1.1', children: [] },
 *       { id: '1.2', label: 'Item 1.2', children: [] },
 *     ],
 *   },
 *   {
 *     id: '2',
 *     label: 'Item 2',
 *     children: [
 *       {
 *         id: '2.1',
 *         label: 'Item 2.1',
 *         children: [
 *           { id: '2.1.1', label: 'Item 2.1.1', children: [] },
 *         ],
 *       },
 *     ],
 *   },
 * ]
 * ```
 */
export const getFlatLevelDataToNestedData = (data: FlatLevelData) => {
  const results: NestedData = [];
  // This stack will be used to keep track of the current parent items as we traverse the data.
  // It will help us determine where to add the current item based on its level.
  const stack: NestedData = [];

  data.forEach(item => {
    const { level, ...rest } = item;

    // create the new format that should be added to results
    const newItem: NestedDataItem = {
      ...rest,
      children: [],
    };

    if (level === 1) {
      // if level 1 then add it to the results array
      results.push(newItem);
      // reset the stack array
      stack.length = 0;
      // update stack array to include level 1
      stack.push(newItem);
    } else {
      // The length of the stack reflects the level of the previous item. If there is one item in the stack then that items is a level 1 item. If there are two items in the stack then the last item was a level 2 item.
      // With this loop, if the length is greater or equal to the current item level then we should remove the last item because that indicates that the last item is the same level as the current item.
      while (stack && stack.length >= level) {
        stack.pop();
      }

      // Then grab the last item in the stack. That last item is the parent item. Update the children of the parent to include the current item.
      const parent = stack[stack.length - 1];

      // Add the current item to the parent item children.
      if (parent) parent.children.push(newItem);

      // Finally, add the current item to the stack so that it can be used as a parent for the next item.
      stack.push(newItem);
    }
  });
  return results;
};
