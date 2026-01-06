import React, { forwardRef } from 'react';
import { LGMarkdown } from '@lg-chat/lg-markdown';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { ToolCardSubcomponentProperty } from '../shared.types';
import { useToolCardContext } from '../ToolCardContext';

import {
  getContentWrapperStyles,
  innerContentWrapperStyles,
} from './ExpandableContent.styles';
import { type ExpandableContentProps } from './ExpandableContent.types';

export const ExpandableContent = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ExpandableContentProps>(
    ({ children, className, ...rest }, fwdRef) => {
      const { isExpanded } = useToolCardContext();

      return (
        <div
          className={getContentWrapperStyles({
            className,
            isExpanded,
          })}
          ref={fwdRef}
          {...rest}
        >
          <LGMarkdown className={innerContentWrapperStyles}>
            {children}
          </LGMarkdown>
        </div>
      );
    },
  ),
  {
    displayName: 'Message.ToolCard.ExpandableContent',
    key: ToolCardSubcomponentProperty.ExpandableContent,
  },
);
