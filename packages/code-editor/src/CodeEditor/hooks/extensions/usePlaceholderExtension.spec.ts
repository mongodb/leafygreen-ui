import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  createMockStateModule,
  createMockViewModule,
} from '../hooks.testUtils';

import { usePlaceholderExtension } from './usePlaceholderExtension';

describe('usePlaceholderExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeViewModule = createMockViewModule();

  test('returns empty when no placeholder', () => {
    const { result } = renderHook(() =>
      usePlaceholderExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns placeholder extension when provided', () => {
    const { result } = renderHook(() =>
      usePlaceholderExtension({
        editorViewInstance: null,
        props: { placeholder: 'Type here' },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeViewModule,
        },
      }),
    );
    expect(result.current).toBe('PLACEHOLDER_Type here');
  });
});
