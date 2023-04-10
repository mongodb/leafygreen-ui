import { cleanup, renderHook } from '@testing-library/react-hooks';

import { useToast } from '.';

/**
 * Tests the external `useToast` hook
 */
describe('packages/toast/useToast', () => {
  afterEach(cleanup);

  test('returns the expected stack & functions', () => {
    const { result } = renderHook(useToast);
    const { pushToast, popToast, updateToast, getToast, getStack, clearStack } =
      result.current;

    expect(pushToast).toBeDefined();
    expect(popToast).toBeDefined();
    expect(updateToast).toBeDefined();
    expect(getToast).toBeDefined();
    expect(getStack).toBeDefined();
    expect(clearStack).toBeDefined();
  });

  /**
   * We're not testing individual functions because:
   * 1. We're already testing their functionality in `useToastReducer.spec`
   * 2. Jest has issues using `createPortal` within `renderHook`
   *  - Optional TODO: Get `renderHook(userToast, {wrapper})` working properly,
   *  and test the hook methods
   */
});
