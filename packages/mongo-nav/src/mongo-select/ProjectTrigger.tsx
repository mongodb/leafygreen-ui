import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon from '@leafygreen-ui/icon';
import { createDataProp } from '@leafygreen-ui/lib';
import { InteractionRingWrapper } from '../helpers';
import { facepaint } from '../breakpoints';
import { textLoadingStyle, iconLoadingStyle } from '../styles';
import { baseButtonStyles, selectedStyle, activeButtonColor } from './styles';
import { BaseTriggerProps } from './types';

const projectTriggerDataProp = createDataProp('project-trigger');

const projectButtonStyles = css`
  justify-content: space-around;
  border-color: transparent;
  border-radius: 5px;
  padding: 2px;
  width: 174px;
  height: 28px;

  ${facepaint({
    width: ['196px', '106px', '106px'],
    height: ['28px', '36px', '36px'],
  })}

  &:focus {
    outline: none;
  }
`;

const projectTriggerWrapper = css`
  margin-left: 16px;
  margin-right: 2px;
  z-index: 1;

  ${facepaint({
    marginLeft: ['16px', '0px', '16px'],
  })}
`;

interface ProjectTriggerProps extends BaseTriggerProps {
  onClick: React.MouseEventHandler;
}

export default function ProjectTrigger({
  children,
  placeholder,
  open = false,
  onClick,
  loading = false,
  ...rest
}: ProjectTriggerProps) {
  return (
    <InteractionRingWrapper
      selector={projectTriggerDataProp.selector}
      className={projectTriggerWrapper}
      ringClassName={css`
        border-radius: 7px;
      `}
    >
      <button
        {...rest}
        {...projectTriggerDataProp.prop}
        onClick={onClick}
        data-testid="project-select-trigger"
        className={cx(baseButtonStyles, projectButtonStyles, {
          [activeButtonColor]: open,
          [textLoadingStyle]: loading,
        })}
        disabled={loading}
        aria-disabled={loading}
      >
        <Icon
          glyph="Folder"
          className={cx(
            css`
              color: ${uiColors.gray.base};
            `,
            { [iconLoadingStyle]: loading },
          )}
        />
        <span
          className={cx(selectedStyle, { [textLoadingStyle]: loading })}
          data-testid="project-select-active-project"
        >
          {placeholder}
        </span>
        <Icon
          size="small"
          glyph={open ? 'CaretUp' : 'CaretDown'}
          className={cx(
            css`
              flex-shrink: 0;
            `,
            { [iconLoadingStyle]: loading },
          )}
        />
        {children}
      </button>
    </InteractionRingWrapper>
  );
}
