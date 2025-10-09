import React, { createRef, forwardRef, memo } from 'react';
import { render } from '@testing-library/react';

import { CompoundSubComponent } from './SubComponent';
import { CompoundComponent } from '.';

describe('packages/compound-component', () => {
  describe('SubComponent', () => {
    test('renders basic sub-component', () => {
      // A component created with the CompoundSubComponent factory renders, and has the given property
      const TestSubComponent = CompoundSubComponent(
        () => <div data-testid="sub-component">Sub Component</div>,
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      // Test that the component renders
      const { getByTestId } = render(<TestSubComponent />);
      expect(getByTestId('sub-component')).toBeInTheDocument();

      // Test that it has the given property
      expect(TestSubComponent.isTestSubComponent).toBe(true);
      expect(TestSubComponent.displayName).toBe('TestSubComponent');
    });

    test('does not have the property "key"', () => {
      const TestSubComponent = CompoundSubComponent(
        () => <div>Sub Component</div>,
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      // The "key" property should not be exposed on the component
      expect(TestSubComponent).not.toHaveProperty('key');
    });

    test('accepts props', () => {
      // Create a subcomponent that renders a prop value
      const TestSubComponent = CompoundSubComponent(
        ({ label }: { label: string }) => (
          <div data-testid="sub-component">{label}</div>
        ),
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      const { getByTestId } = render(<TestSubComponent label="Hello World" />);
      expect(getByTestId('sub-component')).toHaveTextContent('Hello World');
    });

    test('renders sub-component with forwarded ref', () => {
      // A component created with the CompoundSubComponent factory renders, and has the given property
      const TestSubComponent = CompoundSubComponent(
        // eslint-disable-next-line react/display-name
        forwardRef<HTMLDivElement, { label: string }>(({ label }, ref) => (
          <div ref={ref} data-testid="sub-component">
            {label}
          </div>
        )),
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      // Test that the component renders
      const testRef = createRef<HTMLDivElement>();
      const { getByTestId } = render(
        <TestSubComponent label="Hello World" ref={testRef} />,
      );

      expect(getByTestId('sub-component')).toHaveTextContent('Hello World');
      expect(testRef.current).toBe(getByTestId('sub-component'));
    });

    test('renders memo sub-component', () => {
      // A component created with the CompoundSubComponent factory renders, and has the given property
      const TestSubComponent = CompoundSubComponent(
        // eslint-disable-next-line react/display-name
        memo(({ label }: { label: string }) => (
          <div data-testid="sub-component">{label}</div>
        )),
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      // Test that the component renders
      const { getByTestId } = render(<TestSubComponent label="Hello World" />);
      expect(getByTestId('sub-component')).toHaveTextContent('Hello World');
    });
  });

  describe('CompoundComponent', () => {
    test('renders compound component without sub-components', () => {
      // A component created with the CompoundComponent factory renders
      const TestComponent = CompoundComponent(
        () => <div data-testid="main-component">Main Component</div>,
        {
          displayName: 'TestComponent',
        },
      );

      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('main-component')).toBeInTheDocument();
      expect(TestComponent.displayName).toBe('TestComponent');
    });

    test('renders compound props', () => {
      // A component created with the CompoundComponent factory renders
      const TestComponent = CompoundComponent(
        ({ label }: { label: string }) => (
          <div data-testid="main-component">{label}</div>
        ),
        {
          displayName: 'TestComponent',
        },
      );

      const { getByTestId } = render(<TestComponent label="Hello World" />);
      expect(getByTestId('main-component')).toHaveTextContent('Hello World');
    });

    test('renders compound component with forwarded ref', () => {
      // A component created with the CompoundComponent factory renders
      const TestComponent = CompoundComponent(
        // eslint-disable-next-line react/display-name
        forwardRef<HTMLDivElement>((props, ref) => (
          <div ref={ref} data-testid="main-component">
            Main Component
          </div>
        )),
        {
          displayName: 'TestComponent',
        },
      );

      const testRef = createRef<HTMLDivElement>();
      const { getByTestId } = render(<TestComponent ref={testRef} />);
      expect(testRef.current).toBe(getByTestId('main-component'));
    });

    test('renders memo compound component', () => {
      // A component created with the CompoundComponent factory renders
      const TestComponent = CompoundComponent(
        // eslint-disable-next-line react/display-name
        memo(({ label }: { label: string }) => (
          <div data-testid="main-component">{label}</div>
        )),
        {
          displayName: 'TestComponent',
        },
      );

      const { getByTestId } = render(<TestComponent label="Hello World" />);
      expect(getByTestId('main-component')).toHaveTextContent('Hello World');
    });

    test('one sub-component', () => {
      // renders parent, and has the subcomponent property. Subcomponent renders
      const TestSubComponent = CompoundSubComponent(
        () => <div data-testid="sub-component">Sub Component</div>,
        {
          displayName: 'TestSubComponent',
          key: 'isTestSubComponent',
        },
      );

      const TestComponent = CompoundComponent(
        () => <div data-testid="main-component">Main Component</div>,
        {
          displayName: 'TestComponent',
          SubComponent: TestSubComponent,
        },
      );

      // Test that parent renders
      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('main-component')).toBeInTheDocument();

      // Test that it has the subcomponent property
      expect(TestComponent.SubComponent).toBe(TestSubComponent);

      // Test that subcomponent renders
      const { getByTestId: getSubTestId } = render(
        <TestComponent.SubComponent />,
      );
      expect(getSubTestId('sub-component')).toBeInTheDocument();
    });

    test('multiple sub-components', () => {
      // renders parent, and has all subcomponent properties. All Subcomponents render
      const FirstSubComponent = CompoundSubComponent(
        () => <div data-testid="first-sub">First Sub</div>,
        {
          displayName: 'FirstSubComponent',
          key: 'isFirstSub',
        },
      );

      const SecondSubComponent = CompoundSubComponent(
        () => <div data-testid="second-sub">Second Sub</div>,
        {
          displayName: 'SecondSubComponent',
          key: 'isSecondSub',
        },
      );

      const TestComponent = CompoundComponent(
        () => <div data-testid="main-component">Main Component</div>,
        {
          displayName: 'TestComponent',
          First: FirstSubComponent,
          Second: SecondSubComponent,
        },
      );

      // Test that parent renders
      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('main-component')).toBeInTheDocument();

      // Test that it has all subcomponent properties
      expect(TestComponent.First).toBe(FirstSubComponent);
      expect(TestComponent.Second).toBe(SecondSubComponent);

      // Test that all subcomponents render
      const { getByTestId: getFirstTestId } = render(<TestComponent.First />);
      expect(getFirstTestId('first-sub')).toBeInTheDocument();

      const { getByTestId: getSecondTestId } = render(<TestComponent.Second />);
      expect(getSecondTestId('second-sub')).toBeInTheDocument();
    });
  });
});
