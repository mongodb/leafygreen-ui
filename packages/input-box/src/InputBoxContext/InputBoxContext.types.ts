import {
  InputSegmentChangeEventHandler,
  SharedInputBoxTypes,
} from '../shared/types';

export interface InputBoxContextType<Segment extends string = string>
  extends SharedInputBoxTypes<Segment> {
  /**
   *  The handler for the onChange event that will be read in the InputSegment component
   */
  onChange: InputSegmentChangeEventHandler<Segment, string>;

  /**
   * The handler for the onBlur event that will be read by the InputSegment component
   */
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export interface InputBoxProviderProps<Segment extends string>
  extends InputBoxContextType<Segment> {}
