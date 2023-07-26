/* eslint-disable no-console */
import { PropItem } from 'react-docgen-typescript';
import { CustomComponentDoc } from '@lg-tools/build/src/tsdoc.utils';
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { pickBy } from 'lodash';
import path from 'path';

/**
 * A simple script to get a quick & dirty first pass of React `propTypes` from the generated `tsdoc.json`
 */
const cli = new Command('proptypes').argument('<package>').parse(process.argv);

const [pkg] = cli.args;

try {
  const TSDocString = readFileSync(
    path.resolve(__dirname, `../packages/${pkg}/tsdoc.json`),
    'utf-8',
  );
  const TSDoc = JSON.parse(TSDocString) as Array<CustomComponentDoc>;

  TSDoc.forEach(({ props, displayName }) => {
    const allProps = Object.values(
      pickBy(props, (_, key) => !key.endsWith('Attributes')),
    ).flatMap(props => Object.values(props));

    const proptypes = allProps.reduce(propToPropType, {});

    console.log(
      `${displayName}.propTypes = ${JSON.stringify(proptypes, null, 2)}`,
    );
  });
} catch (err) {
  console.error(`Could not find tsdoc.json for ${pkg}`);
}

function propToPropType(propTypes: any, { name, type, required }: PropItem) {
  let propType = 'PropTypes.any';

  switch (type.name) {
    case 'string':
      propType = 'PropTypes.string';
      break;
    case 'number':
      propType = 'PropTypes.number';
      break;
    case 'object':
      propType = 'PropTypes.object';
      break;
    case 'array':
      propType = 'PropTypes.array';
      break;
    case 'enum':
      if (type.raw === 'boolean') {
        propType = 'PropTypes.bool';
        break;
      }

      if (type.raw === 'ReactNode') {
        propType = 'PropTypes.node';
        break;
      } else {
        propType = `PropTypes.oneOf(Object.values(${type.raw}))`;
        break;
      }
    default:
      propType = 'PropTypes.any';
      break;
  }

  if (required) propType += '.isRequired';

  return {
    [name]: propType,
    ...propTypes,
  };
}
