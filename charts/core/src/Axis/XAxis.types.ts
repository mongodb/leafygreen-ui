import { AxisProps, AxisType } from './Axis.types';

export const XAxisType = AxisType;
type XAxisType = (typeof XAxisType)[keyof typeof XAxisType];

export type XAxisProps = AxisProps;
