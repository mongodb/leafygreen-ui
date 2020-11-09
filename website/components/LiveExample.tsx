import React from 'react'
import BadgeLiveExample from './live-examples/BadgeLiveExample'
import ButtonLiveExample from './live-examples/ButtonLiveExample'

const map = {
  badge: BadgeLiveExample,
  button: ButtonLiveExample
}

export default function LiveExample({ component }) {
  const Component = map[component] ? map[component] : <div>hi</div>

  return (
    <Component />
  )
}
