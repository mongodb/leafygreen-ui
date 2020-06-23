import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Box from '.';
import { BoxProps } from './Box';

// types
interface SharedProps {
  name?: string;
}

interface RenderedEls {
  box?: HTMLElement | null;
  child?: HTMLElement | null;
}

interface LinkWrapperProps {
  href: string;
  target: string;
  children: React.ReactNode;
}

type testProps = BoxProps<SharedProps>;

describe('packages/box', () => {
  const renderedEls: RenderedEls = {};
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
  const anchorProps = {
    href: 'https://cloud.mongodb.com',
    target: '_blank',
    ...sharedProps,
  };
  const linkProps = { component: LinkWrapper, ...anchorProps };

  const renderBox = (props: testProps = sharedProps) => {
    const { queryByTestId } = render(
      <Box data-testid="box" {...props}>
        <div data-testid="child">Child Content</div>
      </Box>,
    );

    renderedEls.child = queryByTestId('child');
    renderedEls.box = queryByTestId('box');
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('when rendered with only shared props', () => {
    beforeEach(() => {
      renderBox();
    });

    test('it renders the box component as a div', () => {
      expect(renderedEls.box).toBeInTheDocument();
      expect(renderedEls.box?.tagName.toLowerCase()).toBe('div');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.box).toHaveAttribute('name', sharedProps.name);
    });
  });

  describe('when rendered with the expected anchor props', () => {
    beforeEach(() => {
      renderBox(anchorProps);
    });

    test('it renders the box component as an anchor', () => {
      expect(renderedEls.box).toBeInTheDocument();
      expect(renderedEls.box?.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.box).toHaveAttribute('name', sharedProps.name);
    });

    test('it sets the anchor-specific attributes', () => {
      expect(renderedEls.box).toHaveAttribute('href', anchorProps.href);
      expect(renderedEls.box).toHaveAttribute('target', anchorProps.target);
    });
  });

  describe('when rendered as a custom component', () => {
    beforeEach(() => {
      renderBox(linkProps);
    });

    test('it renders the box component as the custom component', () => {
      expect(renderedEls.box).toBeInTheDocument();
      expect(linkWrapperFn).toHaveBeenCalledTimes(1);
      expect(renderedEls.box?.tagName.toLowerCase()).toBe('span');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.box).toHaveAttribute('name', sharedProps.name);
    });
  });
});
