import React from 'react';
import { css } from 'emotion';
import Code from '@leafygreen-ui/code';
import { InlineCode } from '@leafygreen-ui/typography';

function TypeDefinition({ markdownAst, readme }) {
  const typeNames = markdownAst.children
    .filter(treeItem => treeItem.type === 'heading' && treeItem.depth === 5)
    .map(treeItem => treeItem.children?.[0].value);

  // Gets types defined in readmes to expand upon below the prop table
  const interfaceDefinitions = readme.match(/(?<=typescript).*?(?=```)/gs);

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
            margin-bottom: 16px;
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

  if (typeNames.length !== interfaceDefinitions.length) {
    return null;
  }

  return typeNames.map((typeName: string, index: number) =>
    formatType(typeName, interfaceDefinitions[index]),
  );
}

TypeDefinition.displayName = 'TypeDefinition';

export default TypeDefinition;
