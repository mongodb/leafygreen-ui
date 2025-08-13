import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';

export function getChecksum(svgContent: string, processedSVGR: string): string {
  const scriptPath = path.resolve(__dirname, './index.ts');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  const checksumContent = fs.readFileSync(__filename, 'utf8');

  // Calculate the checksum
  const checksum = createHash('md5')
    .update(checksumContent)
    .update(scriptContent)
    .update(svgContent)
    .update(processedSVGR)
    .digest('hex');

  return checksum;
}
