import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
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
  Variant,
  OverridesInterface,
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
  val: ProjectInterface | OrganizationInterface,
): val is ProjectInterface {
  return 'projectId' in val;
}

const onKeyDown: React.KeyboardEventHandler = e => {
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};

type VariantData = ProjectInterface | OrganizationInterface;

interface MongoSelectProps {
  /**
   * Object with information about current organization or project.
   * Organization: {orgId: `string`; orgName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}
   * Project: {orgId: `string`; projectId: `string`, projectName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}
   */
  current: VariantData;

  /**
   * Array of data objects
   * Organization: [{orgId: `string`; orgName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}]
   * Project: [{orgId: `string`; projectId: `string`, projectName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}]
   */
  data: Array<VariantData>;

  /**
   * Callback function executed when an organization is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Determines variant 'organization' | 'project'
   */
  variant: Variant;

  className?: string;

  /**
   * Receives (orgID, projectID) as parameters
   * Returns a string with a projectURL, where a user will be redirected when
   * Project is selected from dropdown
   */
  constructProjectURL?: (orgID: string, projectID: string) => string;

  /**
   * Receives (orgID) as parameter
   * Returns a string with an organizationURL, where a user will be redirected when
   * Organization is selected from dropdown
   */
  constructOrganizationURL?: (orgID: string) => string;

  overrides?: OverridesInterface;
}

function MongoSelect({
  current,
  data,
  onClick,
  variant,
  constructProjectURL,
  constructOrganizationURL,
  className,
  overrides = { hosts: {}, urls: {} },
}: MongoSelectProps) {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const { hosts, urls } = overrides;

  const onChange: React.ChangeEventHandler = ({ target }) => {
    const fuse = new Fuse(data, { keys: ['orgName', 'projectName'] });
    const results = fuse.search((target as HTMLInputElement).value);

    setFilteredData(results);
  };

  let trigger, footer;
  const orgURI = hosts?.cloud
    ? `${hosts.cloud}/v2#/org/${current.orgId}`
    : `https://cloud.mongodb.com/v2#/org/${current.orgId}`;

  if (isProject(current)) {
    trigger = (
      <ProjectTrigger current={current.projectName} className={className} />
    );
    footer = (
      <li onKeyDown={onKeyDown} role="none" className={projectButtonStyle}>
        <FocusableMenuItem>
          <Button
            href={urls?.mongoSelect?.viewAllProjects ?? `${orgURI}/projects`}
          >
            View All Projects
          </Button>
        </FocusableMenuItem>
        <FocusableMenuItem>
          <Button
            href={urls?.mongoSelect?.newProject ?? `${orgURI}/projects/create`}
          >
            + New Project
          </Button>
        </FocusableMenuItem>
      </li>
    );
  } else {
    trigger = (
      <OrganizationTrigger current={current.orgName} className={className} />
    );
    footer = (
      <MenuItem
        onKeyDown={onKeyDown}
        href={
          urls?.mongoSelect?.viewAllOrganizations ??
          `${orgURI}/settings/general`
        }
      >
        <strong className={viewAllStyle}>View All Organizations</strong>
      </MenuItem>
    );
  }

  const renderOption = (datum: VariantData) => {
    let id, content;

    if (isProject(datum)) {
      id = datum.projectId;
      content = (
        <ProjectOption
          projectName={datum.projectName}
          href={constructProjectURL(datum.orgId, id)}
        />
      );
    } else {
      id = datum.orgId;
      content = (
        <OrganizationOption
          orgName={datum.orgName}
          planType={datum.planType}
          href={constructOrganizationURL(id)}
        />
      );
    }

    return (
      <MenuItem key={id} className={menuItemContainerStyle} onClick={onClick}>
        {content}
      </MenuItem>
    );
  };

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      className={menuContainerStyle}
      justify="start"
    >
      <FocusableMenuItem>
        <Input onChange={onChange} onKeyDown={onKeyDown} variant={variant} />
      </FocusableMenuItem>

      <li role="none" className={listContainerStyle}>
        <ul
          onKeyDown={e => e.preventDefault()}
          className={ulContainerStyle}
          role="menu"
        >
          {filteredData.map(renderOption)}
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
  current: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['organization', 'project']).isRequired,
};

export default MongoSelect;
