import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { Variant } from '.';

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

const leftStyle = css`
  display: flex;
  align-items: center;
`;

const selectedStyle = css`
  margin-left: 4px;
  font-weight: bolder;
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

const projectMenuStyle = css`
  transform: rotate(90deg);
`;

interface TriggerProps {
  children?: React.ReactNode;
  selected: string;
  variant: Variant;
  orgId: string;
}

function Trigger({
  children,
  selected,
  variant,
  orgId,
  ...rest
}: TriggerProps) {
  const isOrganization = variant === Variant.Organization;

  return (
    <div
      className={cx(baseTriggerContainer, {
        [orgTriggerContainer]: isOrganization,
        [projectTriggerContainer]: !isOrganization,
      })}
    >
      <button {...rest} className={cx(resetButtonStyle, buttonContainer)}>
        <span className={leftStyle}>
          <span>
            <Icon size="small" glyph={isOrganization ? 'Building' : 'Bell'} />
          </span>
          <span className={cx(selectedStyle, { [fontSize]: !isOrganization })}>
            {selected}
          </span>
        </span>
        <Icon size="small" glyph="CaretDown" />
      </button>
      <a
        href={
          isOrganization
            ? 'v2#/preferences/personalization'
            : `/v2#/org/${orgId}/projects`
        }
        className={cx(anchorStyle, { [border]: isOrganization })}
        aria-label="settings"
      >
        <Icon
          glyph={isOrganization ? 'Settings' : 'Ellipsis'}
          className={cx({
            [projectMenuStyle]: !isOrganization,
          })}
        />
      </a>
      {children}
    </div>
  );
}

Trigger.displayName = 'Trigger';

Trigger.propTypes = {
  selected: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['organization', 'project']),
  orgId: PropTypes.string,
};

export default Trigger;
