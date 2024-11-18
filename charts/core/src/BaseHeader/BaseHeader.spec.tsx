import React from 'react';
import { render, screen } from '@testing-library/react';

import { act } from '@leafygreen-ui/testing-lib';

import { BaseHeader } from './BaseHeader';

describe('@lg-charts/core/src/BaseHeader/BaseHeader', () => {
  it('should display label value', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('hide "collapse" button by default', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.queryByLabelText('Collapse button')).not.toBeInTheDocument();
  });

  it('show "collapse" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        collapseButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('Collapse button')).toBeInTheDocument();
  });

  it('call correct onClick function when "collapse" button is clicked', async () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        collapseButtonProps={{ show: true, onClick }}
      />,
    );
    act(() => {
      screen.getByLabelText('Collapse button').click();
    });
    expect(onClick).toHaveBeenCalled();
  });

  it('call onClick function with current button state when "collapse" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        collapseButtonProps={{ show: true, collapsed: true, onClick }}
      />,
    );
    act(() => {
      screen.getByLabelText('Collapse button').click();
    });
    expect(onClick).toHaveBeenCalledWith(false);
  });

  it('render component passed to headerContent', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        headerContent={<input type="text" data-testid="my-input" />}
      />,
    );
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
