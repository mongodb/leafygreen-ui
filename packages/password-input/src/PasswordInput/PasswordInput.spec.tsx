import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { PasswordInput } from '.';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  className: 'password-input-class',
  label: 'This is the Label test',
  placeholder: 'This is some placeholder text',
  ariaDescribedby: 'This is aria-describedby text',
  id: 'This is id',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  messages: [
    {
      message: 'message one',
      state: 'error',
    },
    {
      message: 'message two',
      state: 'error',
    },
  ],
};

function renderPasswordInput(props = {}) {
  const utils = render(
    <PasswordInput data-testid="password-input" {...props} />,
  );
  const passwordInput = utils.getByTestId('password-input');
  const labelElement = utils.container.querySelector('label');
  const messageContainer = utils.container.querySelector('ul');
  return { ...utils, passwordInput, labelElement, messageContainer };
}

describe('packages/password-input', () => {
  // TODO: passing a value shows the values
  // TODO: onChange fires callback
  // TODO: label test

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderPasswordInput({ label: defaultProps.label });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Password input with default props', () => {
    test('renders type as "password"', () => {
      const { passwordInput } = renderPasswordInput({
        label: defaultProps.label,
      });
      expect(passwordInput.getAttribute('type')).toBe('password');
    });

    test('renders label container', async () => {
      const { labelElement } = renderPasswordInput({
        label: defaultProps.label,
      });
      expect(labelElement).toBeInTheDocument();
    });

    test(`renders ${defaultProps.label} as the input label`, () => {
      const { labelElement } = renderPasswordInput({
        label: defaultProps.label,
      });
      expect(labelElement?.innerHTML).toContain(defaultProps.label);
    });

    test('renders no label tag when label is not supplied', () => {
      renderPasswordInput();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    test('input id attribute matches id prop', async () => {
      const { passwordInput } = renderPasswordInput({
        id: defaultProps.id,
      });
      expect(passwordInput.getAttribute('id')).toBe(defaultProps.id);
    });

    // TODO: fix hook
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('value change triggers onChange callback', () => {
      const { passwordInput } = renderPasswordInput({
        label: defaultProps.label,
        onChange: defaultProps.onChange,
      });

      fireEvent.change(passwordInput, {
        target: { value: 'a' },
      });

      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test('blue triggers onBlur callback', () => {
      const { passwordInput } = renderPasswordInput({
        label: defaultProps.label,
        onBlur: defaultProps.onBlur,
      });

      userEvent.tab(); // focus
      expect(passwordInput).toHaveFocus();
      userEvent.tab(); // blur

      expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Password input with stateNotifications array', () => {
    test('renders message container', async () => {
      const { messageContainer } = renderPasswordInput();
      expect(messageContainer).toBeInTheDocument();
    });

    test('renders message container with two messages', async () => {
      const { messageContainer } = renderPasswordInput({
        stateNotifications: defaultProps.messages,
      });
      const allMessages = messageContainer?.querySelectorAll('li');
      expect(allMessages).toHaveLength(2);
    });
  });

  describe('Password input with aria-describedby', () => {
    test('does not render message container if aria-describedby is passed', async () => {
      const { messageContainer } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'error',
      });
      expect(messageContainer).not.toBeInTheDocument();
    });

    test('input aria-describedby attribute matches aria-describedby prop', async () => {
      const { passwordInput } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'error',
      });
      expect(passwordInput.getAttribute('aria-describedby')).toBe(
        defaultProps.ariaDescribedby,
      );
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', async () => {
    <>
      {/* @ts-expect-error - Must include stateNotification prop */}
      <PasswordInput aria-describedby="my-id" />
      <PasswordInput
        aria-describedby="my-id"
        //  @ts-expect-error - Must pass the correct stateNotifications type
        stateNotifications={[{ message: 'hi', state: 'error' }]}
      />
      <PasswordInput stateNotifications={[{ message: 'hi', state: 'error' }]} />
    </>;
  });
});
