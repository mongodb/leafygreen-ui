import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Input from './Input';
import Trigger from './Trigger';
import Option from './Option';
import Footer from './Footer';

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

const projectBorderStyle = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const Variant = {
  Organization: 'organization',
  Project: 'project',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface OrganizationData {
  name: string;
  product: string;
}

export interface Details {
  apps?: number;
  dashboards?: number;
  clusters?: number;
}

export interface ProjectData {
  name: string;
  details: Details;
}

interface MongoSelect {
  /**
   * Selected organization, which will appear in the Top Nav by default.
   */
  selected: string;

  /**
   * Array of data objects
   * Organization: [{name: `string`, product: `string`}].
   * Project: [{name: `string`, details: {apps: `number`, dashboards: `number`, clusters: `number`}}]
   */
  data: Array<OrganizationData | ProjectData>;

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
function MongoSelect({ selected, data, onClick, variant }: MongoSelect) {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const onChange: React.ChangeEventHandler = e => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();

    setFilteredData(
      data.filter(datum => {
        return datum.name.toLowerCase().includes(term);
      }),
    );
  };

  const onKeyDown: React.KeyboardEventHandler = e => {
    if (e.keyCode === keyMap.ArrowDown || e.keyCode === keyMap.ArrowUp) {
      e.preventDefault();
    }
  };

  return (
    <Menu
      open={open}
      setOpen={setOpen}
      trigger={<Trigger selected={selected} variant={variant} />}
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
        <ul className={ulContainerStyle}>
          {filteredData.map(datum => (
            <MenuItem
              key={datum.name}
              className={cx(menuItemContainerStyle, {
                [projectBorderStyle]:
                  variant === Variant.Project ? true : false,
              })}
              onClick={onClick}
            >
              <Option
                key={datum.name}
                selected={selected}
                datum={datum}
                variant={variant}
              />
            </MenuItem>
          ))}
        </ul>
      </li>
      <MenuSeparator />
      <FocusableMenuItem>
        <Footer onKeyDown={onKeyDown} variant={variant} />
      </FocusableMenuItem>
    </Menu>
  );
}

MongoSelect.displayName = 'MongoSelect';

MongoSelect.propTypes = {
  selected: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, product: PropTypes.string }),
  ),
  variant: PropTypes.oneOf(['organization', 'project']),
};

export default MongoSelect;
