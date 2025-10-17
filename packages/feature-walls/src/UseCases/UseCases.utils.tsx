import React from 'react';

export const MOCK_SECTION_TITLE = 'Learn how [feature name] fits your use case';

const generateMockUseCase = (index: number) => {
  return {
    media: (
      <img
        alt={`Media ${index}`}
        src="https://placehold.co/72x72"
        height={72}
        width={72}
      />
    ),
    label: `Label ${index}`,
    description: `Description of use case ${index}`,
  };
};

export const generateMockUseCases = (numberToGenerate: number) => {
  return [...new Array(numberToGenerate)].map((_, i) =>
    generateMockUseCase(i + 1),
  );
};
