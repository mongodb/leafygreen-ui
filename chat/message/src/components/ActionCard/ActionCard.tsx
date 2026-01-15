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
  findChildren,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { MessageSubcomponentProperty } from '../../shared.types';

import {
  actionsContainerStyles,
  getContainerStyles,
  getContentContainerStyles,
} from './ActionCard.styles';
import { ActionCardProps } from './ActionCard.types';
import { ActionCardProvider } from './ActionCardContext';
import { Button } from './Button';
import { ExpandableContent } from './ExpandableContent';
import { Header } from './Header';
import { ActionCardSubcomponentProperty, State } from './shared.types';

export const ActionCard = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ActionCardProps>(
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
        Object.values(ActionCardSubcomponentProperty),
      );
      const expandableContent = findChild(
        children,
        ActionCardSubcomponentProperty.ExpandableContent,
      );
      const buttons = findChildren(
        children,
        ActionCardSubcomponentProperty.Button,
      );

      const hasButtons = React.Children.count(buttons) > 0;
      const isErrorState = state === State.Error;
      const shouldRenderActions = hasButtons && state === State.Idle;
      const shouldRenderBorderTop =
        Children.count(remainingChildren) > 0 ||
        (!!expandableContent && isExpanded) ||
        shouldRenderActions;

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <ActionCardProvider value={contextValue}>
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
                {shouldRenderActions && (
                  <div className={actionsContainerStyles}>{buttons}</div>
                )}
              </div>
            </div>
          </ActionCardProvider>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'Message.ActionCard',
    key: MessageSubcomponentProperty.ActionCard,
    Button,
    ExpandableContent,
  },
);
