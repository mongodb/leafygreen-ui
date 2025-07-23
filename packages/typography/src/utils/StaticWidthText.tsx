import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import {
  Polymorph,
  PolymorphicAs,
  PolymorphicPropsWithRef,
} from '@leafygreen-ui/polymorphic';

interface LocalProps {
  /**
   * The maximum future weight of the text. Determines the width of the component.
   * @default 700
   */
  maxFontWeight?: React.CSSProperties['fontWeight'];
  /**
   * Defines the pseudo element used to force the element width
   */
  pseudoElement?: 'before' | 'after';
}

type StaticWidthTextProps<T extends PolymorphicAs> = PolymorphicPropsWithRef<
  T,
  LocalProps
>;

const staticWidthTextStyle = ({
  pseudoElement,
  maxFontWeight,
}: Pick<StaticWidthTextProps<any>, 'pseudoElement' | 'maxFontWeight'>) => {
  const pseudoSelector = `&:${pseudoElement}`;

  return css`
    /* Inherit relevant properties from the parent */
    font-weight: inherit;
    font-size: inherit;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    text-decoration: none;
    min-width: 0;
    max-width: 100%;

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
 *
 * A wrapper component to ensure that updating the font weight does not affect the width of the element,
 * and prevents layout shift should the font weight change.
 *
 * Useful for showing a bold effect on hover, focus, or active (See `Tabs`, `MenuItem`).
 *
 * Will add an ellipsis if the text would extend beyond the parent,
 * or if the bold text is significantly larger than the regular text
 * (This is rare, and will only occur with _very_ long text)
 *
 * Note: does not support wrapped text (i.e. text within a paragraph)
 *
 * @internal
 *
 */
export function StaticWidthText<T extends PolymorphicAs = 'span'>({
  as,
  children,
  maxFontWeight = 700,
  pseudoElement = 'after',
  className,
  ...rest
}: StaticWidthTextProps<T>) {
  // calling getNodeTextContent in case a node gets passed in without TS
  const textContent = getNodeTextContent(children);
  return (
    <Polymorph
      className={cx(
        staticWidthTextStyle({ pseudoElement, maxFontWeight }),
        className,
      )}
      as={as ?? ('span' as PolymorphicAs)}
      data-text={textContent}
      {...rest}
    >
      <span className={childWrapper}>{children}</span>
    </Polymorph>
  );
}
