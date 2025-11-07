import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { Size } from '@leafygreen-ui/tokens';

import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

type SegmentEnumObject<Segment extends string> = Record<string, Segment>;

export interface InputBoxContextType<Segment extends string = string> {
  charsPerSegment: Record<Segment, number>;
  disabled: boolean;
  segmentEnum: SegmentEnumObject<Segment>;
  onChange: InputSegmentChangeEventHandler<Segment, string>;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  segmentRefs: Record<Segment, ReturnType<DynamicRefGetter<HTMLInputElement>>>;
  segments: Record<Segment, string>;
  labelledBy?: string;
  size: Size;
}

export interface InputBoxProviderProps<Segment extends string>
  extends InputBoxContextType<Segment> {}
