import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { keyMap, isComponentType, Theme } from '@leafygreen-ui/lib';
import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import InternalTab from './InternalTab';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { AccessibleTabsProps } from './types';

// Using a background allows the "border" to appear underneath the individual tab color
const modeColors = {
  [Theme.Light]: {
    underlineColor: css`
      background: linear-gradient(
        0deg,
        ${palette.gray.light2} 1px,
        rgb(255 255 255 / 0%) 1px
      );
    `,
  },

  [Theme.Dark]: {
    underlineColor: css`
      background: linear-gradient(
        0deg,
        ${palette.gray.dark2} 1px,
        rgb(255 255 255 / 0%) 1px
      );
    `,
  },
};

const tabContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const inlineChildrenWrapperStyle = css`
  display: flex;
  align-items: center;
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
  overflow-x: auto;

  /* Remove scrollbar */

  /* Chrome, Edge, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* Firefox */
`;

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
function Tabs(props: AccessibleTabsProps) {
  validateAriaLabelProps(props, 'Tabs');

  const {
    children,
    inlineChildren,
    setSelected: setControlledSelected,
    selected: controlledSelected,
    className,
    darkMode: darkModeProp,
    as = 'button',
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  const { theme, darkMode } = useDarkMode(darkModeProp);

  const [tabNode, setTabNode] = useState<HTMLDivElement | null>(null);
  const [panelNode, setPanelNode] = useState<HTMLDivElement | null>(null);

  const accessibilityProps = {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  };

  const childrenArray = useMemo(
    () => React.Children.toArray(children) as Array<React.ReactElement>,
    [children],
  );

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
      setSelected?.(index);
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
          setSelected?.(enabledIndexes[(current + 1) % enabledIndexes.length]);
        } else if (e.keyCode === keyMap.ArrowLeft) {
          const [enabledIndexes, current] = getEnabledIndexes();
          setSelected?.(
            enabledIndexes[
              (current - 1 + enabledIndexes.length) % enabledIndexes.length
            ],
          );
        }
      }
    },
    [getEnabledIndexes, setSelected],
  );

  const renderedTabs = React.Children.map(children, (child, index) => {
    if (!isComponentType(child, 'Tab')) {
      return child;
    }

    const isTabSelected = index === selected;
    const { disabled, onClick, onKeyDown, className, ...rest } = child.props;

    const tabProps = {
      as,
      disabled,
      darkMode,
      parentRef: tabNode,
      className,
      onKeyDown: (event: KeyboardEvent) => {
        onKeyDown?.(event);
        handleArrowKeyPress(event);
      },
      onClick: !disabled
        ? (event: React.MouseEvent) => {
            onClick?.(event);
            handleChange(event, index);
          }
        : undefined,
      ...rest,
    };

    return (
      // Since the <Tab /> children contain both the tab title and content,
      // and since we want these elements to be in different places in the DOM
      // we use a Portal in InternalTab to place the conten in the correct spot
      <InternalTab
        child={child}
        selected={isTabSelected}
        tabRef={tabNode}
        panelRef={panelNode}
        {...tabProps}
      />
    );
  });

  return (
    <div {...rest} className={className}>
      {/* render the portaled contents */}
      {renderedTabs}

      <div className={tabContainerStyle}>
        {/* renderedTabs portals the tab title into this element */}
        <div
          className={cx(listStyle, modeColors[theme].underlineColor)}
          role="tablist"
          ref={setTabNode}
          aria-orientation="horizontal"
          {...accessibilityProps}
        />
        <div className={inlineChildrenWrapperStyle}>{inlineChildren}</div>
      </div>

      {/* renderedTabs portals the contents into this element */}
      <div ref={setPanelNode} />
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
