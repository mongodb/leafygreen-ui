import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_TABS } from '../constants';
import {
  TabDescendantsProvider,
  TabPanelDescendantsProvider,
} from '../context';
import TabPanel from '../TabPanel';
import TabTitle from '../TabTitle';

import {
  getListThemeStyles,
  inlineChildrenContainerStyle,
  inlineChildrenWrapperStyle,
  tabContainerStyle,
  tabListElementClassName,
  tabPanelsElementClassName,
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
 * @param props.as HTML Element that wraps name in Tab List.
 * @param props.children Content to appear inside of Tabs component.
 * @param props.className className applied to Tabs container.
 * @param props.selected Index of the Tab that should appear active. If value passed, component will be controlled by consumer.
 * @param props.setSelected Callback to be executed when Tab is selected. Receives index of activated Tab as the first argument.
 */
const Tabs = (props: AccessibleTabsProps) => {
  validateAriaLabelProps(props, 'Tabs');

  const {
    as = 'button',
    baseFontSize: baseFontSizeProp,
    children,
    className,
    darkMode: darkModeProp,
    inlineChildren,
    selected: controlledSelected,
    setSelected: setControlledSelected,
    'data-lgid': dataLgId = LGIDS_TABS.root,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const accessibilityProps = {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  };

  const id = useIdAllocator({ prefix: rest.id || 'tabs' });

  const [uncontrolledSelected, setUncontrolledSelected] = useState(0);
  const [selected, setSelected] = [
    controlledSelected ? controlledSelected : uncontrolledSelected,
    controlledSelected ? setControlledSelected : setUncontrolledSelected,
  ];

  const childrenArray = useMemo(
    () => React.Children.toArray(children) as Array<React.ReactElement>,
    [children],
  );

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
        if (e.key === keyMap.ArrowRight) {
          const [enabledIndexes, current] = getEnabledIndexes();
          setSelected?.(enabledIndexes[(current + 1) % enabledIndexes.length]);
        } else if (e.key === keyMap.ArrowLeft) {
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

  const renderedTabs = React.Children.map(children, child => {
    if (!isComponentType(child, 'Tab')) {
      return child;
    }

    const { disabled, onClick, onKeyDown, name, ...rest } = child.props;

    const tabProps = {
      as,
      disabled,
      darkMode,
      name,
      onKeyDown: (event: KeyboardEvent) => {
        onKeyDown?.(event);
        handleArrowKeyPress(event);
      },
      onClick: !disabled
        ? (event: React.MouseEvent, index: number) => {
            onClick?.(event);
            handleChange(event, index);
          }
        : undefined,
      selectedIndex: selected,
      ...rest,
    } as const;

    return <TabTitle {...tabProps}>{name}</TabTitle>;
  });

  const renderedTabPanels = React.Children.map(children, child => {
    if (!isComponentType(child, 'Tab')) {
      return child;
    }

    return <TabPanel child={child} selectedIndex={selected} />;
  });

  return (
    <LeafyGreenProvider baseFontSize={baseFontSize === 16 ? 16 : 14}>
      <TabDescendantsProvider>
        <TabPanelDescendantsProvider>
          <div {...rest} className={className} data-lgid={dataLgId}>
            <div className={tabContainerStyle} id={id}>
              <div
                className={cx(
                  getListThemeStyles(theme),
                  tabListElementClassName,
                )}
                data-lgid={LGIDS_TABS.tabList}
                role="tablist"
                aria-orientation="horizontal"
                {...accessibilityProps}
              >
                {renderedTabs}
              </div>
              <div className={inlineChildrenContainerStyle}>
                <div className={inlineChildrenWrapperStyle}>
                  {inlineChildren}
                </div>
              </div>
            </div>
            <div
              className={tabPanelsElementClassName}
              data-lgid={LGIDS_TABS.tabPanels}
            >
              {renderedTabPanels}
            </div>
          </div>
        </TabPanelDescendantsProvider>
      </TabDescendantsProvider>
    </LeafyGreenProvider>
  );
};

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
