import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Box, { BoxProps, ExtendableBox } from '.';

interface LinkWrapperProps {
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

const TestComponent = (props: { test: number }) => {
  return <div>{props.test}</div>;
};

const TestAnchorLike = (props: React.AnchorHTMLAttributes<any>) => {
  return <a {...props} />; //eslint-disable-line jsx-a11y/anchor-has-content
};

const TestExtendableBox: ExtendableBox<{ test: number }> = (
  props: BoxProps & { test: number },
) => {
  // @ts-expect-error
  return <Box {...props} />;
};

const TestExtendableBoxWithButton: ExtendableBox<
  {},
  'button'
> = (props: {}) => {
  return <Box {...props} />;
};

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
  const anchorProps: React.ComponentPropsWithRef<'a'> & { as: 'a' } = {
    as: 'a',
    href: 'https://cloud.mongodb.com',
    target: '_blank',
    ...sharedProps,
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<Box />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
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
      expect(linkWrapperFn).toHaveBeenCalled();
      expect(box?.tagName.toLowerCase()).toBe('span');
    });

    test('it renders the child content', () => {
      expect(child).toBeInTheDocument();
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types work as expected', () => {
    // eslint-disable-next-line jest/expect-expect
    test('does not allow specifying "target", without "as" or "href"', () => {
      // @ts-expect-error
      <Box target="_blank" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('does not allow specifying "href", when "as" is set to "div"', () => {
      // @ts-expect-error
      <Box as="div" href="string" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('does not allow props that do not exist on the "as" element', () => {
      // @ts-expect-error
      <Box as="div" x="" />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('expects "href" to be a string when as is an anchor component wrapper', () => {
      // @ts-expect-error
      <Box as={TestAnchorLike} href={1} />;
    });

    // eslint-disable-next-line jest/expect-expect
    test('expects required props to exist when as is a React Component with required props', () => {
      // @ts-expect-error
      <Box as={TestComponent} />;
    });
  });

  describe('packages/box/ExtendableBox', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('the types work as expected', () => {
      // eslint-disable-next-line jest/expect-expect
      test('does not allow specifying "target", without "as" or "href"', () => {
        // @ts-expect-error
        <TestExtendableBox target="_blank" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('does not allow specifying "href", when "as" is set to "div"', () => {
        // @ts-expect-error
        <TestExtendableBox as="div" href="string" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('does not allow props that do not exist on the "as" element', () => {
        // @ts-expect-error
        <TestExtendableBox as="div" x="" />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('expects "href" to be a string when as is an anchor component wrapper', () => {
        // @ts-expect-error
        <TestExtendableBox as={TestAnchorLike} href={1} />;
      });

      // eslint-disable-next-line jest/expect-expect
      test('expects required props to exist when as is a React Component with required props', () => {
        // @ts-expect-error
        <TestExtendableBox as={TestComponent} />;
      });

      describe('when Extendable Box has a default "as" that is not a "div"', () => {
        // eslint-disable-next-line jest/expect-expect
        test('allows props based on the default supplied', () => {
          <TestExtendableBoxWithButton type="submit" />;
        });

        // eslint-disable-next-line jest/expect-expect
        test('errors when "as" overwrites default and props are no longer compatible', () => {
          // @ts-expect-error
          <TestExtendableBoxWithButton type="submit" as="div" />;
        });

        // eslint-disable-next-line jest/expect-expect
        test('errors when prop that only belongs on "a" is supplied without setting "as"', () => {
          // @ts-expect-error
          <TestExtendableBoxWithButton target="_blank" />;
        });

        // eslint-disable-next-line jest/expect-expect
        test('allows prop that only belongs on "a" when setting "as"', () => {
          <TestExtendableBoxWithButton target="_blank" as="a" />;
        });
      });
    });
  });
});
