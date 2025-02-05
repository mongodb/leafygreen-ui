import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Code from './Code/Code';
import { CodeProps } from './Code/Code.types';
import { PanelProps } from './Panel/Panel.types';
import { getTestUtils } from './utils/getTestUtils/getTestUtils';
import { TestUtilsReturnType } from './utils/getTestUtils/getTestUtils.types';
import { Panel } from './Panel';
import { Language } from './types';

const codeSnippet = 'const greeting = "Hello, world!";';

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

export const renderCode = (
  props: Partial<CodeProps> = {},
): RenderResult & TestUtilsReturnType => {
  const renderResults = render(
    <Code language={languageOptions[0].language} {...props}>
      {codeSnippet}
    </Code>,
  );

  const testUtils = getTestUtils();

  return {
    ...renderResults,
    ...testUtils,
  };
};

export const renderCodeWithLanguageSwitcher = (
  props: Partial<PanelProps> = {},
): RenderResult & TestUtilsReturnType => {
  const renderResults = render(
    <Code
      language={languageOptions[0].displayName}
      panel={
        <Panel
          onChange={() => {}}
          {...props}
          languageOptions={languageOptions}
        />
      }
    >
      {codeSnippet}
    </Code>,
  );

  const testUtils = getTestUtils();

  return {
    ...renderResults,
    ...testUtils,
  };
};
