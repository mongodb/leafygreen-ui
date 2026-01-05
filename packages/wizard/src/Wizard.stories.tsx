/* eslint-disable no-console */
import React, { PropsWithChildren } from 'react';
import { faker } from '@faker-js/faker';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { Banner } from '@leafygreen-ui/banner';
import { Card } from '@leafygreen-ui/card';
import { Checkbox } from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { isDefined } from '@leafygreen-ui/lib';
import { Body, Description, H3, InlineCode } from '@leafygreen-ui/typography';

import { useWizardStepContext, Wizard } from '.';

faker.seed(0);

const ExampleStepConfig = [
  {
    title: 'Apple',
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(10),
    requiresAcknowledgement: true,
    primaryButtonText: 'Continue',
  },
  {
    title: 'Banana',
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(10),
    requiresAcknowledgement: false,
    primaryButtonText: 'Continue',
  },
  {
    title: 'Carrot',
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraph(10),
    requiresAcknowledgement: true,
    primaryButtonText: 'Finish',
  },
];

export default {
  title: 'Composition/Wizard',
  component: Wizard,
  parameters: {
    default: 'LiveExample',
  },
  decorators: [
    Fn => (
      <div style={{ height: '100vh', width: '100vw' }}>
        <Fn />
      </div>
    ),
  ],
} satisfies StoryMetaType<typeof Wizard>;

const ExampleContentCard = ({ children }: PropsWithChildren<{}>) => {
  const { isAcknowledged, setAcknowledged, requiresAcknowledgement } =
    useWizardStepContext();

  return (
    <Card
      className={css`
        margin: 24px;
        & > * {
          margin-block: 8px;
        }
      `}
    >
      {requiresAcknowledgement && (
        <Checkbox
          label="Acknowledge"
          checked={isAcknowledged}
          onChange={e => setAcknowledged(e.target.checked)}
        />
      )}
      {children}
    </Card>
  );
};

export const LiveExample: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'activeStep', 'onStepChange'],
    },
  },
  render: args => (
    <Wizard
      activeStep={args.activeStep}
      onStepChange={x =>
        console.log(`[Storybook] activeStep should change to ${x}`)
      }
      {...args}
    >
      {ExampleStepConfig.map(
        (
          {
            title,
            description,
            content,
            primaryButtonText,
            requiresAcknowledgement,
          },
          i,
        ) => (
          <Wizard.Step
            key={i}
            requiresAcknowledgement={requiresAcknowledgement}
          >
            <H3>
              Step {i + 1}: {title}
            </H3>
            <Description>{description}</Description>
            <ExampleContentCard>
              {isDefined(args.activeStep) && (
                <Banner variant="warning">
                  <InlineCode>activeStep</InlineCode> is controlled. Use
                  Storybook controls to update the step
                </Banner>
              )}
              <Body>{content}</Body>
            </ExampleContentCard>
            <Wizard.Footer
              backButtonProps={{
                onClick: () => console.log('[Storybook] Clicked Back'),
              }}
              cancelButtonProps={{
                children: 'Cancel',
                onClick: () => console.log('[Storybook] Clicked Cancel'),
              }}
              primaryButtonProps={{
                children: primaryButtonText,
                onClick: () => console.log('[Storybook] Clicked Primary'),
              }}
            />
          </Wizard.Step>
        ),
      )}
    </Wizard>
  ),
};

export const Controlled: StoryObj<typeof Wizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'onStepChange'],
    },
  },
  args: {
    activeStep: 0,
  },
  render: LiveExample.render,
};
