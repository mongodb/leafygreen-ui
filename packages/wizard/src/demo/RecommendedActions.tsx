import React from 'react';

import { Checkbox } from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, Description, H3 } from '@leafygreen-ui/typography';

import { useWizardStepContext } from '../';

import { RecommendedActionCard } from './RecommendedActionCard';
import { recommendedActionsConfig } from './recommendedActionData';

export const RecommendedActions = () => {
  const { isAcknowledged, setAcknowledged } = useWizardStepContext();
  return (
    <>
      <H3>Recommended Actions</H3>
      <Description>
        If you delete a project, the action is irreversible and permanently
        deletes all data. We strongly recommend that you complete the following
        data governance checks before you proceed.
      </Description>
      <div
        id="delete_project-recommended_actions"
        className={css`
          margin-block-end: ${spacing[400]}px;
        `}
      >
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: ${spacing[200]}px;
            margin-block: ${spacing[400]}px;
          `}
        >
          {recommendedActionsConfig.map(card => (
            <RecommendedActionCard
              key={card.title}
              category={card.category}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
        <div>
          <Body
            className={css`
              font-weight: 600;
              margin-block-start: ${spacing[600]}px;
              margin-block-end: ${spacing[200]}px;
            `}
          >
            Please confirm the acknowledgment below to continue with the
            required steps.
          </Body>
          <Checkbox
            label="I understand that MongoDB strongly advises that I export my latest backup snapshot and audit logs before I delete a project to reduce risks related to security, compliance, auditing, and operational challenges as all associated data will be permanently deleted and unrecoverable after I delete the project."
            checked={isAcknowledged}
            onChange={e => {
              setAcknowledged(e.target.checked);
            }}
          />
        </div>
      </div>
    </>
  );
};
