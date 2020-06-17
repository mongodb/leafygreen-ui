import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

// leafygreen-ui
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';

// mongo-nav
import { useOnElementClick } from '../on-element-click-provider';
import {
  InteractionRingWrapper,
  CloudManagerIcon,
  AtlasIcon,
} from '../helpers';
import { mq, breakpoints } from '../breakpoints';
import {
  CurrentOrganizationInterface,
  MongoNavInterface,
  NavElement,
  OrganizationInterface,
  PlanType,
  Mode,
} from '../types';
import {
  iconLoadingStyle,
  removePointerEvents,
  textLoadingStyle,
} from '../styles';

// mongo-select
import Input from './Input';
import { onKeyDown, usePrevious } from './selectHelpers';
import { BaseMongoSelectProps } from './types';
import {
  activeButtonStyle,
  baseButtonStyle,
  caretBaseStyle,
  iconColorStyle,
  menuContainerStyle,
  menuItemContainerStyle,
  nameStyle,
  selectedStyle,
  ulStyle,
} from './styles';

// styles
const orgButtonStyle = css`
  justify-content: space-between;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  width: 180px;
  height: 30px;
  padding: 3px 5px;
`;

const orgStandaloneButtonStyle = css`
  border-radius: 5px;
`;

const orgSettingsButtonStyle = css`
  color: ${uiColors.gray.base};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${uiColors.gray.light2};
  border-left: 0;
  background-color: white;
  outline: none;
  transition: all 150ms ease-in-out;

  ${mq({
    marginRight: ['16px', '16px', '20px'],
    height: ['30px', '36px', '36px'],
    paddingRight: ['6px', '8px', '8px'],
    paddingLeft: ['6px', '8px', '8px'],
  })}

  &:hover {
    background-color: ${uiColors.gray.light2};
    border-color: ${uiColors.gray.light2};
    color: ${uiColors.gray.dark2};
  }
`;

const orgTriggerContainerStyle = css`
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const orgTriggerRingStyle = css`
  border-radius: 7px 0 0 7px;
`;

const orgStandaloneTriggerRingStyle = css`
  border-radius: 7px;
`;

const orgOptionContainerStyle = css`
  display: flex;
  justify-content: space-between;
`;

const viewAllStyle = css`
  color: ${uiColors.blue.base};
`;

const productStyle = css`
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  font-weight: bolder;
  white-space: nowrap;
  margin-left: 4px;
`;

const emptyStateStyle = css`
  font-size: 14px;
  padding: 4px 8px;
  margin-bottom: 20px;
`;

const displayFlex = css`
  display: flex;
  align-items: center;
`;

const linkStyle = css`
  color: ${uiColors.blue.base};
  text-decoration: none;
  &:visited {
    color: ${uiColors.blue.base};
    text-decoration: none;
  }
`;

const focusedLinkStyle = css`
  &:focus {
    background-color: ${uiColors.blue.light2};
    color: ${uiColors.blue.dark2};
    border-color: ${uiColors.blue.light2};
  }
`;

const activeIconStyle = css`
  color: ${uiColors.green.base};
