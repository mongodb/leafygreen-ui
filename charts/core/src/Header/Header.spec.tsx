import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('@lg-charts/core/src/Header/Header', () => {
  it('should display label value', () => {
    render(<Header label="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('hide "close" button by default', () => {
    render(<Header label="test" />);
    expect(screen.queryByLabelText('Close button')).not.toBeInTheDocument();
  });

  it('show "close" button when "show" is set tot true', () => {
    render(<Header label="test" closeButtonProps={{ show: true }} />);
    expect(screen.getByLabelText('Close button')).toBeInTheDocument();
  });

  it('call correct onClick function when "close" button is clicked', () => {
    const onClick = jest.fn();
    render(<Header label="test" closeButtonProps={{ show: true, onClick }} />);
    screen.getByLabelText('Close button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('hide "fullscreen" button by default', () => {
    render(<Header label="test" />);
    expect(
      screen.queryByLabelText('Fullscreen button'),
    ).not.toBeInTheDocument();
  });

  it('show "fullscreen" button when "show" is set tot true', () => {
    render(<Header label="test" fullScreenButtonProps={{ show: true }} />);
    expect(screen.getByLabelText('Fullscreen button')).toBeInTheDocument();
  });

  it('call correct onClick function when "fullscreen" button is clicked', () => {
    const onClick = jest.fn();
    render(
      <Header label="test" fullScreenButtonProps={{ show: true, onClick }} />,
    );
    screen.getByLabelText('Fullscreen button').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('hide "reset" button by default', () => {
    render(<Header label="test" />);
    expect(screen.queryByLabelText('Reset button')).not.toBeInTheDocument();
  });

  it('show "reset" button when "show" is set tot true', () => {
    render(<Header label="test" resetButtonProps={{ show: true }} />);
    expect(screen.getByLabelText('Reset button')).toBeInTheDocument();
  });

  it('call correct onClick function when "reset" button is clicked', () => {
    const onClick = jest.fn();
    render(<Header label="test" resetButtonProps={{ show: true, onClick }} />);
    screen.getByLabelText('Reset button').click();
    expect(onClick).toHaveBeenCalled();
  });
});
