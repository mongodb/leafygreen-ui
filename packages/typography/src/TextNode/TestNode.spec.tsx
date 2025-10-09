import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TextNode } from './TextNode';

describe('packages/typography/TextNode', () => {
  describe('when children is a string', () => {
    test('renders string children wrapped in Polymorph component', () => {
      render(<TextNode>Test string content</TextNode>);
      expect(screen.getByText('Test string content')).toBeInTheDocument();
    });

    test('renders as a div by default', () => {
      render(<TextNode>Test string content</TextNode>);
      expect(
        screen.getByText('Test string content').tagName.toLowerCase(),
      ).toEqual('div');
    });

    test('renders with HTML element', () => {
      const { container } = render(
        <TextNode as="p">Test paragraph content</TextNode>,
      );
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Test paragraph content');
    });

    test('renders as React component', () => {
      const Wrapper = ({ children }: PropsWithChildren<{}>) => (
        <div data-testid="wrapper">{children}</div>
      );
      const { container } = render(
        <TextNode as={Wrapper}>Test paragraph content</TextNode>,
      );
      const wrapperEl = screen.getByTestId('wrapper');
      expect(wrapperEl).toBeInTheDocument();
    });
  });

  describe('when children is a React node', () => {
    test('renders React node children directly without wrapping', () => {
      const testContent = (
        <div data-testid="test-div">
          <span>Nested content</span>
        </div>
      );

      render(<TextNode>{testContent}</TextNode>);

      expect(screen.getByTestId('test-div')).toBeInTheDocument();
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    test('renders multiple React node children', () => {
      render(
        <TextNode>
          <span data-testid="first-span">First</span>
          <span data-testid="second-span">Second</span>
        </TextNode>,
      );

      expect(screen.getByTestId('first-span')).toBeInTheDocument();
      expect(screen.getByTestId('second-span')).toBeInTheDocument();
    });

    test('ignores as prop when children is not a string', () => {
      const { container } = render(
        <TextNode as="p">
          <div data-testid="test-div">React node content</div>
        </TextNode>,
      );

      // Should not create a paragraph wrapper
      expect(container.querySelector('p')).not.toBeInTheDocument();
      // Should render the div directly
      expect(screen.getByTestId('test-div')).toBeInTheDocument();
    });

    test('renders complex nested React components', () => {
      const ComplexComponent = () => (
        <div>
          <h2>Complex Title</h2>
          <p>Complex paragraph</p>
        </div>
      );

      render(
        <TextNode>
          <ComplexComponent />
        </TextNode>,
      );

      expect(screen.getByText('Complex Title')).toBeInTheDocument();
      expect(screen.getByText('Complex paragraph')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    test('handles empty children', () => {
      const { container } = render(<TextNode></TextNode>);
      expect(container.firstChild).toBeNull();
    });

    test('handles null children', () => {
      const { container } = render(<TextNode>{null}</TextNode>);
      expect(container.firstChild).toBeNull();
    });

    test('handles undefined children', () => {
      const { container } = render(<TextNode>{undefined}</TextNode>);
      expect(container.firstChild).toBeNull();
    });

    test('handles number children as string', () => {
      render(<TextNode as={'span'}>{42}</TextNode>);
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('42').tagName.toLowerCase()).toEqual('span');
    });

    test('handles boolean children', () => {
      const { container } = render(<TextNode>{true}</TextNode>);
      // React doesn't render boolean values
      expect(container.firstChild).toBeNull();
    });
  });
});
