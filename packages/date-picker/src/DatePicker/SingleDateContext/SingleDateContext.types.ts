import { DateType } from '../../shared';
import { DatePickerProps } from '../DatePicker.types';

export interface SingleDateContextProps {
  value: DateType | undefined;
  setValue: (newVal: DateType | undefined) => void;
  handleValidation: DatePickerProps['handleValidation'];
  today: Date;
  month: Date;
  setMonth: React.Dispatch<React.SetStateAction<Date>>;
  highlight: DateType;
  setHighlight: React.Dispatch<React.SetStateAction<DateType>>;
  // TODO:
  // getHighlightedCell: () => HTMLTableCellElement | null | undefined;
}

export interface SingleDateProviderProps {
  value: DateType | undefined;
  setValue: (newVal: DateType) => void;
  handleValidation?: DatePickerProps['handleValidation'];
}
