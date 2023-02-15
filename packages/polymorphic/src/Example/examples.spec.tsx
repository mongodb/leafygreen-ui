import React from 'react';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';

import { parseTSDoc } from '../../../../scripts/utils/tsDocParser';
import { InferredPolymorphicComponentType } from '../InferredPolymorphic';
import { makeWrapperComponent } from '../utils/Polymorphic.testutils';
import { type PolymorphicComponentType, usePolymorphicRef } from '..';

import {
  AdvancedPolymorphic,
  AdvancedPolymorphicWithRef,
  ExampleInferred,
  ExampleInferredDefaultButton,
  ExamplePolymorphic,
  ExamplePolymorphicWithRef,
  RestrictedExample,
} from '.';

/**
 * Here we test Example Higher-order components
 * and ensure Polymorphic behavior is properly extendable
 */

describe('Polymorphic/Example Higher-order Components', () => {
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

  describe('Higher-Order Inferred Polymorph', () => {
    test('renders as an anchor if only href is provided', () => {
      const { queryByTestId } = render(
        <ExampleInferred href="mongodb.design" data-testid="hoc" />,
      );
      expect(queryByTestId('hoc')).toBeInTheDocument();
      expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('a');
      expect(queryByTestId('hoc')).toHaveAttribute('href', 'mongodb.design');
    });

    test('works with `styled`', () => {
      const StyledExample = styled(ExampleInferred)`
        color: #ff69b4;
      ` as InferredPolymorphicComponentType;

      const { getByTestId } = render(
        <StyledExample href="mongodb.design" data-testid="styled">
          Some text
        </StyledExample>,
      );
      expect(getByTestId('styled')).toBeInTheDocument();
      expect(getByTestId('styled').tagName.toLowerCase()).toBe('a');
      expect(getByTestId('styled')).toHaveAttribute('href', 'mongodb.design');
      expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
    });

    test('Works with a default, and sets default props', () => {
      const { queryByTestId } = render(
        <ExampleInferredDefaultButton data-testid="hoc" name="foobar" />,
      );
      expect(queryByTestId('hoc')).toBeInTheDocument();
      expect(queryByTestId('hoc')?.tagName.toLowerCase()).toBe('button');
      expect(queryByTestId('hoc')).toHaveAttribute('name', 'foobar');
    });
  });

  describe.each([
    ExamplePolymorphic,
    ExamplePolymorphicWithRef,
    ExampleInferred,
    AdvancedPolymorphic,
    AdvancedPolymorphicWithRef,
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

        test('With styled props', () => {
          // We need to define the additional props that styled should expect
          interface StyledProps {
            color: string;
            size: string;
          }

          const StyledExample = styled(ExampleComponent)<StyledProps>`
            color: ${props => props.color};
            font-size: ${props => props.size}px;
          `;

          const { getByTestId } = render(
            <StyledExample
              title="Title"
              data-testid="styled"
              color="#ff69b4"
              size="16"
            >
              Some text
            </StyledExample>,
          );
          expect(getByTestId('styled')).toBeInTheDocument();
          expect(getByTestId('styled').tagName.toLowerCase()).toBe('div');
          expect(getByTestId('styled')).toHaveStyle(`color: #ff69b4;`);
          expect(getByTestId('styled')).toHaveStyle(`font-size: 16px;`);
        });
      });
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

  /**
   * Ensure that any components that build on top of Polymorphic
   * also generate TSDoc
   */
  describe('TSDoc output', () => {
    const docs = parseTSDoc('polymorphic/src/Example', {
      excludeTags: [], // Include all tags
    });

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
