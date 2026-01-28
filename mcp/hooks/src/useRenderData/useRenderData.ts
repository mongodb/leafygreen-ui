import { useEffect, useState } from 'react';

import {
  BaseRenderData,
  RenderDataMessage,
  UseRenderDataResult,
} from './useRenderData.types';

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
  const [prefersDarkMode, setPrefersDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<RenderDataMessage>): void => {
      if (event.data?.type !== 'ui-lifecycle-iframe-render-data') {
        return;
      }

      if (!event.data.payload || typeof event.data.payload !== 'object') {
        const errorMsg = 'Invalid payload structure received';
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      const renderData = event.data.payload.renderData;

      if (renderData === undefined || renderData === null) {
        setIsLoading(false);
        return;
      }

      if (typeof renderData !== 'object') {
        const errorMsg = `Expected object but received ${typeof renderData}`;
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      setData(renderData as T & BaseRenderData);
      setIsLoading(false);
      setError(null);
    };

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'ui-lifecycle-iframe-ready' }, '*');

    return (): void => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const darkMode = data?.darkMode ?? prefersDarkMode;

  return {
    data,
    isLoading,
    error,
    darkMode,
  };
}
