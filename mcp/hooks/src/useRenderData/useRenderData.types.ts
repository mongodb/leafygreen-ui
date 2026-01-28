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
