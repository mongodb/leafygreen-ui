import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Card, ContentStyle } from '.';

const defaultClassName = 'card-className';
const defaultChildren = 'this is my card component';

function isVisuallyClickable(element: HTMLElement): boolean {
  return (
    window.getComputedStyle(element).getPropertyValue('cursor') === 'pointer'
  );
}

interface PartialCardProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  as?: 'section';
  contentStyle?: ContentStyle;
}

function renderCard({
  children = defaultChildren,
  className = defaultClassName,
  ...rest
}: PartialCardProps = {}) {
  const cardId = 'cardID';

  const { container, getByTestId } = render(
    // @ts-expect-error
    <Card data-testid={cardId} className={className} {...rest}>
      {children}
    </Card>,
  );

  return { renderedCard: getByTestId(cardId), container };
}

describe('packages/Card', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderCard();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  test(`renders "${defaultClassName}" in the card's classList`, () => {
    const { renderedCard } = renderCard();
    expect(renderedCard.classList.contains(defaultClassName)).toBe(true);
  });

  test(`renders "${defaultChildren}" as the cards's textContent`, () => {
    const { renderedCard } = renderCard();
    expect(renderedCard.textContent).toBe(defaultChildren);
  });

  test(`renders inside of a div tag by default`, () => {
    const { renderedCard } = renderCard();
    expect(renderedCard.tagName.toLowerCase()).toBe('div');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const { renderedCard } = renderCard({ as: 'section' });
    expect(renderedCard.tagName.toLowerCase()).toBe('section');
  });

  describe('content style', () => {
    describe('is `clickable`', () => {
      test('when `href` is provided', () => {
        const { renderedCard } = renderCard({ href: 'https://mongodb.com' });
        expect(isVisuallyClickable(renderedCard)).toBe(true);
      });

      test('when `onClick` is provided', () => {
        const { renderedCard } = renderCard({ onClick: () => {} });
        expect(isVisuallyClickable(renderedCard)).toBe(true);
      });

      test('when explicit `contentStyle` is provided', () => {
        const { renderedCard } = renderCard({
          contentStyle: ContentStyle.Clickable,
        });
        expect(isVisuallyClickable(renderedCard)).toBe(true);
      });
    });

    describe('is `none`', () => {
      test('by default', () => {
        const { renderedCard } = renderCard();
        expect(isVisuallyClickable(renderedCard)).toBe(false);
      });

      test('when `href` and explicit `contentStyle` are provided', () => {
        const { renderedCard } = renderCard({
          href: 'https://mongodb.com',
          contentStyle: ContentStyle.None,
        });
        expect(isVisuallyClickable(renderedCard)).toBe(false);
      });

      test('when `onClick` and explicit `contentStyle` are provided', () => {
        const { renderedCard } = renderCard({
          onClick: () => {},
          contentStyle: ContentStyle.None,
        });
        expect(isVisuallyClickable(renderedCard)).toBe(false);
      });
    });
  });

  /* eslint-disable jest/no-disabled-tests, jest/expect-expect*/
  describe.skip('Types behave as expected', () => {
    test('Allows no props', () => {
      <Card />;
    });
    test('Accepts `as` prop', () => {
      <Card as="p" />;
      <Card as={() => <></>} />;
    });

    test('Accepts `href` prop', () => {
      <Card href="http://mongodb.design" />;
    });
  });
});
