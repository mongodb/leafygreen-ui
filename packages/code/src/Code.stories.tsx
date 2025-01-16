/* eslint-disable no-useless-escape */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
  type StoryType,
} from '@lg-tools/storybook-utils';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import {
  LanguageSwitcherWithPanelExample,
  LanguageSwitcherWithDepricatedPropsExample,
} from './LanguageSwitcher/LanguageSwitcherExample';
import Code, { CodeProps, Language, Panel } from '.';

const jsSnippet = `
import datetime from './';

const myVar = 42;

var myObj = {
  someProp: ['arr', 'ay'],
  regex: /([A-Z])\w+/
}

export default class myClass {
  constructor(){
    // access properties
    this.myProp = false
  }
}

function greeting(entity) {
  return \`Hello, \${entity}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
}
 
console.log(greeting('World'));
`;

// > 5 lines to trigger expandable code block
const shortJsSnippet = `
  function greeting(entity) {
    return \`Hello, \${entity}\`;
  }

  console.log(greeting('World'));
  console.log(greeting('Universe'));
`;

const meta: StoryMetaType<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'showCustomActionButtons',
        'showCustomButtons',
        'customActionButtons',
        'languageOptions',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        copyable: [true, false],
        expandable: [true, false],
        showLineNumbers: [false, true],
      },
    },
  },
  args: {
    language: 'js',
    baseFontSize: 14,
    children: shortJsSnippet,
  },
  argTypes: {
    copyable: { control: 'boolean' },
    expandable: { control: 'boolean' },
    showLineNumbers: { control: 'boolean' },
    highlightLines: { control: 'boolean' },
    darkMode: storybookArgTypes.darkMode,
    lineNumberStart: { control: 'number' },
    baseFontSize: storybookArgTypes.baseFontSize,
    language: {
      options: Object.values(Language),
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type BaseFontSize = 14 | 16;
interface FontSizeProps {
  baseFontSize: BaseFontSize;
}

export const LiveExample: StoryType<typeof Code, FontSizeProps> = ({
  baseFontSize,
  highlightLines,
  ...args
}: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
    >
      {jsSnippet}
    </Code>
  </LeafygreenProvider>
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

const customActionButtons = [
  <IconButton onClick={() => {}} aria-label="label" key="1">
    <Icon glyph="Cloud" />
  </IconButton>,
  // <Icon glyph="Shell" size={30} key="3" />,
  <IconButton
    href="https://mongodb.design"
    aria-label="label2"
    key="2"
    target="_blank"
  >
    <Icon glyph="Code" size={30} />
  </IconButton>,
];

// export const WithCustomActions = LiveExample.bind({});
// WithCustomActions.args = {
//   showCustomActionButtons: true,
//   customActionButtons,
//   // panel: [
//   //   <Panel
//   //     language={language}
//   //     languageOptions={languageOptions}
//   //     customActionButtons={customActionButtons}
//   //     showCustomActionButtons={showCustomActionButtons}
//   //     onChange={handleChange}
//   //     showCopyButton
//   //     contents={snippetMap[languageIndex as 'javascript' | 'python']}
//   //   />
//   // ]
// };

export const WithCustomActions: StoryType<typeof Code, FontSizeProps> = ({
  baseFontSize,
  highlightLines,
  ...args
}: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
      panel={
        <Panel
          customActionButtons={customActionButtons}
          showCustomActionButtons
          // title="Title"
        />
      }
    >
      {jsSnippet}
    </Code>
  </LeafygreenProvider>
);

export const WithLanguageSwitcher: StoryType<typeof Code, FontSizeProps> = ({
  baseFontSize,
  ...args
}: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <LanguageSwitcherWithPanelExample
      showCustomActionButtons={true}
      customActionButtons={customActionButtons}
      {...args}
    />
  </LeafygreenProvider>
);

export const WithDeprecatedCustomActionProps: StoryType<
  typeof Code,
  FontSizeProps
> = ({ baseFontSize, highlightLines, ...args }: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
      customActionButtons={customActionButtons}
      showCustomActionButtons
    >
      {jsSnippet}
    </Code>
  </LeafygreenProvider>
);

export const WithDeprecatedCopyableProps: StoryType<
  typeof Code,
  FontSizeProps
> = ({ baseFontSize, highlightLines, ...args }: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
      copyable
    >
      {jsSnippet}
    </Code>
  </LeafygreenProvider>
);

export const WithDeprecatedLanguageSwitcher: StoryType<
  typeof Code,
  FontSizeProps
> = ({ baseFontSize, ...args }: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <LanguageSwitcherWithDepricatedPropsExample
      showCustomActionButtons={true}
      customActionButtons={customActionButtons}
      {...args}
    />
  </LeafygreenProvider>
);

// export const WithDeprecatedLanguageProps: StoryType<
//   typeof Code,
//   FontSizeProps
// > = ({ baseFontSize, highlightLines, ...args }: CodeProps & FontSizeProps) => (
//   <LeafygreenProvider baseFontSize={baseFontSize}>
//     <Code
//       {...(args as CodeProps)}
//       highlightLines={highlightLines ? [6, [10, 15]] : undefined}
//       copyable
//     >
//       {jsSnippet}
//     </Code>
//   </LeafygreenProvider>
// );

export const Generated = () => {};
