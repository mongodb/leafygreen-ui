import React from 'react';

export const MOCK_SECTION_TITLE = 'Use a template to get started quickly';

const generateMockTemplate = (index: number) => {
  return {
    media: <img alt={`Media ${index}`} src="https://placehold.co/240x160" />,
    label: `Label ${index}`,
    description: `Description of template ${index}`,
    badgePropsArray: [
      { children: 'TAG1' },
      { children: 'TAG2' },
      { children: 'TAG3' },
    ],
    buttonProps: { children: `Use template ${index}` },
  };
};

export const generateMockTemplates = (numberToGenerate: number) => {
  return [...new Array(numberToGenerate)].map((_, i) =>
    generateMockTemplate(i + 1),
  );
};
