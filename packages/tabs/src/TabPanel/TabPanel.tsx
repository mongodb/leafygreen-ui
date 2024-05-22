import React, { useMemo } from 'react';

import {
  useDescendant,
  useDescendantsContext,
} from '@leafygreen-ui/descendants';

import {
  TabPanelsDescendantsContext,
  TabsDescendantsContext,
} from '../Tabs/Tabs';

import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ child, selectedIndex }: TabPanelProps) => {
  const { id, index, ref } = useDescendant(TabPanelsDescendantsContext);
  const { descendants: tabDescendants } = useDescendantsContext(
    TabsDescendantsContext,
  );

  const relatedTab = useMemo(() => {
    return tabDescendants.find(tabDescendant => tabDescendant.index === index);
  }, [tabDescendants, index]);

  return (
    <div ref={ref}>
      {React.cloneElement(child, {
        id,
        selected: index === selectedIndex,
        ['aria-labelledby']: relatedTab?.id,
      })}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
