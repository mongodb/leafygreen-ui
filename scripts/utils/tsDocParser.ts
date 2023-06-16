/* eslint-disable no-console */
import {
  ComponentDoc,
  ParserOptions,
  Props as TSDocProps,
  withCompilerOptions,
} from 'react-docgen-typescript';
import chalk from 'chalk';
import fs from 'fs';
import { camelCase, defaults, isUndefined, uniqBy } from 'lodash';
import path from 'path';
import { CompilerOptions, JsxEmit } from 'typescript';

import {
  CustomComponentDoc,
  getHTMLAttributesLink,
  GroupedPropRecord,
  isInheritableGroup,
  PropItem,
  Props,
} from './tsDoc.utils';

const pascalCase = (str: string) =>
  camelCase(str).slice(0, 1).toUpperCase() + camelCase(str).slice(1);

const skipComponents = ['lib'];
const skipProps = ['ref', 'key', '__INTERNAL__menuButtonSlot__'];

const TSDocOptions: ParserOptions = {
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldIncludePropTagMap: true,
  shouldRemoveUndefinedFromOptional: false,
  skipChildrenPropWithoutDoc: false,
  /** Ensures the Polymorphic component gets documented */
  customComponentTypes: [
    'PolymorphicComponentType',
    'InferredPolymorphicComponentType',
  ],
  propFilter: (prop, component) => {
    return (
      !skipComponents.includes(component.name) &&
      !skipProps.includes(prop.name) &&
      // Ignore @internal props
      isUndefined((prop.tags as any)?.internal)
    );
  },
};

const compilerOptions: CompilerOptions = {
  allowSyntheticDefaultImports: true,
  emitDecoratorMetadata: true,
  /** Interpret optional property types as written, rather than adding undefined. */
  exactOptionalPropertyTypes: true,
  incremental: true,
  jsx: JsxEmit.React,
  noEmit: false,
  /** Disable emitting declarations that have @internal in their JSDoc comments. */
  stripInternal: true,
};

const Parser = withCompilerOptions(compilerOptions, TSDocOptions);

interface ParseFunctionOptions {
  /**
   * The path to the `packages` directory.
   * Defaults to this repository's `packages/` folder.
   *
   * Set this to a remote repository's `node_modules/@leafygreen-ui` path
   * to generate fresh docs in that repo.
   */
  packagesRoot?: string;

  /**
   * Any components with these excluded TSDoc `@tags`
   * will be excluded from docs generation.
   *
   * Useful for excluding internal or example files from the TSDoc build
   *
   * @default `['example', 'internal']
   */
  excludeTags?: Array<string>;
}
const defaultParseFunctionOptions = {
  packagesRoot: path.resolve(__dirname, '../../packages'),
  excludeTags: ['example', 'internal', 'noDocgen'],
};

/**
 * Parses the TSDocs for the provided component
 * @param componentName string
 * @returns CustomComponentDoc[]
 * @param options ParseFunctionOptions
 *
 */
export function parseTSDoc(
  componentName: string,
  options: ParseFunctionOptions = defaultParseFunctionOptions,
): Array<CustomComponentDoc> | undefined {
  const { packagesRoot, excludeTags } = defaults(
    options,
    defaultParseFunctionOptions,
  );

  const componentDir = path.resolve(
    __dirname,
    `${packagesRoot}/${componentName}`,
  );

  if (fs.existsSync(componentDir)) {
    const componentFileNames = parseFileNames(componentDir);

    const parsedDocs = Parser.parse(componentFileNames)
      .filter((doc: ComponentDoc) => {
        return (
          // Remove any external components
          !doc.filePath.includes('node_modules') &&
          // Remove any components with no props
          Object.keys(doc.props).length > 0 &&
          // Remove any docs with excluded tags
          excludeTags.every(tag => isUndefined(doc.tags?.[tag]))
        );
      })
      .map(({ displayName, props, filePath, ...rest }) => {
        return {
          ...rest,
          // For default exports, change the displayName
          displayName: ['src', 'index'].includes(displayName)
            ? pascalCase(componentName)
            : displayName,
          // // Group Props by where they are inherited from
          props: parseProps(props, displayName),
        } as CustomComponentDoc;
      });
    const docs: Array<CustomComponentDoc> = uniqBy(parsedDocs, 'displayName');

    console.log(chalk.gray(`Parsed TSDoc for:`, chalk.bold(componentName)));

    return docs;
  } else {
    console.warn(
      chalk.yellow(
        'Could not find component:',
        chalk.bold(`\`${componentName}\``),
        'at',
        chalk.bold(`${componentDir}`),
      ),
    );
  }

  function parseProps(props: TSDocProps, docName: string): GroupedPropRecord {
    return Object.values(props).reduce(groupPropsByParent, {});

    function groupPropsByParent(
      propList: GroupedPropRecord,
      { parent, name, declarations, ...prop }: PropItem,
    ): GroupedPropRecord {
      // By default we group all ungrouped props under the Component Name
      let groupName = pascalCase(docName + 'Props');

      // If the prop is inherited, we group this prop under its parent
      if (parent && parent.name) {
        if (isInheritableGroup(parent.name)) {
          propList[parent.name] = getHTMLAttributesLink(parent.name);
          return propList;
        } else {
          groupName = parent.name;
        }
      }

      propList[groupName] = {
        ...((propList[groupName] as Props) ?? {}),
        [name]: { name, ...prop },
      };
      return propList;
    }
  }
}

/**
 * Writes the provided docs to file
 * @param componentName string
 * @param packagesRoot string = '../packages'
 * @param outDir string = '../packages'
 */
export function writeDocs(
  componentName: string,
  packagesRoot = path.resolve(__dirname, '../../packages'),
  outDir = path.resolve(__dirname, '../../packages'),
): void {
  const docs = parseTSDoc(componentName);
  const docString = JSON.stringify(docs, null, 2);

  console.log(
    chalk.blueBright(
      `Writing tsdoc.json for`,
      chalk.blue.bold(`${componentName}`),
      chalk.gray(`(${(Buffer.byteLength(docString) / 1024).toFixed(2)}kb)`),
    ),
  );

  const outFilePath = path.resolve(
    __dirname,
    `${outDir}/${componentName}/tsdoc.json`,
  );

  try {
    fs.writeFileSync(outFilePath, docString);
    outDir !== packagesRoot &&
      console.log(`\tWriting to ${chalk.gray(outFilePath)}`);
  } catch (err) {
    console.error(chalk.red(`Could not write file to ${outFilePath}`), err);
  }
}

/**
 *
 * Returns all files to use for TSDoc generation for a given root directory
 *
 * @param root The root directory
 * @returns parsedFileNames
 */
function parseFileNames(root: string): Array<string> {
  const parsedFileNames: Array<string> = [];
  getFilesRecursively(root);
  return parsedFileNames;

  function getFilesRecursively(directory: string) {
    const filesInDirectory = fs.readdirSync(directory);

    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);

      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
      } else {
        // const regex = /^(?!.*\.(spec|d|story|stories)\.tsx?$).*\.tsx?$/;
        const regex = /^.*.index.tsx?$/;

        if (regex.test(absolute)) {
          parsedFileNames.push(absolute);
        }
      }
    }
  }
}
