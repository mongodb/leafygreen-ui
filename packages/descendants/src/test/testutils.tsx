import React, { ComponentProps, forwardRef } from 'react';

import {
  createDescendantsContext,
  DescendantsProvider,
  useDescendant,
  useInitDescendants,
} from '..';

// 1. Create a new Context object
const TestDescendantContext = createDescendantsContext<HTMLLIElement>(
  'TestDescendantContext',
);

export const TestParent = ({ children, ...rest }: ComponentProps<'ul'>) => {
  // 2. Initialize an empty descendants data structure
  const { descendants, dispatch } = useInitDescendants<HTMLLIElement>();

  // 3. Pass the context & descendants data structure into the provider
  return (
    <DescendantsProvider
      context={TestDescendantContext}
      descendants={descendants}
      dispatch={dispatch}
    >
      <ul {...rest}>{children}</ul>
    </DescendantsProvider>
  );
};

export const TestDescendant = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ children, ...rest }: ComponentProps<'li'>, fwdRef) => {
    // 4. Establish a child component as a descendant of the established context
    const { index, id, ref } = useDescendant(TestDescendantContext, fwdRef);

    return (
      <li ref={ref} data-index={index} data-id={id} {...rest}>
        {children}
      </li>
    );
  },
);

TestDescendant.displayName = 'TestDescendant';
