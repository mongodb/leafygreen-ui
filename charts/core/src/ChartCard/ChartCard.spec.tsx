import React from 'react';
import { render, screen } from '@testing-library/react';

import { ChartCard } from './ChartCard';

describe('@lg-charts/core/src/ChartCard/ChartCard', () => {
  it('should display title value', () => {
    render(<ChartCard title="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('render component passed to headerContent', () => {
    render(
      <ChartCard
        title="test"
        headerContent={<input type="text" data-testid="my-input" />}
      />,
    );
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
