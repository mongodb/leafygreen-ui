import React from 'react';
import Head from 'next/head';
import Navigation from '../components/navigation/Navigation';
import PropDefinition from '../components/prop-definition/PropDefinition';

export default function Home() {
  return (
    <>
      <Head>
        <title>LeafyGreen - MongoDB Design System</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navigation />
      <div>
        <PropDefinition
          prop="showWindowChrome"
          type="boolean"
          defaultValue="false"
          description="Shows a stylized window chrome frame around the code snippet. This is purely stylistic. Shows a styalized window chrome frame around the code snippet. This is purely stylistic. Shows a styalized window chrome frame around the code snippet. This is purely stylistic. Shows a styalized window chrome frame around the code snippet. This is purely stylistic. Shows a styalized window chrome frame around the code snippet. This is purely stylistic."
        />
      </div>
    </>
  );
}
