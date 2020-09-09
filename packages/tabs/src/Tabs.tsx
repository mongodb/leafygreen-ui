import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { useEventListener } from '@leafygreen-ui/hooks';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import TabTitle from './TabTitle';
import omit from 'lodash/omit';

const Variant = {
  Default: 'default',
  Light: 'light',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const colorVariants = {
  [Variant.Default]: {
    activeStyle: css`
      color: ${uiColors.green.dark2};

      &:hover:not(:focus) {
        color: ${uiColors.green.dark2};
      }
    `,
    disabledColor: css`
      color: ${uiColors.gray.light1};
    `,
    underlineColor: css`
      background-color: ${uiColors.gray.light2};
    `,
    hoverIndicator: css`
      background-color: ${uiColors.gray.light2};
    `,
  },

  [Variant.Light]: {
    activeStyle: css`
      color: ${uiColors.green.light2};

      &:hover:not(:focus) {
        color: ${uiColors.green.light2};
      }
    `,
    disabledColor: css`
      color: ${uiColors.gray.dark1};
    `,
    underlineColor: css`
      background-color: ${uiColors.gray.dark2};
    `,
    hoverIndicator: css`
      background-color: ${uiColors.gray.dark1};
    `,
  },
};

const listStyle = css`
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
`;

const disabledStyle = css`
  cursor: not-allowed;
`;

const grayLine = css`
  height: 1px;
  position: relative;
  // Makes border overlap with box-model for TabTitle components
  margin-top: -4px;
  pointer-events: none;
`;

const sharedIndicatorStyles = css`
  position: absolute;
  top: -1px;
  max-width: 400px;
`;

const activeIndicator = css`
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

  variant?: Variant;

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
  variant = 'default',
  as = 'button',
  ...rest
}: TabsProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

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

  const tabListRef = useRef<HTMLDivElement>(null);

  const [focusedState, setFocusedState] = useState([0]);

  const [hoverIndex, setHoverIndex] = useState();

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

  function calcStyle(state: 'active' | 'hover') {
    const current = state === 'active' ? currentIndex : hoverIndex;

    if (!tabListRef || !tabListRef.current || typeof current !== 'number') {
      return null;
    }

    const tabListChildren: Array<Element> = Array.from(
      tabListRef.current.children,
    );

    let computedX = 0;

    for (let i = 0; i < current; i++) {
      computedX += tabListChildren[i].scrollWidth;
    }

    return css`
      transform: translate3d(${computedX}px, -2px, 0);
      width: ${tabListChildren[current].scrollWidth}px;
      height: 4px;
      border-radius: 4px 4px 0 0;
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
      <div className={listStyle} role="tablist" ref={tabListRef} tabIndex={0}>
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
                [colorVariants[variant].activeStyle]: selected,
                [cx(
                  colorVariants[variant].disabledColor,
                  disabledStyle,
                )]: disabled,
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
              onMouseEnter={() => !disabled && setHoverIndex(index)}
              onMouseLeave={() => !disabled && setHoverIndex(undefined)}
              variant={variant}
            >
              {tab.props.name}
            </TabTitle>
          );
        })}
      </div>

      <div className={cx(grayLine, colorVariants[variant].underlineColor)}>
        <div
          className={cx(
            sharedIndicatorStyles,
            activeIndicator,
            calcStyle('active'),
            {
              [focusedStyle]: showFocus && focusedState.length > 0,
            },
          )}
        />
        <div
          className={cx({
            [cx(
              sharedIndicatorStyles,
              calcStyle('hover'),
              colorVariants[variant].hoverIndicator,
            )]: currentIndex !== hoverIndex,
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
