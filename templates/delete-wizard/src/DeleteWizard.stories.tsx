/* eslint-disable no-console */
import React from 'react';
import { faker } from '@faker-js/faker';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/Beaker';
import { BackLink, Body } from '@leafygreen-ui/typography';

import { ExampleStepContent } from './testUtils/ExampleStepContent';
import { DeleteWizard } from '.';

faker.seed(0);
const demoResourceName = faker.database.mongodbObjectId();
const demoSteps = [
  {
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs(24),
  },
  {
    description: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs(24),
  },
];

export default {
  title: 'Templates/DeleteWizard',
  component: DeleteWizard,
};

export const LiveExample: StoryObj<typeof DeleteWizard> = {
  parameters: {
    controls: {
      exclude: ['children', 'onStepChange'],
    },
  },
  args: {
    activeStep: undefined,
  },
  render: args => {
    const handleCancel = () => {
      console.log('[STORYBOOK]: Cancelling wizard. Reloading iFrame');
      window.location.reload();
    };

    const handleDelete = () => {
      alert('[STORYBOOK]: Deleting thing!');
      console.log('[STORYBOOK]: Deleting thing! Reloading iFrame');
      window.location.reload();
    };

    const handleStepChange = step => {
      console.log('[STORYBOOK] step changed to ', step);
    };

    return (
      <div
        className={css`
          margin: -100px;
        `}
      >
        <DeleteWizard
          activeStep={args.activeStep}
          onStepChange={handleStepChange}
          onCancel={handleCancel}
          onDelete={handleDelete}
          className={css`
            height: 100vh;
            width: 100vw;
          `}
        >
          <DeleteWizard.Header
            pageTitle="Demo Delete Wizard"
            resourceName={demoResourceName}
            resourceIcon={<BeakerIcon />}
            backLink={<BackLink href="#">Back</BackLink>}
            className={css`
              margin-inline: 72px;
            `}
          />
          <DeleteWizard.Step requiresAcknowledgement>
            <DeleteWizard.StepContent>
              <ExampleStepContent
                index={0}
                description={demoSteps[0].description}
                content={demoSteps[0].content.split('\n').map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              />
            </DeleteWizard.StepContent>
            <DeleteWizard.Footer
              cancelButtonText="Cancel wizard"
              primaryButtonText="Continue to next step"
            />
          </DeleteWizard.Step>

          <DeleteWizard.Step requiresAcknowledgement>
            <DeleteWizard.StepContent>
              <ExampleStepContent
                index={1}
                description={demoSteps[1].description}
                content={demoSteps[1].content.split('\n').map((p, i) => (
                  <Body key={i}>{p}</Body>
                ))}
              />
            </DeleteWizard.StepContent>
            <DeleteWizard.Footer
              backButtonText="Go back"
              cancelButtonText="Cancel wizard"
              primaryButtonText="Delete the prop"
            />
          </DeleteWizard.Step>
        </DeleteWizard>
      </div>
    );
  },
};
