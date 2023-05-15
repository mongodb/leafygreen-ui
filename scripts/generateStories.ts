import React, { ComponentType } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { camelCase } from 'lodash';
import path from 'path';
import { format } from 'prettier';

import { StoryMetaType } from '@leafygreen-ui/lib';

import { getRelevantPackages } from './utils/getRelevantPackages';

const cli = new Command('generate-stories')
  .description(
    'Generates stories based on variants defined in the root story/ies file',
  )
  .arguments('[packages...]')
  .parse(process.argv);

const packages = getRelevantPackages(cli.args, {});

generateStories();

async function generateStories() {
  // For each package
  for (const pkg of packages) {
    // Find and main story file
    const storyFiles = await glob(
      `packages/${pkg}/**/!(generated).stor?(y|ies).tsx`,
      {},
    );

    // Check if a story file exists
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
        // Load the main story file
        const {
          default: meta,
        }: { default: StoryMetaType<ComponentType<any>> } = await import(
          storyFilePath
        );

        // Store the story source code
        const storySource = readFileSync(storyFilePath, { encoding: 'utf-8' });

        if (meta.parameters.snapshot?.variables) {
          // Generate a story for each combination of variables defined in meta.snapshot.variables
          const permutations = generateStoryPermutations(meta);

          // Write all the generated permutations to a new story file
          writeGeneratedStoriesFile(
            generatedStoryFilePath,
            storySource,
            permutations,
          );
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }
}

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

  if (snapshot && snapshot.variables) {
    recursivePermutations({}, Object.entries(snapshot?.variables));
  }

  return permutations;

  /**
   * Recursively add permutations for each variable
   */
  function recursivePermutations(
    props: Record<string, any>,
    vars: Array<[string, Array<any> | undefined]>,
  ) {
    if (component && vars.length === 0) {
      const permutationName = getPermutationName(props);

      permutations[permutationName] = getPermutationExportCode(
        permutationName,
        component,
        { ...props, ...args },
      );
    } else {
      const [propName, propValues] = vars.pop()!;

      if (propValues) {
        for (const val of propValues) {
          recursivePermutations({ [propName]: val, ...props }, [...vars]);
        }
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
  function getPermutationJSX(
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

  /**
   * @returns The full export line, including any Storybook args
   */
  function getPermutationExportCode(
    name: string,
    component: React.ComponentType<any>,
    props: Record<string, any>,
  ) {
    const jsx = getPermutationJSX(component, { ...props });
    const exportCode = `export const ${name} = () => ${jsx};\n${name}.args = ${JSON.stringify(
      props,
    )};`;
    return exportCode;
  }
}

/**
 * Write the generated permutations to a story file
 */
function writeGeneratedStoriesFile(
  generatedStoryFilePath: string,
  storySource: string,
  permutations: Record<string, any>,
): void {
  const [storyFrontmatter] = storySource.split(/(export const)/g);

  const fileString =
    '/* eslint-disable @typescript-eslint/no-unused-vars */\n' +
    '/* eslint-disable storybook/prefer-pascal-case */\n' +
    storyFrontmatter +
    Object.values(permutations).join('\n');

  writeFileSync(
    generatedStoryFilePath,
    format(fileString, { parser: 'babel-ts' }),
  );
}
