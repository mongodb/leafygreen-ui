import React from 'react';
import debounce from 'lodash/debounce';
import { transparentize } from 'polished';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { cx, css } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette, uiColors } from '@leafygreen-ui/palette';
import {
  useIsomorphicLayoutEffect,
  useViewportSize,
} from '@leafygreen-ui/hooks';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { TableProvider } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { SortProvider } from './SortContext';
import { FontSizeProvider } from './FontSizeContext';
import { DarkModeProvider } from './DarkModeContext';

const lmShadowColor = transparentize(0.7, palette.black);
const dmShadowColor = transparentize(0.2, uiColors.black);

const containerStyle = css`
  position: relative;
  max-width: 100%;
`;

const tableStyles = css`
  font-family: ${fontFamilies.default};
  position: relative;
  border-collapse: collapse;
  box-sizing: border-box;
  width: 100%;
  z-index: 0;
`;

const shadow = css`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16px;
  overflow: hidden;
  pointer-events: none;

  &:after {
    opacity: 0;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16px;
    border-radius: 100%;
    transition: opacity 150ms ease-in-out;
  }
`;

const leftShadow = (darkMode: boolean) => css`
  left: 0;

  &:after {
    right: 100%;
    box-shadow: 4px 0 4px ${darkMode ? dmShadowColor : lmShadowColor};
  }
`;

const rightShadow = (darkMode: boolean) => css`
  right: 0;

  &:after {
    left: 100%;
    box-shadow: -4px 0 4px ${darkMode ? dmShadowColor : lmShadowColor};
  }
`;

const showScroll = css`
  &:after {
    opacity: 1;
  }
`;

const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

type ScrollState = typeof ScrollState[keyof typeof ScrollState];

export interface TableRowInterface<Shape = {}> {
  datum: Shape;
}

export interface TableProps<Shape> extends HTMLElementProps<'table', never> {
  /**
   * The array of data displayed in rows. Each array element's type is determined by the `Shape` generic.
   */
  data: Array<Shape>;
  /**
   * React element to render the table's header row.
   */
  columns:
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps<Shape>>>
    | React.ReactFragment;
  /**
   * A function that takes in the datum of a single row as a parameter and returns a `JSX.Element` determining how it should be rendered.
   *
   * Should make use of the `<Cell>` component.
   */
  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
  /**
   * Override the global `baseFontSize` set in LeafygreenProvider
   */
  baseFontSize?: 14 | 16;
  darkMode?: boolean;
}

export default function Table<Shape>({
  columns = [],
  data: dataProp = [],
  children,
  className,
  baseFontSize: baseFontSizeProp,
  darkMode = false,
  ...rest
}: TableProps<Shape>) {
  const [scrollState, setScrollState] = React.useState<ScrollState>(
    ScrollState.None,
  );
  const divRef = React.useRef<HTMLDivElement>(null);
  const viewportSize = useViewportSize();

  const providerFontSize = useBaseFontSize();
  const normalizedProviderFontSize =
    providerFontSize === 14 || providerFontSize === 16 ? providerFontSize : 14;
  const baseFontSize = baseFontSizeProp ?? normalizedProviderFontSize;

  useIsomorphicLayoutEffect(() => {
    const divNode = divRef.current;

    if (divNode == null) {
      return;
    }

    if (divNode.scrollWidth > divNode.clientWidth) {
      setScrollState(ScrollState.Right);
    } else if (
      viewportSize != null &&
      divNode.getBoundingClientRect().width <= viewportSize.width
    ) {
      setScrollState(ScrollState.None);
    }
  }, [viewportSize]);

  const handleScroll = (e: React.UIEvent) => {
    const { scrollWidth, clientWidth: elementWidth } =
      e.target as HTMLDivElement;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = (e.target as HTMLDivElement).scrollLeft;
      const maxPosition = scrollWidth - elementWidth;

      if (scrollPosition > 0 && scrollPosition < maxPosition) {
        setScrollState(ScrollState.Both);
      } else if (scrollPosition > 0) {
        setScrollState(ScrollState.Left);
      } else if (scrollPosition < maxPosition) {
        setScrollState(ScrollState.Right);
      }
    }
  };

  const debounceScroll = debounce(handleScroll, 50, { leading: true });

  const onScroll: React.EventHandler<React.UIEvent> = e => {
    e.persist();
    debounceScroll(e);
  };

  const showLeft =
    scrollState === ScrollState.Left || scrollState === ScrollState.Both;
  const showRight =
    scrollState === ScrollState.Right || scrollState === ScrollState.Both;

  return (
    <div className={containerStyle}>
      <div
        className={cx(shadow, leftShadow(darkMode), {
          [showScroll]: showLeft,
        })}
      />
      <div
        className={cx(shadow, rightShadow(darkMode), {
          [showScroll]: showRight,
        })}
      />

      <div
        ref={divRef}
        onScroll={onScroll}
        className={cx(
          css`
            overflow-x: auto;
          `,
        )}
      >
        <table
          cellSpacing="0"
          cellPadding="0"
          className={cx(
            tableStyles,
            {
              // TODO: Refresh - remove darkMode override
              [css`
                border-bottom: 1px solid ${uiColors.gray.dark1};
                font-family: ${fontFamilies.legacy};
              `]: darkMode,
            },
            className,
          )}
          {...rest}
        >
          <TableProvider data={dataProp}>
            <SortProvider>
              <FontSizeProvider baseFontSize={baseFontSize}>
                <DarkModeProvider darkMode={darkMode}>
                  <TableHead columns={columns} />
                  <TableBody>{children}</TableBody>
                </DarkModeProvider>
              </FontSizeProvider>
            </SortProvider>
          </TableProvider>
        </table>
      </div>
    </div>
  );
}
