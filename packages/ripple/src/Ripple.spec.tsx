import { render } from '@testing-library/react'
import { registerRipple } from './index'
import { Options } from './utils'
import { getRippleGlobalNamespace, LGWindow } from './getRippleGlobalNamespace'

const lgNamespace = '__LEAFYGREEN_UTILS__'

describe('packages/ripple', () => {
  describe('getRippleGlobalNamespace', () => {
    describe(`when ${lgNamespace} namespace has not yet been defined`, () => {
      test(`it appends ${lgNamespace} to the window`, () => {
        getRippleGlobalNamespace();
        expect(window).toHaveProperty(lgNamespace)
      })

    })

    describe(`when ${lgNamespace} is already defined`, () => {
      beforeEach(() => {
        window[lgNamespace].modules['@leafygreen-ui/button'] = { present: true }
      })

      test('it adds the @leafygreen-ui/ripple module to the namespace', () => {
        getRippleGlobalNamespace();
        expect((window as LGWindow)[lgNamespace].modules).toHaveProperty('@leafygreen-ui/ripple')
      })

      test('it initializes the @leafygreen-ui/ripple module correctly', () => {
        const rippleNamespace = getRippleGlobalNamespace();
        expect(rippleNamespace).toStrictEqual({ setRippleListener: false, registeredRippleElements: new Map() })

      })

      test('it does not overwrite existing modules', () => {
        getRippleGlobalNamespace();
        expect((window as LGWindow)[lgNamespace].modules).toHaveProperty('@leafygreen-ui/button')
      })
    })
  })
  // console.log('windowis', window)

  // test('it registers a node to the leafygreen namespace, with the associated options', () => {
  //   const button = document.createElement('button')
  //   const buttonOptions: Options = {
  //     variant: 'danger',
  //     darkMode: false
  //   }

  //   registerRipple(button, buttonOptions)

  //   console.log(RIPPLE_NAMESPACE)

  //   expect(RIPPLE_NAMESPACE.registeredRippleElements.has(button)).toBe(true)
  //   expect(RIPPLE_NAMESPACE.registeredRippleElements.get(button)).toBe(buttonOptions)
  // })
})
