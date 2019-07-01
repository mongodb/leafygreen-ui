import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMutationObserver } from '@leafygreen-ui/hooks'
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tab, { TabProps } from './Tab';

const tabListItem = createDataProp('tab-li-item');

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

function TabTitle({children, key, className, id, dataTabId, onClick, onKeyDown, ariaControls, ariaSelected, ariaDisabled, onFocus, onBlur}) {
  const titleRef = useRef(null)

  const handleClick = (e) => {
    onClick()

    if (!ariaDisabled) {
      
    }
  }

const focusedStyle = css`
  &:${tabListItem}:focus {
    background-color: ${uiColors.blue.light2};
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
  const [isFocused, setFocusedState] = useState(false)
  const listRef = useRef<HTMLUListElement>(null);


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
    const enabledIndexes = React.Children.toArray(children).reduce(
      (acc, child, index) => {
        if (child.props.disabled) {
          return acc;
        }
        return [...acc, index];
      },
      [] as Array<number>,
    );

    const enabledCurrentIndex = enabledIndexes.indexOf(currentIndex);

    let idx: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        idx = (enabledCurrentIndex + 1) % enabledIndexes.length;
        const next = enabledIndexes[idx];
        setActiveTab(children[next].props.value);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        idx =
          (enabledCurrentIndex - 1 + enabledIndexes.length) %
          enabledIndexes.length;
        const prev = enabledIndexes[idx]
        setActiveTab(children[prev].props.value);
        break;
      case 'Enter':
      case 'Space':
        e.preventDefault()

        if (focusedTab) {
          setActiveTab(focusedTab)
        }
    }
  }

  const handleFocus = (e) => {
    setFocusedTab(e.target.getAttribute('data-tab-id'));
  }

  const handleBlur = (e) => {
    setFocusedTab(null)
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

  // console.log(document.activeElement, tabListItem)
  // console.log(document.activeElement.getAttribute(['data-leafygreen-ui']))
  // useEffect(() => {
  //   console.log('here')
  //   if (document.hasFocus() && document.activeElement.getAttribute(['data-leafygreen-ui']) === 'tab-li-item') {
  //     setFocusedState(true)
  //     return;
  //   }
  //   setFocusedState(false)
  // })
  console.log(isFocused)

  return (
    <div className={className}>
      <ul className={listStyle} role="tablist" onKeyDown={handleKeyDown}>
        {tabs.map(
          (tab, i) =>
            tab && (
              <TabTitle
                {...tabListItem.prop}
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
                ariaControls={`list-${i}`}
                ariaSelected={tab.props.active}
                ariaDisabled={tab.props.disabled}
                tabIndex={0}
                onFocus={handleFocus}
                onBlur={handleBlur}
                >
                  {tab.props.title}
              </TabTitle>
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



