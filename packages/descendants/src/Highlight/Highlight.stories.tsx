/* eslint-disable react-hooks/rules-of-hooks */
import { ElementType, PropsWithChildren, useEffect } from 'react';
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { TestDescendantContext } from '../../test/components.testutils';
import {
  DescendantsProvider,
  useDescendant,
  useInitDescendants,
} from '../Descendants';

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
  const { ref, id } = useDescendant(TestDescendantContext, null, {
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
      {children}: {id}
    </div>
  );
};

export const Basic = () => {
  const { getDescendants, dispatch } = useInitDescendants<HTMLDivElement>();
  const { highlight, moveHighlight, setHighlight } = useHighlight(
    getDescendants,
    {
      filter: d => {
        return !d.props.isDisabled;
      },
      onInit: () => {
        setHighlight(0);
      },
    },
  );

  const handleKeyDown = e => {
    switch (e.key) {
      case 'ArrowDown':
        moveHighlight('next');
        break;
      case 'ArrowUp':
        moveHighlight('prev');
        break;
      case ' ':
        setHighlight('last');
        break;
      case 'Escape':
        setHighlight(0);
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
        setHighlight(Number(e.key));
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
      <DescendantsProvider
        context={TestDescendantContext}
        descendants={getDescendants()}
        dispatch={dispatch}
      >
        <HighlightProvider
          context={TestHighlightContext}
          highlight={highlight}
          setHighlight={setHighlight}
        >
          {items.map(item => (
            <HighlightItem key={item}>{item}</HighlightItem>
          ))}
        </HighlightProvider>
      </DescendantsProvider>
    </div>
  );
};

export const Grid = {
  render: () => {
    const { getDescendants, dispatch } = useInitDescendants<HTMLDivElement>();
    const { highlight, moveHighlight, setHighlight } =
      useHighlight(getDescendants);

    const handleKeyDown = e => {
      switch (e.key) {
        case 'ArrowDown':
          moveHighlight('next');
          break;
        case 'ArrowUp':
          moveHighlight('prev');
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
        <DescendantsProvider
          context={TestDescendantContext}
          descendants={getDescendants()}
          dispatch={dispatch}
        >
          <HighlightProvider
            context={TestHighlightContext}
            highlight={highlight}
            setHighlight={setHighlight}
          >
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              {items.map(item => (
                <HighlightItem key={item}>{item}</HighlightItem>
              ))}
            </div>
          </HighlightProvider>
        </DescendantsProvider>
      </div>
    );
  },
  argTypes: {},
} satisfies StoryObj<any>;
