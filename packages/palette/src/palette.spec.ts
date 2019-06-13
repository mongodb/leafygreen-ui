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

const allColors: Array<string | HueRange> = Object.values(uiColors);
describe('packages/palette', function() {
  // eslint-disable-next-line no-console
  console.log(
    `Dummy test to trigger a type error if any of the exported colors don't match the expected interface`,
    allColors,
  );
});
