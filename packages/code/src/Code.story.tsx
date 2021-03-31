import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Language, LanguageOption } from './types';
import { JavaScriptLogo, PythonLogo } from './Logos';
import Code from '.';

const languageOptions = [
  {
    displayName: 'JavaScript',
    language: Language.JavaScript,
    image: <JavaScriptLogo />,
  },
  {
    displayName: 'Python',
    language: Language.Python,
    image: <PythonLogo />,
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

function LanguageSwitcher({ darkMode }: { darkMode: boolean }) {
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
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}

storiesOf('Code', module)
  .add(
    'Multiline',
    () => {
      const margin = 50;
      const wrapperStyle = css`
        margin: ${margin}px;
        max-width: calc(100% - ${margin * 2}px);
      `;

      const lineHighlightOptions = {
        none: [],
        single: [1],
        multiple: [[2, 4], 6],
      } as const;

      return (
        <LeafyGreenProvider>
          <div className={wrapperStyle}>
            <Code
              showLineNumbers={boolean('Show line numbers', false)}
              showWindowChrome={boolean('Show window chrome', false)}
              copyable={boolean('Copyable', true)}
              chromeTitle={text('Chrome label', 'directory/fileName.js')}
              darkMode={boolean('darkMode', false)}
              language={select(
                'Language',
                Object.values(Language),
                Language.JavaScript,
              )}
              highlightLines={
                lineHighlightOptions[
                  select(
                    'highlight lines',
                    ['none', 'single', 'multiple'],
                    'none',
                  )
                ]
              }
            >
              {text('Code snippet', jsSnippet)}
            </Code>
          </div>
        </LeafyGreenProvider>
      );
    },
    {
      knobs: {
        escapeHTML: false,
      },
    },
  )
  .add('LanguageSwitcher', () => {
    const darkMode = boolean('darkMode', false);

    return <LanguageSwitcher darkMode={darkMode} />;
  });
