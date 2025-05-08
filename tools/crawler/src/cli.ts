import { Command } from 'commander';

import { crawl } from './crawler';
import { prune } from './prune';

const program = new Command();

// Initialize CLI program
program
  .name('lg-crawler')
  .description(
    'A CLI tool for crawling and analyzing website content for LeafyGreen AI',
  );

program
  .command('crawl')
  .description('Run the crawler')
  .option('-v, --verbose', 'Enable verbose output', false)
  .option('-d, --depth <number>', 'Maximum crawl depth', '3')
  .option(
    '--url <url>',
    'Specific URL to crawl. If not provided, the crawler will scan all URLs defined in the config.',
  )
  .option(
    '--dry-run',
    'Run crawler without inserting documents into MongoDB',
    false,
  )
  .action(crawl);

program
  .command('prune')
  .description(
    'Prune old documents from MongoDB collections used by LeafyGreen Crawler',
  )
  .option('-v, --verbose', 'Enable verbose output', false)
  .option(
    '--dry-run',
    'Run prune without deleting documents from MongoDB',
    false,
  )
  .option(
    '-d, --days <number>',
    'Keep documents newer than this many days',
    '7',
  )
  .action(prune);

// Parse the command line arguments
program.parse(process.argv);

export default program;
