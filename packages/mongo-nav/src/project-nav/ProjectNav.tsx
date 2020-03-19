import React from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { ProjectSelect } from '../mongo-select';
import { facepaint, breakpoints } from '../breakpoints';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { iconLoadingStyle, textLoadingStyle } from '../styles';
import { useOnElementClick } from '../on-element-click-provider';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
  HostsInterface,
  PlanType,
  ActiveNavElement,
  NavElement,
} from '../types';
import {
  AtlasActive,
  AtlasInactive,
  ChartsActive,
  ChartsInactive,
} from './SubBrandIcons';

const {
  ProjectNavProjectDropdown,
  ProjectNavProjectSettings,
  ProjectNavProjectSupport,
  ProjectNavProjectIntegrations,
  ProjectNavCloud,
  ProjectNavRealm,
  ProjectNavCharts,
  ProjectNavInvite,
  ProjectNavActivityFeed,
  ProjectNavAlerts,
} = NavElement;

export const projectNavHeight = 45;

const productIconProp = createDataProp('charts-data-prop');

const navContainerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: ${projectNavHeight}px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  box-sizing: border-box;
  background-color: white;
  position: relative;
  z-index: 0;
`;

const menuIconButtonStyle = css`
  background-color: transparent;

  ${facepaint({
    marginRight: ['20px', '14px', '20px'],
  })}
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const productListStyle = css`
  display: flex;
  align-self: stretch;
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  flex-grow: 1;
`;

const productTabStyle = css`
  display: inline-flex;
  justify-content: center;
  position: relative;

  ${facepaint({
    minWidth: ['100px', '60px', '100px'],
    marginRight: ['16px', '8px', '16px'],
  })}
`;

const productStates = {
  focus: css`
    outline: none;

    &:focus {
      color: ${uiColors.blue.base};

      &:after {
        background-color: #9dd0e7;
        opacity: 1;
        transform: scale(1);
      }

      > ${productIconProp.selector} {
        color: ${uiColors.blue.base};
      }
    }
  `,

  active: css`
    font-weight: bolder;
    color: ${uiColors.green.dark3};

    &:hover {
      color: ${uiColors.green.dark3};

      > ${productIconProp.selector} {
        color: ${uiColors.green.base};
      }
    }

    &:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.green.base}};
    }

    > ${productIconProp.selector} {
      color: ${uiColors.green.base};
    }
  `,

  loading: textLoadingStyle,
};

const productStyle = css`
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  color: ${uiColors.gray.dark2};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  transition: 150ms color ease-in-out;

  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: scale(0.6, 1);
    background-color: ${uiColors.gray.light2};
    transition: 150ms all ease-in-out;
    border-radius: 50px 50px 0 0;
  }

  &:hover {
    color: ${uiColors.gray.dark3};

    &:after {
      opacity: 1;
      transform: scale(1);
    }

    > ${productIconProp.selector} {
      color: ${uiColors.gray.dark2};
    }
  }
`;

const cloudManagerStyle = css`
  width: 130px;
`;

const iconButtonMargin = css`
  ${facepaint({
    marginRight: ['16px', '16px', '20px'],
  })}
`;

const alertBadgeStyle = css`
  position: absolute;
  top: -6px;
  right: -4px;
  background-color: ${uiColors.red.base};
  width: 14px;
  height: 14px;
  border-radius: 200px;
  font-size: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const productIconStyle = css`
  margin-right: 4px;
  color: ${uiColors.gray.base};
`;

const tooltipStyles = css`
  width: 150px;
  text-align: center;
