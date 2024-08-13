import React, { createRef, useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderHook } from '@leafygreen-ui/testing-lib';

import OverlayProvider, { useOverlayContext } from './OverlayContext';

function TestComponent() {
  const { getOverlays, registerOverlay, removeOverlay, topMostOverlay } =
    useOverlayContext();
  const [id, setId] = useState(1);

  const registerNewOverlay = () => {
    registerOverlay({
      element: document.createElement('div'),
      id: '' + id,
      ref: createRef<HTMLElement>(),
    });
    setId(prev => prev + 1);
  };

  const removeTopMostOverlay = () => {
    if (!topMostOverlay) return;

    removeOverlay(topMostOverlay.id);
    setId(prev => prev - 1);
  };

  return (
    <div>
      <span>Overlays count: {getOverlays().length}</span>
      <span>Top most overlay ID: {topMostOverlay?.id}</span>
      <button onClick={registerNewOverlay}>Register overlay</button>
      <button onClick={removeTopMostOverlay}>Remove overlay</button>
    </div>
  );
}

function renderProviderWithChildren() {
  return render(
    <OverlayProvider>
      <TestComponent />
    </OverlayProvider>,
  );
}

describe('OverlayProvider', () => {
  test('registers an overlay', () => {
    const { getByText } = renderProviderWithChildren();

    expect(getByText('Overlays count: 0')).toBeInTheDocument();

    userEvent.click(getByText('Register overlay'));

    expect(getByText('Overlays count: 1')).toBeInTheDocument();
    expect(getByText('Top most overlay ID: 1')).toBeInTheDocument();
  });

  test('removes an overlay', () => {
    const { getByText } = renderProviderWithChildren();

    userEvent.click(getByText('Register overlay'));
    userEvent.click(getByText('Register overlay'));

    expect(getByText('Overlays count: 2')).toBeInTheDocument();
    expect(getByText('Top most overlay ID: 2')).toBeInTheDocument();

    userEvent.click(getByText('Remove overlay'));

    expect(getByText('Overlays count: 1')).toBeInTheDocument();
    expect(getByText('Top most overlay ID: 1')).toBeInTheDocument();
  });
});

describe('useOverlayContext', () => {
  test('provides expected context values when used within OverlayProvider', () => {
    const wrapper = ({ children }) => (
      <OverlayProvider>{children}</OverlayProvider>
    );
    const { result } = renderHook(useOverlayContext, { wrapper });

    expect(result.current).toHaveProperty('getOverlays');
    expect(result.current).toHaveProperty('registerOverlay');
    expect(result.current).toHaveProperty('removeOverlay');
    expect(result.current).toHaveProperty('topMostOverlay');
  });

  test('throws an error when used outside of OverlayProvider', () => {
    try {
      renderHook(useOverlayContext);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        'useOverlayContext must be used within an OverlayProvider',
      );
    }
  });
});
