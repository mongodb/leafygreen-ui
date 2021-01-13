import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { keyMap, isComponentType, IdAllocator } from '@leafygreen-ui/lib';
import TabTitle from './TabTitle';

const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };

const modeColors = {
  [Mode.Light]: {
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
      border-bottom: 1px solid ${uiColors.gray.light2};
    `,
  },

  [Mode.Dark]: {
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
      border-bottom: 1px solid ${uiColors.gray.dark2};
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

function useDocumentActiveElement() {
  const [activeEl, setActiveEl] = useState<Element | null>(null);

  const handleFocusIn = useCallback(() => {
    setActiveEl(document.activeElement);
  }, []);

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [handleFocusIn]);

  return activeEl;
}

const tabIdAllocator = IdAllocator.create('tab');
const tabpanelIdAllocator = IdAllocator.create('tab-panel');

type ReactEmpty = null | undefined | false | '';

interface TabsProps {
  /**
   * Content that will appear inside of Tabs component. Should be comprised of at least two Tabs.
   */
  children: Array<React.ReactElement | ReactEmpty>;

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
   * determines if component will appear for Dark Mode
   * @default false
   */
  darkMode?: boolean;

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
  darkMode = false,
  as = 'button',
  ...rest
}: TabsProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const containerNode = useRef<HTMLDivElement | null>(null);
  const activeEl = useDocumentActiveElement();
  const [isAnyTabFocused, setIsAnyTabFocused] = useState(false);

  useEffect(() => {
    const tabsList = Array.from(containerNode.current?.children ?? []);

    if (activeEl !== null && tabsList.indexOf(activeEl) !== -1) {
      setIsAnyTabFocused(true);
    }
  }, [activeEl, containerNode]);

  const childrenArray = useMemo(() => React.Children.toArray(
    children,
  ) as Array<React.ReactElement>, [children]);

  const isControlled = typeof controlledSelected === 'number';
  const [uncontrolledSelected, setUncontrolledSelected] = useState(
    childrenArray.findIndex(child => child.props.default || 0),
  );
  const selected = isControlled ? controlledSelected : uncontrolledSelected;
  const setSelected = isControlled
    ? setControlledSelected
    : setUncontrolledSelected;

  const handleChange = useCallback(
    (e: React.SyntheticEvent<Element, MouseEvent>, index: number) => {
      setSelected(index);
    },
    [setSelected],
  );

  const getEnabledIndexes: () => [Array<number>, number] = useCallback(() => {
    const enabledIndexes = childrenArray
      .filter(child => !child.props.disabled)
      .map(child => childrenArray.indexOf(child));

    return [enabledIndexes, enabledIndexes.indexOf(selected!)];
  }, [childrenArray, selected]);

  const handleArrowKeyPress = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [getEnabledIndexes, setSelected],
  );

  const { tabs, tabpanels } = useMemo(() => {
    const tabs: Array<React.ReactElement> = [];

    const tabpanels = React.Children.map(children, (child, index) => {
      if (!isComponentType(child, 'Tab')) {
        return child;
      }

      const { id: idProp, name, disabled, onClick } = child.props;
      const tabpanelId = tabpanelIdAllocator.generate();
      const tabId = idProp ?? tabIdAllocator.generate();
      const isTabSelected = selected === index;

      const tabTitle = (
        <TabTitle
          aria-controls={tabpanelId}
          aria-selected={isTabSelected}
          id={tabId}
          key={index}
          disabled={disabled}
          selected={isTabSelected}
          index={index}
          as={as}
          darkMode={darkMode}
          isAnyTabFocused={isAnyTabFocused}
          onKeyDown={handleArrowKeyPress}
          className={cx({
            [modeColors[mode].activeStyle]: isTabSelected,
            [cx(modeColors[mode].disabledColor, disabledStyle)]: disabled,
          })}
          onClick={
            !disabled
              ? (event: React.MouseEvent) => {
                onClick?.(event);
                handleChange(event, index);
              }
              : undefined
          }
        >
          {name}
        </TabTitle>
      );

      tabs.push(tabTitle);

      return React.cloneElement(child, {
        id: tabpanelId,
        ['aria-labelledby']: tabId,
        selected: isTabSelected,
      });
    });

    return { tabs, tabpanels };
  }, [
    children,
    as,
    darkMode,
    handleArrowKeyPress,
    handleChange,
    isAnyTabFocused,
    selected,
    mode,
  ]);

  return (
    <div {...rest} className={className}>
      <div
        className={cx(listStyle, modeColors[mode].underlineColor)}
        role="tablist"
        tabIndex={0}
        aria-orientation="horizontal"
        ref={containerNode}
      >
        {tabs}
      </div>
      {tabpanels}
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
