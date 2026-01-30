import { useEffect, useState } from 'react';

import {
  BaseRenderData,
  RenderDataMessage,
  UseRenderDataResult,
  ValidationResult,
} from './useRenderData.types';

const MESSAGE_TYPE_RENDER_DATA = 'ui-lifecycle-iframe-render-data';
const MESSAGE_TYPE_IFRAME_READY = 'ui-lifecycle-iframe-ready';

/**
 * Validates the render data from a message event.
 * Returns either the validated data or an error message.
 */
function validateRenderData<T>(
  event: MessageEvent<RenderDataMessage>,
): ValidationResult<T> | null {
  const isRenderDataMessage = event.data?.type === MESSAGE_TYPE_RENDER_DATA;

  if (!isRenderDataMessage) {
    return null;
  }

  const { payload } = event.data;
  const isValidPayload = payload && typeof payload === 'object';

  if (!isValidPayload) {
    return { valid: false, error: 'Invalid payload structure received' };
  }

  const { renderData } = payload;
  const hasData = renderData !== undefined && renderData !== null;

  if (!hasData) {
    return { valid: false, error: null };
  }

  if (typeof renderData !== 'object') {
    return {
      valid: false,
      error: `Expected object but received ${typeof renderData}`,
    };
  }

  return { valid: true, data: renderData as T & BaseRenderData };
}

/**
 * Hook for receiving render data from parent window via postMessage.
 * This is used by iframe-based UI components that receive data from an MCP client.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, darkMode, isLoading } = useRenderData<{ items: string[] }>();
 * }
 * ```
 */
export function useRenderData<T = unknown>(): UseRenderDataResult<T> {
  const [data, setData] = useState<(T & BaseRenderData) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(
    () =>
      !!(
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ),
  );

  useEffect(function setupDarkModeListener() {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(function handleMessages() {
    const handleMessage = (event: MessageEvent<RenderDataMessage>): void => {
      const result = validateRenderData<T>(event);

      if (result === null) {
        return;
      }

      if (!result.valid) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      setData(result.data);
      setError(null);
      setIsLoading(false);
    };

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: MESSAGE_TYPE_IFRAME_READY }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const darkMode = data?.darkMode ?? prefersDarkMode;

  return {
    data,
    isLoading,
    error,
    darkMode,
  };
}
