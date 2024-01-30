import type { LottieProps } from 'react-lottie-player';

type RendererSettings = LottieProps['rendererSettings'];

export const lottieRendererSettings: RendererSettings = {
  // @ts-expect-error - waiting on https://github.com/airbnb/lottie-web/pull/3050
  runExpressions: false,
};
