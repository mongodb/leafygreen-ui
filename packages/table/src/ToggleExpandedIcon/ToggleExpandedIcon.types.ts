import { RowProps } from '../Row/Row.types';

export default interface ToggleExpandedIconProps
  extends Pick<RowProps<unknown>, 'disabled'> {
  isExpanded: boolean;
  toggleExpanded: () => void;
}
