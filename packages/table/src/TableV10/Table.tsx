import React from 'react';
import debounce from 'lodash/debounce';
import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useIsomorphicLayoutEffect,
  useViewportSize,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, transitionDuration } from '@leafygreen-ui/tokens';

import { HeaderRowProps } from './HeaderRow';
import { SortProvider } from './SortContext';
import TableBody from './TableBody';
import { TableProvider } from './TableContext';
import TableHead from './TableHead';
import { TableHeaderProps } from './TableHeader';

const lmShadowColor = transparentize(0.7, palette.black);
const dmShadowColor = transparentize(0.3, 'black');

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
    transition: opacity ${transitionDuration.default}ms ease-in-out;
  }
`;

const leftShadow = (darkMode: boolean) => css`
  left: 0;

  &:after {
    right: 100%;
    box-shadow: ${darkMode
      ? '4px 0 9px 5px ' + dmShadowColor
      : '4px 0 4px ' +
        lmShadowColor}; //TODO: Bug: currently the full height of the shadow is not showing unless the background color is removed from <tr>
  }
`;

const rightShadow = (darkMode: boolean) => css`
  right: 0;

  &:after {
    left: 100%;
    box-shadow: ${darkMode
      ? '-4px 0 9px 5px ' + dmShadowColor
      : '-4px 0 4px ' + lmShadowColor};
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

type ScrollState = (typeof ScrollState)[keyof typeof ScrollState];

/**
 * @deprecated
 */
export interface TableRowInterface<Shape = {}> {
  datum: Shape;
  index: number;
}

/**
 * @deprecated
 * @noDocgen
 */
export interface TableProps<Shape>
  extends Omit<HTMLElementProps<'table'>, 'children' | 'columns'> {
  /**
   * The array of data displayed in rows. Each array element's type is determined by the `Shape` generic.
   *
   * @type Array of Objects
   */
  data: Array<Shape>;

  /**
   * React element to render the table's header row.
   * @type Array of `<TableHeader />`
   */
  columns:
    | React.ReactElement<HeaderRowProps | TableHeaderProps<Shape>>
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps<Shape>>>
    | React.ReactFragment;

  /**
   * A function that takes in the datum of a single row as a parameter and returns a `JSX.Element` determining how it should be rendered.
   *
   * Should make use of the `<Cell>` component.
   * @type ({datum}) => JSX.Element
   */
  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;

  /**
   * Override the global `baseFontSize` set in LeafyGreenProvider
   */
  baseFontSize?: 14 | 16;

  /**
   * Determines whether or not the component will appear in dark mode.
   */
  darkMode?: boolean;
}

/**
 * @deprecated
 * @noDocgen
 */
export default function Table<Shape>({
  columns = [],
  data: dataProp = [],
  children,
  className,
  baseFontSize,
  darkMode: darkModeProp,
  ...rest
}: TableProps<Shape>) {
  const [scrollState, setScrollState] = React.useState<ScrollState>(
    ScrollState.None,
  );
  const divRef = React.useRef<HTMLDivElement>(null);
  const viewportSize = useViewportSize();
  const { darkMode } = useDarkMode(darkModeProp);

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
          className={cx(tableStyles, className)}
          {...rest}
        >
          <TableProvider data={dataProp}>
            <SortProvider>
              <LeafyGreenProvider
                darkMode={darkMode}
                baseFontSize={baseFontSize}
              >
                <TableHead columns={columns} />
                <TableBody>{children}</TableBody>
              </LeafyGreenProvider>
            </SortProvider>
          </TableProvider>
        </table>
      </div>
    </div>
  );
}
Table.displayName = 'Table';
//  TODO: missing proptypes
