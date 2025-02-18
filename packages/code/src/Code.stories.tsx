/* eslint-disable no-useless-escape */
import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
  type StoryType,
} from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import {
  languageOptions,
  LanguageSwitcherWithDeprecatedPropsExample,
  LanguageSwitcherWithPanelExample,
} from './LanguageSwitcher/LanguageSwitcherExample';
import Code, { CodeProps, CopyButtonAppearance, Language, Panel } from '.';

const customActionButtons = [
  <IconButton onClick={() => {}} aria-label="label" key="1">
    <Icon glyph="Cloud" />
  </IconButton>,
  <Icon glyph="Shell" size={30} key="3" />,
  <IconButton
    href="https://mongodb.design"
    aria-label="label2"
    key="2"
    target="_blank"
  >
    <Icon glyph="Code" size={30} />
  </IconButton>,
];

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

const jsCustomSnippet = `
mongosh "mongodb+srv://cluster0.abcde.mongodb.net/test" --api 1 --username elmo

mongosh "mongodb+srv://cluster0.abcde.mongodb.net/test" api 1 username elmo

testing a line api and testing username
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
        'children',
      ],
    },
    generate: {
      storyNames: ['WithPanel', 'WithoutPanel', 'Loading'],
    },
  },
  args: {
    language: 'js',
    baseFontSize: 14,
    children: shortJsSnippet,
    copyButtonAppearance: CopyButtonAppearance.Hover,
    chromeTitle: '',
  },
  argTypes: {
    isLoading: { control: 'boolean' },
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
    copyButtonAppearance: {
      options: Object.values(CopyButtonAppearance),
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
      className={css`
        width: 100%;

        .lg-highlight-custom {
          color: red;
        }
      `}
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

export const CustomWord: StoryType<typeof Code, FontSizeProps> = ({
  baseFontSize,
  highlightLines,
  ...args
}: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
      className={css`
        width: 100%;

        .lg-highlight-custom {
          color: red;
        }
      `}
      customKeywordObject={{
        testing: 'custom',
        api: 'custom',
        username: 'custom',
      }}
    >
      {jsCustomSnippet}
    </Code>
  </LeafygreenProvider>
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithCustomActions: StoryType<typeof Code, FontSizeProps> = ({
  baseFontSize,
  highlightLines,
  ...args
}: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <Code
      {...(args as CodeProps)}
      copyButtonAppearance={undefined}
      highlightLines={highlightLines ? [6, [10, 15]] : undefined}
      panel={
        <Panel
          customActionButtons={customActionButtons}
          showCustomActionButtons
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
WithLanguageSwitcher.parameters = {
  controls: {
    exclude: [
      'highlightLines',
      'copyButtonAppearance',
      'copyable',
      'children',
      'expandable',
      'chromeTitle',
    ],
  },
};

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
WithDeprecatedCustomActionProps.parameters = {
  controls: {
    exclude: [
      'highlightLines',
      'copyButtonAppearance',
      'copyable',
      'children',
      'expandable',
      'language',
    ],
  },
};

export const WithDeprecatedLanguageSwitcherProps: StoryType<
  typeof Code,
  FontSizeProps
> = ({ baseFontSize, ...args }: CodeProps & FontSizeProps) => (
  <LeafygreenProvider baseFontSize={baseFontSize}>
    <LanguageSwitcherWithDeprecatedPropsExample
      showCustomActionButtons={true}
      customActionButtons={customActionButtons}
      {...args}
    />
  </LeafygreenProvider>
);
WithDeprecatedLanguageSwitcherProps.parameters = {
  controls: {
    exclude: [
      'highlightLines',
      'copyButtonAppearance',
      'copyable',
      'children',
      'expandable',
      'chromeTitle',
      'language',
    ],
  },
};

export const WithPanel = () => {};
WithPanel.parameters = {
  generate: {
    combineArgs: {
      darkMode: [false, true],
      expandable: [true, false],
      showLineNumbers: [false, true],
      language: ['js', languageOptions[0].displayName],
      panel: [
        <Panel key={1} />,
        <Panel title="Title" key={2} />,
        <Panel
          title="Title"
          languageOptions={languageOptions}
          onChange={() => {}}
          key={3}
        />,
        <Panel languageOptions={languageOptions} onChange={() => {}} key={4} />,
        <Panel
          showCustomActionButtons
          customActionButtons={customActionButtons}
          key={5}
        />,
        <Panel
          title="Title"
          showCustomActionButtons
          customActionButtons={customActionButtons}
          key={6}
        />,
        <Panel
          title="Title"
          showCustomActionButtons
          customActionButtons={customActionButtons}
          languageOptions={languageOptions}
          onChange={() => {}}
          key={7}
        />,
      ],
    },
    excludeCombinations: [
      {
        language: 'js',
        panel: <Panel />,
      },
    ],
  },
};

export const WithoutPanel: StoryType<typeof Code> = () => <></>;
WithoutPanel.parameters = {
  generate: {
    args: {
      language: languageOptions[0].displayName,
    },
    combineArgs: {
      // @ts-expect-error - data-hover is not a valid prop
      'data-hover': [false, true],
      darkMode: [false, true],
      expandable: [true, false],
      copyButtonAppearance: [
        CopyButtonAppearance.Hover,
        CopyButtonAppearance.Persist,
      ],
      showLineNumbers: [false, true],
    },
    excludeCombinations: [
      {
        // @ts-expect-error - data-hover is not a valid prop
        ['data-hover']: true,
        copyButtonAppearance: CopyButtonAppearance.Persist,
      },
    ],
  },
};

export const Loading = () => {};
Loading.parameters = {
  controls: {
    exclude: /.*/g,
  },
  generate: {
    combineArgs: {
      darkMode: [false, true],
      expandable: [true, false],
      panel: [
        undefined,
        <Panel
          title="Title"
          showCustomActionButtons
          customActionButtons={customActionButtons}
          languageOptions={languageOptions}
          onChange={() => {}}
          key={7}
        />,
      ],
    },
    args: {
      language: languageOptions[0].displayName,
      isLoading: true,
    },
  },
};
