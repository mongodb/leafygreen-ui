import fs from 'fs';

export function getAllPackageNames() {
  return fs
    .readdirSync(`${__dirname}/../../packages`, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);
}
