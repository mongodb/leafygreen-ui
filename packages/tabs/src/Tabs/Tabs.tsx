import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { InternalTab } from '../Tab';

import {
  inlineChildrenWrapperStyle,
  listStyle,
  modeColors,
  tabContainerStyle,
} from './Tabs.styles';
import { AccessibleTabsProps } from './Tabs.types';

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
    className,
    as = 'button',
    baseFontSize: baseFontSizeProp,
    setSelected: setControlledSelected,
    selected: controlledSelected,
    darkMode: darkModeProp,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    ...rest
  } = props;
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
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
    <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
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
    </LeafyGreenProvider>
  );
}

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  children: PropTypes.node,
  setSelected: PropTypes.func,
  selected: PropTypes.number,
  className: PropTypes.string,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.elementType,
    PropTypes.element,
  ]),
};

export default Tabs;
