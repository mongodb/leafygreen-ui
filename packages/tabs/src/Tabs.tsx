import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tab, { TabProps } from './Tab';

const listStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  list-style: none;
  padding: 0px;
  margin: 20px 0px 5px 0;
  border-bottom: 3px solid ${uiColors.gray.light2};
`;

const listTitle = css`
  display: inline-block;
  background-color: ${uiColors.white};
  color: ${uiColors.gray.base};
  border-bottom: 3px solid ${uiColors.gray.light2};
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
  text-transform: capitalize;
  margin-bottom: -3px;
  padding: 8px 24px;
  cursor: pointer;

  &:hover {
    color: ${uiColors.gray.dark3};
  }
`;

const activeStyle = css`
  background-color: ${uiColors.white};
  border-bottom: 3px solid ${uiColors.green.base};
  color: ${uiColors.gray.dark3};
`;

const disabledStyle = css`
  cursor: not-allowed;
  color: ${uiColors.gray.light2};

  &:hover {
    color: ${uiColors.gray.light2};
  }
`;

interface TabsProps {
  children: Array<React.ReactElement>;
  onChange?: React.ReactEventHandler;
  selected?: string | null;
  className?: string;
}

function Tabs({ children, onChange, selected, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    const currIdx = React.Children.map(
      children,
      (child: React.ReactElement, index) => {
        if (child === null || child === undefined) {
          return;
        }

        if (selected) {
          return child.props.value === selected ? index : null;
        }

        if (activeTab) {
          return child.props.value === activeTab ? index : null;
        }

        if (child.props.default) {
          return index;
        }

        return null;
      },
    ).filter(index => index !== null);

    setCurrentIndex(currIdx[0]);
  });

  function handleChange(e: React.SyntheticEvent<Element, MouseEvent>) {
    if (!selected) {
      setActiveTab((e.target as HTMLLIElement).getAttribute('data-tab-id'));
    }

    if (onChange) {
      onChange(e);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const enabledIndexes = React.Children.map(
      children,
      (child: React.ReactElement, index) => {
        return !child.props.disabled ? index : null;
      },
    ).filter(index => index !== null);

    let idx: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        idx = (currentIndex + 1) % enabledIndexes.length;
        setActiveTab(children[idx].props.value);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        idx =
          (currentIndex - 1 + enabledIndexes.length) % enabledIndexes.length;
        setActiveTab(children[idx].props.value);
        break;
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
      <ul className={listStyle} role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map(
          (tab, i) =>
            tab && (
              <li
                key={i}
                className={cx(listTitle, {
                  [activeStyle]: tab.props.active,
                  [disabledStyle]: tab.props.disabled,
                })}
                id={tab.props.id}
                role="tab"
                data-tab-id={tab.props.value}
                onClick={!tab.props.disabled ? handleChange : undefined}
                onKeyDown={handleKeyDown}
                aria-controls={`list-${i}`}
                aria-selected={tab.props.active}
                tabIndex={0}
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
