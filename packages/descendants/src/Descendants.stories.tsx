import React, { ElementType, useState } from 'react';
import { faker } from '@faker-js/faker';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import random from 'lodash/random';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import {
  TestDescendant,
  TestDescendant2,
  TestParent,
  TestParent2,
} from './test/components.testutils';

faker.seed(0);

const testItemStyle = css`
  &:before {
    content: attr(data-index);
    color: gray;
    padding-right: 4px;
    font-family: monospace;
  }
`;

const nestedItemStyle = css`
  padding-left: 8px;
`;

const meta: StoryMetaType<ElementType<unknown>> = {
  title: 'Hooks/Descendants',
  parameters: {
    default: null,
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

export const Basic = () => {
  const [items, setItems] = useState([
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

  const addItem = () => {
    const newItems = [...items];
    newItems.splice(items.length / 2, 0, faker.person.firstName());
    setItems(newItems);
  };

  const removeItem = () => {
    const newItems = [...items];
    newItems.splice(items.length / 2, 1);
    setItems(newItems);
  };

  const shuffleItems = () => {
    setItems(shuffle(items));
  };

  return (
    <LeafyGreenProvider>
      <div>
        <Button variant="primary" onClick={addItem}>
          Add Item
        </Button>
        &nbsp;
        <Button variant="danger" onClick={removeItem}>
          Remove Item
        </Button>
        &nbsp;
        <Button onClick={shuffleItems}>Shuffle Items</Button>
        <br />
        <TestParent>
          {items.map((x, i) => (
            <TestDescendant className={testItemStyle} key={x + i} type="person">
              {x}
            </TestDescendant>
          ))}
        </TestParent>
      </div>
    </LeafyGreenProvider>
  );
};

export const Nested = () => {
  const [people, _setItems] = useState([
    {
      name: 'Adam',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Brooke',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Chris',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Dave',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Eliane',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Fred',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'George',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Harry',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Irena',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
    {
      name: 'Jeremy',
      animals: range(random(0, 10)).map(_ => faker.animal.type()),
    },
  ]);

  const [isExpanded, setExpanded] = useState(true);

  const toggleCollapse = () => {
    setExpanded(e => !e);
  };

  return (
    <LeafyGreenProvider>
      <div>
        <Button onClick={toggleCollapse}>
          {isExpanded ? 'Collapse' : 'Expand'} All
        </Button>
        <TestParent>
          {people.map((person, i) => (
            <TestDescendant className={testItemStyle} key={person.name + i}>
              {person.name}
              {person.animals?.length && isExpanded
                ? person.animals.map((animal, j) => (
                    <TestDescendant
                      key={person.name + i + animal + j}
                      className={cx(nestedItemStyle, testItemStyle)}
                    >
                      {animal}
                    </TestDescendant>
                  ))
                : ''}
            </TestDescendant>
          ))}
        </TestParent>
      </div>
    </LeafyGreenProvider>
  );
};

export const MultipleContexts = () => {
  return (
    <TestParent>
      <TestDescendant className={testItemStyle}>Apple</TestDescendant>
      <TestDescendant className={testItemStyle}>Banana</TestDescendant>
      <TestDescendant className={testItemStyle}>
        Peppers
        <TestParent2>
          <TestDescendant2 className={cx(nestedItemStyle, testItemStyle)}>
            Anaheim
          </TestDescendant2>
          <TestDescendant2 className={cx(nestedItemStyle, testItemStyle)}>
            Habanero
          </TestDescendant2>
        </TestParent2>
      </TestDescendant>
    </TestParent>
  );
};
