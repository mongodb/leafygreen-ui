import React, { useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import {
  descriptionClassName,
  InputOption,
  InputOptionContent,
} from '@leafygreen-ui/input-option';
import { fontWeights } from '@leafygreen-ui/tokens';

import SelectContext from '../SelectContext';
import { colorSets } from '../styleSets';

import { InternalProps, OptionProps } from './Option.types';
import {
  glyphFocusStyle,
  iconStyle,
  OptionClassName,
  optionStyle,
  optionTextStyle,
} from './Options.styles';

export function InternalOption({
  children,
  className,
  glyph,
  selected,
  focused,
  disabled,
  onClick,
  onFocus,
  triggerScrollIntoView,
  hasGlyphs,
  description,
  ...rest
}: InternalProps) {
  const { theme } = useContext(SelectContext);

  const { option: colorSet } = colorSets[theme];

  const ref = useRef<HTMLLIElement>(null);

  const scrollIntoView = useCallback(() => {
    if (ref.current == null) {
      return null;
    }

    const element = ref.current;
    const parent = element?.offsetParent;

    if (!parent) {
      return null;
    }

    // Can't use Element.scrollIntoView because it might
    // cause scrolling outside the immediate parent.
    parent.scrollTop =
      element.offsetTop + (element.clientHeight - parent.clientHeight) / 2;
  }, [ref]);

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
      ref.current!.focus();
    }
  }, [shouldFocus]);

  const styledChildren: React.ReactNode = (
    <span
      className={cx(optionTextStyle, {
        [css`
          font-weight: ${fontWeights.bold};
        `]: selected,
      })}
    >
      {children}
    </span>
  );

  let glyphProp;

  if (glyph) {
    if (!isComponentGlyph(glyph)) {
      console.error(
        '`Option` instance did not render icon because it is not a known glyph element.',
      );
    } else {
      glyphProp = React.cloneElement(glyph, {
        key: 'glyph',
        className: cx(
          iconStyle,
          css`
            color: ${colorSet.icon.base};
          `,
          glyphFocusStyle,
          {
            [css`
              color: ${colorSet.icon.disabled};
            `]: disabled,
          },
          glyph.props.className,
        ),
      });
    }
  }

  const checkmark = selected && (
    <CheckmarkIcon
      key="checkmark"
      className={cx(
        iconStyle,
        css`
          color: ${colorSet.icon.selected};
        `,
        glyphFocusStyle,
        {
          [css`
            color: ${colorSet.icon.disabled};
          `]: disabled,
        },
      )}
    />
  );

  const leftGlyph = hasGlyphs ? glyphProp : checkmark;
  const rightGlyph = hasGlyphs ? checkmark : undefined;

  return (
    <InputOption
      aria-label={typeof children === 'string' ? children : 'option'}
      {...rest}
      disabled={disabled}
      role="option"
      aria-selected={selected}
      tabIndex={-1}
      ref={ref}
      className={cx(
        OptionClassName,
        optionStyle,
        // TODO: temps styles until styles are consistent with other dropdowns
        {
          [css`
            &:hover {
              background-color: ${colorSet.background.hovered};
            }
          `]: !disabled,
          [css`
            &:focus-visible {
              color: ${colorSet.text.focused};
              background-color: ${colorSet.background.focused};

              &:before {
                opacity: 1;
                transform: scaleY(1);
                background-color: ${colorSet.indicator.focused};
              }
            }
          `]: !disabled,
          [css`
            &,
            & .${descriptionClassName} {
              color: ${colorSet.text.disabled};
            }
          `]: disabled,
        },
        className,
      )}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={undefined}
    >
      <InputOptionContent
        leftGlyph={leftGlyph}
        rightGlyph={rightGlyph}
        description={description}
      >
        {styledChildren}
      </InputOptionContent>
    </InputOption>
  );
}

InternalOption.displayName = 'Option';

export function Option(_: OptionProps): JSX.Element {
  throw Error('`Option` must be a child of a `Select` instance');
}

Option.displayName = 'Option';

Option.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  glyph: PropTypes.element,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  description: PropTypes.string,
};

// React.ReactComponentElement messes up the original
// typing of props, so it is fixed up by overriding it.
export type OptionElement = Omit<
  React.ReactComponentElement<typeof Option>,
  'props'
> & { props: OptionProps };
