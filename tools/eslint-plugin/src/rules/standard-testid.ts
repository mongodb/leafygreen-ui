/* eslint-disable no-console */
import { createRule } from '../utils/createRule';

export const standardTestidRule = createRule({
  name: 'standard-testid',
  meta: {
    type: 'suggestion',
    messages: {
      nonstandard: 'Nonstandard testid',
    },
    schema: [],
    docs: {
      description: '',
    },
  },
  defaultOptions: [],
  create: context => {
    return {
      JSXOpeningElement: node => {
        console.log(node);
      },
    };
  },
});
