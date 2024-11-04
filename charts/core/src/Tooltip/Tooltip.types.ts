import { CallbackDataParams } from 'echarts/types/dist/shared';

export type AxisFormatterCallbackParams = Array<
  CallbackDataParams & {
    axisDim: string;
    axisId: string;
    axisIndex: number;
    axisType: string;
    axisValue: string | number;
    axisValueLabel: string | number;
  }
>;
