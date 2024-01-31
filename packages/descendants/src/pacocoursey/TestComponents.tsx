import React, { PropsWithChildren, useContext, useState } from 'react';

import { TestSelectionContext } from '../test/testSelectionContext';

import {
  createDescendants,
  useDescendant,
  useDescendants,
} from './useDescendants';

const DescendantContext = createDescendants();

export const PacoMenu = ({ children }: PropsWithChildren<{}>) => {
  // Create Descendants props here
  const { ref, ...ctxProps } = useDescendants();
  const [selected, setSelected] = useState<number | undefined>(0);

  return (
    <DescendantContext.Provider value={{ ...ctxProps }}>
      <TestSelectionContext.Provider value={{ selected, setSelected }}>
        {/* @ts-ignore */}
        <div role="menu" ref={ref} data-testid="paco-menu">
          {children}
        </div>
      </TestSelectionContext.Provider>
    </DescendantContext.Provider>
  );
};

export const PacoMenuItem = ({ children }: PropsWithChildren<{}>) => {
  const { index, ref, id } = useDescendant(DescendantContext, {});
  const { selected, setSelected } = useContext(TestSelectionContext);
  const isSelected = index === selected;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      // @ts-expect-error - Ref type
      ref={ref}
      role="menuitem"
      data-index={index}
      data-id={id}
      data-testid="paco-item"
      data-selected={isSelected}
      onClick={() => setSelected(index)}
    >
      {children}
    </div>
  );
};
