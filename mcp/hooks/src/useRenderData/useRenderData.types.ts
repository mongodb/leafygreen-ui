export interface RenderDataMessage {
  type: string;
  payload?: {
    renderData?: unknown;
  };
}

export interface BaseRenderData {
  darkMode?: boolean;
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
