# Embeddable UIs

![npm (scoped)](https://img.shields.io/npm/v/@lg-mcp/embeddable-uis.svg)

## Installation

### PNPM

```shell
pnpm add @lg-mcp/embeddable-uis
```

### Yarn

```shell
yarn add @lg-mcp/embeddable-uis
```

### NPM

```shell
npm install @lg-mcp/embeddable-uis
```

## Overview

`@lg-mcp/embeddable-uis` provides embeddable UI components for MCP (Model Context Protocol) integrations. These components are designed to be rendered within MCP clients and provide consistent, styled interfaces for displaying MongoDB data.

## Components

### ListDatabases

Displays a table of databases with their names and sizes. The component automatically formats byte sizes to human-readable units (Bytes, KB, MB, GB, TB).

#### Example

```tsx
import { ListDatabases } from '@lg-mcp/embeddable-uis';

const databases = [
  { name: 'admin', size: 40960 },
  { name: 'local', size: 81920 },
  { name: 'sample_mflix', size: 104857600 },
];

<ListDatabases databases={databases} darkMode={false} />;
```

#### Properties

| Prop        | Type               | Description                                              | Default |
| ----------- | ------------------ | -------------------------------------------------------- | ------- |
| `databases` | `Array<Database>`  | Array of database objects to display in the table.       | -       |
| `darkMode`  | `boolean`          | Determines if the component renders in dark mode.        | -       |

#### Database Type

| Property | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| `name`   | `string` | The name of the database.      |
| `size`   | `number` | The size of the database in bytes. |
