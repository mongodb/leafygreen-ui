import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_TABS } from '../constants';
import { TabDescendantsContext, TabPanelDescendantsContext } from '../context';
import TabPanel from '../TabPanel';
import TabTitle from '../TabTitle';
import { getActiveAndEnabledIndices } from '../utils';

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
  const id = useIdAllocator({ prefix: rest.id || 'tabs' });

  const { descendants: tabDescendants, dispatch: tabDispatch } =
    useInitDescendants<HTMLDivElement>();
  const { descendants: tabPanelDescendants, dispatch: tabPanelDispatch } =
    useInitDescendants<HTMLDivElement>();

  const isControlled = typeof controlledSelected !== 'undefined';
  const [uncontrolledSelected, setUncontrolledSelected] = useState(0);
  const [selected, setSelected] = [
    isControlled ? controlledSelected : uncontrolledSelected,
    isControlled ? setControlledSelected : setUncontrolledSelected,
  ];

  const accessibilityProps = {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
  };

  const handleClickTab = useCallback(
    (e: React.SyntheticEvent<Element, MouseEvent>, index: number) => {
      setSelected?.(index);
    },
    [setSelected],
  );

  const tabTitleElements = tabDescendants.map(
    descendant => descendant.element.parentNode as HTMLElement,
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;

      if (e.key !== keyMap.ArrowRight && e.key !== keyMap.ArrowLeft) return;

      const { activeIndex, enabledIndices } = getActiveAndEnabledIndices(
        tabTitleElements,
        selected,
      );
      const numberOfEnabledTabs = enabledIndices.length;
      const indexToUpdateTo =
        enabledIndices[
          (e.key === keyMap.ArrowRight
            ? activeIndex + 1
            : activeIndex - 1 + numberOfEnabledTabs) % numberOfEnabledTabs
        ];
      setSelected?.(indexToUpdateTo);
      tabTitleElements[indexToUpdateTo].focus();
    },
    [selected, setSelected, tabTitleElements],
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
        handleKeyDown(event);
      },
      onClick: !disabled
        ? (event: React.MouseEvent, index: number) => {
            onClick?.(event);
            handleClickTab(event, index);
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
      <DescendantsProvider
        context={TabDescendantsContext}
        descendants={tabDescendants}
        dispatch={tabDispatch}
      >
        <DescendantsProvider
          context={TabPanelDescendantsContext}
          descendants={tabPanelDescendants}
          dispatch={tabPanelDispatch}
        >
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
        </DescendantsProvider>
      </DescendantsProvider>
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
