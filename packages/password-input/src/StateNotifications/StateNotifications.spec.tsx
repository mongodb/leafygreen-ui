import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { StateNotifications } from '.';

const defaultProps = {
  ['aria-describedby']: 'This is aria-describedby text',
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

function renderStateNotifications(props = {}) {
  const utils = render(
    // @ts-expect-error
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
      expect(allMessages).toHaveLength(2);
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
    });

    test('input aria-describedby attribute matches aria-describedby prop', () => {
      const { stateNotification } = renderStateNotifications(defaultProps);
      expect(stateNotification.getAttribute('aria-describedby')).toBe(
        defaultProps['aria-describedby'],
      );
    });
  });
});
