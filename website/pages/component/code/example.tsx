import React, { useState } from 'react';
import Code, { Language } from '@leafygreen-ui/code';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

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

function LanguageSwitcher({
  darkMode,
  highlightLines,
}: {
  darkMode: boolean;
  highlightLines?: Array<number>;
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
  darkMode: boolean;
  language: Language;
  children: string;
  withLanguageSwitcher: boolean;
  showSyntaxHighlighting: boolean;
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
            {...props}
          />
        )
      }
    </LiveExample>
  );
}
