import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tab, { TabProps } from './Tab';
import TabTitle from './TabTitle';

const borderHeight = 3;

const listStyle = css`
  list-style: none;
  padding: 0px;
  margin-top: 20px;
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
  height: ${borderHeight}px;
  background-color: ${uiColors.gray.light2};
  position: relative;
  // Makes border overlap with box-model for TabTitle components
  margin-top: -${borderHeight}px;
  pointer-events: none;
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

  const childrenArray = React.Children.toArray(children) as Array<
    React.ReactElement
  >;

  useEffect(() => {
    const currentIndex = childrenArray.reduce(
      (acc, child, index) => {
        if (!child) {
          return acc;
        }

        if (selected || activeTab) {
          return [activeTab, selected].includes(child.props.value)
            ? [...acc, index]
            : acc;
        }

        if (child.props.default) {
          return [...acc, index];
        }

        return acc;
      },
      [] as Array<number>,
    );

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

    const enabledIndexes = childrenArray.reduce(
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

  // using an object here in order to alert consumer if duplicate values are used
  const tabObject = childrenArray.reduce(
    (acc, child, index) => {
      if (!isTab(child)) {
        return { ...acc, [index]: child };
      }

      const childValue = child.props.value;

      if (Object.keys(acc).includes(childValue)) {
        // eslint-disable-next-line no-console
        console.warn(
          'You are using the same value for one or more tabs. Please make sure all values are unique',
        );

        return acc;
      }

      const active =
        selected === childValue ||
        (activeTab ? childValue === activeTab : child.props.default);

      const updatedChild = React.cloneElement(child, {
        key: childValue,
        ariaControl: `tab-${childValue}`,
        active,
      });

      return { ...acc, [childValue]: updatedChild };
    },
    {} as { string: React.ReactElement },
  );

  return (
    <div {...rest} className={className}>
      <div
        className={listStyle}
        role="tablist"
        onKeyDown={handleKeyDown}
        ref={tabListRef}
      >
        {Object.values(tabObject).map(tab => {
          // const value = tab.props.value;
          // const tabActive = tab.props.active;
          // const tabDisabled = tab.props.disabled;
          const { value, active, disabled, id, ...rest } = tab.props;

          return (
            <TabTitle
              key={value}
              className={cx({
                [activeStyle]: active,
                [disabledStyle]: disabled,
              })}
              id={id}
              dataTabId={value}
              onClick={!disabled ? handleChange : undefined}
              onKeyDown={handleKeyDown}
              ariaControls={`tab-${value}`}
              disabled={disabled}
              active={active}
              setFocusedState={setFocusedState}
              as={as}
              rest={rest}
            >
              {tab.props.tabTitle}
            </TabTitle>
          );
        })}
      </div>

      <div className={grayBorder}>
        <div
          className={cx(greenBorder, calcStyle(), {
            [focusedStyle]: !!focusedState.length,
          })}
        />
      </div>

      {Object.values(tabObject)}
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
