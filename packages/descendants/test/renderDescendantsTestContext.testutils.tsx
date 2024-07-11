import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useInitDescendants } from '..';

import { TestDescendantContext } from './components.testutils';

export const renderDescendantsTestContext = (children: ReactNode) => {
  const hook = renderHook(() => useInitDescendants(TestDescendantContext));

  const renderResult = render(
    <hook.result.current.Provider>{children}</hook.result.current.Provider>,
  );

  const rerender = (children: ReactNode) => {
    renderResult.rerender(
      <hook.result.current.Provider>{children}</hook.result.current.Provider>,
    );
  };

  return {
    hook,
    renderResult,
    rerender,
  };
};
