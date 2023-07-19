import { TemplateParameters } from '../../../create.types';

export const story = ({
  packageNamePascal,
}: Pick<TemplateParameters, 'packageNamePascal'>) => `
import React from 'react';
import { StoryFn } from '@storybook/react';

import { ${packageNamePascal} } from '.';

export default {
  title: 'Components/${packageNamePascal}',
  component: ${packageNamePascal},
}

const Template: StoryFn<typeof ${packageNamePascal}> = (props) => (
  <${packageNamePascal} {...props} />
);

export const Basic = Template.bind({});

`;
