import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  useChartGroupHoverContext,
  useChartGroupStableContext,
} from './ChartGroupContext';
import { ChartGroupProvider } from './ChartGroupProvider';

describe('charts/core/ChartGroupProvider', () => {
  test('renders children', () => {
    render(
      <ChartGroupProvider groupId="test-group">
        <div data-testid="child" />
      </ChartGroupProvider>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('defaults enableTooltipSync to true', () => {
    let contextValue: ReturnType<typeof useChartGroupStableContext>;

    function Consumer() {
      contextValue = useChartGroupStableContext();
      return null;
    }

    render(
      <ChartGroupProvider groupId="test-group">
        <Consumer />
      </ChartGroupProvider>,
    );

    expect(contextValue).toBeDefined();
    expect(contextValue!.enableTooltipSync).toBe(true);
  });

  test('provides groupId via context', () => {
    let contextValue: ReturnType<typeof useChartGroupStableContext>;

    function Consumer() {
      contextValue = useChartGroupStableContext();
      return null;
    }

    render(
      <ChartGroupProvider groupId="my-group">
        <Consumer />
      </ChartGroupProvider>,
    );

    expect(contextValue!.groupId).toBe('my-group');
  });

  test('provides enableTooltipSync as false when set', () => {
    let contextValue: ReturnType<typeof useChartGroupStableContext>;

    function Consumer() {
      contextValue = useChartGroupStableContext();
      return null;
    }

    render(
      <ChartGroupProvider groupId="test-group" enableTooltipSync={false}>
        <Consumer />
      </ChartGroupProvider>,
    );

    expect(contextValue!.enableTooltipSync).toBe(false);
  });

  test('isSomeChartHovered defaults to false', () => {
    let hoverContext: ReturnType<typeof useChartGroupHoverContext>;

    function Consumer() {
      hoverContext = useChartGroupHoverContext();
      return null;
    }

    render(
      <ChartGroupProvider groupId="test-group">
        <Consumer />
      </ChartGroupProvider>,
    );

    expect(hoverContext!.isSomeChartHovered).toBe(false);
  });

  test('setIsSomeChartHovered updates isSomeChartHovered', () => {
    let stableContext: ReturnType<typeof useChartGroupStableContext>;
    let hoverContext: ReturnType<typeof useChartGroupHoverContext>;

    function Consumer() {
      stableContext = useChartGroupStableContext();
      hoverContext = useChartGroupHoverContext();
      return (
        <button
          data-testid="hover-btn"
          onClick={() => stableContext!.setIsSomeChartHovered(true)}
        />
      );
    }

    render(
      <ChartGroupProvider groupId="test-group">
        <Consumer />
      </ChartGroupProvider>,
    );

    expect(hoverContext!.isSomeChartHovered).toBe(false);

    const testButton = screen.getByTestId('hover-btn');
    userEvent.click(testButton);

    expect(hoverContext!.isSomeChartHovered).toBe(true);
  });
});

describe('charts/core/useChartGroupStableContext', () => {
  test('returns undefined when not inside a ChartGroupProvider', () => {
    const { result } = renderHook(useChartGroupStableContext);
    expect(result.current).toBeUndefined();
  });
});

describe('charts/core/useChartGroupHoverContext', () => {
  test('returns undefined when not inside a ChartGroupProvider', () => {
    const { result } = renderHook(useChartGroupHoverContext);
    expect(result.current).toBeUndefined();
  });
});
