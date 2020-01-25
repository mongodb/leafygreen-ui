import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Root from '.';
import { RootProps } from './Root';

// types
interface SharedProps {
  name?: string;
}

interface RenderedEls {
  root?: HTMLElement | null;
  child?: HTMLElement | null;
}

interface LinkWrapperProps {
  href: string;
  target: string;
  children: React.ReactNode;
}

type testProps = RootProps<SharedProps>;
type unmountQueueType = Array<() => boolean>;

describe('packages/root', () => {
  const unmountQueue: unmountQueueType = [];
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
  const linkProps = { as: LinkWrapper, ...anchorProps };

  const renderRoot = (props: testProps = sharedProps) => {
    const { queryByTestId, unmount } = render(
      <Root data-testid="root" {...props}>
        <div data-testid="child">Child Content</div>
      </Root>,
    );

    renderedEls.child = queryByTestId('child');
    renderedEls.root = queryByTestId('root');
    unmountQueue.push(unmount);
  };

  afterEach(() => {
    while (unmountQueue.length > 0) {
      const unmount = unmountQueue.pop();
      unmount && unmount();
    }
    jest.clearAllMocks();
    cleanup();
  });

  describe('when rendered with only shared props', () => {
    beforeEach(() => {
      renderRoot();
    });

    test('it renders the root component as a button', () => {
      expect(renderedEls.root).toBeInTheDocument();
      expect(renderedEls.root?.tagName.toLowerCase()).toBe('button');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.root).toHaveAttribute('name', sharedProps.name);
    });
  });

  describe('when rendered with the expected anchor props', () => {
    beforeEach(() => {
      renderRoot(anchorProps);
    });

    test('it renders the root component as an anchor', () => {
      expect(renderedEls.root).toBeInTheDocument();
      expect(renderedEls.root?.tagName.toLowerCase()).toBe('a');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.root).toHaveAttribute('name', sharedProps.name);
    });

    test('it sets the anchor-specific attributes', () => {
      expect(renderedEls.root).toHaveAttribute('href', anchorProps.href);
      expect(renderedEls.root).toHaveAttribute('target', anchorProps.target);
    });
  });

  describe('when rendered as a custom component', () => {
    beforeEach(() => {
      renderRoot(linkProps);
    });

    test('it renders the root component as the custom component', () => {
      expect(renderedEls.root).toBeInTheDocument();
      expect(linkWrapperFn).toHaveBeenCalledTimes(1);
      expect(renderedEls.root?.tagName.toLowerCase()).toBe('span');
    });

    test('it renders the child content', () => {
      expect(renderedEls.child).toBeInTheDocument();
    });

    test('it preserves the shared props', () => {
      expect(renderedEls.root).toHaveAttribute('name', sharedProps.name);
    });
  });
});
