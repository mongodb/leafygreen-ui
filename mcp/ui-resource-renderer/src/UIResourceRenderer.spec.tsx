import React from 'react';
import { render } from '@testing-library/react';

import { UIResourceRenderer } from './UIResourceRenderer';

const mockUIResourceRenderer = jest.fn();

jest.mock('@mcp-ui/client', () => ({
  UIResourceRenderer: (props: Record<string, unknown>) => {
    mockUIResourceRenderer(props);
    return null;
  },
}));

const mockResource = {
  uri: 'https://example.com/ui-resource',
  mimeType: 'text/html',
  blob: btoa('test'),
};

describe('UIResourceRenderer', () => {
  beforeEach(() => {
    mockUIResourceRenderer.mockClear();
  });

  test('should pass correct props to base component', () => {
    const onActionResult = jest.fn();

    render(
      <UIResourceRenderer
        resource={mockResource}
        darkMode={true}
        // @ts-expect-error - onActionResult is a valid prop from BaseUIResourceRendererProps
        onActionResult={onActionResult}
      />,
    );

    expect(mockUIResourceRenderer).toHaveBeenCalledWith({
      resource: mockResource,
      onActionResult,
      htmlProps: {
        autoResizeIframe: true,
        style: { border: 'none' },
        iframeRenderData: { darkMode: true },
      },
    });
  });

  test('should pass darkMode false to iframeRenderData', () => {
    render(<UIResourceRenderer resource={mockResource} darkMode={false} />);

    expect(mockUIResourceRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlProps: expect.objectContaining({
          iframeRenderData: { darkMode: false },
        }),
      }),
    );
  });

  test('should merge iframeRenderData with darkMode', () => {
    render(
      <UIResourceRenderer
        resource={mockResource}
        darkMode={true}
        iframeRenderData={{ databases: ['db1', 'db2'], customProp: 'value' }}
      />,
    );

    expect(mockUIResourceRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlProps: expect.objectContaining({
          iframeRenderData: {
            databases: ['db1', 'db2'],
            customProp: 'value',
            darkMode: true,
          },
        }),
      }),
    );
  });

  test('should not allow iframeRenderData to override darkMode prop', () => {
    render(
      <UIResourceRenderer
        resource={mockResource}
        darkMode={true}
        iframeRenderData={{ darkMode: false }}
      />,
    );

    expect(mockUIResourceRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        htmlProps: expect.objectContaining({
          iframeRenderData: { darkMode: true },
        }),
      }),
    );
  });
});
