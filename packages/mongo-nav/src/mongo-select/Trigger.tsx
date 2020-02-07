import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import {
  URLSInterface,
  CurrentProjectInterface,
  CurrentOrganizationInterface,
} from '../types';

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
`;

const fontSize = css`
  font-size: 14px;
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

const interactionRing = css`
  transition: all 150ms ease-in-out;
  transform: scale(0.9, 0.8);
  border-radius: 7px;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  pointer-events: none;
  background-color: ${uiColors.gray.light2};
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

interface InteractionRingWrapperProps {
  className?: string;
  ringClassName?: string;
  children: React.ReactElement;
  selector: string;
}

const InteractionRingWrapper = ({
  className,
  ringClassName,
  children,
  selector,
}: InteractionRingWrapperProps) => {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const [hasFocus, setHasFocus] = useState(false);

  const interactionRingFocusStyle = css`
    ${selector}:focus + & {
      background-color: #9dd0e7;
      transform: scale(1);
      z-index: 1;
    }
  `;

  const interactionRingHoverStyle = css`
    ${selector}:hover + & {
      transform: scale(1);
    }
  `;

  const defaultPosition = css`
    position: relative;
    z-index: 0;
  `;

  const modifiedChildren = React.Children.map(children, child =>
    React.cloneElement(child, {
      onFocus: () => setHasFocus(true),
      onBlur: () => setHasFocus(false),
      className: cx(
        child.props.className,
        css`
          position: relative;
          z-index: ${hasFocus ? 2 : 1};
        `,
      ),
    }),
  );

  return (
    <div
      className={cx(
        defaultPosition,
        {
          [css`
            z-index: 2;
          `]: hasFocus,
        },
        className,
      )}
    >
      {modifiedChildren}
      <div
        className={cx(
          interactionRing,
          interactionRingHoverStyle,
          {
            [interactionRingFocusStyle]: showFocus,
          },
          ringClassName,
        )}
      />
    </div>
  );
};

interface OrganizationTriggerProps {
  children?: React.ReactNode;
  current: CurrentOrganizationInterface;
  urls: Required<URLSInterface>;
  isActive?: boolean;
  open?: boolean;
}

export function OrganizationTrigger({
  children,
  current,
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
          <span className={selectedStyle}>{current.orgName}</span>
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
  current: CurrentProjectInterface;
  open?: boolean;
}

export function ProjectTrigger({
  children,
  current,
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
        className={projectTriggerStyle}
      >
        <Icon size="small" glyph="Bell" />
        <span className={cx(selectedStyle, fontSize)}>
          {current.projectName}
        </span>
        <Icon size="small" glyph={open ? 'CaretUp' : 'CaretDown'} />
        {children}
      </button>
    </InteractionRingWrapper>
  );
}
