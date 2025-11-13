import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

export const segmentPartsWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: 1px;
`;

export const separatorLiteralStyles = css`
  user-select: none;
`;

export const getSeparatorLiteralDisabledStyles = (theme: Theme) =>
  css`
    color: ${color[theme].text[Variant.Disabled][InteractionState.Default]};
  `;

export const getSeparatorLiteralStyles = ({
  theme,
  disabled = false,
}: {
  theme: Theme;
  disabled?: boolean;
}) => {
  return cx(separatorLiteralStyles, {
    [getSeparatorLiteralDisabledStyles(theme)]: disabled,
  });
};

export const getSegmentPartsWrapperStyles = ({
  className,
}: {
  className?: string;
}) => {
  return cx(segmentPartsWrapperStyles, className);
};
