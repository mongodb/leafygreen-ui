import React, { useState } from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import MongoSelect from '../mongo-select/index';
import { ProjectInterface, OverridesInterface } from '../types';

const productStyle = css`
  text-decoration: none;
  width: 100px;
  margin-left: 25px;
  margin-right: 25px;
  font-size: 14px;
  color: ${uiColors.gray.dark2};
`;

interface ProjNavInterface {
  current: ProjectInterface;
  data: Array<ProjectInterface>;
  constructProjectURL: (orgID: string, projID: string) => string;
  overrides?: OverridesInterface;
  alerts?: number;
}

export default function ProjNav({
  current,
  data,
  constructProjectURL,
  overrides,
  alerts,
}: ProjNavInterface) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        height: 45px;
        box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <MongoSelect
          variant="project"
          current={current}
          data={data}
          constructProjectURL={constructProjectURL}
          overrides={overrides}
          className={css`
            margin-right: 6px;
          `}
        />
        <Menu
          trigger={
            <IconButton ariaLabel="More">
              <Icon
                glyph="Ellipsis"
                className={css`
                  transform: rotate(90deg);
                `}
              />
            </IconButton>
          }
          open={open}
          setOpen={setOpen}
        >
          <MenuItem>Project Settings</MenuItem>
          <MenuItem>Project Access Manager</MenuItem>
          <MenuItem>Project Support</MenuItem>
          <MenuItem>Integrations</MenuItem>
        </Menu>
        <ol
          className={css`
            list-style: none;
            display: flex;
            padding: 0px;
            position: relative;
            margin-block-start: 0;
            margin-block-end: 0;
          `}
        >
          <li role="none">
            <a href="cloud.mongodb.com" className={productStyle}>
              Atlas
            </a>
          </li>
          <li role="none">
            <a href="stitch.mongodb.com" className={productStyle}>
              Stitch
            </a>
          </li>
          <li role="none">
            <a href="charts.mongodb.com" className={productStyle}>
              Charts
            </a>
          </li>
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
              className={css`
                margin-right: 20px;
              `}
            >
              {alerts && (
                <div
                  className={css`
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
                  `}
                >
                  {alerts}
                </div>
              )}
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
            <IconButton ariaLabel="Project Activity Feed">
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
