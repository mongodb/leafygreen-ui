import React from 'react';
import { render, screen } from '@testing-library/react';

import { ListDatabases } from './ListDatabases';

const mockDatabases = [
  { name: 'db_zero', size: 0 }, // 0 Bytes
  { name: 'db_bytes', size: 512 }, // 512 Bytes
  { name: 'db_kb', size: 40960 }, // 40 KB
  { name: 'db_mb', size: 5242880 }, // 5 MB
  { name: 'db_gb', size: 1073741824 }, // 1 GB
  { name: 'db_tb', size: 1099511627776 }, // 1 TB
];

describe('mcp/embeddable-uis/ListDatabases', () => {
  test('renders correct sizes', () => {
    render(<ListDatabases databases={mockDatabases} darkMode={false} />);

    expect(screen.getByText('0 Bytes')).toBeInTheDocument();
    expect(screen.getByText('512 Bytes')).toBeInTheDocument();
    expect(screen.getByText('40 KB')).toBeInTheDocument();
    expect(screen.getByText('5 MB')).toBeInTheDocument();
    expect(screen.getByText('1 GB')).toBeInTheDocument();
    expect(screen.getByText('1 TB')).toBeInTheDocument();
  });

  test('renders correct names', () => {
    render(<ListDatabases databases={mockDatabases} darkMode={false} />);

    expect(screen.getByText('db_zero')).toBeInTheDocument();
    expect(screen.getByText('db_bytes')).toBeInTheDocument();
    expect(screen.getByText('db_kb')).toBeInTheDocument();
    expect(screen.getByText('db_mb')).toBeInTheDocument();
    expect(screen.getByText('db_gb')).toBeInTheDocument();
    expect(screen.getByText('db_tb')).toBeInTheDocument();
  });

  test('renders correct number of databases', () => {
    render(<ListDatabases databases={mockDatabases} darkMode={false} />);

    expect(screen.getByText('6 databases')).toBeInTheDocument();
  });
});
