import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const segmentPartsWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: 1px;
`;

export const separatorLiteralStyles = css`
  user-select: none;
`;

export const separatorLiteralDisabledStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
};

export const getSeparatorLiteralStyles = ({
  theme,
  disabled = false,
}: {
  theme: Theme;
  disabled?: boolean;
}) => {
  return cx(separatorLiteralStyles, {
    [separatorLiteralDisabledStyles[theme]]: disabled,
  });
};

export const getSegmentPartsWrapperStyles = ({
  className,
}: {
  className?: string;
}) => {
  return cx(segmentPartsWrapperStyles, className);
};
