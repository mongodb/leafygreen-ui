import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Box from '.';

interface LinkWrapperProps {
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

describe('packages/box', () => {
  const linkWrapperFn = jest.fn();

  function LinkWrapper({ href, target, children, ...rest }: LinkWrapperProps) {
    linkWrapperFn();
    return (
      <span {...rest}>
        <a data-testid="link-component" href={href} target={target}>
          {children}
        </a>
      </span>
    );
  }

  const sharedProps = { name: 'testName' };
  const anchorProps: {
    as: 'a';
    href: string;
    target: string;
    name: string;
  } = {
    as: 'a',
    href: 'https://cloud.mongodb.com',
    target: '_blank',
    ...sharedProps,
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('when rendered with only shared props', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box data-testid="box" {...sharedProps}>
          <div data-testid="child">Child Content</div>
        </Box>,
      );

      box = getByTestId('box');
      child = getByTestId('child');
    });

    test('it renders the box component as a div', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('div');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(box).toHaveAttribute('name', sharedProps.name);
    });
  });

  describe('when rendered with the expected anchor props', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box {...anchorProps} data-testid="anchor-component">
          <span data-testid="anchor-child">hi</span>
        </Box>,
      );

      box = getByTestId('anchor-component');
      child = getByTestId('anchor-child');
    });

    test('it renders the box component as an anchor', () => {
      expect(box).toBeInTheDocument();
      expect(box?.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(box).toHaveAttribute('name', sharedProps.name);
    });

    test('it sets the anchor-specific attributes', () => {
      expect(box).toHaveAttribute('href', anchorProps.href);
      expect(box).toHaveAttribute('target', anchorProps.target);
    });
  });

  describe('when rendered as a custom component', () => {
    let box: HTMLElement;
    let child: HTMLElement;

    beforeEach(() => {
      const { getByTestId } = render(
        <Box
          as={LinkWrapper}
          href="https://cloud.mongodb.com"
          target="_blank"
          data-testid="custom-component"
        />,
      );
      box = getByTestId('custom-component');
      child = getByTestId('link-component');
    });

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
