import React from 'react';
import { storiesOf } from '@storybook/react';
import Syntax from './index.ts';

const jsSnippet = `\
function helloSomething(something) {
  return \`Hello \${something}\`
}
`;

storiesOf('Syntax', module).add('Syntax', () => (
  <Syntax lang="javascript">{jsSnippet}</Syntax>
));
