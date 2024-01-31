import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { TestSelectionContext } from '../test/testSelectionContext';

import {
  createDescendantContext,
  Descendant,
  DescendantProvider,
  useDescendant,
  useDescendantsInit,
} from './reach-descendants';

const DescendantContext = createDescendantContext('DescendantContext');

export function ReachMenu({ children }: PropsWithChildren<{ id?: any }>) {
  // We could be less explicit here and set this up in the DescendantProvider,
  // but you may want to do something with `descendants` in your top-level
  // component and we don't want to force creating an arbitrary child
  // component just so we can consume the context.
  const [descendants, setDescendants] = useDescendantsInit();
  const [selected, setSelected] = useState<number | undefined>(0);

  return (
    <DescendantProvider
      context={DescendantContext}
      items={descendants}
      set={setDescendants}
    >
      <TestSelectionContext.Provider value={{ selected, setSelected }}>
        {children}
      </TestSelectionContext.Provider>
    </DescendantProvider>
  );
}

export function ReachMenuItem({
  index: explicitIndex,
  children,
  ...props
}: PropsWithChildren<{ index?: number; label?: string }>) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [element, setElement] = useState<HTMLDivElement>();
  const handleRefSet = useCallback((refValue: HTMLDivElement) => {
    // @ts-expect-error
    ref.current = refValue;
    setElement(refValue);
  }, []);

  const descendant = React.useMemo<Omit<Descendant, 'index'>>(() => {
    const descendant = {
      element,
      key: props.label,
    } as Omit<Descendant, 'index'>;

    return descendant;
  }, [element, props.label]);

  const index = useDescendant(descendant, DescendantContext);

  const { selected, setSelected } = useContext(TestSelectionContext);
  const isSelected = index === selected;

  // Now we know the index, so let's use it!

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      data-testid="reach-item"
      data-selected={isSelected}
      onClick={() => setSelected(index)}
      role="menuitem"
      // Don't forget to pass the callback ref to the rendered element!
      ref={handleRefSet}
      tabIndex={-1}
      {...props}
    >
      {index}: {children}
    </div>
  );
}
