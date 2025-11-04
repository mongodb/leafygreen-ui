import React from 'react';

import { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';

import { Wizard } from '../';

import { DELETE_PAGE_MAX_WIDTH } from './constants';
import { RecommendedActions } from './RecommendedActions';
import { RequiredActions } from './RequiredActions';

const stepStyles = css`
  overflow: scroll;
`;

const footerStyles = css`
  bottom: 0;
`;
const footerContentStyles = css`
  margin-inline: auto;
  max-width: ${DELETE_PAGE_MAX_WIDTH}px;
`;

export default {
  title: 'Components/DeleteWizard',
  component: Wizard,
};

export const DeleteProjectWizard = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      `}
    >
      <Wizard>
        <Wizard.Step className={stepStyles}>
          <RecommendedActions />
          <Wizard.Footer
            className={footerStyles}
            contentClassName={footerContentStyles}
            cancelButtonProps={{
              children: 'Cancel',
            }}
            primaryButtonProps={{
              children: 'Proceed to required actions',
              variant: ButtonVariant.Primary,
              leftGlyph: undefined,
            }}
          />
        </Wizard.Step>

        <Wizard.Step className={stepStyles}>
          <RequiredActions />
          <Wizard.Footer
            className={footerStyles}
            contentClassName={footerContentStyles}
            backButtonProps={{
              children: 'Back',
            }}
            cancelButtonProps={{
              children: 'Cancel',
            }}
            primaryButtonProps={{
              children: 'Delete project forever',
              variant: ButtonVariant.Danger,
              leftGlyph: <Icon glyph="Trash" />,
            }}
          />
        </Wizard.Step>
      </Wizard>
    </div>
  );
};
