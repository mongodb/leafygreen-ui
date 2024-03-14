import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputBar } from '.';

const testText = 'test';

describe('packages/input-bar', () => {
  test('onChange is fired when user types', () => {
    const onChange = jest.fn();
    render(<InputBar onChange={onChange} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);

    expect(onChange).toHaveBeenCalledTimes(testText.length);
  });

  test('onMessageSend is fired when enter is clicked', () => {
    const onMessageSend = jest.fn();
    render(<InputBar onMessageSend={onMessageSend} />);

    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    userEvent.type(textarea, testText);
    userEvent.click(sendButton);

    expect(onMessageSend).toHaveBeenCalled();
    expect(onMessageSend).toHaveBeenCalledWith(
      testText,
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onMessageSend is fired when enter key is pressed', () => {
    const onMessageSend = jest.fn();
    render(<InputBar onMessageSend={onMessageSend} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);
    userEvent.type(textarea, '{enter}');

    expect(onMessageSend).toHaveBeenCalled();
    expect(onMessageSend).toHaveBeenCalledWith(
      testText,
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onSubmit is fired when enter is clicked', () => {
    const onSubmit = jest.fn();
    render(<InputBar onSubmit={onSubmit} />);

    const textarea = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    userEvent.type(textarea, testText);
    userEvent.click(sendButton);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('onSubmit is fired when enter key is pressed', () => {
    const onSubmit = jest.fn();
    render(<InputBar onSubmit={onSubmit} />);

    const textarea = screen.getByRole('textbox');
    userEvent.type(textarea, testText);
    userEvent.type(textarea, '{enter}');

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'submit',
      }),
    );
  });

  test('badgeText is rendered when the prop is set', () => {
    render(<InputBar badgeText="beta" />);

    expect(screen.getByText('beta')).toBeInTheDocument();
  });
});
