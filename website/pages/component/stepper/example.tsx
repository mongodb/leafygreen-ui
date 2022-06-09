import React from 'react';
import { NewLiveExample } from 'components/live-example';
import Meta, { Basic } from './Stepper.story';

export default function StepperLiveExample() {
  return <NewLiveExample Meta={Meta} StoryFn={Basic} />;
}
