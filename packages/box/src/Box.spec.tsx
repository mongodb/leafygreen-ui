import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Box from '.';

afterAll(cleanup);

describe('packages/box', () => {
  describe('when rendered with only shared props', () => {
    const { getByTestId } = render(
      <Box data-testid="default-box">
        <div data-testid="child">hi</div>
      </Box>,
    );

    const box = getByTestId('default-box');
    const child = getByTestId('child');

    test('it renders the box component as a div', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('div');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });
  });

  describe('when rendered with the expected anchor props', () => {
    const { getByTestId } = render(
      <Box
        data-testid="anchor-box"
        component="a"
        href="https://mongodb.design/"
        target="_blank"
      >
        <span data-testid="anchor-child-content">hi</span>
      </Box>,
    );

    const box = getByTestId('anchor-box');
    const child = getByTestId('anchor-child-content');

    test('it renders the box component as an anchor', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });

    test('it sets the anchor-specific attributes', () => {
      expect(box).toHaveAttribute('href', 'https://mongodb.design/');
      expect(box).toHaveAttribute('target', '_blank');
    });
  });

  describe('when rendered as a custom component', () => {
    const linkWrapperFn = jest.fn();

    interface LinkWrapperInterface {
      href: string;
      target: string;
      children: React.ReactNode;
    }

    function LinkWrapper({
      href,
      target,
      children,
      ...rest
    }: LinkWrapperInterface) {
      linkWrapperFn();
      return (
        <span {...rest}>
          <a data-testid="link-component" href={href} target={target}>
            {children}
          </a>
        </span>
      );
    }

    const { getByTestId } = render(
      <Box data-testid="custom-box" component={LinkWrapper}>
        <span data-testid="custom-child-content">custom child content</span>
      </Box>,
    );

    const box = getByTestId('custom-box');
    const child = getByTestId('custom-child-content');

    test('it renders the box component as the custom component', () => {
      expect(box).toBeInTheDocument();
      expect(linkWrapperFn).toHaveBeenCalledTimes(1);
      expect(box?.tagName.toLowerCase()).toBe('span');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });
  });
});
