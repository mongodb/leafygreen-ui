import { css as m, cx as g } from '@leafygreen-ui/emotion';
import p, { useDarkMode as f } from '@leafygreen-ui/leafygreen-provider';
import {
  createUniqueClassName as d,
  storybookArgTypes as u,
  Theme as c,
} from '@leafygreen-ui/lib';
import { palette as k } from '@leafygreen-ui/palette';
import { Polymorph as v } from '@leafygreen-ui/polymorphic';
import {
  BaseFontSize as h,
  breakpoints as y,
  spacing as b,
} from '@leafygreen-ui/tokens';
import { Avatar as o } from '@lg-chat/avatar';
import {
  LeafyGreenChatProvider as l,
  useLeafyGreenChatContext as i,
} from '@lg-chat/leafygreen-chat-provider';
import { LGMarkdown as w } from '@lg-chat/lg-markdown';
import { WithMessageRating as s } from '@lg-chat/message-feedback/src/InlineMessageFeedback/InlineMessageFeedback.stories';
import e, {
  forwardRef as n,
  useEffect as a,
  useRef as r,
  useState as t,
} from 'react';
function E(e, n, r) {
  return (
    (n = (function (e) {
      var n = (function (e, n) {
        if ('object' != typeof e || null === e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var t = r.call(e, n || 'default');
          if ('object' != typeof t) return t;
          throw new TypeError('@@toPrimitive must return a primitive value.');
        }

        return ('string' === n ? String : Number)(e);
      })(e, 'string');
      return 'symbol' == typeof n ? n : String(n);
    })(n)) in e
      ? Object.defineProperty(e, n, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[n] = r),
    e
  );
}

function S() {
  return (
    (S = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            for (var t in r)
              Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
          }

          return e;
        }),
    S.apply(this, arguments)
  );
}

function x(e, n) {
  if (null == e) return {};
  var r,
    t,
    a = (function (e, n) {
      if (null == e) return {};
      var r,
        t,
        a = {},
        o = Object.keys(e);
      for (t = 0; t < o.length; t++)
        (r = o[t]), n.indexOf(r) >= 0 || (a[r] = e[r]);
      return a;
    })(e, n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (t = 0; t < o.length; t++)
      (r = o[t]),
        n.indexOf(r) >= 0 ||
          (Object.prototype.propertyIsEnumerable.call(e, r) && (a[r] = e[r]));
  }

  return a;
}

function O(e, n) {
  return (
    n || (n = e.slice(0)),
    Object.freeze(
      Object.defineProperties(e, { raw: { value: Object.freeze(n) } }),
    )
  );
}

function M(e, n) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function (e, n) {
      var r =
        null == e
          ? null
          : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator'];
      if (null != r) {
        var t,
          a,
          o,
          i,
          l = [],
          s = !0,
          c = !1;
        try {
          if (((o = (r = r.call(e)).next), 0 === n)) {
            if (Object(r) !== r) return;
            s = !1;
          } else
            for (
              ;
              !(s = (t = o.call(r)).done) && (l.push(t.value), l.length !== n);
              s = !0
            );
        } catch (e) {
          (c = !0), (a = e);
        } finally {
          try {
            if (!s && null != r.return && ((i = r.return()), Object(i) !== i))
              return;
          } finally {
            if (c) throw a;
          }
        }

        return l;
      }
    })(e, n) ||
    (function (e, n) {
      if (!e) return;
      if ('string' == typeof e) return j(e, n);
      var r = Object.prototype.toString.call(e).slice(8, -1);
      'Object' === r && e.constructor && (r = e.constructor.name);
      if ('Map' === r || 'Set' === r) return Array.from(e);
      if (
        'Arguments' === r ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
      )
        return j(e, n);
    })(e, n) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}

