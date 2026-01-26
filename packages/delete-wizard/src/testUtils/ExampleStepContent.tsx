import React, { PropsWithChildren, ReactNode } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { Description, H3, Label } from '@leafygreen-ui/typography';

import { useDeleteWizardStepContext } from '../';

export const ExampleStepContent = ({
  index,
  description,
  content,
}: PropsWithChildren<{
  index: number;
  description: string;
  content: ReactNode;
}>) => {
  const { isAcknowledged, setAcknowledged, requiresAcknowledgement } =
    useDeleteWizardStepContext();
  return (
    <div
      className={css`
        margin-inline: 72px;
        padding-bottom: 24px;
      `}
    >
      <H3>Step {index + 1}</H3>
      <Description>{description}</Description>

      <div
        className={css`
          margin-block: 16px;
        `}
      >
        {requiresAcknowledgement && (
          <div
            className={css`
              display: flex;
              gap: 4px;
              margin-block: 4px;
            `}
          >
            <input
              type="checkbox"
              id="ack"
              data-testid="acknowledgement-checkbox"
              checked={isAcknowledged}
              onChange={e => setAcknowledged(e.target.checked)}
            />
            <Label htmlFor="ack">Acknowledge Step</Label>
          </div>
        )}
        {content}
      </div>
    </div>
  );
};
