import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Card from './Card';

afterAll(cleanup);

describe('packages/Card', () => {
  const className = 'card-className';
  const children = 'this is my card component';
  const cardId = 'cardID';

  const { getByTestId } = render(
    <Card data-testid={cardId} className={className}>
      {children}
    </Card>,
  );

  const renderedCard = getByTestId(cardId);

  test(`renders "${className}" in the cards's classList`, () => {
    expect(renderedCard.classList.contains(className)).toBe(true);
  });

  test(`renders "${children}" as the cards's textContent`, () => {
    expect(renderedCard.textContent).toBe(children);
  });

  test(`renders inside of a section tag by default`, () => {
    expect(renderedCard.tagName.toLowerCase()).toBe('section');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const newCardId = 'newCardID';
    const { getByTestId } = render(
      <Card data-testid={newCardId} as="section">
        Card!
      </Card>,
    );
    const cardComponent = getByTestId(newCardId);

    expect(cardComponent.tagName.toLowerCase()).toBe('section');
  });
});
