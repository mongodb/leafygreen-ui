import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
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
  background-color: white;

  &::-moz-focus-inner {
    border: 0;
  }
`;

const triggerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 30px;
  color: ${uiColors.gray.dark2};
  cursor: pointer;
`;

const orgGroupStyle = css`
  display: flex;
  align-items: center;
`;

const selectedOrgStyle = css`
  margin-left: 4px;
`;

const anchorStyle = css`
  color: ${uiColors.gray.base};
  padding-left: 5px;
  margin-left: 5px;
  border-left: 1px solid ${uiColors.gray.light2};
`;

function Trigger({ children, selected, ...rest }: TriggerProps) {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: 1px solid ${uiColors.gray.light2};
        padding: 3px 5px;
      `}
    >
      <button {...rest} className={cx(resetButtonStyle, triggerContainer)}>
        <span className={orgGroupStyle}>
          <span>
            <Icon size="small" glyph="Building" />
          </span>
          <span className={selectedOrgStyle}>{selected}</span>
        </span>
        <Icon size="small" glyph="CaretDown" />
      </button>
      <a
        href="https://mongodb.design"
        className={anchorStyle}
        aria-label="settings"
      >
        <Icon size="small" glyph="Settings" />
      </a>
      {children}
    </div>
  );
}

Trigger.displayName = 'Trigger';

Trigger.propTypes = {
  selected: PropTypes.string,
  children: PropTypes.node,
};

export default Trigger;
