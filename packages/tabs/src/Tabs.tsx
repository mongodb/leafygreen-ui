import React, {
  useState,
  ReactElement,
  ReactNode,
  ReactChild,
  ReactComponentElement,
} from 'react';
import PropTypes from 'prop-types';
import Tab, { TabProps } from './Tab';

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
  const [activeTab, setActiveTab] = useState(selected);

  function handleChange(e: React.PointerEvent) {
    console.log('hi')
    
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
      (element.type as any).displayName === 'RadioBox'
    );
  }
  
  const tabs = React.Children.map(children, child => {
    if (!isTab(child)) {
      return child;
    }

    return React.cloneElement(child, {
      onChange: handleChange,
      active: child.props.id === activeTab || child.props.id === selected,
    });
  });

  return (
    <div>
      <ul>{tabs.map(tab => <p onClick={handleChange}>{tab.props.title}</p>)}</ul>
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
