import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { useEventListener, useElementNode } from '@leafygreen-ui/hooks';
import TabTitle from './TabTitle';
import omit from 'lodash/omit';

const borderHeight = 3;

const listStyle = css`
  list-style: none;
  padding: 0px;
  display: flex;
  width: 100%;
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

interface TabsProps {
  /**
   * Content that will appear inside of Tabs component. Should be comprised of at least two Tabs.
   */
  children: Array<React.ReactElement>;

  /**
   * Callback to be executed when Tab is selected. Receives index of activated Tab as the first argument.
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
 * @param props.setSelected Callback to be executed when Tab is selected. Receives index of activated Tab as the first argument.
 * @param props.selected Index of the Tab that should appear active. If value passed, component will be controlled by consumer.
 * @param props.className className applied to Tabs container.
 * @param props.as HTML Element that wraps name in Tab List.
 */
function Tabs({
  children,
  setSelected: setControlledSelected,
  selected: controlledSelected,
  className,
  as = 'button',
  ...rest
}: TabsProps) {
  const childrenArray = React.Children.toArray(children) as Array<
    React.ReactElement
  >;

  const isControlled = typeof controlledSelected === 'number';
  const [uncontrolledSelected, setUncontrolledSelected] = useState(
    childrenArray.findIndex(child => child.props.default || 0),
  );
  const selected = isControlled ? controlledSelected : uncontrolledSelected;
  const setSelected = isControlled
    ? setControlledSelected
    : setUncontrolledSelected;

  const [focusedState, setFocusedState] = useState([0]);

  const [ref, setRef] = useElementNode();

  const currentIndex = childrenArray.findIndex((child, index) => {
    if (!child) {
      return false;
    }

    if (typeof selected === 'number') {
      return selected === index;
    }

    return child.props.default;
  });

  function handleChange(
    e: React.SyntheticEvent<Element, MouseEvent>,
    index: number,
  ) {
    setSelected(index);
  }

  const getEnabledIndexes: () => [Array<number>, number] = () => {
    const enabledIndexes = childrenArray
      .filter(child => !child.props.disabled)
      .map(child => childrenArray.indexOf(child));

    return [enabledIndexes, enabledIndexes.indexOf(selected!)];
  };

  const handleArrowKeyPress = (e: KeyboardEvent) => {
    if (!(e.metaKey || e.ctrlKey)) {
      if (e.keyCode === keyMap.ArrowRight) {
        const [enabledIndexes, current] = getEnabledIndexes();
        setSelected(enabledIndexes[(current + 1) % enabledIndexes.length]);
      } else if (e.keyCode === keyMap.ArrowLeft) {
        const [enabledIndexes, current] = getEnabledIndexes();
        setSelected(
          enabledIndexes[
            (current - 1 + enabledIndexes.length) % enabledIndexes.length
          ],
        );
      }
    }
  };

  useEventListener('keydown', handleArrowKeyPress);

  function calcStyle() {
    if (!ref || typeof currentIndex !== 'number') {
      return null;
    }

    const tabListChildren: Array<Element> = Array.from(ref.children).filter(
      child => child != null,
    );

    let computedX = 0;

    for (let i = 0; i < currentIndex; i++) {
      computedX += tabListChildren[i]?.scrollWidth;
    }

    return css`
      transform: translate3d(${computedX}px, 0, 0);
      width: ${tabListChildren[currentIndex]?.scrollWidth}px;
    `;
  }

  const tabs = React.Children.map(children, (child, index) => {
    if (!isComponentType<'Tab'>(child, 'Tab')) {
      return child;
    }

    return React.cloneElement(child, {
      key: index,
      ariaControl: `tab-${index}`,
      selected: selected === index,
    });
  });

  return (
    <div {...rest} className={className}>
      <div className={listStyle} role="tablist" ref={setRef} tabIndex={0}>
        {tabs.map((tab, index) => {
          const { selected, disabled, ...rest } = tab.props;

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
                [activeStyle]: selected,
                [disabledStyle]: disabled,
              })}
              onClick={
                !disabled
                  ? (event: React.MouseEvent) => handleChange(event, index)
                  : undefined
              }
              ariaControl={`tab-${index}`}
              disabled={disabled}
              selected={selected}
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
