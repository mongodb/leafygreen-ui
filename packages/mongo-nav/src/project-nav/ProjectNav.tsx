import React from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { ProjectSelect } from '../mongo-select/index';
import { facepaint, breakpoints } from '../breakpoints';
import { useViewportSize } from '@leafygreen-ui/hooks';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
  HostsInterface,
} from '../types';
import { iconLoadingStyle, textLoadingStyle } from '../styles';

const productIconProp = createDataProp('charts-data-prop');
export const projectNavHeight = 45;

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

const mongoSelectWrapper = css`
  display: flex;
  align-items: center;
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
    width: ['100px', '60px', '100px'],
    marginRight: ['16px', '8px', '16px'],
  })}
`;

const productStates = {
  focus: css`
    outline: none;

    &:focus {
      color: ${uiColors.blue.base};

      > ${productIconProp.selector} {
        color: ${uiColors.blue.base};
      }

      &:after {
        background-color: #9dd0e7;
        opacity: 1;
        transform: scale(1);
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

    > ${productIconProp.selector} {
      color: ${uiColors.green.base};
    }

    &:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.green.base}};
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

interface ProjectNavInterface {
  current?: CurrentProjectInterface;
  data?: Array<ProjectInterface>;
  constructProjectURL: (orgID: string, projID: string) => string;
  urls: Required<URLSInterface>;
  hosts: Required<HostsInterface>;
  alerts?: number;
  activeProduct: Product;
  onProjectChange: React.ChangeEventHandler;
}

export default function ProjectNav({
  current,
  data,
  constructProjectURL,
  urls,
  activeProduct,
  onProjectChange,
  hosts,
  alerts = 0,
}: ProjectNavInterface) {
  const [open, setOpen] = React.useState(false);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { projectNav } = urls;
  const { width: viewportWidth } = useViewportSize();
  const isMobile = viewportWidth < breakpoints.small;

  const getProductClassName = (product: Product) =>
    cx(productStyle, {
      [productStates.active]: !!(activeProduct === product && current),
      [productStates.focus]: showFocus,
      [productStates.loading]: !current,
    });

  const sharedTooltipProps = {
    variant: 'dark',
    usePortal: false,
    className: tooltipStyles,
  } as const;

  const iconStyle = cx(productIconStyle, {
    [iconLoadingStyle]: !current,
  });

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <div className={mongoSelectWrapper}>
        <ProjectSelect
          current={current}
          data={data}
          constructProjectURL={constructProjectURL}
          urls={urls}
          onChange={onProjectChange}
          loading={!current}
        />
      </div>

      <Menu
        open={open}
        setOpen={setOpen}
        trigger={
          <IconButton
            ariaLabel="More"
            className={menuIconButtonStyle}
            active={open}
            disabled={!current}
          >
            <Icon glyph="Ellipsis" className={menuIconStyle} />
          </IconButton>
        }
      >
        <MenuItem href={projectNav.settings}>Project Settings</MenuItem>
        <MenuItem href={projectNav.accessManager}>
          Project Access Manager
        </MenuItem>
        <MenuItem href={projectNav.support}>Project Support</MenuItem>
        <MenuItem href={projectNav.integrations}>Integrations</MenuItem>
      </Menu>

      <ul className={productListStyle}>
        <li role="none" className={productTabStyle}>
          <a
            href={hosts.cloud}
            className={getProductClassName('cloud')}
            aria-disabled={!current}
            tabIndex={!current ? -1 : 0}
          >
            {!isMobile && (
              <Icon
                {...productIconProp.prop}
                className={iconStyle}
                glyph="Cloud"
              />
            )}
            Atlas
          </a>
        </li>

        <li role="none" className={productTabStyle}>
          <a
            href={hosts.realm}
            className={getProductClassName('realm')}
            aria-disabled={!current}
            tabIndex={!current ? -1 : 0}
          >
            {!isMobile && (
              <Icon
                {...productIconProp.prop}
                className={iconStyle}
                glyph="Stitch"
              />
            )}
            Realm
          </a>
        </li>

        <li role="none" className={productTabStyle}>
          <a
            href={hosts.charts}
            className={getProductClassName('charts')}
            aria-disabled={!current}
            tabIndex={!current ? -1 : 0}
          >
            {!isMobile && (
              <Icon
                {...productIconProp.prop}
                className={iconStyle}
                glyph="Charts"
              />
            )}
            Charts
          </a>
        </li>
      </ul>

      {!isMobile && (
        <>
          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="middle"
            trigger={
              <IconButton
                ariaLabel="Invite"
                href={projectNav.invite as string}
                className={iconButtonMargin}
                size="large"
                disabled={!current}
              >
                <Icon glyph="Person" size="large" />
              </IconButton>
            }
          >
            Invite To Project
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="middle"
            trigger={
              <IconButton
                ariaLabel="Project Activity Feed"
                href={projectNav.activityFeed as string}
                size="large"
                className={iconButtonMargin}
                disabled={!current}
              >
                <Icon glyph="Save" size="large" />
              </IconButton>
            }
          >
            View the Project Activity Feed
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="end"
            trigger={
              <IconButton
                ariaLabel="Alerts"
                href={projectNav.alerts as string}
                size="large"
                disabled={!current}
              >
                {alerts > 0 && <div className={alertBadgeStyle}>{alerts}</div>}
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
