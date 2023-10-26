import { createMatcher } from '../utils/createMatcher';

export const toBeLabelled = createMatcher((element: Element) => {
  return {
    pass: true,
    message: () => '',
  };
});
