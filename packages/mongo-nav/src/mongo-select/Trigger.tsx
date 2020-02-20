import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { URLSInterface } from '../types';
import { InteractionRingWrapper } from '../helpers/index';
import {facepaint,  breakpoints} from '../breakpoints'

const triggerDataProp = createDataProp('org-trigger');
const anchorDataProp = createDataProp('anchor-data-prop');
const projectTriggerDataProp = createDataProp('project-trigger');

const baseButtonStyles = css`
  padding: unset;
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
  background-color: white;
  position: relative;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  padding: 3px 5px;

  ${facepaint({
    width: ['180px', '90px', '90px'],
    height: ['30px', '36px', '36px'],
  })}

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const orgButtonStyles = css`
  justify-content: space-between;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  width: 180px;
  height: 30px;
  padding: 3px 5px;
`;

const projectButtonStyles = css`
  justify-content: space-around;
  border-color: transparent;
  border-radius: 5px;
  padding: 2px;
  width: 174px;
  height: 28px;

  ${facepaint({
    width: ['196px', '106px', '106px'],
    height: ['28px', '36px', '36px'],
  })}

  &:focus {
    outline: none;
  }
`;

const orgTriggerContainer = css`
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const selectedStyle = css`
  margin-left: 4px;
  font-weight: bolder;
  flex-grow: 1;
  text-align: left;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

  ${facepaint({
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

const orgTriggerBorderRadius = css`
  border-radius: 7px 0 0 7px;
`;

const projectTriggerWrapper = css`
  margin-left: 16px;
  margin-right: 2px;


  ${facepaint({
    marginLeft: ['16px', '0px', '16px'],
  })}
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

const activeButtonColor = css`
  transition: background-color 150ms ease-in-out;
  background-color: ${uiColors.gray.light2};
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
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;

  return (
    <>
      <InteractionRingWrapper
        className={orgTriggerContainer}
        ringClassName={orgTriggerBorderRadius}
        selector={triggerDataProp.selector}
      >
        <button
          {...rest}
          {...triggerDataProp.prop}
          className={cx(baseButtonStyles, orgButtonStyles, {
            [activeButtonColor]: open,
          })}
        >
          {!isTablet && <Icon size="small" glyph="Building" />}
          <span className={selectedStyle}>{placeholder}</span>
          <Icon size="small" className={css`flex-shrink: 0;`} glyph={open ? 'CaretUp' : 'CaretDown'} />
          {children}
        </button>
      </InteractionRingWrapper>

      <a
        {...anchorDataProp.prop}
        className={cx(orgSettingsButtonStyle, { [focusStyle]: showFocus })}
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
  open = false,
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
        className={cx(baseButtonStyles, projectButtonStyles, {
          [activeButtonColor]: open,
        })}
      >
        <Icon glyph="Bell" className={css`color: ${uiColors.gray.base};`} />
        <span className={selectedStyle}>{placeholder}</span>
        <Icon size="small" glyph={open ? 'CaretUp' : 'CaretDown'} className={css`flex-shrink: 0;`} />
        {children}
      </button>
    </InteractionRingWrapper>
  );
}
