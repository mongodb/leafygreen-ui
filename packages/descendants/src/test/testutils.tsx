import React, {
  ComponentProps,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  createDescendantsContext,
  DescendantProvider,
  useDescendant,
  useInitDescendants,
} from '..';

// 1. Create a new Context object
const TestDescendantContext = createDescendantsContext<HTMLLIElement>(
  'TestDescendantContext',
);

export const TestParent = ({ children, ...rest }: ComponentProps<'ul'>) => {
  // 2. Initialize an empty descendants data structure
  const [descendants, setDescendants] = useInitDescendants<HTMLLIElement>();

  // 3. Pass the context & descendants data structure into the provider
  return (
    <DescendantProvider
      context={TestDescendantContext}
      descendants={descendants}
      setDescendants={setDescendants}
    >
      <ul {...rest}>{children}</ul>
    </DescendantProvider>
  );
};

export const TestDescendant = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ children, ...rest }: ComponentProps<'li'>, fwdRef) => {
    const ref = React.useRef<HTMLLIElement>(null);

    const [element, setElement] = useState<HTMLLIElement>();
    const handleRefSet = useCallback((refValue: HTMLLIElement) => {
      // @ts-expect-error
      ref.current = refValue;
      setElement(refValue);
    }, []);

    const descendant = useMemo(
      () => ({
        element,
      }),
      [element],
    );

    // 4. Establish this component as a descendant element
    const { index } = useDescendant(descendant, TestDescendantContext);

    return (
      <li ref={handleRefSet} data-index={index} {...rest}>
        {children}
      </li>
    );
  },
);

TestDescendant.displayName = 'TestDescendant';
