import { css as s, cx as c } from '@leafygreen-ui/emotion';
import { useDarkMode as d } from '@leafygreen-ui/leafygreen-provider';
import {
  isComponentType as l,
  storybookArgTypes as i,
  Theme as a,
} from '@leafygreen-ui/lib';
import { palette as p } from '@leafygreen-ui/palette';
import {
  focusRing as y,
  hoverRing as g,
  spacing as m,
  transitionDuration as b,
} from '@leafygreen-ui/tokens';
import { Body as u } from '@leafygreen-ui/typography';
import f from 'prop-types';
import e, {
  createContext as n,
  forwardRef as t,
  useContext as r,
  useState as o,
} from 'react';
function h(e, r, n) {
  return (
    (r = (function (e) {
      var r = (function (e, r) {
        if ('object' != typeof e || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var t = n.call(e, r || 'default');
          if ('object' != typeof t) return t;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }

        return ('string' === r ? String : Number)(e);
      })(e, 'string');
      return 'symbol' == typeof r ? r : String(r);
    })(r)) in e
      ? Object.defineProperty(e, r, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = n),
    e
  );
}

function v() {
  return (
    (v = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var t in n)
              Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
          }

          return e;
        }),
    v.apply(this, arguments)
  );
}

function k(e, r) {
  if (null == e) return {};
  var n,
    t,
    o = (function (e, r) {
      if (null == e) return {};
      var n,
        t,
        o = {},
        a = Object.keys(e);
      for (t = 0; t < a.length; t++)
        (n = a[t]), r.indexOf(n) >= 0 || (o[n] = e[n]);
      return o;
    })(e, r);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (t = 0; t < a.length; t++)
      (n = a[t]),
        r.indexOf(n) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
  }

  return o;
}

function w(e, r) {
  return (
    r || (r = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(r) } }),
    )
  );
}

