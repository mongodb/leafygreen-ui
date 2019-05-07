import React from 'react';
import { storiesOf } from '@storybook/react';
import Code from './index.ts';

const jsSnippet = `\
function helloSomething(something) {
  return \`Hello \${something}\`
}
`;

storiesOf('Code', module).add('Multiline', () => <Code>{jsSnippet}</Code>);
