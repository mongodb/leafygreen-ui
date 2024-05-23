import React, { useMemo } from 'react';

import { useTabDescendantsContext, useTabPanelDescendant } from '../context';

import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ child, selectedIndex }: TabPanelProps) => {
  const { id, index, ref } = useTabPanelDescendant();
  const { tabDescendants } = useTabDescendantsContext();

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
