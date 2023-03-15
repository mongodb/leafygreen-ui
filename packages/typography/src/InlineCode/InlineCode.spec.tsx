import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import InlineCode from './InlineCode';

const children = 'Content';

describe('packages/typography', () => {
  describe('InlineCode', () => {
    describe('polymorphic', () => {
      test('it renders as code by default', () => {
        const utils = render(<InlineCode>{children}</InlineCode>);
        const component = utils.container.firstChild;
        expect(component.tagName.toLowerCase()).toBe('code');
      });

      test('it renders as an anchor component when the href prop is supplied', () => {
        const utils = render(<InlineCode href="string">{children}</InlineCode>);
        const component = utils.container.firstChild;
        expect(component.tagName.toLowerCase()).toBe('a');
      });

      test('it renders as component passed to "as" prop when set', () => {
        const utils = render(<InlineCode as="div">{children}</InlineCode>);
        const component = utils.container.firstChild;
        expect(component.tagName.toLowerCase()).toBe('div');
      });
    });
  });
});
