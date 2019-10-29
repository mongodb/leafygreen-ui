import React from 'react';
import isStageElement from './isStageElement';
import Stage from '../Stage';
import { Size, Variant } from '../styles';

describe('packages/pipeline/utils/isStageElement', () => {
  test('returns "true" if the element is a "Stage" element', () => {
    const props = {
      size: Size.XSmall,
      variant: Variant.Default,
      children: '$legitimate',
    };
    const element = React.createElement(Stage, props);
    const result = isStageElement(element);

    expect(result).toEqual(true);
  });

  test('returns "false" if the element is NOT a "Stage" element', () => {
    const NotStage = () => null;
    const element = React.createElement(NotStage);
    const result = isStageElement(element);

    expect(result).toEqual(false);
  });
});
