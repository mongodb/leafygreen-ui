import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ExpandableContent } from './ExpandableContent';
import type { ExpandableContentProps } from './ExpandableContent.types';

jest.mock('@lg-chat/lg-markdown', () => ({
  LGMarkdown: jest.fn(({ children }) => <div>{children}</div>),
}));

const mockUseToolCardContext = jest.fn();
jest.mock('../ToolCardContext', () => ({
  useToolCardContext: () => mockUseToolCardContext(),
}));

const renderExpandableContent = (
  props: Partial<ExpandableContentProps> = {},
) => {
  const { children = 'Test markdown content', ...rest } = props;
  return render(
    <ExpandableContent data-testid="expandable-content" {...rest}>
      {children}
    </ExpandableContent>,
  );
};

const baseMockContext = {
  toggleExpand: jest.fn(),
};

describe('chat/message/ToolCard/ExpandableContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToolCardContext.mockReturnValue({
      ...baseMockContext,
      isExpanded: false,
    });
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderExpandableContent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('applies className prop', () => {
    const customClassName = 'custom-expandable-content-class';
    const { container } = renderExpandableContent({
      className: customClassName,
    });

    const expandableContentContainer = container.querySelector(
      '[data-testid="expandable-content"]',
    );
    expect(expandableContentContainer).toHaveClass(customClassName);
  });

  test('forwards ref to container element', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderExpandableContent({ ref });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-testid', 'expandable-content');
  });

  test('renders content when expanded', () => {
    mockUseToolCardContext.mockReturnValue({
      ...baseMockContext,
      isExpanded: true,
    });

    renderExpandableContent({
      children: 'Test content',
    });

    const container = screen.getByText('Test content');
    expect(container).toBeVisible();
  });

  test('hides content when collapsed', () => {
    mockUseToolCardContext.mockReturnValue({
      ...baseMockContext,
      isExpanded: false,
    });

    renderExpandableContent({
      children: 'Test content',
    });

    const container = screen.queryByText('Test content');
    expect(container).not.toBeVisible();
  });
});
