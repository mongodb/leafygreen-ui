import React from 'react';
import { css } from 'emotion';
import Code from '@leafygreen-ui/code';
import { InlineCode } from '@leafygreen-ui/typography';
import { spacing } from '@leafygreen-ui/tokens'
import { readmeDepthMap, HeadingType } from './PropTable';

function TypeDefinition({ markdownAst, readme }) {
  const typeNames = markdownAst.children
    .filter(
      treeItem =>
        treeItem.type === 'heading' &&
        treeItem.depth === readmeDepthMap[HeadingType.TypeDefinition],
    )
    .map(treeItem => treeItem.children?.[0].value);

  // Gets types defined in readmes to expand upon below the prop table
  const getTypes: Array<string> = readme?.split('typescript');
  getTypes.shift();
  const interfaceDefinitions = getTypes?.map(id => {
    return id.split('```')[0];
  });

  if (typeNames.length < 1) {
    return null;
  }

  function formatType(typeName: string, interfaceDefinition: string) {
    return (
      <div
        className={css`
          margin-top: 56px;
        `}
      >
        <div
          className={css`
            margin-bottom: ${spacing[3]}px;
          `}
        >
          <InlineCode>{typeName}</InlineCode>
        </div>

        <Code copyable={false} language="typescript">
          {interfaceDefinition}
        </Code>
      </div>
    );
  }

  return typeNames.map((typeName: string, index: number) =>
    formatType(typeName, interfaceDefinitions[index]),
  );
}

TypeDefinition.displayName = 'TypeDefinition';

export default TypeDefinition;
