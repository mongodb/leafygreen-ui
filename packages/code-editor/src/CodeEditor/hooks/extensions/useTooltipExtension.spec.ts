import { renderHook } from '@testing-library/react';

import {
  createMockLintModule,
  createMockStateModule,
} from '../hooks.testUtils';

import { useTooltipExtension } from './useTooltipExtension';

describe('useTooltipExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeLintModule = createMockLintModule();

  test('returns empty when no tooltips provided or module missing', () => {
    const { result } = renderHook(() =>
      useTooltipExtension({
        editorViewInstance: null,
        props: {},
        modules: { '@codemirror/state': fakeStateModule },
      }),
    );
    expect(result.current).toEqual([]);
  });

  test('returns linter extension when tooltips provided', () => {
    const { result } = renderHook(() =>
      useTooltipExtension({
        editorViewInstance: null,
        props: {
          tooltips: [
            {
              line: 1,
              column: 1,
              length: 0,
              messages: ['msg'],
              severity: 'info',
              links: [],
            },
          ],
        },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/lint': fakeLintModule,
        },
      }),
    );
    expect(result.current).toHaveProperty('LINTER_EXT', 'function');
  });
});
