import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ToolCard } from './ToolCard';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('chat/message/ToolCard', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<ToolCard>Content</ToolCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();

    render(<ToolCard ref={ref}>Content</ToolCard>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText('Content'));
  });

  test('accepts and applies className', () => {
    render(<ToolCard className="custom-class">Content</ToolCard>);
    const element = screen.getByText('Content');

    expect(element).toHaveClass('custom-class');
  });

  test('renders children', () => {
    render(
      <ToolCard>
        <div>Child content</div>
      </ToolCard>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
