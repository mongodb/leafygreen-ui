import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Code from '@leafygreen-ui/code';
import { Language } from '@leafygreen-ui/syntax';

const jsSnippet = `
function greeting(entity) {
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
  // highlightLines?: Array<number>
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
  // highlightLines: {
  //   type: 'select',
  //   default: undefined,
  //   options: [undefined, [1], [2, 3, 5]],
  //   label: 'Highlight Lines',
  // },
  children: {
    type: 'text',
    default: jsSnippet,
    label: 'Children',
  },
} as const;

const CodeLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Code {...props} />}
    </LiveExample>
  );
};

export default CodeLiveExample;
