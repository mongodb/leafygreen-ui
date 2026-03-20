import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  createMockLintModule,
  createMockStateModule,
} from '../hooks.testUtils';

import { useTooltipExtension } from './useTooltipExtension';

/** Mock CodeMirror document with specified line count */
const createMockDoc = (lineCount: number) => {
  const lines = Array.from({ length: lineCount }, (_, i) => `line ${i + 1}`);
  const content = lines.join('\n');

  const lineInfos = lines.map((lineContent, index) => {
    const previousLength = lines
      .slice(0, index)
      .reduce((sum, l) => sum + l.length + 1, 0);

    return {
      from: previousLength,
      to: previousLength + lineContent.length,
      text: lineContent,
    };
  });

  return {
    lines: lineCount,
    length: content.length,
    line: (n: number) => {
      if (n < 1 || n > lineCount) {
        throw new RangeError(
          `Invalid line number ${n} in ${lineCount}-line document`,
        );
      }

      return lineInfos[n - 1];
    },
  };
};

/** Mock @codemirror/lint module that captures the linter callback */
const createTestingLintModule = () => {
  let capturedLinterFn: ((view: any) => any) | null = null;

  return {
    module: {
      linter: (fn: (view: any) => any) => {
        capturedLinterFn = fn;

        return { LINTER_EXT: 'function' };
      },
    } as unknown as typeof import('@codemirror/lint'),
    invokeLinter: (lineCount: number) => {
      if (!capturedLinterFn) {
        throw new Error('Linter function was not captured');
      }

      const mockView = {
        state: {
          doc: createMockDoc(lineCount),
        },
      };

      return capturedLinterFn(mockView);
    },
  };
};

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

  describe('bounds checking', () => {
    test('filters out tooltips referencing lines that do not exist in the document', () => {
      const testingLintModule = createTestingLintModule();

      renderHook(() =>
        useTooltipExtension({
          editorViewInstance: null,
          props: {
            tooltips: [
              {
                line: 1,
                column: 1,
                length: 4,
                messages: ['valid tooltip'],
                severity: 'info',
                links: [],
              },
              {
                line: 5, // Out of bounds - document only has 2 lines
                column: 1,
                length: 4,
                messages: ['invalid tooltip'],
                severity: 'error',
                links: [],
              },
              {
                line: 0, // Invalid - lines are 1-based
                column: 1,
                length: 4,
                messages: ['invalid tooltip'],
                severity: 'info',
                links: [],
              },
            ],
          },
          modules: {
            '@codemirror/state': fakeStateModule,
            '@codemirror/lint': testingLintModule.module,
          },
        }),
      );

      const diagnostics = testingLintModule.invokeLinter(2);

      expect(diagnostics).toHaveLength(1);
      expect(diagnostics[0].from).toBe(0);
    });

    test('clamps column and length to stay within line bounds', () => {
      const testingLintModule = createTestingLintModule();

      renderHook(() =>
        useTooltipExtension({
          editorViewInstance: null,
          props: {
            tooltips: [
              {
                line: 1,
                column: 100, // Exceeds "line 1" length (6 characters)
                length: 4,
                messages: ['tooltip with large column'],
                severity: 'info',
                links: [],
              },
              {
                line: 2,
                column: 1,
                length: 100, // Exceeds line length
                messages: ['tooltip with large length'],
                severity: 'info',
                links: [],
              },
            ],
          },
          modules: {
            '@codemirror/state': fakeStateModule,
            '@codemirror/lint': testingLintModule.module,
          },
        }),
      );

      const diagnostics = testingLintModule.invokeLinter(3);

      expect(diagnostics).toHaveLength(2);
      expect(diagnostics[0].from).toBe(6);
      expect(diagnostics[1].from).toBe(7);
      expect(diagnostics[1].to).toBe(13);
    });

    test('does not throw when tooltips reference lines that no longer exist after document changes', () => {
      const testingLintModule = createTestingLintModule();

      renderHook(() =>
        useTooltipExtension({
          editorViewInstance: null,
          props: {
            tooltips: [
              {
                line: 5,
                column: 1,
                length: 4,
                messages: ['tooltip on line that no longer exists'],
                severity: 'error',
                links: [],
              },
            ],
          },
          modules: {
            '@codemirror/state': fakeStateModule,
            '@codemirror/lint': testingLintModule.module,
          },
        }),
      );

      expect(() => testingLintModule.invokeLinter(1)).not.toThrow();

      const diagnostics = testingLintModule.invokeLinter(1);
      expect(diagnostics).toHaveLength(0);
    });
  });
});
