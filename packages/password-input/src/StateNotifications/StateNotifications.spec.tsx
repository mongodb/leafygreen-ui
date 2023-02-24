import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { StateNotifications } from '.';

const defaultProps = {
  id: 'This is aria-describedby text',
  notifications: [
    {
      notification: 'message one',
      state: 'error',
    },
    {
      notification: 'message two',
      state: 'warning',
    },
    {
      notification: 'message three',
      state: 'valid',
    },
    {
      notification: 'message four',
      state: 'none',
    },
  ],
};

const iconAriaLabels = {
  warning: 'Warning Icon',
  error: 'X Icon',
  valid: 'Checkmark Icon',
  none: 'Checkmark Icon',
};

function renderStateNotifications(props = {}) {
  const utils = render(
    // @ts-expect-error - data-testid produces an error but it works
    <StateNotifications data-testid="state-notifications" {...props} />,
  );
  const stateNotification = utils.getByTestId('state-notifications');
  return {
    ...utils,
    stateNotification,
  };
}

describe('sub-component StateNotifications', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderStateNotifications(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('StateNotifications with default props', () => {
    test('renders message container with two messages', () => {
      const { stateNotification } = renderStateNotifications(defaultProps);
      const allMessages = stateNotification?.querySelectorAll('li');
      expect(allMessages).toHaveLength(4);
    });

    test('renders message with correct text', () => {
      const { stateNotification } = renderStateNotifications(defaultProps);
      const allMessages = stateNotification?.querySelectorAll('li');
      expect(allMessages[0]).toHaveTextContent(
        defaultProps.notifications[0].notification,
      );
      expect(allMessages[1]).toHaveTextContent(
        defaultProps.notifications[1].notification,
      );
      expect(allMessages[2]).toHaveTextContent(
        defaultProps.notifications[2].notification,
      );
      expect(allMessages[3]).toHaveTextContent(
        defaultProps.notifications[3].notification,
      );
    });

    test('renders message with correct icon', () => {
      const { stateNotification } = renderStateNotifications(defaultProps);
      const allMessages = stateNotification?.querySelectorAll('li');
      expect(allMessages[0].querySelector('svg')).toHaveAttribute(
        'aria-label',
        iconAriaLabels.error,
      );
      expect(allMessages[1].querySelector('svg')).toHaveAttribute(
        'aria-label',
        iconAriaLabels.warning,
      );
      expect(allMessages[2].querySelector('svg')).toHaveAttribute(
        'aria-label',
        iconAriaLabels.valid,
      );
      expect(allMessages[3].querySelector('svg')).toHaveAttribute(
        'aria-label',
        iconAriaLabels.none,
      );
    });

    test('input aria-describedby attribute matches aria-describedby prop', () => {
      const { stateNotification } = renderStateNotifications(defaultProps);
      expect(stateNotification.getAttribute('id')).toBe(defaultProps.id);
    });
  });
});
