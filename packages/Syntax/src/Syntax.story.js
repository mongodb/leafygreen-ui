import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs'
import Syntax from '.';

const jsSnippet = `\
function helloSomething(something) {
  return \`Hello \${something}\`
}
`;

storiesOf('Syntax', module).add('Syntax', () => (
  <Syntax lang="javascript">{text('text', jsSnippet)}</Syntax>
));
