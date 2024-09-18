import { RenderMode } from '../Popover.types';

import { getRenderMode } from './getRenderMode';

describe('getRenderMode', () => {
  describe('when usePortal is defined', () => {
    test(`should return ${RenderMode.Portal} when usePortal is true`, () => {
      const renderMode = RenderMode.Portal;
      const usePortal = true;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.Portal);
    });

    test(`should return ${RenderMode.Inline} when usePortal is false`, () => {
      const renderMode = RenderMode.Inline;
      const usePortal = false;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.Inline);
    });
  });

  describe('when usePortal is undefined', () => {
    const usePortal = undefined;
    test(`should return ${RenderMode.TopLayer} when renderMode is undefined`, () => {
      const renderMode = undefined;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.TopLayer);
    });

    test(`should return ${RenderMode.TopLayer} when renderMode is ${RenderMode.TopLayer}`, () => {
      const renderMode = RenderMode.TopLayer;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.TopLayer);
    });

    test(`should return ${RenderMode.Inline} when renderMode is ${RenderMode.Inline}`, () => {
      const renderMode = RenderMode.Inline;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.Inline);
    });

    test(`should return ${RenderMode.Portal} when renderMode is ${RenderMode.Portal}`, () => {
      const renderMode = RenderMode.Portal;
      const result = getRenderMode(renderMode, usePortal);
      expect(result).toBe(RenderMode.Portal);
    });
  });
});
