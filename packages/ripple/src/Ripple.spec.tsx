import React, { useEffect } from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { registerRipple } from './index'
import { Options } from './utils'
import { getRippleGlobalNamespace, LGWindow } from './getRippleGlobalNamespace'

const lgNamespace = '__LEAFYGREEN_UTILS__'
const buttonText = 'click me'
const buttonOptions = { variant: 'primary', darkMode: false } as const

function ButtonWrapper() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current != null) {
      registerRipple(ref.current, buttonOptions)
    }
  }, [ref])

  return (
    <button ref={ref}>{buttonText}</button>
  )
}

// describe('getRippleGlobalNamespace', () => {
//   describe(`when ${lgNamespace} namespace has not yet been defined`, () => {
//     test(`it appends ${lgNamespace} to the window`, () => {
//       getRippleGlobalNamespace();
//       expect(global).toHaveProperty(lgNamespace)
//     })

//   })

//   describe(`when ${lgNamespace} is already defined`, () => {
//     beforeEach(() => {
//       global[lgNamespace].modules['@leafygreen-ui/button'] = { present: true }
//     })

//     afterEach(() => {
//       global[lgNamespace] = undefined
//     })

//     test('it adds the @leafygreen-ui/ripple module to the namespace', () => {
//       getRippleGlobalNamespace();
//       expect(global[lgNamespace].modules).toHaveProperty('@leafygreen-ui/ripple')
//     })

//     test('it initializes the @leafygreen-ui/ripple module correctly', () => {
//       const rippleNamespace = getRippleGlobalNamespace();
//       expect(rippleNamespace).toStrictEqual({ setRippleListener: false, registeredRippleElements: new Map() })

//     })

//     test('it does not overwrite existing modules', () => {
//       getRippleGlobalNamespace();
//       expect(global[lgNamespace].modules).toHaveProperty('@leafygreen-ui/button')
//     })
//   })
// })

describe('registerRipple', () => {
  beforeEach(() => {
    render(<ButtonWrapper />)
  })

  afterEach(cleanup)

  test('it registers a node to the leafygreen namespace, with the associated options', () => {
    const button = screen.getByText(buttonText)

    expect(global[lgNamespace].modules['@leafygreen-ui/ripple'].registeredRippleElements.has(button)).toBe(true)
    expect(global[lgNamespace].modules['@leafygreen-ui/ripple'].registeredRippleElements.get(button)).toBe(buttonOptions)
  })

  test('it updates the leafygreen namespace when a registered element is clicked', () => {
    const button = screen.getByText(buttonText)
    fireEvent.click(button)

    expect(global[lgNamespace].modules['@leafygreen-ui/ripple'].setRippleListener).toBe(true)
  })

  test('it adds one event listener to the document when a registered element is clicked', () => {
    const button = screen.getByText(buttonText)
    const spy = jest.spyOn(document, 'onclick')
    fireEvent.click(button)

    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  })

  test('it returns a function that successfully removes a registered element', () => {

  })
})







  // test('it registers a node to the leafygreen namespace, with associated options', () => {
  //   const button = document.createElement('button')
  //   const buttonOptions: Options = {
  //     variant: 'danger',
  //     darkMode: false
  //   }

  //   registerRipple(button, buttonOptions)
  //   console.log(rippleNamespace)
  //   expect(rippleNamespace.registeredRippleElements.has(button)).toBe(true)
  //   expect(rippleNamespace.registeredRippleElements.get(button)).toBe(buttonOptions)
  // })

  //   test('clicking a button on the document ', () => {
  //     const button = document.createElement('button')
  //     const buttonOptions: Options = {
  //       variant: 'danger',
  //       darkMode: false
  //     }

  //     registerRipple(button, buttonOptions)
  //     console.log(rippleNamespace)
  //     expect(rippleNamespace.registeredRippleElements.has(button)).toBe(true)
  //     expect(rippleNamespace.registeredRippleElements.get(button)).toBe(buttonOptions)
  //   })
  // })
// })
