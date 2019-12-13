import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';

const baseTriggerContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 5px;
`;

const orgTriggerContainer = css`
  border-radius: 5px;
  border: 1px solid ${uiColors.gray.light2};
`;

const projectTriggerContainer = css`
  height: 45px;
`;

const resetButtonStyle = css`
  padding: unset;
  border: none;
  background-color: white;

  &::-moz-focus-inner {
    border: 0;
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 30px;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
`;

const selectedStyle = css`
  margin-left: 4px;
  font-weight: bolder;
  flex-grow: 1;
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

interface TriggerProps {
  children?: React.ReactNode;
  selected: string;
  className?: string;
}

export function OrganizationTrigger({
  children,
  selected,
  className,
  ...rest
}: TriggerProps) {
  return (
    <div className={cx(baseTriggerContainer, orgTriggerContainer, className)}>
      <button {...rest} className={cx(resetButtonStyle, buttonContainer)}>
        <Icon size="small" glyph="Building" />
        <span className={selectedStyle}>{selected}</span>
        <Icon size="small" glyph="CaretDown" />
      </button>
      <a
        href="v2#/preferences/personalization"
        className={cx(anchorStyle, border)}
        aria-label="settings"
      >
        <Icon glyph={'Settings'} />
      </a>
      {children}
    </div>
  );
}

export function ProjectTrigger({
  children,
  selected,
  className,
  ...rest
}: TriggerProps) {
  return (
    <button
      {...rest}
      className={cx(
        baseTriggerContainer,
        projectTriggerContainer,
        resetButtonStyle,
        buttonContainer,
        className,
      )}
    >
      <Icon size="small" glyph="Bell" />
      <span className={cx(selectedStyle, fontSize)}>{selected}</span>
      <Icon size="small" glyph="CaretDown" />
      {children}
    </button>
  );
}
