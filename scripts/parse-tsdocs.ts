/* eslint-disable no-console */
import {
  parse,
  ParserOptions,
  PropItem,
  Props,
  ComponentDoc,
} from 'react-docgen-typescript';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { isUndefined, uniqBy, startCase } from 'lodash';

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
      !skipComponents.includes(component.name) && !skipProps.includes(prop.name)
      // && !isPropExternalDeclaration(prop)
    );

    // function isPropExternalDeclaration(prop: PropItem) {
    //   return prop.parent && prop.parent.fileName.includes('node_modules');
    // }
  },
};

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
      parse(componentFileNames, TSDocOptions)
        // .filter(doc => !['src', 'index'].includes(doc.displayName))
        .filter(doc => !doc.filePath.includes('node_modules'))
        .filter(doc => Object.keys(doc.props).length > 0)
        .filter(doc => isUndefined(doc.tags?.internal))
        // Only show docs for functions that are explicitly related to the component.
        // NOTE: this should be removed in favor of consistent use of `@internal`
        // .filter(doc => doc.displayName.startsWith(startCase(componentName)))
        .map(({ props, ...rest }) => ({
          ...rest,
          // Group Props by where they are inherited from
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
      if (!propList[startCase(componentName)]) {
        propList[startCase(componentName)] = { [prop.name]: prop };
      } else {
        propList[startCase(componentName)][prop.name] = prop;
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
        const regex = /^.*.index.tsx?$/

        if (regex.test(absolute)) {
          parsedFileNames.push(absolute);
        }
      }
    }
  }
}
