import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { ChartGroup } from './ChartGroup';
import { useChartGroupContext } from './ChartGroupContext';

describe('charts/core/ChartGroup', () => {
  test('renders children', () => {
    render(
      <ChartGroup groupId="test-group">
        <div data-testid="child" />
      </ChartGroup>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('passes className to the container div', () => {
    render(
      <ChartGroup
        groupId="test-group"
        className="custom-class"
        data-testid="group-container"
      >
        <div />
      </ChartGroup>,
    );

    const container = screen.getByTestId('group-container');
    expect(container).toHaveClass('custom-class');
  });

  test('passes additional div props through', () => {
    render(
      <ChartGroup
        groupId="test-group"
        data-testid="group-container"
        role="group"
      >
        <div />
      </ChartGroup>,
    );

    const container = screen.getByTestId('group-container');
    expect(container).toHaveAttribute('role', 'group');
  });

  test('defaults enableTooltipSync to true', () => {
    let contextValue: ReturnType<typeof useChartGroupContext>;

    function Consumer() {
      contextValue = useChartGroupContext();
      return null;
    }

    render(
      <ChartGroup groupId="test-group">
        <Consumer />
      </ChartGroup>,
    );

    expect(contextValue!).toBeDefined();
    expect(contextValue!.enableTooltipSync).toBe(true);
  });

  test('provides groupId via context', () => {
    let contextValue: ReturnType<typeof useChartGroupContext>;

    function Consumer() {
      contextValue = useChartGroupContext();
      return null;
    }

    render(
      <ChartGroup groupId="my-group">
        <Consumer />
      </ChartGroup>,
    );

    expect(contextValue!.groupId).toBe('my-group');
  });

  test('provides enableTooltipSync as false when set', () => {
    let contextValue: ReturnType<typeof useChartGroupContext>;

    function Consumer() {
      contextValue = useChartGroupContext();
      return null;
    }

    render(
      <ChartGroup groupId="test-group" enableTooltipSync={false}>
        <Consumer />
      </ChartGroup>,
    );

    expect(contextValue!.enableTooltipSync).toBe(false);
  });

  test('isSomeChartHovered defaults to false', () => {
    let contextValue: ReturnType<typeof useChartGroupContext>;

    function Consumer() {
      contextValue = useChartGroupContext();
      return null;
    }

    render(
      <ChartGroup groupId="test-group">
        <Consumer />
      </ChartGroup>,
    );

    expect(contextValue!.isSomeChartHovered).toBe(false);
  });

  test('setIsSomeChartHovered updates isSomeChartHovered', () => {
    let contextValue: ReturnType<typeof useChartGroupContext>;

    function Consumer() {
      contextValue = useChartGroupContext();
      return (
        <button
          data-testid="hover-btn"
          onClick={() => contextValue!.setIsSomeChartHovered(true)}
        />
      );
    }

    render(
      <ChartGroup groupId="test-group">
        <Consumer />
      </ChartGroup>,
    );

    expect(contextValue!.isSomeChartHovered).toBe(false);

    const testButton = screen.getByTestId('hover-btn');
    userEvent.click(testButton);

    expect(contextValue!.isSomeChartHovered).toBe(true);
  });
});

describe('charts/core/useChartGroupContext', () => {
  test('returns undefined when not inside a ChartGroup', () => {
    const { result } = renderHook(useChartGroupContext);
    expect(result.current).toBeUndefined();
  });
});
