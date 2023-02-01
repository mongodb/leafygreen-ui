import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { PasswordInput } from '.';

const defaultProps = {
  className: 'password-input-class',
  label: 'This is the Label test',
  placeholder: 'This is some placeholder text',
  ariaDescribedby: 'This is aria-describedby text',
  autoComplete: 'new-password',
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
    // @ts-expect-error
    <PasswordInput data-testid="password-input" {...props} />,
  );
  const passwordInput = utils.getByTestId('password-input');
  const labelElement = utils.container.querySelector('label');
  const messageContainer = utils.container.querySelector('ul');
  return { ...utils, passwordInput, labelElement, messageContainer };
}

describe('packages/password-input', () => {
  // auto-complete

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

    test(`renders ${defaultProps.placeholder} as placeholder text`, () => {
      const { getByPlaceholderText } = renderPasswordInput({
        placeholder: defaultProps.placeholder,
      });
      expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
    });

    test(`renders ${defaultProps.className} in the classList`, () => {
      const { container } = renderPasswordInput({
        className: defaultProps.className,
      });
      expect(
        (container?.firstChild as HTMLElement)?.classList.contains(
          defaultProps.className,
        ),
      ).toBe(true);
    });

    test('input id attribute matches id prop', async () => {
      const { passwordInput } = renderPasswordInput({
        id: defaultProps.id,
      });
      expect(passwordInput.getAttribute('id')).toBe(defaultProps.id);
    });

    test('renders ${defaultProps.autoComplete} as autoComplete text', async () => {
      const { passwordInput } = renderPasswordInput({
        autoComplete: defaultProps.autoComplete,
      });
      expect(passwordInput.getAttribute('autoComplete')).toBe(
        defaultProps.autoComplete,
      );
    });

    test('value change triggers onChange callback', () => {
      const { passwordInput } = renderPasswordInput({
        label: defaultProps.label,
        onChange: defaultProps.onChange,
      });

      expect((passwordInput as HTMLInputElement).value).toBe('');

      fireEvent.change(passwordInput, {
        target: { value: 'a' },
      });

      expect((passwordInput as HTMLInputElement).value).toBe('a');
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    test('blur triggers onBlur callback', () => {
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
      {/* @ts-expect-error */}
      <PasswordInput
        label="mylabel"
        aria-describedby="my-id"
        stateNotifications={[{ message: 'hi', state: 'error' }]}
      />
      {/* @ts-expect-error - needs label/aria-label/aria-labelledby */}
      <PasswordInput stateNotifications={[{ message: 'hi', state: 'error' }]} />
      <PasswordInput
        label="label"
        stateNotifications={[{ message: 'hi', state: 'error' }]}
        autoComplete="new-password"
        value="the value"
        sizeVariant="small"
        disabled
      />
      <PasswordInput
        data-attribute="data test"
        aria-label="label"
        stateNotifications={[{ message: 'hi', state: 'error' }]}
      />
      <PasswordInput
        data-attribute="data test"
        aria-labelledby="label"
        stateNotifications={[{ message: 'hi', state: 'error' }]}
      />
    </>;
  });
});
