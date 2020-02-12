import React from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { AtlasActive, AtlasInactive } from './SubBrandIcons';
import { ProjectSelect } from '../mongo-select/index';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
  HostsInterface,
} from '../types';

const navContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: 45px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  overflow: hidden;
`;

const leftSide = css`
  display: flex;
  position: relative;
`;

const projectSelectMargin = css`
  margin-right: 6px;
`;

const menuIconButtonStyle = css`
  margin: auto;
  background-color: white;
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const olStyle = css`
  list-style: none;
  display: flex;
  position: relative;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const productStyle = css`
  width: 100px;
  margin-left: 25px;
  margin-right: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const productMargin = css`
  margin-left: 4px;
  margin-top: 2px;
`;

const activeProductColor = {
  cloud: css`
    color: ${uiColors.green.dark3};
    font-weight: bold;
  `,
  stitch: css`
    color: #39477f;
    font-weight: bold;
  `,
  charts: css`
    color: #0e4d4c;
    font-weight: bold;
  `,
};

const productTextStyle = css`
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  color: ${uiColors.gray.dark2};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const highlightColor = css`
  height: 3px;
  width: 100px;
  position: absolute;
  bottom: 0;
  transition: 150ms transform ease-in-out, 150ms width ease-in-out 10ms;
`;

const alertIconButtonStyle = css`
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

function calcStyle(activeProduct: Product) {
  const products = {
    cloud: uiColors.green.base,
    stitch: '#59569D',
    charts: '#00C6BF',
  };

  const currentIndex = Object.keys(products).indexOf(activeProduct);

  let computedX = 25;

  for (let i = 0; i < currentIndex; i++) {
    computedX += 150;
  }

  return css`
    transform: translate3d(${computedX}px, 0, 0);
    background-color: ${products[
      activeProduct as 'stitch' | 'cloud' | 'charts'
    ]};
  `;
}

interface ProjectNavInterface {
  current: CurrentProjectInterface;
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
  const { projectNav } = urls;

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <div className={leftSide}>
        <ProjectSelect
          current={current}
          data={data}
          constructProjectURL={constructProjectURL}
          urls={urls}
          className={projectSelectMargin}
          onChange={onProjectChange}
        />
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
        <ol className={olStyle}>
          <li role="none" className={productStyle}>
            <a href={hosts.cloud} className={productTextStyle}>
              {activeProduct === 'cloud' ? <AtlasActive /> : <AtlasInactive />}
              <span
                className={cx(productMargin, {
                  [activeProductColor.cloud]: activeProduct === 'cloud',
                })}
              >
                Atlas
              </span>
            </a>
          </li>
          <li role="none" className={productStyle}>
            <a href={hosts.stitch} className={productTextStyle}>
              <Icon
                glyph="Stitch"
                fill={
                  activeProduct === 'stitch' ? '#59569D' : uiColors.gray.base
                }
              />
              <span
                className={cx(productMargin, {
                  [activeProductColor.stitch]: activeProduct === 'stitch',
                })}
              >
                Stitch
              </span>
            </a>
          </li>
          <li role="none" className={productStyle}>
            <a href={hosts.charts} className={productTextStyle}>
              <Icon
                glyph="Charts"
                fill={
                  activeProduct === 'charts' ? '#00C6BF' : uiColors.gray.base
                }
              />
              <span
                className={cx(productMargin, {
                  [activeProductColor.charts]: activeProduct === 'charts',
                })}
              >
                Charts
              </span>
            </a>
          </li>
          <div className={cx(highlightColor, calcStyle(activeProduct))} />
        </ol>
      </div>
      <div>
        <Tooltip
          align="bottom"
          justify="middle"
          variant="dark"
          trigger={
            <IconButton
              ariaLabel="Alerts"
              href={projectNav.alerts as string}
              className={alertIconButtonStyle}
            >
              {alerts > 0 && <div className={alertBadgeStyle}>{alerts}</div>}
              <Icon glyph="Bell" />
            </IconButton>
          }
        >
          Project Alerts
        </Tooltip>
        <Tooltip
          align="bottom"
          variant="dark"
          justify="middle"
          trigger={
            <IconButton
              ariaLabel="Project Activity Feed"
              href={projectNav.activityFeed as string}
            >
              <Icon glyph="Save" />
            </IconButton>
          }
        >
          Project Activity Feed
        </Tooltip>
      </div>
    </nav>
  );
}
