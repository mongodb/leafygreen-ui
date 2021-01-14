import React, { useMemo } from 'react';
import Portal from '@leafygreen-ui/portal';
import { IdAllocator } from '@leafygreen-ui/lib';
import TabTitle from './TabTitle';
import { TabsProps } from './Tabs';

const tabIdAllocator = IdAllocator.create('tab');
const tabpanelIdAllocator = IdAllocator.create('tab-panel');

type InternalTabProps = Pick<TabsProps, 'as' | 'darkMode' | 'className'> & {
  child: React.ReactElement;
  onKeyDown: (e: KeyboardEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  isAnyTabFocused?: boolean;
  selected: boolean;
  tabRef: HTMLDivElement | null;
  panelRef: HTMLDivElement | null;
};

const InternalTab = React.memo(
  ({ child, selected, tabRef, panelRef, ...tabProps }: InternalTabProps) => {
    const { id: idProp, name } = child.props;

    const panelId = useMemo(() => tabpanelIdAllocator.generate(), []);
    const tabId = useMemo(() => idProp ?? tabIdAllocator.generate(), [idProp]);

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
