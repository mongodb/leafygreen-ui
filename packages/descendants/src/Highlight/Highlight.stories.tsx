/* eslint-disable react-hooks/rules-of-hooks */
import { ElementType, PropsWithChildren, useCallback, useEffect } from 'react';
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { useEventListener } from '@leafygreen-ui/hooks';

import { TestDescendantContext } from '../../test/components.testutils';
import { useDescendant, useInitDescendants } from '../Descendants';

import { useHighlightContext } from './useHighlightContext';
import { createHighlightContext, useHighlight } from '.';

export default {
  title: 'Hooks/useHighlight',
  parameters: {
    default: null,
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryMetaType<ElementType<unknown>>;

const items = [
  'Adam',
  'Brooke',
  'Chi',
  'Dave',
  'Eliane',
  'Fred',
  'George',
  'Harry',
  'Irena',
  'Jeremy',
  'Karen',
];

const TestHighlightContext = createHighlightContext('TestHighlight');

const HighlightItem = ({ children }: PropsWithChildren<{}>) => {
  const isDisabled = children === 'Fred'; // Fred is on sabbatical
  const { ref, id, index } = useDescendant(TestDescendantContext, null, {
    isDisabled,
  });
  const { highlight } = useHighlightContext(TestHighlightContext);

  const isHighlighted = highlight?.id === id;

  return (
    <div
      ref={ref}
      style={{
        padding: 4,
        color: isHighlighted ? 'red' : 'black',
        outline: `1px solid ${isHighlighted ? 'red' : 'transparent'}`,
        outlineOffset: 2,
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      {index}: {children} <code>id: {id}</code>
    </div>
  );
};

export const Basic = () => {
  const { getDescendants, Provider: MyDescendantsProvider } =
    useInitDescendants(TestDescendantContext);

  const {
    Provider: MyHighlightProvider,
    setRelativeHighlight,
    setAbsoluteHighlight,
  } = useHighlight(TestHighlightContext, getDescendants, {
    filter: d => {
      return !d.props.isDisabled;
    },
    onInit: () => {
      setAbsoluteHighlight(0);
    },
  });

  const handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        setRelativeHighlight('next');
        break;
      case 'ArrowUp':
        setRelativeHighlight('prev');
        break;
      case ' ':
        setAbsoluteHighlight('last');
        break;
      case 'Escape':
        setAbsoluteHighlight(0);
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        setAbsoluteHighlight(Number(e.key));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    () => document.body.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MyDescendantsProvider>
        <MyHighlightProvider>
          {items.map(item => (
            <HighlightItem key={item}>{item}</HighlightItem>
          ))}
        </MyHighlightProvider>
      </MyDescendantsProvider>
    </div>
  );
};

export const Grid = {
  render: () => {
    const COLUMNS = 3;
    const { getDescendants, Provider: MyDescendantsProvider } =
      useInitDescendants(TestDescendantContext);

    const {
      Provider: HighlightProvider,
      setAbsoluteHighlight,
      highlight,
    } = useHighlight(TestHighlightContext, getDescendants, {
      filter: d => {
        return !d.props.isDisabled;
      },
      onInit: () => setAbsoluteHighlight(0),
    });

    const setRelativeRow = useCallback(
      (colsDiff: number) => {
        if (colsDiff === 0) return;

        const totalItems = getDescendants().length;
        const col = (highlight?.index ?? 0) % COLUMNS;
        const row = Math.floor((highlight?.index ?? 0) / COLUMNS);
        // count of items where index % 3 === col
        const totalItemsInColumn = getDescendants().reduce((sum, d) => {
          const this_col = d.index % COLUMNS;
          if (this_col === col) return sum + 1;
          return sum;
        }, 0);

        if (colsDiff > 0) {
          const newRow = (row + colsDiff) % totalItemsInColumn;
          const index = (newRow * COLUMNS + col) % totalItems;
          setAbsoluteHighlight(index);
        } else {
          const newRow =
            (row + colsDiff + totalItemsInColumn) % totalItemsInColumn;
          const index = (newRow * COLUMNS + col) % totalItems;
          setAbsoluteHighlight(index);
        }
      },
      [getDescendants, highlight, setAbsoluteHighlight],
    );

    const setRelativeColumn = useCallback(
      (rowsDiff: number) => {
        if (rowsDiff === 0) return;

        const col = (highlight?.index ?? 0) % COLUMNS;
        const row = Math.floor((highlight?.index ?? 0) / COLUMNS);

        const totalItemsInRow = getDescendants().reduce((sum, d) => {
          const this_row = Math.floor(d.index / COLUMNS);
          if (this_row === row) return sum + 1;
          return sum;
        }, 0);

        if (rowsDiff > 0) {
          const newCol = (col + 1) % totalItemsInRow;
          const colDiff = newCol - col;
          const index = (highlight?.index ?? 0) + colDiff;
          setAbsoluteHighlight(index);
        } else {
          const newCol = (col - 1 + totalItemsInRow) % totalItemsInRow;
          const colDiff = newCol - col;
          const index = (highlight?.index ?? 0) + colDiff;
          setAbsoluteHighlight(index);
        }
      },
      [getDescendants, highlight, setAbsoluteHighlight],
    );

    const handleKeyDown = useCallback(
      e => {
        switch (e.key) {
          case 'ArrowDown':
            setRelativeRow(1);
            break;
          case 'ArrowUp':
            setRelativeRow(-1);
            break;
          case 'ArrowRight':
            setRelativeColumn(1);
            break;
          case 'ArrowLeft':
            setRelativeColumn(-1);
            break;
          default:
            break;
        }
      },
      [setRelativeColumn, setRelativeRow],
    );

    useEventListener('keydown', handleKeyDown);

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onKeyDown={handleKeyDown}
        style={{
          outline: '1px solid black',
          margin: '-50px',
          height: '80vh',
        }}
      >
        <MyDescendantsProvider>
          <HighlightProvider>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
              }}
            >
              {items.map(item => (
                <HighlightItem key={item}>{item}</HighlightItem>
              ))}
            </div>
          </HighlightProvider>
        </MyDescendantsProvider>
      </div>
    );
  },
  argTypes: {},
} satisfies StoryObj<any>;
