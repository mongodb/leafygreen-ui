import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Actions } from './Actions';
import type { ActionsProps } from './Actions.types';

const renderActions = (props: Partial<ActionsProps> = {}) => {
  const { onClickCancel = jest.fn(), onClickRun = jest.fn(), ...rest } = props;
  return render(
    <Actions
      data-testid="actions"
      onClickCancel={onClickCancel}
      onClickRun={onClickRun}
      {...rest}
    />,
  );
};

describe('chat/message/ToolCard/Actions', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderActions();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('applies className prop', () => {
    const customClassName = 'custom-actions-class';
    const { container } = renderActions({
      className: customClassName,
    });

    const actionsContainer = container.querySelector('[data-testid="actions"]');
    expect(actionsContainer).toHaveClass(customClassName);
  });

  test('forwards ref to container element', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderActions();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-testid', 'actions');
  });

  test('calls onClickCancel when Cancel button is clicked', async () => {
    const mockOnClickCancel = jest.fn();
    renderActions({
      onClickCancel: mockOnClickCancel,
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);

    expect(mockOnClickCancel).toHaveBeenCalledTimes(1);
  });

  test('calls onClickRun when Run button is clicked', async () => {
    const mockOnClickRun = jest.fn();
    renderActions({
      onClickRun: mockOnClickRun,
    });

    const runButton = screen.getByRole('button', { name: 'Run' });
    await userEvent.click(runButton);

    expect(mockOnClickRun).toHaveBeenCalledTimes(1);
  });
});
