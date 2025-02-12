import React, { useCallback, useState } from 'react';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { useInitDescendants } from '@leafygreen-ui/descendants';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_TABS } from '../constants';
import {
  TabDescendantsContext,
  TabPanelDescendantsContext,
  TabsContext,
} from '../context';
import TabPanel from '../TabPanel';
import TabTitle from '../TabTitle';
import { getEnabledIndices, getSelectedIndex } from '../utils';

import {
  getTabContainerStyles,
  inlineChildrenContainerStyles,
  tabListStyles,
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
 * @param props.selected Index or name of the Tab that should appear active. If value passed, component will be controlled by consumer.
 * @param props.setSelected Callback to be executed when Tab is selected. Receives index or name of activated Tab as the first argument.
 */
const Tabs = <SelectedType extends number | string>(
  props: AccessibleTabsProps<SelectedType>,
) => {
  validateAriaLabelProps(props, 'Tabs');

  const {
    as = 'button',
    baseFontSize: baseFontSizeProp,
    children,
    className,
    darkMode: darkModeProp,
    forceRenderAllTabPanels = false,
    inlineChildren,
    selected: controlledSelected,
    setSelected: setControlledSelected,
    size = 'default',
    tabListContainerRef,
    tabPanelsContainerRef,
    'data-lgid': dataLgId = LGIDS_TABS.root,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const id = useIdAllocator({ prefix: rest.id || 'tabs' });

  const { descendants: tabDescendants, Provider: TabDescendantsProvider } =
    useInitDescendants(TabDescendantsContext);
  const { Provider: TabPanelDescendantProvider } = useInitDescendants(
    TabPanelDescendantsContext,
  );

  const isControlled = typeof controlledSelected !== 'undefined';
  const [uncontrolledSelected, setUncontrolledSelected] = useState(0);
  const [selected, setSelected] = [
    isControlled ? controlledSelected : uncontrolledSelected,
    isControlled ? setControlledSelected : setUncontrolledSelected,
  ];

  const typeofSelected = typeof selected;
  const tabTitleElements = tabDescendants.map(descendant => descendant.element);
  const tabTitles = tabTitleElements.map(element => element.dataset.text);
  const tabTitlesWithoutDups = new Set(tabTitles);
  const hasTabTitleDups = tabTitles.length !== tabTitlesWithoutDups.size;
  const selectedIndex = getSelectedIndex(selected, tabTitleElements);

  if (hasTabTitleDups) {
    console.error('Multiple tabs should not share the same name text.');
  }

  const accessibilityProps = {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  };

  /** If the controlled state is a string then return a string, else return a number */
  const setSelectedByIndex = useCallback(
    (index: number) => {
      if (typeofSelected === 'string') {
        const text = tabTitleElements[index].dataset.text!;
        (setSelected as React.Dispatch<string>)?.(text);
      } else {
        (setSelected as React.Dispatch<number>)?.(index);
      }
    },
    [setSelected, tabTitleElements, typeofSelected],
  );

  const handleClickTab = useCallback(
    (e: React.SyntheticEvent<Element, MouseEvent>, index: number) => {
      setSelectedByIndex(index);
    },
    [setSelectedByIndex],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;

      if (e.key !== keyMap.ArrowRight && e.key !== keyMap.ArrowLeft) return;

      const enabledIndices = getEnabledIndices(tabTitleElements);
      const numberOfEnabledTabs = enabledIndices.length;
      const activeIndex = enabledIndices.indexOf(selectedIndex);
      const indexToUpdateTo =
        enabledIndices[
          (e.key === keyMap.ArrowRight
            ? activeIndex + 1
            : activeIndex - 1 + numberOfEnabledTabs) % numberOfEnabledTabs
        ];

      setSelectedByIndex(indexToUpdateTo);
      tabTitleElements[indexToUpdateTo].focus(); // If multiple tabs have the same name this could potentially focus the wrong element. Ideally tabs should not share the same name.
    },
    [tabTitleElements, selectedIndex, setSelectedByIndex],
  );

  const renderedTabs = React.Children.map(children, child => {
    if (!isComponentType(child, 'Tab')) {
      return child;
    }

    const { disabled, index, onClick, onKeyDown, name, ...rest } = child.props;

    const tabProps = {
      disabled,
      index,
      name,
      onKeyDown: (event: KeyboardEvent) => {
        onKeyDown?.(event);
        handleKeyDown(event);
      },
      onClick: !disabled
        ? (event: React.MouseEvent, index: number) => {
            onClick?.(event);
            handleClickTab(event, index);
          }
        : undefined,
      ...rest,
    } as const;

    return <TabTitle {...tabProps}>{name}</TabTitle>;
  });

  const renderedTabPanels = React.Children.map(children, child => {
    if (!isComponentType(child, 'Tab')) {
      return child;
    }

    const {
      children,
      disabled,
      'data-testid': dataTestId,
      index,
    } = child.props;

    return (
      <TabPanel
        data-testid={dataTestId ? `${dataTestId}-panel` : ''}
        disabled={disabled}
        index={index}
      >
        {children}
      </TabPanel>
    );
  });

  return (
    <LeafyGreenProvider
      baseFontSize={baseFontSize === 16 && size === 'default' ? 16 : 14}
    >
      <TabDescendantsProvider>
        <TabPanelDescendantProvider>
          <TabsContext.Provider
            value={{
              as,
              darkMode,
              forceRenderAllTabPanels,
              selected: selectedIndex,
              size,
            }}
          >
            <div {...rest} className={className} data-lgid={dataLgId}>
              <div className={getTabContainerStyles(theme)} id={id}>
                <div
                  aria-orientation="horizontal"
                  className={tabListStyles}
                  data-lgid={LGIDS_TABS.tabList}
                  ref={tabListContainerRef}
                  role="tablist"
                  {...accessibilityProps}
                >
                  {renderedTabs}
                </div>
                {inlineChildren && (
                  <div className={inlineChildrenContainerStyles}>
                    {inlineChildren}
                  </div>
                )}
              </div>
              <div
                className={tabPanelsElementClassName}
                data-lgid={LGIDS_TABS.tabPanels}
                ref={tabPanelsContainerRef}
              >
                {renderedTabPanels}
              </div>
            </div>
          </TabsContext.Provider>
        </TabPanelDescendantProvider>
      </TabDescendantsProvider>
    </LeafyGreenProvider>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
