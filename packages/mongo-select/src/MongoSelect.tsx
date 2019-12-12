import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import Button from '@leafygreen-ui/button';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import Input from './Input';
import Trigger from './Trigger';

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

const optionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 15px);
`;

const projectBorderStyle = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
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

const projectDetailsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

const viewAllStyle = css`
  color: ${uiColors.blue.base};
  font-weight: bolder;
`;

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Variant = {
  Organization: 'organization',
  Project: 'project',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

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
  data:
    | Array<{ name: string; product: string }>
    | Array<{
        name: string;
        details: { apps?: number; dashboards?: number; clusters?: number };
      }>;

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
  console.log(data);

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

  const checkPlural = (number: number) => {
    return number > 1 ? 's' : '';
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
              {variant === Variant.Organization ? (
                <div className={optionStyle}>
                  <span className={nameStyle}>{datum.name}</span>
                  <span className={productStyle}>{datum.product}</span>
                </div>
              ) : (
                <div className={optionStyle}>
                  <span className={nameStyle}>
                    {datum.name} {datum.name === selected ? '(current)' : ''}
                  </span>
                  <div className={projectDetailsStyle}>
                    {datum.details.clusters && (
                      <span>
                        {'Cluster' + checkPlural(datum.details.clusters)}:{' '}
                        {datum.details.clusters}
                      </span>
                    )}
                    {datum.details.apps && (
                      <span>
                        {'App' + checkPlural(datum.details.apps)}:{' '}
                        {datum.details.apps}
                      </span>
                    )}
                    {datum.details.dashboards && (
                      <span>
                        {'Dashboard' + checkPlural(datum.details.dashboards)}:{' '}
                        {datum.details.dashboards}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </MenuItem>
          ))}
        </ul>
      </li>
      <MenuSeparator />
      {variant === Variant.Organization ? (
        <MenuItem onKeyDown={onKeyDown}>
          <span className={viewAllStyle}>View All Organizations</span>
        </MenuItem>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li onKeyDown={onKeyDown} className={projectButtonStyle}>
          <FocusableMenuItem>
            <Button>View All Projects</Button>
          </FocusableMenuItem>
          <FocusableMenuItem>
            <Button>+ New Project</Button>
          </FocusableMenuItem>
        </li>
      )}
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
