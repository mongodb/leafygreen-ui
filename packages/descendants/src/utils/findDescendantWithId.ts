import { DescendantsList } from 'src/Descendants.types';

/**
 *
 * @param descendants
 * @param id
 * @returns The index of a descendant with the given id
 */
export function findDescendantIndexWithId(
  descendants: DescendantsList,
  id: string,
) {
  const index = descendants.findIndex(d => {
    return d.id === id;
  });
  return index;
}
