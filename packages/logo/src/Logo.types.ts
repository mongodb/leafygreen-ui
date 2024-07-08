import { HTMLElementProps } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const SupportedColors = {
  White: 'white',
  Black: 'black',
  GreenDark2: 'green-dark-2',
  GreenBase: 'green-base',
} as const;

type SupportedColors = (typeof SupportedColors)[keyof typeof SupportedColors];

const SupportedColorsMap: Record<SupportedColors, string> = {
  [SupportedColors.White]: palette.white,
  [SupportedColors.Black]: palette.black,
  [SupportedColors.GreenDark2]: palette.green.dark2,
  [SupportedColors.GreenBase]: palette.green.base,
} as const;

type SupportedColorsMap =
  (typeof SupportedColorsMap)[keyof typeof SupportedColorsMap];

export { SupportedColors, SupportedColorsMap };

export interface BaseLogoProps extends HTMLElementProps<'svg'> {
  /**
   * Determines Color of the Logo or LogoMark component.
   *
   * @default 'green-dark-2'
   */
  color?: SupportedColors;

  /**
   * Determines height of the Logo or LogoMark component.
   *
   * @default 40
   */
  height?: number;
}

export type ProductLogoProps = HTMLElementProps<'svg', never> & {
  knockout?: boolean;
  size?: number;
  darkMode?: boolean;
  height?: number;
};

export const LogoNames = [
  'MongoDBLogoMark',
  'MongoDBLogo',
  'AtlasNavGraphic',
  'AtlasLogoLockup',
  'AtlasForGovernmentLogoLockup',
  'EnterpriseAdvancedLogoLockup',
  'CommunityEditionLogoLockup',
  'UniversityLogoLockup',
] as const;

export type LogoName = (typeof LogoNames)[number];

export interface LogoProps extends BaseLogoProps {
  /**
   * The name of the logo to render
   * @required
   */
  name: LogoName;
}
