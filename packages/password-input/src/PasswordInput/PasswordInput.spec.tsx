import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { LGIDS_PASSWORD_INPUT } from '../constants';

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
  errorMessage: 'This is an error',
  successMessage: 'This is a valid input',
  notifications: [
    {
      notification: 'message one',
      state: 'error',
    },
    {
      notification: 'message two',
      state: 'error',
    },
  ],
};

function renderPasswordInput(props = {}) {
  const utils = render(
    // @ts-expect-error - data-testid gives an error but passes in types checks test below
    <PasswordInput data-testid="password-input" {...props} />,
  );
  const passwordInput = utils.getByTestId('password-input');
  const labelElement = utils.container.querySelector('label');
  const stateNotifications = utils.queryByTestId(
    LGIDS_PASSWORD_INPUT.stateNotifications,
  );
  const toggleButton = utils.container.querySelector('button');
  return {
    ...utils,
    passwordInput,
    labelElement,
    stateNotifications,
    toggleButton,
  };
}

describe('packages/password-input', () => {
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
      renderPasswordInput({ ['aria-label']: defaultProps.label });
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    test(`renders ${defaultProps.placeholder} as placeholder text`, () => {
      const { getByPlaceholderText } = renderPasswordInput({
        placeholder: defaultProps.placeholder,
        label: defaultProps.label,
      });
      expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
    });

    test(`renders ${defaultProps.className} in the classList`, () => {
      const { container } = renderPasswordInput({
        className: defaultProps.className,
        label: defaultProps.label,
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
        label: defaultProps.label,
      });
      expect(passwordInput.getAttribute('id')).toBe(defaultProps.id);
    });

    test('renders ${defaultProps.autoComplete} as autoComplete text', async () => {
      const { passwordInput } = renderPasswordInput({
        autoComplete: defaultProps.autoComplete,
        label: defaultProps.label,
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

    describe('toggle', () => {
      test('toggles password type on click of toggle icon ', () => {
        const { passwordInput, toggleButton } = renderPasswordInput({
          label: defaultProps.label,
        });

        expect(passwordInput.getAttribute('type')).toBe('password');
        fireEvent.click(toggleButton as HTMLButtonElement);
        expect(passwordInput.getAttribute('type')).toBe('text');
        fireEvent.click(toggleButton as HTMLButtonElement);
        expect(passwordInput.getAttribute('type')).toBe('password');
      });

      test('toggles password type on click of toggle icon when input is disabled', () => {
        const { passwordInput, toggleButton } = renderPasswordInput({
          label: defaultProps.label,
          disabled: true,
        });

        expect(passwordInput.getAttribute('type')).toBe('password');
        fireEvent.click(toggleButton as HTMLButtonElement);
        expect(passwordInput.getAttribute('type')).toBe('text');
        fireEvent.click(toggleButton as HTMLButtonElement);
        expect(passwordInput.getAttribute('type')).toBe('password');
      });

      test('does not submit a form when clicked', () => {
        const submitHandler = jest.fn();
        const { getByRole } = render(
          <form onSubmit={submitHandler}>
            <PasswordInput label="label" />
          </form>,
        );
        const toggleButton = getByRole('switch');
        userEvent.click(toggleButton);
        expect(submitHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('Password input with stateNotifications array', () => {
    test('renders state notifications', async () => {
      const { stateNotifications } = renderPasswordInput({
        label: defaultProps.label,
      });
      expect(stateNotifications).toBeInTheDocument();
    });

    test('renders state notifications with two messages', async () => {
      const { stateNotifications } = renderPasswordInput({
        stateNotifications: defaultProps.notifications,
        label: defaultProps.label,
      });
      const allMessages = stateNotifications?.querySelectorAll('li');
      expect(allMessages).toHaveLength(2);
    });
  });

  describe('Password input with aria-describedby', () => {
    test('does not render state notifications if aria-describedby is passed', async () => {
      const { stateNotifications } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'error',
        label: defaultProps.label,
      });
      expect(stateNotifications).not.toBeInTheDocument();
    });

    test('input aria-describedby attribute matches aria-describedby prop', async () => {
      const { passwordInput } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'error',
        label: defaultProps.label,
      });
      expect(passwordInput.getAttribute('aria-describedby')).toBe(
        defaultProps.ariaDescribedby,
      );
    });
  });

  describe('without stateNotifications array or aria-describedby', () => {
    test(`it renders a general error message when stateNotifications is 'error'`, async () => {
      const { queryByText } = renderPasswordInput({
        stateNotifications: 'error',
        label: defaultProps.label,
        errorMessage: defaultProps.errorMessage,
      });
      expect(queryByText(defaultProps.errorMessage)).toBeInTheDocument();
    });

    test(`it renders a general error message when stateNotifications is 'warning'`, async () => {
      const { queryByText } = renderPasswordInput({
        stateNotifications: 'warning',
        label: defaultProps.label,
        errorMessage: defaultProps.errorMessage,
      });
      expect(queryByText(defaultProps.errorMessage)).toBeInTheDocument();
    });

    test(`it renders a general success message when stateNotifications is 'valid'`, async () => {
      const { queryByText } = renderPasswordInput({
        stateNotifications: 'valid',
        label: defaultProps.label,
        successMessage: defaultProps.successMessage,
      });
      expect(queryByText(defaultProps.successMessage)).toBeInTheDocument();
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', async () => {
    <>
      {/* @ts-expect-error - Must include stateNotification prop */}
      <PasswordInput aria-describedby="my-id" />
      {/* @ts-expect-error - Must include correct stateNotification type if using aria-describedBy */}
      <PasswordInput
        label="mylabel"
        aria-describedby="my-id"
        stateNotifications={[{ notification: 'hi', state: 'error' }]}
      />
      <PasswordInput
        aria-describedby="my-id"
        stateNotifications="error"
        label="my label"
      />
      {/* @ts-expect-error - needs label/aria-label/aria-labelledby */}
      <PasswordInput stateNotifications={[{ message: 'hi', state: 'error' }]} />
      <PasswordInput
        label="label"
        stateNotifications={[{ notification: 'hi', state: 'error' }]}
        autoComplete="new-password"
      />
      <PasswordInput
        label="label"
        stateNotifications={[{ notification: 'hi', state: 'error' }]}
        autoComplete="new-password"
        value="the value"
        size="small"
        disabled
      />
      <PasswordInput
        data-attribute="data test"
        aria-label="label"
        stateNotifications={[{ notification: 'hi', state: 'error' }]}
      />
      <PasswordInput
        data-attribute="data test"
        aria-labelledby="label"
        stateNotifications={[{ notification: 'hi', state: 'error' }]}
      />
      <PasswordInput
        data-attribute="data test"
        aria-labelledby="label"
        stateNotifications="error"
      />
      <PasswordInput
        data-attribute="data test"
        aria-labelledby="label"
        stateNotifications="valid"
      />
      <PasswordInput
        data-attribute="data test"
        aria-labelledby="label"
        stateNotifications="warning"
      />
    </>;
  });
});
