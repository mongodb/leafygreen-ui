import React, { PropsWithChildren } from 'react';

import { css } from '@leafygreen-ui/emotion';

import {
  createDescendants,
  useDescendant,
  useDescendants,
} from './useDescendants';

const DescendantContext = createDescendants();

export const PacoMenu = ({ children }: PropsWithChildren<{}>) => {
  // Create Descendants props here
  const { ref, ...ctxProps } = useDescendants();

  return (
    <DescendantContext.Provider value={{ ...ctxProps }}>
      {/* @ts-ignore */}
      <div role="menu" ref={ref} data-testid="paco-menu">
        {children}
      </div>
    </DescendantContext.Provider>
  );
};

export const PacoMenuItem = ({ children }: PropsWithChildren<{}>) => {
  const { index, ref, id } = useDescendant(DescendantContext, {});

  return (
    <div
      // @ts-expect-error - Ref type
      ref={ref}
      role="menuitem"
      data-index={index}
      data-id={id}
      data-testid="paco-item"
      className={css`
        &:before {
          content: attr(data-index);
          padding-right: 4px;
        }

        &:after {
          content: attr(data-id);
          padding-left: 4px;
          color: gray;
          font-family: monospace;
        }
      `}
    >
      {children}
    </div>
  );
};
