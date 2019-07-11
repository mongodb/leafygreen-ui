import React, { useRef, useEffect, useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';

interface TabTitleProps extends HTMLElementProps<'button'> {
  active: boolean;
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
  children: PropTypes.node,
  disabled: PropTypes.bool,
  dataTabId: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  ariaControls: PropTypes.string,
  as: PropTypes.string,
};

export default TabTitle;
