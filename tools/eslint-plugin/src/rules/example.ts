/* eslint-disable no-console */
import { createRule } from '../utils/createRule';

export const exampleRule = createRule({
  name: 'example',
  meta: {
    type: 'suggestion',
    messages: {
      'message-1': '',
    },
    schema: [],
    docs: {
      description: 'A test rule',
    },
  },
  defaultOptions: [],
  create: context => {
    return {
      VariableDeclaration: node => {
        // Executes on any variable declaration
        // e.g. const myVar = 5;
      },
      JSXOpeningElement: node => {
        // Executes on any JSX opening element
        // e.g. <Body>
      },
    };
  },
});
