import * as CodeMirrorCommandsModule from '@codemirror/commands';
import * as CodeMirrorSearchModule from '@codemirror/search';
import * as CodeMirrorStateModule from '@codemirror/state';
import * as CodeMirrorViewModule from '@codemirror/view';
import { waitFor } from '@testing-library/react';
import * as CodeMirrorModule from 'codemirror';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useModules } from './useModules';

describe('useModules', () => {
  test('sets isLoading to true when no preLoadedModules are provided', () => {
    const props = {};
    const { result } = renderHook(() => useModules(props));
    expect(result.current.isLoading).toBe(true);
  });

  test('sets isLoading to false when preLoadedModules are provided', () => {
    const props = {
      preLoadedModules: {
        codemirror: CodeMirrorModule,
        '@codemirror/view': CodeMirrorViewModule,
        '@codemirror/state': CodeMirrorStateModule,
        '@codemirror/commands': CodeMirrorCommandsModule,
        '@codemirror/search': CodeMirrorSearchModule,
      },
    };
    const { result } = renderHook(() => useModules(props));
    expect(result.current.isLoading).toBe(false);
  });

  test('returns the correct modules when preLoadedModules are provided', () => {
    const props = {
      preLoadedModules: {
        codemirror: CodeMirrorModule,
        '@codemirror/view': CodeMirrorViewModule,
      },
    };
    const { result } = renderHook(() => useModules(props));
    expect(result.current.modules).toEqual(props.preLoadedModules);
  });

  test('returns the correct modules when preLoadedModules are not provided', async () => {
    const { result } = renderHook(() => useModules({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const requiredModules = [
      'codemirror',
      '@codemirror/view',
      '@codemirror/state',
      '@codemirror/commands',
      '@codemirror/search',
    ];

    expect(Object.keys(result.current.modules).sort()).toEqual(
      requiredModules.sort(),
    );
  });
});