function j(e, n) {
  (null == n || n > e.length) && (n = e.length);
  for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r];
  return t;
}
var N,
  P,
  T,
  z,
  A,
  F,
  I,
  C,
  H = 'primary',
  L = 'secondary',
  W = m(
    N ||
      (N = O([
        '\n  border-radius: 12px;\n  padding: ',
        'px;\n  white-space: pre-wrap;\n  overflow-wrap: break-word;\n  /* Card Shadow */\n  box-shadow: 0px 4px 10px -4px ',
        '4D; // 4D is 30% opacity\n\n  position: relative;\n',
      ])),
    b[4],
    k.black,
  ),
  D =
    (E(
      (C = {}),
      H,
      (E(
        (z = {}),
        c.Dark,
        m(
          P || (P = O(['\n      background-color: ', ';\n    '])),
          k.green.dark3,
        ),
      ),
      E(
        z,
        c.Light,
        m(
          T || (T = O(['\n      background-color: ', ';\n    '])),
          k.green.light3,
        ),
      ),
      z),
    ),
    E(
      C,
      L,
      (E(
        (I = {}),
        c.Dark,
        m(
          A || (A = O(['\n      background-color: ', ';\n    '])),
          k.gray.dark3,
        ),
      ),
      E(
        I,
        c.Light,
        m(F || (F = O(['\n      background-color: ', ';\n    '])), k.white),
      ),
      I),
    ),
    C),
  B = ['children', 'className', 'variant', 'darkMode'];
function U(n) {
  var r = n.children,
    t = n.className,
    a = n.variant,
    o = void 0 === a ? H : a,
    i = n.darkMode,
    l = x(n, B),
    s = f(i).theme;
  return e.createElement('div', S({ className: g(W, D[o][s], t) }, l), r);
}
U.displayName = 'MessageContainer';
var R,
  G,
  Y,
  $,
  q,
  J,
  K,
  Q = 'markdown',
  V = ['children', 'sourceType', 'baseFontSize', 'markdownProps'];
function X(n) {
  var r = n.children,
    t = n.sourceType,
    a = n.baseFontSize,
    o = n.markdownProps,
    i = x(n, V),
    l = null;
  if (t === Q) l = e.createElement(w, S({ baseFontSize: a }, i, o), r);
  else l = r;
  return e.createElement('div', i, l);
}
X.displayName = 'MessageContent';
var Z = d('lg-message'),
  _ = d('lg-message'),
  ee = d('lg-message-avatar'),
  ne = m(
    R ||
      (R = O([
        '\n  display: flex;\n  gap: ',
        'px;\n  align-items: flex-end;\n  width: 100%;\n\n  &:not(:last-child) {\n    margin-bottom: ',
        'px;\n  }\n',
      ])),
    b[2],
    b[3],
  ),
  re = m(G || (G = O(['\n  justify-content: flex-end;\n']))),
  te = m(Y || (Y = O(['\n  gap: ', 'px;\n'])), b[3]),
  ae = m(
    $ ||
      ($ = O(['\n  &:not(:last-child) {\n    margin-bottom: ', 'px;\n  }\n'])),
    b[4],
  ),
  oe = m(q || (q = O(['\n  display: none;\n']))),
  ie = m(J || (J = O(['\n  display: block;\n  visibility: hidden;\n']))),
  le = m(K || (K = O(['\n  max-width: ', 'px;\n'])), y.Tablet),
  se = 'right',
  ce = 'left',
  de = [
    'isSender',
    'sourceType',
    'avatar',
    'align',
    'messageBody',
    'className',
    'children',
    'componentOverrides',
    'markdownProps',
    'darkMode',
    'baseFontSize',
  ],
  ue = n(function (n, o) {
    var l,
      s,
      c,
      d,
      u,
      m = n.isSender,
      b = void 0 === m || m,
      k = n.sourceType,
      w = n.avatar,
      O = n.align,
      j = n.messageBody,
      N = n.className,
      P = n.children,
      T = n.componentOverrides,
      z = n.markdownProps,
      A = n.darkMode,
      F = n.baseFontSize,
      I = x(n, de),
      C = i().containerWidth,
      W = r(null),
      D = o || W,
      B = f(A).darkMode,
      R = O === se || (!O && b),
      G = O === ce || (!O && !b),
      Y = M(t(!0), 2),
      $ = Y[0],
      q = Y[1],
      J = function () {
        return !!C && C < y.Tablet;
      },
      K = null != F ? F : J() ? h.Body1 : h.Body2;
    return (
      a(
        function () {
          if (D.current)
            if (
              D.current.nextElementSibling &&
              D.current.nextElementSibling.classList.contains(Z)
            ) {
              var e = b && !D.current.nextElementSibling.classList.contains(_),
                n = !b && D.current.nextElementSibling.classList.contains(_);
              q(e || n);
            } else q(!0);
        },
        [D.current],
      ),
      e.createElement(
        p,
        { darkMode: B },
        e.createElement(
          'div',
          S(
            {
              className: g(
                ne,
                Z,
                ((l = {}),
                E(l, _, b),
                E(l, re, R),
                E(l, te, !J()),
                E(l, ae, !!C && C >= y.Desktop),
                l),
                N,
              ),
              ref: D,
            },
            I,
          ),
          e.createElement(
            'div',
            {
              className: g(
                ee,
                ((s = {}), E(s, oe, R && J()), E(s, ie, (R && !J()) || !$), s),
              ),
            },
            w,
          ),
          e.createElement(
            'div',
            { className: le },
            e.createElement(
              v,
              {
                as:
                  null !== (c = null == T ? void 0 : T.MessageContainer) &&
                  void 0 !== c
                    ? c
                    : U,
                variant: b ? H : L,
              },
              e.createElement(
                v,
                S(
                  {
                    as:
                      null !== (d = null == T ? void 0 : T.MessageContent) &&
                      void 0 !== d
                        ? d
                        : X,
                    sourceType: k,
                    baseFontSize: K,
                  },
                  z,
                ),
                null != j ? j : '',
              ),
              P,
            ),
          ),
          e.createElement(
            'div',
            {
              className: g(
                ee,
                ((u = {}), E(u, oe, G && J()), E(u, ie, (G && !J()) || !$), u),
              ),
            },
            w,
          ),
        ),
      )
    );
  });
