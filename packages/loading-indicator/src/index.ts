import PageLoader, { type PageLoaderProps } from './PageLoader';
import { Spinner, SpinnerDirection, type SpinnerProps } from './Spinner';
export {
  PageLoader,
  type PageLoaderProps,
  /**
   * @deprecated - Importing this component from package root bundles Lottie, a heavy run-time animation library.
   * For simple loading spinners, prefer importing the tree-shaken version from `@leafygreen-ui/loading-indicator/spinner`
   */
  Spinner,
  SpinnerDirection,
  type SpinnerProps,
};