`;

export function displayProductName(today = new Date(Date.now())) {
  const mdbLiveDate = new Date('May 4, 2020 0:00:00');

  if (today < mdbLiveDate) {
    return 'Stitch';
  }

  return 'Realm';
}

const secondTabName = displayProductName();

interface ProjectNavInterface {
  current?: CurrentProjectInterface;
  data?: Array<ProjectInterface>;
  constructProjectURL: (orgID: string, projID: string) => string;
  urls: Required<URLSInterface>;
  hosts: Required<HostsInterface>;
  alerts?: number;
  activeProduct: Product;
  activeNav?: NavElement;
  onProjectChange: React.ChangeEventHandler;
}

export default function ProjectNav({
  current,
  data,
  constructProjectURL,
  urls,
  activeProduct,
  activeNav,
  onProjectChange,
  hosts,
  alerts = 0,
}: ProjectNavInterface) {
  const [open, setOpen] = React.useState(false);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { width: viewportWidth } = useViewportSize();
  const onElementClick = useOnElementClick();
  const { projectNav } = urls;
  const isMobile = viewportWidth < breakpoints.small;
  const isCloudManager = current?.planType === PlanType.Cloud;

  const sharedTooltipProps = {
    variant: 'dark',
    usePortal: false,
    className: tooltipStyles,
  } as const;

  const getProductClassName = (product: Product) =>
    cx(productStyle, {
      [productStates.active]: !!(activeProduct === product && current),
      [productStates.focus]: showFocus,
      [productStates.loading]: !current,
      [cloudManagerStyle]: isCloudManager,
    });

  const iconStyle = cx(productIconStyle, {
    [iconLoadingStyle]: !current,
  });

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <ProjectSelect
        current={current}
        data={data}
        constructProjectURL={constructProjectURL}
        urls={urls}
        onChange={onProjectChange}
        loading={!current}
      />

      <Menu
        open={open}
        setOpen={setOpen}
        usePortal={false}
        trigger={
          <IconButton
            ariaLabel="More"
            className={menuIconButtonStyle}
            active={open}
            disabled={!current}
            data-testid="project-nav-project-menu"
            onClick={onElementClick(ProjectNavProjectDropdown)}
          >
            <Icon glyph="Ellipsis" className={menuIconStyle} />
          </IconButton>
        }
      >
        <MenuItem
          href={projectNav.settings}
          data-testid="project-nav-settings"
          onClick={onElementClick(ProjectNavProjectSettings, () =>
            setOpen(false),
          )}
        >
          Project Settings
        </MenuItem>

        <MenuItem
          href={projectNav.support}
          data-testid="project-nav-support"
          onClick={onElementClick(ProjectNavProjectSupport, () =>
            setOpen(false),
          )}
        >
          Project Support
        </MenuItem>
        <MenuItem
          href={projectNav.integrations}
          data-testid="project-nav-integrations"
          onClick={onElementClick(ProjectNavProjectIntegrations, () =>
            setOpen(false),
          )}
        >
          Integrations
        </MenuItem>
      </Menu>

      <ul className={productListStyle}>
        <li role="none" className={productTabStyle}>
          <a
            href={hosts.cloud}
            className={getProductClassName('cloud')}
            aria-disabled={!current}
            tabIndex={current ? 0 : -1}
            onClick={onElementClick(ProjectNavCloud)}
            data-testid={`project-nav-${
              isCloudManager ? 'cloud-manager' : 'atlas'
            }`}
          >
            {/* {!isMobile && (
              <Icon
                {...productIconProp.prop}
                className={iconStyle}
                glyph="Cloud"
              />
            )} */}
            {!isMobile && activeProduct === 'cloud' ? (
              <AtlasActive {...productIconProp.prop} className={iconStyle} />
            ) : (
              <AtlasInactive {...productIconProp.prop} className={iconStyle} />
            )}
            {isCloudManager ? 'Cloud Manager' : 'Atlas'}
          </a>
        </li>

        {!isCloudManager && (
          <>
            <li role="none" className={productTabStyle}>
              <a
                data-testid="project-nav-realm"
                href={hosts.realm}
                className={getProductClassName('realm')}
                aria-disabled={!current}
                tabIndex={current ? 0 : -1}
                onClick={onElementClick(ProjectNavRealm)}
              >
                {!isMobile && (
                  <Icon
                    {...productIconProp.prop}
                    className={iconStyle}
                    glyph="Stitch"
                  />
                )}

                {secondTabName}
              </a>
            </li>

            <li role="none" className={productTabStyle}>
              <a
                data-testid="project-nav-charts"
                href={projectNav.charts}
                className={getProductClassName('charts')}
                aria-disabled={!current}
                tabIndex={current ? 0 : -1}
                onClick={onElementClick(ProjectNavCharts)}
              >
                {!isMobile &&
                  (activeProduct === 'charts' ? (
                    <ChartsActive
                      {...productIconProp.prop}
                      className={iconStyle}
                    />
                  ) : (
                    <ChartsInactive
                      {...productIconProp.prop}
                      className={iconStyle}
                    />
                  ))}
                Charts
              </a>
            </li>
          </>
        )}
      </ul>

      {!isMobile && (
        <>
          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="middle"
            usePortal={false}
            trigger={
              <IconButton
                ariaLabel="Invite"
                href={projectNav.invite as string}
                className={iconButtonMargin}
                size="large"
                disabled={!current}
                active={activeNav === ActiveNavElement.ProjectNavInvite}
                data-testid="project-nav-invite"
                onClick={onElementClick(ProjectNavInvite)}
              >
                <Icon glyph="InviteUser" size="large" />
              </IconButton>
            }
          >
            Invite To Project
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="middle"
            usePortal={false}
            trigger={
              <IconButton
                ariaLabel="Project Activity Feed"
                href={projectNav.activityFeed as string}
                size="large"
                className={iconButtonMargin}
                disabled={!current}
                active={activeNav === ActiveNavElement.ProjectNavActivityFeed}
                data-testid="project-nav-activity-feed"
                onClick={onElementClick(ProjectNavActivityFeed)}
              >
                <Icon glyph="ActivityFeed" size="large" />
              </IconButton>
            }
          >
            View the Project Activity Feed
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="end"
            usePortal={false}
            trigger={
              <IconButton
                ariaLabel="Alerts"
                href={projectNav.alerts as string}
                size="large"
                disabled={!current}
                active={activeNav === ActiveNavElement.ProjectNavAlerts}
                data-testid="project-nav-alerts"
                onClick={onElementClick(ProjectNavAlerts)}
              >
                {alerts > 0 && (
                  <div
                    className={alertBadgeStyle}
                    data-testid="project-nav-alerts-badge"
                  >
                    {alerts}
                  </div>
                )}

                <Icon glyph="Bell" size="large" />
              </IconButton>
            }
          >
            View the Project Alerts
          </Tooltip>
        </>
      )}
    </nav>
  );
}
