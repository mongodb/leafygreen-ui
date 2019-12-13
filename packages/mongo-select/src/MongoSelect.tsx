import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import { css } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Input from './Input';
import { OrganizationTrigger, ProjectTrigger } from './Trigger';
import { OrganizationFooter, ProjectFooter } from './Footer';
import { OrganizationOption, ProjectOption } from './Option';

const menuContainerStyle = css`
  width: 280px;
  padding-top: 20px;
`;

const listContainerStyle = css`
  max-height: ${36 * 5}px;
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

const Variant = {
  Organization: 'organization',
  Project: 'project',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const PlanType = {
  Cloud: 'cloud',
  Atlas: 'Atlas',
  OM: 'OM',
} as const;

type PlanType = typeof PlanType[keyof typeof PlanType];

export { PlanType };

export interface ProjectInterface {
  projectId: string;
  projectName: string;
  planType: PlanType;
  orgId: string;
}

export interface OrganizationInterface {
  orgId: string;
  orgName: string;
  planType: PlanType;
}

function isProject(
  val: ProjectInterface | OrganizationInterface,
): val is ProjectInterface {
  return 'projectId' in val;
}

const onKeyDown: React.KeyboardEventHandler = ({ keyCode, preventDefault }) => {
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(keyCode)) {
    preventDefault();
  }
};

type VariantData = ProjectInterface | OrganizationInterface;

interface MongoSelectProps {
  /**
   * Object with information about current organization or project.
   * Organization: {orgId: `string`; orgName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}
   * Project: {orgId: `string`; projectId: `string`, projectName: `string`, planType: `'Cloud' | 'OM' | 'Atlas'`}
   */
  selected: VariantData;

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
}

/**
 * # MongoSelect
 *
 * MongoSelect component
 *
 * ```
<MongoSelect onClick={onClick} selected={'YouWork'} data={[{name: 'YouWork', product: 'Atlas'}]/>
```
 * @param props.selected Selected organization, which will appear in the Top Nav by default.
 * @param props.data Array of Organization objects, [{name: `string`, product: `string`}].
 * @param props.onClick Callback function executed when an organization is clicked.
 * @param props.variant Determines if MongoSelect will have `organization` or `project` data
 */
function MongoSelect({ selected, data, onClick, variant }: MongoSelectProps) {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange: React.ChangeEventHandler = ({ target }) => {
    const fuse = new Fuse(data, { keys: ['orgName', 'projectName'] });
    const results = fuse.search((target as HTMLInputElement).value);

    setFilteredData(results);
  };

  let trigger, footer;

  if (isProject(selected)) {
    trigger = <ProjectTrigger selected={selected.projectName} />;
    footer = <ProjectFooter onKeyDown={onKeyDown} orgId={selected.orgId} />;
  } else {
    trigger = <OrganizationTrigger selected={selected.orgName} />;
    footer = (
      <OrganizationFooter onKeyDown={onKeyDown} orgId={selected.orgId} />
    );
  }

  const renderOption = (datum: VariantData) => {
    let id, content;

    if (isProject(datum)) {
      id = datum.projectId;
      content = <ProjectOption projectName={datum.projectName} />;
    } else {
      id = datum.orgId;
      content = (
        <OrganizationOption orgName={datum.orgName} planType={datum.planType} />
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

      <li
        role="none"
        onKeyDown={e => e.preventDefault()}
        className={listContainerStyle}
      >
        <ul className={ulContainerStyle}>{filteredData.map(renderOption)}</ul>
      </li>

      <MenuSeparator />

      <FocusableMenuItem>{footer}</FocusableMenuItem>
    </Menu>
  );
}

MongoSelect.displayName = 'MongoSelect';

MongoSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['organization', 'project']).isRequired,
};

export default MongoSelect;
