import React from 'react';
import { render } from '@testing-library/react';
import {
  Polymorphic,
  PolymorphicProps,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from '.';

describe('packages/internal/polymorphic', () => {
  describe('Basic Polymorphic Component', () => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('Prop Types behave correctly', () => {
      const divRef = React.useRef<HTMLDivElement>();
      const anchorRef = React.useRef<HTMLAnchorElement>();
      const spanRef = React.useRef<HTMLSpanElement>();

      // eslint-disable-next-line react/display-name
      const Wrapper = React.forwardRef<HTMLSpanElement>(
        (
          { children, ...rest }: React.ComponentPropsWithoutRef<'span'>,
          ref,
        ) => {
          return (
            <span data-testid="wrapper" {...rest} ref={ref}>
              {children}
            </span>
          );
        },
      );

      return (
        <>
          <Polymorphic />
          <Polymorphic as="div" />
          <Polymorphic as="div" ref={divRef} />
          {/* @ts-expect-error - Must pass the correct ref type */}
          <Polymorphic as="div" ref={anchorRef} />
          <Polymorphic>some content</Polymorphic>

          {/* @ts-expect-error - Require href when as="a" */}
          <Polymorphic as="a" />
          <Polymorphic as="a" href="mongodb.design" />
          <Polymorphic as="a" href="mongodb.design" ref={anchorRef} />
          <Polymorphic as="a" href="mongodb.design">
            some content
          </Polymorphic>

          <Polymorphic as="input" />
          {/* @ts-expect-error - Input should not accept children */}
          <Polymorphic as="input"></Polymorphic>

          <Polymorphic as={Wrapper} />
          <Polymorphic as={Wrapper} ref={spanRef} />
          {/* @ts-expect-error - Must pass the correct ref type */}
          <Polymorphic as={Wrapper} ref={divRef} />
        </>
      );
    });
    /* eslint-enable jest/no-disabled-tests */

    test('renders as a div by default', () => {
      const { container } = render(<Polymorphic />);
      expect(container.firstElementChild).toBeInTheDocument();
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
    });

    test('passes misc. props', () => {
      const { getByTestId } = render(<Polymorphic data-testid="poly" />);
      expect(getByTestId('poly')).toBeInTheDocument();
    });

    test('renders children', () => {
      const { getByText } = render(
        <Polymorphic>
          <span>child</span>
        </Polymorphic>,
      );
      expect(getByText('child')).toBeInTheDocument();
    });

    describe('as an HTML element', () => {
      test('renders as an HTML element', () => {
        const { getByTestId } = render(
          <Polymorphic as="a" data-testid="poly" />,
        );
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('a');
      });

      test('accepts tag-specific HTML attributes', () => {
        const { getByTestId } = render(
          <Polymorphic as="a" href="mongodb.design" data-testid="poly" />,
        );
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('a');
        expect(getByTestId('poly').getAttribute('href')).toBe('mongodb.design');
      });

      test('accepts a ref', () => {
        let testRef: React.MutableRefObject<HTMLAnchorElement | undefined>;

        const TestComponent = () => {
          const myRef = React.useRef<HTMLAnchorElement>();
          testRef = myRef;
          return (
            <Polymorphic
              as="a"
              href="mongodb.design"
              ref={myRef}
              data-testid="poly"
            />
          );
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('a');
        expect(testRef!).toBeDefined();
        expect(testRef!.current).toBeDefined();
      });
    });

    describe('as a custom component', () => {
      let wrapperDidRender: jest.Mock;
      let Wrapper: React.ForwardRefExoticComponent<
        React.RefAttributes<HTMLSpanElement>
      >;

      beforeEach(() => {
        wrapperDidRender = jest.fn();
        // eslint-disable-next-line react/display-name
        Wrapper = React.forwardRef<HTMLSpanElement>(
          (
            { children, ...rest }: React.ComponentPropsWithoutRef<'span'>,
            ref,
          ) => {
            wrapperDidRender();
            return (
              <span data-testid="wrapper" {...rest} ref={ref}>
                {children}
              </span>
            );
          },
        );
      });

      test('renders as a custom component', () => {
        const { container, getByTestId } = render(<Polymorphic as={Wrapper} />);
        expect(getByTestId('wrapper')).toBeInTheDocument();
        // The root element of Polymorphic is the root span of Wrapper
        expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
        expect(wrapperDidRender).toHaveBeenCalled();
      });

      test('accepts a ref', () => {
        let testRef: React.MutableRefObject<HTMLSpanElement | undefined>;

        const TestComponent = () => {
          const myRef = React.useRef<HTMLSpanElement>();
          testRef = myRef;
          return <Polymorphic as={Wrapper} ref={myRef} data-testid="poly" />;
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('span');
        expect(wrapperDidRender).toHaveBeenCalled();
        expect(testRef!).toBeDefined();
        expect(testRef!.current).toBeDefined();
      });
    });
  });

  describe('Higher-Order Polymorphic Component', () => {
    type HOCProps<T extends React.ElementType> = PolymorphicProps<
      T,
      {
        title?: string;
      }
    >;

    const HigherOrderComponent = <T extends React.ElementType = 'div'>({
      as,
      title,
      ...rest
    }: HOCProps<T>) => {
      return (
        <Polymorphic as={as} {...rest}>
          {title}
        </Polymorphic>
      );
    };

    test('renders as a div by default & accepts custom props', () => {
      const { container, queryByText } = render(
        <HigherOrderComponent title="Some Title" />,
      );
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
      expect(queryByText('Some Title')).toBeInTheDocument();
    });

    test('renders as an HTML Element', () => {
      const { queryByTestId } = render(
        <HigherOrderComponent as="a" data-testid="hoc" />,
      );
      expect(queryByTestId('hoc')).toBeInTheDocument();
      expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('a');
    });

    test('accepts tag-specific HTML attributes', () => {
      const { getByTestId } = render(
        <HigherOrderComponent
          as="a"
          data-testid="hoc"
          href={'mongodb.design'}
        />,
      );
      expect(getByTestId('hoc').getAttribute('href')).toBe('mongodb.design');
    });

    test('renders as a custom component', () => {
      const wrapperDidRender = jest.fn();
      // eslint-disable-next-line react/display-name
      const Wrapper = React.forwardRef<HTMLSpanElement>(
        (
          { children, ...rest }: React.ComponentPropsWithoutRef<'span'>,
          ref,
        ) => {
          wrapperDidRender();
          return (
            <strong data-testid="wrapper" {...rest} ref={ref}>
              {children}
            </strong>
          );
        },
      );

      const { container, getByTestId } = render(
        <HigherOrderComponent as={Wrapper} />,
      );
      expect(getByTestId('wrapper')).toBeInTheDocument();
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('strong');
      expect(wrapperDidRender).toHaveBeenCalled();
    });
  });

  describe('Higher-Order Polymorphic Component with Ref', () => {
    type HOCProps<T extends React.ElementType> = PolymorphicPropsWithRef<
      T,
      {
        title?: string;
      }
    >;

    // eslint-disable-next-line react/display-name
    const HigherOrderWithRef = React.forwardRef(
      <T extends React.ElementType = 'div'>(
        { as, title, ...rest }: HOCProps<T>,
        ref: PolymorphicRef<T>,
      ) => {
        return (
          <Polymorphic as={as} {...rest} ref={ref}>
            {title}
          </Polymorphic>
        );
      },
    );

    test('renders as a div by default', () => {
      let testRef: React.MutableRefObject<HTMLDivElement | undefined>;

      const TestComponent = () => {
        const myRef = React.useRef<HTMLDivElement>();
        testRef = myRef;
        return <HigherOrderWithRef ref={myRef} data-testid="hoc" />;
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('hoc')).toBeInTheDocument();
      expect(getByTestId('hoc').tagName.toLowerCase()).toBe('div');
      expect(testRef!).toBeDefined();
      expect(testRef!.current).toBeDefined();
    });

    test('renders as an HTML element', () => {
      let testRef: React.MutableRefObject<HTMLAnchorElement | undefined>;

      const TestComponent = () => {
        const myRef = React.useRef<HTMLAnchorElement>();
        testRef = myRef;
        return <HigherOrderWithRef ref={myRef} as="a" data-testid="hoc" />;
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('hoc')).toBeInTheDocument();
      expect(getByTestId('hoc').tagName.toLowerCase()).toBe('a');
      expect(testRef!).toBeDefined();
      expect(testRef!.current).toBeDefined();
    });

    test('renders as a custom component', () => {
      const wrapperDidRender = jest.fn();
      // eslint-disable-next-line react/display-name
      const Wrapper = React.forwardRef<HTMLSpanElement>(
        (
          { children, ...rest }: React.ComponentPropsWithoutRef<'span'>,
          ref,
        ) => {
          wrapperDidRender();
          return (
            <span data-testid="wrapper" {...rest} ref={ref}>
              {children}
            </span>
          );
        },
      );

      let testRef: React.MutableRefObject<HTMLAnchorElement | undefined>;

      const TestComponent = () => {
        const myRef = React.useRef<HTMLAnchorElement>();
        testRef = myRef;
        return (
          <HigherOrderWithRef ref={myRef} as={Wrapper} data-testid="hoc" />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('hoc')).toBeInTheDocument();
      expect(getByTestId('hoc').tagName.toLowerCase()).toBe('span');
      expect(wrapperDidRender).toHaveBeenCalled();
      expect(testRef!).toBeDefined();
      expect(testRef!.current).toBeDefined();
    });
  });
});
