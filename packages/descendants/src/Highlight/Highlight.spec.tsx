import React, { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';

import { act, renderHook } from '@leafygreen-ui/testing-lib';

import {
  TestDescendant,
  TestDescendantContext,
} from '../../test/components.testutils';
import { Descendant, useInitDescendants } from '../Descendants';

import { UseHighlightOptions } from './highlight.types';
import { createHighlightContext } from './HighlightContext';
import { useHighlight } from './useHighlight';
import { useHighlightContext } from './useHighlightContext';

const TestHighlightContext = createHighlightContext('TestH');

const items = [
  'Adam',
  'Brooke',
  'Chris',
  'Dave',
  'Eliane',
  'Fred',
  'George',
  'Harry',
  'Irena',
  'Jeremy',
];

const renderHighlightTestContext = (
  children: ReactNode,
  highlightHookOptions?: UseHighlightOptions<any>,
) => {
  const descendantsHook = renderHook(() =>
    useInitDescendants(TestDescendantContext),
  );
  const highlightHook = renderHook(() =>
    useHighlight(
      TestHighlightContext,
      descendantsHook.result.current.getDescendants,
      highlightHookOptions,
    ),
  );

  const renderResult = render(
    <descendantsHook.result.current.Provider>
      <highlightHook.result.current.Provider>
        {children}
      </highlightHook.result.current.Provider>
    </descendantsHook.result.current.Provider>,
  );

  const rerender = (newChildren?: ReactNode) => {
    descendantsHook.rerender();
    highlightHook.rerender();
    renderResult.rerender(
      <descendantsHook.result.current.Provider>
        <highlightHook.result.current.Provider>
          {/* If no new children are provided, just use the prev ones */}
          {newChildren ?? children}
        </highlightHook.result.current.Provider>
      </descendantsHook.result.current.Provider>,
    );
  };

  return {
    descendantsHook,
    highlightHook,
    renderResult,
    rerender,
  };
};

describe('packages/descendants/highlight', () => {
  describe('useHighlight', () => {
    describe('core', () => {
      test('calling the absolute setter updates the highlight object', () => {
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(0));
        const hl = r.highlightHook.result.current.highlight;
        expect(hl?.index).toBe(0);
        expect(hl?.element).toHaveTextContent('Adam');
      });

      test('calling the relative setter updates the highlight object', () => {
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(1));
        act(() => r.highlightHook.result.current.setRelativeHighlight(1));
        const hl = r.highlightHook.result.current.highlight;
        expect(hl?.index).toBe(2);
        expect(hl?.element).toHaveTextContent('Chris');
      });

      test('`highlight` remains consistent when descendants are added', () => {
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(4));
        let hl = r.highlightHook.result.current.highlight;
        expect(hl?.element).toHaveTextContent('Eliane');

        const newItems = [...items];
        newItems.splice(3, 0, 'Xavier');
        r.rerender(
          <>
            {newItems.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        hl = r.highlightHook.result.current.highlight;
        expect(hl?.element).toHaveTextContent('Eliane');
      });

      test('`highlight` remains consistent when descendants are removed', () => {
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(4));
        let hl = r.highlightHook.result.current.highlight;
        expect(hl?.element).toHaveTextContent('Eliane');

        const newItems = [...items];
        newItems.splice(3, 1);
        r.rerender(
          <>
            {newItems.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
        );

        hl = r.highlightHook.result.current.highlight;
        expect(hl?.element).toHaveTextContent('Eliane');
      });
    });

    describe('options', () => {
      test('`onInit` is called once when descendants are initialized', async () => {
        const onInit = jest.fn();
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
          { onInit },
        );
        r.rerender();

        await waitFor(() => {
          expect(onInit).toHaveBeenCalledTimes(1);
        });
      });

      test('`onChange` is called when the highlight object changes', () => {
        const onChange = jest.fn();

        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name}>{name}</TestDescendant>
            ))}
          </>,
          { onChange },
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(3));
        expect(onChange).toHaveBeenCalledWith<[Descendant<any>]>(
          expect.objectContaining({
            element: expect.objectContaining({
              textContent: 'Dave',
            }),
          }),
        );
      });

      test('`filter` prevents filtered descendants from being highlighted', () => {
        const r = renderHighlightTestContext(
          <>
            {items.map(name => (
              <TestDescendant key={name} isDisabled={name === 'Fred'}>
                {name}
              </TestDescendant>
            ))}
          </>,
          { filter: d => !d.props.isDisabled },
        );

        act(() => r.highlightHook.result.current.setAbsoluteHighlight(4)); // Eliane
        act(() => r.highlightHook.result.current.setRelativeHighlight(1));

        const hl = r.highlightHook.result.current.highlight;
        expect(hl?.element).toHaveTextContent('George');
      });
    });
  });

  describe('useHighlightContext', () => {
    test('returns the current highlight object', () => {
      const r = renderHighlightTestContext(
        <>
          {items.map(name => (
            <TestDescendant key={name}>{name}</TestDescendant>
          ))}
        </>,
      );

      const childHook = renderHook(
        () => useHighlightContext(TestHighlightContext),
        {
          wrapper: r.highlightHook.result.current.Provider,
        },
      );

      act(() => r.highlightHook.result.current.setAbsoluteHighlight(0));
      childHook.rerender();
      expect(childHook.result.current.highlight).toBeDefined();
      expect(childHook.result.current.highlight?.element).toHaveTextContent(
        'Adam',
      );
    });
  });
});
