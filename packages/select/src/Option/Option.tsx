import React, { useCallback, useEffect, useRef } from 'react';
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
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { fontWeights } from '@leafygreen-ui/tokens';

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
  const { theme } = useDarkMode();

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

  if (glyph) {
    if (!isComponentGlyph(glyph)) {
      console.error(
        '`Option` instance did not render icon because it is not a known glyph element.',
      );
    }
  }

  // FIXME: temps styles until styles are consistent with InputOption
  const glyphProp =
    glyph && isComponentGlyph(glyph)
      ? React.cloneElement(glyph, {
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
        })
      : undefined;

  // FIXME: temps styles until styles are consistent with InputOption
  const checkmark = selected ? (
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
  ) : undefined;

  const leftGlyph = hasGlyphs ? glyphProp : checkmark;
  const rightGlyph = hasGlyphs ? checkmark : undefined;

  return (
    <InputOption
      aria-label={typeof children === 'string' ? children : 'option'}
      {...rest}
      disabled={disabled}
      role="option"
      tabIndex={-1}
      ref={ref}
      className={cx(
        OptionClassName,
        optionStyle,
        // FIXME: temps styles until styles are consistent with InputOption
        {
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
          // FIXME: override the disabled colors since they are not consistent with InputOption
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
        <span
          className={cx(optionTextStyle, {
            // FIXME: temps styles since we're not passing the `selected` prop to InputOption
            [css`
              font-weight: ${fontWeights.bold};
            `]: selected,
          })}
        >
          {children}
        </span>
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
