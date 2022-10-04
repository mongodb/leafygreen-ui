import React from 'react';
import isStageElement from './isStageElement';
import Stage from '../Stage';
import { Size } from '../types';

describe('packages/pipeline/utils/isStageElement', () => {
  test('returns "true" if the element is a "Stage" element', () => {
    const props = {
      size: Size.XSmall,
      children: '$legitimate',
    };
    const element = <Stage {...props} />;
    const result = isStageElement(element);

    expect(result).toEqual(true);
  });

  test('returns "false" if the element is NOT a "Stage" element', () => {
    const NotStage = () => null;
    const element = <NotStage />;
    const result = isStageElement(element);

    expect(result).toEqual(false);
  });
});
