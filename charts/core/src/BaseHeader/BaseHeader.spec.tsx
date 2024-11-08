import React from 'react';
import { render, screen } from '@testing-library/react';

import { act } from '@leafygreen-ui/testing-lib';

import { BaseHeader } from './BaseHeader';

describe('@lg-charts/core/src/BaseHeader/BaseHeader', () => {
  it('should display label value', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('hide "more info" button by default', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.queryByLabelText('More info button')).not.toBeInTheDocument();
  });

  it('show "more info" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        moreInfoButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('More info button')).toBeInTheDocument();
  });

  it('call correct onClick function when "more info" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        moreInfoButtonProps={{ show: true, onClick }}
      />,
    );
    screen.getByLabelText('More info button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('hide "close" button by default', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.queryByLabelText('Close button')).not.toBeInTheDocument();
  });

  it('show "close" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        closeButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('Close button')).toBeInTheDocument();
  });

  it('call correct onClick function when "close" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        closeButtonProps={{ show: true, onClick }}
      />,
    );
    screen.getByLabelText('Close button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('hide "fullscreen" button by default', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(
      screen.queryByLabelText('Fullscreen button'),
    ).not.toBeInTheDocument();
  });

  it('show "fullscreen" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        fullScreenButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('Fullscreen button')).toBeInTheDocument();
  });

  it('call correct onClick function when "fullscreen" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        fullScreenButtonProps={{ show: true, onClick }}
      />,
    );
    screen.getByLabelText('Fullscreen button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('hide "reset" button by default', () => {
    render(<BaseHeader labelProps={{ value: 'test', variant: 'primary' }} />);
    expect(screen.queryByLabelText('Reset button')).not.toBeInTheDocument();
  });

  it('show "reset" button when "show" is set tot true', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        resetButtonProps={{ show: true }}
      />,
    );
    expect(screen.getByLabelText('Reset button')).toBeInTheDocument();
  });

  it('call correct onClick function when "reset" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        resetButtonProps={{ show: true, onClick }}
      />,
    );
    screen.getByLabelText('Reset button').click();
    expect(onClick).toHaveBeenCalled();
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

  it('should display messageText', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        messageText="This is a message"
      />,
    );
    expect(screen.getByText('This is a message')).toBeInTheDocument();
  });

  it('render component passed to inputContent', () => {
    render(
      <BaseHeader
        labelProps={{ value: 'test', variant: 'primary' }}
        inputContent={<input type="text" data-testid="my-input" />}
      />,
    );
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
