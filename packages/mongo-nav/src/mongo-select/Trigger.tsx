import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { URLSInterface } from '../types';

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
  font-size: 13px;
`;

const disabledStyle = css`
  color: ${uiColors.gray.light1};
`;

const anchorStyle = css`
  color: ${uiColors.gray.base};
  padding-left: 5px;
  margin-left: 5px;
  height: 16px;
`;

const border = css`
  border-left: 1px solid ${uiColors.gray.light2};
`;

interface OrganizationTriggerProps {
  children?: React.ReactNode;
  placeholder: string;
  className?: string;
  urls: Required<URLSInterface>;
  isActive?: boolean;
  disabled?: boolean;
}

export function OrganizationTrigger({
  children,
  placeholder,
  className,
  urls,
  isActive,
  disabled = false,
  ...rest
}: OrganizationTriggerProps) {
  return (
    <div className={cx(orgTriggerContainer, className)}>
      <button
        {...rest}
        className={buttonContainer}
        data-testid="org-trigger"
        disabled={disabled}
      >
        <Icon
          className={cx({ [disabledStyle]: disabled })}
          size="small"
          glyph="Building"
        />
        <span className={cx(selectedStyle, { [disabledStyle]: disabled })}>
          {disabled ? 'All Organizations' : placeholder}
        </span>
        <Icon
          className={cx({ [disabledStyle]: disabled })}
          size="small"
          glyph="CaretDown"
        />
      </button>
      {!disabled && (
        <a
          href={urls.mongoSelect.orgSettings}
          className={cx(anchorStyle, border)}
          aria-label="settings"
          data-testid="org-trigger-settings"
        >
          <Icon
            glyph={'Settings'}
            fill={isActive ? uiColors.green.base : uiColors.gray.base}
          />
        </a>
      )}
      {children}
    </div>
  );
}

interface ProjectTriggerProps {
  children?: React.ReactNode;
  placeholder: string;
  className?: string;
}

export function ProjectTrigger({
  children,
  placeholder,
  className,
  ...rest
}: ProjectTriggerProps) {
  return (
    <button
      {...rest}
      data-testid="project-trigger"
      className={cx(buttonContainer, projectTriggerContainer, className)}
    >
      <Icon size="small" glyph="Bell" />
      <span className={selectedStyle}>{placeholder}</span>
      <Icon size="small" glyph="CaretDown" />
      {children}
    </button>
  );
}
