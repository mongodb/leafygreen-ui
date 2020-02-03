import React from 'react';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import Button from '@leafygreen-ui/button';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Input from './Input';
import { OrganizationTrigger, ProjectTrigger } from './Trigger';
import {
  ProjectInterface,
  OrganizationInterface,
  URLSInterface,
  CurrentProjectInterface,
  CurrentOrganizationInterface,
  PlanType,
} from '../types';

// const menuItemHeight = 36;

const menuContainerStyle = css`
  width: 280px;
  padding-top: 20px;
`;

// const listContainerStyle = css`
//   max-height: ${menuItemHeight * 5}px;
//   overflow-y: auto;
// `;

const menuItemContainerStyle = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: left;
`;

const viewAllStyle = css`
  color: ${uiColors.blue.base};
`;

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
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

const orgOptionContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const formatPlanType = (planType: PlanType) => {
  switch (planType) {
    case PlanType.Atlas:
      return 'Atlas';
    case PlanType.Cloud:
      return 'Cloud Manager';
    case PlanType.OnPrem:
      return 'Ops Manager';
  }
};

interface BaseMongoSelectProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  urls: Required<URLSInterface>;
  onChange: React.ChangeEventHandler;
  isActive?: boolean;
}

interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<ProjectInterface>;
  current: CurrentProjectInterface;
  constructProjectURL: (orgID: string, projectID: string) => string;
}

interface OrganizationMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<OrganizationInterface>;
  current?: CurrentOrganizationInterface;
  constructOrganizationURL: (orgID: string) => string;
}

const onKeyDown: React.KeyboardEventHandler = e => {
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};

function OrgSelect({
  current,
  data,
  className,
  urls,
  isActive,
  onChange,
  onClick,
  constructOrganizationURL,
}: OrganizationMongoSelectProps) {
  const renderOrganizationOption = (datum: OrganizationInterface) => {
    const { orgId, orgName, planType } = datum;

    return (
      <MenuItem
        key={orgId}
        className={menuItemContainerStyle}
        onClick={onClick}
        href={constructOrganizationURL(orgId)}
      >
        <div className={orgOptionContainerStyle}>
          <span className={nameStyle}>{orgName}</span>
          <span className={productStyle}>{formatPlanType(planType)}</span>
        </div>
      </MenuItem>
    );
  };

  const errorMessage =
    'You do not belong to any organizations. Create an organization to start using MongoDB Cloud';

  return (
    <Menu
      trigger={
        <OrganizationTrigger
          current={current?.orgName ?? 'All Organizations'}
          className={className}
          urls={urls}
          isActive={isActive}
        />
      }
      className={menuContainerStyle}
      justify="start"
    >
      <FocusableMenuItem>
        <Input
          onChange={onChange}
          onKeyDown={onKeyDown}
          variant="organization"
        />
      </FocusableMenuItem>

      <>
        {data ? (
          data.map(datum => renderOrganizationOption(datum))
        ) : (
          <li>{errorMessage}</li>
        )}
      </>

      <MenuSeparator />
      <MenuItem
        onKeyDown={onKeyDown}
        href={urls.mongoSelect?.viewAllOrganizations}
      >
        <strong className={viewAllStyle}>View All Organizations</strong>
      </MenuItem>
    </Menu>
  );
}

OrgSelect.displayName = 'OrgSelect';

export { OrgSelect };

function ProjectSelect({
  current,
  className,
  onChange,
  data,
  onClick,
  constructProjectURL,
  urls,
}: ProjectMongoSelectProps) {
  const renderProjectOption = (datum: ProjectInterface) => {
    const { projectId, projectName, orgId } = datum;

    return (
      <MenuItem
        key={projectId}
        className={menuItemContainerStyle}
        onClick={onClick}
        href={constructProjectURL(orgId, projectId)}
      >
        <span className={nameStyle}>{projectName}</span>
      </MenuItem>
    );
  };

  return (
    <Menu
      trigger={
        <ProjectTrigger current={current.projectName} className={className} />
      }
      className={menuContainerStyle}
      justify="start"
    >
      <FocusableMenuItem>
        <Input onChange={onChange} onKeyDown={onKeyDown} variant="project" />
      </FocusableMenuItem>

      <>{data && data.map(datum => renderProjectOption(datum))}</>

      <MenuSeparator />

      <li onKeyDown={onKeyDown} role="none" className={projectButtonStyle}>
        <FocusableMenuItem>
          <Button href={urls.mongoSelect.viewAllProjects} as="a">
            View All Projects
          </Button>
        </FocusableMenuItem>
        <FocusableMenuItem>
          <Button href={urls.mongoSelect.newProject} as="a">
            + New Project
          </Button>
        </FocusableMenuItem>
      </li>
    </Menu>
  );
}

ProjectSelect.displayName = 'ProjectSelect';

export { ProjectSelect };
