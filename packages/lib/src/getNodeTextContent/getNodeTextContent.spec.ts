import React from 'react';

import getNodeTextContent from '.';

describe('packages/lib/src/getNodeTextContent', () => {
  describe('getNodeTextContent', () => {
    test('returns empty string for undefined node', () => {
      const result = getNodeTextContent(undefined);
      expect(result).toBe('');
    });

    test('returns correct text content for a string node', () => {
      const result = getNodeTextContent('leafy green');
      expect(result).toBe('leafy green');
    });

    test('returns correct text content for a number node', () => {
      const result = getNodeTextContent(123);
      expect(result).toBe('123');
    });

    test('returns concatenated text content for an array of nodes', () => {
      const result = getNodeTextContent(['leafy', 'green', false]);
      expect(result).toBe('leafy green');
    });

    test('returns text content for intrinsic elements', () => {
      const element = React.createElement(
        'div',
        null,
        'leafy',
        React.createElement('span', null, 'green'),
      );
      const result = getNodeTextContent(element);
      expect(result).toBe('leafy green');
    });

    test('returns text content for functional components', () => {
      const FunctionalComponent = ({ title }: { title: string }) => {
        return React.createElement('h1', null, 'title: ', title);
      };

      const element = React.createElement(FunctionalComponent, {
        title: 'leafy green',
      });

      const result = getNodeTextContent(element);

      expect(result).toBe('title: leafy green');
    });

    test('returns text content for nested functional components', () => {
      const FunctionalComponent = ({ title }: { title: string }) => {
        return React.createElement(
          'div',
          null,
          'title: ',
          React.createElement('span', null, title),
        );
      };

      const element = React.createElement(FunctionalComponent, {
        title: 'leafy green',
      });

      const result = getNodeTextContent(element);

      expect(result).toBe('title: leafy green');
    });
  });
});