`;

// types
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

const formattedPlanTypes: Record<PlanType, string> = {
  [PlanType.Atlas]: 'Atlas',
  [PlanType.Cloud]: 'Cloud Manager',
  [PlanType.OnPrem]: 'Ops Manager',
} as const;

interface OrgFilterResponse extends OrganizationInterface {
  groups: null;
}

// data props
const triggerDataProp = createDataProp('org-trigger');
const anchorDataProp = createDataProp('anchor-data-prop');

function OrgSelect({
  current,
  mode,
  hosts = {},
  data = [],
  urls = {},
  onChange: onChangeProp,
  constructOrganizationURL,
  admin = false,
  isOnPrem = false,
  isActive = false,
  disabled = false,
  loading = false,
}: OrganizationMongoSelectProps) {
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFetching, setIsFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const wasOpen = usePrevious(open);
  const onElementClick = useOnElementClick();
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;

  const isFiltered = value !== '';
  const isAdminSearch = isFiltered && admin && mode === Mode.Production;

  const renderedData = isFiltered ? filteredData : data;

  const checkPlanType = renderedData?.[0]?.planType;
  const showPlanType = !renderedData?.every(
    datum => datum.planType === checkPlanType,
  );

  const toggleOpen = () => {
    setOpen(curr => !curr);
    if (!open) {
      setValue('');
    }
  };

  const fetchOrgsAsAdmin = (searchTerm = '') => {
    const queryString = searchTerm ? `?term=${searchTerm}` : '';
    const endpointURI = `${hosts.cloud}/user/shared/organizations/search${queryString}`;
    return fetch(endpointURI, {
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    });
  };

  const filterDataAsAdmin = useCallback(
    debounce((fetchValue: string) => {
      fetchOrgsAsAdmin(fetchValue)
        .then(response => response.json())
        .then((response: Array<OrgFilterResponse>) => {
          const data = response.map(({ groups, ...org }) => org);

          setFilteredData(data);
          setIsFetching(false);
        })
        .catch(console.error);
    }, 300),
    [],
  );

  const filterData = () => {
    const invalid = /[()[\]{}\\]/g;
    const sanitizedValue = value.replace(invalid, '');
    const search = new RegExp(String(sanitizedValue), 'i');

    const filtered = data?.filter(datum => {
      return search.test(datum.orgName);
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    // Skip if we're not filtering
    if (!isFiltered) {
      return;
    }

    // defer all behavior to user-provided filtering
    if (onChangeProp) {
      return;
    }

    // serverside filtering (admin users only)
    if (isAdminSearch) {
      setIsFetching(true);
      filterDataAsAdmin(value);
      return;
    }

    // clientside filtering (default)
    filterData();
  }, [value]);

  // on change, make sure value actually changes
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\\/g, '\\');
    setValue(val);

    if (open === true && wasOpen !== open) {
      // Opt out of type-checking as we just want to trigger the onElementClick handler
      onElementClick(NavElement.OrgNavOrgSelectSearch)(e as any);
    }

    return onChangeProp?.({
      value,
      setData: setFilteredData,
      event: e,
    });
  };

  const renderOrganizationOption = (datum: OrganizationInterface) => {
    const { orgId, orgName, planType } = datum;
    const isCurrentOrg = orgId ? orgId === current?.orgId : false;
    const active = isCurrentOrg && !disabled;

    return (
      <MenuItem
        data-testid="org-option"
        key={orgId}
        active={active}
        className={menuItemContainerStyle}
        onClick={toggleOpen}
        href={constructOrganizationURL(datum)}
      >
        <div className={orgOptionContainerStyle}>
          <span className={nameStyle}>
            {orgName} {active && '(current)'}
          </span>

          {!isOnPrem && showPlanType && (
            <div className={displayFlex}>
              {planType === PlanType.Atlas ? (
                <AtlasIcon size={10} />
              ) : (
                <CloudManagerIcon size={10} />
              )}
              <span className={productStyle}>
                {formattedPlanTypes[planType]}
              </span>
            </div>
          )}
        </div>
      </MenuItem>
    );
  };

  return (
    <>
      <InteractionRingWrapper
        className={orgTriggerContainerStyle}
        ringClassName={cx(orgTriggerRingStyle, {
          [orgStandaloneTriggerRingStyle]: disabled,
        })}
        selector={triggerDataProp.selector}
      >
        <button
          {...triggerDataProp.prop}
          aria-disabled={loading}
          data-testid="org-trigger"
          disabled={loading}
          onClick={onElementClick(
            NavElement.OrgNavOrgSelectTrigger,
            toggleOpen,
          )}
          className={cx(baseButtonStyle, orgButtonStyle, {
            [activeButtonStyle]: open,
            [textLoadingStyle]: loading,
            [orgStandaloneButtonStyle]: disabled,
          })}
        >
          {!isTablet && (
            <Icon
              size="small"
              glyph="Building"
              className={cx(iconColorStyle, { [iconLoadingStyle]: loading })}
            />
          )}
          <span
            data-testid="org-select-active-org"
            className={cx(selectedStyle, {
              [textLoadingStyle]: loading,
            })}
          >
            {disabled ? 'All Organizations' : current?.orgName ?? ''}
          </span>
          <Icon
            size="small"
            glyph={open ? 'CaretUp' : 'CaretDown'}
            className={cx(caretBaseStyle, { [iconLoadingStyle]: loading })}
          />
        </button>
        <Menu
          usePortal={false}
          className={menuContainerStyle}
          justify="start"
          spacing={0}
          setOpen={toggleOpen}
          open={open}
        >
          {data && (
            <FocusableMenuItem>
              <Input
                data-testid="org-filter-input"
                variant="organization"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
              />
            </FocusableMenuItem>
          )}

          <ul className={ulStyle}>
            {isAdminSearch && isFetching && (
              <li className={emptyStateStyle}>Searching...</li>
            )}
            {isAdminSearch && !isFetching && renderedData.length === 0 && (
              <li className={emptyStateStyle}>No matches found</li>
            )}
            {renderedData?.map(renderOrganizationOption) ?? (
              <li className={emptyStateStyle}>
                You do not belong to any organizations. Create an organization
                on the{' '}
                <a href={urls.viewAllOrganizations} className={linkStyle}>
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
                onKeyDown={onKeyDown}
                href={urls.viewAllOrganizations!}
                data-testid="org-select-view-all-orgs"
                onClick={onElementClick(NavElement.OrgNavViewAllOrganizations)}
              >
                <strong className={viewAllStyle}>View All Organizations</strong>
              </MenuItem>
            </>
          )}
        </Menu>
      </InteractionRingWrapper>

      {!disabled && (
        <a
          {...anchorDataProp.prop}
          href={urls.orgSettings}
          aria-label="settings"
          data-testid="org-trigger-settings"
          aria-disabled={loading}
          tabIndex={loading ? -1 : 0}
          onClick={onElementClick(NavElement.OrgNavOrgSettings)}
          className={cx(orgSettingsButtonStyle, {
            [focusedLinkStyle]: showFocus,
            [removePointerEvents]: loading,
          })}
        >
          <Icon
            glyph="Settings"
            className={cx({
              [activeIconStyle]: isActive,
              [iconLoadingStyle]: loading,
            })}
          />
        </a>
      )}
    </>
  );
}

OrgSelect.displayName = 'OrgSelect';

export default OrgSelect;
