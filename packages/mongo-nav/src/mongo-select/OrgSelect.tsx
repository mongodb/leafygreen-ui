import React, { useState, useEffect } from 'react';
import Input from './Input';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import OrgTrigger from './OrgTrigger';
import { useOnElementClick } from '../on-element-click-provider';
import { onKeyDown } from './selectHelpers';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';
import { BaseMongoSelectProps } from './types';
import {
  OrganizationInterface,
  CurrentOrganizationInterface,
  PlanType,
  NavElement,
  MongoNavInterface,
} from '../types';

import {
  menuContainerStyle,
  menuItemContainerStyle,
  ulStyle,
  nameStyle,
} from './styles';

const viewAllStyle = css`
  color: ${uiColors.blue.base};
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

const noOrgStyle = css`
  font-size: 14px;
  padding: 4px 8px;
  margin-bottom: 20px;
`;

const allOrgLinkStyle = css`
  color: ${uiColors.blue.base};
  text-decoration: none;
  &:visited {
    color: ${uiColors.blue.base};
    text-decoration: none;
  }
`;

const formattedPlanTypes: Record<PlanType, string> = {
  [PlanType.Atlas]: 'Atlas',
  [PlanType.Cloud]: 'Cloud Manager',
  [PlanType.OnPrem]: 'Ops Manager',
} as const;

interface OrganizationMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<OrganizationInterface>;
  current?: CurrentOrganizationInterface;
  constructOrganizationURL: NonNullable<
    MongoNavInterface['constructOrganizationURL']
  >;
  isOnPrem?: boolean;
  isActive?: boolean;
  disabled?: boolean;
}

function OrgSelect({
  current,
  data,
  urls,
  isActive,
  onChange: onChangeProp,
  onClick: onClickProp,
  constructOrganizationURL,
  isOnPrem,
  disabled,
  loading = false,
  className,
}: OrganizationMongoSelectProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  useEffect(() => {
    if (!open) {
      setValue('');
    }
  }, [open]);

  let renderedData = data;

  const filterData = () => {
    const sanitizedValue = value.replace(/\\/g, '\\\\');
    const search = new RegExp(String(sanitizedValue), 'i');

    const filtered = data?.filter(datum => {
      return search.test(datum.orgName);
    });

    return filtered;
  };

  if (!onChangeProp) {
    renderedData = filterData();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\\/g, '\\');

    setValue(val);

    if (onChangeProp) {
      return onChangeProp(value, e);
    }
  };

  const onClick = (e: React.MouseEvent) => {
    setOpen(false);
    return onClickProp?.(e);
  };

  const renderOrganizationOption = (datum: OrganizationInterface) => {
    const { orgId, orgName, planType } = datum;
    const isActive = orgId ? orgId === current?.orgId : false;

    return (
      <MenuItem
        data-testid="org-option"
        key={orgId}
        active={isActive}
        className={menuItemContainerStyle}
        onClick={onClick}
        href={constructOrganizationURL(datum)}
      >
        <div className={orgOptionContainerStyle}>
          <span className={nameStyle}>
            {orgName} {isActive && '(current)'}
          </span>

          {!isOnPrem && (
            <span className={productStyle}>{formattedPlanTypes[planType]}</span>
          )}
        </div>
      </MenuItem>
    );
  };

  return (
    <OrgTrigger
      placeholder={disabled ? 'All Organizations' : current?.orgName ?? ''}
      urls={urls}
      isActive={isActive}
      open={open}
      disabled={disabled}
      loading={loading}
      className={className}
      onClick={onElementClick(NavElement.OrgNavOrgSelectTrigger, () =>
        setOpen(current => !current),
      )}
    >
      <Menu
        usePortal={false}
        className={menuContainerStyle}
        justify="start"
        spacing={0}
        setOpen={setOpen}
        open={open}
      >
        {data && (
          <FocusableMenuItem>
            <Input
              data-testid="org-filter-input"
              variant="organization"
              onChange={onChange}
              onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
              value={value}
            />
          </FocusableMenuItem>
        )}

        <ul className={ulStyle}>
          {renderedData?.map(renderOrganizationOption) ?? (
            <li className={noOrgStyle}>
              You do not belong to any organizations. Create an organization on
              the{' '}
              <a href={urls.viewAllOrganizations} className={allOrgLinkStyle}>
                Organizations
              </a>{' '}
              page.
            </li>
          )}
        </ul>

        {renderedData && (
          <>
            <MenuSeparator />
            <MenuItem
              onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
              href={urls.viewAllOrganizations}
              data-testid="org-select-view-all-orgs"
              onClick={onElementClick(NavElement.OrgNavViewAllOrganizations)}
            >
              <strong className={viewAllStyle}>View All Organizations</strong>
            </MenuItem>
          </>
        )}
      </Menu>
    </OrgTrigger>
  );
}

OrgSelect.displayName = 'OrgSelect';

export default OrgSelect;
