/* eslint-disable no-console */
import depcheck from 'depcheck';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk'
import packageJson from '../package.json';
const lgPackages = readdirSync('packages/')

const devDependencies = Object.keys(packageJson.devDependencies)

async function checkDependencies() {
  let issuesFound = false;

  for (const pkg of lgPackages) {
    const check = await depcheck(resolve(__dirname, `../packages/${pkg}`), {})
    const {dependencies: unused, missing: missingLocal} = check

    const missing = Object.keys(missingLocal).filter(dep => !devDependencies.includes(dep))

    if (missing.length > 0 || unused.length > 0) {
      issuesFound = true;
      (missing.length > 0) && console.log(`${chalk.green(`packages/${pkg}`)} is missing: ${chalk.redBright(missing.join(', '))}`);
      (unused.length > 0) && console.log(`${chalk.green(`packages/${pkg}`)} doesn't use ${chalk.blueBright(unused.join(''))}`);
      console.log('')
    }
  }

  if (issuesFound) {
    exit(1)
  } else {
    exit(0)
  }
}

checkDependencies()

