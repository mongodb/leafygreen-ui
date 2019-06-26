import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Tab, { TabProps } from './Tab';

const listStyle = css`
  display: flex;
  list-style: none;
`;

const listTitle = css`
  margin-left: 5px;
  margin-right: 5px;
`;

interface TabsProps {
  children: React.ReactNode;
  onChange: React.ReactEventHandler;
  selected?: string;
  defaultSelected?: string;
  vertial?: boolean;
}

function Tabs({
  children,
  onChange,
  selected,
  defaultSelected,
  vertical,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultSelected);

  function handleChange(e: React.PointerEvent) {
    if (defaultSelected) {
      setActiveTab(e.target.id);
    }

    onChange(e);
  }

  function isTab(
    element: React.ReactNode,
  ): element is React.ReactElement<TabProps, typeof Tab> {
    return (
      element != null &&
      typeof element === 'object' &&
      'type' in element &&
      (element.type as any).displayName === 'Tab'
    );
  }

  const tabs = React.Children.map(children, child => {
    if (!isTab(child)) {
      return child;
    }

    return React.cloneElement(child, {
      active: child.props.id === activeTab || child.props.id === selected,
      key: child.props.id,
      handleChange,
    });
  });

  return (
    <div>
      <ul className={listStyle}>
        {tabs.map(tab => (
          <li
            className={listTitle}
            id={tab.props.id}
            onClick={!tab.props.disabled ? handleChange : null}
          >
            {tab.props.title}
          </li>
        ))}
      </ul>
      {tabs}
    </div>
  );
}

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  selected: PropTypes.string,
  defaultSelected: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Tabs;
