import React, { MouseEventHandler } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';

interface TriggerProps {
  children?: React.ReactNode;
  selected: string;
  onClick?: MouseEventHandler;
}

const resetButtonStyle = css`
  padding: unset;
  border: none;
`;

const triggerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 30px;
  color: ${uiColors.gray.dark2};
  border-radius: 5px;
  border: 1px solid ${uiColors.gray.light2};
  padding: 3px 5px;
  cursor: pointer;
`;

const orgGroupStyle = css`
  display: flex;
  align-items: center;
`;

const selectedOrgStyle = css`
  margin-left: 4px;
`;

const border = css`
  margin-left: 5px;
  border-left: 1px solid ${uiColors.gray.light2};
`;
const anchorStyle = css`
  color: ${uiColors.gray.base};
  padding-left: 5px;
`;

export default function Trigger({ children, selected, ...rest }: TriggerProps) {
  return (
    <button {...rest} className={cx(resetButtonStyle, triggerContainer)}>
      <span className={orgGroupStyle}>
        <span>
          <Icon size="small" glyph="Building" />
        </span>
        <span className={selectedOrgStyle}>{selected}</span>
      </span>
      <span>
        <span>
          <Icon size="small" glyph="CaretDown" />
        </span>
        <span className={border}></span>
        <a
          href="https://mongodb.design"
          className={anchorStyle}
          aria-label="settings"
        >
          <Icon size="small" glyph="Settings" />
        </a>
      </span>
      {children}
    </button>
  );
}
