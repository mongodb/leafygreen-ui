import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const subMenuContainerClassName = createUniqueClassName('menu-sub_menu');
export const subMenuTriggerClassName = createUniqueClassName(
  'menu-sub_menu-trigger',
);

interface SubmenuListStyleArgs {
  theme: Theme;
  hasGlyph: boolean;
}

export const getSubmenuListStyles = ({
  theme,
  hasGlyph,
}: SubmenuListStyleArgs) => css`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 0;
  height: max-content;
  overflow: hidden;
  transition: max-height ${transitionDuration.default}ms ease-in-out;
  position: relative;
  margin-left: ${hasGlyph ? spacing[900] : spacing[300]}px;
  border-top: 1px solid ${color[theme].border.secondary.default};
`;
