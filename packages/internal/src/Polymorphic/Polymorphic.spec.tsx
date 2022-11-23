import React from 'react';
import { parseTSDoc } from '../../../../scripts/utils/tsDocParser';
import { render } from '@testing-library/react';
import { Polymorphic, usePolymorphicRef } from '.';
import { ExampleComponent, ExampleComponentForwardRef } from './Example';

describe('packages/internal/polymorphic', () => {
  describe('Basic Polymorphic Component', () => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('Prop Types behave correctly', () => {
      const divRef = usePolymorphicRef<'div'>(); // React.useRef<HTMLDivElement | null>(null);
      const anchorRef = usePolymorphicRef<'a'>();
      const spanRef = usePolymorphicRef<'span'>();

      type WrapperProps = React.ComponentPropsWithoutRef<'span'> & {
        darkMode?: boolean;
      };

      // eslint-disable-next-line react/display-name
      const Wrapper = React.forwardRef<HTMLSpanElement, WrapperProps>(
        (
          { children, ...rest }: WrapperProps,
          ref: React.ForwardedRef<HTMLSpanElement>,
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
          <Polymorphic>some content</Polymorphic>
          <Polymorphic as="div" />
          <Polymorphic as="div" ref={divRef} />
          {/* @ts-expect-error - Must pass the correct ref type */}
          <Polymorphic as="div" ref={anchorRef} />
          <Polymorphic as="div" ref={divRef}>
            some content
          </Polymorphic>
          {/* @ts-expect-error href is not allowed on div */}
          <Polymorphic as="div" href="mongodb.design" />

          {/* @ts-expect-error - Require href when as="a" */}
          <Polymorphic as="a" />
          <Polymorphic as="a" href="mongodb.design" />
          <Polymorphic as="a" href="mongodb.design" ref={anchorRef} />
          <Polymorphic as="a" href="mongodb.design">
            some content
          </Polymorphic>

          <Polymorphic as="input" />
          {/* TODO: ts-expect-error - Input should not accept children */}
          {/* <Polymorphic as="input">some content</Polymorphic> */}

          <Polymorphic as={Wrapper} />
          <Polymorphic as={Wrapper} ref={spanRef} />
          {/* TODO: ts-expect-error - Must pass the correct ref type */}
          <Polymorphic as={Wrapper} ref={divRef} />
          <Polymorphic as={Wrapper} ref={spanRef} darkMode={true} />
          {/* @ts-expect-error - Theme is not a prop on Wrapper */}
          <Polymorphic as={Wrapper} ref={spanRef} theme={'dark'} />
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
          <Polymorphic as="a" href="mongodb.design" data-testid="poly" />,
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
        let testRef: React.MutableRefObject<HTMLAnchorElement | null>;

        const TestComponent = () => {
          const myRef = React.useRef<HTMLAnchorElement | null>(null);
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
      test('renders as a custom component', () => {
        const { Wrapper, wrapperDidRender } = makeWrapperComponent();
        const { container, getByTestId } = render(<Polymorphic as={Wrapper} />);
        expect(getByTestId('wrapper')).toBeInTheDocument();
        // The root element of Polymorphic is the root span of Wrapper
        expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
        expect(wrapperDidRender).toHaveBeenCalled();
      });

      test('accepts a ref', () => {
        const { Wrapper, wrapperDidRender } = makeWrapperComponent();

        let testRef: React.MutableRefObject<HTMLSpanElement | null>;

        const TestComponent = () => {
          const myRef = React.useRef<HTMLSpanElement | null>(null);
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
    test('renders as a div by default & accepts custom props', () => {
      const { container, queryByText } = render(
        <ExampleComponent title="Some Title" />,
      );
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
      expect(queryByText('Some Title')).toBeInTheDocument();
    });

    test('renders as an HTML Element', () => {
      const { queryByTestId } = render(
        <ExampleComponent as="a" data-testid="hoc" href="mongodb.design" />,
      );
      expect(queryByTestId('hoc')).toBeInTheDocument();
      expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('a');
    });

    test('accepts tag-specific HTML attributes', () => {
      const { getByTestId } = render(
        <ExampleComponent as="a" data-testid="hoc" href={'mongodb.design'} />,
      );
      expect(getByTestId('hoc').getAttribute('href')).toBe('mongodb.design');
    });

    test('renders as a custom component', () => {
      const { wrapperDidRender, Wrapper } = makeWrapperComponent();

      const { container, getByTestId } = render(
        <ExampleComponent as={Wrapper} />,
      );
      expect(getByTestId('wrapper')).toBeInTheDocument();
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
      expect(wrapperDidRender).toHaveBeenCalled();
    });
  });

  describe('Higher-Order Polymorphic Component with Ref', () => {
    test('renders as a div by default', () => {
      let testRef: React.MutableRefObject<HTMLDivElement | undefined>;

      const TestComponent = () => {
        const myRef = React.useRef<HTMLDivElement>();
        testRef = myRef;
        return <ExampleComponentForwardRef ref={myRef} data-testid="hoc" />;
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
        return (
          <ExampleComponentForwardRef ref={myRef} as="a" data-testid="hoc" />
        );
      };

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('hoc')).toBeInTheDocument();
      expect(getByTestId('hoc').tagName.toLowerCase()).toBe('a');
      expect(testRef!).toBeDefined();
      expect(testRef!.current).toBeDefined();
    });

    test('renders as a custom component', () => {
      const { Wrapper, wrapperDidRender } = makeWrapperComponent();

      let testRef: React.MutableRefObject<HTMLAnchorElement | undefined>;

      const TestComponent = () => {
        const myRef = React.useRef<HTMLAnchorElement>();
        testRef = myRef;
        return (
          <ExampleComponentForwardRef
            ref={myRef}
            as={Wrapper}
            data-testid="hoc"
          />
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

  describe('TSDoc output', () => {
    const docs = parseTSDoc('internal/src/Polymorphic/Example');

    test('Docs for test components is generated', () => {
      const componentNames = docs?.map(doc => doc.displayName);
      expect(componentNames).toContain('ExampleComponent');
      expect(componentNames).toContain('ExampleComponentForwardRef');
    });

    describe.each(['ExampleComponent', 'ExampleComponentForwardRef'])(
      'Docs for test components contain the expected props',
      displayName => {
        test(`${displayName}`, () => {
          const doc = docs?.find(doc => doc.displayName === displayName);
          expect(doc).not.toBeUndefined();
          expect(doc!.props).toHaveProperty('AsProp');
          expect(doc!.props).toHaveProperty(`${displayName}Props`);
          expect(doc!.props).toHaveProperty('AriaAttributes');
          expect(doc!.props).toHaveProperty('DOMAttributes');
        });
      },
    );
  });
});

/** Test utility functions */
function makeWrapperComponent(): {
  Wrapper: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLSpanElement>
  >;
  wrapperDidRender: jest.Mock;
} {
  const wrapperDidRender = jest.fn();
  // eslint-disable-next-line react/display-name
  const Wrapper = React.forwardRef<HTMLSpanElement>(
    ({ children, ...rest }: React.ComponentPropsWithoutRef<'span'>, ref) => {
      wrapperDidRender();
      return (
        <span data-testid="wrapper" {...rest} ref={ref}>
          {children}
        </span>
      );
    },
  );

  return {
    Wrapper,
    wrapperDidRender,
  };
}
