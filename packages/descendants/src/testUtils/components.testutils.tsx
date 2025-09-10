import React, { ComponentProps, forwardRef, useContext, useState } from 'react';

import {
  createDescendantsContext,
  useDescendant,
  useInitDescendants,
} from '..';

import { TestSelectionContext } from './testSelectionContext';

// 1. Create a new Context object
export const TestDescendantContext = createDescendantsContext<HTMLDivElement>(
  'TestDescendantContext',
);

export const TestParent = ({ children, ...rest }: ComponentProps<'div'>) => {
  // 2. Initialize an empty descendants data structure
  const { Provider } = useInitDescendants(TestDescendantContext);
  const [selected, setSelected] = useState<number | undefined>(0);

  // 3. Pass the context & descendants data structure into the provider
  return (
    <Provider>
      <TestSelectionContext.Provider value={{ selected, setSelected }}>
        <div {...rest}>{children}</div>
      </TestSelectionContext.Provider>
    </Provider>
  );
};

interface TestDescendantProps extends ComponentProps<'div'> {
  group?: string;
  isDisabled?: boolean;
}

export const TestDescendant = forwardRef<HTMLDivElement, TestDescendantProps>(
  ({ children, isDisabled, ...props }: TestDescendantProps, fwdRef) => {
    // 4. Establish a child component as a descendant of the established context
    const { index, id, ref } = useDescendant(TestDescendantContext, fwdRef, {
      isDisabled,
      ...props,
    });

    const { selected, setSelected } = useContext(TestSelectionContext);
    const isSelected = index === selected;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        ref={ref}
        data-disabled={isDisabled}
        data-testid="leafygreen-item"
        data-index={index}
        data-id={id}
        data-selected={isSelected}
        onClick={() => setSelected(index)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

TestDescendant.displayName = 'TestDescendant';

// 1. Create a new Context object
const TestDescendantContext2 = createDescendantsContext<HTMLDivElement>(
  'TestDescendantContext',
);

export const TestParent2 = ({ children, ...rest }: ComponentProps<'div'>) => {
  // 2. Initialize an empty descendants data structure
  const { Provider } = useInitDescendants(TestDescendantContext2);

  // 3. Pass the context & descendants data structure into the provider
  return (
    <Provider>
      <div {...rest}>{children}</div>
    </Provider>
  );
};

export const TestDescendant2 = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'>
>(({ children, ...rest }: ComponentProps<'div'>, fwdRef) => {
  // 4. Establish a child component as a descendant of the established context
  const { index, id, ref } = useDescendant(TestDescendantContext2, fwdRef);

  return (
    <div ref={ref} data-index={index} data-id={id} {...rest}>
      {children}
    </div>
  );
});

TestDescendant2.displayName = 'TestDescendant';
