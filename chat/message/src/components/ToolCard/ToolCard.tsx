import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import {
  CompoundSubComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { MessageSubcomponentProperty } from '../../shared.types';

import { Actions } from './Actions';
import { ExpandableContent } from './ExpandableContent';
import { State, ToolCardSubcomponentProperty } from './shared.types';
import { getContainerStyles } from './ToolCard.styles';
import { ToolCardProps } from './ToolCard.types';
import { ToolCardProvider } from './ToolCardContext';

export const ToolCard = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ToolCardProps>(
    ({ children, className, darkMode: darkModeProp, ...rest }, fwdRef) => {
      const { darkMode } = useDarkMode(darkModeProp);

      const [isExpanded, setIsExpanded] = useState(true);

      const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
      }, [setIsExpanded]);

      const contextValue = useMemo(
        () => ({
          isExpanded,
          showExpandButton: true,
          state: State.Idle,
          toggleExpand,
        }),
        [isExpanded, toggleExpand],
      );

      const remainingChildren = filterChildren(
        children,
        Object.values(ToolCardSubcomponentProperty),
      );
      const expandableContent = findChild(
        children,
        ToolCardSubcomponentProperty.ExpandableContent,
      );
      const actions = findChild(children, ToolCardSubcomponentProperty.Actions);

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <ToolCardProvider value={contextValue}>
            <div
              ref={fwdRef}
              className={getContainerStyles(className)}
              {...rest}
            >
              {remainingChildren}
              {expandableContent}
              {actions}
            </div>
          </ToolCardProvider>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'Message.ToolCard',
    key: MessageSubcomponentProperty.ToolCard,
    Actions,
    ExpandableContent,
  },
);
