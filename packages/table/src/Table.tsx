import React from 'react';
import debounce from 'lodash/debounce';
import { transparentize } from 'polished';
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  useIsomorphicLayoutEffect,
  useViewportSize,
} from '@leafygreen-ui/hooks';
import { HeaderRowProps } from './HeaderRow';
import { TableHeaderProps } from './TableHeader';
import { TableProvider } from './TableContext';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { SortProvider } from './SortContext';

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const ScrollState = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  Both: 'both',
} as const;

type ScrollState = typeof ScrollState[keyof typeof ScrollState];

function getScrollShadowStyle(scrollState: ScrollState): string {
  const shadowColor = transparentize(0.6, uiColors.gray.dark1);

  switch (scrollState) {
    case ScrollState.Both:
      return css`
        box-shadow: inset 6px 0 6px -6px ${shadowColor},
          inset -6px 0 6px -6px ${shadowColor},
          inset 0 6px 6px -6px ${uiColors.gray.light3},
          inset 0 -6px 6px -6px ${uiColors.gray.light3};
      `;

    case ScrollState.Left:
      return css`
        box-shadow: inset 6px 0 6px -6px ${shadowColor};
      `;

    case ScrollState.Right:
      return css`
        box-shadow: inset -6px 0 6px -6px ${shadowColor};
      `;

    case ScrollState.None:
    default:
      return '';
  }
}

interface TableRowInterface<Shape = {}> {
  datum: Shape;
}

export interface TableProps<Shape>
  extends React.ComponentPropsWithoutRef<'table'> {
  data: Array<Shape>;
  columns:
    | Array<React.ReactElement<HeaderRowProps | TableHeaderProps<Shape>>>
    | React.ReactFragment;

  children: (TableRowArgs: TableRowInterface<Shape>) => JSX.Element;
}

export default function Table<Shape>({
  columns = [],
  data: dataProp = [],
  children,
  className,
  ...rest
}: TableProps<Shape>) {
  const [scrollState, setScrollState] = React.useState<ScrollState>(
    ScrollState.None,
  );
  const divRef = React.useRef<HTMLDivElement>(null);
  const viewportSize = useViewportSize();

  useIsomorphicLayoutEffect(() => {
    const ref = divRef.current;

    if (ref == null) {
      return;
    }

    if (ref.scrollWidth > ref.clientWidth) {
      setScrollState(ScrollState.Right);
    } else if (
      viewportSize != null &&
      ref.getBoundingClientRect().width <= viewportSize.width
    ) {
      setScrollState(ScrollState.None);
    }
  }, [viewportSize]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollWidth, clientWidth: elementWidth } = e.target as HTMLElement;
    const isScrollable = scrollWidth > elementWidth;

    if (isScrollable) {
      const scrollPosition = (e.target as HTMLElement).scrollLeft;
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

  const onScroll: React.UIEventHandler<HTMLDivElement | HTMLPreElement> = e => {
    e.persist();
    debounceScroll(e);
  };

  return (
    <div
      ref={divRef}
      onScroll={onScroll}
      className={cx(
        css`
          max-width: calc(100% - 100px);
          overflow-x: auto;
        `,
        getScrollShadowStyle(scrollState),
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
            <TableHead columns={columns} />
            <TableBody>{children}</TableBody>
          </SortProvider>
        </TableProvider>
      </table>
    </div>
  );
}
