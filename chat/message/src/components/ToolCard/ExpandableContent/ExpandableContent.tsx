import React, { forwardRef } from 'react';
import { LGMarkdown } from '@lg-chat/lg-markdown';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { ToolCardSubcomponentProperty } from '../shared.types';

import {
  getContentWrapperStyles,
  innerContentWrapperStyles,
} from './ExpandableContent.styles';
import { type ExpandableContentProps } from './ExpandableContent.types';

// TODO: Read from ToolCardContext when available
// For now, using hardcoded false value
const IS_EXPANDED = false;

export const ExpandableContent = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ExpandableContentProps>(
    ({ children, className, ...rest }, fwdRef) => {
      return (
        <div
          className={getContentWrapperStyles({
            className,
            isExpanded: IS_EXPANDED,
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
