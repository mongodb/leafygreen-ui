import { cleanup, renderHook } from '@testing-library/react-hooks';

import { useToast } from '.';

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
});
