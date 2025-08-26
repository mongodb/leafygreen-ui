import React, { useState } from 'react';

import { LanguageOption } from '../Panel/Panel.types';
import { languageOptions } from '../testing/Code.testutils';
import { Language } from '../types';
import Code, { Panel } from '..';

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

const shellSnippet = `

#!/bin/sh
echo "Hello world"

`;

const snippetMap = {
  [Language.JavaScript]: jsSnippet,
  [Language.Python]: pythonSnippet,
  [Language.Shell]: shellSnippet,
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
      language={language.language}
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
      {snippetMap[languageIndex as 'javascript' | 'python' | 'shell']}
    </Code>
  );
}
