import { getRippleGlobalNamespace } from './getRippleGlobalNamespace';
import { Options, colorMap, Mode } from './utils';

const TRANSITION_TIME = 300;
const RIPPLE_NAMESPACE = getRippleGlobalNamespace();

function rippleEvent(event: MouseEvent) {
  if (
    RIPPLE_NAMESPACE?.registeredRippleElements.has(event.target as HTMLElement)
  ) {
    createRippleEffect(event);
  }
}

export function registerRipple(node: HTMLElement, options: Options) {
  if (!RIPPLE_NAMESPACE) {
    return;
  }

  RIPPLE_NAMESPACE.registeredRippleElements.set(node, options);

  if (!RIPPLE_NAMESPACE.setRippleListener) {
    document.addEventListener('click', rippleEvent, { passive: true });

    const styles = document.createElement('style');
    styles.innerHTML = staticRippleStyles;
    document.head.append(styles);

    RIPPLE_NAMESPACE.setRippleListener = true;
  }

  return () => RIPPLE_NAMESPACE.registeredRippleElements.delete(node);
}

function createRippleEffect(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  const foundNode = RIPPLE_NAMESPACE?.registeredRippleElements.get(
    target as HTMLElement,
  );

  if (!target || !foundNode) {
    return;
  }

  const { darkMode, variant } = foundNode;
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement('span');

  ripple.className = 'lg-ui-ripple';
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
  @-webkit-keyframes lg-ui-ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      transition: opacity ${TRANSITION_TIME}ms;
      opacity: 0;
    }
  }

  @-moz-keyframes lg-ui-ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      transition: opacity ${TRANSITION_TIME}ms;
      opacity: 0;
    }
  }

  @keyframes lg-ui-ripple {
    from {
      opacity:1;
    }
    to {
      transform: scale(2);
      transition: opacity ${TRANSITION_TIME}ms;
      opacity: 0;
    }
  }

  .lg-ui-ripple {
    position: absolute;
    border-radius: 100%;
    transform: scale(0.2);
    opacity:0;
    pointer-events: none;
    -webkit-animation: lg-ui-ripple .75s ease-out;
    -moz-animation: lg-ui-ripple .75s ease-out;
    animation: lg-ui-ripple .75s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .lg-ui-ripple {
      animation: none;
      transform: none;
    }
  }
`;
