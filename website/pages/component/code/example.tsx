import React, { useState } from 'react';
import Code, { Language } from '@leafygreen-ui/code';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

interface LanguageOption {
  displayName: string;
  language: Language;
}

const languageOptions = [
  {
    displayName: 'JavaScript',
    language: Language.JavaScript,
  },
  {
    displayName: 'Python',
    language: Language.Python,
  },
];

const jsSnippet = `

function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));

`;

const pythonSnippet = `

def greeting(entity):
    return "Hello {}".format(entity)

print (greeting("World"))

`;

const snippetMap = {
  [Language.JavaScript]: jsSnippet,
  [Language.Python]: pythonSnippet,
};

function CustomActions(darkMode: boolean) {
  return [
    <IconButton
      onClick={() => {}}
      aria-label="label"
      darkMode={darkMode}
      key="1"
    >
      <Icon glyph="Cloud" />
    </IconButton>,
    <IconButton
      href="https://mongodb.design"
      aria-label="label2"
      darkMode={darkMode}
      key="2"
      target="_blank"
    >
      <Icon glyph="Code" />
    </IconButton>,
  ];
}

function LanguageSwitcher({
  darkMode,
  highlightLines,
  showCustomActionButtons,
}: {
  darkMode: boolean;
  highlightLines?: Array<number>;
  showCustomActionButtons: boolean;
}) {
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const handleChange = (languageObject: LanguageOption) => {
    setLanguage(languageObject);
  };

  const languageIndex = language.language;

  return (
    <Code
      language={language?.displayName}
      onChange={handleChange}
      languageOptions={languageOptions}
      darkMode={darkMode}
      highlightLines={highlightLines}
      customActionButtons={CustomActions(darkMode)}
      showCustomActionButtons={showCustomActionButtons}
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}

const knobsConfig: KnobsConfigInterface<{
  showWindowChrome: boolean;
  copyable: boolean;
  chromeTitle: string;
  showLineNumbers: boolean;
  lineOffset: number;
  darkMode: boolean;
  language: Language;
  children: string;
  withLanguageSwitcher: boolean;
  showSyntaxHighlighting: boolean;
  showCustomActionButtons: boolean;
}> = {
  showSyntaxHighlighting: {
    type: 'boolean',
    default: false,
    label: 'Show Syntax Highlighting',
  },
  showWindowChrome: {
    type: 'boolean',
    default: false,
    label: 'Show Window Chrome',
  },
  showCustomActionButtons: {
    type: 'boolean',
    default: false,
    label: 'Show Custom Action Buttons',
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
  showLineNumbers: {
    type: 'boolean',
    default: false,
    label: 'Show Line Numbers',
  },
  lineOffset: {
    type: 'number',
    default: 1,
    label: "First row's line number value",
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
  withLanguageSwitcher: {
    type: 'boolean',
    default: false,
    label: 'With Language Switcher',
  },
};

export default function CodeLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ withLanguageSwitcher, showSyntaxHighlighting, ...props }) =>
        withLanguageSwitcher ? (
          <LanguageSwitcher
            highlightLines={showSyntaxHighlighting ? [2] : undefined}
            {...props}
          />
        ) : (
          <Code
            highlightLines={showSyntaxHighlighting ? [2] : undefined}
            customActionButtons={CustomActions(props.darkMode)}
            {...props}
          />
        )
      }
    </LiveExample>
  );
}
