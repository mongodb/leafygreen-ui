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

const TabPanel = ({ child }: TabPanelProps) => {
  const { id, index, ref } = useDescendant(TabPanelDescendantsContext);
  const { tabDescendants } = useTabDescendantsContext();
  const { selectedIndex } = useTabsContext();

  const relatedTab = useMemo(() => {
    return tabDescendants.find(tabDescendant => tabDescendant.index === index);
  }, [tabDescendants, index]);

  const selected = index === selectedIndex;

  return (
    <div ref={ref}>
      {React.cloneElement(child, {
        id,
        selected: index === selectedIndex,
        className: cx({
          [hiddenTabPanelStyle]: !selected,
        }),
        ['aria-labelledby']: relatedTab?.id,
      })}
    </div>
  );
};

TabPanel.displayName = 'TabPanel';

export default TabPanel;
