import React from 'react';

import { isReact17, renderHook } from '@leafygreen-ui/testing-lib';

import {
  MessageFeedProvider,
  useMessageFeedContext,
} from './MessageFeedContext';
import { MessageFeedProviderProps } from './MessageFeedContext.types';

const renderMessageFeedProvider = (
  props?: Partial<MessageFeedProviderProps>,
) => {
  const defaultProps: MessageFeedProviderProps = {
    shouldHideInitialMessage: false,
  };

  const { result } = renderHook(() => useMessageFeedContext(), {
    wrapper: ({ children }: { children?: React.ReactNode }) => (
      <MessageFeedProvider {...defaultProps} {...props}>
        {children}
      </MessageFeedProvider>
    ),
  });

  return { result };
};
describe('useMessageFeedContext', () => {
  test('should return the correct context', () => {
    const { result } = renderMessageFeedProvider();
    expect(result.current.shouldHideInitialMessage).toBe(false);
  });

  test('should return the correct context when props are provided', () => {
    const { result } = renderMessageFeedProvider({
      shouldHideInitialMessage: true,
    });
    expect(result.current.shouldHideInitialMessage).toBe(true);
  });

  test('should throw an error when used outside the provider', () => {
    /**
     * The version of `renderHook` imported from "@testing-library/react-hooks" (used in React 17)
     * has an error boundary, and doesn't throw errors as expected:
     * https://github.com/testing-library/react-hooks-testing-library/blob/main/src/index.ts#L5
     */
    if (isReact17()) {
      const { result } = renderHook(() => useMessageFeedContext());
      expect(result.error.message).toEqual(
        'useMessageFeedContext must be used within a MessageFeedProvider',
      );
    } else {
      expect(() => {
        renderHook(() => useMessageFeedContext());
      }).toThrow(
        'useMessageFeedContext must be used within a MessageFeedProvider',
      );
    }
  });
});
