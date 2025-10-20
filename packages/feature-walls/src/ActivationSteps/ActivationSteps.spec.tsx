import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { VerticalStepProps } from '@leafygreen-ui/vertical-stepper';

import { ActivationStepsProps } from './ActivationSteps.types';
import {
  generateMockActivationSteps,
  MOCK_SECTION_TITLE,
} from './ActivationSteps.utils';
import { DEFAULT_COMPLETED_MESSAGE } from './constants';
import { ActivationSteps } from '.';

const NUMBER_OF_STEPS = 3;

let mockSteps: Array<VerticalStepProps>;

const ActivationStepsWrapper = (props?: Partial<ActivationStepsProps>) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  mockSteps = generateMockActivationSteps(
    NUMBER_OF_STEPS,
    handleNext,
    handleBack,
  );

  return (
    <ActivationSteps
      currentStep={currentStep}
      steps={mockSteps}
      title={MOCK_SECTION_TITLE}
      {...props}
    />
  );
};

const renderActivationSteps = (props?: Partial<ActivationStepsProps>) => {
  return render(<ActivationStepsWrapper {...props} />);
};

describe('packages/feature-walls/ActivationSteps', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderActivationSteps();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders each of the provided steps', () => {
    const { getByText } = renderActivationSteps();

    mockSteps.forEach(step => {
      expect(getByText(step.title)).toBeInTheDocument();
    });
  });

  test('renders completed message if currentStep is greater than or equal to number of steps', () => {
    const { getByText } = renderActivationSteps({
      currentStep: NUMBER_OF_STEPS,
    });
    expect(getByText(DEFAULT_COMPLETED_MESSAGE)).toBeVisible();
  });

  test('does not render completed message if currentStep is less than number of steps', () => {
    const { getByText } = renderActivationSteps({
      currentStep: 0,
    });
    expect(getByText(DEFAULT_COMPLETED_MESSAGE)).not.toBeVisible();
  });

  test('renders custom completed message', () => {
    const customMessage = 'You did it!';
    const { getByText } = renderActivationSteps({
      completedMessage: customMessage,
      currentStep: NUMBER_OF_STEPS,
    });
    expect(getByText(customMessage)).toBeVisible();
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - requires `currentStep` */}
      <ActivationSteps steps={mockSteps} title={MOCK_SECTION_TITLE} />

      {/* @ts-expect-error - requires `steps` */}
      <ActivationSteps currentStep={0} title={MOCK_SECTION_TITLE} />

      {/* @ts-expect-error - requires `title` */}
      <ActivationSteps currentStep={0} steps={mockSteps} />

      <ActivationSteps
        currentStep={0}
        // @ts-expect-error - `steps` elements must be type `ActivationStep`
        steps={['test1', 'test2', 'test3']}
        title={MOCK_SECTION_TITLE}
      />

      <ActivationSteps
        currentStep={0}
        steps={mockSteps}
        title={MOCK_SECTION_TITLE}
      />
    </>;
  });
});
