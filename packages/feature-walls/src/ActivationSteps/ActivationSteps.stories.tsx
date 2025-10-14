import React, { useEffect, useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import {
  generateMockActivationSteps,
  MOCK_SECTION_TITLE,
} from './ActivationSteps.utils';
import { ActivationSteps, ActivationStepsProps } from '.';

export default {
  title: 'Composition/FeatureWalls/ActivationSteps',
  component: ActivationSteps,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'steps'],
    },
    generate: {
      storyNames: ['LightMode', 'DarkMode'],
      combineArgs: {
        completedMessage: [undefined, 'You did it!'],
        currentStep: [0, 3],
      },
      excludeCombinations: [
        { completedMessage: 'You did it!', currentStep: 0 },
      ],
    },
  },
  args: {
    currentStep: 0,
    darkMode: false,
    numberOfActivationSteps: 3,
    title: MOCK_SECTION_TITLE,
    steps: generateMockActivationSteps(3),
  },
  argTypes: {
    currentStep: {
      control: {
        min: 0,
        max: 6,
        step: 1,
        type: 'number',
      },
    },
    darkMode: storybookArgTypes.darkMode,
    numberOfActivationSteps: {
      name: 'steps.length',
      description:
        'This control is used to determine how many steps should be rendered in the story.',
      control: {
        min: 3,
        max: 6,
        step: 1,
        type: 'number',
      },
    },
  },
};

type TemplateProps = ActivationStepsProps & {
  numberOfActivationSteps: number;
};

const Template: StoryFn<TemplateProps> = ({
  currentStep: currentStepProp,
  numberOfActivationSteps,
  ...rest
}) => {
  const [currentStep, setCurrentStep] = useState(currentStepProp);

  // Update the currentStep when storybook control is updated
  useEffect(() => {
    setCurrentStep(currentStepProp);
  }, [currentStepProp]);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <ActivationSteps
      {...rest}
      className={css`
        height: 500px;
      `}
      currentStep={currentStep}
      steps={generateMockActivationSteps(
        numberOfActivationSteps,
        handleNext,
        handleBack,
      )}
    />
  );
};

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LightMode: StoryType<typeof ActivationSteps> = Template.bind({});
LightMode.args = {
  darkMode: false,
};
LightMode.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'completedMessage',
      'currentStep',
      'darkMode',
      'steps',
      'steps.length',
      'title',
    ],
  },
};

export const DarkMode: StoryType<typeof ActivationSteps> = Template.bind({});
DarkMode.args = {
  darkMode: true,
};
LightMode.parameters = {
  controls: {
    exclude: [
      ...storybookExcludedControlParams,
      'completedMessage',
      'currentStep',
      'darkMode',
      'steps',
      'steps.length',
      'title',
    ],
  },
};
