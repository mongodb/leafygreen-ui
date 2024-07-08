import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { DescendantsProvider, useInitDescendants } from '..';

import { TestDescendantContext } from './components.testutils';

export const renderDescendantsTestContext = (descendants: ReactNode) => {
  const hook = renderHook(() => useInitDescendants<HTMLDivElement>());

  const renderResult = render(
    <DescendantsProvider
      context={TestDescendantContext}
      descendants={hook.result.current.descendants}
      dispatch={hook.result.current.dispatch}
    >
      {descendants}
    </DescendantsProvider>,
  );

  const rerender = (descendants: ReactNode) => {
    renderResult.rerender(
      <DescendantsProvider
        context={TestDescendantContext}
        descendants={hook.result.current.descendants}
        dispatch={hook.result.current.dispatch}
      >
        {descendants}
      </DescendantsProvider>,
    );
  };

  return {
    hook,
    renderResult,
    rerender,
  };
};
