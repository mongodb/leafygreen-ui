import React, { useRef, useEffect, useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { TabProps } from '.';

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
  text-decoration: none;

  &:focus {
    color: ${uiColors.blue.base};
    outline: none;
  }

  &:hover:not(:focus) {
    color: ${uiColors.gray.dark3};
  }
`;

interface SharedTabTitleProps
  extends Omit<TabProps, 'default, title, href, to, value'> {
  dataTabId: string;
  setFocusedState: React.Dispatch<SetStateAction<Array<string>>>;
  as?: React.ElementType<any>;
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
    onClick,
    onKeyDown,
    ariaControl,
    setFocusedState,
    as,
    index,
    ...rest
  } = props;

  const titleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!disabled && active && titleRef.current) {
      titleRef.current.focus();
    }
  }, [active]);

  const onBlur = useCallback(() => {
    setFocusedState((curr: Array<string>) => curr.filter(el => index !== el));
  }, [setFocusedState]);

  const onFocus = useCallback(() => {
    setFocusedState((curr: Array<string>) => [...curr, index]);
  }, [setFocusedState]);

  const renderTabTitle = (Root: React.ElementType<any> = 'button') => (
    <Root
      {...rest}
      ref={titleRef}
      className={cx(listTitle, className)}
      role="tab"
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-controls={ariaControl}
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
    return renderTabTitle(as);
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
  ariaControl: PropTypes.string,
  as: PropTypes.string,
};

export default TabTitle;
