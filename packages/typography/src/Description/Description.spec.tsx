import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

import Description from './Description';

const renderDescription = ({
  as,
  children = 'Test description',
}: {
  as?: PolymorphicAs;
  children?: ReactNode;
}) => {
  return render(<Description as={as}>{children}</Description>);
};

describe('Description Component', () => {
  test('renders as given element when "as" prop is set', () => {
    const { container } = renderDescription({ as: 'span' });
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  test('renders as a <p> element when children is a string', () => {
    const { container } = renderDescription({ children: 'Test description' });
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  test('renders as a <p> element when children is a number', () => {
    const { container } = renderDescription({ children: 123 });
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  test('renders as a <div> element when children is a React element', () => {
    const { container } = renderDescription({
      children: <span>Test Description</span>,
    });
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
