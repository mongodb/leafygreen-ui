import React, { useState, useEffect } from 'react';

// leafygreen-ui
import Icon from '@leafygreen-ui/icon';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import { createDataProp } from '@leafygreen-ui/lib';
import {
  Menu,
  FocusableMenuItem,
  MenuItem,
  MenuSeparator,
} from '@leafygreen-ui/menu';

// mongo-nav
import { facepaint } from '../breakpoints';
import { InteractionRingWrapper } from '../helpers';
import { useOnElementClick } from '../on-element-click-provider';
import { textLoadingStyle, iconLoadingStyle } from '../styles';
import {
  CurrentProjectInterface,
  MongoNavInterface,
  NavElement,
  ProjectInterface,
} from '../types';

// mongo-select
import Input from './Input';
import { onKeyDown } from './selectHelpers';
import { BaseMongoSelectProps } from './types';
import {
  activeButtonStyle,
  baseButtonStyle,
  caretBaseStyle,
  iconColorStyle,
  menuContainerStyle,
  menuItemContainerStyle,
  nameStyle,
  selectedStyle,
  ulStyle,
} from './styles';

// styles
const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const projectTriggerStyle = css`
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

const projectTriggerWrapperStyle = css`
  margin-left: 16px;
  margin-right: 2px;
  z-index: 1;

  ${facepaint({
    marginLeft: ['16px', '0px', '16px'],
  })}
`;

const projectTriggerRingStyle = css`
  border-radius: 7px;
`;

// types
interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<ProjectInterface>;
  current?: CurrentProjectInterface;
  constructProjectURL: NonNullable<MongoNavInterface['constructProjectURL']>;
}

// data props
const projectTriggerDataProp = createDataProp('project-trigger');

function ProjectSelect({
  current,
  data = [],
  onChange: onChangeProp,
  constructProjectURL,
  urls = {},
  loading = false,
  className,
  ...rest
}: ProjectMongoSelectProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  useEffect(() => {
    if (!open) {
      setValue('');
    }
  }, [open]);

  const filterData = () => {
    const sanitizedValue = value.replace(/\\/g, '\\\\');
    const search = new RegExp(String(sanitizedValue), 'i');

    const filtered = data?.filter(datum => {
      return search.test(datum.projectName);
    });

    return filtered;
  };

  const renderedData = onChangeProp ? data : filterData();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onChangeProp?.(value, e);
  };

  const renderProjectOption = (datum: ProjectInterface) => {
    const { projectId, projectName } = datum;
    const isActive = projectId ? projectId === current?.projectId : false;

    return (
      <MenuItem
        data-testid="project-option"
        key={projectId}
        active={isActive}
        className={cx(menuItemContainerStyle, nameStyle)}
        href={constructProjectURL(datum)}
      >
        {projectName} {isActive && '(current)'}
      </MenuItem>
    );
  };

  const onClickTrigger = onElementClick(
    NavElement.ProjectNavProjectSelectTrigger,
    () => setOpen(curr => !curr),
  );

  return (
    <InteractionRingWrapper
      selector={projectTriggerDataProp.selector}
      className={projectTriggerWrapperStyle}
      ringClassName={projectTriggerRingStyle}
    >
      <button
        {...rest}
        {...projectTriggerDataProp.prop}
        onClick={onClickTrigger}
        data-testid="project-select-trigger"
        className={cx(
          baseButtonStyle,
          projectTriggerStyle,
          {
            [activeButtonStyle]: open,
            [textLoadingStyle]: loading,
          },
          className,
        )}
        disabled={loading}
        aria-disabled={loading}
      >
        <Icon
          glyph="Folder"
          className={cx(iconColorStyle, { [iconLoadingStyle]: loading })}
        />
        <span
          className={cx(selectedStyle, { [textLoadingStyle]: loading })}
          data-testid="project-select-active-project"
        >
          {current?.projectName ?? ''}
        </span>
        <Icon
          size="small"
          glyph={open ? 'CaretUp' : 'CaretDown'}
          className={cx(caretBaseStyle, { [iconLoadingStyle]: loading })}
        />
        <Menu
          usePortal={false}
          className={menuContainerStyle}
          justify="start"
          spacing={0}
          open={open}
          setOpen={setOpen}
          data-testid="project-select-project-list"
        >
          <FocusableMenuItem>
            <Input
              data-testid="project-filter-input"
              onChange={onChange}
              onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
              variant="project"
              value={value}
            />
          </FocusableMenuItem>

          <ul className={ulStyle}>
            {renderedData?.map(datum => renderProjectOption(datum))}
          </ul>

          <MenuSeparator />

          <li
            onKeyDown={(e: React.KeyboardEvent) => onKeyDown(e, setValue)}
            role="none"
            className={projectButtonStyle}
          >
            <FocusableMenuItem>
              <Button
                href={urls.viewAllProjects as string}
                data-testid="project-select-view-all-projects"
                onClick={onElementClick(NavElement.ProjectNavViewAllProjects)}
              >
                View All Projects
              </Button>
            </FocusableMenuItem>
            <FocusableMenuItem>
              <Button
                href={urls.newProject as string}
                data-testid="project-select-add-new-project"
                onClick={onElementClick(NavElement.ProjectNavAddProject)}
              >
                + New Project
              </Button>
            </FocusableMenuItem>
          </li>
        </Menu>
      </button>
    </InteractionRingWrapper>
  );
}

ProjectSelect.displayName = 'ProjectSelect';

export default ProjectSelect;
