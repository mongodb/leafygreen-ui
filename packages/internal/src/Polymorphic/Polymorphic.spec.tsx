import React from 'react';
import { parseTSDoc } from '../../../../scripts/utils/tsDocParser';
import { render } from '@testing-library/react';
import { Polymorphic, usePolymorphicRef } from '.';
import {
  ExampleComponent,
  ExampleForwardRef,
  ExampleForwardRefWithHook,
  ExampleWithHook,
  RestrictedExample,
} from './Example';

describe('packages/internal/polymorphic', () => {
  describe('Basic Polymorphic Component', () => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('Prop Types behave correctly', () => {
      const { Wrapper } = makeWrapperComponent();
      const divRef = usePolymorphicRef<'div'>(); // React.useRef<HTMLDivElement | null>(null);
      const anchorRef = usePolymorphicRef<'a'>();
      const spanRef = usePolymorphicRef<'span'>();

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
        <Polymorphic key="some-key" />
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
      </>;
    });
    /* eslint-enable jest/no-disabled-tests */

    test.todo('Renders with `styled` API');

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

  describe.each([
    ExampleComponent,
    ExampleWithHook,
    ExampleForwardRef,
    ExampleForwardRefWithHook,
  ])('Higher-Order Polymorphic Components', ExampleComponent => {
    test(`displayName is defined for ${ExampleComponent.displayName!}`, () => {
      expect(ExampleComponent.displayName).not.toBeUndefined();
    });

    describe(`${ExampleComponent.displayName!}`, () => {
      test('renders as a div by default & accepts custom props', () => {
        const { container, queryByText } = render(
          <ExampleComponent title="Some Title" />,
        );
        expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
        expect(queryByText('Some Title')).toBeInTheDocument();
      });

      test('renders as an HTML Element', () => {
        const { queryByTestId } = render(
          <ExampleComponent as="span" data-testid="hoc" />,
        );
        expect(queryByTestId('hoc')).toBeInTheDocument();
        expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('span');
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
  });

  test('`as` type can be restricted', () => {
    const { getByTestId } = render(
      <RestrictedExample as="button" data-testid="restricted" />,
    );
    expect(getByTestId('restricted')).toBeInTheDocument();

    render(
      // @ts-expect-error - can't be a div
      <RestrictedExample as="div" />,
    );
  });

  describe.each([ExampleForwardRef, ExampleForwardRefWithHook])(
    'Higher-Order Polymorphic Components with Ref',
    ExampleComponent => {
      describe(`${ExampleComponent.displayName!}`, () => {
        test('ref is defined with default props', () => {
          let testRef: React.MutableRefObject<HTMLDivElement | null>;

          const TestComponent = () => {
            const myRef = usePolymorphicRef<'div'>();
            testRef = myRef;
            return <ExampleComponent ref={myRef} data-testid="hoc" />;
          };

          const { getByTestId } = render(<TestComponent />);
          expect(getByTestId('hoc')).toBeInTheDocument();
          expect(getByTestId('hoc').tagName.toLowerCase()).toBe('div');
          expect(testRef!).toBeDefined();
          expect(testRef!.current).toBeDefined();
        });

        test('ref is defined as an HTML element', () => {
          let testRef: React.MutableRefObject<HTMLAnchorElement | null>;

          const TestComponent = () => {
            const myRef = usePolymorphicRef<'a'>();
            testRef = myRef;
            return (
              <ExampleComponent
                ref={myRef}
                as="a"
                href="mongodb.design"
                data-testid="hoc"
              />
            );
          };

          const { getByTestId } = render(<TestComponent />);
          expect(getByTestId('hoc')).toBeInTheDocument();
          expect(getByTestId('hoc').tagName.toLowerCase()).toBe('a');
          expect(testRef!).toBeDefined();
          expect(testRef!.current).toBeDefined();
        });

        test('ref is defined as a custom component', () => {
          const { Wrapper, wrapperDidRender } = makeWrapperComponent();

          let testRef: React.MutableRefObject<HTMLAnchorElement | null>;

          const TestComponent = () => {
            const myRef = usePolymorphicRef<'a'>();
            testRef = myRef;
            return (
              <ExampleComponent ref={myRef} as={Wrapper} data-testid="hoc" />
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
    },
  );

  describe('TSDoc output', () => {
    describe('Polymorphic', () => {
      const docs = parseTSDoc('internal/src/Polymorphic');

      test('Docs for Polymorphic are generated', () => {
        const doc = docs?.find(doc => doc.displayName === 'Polymorphic');
        expect(doc).not.toBeUndefined();
        expect(doc!.props).toHaveProperty('AsProp');
        expect(doc!.props).toHaveProperty(`PolymorphicProps`);
        expect(doc!.props).toHaveProperty('AriaAttributes');
        expect(doc!.props).toHaveProperty('DOMAttributes');
      });
    });

    /**
     * Ensure that any components that build on top of Polymorphic
     * also generate TSDoc
     */
    describe('Higher-Order components', () => {
      const docs = parseTSDoc('internal/src/Polymorphic/Example');

      const exampleComponentNames = [
        'ExampleComponent',
        'ExampleWithHook',
        'ExampleForwardRef',
        'ExampleForwardRefWithHook',
      ];

      describe.each(exampleComponentNames)(
        'Docs for test components',
        displayName => {
          test(`${displayName} docs exist`, () => {
            const doc = docs?.find(doc => doc.displayName === displayName);
            expect(doc).not.toBeUndefined();
          });

          test(`${displayName} docs contain the expected props`, () => {
            const doc = docs?.find(doc => doc.displayName === displayName);
            expect(doc!.props).toHaveProperty('AsProp');
            // expect(doc!.props).toHaveProperty(`${displayName}Props`);
            expect(doc!.props).toHaveProperty(`BaseExampleProps`);
            expect(doc!.props).toHaveProperty('AriaAttributes');
            expect(doc!.props).toHaveProperty('DOMAttributes');
          });
        },
      );
    });
  });
});

/** Test utility functions */
type WrapperProps = React.ComponentPropsWithoutRef<'span'> & {
  darkMode?: boolean;
};
function makeWrapperComponent(): {
  Wrapper: React.ForwardRefExoticComponent<
    WrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
  wrapperDidRender: jest.Mock;
} {
  const wrapperDidRender = jest.fn();

  const Wrapper = React.forwardRef<HTMLSpanElement, WrapperProps>(
    ({ children, ...rest }: WrapperProps, ref) => {
      wrapperDidRender();
      return (
        <span data-testid="wrapper" {...rest} ref={ref}>
          {children}
        </span>
      );
    },
  );

  Wrapper.displayName = 'Wrapper';

  return {
    Wrapper,
    wrapperDidRender,
  };
}
