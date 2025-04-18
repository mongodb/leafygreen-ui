import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import Code from '../Code/Code';
import { CodeProps } from '../Code/Code.types';
import { Panel } from '../Panel';
import { PanelProps } from '../Panel/Panel.types';
import { Language } from '../types';

import { getTestUtils } from './getTestUtils';
import type { TestUtilsReturnType } from './getTestUtils.types';

const codeSnippet = `
import datetime from './';

const myVar = 42;

var myObj = {
  someProp: ['arr', 'ay'],
  regex: /([A-Z])w+/
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
 
console.log(greeting('World'));`;

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

export const renderCodeWithLanguageSwitcher = ({
  props = {},
  isLoading = false,
}: {
  props?: Partial<PanelProps>;
  isLoading?: boolean;
}): RenderResult & TestUtilsReturnType => {
  const renderResults = render(
    <Code
      isLoading={isLoading}
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

export const renderMultipleCodes = (): RenderResult => {
  const renderResults = render(
    <>
      <Code
        data-lgid="lg-code-1"
        language={languageOptions[0].displayName}
        panel={<Panel onChange={() => {}} languageOptions={languageOptions} />}
      >
        {codeSnippet}
      </Code>
      <Code
        data-lgid="lg-code-2"
        language={languageOptions[1].displayName}
        panel={<Panel onChange={() => {}} languageOptions={languageOptions} />}
      >
        {codeSnippet}
      </Code>
    </>,
  );

  return {
    ...renderResults,
  };
};
