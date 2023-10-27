import { RenderedContext } from '@leafygreen-ui/input-option';

export interface DropdownProvider {
  handleDropdownClose?: () => void;
  renderedContext?: RenderedContext;
}
