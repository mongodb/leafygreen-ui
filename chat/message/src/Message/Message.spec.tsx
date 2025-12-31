import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ToolCardState } from '../components';

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
          <Message.Actions onClickCopy={jest.fn()} />
          <Message.VerifiedBanner
            verifier="MongoDB Staff"
            verifiedAt={new Date('2023-08-24T16:20:00Z')}
          />
          <Message.Links
            links={[{ children: 'Test Link', href: 'https://example.com' }]}
          />
          <Message.ToolCard title="Tool Card Title" state={ToolCardState.Idle}>
            <div>Tool Card Content</div>
            <Message.ToolCard.ExpandableContent>
              Tool Card Expandable Content
            </Message.ToolCard.ExpandableContent>
            <Message.ToolCard.Actions
              onClickCancel={jest.fn()}
              onClickRun={jest.fn()}
            />
          </Message.ToolCard>
          <div>Another regular child</div>
        </>
      ),
    });

    // Verify all components render
    const expectedContent = [
      /Verified by MongoDB Staff/,
      'Regular child',
      'Another regular child',
      'Related Resources',
      'Tool Card Content',
      'Tool Card Expandable Content',
    ];

    expectedContent.forEach((content) => {
      expect(screen.getByText(content)).toBeInTheDocument();
    });

    const expectedButtons = [
      { name: /copy/i },
      { name: /cancel/i },
      { name: /run/i },
    ];

    expectedButtons.forEach((button) => {
      expect(screen.getByRole('button', button)).toBeInTheDocument();
    });

    // Verify no duplication - each subcomponent renders only once
    expect(screen.getAllByText(/Verified by MongoDB Staff/)).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /copy/i })).toHaveLength(1);
    expect(screen.getAllByText('Related Resources')).toHaveLength(1);
    expect(screen.getAllByText('Tool Card Content')).toHaveLength(1);
    expect(
      screen.getAllByText('Tool Card Expandable Content'),
    ).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /cancel/i })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: /run/i })).toHaveLength(1);
  });
});
