import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import {
  OverridesInterface,
  CurrentProjectInterface,
  OrganizationInterface,
} from '../types';

const orgTriggerContainer = css`
  border-radius: 5px;
  border: 1px solid ${uiColors.gray.light2};
  height: 30px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const projectTriggerContainer = css`
  height: 45px;
  padding: 3px 5px;
`;

const buttonContainer = css`
  padding: unset;
  border: none;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
  &::-moz-focus-inner {
    border: 0;
  }
`;

const selectedStyle = css`
  margin-left: 4px;
  font-weight: bolder;
  flex-grow: 1;
  text-align: left;
`;

const fontSize = css`
  font-size: 14px;
`;

const anchorStyle = css`
  color: ${uiColors.gray.base};
  padding-left: 5px;
  margin-left: 5px;
`;

const border = css`
  border-left: 1px solid ${uiColors.gray.light2};
`;

interface OrganizationTriggerProps {
  children?: React.ReactNode;
  current: OrganizationInterface;
  className?: string;
  overrides?: OverridesInterface;
}

export function OrganizationTrigger({
  children,
  current,
  className,
  overrides = { hosts: {}, urls: {} },
  ...rest
}: OrganizationTriggerProps) {
  const { hosts, urls } = overrides;

  const orgURI = hosts?.cloud
    ? `${hosts.cloud}/v2#`
    : `https://cloud.mongodb.com/v2#`;

  return (
    <div className={cx(orgTriggerContainer, className)}>
      <button {...rest} className={buttonContainer}>
        <Icon size="small" glyph="Building" />
        <span className={selectedStyle}>{current.orgName}</span>
        <Icon size="small" glyph="CaretDown" />
      </button>
      <a
        href={
          urls?.mongoSelect?.orgSettings ??
          `${orgURI}/org/${current.orgId}/settings/general`
        }
        className={cx(anchorStyle, border)}
        aria-label="settings"
      >
        <Icon glyph={'Settings'} />
      </a>
      {children}
    </div>
  );
}

interface ProjectTriggerProps {
  children?: React.ReactNode;
  current: CurrentProjectInterface;
  className?: string;
}

export function ProjectTrigger({
  children,
  current,
  className,
  ...rest
}: ProjectTriggerProps) {
  return (
    <button
      {...rest}
      className={cx(buttonContainer, projectTriggerContainer, className)}
    >
      <Icon size="small" glyph="Bell" />
      <span className={cx(selectedStyle, fontSize)}>{current.projectName}</span>
      <Icon size="small" glyph="CaretDown" />
      {children}
    </button>
  );
}
