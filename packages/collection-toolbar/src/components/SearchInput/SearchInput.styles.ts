import { css, cx } from "@leafygreen-ui/emotion";

import { Size,Variant } from "../../shared.types";

export const baseStyles = css`
  width: 100%;
`;

export const getSearchInputStyles = ({ variant = Variant.Default, size = Size.Default, className }: { variant?: Variant, size?: Size, className?: string }) => {
  return cx(
    baseStyles,
    css`
      width: 100%;
    `,
    className,
  );
};