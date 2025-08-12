import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { consoleOnce } from '@leafygreen-ui/lib';

import { Message } from './Message';
import { MessageProps } from './Message.types';

const MESSAGE_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@leafygreen-ui/lib', () => ({
  ...jest.requireActual('@leafygreen-ui/lib'),
  consoleOnce: {
    warn: jest.fn(),
  },
}));

const renderMessage = (props: Partial<MessageProps> = {}, variant: Variant) => {
  return render(
    <LeafyGreenChatProvider variant={variant}>
      <Message messageBody={MESSAGE_CONTENT} {...props} />
    </LeafyGreenChatProvider>,
  );
};

describe('Message', () => {
  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('a11y', () => {
    test('CompactMessage does not have basic accessibility issues', async () => {
      const { container } = renderMessage({}, Variant.Compact);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('SpaciousMessage does not have basic accessibility issues', async () => {
      const { container } = renderMessage({}, Variant.Spacious);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders CompactMessage when variant is compact', () => {
    renderMessage({ messageBody: MESSAGE_CONTENT }, Variant.Compact);
    expect(screen.getByText(MESSAGE_CONTENT)).toBeInTheDocument();
  });

  test('renders SpaciousMessage when variant is spacious', () => {
    renderMessage({ messageBody: MESSAGE_CONTENT }, Variant.Spacious);
    expect(screen.getByText(MESSAGE_CONTENT)).toBeInTheDocument();
  });

  test('warns when spacious-specific props are used with compact variant', () => {
    renderMessage(
      {
        align: 'left',
        avatar: <div>test-avatar</div>,
        baseFontSize: 16,
        componentOverrides: {},
        links: [],
        linksHeading: 'Links',
        onLinkClick: () => {},
        verified: { verifiedAt: new Date() },
      },
      Variant.Compact,
    );

    expect(consoleOnce.warn).toHaveBeenCalledTimes(1);
    expect(consoleOnce.warn).toHaveBeenCalledWith(
      expect.stringContaining("only used in the 'spacious' variant"),
    );
  });

  test('does not warn when no spacious-specific props are used with compact variant', () => {
    renderMessage({ messageBody: MESSAGE_CONTENT }, Variant.Compact);

    expect(consoleOnce.warn).not.toHaveBeenCalled();
  });

  describe('assistantName prop', () => {
    test('uses custom assistant name when provided in compact variant', () => {
      renderMessage(
        {
          messageBody: MESSAGE_CONTENT,
          isSender: false,
          assistantName: 'Custom Assistant',
        },
        Variant.Compact,
      );

      expect(screen.getByText('Custom Assistant')).toBeInTheDocument();
    });

    test('uses default assistant name when assistantName is not provided in compact variant', () => {
      renderMessage(
        {
          messageBody: MESSAGE_CONTENT,
          isSender: false,
        },
        Variant.Compact,
      );

      expect(screen.getByText('MongoDB Assistant')).toBeInTheDocument();
    });

    test('assistantName prop is ignored in spacious variant', () => {
      renderMessage(
        {
          messageBody: MESSAGE_CONTENT,
          isSender: false,
          assistantName: 'Custom Assistant',
        },
        Variant.Spacious,
      );

      expect(screen.queryByText('Custom Assistant')).toBeNull();
    });
  });
});
