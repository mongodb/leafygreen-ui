import type { LottieProps } from 'react-lottie-player';

type RendererSettings = LottieProps['rendererSettings'];

export const lottieRendererSettings: RendererSettings = {
  runExpressions: false,
};
