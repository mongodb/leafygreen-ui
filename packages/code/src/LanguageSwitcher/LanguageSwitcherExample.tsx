import React, { useState } from 'react';

import { LanguageOption } from '../Panel/Panel.types';
import { Language } from '../types';
import Code, { Panel } from '..';

export const languageOptions = [
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
  onChange,
  customActionButtons = [],
  showCustomActionButtons = true,
  ...rest
}: {
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
      language={language.displayName}
      panel={
        <Panel
          languageOptions={languageOptions}
          customActionButtons={customActionButtons}
          showCustomActionButtons={showCustomActionButtons}
          onChange={handleChange}
          title="Title"
        />
      }
      {...rest}
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}

export function LanguageSwitcherWithDeprecatedPropsExample({
  onChange,
  customActionButtons = [],
  ...rest
}: {
  onChange?: Function;
  customActionButtons?: Array<React.ReactElement>;
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
      language={language.displayName}
      languageOptions={languageOptions}
      customActionButtons={customActionButtons}
      onChange={handleChange}
      chromeTitle="Title"
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}
