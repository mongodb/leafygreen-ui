import React, { useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';

import {
  TabPanelDescendantsContext,
  useTabDescendantsContext,
  useTabsContext,
} from '../context';

import { hiddenTabPanelStyle } from './TabPanel.styles';
import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ children, disabled }: TabPanelProps) => {
  const { id, index, ref } = useDescendant(TabPanelDescendantsContext);
  const { tabDescendants } = useTabDescendantsContext();
  const { forceRenderAllTabPanels, selectedIndex } = useTabsContext();

  const relatedTab = useMemo(() => {
    return tabDescendants.find(tabDescendant => tabDescendant.index === index);
  }, [tabDescendants, index]);

  const selected = index === selectedIndex;

  const shouldRender = !disabled && (forceRenderAllTabPanels || selected);

  const tabPanelProps = {
    className: cx({
      [hiddenTabPanelStyle]: !selected,
    }),
    id,
    role: 'tabpanel',
    ['aria-labelledby']: relatedTab?.id,
  } as const;

  return (
    <div ref={ref}>
      {shouldRender ? <div {...tabPanelProps}>{children}</div> : null}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
