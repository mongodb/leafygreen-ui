import { DescendantsList } from '../Descendants.types';

/**
 *
 * @param descendants
 * @param id
 * @returns The index of a descendant with the given id
 *
 * @internal
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
