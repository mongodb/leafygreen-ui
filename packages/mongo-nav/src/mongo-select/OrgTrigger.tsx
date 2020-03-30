import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp } from '@leafygreen-ui/lib';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { NavElement } from '../types';
import { BaseTriggerProps, mongoSelectUrls } from './types';
import { InteractionRingWrapper } from '../helpers';
import { facepaint, breakpoints } from '../breakpoints';
import {
  textLoadingStyle,
  iconLoadingStyle,
  removePointerEvents,
} from '../styles';
import { baseButtonStyles, selectedStyle, activeButtonColor } from './styles';
import { useOnElementClick } from '../on-element-click-provider';

const triggerDataProp = createDataProp('org-trigger');
const anchorDataProp = createDataProp('anchor-data-prop');

const orgButtonStyles = css`
  justify-content: space-between;
  border-radius: 5px 0 0 5px;
  border: 1px solid ${uiColors.gray.light2};
  width: 180px;
  height: 30px;
  padding: 3px 5px;
`;

const orgTriggerContainer = css`
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const disabledStyle = css`
  color: ${uiColors.gray.light1};
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

interface OrganizationTriggerProps extends BaseTriggerProps {
  urls: mongoSelectUrls;
  isActive?: boolean;
  onClick?: React.MouseEventHandler;
}

export default function OrgTrigger({
  children,
  placeholder,
  urls,
  isActive = false,
  open = false,
  disabled = false,
  onClick = () => {},
  loading = false,
  ...rest
}: OrganizationTriggerProps) {
  const onElementClick = useOnElementClick();
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
          onClick={onClick}
          aria-disabled={disabled || loading}
          data-testid="org-trigger"
          disabled={disabled || loading}
          className={cx(baseButtonStyles, orgButtonStyles, {
            [activeButtonColor]: open,
            [textLoadingStyle]: loading,
          })}
        >
          {!isTablet && (
            <Icon
              size="small"
              glyph="Building"
              className={cx(
                css`
                  color: ${uiColors.gray.base};
                `,
                { [iconLoadingStyle]: loading },
              )}
            />
          )}
          <span
            data-testid="org-select-active-org"
            className={cx(selectedStyle, {
              [disabledStyle]: disabled,
              [textLoadingStyle]: loading,
            })}
          >
            {placeholder}
          </span>
          <Icon
            size="small"
            glyph={open ? 'CaretUp' : 'CaretDown'}
            className={cx(
              css`
                flex-shrink: 0;
              `,
              { [iconLoadingStyle]: loading },
            )}
          />
          {children}
        </button>
      </InteractionRingWrapper>

      {!disabled && (
        <a
          {...anchorDataProp.prop}
          href={urls.orgSettings}
          aria-label="settings"
          data-testid="org-trigger-settings"
          aria-disabled={loading}
          tabIndex={loading ? -1 : 0}
          onClick={onElementClick(NavElement.OrgNavOrgSettings)}
          className={cx(orgSettingsButtonStyle, {
            [focusStyle]: showFocus,
            [removePointerEvents]: loading,
          })}
        >
          <Icon
            glyph="Settings"
            className={cx({
              [activeColor]: isActive,
              [iconLoadingStyle]: loading,
            })}
          />
        </a>
      )}
    </>
  );
}
