export { InputBox, type InputBoxProps } from './InputBox';
export { InputSegment, type InputSegmentProps } from './InputSegment';
export {
  type InputSegmentChangeEventHandler,
  type InputSegmentComponentProps,
  isInputSegment,
  Size,
} from './shared.types';
export {
  createExplicitSegmentValidator,
  type ExplicitSegmentRule,
  getSegmentToFocus,
  getValueFormatter,
  isElementInputSegment,
  isValidSegmentName,
  isValidSegmentValue,
  isValidValueForSegment,
} from './utils';
