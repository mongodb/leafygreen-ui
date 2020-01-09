import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { PlanType } from './MongoSelect';

const optionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 15px);
  text-decoration: none;
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
  href: string;
}
export function ProjectOption({ projectName, href }: ProjectOptionProps) {
  return (
    <a className={optionStyle} href={href}>
      <span className={nameStyle}>{projectName}</span>
    </a>
  );
}

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

interface OrganizationOptionProps {
  orgName: string;
  planType: PlanType;
  href: string;
}
export function OrganizationOption({
  orgName,
  planType,
  href,
}: OrganizationOptionProps) {
  return (
    <a className={optionStyle} href={href}>
      <span className={nameStyle}>{orgName}</span>
      <span className={productStyle}>{formatPlanType(planType)}</span>
    </a>
  );
}
