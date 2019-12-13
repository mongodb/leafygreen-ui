import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { PlanType } from './MongoSelect';

const optionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 15px);
`;

const nameStyle = css`
  font-size: 14px;
  color: ${uiColors.gray.dark3};
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
  white-space: nowrap;
`;

interface ProjectOptionProps {
  projectName: string;
}
export function ProjectOption({ projectName }: ProjectOptionProps) {
  return (
    <div className={optionStyle}>
      <span className={nameStyle}>{projectName}</span>
    </div>
  );
}

interface OrganizationOptionProps {
  orgName: string;
  planType: PlanType;
}
export function OrganizationOption({
  orgName,
  planType,
}: OrganizationOptionProps) {
  const formatPlanType = (planType: PlanType) => {
    switch (planType) {
      case PlanType.Atlas:
        return 'Atlas';
      case PlanType.Cloud:
        return 'Cloud Manager';
      case PlanType.OM:
        return 'Ops Manager';
    }
  };

  return (
    <div className={optionStyle}>
      <span className={nameStyle}>{orgName}</span>
      <span className={productStyle}>{formatPlanType(planType)}</span>
    </div>
  );
}
