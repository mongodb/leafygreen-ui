import React from 'react';
import styled from '@emotion/styled';
import { parseTSDoc } from '@lg-tools/build/src/tsdoc/tsdocParser';
import { render } from '@testing-library/react';

import { makeWrapperComponent } from '../utils/Polymorphic.testutils';

import { Polymorph, type PolymorphicComponentType, usePolymorphicRef } from '.';

describe('packages/polymorphic', () => {
  describe('Basic Polymorphic Component', () => {
    /* eslint-disable jest/no-disabled-tests */
    test.skip('TypeScript types for Props are correct', () => {
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

    test.skip('Typescript allows `propTypes` attribute', () => {
      Polymorph.propTypes;
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
        `;

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

      /* eslint-disable jest/no-disabled-tests */
      test.skip('TypeScript types are still correct using Styled ', () => {
        const StyledPolymorph = styled(Polymorph)`
          color: #ff69b4;
        ` as PolymorphicComponentType;

        const { Wrapper } = makeWrapperComponent();
        const divRef = usePolymorphicRef<'div'>();
        const anchorRef = usePolymorphicRef<'a'>();
        const spanRef = usePolymorphicRef<'span'>();

        <>
          <StyledPolymorph />
          <StyledPolymorph>some content</StyledPolymorph>
          <StyledPolymorph as="div" />
          <StyledPolymorph as="div" ref={divRef} />
          {/* @ts-expect-error - Must pass the correct ref type */}
          <StyledPolymorph as="div" ref={anchorRef} />
          <StyledPolymorph as="div" ref={divRef}>
            some content
          </StyledPolymorph>
          <StyledPolymorph key="some-key" />
          {/* @ts-expect-error href is not allowed on explicit div */}
          <StyledPolymorph as="div" href="mongodb.design" />

          {/* @ts-expect-error - Require href when as="a" */}
          <StyledPolymorph as="a" />
          <StyledPolymorph as="a" href="mongodb.design" />
          <StyledPolymorph as="a" href="mongodb.design" ref={anchorRef} />
          <StyledPolymorph as="a" href="mongodb.design">
            some content
          </StyledPolymorph>

          <StyledPolymorph as="input" />

          <StyledPolymorph as={Wrapper} />
          <StyledPolymorph as={Wrapper} ref={spanRef} />
          <StyledPolymorph as={Wrapper} ref={spanRef} darkMode={true} />
          {/* @ts-expect-error - Theme is not a prop on Wrapper */}
          <StyledPolymorph as={Wrapper} ref={spanRef} theme={'dark'} />
        </>;
      });
      /* eslint-enable jest/no-disabled-tests */
    });

    // TODO: Waiting on https://jira.mongodb.org/browse/LG-2733
    test.todo('Passes the `expect.toBePolymorphic` rule');
  });

  // FIXME: update this test to use the new TSDoc parser api
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('TSDoc output', () => {
    describe('Polymorphic', () => {
      const docs = parseTSDoc(__dirname);

      test('Docs for Polymorphic are generated', () => {
        const doc = docs?.find(doc => doc.displayName === 'Polymorph');
        expect(doc).not.toBeUndefined();
        expect(doc!.props).toHaveProperty('AsProp');
        expect(doc!.props).toHaveProperty(`PolymorphProps`);
        expect(doc!.props).toHaveProperty('AriaAttributes');
        expect(doc!.props).toHaveProperty('DOMAttributes');
      });
    });
  });
});
