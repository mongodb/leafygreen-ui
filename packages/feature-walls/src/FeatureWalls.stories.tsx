import React, { useState } from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { generateMockActivationSteps } from './ActivationSteps/ActivationSteps.utils';
import {
  generateMockFeatures,
  MOCK_SECTION_TITLE as featureOverviewTitle,
} from './FeatureOverview/FeatureOverview.utils';
import { MOCK_SAMPLE_TEXT } from './Header/Header.utils';
import {
  generateMockTemplates,
  MOCK_SECTION_TITLE as templateTitle,
} from './Templates/Templates.utils';
import {
  generateMockUseCases,
  MOCK_SECTION_TITLE as useCasesTitle,
} from './UseCases/UseCases.utils';
import { ActivationSteps } from './ActivationSteps';
import { FeatureOverview } from './FeatureOverview';
import { Header } from './Header';
import { InfoBlock } from './InfoBlock';
import { Templates } from './Templates';
import { UseCases } from './UseCases';

export const LiveExample = ({ darkMode }: { darkMode: boolean }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div>
        <Header
          description={MOCK_SAMPLE_TEXT.description}
          title={MOCK_SAMPLE_TEXT.title}
          subtitle={MOCK_SAMPLE_TEXT.subtitle}
          primaryButtonProps={{
            children: MOCK_SAMPLE_TEXT.primaryButton,
          }}
          secondaryButtonProps={{
            children: MOCK_SAMPLE_TEXT.secondaryButton,
          }}
        />
        <br />
        <ActivationSteps
          className={css`
            height: 500px;
          `}
          currentStep={currentStep}
          steps={generateMockActivationSteps(3, handleNext, handleBack)}
          title="Getting started with [feature name]"
        />

        <br />
        <FeatureOverview
          title={featureOverviewTitle}
          features={generateMockFeatures(3)}
        />

        <br />
        <Templates templates={generateMockTemplates(3)} title={templateTitle} />

        <br />
        <UseCases cases={generateMockUseCases(6)} title={useCasesTitle} />

        <br />

        <div>
          <InfoBlock
            buttonProps={{
              children: 'Button',
              // eslint-disable-next-line no-console
              onClick: () => console.log('Button clicked!'),
            }}
            badgeProps={{ children: 'Badge' }}
            media={
              <img
                alt="Product sample"
                src="/examples/feature-walls-sample.png"
              />
            }
            variant="card"
            label="Label"
          />
        </div>
      </div>
    </LeafyGreenProvider>
  );
};
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export default {
  title: 'Composition/FeatureWalls',
  component: LiveExample,
  parameters: {
    default: 'LiveExample',
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
