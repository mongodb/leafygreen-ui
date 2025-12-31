import React, {
  Children,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

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
import { Header } from './Header';
import { State, ToolCardSubcomponentProperty } from './shared.types';
import {
  getContainerStyles,
  getContentContainerStyles,
} from './ToolCard.styles';
import { ToolCardProps } from './ToolCard.types';
import { ToolCardProvider } from './ToolCardContext';

export const ToolCard = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ToolCardProps>(
    (
      {
        children,
        chips,
        className,
        darkMode: darkModeProp,
        initialIsExpanded = false,
        onToggleExpanded,
        showExpandButton = true,
        state = State.Idle,
        title,
        ...rest
      },
      fwdRef,
    ) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);

      const [isExpanded, setIsExpanded] = useState(
        showExpandButton ? initialIsExpanded : false,
      );

      const toggleExpand = useCallback(() => {
        const newIsExpanded = !isExpanded;
        setIsExpanded(newIsExpanded);
        onToggleExpanded?.(newIsExpanded);
      }, [isExpanded, onToggleExpanded, setIsExpanded]);

      const contextValue = useMemo(
        () => ({
          isExpanded,
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

      const isErrorState = state === State.Error;
      const shouldRenderActions = !!actions && state === State.Idle;
      const shouldRenderBorderTop =
        Children.count(remainingChildren) > 0 ||
        (!!expandableContent && isExpanded) ||
        shouldRenderActions;

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <ToolCardProvider value={contextValue}>
            <div
              className={getContainerStyles({ className, isErrorState, theme })}
              ref={fwdRef}
              {...rest}
            >
              <Header
                chips={chips}
                showExpandButton={showExpandButton}
                state={state}
                title={title}
              />
              <div
                className={getContentContainerStyles({
                  isErrorState,
                  shouldRenderBorderTop,
                  theme,
                })}
              >
                {remainingChildren}
                {expandableContent}
                {shouldRenderActions && actions}
              </div>
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
