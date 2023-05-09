import React, { useMemo } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import Portal from '@leafygreen-ui/portal';

import TabTitle from '../TabTitle';

import { InternalTabProps } from './Tab.types';

const InternalTab = React.memo(
  ({ child, selected, tabRef, panelRef, ...tabProps }: InternalTabProps) => {
    const { id: idProp, name } = child.props;

    const panelId = useIdAllocator({ prefix: 'tab-panel' });
    const tabId = useIdAllocator({ prefix: 'tab', id: idProp });

    const tab = (
      <TabTitle
        {...tabProps}
        selected={selected}
        id={tabId}
        aria-controls={panelId}
      >
        {name}
      </TabTitle>
    );

    const panel = useMemo(
      () =>
        React.cloneElement(child, {
          id: panelId,
          selected: selected,
          ['aria-labelledby']: tabId,
        }),
      [child, panelId, selected, tabId],
    );

    return (
      <>
        <Portal container={tabRef}>{tab}</Portal>
        <Portal container={panelRef}>{panel}</Portal>
      </>
    );
  },
);

InternalTab.displayName = 'InternalTab';

export default InternalTab;
