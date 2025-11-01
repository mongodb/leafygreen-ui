import { AxisProps, AxisType } from './Axis.types';

export const YAxisType = AxisType;
type YAxisType = (typeof YAxisType)[keyof typeof YAxisType];

export type YAxisProps = AxisProps;
