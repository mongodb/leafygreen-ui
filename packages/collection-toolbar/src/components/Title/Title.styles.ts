import { css, cx } from "@leafygreen-ui/emotion";
import { createUniqueClassName } from "@leafygreen-ui/lib";

export const titleClassName = createUniqueClassName('title');

export const baseStyles = css`
  flex: 1;
`;

export const getTitleStyles = ({ className }: { className?: string }) => {
    return cx(titleClassName, baseStyles, className);
};