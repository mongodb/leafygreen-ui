import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ActionCardState } from '../components';

import { Message } from './Message';
import { MessageProps } from './Message.types';

const MESSAGE_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const renderMessage = (props: Partial<MessageProps> = {}) => {
  return render(<Message messageBody={MESSAGE_CONTENT} {...props} />);
};

describe('Message', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderMessage({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders message content', () => {
    renderMessage({ messageBody: MESSAGE_CONTENT });
    expect(screen.getByText(MESSAGE_CONTENT)).toBeInTheDocument();
  });

  test('renders subcomponents and filters them from remaining children', () => {
    const TestChild = () => <div>Regular child</div>;

    renderMessage({
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
          <Message.ActionCard
            title="Action Card Title"
            state={ActionCardState.Idle}
          >
            <div>Action Card Content</div>
            <Message.ActionCard.ExpandableContent>
              Action Card Expandable Content
            </Message.ActionCard.ExpandableContent>
            <Message.ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </Message.ActionCard>
          <div>Another regular child</div>
        </>
      ),
    });

    // All components should render
    expect(screen.getByText(/Verified by MongoDB Staff/)).toBeInTheDocument();
    expect(screen.getByText('Regular child')).toBeInTheDocument();
    expect(screen.getByText('Another regular child')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
    expect(screen.getByText('Related Resources')).toBeInTheDocument();
    expect(screen.getByText('Action Card Content')).toBeInTheDocument();
    expect(
      screen.getByText('Action Card Expandable Content'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /run/i })).toBeInTheDocument();

    // No duplication - each subcomponent should only render once
    const verifiedBanners = screen.getAllByText(/Verified by MongoDB Staff/);
    expect(verifiedBanners).toHaveLength(1);

    const copyButtons = screen.getAllByRole('button', { name: /copy/i });
    expect(copyButtons).toHaveLength(1);

    const linksHeadings = screen.getAllByText('Related Resources');
    expect(linksHeadings).toHaveLength(1);

    const actionCardContents = screen.getAllByText('Action Card Content');
    expect(actionCardContents).toHaveLength(1);

    const actionCardExpandableContents = screen.getAllByText(
      'Action Card Expandable Content',
    );
    expect(actionCardExpandableContents).toHaveLength(1);

    const actionCardActions = screen.getAllByRole('button', {
      name: /cancel/i,
    });
    expect(actionCardActions).toHaveLength(1);

    const actionCardRunActions = screen.getAllByRole('button', {
      name: /run/i,
    });
    expect(actionCardRunActions).toHaveLength(1);
  });
});
