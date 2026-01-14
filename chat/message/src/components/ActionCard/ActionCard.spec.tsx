import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ActionCard } from './ActionCard';
import { ActionCardProps } from './ActionCard.types';
import { State } from './shared.types';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const defaultProps = {
  children: 'Content',
  state: State.Idle,
  title: 'Test Title',
} as const;

const renderActionCard = (props?: Partial<ActionCardProps>) =>
  render(<ActionCard {...defaultProps} {...props} />);

describe('chat/message/ActionCard', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderActionCard();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderActionCard({ ref });

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current).toHaveTextContent(defaultProps.children);
  });

  test('accepts and applies className', () => {
    renderActionCard({ className: 'custom-class' });
    const element = screen.getByText('Test Title');

    expect(element.closest('.custom-class')).toBeInTheDocument();
  });

  test('renders title', () => {
    renderActionCard({ title: 'My Custom Title' });
    expect(screen.getByText('My Custom Title')).toBeInTheDocument();
  });

  test('renders chips', () => {
    const chips = [
      { label: 'MongoDB', glyph: <div>Icon</div> },
      { label: 'Atlas', glyph: <div>Icon</div> },
    ];
    renderActionCard({ chips });
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Atlas')).toBeInTheDocument();
  });

  describe('initialIsExpanded', () => {
    test('respects initialIsExpanded when showExpandButton is true', () => {
      renderActionCard({
        initialIsExpanded: true,
        showExpandButton: true,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      expect(
        screen.getByRole('button', { name: 'Collapse additional content' }),
      ).toBeInTheDocument();
    });

    test('ignores initialIsExpanded when showExpandButton is false', () => {
      renderActionCard({
        initialIsExpanded: true,
        showExpandButton: false,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      const expandableContent = screen.getByText('Content');
      expect(expandableContent).not.toBeVisible();
    });

    test('defaults to collapsed when showExpandButton is false', () => {
      renderActionCard({
        showExpandButton: false,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      const expandableContent = screen.getByText('Content');
      expect(expandableContent).not.toBeVisible();
    });
  });

  describe('showExpandButton', () => {
    test('shows expand button when showExpandButton is true', () => {
      renderActionCard({
        showExpandButton: true,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      expect(
        screen.getByRole('button', { name: /expand|collapse/i }),
      ).toBeInTheDocument();
    });

    test('hides expand button when showExpandButton is false', () => {
      renderActionCard({
        showExpandButton: false,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      expect(
        screen.queryByRole('button', { name: /expand|collapse/i }),
      ).toBeNull();
    });
  });

  describe('expandable content', () => {
    test('renders ExpandableContent when provided', () => {
      renderActionCard({
        children: (
          <>
            <ActionCard.ExpandableContent>
              Expandable content
            </ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
        initialIsExpanded: true,
      });
      expect(screen.getByText('Expandable content')).toBeInTheDocument();
    });

    test('calls onToggleExpanded when expand button is clicked', async () => {
      const mockOnToggleExpanded = jest.fn();
      renderActionCard({
        onToggleExpanded: mockOnToggleExpanded,
        children: (
          <>
            <ActionCard.ExpandableContent>Content</ActionCard.ExpandableContent>
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          </>
        ),
      });

      const expandButton = screen.getByRole('button', {
        name: 'Expand additional content',
      });
      await userEvent.click(expandButton);

      expect(mockOnToggleExpanded).toHaveBeenCalledWith(true);
    });
  });

  describe('actions', () => {
    test(`renders when state is ${State.Idle}`, () => {
      renderActionCard({
        state: State.Idle,
        children: (
          <ActionCard.Actions onClickCancel={() => {}} onClickRun={() => {}} />
        ),
      });

      expect(
        screen.getByRole('button', { name: 'Cancel' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Run' })).toBeInTheDocument();
    });

    test.each([State.Canceled, State.Error, State.Running, State.Success])(
      'does not render when state is %s',
      state => {
        renderActionCard({
          state,
          children: (
            <ActionCard.Actions
              onClickCancel={() => {}}
              onClickRun={() => {}}
            />
          ),
        });

        expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
        expect(screen.queryByRole('button', { name: 'Run' })).toBeNull();
      },
    );
  });
});
