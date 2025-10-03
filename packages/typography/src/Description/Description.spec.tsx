import React from 'react';
import { render } from '@testing-library/react';

import Description from './Description';

const renderDescription = (props: React.ComponentProps<typeof Description>) => {
  return render(<Description {...props} />);
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

  test('renders with a default data-lgid', () => {
    const { container } = renderDescription({ children: 'Test description' });
    expect(container.querySelector('p')).toHaveAttribute(
      'data-lgid',
      'lg-typography-description',
    );
  });

  test('renders with a custom data-lgid', () => {
    const { container } = renderDescription({
      children: 'Test description',
      'data-lgid': 'lg-custom-lgid',
    });
    expect(container.querySelector('p')).toHaveAttribute(
      'data-lgid',
      'lg-custom-lgid',
    );
  });
});
