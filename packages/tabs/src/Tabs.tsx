import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
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
  onChange?: React.ReactEventHandler;
  selected?: string | null;
  className?: string;
}

function Tabs({ children, onChange, selected, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState();

  function handleChange(e: React.SyntheticEvent<Element, MouseEvent>) {
    if (!selected) {
      setActiveTab((e.target as HTMLLIElement).getAttribute('data-tab-id'));
    }

    if (onChange) {
      onChange(e);
    }
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

  const tabs = React.Children.map(children, (child: React.ReactNode) => {
    if (!isTab(child)) {
      return child;
    }

    return React.cloneElement(child, {
      active:
        selected === child.props.value ||
        (activeTab ? child.props.value === activeTab : child.props.default),
      key: child.props.value,
    });
  }) as Array<React.ReactElement>;

  return (
    <div className={className}>
      <ul className={listStyle}>
        {tabs.map(
          (tab, i) =>
            tab && (
              <li
                key={i}
                className={listTitle}
                id={tab.props.id}
                data-tab-id={tab.props.value}
                onClick={!tab.props.disabled ? handleChange : undefined}
              >
                {tab.props.title}
              </li>
            ),
        )}
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
  className: PropTypes.string,
};

export default Tabs;
