import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tab, { TabProps } from './Tab';
import TabTitle from './TabTitle';

const listStyle = css`
  list-style: none;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const activeStyle = css`
  color: ${uiColors.gray.dark3};
  cursor: default;
`;

const disabledStyle = css`
  pointer-events: none;
  color: ${uiColors.gray.light2};
`;

const grayBorder = css`
  height: 3px;
  background-color: ${uiColors.gray.light2};
  position: relative;
`;

const greenBorder = css`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: ${uiColors.green.base};
  transition: 150ms transform ease-in-out, 150ms width ease-in-out 10ms;
`;

const focusedStyle = css`
  background-color: ${uiColors.blue.base};
`;

function isTab(
  element: React.ReactNode,
): element is React.ReactElement<TabProps, typeof Tab> {
  if (!(element != null && typeof element === 'object' && 'type' in element)) {
    return false;
  }

  return (element.type as any).displayName === 'Tab';
}

interface TabsProps {
  /**
   * Content that will appear inside of Tabs component. Should be comprised of at least two Tabs.
   */
  children: Array<React.ReactElement>;

  /**
   * Callback to be executed when a tab is selected.
   */
  onChange?: React.ReactEventHandler;

  /**
   * Tab that should appear active. If value passed to selected prop, component will be controlled by consumer.
   */
  selected?: string | null;

  /**
   * className supplied to Tabs container.
   */
  className?: string;

  /**
   * HTML Element that wraps title in Tab List.
   */
  as?: React.ElementType<any>;
}

/**
 * # Tabs
 *
 * Tabs component
 *
 * ```
<Tabs onChange={() => execute callback onChange}>
  <Tab value='tab-1' title='First Tab'>Tab 1</Tab>
  <Tab value='tab-2' title='Second Tab'>Tab 2</Tab>
</Tabs>
```
 * @param props.children Content to appear inside of Tabs component.
 * @param props.onChange Callback to be executed when a Tab is selected.
 * @param props.selected Tab that should appear active. If value passed, component will be controlled by consumer.
 * @param props.className Classname applied to Tabs container.
 * @param props.as HTML Element that wraps title in Tab List.
 */
function Tabs({
  children,
  onChange,
  selected,
  className,
  as = 'button',
  ...rest
}: TabsProps) {
  const [activeTab, setActiveTab] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [focusedState, setFocusedState] = useState([] as Array<string>);
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentIndex = React.Children.map(
      children,
      (child: React.ReactElement, index) => {
        if (child === null || child === undefined) {
          return;
        }

        if (selected || activeTab) {
          return child.props.value === activeTab ||
            child.props.value === selected
            ? index
            : null;
        }

        if (child.props.default) {
          return index;
        }

        return null;
      },
    ).filter(index => index !== null);

    setCurrentIndex(currentIndex[0]);
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
    if (selected) {
      return;
    }

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

    let index: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        index = (enabledCurrentIndex + 1) % enabledIndexes.length;
        setActiveTab(children[enabledIndexes[index]].props.value);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        index =
          (enabledCurrentIndex - 1 + enabledIndexes.length) %
          enabledIndexes.length;
        setActiveTab(children[enabledIndexes[index]].props.value);
        break;
    }
  }

  function calcStyle() {
    if (
      !tabListRef ||
      !tabListRef.current ||
      typeof currentIndex !== 'number'
    ) {
      return css``;
    }

    const tabListChildren: Array<Element> = Array.from(
      tabListRef.current.children,
    );

    let computedX = 0;

    for (let i = 0; i < currentIndex || 0; i++) {
      computedX += tabListChildren[i].scrollWidth;
    }

    return css`
      transform: translate3d(${computedX}px, 0, 0);
      width: ${tabListChildren[currentIndex].scrollWidth}px;
    `;
  }

  const valuesArray: Array<string> = [];

  const tabs = React.Children.map(children, (child: React.ReactNode, index) => {
    if (!isTab(child)) {
      return child;
    }

    if (valuesArray.length && valuesArray.includes(child.props.value)) {
      // eslint-disable-next-line no-console
      console.warn(
        'You are using the same value for one or more tabs. Please make sure all values are unique',
      );
    }

    valuesArray.push(child.props.value);

    const active =
      selected === child.props.value ||
      (activeTab ? child.props.value === activeTab : child.props.default);

    return React.cloneElement(child, {
      key: child.props.value,
      ariaControl: `tab-${index}`,
      active,
    });
  }) as Array<React.ReactElement>;

  return (
    <div {...rest} className={className}>
      <div
        className={listStyle}
        role="tablist"
        onKeyDown={handleKeyDown}
        ref={tabListRef}
      >
        {tabs.map(
          (tab, i) =>
            tab && (
              <TabTitle
                key={i}
                className={cx({
                  [activeStyle]: tab.props.active,
                  [disabledStyle]: tab.props.disabled,
                })}
                id={tab.props.id}
                dataTabId={tab.props.value}
                onClick={!tab.props.disabled ? handleChange : undefined}
                onKeyDown={handleKeyDown}
                ariaControls={`tab-${i}`}
                disabled={tab.props.disabled}
                active={tab.props.active}
                setFocusedState={setFocusedState}
                as={as}
              >
                {tab.props.title}
              </TabTitle>
            ),
        )}
      </div>
      <div className={grayBorder}>
        <div
          className={cx(greenBorder, calcStyle(), {
            [focusedStyle]: !!focusedState.length,
          })}
        ></div>
      </div>
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
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Tabs;
