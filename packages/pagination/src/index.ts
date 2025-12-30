import Pagination from './Pagination';
export type { PaginationProps } from './Pagination';
export {
  type NavigationProps,
  default as PaginationNavigation,
} from './Pagination/Navigation';
export {
  type PageSizeProps,
  default as PaginationPageSize,
} from './Pagination/PageSize';
export {
  default as PaginationSummary,
  type SummaryProps,
} from './Pagination/Summary';

/**
 * @deprecated Use named export `{ Pagination }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
 */
export default Pagination;
export { Pagination };
