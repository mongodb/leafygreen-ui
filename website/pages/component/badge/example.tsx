import React from 'react';
import { NewLiveExample } from 'components/live-example';
import Meta, { Basic } from './Badge.story';

export default function BadgeLiveExample() {
  return <NewLiveExample Meta={Meta} StoryFn={Basic} />;
}
