import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import { URLSInterface } from '../types';
import { InteractionRingWrapper } from '../helpers/index';

const triggerDataProp = createDataProp('org-trigger');
const anchorDataProp = createDataProp('anchor-data-prop');
const projectTriggerDataProp = createDataProp('project-trigger');

const orgTriggerContainer = css`
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const buttonStyles = css`
  padding: unset;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
  position: relative;
  background-color: white;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  height: 30px;
  padding: 3px 5px;

  &:focus {
    outline: none;
  }

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

const anchorStyle = css`
  color: ${uiColors.gray.base};
  padding-left: 6px;
  padding-right: 6px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 5px 5px 0;
  border: 1px solid ${uiColors.gray.light2};
  border-left: 0;
  background-color: white;
  margin-right: 20px;
  outline: none;

  &:hover {
    background-color: ${uiColors.gray.light2};
    border-color: ${uiColors.gray.light2};
    color: ${uiColors.gray.dark2};
  }
`;

const projectTriggerStyle = css`
  width: 174px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: unset;
  border-color: transparent;
  background-color: white;
  position: relative;
  color: ${uiColors.gray.dark2};
  padding: 2px;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const orgTriggerBorderRadius = css`
  border-radius: 7px 0 0 7px;
`;

const projectTriggerWrapper = css`
  margin-left: 9px;
  margin-right: 4px;
`;

const activeColor = css`
  color: ${uiColors.green.base};
`;

const focusStyle = css`
  &:focus {
    background-color: ${uiColors.blue.light2};
    color: ${uiColors.blue.dark2};
    border-color: ${uiColors.blue.light2};
  }
`;

interface OrganizationTriggerProps {
  children?: React.ReactNode;
  placeholder: string;
  urls: Required<URLSInterface>;
  isActive?: boolean;
  open?: boolean;
}

export function OrganizationTrigger({
  children,
  placeholder,
  urls,
  isActive = false,
  open = false,
  ...rest
}: OrganizationTriggerProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  return (
    <>
      <InteractionRingWrapper
        className={orgTriggerContainer}
        ringClassName={orgTriggerBorderRadius}
        selector={triggerDataProp.selector}
      >
        <button {...rest} {...triggerDataProp.prop} className={buttonStyles}>
          <Icon size="small" glyph="Building" />
          <span className={selectedStyle}>{placeholder}</span>
          <Icon size="small" glyph={open ? 'CaretUp' : 'CaretDown'} />
        </button>
      </InteractionRingWrapper>

      <a
        {...anchorDataProp.prop}
        className={cx(anchorStyle, { [focusStyle]: showFocus })}
        href={urls.mongoSelect.orgSettings}
        aria-label="settings"
      >
        <Icon
          glyph="Settings"
          className={cx({
            [activeColor]: isActive,
          })}
        />
      </a>
      {children}
    </>
  );
}

interface ProjectTriggerProps {
  children?: React.ReactNode;
  placeholder: string;
  open?: boolean;
}

export function ProjectTrigger({
  children,
  placeholder,
  open,
  ...rest
}: ProjectTriggerProps) {
  return (
    <InteractionRingWrapper
      selector={projectTriggerDataProp.selector}
      className={projectTriggerWrapper}
      ringClassName={css`
        border-radius: 7px;
      `}
    >
      <button
        {...rest}
        {...projectTriggerDataProp.prop}
        className={projectTriggerStyle}
      >
        <Icon size="small" glyph="Bell" />
        <span className={selectedStyle}>{placeholder}</span>
        <Icon size="small" glyph={open ? 'CaretUp' : 'CaretDown'} />
        {children}
      </button>
    </InteractionRingWrapper>
  );
}
