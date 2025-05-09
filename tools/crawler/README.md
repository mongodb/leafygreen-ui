# LeafyGreen Crawler Tool

A CLI tool for crawling and analyzing website content for LeafyGreen AI.

## Overview

This tool crawls websites and stores the content in MongoDB collections for use with LeafyGreen AI systems. The crawler can process either specific URLs or use pre-configured website sources.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- MongoDB Atlas account with connection details
- Environment variables properly configured

## Installation

```bash
# From the root of the leafygreen-ui-private repository
cd tools/crawler
yarn install
```

## Configuration

Create a `.env` file in the `tools/crawler` directory with the following variables:

```
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_PROJECT_URL=your_project_url
MONGODB_APP_NAME=your_app_name
```

### Default Sources

The crawler comes with pre-configured sources in `src/constants.ts`:

- MongoDB Design (https://mongodb.design)
- React Documentation (https://react.dev)
- MDN Web Docs (https://developer.mozilla.org)

To add or modify sources, edit the `SOURCES` array in `src/constants.ts`.

## Usage

### Building the Tool

```bash
yarn build
```

### Basic Usage

```bash
# Use the built version
yarn lg-crawler

# Or use the development version
yarn crawl
```

### Command Line Options

- `-v, --verbose`: Enable verbose output
- `-d, --depth <number>`: Set maximum crawl depth (default: 3)
- `--url <url>`: Specify a single URL to crawl
- `--dry-run`: Run crawler without inserting documents into MongoDB

### Examples

```bash
# Crawl all pre-configured sources with verbose output
yarn crawl --verbose

# Crawl a specific URL with a depth of 2
yarn crawl --url https://example.com --depth 2

# Test crawling without saving to MongoDB
yarn crawl --dry-run --verbose
```

## Development

### Project Structure

- `src/index.ts`: Main entry point and command-line interface
- `src/crawler.ts`: Core crawler implementation
- `src/constants.ts`: Configuration constants and source definitions
- `src/utils/`: Helper utilities for crawling and data processing

### Adding New Features

1. Make your code changes
2. Build the project: `yarn build`
3. Test your changes: `yarn crawl --dry-run --verbose`

### Running Tests

```bash
yarn test
```

## Troubleshooting

- **MongoDB Connection Issues**: Verify your `.env` file has the correct credentials
- **Crawling Errors**: Use the `--verbose` flag to get detailed logs
- **Rate Limiting**: Some websites may block the crawler if too many requests are made

## License

Apache-2.0
