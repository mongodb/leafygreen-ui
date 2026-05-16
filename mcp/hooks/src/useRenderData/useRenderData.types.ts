export interface RenderDataMessage {
  type: string;
  payload?: {
    renderData?: unknown;
  };
}

export interface BaseRenderData {
  darkMode?: boolean;
}

export interface UseRenderDataOptions {
  /**
   * List of allowed origins for postMessage communication.
   * If provided, messages from other origins will be ignored.
   *
   * Note: Sandboxed iframes or local files (file://) have an origin of `"null"`.
   * You must include `"null"` in this list if you wish to support those contexts.
   */
  allowedOrigins?: Array<string>;
}

export interface UseRenderDataResult<T> {
  data: (T & BaseRenderData) | null;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
}

export type ValidationResult<T> =
  | { valid: true; data: T & BaseRenderData }
  | { valid: false; error: string | null };
