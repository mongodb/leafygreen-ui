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
  display: flex;
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
   * When Tabs are controlled, callback to be executed when Tab is selected.
   */
  setSelected?: any;

  /**
   * Index of the Tab that should appear active. If value passed to selected prop, component will be controlled by consumer.
   */
  selected?: number;

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
<Tabs selected={0} setSelected={() => execute callback when new Tab is selected}>
  <Tab name='First Tab'>Tab 1</Tab>
  <Tab name='Second Tab'>Tab 2</Tab>
</Tabs>
```
 * @param props.children Content to appear inside of Tabs component.
 * @param props.setSelected Callback to be executed when a Tab is selected.
 * @param props.selected Index of the Tab that should appear active. If value passed, component will be controlled by consumer.
 * @param props.className className applied to Tabs container.
 * @param props.as HTML Element that wraps name in Tab List.
 */
function Tabs({
  children,
  setSelected,
  selected,
  className,
  as = 'button',
  ...rest
}: TabsProps) {
  const [activeIndex, setActiveIndex] = useState();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [focusedState, setFocusedState] = useState<[number]>([0]);

  const childrenArray = React.Children.toArray(children) as Array<
    React.ReactElement
  >;

  const currentIndex = childrenArray.findIndex((child, index) => {
    if (!child) {
      return false;
    }

    if (typeof activeIndex === 'number' || typeof selected === 'number') {
      return [activeIndex, selected].includes(index);
    }

    return child.props.default;
  });

  function handleChange(
    e: React.SyntheticEvent<Element, MouseEvent>,
    index: number,
  ) {
    if (typeof selected !== 'number' && !selected) {
      setActiveIndex(index);
    }

    if (setSelected) {
      setSelected(index);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (typeof selected === 'number') {
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
      typeof currentIndex !== 'number' ||
      currentIndex === -1
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
      (typeof activeIndex === 'number'
        ? index === activeIndex
        : child.props.default);

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
          const { active, disabled, ...rest } = tab.props;

          const filteredRest = omit(rest, [
            'ariaControl',
            'children',
            'name',
            'default',
          ]);

          return (
            <TabTitle
              {...filteredRest}
              key={index}
              className={cx({
                [activeStyle]: active,
                [disabledStyle]: disabled,
              })}
              onClick={
                !disabled
                  ? (event: React.MouseEvent) => handleChange(event, index)
                  : undefined
              }
              onKeyDown={handleKeyDown}
              ariaControl={`tab-${index}`}
              disabled={disabled}
              active={active}
              index={index}
              setFocusedState={setFocusedState}
              as={as}
            >
              {tab.props.name}
            </TabTitle>
          );
        })}
      </div>

      <div className={grayBorder}>
        <div
          className={cx(greenBorder, calcStyle(), {
            [focusedStyle]: focusedState.length > 0,
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
  setSelected: PropTypes.func,
  selected: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Tabs;
