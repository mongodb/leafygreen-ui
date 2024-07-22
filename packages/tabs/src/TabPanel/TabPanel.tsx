import React, { PropsWithChildren, useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';

import {
  TabPanelDescendantsContext,
  useTabDescendantsContext,
  useTabsContext,
} from '../context';

import { hiddenTabPanelStyle } from './TabPanel.styles';
import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ children, disabled }: PropsWithChildren<TabPanelProps>) => {
  const { id, index, ref } = useDescendant(TabPanelDescendantsContext);
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
          className={cx({
            [hiddenTabPanelStyle]: !isSelected,
          })}
          id={id}
          role="tabpanel"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
