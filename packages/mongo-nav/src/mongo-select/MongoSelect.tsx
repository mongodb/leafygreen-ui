import React from 'react';
import PropTypes from 'prop-types';
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
import { OrganizationOption, ProjectOption } from './Option';
import {
  ProjectInterface,
  OrganizationInterface,
  URLSInterface,
  CurrentProjectInterface,
  CurrentOrganizationInterface,
} from '../types';

const menuItemHeight = 36;

const menuContainerStyle = css`
  width: 280px;
  padding-top: 20px;
`;

const listContainerStyle = css`
  max-height: ${menuItemHeight * 5}px;
  overflow-y: auto;
`;

const ulContainerStyle = css`
  padding-left: 1px;
`;

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

function isProject(
  props: ProjectMongoSelectProps | OrganizationMongoSelectProps,
): props is ProjectMongoSelectProps {
  return props.variant === 'project';
}

interface BaseMongoSelectProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  urls: Required<URLSInterface>;
  onChange: React.ChangeEventHandler;
  isActive?: boolean;
}

interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  variant: 'project';
  data: Array<ProjectInterface>;
  current: CurrentProjectInterface;
  constructProjectURL: (orgID: string, projectID: string) => string;
}

interface OrganizationMongoSelectProps extends BaseMongoSelectProps {
  variant: 'organization';
  data: Array<OrganizationInterface>;
  current: CurrentOrganizationInterface;
  constructOrganizationURL: (orgID: string) => string;
}

const onKeyDown: React.KeyboardEventHandler = e => {
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};

function MongoSelect(
  props: ProjectMongoSelectProps | OrganizationMongoSelectProps,
) {
  const {
    onClick,
    variant,
    onChange,
    className,
    urls,
    isActive = false,
  } = props;

  let trigger, footer;
  const { mongoSelect } = urls;

  if (isProject(props)) {
    trigger = <ProjectTrigger current={props.current} className={className} />;
    footer = (
      <li onKeyDown={onKeyDown} role="none" className={projectButtonStyle}>
        <FocusableMenuItem>
          <Button href={mongoSelect.viewAllProjects} as="a">
            View All Projects
          </Button>
        </FocusableMenuItem>
        <FocusableMenuItem>
          <Button href={mongoSelect.newProject} as="a">
            + New Project
          </Button>
        </FocusableMenuItem>
      </li>
    );
  } else {
    trigger = (
      <OrganizationTrigger
        current={props.current}
        className={className}
        urls={urls}
        isActive={isActive}
      />
    );
    footer = (
      <MenuItem onKeyDown={onKeyDown} href={mongoSelect?.viewAllOrganizations}>
        <strong className={viewAllStyle}>View All Organizations</strong>
      </MenuItem>
    );
  }

  const renderProjectOption = (
    props: ProjectMongoSelectProps,
    datum: ProjectInterface,
  ) => {
    const content = (
      <ProjectOption
        projectName={datum.projectName}
        href={props.constructProjectURL(datum.orgId, datum.projectId)}
      />
    );

    return (
      <MenuItem
        key={datum.projectId}
        className={menuItemContainerStyle}
        onClick={onClick}
      >
        {content}
      </MenuItem>
    );
  };

  const renderOrganizationOption = (
    props: OrganizationMongoSelectProps,
    datum: OrganizationInterface,
  ) => {
    const content = (
      <OrganizationOption
        orgName={datum.orgName}
        planType={datum.planType}
        href={props.constructOrganizationURL(datum.orgId)}
      />
    );

    return (
      <MenuItem
        key={datum.orgId}
        className={menuItemContainerStyle}
        onClick={onClick}
      >
        {content}
      </MenuItem>
    );
  };

  return (
    <Menu trigger={trigger} className={menuContainerStyle} justify="start">
      <FocusableMenuItem>
        <Input onChange={onChange} onKeyDown={onKeyDown} variant={variant} />
      </FocusableMenuItem>

      <li role="none" className={listContainerStyle}>
        <ul
          onKeyDown={e => e.preventDefault()}
          className={ulContainerStyle}
          role="menu"
        >
          {isProject(props)
            ? props.data.map(datum => renderProjectOption(props, datum))
            : props.data.map(datum => renderOrganizationOption(props, datum))}
        </ul>
      </li>

      <MenuSeparator />

      {footer}
    </Menu>
  );
}

MongoSelect.displayName = 'MongoSelect';

MongoSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.shape({
    orgId: PropTypes.string,
    projectId: PropTypes.string,
    planType: PropTypes.string,
    projectName: PropTypes.string,
    orgName: PropTypes.string,
    alertsOpen: PropTypes.number,
    chartsActivated: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['organization', 'project']).isRequired,
  constructOrganizationURL: PropTypes.func,
  constructProjectURL: PropTypes.func,
};

export default MongoSelect;
