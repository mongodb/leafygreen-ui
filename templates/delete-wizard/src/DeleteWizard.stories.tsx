import React from 'react';
import { faker } from '@faker-js/faker';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import BeakerIcon from '@leafygreen-ui/icon/Beaker';
import { BackLink, Body } from '@leafygreen-ui/typography';

import { DeleteWizard } from '.';

faker.seed(0);

export default {
  title: 'Templates/DeleteWizard',
  component: DeleteWizard,
};

export const LiveExample: StoryObj<typeof DeleteWizard> = {
  render: _args => (
    <div
      className={css`
        margin: -100px;
      `}
    >
      <DeleteWizard
        className={css`
          outline: 1px solid red;
          height: 100vh;
          width: 100vw;
        `}
      >
        <DeleteWizard.Header
          pageTitle="Demo Wizard"
          resourceName={faker.database.mongodbObjectId() + '4'}
          resourceIcon={<BeakerIcon />}
          backLink={<BackLink href="#">Back</BackLink>}
          className={css`
            margin-inline: 72px;
          `}
        />
        <DeleteWizard.Step>
          <DeleteWizard.StepContent
            className={css`
              margin-inline: 72px;
            `}
          >
            {faker.lorem
              .paragraphs(12)
              .split('\n')
              .map((p, i) => (
                <Body key={i}>{p}</Body>
              ))}
          </DeleteWizard.StepContent>
          <DeleteWizard.Footer
            primaryButtonProps={{
              children: 'Continue',
            }}
          />
        </DeleteWizard.Step>
      </DeleteWizard>
    </div>
  ),
};
