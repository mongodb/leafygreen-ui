import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { PacoMenu, PacoMenuItem } from './pacocoursey/TestComponents';
import { ReachMenu, ReachMenuItem } from './reach/TestComponents';
import { TestDescendant, TestParent } from './test/testutils';

faker.seed(0);

export default {
  title: 'Hooks/Descendants',
};

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
        <br />
        <TestParent>
          {items.map((x, i) => (
            <TestDescendant
              className={css`
                &:before {
                  content: attr(data-index);
                  padding-right: 4px;
                }

                &:after {
                  content: attr(data-id);
                  padding-left: 4px;
                  color: gray;
                  font-family: monospace;
                }
              `}
              key={x + i}
            >
              {x}
            </TestDescendant>
          ))}
        </TestParent>
      </div>
    </LeafyGreenProvider>
  );
};

export const Reach = () => {
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

  return (
    <LeafyGreenProvider>
      <Button variant="primary" onClick={addItem}>
        Add Item
      </Button>
      &nbsp;
      <Button variant="danger" onClick={removeItem}>
        Remove Item
      </Button>
      <br />
      <ReachMenu id="">
        {items.map((item, i) => {
          return <ReachMenuItem key={item + i}>{item}</ReachMenuItem>;
        })}
      </ReachMenu>
    </LeafyGreenProvider>
  );
};

export const Paco = () => {
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
        <br />
        <PacoMenu>
          {items.map((item, i) => {
            return <PacoMenuItem key={item + i}>{item}</PacoMenuItem>;
          })}
        </PacoMenu>
      </div>
    </LeafyGreenProvider>
  );
};
