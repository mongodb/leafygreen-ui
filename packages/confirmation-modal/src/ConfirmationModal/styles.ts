import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { typeScales } from '@leafygreen-ui/tokens';

import { Variant } from './ConfirmationModal.types';

export const titleStyle = css`
  line-height: 32px;
  margin-bottom: 10px;
`;

export const baseModalStyle = css`
  width: 600px;
  padding: initial;
  letter-spacing: 0;
`;

export const contentStyle = css`
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

export const contentDarkModeStyles = css`
  color: ${palette.gray.light1};
`;

export const contentVariantStyles: Record<Variant, string> = {
  [Variant.Default]: css`
    padding: 40px 36px 0px;
  `,
  [Variant.Danger]: css`
    padding: 40px 36px 0px 78px;
  `,
};

export const textEntryInputStyle = css`
  width: 300px;
  margin-top: 14px;

  label {
    margin-bottom: 3px;
  }
`;

export const buttonStyle = css`
  margin: 0 2px;

  &:first-of-type {
    margin: 0 0 0 5px;
  }

  &:last-of-type {
    margin: 0 5px 0 0;
  }
`;

export const warningIconStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 36px;
  top: 40px;

  svg {
    margin-top: -3px;
  }
`;

export const warningIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background: ${palette.red.light3};
  `,
  [Theme.Dark]: css`
    background: ${palette.red.dark2};
  `,
};
