import { ElementType, PropsWithChildren, useState } from 'react';
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
      {children}
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
  const { highlight, setHighlight } =
    useHighlight<HTMLDivElement>(getDescendants);

  return (
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
