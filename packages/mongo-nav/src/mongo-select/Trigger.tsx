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

const projectTriggerContainer = css`
  height: 45px;
  padding: 3px 5px;
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

const anchorWrapperStyle = css`
  margin-right: 20px;
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

  &:focus {
    outline: none;
  }
`;

const projectTriggerStyle = css`
  width: 174px;
  height: 28px;
  display: flex;
  align-items: space-around;
  padding: unset;
  border: none;
  background-color: white;
  position: relative;
  color: ${uiColors.gray.dark2};

  &:focus {
    outline: none;
  }
`;

const interactionRing = css`
  transition: all 150ms ease-in-out;
  transform: scale(0.9, 0.8);
  border-radius: 7px;
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  background-color: ${uiColors.gray.light2};
`;

const orgTriggerBorderRadius = css`
  border-radius: 7px 0 0 7px;
`;

const settingsTriggerBorderRadius = css`
  border-radius: 0 7px 7px 0;
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
      background-color: #63b0d0;
      transform: scale(1);
      z-index: 1;
    }
  `;

  const interactionRingHoverStyle = css`
    ${selector}:hover + & {
      transform: scale(1);
      z-index: 1;
    }
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
        css`
          position: relative;
          z-index: -1;
        `,
        {
          [css`
            z-index: 1;
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
  isActive,
  open = false,
  ...rest
}: OrganizationTriggerProps) {
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

      <InteractionRingWrapper
        className={anchorWrapperStyle}
        ringClassName={settingsTriggerBorderRadius}
        selector={anchorDataProp.selector}
      >
        <a
          {...anchorDataProp.prop}
          className={anchorStyle}
          href={urls.mongoSelect.orgSettings}
          aria-label="settings"
        >
          <Icon
            glyph={'Settings'}
            fill={isActive ? uiColors.green.base : uiColors.gray.base}
          />
        </a>
      </InteractionRingWrapper>

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
      className={css`
        margin-left: 9px;
      `}
    >
      <button
        {...rest}
        {...projectTriggerDataProp.prop}
        className={cx(projectTriggerStyle)}
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
