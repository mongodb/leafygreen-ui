import React from 'react';

import { Checkbox } from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Body, Description, H3, Link } from '@leafygreen-ui/typography';

import { useRequiredActionAcknowledgements } from './hooks/useRequiredActionAcknowledgements';
import {
  ApplicationsCard,
  ClustersCard,
  FederatedDbCard,
  ModelApiKeysCard,
  PrivateEndpointsCard,
  StreamProcessingCard,
} from './RequiredActionCards';

const reviewCardsContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]}px;
  margin-block: ${spacing[4]}px;
`;

const checkboxContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]}px;
  margin-top: ${spacing[3]}px;
`;

const acknowledgmentLabelStyles = css`
  margin-bottom: ${spacing[3]}px;
`;

const sectionDividerStyles = css`
  border-top: 1px solid #e8edeb;
  margin-block: ${spacing[5]}px;
`;

export const RequiredActions = () => {
  const { acknowledgementsState, setAcknowledgementState } =
    useRequiredActionAcknowledgements();

  return (
    <>
      <H3>Required Actions</H3>
      <Description>
        Access to all of the following deployments and associated data will be
        permanently lost and cannot be recovered.{' '}
        <Link href="TODO:">Manage Project Access Docs</Link>
      </Description>

      <div className={reviewCardsContainerStyles}>
        <ClustersCard defaultOpen />
        <ApplicationsCard />
        <FederatedDbCard />
        <StreamProcessingCard />
        <PrivateEndpointsCard />
        <ModelApiKeysCard />
      </div>

      <div className={sectionDividerStyles} />

      <Body className={acknowledgmentLabelStyles} weight="medium">
        By deleting the project, you acknowledge this irreversible action:
      </Body>

      <div className={checkboxContainerStyles}>
        <Checkbox
          label="Permanently deletes all project data, including clusters, configurations, services, app services and triggers, and data across Atlas, which cannot be recovered."
          description="All project data including clusters, configurations, services, backup snapshots, app data, search indexes, federated database access, and Stream Processors will be permanently deleted. Deleted data cannot be recovered."
          bold
          checked={acknowledgementsState[0]}
          onChange={e => setAcknowledgementState(0, e.target.checked)}
        />

        <Checkbox
          label="Overrides Termination Protection, deletes archives, backup snapshots, Stream Processors, and Connections, stops all data processing."
          description="Termination Protection will be disabled for all clusters. While archive data in object storage will remain recoverable for up to 5 days, online archives and backup snapshots will be deleted immediately. Stream Processors and Connections will be permanently deleted. Data processing will stop immediately."
          bold
          checked={acknowledgementsState[1]}
          onChange={e => setAcknowledgementState(1, e.target.checked)}
        />

        <Checkbox
          label="Revokes access to federated databases, disables communication with Atlas clusters, and may disrupt application functionality."
          description="Access to federated database instances for dependent applications or services will be revoked, and communication between my application and the Atlas cluster or services will be disabled, which may cause functionality disruptions. I confirm that I have taken necessary measures to ensure uninterrupted access and mitigate impact."
          bold
          checked={acknowledgementsState[2]}
          onChange={e => setAcknowledgementState(2, e.target.checked)}
        />
      </div>
    </>
  );
};