ue.displayName = 'Message';
var me = ['darkMode', 'avatar'],
  ge = {
    title: 'Components/Message',
    component: ue,
    args: {
      message:
        '\n# Heading 1\n\n## Heading 2\n\n### Heading 3\n\nThis is a paragraph.\n\nEach paragraph can span multiple lines. And have multiple sentences!\n\nA paragraph can also contain formatted text, like *italics* or **bold** words.\n\nYou can link to a URL using markdown link notation, e.g. [LeafyGreen UI](mongodb.design)\n\nIf you want to talk about code in a paragraph, you can use `inline code`. Wow!\n\nOr you can use a markdown code block like this:\n\n```typescript\ntype HelloWorld = "Hello, world!"\n\nfunction helloWorld() {\n  return "Hello, world!" satisfies HelloWorld;\n}\n```\n\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n- [https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs](https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs)\n',
      avatar: e.createElement(o, { variant: 'user', name: 'Sean Park' }),
      sourceType: Q,
    },
    argTypes: {
      darkMode: u.darkMode,
      isSender: { control: 'boolean' },
      avatar: { control: 'none' },
      components: { control: 'none' },
      markdownProps: { control: 'none' },
    },
    parameters: { default: null, exclude: ['children'] },
  },
  pe = function (n) {
    var r = n.darkMode,
      t = n.avatar,
      a = x(n, me),
      o = t ? e.cloneElement(t, { darkMode: r }) : void 0;
    return e.createElement(ue, S({ avatar: o, darkMode: r }, a));
  },
  fe = pe.bind({}),
  ve = pe.bind({});
ve.args = { sourceType: void 0 };
var be = pe.bind({});
be.args = { isSender: !1, avatar: e.createElement(o, { variant: 'mongo' }) };
var ye = pe.bind({});
ye.args = {
  isSender: !1,
  avatar: e.createElement(o, { variant: 'mongo' }),
  children: e.createElement(s, null),
};
var he = function () {
    return e.createElement(
      l,
      null,
      e.createElement(
        'div',
        null,
        e.createElement(fe, S({}, ge.args, fe.args)),
        e.createElement(fe, S({}, ge.args, fe.args)),
      ),
    );
  },
  ke = function () {
    return e.createElement(
      l,
      null,
      e.createElement(
        'div',
        null,
        e.createElement(be, S({}, ge.args, be.args)),
        e.createElement(be, S({}, ge.args, be.args)),
      ),
    );
  },
  we = function () {
    return e.createElement(
      l,
      null,
      e.createElement(
        'div',
        null,
        e.createElement(fe, S({}, ge.args, fe.args)),
        e.createElement(be, S({}, ge.args, be.args)),
      ),
    );
  };
export {
  we as Alternating,
  fe as Basic,
  ge as default,
  be as Mongo,
  ke as MultipleMongo,
  he as MultipleUser,
  ve as Text,
  ye as WithMessageRating,
};
