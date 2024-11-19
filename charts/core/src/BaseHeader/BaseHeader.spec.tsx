import React from 'react';
import { render, screen } from '@testing-library/react';

import { act } from '@leafygreen-ui/testing-lib';

import { BaseHeader } from './BaseHeader';

describe('@lg-charts/core/src/BaseHeader/BaseHeader', () => {
  it('should display label value', () => {
    render(<BaseHeader titleProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('hide "collapse" button by default', () => {
    render(<BaseHeader titleProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.queryByLabelText('Toggle button')).not.toBeInTheDocument();
  });

  it('show "collapse" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        titleProps={{ value: 'test', variant: 'primary' }}
        toggleButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('Toggle button')).toBeInTheDocument();
  });

  it('call correct onClick function when "collapse" button is clicked', async () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        titleProps={{ value: 'test', variant: 'primary' }}
        toggleButtonProps={{ show: true, onClick }}
      />,
    );
    act(() => {
      screen.getByLabelText('Toggle button').click();
    });
    expect(onClick).toHaveBeenCalled();
  });

  it('call onClick function button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        titleProps={{ value: 'test', variant: 'primary' }}
        toggleButtonProps={{ show: true, isOpen: true, onClick }}
      />,
    );
    act(() => {
      screen.getByLabelText('Toggle button').click();
    });
    expect(onClick).toHaveBeenCalled();
  });

  it('render component passed to headerContent', () => {
    render(
      <BaseHeader
        titleProps={{ value: 'test', variant: 'primary' }}
        headerContent={<input type="text" data-testid="my-input" />}
      />,
    );
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