function x(e, r) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function (e, r) {
      var n =
        null == e
          ? null
          : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator'];
      if (null != n) {
        var t,
          o,
          a,
          l,
          i = [],
          s = !0,
          c = !1;
        try {
          if (((a = (n = n.call(e)).next), 0 === r)) {
            if (Object(n) !== n) return;
            s = !1;
          } else
            for (
              ;
              !(s = (t = a.call(n)).done) && (i.push(t.value), i.length !== r);
              s = !0
            );
        } catch (e) {
          (c = !0), (o = e);
        } finally {
          try {
            if (!s && null != n.return && ((l = n.return()), Object(l) !== l))
              return;
          } finally {
            if (c) throw o;
          }
        }

        return i;
      }
    })(e, r) ||
    (function (e, r) {
      if (!e) return;
      if ('string' == typeof e) return O(e, r);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      'Object' === n && e.constructor && (n = e.constructor.name);
      if ('Map' === n || 'Set' === n) return Array.from(e);
      if (
        'Arguments' === n ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return O(e, r);
    })(e, r) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function O(e, r) {
  (null == r || r > e.length) && (r = e.length);
  for (var n = 0, t = new Array(r); n < r; n++) t[n] = e[n];
  return t;
}
var P,
  j,
  S,
  E,
  M,
  C,
  N,
  T,
  A = n({ hasSelectedPrompt: !1 });
function I(r) {
  var n = r.hasSelectedPrompt,
    t = r.children;
  return e.createElement(A.Provider, { value: { hasSelectedPrompt: n } }, t);
}
(I.displayName = 'MessagePromptsProvider'),
  (I.propTypes = { children: f.node });
var H,
  D,
  L,
  z,
  U,
  $ = s(
    P ||
      (P = w([
        '\n  display: block;\n  padding: ',
        'px ',
        'px;\n  margin-bottom: ',
        'px;\n  border: 1px solid ',
        ';\n  border-radius: 12px;\n  transition: all ',
        'ms ease;\n  box-shadow: none;\n  outline: none;\n  text-align: left;\n  &:not(:last-of-type) {\n    margin-bottom: ',
        "px;\n  }\n  &[aria-disabled='false'][aria-pressed='false'] {\n    cursor: pointer;\n  }\n",
      ])),
    m[2],
    m[3],
    m[2],
    p.green.dark1,
    b.slower,
    m[1],
  ),
  q =
    (h(
      (E = {}),
      a.Dark,
      s(
        j ||
          (j = w([
            '\n    background: ',
            ';\n    color: ',
            ";\n\n    &[aria-pressed='false'][aria-disabled='false']:hover {\n      box-shadow: ",
            ";\n    }\n\n    &[aria-pressed='false'][aria-disabled='false']:focus-visible {\n      box-shadow: ",
            ';\n    }\n  ',
          ])),
        p.black,
        p.gray.light2,
        g.dark.green,
        y.dark.default,
      ),
    ),
    h(
      E,
      a.Light,
      s(
        S ||
          (S = w([
            '\n    background: ',
            ';\n    color: ',
            ";\n\n    &[aria-pressed='false'][aria-disabled='false']:hover {\n      box-shadow: ",
            ";\n    }\n\n    &[aria-pressed='false'][aria-disabled='false']:focus-visible {\n      box-shadow: ",
            ';\n    }\n  ',
          ])),
        p.white,
        p.gray.dark3,
        g.light.green,
        y.light.default,
      ),
    ),
    E),
  B =
    (h(
      (N = {}),
      a.Dark,
      s(
        M ||
          (M = w([
            '\n    border-color: ',
            ';\n    color: ',
            ';\n    background: ',
            ';\n  ',
          ])),
        p.gray.dark1,
        p.gray.dark1,
        p.gray.dark3,
      ),
    ),
    h(
      N,
      a.Light,
      s(
        C || (C = w(['\n    border-color: ', ';\n    color: ', ';\n  '])),
        p.gray.base,
        p.gray.base,
      ),
    ),
    N),
  F = s(T || (T = w(['\n  box-shadow: 0 0 0 2px ', ';\n'])), p.green.dark1),
  G = t(function (n, t) {
    var o,
      a = n.children,
      l = n.onClick,
      i = n.disabled,
      s = n.selected,
      f = n.className,
      p = n.darkMode,
      m = r(A).hasSelectedPrompt,
      b = d(p).theme,
      g = null != i ? i : !s && m;
    return e.createElement(
      'button',
      {
        className: c($, q[b], ((o = {}), h(o, B[b], g), h(o, F, s), o), f),
        onClick: g ? void 0 : l,
        'aria-disabled': !!g,
        'aria-pressed': !!s,
        tabIndex: s || g ? 0 : 1,
        ref: t,
      },
      e.createElement(u, { style: { color: 'inherit' } }, a),
    );
  });
G.displayName = 'MessagePrompt';
var J = s(
    H ||
      (H = w([
        '\n  margin-bottom: ',
        'px;\n  transition: opacity ',
        'ms ease-in;\n',
      ])),
    m[4],
    b.slower,
  ),
  K = s(D || (D = w(['\n  margin-bottom: ', 'px;\n'])), m[2]),
  Q =
    (h(
      (U = {}),
      a.Dark,
      s(L || (L = w(['\n    color: ', ';\n  '])), p.gray.light1),
    ),
    h(U, a.Light, s(z || (z = w(['\n    color: ', ';\n  '])), p.gray.dark1)),
    U),
  R = ['children', 'label', 'darkMode'],
  V = t(function (r, n) {
    var t = r.children,
      o = r.label,
      a = r.darkMode,
      i = k(r, R),
      s = d(a).theme,
      f = e.Children.toArray(t).some(function (e) {
        return l(e, 'MessagePrompt') && e.props.selected;
      });
    return e.createElement(
      I,
      { hasSelectedPrompt: f },
      e.createElement(
        'div',
        null,
        o && e.createElement(u, { className: c(K, Q[s]) }, o),
        e.createElement('div', v({ className: J, ref: n }, i), t),
      ),
    );
  });
V.displayName = 'MessagePrompts';
var W = {
    title: 'Components/MessagePrompts',
    component: V,
    argTypes: { darkMode: i.darkMode },
  },
  X = function (r) {
    var n = x(o(), 2),
      t = n[0],
      a = n[1];
    return e.createElement(
      V,
      r,
      e.createElement(
        G,
        {
          selected: 0 === t,
          onClick: function () {
            return a(0);
          },
        },
        'How does this look?',
      ),
      e.createElement(
        G,
        {
          selected: 1 === t,
          onClick: function () {
            return a(1);
          },
        },
        'This is a longer prompt. How does THIS look?',
      ),
    );
  },
  Y = X.bind({});
Y.args = { label: 'Suggested Prompts' };
var Z = function (r) {
  return e.createElement(
    V,
    r,
    e.createElement(
      G,
      {
        onClick: function (e) {
          console.log(e);
        },
      },
      'How does this look?',
    ),
    e.createElement(
      G,
      { selected: !0 },
      'This is a longer prompt. How does THIS look?',
    ),
  );
};
export { X as Basic, W as default, Z as Selected, Y as WithLabel };
