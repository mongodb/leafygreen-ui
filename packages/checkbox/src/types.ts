import { createDataProp } from '@leafygreen-ui/lib';

export interface CheckProps {
  isChecked: boolean;
  disabled: boolean;
  animate: boolean;
  selector: ReturnType<typeof createDataProp>;
  indeterminate?: boolean;
}
