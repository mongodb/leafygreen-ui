import React from 'react';
import Box from '@leafygreen-ui/box';
import { getNodeTextContent, HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';

type StaticWidthTextProps<T extends keyof JSX.IntrinsicElements> =
  HTMLElementProps<T> & {
    /**
     * The maximum future weight of the text. Determines the width of the component.
     * @default 700
     */
    maxFontWeight?: React.CSSProperties['fontWeight'];
    /**
     * Defines the pseudo element used to force the element width
     */
    pseudoElement?: 'before' | 'after';
    as?: T;
  };

const staticWidthTextStyle = ({
  pseudoElement,
  maxFontWeight,
}: Pick<StaticWidthTextProps<any>, 'pseudoElement' | 'maxFontWeight'>) => {
  const pseudoSelector = `&:${pseudoElement}`;

  return css`
    /* Inherit relevant properties from the parent */
    font-weight: inherit;
    font-size: inherit;
    white-space: inherit;
    overflow: inherit;
    text-overflow: inherit;

    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-decoration: none;
    min-width: 0;

    ${pseudoSelector} {
      content: attr(data-text);
      height: 0;
      font-weight: ${maxFontWeight};
      visibility: hidden;
      overflow: hidden;
      user-select: none;
      pointer-events: none;
    }
  `;
};

const childWrapper = css`
  flex: 1;
  min-width: 0;
  max-width: 100%;

  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
`;

/**
 * Ensures that updating the font weight (of this component or the parent) does not affect the width of the component,
 * and prevents layout shift should the font weight change
 */
export function StaticWidthText<T extends keyof JSX.IntrinsicElements>({
  as = 'span' as T,
  children,
  maxFontWeight = 700,
  pseudoElement = 'after',
  className,
  ...rest
}: StaticWidthTextProps<T>) {
  const textValue = getNodeTextContent(children);

  return (
    <Box
      className={cx(
        staticWidthTextStyle({ pseudoElement, maxFontWeight }),
        className,
      )}
      as={as}
      data-text={textValue}
      {...rest}
    >
      <span className={childWrapper}>{children}</span>
    </Box>
  );
}
