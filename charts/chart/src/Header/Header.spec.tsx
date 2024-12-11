import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Header } from './Header';

const defaultContentTestId = 'header-content';

const defaultProps = {
  title: 'test',
  headerContent: <div data-testid={defaultContentTestId}></div>,
};

const renderHeader = () => render(<Header {...defaultProps} />);

describe('@lg-charts/chart/src/Header/Header', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderHeader();
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test('should display title value', () => {
    renderHeader();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('render component passed to headerContent', () => {
    renderHeader();
    expect(screen.getByTestId(defaultContentTestId)).toBeInTheDocument();
  });
});
