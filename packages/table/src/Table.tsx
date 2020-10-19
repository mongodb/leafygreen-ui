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

const shadowColor = transparentize(0.7, uiColors.black);

const containerStyle = css`
  position: relative;
  max-width: 100%;
`;

const tableStyles = css`
  border-collapse: collapse;
  box-sizing: border-box;
  border-bottom: 1px solid ${uiColors.gray.light2};
  width: 100%;
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

const leftShadow = css`
  left: 0;

  &:after {
    right: 100%;
    box-shadow: 3px 0 4px ${shadowColor};
  }
`;

const rightShadow = css`
  right: 0;

  &:after {
    left: 100%;
    box-shadow: -3px 0 4px ${shadowColor};
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

  const handleScroll = (e: React.UIEvent) => {
    const {
      scrollWidth,
      clientWidth: elementWidth,
    } = e.target as HTMLDivElement;
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
        className={cx(shadow, leftShadow, {
          [showScroll]: showLeft,
        })}
      />
      <div className={cx(shadow, rightShadow, { [showScroll]: showRight })} />

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
              <TableHead columns={columns} />
              <TableBody>{children}</TableBody>
            </SortProvider>
          </TableProvider>
        </table>
      </div>
    </div>
  );
}
