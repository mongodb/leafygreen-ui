import { uiColors } from '.';

interface HueRange {
  dark3: string;
  dark2?: string;
  dark1?: string;
  base: string;
  light1?: string;
  light2?: string;
  light3: string;
}

const requiredKeys = new Set(['dark3', 'base', 'light3']);
const optionalKeys = new Set(['dark2', 'dark1', 'light1', 'light2']);

const allColors: Array<string | HueRange> = Object.values(uiColors);
describe('packages/palette', function () {
  test('all colors have only expected hues', () => {
    allColors.forEach(color => {
      if (typeof color === 'string') {
        return;
      }

      Object.keys(color).forEach(hue => {
        expect(requiredKeys.has(hue) || optionalKeys.has(hue)).toBeTruthy();
      });
    });
  });

  test('all colors have all required hues', () => {
    allColors.forEach(color => {
      if (typeof color === 'string') {
        return;
      }

      requiredKeys.forEach(hue => {
        expect(hue in color).toBeTruthy();
      });
    });
  });
});
