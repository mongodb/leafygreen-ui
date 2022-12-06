import React from 'react';
import { parseTSDoc } from '../../../scripts/utils/tsDocParser';
import { render } from '@testing-library/react';
import styled from '@emotion/styled';
import { Polymorph, usePolymorphicRef, type PolymorphicComponentType } from '.';
import {
  ExamplePolymorphic,
  ExamplePolymorphicWithRef,
  ExampleInferred,
  AdvancedPolymorphic,
  AdvancedPolymorphicWithRef,
  RestrictedExample,
} from './Example';
import { makeWrapperComponent } from './utils/Polymorphic.testutils';

describe('packages/polymorphic', () => {
  describe('Basic Polymorphic Component', () => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('Prop Types behave correctly', () => {
      const { Wrapper } = makeWrapperComponent();
      const divRef = usePolymorphicRef<'div'>();
      const anchorRef = usePolymorphicRef<'a'>();
      const spanRef = usePolymorphicRef<'span'>();

      <>
        <Polymorph />
        <Polymorph>some content</Polymorph>
        <Polymorph as="div" />
        <Polymorph as="div" ref={divRef} />
        {/* @ts-expect-error - Must pass the correct ref type */}
        <Polymorph as="div" ref={anchorRef} />
        <Polymorph as="div" ref={divRef}>
          some content
        </Polymorph>
        <Polymorph key="some-key" />
        {/* @ts-expect-error href is not allowed on explicit div */}
        <Polymorph as="div" href="mongodb.design" />

        {/* @ts-expect-error - Require href when as="a" */}
        <Polymorph as="a" />
        <Polymorph as="a" href="mongodb.design" />
        <Polymorph as="a" href="mongodb.design" ref={anchorRef} />
        <Polymorph as="a" href="mongodb.design">
          some content
        </Polymorph>

        <Polymorph as="input" />

        <Polymorph as={Wrapper} />
        <Polymorph as={Wrapper} ref={spanRef} />
        <Polymorph as={Wrapper} ref={spanRef} darkMode={true} />
        {/* @ts-expect-error - Theme is not a prop on Wrapper */}
        <Polymorph as={Wrapper} ref={spanRef} theme={'dark'} />
      </>;
    });
    /* eslint-enable jest/no-disabled-tests */

    test('renders as a div by default', () => {
      const { container } = render(<Polymorph />);
      expect(container.firstElementChild).toBeInTheDocument();
      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
    });

    test('passes misc. props', () => {
      const { getByTestId } = render(<Polymorph data-testid="poly" />);
      expect(getByTestId('poly')).toBeInTheDocument();
    });

    test('renders children', () => {
      const { getByText } = render(
        <Polymorph>
          <span>child</span>
        </Polymorph>,
      );
      expect(getByText('child')).toBeInTheDocument();
    });

    describe('as an HTML element', () => {
      test('renders as an HTML element', () => {
        const { getByTestId } = render(
          <Polymorph as="a" href="mongodb.design" data-testid="poly" />,
        );
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('a');
      });

      test('accepts tag-specific HTML attributes', () => {
        const { getByTestId } = render(
          <Polymorph as="a" href="mongodb.design" data-testid="poly" />,
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
            <Polymorph
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
        const { container, getByTestId } = render(<Polymorph as={Wrapper} />);
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
          return <Polymorph as={Wrapper} ref={myRef} data-testid="poly" />;
        };

        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('poly')).toBeInTheDocument();
        expect(getByTestId('poly').tagName.toLowerCase()).toBe('span');
        expect(wrapperDidRender).toHaveBeenCalled();
        expect(testRef!).toBeDefined();
        expect(testRef!.current).toBeDefined();
      });
    });

    describe('With Emotion `styled` API', () => {
      test('Basic styled component', () => {
        const StyledPolymorph = styled(Polymorph)`
          color: #ff69b4;
        ` as PolymorphicComponentType;

        const { getByTestId } = render(
          <StyledPolymorph data-testid="styled">Some text</StyledPolymorph>,
        );
        expect(getByTestId('styled')).toBeInTheDocument();
        expect(getByTestId('styled').tagName.toLowerCase()).toBe('div');
        expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
      });

      test('as an HTML element', () => {
        const StyledPolymorph = styled(Polymorph)`
          color: #ff69b4;
        ` as PolymorphicComponentType;

        const { getByTestId } = render(
          <StyledPolymorph
            as="a"
            href="mongodb.design"
            target="_blank"
            data-testid="styled"
          >
            Some text
          </StyledPolymorph>,
        );
        expect(getByTestId('styled')).toBeInTheDocument();
        expect(getByTestId('styled').tagName.toLowerCase()).toBe('a');
        expect(getByTestId('styled')).toHaveAttribute('href', 'mongodb.design');
        expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
      });

      test('as a custom component', () => {
        const { Wrapper } = makeWrapperComponent();
        const StyledPolymorph = styled(Polymorph)`
          color: #ff69b4;
        ` as PolymorphicComponentType;
        const { getByTestId } = render(
          <StyledPolymorph as={Wrapper} data-testid="styled">
            Some text
          </StyledPolymorph>,
        );

        expect(getByTestId('styled')).toBeInTheDocument();
        expect(getByTestId('styled').tagName.toLowerCase()).toBe('span');
        expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
      });
    });

    test('Passes the `expect.toBePolymorphic` rule', () => {
      expect(Polymorph).toBePolymorphic();
    });
  });

  describe.each([
    ExamplePolymorphic,
    ExamplePolymorphicWithRef,
    ExampleInferred,
    AdvancedPolymorphic,
    AdvancedPolymorphicWithRef,
  ])('Higher-Order Polymorphic Components', ExampleComponent => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('Prop Types behave correctly', () => {
      const { Wrapper } = makeWrapperComponent();
      const divRef = usePolymorphicRef<'div'>(); // React.useRef<HTMLDivElement | null>(null);
      const anchorRef = usePolymorphicRef<'a'>();
      const spanRef = usePolymorphicRef<'span'>();

      <>
        <ExampleComponent />
        <ExampleComponent>some content</ExampleComponent>
        <ExampleComponent as="div" />
        <ExampleComponent as="div" ref={divRef} />
        {/* @ts-expect-error - Must pass the correct ref type */}
        <ExampleComponent as="div" ref={anchorRef} />
        <ExampleComponent as="div" ref={divRef}>
          some content
        </ExampleComponent>
        <ExampleComponent key="some-key" />

        {/* @ts-expect-error - Require href when as="a" */}
        <ExampleComponent as="a" />
        <ExampleComponent as="a" href="mongodb.design" />
        <ExampleComponent as="a" href="mongodb.design" ref={anchorRef} />
        <ExampleComponent as="a" href="mongodb.design">
          some content
        </ExampleComponent>

        {/* @ts-expect-error href is not allowed on explicit div */}
        <ExampleComponent as="div" href="mongodb.design" />

        <ExampleComponent as="input" />
        {/* TODO: ts-expect-error - Input should not accept children */}
        {/* <ExampleComponent as="input">some content</ExampleComponent> */}

        <ExampleComponent as={Wrapper} />
        <ExampleComponent as={Wrapper} ref={spanRef} />
        {/* TODO: ts-expect-error - Must pass the correct ref type */}
        <ExampleComponent as={Wrapper} ref={divRef} />
        <ExampleComponent as={Wrapper} ref={spanRef} darkMode={true} />
        {/* @ts-expect-error - Theme is not a prop on Wrapper */}
        <ExampleComponent as={Wrapper} ref={spanRef} theme={'dark'} />
      </>;
    });
    /* eslint-enable jest/no-disabled-tests */

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
          <ExampleComponent as="span" data-testid="hoc" title="Title" />,
        );
        expect(queryByTestId('hoc')).toBeInTheDocument();
        expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('span');
      });

      test('accepts tag-specific HTML attributes', () => {
        const { getByTestId } = render(
          <ExampleComponent
            as="a"
            data-testid="hoc"
            href={'mongodb.design'}
            title="Title"
          />,
        );
        expect(getByTestId('hoc').getAttribute('href')).toBe('mongodb.design');
      });

      test('renders as a custom component', () => {
        const { wrapperDidRender, Wrapper } = makeWrapperComponent();
        const { container, getByTestId } = render(
          <ExampleComponent as={Wrapper} title="Title" />,
        );
        expect(getByTestId('wrapper')).toBeInTheDocument();
        expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
        expect(wrapperDidRender).toHaveBeenCalled();
      });

      describe('With Emotion `styled` API', () => {
        test('Basic styled component', () => {
          const StyledExample = styled(ExampleComponent)`
            color: #ff69b4;
          `;

          const { getByTestId } = render(
            <StyledExample title="Title" data-testid="styled">
              Some text
            </StyledExample>,
          );
          expect(getByTestId('styled')).toBeInTheDocument();
          expect(getByTestId('styled').tagName.toLowerCase()).toBe('div');
          expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
        });

        test('as an HTML element', () => {
          const StyledExample = styled(ExampleComponent)`
            color: #ff69b4;
          ` as PolymorphicComponentType;

          const { getByTestId } = render(
            <StyledExample
              as="a"
              href="mongodb.design"
              title="Title"
              data-testid="styled"
            >
              Some text
            </StyledExample>,
          );
          expect(getByTestId('styled')).toBeInTheDocument();
          expect(getByTestId('styled').tagName.toLowerCase()).toBe('a');
          expect(getByTestId('styled')).toHaveAttribute(
            'href',
            'mongodb.design',
          );
          expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
        });

        test('as a custom component', () => {
          const { Wrapper } = makeWrapperComponent();
          const StyledExample = styled(ExampleComponent)`
            color: #ff69b4;
          ` as PolymorphicComponentType;
          const { getByTestId } = render(
            <StyledExample as={Wrapper} title="Title" data-testid="styled">
              Some text
            </StyledExample>,
          );

          expect(getByTestId('styled')).toBeInTheDocument();
          expect(getByTestId('styled').tagName.toLowerCase()).toBe('span');
          expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
        });
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

  describe('Higher-Order Implicit Polymorph', () => {
    test('renders as an anchor if only href is provided', () => {
      const { queryByTestId } = render(
        <ExampleInferred href="mongodb.design" data-testid="hoc" />,
      );
      expect(queryByTestId('hoc')).toBeInTheDocument();
      expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('a');
      expect(queryByTestId('hoc')).toHaveAttribute('href', 'mongodb.design');
    });
  });

  describe.each([ExamplePolymorphicWithRef, AdvancedPolymorphicWithRef])(
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
      const docs = parseTSDoc('polymorphic/src');

      test('Docs for Polymorphic are generated', () => {
        const doc = docs?.find(doc => doc.displayName === 'Polymorph');
        expect(doc).not.toBeUndefined();
        expect(doc!.props).toHaveProperty('AsProp');
        expect(doc!.props).toHaveProperty(`PolymorphProps`);
        expect(doc!.props).toHaveProperty('AriaAttributes');
        expect(doc!.props).toHaveProperty('DOMAttributes');
      });
    });

    /**
     * Ensure that any components that build on top of Polymorphic
     * also generate TSDoc
     */
    describe('Higher-Order components', () => {
      const docs = parseTSDoc('polymorphic/src/Example');

      const exampleComponentNames = [
        'ExamplePolymorphic',
        'ExamplePolymorphicWithRef',
        'AdvancedPolymorphic',
        'AdvancedPolymorphicWithRef',
        // 'StyledExample', // Styled does not work with TSDoc
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
            expect(doc!.props).toHaveProperty(`ExampleProps`);
            expect(doc!.props).toHaveProperty('AriaAttributes');
            expect(doc!.props).toHaveProperty('DOMAttributes');
          });
        },
      );
    });
  });
});
