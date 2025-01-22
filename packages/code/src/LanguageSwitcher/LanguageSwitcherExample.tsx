import React, { useState } from 'react';

import { Language } from '../types';
import { LanguageOption } from '../Panel/Panel.types';
import Code, { Panel } from '..';

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
  return \`Hello, \${entity}! Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.\`;
}

console.log(greeting('World'));

`;

const pythonSnippet = `

def greeting(entity):
    return "Hello {} Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.".format(entity)

print (greeting("World"))

`;

const snippetMap = {
  [Language.JavaScript]: jsSnippet,
  [Language.Python]: pythonSnippet,
};

export function LanguageSwitcherWithPanelExample({
  darkMode,
  onChange,
  customActionButtons = [],
  showCustomActionButtons = true,
  ...rest
}: {
  darkMode?: boolean;
  onChange?: Function;
  customActionButtons?: Array<React.ReactElement>;
  showCustomActionButtons?: boolean;
}) {
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const handleChange = (languageObject: LanguageOption) => {
    setLanguage(languageObject);
    onChange?.(languageObject);
  };

  const languageIndex = language.language;

  return (
    <Code
      {...rest}
      language={language}
      lineNumberStart={1}
      darkMode={darkMode}
      panel={
        <Panel
          languageOptions={languageOptions}
          customActionButtons={customActionButtons}
          showCustomActionButtons={showCustomActionButtons}
          onChange={handleChange}
          title="Title"
        />
      }
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}

export function LanguageSwitcherWithDeprecatedPropsExample({
  darkMode,
  onChange,
  customActionButtons = [],
  showCustomActionButtons = false,
}: {
  darkMode?: boolean;
  onChange?: Function;
  customActionButtons?: Array<React.ReactElement>;
  showCustomActionButtons?: boolean;
}) {
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const handleChange = (languageObject: LanguageOption) => {
    setLanguage(languageObject);
    onChange?.(languageObject);
  };

  const languageIndex = language.language;

  return (
    <Code
      language={language}
      lineNumberStart={1}
      darkMode={darkMode}
      languageOptions={languageOptions}
      customActionButtons={customActionButtons}
      onChange={handleChange}
      chromeTitle="Title"
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}
