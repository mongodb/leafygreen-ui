import React, { MouseEventHandler } from 'react';

import { Button, Size, Variant } from '@leafygreen-ui/button';
import { VerticalStepProps } from '@leafygreen-ui/vertical-stepper';

export const MOCK_SECTION_TITLE = 'Getting started with [feature name]';

const generateMockActivationStep = (
  index: number,
  onClickPrimary?: MouseEventHandler,
  onClickSecondary?: MouseEventHandler,
): VerticalStepProps => {
  return {
    title: `Step ${index}`,
    description: `Description of step ${index}`,
    media: <img alt={`Media ${index}`} src="https://placehold.co/170x100" />,
    actions: (
      <>
        {onClickSecondary && (
          <Button onClick={onClickSecondary} size={Size.Small}>
            Secondary button
          </Button>
        )}
        {onClickPrimary && (
          <Button
            onClick={onClickPrimary}
            size={Size.Small}
            variant={Variant.Primary}
          >
            Primary button
          </Button>
        )}
      </>
    ),
  };
};

export const generateMockActivationSteps = (
  numberToGenerate: number,
  handleNext?: MouseEventHandler,
  handleBack?: MouseEventHandler,
) => {
  return [...new Array(numberToGenerate)].map((_, i) => {
    if (i === 0) {
      return generateMockActivationStep(i + 1, handleNext);
    }

    return generateMockActivationStep(i + 1, handleNext, handleBack);
  });
};
