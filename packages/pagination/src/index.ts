import Pagination from './Pagination';
export type { PaginationProps } from './Pagination';
export {
  default as PaginationCurrentPageControls,
  type PaginationCurrentPageControlsProps,
} from './Pagination/PaginationCurrentPageControls';
export {
  default as PaginationItemsPerPage,
  type PaginationItemsPerPageProps,
} from './Pagination/PaginationItemsPerPage';
export {
  default as PaginationRangeView,
  type PaginationRangeViewProps,
} from './Pagination/PaginationRangeView';

/**
 * @deprecated Use named export `{ Pagination }` instead. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.
 */
export default Pagination;
export { Pagination };
