import React, { PropsWithChildren } from 'react';

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
  const { index, ref } = useDescendant(DescendantContext, {});

  return (
    // @ts-expect-error - Ref type
    <div ref={ref} role="menuitem" data-index={index} data-testid="paco-item">
      {index}: {children}
    </div>
  );
};
