import React, { ReactNode } from 'react';
import { render, RenderHookResult, RenderResult } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { InitDescendantsReturnObject } from '../Descendants/useInitDescendants';
import { useInitDescendants } from '..';

import { TestDescendantContext } from './components.testutils';

export interface RenderDescendantsTestContextResult {
  hook: RenderHookResult<
    InitDescendantsReturnObject<HTMLDivElement>,
    undefined
  >;
  renderResult: RenderResult;
  rerender: (children: ReactNode) => void;
}

export const renderDescendantsTestContext = (
  children: ReactNode,
): RenderDescendantsTestContextResult => {
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
