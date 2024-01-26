import { Dispatch, SetStateAction, useState } from 'react';

import { DescendantsList } from '../Descendants.types';

// export interface InitDescendantsReturnObject<T extends HTMLElement> {
//   descendants: DescendantsList<T>;
//   setDescendants: Dispatch<SetStateAction<DescendantsList<T>>>;
// }

export type InitDescendantsReturnObject<T extends HTMLElement> = [
  DescendantsList<T>,
  Dispatch<SetStateAction<DescendantsList<T>>>,
];

/**
 * Initializes a {@link DescendantsList}
 */
export const useInitDescendants = <
  T extends HTMLElement,
>(): InitDescendantsReturnObject<T> => {
  // TODO: If we need an array & map, consider converting this to a reducer
  return useState<DescendantsList<T>>([]);

  // return {
  //   descendants,
  //   setDescendants,
  // };
};
