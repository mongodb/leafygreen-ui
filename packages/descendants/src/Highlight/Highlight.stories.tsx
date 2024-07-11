/* eslint-disable react-hooks/rules-of-hooks */
import { ElementType, PropsWithChildren, useEffect } from 'react';
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { TestDescendantContext } from '../../test/components.testutils';
import { useDescendant, useInitDescendants } from '../Descendants';

import { HighlightProvider } from './HighlightProvider';
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
  'Chris',
  'Dave',
  'Eliane',
  'Fred',
  'George',
  'Harry',
  'Irena',
  'Jeremy',
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

  const { highlight, setRelativeHighlight, setAbsoluteHighlight } =
    useHighlight(TestHighlightContext, getDescendants, {
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
        <HighlightProvider context={TestHighlightContext} highlight={highlight}>
          {items.map(item => (
            <HighlightItem key={item}>{item}</HighlightItem>
          ))}
        </HighlightProvider>
      </MyDescendantsProvider>
    </div>
  );
};

export const Grid = {
  render: () => {
    const COLUMNS = 3;
    const { getDescendants, Provider: MyDescendantsProvider } =
      useInitDescendants(TestDescendantContext);
    const { highlight, setRelativeHighlight, setAbsoluteHighlight } =
      useHighlight(TestHighlightContext, getDescendants, {
        filter: d => {
          return !d.props.isDisabled;
        },
        onInit: () => setAbsoluteHighlight(0),
      });

    const handleKeyDown = e => {
      switch (e.key) {
        case 'ArrowDown':
          setRelativeHighlight(COLUMNS);
          break;
        case 'ArrowUp':
          setRelativeHighlight(-COLUMNS);
          break;
        case 'ArrowRight':
          setRelativeHighlight(1);
          break;
        case 'ArrowLeft':
          setRelativeHighlight(-1);
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
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div>
        <MyDescendantsProvider>
          <HighlightProvider
            context={TestHighlightContext}
            highlight={highlight}
          >
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
