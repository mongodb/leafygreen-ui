import { ElementType, PropsWithChildren, useEffect, useState } from 'react';
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

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

const TestHighlightContext = createHighlightContext('TestHighlight');

const HighlightItem = ({ children }: PropsWithChildren<{}>) => {
  const { ref, id } = useDescendant(TestDescendantContext);
  const { highlight } = useHighlightContext(TestHighlightContext);

  const isHighlighted = highlight?.id === id;

  return (
    <div ref={ref} style={{ color: isHighlighted ? 'red' : 'black' }}>
      {children}: {id}
    </div>
  );
};

export const Basic = () => {
  const [items] = useState([
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
  ]);

  const { getDescendants, dispatch } = useInitDescendants<HTMLDivElement>();
  const { highlight, moveHighlight, setHighlight } =
    useHighlight<HTMLDivElement>(getDescendants);

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
          {items.map(item => (
            <HighlightItem key={item}>{item}</HighlightItem>
          ))}
        </HighlightProvider>
      </DescendantsProvider>
    </div>
  );
};
