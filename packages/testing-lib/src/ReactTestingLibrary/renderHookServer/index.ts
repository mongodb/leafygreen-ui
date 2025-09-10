import path from 'path';

import { isReact17 } from '../utils/isReact17';

import type {
  RenderHookServerOptions,
  RenderHookServerResult,
} from './renderHookServer.types';

export type { RenderHookServerOptions, RenderHookServerResult };

/**
 * Correct `renderHookServer` method based on React version.
 */
export const renderHookServer: <Hook extends () => any>(
  useHook: Hook,
  options?: RenderHookServerOptions,
) => RenderHookServerResult<Hook> = (() => {
  const filename = isReact17() ? 'renderHookServer17' : 'renderHookServer18';
  const RHS = require(path.resolve(__dirname, filename));
  return RHS.renderHookServer;
})();
