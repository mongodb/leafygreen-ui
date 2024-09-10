import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { fontWeights } from '@leafygreen-ui/tokens';

import { colorSets } from '../styleSets';

import { InternalProps, OptionProps } from './Option.types';
import { OptionClassName } from './Options.styles';

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

  const glyphProp = glyph && isComponentGlyph(glyph) ? glyph : undefined;

  const checkmark = selected ? (
    <CheckmarkIcon
      key="checkmark"
      className={cx(
        css`
          color: ${colorSet.icon.selected};
        `,
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
      className={cx(OptionClassName, className)}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={undefined}
      checked={selected}
      highlighted={focused}
    >
      <InputOptionContent
        leftGlyph={leftGlyph}
        rightGlyph={rightGlyph}
        description={description}
      >
        <span
          className={cx({
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
