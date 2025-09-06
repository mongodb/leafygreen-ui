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

  test('renders subcomponents and filters them from remaining children', () => {
    const TestChild = () => <div>Regular child</div>;

    renderMessage(
      {
        children: (
          <>
            <TestChild />
            <Message.Actions onClickCopy={() => {}} />
            <Message.VerifiedBanner
              verifier="MongoDB Staff"
              verifiedAt={new Date('2023-08-24T16:20:00Z')}
            />
            <Message.Links
              links={[{ children: 'Test Link', href: 'https://example.com' }]}
            />
            <div>Another regular child</div>
          </>
        ),
      },
      Variant.Compact,
    );

    // All components should render
    expect(screen.getByText(/Verified by MongoDB Staff/)).toBeInTheDocument();
    expect(screen.getByText('Regular child')).toBeInTheDocument();
    expect(screen.getByText('Another regular child')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    expect(screen.getByText('Related Resources')).toBeInTheDocument();

    // No duplication - each subcomponent should only render once
    const verifiedBanners = screen.getAllByText(/Verified by MongoDB Staff/);
    expect(verifiedBanners).toHaveLength(1);

    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    expect(copyButtons).toHaveLength(1);

    const linksHeadings = screen.getAllByText('Related Resources');
    expect(linksHeadings).toHaveLength(1);
  });
});
