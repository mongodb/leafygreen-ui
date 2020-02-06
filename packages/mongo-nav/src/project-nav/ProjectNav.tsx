import React from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import MongoSelect from '../mongo-select/index';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
  HostsInterface,
} from '../types';

const productIconProp = createDataProp('charts-data-prop');

const navContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: 45px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  overflow: hidden;
`;

const mongoSelectWrapper = css`
  display: flex;
  align-items: center;
`;

const menuIconButtonStyle = css`
  margin: auto;
  background-color: white;
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const productListStyle = css`
  list-style: none;
  display: flex;
  position: relative;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const productStyle = css`
  margin-left: 25px;
  margin-right: 25px;
  display: inline-flex;
  justify-content: center;
  position: relative;
`;

const makeBorderVisible = css`
  &:after {
    opacity: 1;
    transform: scale(1);
  }
`;

const activeProductColor = css`
  font-weight: bolder;
  color: ${uiColors.green.dark3};

  > ${productIconProp.selector} {
    color: ${uiColors.green.base};
  }

  ${makeBorderVisible};

  &:after {
    background-color: ${uiColors.green.base}};
  }

  &:hover {
    color: ${uiColors.green.dark3};

    > ${productIconProp.selector} {
      color: ${uiColors.green.base};
    }
  }
`;

const focusProductColor = css`
  outline: none;

  &:focus {
    color: ${uiColors.blue.base};

    > ${productIconProp.selector} {
      color: ${uiColors.blue.base};
    }

    ${makeBorderVisible};

    &:after {
      background-color: ${uiColors.blue.base};
    }
  }
`;

const productTextStyle = css`
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
    transform: scale(0.8, 1);
    background-color: ${uiColors.gray.light2};
    transition: 150ms all ease-in-out;
  }

  &:hover {
    ${makeBorderVisible};
    color: ${uiColors.gray.dark3};

    > ${productIconProp.selector} {
      color: ${uiColors.gray.dark2};
    }
  }
`;

const iconButtonMargin = css`
  margin-right: 20px;
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
interface ProjectNavInterface {
  current: CurrentProjectInterface;
  data: Array<ProjectInterface>;
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
  alerts,
  activeProduct,
  onProjectChange,
  hosts,
}: ProjectNavInterface) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { projectNav } = urls;

  const getProductClassName = (product: Product) =>
    cx(productTextStyle, {
      [activeProductColor]: activeProduct === product,
      [focusProductColor]: showFocus,
    });

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <div
        className={css`
          display: flex;
        `}
      >
        <div className={mongoSelectWrapper}>
          <MongoSelect
            variant="project"
            current={current}
            data={data}
            constructProjectURL={constructProjectURL}
            urls={urls}
            onChange={onProjectChange}
          />
        </div>
        <Menu
          trigger={
            <IconButton ariaLabel="More" className={menuIconButtonStyle}>
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
          <li role="none" className={productStyle}>
            <a href={hosts.cloud} className={getProductClassName('cloud')}>
              <Icon
                {...productIconProp.prop}
                className={productIconStyle}
                glyph="Cloud"
              />
              Atlas
            </a>
          </li>

          <li role="none" className={productStyle}>
            <a href={hosts.stitch} className={getProductClassName('stitch')}>
              <Icon
                {...productIconProp.prop}
                className={productIconStyle}
                glyph="Stitch"
              />
              Stitch
            </a>
          </li>

          <li role="none" className={productStyle}>
            <a href={hosts.charts} className={getProductClassName('charts')}>
              <Icon
                {...productIconProp.prop}
                className={productIconStyle}
                glyph="Charts"
              />
              Charts
            </a>
          </li>
        </ul>
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <Tooltip
          align="bottom"
          justify="middle"
          variant="dark"
          trigger={
            <IconButton
              ariaLabel="Invite"
              href={projectNav.alerts as string}
              className={iconButtonMargin}
              size="large"
            >
              <Icon glyph="Person" size="large" />
            </IconButton>
          }
        >
          Invite To Project
        </Tooltip>
        <Tooltip
          align="bottom"
          justify="middle"
          variant="dark"
          trigger={
            <IconButton
              ariaLabel="Alerts"
              href={projectNav.alerts as string}
              className={iconButtonMargin}
              size="large"
            >
              {alerts && <div className={alertBadgeStyle}>{alerts}</div>}
              <Icon glyph="Bell" size="large" />
            </IconButton>
          }
        >
          View the Project Alerts
        </Tooltip>
        <Tooltip
          align="bottom"
          variant="dark"
          justify="end"
          trigger={
            <IconButton
              ariaLabel="Project Activity Feed"
              href={projectNav.activityFeed as string}
              size="large"
            >
              <Icon glyph="Save" size="large" />
            </IconButton>
          }
        >
          View the Project Activity Feed
        </Tooltip>
      </div>
    </nav>
  );
}
