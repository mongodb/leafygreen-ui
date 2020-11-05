import React, { useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { LGGlyph } from '@leafygreen-ui/icon/src/types';
import { colorSets } from './styleSets';
import SelectContext from './SelectContext';

type GlyphElement = React.ReactElement<LGGlyph.ComponentProps> & {
  type?: { isGlyph?: boolean };
};

export type ReactEmpty = null | undefined | false | '';

const optionStyle = css`
  display: flex;
  width: 100%;
  padding: 10px 12px;
  outline: none;
  overflow-wrap: anywhere;
`;

const optionTextStyle = css`
  display: flex;
  align-items: center;
`;

export interface InternalProps {
  children: React.ReactNode;
  className: string | undefined;
  glyph: GlyphElement | undefined;
  selected: boolean;
  focused: boolean;
  disabled: boolean;
  onClick: React.MouseEventHandler;
  onFocus: React.FocusEventHandler;
  isDeselection: boolean;
  triggerScrollIntoView: boolean;
}

export function InternalOption({
  children,
  className,
  glyph,
  selected,
  focused,
  disabled,
  onClick,
  onFocus,
  isDeselection,
  triggerScrollIntoView,
}: InternalProps) {
  const { mode } = useContext(SelectContext);

  const { option: colorSet } = colorSets[mode];

  const ref = useRef<HTMLLIElement>(null);

  const scrollIntoView = useCallback(
    ({ smooth }: { smooth?: boolean } = {}) => {
      const element = ref.current!;

      /* istanbul ignore else */
      if (element.scrollTo === undefined) {
        const parent = element.offsetParent!;
        // IE11 has a `scrollIntoView` method, but it does not support
        // the options parameter, so `scrollTo` is used for feature detection
        parent.scrollTop =
          element.offsetTop + (element.clientHeight - parent.clientHeight) / 2;
      } else {
        element.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'center',
        });
      }
    },
    [ref],
  );

  const alreadyScrolledIntoView = usePrevious(triggerScrollIntoView);
  const shouldScrollIntoView =
    triggerScrollIntoView && !alreadyScrolledIntoView;

  useEffect(() => {
    if (shouldScrollIntoView) {
      scrollIntoView();
    }
  }, [scrollIntoView, shouldScrollIntoView]);

  const wasFocused = usePrevious(focused);
  const shouldFocus = focused && !wasFocused;

  useEffect(() => {
    if (shouldFocus) {
      scrollIntoView({ smooth: true });
      ref.current!.focus();
    }
  }, [scrollIntoView, shouldFocus]);

  let renderedChildren: React.ReactNode = (
    <span className={optionTextStyle}>{children}</span>
  );

  if (glyph) {
    if (!glyph.type.isGlyph) {
      console.error(
        '`Option` instance did not render icon because it is not a known glyph element.',
      );
    } else {
      const styledIcon = React.cloneElement(glyph, {
        className: cx(
          css`
            min-width: 16px;
            margin-right: 12px;

            color: ${selected ? colorSet.icon.selected : colorSet.icon.base};
          `,
          {
            [css`
              color: ${colorSet.icon.disabled};
            `]: disabled,
          },
          glyph.props.className,
        ),
      });

      renderedChildren = (
        <>
          {styledIcon}
          {renderedChildren}
        </>
      );
    }
  }

  return (
    <li
      role="option"
      aria-selected={selected}
      tabIndex={-1}
      ref={ref}
      className={cx(
        optionStyle,
        css`
          cursor: pointer;
          color: ${selected ? colorSet.text.selected : colorSet.text.base};
        `,
        {
          [css(`
            &:focus {
              background-color: ${colorSet.background.focused};
            }

            &:hover {
              background-color: ${colorSet.background.hovered};
            }
          `)]: !disabled,
          [css`
            cursor: not-allowed;
            color: ${colorSet.text.disabled};
          `]: disabled,
          [css`
            color: ${colorSet.text.deselection};
            font-style: italic;
          `]: isDeselection,
        },
        className,
      )}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={undefined}
    >
      {renderedChildren}
    </li>
  );
}

InternalOption.displayName = 'Option';

interface Props {
  className?: string;
  glyph?: GlyphElement;
  disabled?: boolean;
  value?: string;
  children: React.ReactText | Array<React.ReactText | ReactEmpty>;
}

export default function Option(_: Props): JSX.Element {
  throw Error('`Option` must be a child of a `Select` instance');
}

Option.displayName = 'Option';

const textPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

Option.propTypes = {
  children: PropTypes.oneOfType([
    textPropType,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        textPropType,
        PropTypes.oneOf([false, null, undefined, '']),
      ]),
    ),
  ]).isRequired,
  className: PropTypes.string,
  glyph: PropTypes.element,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

// React.ReactComponentElement messes up the original
// typing of props, so it is fixed up by overriding it.
export type OptionElement = Omit<
  React.ReactComponentElement<typeof Option>,
  'props'
> & { props: Props };
