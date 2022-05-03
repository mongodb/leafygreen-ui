import React, { useEffect, useRef, useState } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import { Body, Subtitle } from '@leafygreen-ui/typography';
import { css, cx } from '@leafygreen-ui/emotion';
import { Transition, TransitionStatus } from 'react-transition-group';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { useIdAllocator } from '@leafygreen-ui/hooks';

const transitionDuration = 300;

/**
 * Styles
 */

const cardStyle = (darkMode: boolean) => css`
  --card-divider-color: ${darkMode ? uiColors.gray.base : uiColors.gray.light2};
  display: block;
  width: 100%;
  padding: 0;
`;

const summaryStyle = css`
  display: grid;
  grid-template-columns: auto 24px;
  padding: 24px;
  column-gap: 8px;
  cursor: pointer;
  color: inherit;
`;

const summaryHeader = css`
  display: inline-block;
  color: inherit;
`;

const summaryText = css`
  color: inherit;
  margin-top: 4px;
`;

const flagTextStyle = css`
  font-style: italic;
  font-size: 12px;
  letter-spacing: 0.2px;

  &::before {
    content: ' (';
  }
  &::after {
    content: ')';
  }
`;

const iconStyle = css`
  grid-column: 2;
  grid-row: 1/3;
  transition: transform ${transitionDuration}ms ease-in-out;
`;

const iconTransitionStyle: { [key in TransitionStatus]: string } = {
  entering: css`
    transform: rotate(180deg);
  `,
  entered: css`
    transform: rotate(180deg);
  `,
  exiting: css`
    transform: rotate(0deg);
  `,
  exited: css`
    transform: rotate(0deg);
  `,
  unmounted: '',
};

const childrenWrapperStyle = css`
  overflow: hidden;
  transition: ${transitionDuration}ms ease-in-out;
  transition-property: all;
  transform-origin: top left;
  padding-inline: 24px;
  box-sizing: content-box;
  border-top: 1px solid transparent;
  visibility: visible;
`;

const childrenWrapperTransitionStyle = (
  state: TransitionStatus,
  height?: number,
): string => {
  switch (state) {
    case 'entering':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'entered':
      return css`
        max-height: ${height || 9999}px;
        padding-block: 24px;
        border-color: var(--card-divider-color);
      `;
    case 'exiting':
      return css`
        max-height: 0;
        padding-block: 0;
      `;
    case 'exited':
      return css`
        max-height: 0;
        padding-block: 0;
        visibility: hidden;
      `;
    default:
      return ``;
  }
};

/**
 * Types
 */
interface ExpandableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The title of the card
   */
  title: string;

  /**
   * Description text below the title
   */
  description?: string;

  /**
   * Text in parentheses immediately following the title. Typically 'optional' or 'required'
   */
  flagText?: 'optional' | 'required' | string;

  /**
   * Toggles dark mode
   */
  darkMode?: boolean;

  /**
   * Defines the default state of the card
   */
  defaultOpen?: boolean;

  /**
   * Forces the card state
   */
  isOpen?: boolean;

  /**
   * Callback fired when a user clicks the card header
   */
  onClick?: (
    event: React.SyntheticEvent<HTMLDivElement, MouseEvent | KeyboardEvent>,
  ) => void;

  /**
   * Unique id for the card
   */
  id?: string;

  /**
   * Styling prop
   */
  className?: string;

  /**
   * Styling prop for children
   */
  contentClassName?: string;

  /**
   * Component children
   */
  children?: React.ReactNode;
}

/**
 * Conponent
 */
const ExpandableCard = ({
  title,
  children,
  darkMode = false,
  description,
  className,
  defaultOpen = false,
  isOpen: isControlledOpen,
  onClick: onClickProp,
  id: idProp,
  flagText,
  contentClassName,
  ...rest
}: ExpandableCardProps) => {
  const isControlled = isControlledOpen !== undefined;

  // Always start open
  const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);

  const id = useIdAllocator({ prefix: 'expandable-card', id: idProp });
  const summaryId = useIdAllocator({ prefix: 'expandable-card-summary' });
  const contentId = useIdAllocator({ prefix: 'expandable-card-content' });

  // When the controlled prop changes, update the internal state
  useEffect(() => {
    if (isControlled) {
      setIsOpen(isControlledOpen ?? defaultOpen);
    }
  }, [defaultOpen, isControlled, isControlledOpen]);

  // If the component is not controlled, we update the internal state on toggle
  const onClick = (
    e: React.SyntheticEvent<HTMLDivElement, MouseEvent | KeyboardEvent>,
  ) => {
    if (!isControlled) {
      setIsOpen(!isOpen);
    }
    onClickProp?.(e);
  };

  // Keep track of the children wrapper
  const childrenInnerRef = useRef<HTMLDivElement>(null);
  const childrenWrapperRef = useRef<HTMLDivElement>(null);

  const [childrenHeight, setChildrenHeight] = useState(0);

  const updateHeight = () => {
    if (childrenInnerRef && childrenInnerRef.current) {
      setChildrenHeight(childrenInnerRef.current.offsetHeight);
    }
  };
  useEffect(
    updateHeight,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, childrenInnerRef, childrenInnerRef.current],
  );

  return (
    <Card
      darkMode={darkMode}
      className={cx(cardStyle(darkMode), className)}
      id={id}
      {...rest}
    >
      {/* HTML `button` elements can't be used as a grid parent */}
      <div
        role="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={summaryId}
        className={summaryStyle}
        onClick={onClick}
        onKeyPress={onClick}
        tabIndex={-1}
      >
        <span>
          <Subtitle className={summaryHeader}>{title}</Subtitle>
          {flagText && <span className={flagTextStyle}>{flagText}</span>}
        </span>
        {description && <Body className={summaryText}>{description}</Body>}

        <Transition in={isOpen} timeout={transitionDuration}>
          {state => (
            <Icon
              className={cx(iconStyle, iconTransitionStyle[state])}
              glyph="ChevronUp"
              size={24}
              fill={palette.gray.base}
              tabIndex={0}
            />
          )}
        </Transition>
      </div>
      <Transition
        in={isOpen}
        timeout={transitionDuration}
        nodeRef={childrenWrapperRef}
        onEntered={updateHeight}
      >
        {state => (
          <div
            role="region"
            id={contentId}
            aria-labelledby={summaryId}
            ref={childrenWrapperRef}
            className={cx(
              childrenWrapperStyle,
              childrenWrapperTransitionStyle(state, childrenHeight),
              contentClassName,
            )}
          >
            <div ref={childrenInnerRef}>{children}</div>
          </div>
        )}
      </Transition>
    </Card>
  );
};

ExpandableCard.displayName = 'ExpandableCard';

export default ExpandableCard;
