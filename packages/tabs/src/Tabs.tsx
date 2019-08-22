import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tab, { TabProps } from './Tab';
import TabTitle from './TabTitle';
import omit from 'lodash/omit';

const borderHeight = 3;

const listStyle = css`
  list-style: none;
  padding: 0px;
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
  onChange?: (
    e: React.MouseEvent<any>,
    index: number,
  ) => void | React.EventHandler<any>;

  /**
   * Index of the Tab that should appear active. If value passed to selected prop, component will be controlled by consumer.
   */
  selected?: number | null;

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
 * @param props.selected Index of the Tab that should appear active. If value passed, component will be controlled by consumer.
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
  const [activeIndex, setActiveIndex] = useState();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [focusedState, setFocusedState] = useState([]);

  const childrenArray = React.Children.toArray(children) as Array<
    React.ReactElement
  >;

  const currentIndex = childrenArray.findIndex((child, index) => {
    if (!child) {
      return false;
    }

    if (activeIndex || typeof selected === 'number') {
      return [activeIndex, selected].includes(index);
    }

    return child.props.default;
  });

  function handleChange(
    e: React.SyntheticEvent<Element, MouseEvent>,
    idx: number,
  ) {
    if (typeof selected !== 'number' && !selected) {
      setActiveIndex(idx);
    }

    if (onChange) {
      onChange(e, idx);
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

    const enabledCurrentIndex = enabledIndexes.indexOf(activeIndex);

    let index: number;

    switch (e.key) {
      case 'ArrowRight':
        index = (enabledCurrentIndex + 1) % enabledIndexes.length;
        setActiveIndex(enabledIndexes[index]);
        break;

      case 'ArrowLeft':
        index =
          (enabledCurrentIndex - 1 + enabledIndexes.length) %
          enabledIndexes.length;
        setActiveIndex(enabledIndexes[index]);
        break;
    }
  }

  function calcStyle() {
    if (
      !tabListRef ||
      !tabListRef.current ||
      typeof currentIndex !== 'number'
    ) {
      return null;
    }

    const tabListChildren: Array<Element> = Array.from(
      tabListRef.current.children,
    );

    let computedX = 0;

    for (let i = 0; i < currentIndex; i++) {
      computedX += tabListChildren[i].scrollWidth;
    }

    return css`
      transform: translate3d(${computedX}px, 0, 0);
      width: ${tabListChildren[currentIndex].scrollWidth}px;
    `;
  }

  const tabs = React.Children.map(children, (child, index) => {
    if (!isTab(child)) {
      return child;
    }

    const active =
      selected === index ||
      (activeIndex ? index === activeIndex : child.props.default);

    return React.cloneElement(child, {
      key: index,
      ariaControl: `tab-{index}`,
      active,
    });
  });

  return (
    <div {...rest} className={className}>
      <div
        className={listStyle}
        role="tablist"
        onKeyDown={handleKeyDown}
        ref={tabListRef}
      >
        {tabs.map((tab, index) => {
          const { value, active, disabled, id, ...rest } = tab.props;

          const filteredRest = omit(rest, [
            'ariaControl',
            'children',
            'title',
            'default',
          ]);

          return (
            <TabTitle
              {...filteredRest}
              key={value}
              className={cx({
                [activeStyle]: active,
                [disabledStyle]: disabled,
              })}
              id={id}
              onClick={
                !disabled
                  ? (event: React.MouseEvent) => handleChange(event, index)
                  : undefined
              }
              onKeyDown={handleKeyDown}
              ariaControl={`tab-${value}`}
              disabled={disabled}
              active={active}
              index={index}
              setFocusedState={setFocusedState}
              as={as}
            >
              {tab.props.title}
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
