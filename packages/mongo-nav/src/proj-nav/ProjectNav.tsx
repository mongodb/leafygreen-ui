import React, { useState } from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import {
  AtlasActive,
  AtlasInactive,
  ChartsActive,
  ChartsInactive,
} from './SubBrandIcons';
import MongoSelect from '../mongo-select/index';
import {
  ProjectInterface,
  URLSInterface,
  CurrentProjectInterface,
  Product,
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
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const olStyle = css`
  list-style: none;
  display: flex;
  padding: 0px;
  position: relative;
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

interface ProjNavInterface {
  current: CurrentProjectInterface;
  data: Array<ProjectInterface>;
  constructProjectURL: (orgID: string, projID: string) => string;
  urls: URLSInterface;
  alerts?: number;
  activeProduct: Product;
  onProjectChange?: React.ChangeEventHandler;
}

export default function ProjNav({
  current,
  data,
  constructProjectURL,
  urls,
  alerts,
  activeProduct,
  onProjectChange,
}: ProjNavInterface) {
  const [open, setOpen] = useState(false);

  function calcStyle() {
    const products = {
      cloud: uiColors.green.base,
      stitch: '#59569E',
      charts: '#00C6BF',
    };

    const currentIndex = Object.keys(products).indexOf(activeProduct);

    let computedX = 25;

    for (let i = 0; i < currentIndex; i++) {
      computedX += 150;
    }

    return css`
      transform: translate3d(${computedX}px, 0, 0);
      background-color: ${products[activeProduct]};
    `;
  }

  return (
    <nav className={navContainerStyle} aria-label="project navigation">
      <div className={leftSide}>
        <MongoSelect
          variant="project"
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
          open={open}
          setOpen={setOpen}
        >
          <MenuItem href={urls?.projectNav?.settings}>
            Project Settings
          </MenuItem>
          <MenuItem href={urls?.projectNav?.accessManager}>
            Project Access Manager
          </MenuItem>
          <MenuItem href={urls?.projectNav?.support}>Project Support</MenuItem>
          <MenuItem href={urls?.projectNav?.integrations}>
            Integrations
          </MenuItem>
        </Menu>
        <ol className={olStyle}>
          <li role="none" className={productStyle}>
            <a href={'https://cloud.mongodb.com'} className={productTextStyle}>
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
            <a href="https://stitch.mongodb.com" className={productTextStyle}>
              {activeProduct === 'stitch' ? (
                <Icon glyph="Stitch" fill="#59569E" />
              ) : (
                <Icon glyph="Stitch" />
              )}
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
            <a href="https://charts.mongodb.com" className={productTextStyle}>
              {activeProduct === 'charts' ? (
                <ChartsActive />
              ) : (
                <ChartsInactive />
              )}
              <span
                className={cx(productMargin, {
                  [activeProductColor.charts]: activeProduct === 'charts',
                })}
              >
                Charts
              </span>
            </a>
          </li>
          <div className={cx(highlightColor, calcStyle())} />
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
              href={urls.projectNav?.alerts}
              className={alertIconButtonStyle}
            >
              {alerts && <div className={alertBadgeStyle}>{alerts}</div>}
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
              href={urls.projectNav?.activityFeed}
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
