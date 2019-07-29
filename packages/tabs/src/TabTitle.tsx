import React, { useRef, useEffect, useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';

const listTitle = css`
  display: inline-block;
  background-color: ${uiColors.white};
  color: ${uiColors.gray.base};
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
  padding: 3px 24px;
  cursor: pointer;
  transition: 150ms color ease-in-out;
  border: none;
  background: none;

  &:focus {
    color: ${uiColors.blue.base};
    outline: none;
  }

  &:hover:not(:focus) {
    color: ${uiColors.gray.dark3};
  }
`;

interface TabTitleProps extends HTMLElementProps<'button'> {
  active: boolean;
  id?: string;
  children: Array<React.ReactElement>;
  disabled?: boolean;
  dataTabId: string;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  ariaControls?: string;
  setFocusedState: React.Dispatch<SetStateAction<Array<string>>>;
  as: React.ElementType<any>;
}

function TabTitle({
  active,
  children,
  className,
  disabled,
  dataTabId,
  onClick,
  onKeyDown,
  ariaControls,
  setFocusedState,
  as,
  ...rest
}: TabTitleProps) {
  const titleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (titleRef && titleRef.current && active && !disabled) {
      titleRef.current.focus();
    }
  }, [active]);

  const onBlur = useCallback(() => {
    setFocusedState((curr: Array<string>) =>
      curr.filter(el => dataTabId !== el),
    );
  }, [setFocusedState]);

  const onFocus = useCallback(() => {
    setFocusedState((curr: Array<string>) => [...curr, dataTabId]);
  }, [setFocusedState]);

  const Root = as;

  return (
    <Root
      {...rest}
      ref={titleRef}
      className={cx(listTitle, className)}
      role="tab"
      data-tab-id={dataTabId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-controls={ariaControls}
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={active ? 0 : -1}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </Root>
  );
}

TabTitle.displayName = 'TabTitle';

TabTitle.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  dataTabId: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaControls: PropTypes.string,
  as: PropTypes.string,
};

export default TabTitle;
