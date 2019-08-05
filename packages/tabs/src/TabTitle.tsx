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
  // padding-bottom dervied from border height + 5px
  padding: 3px 20px 8px;
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

interface SharedTabTitleProps {
  active: boolean;
  id?: string;
  disabled?: boolean;
  dataTabId: string;
  ariaControls?: string;
  setFocusedState: React.Dispatch<SetStateAction<Array<string>>>;
  className?: string;
}

interface LinkTabTitleProps extends HTMLElementProps<'a'>, SharedTabTitleProps {
  href: string;
}

interface ButtonTabTitleProps
  extends HTMLElementProps<'button'>,
    SharedTabTitleProps {
  href?: null;
}

type CustomElementButtonProps = SharedTabTitleProps & {
  as: React.ElementType<any>;
  [key: string]: any;
};

export type TabTitleProps =
  | LinkTabTitleProps
  | ButtonTabTitleProps
  | CustomElementButtonProps;

function usesCustomElement(
  props: TabTitleProps,
): props is CustomElementButtonProps {
  return (props as any).as != null;
}

function usesLinkElement(
  props: LinkTabTitleProps | ButtonTabTitleProps,
): props is LinkTabTitleProps {
  return props.href != null;
}

function TabTitle(props: TabTitleProps) {
  const {
    active,
    children,
    className,
    disabled,
    dataTabId,
    onClick,
    onKeyDown,
    ariaControls,
    setFocusedState,
    ...rest
  } = props;

  // delete rest.tabTitle, delete rest.ariaControl;
  // delete rest.default;
  // delete rest.children;

  const titleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (titleRef.current && active && !disabled) {
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

  const renderTabTitle = (Root: React.ElementType<any> = 'button') => (
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

  if (usesCustomElement(props)) {
    return renderTabTitle(props.as);
  }

  if (usesLinkElement(props)) {
    return renderTabTitle('a');
  }

  return renderTabTitle();
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
