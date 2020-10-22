import createEmotion, {
  ArrayInterpolation,
  Emotion,
  Interpolation,
  ObjectInterpolation,
} from 'create-emotion';

interface CreateEmotionConfig {
  key: string;
  container?: HTMLElement;
}

// Emotion's typing for `css` allows interpolating arbitrary Array types, so
// we re-export `css` with a more constrained typing. We disallow arbitrary
// Array types but allow Objects since they are still used by `facepaint` to
// interpolate dynamic style objects.
export type LGInterpolation<MP = undefined> =
  | Exclude<Interpolation<MP>, ArrayInterpolation<MP>>
  | Array<ObjectInterpolation<MP>>;

interface LGEmotion extends Emotion {
  css(template: TemplateStringsArray, ...args: Array<LGInterpolation>): string;
  css(...args: Array<LGInterpolation>): string;
}

// In case the original emotion, and create-emotion packages become unsupported,
// we should consider implementing our own wrapper around createCache like what's
// being done here:
//
// https://github.com/emotion-js/emotion/blob/master/packages/create-emotion/src/index.js
function createEmotionInstance(): LGEmotion {
  const config: CreateEmotionConfig = {
    key: 'leafygreen-ui',
  };

  if (typeof window !== 'undefined') {
    config.container = document.createElement('div');

    const head = document.head;
    head.insertBefore(config.container, head.firstChild);
  }

  return createEmotion(config);
}

export default createEmotionInstance();
