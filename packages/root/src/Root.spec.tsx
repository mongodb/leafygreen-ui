import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Root from '.';

afterAll(cleanup);

describe('packages/root', () => {
  describe('by default', () => {
    const props = { name: 'testName' };
    const content = 'button content';
    const { getByTestId } = render(
      <Root data-testid="button" {...props}>
        {content}
      </Root>,
    );
    const button = getByTestId('button');

    test('it renders as a button when no props are set', () => {
      expect(button.tagName.toLowerCase()).toBe('button');
    });
    test('it renders children inside of <Root /> tag', () => {
      expect(button.textContent).toBe(content);
    });

    test('it renders other props passed, when they are set', () => {
      expect((button as HTMLButtonElement).name).toBe('testName');
    });
  });

  describe('when the href prop is set', () => {
    const content = 'anchor content';

    const { getByTestId } = render(
      <Root
        href="https://cloud.mongodb.com"
        target="_blank"
        data-testid="anchor"
      >
        {content}
      </Root>,
    );

    const anchor = getByTestId('anchor');

    test('it renders as an anchor element when the href prop is set', () => {
      expect(anchor.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the correct href based on the prop', () => {
      expect((anchor as HTMLAnchorElement).href).toBe(
        'https://cloud.mongodb.com/',
      );
    });

    test('it accepts Anchor Element props, when the href prop is set', () => {
      expect((anchor as HTMLAnchorElement).target).toBe('_blank');
    });
  });

  describe('when the as prop is set', () => {
    const content = 'custom content';
    const { getByTestId } = render(
      <Root as="div" data-testid="custom" href="https://cloud.mongodb.com">
        {content}
      </Root>,
    );

    const custom = getByTestId('custom');

    test('it renders as a custom element when the as prop is set', () => {
      expect(custom.tagName.toLowerCase()).toBe('div');
    });

    test('it renders as a custom component even when the href prop is set', () => {
      expect(custom.tagName.toLowerCase()).toBe('div');
    });
  });
});
