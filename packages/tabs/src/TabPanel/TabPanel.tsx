import React, { PropsWithChildren, useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';

import {
  TabPanelDescendantsContext,
  useTabDescendantsContext,
  useTabsContext,
} from '../context';

import { getTabPanelStyles } from './TabPanel.styles';
import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({
  children,
  disabled,
  index: indexProp,
  ...rest
}: PropsWithChildren<TabPanelProps>) => {
  const { id, index, ref } = useDescendant(TabPanelDescendantsContext, null, {
    index: indexProp,
  });
  const { tabDescendants } = useTabDescendantsContext();
  const { forceRenderAllTabPanels, selected } = useTabsContext();

  const relatedTab = useMemo(() => {
    return tabDescendants.find(tabDescendant => tabDescendant.index === index);
  }, [tabDescendants, index]);

  const isSelected = index === selected;

  const shouldRender = !disabled && (forceRenderAllTabPanels || isSelected);

  return (
    <div ref={ref}>
      {shouldRender ? (
        <div
          aria-labelledby={relatedTab?.id}
          className={getTabPanelStyles(isSelected)}
          id={id}
          role="tabpanel"
          {...rest}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
