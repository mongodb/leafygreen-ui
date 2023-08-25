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

const iconAriaLabels = {
  warning: 'Warning Icon',
  error: 'X Icon',
  valid: 'Checkmark Icon',
};

function renderPasswordInput(props = {}) {
  const utils = render(
    // @ts-expect-error - data-testid gives an error but passes in types checks test below
    <PasswordInput data-testid="password-input" {...props} />,
  );
  const passwordInput = utils.getByTestId('password-input');
  const labelElement = utils.container.querySelector('label');
  const messageContainer = utils.container.querySelector('ul');
  const toggleButton = utils.container.querySelector('button');
  return {
    ...utils,
    passwordInput,
    labelElement,
    messageContainer,
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
    test('renders message container', async () => {
      const { messageContainer } = renderPasswordInput({
        label: defaultProps.label,
      });
      expect(messageContainer).toBeInTheDocument();
    });

    test('renders message container with two messages', async () => {
      const { messageContainer } = renderPasswordInput({
        stateNotifications: defaultProps.notifications,
        label: defaultProps.label,
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
        label: defaultProps.label,
      });
      expect(messageContainer).not.toBeInTheDocument();
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

    test('input shows error(x) icon', async () => {
      const { container } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'error',
        label: defaultProps.label,
      });
      expect(
        container.querySelector(`svg[aria-label='${iconAriaLabels.error}']`),
      ).toBeInTheDocument();
    });

    test('input shows warning icon', async () => {
      const { container } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'warning',
        label: defaultProps.label,
      });
      expect(
        container.querySelector(`svg[aria-label='${iconAriaLabels.warning}']`),
      ).toBeInTheDocument();
    });

    test('input shows checkmark icon', async () => {
      const { container } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'valid',
        label: defaultProps.label,
      });
      expect(
        container.querySelector(`svg[aria-label='${iconAriaLabels.valid}']`),
      ).toBeInTheDocument();
    });

    test('input does not show checkmark icon', async () => {
      const { container } = renderPasswordInput({
        [`aria-describedby`]: defaultProps.ariaDescribedby,
        stateNotifications: 'none',
        label: defaultProps.label,
      });
      expect(
        container.querySelector(`svg[aria-label='${iconAriaLabels.valid}']`),
      ).not.toBeInTheDocument();
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
    </>;
  });
});
