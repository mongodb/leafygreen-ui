import React from 'react';
import Code, { Language } from '@leafygreen-ui/code';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const jsSnippet = `function greeting(entity) {
  return \`Hello, \${entity}!\`;
}
console.log(greeting('World'));
`;

const knobsConfig: KnobsConfigInterface<{
  showWindowChrome: boolean;
  copyable: boolean;
  chromeTitle: string;
  darkMode: boolean;
  language: Language;
  children: string;
}> = {
  showWindowChrome: {
    type: 'boolean',
    default: false,
    label: 'Show Window Chrome',
  },
  copyable: {
    type: 'boolean',
    default: true,
    label: 'Copyable',
  },
  chromeTitle: {
    type: 'text',
    default: 'Chrome Title',
    label: 'Chrome Title',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  language: {
    type: 'select',
    default: Language.JavaScript,
    options: Object.values(Language),
    label: 'Language',
  },
  children: {
    type: 'area',
    default: jsSnippet,
    label: 'Children',
  },
};

export default function CodeLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Code {...props} />}
    </LiveExample>
  );
}
