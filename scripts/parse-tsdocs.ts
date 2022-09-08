/* eslint-disable no-console */
import {
  withCompilerOptions,
  ParserOptions,
  PropItem,
  Props,
  ComponentDoc,
} from 'react-docgen-typescript';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { isUndefined, uniqBy, camelCase } from 'lodash';
import { CompilerOptions, JsxEmit } from 'typescript';

const pascalCase = (str: string) =>
  camelCase(str).slice(0, 1).toUpperCase() + camelCase(str).slice(1);

export type PropCategory = Record<string, Props>;
export type CustomComponentDoc = Omit<ComponentDoc, 'props'> & {
  props: PropCategory;
};

const cli = new Command('parse-tsdoc')
  .arguments('[packages]')
  .option('-r, --root <path>', 'Source packages directory', '../packages')
  .option(
    '-o, --out <path>',
    'Directory to write the doc files (must have the same component folder(s) as source)',
    '../packages',
  )
  .parse(process.argv);

const packagesRoot = cli.opts()['root'];
const outDir = cli.opts()['out'];

const skipComponents = ['lib'];
const skipProps = ['ref', 'key', '__INTERNAL__menuButtonSlot__'];

const TSDocOptions: ParserOptions = {
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldIncludePropTagMap: true,
  shouldRemoveUndefinedFromOptional: false,
  skipChildrenPropWithoutDoc: false,
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

/**
 * Main logic
 */
if (cli.args.length) {
  cli.args.forEach(parseDocs);
} else {
  const packagesDir = path.resolve(__dirname, packagesRoot);
  const packages = fs.readdirSync(packagesDir);
  packages.forEach(parseDocs);
}

/**
 * Parses the TSDocs for the provided component
 * @param componentName
 */
function parseDocs(componentName: string): void {
  const componentDir = path.resolve(
    __dirname,
    `${packagesRoot}/${componentName}`,
  );

  if (fs.existsSync(componentDir)) {
    console.log(
      chalk.blueBright(
        `Parsing TSDoc for:`,
        chalk.blue.bold(`${componentName}`),
      ),
    );
    const componentFileNames = parseFileNames(componentDir);

    const docs: Array<CustomComponentDoc> = uniqBy(
      Parser.parse(componentFileNames)
        // For default exports, change the displayName
        .map(({ displayName, ...rest }) => ({
          ...rest,
          displayName: ['src', 'index'].includes(displayName)
            ? pascalCase(componentName)
            : displayName,
        }))
        // Remove any external components
        .filter(doc => !doc.filePath.includes('node_modules'))
        // Remove any components with no props
        .filter(doc => Object.keys(doc.props).length > 0)
        // Remove any internal components
        .filter(doc => isUndefined(doc.tags?.internal))
        // Group Props by where they are inherited from
        .map(({ props, ...rest }) => ({
          ...rest,
          props: Object.values(props).reduce(
            groupPropsByParent,
            {},
          ) as PropCategory,
        })),
      'displayName',
    );

    const outFilePath = path.resolve(
      __dirname,
      `${outDir}/${componentName}/tsdoc.json`,
    );
    outDir !== packagesRoot && console.log(`\t${outFilePath}`);
    fs.writeFileSync(outFilePath, JSON.stringify(docs, null, 2));
  } else {
    console.warn(
      chalk.yellow('Could not find component:'),
      chalk.bold.yellow(`\`${componentName}\``),
      chalk.yellow('in'),
      chalk.bold.yellow(packagesRoot),
    );
  }

  function groupPropsByParent(propList: PropCategory, prop: PropItem) {
    // If the prop is inherited, we group this prop under its parent
    if (prop.parent && prop.parent.name) {
      if (!propList[prop.parent.name]) {
        propList[prop.parent.name] = { [prop.name]: prop };
      }
      propList[prop.parent.name][prop.name] = prop;
    } else {
      // if there is no parent for the prop, we use the component name as the group name
      if (!propList[pascalCase(componentName)]) {
        propList[pascalCase(componentName)] = { [prop.name]: prop };
      } else {
        propList[pascalCase(componentName)][prop.name] = prop;
      }
    }

    return propList;
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
