import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

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
import { mq } from '../breakpoints';
import { InteractionRingWrapper } from '../helpers';
import { useOnElementClick } from '../on-element-click-provider';
import { textLoadingStyle, iconLoadingStyle } from '../styles';
import {
  CurrentProjectInterface,
  MongoNavInterface,
  NavElement,
  ProjectInterface,
  Mode,
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

  ${mq({
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

  ${mq({
    marginLeft: ['16px', '0px', '16px'],
  })}
`;

const projectTriggerRingStyle = css`
  border-radius: 7px;
`;

const emptyStateStyle = css`
  font-size: 14px;
  padding: 4px 8px;
  margin-bottom: 20px;
`;

// types
interface ProjectMongoSelectProps extends BaseMongoSelectProps {
  data?: Array<ProjectInterface>;
  current?: CurrentProjectInterface;
  constructProjectURL: NonNullable<MongoNavInterface['constructProjectURL']>;
}

interface ProjectFilterResponse {
  cid: string;
  gn: string;
}

// data props
const projectTriggerDataProp = createDataProp('project-trigger');

function ProjectSelect({
  current,
  mode,
  data = [],
  onChange: onChangeProp,
  constructProjectURL,
  hosts = {},
  urls = {},
  admin = false,
  loading = false,
  className,
  ...rest
}: ProjectMongoSelectProps) {
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFetching, setIsFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const onElementClick = useOnElementClick();

  const isFiltered = value !== '';
  const isAdminSearch = isFiltered && admin && mode === Mode.Production;

  const renderedData = isFiltered ? filteredData : data;

  const toggleOpen = () => {
    setOpen(curr => !curr);
    if (!open) {
      setValue('');
    }
  };

  const fetchProjectsAsAdmin = (searchTerm = '') => {
    const queryString = searchTerm ? `?term=${searchTerm}` : '';
    const endpointURI = `${hosts.cloud}/user/shared/projects/search${queryString}`;
    return fetch(endpointURI, {
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    });
  };

  const filterDataAsAdmin = useCallback(
    debounce((fetchValue: string) => {
      fetchProjectsAsAdmin(fetchValue)
        .then(response => response.json())
        .then((response: Array<ProjectFilterResponse>) => {
          const data = response.map(({ cid: projectId, gn: projectName }) => ({
            projectId,
            projectName,
          }));

          setFilteredData(data);
          setIsFetching(false);
        })
        .catch(console.error);
    }, 300),
    [],
  );

  const filterData = () => {
    const sanitizedValue = value.replace(/\\/g, '\\\\');
    const search = new RegExp(String(sanitizedValue), 'i');

    const filtered = data?.filter(datum => {
      return search.test(datum.projectName);
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    // Skip if we're not filtering
    if (!isFiltered) {
      return;
    }

    // defer all behavior to user-provided filtering
    if (onChangeProp) {
      return;
    }

    // serverside filtering (admin users only)
    if (isAdminSearch) {
      setIsFetching(true);
      filterDataAsAdmin(value);
      return;
    }

    // clientside filtering (default)
    filterData();
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    return onChangeProp?.({
      value,
      setData: setFilteredData,
      event: e,
    });
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

  return (
    <InteractionRingWrapper
      selector={projectTriggerDataProp.selector}
      className={projectTriggerWrapperStyle}
      ringClassName={projectTriggerRingStyle}
    >
      <button
        {...rest}
        {...projectTriggerDataProp.prop}
        onClick={onElementClick(
          NavElement.ProjectNavProjectSelectTrigger,
          toggleOpen,
        )}
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
          setOpen={toggleOpen}
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
            {isAdminSearch && isFetching && (
              <li className={emptyStateStyle}>Searching...</li>
            )}
            {isAdminSearch && !isFetching && renderedData.length === 0 && (
              <li className={emptyStateStyle}>No matches found</li>
            )}
            {renderedData?.map(renderProjectOption)}
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
