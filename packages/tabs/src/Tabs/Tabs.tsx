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

import {
  TabDescendantsContext,
  TabPanelDescendantsContext,
  TabsContext,
} from '../context';
import TabPanel from '../TabPanel';
import TabTitle from '../TabTitle';
import { getEnabledIndices, getLgIds, getSelectedIndex } from '../utils';

import {
  getTabContainerStyles,
  inlineChildrenContainerStyles,
  tabListStyles,
  tabPanelsElementClassName,
} from './Tabs.styles';
import { AccessibleTabsProps } from './Tabs.types';

/**
 * Tabs are used to organize content by grouping similar or related information on a single UI, allowing content to be viewed without having the user navigate externally.
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
    value: valueProp,
    onValueChange,
    size = 'default',
    'data-lgid': dataLgId,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    ...rest
  } = props;

  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const id = useIdAllocator({ prefix: rest.id || 'tabs' });

  const lgIds = getLgIds(dataLgId);

  const { descendants: tabDescendants, Provider: TabDescendantsProvider } =
    useInitDescendants(TabDescendantsContext);
  const { Provider: TabPanelDescendantProvider } = useInitDescendants(
    TabPanelDescendantsContext,
  );

  const maybeUncontrolledDefaultIndex = tabDescendants.findIndex(
    tab => tab.props.default,
  );
  const uncontrolledDefaultIndex =
    maybeUncontrolledDefaultIndex > -1 ? maybeUncontrolledDefaultIndex : 0;
  const isControlled = typeof valueProp !== 'undefined';
  const [uncontrolledValue, setUncontrolledValue] = useState<SelectedType>(
    uncontrolledDefaultIndex as SelectedType,
  );
  const value = isControlled ? valueProp : uncontrolledValue;

  const tabTitleElements = tabDescendants.map(descendant => descendant.element);
  const tabTitles = tabTitleElements.map(element => element.dataset.text);
  const tabTitlesWithoutDups = new Set(tabTitles);
  const hasTabTitleDups = tabTitles.length !== tabTitlesWithoutDups.size;
  const selectedIndex = getSelectedIndex(value, tabTitleElements);

  if (hasTabTitleDups) {
    console.error('Multiple tabs should not share the same name text.');
  }

  const accessibilityProps = {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  };

  const handleTabChange = useCallback(
    (newValue: SelectedType) => {
      onValueChange?.(newValue);

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
    },
    [isControlled, onValueChange],
  );

  /**
   * If the `Tabs` component is controlled by a `value` of type `string`, we get the tab name
   * text from the `tabTitleElements` array and update the state with this text.
   * Otherwise, if the component is controlled by a `value` of type `number` or is uncontrolled,
   * we update the state with the tab `index`.
   */
  const handleTabChangeByIndex = useCallback(
    (index: number) => {
      if (typeof value === 'string') {
        const tabNameText = tabTitleElements[index].dataset.text!;
        handleTabChange(tabNameText as SelectedType);
      } else {
        handleTabChange(index as SelectedType);
      }
    },
    [handleTabChange, tabTitleElements, value],
  );

  const handleClickTab = useCallback(
    (e: React.SyntheticEvent<Element, MouseEvent>, index: number) => {
      // If the Tabs are controlled by a string, we want to return a string
      handleTabChangeByIndex(index);
    },
    [handleTabChangeByIndex],
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

      handleTabChangeByIndex(indexToUpdateTo);
      tabTitleElements[indexToUpdateTo].focus(); // If multiple tabs have the same name this could potentially focus the wrong element. Ideally tabs should not share the same name.
    },
    [tabTitleElements, selectedIndex, handleTabChangeByIndex],
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
              selectedIndex,
              size,
            }}
          >
            <div
              data-testid={lgIds.root}
              data-lgid={lgIds.root}
              {...rest}
              className={className}
            >
              <div className={getTabContainerStyles(theme)} id={id}>
                <div
                  className={tabListStyles}
                  data-lgid={lgIds.tabList}
                  data-testid={lgIds.tabList}
                  role="tablist"
                  aria-orientation="horizontal"
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
                data-lgid={lgIds.tabPanels}
                data-testid={lgIds.tabPanels}
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
