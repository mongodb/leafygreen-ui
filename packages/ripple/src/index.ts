import { getRippleGlobalNamespace } from './getRippleGlobalNamespace';
import { Variant, colorMap, Mode } from './utils';

const TRANSITION_TIME = 300;
const RIPPLE_NAMESPACE = getRippleGlobalNamespace();

interface Options {
  variant: Variant;
  darkMode: boolean;
}

let globalOptions: Options = { darkMode: false, variant: Variant.Default };

export function registerRipple(node: HTMLElement, options: Options) {
  if (!RIPPLE_NAMESPACE) {
    return;
  }

  globalOptions = options;

  // Register Node
  // @ts-expect-error using HTMLElements to index as it provides a faster lookup when deciding if we should create a ripple effect on a given element
  RIPPLE_NAMESPACE.registeredRippleElements[node] = options;

  // Create Event Listener
  if (!RIPPLE_NAMESPACE.setRippleListener) {
    document.addEventListener(
      'click',
      event => {
        // @ts-expect-error using HTMLElements to index as it provides a faster lookup when deciding if we should create a ripple effect on a given element
        if (RIPPLE_NAMESPACE.registeredRippleElements[event.target]) {
          createRippleEffect(event);
        }
      },
      { passive: true },
    );

    // Add Global Ripple Styles
    const styles = document.createElement('style');
    styles.innerHTML = staticRippleStyles;
    document.head.append(styles);

    RIPPLE_NAMESPACE.setRippleListener = true;
  }
}

export function unregisterRipple(node: HTMLElement) {
  if (!RIPPLE_NAMESPACE) {
    return;
  }

  // @ts-expect-error using HTMLElements to index as it provides a faster lookup when deciding if we should create a ripple effect on a given element
  delete RIPPLE_NAMESPACE.registeredRippleElements[node];
}

function createRippleEffect(event: MouseEvent) {
  const { darkMode, variant } = globalOptions;

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const target = event.target as HTMLElement | null;

  if (!event || !target) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement('span');

  ripple.className = 'ripple';
  ripple.style.height = ripple.style.width =
    Math.max(rect.width, rect.height) + 'px';
  target.appendChild(ripple);

  const top =
    event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
  const left =
    event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;

  ripple.style.top = top + 'px';
  ripple.style.left = left + 'px';

  ripple.style.background = colorMap[mode][variant];

  setTimeout(() => {
    ripple.remove();
  }, TRANSITION_TIME);
}

const staticRippleStyles = `
  @-webkit-keyframes ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  @-moz-keyframes ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  .ripple {
    position: absolute;
    border-radius: 100%;
    transform: scale(0.2);
    opacity:0;
    pointer-events: none;
    -webkit-animation: ripple .75s ease-out;
    -moz-animation: ripple .75s ease-out;
    animation: ripple .75s ease-out;
  }
`;
