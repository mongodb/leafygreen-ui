import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('@lg-charts/core/src/Header/Header', () => {
  it('should display label value', () => {
    render(<Header label="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('render component passed to headerContent', () => {
    render(
      <Header
        label="test"
        headerContent={<input type="text" data-testid="my-input" />}
      />,
    );
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
