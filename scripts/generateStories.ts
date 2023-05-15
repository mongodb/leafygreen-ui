import React, { ComponentType } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { camelCase } from 'lodash';
import path from 'path';

import { StoryMetaType } from '@leafygreen-ui/lib';

import { getRelevantPackages } from './utils/getRelevantPackages';

const cli = new Command('generate-stories')
  .description(
    'Generates stories based on variants defined in the root story/ies file',
  )
  .arguments('[packages...]');

const packages = ['button'] ?? getRelevantPackages(cli.args, {});

async function generateStories() {
  // For each package
  for (const pkg of packages) {
    // Find and load the main story file
    const storyFiles = await glob(
      `packages/${pkg}/**/!(generated).stor?(y|ies).tsx`,
      {},
    );

    if (storyFiles[0]) {
      const storyFilePath = path.join(__dirname, '../', storyFiles[0]);
      const generatedStoryFilePath = path.join(
        __dirname,
        '../',
        `packages/${pkg}/src/generated.stories.tsx`,
      );

      // Clear any generated file so we don't get any TS errors
      writeFileSync(generatedStoryFilePath, '');

      try {
        const {
          default: meta,
        }: { default: StoryMetaType<ComponentType<any>> } = await import(
          storyFilePath
        );

        const storySource = readFileSync(storyFilePath, { encoding: 'utf-8' });

        // Generate a story for each combination of variables defined in meta.snapshot.variables
        const permutations = generateStoryPermutations(meta);

        writeGeneratedStoriesFile(
          generatedStoryFilePath,
          meta,
          storySource,
          permutations,
        );
      } catch (error) {
        console.warn(error);
      }
    }
  }
}

generateStories();

/**
 * Generates all permutations of each variable
 */
function generateStoryPermutations(
  meta: StoryMetaType<ComponentType<any>>,
): Record<string, any> {
  const {
    component,
    parameters: { snapshot },
    args,
  } = meta;

  // For each var in snapshot
  // generate a new Story
  const permutations = {} as Record<string, any>;

  recursivePermutations({}, Object.entries(snapshot.variables));

  return permutations;

  /**
   * Recursively add permutations for each variable
   */
  function recursivePermutations(
    props: Record<string, any>,
    vars: Array<[string, Array<any>]>,
  ) {
    if (component && vars.length === 0) {
      const permutationName = getPermutationName(props);

      permutations[permutationName] = generatePermutationJSX(component, {
        ...props,
        ...args,
      });
    } else {
      const [propName, propValues] = vars.pop()!;

      for (const val of propValues) {
        recursivePermutations({ [propName]: val, ...props }, [...vars]);
      }
    }
  }

  /**
   * @returns a descriptive display name for the story permutation
   */
  function getPermutationName(props: Record<string, any>): string {
    return Object.entries(props).reduce((acc, [name, val]) => {
      return (
        (acc ? acc + '__' : '') + `${camelCase(name)}_${camelCase(`${val}`)}`
      );
    }, '');
  }

  /**
   * @returns the JSX code for a given permutation
   */
  function generatePermutationJSX(
    component: React.ComponentType<any>,
    props: Record<string, any>,
  ) {
    const permutationElement = React.createElement(component, props);
    const permutationJSX = reactElementToJSXString(permutationElement, {
      showFunctions: true,
      showDefaultProps: true,
      useBooleanShorthandSyntax: false,
      useFragmentShortSyntax: false,
    });

    return permutationJSX;
  }
}

function writeGeneratedStoriesFile(
  generatedStoryFilePath: string,
  meta: StoryMetaType<ComponentType<any>>,
  storySource: string,
  permutations: Record<string, any>,
): void {
  const [storyFrontmatter] = storySource.split(/(export const)/g);

  const fileString =
    storyFrontmatter +
    Object.entries(permutations)
      .map(([name, jsx]) => `export const ${name} = () => ${jsx};`)
      .join('\n');

  writeFileSync(generatedStoryFilePath, fileString.trim());
}
