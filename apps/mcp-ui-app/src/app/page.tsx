import React from 'react';

import config from '@/config';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>MCP UI App</h1>
      <p>Welcome to the MCP UI Application!</p>
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Configuration
        </h2>
        <p>
          <strong>Base URL:</strong> {config.baseUrl}
        </p>
        <p>
          <strong>Allowed Origins:</strong>{' '}
          {config.allowedIframeOrigins.join(', ') || 'Not configured'}
        </p>
      </div>
    </main>
  );
}
