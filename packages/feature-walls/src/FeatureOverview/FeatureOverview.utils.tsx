import React from 'react';

export const MOCK_SECTION_TITLE = 'Key Features/ Benefits/ Capabilities';

const generateMockFeature = (index: number) => {
  return {
    media: <img alt={`Media ${index}`} src="https://placehold.co/440x276" />,
    title: `Feature ${index}`,
    description: `Description of feature ${index}`,
  };
};

export const generateMockFeatures = (numberToGenerate: number) => {
  return [...new Array(numberToGenerate)].map((_, i) =>
    generateMockFeature(i + 1),
  );
};
