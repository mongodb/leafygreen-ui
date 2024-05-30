import React, { useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';

import {
  TabPanelDescendantsContext,
  useTabDescendantsContext,
} from '../context';

import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ child, selectedIndex }: TabPanelProps) => {
  const { id, index, ref } = useDescendant(TabPanelDescendantsContext);
  const { tabDescendants } = useTabDescendantsContext();

  const relatedTab = useMemo(() => {
    return tabDescendants.find(tabDescendant => tabDescendant.index === index);
  }, [tabDescendants, index]);

  return (
    <div ref={ref}>
      {React.cloneElement(child, {
        id,
        selected: !child.props.disabled && index === selectedIndex,
        ['aria-labelledby']: relatedTab?.id,
      })}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
