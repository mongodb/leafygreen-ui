import React, { forwardRef, useCallback, useState } from 'react';

import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getStyles } from './Accordion.styles';
import { AccordionProps } from './Accordion.types';
import { AccordionContext, AccordionDescendantsContext } from './context';

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      index: controlledIndex,
      darkMode: darkModeProp,
      defaultIndex = 0,
      onIndexChange,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    const { descendants, dispatch } = useInitDescendants<HTMLDivElement>(
      AccordionDescendantsContext,
    );

    const isControlled =
      typeof controlledIndex !== 'undefined' &&
      typeof onIndexChange !== 'undefined';
    const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
    const [selectedIndex, setSelectedIndex] = [
      isControlled ? controlledIndex : uncontrolledIndex,
      isControlled ? onIndexChange : setUncontrolledIndex,
    ];

    const id = useIdAllocator({ id: rest.id });

    const onSelectPanel = useCallback(
      (index: number) => {
        setSelectedIndex(index);
      },
      [setSelectedIndex],
    );

    const accordionContextValue = {
      id,
      onSelectPanel,
      selectedIndex,
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DescendantsProvider
          context={AccordionDescendantsContext}
          descendants={descendants}
          dispatch={dispatch}
        >
          <AccordionContext.Provider value={accordionContextValue}>
            <div {...rest} className={getStyles(className)} ref={fwdRef}>
              {children}
            </div>
          </AccordionContext.Provider>
        </DescendantsProvider>
      </LeafyGreenProvider>
    );
  },
);

Accordion.displayName = 'Accordion';
