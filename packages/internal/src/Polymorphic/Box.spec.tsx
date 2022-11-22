import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import Box from '@leafygreen-ui/box';

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

  const anchorPropsWithoutRef: React.ComponentPropsWithoutRef<'a'> & {
    as: 'a';
  } = {
    as: 'a',
    href: 'https://cloud.mongodb.com',
    target: '_blank',
    ...sharedProps,
  };

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

  describe('Basic rendering', () => {
    describe('with default props', () => {
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

    describe('as an anchor', () => {
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

    describe('as a custom component', () => {
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
  });

  describe('Higher-Order Components', () => {
    type TestHocProps<T extends AsPropType> = BoxProps<
      T,
      {
        name?: string;
      }
    >;

    /**
     * Test Higher-Order Component
     */
    function TestHoc<T extends AsPropType>({
      as,
      children,
      ...rest
    }: TestHocProps<T>) {
      return (
        <Box as={as} {...rest}>
          {children}
        </Box>
      );
    }

    describe('Basic HOC', () => {
      test('Renders with default props', () => {
        const { getByTestId } = render(
          <TestHoc name="testName">
            <span data-testid="HOC-child" />
          </TestHoc>,
        );
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });

      test('Renders as an anchor', () => {
        const { getByTestId } = render(
          <TestHoc {...anchorPropsWithoutRef} data-testid="anchor-node">
            <span data-testid="HOC-child" />
          </TestHoc>,
        );

        expect(getByTestId('anchor-node').tagName.toLowerCase()).toBe('a');
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });

      test('Renders as custom component', () => {
        const { getByTestId } = render(
          <TestHoc as={LinkWrapper}>
            <span data-testid="HOC-child" />
          </TestHoc>,
        );
        expect(linkWrapperFn).toHaveBeenCalled();
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });
    });

    // eslint-disable-next-line jest/no-disabled-tests, jest/no-commented-out-tests
    describe.skip('HOC with forwardRef', () => {
      const TestHocFwdRef = React.forwardRef(TestHoc) as <
        T extends keyof JSX.IntrinsicElements,
      >(
        props: TestHocProps<T> & {
          ref: React.ForwardedRef<JSX.IntrinsicElements[T]>;
        },
      ) => ReturnType<typeof TestHoc>;

      test('Renders with default props', () => {
        const { getByTestId } = render(
          <TestHocFwdRef {...sharedProps}>
            <span data-testid="HOC-child" />
          </TestHocFwdRef>,
        );
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });

      test('Renders as an anchor', () => {
        const { getByTestId } = render(
          <TestHocFwdRef {...anchorPropsWithoutRef} data-testid="anchor-node">
            <span data-testid="HOC-child" />
          </TestHocFwdRef>,
        );

        expect(getByTestId('anchor-node').tagName.toLowerCase()).toBe('a');
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });

      test('Renders as custom component', () => {
        const { getByTestId } = render(
          <TestHocFwdRef as={LinkWrapper}>
            <span data-testid="HOC-child" />
          </TestHocFwdRef>,
        );
        expect(linkWrapperFn).toHaveBeenCalled();
        expect(getByTestId('HOC-child')).toBeInTheDocument();
      });
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
});
