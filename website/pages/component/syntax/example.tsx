import React from 'react';
import Syntax, { Language } from '@leafygreen-ui/syntax';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const jsSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}
console.log(greeting('World'));
`;

const knobsConfig: KnobsConfigInterface<{
  showLineNumbers: boolean;
  darkMode: boolean;
  language: Language;
  children: string;
}> = {
  showLineNumbers: {
    type: 'boolean',
    default: false,
    label: 'Show Line Numbers',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  language: {
    type: 'select',
    options: Object.values(Language),
    default: Language.JavaScript,
    label: 'Language',
  },
  children: {
    type: 'area',
    default: jsSnippet,
    label: 'Children',
  },
};

export default function SyntaxLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Syntax {...props} />}
    </LiveExample>
  );
}
