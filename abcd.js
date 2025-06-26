(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const m of document.querySelectorAll('link[rel="modulepreload"]')) r(m);
  new MutationObserver((m) => {
    for (const x of m)
      if (x.type === "childList")
        for (const S of x.addedNodes)
          S.tagName === "LINK" && S.rel === "modulepreload" && r(S);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(m) {
    const x = {};
    return (
      m.integrity && (x.integrity = m.integrity),
      m.referrerPolicy && (x.referrerPolicy = m.referrerPolicy),
      m.crossOrigin === "use-credentials"
        ? (x.credentials = "include")
        : m.crossOrigin === "anonymous"
        ? (x.credentials = "omit")
        : (x.credentials = "same-origin"),
      x
    );
  }
  function r(m) {
    if (m.ep) return;
    m.ep = !0;
    const x = d(m);
    fetch(m.href, x);
  }
})();
var Nc = { exports: {} },
  _n = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cd;
function Dh() {
  if (Cd) return _n;
  Cd = 1;
  var s = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.fragment");
  function d(r, m, x) {
    var S = null;
    if (
      (x !== void 0 && (S = "" + x),
      m.key !== void 0 && (S = "" + m.key),
      "key" in m)
    ) {
      x = {};
      for (var w in m) w !== "key" && (x[w] = m[w]);
    } else x = m;
    return (
      (m = x.ref),
      { $$typeof: s, type: r, key: S, ref: m !== void 0 ? m : null, props: x }
    );
  }
  return (_n.Fragment = o), (_n.jsx = d), (_n.jsxs = d), _n;
}
var zd;
function Uh() {
  return zd || ((zd = 1), (Nc.exports = Dh())), Nc.exports;
}
var i = Uh(),
  jc = { exports: {} },
  An = {},
  Ec = { exports: {} },
  wc = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Dd;
function Hh() {
  return (
    Dd ||
      ((Dd = 1),
      (function (s) {
        function o(T, Q) {
          var W = T.length;
          T.push(Q);
          e: for (; 0 < W; ) {
            var ye = (W - 1) >>> 1,
              p = T[ye];
            if (0 < m(p, Q)) (T[ye] = Q), (T[W] = p), (W = ye);
            else break e;
          }
        }
        function d(T) {
          return T.length === 0 ? null : T[0];
        }
        function r(T) {
          if (T.length === 0) return null;
          var Q = T[0],
            W = T.pop();
          if (W !== Q) {
            T[0] = W;
            e: for (var ye = 0, p = T.length, B = p >>> 1; ye < B; ) {
              var J = 2 * (ye + 1) - 1,
                Z = T[J],
                I = J + 1,
                me = T[I];
              if (0 > m(Z, W))
                I < p && 0 > m(me, Z)
                  ? ((T[ye] = me), (T[I] = W), (ye = I))
                  : ((T[ye] = Z), (T[J] = W), (ye = J));
              else if (I < p && 0 > m(me, W))
                (T[ye] = me), (T[I] = W), (ye = I);
              else break e;
            }
          }
          return Q;
        }
        function m(T, Q) {
          var W = T.sortIndex - Q.sortIndex;
          return W !== 0 ? W : T.id - Q.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var x = performance;
          s.unstable_now = function () {
            return x.now();
          };
        } else {
          var S = Date,
            w = S.now();
          s.unstable_now = function () {
            return S.now() - w;
          };
        }
        var g = [],
          h = [],
          R = 1,
          L = null,
          A = 3,
          H = !1,
          C = !1,
          q = !1,
          V = !1,
          Y = typeof setTimeout == "function" ? setTimeout : null,
          k = typeof clearTimeout == "function" ? clearTimeout : null,
          O = typeof setImmediate < "u" ? setImmediate : null;
        function G(T) {
          for (var Q = d(h); Q !== null; ) {
            if (Q.callback === null) r(h);
            else if (Q.startTime <= T)
              r(h), (Q.sortIndex = Q.expirationTime), o(g, Q);
            else break;
            Q = d(h);
          }
        }
        function K(T) {
          if (((q = !1), G(T), !C))
            if (d(g) !== null) (C = !0), se || ((se = !0), Be());
            else {
              var Q = d(h);
              Q !== null && X(K, Q.startTime - T);
            }
        }
        var se = !1,
          F = -1,
          ie = 5,
          te = -1;
        function je() {
          return V ? !0 : !(s.unstable_now() - te < ie);
        }
        function $e() {
          if (((V = !1), se)) {
            var T = s.unstable_now();
            te = T;
            var Q = !0;
            try {
              e: {
                (C = !1), q && ((q = !1), k(F), (F = -1)), (H = !0);
                var W = A;
                try {
                  t: {
                    for (
                      G(T), L = d(g);
                      L !== null && !(L.expirationTime > T && je());

                    ) {
                      var ye = L.callback;
                      if (typeof ye == "function") {
                        (L.callback = null), (A = L.priorityLevel);
                        var p = ye(L.expirationTime <= T);
                        if (((T = s.unstable_now()), typeof p == "function")) {
                          (L.callback = p), G(T), (Q = !0);
                          break t;
                        }
                        L === d(g) && r(g), G(T);
                      } else r(g);
                      L = d(g);
                    }
                    if (L !== null) Q = !0;
                    else {
                      var B = d(h);
                      B !== null && X(K, B.startTime - T), (Q = !1);
                    }
                  }
                  break e;
                } finally {
                  (L = null), (A = W), (H = !1);
                }
                Q = void 0;
              }
            } finally {
              Q ? Be() : (se = !1);
            }
          }
        }
        var Be;
        if (typeof O == "function")
          Be = function () {
            O($e);
          };
        else if (typeof MessageChannel < "u") {
          var Ot = new MessageChannel(),
            Ct = Ot.port2;
          (Ot.port1.onmessage = $e),
            (Be = function () {
              Ct.postMessage(null);
            });
        } else
          Be = function () {
            Y($e, 0);
          };
        function X(T, Q) {
          F = Y(function () {
            T(s.unstable_now());
          }, Q);
        }
        (s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (T) {
            T.callback = null;
          }),
          (s.unstable_forceFrameRate = function (T) {
            0 > T || 125 < T
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (ie = 0 < T ? Math.floor(1e3 / T) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return A;
          }),
          (s.unstable_next = function (T) {
            switch (A) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = A;
            }
            var W = A;
            A = Q;
            try {
              return T();
            } finally {
              A = W;
            }
          }),
          (s.unstable_requestPaint = function () {
            V = !0;
          }),
          (s.unstable_runWithPriority = function (T, Q) {
            switch (T) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                T = 3;
            }
            var W = A;
            A = T;
            try {
              return Q();
            } finally {
              A = W;
            }
          }),
          (s.unstable_scheduleCallback = function (T, Q, W) {
            var ye = s.unstable_now();
            switch (
              (typeof W == "object" && W !== null
                ? ((W = W.delay),
                  (W = typeof W == "number" && 0 < W ? ye + W : ye))
                : (W = ye),
              T)
            ) {
              case 1:
                var p = -1;
                break;
              case 2:
                p = 250;
                break;
              case 5:
                p = 1073741823;
                break;
              case 4:
                p = 1e4;
                break;
              default:
                p = 5e3;
            }
            return (
              (p = W + p),
              (T = {
                id: R++,
                callback: Q,
                priorityLevel: T,
                startTime: W,
                expirationTime: p,
                sortIndex: -1,
              }),
              W > ye
                ? ((T.sortIndex = W),
                  o(h, T),
                  d(g) === null &&
                    T === d(h) &&
                    (q ? (k(F), (F = -1)) : (q = !0), X(K, W - ye)))
                : ((T.sortIndex = p),
                  o(g, T),
                  C || H || ((C = !0), se || ((se = !0), Be()))),
              T
            );
          }),
          (s.unstable_shouldYield = je),
          (s.unstable_wrapCallback = function (T) {
            var Q = A;
            return function () {
              var W = A;
              A = Q;
              try {
                return T.apply(this, arguments);
              } finally {
                A = W;
              }
            };
          });
      })(wc)),
    wc
  );
}
var Ud;
function Bh() {
  return Ud || ((Ud = 1), (Ec.exports = Hh())), Ec.exports;
}
var Tc = { exports: {} },
  ue = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Hd;
function Lh() {
  if (Hd) return ue;
  Hd = 1;
  var s = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.portal"),
    d = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    m = Symbol.for("react.profiler"),
    x = Symbol.for("react.consumer"),
    S = Symbol.for("react.context"),
    w = Symbol.for("react.forward_ref"),
    g = Symbol.for("react.suspense"),
    h = Symbol.for("react.memo"),
    R = Symbol.for("react.lazy"),
    L = Symbol.iterator;
  function A(p) {
    return p === null || typeof p != "object"
      ? null
      : ((p = (L && p[L]) || p["@@iterator"]),
        typeof p == "function" ? p : null);
  }
  var H = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C = Object.assign,
    q = {};
  function V(p, B, J) {
    (this.props = p),
      (this.context = B),
      (this.refs = q),
      (this.updater = J || H);
  }
  (V.prototype.isReactComponent = {}),
    (V.prototype.setState = function (p, B) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, p, B, "setState");
    }),
    (V.prototype.forceUpdate = function (p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    });
  function Y() {}
  Y.prototype = V.prototype;
  function k(p, B, J) {
    (this.props = p),
      (this.context = B),
      (this.refs = q),
      (this.updater = J || H);
  }
  var O = (k.prototype = new Y());
  (O.constructor = k), C(O, V.prototype), (O.isPureReactComponent = !0);
  var G = Array.isArray,
    K = { H: null, A: null, T: null, S: null, V: null },
    se = Object.prototype.hasOwnProperty;
  function F(p, B, J, Z, I, me) {
    return (
      (J = me.ref),
      { $$typeof: s, type: p, key: B, ref: J !== void 0 ? J : null, props: me }
    );
  }
  function ie(p, B) {
    return F(p.type, B, void 0, void 0, void 0, p.props);
  }
  function te(p) {
    return typeof p == "object" && p !== null && p.$$typeof === s;
  }
  function je(p) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      p.replace(/[=:]/g, function (J) {
        return B[J];
      })
    );
  }
  var $e = /\/+/g;
  function Be(p, B) {
    return typeof p == "object" && p !== null && p.key != null
      ? je("" + p.key)
      : B.toString(36);
  }
  function Ot() {}
  function Ct(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (
          (typeof p.status == "string"
            ? p.then(Ot, Ot)
            : ((p.status = "pending"),
              p.then(
                function (B) {
                  p.status === "pending" &&
                    ((p.status = "fulfilled"), (p.value = B));
                },
                function (B) {
                  p.status === "pending" &&
                    ((p.status = "rejected"), (p.reason = B));
                }
              )),
          p.status)
        ) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function X(p, B, J, Z, I) {
    var me = typeof p;
    (me === "undefined" || me === "boolean") && (p = null);
    var ne = !1;
    if (p === null) ne = !0;
    else
      switch (me) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case s:
            case o:
              ne = !0;
              break;
            case R:
              return (ne = p._init), X(ne(p._payload), B, J, Z, I);
          }
      }
    if (ne)
      return (
        (I = I(p)),
        (ne = Z === "" ? "." + Be(p, 0) : Z),
        G(I)
          ? ((J = ""),
            ne != null && (J = ne.replace($e, "$&/") + "/"),
            X(I, B, J, "", function (Ft) {
              return Ft;
            }))
          : I != null &&
            (te(I) &&
              (I = ie(
                I,
                J +
                  (I.key == null || (p && p.key === I.key)
                    ? ""
                    : ("" + I.key).replace($e, "$&/") + "/") +
                  ne
              )),
            B.push(I)),
        1
      );
    ne = 0;
    var tt = Z === "" ? "." : Z + ":";
    if (G(p))
      for (var we = 0; we < p.length; we++)
        (Z = p[we]), (me = tt + Be(Z, we)), (ne += X(Z, B, J, me, I));
    else if (((we = A(p)), typeof we == "function"))
      for (p = we.call(p), we = 0; !(Z = p.next()).done; )
        (Z = Z.value), (me = tt + Be(Z, we++)), (ne += X(Z, B, J, me, I));
    else if (me === "object") {
      if (typeof p.then == "function") return X(Ct(p), B, J, Z, I);
      throw (
        ((B = String(p)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]"
              ? "object with keys {" + Object.keys(p).join(", ") + "}"
              : B) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return ne;
  }
  function T(p, B, J) {
    if (p == null) return p;
    var Z = [],
      I = 0;
    return (
      X(p, Z, "", "", function (me) {
        return B.call(J, me, I++);
      }),
      Z
    );
  }
  function Q(p) {
    if (p._status === -1) {
      var B = p._result;
      (B = B()),
        B.then(
          function (J) {
            (p._status === 0 || p._status === -1) &&
              ((p._status = 1), (p._result = J));
          },
          function (J) {
            (p._status === 0 || p._status === -1) &&
              ((p._status = 2), (p._result = J));
          }
        ),
        p._status === -1 && ((p._status = 0), (p._result = B));
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var W =
    typeof reportError == "function"
      ? reportError
      : function (p) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var B = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof p == "object" &&
                p !== null &&
                typeof p.message == "string"
                  ? String(p.message)
                  : String(p),
              error: p,
            });
            if (!window.dispatchEvent(B)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", p);
            return;
          }
          console.error(p);
        };
  function ye() {}
  return (
    (ue.Children = {
      map: T,
      forEach: function (p, B, J) {
        T(
          p,
          function () {
            B.apply(this, arguments);
          },
          J
        );
      },
      count: function (p) {
        var B = 0;
        return (
          T(p, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (p) {
        return (
          T(p, function (B) {
            return B;
          }) || []
        );
      },
      only: function (p) {
        if (!te(p))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return p;
      },
    }),
    (ue.Component = V),
    (ue.Fragment = d),
    (ue.Profiler = m),
    (ue.PureComponent = k),
    (ue.StrictMode = r),
    (ue.Suspense = g),
    (ue.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (ue.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (p) {
        return K.H.useMemoCache(p);
      },
    }),
    (ue.cache = function (p) {
      return function () {
        return p.apply(null, arguments);
      };
    }),
    (ue.cloneElement = function (p, B, J) {
      if (p == null)
        throw Error(
          "The argument must be a React element, but you passed " + p + "."
        );
      var Z = C({}, p.props),
        I = p.key,
        me = void 0;
      if (B != null)
        for (ne in (B.ref !== void 0 && (me = void 0),
        B.key !== void 0 && (I = "" + B.key),
        B))
          !se.call(B, ne) ||
            ne === "key" ||
            ne === "__self" ||
            ne === "__source" ||
            (ne === "ref" && B.ref === void 0) ||
            (Z[ne] = B[ne]);
      var ne = arguments.length - 2;
      if (ne === 1) Z.children = J;
      else if (1 < ne) {
        for (var tt = Array(ne), we = 0; we < ne; we++)
          tt[we] = arguments[we + 2];
        Z.children = tt;
      }
      return F(p.type, I, void 0, void 0, me, Z);
    }),
    (ue.createContext = function (p) {
      return (
        (p = {
          $$typeof: S,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (p.Provider = p),
        (p.Consumer = { $$typeof: x, _context: p }),
        p
      );
    }),
    (ue.createElement = function (p, B, J) {
      var Z,
        I = {},
        me = null;
      if (B != null)
        for (Z in (B.key !== void 0 && (me = "" + B.key), B))
          se.call(B, Z) &&
            Z !== "key" &&
            Z !== "__self" &&
            Z !== "__source" &&
            (I[Z] = B[Z]);
      var ne = arguments.length - 2;
      if (ne === 1) I.children = J;
      else if (1 < ne) {
        for (var tt = Array(ne), we = 0; we < ne; we++)
          tt[we] = arguments[we + 2];
        I.children = tt;
      }
      if (p && p.defaultProps)
        for (Z in ((ne = p.defaultProps), ne))
          I[Z] === void 0 && (I[Z] = ne[Z]);
      return F(p, me, void 0, void 0, null, I);
    }),
    (ue.createRef = function () {
      return { current: null };
    }),
    (ue.forwardRef = function (p) {
      return { $$typeof: w, render: p };
    }),
    (ue.isValidElement = te),
    (ue.lazy = function (p) {
      return { $$typeof: R, _payload: { _status: -1, _result: p }, _init: Q };
    }),
    (ue.memo = function (p, B) {
      return { $$typeof: h, type: p, compare: B === void 0 ? null : B };
    }),
    (ue.startTransition = function (p) {
      var B = K.T,
        J = {};
      K.T = J;
      try {
        var Z = p(),
          I = K.S;
        I !== null && I(J, Z),
          typeof Z == "object" &&
            Z !== null &&
            typeof Z.then == "function" &&
            Z.then(ye, W);
      } catch (me) {
        W(me);
      } finally {
        K.T = B;
      }
    }),
    (ue.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (ue.use = function (p) {
      return K.H.use(p);
    }),
    (ue.useActionState = function (p, B, J) {
      return K.H.useActionState(p, B, J);
    }),
    (ue.useCallback = function (p, B) {
      return K.H.useCallback(p, B);
    }),
    (ue.useContext = function (p) {
      return K.H.useContext(p);
    }),
    (ue.useDebugValue = function () {}),
    (ue.useDeferredValue = function (p, B) {
      return K.H.useDeferredValue(p, B);
    }),
    (ue.useEffect = function (p, B, J) {
      var Z = K.H;
      if (typeof J == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        );
      return Z.useEffect(p, B);
    }),
    (ue.useId = function () {
      return K.H.useId();
    }),
    (ue.useImperativeHandle = function (p, B, J) {
      return K.H.useImperativeHandle(p, B, J);
    }),
    (ue.useInsertionEffect = function (p, B) {
      return K.H.useInsertionEffect(p, B);
    }),
    (ue.useLayoutEffect = function (p, B) {
      return K.H.useLayoutEffect(p, B);
    }),
    (ue.useMemo = function (p, B) {
      return K.H.useMemo(p, B);
    }),
    (ue.useOptimistic = function (p, B) {
      return K.H.useOptimistic(p, B);
    }),
    (ue.useReducer = function (p, B, J) {
      return K.H.useReducer(p, B, J);
    }),
    (ue.useRef = function (p) {
      return K.H.useRef(p);
    }),
    (ue.useState = function (p) {
      return K.H.useState(p);
    }),
    (ue.useSyncExternalStore = function (p, B, J) {
      return K.H.useSyncExternalStore(p, B, J);
    }),
    (ue.useTransition = function () {
      return K.H.useTransition();
    }),
    (ue.version = "19.1.0"),
    ue
  );
}
var Bd;
function Cc() {
  return Bd || ((Bd = 1), (Tc.exports = Lh())), Tc.exports;
}
var _c = { exports: {} },
  Ke = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ld;
function qh() {
  if (Ld) return Ke;
  Ld = 1;
  var s = Cc();
  function o(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        h += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return (
      "Minified React error #" +
      g +
      "; visit " +
      h +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function d() {}
  var r = {
      d: {
        f: d,
        r: function () {
          throw Error(o(522));
        },
        D: d,
        C: d,
        L: d,
        m: d,
        X: d,
        S: d,
        M: d,
      },
      p: 0,
      findDOMNode: null,
    },
    m = Symbol.for("react.portal");
  function x(g, h, R) {
    var L =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: L == null ? null : "" + L,
      children: g,
      containerInfo: h,
      implementation: R,
    };
  }
  var S = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function w(g, h) {
    if (g === "font") return "";
    if (typeof h == "string") return h === "use-credentials" ? h : "";
  }
  return (
    (Ke.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Ke.createPortal = function (g, h) {
      var R =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || (h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11))
        throw Error(o(299));
      return x(g, h, null, R);
    }),
    (Ke.flushSync = function (g) {
      var h = S.T,
        R = r.p;
      try {
        if (((S.T = null), (r.p = 2), g)) return g();
      } finally {
        (S.T = h), (r.p = R), r.d.f();
      }
    }),
    (Ke.preconnect = function (g, h) {
      typeof g == "string" &&
        (h
          ? ((h = h.crossOrigin),
            (h =
              typeof h == "string"
                ? h === "use-credentials"
                  ? h
                  : ""
                : void 0))
          : (h = null),
        r.d.C(g, h));
    }),
    (Ke.prefetchDNS = function (g) {
      typeof g == "string" && r.d.D(g);
    }),
    (Ke.preinit = function (g, h) {
      if (typeof g == "string" && h && typeof h.as == "string") {
        var R = h.as,
          L = w(R, h.crossOrigin),
          A = typeof h.integrity == "string" ? h.integrity : void 0,
          H = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        R === "style"
          ? r.d.S(g, typeof h.precedence == "string" ? h.precedence : void 0, {
              crossOrigin: L,
              integrity: A,
              fetchPriority: H,
            })
          : R === "script" &&
            r.d.X(g, {
              crossOrigin: L,
              integrity: A,
              fetchPriority: H,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
      }
    }),
    (Ke.preinitModule = function (g, h) {
      if (typeof g == "string")
        if (typeof h == "object" && h !== null) {
          if (h.as == null || h.as === "script") {
            var R = w(h.as, h.crossOrigin);
            r.d.M(g, {
              crossOrigin: R,
              integrity: typeof h.integrity == "string" ? h.integrity : void 0,
              nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            });
          }
        } else h == null && r.d.M(g);
    }),
    (Ke.preload = function (g, h) {
      if (
        typeof g == "string" &&
        typeof h == "object" &&
        h !== null &&
        typeof h.as == "string"
      ) {
        var R = h.as,
          L = w(R, h.crossOrigin);
        r.d.L(g, R, {
          crossOrigin: L,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority:
            typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy:
            typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet:
            typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0,
        });
      }
    }),
    (Ke.preloadModule = function (g, h) {
      if (typeof g == "string")
        if (h) {
          var R = w(h.as, h.crossOrigin);
          r.d.m(g, {
            as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
            crossOrigin: R,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          });
        } else r.d.m(g);
    }),
    (Ke.requestFormReset = function (g) {
      r.d.r(g);
    }),
    (Ke.unstable_batchedUpdates = function (g, h) {
      return g(h);
    }),
    (Ke.useFormState = function (g, h, R) {
      return S.H.useFormState(g, h, R);
    }),
    (Ke.useFormStatus = function () {
      return S.H.useHostTransitionStatus();
    }),
    (Ke.version = "19.1.0"),
    Ke
  );
}
var qd;
function Yh() {
  if (qd) return _c.exports;
  qd = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), (_c.exports = qh()), _c.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Yd;
function Gh() {
  if (Yd) return An;
  Yd = 1;
  var s = Bh(),
    o = Cc(),
    d = Yh();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function m(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function x(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do (t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return);
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function S(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function w(e) {
    if (x(e) !== e) throw Error(r(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = x(e)), t === null)) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return w(n), e;
          if (u === a) return w(n), t;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== a.return) (l = n), (a = u);
      else {
        for (var c = !1, f = n.child; f; ) {
          if (f === l) {
            (c = !0), (l = n), (a = u);
            break;
          }
          if (f === a) {
            (c = !0), (a = n), (l = u);
            break;
          }
          f = f.sibling;
        }
        if (!c) {
          for (f = u.child; f; ) {
            if (f === l) {
              (c = !0), (l = u), (a = n);
              break;
            }
            if (f === a) {
              (c = !0), (a = u), (l = n);
              break;
            }
            f = f.sibling;
          }
          if (!c) throw Error(r(189));
        }
      }
      if (l.alternate !== a) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? e : t;
  }
  function h(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = h(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var R = Object.assign,
    L = Symbol.for("react.element"),
    A = Symbol.for("react.transitional.element"),
    H = Symbol.for("react.portal"),
    C = Symbol.for("react.fragment"),
    q = Symbol.for("react.strict_mode"),
    V = Symbol.for("react.profiler"),
    Y = Symbol.for("react.provider"),
    k = Symbol.for("react.consumer"),
    O = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    K = Symbol.for("react.suspense"),
    se = Symbol.for("react.suspense_list"),
    F = Symbol.for("react.memo"),
    ie = Symbol.for("react.lazy"),
    te = Symbol.for("react.activity"),
    je = Symbol.for("react.memo_cache_sentinel"),
    $e = Symbol.iterator;
  function Be(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = ($e && e[$e]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Ot = Symbol.for("react.client.reference");
  function Ct(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ot ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case V:
        return "Profiler";
      case q:
        return "StrictMode";
      case K:
        return "Suspense";
      case se:
        return "SuspenseList";
      case te:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case H:
          return "Portal";
        case O:
          return (e.displayName || "Context") + ".Provider";
        case k:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case F:
          return (
            (t = e.displayName || null), t !== null ? t : Ct(e.type) || "Memo"
          );
        case ie:
          (t = e._payload), (e = e._init);
          try {
            return Ct(e(t));
          } catch {}
      }
    return null;
  }
  var X = Array.isArray,
    T = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    W = { pending: !1, data: null, method: null, action: null },
    ye = [],
    p = -1;
  function B(e) {
    return { current: e };
  }
  function J(e) {
    0 > p || ((e.current = ye[p]), (ye[p] = null), p--);
  }
  function Z(e, t) {
    p++, (ye[p] = e.current), (e.current = t);
  }
  var I = B(null),
    me = B(null),
    ne = B(null),
    tt = B(null);
  function we(e, t) {
    switch ((Z(ne, t), Z(me, e), Z(I, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? id(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          (t = id(t)), (e = sd(t, e));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    J(I), Z(I, e);
  }
  function Ft() {
    J(I), J(me), J(ne);
  }
  function si(e) {
    e.memoizedState !== null && Z(tt, e);
    var t = I.current,
      l = sd(t, e.type);
    t !== l && (Z(me, e), Z(I, l));
  }
  function Hn(e) {
    me.current === e && (J(I), J(me)),
      tt.current === e && (J(tt), (Nn._currentValue = W));
  }
  var ci = Object.prototype.hasOwnProperty,
    ri = s.unstable_scheduleCallback,
    fi = s.unstable_cancelCallback,
    dm = s.unstable_shouldYield,
    mm = s.unstable_requestPaint,
    jt = s.unstable_now,
    hm = s.unstable_getCurrentPriorityLevel,
    Lc = s.unstable_ImmediatePriority,
    qc = s.unstable_UserBlockingPriority,
    Bn = s.unstable_NormalPriority,
    ym = s.unstable_LowPriority,
    Yc = s.unstable_IdlePriority,
    gm = s.log,
    xm = s.unstable_setDisableYieldValue,
    Ma = null,
    lt = null;
  function Pt(e) {
    if (
      (typeof gm == "function" && xm(e),
      lt && typeof lt.setStrictMode == "function")
    )
      try {
        lt.setStrictMode(Ma, e);
      } catch {}
  }
  var at = Math.clz32 ? Math.clz32 : bm,
    pm = Math.log,
    vm = Math.LN2;
  function bm(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((pm(e) / vm) | 0)) | 0;
  }
  var Ln = 256,
    qn = 4194304;
  function Nl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Yn(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      u = e.suspendedLanes,
      c = e.pingedLanes;
    e = e.warmLanes;
    var f = a & 134217727;
    return (
      f !== 0
        ? ((a = f & ~u),
          a !== 0
            ? (n = Nl(a))
            : ((c &= f),
              c !== 0
                ? (n = Nl(c))
                : l || ((l = f & ~e), l !== 0 && (n = Nl(l)))))
        : ((f = a & ~u),
          f !== 0
            ? (n = Nl(f))
            : c !== 0
            ? (n = Nl(c))
            : l || ((l = a & ~e), l !== 0 && (n = Nl(l)))),
      n === 0
        ? 0
        : t !== 0 &&
          t !== n &&
          (t & u) === 0 &&
          ((u = n & -n),
          (l = t & -t),
          u >= l || (u === 32 && (l & 4194048) !== 0))
        ? t
        : n
    );
  }
  function Ra(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Sm(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Gc() {
    var e = Ln;
    return (Ln <<= 1), (Ln & 4194048) === 0 && (Ln = 256), e;
  }
  function Xc() {
    var e = qn;
    return (qn <<= 1), (qn & 62914560) === 0 && (qn = 4194304), e;
  }
  function oi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Oa(e, t) {
    (e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0));
  }
  function Nm(e, t, l, a, n, u) {
    var c = e.pendingLanes;
    (e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0);
    var f = e.entanglements,
      y = e.expirationTimes,
      E = e.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var z = 31 - at(l),
        U = 1 << z;
      (f[z] = 0), (y[z] = -1);
      var _ = E[z];
      if (_ !== null)
        for (E[z] = null, z = 0; z < _.length; z++) {
          var M = _[z];
          M !== null && (M.lane &= -536870913);
        }
      l &= ~U;
    }
    a !== 0 && Qc(e, a, 0),
      u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function Qc(e, t, l) {
    (e.pendingLanes |= t), (e.suspendedLanes &= ~t);
    var a = 31 - at(t);
    (e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194090));
  }
  function Vc(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - at(l),
        n = 1 << a;
      (n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n);
    }
  }
  function di(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function mi(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function kc() {
    var e = Q.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Td(e.type));
  }
  function jm(e, t) {
    var l = Q.p;
    try {
      return (Q.p = e), t();
    } finally {
      Q.p = l;
    }
  }
  var It = Math.random().toString(36).slice(2),
    ke = "__reactFiber$" + It,
    We = "__reactProps$" + It,
    Xl = "__reactContainer$" + It,
    hi = "__reactEvents$" + It,
    Em = "__reactListeners$" + It,
    wm = "__reactHandles$" + It,
    Zc = "__reactResources$" + It,
    Ca = "__reactMarker$" + It;
  function yi(e) {
    delete e[ke], delete e[We], delete e[hi], delete e[Em], delete e[wm];
  }
  function Ql(e) {
    var t = e[ke];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Xl] || l[ke])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = od(e); e !== null; ) {
            if ((l = e[ke])) return l;
            e = od(e);
          }
        return t;
      }
      (e = l), (l = e.parentNode);
    }
    return null;
  }
  function Vl(e) {
    if ((e = e[ke] || e[Xl])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function za(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function kl(e) {
    var t = e[Zc];
    return (
      t ||
        (t = e[Zc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Le(e) {
    e[Ca] = !0;
  }
  var Kc = new Set(),
    Jc = {};
  function jl(e, t) {
    Zl(e, t), Zl(e + "Capture", t);
  }
  function Zl(e, t) {
    for (Jc[e] = t, e = 0; e < t.length; e++) Kc.add(t[e]);
  }
  var Tm = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    $c = {},
    Wc = {};
  function _m(e) {
    return ci.call(Wc, e)
      ? !0
      : ci.call($c, e)
      ? !1
      : Tm.test(e)
      ? (Wc[e] = !0)
      : (($c[e] = !0), !1);
  }
  function Gn(e, t, l) {
    if (_m(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Xn(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function zt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  var gi, Fc;
  function Kl(e) {
    if (gi === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        (gi = (t && t[1]) || ""),
          (Fc =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      gi +
      e +
      Fc
    );
  }
  var xi = !1;
  function pi(e, t) {
    if (!e || xi) return "";
    xi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var U = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(U.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(U, []);
                } catch (M) {
                  var _ = M;
                }
                Reflect.construct(e, [], U);
              } else {
                try {
                  U.call();
                } catch (M) {
                  _ = M;
                }
                e.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (M) {
                _ = M;
              }
              (U = e()) &&
                typeof U.catch == "function" &&
                U.catch(function () {});
            }
          } catch (M) {
            if (M && _ && typeof M.stack == "string") return [M.stack, _.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = a.DetermineComponentFrameRoot(),
        c = u[0],
        f = u[1];
      if (c && f) {
        var y = c.split(`
`),
          E = f.split(`
`);
        for (
          n = a = 0;
          a < y.length && !y[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; n < E.length && !E[n].includes("DetermineComponentFrameRoot"); )
          n++;
        if (a === y.length || n === E.length)
          for (
            a = y.length - 1, n = E.length - 1;
            1 <= a && 0 <= n && y[a] !== E[n];

          )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (y[a] !== E[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || y[a] !== E[n])) {
                  var z =
                    `
` + y[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      z.includes("<anonymous>") &&
                      (z = z.replace("<anonymous>", e.displayName)),
                    z
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      (xi = !1), (Error.prepareStackTrace = l);
    }
    return (l = e ? e.displayName || e.name : "") ? Kl(l) : "";
  }
  function Am(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Kl(e.type);
      case 16:
        return Kl("Lazy");
      case 13:
        return Kl("Suspense");
      case 19:
        return Kl("SuspenseList");
      case 0:
      case 15:
        return pi(e.type, !1);
      case 11:
        return pi(e.type.render, !1);
      case 1:
        return pi(e.type, !0);
      case 31:
        return Kl("Activity");
      default:
        return "";
    }
  }
  function Pc(e) {
    try {
      var t = "";
      do (t += Am(e)), (e = e.return);
      while (e);
      return t;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  function ot(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Ic(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Mm(e) {
    var t = Ic(e) ? "checked" : "value",
      l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var n = l.get,
        u = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (c) {
            (a = "" + c), u.call(this, c);
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (c) {
            a = "" + c;
          },
          stopTracking: function () {
            (e._valueTracker = null), delete e[t];
          },
        }
      );
    }
  }
  function Qn(e) {
    e._valueTracker || (e._valueTracker = Mm(e));
  }
  function er(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = "";
    return (
      e && (a = Ic(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function Vn(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Rm = /[\n"\\]/g;
  function dt(e) {
    return e.replace(Rm, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function vi(e, t, l, a, n, u, c, f) {
    (e.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (e.type = c)
        : e.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + ot(t))
          : e.value !== "" + ot(t) && (e.value = "" + ot(t))
        : (c !== "submit" && c !== "reset") || e.removeAttribute("value"),
      t != null
        ? bi(e, c, ot(t))
        : l != null
        ? bi(e, c, ot(l))
        : a != null && e.removeAttribute("value"),
      n == null && u != null && (e.defaultChecked = !!u),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.name = "" + ot(f))
        : e.removeAttribute("name");
  }
  function tr(e, t, l, a, n, u, c, f) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || l != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) return;
      (l = l != null ? "" + ot(l) : ""),
        (t = t != null ? "" + ot(t) : l),
        f || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    (a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = f ? e.checked : !!a),
      (e.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.name = c);
  }
  function bi(e, t, l) {
    (t === "number" && Vn(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l);
  }
  function Jl(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        (n = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + ot(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          (e[n].selected = !0), a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lr(e, t, l) {
    if (
      t != null &&
      ((t = "" + ot(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + ot(l) : "";
  }
  function ar(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(r(92));
        if (X(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), (t = l);
    }
    (l = ot(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a);
  }
  function $l(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Om = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function nr(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : a
      ? e.setProperty(t, l)
      : typeof l != "number" || l === 0 || Om.has(t)
      ? t === "float"
        ? (e.cssFloat = l)
        : (e[t] = ("" + l).trim())
      : (e[t] = l + "px");
  }
  function ur(e, t, l) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""));
      for (var n in t)
        (a = t[n]), t.hasOwnProperty(n) && l[n] !== a && nr(e, n, a);
    } else for (var u in t) t.hasOwnProperty(u) && nr(e, u, t[u]);
  }
  function Si(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Cm = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    zm =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function kn(e) {
    return zm.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var Ni = null;
  function ji(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Wl = null,
    Fl = null;
  function ir(e) {
    var t = Vl(e);
    if (t && (e = t.stateNode)) {
      var l = e[We] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (vi(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + dt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[We] || null;
                if (!n) throw Error(r(90));
                vi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              (a = l[t]), a.form === e.form && er(a);
          }
          break e;
        case "textarea":
          lr(e, l.value, l.defaultValue);
          break e;
        case "select":
          (t = l.value), t != null && Jl(e, !!l.multiple, t, !1);
      }
    }
  }
  var Ei = !1;
  function sr(e, t, l) {
    if (Ei) return e(t, l);
    Ei = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((Ei = !1),
        (Wl !== null || Fl !== null) &&
          (Ru(), Wl && ((t = Wl), (e = Fl), (Fl = Wl = null), ir(t), e)))
      )
        for (t = 0; t < e.length; t++) ir(e[t]);
    }
  }
  function Da(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[We] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function") throw Error(r(231, t, typeof l));
    return l;
  }
  var Dt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    wi = !1;
  if (Dt)
    try {
      var Ua = {};
      Object.defineProperty(Ua, "passive", {
        get: function () {
          wi = !0;
        },
      }),
        window.addEventListener("test", Ua, Ua),
        window.removeEventListener("test", Ua, Ua);
    } catch {
      wi = !1;
    }
  var el = null,
    Ti = null,
    Zn = null;
  function cr() {
    if (Zn) return Zn;
    var e,
      t = Ti,
      l = t.length,
      a,
      n = "value" in el ? el.value : el.textContent,
      u = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++);
    var c = l - e;
    for (a = 1; a <= c && t[l - a] === n[u - a]; a++);
    return (Zn = n.slice(e, 1 < a ? 1 - a : void 0));
  }
  function Kn(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Jn() {
    return !0;
  }
  function rr() {
    return !1;
  }
  function Fe(e) {
    function t(l, a, n, u, c) {
      (this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = c),
        (this.currentTarget = null);
      for (var f in e)
        e.hasOwnProperty(f) && ((l = e[f]), (this[f] = l ? l(u) : u[f]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Jn
          : rr),
        (this.isPropagationStopped = rr),
        this
      );
    }
    return (
      R(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Jn));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Jn));
        },
        persist: function () {},
        isPersistent: Jn,
      }),
      t
    );
  }
  var El = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    $n = Fe(El),
    Ha = R({}, El, { view: 0, detail: 0 }),
    Dm = Fe(Ha),
    _i,
    Ai,
    Ba,
    Wn = R({}, Ha, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ri,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Ba &&
              (Ba && e.type === "mousemove"
                ? ((_i = e.screenX - Ba.screenX), (Ai = e.screenY - Ba.screenY))
                : (Ai = _i = 0),
              (Ba = e)),
            _i);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Ai;
      },
    }),
    fr = Fe(Wn),
    Um = R({}, Wn, { dataTransfer: 0 }),
    Hm = Fe(Um),
    Bm = R({}, Ha, { relatedTarget: 0 }),
    Mi = Fe(Bm),
    Lm = R({}, El, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    qm = Fe(Lm),
    Ym = R({}, El, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Gm = Fe(Ym),
    Xm = R({}, El, { data: 0 }),
    or = Fe(Xm),
    Qm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Vm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    km = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Zm(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = km[e])
      ? !!t[e]
      : !1;
  }
  function Ri() {
    return Zm;
  }
  var Km = R({}, Ha, {
      key: function (e) {
        if (e.key) {
          var t = Qm[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Kn(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Vm[e.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ri,
      charCode: function (e) {
        return e.type === "keypress" ? Kn(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Kn(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
      },
    }),
    Jm = Fe(Km),
    $m = R({}, Wn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    dr = Fe($m),
    Wm = R({}, Ha, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ri,
    }),
    Fm = Fe(Wm),
    Pm = R({}, El, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Im = Fe(Pm),
    e0 = R({}, Wn, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    t0 = Fe(e0),
    l0 = R({}, El, { newState: 0, oldState: 0 }),
    a0 = Fe(l0),
    n0 = [9, 13, 27, 32],
    Oi = Dt && "CompositionEvent" in window,
    La = null;
  Dt && "documentMode" in document && (La = document.documentMode);
  var u0 = Dt && "TextEvent" in window && !La,
    mr = Dt && (!Oi || (La && 8 < La && 11 >= La)),
    hr = " ",
    yr = !1;
  function gr(e, t) {
    switch (e) {
      case "keyup":
        return n0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function xr(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
  }
  var Pl = !1;
  function i0(e, t) {
    switch (e) {
      case "compositionend":
        return xr(t);
      case "keypress":
        return t.which !== 32 ? null : ((yr = !0), hr);
      case "textInput":
        return (e = t.data), e === hr && yr ? null : e;
      default:
        return null;
    }
  }
  function s0(e, t) {
    if (Pl)
      return e === "compositionend" || (!Oi && gr(e, t))
        ? ((e = cr()), (Zn = Ti = el = null), (Pl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return mr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var c0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function pr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!c0[e.type] : t === "textarea";
  }
  function vr(e, t, l, a) {
    Wl ? (Fl ? Fl.push(a) : (Fl = [a])) : (Wl = a),
      (t = Hu(t, "onChange")),
      0 < t.length &&
        ((l = new $n("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t }));
  }
  var qa = null,
    Ya = null;
  function r0(e) {
    td(e, 0);
  }
  function Fn(e) {
    var t = za(e);
    if (er(t)) return e;
  }
  function br(e, t) {
    if (e === "change") return t;
  }
  var Sr = !1;
  if (Dt) {
    var Ci;
    if (Dt) {
      var zi = "oninput" in document;
      if (!zi) {
        var Nr = document.createElement("div");
        Nr.setAttribute("oninput", "return;"),
          (zi = typeof Nr.oninput == "function");
      }
      Ci = zi;
    } else Ci = !1;
    Sr = Ci && (!document.documentMode || 9 < document.documentMode);
  }
  function jr() {
    qa && (qa.detachEvent("onpropertychange", Er), (Ya = qa = null));
  }
  function Er(e) {
    if (e.propertyName === "value" && Fn(Ya)) {
      var t = [];
      vr(t, Ya, e, ji(e)), sr(r0, t);
    }
  }
  function f0(e, t, l) {
    e === "focusin"
      ? (jr(), (qa = t), (Ya = l), qa.attachEvent("onpropertychange", Er))
      : e === "focusout" && jr();
  }
  function o0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fn(Ya);
  }
  function d0(e, t) {
    if (e === "click") return Fn(t);
  }
  function m0(e, t) {
    if (e === "input" || e === "change") return Fn(t);
  }
  function h0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var nt = typeof Object.is == "function" ? Object.is : h0;
  function Ga(e, t) {
    if (nt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!ci.call(t, n) || !nt(e[n], t[n])) return !1;
    }
    return !0;
  }
  function wr(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Tr(e, t) {
    var l = wr(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = wr(l);
    }
  }
  function _r(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? _r(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1;
  }
  function Ar(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = Vn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Vn(e.document);
    }
    return t;
  }
  function Di(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var y0 = Dt && "documentMode" in document && 11 >= document.documentMode,
    Il = null,
    Ui = null,
    Xa = null,
    Hi = !1;
  function Mr(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Hi ||
      Il == null ||
      Il !== Vn(a) ||
      ((a = Il),
      "selectionStart" in a && Di(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Xa && Ga(Xa, a)) ||
        ((Xa = a),
        (a = Hu(Ui, "onSelect")),
        0 < a.length &&
          ((t = new $n("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = Il))));
  }
  function wl(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    );
  }
  var ea = {
      animationend: wl("Animation", "AnimationEnd"),
      animationiteration: wl("Animation", "AnimationIteration"),
      animationstart: wl("Animation", "AnimationStart"),
      transitionrun: wl("Transition", "TransitionRun"),
      transitionstart: wl("Transition", "TransitionStart"),
      transitioncancel: wl("Transition", "TransitionCancel"),
      transitionend: wl("Transition", "TransitionEnd"),
    },
    Bi = {},
    Rr = {};
  Dt &&
    ((Rr = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ea.animationend.animation,
      delete ea.animationiteration.animation,
      delete ea.animationstart.animation),
    "TransitionEvent" in window || delete ea.transitionend.transition);
  function Tl(e) {
    if (Bi[e]) return Bi[e];
    if (!ea[e]) return e;
    var t = ea[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in Rr) return (Bi[e] = t[l]);
    return e;
  }
  var Or = Tl("animationend"),
    Cr = Tl("animationiteration"),
    zr = Tl("animationstart"),
    g0 = Tl("transitionrun"),
    x0 = Tl("transitionstart"),
    p0 = Tl("transitioncancel"),
    Dr = Tl("transitionend"),
    Ur = new Map(),
    Li =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Li.push("scrollEnd");
  function bt(e, t) {
    Ur.set(e, t), jl(t, [e]);
  }
  var Hr = new WeakMap();
  function mt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Hr.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Pc(t) }), Hr.set(e, t), t);
    }
    return { value: e, source: t, stack: Pc(t) };
  }
  var ht = [],
    ta = 0,
    qi = 0;
  function Pn() {
    for (var e = ta, t = (qi = ta = 0); t < e; ) {
      var l = ht[t];
      ht[t++] = null;
      var a = ht[t];
      ht[t++] = null;
      var n = ht[t];
      ht[t++] = null;
      var u = ht[t];
      if (((ht[t++] = null), a !== null && n !== null)) {
        var c = a.pending;
        c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
          (a.pending = n);
      }
      u !== 0 && Br(l, n, u);
    }
  }
  function In(e, t, l, a) {
    (ht[ta++] = e),
      (ht[ta++] = t),
      (ht[ta++] = l),
      (ht[ta++] = a),
      (qi |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a);
  }
  function Yi(e, t, l, a) {
    return In(e, t, l, a), eu(e);
  }
  function la(e, t) {
    return In(e, null, null, t), eu(e);
  }
  function Br(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = e.return; u !== null; )
      (u.childLanes |= l),
        (a = u.alternate),
        a !== null && (a.childLanes |= l),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = u),
        (u = u.return);
    return e.tag === 3
      ? ((u = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - at(l)),
          (e = u.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        u)
      : null;
  }
  function eu(e) {
    if (50 < hn) throw ((hn = 0), (Zs = null), Error(r(185)));
    for (var t = e.return; t !== null; ) (e = t), (t = e.return);
    return e.tag === 3 ? e.stateNode : null;
  }
  var aa = {};
  function v0(e, t, l, a) {
    (this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ut(e, t, l, a) {
    return new v0(e, t, l, a);
  }
  function Gi(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
  }
  function Ut(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = ut(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function Lr(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function tu(e, t, l, a, n, u) {
    var c = 0;
    if (((a = e), typeof e == "function")) Gi(e) && (c = 1);
    else if (typeof e == "string")
      c = Sh(e, l, I.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5;
    else
      e: switch (e) {
        case te:
          return (e = ut(31, l, t, n)), (e.elementType = te), (e.lanes = u), e;
        case C:
          return _l(l.children, n, u, t);
        case q:
          (c = 8), (n |= 24);
          break;
        case V:
          return (
            (e = ut(12, l, t, n | 2)), (e.elementType = V), (e.lanes = u), e
          );
        case K:
          return (e = ut(13, l, t, n)), (e.elementType = K), (e.lanes = u), e;
        case se:
          return (e = ut(19, l, t, n)), (e.elementType = se), (e.lanes = u), e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Y:
              case O:
                c = 10;
                break e;
              case k:
                c = 9;
                break e;
              case G:
                c = 11;
                break e;
              case F:
                c = 14;
                break e;
              case ie:
                (c = 16), (a = null);
                break e;
            }
          (c = 29),
            (l = Error(r(130, e === null ? "null" : typeof e, ""))),
            (a = null);
      }
    return (
      (t = ut(c, l, t, n)), (t.elementType = e), (t.type = a), (t.lanes = u), t
    );
  }
  function _l(e, t, l, a) {
    return (e = ut(7, e, a, t)), (e.lanes = l), e;
  }
  function Xi(e, t, l) {
    return (e = ut(6, e, null, t)), (e.lanes = l), e;
  }
  function Qi(e, t, l) {
    return (
      (t = ut(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var na = [],
    ua = 0,
    lu = null,
    au = 0,
    yt = [],
    gt = 0,
    Al = null,
    Ht = 1,
    Bt = "";
  function Ml(e, t) {
    (na[ua++] = au), (na[ua++] = lu), (lu = e), (au = t);
  }
  function qr(e, t, l) {
    (yt[gt++] = Ht), (yt[gt++] = Bt), (yt[gt++] = Al), (Al = e);
    var a = Ht;
    e = Bt;
    var n = 32 - at(a) - 1;
    (a &= ~(1 << n)), (l += 1);
    var u = 32 - at(t) + n;
    if (30 < u) {
      var c = n - (n % 5);
      (u = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (n -= c),
        (Ht = (1 << (32 - at(t) + n)) | (l << n) | a),
        (Bt = u + e);
    } else (Ht = (1 << u) | (l << n) | a), (Bt = e);
  }
  function Vi(e) {
    e.return !== null && (Ml(e, 1), qr(e, 1, 0));
  }
  function ki(e) {
    for (; e === lu; )
      (lu = na[--ua]), (na[ua] = null), (au = na[--ua]), (na[ua] = null);
    for (; e === Al; )
      (Al = yt[--gt]),
        (yt[gt] = null),
        (Bt = yt[--gt]),
        (yt[gt] = null),
        (Ht = yt[--gt]),
        (yt[gt] = null);
  }
  var Je = null,
    Me = null,
    ge = !1,
    Rl = null,
    Et = !1,
    Zi = Error(r(519));
  function Ol(e) {
    var t = Error(r(418, ""));
    throw (ka(mt(t, e)), Zi);
  }
  function Yr(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[ke] = e), (t[We] = a), l)) {
      case "dialog":
        oe("cancel", t), oe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        oe("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < gn.length; l++) oe(gn[l], t);
        break;
      case "source":
        oe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        oe("error", t), oe("load", t);
        break;
      case "details":
        oe("toggle", t);
        break;
      case "input":
        oe("invalid", t),
          tr(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ),
          Qn(t);
        break;
      case "select":
        oe("invalid", t);
        break;
      case "textarea":
        oe("invalid", t), ar(t, a.value, a.defaultValue, a.children), Qn(t);
    }
    (l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      ud(t.textContent, l)
        ? (a.popover != null && (oe("beforetoggle", t), oe("toggle", t)),
          a.onScroll != null && oe("scroll", t),
          a.onScrollEnd != null && oe("scrollend", t),
          a.onClick != null && (t.onclick = Bu),
          (t = !0))
        : (t = !1),
      t || Ol(e);
  }
  function Gr(e) {
    for (Je = e.return; Je; )
      switch (Je.tag) {
        case 5:
        case 13:
          Et = !1;
          return;
        case 27:
        case 3:
          Et = !0;
          return;
        default:
          Je = Je.return;
      }
  }
  function Qa(e) {
    if (e !== Je) return !1;
    if (!ge) return Gr(e), (ge = !0), !1;
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || cc(e.type, e.memoizedProps))),
        (l = !l)),
      l && Me && Ol(e),
      Gr(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((l = e.data), l === "/$")) {
              if (t === 0) {
                Me = Nt(e.nextSibling);
                break e;
              }
              t--;
            } else (l !== "$" && l !== "$!" && l !== "$?") || t++;
          e = e.nextSibling;
        }
        Me = null;
      }
    } else
      t === 27
        ? ((t = Me), gl(e.type) ? ((e = dc), (dc = null), (Me = e)) : (Me = t))
        : (Me = Je ? Nt(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Va() {
    (Me = Je = null), (ge = !1);
  }
  function Xr() {
    var e = Rl;
    return (
      e !== null &&
        (et === null ? (et = e) : et.push.apply(et, e), (Rl = null)),
      e
    );
  }
  function ka(e) {
    Rl === null ? (Rl = [e]) : Rl.push(e);
  }
  var Ki = B(null),
    Cl = null,
    Lt = null;
  function tl(e, t, l) {
    Z(Ki, t._currentValue), (t._currentValue = l);
  }
  function qt(e) {
    (e._currentValue = Ki.current), J(Ki);
  }
  function Ji(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function $i(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var y = 0; y < t.length; y++)
            if (f.context === t[y]) {
              (u.lanes |= l),
                (f = u.alternate),
                f !== null && (f.lanes |= l),
                Ji(u.return, l, e),
                a || (c = null);
              break e;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (((c = n.return), c === null)) throw Error(r(341));
        (c.lanes |= l),
          (u = c.alternate),
          u !== null && (u.lanes |= l),
          Ji(c, l, e),
          (c = null);
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (((n = c.sibling), n !== null)) {
            (n.return = c.return), (c = n);
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function Za(e, t, l, a) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(r(387));
        if (((c = c.memoizedProps), c !== null)) {
          var f = n.type;
          nt(n.pendingProps.value, c.value) ||
            (e !== null ? e.push(f) : (e = [f]));
        }
      } else if (n === tt.current) {
        if (((c = n.alternate), c === null)) throw Error(r(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Nn) : (e = [Nn]));
      }
      n = n.return;
    }
    e !== null && $i(t, e, l, a), (t.flags |= 262144);
  }
  function nu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!nt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function zl(e) {
    (Cl = e),
      (Lt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null);
  }
  function Ze(e) {
    return Qr(Cl, e);
  }
  function uu(e, t) {
    return Cl === null && zl(e), Qr(e, t);
  }
  function Qr(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), Lt === null)) {
      if (e === null) throw Error(r(308));
      (Lt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288);
    } else Lt = Lt.next = t;
    return l;
  }
  var b0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              (t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                });
            };
          },
    S0 = s.unstable_scheduleCallback,
    N0 = s.unstable_NormalPriority,
    Ue = {
      $$typeof: O,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Wi() {
    return { controller: new b0(), data: new Map(), refCount: 0 };
  }
  function Ka(e) {
    e.refCount--,
      e.refCount === 0 &&
        S0(N0, function () {
          e.controller.abort();
        });
  }
  var Ja = null,
    Fi = 0,
    ia = 0,
    sa = null;
  function j0(e, t) {
    if (Ja === null) {
      var l = (Ja = []);
      (Fi = 0),
        (ia = Is()),
        (sa = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        });
    }
    return Fi++, t.then(Vr, Vr), t;
  }
  function Vr() {
    if (--Fi === 0 && Ja !== null) {
      sa !== null && (sa.status = "fulfilled");
      var e = Ja;
      (Ja = null), (ia = 0), (sa = null);
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function E0(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      e.then(
        function () {
          (a.status = "fulfilled"), (a.value = t);
          for (var n = 0; n < l.length; n++) (0, l[n])(t);
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0);
        }
      ),
      a
    );
  }
  var kr = T.S;
  T.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      j0(e, t),
      kr !== null && kr(e, t);
  };
  var Dl = B(null);
  function Pi() {
    var e = Dl.current;
    return e !== null ? e : Ee.pooledCache;
  }
  function iu(e, t) {
    t === null ? Z(Dl, Dl.current) : Z(Dl, t.pool);
  }
  function Zr() {
    var e = Pi();
    return e === null ? null : { parent: Ue._currentValue, pool: e };
  }
  var $a = Error(r(460)),
    Kr = Error(r(474)),
    su = Error(r(542)),
    Ii = { then: function () {} };
  function Jr(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected";
  }
  function cu() {}
  function $r(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(cu, cu), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Fr(e), e);
      default:
        if (typeof t.status == "string") t.then(cu, cu);
        else {
          if (((e = Ee), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482));
          (e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  (n.status = "fulfilled"), (n.value = a);
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  (n.status = "rejected"), (n.reason = a);
                }
              }
            );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Fr(e), e);
        }
        throw ((Wa = t), $a);
    }
  }
  var Wa = null;
  function Wr() {
    if (Wa === null) throw Error(r(459));
    var e = Wa;
    return (Wa = null), e;
  }
  function Fr(e) {
    if (e === $a || e === su) throw Error(r(483));
  }
  var ll = !1;
  function es(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function ts(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        });
  }
  function al(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function nl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (xe & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = eu(e)),
        Br(e, null, l),
        t
      );
    }
    return In(e, a, t, l), eu(e);
  }
  function Fa(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Vc(e, l);
    }
  }
  function ls(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        u = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          u === null ? (n = u = c) : (u = u.next = c), (l = l.next);
        } while (l !== null);
        u === null ? (n = u = t) : (u = u.next = t);
      } else n = u = t;
      (l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l);
      return;
    }
    (e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t);
  }
  var as = !1;
  function Pa() {
    if (as) {
      var e = sa;
      if (e !== null) throw e;
    }
  }
  function Ia(e, t, l, a) {
    as = !1;
    var n = e.updateQueue;
    ll = !1;
    var u = n.firstBaseUpdate,
      c = n.lastBaseUpdate,
      f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var y = f,
        E = y.next;
      (y.next = null), c === null ? (u = E) : (c.next = E), (c = y);
      var z = e.alternate;
      z !== null &&
        ((z = z.updateQueue),
        (f = z.lastBaseUpdate),
        f !== c &&
          (f === null ? (z.firstBaseUpdate = E) : (f.next = E),
          (z.lastBaseUpdate = y)));
    }
    if (u !== null) {
      var U = n.baseState;
      (c = 0), (z = E = y = null), (f = u);
      do {
        var _ = f.lane & -536870913,
          M = _ !== f.lane;
        if (M ? (de & _) === _ : (a & _) === _) {
          _ !== 0 && _ === ia && (as = !0),
            z !== null &&
              (z = z.next =
                {
                  lane: 0,
                  tag: f.tag,
                  payload: f.payload,
                  callback: null,
                  next: null,
                });
          e: {
            var ae = e,
              ee = f;
            _ = t;
            var Se = l;
            switch (ee.tag) {
              case 1:
                if (((ae = ee.payload), typeof ae == "function")) {
                  U = ae.call(Se, U, _);
                  break e;
                }
                U = ae;
                break e;
              case 3:
                ae.flags = (ae.flags & -65537) | 128;
              case 0:
                if (
                  ((ae = ee.payload),
                  (_ = typeof ae == "function" ? ae.call(Se, U, _) : ae),
                  _ == null)
                )
                  break e;
                U = R({}, U, _);
                break e;
              case 2:
                ll = !0;
            }
          }
          (_ = f.callback),
            _ !== null &&
              ((e.flags |= 64),
              M && (e.flags |= 8192),
              (M = n.callbacks),
              M === null ? (n.callbacks = [_]) : M.push(_));
        } else
          (M = {
            lane: _,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null,
          }),
            z === null ? ((E = z = M), (y = U)) : (z = z.next = M),
            (c |= _);
        if (((f = f.next), f === null)) {
          if (((f = n.shared.pending), f === null)) break;
          (M = f),
            (f = M.next),
            (M.next = null),
            (n.lastBaseUpdate = M),
            (n.shared.pending = null);
        }
      } while (!0);
      z === null && (y = U),
        (n.baseState = y),
        (n.firstBaseUpdate = E),
        (n.lastBaseUpdate = z),
        u === null && (n.shared.lanes = 0),
        (dl |= c),
        (e.lanes = c),
        (e.memoizedState = U);
    }
  }
  function Pr(e, t) {
    if (typeof e != "function") throw Error(r(191, e));
    e.call(t);
  }
  function Ir(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Pr(l[e], t);
  }
  var ca = B(null),
    ru = B(0);
  function ef(e, t) {
    (e = Zt), Z(ru, e), Z(ca, t), (Zt = e | t.baseLanes);
  }
  function ns() {
    Z(ru, Zt), Z(ca, ca.current);
  }
  function us() {
    (Zt = ru.current), J(ca), J(ru);
  }
  var ul = 0,
    ce = null,
    ve = null,
    ze = null,
    fu = !1,
    ra = !1,
    Ul = !1,
    ou = 0,
    en = 0,
    fa = null,
    w0 = 0;
  function Oe() {
    throw Error(r(321));
  }
  function is(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!nt(e[l], t[l])) return !1;
    return !0;
  }
  function ss(e, t, l, a, n, u) {
    return (
      (ul = u),
      (ce = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (T.H = e === null || e.memoizedState === null ? Lf : qf),
      (Ul = !1),
      (u = l(a, n)),
      (Ul = !1),
      ra && (u = lf(t, l, a, n)),
      tf(e),
      u
    );
  }
  function tf(e) {
    T.H = xu;
    var t = ve !== null && ve.next !== null;
    if (((ul = 0), (ze = ve = ce = null), (fu = !1), (en = 0), (fa = null), t))
      throw Error(r(300));
    e === null ||
      qe ||
      ((e = e.dependencies), e !== null && nu(e) && (qe = !0));
  }
  function lf(e, t, l, a) {
    ce = e;
    var n = 0;
    do {
      if ((ra && (fa = null), (en = 0), (ra = !1), 25 <= n))
        throw Error(r(301));
      if (((n += 1), (ze = ve = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        (u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0);
      }
      (T.H = C0), (u = t(l, a));
    } while (ra);
    return u;
  }
  function T0() {
    var e = T.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? tn(t) : t),
      (e = e.useState()[0]),
      (ve !== null ? ve.memoizedState : null) !== e && (ce.flags |= 1024),
      t
    );
  }
  function cs() {
    var e = ou !== 0;
    return (ou = 0), e;
  }
  function rs(e, t, l) {
    (t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l);
  }
  function fs(e) {
    if (fu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), (e = e.next);
      }
      fu = !1;
    }
    (ul = 0), (ze = ve = ce = null), (ra = !1), (en = ou = 0), (fa = null);
  }
  function Pe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return ze === null ? (ce.memoizedState = ze = e) : (ze = ze.next = e), ze;
  }
  function De() {
    if (ve === null) {
      var e = ce.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ve.next;
    var t = ze === null ? ce.memoizedState : ze.next;
    if (t !== null) (ze = t), (ve = e);
    else {
      if (e === null)
        throw ce.alternate === null ? Error(r(467)) : Error(r(310));
      (ve = e),
        (e = {
          memoizedState: ve.memoizedState,
          baseState: ve.baseState,
          baseQueue: ve.baseQueue,
          queue: ve.queue,
          next: null,
        }),
        ze === null ? (ce.memoizedState = ze = e) : (ze = ze.next = e);
    }
    return ze;
  }
  function os() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tn(e) {
    var t = en;
    return (
      (en += 1),
      fa === null && (fa = []),
      (e = $r(fa, e, t)),
      (t = ce),
      (ze === null ? t.memoizedState : ze.next) === null &&
        ((t = t.alternate),
        (T.H = t === null || t.memoizedState === null ? Lf : qf)),
      e
    );
  }
  function du(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return tn(e);
      if (e.$$typeof === O) return Ze(e);
    }
    throw Error(r(438, String(e)));
  }
  function ds(e) {
    var t = null,
      l = ce.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ce.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = os()), (ce.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = je;
    return t.index++, l;
  }
  function Yt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function mu(e) {
    var t = De();
    return ms(t, ve, e);
  }
  function ms(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        (n.next = u.next), (u.next = c);
      }
      (t.baseQueue = n = u), (a.pending = null);
    }
    if (((u = e.baseState), n === null)) e.memoizedState = u;
    else {
      t = n.next;
      var f = (c = null),
        y = null,
        E = t,
        z = !1;
      do {
        var U = E.lane & -536870913;
        if (U !== E.lane ? (de & U) === U : (ul & U) === U) {
          var _ = E.revertLane;
          if (_ === 0)
            y !== null &&
              (y = y.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: E.action,
                  hasEagerState: E.hasEagerState,
                  eagerState: E.eagerState,
                  next: null,
                }),
              U === ia && (z = !0);
          else if ((ul & _) === _) {
            (E = E.next), _ === ia && (z = !0);
            continue;
          } else
            (U = {
              lane: 0,
              revertLane: E.revertLane,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null,
            }),
              y === null ? ((f = y = U), (c = u)) : (y = y.next = U),
              (ce.lanes |= _),
              (dl |= _);
          (U = E.action),
            Ul && l(u, U),
            (u = E.hasEagerState ? E.eagerState : l(u, U));
        } else
          (_ = {
            lane: U,
            revertLane: E.revertLane,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null,
          }),
            y === null ? ((f = y = _), (c = u)) : (y = y.next = _),
            (ce.lanes |= U),
            (dl |= U);
        E = E.next;
      } while (E !== null && E !== t);
      if (
        (y === null ? (c = u) : (y.next = f),
        !nt(u, e.memoizedState) && ((qe = !0), z && ((l = sa), l !== null)))
      )
        throw l;
      (e.memoizedState = u),
        (e.baseState = c),
        (e.baseQueue = y),
        (a.lastRenderedState = u);
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function hs(e) {
    var t = De(),
      l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      n = l.pending,
      u = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = (n = n.next);
      do (u = e(u, c.action)), (c = c.next);
      while (c !== n);
      nt(u, t.memoizedState) || (qe = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (l.lastRenderedState = u);
    }
    return [u, a];
  }
  function af(e, t, l) {
    var a = ce,
      n = De(),
      u = ge;
    if (u) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = t();
    var c = !nt((ve || n).memoizedState, l);
    c && ((n.memoizedState = l), (qe = !0)), (n = n.queue);
    var f = sf.bind(null, a, n, e);
    if (
      (ln(2048, 8, f, [e]),
      n.getSnapshot !== t || c || (ze !== null && ze.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        oa(9, hu(), uf.bind(null, a, n, l, t), null),
        Ee === null)
      )
        throw Error(r(349));
      u || (ul & 124) !== 0 || nf(a, t, l);
    }
    return l;
  }
  function nf(e, t, l) {
    (e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ce.updateQueue),
      t === null
        ? ((t = os()), (ce.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e));
  }
  function uf(e, t, l, a) {
    (t.value = l), (t.getSnapshot = a), cf(t) && rf(e);
  }
  function sf(e, t, l) {
    return l(function () {
      cf(t) && rf(e);
    });
  }
  function cf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !nt(e, l);
    } catch {
      return !0;
    }
  }
  function rf(e) {
    var t = la(e, 2);
    t !== null && ft(t, e, 2);
  }
  function ys(e) {
    var t = Pe();
    if (typeof e == "function") {
      var l = e;
      if (((e = l()), Ul)) {
        Pt(!0);
        try {
          l();
        } finally {
          Pt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function ff(e, t, l, a) {
    return (e.baseState = l), ms(e, ve, typeof a == "function" ? a : Yt);
  }
  function _0(e, t, l, a, n) {
    if (gu(e)) throw Error(r(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          u.listeners.push(c);
        },
      };
      T.T !== null ? l(!0) : (u.isTransition = !1),
        a(u),
        (l = t.pending),
        l === null
          ? ((u.next = t.pending = u), of(t, u))
          : ((u.next = l.next), (t.pending = l.next = u));
    }
  }
  function of(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state;
    if (t.isTransition) {
      var u = T.T,
        c = {};
      T.T = c;
      try {
        var f = l(n, a),
          y = T.S;
        y !== null && y(c, f), df(e, t, f);
      } catch (E) {
        gs(e, t, E);
      } finally {
        T.T = u;
      }
    } else
      try {
        (u = l(n, a)), df(e, t, u);
      } catch (E) {
        gs(e, t, E);
      }
  }
  function df(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            mf(e, t, a);
          },
          function (a) {
            return gs(e, t, a);
          }
        )
      : mf(e, t, l);
  }
  function mf(e, t, l) {
    (t.status = "fulfilled"),
      (t.value = l),
      hf(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), of(e, l)));
  }
  function gs(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do (t.status = "rejected"), (t.reason = l), hf(t), (t = t.next);
      while (t !== a);
    }
    e.action = null;
  }
  function hf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function yf(e, t) {
    return t;
  }
  function gf(e, t) {
    if (ge) {
      var l = Ee.formState;
      if (l !== null) {
        e: {
          var a = ce;
          if (ge) {
            if (Me) {
              t: {
                for (var n = Me, u = Et; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (((n = Nt(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                (u = n.data), (n = u === "F!" || u === "F" ? n : null);
              }
              if (n) {
                (Me = Nt(n.nextSibling)), (a = n.data === "F!");
                break e;
              }
            }
            Ol(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = Pe()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yf,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = Uf.bind(null, ce, a)),
      (a.dispatch = l),
      (a = ys(!1)),
      (u = Ss.bind(null, ce, !1, a.queue)),
      (a = Pe()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = _0.bind(null, ce, n, u, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function xf(e) {
    var t = De();
    return pf(t, ve, e);
  }
  function pf(e, t, l) {
    if (
      ((t = ms(e, t, yf)[0]),
      (e = mu(Yt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = tn(t);
      } catch (c) {
        throw c === $a ? su : c;
      }
    else a = t;
    t = De();
    var n = t.queue,
      u = n.dispatch;
    return (
      l !== t.memoizedState &&
        ((ce.flags |= 2048), oa(9, hu(), A0.bind(null, n, l), null)),
      [a, u, e]
    );
  }
  function A0(e, t) {
    e.action = t;
  }
  function vf(e) {
    var t = De(),
      l = ve;
    if (l !== null) return pf(t, l, e);
    De(), (t = t.memoizedState), (l = De());
    var a = l.queue.dispatch;
    return (l.memoizedState = e), [t, a, !1];
  }
  function oa(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ce.updateQueue),
      t === null && ((t = os()), (ce.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function hu() {
    return { destroy: void 0, resource: void 0 };
  }
  function bf() {
    return De().memoizedState;
  }
  function yu(e, t, l, a) {
    var n = Pe();
    (a = a === void 0 ? null : a),
      (ce.flags |= e),
      (n.memoizedState = oa(1 | t, hu(), l, a));
  }
  function ln(e, t, l, a) {
    var n = De();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    ve !== null && a !== null && is(a, ve.memoizedState.deps)
      ? (n.memoizedState = oa(t, u, l, a))
      : ((ce.flags |= e), (n.memoizedState = oa(1 | t, u, l, a)));
  }
  function Sf(e, t) {
    yu(8390656, 8, e, t);
  }
  function Nf(e, t) {
    ln(2048, 8, e, t);
  }
  function jf(e, t) {
    return ln(4, 2, e, t);
  }
  function Ef(e, t) {
    return ln(4, 4, e, t);
  }
  function wf(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function () {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Tf(e, t, l) {
    (l = l != null ? l.concat([e]) : null), ln(4, 4, wf.bind(null, t, e), l);
  }
  function xs() {}
  function _f(e, t) {
    var l = De();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && is(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function Af(e, t) {
    var l = De();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && is(t, a[1])) return a[0];
    if (((a = e()), Ul)) {
      Pt(!0);
      try {
        e();
      } finally {
        Pt(!1);
      }
    }
    return (l.memoizedState = [a, t]), a;
  }
  function ps(e, t, l) {
    return l === void 0 || (ul & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = Co()), (ce.lanes |= e), (dl |= e), l);
  }
  function Mf(e, t, l, a) {
    return nt(l, t)
      ? l
      : ca.current !== null
      ? ((e = ps(e, l, a)), nt(e, t) || (qe = !0), e)
      : (ul & 42) === 0
      ? ((qe = !0), (e.memoizedState = l))
      : ((e = Co()), (ce.lanes |= e), (dl |= e), t);
  }
  function Rf(e, t, l, a, n) {
    var u = Q.p;
    Q.p = u !== 0 && 8 > u ? u : 8;
    var c = T.T,
      f = {};
    (T.T = f), Ss(e, !1, t, l);
    try {
      var y = n(),
        E = T.S;
      if (
        (E !== null && E(f, y),
        y !== null && typeof y == "object" && typeof y.then == "function")
      ) {
        var z = E0(y, a);
        an(e, t, z, rt(e));
      } else an(e, t, a, rt(e));
    } catch (U) {
      an(e, t, { then: function () {}, status: "rejected", reason: U }, rt());
    } finally {
      (Q.p = u), (T.T = c);
    }
  }
  function M0() {}
  function vs(e, t, l, a) {
    if (e.tag !== 5) throw Error(r(476));
    var n = Of(e).queue;
    Rf(
      e,
      n,
      t,
      W,
      l === null
        ? M0
        : function () {
            return Cf(e), l(a);
          }
    );
  }
  function Of(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: W,
      baseState: W,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yt,
        lastRenderedState: W,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Yt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function Cf(e) {
    var t = Of(e).next.queue;
    an(e, t, {}, rt());
  }
  function bs() {
    return Ze(Nn);
  }
  function zf() {
    return De().memoizedState;
  }
  function Df() {
    return De().memoizedState;
  }
  function R0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = rt();
          e = al(l);
          var a = nl(t, e, l);
          a !== null && (ft(a, t, l), Fa(a, t, l)),
            (t = { cache: Wi() }),
            (e.payload = t);
          return;
      }
      t = t.return;
    }
  }
  function O0(e, t, l) {
    var a = rt();
    (l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      gu(e)
        ? Hf(t, l)
        : ((l = Yi(e, t, l, a)), l !== null && (ft(l, e, a), Bf(l, t, a)));
  }
  function Uf(e, t, l) {
    var a = rt();
    an(e, t, l, a);
  }
  function an(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (gu(e)) Hf(t, n);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var c = t.lastRenderedState,
            f = u(c, l);
          if (((n.hasEagerState = !0), (n.eagerState = f), nt(f, c)))
            return In(e, t, n, 0), Ee === null && Pn(), !1;
        } catch {
        } finally {
        }
      if (((l = Yi(e, t, n, a)), l !== null))
        return ft(l, e, a), Bf(l, t, a), !0;
    }
    return !1;
  }
  function Ss(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Is(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      gu(e))
    ) {
      if (t) throw Error(r(479));
    } else (t = Yi(e, l, a, 2)), t !== null && ft(t, e, 2);
  }
  function gu(e) {
    var t = e.alternate;
    return e === ce || (t !== null && t === ce);
  }
  function Hf(e, t) {
    ra = fu = !0;
    var l = e.pending;
    l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t);
  }
  function Bf(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      (a &= e.pendingLanes), (l |= a), (t.lanes = l), Vc(e, l);
    }
  }
  var xu = {
      readContext: Ze,
      use: du,
      useCallback: Oe,
      useContext: Oe,
      useEffect: Oe,
      useImperativeHandle: Oe,
      useLayoutEffect: Oe,
      useInsertionEffect: Oe,
      useMemo: Oe,
      useReducer: Oe,
      useRef: Oe,
      useState: Oe,
      useDebugValue: Oe,
      useDeferredValue: Oe,
      useTransition: Oe,
      useSyncExternalStore: Oe,
      useId: Oe,
      useHostTransitionStatus: Oe,
      useFormState: Oe,
      useActionState: Oe,
      useOptimistic: Oe,
      useMemoCache: Oe,
      useCacheRefresh: Oe,
    },
    Lf = {
      readContext: Ze,
      use: du,
      useCallback: function (e, t) {
        return (Pe().memoizedState = [e, t === void 0 ? null : t]), e;
      },
      useContext: Ze,
      useEffect: Sf,
      useImperativeHandle: function (e, t, l) {
        (l = l != null ? l.concat([e]) : null),
          yu(4194308, 4, wf.bind(null, t, e), l);
      },
      useLayoutEffect: function (e, t) {
        return yu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        yu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = Pe();
        t = t === void 0 ? null : t;
        var a = e();
        if (Ul) {
          Pt(!0);
          try {
            e();
          } finally {
            Pt(!1);
          }
        }
        return (l.memoizedState = [a, t]), a;
      },
      useReducer: function (e, t, l) {
        var a = Pe();
        if (l !== void 0) {
          var n = l(t);
          if (Ul) {
            Pt(!0);
            try {
              l(t);
            } finally {
              Pt(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = O0.bind(null, ce, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Pe();
        return (e = { current: e }), (t.memoizedState = e);
      },
      useState: function (e) {
        e = ys(e);
        var t = e.queue,
          l = Uf.bind(null, ce, t);
        return (t.dispatch = l), [e.memoizedState, l];
      },
      useDebugValue: xs,
      useDeferredValue: function (e, t) {
        var l = Pe();
        return ps(l, e, t);
      },
      useTransition: function () {
        var e = ys(!1);
        return (
          (e = Rf.bind(null, ce, e.queue, !0, !1)),
          (Pe().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ce,
          n = Pe();
        if (ge) {
          if (l === void 0) throw Error(r(407));
          l = l();
        } else {
          if (((l = t()), Ee === null)) throw Error(r(349));
          (de & 124) !== 0 || nf(a, t, l);
        }
        n.memoizedState = l;
        var u = { value: l, getSnapshot: t };
        return (
          (n.queue = u),
          Sf(sf.bind(null, a, u, e), [e]),
          (a.flags |= 2048),
          oa(9, hu(), uf.bind(null, a, u, l, t), null),
          l
        );
      },
      useId: function () {
        var e = Pe(),
          t = Ee.identifierPrefix;
        if (ge) {
          var l = Bt,
            a = Ht;
          (l = (a & ~(1 << (32 - at(a) - 1))).toString(32) + l),
            (t = "«" + t + "R" + l),
            (l = ou++),
            0 < l && (t += "H" + l.toString(32)),
            (t += "»");
        } else (l = w0++), (t = "«" + t + "r" + l.toString(32) + "»");
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: bs,
      useFormState: gf,
      useActionState: gf,
      useOptimistic: function (e) {
        var t = Pe();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = l),
          (t = Ss.bind(null, ce, !0, l)),
          (l.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: ds,
      useCacheRefresh: function () {
        return (Pe().memoizedState = R0.bind(null, ce));
      },
    },
    qf = {
      readContext: Ze,
      use: du,
      useCallback: _f,
      useContext: Ze,
      useEffect: Nf,
      useImperativeHandle: Tf,
      useInsertionEffect: jf,
      useLayoutEffect: Ef,
      useMemo: Af,
      useReducer: mu,
      useRef: bf,
      useState: function () {
        return mu(Yt);
      },
      useDebugValue: xs,
      useDeferredValue: function (e, t) {
        var l = De();
        return Mf(l, ve.memoizedState, e, t);
      },
      useTransition: function () {
        var e = mu(Yt)[0],
          t = De().memoizedState;
        return [typeof e == "boolean" ? e : tn(e), t];
      },
      useSyncExternalStore: af,
      useId: zf,
      useHostTransitionStatus: bs,
      useFormState: xf,
      useActionState: xf,
      useOptimistic: function (e, t) {
        var l = De();
        return ff(l, ve, e, t);
      },
      useMemoCache: ds,
      useCacheRefresh: Df,
    },
    C0 = {
      readContext: Ze,
      use: du,
      useCallback: _f,
      useContext: Ze,
      useEffect: Nf,
      useImperativeHandle: Tf,
      useInsertionEffect: jf,
      useLayoutEffect: Ef,
      useMemo: Af,
      useReducer: hs,
      useRef: bf,
      useState: function () {
        return hs(Yt);
      },
      useDebugValue: xs,
      useDeferredValue: function (e, t) {
        var l = De();
        return ve === null ? ps(l, e, t) : Mf(l, ve.memoizedState, e, t);
      },
      useTransition: function () {
        var e = hs(Yt)[0],
          t = De().memoizedState;
        return [typeof e == "boolean" ? e : tn(e), t];
      },
      useSyncExternalStore: af,
      useId: zf,
      useHostTransitionStatus: bs,
      useFormState: vf,
      useActionState: vf,
      useOptimistic: function (e, t) {
        var l = De();
        return ve !== null
          ? ff(l, ve, e, t)
          : ((l.baseState = e), [e, l.queue.dispatch]);
      },
      useMemoCache: ds,
      useCacheRefresh: Df,
    },
    da = null,
    nn = 0;
  function pu(e) {
    var t = nn;
    return (nn += 1), da === null && (da = []), $r(da, e, t);
  }
  function un(e, t) {
    (t = t.props.ref), (e.ref = t !== void 0 ? t : null);
  }
  function vu(e, t) {
    throw t.$$typeof === L
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Yf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Gf(e) {
    function t(b, v) {
      if (e) {
        var N = b.deletions;
        N === null ? ((b.deletions = [v]), (b.flags |= 16)) : N.push(v);
      }
    }
    function l(b, v) {
      if (!e) return null;
      for (; v !== null; ) t(b, v), (v = v.sibling);
      return null;
    }
    function a(b) {
      for (var v = new Map(); b !== null; )
        b.key !== null ? v.set(b.key, b) : v.set(b.index, b), (b = b.sibling);
      return v;
    }
    function n(b, v) {
      return (b = Ut(b, v)), (b.index = 0), (b.sibling = null), b;
    }
    function u(b, v, N) {
      return (
        (b.index = N),
        e
          ? ((N = b.alternate),
            N !== null
              ? ((N = N.index), N < v ? ((b.flags |= 67108866), v) : N)
              : ((b.flags |= 67108866), v))
          : ((b.flags |= 1048576), v)
      );
    }
    function c(b) {
      return e && b.alternate === null && (b.flags |= 67108866), b;
    }
    function f(b, v, N, D) {
      return v === null || v.tag !== 6
        ? ((v = Xi(N, b.mode, D)), (v.return = b), v)
        : ((v = n(v, N)), (v.return = b), v);
    }
    function y(b, v, N, D) {
      var $ = N.type;
      return $ === C
        ? z(b, v, N.props.children, D, N.key)
        : v !== null &&
          (v.elementType === $ ||
            (typeof $ == "object" &&
              $ !== null &&
              $.$$typeof === ie &&
              Yf($) === v.type))
        ? ((v = n(v, N.props)), un(v, N), (v.return = b), v)
        : ((v = tu(N.type, N.key, N.props, null, b.mode, D)),
          un(v, N),
          (v.return = b),
          v);
    }
    function E(b, v, N, D) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== N.containerInfo ||
        v.stateNode.implementation !== N.implementation
        ? ((v = Qi(N, b.mode, D)), (v.return = b), v)
        : ((v = n(v, N.children || [])), (v.return = b), v);
    }
    function z(b, v, N, D, $) {
      return v === null || v.tag !== 7
        ? ((v = _l(N, b.mode, D, $)), (v.return = b), v)
        : ((v = n(v, N)), (v.return = b), v);
    }
    function U(b, v, N) {
      if (
        (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
      )
        return (v = Xi("" + v, b.mode, N)), (v.return = b), v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case A:
            return (
              (N = tu(v.type, v.key, v.props, null, b.mode, N)),
              un(N, v),
              (N.return = b),
              N
            );
          case H:
            return (v = Qi(v, b.mode, N)), (v.return = b), v;
          case ie:
            var D = v._init;
            return (v = D(v._payload)), U(b, v, N);
        }
        if (X(v) || Be(v))
          return (v = _l(v, b.mode, N, null)), (v.return = b), v;
        if (typeof v.then == "function") return U(b, pu(v), N);
        if (v.$$typeof === O) return U(b, uu(b, v), N);
        vu(b, v);
      }
      return null;
    }
    function _(b, v, N, D) {
      var $ = v !== null ? v.key : null;
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return $ !== null ? null : f(b, v, "" + N, D);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case A:
            return N.key === $ ? y(b, v, N, D) : null;
          case H:
            return N.key === $ ? E(b, v, N, D) : null;
          case ie:
            return ($ = N._init), (N = $(N._payload)), _(b, v, N, D);
        }
        if (X(N) || Be(N)) return $ !== null ? null : z(b, v, N, D, null);
        if (typeof N.then == "function") return _(b, v, pu(N), D);
        if (N.$$typeof === O) return _(b, v, uu(b, N), D);
        vu(b, N);
      }
      return null;
    }
    function M(b, v, N, D, $) {
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return (b = b.get(N) || null), f(v, b, "" + D, $);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case A:
            return (
              (b = b.get(D.key === null ? N : D.key) || null), y(v, b, D, $)
            );
          case H:
            return (
              (b = b.get(D.key === null ? N : D.key) || null), E(v, b, D, $)
            );
          case ie:
            var re = D._init;
            return (D = re(D._payload)), M(b, v, N, D, $);
        }
        if (X(D) || Be(D)) return (b = b.get(N) || null), z(v, b, D, $, null);
        if (typeof D.then == "function") return M(b, v, N, pu(D), $);
        if (D.$$typeof === O) return M(b, v, N, uu(v, D), $);
        vu(v, D);
      }
      return null;
    }
    function ae(b, v, N, D) {
      for (
        var $ = null, re = null, P = v, le = (v = 0), Ge = null;
        P !== null && le < N.length;
        le++
      ) {
        P.index > le ? ((Ge = P), (P = null)) : (Ge = P.sibling);
        var he = _(b, P, N[le], D);
        if (he === null) {
          P === null && (P = Ge);
          break;
        }
        e && P && he.alternate === null && t(b, P),
          (v = u(he, v, le)),
          re === null ? ($ = he) : (re.sibling = he),
          (re = he),
          (P = Ge);
      }
      if (le === N.length) return l(b, P), ge && Ml(b, le), $;
      if (P === null) {
        for (; le < N.length; le++)
          (P = U(b, N[le], D)),
            P !== null &&
              ((v = u(P, v, le)),
              re === null ? ($ = P) : (re.sibling = P),
              (re = P));
        return ge && Ml(b, le), $;
      }
      for (P = a(P); le < N.length; le++)
        (Ge = M(P, b, le, N[le], D)),
          Ge !== null &&
            (e &&
              Ge.alternate !== null &&
              P.delete(Ge.key === null ? le : Ge.key),
            (v = u(Ge, v, le)),
            re === null ? ($ = Ge) : (re.sibling = Ge),
            (re = Ge));
      return (
        e &&
          P.forEach(function (Sl) {
            return t(b, Sl);
          }),
        ge && Ml(b, le),
        $
      );
    }
    function ee(b, v, N, D) {
      if (N == null) throw Error(r(151));
      for (
        var $ = null, re = null, P = v, le = (v = 0), Ge = null, he = N.next();
        P !== null && !he.done;
        le++, he = N.next()
      ) {
        P.index > le ? ((Ge = P), (P = null)) : (Ge = P.sibling);
        var Sl = _(b, P, he.value, D);
        if (Sl === null) {
          P === null && (P = Ge);
          break;
        }
        e && P && Sl.alternate === null && t(b, P),
          (v = u(Sl, v, le)),
          re === null ? ($ = Sl) : (re.sibling = Sl),
          (re = Sl),
          (P = Ge);
      }
      if (he.done) return l(b, P), ge && Ml(b, le), $;
      if (P === null) {
        for (; !he.done; le++, he = N.next())
          (he = U(b, he.value, D)),
            he !== null &&
              ((v = u(he, v, le)),
              re === null ? ($ = he) : (re.sibling = he),
              (re = he));
        return ge && Ml(b, le), $;
      }
      for (P = a(P); !he.done; le++, he = N.next())
        (he = M(P, b, le, he.value, D)),
          he !== null &&
            (e &&
              he.alternate !== null &&
              P.delete(he.key === null ? le : he.key),
            (v = u(he, v, le)),
            re === null ? ($ = he) : (re.sibling = he),
            (re = he));
      return (
        e &&
          P.forEach(function (zh) {
            return t(b, zh);
          }),
        ge && Ml(b, le),
        $
      );
    }
    function Se(b, v, N, D) {
      if (
        (typeof N == "object" &&
          N !== null &&
          N.type === C &&
          N.key === null &&
          (N = N.props.children),
        typeof N == "object" && N !== null)
      ) {
        switch (N.$$typeof) {
          case A:
            e: {
              for (var $ = N.key; v !== null; ) {
                if (v.key === $) {
                  if ((($ = N.type), $ === C)) {
                    if (v.tag === 7) {
                      l(b, v.sibling),
                        (D = n(v, N.props.children)),
                        (D.return = b),
                        (b = D);
                      break e;
                    }
                  } else if (
                    v.elementType === $ ||
                    (typeof $ == "object" &&
                      $ !== null &&
                      $.$$typeof === ie &&
                      Yf($) === v.type)
                  ) {
                    l(b, v.sibling),
                      (D = n(v, N.props)),
                      un(D, N),
                      (D.return = b),
                      (b = D);
                    break e;
                  }
                  l(b, v);
                  break;
                } else t(b, v);
                v = v.sibling;
              }
              N.type === C
                ? ((D = _l(N.props.children, b.mode, D, N.key)),
                  (D.return = b),
                  (b = D))
                : ((D = tu(N.type, N.key, N.props, null, b.mode, D)),
                  un(D, N),
                  (D.return = b),
                  (b = D));
            }
            return c(b);
          case H:
            e: {
              for ($ = N.key; v !== null; ) {
                if (v.key === $)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === N.containerInfo &&
                    v.stateNode.implementation === N.implementation
                  ) {
                    l(b, v.sibling),
                      (D = n(v, N.children || [])),
                      (D.return = b),
                      (b = D);
                    break e;
                  } else {
                    l(b, v);
                    break;
                  }
                else t(b, v);
                v = v.sibling;
              }
              (D = Qi(N, b.mode, D)), (D.return = b), (b = D);
            }
            return c(b);
          case ie:
            return ($ = N._init), (N = $(N._payload)), Se(b, v, N, D);
        }
        if (X(N)) return ae(b, v, N, D);
        if (Be(N)) {
          if ((($ = Be(N)), typeof $ != "function")) throw Error(r(150));
          return (N = $.call(N)), ee(b, v, N, D);
        }
        if (typeof N.then == "function") return Se(b, v, pu(N), D);
        if (N.$$typeof === O) return Se(b, v, uu(b, N), D);
        vu(b, N);
      }
      return (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
        ? ((N = "" + N),
          v !== null && v.tag === 6
            ? (l(b, v.sibling), (D = n(v, N)), (D.return = b), (b = D))
            : (l(b, v), (D = Xi(N, b.mode, D)), (D.return = b), (b = D)),
          c(b))
        : l(b, v);
    }
    return function (b, v, N, D) {
      try {
        nn = 0;
        var $ = Se(b, v, N, D);
        return (da = null), $;
      } catch (P) {
        if (P === $a || P === su) throw P;
        var re = ut(29, P, null, b.mode);
        return (re.lanes = D), (re.return = b), re;
      } finally {
      }
    };
  }
  var ma = Gf(!0),
    Xf = Gf(!1),
    xt = B(null),
    wt = null;
  function il(e) {
    var t = e.alternate;
    Z(He, He.current & 1),
      Z(xt, e),
      wt === null &&
        (t === null || ca.current !== null || t.memoizedState !== null) &&
        (wt = e);
  }
  function Qf(e) {
    if (e.tag === 22) {
      if ((Z(He, He.current), Z(xt, e), wt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (wt = e);
      }
    } else sl();
  }
  function sl() {
    Z(He, He.current), Z(xt, xt.current);
  }
  function Gt(e) {
    J(xt), wt === e && (wt = null), J(He);
  }
  var He = B(0);
  function bu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === "$?" || oc(l))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function Ns(e, t, l, a) {
    (t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : R({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var js = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        n = al(a);
      (n.payload = t),
        l != null && (n.callback = l),
        (t = nl(e, n, a)),
        t !== null && (ft(t, e, a), Fa(t, e, a));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        n = al(a);
      (n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = nl(e, n, a)),
        t !== null && (ft(t, e, a), Fa(t, e, a));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = rt(),
        a = al(l);
      (a.tag = 2),
        t != null && (a.callback = t),
        (t = nl(e, a, l)),
        t !== null && (ft(t, e, l), Fa(t, e, l));
    },
  };
  function Vf(e, t, l, a, n, u, c) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, u, c)
        : t.prototype && t.prototype.isPureReactComponent
        ? !Ga(l, a) || !Ga(n, u)
        : !0
    );
  }
  function kf(e, t, l, a) {
    (e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && js.enqueueReplaceState(t, t.state, null);
  }
  function Hl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t) a !== "ref" && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = R({}, l));
      for (var n in e) l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  var Su =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Zf(e) {
    Su(e);
  }
  function Kf(e) {
    console.error(e);
  }
  function Jf(e) {
    Su(e);
  }
  function Nu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function $f(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function Es(e, t, l) {
    return (
      (l = al(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Nu(e, t);
      }),
      l
    );
  }
  function Wf(e) {
    return (e = al(e)), (e.tag = 3), e;
  }
  function Ff(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      (e.payload = function () {
        return n(u);
      }),
        (e.callback = function () {
          $f(t, l, a);
        });
    }
    var c = l.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (e.callback = function () {
        $f(t, l, a),
          typeof n != "function" &&
            (ml === null ? (ml = new Set([this])) : ml.add(this));
        var f = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: f !== null ? f : "",
        });
      });
  }
  function z0(e, t, l, a, n) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && Za(t, l, n, !0),
        (l = xt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              wt === null ? Js() : l.alternate === null && Re === 0 && (Re = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === Ii
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  Ws(e, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Ii
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  Ws(e, a, n)),
              !1
            );
        }
        throw Error(r(435, l.tag));
      }
      return Ws(e, a, n), Js(), !1;
    }
    if (ge)
      return (
        (t = xt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== Zi && ((e = Error(r(422), { cause: a })), ka(mt(e, l))))
          : (a !== Zi && ((t = Error(r(423), { cause: a })), ka(mt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = mt(a, l)),
            (n = Es(e.stateNode, a, n)),
            ls(e, n),
            Re !== 4 && (Re = 2)),
        !1
      );
    var u = Error(r(520), { cause: a });
    if (
      ((u = mt(u, l)),
      mn === null ? (mn = [u]) : mn.push(u),
      Re !== 4 && (Re = 2),
      t === null)
    )
      return !0;
    (a = mt(a, l)), (l = t);
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = Es(l.stateNode, a, e)),
            ls(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (u = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (ml === null || !ml.has(u)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Wf(n)),
              Ff(n, e, l, a),
              ls(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Pf = Error(r(461)),
    qe = !1;
  function Xe(e, t, l, a) {
    t.child = e === null ? Xf(t, null, l, a) : ma(t, e.child, l, a);
  }
  function If(e, t, l, a, n) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var f in a) f !== "ref" && (c[f] = a[f]);
    } else c = a;
    return (
      zl(t),
      (a = ss(e, t, l, c, u, n)),
      (f = cs()),
      e !== null && !qe
        ? (rs(e, t, n), Xt(e, t, n))
        : (ge && f && Vi(t), (t.flags |= 1), Xe(e, t, a, n), t.child)
    );
  }
  function eo(e, t, l, a, n) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" &&
        !Gi(u) &&
        u.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = u), to(e, t, u, a, n))
        : ((e = tu(l.type, null, a, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((u = e.child), !Cs(e, n))) {
      var c = u.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Ga), l(c, a) && e.ref === t.ref)
      )
        return Xt(e, t, n);
    }
    return (
      (t.flags |= 1),
      (e = Ut(u, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function to(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ga(u, a) && e.ref === t.ref)
        if (((qe = !1), (t.pendingProps = a = u), Cs(e, n)))
          (e.flags & 131072) !== 0 && (qe = !0);
        else return (t.lanes = e.lanes), Xt(e, t, n);
    }
    return ws(e, t, l, a, n);
  }
  function lo(e, t, l) {
    var a = t.pendingProps,
      n = a.children,
      u = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = u !== null ? u.baseLanes | l : l), e !== null)) {
          for (n = t.child = e.child, u = 0; n !== null; )
            (u = u | n.lanes | n.childLanes), (n = n.sibling);
          t.childLanes = u & ~a;
        } else (t.childLanes = 0), (t.child = null);
        return ao(e, t, a, l);
      }
      if ((l & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && iu(t, u !== null ? u.cachePool : null),
          u !== null ? ef(t, u) : ns(),
          Qf(t);
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          ao(e, t, u !== null ? u.baseLanes | l : l, l)
        );
    } else
      u !== null
        ? (iu(t, u.cachePool), ef(t, u), sl(), (t.memoizedState = null))
        : (e !== null && iu(t, null), ns(), sl());
    return Xe(e, t, n, l), t.child;
  }
  function ao(e, t, l, a) {
    var n = Pi();
    return (
      (n = n === null ? null : { parent: Ue._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: l, cachePool: n }),
      e !== null && iu(t, null),
      ns(),
      Qf(t),
      e !== null && Za(e, t, a, !0),
      null
    );
  }
  function ju(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(r(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function ws(e, t, l, a, n) {
    return (
      zl(t),
      (l = ss(e, t, l, a, void 0, n)),
      (a = cs()),
      e !== null && !qe
        ? (rs(e, t, n), Xt(e, t, n))
        : (ge && a && Vi(t), (t.flags |= 1), Xe(e, t, l, n), t.child)
    );
  }
  function no(e, t, l, a, n, u) {
    return (
      zl(t),
      (t.updateQueue = null),
      (l = lf(t, a, l, n)),
      tf(e),
      (a = cs()),
      e !== null && !qe
        ? (rs(e, t, u), Xt(e, t, u))
        : (ge && a && Vi(t), (t.flags |= 1), Xe(e, t, l, u), t.child)
    );
  }
  function uo(e, t, l, a, n) {
    if ((zl(t), t.stateNode === null)) {
      var u = aa,
        c = l.contextType;
      typeof c == "object" && c !== null && (u = Ze(c)),
        (u = new l(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = js),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        es(t),
        (c = l.contextType),
        (u.context = typeof c == "object" && c !== null ? Ze(c) : aa),
        (u.state = t.memoizedState),
        (c = l.getDerivedStateFromProps),
        typeof c == "function" && (Ns(t, l, c, a), (u.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((c = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          c !== u.state && js.enqueueReplaceState(u, u.state, null),
          Ia(t, a, u, n),
          Pa(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0);
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps,
        y = Hl(l, f);
      u.props = y;
      var E = u.context,
        z = l.contextType;
      (c = aa), typeof z == "object" && z !== null && (c = Ze(z));
      var U = l.getDerivedStateFromProps;
      (z =
        typeof U == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (f = t.pendingProps !== f),
        z ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((f || E !== c) && kf(t, u, a, c)),
        (ll = !1);
      var _ = t.memoizedState;
      (u.state = _),
        Ia(t, a, u, n),
        Pa(),
        (E = t.memoizedState),
        f || _ !== E || ll
          ? (typeof U == "function" && (Ns(t, l, U, a), (E = t.memoizedState)),
            (y = ll || Vf(t, l, y, a, _, E, c))
              ? (z ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = E)),
            (u.props = a),
            (u.state = E),
            (u.context = c),
            (a = y))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1));
    } else {
      (u = t.stateNode),
        ts(e, t),
        (c = t.memoizedProps),
        (z = Hl(l, c)),
        (u.props = z),
        (U = t.pendingProps),
        (_ = u.context),
        (E = l.contextType),
        (y = aa),
        typeof E == "object" && E !== null && (y = Ze(E)),
        (f = l.getDerivedStateFromProps),
        (E =
          typeof f == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((c !== U || _ !== y) && kf(t, u, a, y)),
        (ll = !1),
        (_ = t.memoizedState),
        (u.state = _),
        Ia(t, a, u, n),
        Pa();
      var M = t.memoizedState;
      c !== U ||
      _ !== M ||
      ll ||
      (e !== null && e.dependencies !== null && nu(e.dependencies))
        ? (typeof f == "function" && (Ns(t, l, f, a), (M = t.memoizedState)),
          (z =
            ll ||
            Vf(t, l, z, a, _, M, y) ||
            (e !== null && e.dependencies !== null && nu(e.dependencies)))
            ? (E ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, M, y),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, M, y)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (c === e.memoizedProps && _ === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (c === e.memoizedProps && _ === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = M)),
          (u.props = a),
          (u.state = M),
          (u.context = y),
          (a = z))
        : (typeof u.componentDidUpdate != "function" ||
            (c === e.memoizedProps && _ === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (c === e.memoizedProps && _ === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      ju(e, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = ma(t, e.child, null, n)),
              (t.child = ma(t, null, l, n)))
            : Xe(e, t, l, n),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = Xt(e, t, n)),
      e
    );
  }
  function io(e, t, l, a) {
    return Va(), (t.flags |= 256), Xe(e, t, l, a), t.child;
  }
  var Ts = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function _s(e) {
    return { baseLanes: e, cachePool: Zr() };
  }
  function As(e, t, l) {
    return (e = e !== null ? e.childLanes & ~l : 0), t && (e |= pt), e;
  }
  function so(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      u = (t.flags & 128) !== 0,
      c;
    if (
      ((c = u) ||
        (c =
          e !== null && e.memoizedState === null ? !1 : (He.current & 2) !== 0),
      c && ((n = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (ge) {
        if ((n ? il(t) : sl(), ge)) {
          var f = Me,
            y;
          if ((y = f)) {
            e: {
              for (y = f, f = Et; y.nodeType !== 8; ) {
                if (!f) {
                  f = null;
                  break e;
                }
                if (((y = Nt(y.nextSibling)), y === null)) {
                  f = null;
                  break e;
                }
              }
              f = y;
            }
            f !== null
              ? ((t.memoizedState = {
                  dehydrated: f,
                  treeContext: Al !== null ? { id: Ht, overflow: Bt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (y = ut(18, null, null, 0)),
                (y.stateNode = f),
                (y.return = t),
                (t.child = y),
                (Je = t),
                (Me = null),
                (y = !0))
              : (y = !1);
          }
          y || Ol(t);
        }
        if (
          ((f = t.memoizedState),
          f !== null && ((f = f.dehydrated), f !== null))
        )
          return oc(f) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        Gt(t);
      }
      return (
        (f = a.children),
        (a = a.fallback),
        n
          ? (sl(),
            (n = t.mode),
            (f = Eu({ mode: "hidden", children: f }, n)),
            (a = _l(a, n, l, null)),
            (f.return = t),
            (a.return = t),
            (f.sibling = a),
            (t.child = f),
            (n = t.child),
            (n.memoizedState = _s(l)),
            (n.childLanes = As(e, c, l)),
            (t.memoizedState = Ts),
            a)
          : (il(t), Ms(t, f))
      );
    }
    if (
      ((y = e.memoizedState), y !== null && ((f = y.dehydrated), f !== null))
    ) {
      if (u)
        t.flags & 256
          ? (il(t), (t.flags &= -257), (t = Rs(e, t, l)))
          : t.memoizedState !== null
          ? (sl(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (sl(),
            (n = a.fallback),
            (f = t.mode),
            (a = Eu({ mode: "visible", children: a.children }, f)),
            (n = _l(n, f, l, null)),
            (n.flags |= 2),
            (a.return = t),
            (n.return = t),
            (a.sibling = n),
            (t.child = a),
            ma(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = _s(l)),
            (a.childLanes = As(e, c, l)),
            (t.memoizedState = Ts),
            (t = n));
      else if ((il(t), oc(f))) {
        if (((c = f.nextSibling && f.nextSibling.dataset), c)) var E = c.dgst;
        (c = E),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = c),
          ka({ value: a, source: null, stack: null }),
          (t = Rs(e, t, l));
      } else if (
        (qe || Za(e, t, l, !1), (c = (l & e.childLanes) !== 0), qe || c)
      ) {
        if (
          ((c = Ee),
          c !== null &&
            ((a = l & -l),
            (a = (a & 42) !== 0 ? 1 : di(a)),
            (a = (a & (c.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== y.retryLane))
        )
          throw ((y.retryLane = a), la(e, a), ft(c, e, a), Pf);
        f.data === "$?" || Js(), (t = Rs(e, t, l));
      } else
        f.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = y.treeContext),
            (Me = Nt(f.nextSibling)),
            (Je = t),
            (ge = !0),
            (Rl = null),
            (Et = !1),
            e !== null &&
              ((yt[gt++] = Ht),
              (yt[gt++] = Bt),
              (yt[gt++] = Al),
              (Ht = e.id),
              (Bt = e.overflow),
              (Al = t)),
            (t = Ms(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (sl(),
        (n = a.fallback),
        (f = t.mode),
        (y = e.child),
        (E = y.sibling),
        (a = Ut(y, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = y.subtreeFlags & 65011712),
        E !== null ? (n = Ut(E, n)) : ((n = _l(n, f, l, null)), (n.flags |= 2)),
        (n.return = t),
        (a.return = t),
        (a.sibling = n),
        (t.child = a),
        (a = n),
        (n = t.child),
        (f = e.child.memoizedState),
        f === null
          ? (f = _s(l))
          : ((y = f.cachePool),
            y !== null
              ? ((E = Ue._currentValue),
                (y = y.parent !== E ? { parent: E, pool: E } : y))
              : (y = Zr()),
            (f = { baseLanes: f.baseLanes | l, cachePool: y })),
        (n.memoizedState = f),
        (n.childLanes = As(e, c, l)),
        (t.memoizedState = Ts),
        a)
      : (il(t),
        (l = e.child),
        (e = l.sibling),
        (l = Ut(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [e]), (t.flags |= 16)) : c.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function Ms(e, t) {
    return (
      (t = Eu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Eu(e, t) {
    return (
      (e = ut(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Rs(e, t, l) {
    return (
      ma(t, e.child, null, l),
      (e = Ms(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function co(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Ji(e.return, t, l);
  }
  function Os(e, t, l, a, n) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = a),
        (u.tail = l),
        (u.tailMode = n));
  }
  function ro(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      u = a.tail;
    if ((Xe(e, t, a.children, l), (a = He.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (t.flags |= 128);
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && co(e, l, t);
          else if (e.tag === 19) co(e, l, t);
          else if (e.child !== null) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      a &= 1;
    }
    switch ((Z(He, a), n)) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          (e = l.alternate),
            e !== null && bu(e) === null && (n = l),
            (l = l.sibling);
        (l = n),
          l === null
            ? ((n = t.child), (t.child = null))
            : ((n = l.sibling), (l.sibling = null)),
          Os(t, !1, n, l, u);
        break;
      case "backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && bu(e) === null)) {
            t.child = n;
            break;
          }
          (e = n.sibling), (n.sibling = l), (l = n), (n = e);
        }
        Os(t, !0, l, null, u);
        break;
      case "together":
        Os(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Xt(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (dl |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Za(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        e = t.child, l = Ut(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;

      )
        (e = e.sibling),
          (l = l.sibling = Ut(e, e.pendingProps)),
          (l.return = t);
      l.sibling = null;
    }
    return t.child;
  }
  function Cs(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && nu(e)));
  }
  function D0(e, t, l) {
    switch (t.tag) {
      case 3:
        we(t, t.stateNode.containerInfo),
          tl(t, Ue, e.memoizedState.cache),
          Va();
        break;
      case 27:
      case 5:
        si(t);
        break;
      case 4:
        we(t, t.stateNode.containerInfo);
        break;
      case 10:
        tl(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (il(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
            ? so(e, t, l)
            : (il(t), (e = Xt(e, t, l)), e !== null ? e.sibling : null);
        il(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (Za(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return ro(e, t, l);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          Z(He, He.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return (t.lanes = 0), lo(e, t, l);
      case 24:
        tl(t, Ue, e.memoizedState.cache);
    }
    return Xt(e, t, l);
  }
  function fo(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) qe = !0;
      else {
        if (!Cs(e, l) && (t.flags & 128) === 0) return (qe = !1), D0(e, t, l);
        qe = (e.flags & 131072) !== 0;
      }
    else (qe = !1), ge && (t.flags & 1048576) !== 0 && qr(t, au, t.index);
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            n = a._init;
          if (((a = n(a._payload)), (t.type = a), typeof a == "function"))
            Gi(a)
              ? ((e = Hl(a, e)), (t.tag = 1), (t = uo(null, t, a, e, l)))
              : ((t.tag = 0), (t = ws(null, t, a, e, l)));
          else {
            if (a != null) {
              if (((n = a.$$typeof), n === G)) {
                (t.tag = 11), (t = If(null, t, a, e, l));
                break e;
              } else if (n === F) {
                (t.tag = 14), (t = eo(null, t, a, e, l));
                break e;
              }
            }
            throw ((t = Ct(a) || a), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return ws(e, t, t.type, t.pendingProps, l);
      case 1:
        return (a = t.type), (n = Hl(a, t.pendingProps)), uo(e, t, a, n, l);
      case 3:
        e: {
          if ((we(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          (n = u.element), ts(e, t), Ia(t, a, null, l);
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            tl(t, Ue, a),
            a !== u.cache && $i(t, [Ue], l, !0),
            Pa(),
            (a = c.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = io(e, t, a, l);
              break e;
            } else if (a !== n) {
              (n = mt(Error(r(424)), t)), ka(n), (t = io(e, t, a, l));
              break e;
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (
                Me = Nt(e.firstChild),
                  Je = t,
                  ge = !0,
                  Rl = null,
                  Et = !0,
                  l = Xf(t, null, a, l),
                  t.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
            }
          else {
            if ((Va(), a === n)) {
              t = Xt(e, t, l);
              break e;
            }
            Xe(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          ju(e, t),
          e === null
            ? (l = yd(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : ge ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Lu(ne.current).createElement(l)),
                (a[ke] = t),
                (a[We] = e),
                Ve(a, l, e),
                Le(a),
                (t.stateNode = a))
            : (t.memoizedState = yd(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          si(t),
          e === null &&
            ge &&
            ((a = t.stateNode = dd(t.type, t.pendingProps, ne.current)),
            (Je = t),
            (Et = !0),
            (n = Me),
            gl(t.type) ? ((dc = n), (Me = Nt(a.firstChild))) : (Me = n)),
          Xe(e, t, t.pendingProps.children, l),
          ju(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            ge &&
            ((n = a = Me) &&
              ((a = ch(a, t.type, t.pendingProps, Et)),
              a !== null
                ? ((t.stateNode = a),
                  (Je = t),
                  (Me = Nt(a.firstChild)),
                  (Et = !1),
                  (n = !0))
                : (n = !1)),
            n || Ol(t)),
          si(t),
          (n = t.type),
          (u = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (a = u.children),
          cc(n, u) ? (a = null) : c !== null && cc(n, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = ss(e, t, T0, null, null, l)), (Nn._currentValue = n)),
          ju(e, t),
          Xe(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            ge &&
            ((e = l = Me) &&
              ((l = rh(l, t.pendingProps, Et)),
              l !== null
                ? ((t.stateNode = l), (Je = t), (Me = null), (e = !0))
                : (e = !1)),
            e || Ol(t)),
          null
        );
      case 13:
        return so(e, t, l);
      case 4:
        return (
          we(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = ma(t, null, a, l)) : Xe(e, t, a, l),
          t.child
        );
      case 11:
        return If(e, t, t.type, t.pendingProps, l);
      case 7:
        return Xe(e, t, t.pendingProps, l), t.child;
      case 8:
        return Xe(e, t, t.pendingProps.children, l), t.child;
      case 12:
        return Xe(e, t, t.pendingProps.children, l), t.child;
      case 10:
        return (
          (a = t.pendingProps),
          tl(t, t.type, a.value),
          Xe(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          zl(t),
          (n = Ze(n)),
          (a = a(n)),
          (t.flags |= 1),
          Xe(e, t, a, l),
          t.child
        );
      case 14:
        return eo(e, t, t.type, t.pendingProps, l);
      case 15:
        return to(e, t, t.type, t.pendingProps, l);
      case 19:
        return ro(e, t, l);
      case 31:
        return (
          (a = t.pendingProps),
          (l = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((l = Eu(a, l)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l))
            : ((l = Ut(e.child, a)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l)),
          t
        );
      case 22:
        return lo(e, t, l);
      case 24:
        return (
          zl(t),
          (a = Ze(Ue)),
          e === null
            ? ((n = Pi()),
              n === null &&
                ((n = Ee),
                (u = Wi()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= l),
                (n = u)),
              (t.memoizedState = { parent: a, cache: n }),
              es(t),
              tl(t, Ue, n))
            : ((e.lanes & l) !== 0 && (ts(e, t), Ia(t, null, null, l), Pa()),
              (n = e.memoizedState),
              (u = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  tl(t, Ue, a))
                : ((a = u.cache),
                  tl(t, Ue, a),
                  a !== n.cache && $i(t, [Ue], l, !0))),
          Xe(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Qt(e) {
    e.flags |= 4;
  }
  function oo(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !bd(t))) {
      if (
        ((t = xt.current),
        t !== null &&
          ((de & 4194048) === de
            ? wt !== null
            : ((de & 62914560) !== de && (de & 536870912) === 0) || t !== wt))
      )
        throw ((Wa = Ii), Kr);
      e.flags |= 8192;
    }
  }
  function wu(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Xc() : 536870912), (e.lanes |= t), (xa |= t));
  }
  function sn(e, t) {
    if (!ge)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), (t = t.sibling);
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), (l = l.sibling);
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function _e(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        (l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling);
    else
      for (n = e.child; n !== null; )
        (l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling);
    return (e.subtreeFlags |= a), (e.childLanes = l), t;
  }
  function U0(e, t, l) {
    var a = t.pendingProps;
    switch ((ki(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return _e(t), null;
      case 1:
        return _e(t), null;
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          qt(Ue),
          Ft(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Qa(t)
              ? Qt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Xr())),
          _e(t),
          null
        );
      case 26:
        return (
          (l = t.memoizedState),
          e === null
            ? (Qt(t),
              l !== null ? (_e(t), oo(t, l)) : (_e(t), (t.flags &= -16777217)))
            : l
            ? l !== e.memoizedState
              ? (Qt(t), _e(t), oo(t, l))
              : (_e(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && Qt(t), _e(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        Hn(t), (l = ne.current);
        var n = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && Qt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return _e(t), null;
          }
          (e = I.current),
            Qa(t) ? Yr(t) : ((e = dd(n, a, l)), (t.stateNode = e), Qt(t));
        }
        return _e(t), null;
      case 5:
        if ((Hn(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Qt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return _e(t), null;
          }
          if (((e = I.current), Qa(t))) Yr(t);
          else {
            switch (((n = Lu(ne.current)), e)) {
              case 1:
                e = n.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                e = n.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    e = n.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    e = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    (e = n.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild));
                    break;
                  case "select":
                    (e =
                      typeof a.is == "string"
                        ? n.createElement("select", { is: a.is })
                        : n.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size);
                    break;
                  default:
                    e =
                      typeof a.is == "string"
                        ? n.createElement(l, { is: a.is })
                        : n.createElement(l);
                }
            }
            (e[ke] = t), (e[We] = a);
            e: for (n = t.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                (n.child.return = n), (n = n.child);
                continue;
              }
              if (n === t) break e;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === t) break e;
                n = n.return;
              }
              (n.sibling.return = n.return), (n = n.sibling);
            }
            t.stateNode = e;
            e: switch ((Ve(e, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Qt(t);
          }
        }
        return _e(t), (t.flags &= -16777217), null;
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Qt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((e = ne.current), Qa(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (n = Je),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            (e[ke] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                ud(e.nodeValue, l)
              )),
              e || Ol(t);
          } else (e = Lu(e).createTextNode(a)), (e[ke] = t), (t.stateNode = e);
        }
        return _e(t), null;
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = Qa(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318));
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(r(317));
              n[ke] = t;
            } else
              Va(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4);
            _e(t), (n = !1);
          } else
            (n = Xr()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0);
          if (!n) return t.flags & 256 ? (Gt(t), t) : (Gt(t), null);
        }
        if ((Gt(t), (t.flags & 128) !== 0)) return (t.lanes = l), t;
        if (
          ((l = a !== null), (e = e !== null && e.memoizedState !== null), l)
        ) {
          (a = t.child),
            (n = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (n = a.alternate.memoizedState.cachePool.pool);
          var u = null;
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (u = a.memoizedState.cachePool.pool),
            u !== n && (a.flags |= 2048);
        }
        return (
          l !== e && l && (t.child.flags |= 8192),
          wu(t, t.updateQueue),
          _e(t),
          null
        );
      case 4:
        return Ft(), e === null && ac(t.stateNode.containerInfo), _e(t), null;
      case 10:
        return qt(t.type), _e(t), null;
      case 19:
        if ((J(He), (n = t.memoizedState), n === null)) return _e(t), null;
        if (((a = (t.flags & 128) !== 0), (u = n.rendering), u === null))
          if (a) sn(n, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = bu(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      sn(n, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      wu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;

                  )
                    Lr(l, e), (l = l.sibling);
                  return Z(He, (He.current & 1) | 2), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null &&
              jt() > Au &&
              ((t.flags |= 128), (a = !0), sn(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = bu(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                wu(t, e),
                sn(n, !0),
                n.tail === null &&
                  n.tailMode === "hidden" &&
                  !u.alternate &&
                  !ge)
              )
                return _e(t), null;
            } else
              2 * jt() - n.renderingStartTime > Au &&
                l !== 536870912 &&
                ((t.flags |= 128), (a = !0), sn(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = n.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (n.last = u));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = jt()),
            (t.sibling = null),
            (e = He.current),
            Z(He, a ? (e & 1) | 2 : e & 1),
            t)
          : (_e(t), null);
      case 22:
      case 23:
        return (
          Gt(t),
          us(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : _e(t),
          (l = t.updateQueue),
          l !== null && wu(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && J(Dl),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          qt(Ue),
          _e(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function H0(e, t) {
    switch ((ki(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          qt(Ue),
          Ft(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Hn(t), null;
      case 13:
        if (
          (Gt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          Va();
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return J(He), null;
      case 4:
        return Ft(), null;
      case 10:
        return qt(t.type), null;
      case 22:
      case 23:
        return (
          Gt(t),
          us(),
          e !== null && J(Dl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return qt(Ue), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function mo(e, t) {
    switch ((ki(t), t.tag)) {
      case 3:
        qt(Ue), Ft();
        break;
      case 26:
      case 27:
      case 5:
        Hn(t);
        break;
      case 4:
        Ft();
        break;
      case 13:
        Gt(t);
        break;
      case 19:
        J(He);
        break;
      case 10:
        qt(t.type);
        break;
      case 22:
      case 23:
        Gt(t), us(), e !== null && J(Dl);
        break;
      case 24:
        qt(Ue);
    }
  }
  function cn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create,
              c = l.inst;
            (a = u()), (c.destroy = a);
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (f) {
      Ne(t, t.return, f);
    }
  }
  function cl(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var c = a.inst,
              f = c.destroy;
            if (f !== void 0) {
              (c.destroy = void 0), (n = t);
              var y = l,
                E = f;
              try {
                E();
              } catch (z) {
                Ne(n, y, z);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      Ne(t, t.return, z);
    }
  }
  function ho(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Ir(t, l);
      } catch (a) {
        Ne(e, e.return, a);
      }
    }
  }
  function yo(e, t, l) {
    (l.props = Hl(e.type, e.memoizedProps)), (l.state = e.memoizedState);
    try {
      l.componentWillUnmount();
    } catch (a) {
      Ne(e, t, a);
    }
  }
  function rn(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (n) {
      Ne(e, t, n);
    }
  }
  function Tt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Ne(e, t, n);
        } finally {
          (e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Ne(e, t, n);
        }
      else l.current = null;
  }
  function go(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      Ne(e, e.return, n);
    }
  }
  function zs(e, t, l) {
    try {
      var a = e.stateNode;
      ah(a, e.type, l, t), (a[We] = t);
    } catch (n) {
      Ne(e, e.return, n);
    }
  }
  function xo(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && gl(e.type)) ||
      e.tag === 4
    );
  }
  function Ds(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || xo(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && gl(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        (e.child.return = e), (e = e.child);
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Us(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
              ? l.ownerDocument.body
              : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Bu));
    else if (
      a !== 4 &&
      (a === 27 && gl(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Us(e, t, l), e = e.sibling; e !== null; )
        Us(e, t, l), (e = e.sibling);
  }
  function Tu(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      (e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (
      a !== 4 &&
      (a === 27 && gl(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (Tu(e, t, l), e = e.sibling; e !== null; )
        Tu(e, t, l), (e = e.sibling);
  }
  function po(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      Ve(t, a, l), (t[ke] = e), (t[We] = l);
    } catch (u) {
      Ne(e, e.return, u);
    }
  }
  var Vt = !1,
    Ce = !1,
    Hs = !1,
    vo = typeof WeakSet == "function" ? WeakSet : Set,
    Ye = null;
  function B0(e, t) {
    if (((e = e.containerInfo), (ic = Vu), (e = Ar(e)), Di(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var c = 0,
              f = -1,
              y = -1,
              E = 0,
              z = 0,
              U = e,
              _ = null;
            t: for (;;) {
              for (
                var M;
                U !== l || (n !== 0 && U.nodeType !== 3) || (f = c + n),
                  U !== u || (a !== 0 && U.nodeType !== 3) || (y = c + a),
                  U.nodeType === 3 && (c += U.nodeValue.length),
                  (M = U.firstChild) !== null;

              )
                (_ = U), (U = M);
              for (;;) {
                if (U === e) break t;
                if (
                  (_ === l && ++E === n && (f = c),
                  _ === u && ++z === a && (y = c),
                  (M = U.nextSibling) !== null)
                )
                  break;
                (U = _), (_ = U.parentNode);
              }
              U = M;
            }
            l = f === -1 || y === -1 ? null : { start: f, end: y };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      sc = { focusedElem: e, selectionRange: l }, Vu = !1, Ye = t;
      Ye !== null;

    )
      if (
        ((t = Ye), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (Ye = e);
      else
        for (; Ye !== null; ) {
          switch (((t = Ye), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                (e = void 0),
                  (l = t),
                  (n = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = l.stateNode);
                try {
                  var ae = Hl(l.type, n, l.elementType === l.type);
                  (e = a.getSnapshotBeforeUpdate(ae, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = e);
                } catch (ee) {
                  Ne(l, l.return, ee);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  fc(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      fc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (((e = t.sibling), e !== null)) {
            (e.return = t.return), (Ye = e);
            break;
          }
          Ye = t.return;
        }
  }
  function bo(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        rl(e, l), a & 4 && cn(5, l);
        break;
      case 1:
        if ((rl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (c) {
              Ne(l, l.return, c);
            }
          else {
            var n = Hl(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              Ne(l, l.return, c);
            }
          }
        a & 64 && ho(l), a & 512 && rn(l, l.return);
        break;
      case 3:
        if ((rl(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Ir(e, t);
          } catch (c) {
            Ne(l, l.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && po(l);
      case 26:
      case 5:
        rl(e, l), t === null && a & 4 && go(l), a & 512 && rn(l, l.return);
        break;
      case 12:
        rl(e, l);
        break;
      case 13:
        rl(e, l),
          a & 4 && jo(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = Z0.bind(null, l)), fh(e, l))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Vt), !a)) {
          (t = (t !== null && t.memoizedState !== null) || Ce), (n = Vt);
          var u = Ce;
          (Vt = a),
            (Ce = t) && !u ? fl(e, l, (l.subtreeFlags & 8772) !== 0) : rl(e, l),
            (Vt = n),
            (Ce = u);
        }
        break;
      case 30:
        break;
      default:
        rl(e, l);
    }
  }
  function So(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), So(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && yi(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null);
  }
  var Te = null,
    Ie = !1;
  function kt(e, t, l) {
    for (l = l.child; l !== null; ) No(e, t, l), (l = l.sibling);
  }
  function No(e, t, l) {
    if (lt && typeof lt.onCommitFiberUnmount == "function")
      try {
        lt.onCommitFiberUnmount(Ma, l);
      } catch {}
    switch (l.tag) {
      case 26:
        Ce || Tt(l, t),
          kt(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
        break;
      case 27:
        Ce || Tt(l, t);
        var a = Te,
          n = Ie;
        gl(l.type) && ((Te = l.stateNode), (Ie = !1)),
          kt(e, t, l),
          pn(l.stateNode),
          (Te = a),
          (Ie = n);
        break;
      case 5:
        Ce || Tt(l, t);
      case 6:
        if (
          ((a = Te),
          (n = Ie),
          (Te = null),
          kt(e, t, l),
          (Te = a),
          (Ie = n),
          Te !== null)
        )
          if (Ie)
            try {
              (Te.nodeType === 9
                ? Te.body
                : Te.nodeName === "HTML"
                ? Te.ownerDocument.body
                : Te
              ).removeChild(l.stateNode);
            } catch (u) {
              Ne(l, t, u);
            }
          else
            try {
              Te.removeChild(l.stateNode);
            } catch (u) {
              Ne(l, t, u);
            }
        break;
      case 18:
        Te !== null &&
          (Ie
            ? ((e = Te),
              fd(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                l.stateNode
              ),
              Tn(e))
            : fd(Te, l.stateNode));
        break;
      case 4:
        (a = Te),
          (n = Ie),
          (Te = l.stateNode.containerInfo),
          (Ie = !0),
          kt(e, t, l),
          (Te = a),
          (Ie = n);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ce || cl(2, l, t), Ce || cl(4, l, t), kt(e, t, l);
        break;
      case 1:
        Ce ||
          (Tt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && yo(l, t, a)),
          kt(e, t, l);
        break;
      case 21:
        kt(e, t, l);
        break;
      case 22:
        (Ce = (a = Ce) || l.memoizedState !== null), kt(e, t, l), (Ce = a);
        break;
      default:
        kt(e, t, l);
    }
  }
  function jo(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Tn(e);
      } catch (l) {
        Ne(t, t.return, l);
      }
  }
  function L0(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new vo()), t;
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new vo()),
          t
        );
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Bs(e, t) {
    var l = L0(e);
    t.forEach(function (a) {
      var n = K0.bind(null, e, a);
      l.has(a) || (l.add(a), a.then(n, n));
    });
  }
  function it(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = e,
          c = t,
          f = c;
        e: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (gl(f.type)) {
                (Te = f.stateNode), (Ie = !1);
                break e;
              }
              break;
            case 5:
              (Te = f.stateNode), (Ie = !1);
              break e;
            case 3:
            case 4:
              (Te = f.stateNode.containerInfo), (Ie = !0);
              break e;
          }
          f = f.return;
        }
        if (Te === null) throw Error(r(160));
        No(u, c, n),
          (Te = null),
          (Ie = !1),
          (u = n.alternate),
          u !== null && (u.return = null),
          (n.return = null);
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) Eo(t, e), (t = t.sibling);
  }
  var St = null;
  function Eo(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        it(t, e),
          st(e),
          a & 4 && (cl(3, e, e.return), cn(3, e), cl(5, e, e.return));
        break;
      case 1:
        it(t, e),
          st(e),
          a & 512 && (Ce || l === null || Tt(l, l.return)),
          a & 64 &&
            Vt &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a)))));
        break;
      case 26:
        var n = St;
        if (
          (it(t, e),
          st(e),
          a & 512 && (Ce || l === null || Tt(l, l.return)),
          a & 4)
        ) {
          var u = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  (a = e.type),
                    (l = e.memoizedProps),
                    (n = n.ownerDocument || n);
                  t: switch (a) {
                    case "title":
                      (u = n.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Ca] ||
                          u[ke] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = n.createElement(a)),
                          n.head.insertBefore(
                            u,
                            n.querySelector("head > title")
                          )),
                        Ve(u, a, l),
                        (u[ke] = e),
                        Le(u),
                        (a = u);
                      break e;
                    case "link":
                      var c = pd("link", "href", n).get(a + (l.href || ""));
                      if (c) {
                        for (var f = 0; f < c.length; f++)
                          if (
                            ((u = c[f]),
                            u.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              u.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              u.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              u.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            c.splice(f, 1);
                            break t;
                          }
                      }
                      (u = n.createElement(a)),
                        Ve(u, a, l),
                        n.head.appendChild(u);
                      break;
                    case "meta":
                      if (
                        (c = pd("meta", "content", n).get(
                          a + (l.content || "")
                        ))
                      ) {
                        for (f = 0; f < c.length; f++)
                          if (
                            ((u = c[f]),
                            u.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              u.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              u.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              u.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            c.splice(f, 1);
                            break t;
                          }
                      }
                      (u = n.createElement(a)),
                        Ve(u, a, l),
                        n.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  (u[ke] = e), Le(u), (a = u);
                }
                e.stateNode = a;
              } else vd(n, e.type, e.stateNode);
            else e.stateNode = xd(n, a, e.memoizedProps);
          else
            u !== a
              ? (u === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : u.count--,
                a === null
                  ? vd(n, e.type, e.stateNode)
                  : xd(n, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                zs(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        it(t, e),
          st(e),
          a & 512 && (Ce || l === null || Tt(l, l.return)),
          l !== null && a & 4 && zs(e, e.memoizedProps, l.memoizedProps);
        break;
      case 5:
        if (
          (it(t, e),
          st(e),
          a & 512 && (Ce || l === null || Tt(l, l.return)),
          e.flags & 32)
        ) {
          n = e.stateNode;
          try {
            $l(n, "");
          } catch (M) {
            Ne(e, e.return, M);
          }
        }
        a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), zs(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (Hs = !0);
        break;
      case 6:
        if ((it(t, e), st(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162));
          (a = e.memoizedProps), (l = e.stateNode);
          try {
            l.nodeValue = a;
          } catch (M) {
            Ne(e, e.return, M);
          }
        }
        break;
      case 3:
        if (
          ((Gu = null),
          (n = St),
          (St = qu(t.containerInfo)),
          it(t, e),
          (St = n),
          st(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Tn(t.containerInfo);
          } catch (M) {
            Ne(e, e.return, M);
          }
        Hs && ((Hs = !1), wo(e));
        break;
      case 4:
        (a = St),
          (St = qu(e.stateNode.containerInfo)),
          it(t, e),
          st(e),
          (St = a);
        break;
      case 12:
        it(t, e), st(e);
        break;
      case 13:
        it(t, e),
          st(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Qs = jt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Bs(e, a)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var y = l !== null && l.memoizedState !== null,
          E = Vt,
          z = Ce;
        if (
          ((Vt = E || n),
          (Ce = z || y),
          it(t, e),
          (Ce = z),
          (Vt = E),
          st(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || y || Vt || Ce || Bl(e)),
              l = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                y = l = t;
                try {
                  if (((u = y.stateNode), n))
                    (c = u.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none");
                  else {
                    f = y.stateNode;
                    var U = y.memoizedProps.style,
                      _ =
                        U != null && U.hasOwnProperty("display")
                          ? U.display
                          : null;
                    f.style.display =
                      _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (M) {
                  Ne(y, y.return, M);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = n ? "" : y.memoizedProps;
                } catch (M) {
                  Ne(y, y.return, M);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), (t = t.return);
            }
            l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling);
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Bs(e, l))));
        break;
      case 19:
        it(t, e),
          st(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Bs(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        it(t, e), st(e);
    }
  }
  function st(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (xo(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              u = Ds(e);
            Tu(e, u, n);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && ($l(c, ""), (l.flags &= -33));
            var f = Ds(e);
            Tu(e, f, c);
            break;
          case 3:
          case 4:
            var y = l.stateNode.containerInfo,
              E = Ds(e);
            Us(e, E, y);
            break;
          default:
            throw Error(r(161));
        }
      } catch (z) {
        Ne(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function wo(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        wo(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling);
      }
  }
  function rl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) bo(e, t.alternate, t), (t = t.sibling);
  }
  function Bl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          cl(4, t, t.return), Bl(t);
          break;
        case 1:
          Tt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && yo(t, t.return, l),
            Bl(t);
          break;
        case 27:
          pn(t.stateNode);
        case 26:
        case 5:
          Tt(t, t.return), Bl(t);
          break;
        case 22:
          t.memoizedState === null && Bl(t);
          break;
        case 30:
          Bl(t);
          break;
        default:
          Bl(t);
      }
      e = e.sibling;
    }
  }
  function fl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        u = t,
        c = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          fl(n, u, l), cn(4, u);
          break;
        case 1:
          if (
            (fl(n, u, l),
            (a = u),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount();
            } catch (E) {
              Ne(a, a.return, E);
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var f = a.stateNode;
            try {
              var y = n.shared.hiddenCallbacks;
              if (y !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < y.length; n++)
                  Pr(y[n], f);
            } catch (E) {
              Ne(a, a.return, E);
            }
          }
          l && c & 64 && ho(u), rn(u, u.return);
          break;
        case 27:
          po(u);
        case 26:
        case 5:
          fl(n, u, l), l && a === null && c & 4 && go(u), rn(u, u.return);
          break;
        case 12:
          fl(n, u, l);
          break;
        case 13:
          fl(n, u, l), l && c & 4 && jo(n, u);
          break;
        case 22:
          u.memoizedState === null && fl(n, u, l), rn(u, u.return);
          break;
        case 30:
          break;
        default:
          fl(n, u, l);
      }
      t = t.sibling;
    }
  }
  function Ls(e, t) {
    var l = null;
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Ka(l));
  }
  function qs(e, t) {
    (e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ka(e));
  }
  function _t(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) To(e, t, l, a), (t = t.sibling);
  }
  function To(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        _t(e, t, l, a), n & 2048 && cn(9, t);
        break;
      case 1:
        _t(e, t, l, a);
        break;
      case 3:
        _t(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ka(e)));
        break;
      case 12:
        if (n & 2048) {
          _t(e, t, l, a), (e = t.stateNode);
          try {
            var u = t.memoizedProps,
              c = u.id,
              f = u.onPostCommit;
            typeof f == "function" &&
              f(
                c,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (y) {
            Ne(t, t.return, y);
          }
        } else _t(e, t, l, a);
        break;
      case 13:
        _t(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        (u = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? _t(e, t, l, a)
              : fn(e, t)
            : u._visibility & 2
            ? _t(e, t, l, a)
            : ((u._visibility |= 2),
              ha(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
          n & 2048 && Ls(c, t);
        break;
      case 24:
        _t(e, t, l, a), n & 2048 && qs(t.alternate, t);
        break;
      default:
        _t(e, t, l, a);
    }
  }
  function ha(e, t, l, a, n) {
    for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var u = e,
        c = t,
        f = l,
        y = a,
        E = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          ha(u, c, f, y, n), cn(8, c);
          break;
        case 23:
          break;
        case 22:
          var z = c.stateNode;
          c.memoizedState !== null
            ? z._visibility & 2
              ? ha(u, c, f, y, n)
              : fn(u, c)
            : ((z._visibility |= 2), ha(u, c, f, y, n)),
            n && E & 2048 && Ls(c.alternate, c);
          break;
        case 24:
          ha(u, c, f, y, n), n && E & 2048 && qs(c.alternate, c);
          break;
        default:
          ha(u, c, f, y, n);
      }
      t = t.sibling;
    }
  }
  function fn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            fn(l, a), n & 2048 && Ls(a.alternate, a);
            break;
          case 24:
            fn(l, a), n & 2048 && qs(a.alternate, a);
            break;
          default:
            fn(l, a);
        }
        t = t.sibling;
      }
  }
  var on = 8192;
  function ya(e) {
    if (e.subtreeFlags & on)
      for (e = e.child; e !== null; ) _o(e), (e = e.sibling);
  }
  function _o(e) {
    switch (e.tag) {
      case 26:
        ya(e),
          e.flags & on &&
            e.memoizedState !== null &&
            jh(St, e.memoizedState, e.memoizedProps);
        break;
      case 5:
        ya(e);
        break;
      case 3:
      case 4:
        var t = St;
        (St = qu(e.stateNode.containerInfo)), ya(e), (St = t);
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = on), (on = 16777216), ya(e), (on = t))
            : ya(e));
        break;
      default:
        ya(e);
    }
  }
  function Ao(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do (t = e.sibling), (e.sibling = null), (e = t);
      while (e !== null);
    }
  }
  function dn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Ye = a), Ro(a, e);
        }
      Ao(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Mo(e), (e = e.sibling);
  }
  function Mo(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        dn(e), e.flags & 2048 && cl(9, e, e.return);
        break;
      case 3:
        dn(e);
        break;
      case 12:
        dn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), _u(e))
          : dn(e);
        break;
      default:
        dn(e);
    }
  }
  function _u(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          (Ye = a), Ro(a, e);
        }
      Ao(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          cl(8, t, t.return), _u(t);
          break;
        case 22:
          (l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), _u(t));
          break;
        default:
          _u(t);
      }
      e = e.sibling;
    }
  }
  function Ro(e, t) {
    for (; Ye !== null; ) {
      var l = Ye;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          cl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ka(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) (a.return = l), (Ye = a);
      else
        e: for (l = e; Ye !== null; ) {
          a = Ye;
          var n = a.sibling,
            u = a.return;
          if ((So(a), a === l)) {
            Ye = null;
            break e;
          }
          if (n !== null) {
            (n.return = u), (Ye = n);
            break e;
          }
          Ye = u;
        }
    }
  }
  var q0 = {
      getCacheForType: function (e) {
        var t = Ze(Ue),
          l = t.data.get(e);
        return l === void 0 && ((l = e()), t.data.set(e, l)), l;
      },
    },
    Y0 = typeof WeakMap == "function" ? WeakMap : Map,
    xe = 0,
    Ee = null,
    fe = null,
    de = 0,
    pe = 0,
    ct = null,
    ol = !1,
    ga = !1,
    Ys = !1,
    Zt = 0,
    Re = 0,
    dl = 0,
    Ll = 0,
    Gs = 0,
    pt = 0,
    xa = 0,
    mn = null,
    et = null,
    Xs = !1,
    Qs = 0,
    Au = 1 / 0,
    Mu = null,
    ml = null,
    Qe = 0,
    hl = null,
    pa = null,
    va = 0,
    Vs = 0,
    ks = null,
    Oo = null,
    hn = 0,
    Zs = null;
  function rt() {
    if ((xe & 2) !== 0 && de !== 0) return de & -de;
    if (T.T !== null) {
      var e = ia;
      return e !== 0 ? e : Is();
    }
    return kc();
  }
  function Co() {
    pt === 0 && (pt = (de & 536870912) === 0 || ge ? Gc() : 536870912);
    var e = xt.current;
    return e !== null && (e.flags |= 32), pt;
  }
  function ft(e, t, l) {
    ((e === Ee && (pe === 2 || pe === 9)) || e.cancelPendingCommit !== null) &&
      (ba(e, 0), yl(e, de, pt, !1)),
      Oa(e, l),
      ((xe & 2) === 0 || e !== Ee) &&
        (e === Ee &&
          ((xe & 2) === 0 && (Ll |= l), Re === 4 && yl(e, de, pt, !1)),
        At(e));
  }
  function zo(e, t, l) {
    if ((xe & 6) !== 0) throw Error(r(327));
    var a = (!l && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Ra(e, t),
      n = a ? Q0(e, t) : $s(e, t, !0),
      u = a;
    do {
      if (n === 0) {
        ga && !a && yl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), u && !G0(l))) {
          (n = $s(e, t, !1)), (u = !1);
          continue;
        }
        if (n === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var c = 0;
          else
            (c = e.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0);
          if (c !== 0) {
            t = c;
            e: {
              var f = e;
              n = mn;
              var y = f.current.memoizedState.isDehydrated;
              if ((y && (ba(f, c).flags |= 256), (c = $s(f, c, !1)), c !== 2)) {
                if (Ys && !y) {
                  (f.errorRecoveryDisabledLanes |= u), (Ll |= u), (n = 4);
                  break e;
                }
                (u = et),
                  (et = n),
                  u !== null && (et === null ? (et = u) : et.push.apply(et, u));
              }
              n = c;
            }
            if (((u = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          ba(e, 0), yl(e, t, 0, !0);
          break;
        }
        e: {
          switch (((a = e), (u = n), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              yl(a, t, pt, !ol);
              break e;
            case 2:
              et = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((n = Qs + 300 - jt()), 10 < n)) {
            if ((yl(a, t, pt, !ol), Yn(a, 0, !0) !== 0)) break e;
            a.timeoutHandle = cd(
              Do.bind(null, a, l, et, Mu, Xs, t, pt, Ll, xa, ol, u, 2, -0, 0),
              n
            );
            break e;
          }
          Do(a, l, et, Mu, Xs, t, pt, Ll, xa, ol, u, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    At(e);
  }
  function Do(e, t, l, a, n, u, c, f, y, E, z, U, _, M) {
    if (
      ((e.timeoutHandle = -1),
      (U = t.subtreeFlags),
      (U & 8192 || (U & 16785408) === 16785408) &&
        ((Sn = { stylesheets: null, count: 0, unsuspend: Nh }),
        _o(t),
        (U = Eh()),
        U !== null))
    ) {
      (e.cancelPendingCommit = U(
        Go.bind(null, e, t, u, l, a, n, c, f, y, z, 1, _, M)
      )),
        yl(e, u, c, !E);
      return;
    }
    Go(e, t, u, l, a, n, c, f, y);
  }
  function G0(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            u = n.getSnapshot;
          n = n.value;
          try {
            if (!nt(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        (l.return = t), (t = l);
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return !0;
  }
  function yl(e, t, l, a) {
    (t &= ~Gs),
      (t &= ~Ll),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes);
    for (var n = t; 0 < n; ) {
      var u = 31 - at(n),
        c = 1 << u;
      (a[u] = -1), (n &= ~c);
    }
    l !== 0 && Qc(e, l, t);
  }
  function Ru() {
    return (xe & 6) === 0 ? (yn(0), !1) : !0;
  }
  function Ks() {
    if (fe !== null) {
      if (pe === 0) var e = fe.return;
      else (e = fe), (Lt = Cl = null), fs(e), (da = null), (nn = 0), (e = fe);
      for (; e !== null; ) mo(e.alternate, e), (e = e.return);
      fe = null;
    }
  }
  function ba(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && ((e.timeoutHandle = -1), uh(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      Ks(),
      (Ee = e),
      (fe = l = Ut(e.current, null)),
      (de = t),
      (pe = 0),
      (ct = null),
      (ol = !1),
      (ga = Ra(e, t)),
      (Ys = !1),
      (xa = pt = Gs = Ll = dl = Re = 0),
      (et = mn = null),
      (Xs = !1),
      (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - at(a),
          u = 1 << n;
        (t |= e[n]), (a &= ~u);
      }
    return (Zt = t), Pn(), l;
  }
  function Uo(e, t) {
    (ce = null),
      (T.H = xu),
      t === $a || t === su
        ? ((t = Wr()), (pe = 3))
        : t === Kr
        ? ((t = Wr()), (pe = 4))
        : (pe =
            t === Pf
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (ct = t),
      fe === null && ((Re = 1), Nu(e, mt(t, e.current)));
  }
  function Ho() {
    var e = T.H;
    return (T.H = xu), e === null ? xu : e;
  }
  function Bo() {
    var e = T.A;
    return (T.A = q0), e;
  }
  function Js() {
    (Re = 4),
      ol || ((de & 4194048) !== de && xt.current !== null) || (ga = !0),
      ((dl & 134217727) === 0 && (Ll & 134217727) === 0) ||
        Ee === null ||
        yl(Ee, de, pt, !1);
  }
  function $s(e, t, l) {
    var a = xe;
    xe |= 2;
    var n = Ho(),
      u = Bo();
    (Ee !== e || de !== t) && ((Mu = null), ba(e, t)), (t = !1);
    var c = Re;
    e: do
      try {
        if (pe !== 0 && fe !== null) {
          var f = fe,
            y = ct;
          switch (pe) {
            case 8:
              Ks(), (c = 6);
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              xt.current === null && (t = !0);
              var E = pe;
              if (((pe = 0), (ct = null), Sa(e, f, y, E), l && ga)) {
                c = 0;
                break e;
              }
              break;
            default:
              (E = pe), (pe = 0), (ct = null), Sa(e, f, y, E);
          }
        }
        X0(), (c = Re);
        break;
      } catch (z) {
        Uo(e, z);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Lt = Cl = null),
      (xe = a),
      (T.H = n),
      (T.A = u),
      fe === null && ((Ee = null), (de = 0), Pn()),
      c
    );
  }
  function X0() {
    for (; fe !== null; ) Lo(fe);
  }
  function Q0(e, t) {
    var l = xe;
    xe |= 2;
    var a = Ho(),
      n = Bo();
    Ee !== e || de !== t
      ? ((Mu = null), (Au = jt() + 500), ba(e, t))
      : (ga = Ra(e, t));
    e: do
      try {
        if (pe !== 0 && fe !== null) {
          t = fe;
          var u = ct;
          t: switch (pe) {
            case 1:
              (pe = 0), (ct = null), Sa(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Jr(u)) {
                (pe = 0), (ct = null), qo(t);
                break;
              }
              (t = function () {
                (pe !== 2 && pe !== 9) || Ee !== e || (pe = 7), At(e);
              }),
                u.then(t, t);
              break e;
            case 3:
              pe = 7;
              break e;
            case 4:
              pe = 5;
              break e;
            case 7:
              Jr(u)
                ? ((pe = 0), (ct = null), qo(t))
                : ((pe = 0), (ct = null), Sa(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (fe.tag) {
                case 26:
                  c = fe.memoizedState;
                case 5:
                case 27:
                  var f = fe;
                  if (!c || bd(c)) {
                    (pe = 0), (ct = null);
                    var y = f.sibling;
                    if (y !== null) fe = y;
                    else {
                      var E = f.return;
                      E !== null ? ((fe = E), Ou(E)) : (fe = null);
                    }
                    break t;
                  }
              }
              (pe = 0), (ct = null), Sa(e, t, u, 5);
              break;
            case 6:
              (pe = 0), (ct = null), Sa(e, t, u, 6);
              break;
            case 8:
              Ks(), (Re = 6);
              break e;
            default:
              throw Error(r(462));
          }
        }
        V0();
        break;
      } catch (z) {
        Uo(e, z);
      }
    while (!0);
    return (
      (Lt = Cl = null),
      (T.H = a),
      (T.A = n),
      (xe = l),
      fe !== null ? 0 : ((Ee = null), (de = 0), Pn(), Re)
    );
  }
  function V0() {
    for (; fe !== null && !dm(); ) Lo(fe);
  }
  function Lo(e) {
    var t = fo(e.alternate, e, Zt);
    (e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (fe = t);
  }
  function qo(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = no(l, t, t.pendingProps, t.type, void 0, de);
        break;
      case 11:
        t = no(l, t, t.pendingProps, t.type.render, t.ref, de);
        break;
      case 5:
        fs(t);
      default:
        mo(l, t), (t = fe = Lr(t, Zt)), (t = fo(l, t, Zt));
    }
    (e.memoizedProps = e.pendingProps), t === null ? Ou(e) : (fe = t);
  }
  function Sa(e, t, l, a) {
    (Lt = Cl = null), fs(t), (da = null), (nn = 0);
    var n = t.return;
    try {
      if (z0(e, n, t, l, de)) {
        (Re = 1), Nu(e, mt(l, e.current)), (fe = null);
        return;
      }
    } catch (u) {
      if (n !== null) throw ((fe = n), u);
      (Re = 1), Nu(e, mt(l, e.current)), (fe = null);
      return;
    }
    t.flags & 32768
      ? (ge || a === 1
          ? (e = !0)
          : ga || (de & 536870912) !== 0
          ? (e = !1)
          : ((ol = e = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = xt.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        Yo(t, e))
      : Ou(t);
  }
  function Ou(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Yo(t, ol);
        return;
      }
      e = t.return;
      var l = U0(t.alternate, t, Zt);
      if (l !== null) {
        fe = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        fe = t;
        return;
      }
      fe = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function Yo(e, t) {
    do {
      var l = H0(e.alternate, e);
      if (l !== null) {
        (l.flags &= 32767), (fe = l);
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        fe = e;
        return;
      }
      fe = e = l;
    } while (e !== null);
    (Re = 6), (fe = null);
  }
  function Go(e, t, l, a, n, u, c, f, y) {
    e.cancelPendingCommit = null;
    do Cu();
    while (Qe !== 0);
    if ((xe & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= qi),
        Nm(e, l, u, c, f, y),
        e === Ee && ((fe = Ee = null), (de = 0)),
        (pa = t),
        (hl = e),
        (va = l),
        (Vs = u),
        (ks = n),
        (Oo = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            J0(Bn, function () {
              return Zo(), null;
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = T.T), (T.T = null), (n = Q.p), (Q.p = 2), (c = xe), (xe |= 4);
        try {
          B0(e, t, l);
        } finally {
          (xe = c), (Q.p = n), (T.T = a);
        }
      }
      (Qe = 1), Xo(), Qo(), Vo();
    }
  }
  function Xo() {
    if (Qe === 1) {
      Qe = 0;
      var e = hl,
        t = pa,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        (l = T.T), (T.T = null);
        var a = Q.p;
        Q.p = 2;
        var n = xe;
        xe |= 4;
        try {
          Eo(t, e);
          var u = sc,
            c = Ar(e.containerInfo),
            f = u.focusedElem,
            y = u.selectionRange;
          if (
            c !== f &&
            f &&
            f.ownerDocument &&
            _r(f.ownerDocument.documentElement, f)
          ) {
            if (y !== null && Di(f)) {
              var E = y.start,
                z = y.end;
              if ((z === void 0 && (z = E), "selectionStart" in f))
                (f.selectionStart = E),
                  (f.selectionEnd = Math.min(z, f.value.length));
              else {
                var U = f.ownerDocument || document,
                  _ = (U && U.defaultView) || window;
                if (_.getSelection) {
                  var M = _.getSelection(),
                    ae = f.textContent.length,
                    ee = Math.min(y.start, ae),
                    Se = y.end === void 0 ? ee : Math.min(y.end, ae);
                  !M.extend && ee > Se && ((c = Se), (Se = ee), (ee = c));
                  var b = Tr(f, ee),
                    v = Tr(f, Se);
                  if (
                    b &&
                    v &&
                    (M.rangeCount !== 1 ||
                      M.anchorNode !== b.node ||
                      M.anchorOffset !== b.offset ||
                      M.focusNode !== v.node ||
                      M.focusOffset !== v.offset)
                  ) {
                    var N = U.createRange();
                    N.setStart(b.node, b.offset),
                      M.removeAllRanges(),
                      ee > Se
                        ? (M.addRange(N), M.extend(v.node, v.offset))
                        : (N.setEnd(v.node, v.offset), M.addRange(N));
                  }
                }
              }
            }
            for (U = [], M = f; (M = M.parentNode); )
              M.nodeType === 1 &&
                U.push({ element: M, left: M.scrollLeft, top: M.scrollTop });
            for (
              typeof f.focus == "function" && f.focus(), f = 0;
              f < U.length;
              f++
            ) {
              var D = U[f];
              (D.element.scrollLeft = D.left), (D.element.scrollTop = D.top);
            }
          }
          (Vu = !!ic), (sc = ic = null);
        } finally {
          (xe = n), (Q.p = a), (T.T = l);
        }
      }
      (e.current = t), (Qe = 2);
    }
  }
  function Qo() {
    if (Qe === 2) {
      Qe = 0;
      var e = hl,
        t = pa,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        (l = T.T), (T.T = null);
        var a = Q.p;
        Q.p = 2;
        var n = xe;
        xe |= 4;
        try {
          bo(e, t.alternate, t);
        } finally {
          (xe = n), (Q.p = a), (T.T = l);
        }
      }
      Qe = 3;
    }
  }
  function Vo() {
    if (Qe === 4 || Qe === 3) {
      (Qe = 0), mm();
      var e = hl,
        t = pa,
        l = va,
        a = Oo;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Qe = 5)
        : ((Qe = 0), (pa = hl = null), ko(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (ml = null),
        mi(l),
        (t = t.stateNode),
        lt && typeof lt.onCommitFiberRoot == "function")
      )
        try {
          lt.onCommitFiberRoot(Ma, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (t = T.T), (n = Q.p), (Q.p = 2), (T.T = null);
        try {
          for (var u = e.onRecoverableError, c = 0; c < a.length; c++) {
            var f = a[c];
            u(f.value, { componentStack: f.stack });
          }
        } finally {
          (T.T = t), (Q.p = n);
        }
      }
      (va & 3) !== 0 && Cu(),
        At(e),
        (n = e.pendingLanes),
        (l & 4194090) !== 0 && (n & 42) !== 0
          ? e === Zs
            ? hn++
            : ((hn = 0), (Zs = e))
          : (hn = 0),
        yn(0);
    }
  }
  function ko(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ka(t)));
  }
  function Cu(e) {
    return Xo(), Qo(), Vo(), Zo();
  }
  function Zo() {
    if (Qe !== 5) return !1;
    var e = hl,
      t = Vs;
    Vs = 0;
    var l = mi(va),
      a = T.T,
      n = Q.p;
    try {
      (Q.p = 32 > l ? 32 : l), (T.T = null), (l = ks), (ks = null);
      var u = hl,
        c = va;
      if (((Qe = 0), (pa = hl = null), (va = 0), (xe & 6) !== 0))
        throw Error(r(331));
      var f = xe;
      if (
        ((xe |= 4),
        Mo(u.current),
        To(u, u.current, c, l),
        (xe = f),
        yn(0, !1),
        lt && typeof lt.onPostCommitFiberRoot == "function")
      )
        try {
          lt.onPostCommitFiberRoot(Ma, u);
        } catch {}
      return !0;
    } finally {
      (Q.p = n), (T.T = a), ko(e, t);
    }
  }
  function Ko(e, t, l) {
    (t = mt(l, t)),
      (t = Es(e.stateNode, t, 2)),
      (e = nl(e, t, 2)),
      e !== null && (Oa(e, 2), At(e));
  }
  function Ne(e, t, l) {
    if (e.tag === 3) Ko(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ko(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (ml === null || !ml.has(a)))
          ) {
            (e = mt(l, e)),
              (l = Wf(2)),
              (a = nl(t, l, 2)),
              a !== null && (Ff(l, a, t, e), Oa(a, 2), At(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ws(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new Y0();
      var n = new Set();
      a.set(t, n);
    } else (n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n));
    n.has(l) ||
      ((Ys = !0), n.add(l), (e = k0.bind(null, e, t, l)), t.then(e, e));
  }
  function k0(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Ee === e &&
        (de & l) === l &&
        (Re === 4 || (Re === 3 && (de & 62914560) === de && 300 > jt() - Qs)
          ? (xe & 2) === 0 && ba(e, 0)
          : (Gs |= l),
        xa === de && (xa = 0)),
      At(e);
  }
  function Jo(e, t) {
    t === 0 && (t = Xc()), (e = la(e, t)), e !== null && (Oa(e, t), At(e));
  }
  function Z0(e) {
    var t = e.memoizedState,
      l = 0;
    t !== null && (l = t.retryLane), Jo(e, l);
  }
  function K0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(t), Jo(e, l);
  }
  function J0(e, t) {
    return ri(e, t);
  }
  var zu = null,
    Na = null,
    Fs = !1,
    Du = !1,
    Ps = !1,
    ql = 0;
  function At(e) {
    e !== Na &&
      e.next === null &&
      (Na === null ? (zu = Na = e) : (Na = Na.next = e)),
      (Du = !0),
      Fs || ((Fs = !0), W0());
  }
  function yn(e, t) {
    if (!Ps && Du) {
      Ps = !0;
      do
        for (var l = !1, a = zu; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes,
                f = a.pingedLanes;
              (u = (1 << (31 - at(42 | e) + 1)) - 1),
                (u &= n & ~(c & ~f)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0);
            }
            u !== 0 && ((l = !0), Po(a, u));
          } else
            (u = de),
              (u = Yn(
                a,
                a === Ee ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Ra(a, u) || ((l = !0), Po(a, u));
          a = a.next;
        }
      while (l);
      Ps = !1;
    }
  }
  function $0() {
    $o();
  }
  function $o() {
    Du = Fs = !1;
    var e = 0;
    ql !== 0 && (nh() && (e = ql), (ql = 0));
    for (var t = jt(), l = null, a = zu; a !== null; ) {
      var n = a.next,
        u = Wo(a, t);
      u === 0
        ? ((a.next = null),
          l === null ? (zu = n) : (l.next = n),
          n === null && (Na = l))
        : ((l = a), (e !== 0 || (u & 3) !== 0) && (Du = !0)),
        (a = n);
    }
    yn(e);
  }
  function Wo(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;

    ) {
      var c = 31 - at(u),
        f = 1 << c,
        y = n[c];
      y === -1
        ? ((f & l) === 0 || (f & a) !== 0) && (n[c] = Sm(f, t))
        : y <= t && (e.expiredLanes |= f),
        (u &= ~f);
    }
    if (
      ((t = Ee),
      (l = de),
      (l = Yn(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (pe === 2 || pe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && fi(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Ra(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && fi(a), mi(l))) {
        case 2:
        case 8:
          l = qc;
          break;
        case 32:
          l = Bn;
          break;
        case 268435456:
          l = Yc;
          break;
        default:
          l = Bn;
      }
      return (
        (a = Fo.bind(null, e)),
        (l = ri(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && fi(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Fo(e, t) {
    if (Qe !== 0 && Qe !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null;
    var l = e.callbackNode;
    if (Cu() && e.callbackNode !== l) return null;
    var a = de;
    return (
      (a = Yn(
        e,
        e === Ee ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (zo(e, a, t),
          Wo(e, jt()),
          e.callbackNode != null && e.callbackNode === l
            ? Fo.bind(null, e)
            : null)
    );
  }
  function Po(e, t) {
    if (Cu()) return null;
    zo(e, t, !0);
  }
  function W0() {
    ih(function () {
      (xe & 6) !== 0 ? ri(Lc, $0) : $o();
    });
  }
  function Is() {
    return ql === 0 && (ql = Gc()), ql;
  }
  function Io(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : kn("" + e);
  }
  function ed(e, t) {
    var l = t.ownerDocument.createElement("input");
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function F0(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Io((n[We] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[We] || null)
          ? Io(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((u = t), (c = null)));
      var f = new $n("action", "action", null, a, n);
      e.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (ql !== 0) {
                  var y = c ? ed(n, c) : new FormData(n);
                  vs(
                    l,
                    { pending: !0, data: y, method: n.method, action: u },
                    null,
                    y
                  );
                }
              } else
                typeof u == "function" &&
                  (f.preventDefault(),
                  (y = c ? ed(n, c) : new FormData(n)),
                  vs(
                    l,
                    { pending: !0, data: y, method: n.method, action: u },
                    u,
                    y
                  ));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var ec = 0; ec < Li.length; ec++) {
    var tc = Li[ec],
      P0 = tc.toLowerCase(),
      I0 = tc[0].toUpperCase() + tc.slice(1);
    bt(P0, "on" + I0);
  }
  bt(Or, "onAnimationEnd"),
    bt(Cr, "onAnimationIteration"),
    bt(zr, "onAnimationStart"),
    bt("dblclick", "onDoubleClick"),
    bt("focusin", "onFocus"),
    bt("focusout", "onBlur"),
    bt(g0, "onTransitionRun"),
    bt(x0, "onTransitionStart"),
    bt(p0, "onTransitionCancel"),
    bt(Dr, "onTransitionEnd"),
    Zl("onMouseEnter", ["mouseout", "mouseover"]),
    Zl("onMouseLeave", ["mouseout", "mouseover"]),
    Zl("onPointerEnter", ["pointerout", "pointerover"]),
    Zl("onPointerLeave", ["pointerout", "pointerover"]),
    jl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    jl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    jl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    jl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    jl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    jl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var gn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    eh = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(gn)
    );
  function td(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var f = a[c],
              y = f.instance,
              E = f.currentTarget;
            if (((f = f.listener), y !== u && n.isPropagationStopped()))
              break e;
            (u = f), (n.currentTarget = E);
            try {
              u(n);
            } catch (z) {
              Su(z);
            }
            (n.currentTarget = null), (u = y);
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((f = a[c]),
              (y = f.instance),
              (E = f.currentTarget),
              (f = f.listener),
              y !== u && n.isPropagationStopped())
            )
              break e;
            (u = f), (n.currentTarget = E);
            try {
              u(n);
            } catch (z) {
              Su(z);
            }
            (n.currentTarget = null), (u = y);
          }
      }
    }
  }
  function oe(e, t) {
    var l = t[hi];
    l === void 0 && (l = t[hi] = new Set());
    var a = e + "__bubble";
    l.has(a) || (ld(t, e, 2, !1), l.add(a));
  }
  function lc(e, t, l) {
    var a = 0;
    t && (a |= 4), ld(l, e, a, t);
  }
  var Uu = "_reactListening" + Math.random().toString(36).slice(2);
  function ac(e) {
    if (!e[Uu]) {
      (e[Uu] = !0),
        Kc.forEach(function (l) {
          l !== "selectionchange" && (eh.has(l) || lc(l, !1, e), lc(l, !0, e));
        });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Uu] || ((t[Uu] = !0), lc("selectionchange", !1, t));
    }
  }
  function ld(e, t, l, a) {
    switch (Td(t)) {
      case 2:
        var n = _h;
        break;
      case 8:
        n = Ah;
        break;
      default:
        n = xc;
    }
    (l = n.bind(null, t, l, e)),
      (n = void 0),
      !wi ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
        ? e.addEventListener(t, l, { passive: n })
        : e.addEventListener(t, l, !1);
  }
  function nc(e, t, l, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var y = c.tag;
              if ((y === 3 || y === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; f !== null; ) {
            if (((c = Ql(f)), c === null)) return;
            if (((y = c.tag), y === 5 || y === 6 || y === 26 || y === 27)) {
              a = u = c;
              continue e;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    sr(function () {
      var E = u,
        z = ji(l),
        U = [];
      e: {
        var _ = Ur.get(e);
        if (_ !== void 0) {
          var M = $n,
            ae = e;
          switch (e) {
            case "keypress":
              if (Kn(l) === 0) break e;
            case "keydown":
            case "keyup":
              M = Jm;
              break;
            case "focusin":
              (ae = "focus"), (M = Mi);
              break;
            case "focusout":
              (ae = "blur"), (M = Mi);
              break;
            case "beforeblur":
            case "afterblur":
              M = Mi;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              M = fr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = Hm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = Fm;
              break;
            case Or:
            case Cr:
            case zr:
              M = qm;
              break;
            case Dr:
              M = Im;
              break;
            case "scroll":
            case "scrollend":
              M = Dm;
              break;
            case "wheel":
              M = t0;
              break;
            case "copy":
            case "cut":
            case "paste":
              M = Gm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = dr;
              break;
            case "toggle":
            case "beforetoggle":
              M = a0;
          }
          var ee = (t & 4) !== 0,
            Se = !ee && (e === "scroll" || e === "scrollend"),
            b = ee ? (_ !== null ? _ + "Capture" : null) : _;
          ee = [];
          for (var v = E, N; v !== null; ) {
            var D = v;
            if (
              ((N = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                N === null ||
                b === null ||
                ((D = Da(v, b)), D != null && ee.push(xn(v, D, N))),
              Se)
            )
              break;
            v = v.return;
          }
          0 < ee.length &&
            ((_ = new M(_, ae, null, l, z)),
            U.push({ event: _, listeners: ee }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((_ = e === "mouseover" || e === "pointerover"),
            (M = e === "mouseout" || e === "pointerout"),
            _ &&
              l !== Ni &&
              (ae = l.relatedTarget || l.fromElement) &&
              (Ql(ae) || ae[Xl]))
          )
            break e;
          if (
            (M || _) &&
            ((_ =
              z.window === z
                ? z
                : (_ = z.ownerDocument)
                ? _.defaultView || _.parentWindow
                : window),
            M
              ? ((ae = l.relatedTarget || l.toElement),
                (M = E),
                (ae = ae ? Ql(ae) : null),
                ae !== null &&
                  ((Se = x(ae)),
                  (ee = ae.tag),
                  ae !== Se || (ee !== 5 && ee !== 27 && ee !== 6)) &&
                  (ae = null))
              : ((M = null), (ae = E)),
            M !== ae)
          ) {
            if (
              ((ee = fr),
              (D = "onMouseLeave"),
              (b = "onMouseEnter"),
              (v = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ee = dr),
                (D = "onPointerLeave"),
                (b = "onPointerEnter"),
                (v = "pointer")),
              (Se = M == null ? _ : za(M)),
              (N = ae == null ? _ : za(ae)),
              (_ = new ee(D, v + "leave", M, l, z)),
              (_.target = Se),
              (_.relatedTarget = N),
              (D = null),
              Ql(z) === E &&
                ((ee = new ee(b, v + "enter", ae, l, z)),
                (ee.target = N),
                (ee.relatedTarget = Se),
                (D = ee)),
              (Se = D),
              M && ae)
            )
              t: {
                for (ee = M, b = ae, v = 0, N = ee; N; N = ja(N)) v++;
                for (N = 0, D = b; D; D = ja(D)) N++;
                for (; 0 < v - N; ) (ee = ja(ee)), v--;
                for (; 0 < N - v; ) (b = ja(b)), N--;
                for (; v--; ) {
                  if (ee === b || (b !== null && ee === b.alternate)) break t;
                  (ee = ja(ee)), (b = ja(b));
                }
                ee = null;
              }
            else ee = null;
            M !== null && ad(U, _, M, ee, !1),
              ae !== null && Se !== null && ad(U, Se, ae, ee, !0);
          }
        }
        e: {
          if (
            ((_ = E ? za(E) : window),
            (M = _.nodeName && _.nodeName.toLowerCase()),
            M === "select" || (M === "input" && _.type === "file"))
          )
            var $ = br;
          else if (pr(_))
            if (Sr) $ = m0;
            else {
              $ = o0;
              var re = f0;
            }
          else
            (M = _.nodeName),
              !M ||
              M.toLowerCase() !== "input" ||
              (_.type !== "checkbox" && _.type !== "radio")
                ? E && Si(E.elementType) && ($ = br)
                : ($ = d0);
          if ($ && ($ = $(e, E))) {
            vr(U, $, l, z);
            break e;
          }
          re && re(e, _, E),
            e === "focusout" &&
              E &&
              _.type === "number" &&
              E.memoizedProps.value != null &&
              bi(_, "number", _.value);
        }
        switch (((re = E ? za(E) : window), e)) {
          case "focusin":
            (pr(re) || re.contentEditable === "true") &&
              ((Il = re), (Ui = E), (Xa = null));
            break;
          case "focusout":
            Xa = Ui = Il = null;
            break;
          case "mousedown":
            Hi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Hi = !1), Mr(U, l, z);
            break;
          case "selectionchange":
            if (y0) break;
          case "keydown":
          case "keyup":
            Mr(U, l, z);
        }
        var P;
        if (Oi)
          e: {
            switch (e) {
              case "compositionstart":
                var le = "onCompositionStart";
                break e;
              case "compositionend":
                le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                le = "onCompositionUpdate";
                break e;
            }
            le = void 0;
          }
        else
          Pl
            ? gr(e, l) && (le = "onCompositionEnd")
            : e === "keydown" &&
              l.keyCode === 229 &&
              (le = "onCompositionStart");
        le &&
          (mr &&
            l.locale !== "ko" &&
            (Pl || le !== "onCompositionStart"
              ? le === "onCompositionEnd" && Pl && (P = cr())
              : ((el = z),
                (Ti = "value" in el ? el.value : el.textContent),
                (Pl = !0))),
          (re = Hu(E, le)),
          0 < re.length &&
            ((le = new or(le, e, null, l, z)),
            U.push({ event: le, listeners: re }),
            P ? (le.data = P) : ((P = xr(l)), P !== null && (le.data = P)))),
          (P = u0 ? i0(e, l) : s0(e, l)) &&
            ((le = Hu(E, "onBeforeInput")),
            0 < le.length &&
              ((re = new or("onBeforeInput", "beforeinput", null, l, z)),
              U.push({ event: re, listeners: le }),
              (re.data = P))),
          F0(U, e, E, l, z);
      }
      td(U, t);
    });
  }
  function xn(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Hu(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e,
        u = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = Da(e, l)),
          n != null && a.unshift(xn(e, n, u)),
          (n = Da(e, t)),
          n != null && a.push(xn(e, n, u))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function ja(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function ad(e, t, l, a, n) {
    for (var u = t._reactName, c = []; l !== null && l !== a; ) {
      var f = l,
        y = f.alternate,
        E = f.stateNode;
      if (((f = f.tag), y !== null && y === a)) break;
      (f !== 5 && f !== 26 && f !== 27) ||
        E === null ||
        ((y = E),
        n
          ? ((E = Da(l, u)), E != null && c.unshift(xn(l, E, y)))
          : n || ((E = Da(l, u)), E != null && c.push(xn(l, E, y)))),
        (l = l.return);
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var th = /\r\n?/g,
    lh = /\u0000|\uFFFD/g;
  function nd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        th,
        `
`
      )
      .replace(lh, "");
  }
  function ud(e, t) {
    return (t = nd(t)), nd(e) === t;
  }
  function Bu() {}
  function be(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || $l(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            $l(e, "" + a);
        break;
      case "className":
        Xn(e, "class", a);
        break;
      case "tabIndex":
        Xn(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xn(e, l, a);
        break;
      case "style":
        ur(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          Xn(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l);
          break;
        }
        (a = kn("" + a)), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" &&
            (l === "formAction"
              ? (t !== "input" && be(e, t, "name", n.name, n, null),
                be(e, t, "formEncType", n.formEncType, n, null),
                be(e, t, "formMethod", n.formMethod, n, null),
                be(e, t, "formTarget", n.formTarget, n, null))
              : (be(e, t, "encType", n.encType, n, null),
                be(e, t, "method", n.method, n, null),
                be(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        (a = kn("" + a)), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = Bu);
        break;
      case "onScroll":
        a != null && oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && oe("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        (l = kn("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case "popover":
        oe("beforetoggle", e), oe("toggle", e), Gn(e, "popover", a);
        break;
      case "xlinkActuate":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        zt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        zt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        zt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        zt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Gn(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = Cm.get(l) || l), Gn(e, l, a));
    }
  }
  function uc(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        ur(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? $l(e, a)
          : (typeof a == "number" || typeof a == "bigint") && $l(e, "" + a);
        break;
      case "onScroll":
        a != null && oe("scroll", e);
        break;
      case "onScrollEnd":
        a != null && oe("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Bu);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Jc.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((n = l.endsWith("Capture")),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (u = e[We] || null),
              (u = u != null ? u[l] : null),
              typeof u == "function" && e.removeEventListener(t, u, n),
              typeof a == "function")
            ) {
              typeof u != "function" &&
                u !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n);
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
              ? e.setAttribute(l, "")
              : Gn(e, l, a);
          }
    }
  }
  function Ve(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        oe("error", e), oe("load", e);
        var a = !1,
          n = !1,
          u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  be(e, t, u, c, l, null);
              }
          }
        n && be(e, t, "srcSet", l.srcSet, l, null),
          a && be(e, t, "src", l.src, l, null);
        return;
      case "input":
        oe("invalid", e);
        var f = (u = c = n = null),
          y = null,
          E = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var z = l[a];
            if (z != null)
              switch (a) {
                case "name":
                  n = z;
                  break;
                case "type":
                  c = z;
                  break;
                case "checked":
                  y = z;
                  break;
                case "defaultChecked":
                  E = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  f = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null) throw Error(r(137, t));
                  break;
                default:
                  be(e, t, a, z, l, null);
              }
          }
        tr(e, u, f, y, E, c, n, !1), Qn(e);
        return;
      case "select":
        oe("invalid", e), (a = c = u = null);
        for (n in l)
          if (l.hasOwnProperty(n) && ((f = l[n]), f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                c = f;
                break;
              case "multiple":
                a = f;
              default:
                be(e, t, n, f, l, null);
            }
        (t = u),
          (l = c),
          (e.multiple = !!a),
          t != null ? Jl(e, !!a, t, !1) : l != null && Jl(e, !!a, l, !0);
        return;
      case "textarea":
        oe("invalid", e), (u = n = a = null);
        for (c in l)
          if (l.hasOwnProperty(c) && ((f = l[c]), f != null))
            switch (c) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                be(e, t, c, f, l, null);
            }
        ar(e, a, n, u), Qn(e);
        return;
      case "option":
        for (y in l)
          if (l.hasOwnProperty(y) && ((a = l[y]), a != null))
            switch (y) {
              case "selected":
                e.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                be(e, t, y, a, l, null);
            }
        return;
      case "dialog":
        oe("beforetoggle", e), oe("toggle", e), oe("cancel", e), oe("close", e);
        break;
      case "iframe":
      case "object":
        oe("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gn.length; a++) oe(gn[a], e);
        break;
      case "image":
        oe("error", e), oe("load", e);
        break;
      case "details":
        oe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        oe("error", e), oe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (E in l)
          if (l.hasOwnProperty(E) && ((a = l[E]), a != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                be(e, t, E, a, l, null);
            }
        return;
      default:
        if (Si(t)) {
          for (z in l)
            l.hasOwnProperty(z) &&
              ((a = l[z]), a !== void 0 && uc(e, t, z, a, l, void 0));
          return;
        }
    }
    for (f in l)
      l.hasOwnProperty(f) && ((a = l[f]), a != null && be(e, t, f, a, l, null));
  }
  function ah(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          u = null,
          c = null,
          f = null,
          y = null,
          E = null,
          z = null;
        for (M in l) {
          var U = l[M];
          if (l.hasOwnProperty(M) && U != null)
            switch (M) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = U;
              default:
                a.hasOwnProperty(M) || be(e, t, M, null, a, U);
            }
        }
        for (var _ in a) {
          var M = a[_];
          if (((U = l[_]), a.hasOwnProperty(_) && (M != null || U != null)))
            switch (_) {
              case "type":
                u = M;
                break;
              case "name":
                n = M;
                break;
              case "checked":
                E = M;
                break;
              case "defaultChecked":
                z = M;
                break;
              case "value":
                c = M;
                break;
              case "defaultValue":
                f = M;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(r(137, t));
                break;
              default:
                M !== U && be(e, t, _, M, a, U);
            }
        }
        vi(e, c, f, y, E, z, u, n);
        return;
      case "select":
        M = c = f = _ = null;
        for (u in l)
          if (((y = l[u]), l.hasOwnProperty(u) && y != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                M = y;
              default:
                a.hasOwnProperty(u) || be(e, t, u, null, a, y);
            }
        for (n in a)
          if (
            ((u = a[n]),
            (y = l[n]),
            a.hasOwnProperty(n) && (u != null || y != null))
          )
            switch (n) {
              case "value":
                _ = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                c = u;
              default:
                u !== y && be(e, t, n, u, a, y);
            }
        (t = f),
          (l = c),
          (a = M),
          _ != null
            ? Jl(e, !!l, _, !1)
            : !!a != !!l &&
              (t != null ? Jl(e, !!l, t, !0) : Jl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        M = _ = null;
        for (f in l)
          if (
            ((n = l[f]),
            l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
          )
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                be(e, t, f, null, a, n);
            }
        for (c in a)
          if (
            ((n = a[c]),
            (u = l[c]),
            a.hasOwnProperty(c) && (n != null || u != null))
          )
            switch (c) {
              case "value":
                _ = n;
                break;
              case "defaultValue":
                M = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && be(e, t, c, n, a, u);
            }
        lr(e, _, M);
        return;
      case "option":
        for (var ae in l)
          if (
            ((_ = l[ae]),
            l.hasOwnProperty(ae) && _ != null && !a.hasOwnProperty(ae))
          )
            switch (ae) {
              case "selected":
                e.selected = !1;
                break;
              default:
                be(e, t, ae, null, a, _);
            }
        for (y in a)
          if (
            ((_ = a[y]),
            (M = l[y]),
            a.hasOwnProperty(y) && _ !== M && (_ != null || M != null))
          )
            switch (y) {
              case "selected":
                e.selected =
                  _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                be(e, t, y, _, a, M);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ee in l)
          (_ = l[ee]),
            l.hasOwnProperty(ee) &&
              _ != null &&
              !a.hasOwnProperty(ee) &&
              be(e, t, ee, null, a, _);
        for (E in a)
          if (
            ((_ = a[E]),
            (M = l[E]),
            a.hasOwnProperty(E) && _ !== M && (_ != null || M != null))
          )
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(r(137, t));
                break;
              default:
                be(e, t, E, _, a, M);
            }
        return;
      default:
        if (Si(t)) {
          for (var Se in l)
            (_ = l[Se]),
              l.hasOwnProperty(Se) &&
                _ !== void 0 &&
                !a.hasOwnProperty(Se) &&
                uc(e, t, Se, void 0, a, _);
          for (z in a)
            (_ = a[z]),
              (M = l[z]),
              !a.hasOwnProperty(z) ||
                _ === M ||
                (_ === void 0 && M === void 0) ||
                uc(e, t, z, _, a, M);
          return;
        }
    }
    for (var b in l)
      (_ = l[b]),
        l.hasOwnProperty(b) &&
          _ != null &&
          !a.hasOwnProperty(b) &&
          be(e, t, b, null, a, _);
    for (U in a)
      (_ = a[U]),
        (M = l[U]),
        !a.hasOwnProperty(U) ||
          _ === M ||
          (_ == null && M == null) ||
          be(e, t, U, _, a, M);
  }
  var ic = null,
    sc = null;
  function Lu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function id(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function sd(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function cc(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var rc = null;
  function nh() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === rc
        ? !1
        : ((rc = e), !0)
      : ((rc = null), !1);
  }
  var cd = typeof setTimeout == "function" ? setTimeout : void 0,
    uh = typeof clearTimeout == "function" ? clearTimeout : void 0,
    rd = typeof Promise == "function" ? Promise : void 0,
    ih =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof rd < "u"
        ? function (e) {
            return rd.resolve(null).then(e).catch(sh);
          }
        : cd;
  function sh(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function gl(e) {
    return e === "head";
  }
  function fd(e, t) {
    var l = t,
      a = 0,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((e.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === "/$")) {
          if (0 < a && 8 > a) {
            l = a;
            var c = e.ownerDocument;
            if ((l & 1 && pn(c.documentElement), l & 2 && pn(c.body), l & 4))
              for (l = c.head, pn(l), c = l.firstChild; c; ) {
                var f = c.nextSibling,
                  y = c.nodeName;
                c[Ca] ||
                  y === "SCRIPT" ||
                  y === "STYLE" ||
                  (y === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
                  l.removeChild(c),
                  (c = f);
              }
          }
          if (n === 0) {
            e.removeChild(u), Tn(t);
            return;
          }
          n--;
        } else
          l === "$" || l === "$?" || l === "$!"
            ? n++
            : (a = l.charCodeAt(0) - 48);
      else a = 0;
      l = u;
    } while (l);
    Tn(t);
  }
  function fc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          fc(l), yi(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function ch(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Ca])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === u) return e;
      } else return e;
      if (((e = Nt(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function rh(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = Nt(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function oc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function fh(e, t) {
    var l = e.ownerDocument;
    if (e.data !== "$?" || l.readyState === "complete") t();
    else {
      var a = function () {
        t(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a);
    }
  }
  function Nt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var dc = null;
  function od(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (t === 0) return e;
          t--;
        } else l === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function dd(e, t, l) {
    switch (((t = Lu(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(r(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function pn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    yi(e);
  }
  var vt = new Map(),
    md = new Set();
  function qu(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument;
  }
  var Kt = Q.d;
  Q.d = { f: oh, r: dh, D: mh, C: hh, L: yh, m: gh, X: ph, S: xh, M: vh };
  function oh() {
    var e = Kt.f(),
      t = Ru();
    return e || t;
  }
  function dh(e) {
    var t = Vl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Cf(t) : Kt.r(e);
  }
  var Ea = typeof document > "u" ? null : document;
  function hd(e, t, l) {
    var a = Ea;
    if (a && typeof t == "string" && t) {
      var n = dt(t);
      (n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
        md.has(n) ||
          (md.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            Ve(t, "link", e),
            Le(t),
            a.head.appendChild(t)));
    }
  }
  function mh(e) {
    Kt.D(e), hd("dns-prefetch", e, null);
  }
  function hh(e, t) {
    Kt.C(e, t), hd("preconnect", e, t);
  }
  function yh(e, t, l) {
    Kt.L(e, t, l);
    var a = Ea;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + dt(t) + '"]';
      t === "image" && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + dt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (n += '[imagesizes="' + dt(l.imageSizes) + '"]'))
        : (n += '[href="' + dt(e) + '"]');
      var u = n;
      switch (t) {
        case "style":
          u = wa(e);
          break;
        case "script":
          u = Ta(e);
      }
      vt.has(u) ||
        ((e = R(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        vt.set(u, e),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(vn(u))) ||
          (t === "script" && a.querySelector(bn(u))) ||
          ((t = a.createElement("link")),
          Ve(t, "link", e),
          Le(t),
          a.head.appendChild(t)));
    }
  }
  function gh(e, t) {
    Kt.m(e, t);
    var l = Ea;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + dt(a) + '"][href="' + dt(e) + '"]',
        u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ta(e);
      }
      if (
        !vt.has(u) &&
        ((e = R({ rel: "modulepreload", href: e }, t)),
        vt.set(u, e),
        l.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(bn(u))) return;
        }
        (a = l.createElement("link")),
          Ve(a, "link", e),
          Le(a),
          l.head.appendChild(a);
      }
    }
  }
  function xh(e, t, l) {
    Kt.S(e, t, l);
    var a = Ea;
    if (a && e) {
      var n = kl(a).hoistableStyles,
        u = wa(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var f = { loading: 0, preload: null };
        if ((c = a.querySelector(vn(u)))) f.loading = 5;
        else {
          (e = R({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = vt.get(u)) && mc(e, l);
          var y = (c = a.createElement("link"));
          Le(y),
            Ve(y, "link", e),
            (y._p = new Promise(function (E, z) {
              (y.onload = E), (y.onerror = z);
            })),
            y.addEventListener("load", function () {
              f.loading |= 1;
            }),
            y.addEventListener("error", function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            Yu(c, t, a);
        }
        (c = { type: "stylesheet", instance: c, count: 1, state: f }),
          n.set(u, c);
      }
    }
  }
  function ph(e, t) {
    Kt.X(e, t);
    var l = Ea;
    if (l && e) {
      var a = kl(l).hoistableScripts,
        n = Ta(e),
        u = a.get(n);
      u ||
        ((u = l.querySelector(bn(n))),
        u ||
          ((e = R({ src: e, async: !0 }, t)),
          (t = vt.get(n)) && hc(e, t),
          (u = l.createElement("script")),
          Le(u),
          Ve(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function vh(e, t) {
    Kt.M(e, t);
    var l = Ea;
    if (l && e) {
      var a = kl(l).hoistableScripts,
        n = Ta(e),
        u = a.get(n);
      u ||
        ((u = l.querySelector(bn(n))),
        u ||
          ((e = R({ src: e, async: !0, type: "module" }, t)),
          (t = vt.get(n)) && hc(e, t),
          (u = l.createElement("script")),
          Le(u),
          Ve(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function yd(e, t, l, a) {
    var n = (n = ne.current) ? qu(n) : null;
    if (!n) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = wa(l.href)),
            (l = kl(n).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = wa(l.href);
          var u = kl(n).hoistableStyles,
            c = u.get(e);
          if (
            (c ||
              ((n = n.ownerDocument || n),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, c),
              (u = n.querySelector(vn(e))) &&
                !u._p &&
                ((c.instance = u), (c.state.loading = 5)),
              vt.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                vt.set(e, l),
                u || bh(n, e, l, c.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ta(l)),
              (l = kl(n).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, e));
    }
  }
  function wa(e) {
    return 'href="' + dt(e) + '"';
  }
  function vn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function gd(e) {
    return R({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function bh(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Ve(t, "link", l),
        Le(t),
        e.head.appendChild(t));
  }
  function Ta(e) {
    return '[src="' + dt(e) + '"]';
  }
  function bn(e) {
    return "script[async]" + e;
  }
  function xd(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + dt(l.href) + '"]');
          if (a) return (t.instance = a), Le(a), a;
          var n = R({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Le(a),
            Ve(a, "style", n),
            Yu(a, l.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          n = wa(l.href);
          var u = e.querySelector(vn(n));
          if (u) return (t.state.loading |= 4), (t.instance = u), Le(u), u;
          (a = gd(l)),
            (n = vt.get(n)) && mc(a, n),
            (u = (e.ownerDocument || e).createElement("link")),
            Le(u);
          var c = u;
          return (
            (c._p = new Promise(function (f, y) {
              (c.onload = f), (c.onerror = y);
            })),
            Ve(u, "link", a),
            (t.state.loading |= 4),
            Yu(u, l.precedence, e),
            (t.instance = u)
          );
        case "script":
          return (
            (u = Ta(l.src)),
            (n = e.querySelector(bn(u)))
              ? ((t.instance = n), Le(n), n)
              : ((a = l),
                (n = vt.get(u)) && ((a = R({}, l)), hc(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                Le(n),
                Ve(n, "link", a),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Yu(a, l.precedence, e));
    return t.instance;
  }
  function Yu(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        c = 0;
      c < a.length;
      c++
    ) {
      var f = a[c];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function mc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title);
  }
  function hc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity);
  }
  var Gu = null;
  function pd(e, t, l) {
    if (Gu === null) {
      var a = new Map(),
        n = (Gu = new Map());
      n.set(l, a);
    } else (n = Gu), (a = n.get(l)), a || ((a = new Map()), n.set(l, a));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), n = 0;
      n < l.length;
      n++
    ) {
      var u = l[n];
      if (
        !(
          u[Ca] ||
          u[ke] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var f = a.get(c);
        f ? f.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function vd(e, t, l) {
    (e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null
      );
  }
  function Sh(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function bd(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Sn = null;
  function Nh() {}
  function jh(e, t, l) {
    if (Sn === null) throw Error(r(475));
    var a = Sn;
    if (
      t.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var n = wa(l.href),
          u = e.querySelector(vn(n));
        if (u) {
          (e = u._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = Xu.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = u),
            Le(u);
          return;
        }
        (u = e.ownerDocument || e),
          (l = gd(l)),
          (n = vt.get(n)) && mc(l, n),
          (u = u.createElement("link")),
          Le(u);
        var c = u;
        (c._p = new Promise(function (f, y) {
          (c.onload = f), (c.onerror = y);
        })),
          Ve(u, "link", l),
          (t.instance = u);
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = Xu.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t));
    }
  }
  function Eh() {
    if (Sn === null) throw Error(r(475));
    var e = Sn;
    return (
      e.stylesheets && e.count === 0 && yc(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && yc(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                (e.unsuspend = null), a();
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                (e.unsuspend = null), clearTimeout(l);
              }
            );
          }
        : null
    );
  }
  function Xu() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) yc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        (this.unsuspend = null), e();
      }
    }
  }
  var Qu = null;
  function yc(e, t) {
    (e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Qu = new Map()),
        t.forEach(wh, e),
        (Qu = null),
        Xu.call(e));
  }
  function wh(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Qu.get(e);
      if (l) var a = l.get(null);
      else {
        (l = new Map()), Qu.set(e, l);
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < n.length;
          u++
        ) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (l.set(c.dataset.precedence, c), (a = c));
        }
        a && l.set(null, a);
      }
      (n = t.instance),
        (c = n.getAttribute("data-precedence")),
        (u = l.get(c) || a),
        u === a && l.set(null, n),
        l.set(c, n),
        this.count++,
        (a = Xu.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4);
    }
  }
  var Nn = {
    $$typeof: O,
    Provider: null,
    Consumer: null,
    _currentValue: W,
    _currentValue2: W,
    _threadCount: 0,
  };
  function Th(e, t, l, a, n, u, c, f) {
    (this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = oi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = oi(0)),
      (this.hiddenUpdates = oi(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map());
  }
  function Sd(e, t, l, a, n, u, c, f, y, E, z, U) {
    return (
      (e = new Th(e, t, l, c, f, y, E, U)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = ut(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Wi()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
      es(u),
      e
    );
  }
  function Nd(e) {
    return e ? ((e = aa), e) : aa;
  }
  function jd(e, t, l, a, n, u) {
    (n = Nd(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = al(t)),
      (a.payload = { element: l }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (l = nl(e, a, t)),
      l !== null && (ft(l, e, t), Fa(l, e, t));
  }
  function Ed(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function gc(e, t) {
    Ed(e, t), (e = e.alternate) && Ed(e, t);
  }
  function wd(e) {
    if (e.tag === 13) {
      var t = la(e, 67108864);
      t !== null && ft(t, e, 67108864), gc(e, 67108864);
    }
  }
  var Vu = !0;
  function _h(e, t, l, a) {
    var n = T.T;
    T.T = null;
    var u = Q.p;
    try {
      (Q.p = 2), xc(e, t, l, a);
    } finally {
      (Q.p = u), (T.T = n);
    }
  }
  function Ah(e, t, l, a) {
    var n = T.T;
    T.T = null;
    var u = Q.p;
    try {
      (Q.p = 8), xc(e, t, l, a);
    } finally {
      (Q.p = u), (T.T = n);
    }
  }
  function xc(e, t, l, a) {
    if (Vu) {
      var n = pc(a);
      if (n === null) nc(e, t, a, ku, l), _d(e, a);
      else if (Rh(n, e, t, l, a)) a.stopPropagation();
      else if ((_d(e, a), t & 4 && -1 < Mh.indexOf(e))) {
        for (; n !== null; ) {
          var u = Vl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var c = Nl(u.pendingLanes);
                  if (c !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var y = 1 << (31 - at(c));
                      (f.entanglements[1] |= y), (c &= ~y);
                    }
                    At(u), (xe & 6) === 0 && ((Au = jt() + 500), yn(0));
                  }
                }
                break;
              case 13:
                (f = la(u, 2)), f !== null && ft(f, u, 2), Ru(), gc(u, 2);
            }
          if (((u = pc(a)), u === null && nc(e, t, a, ku, l), u === n)) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else nc(e, t, a, null, l);
    }
  }
  function pc(e) {
    return (e = ji(e)), vc(e);
  }
  var ku = null;
  function vc(e) {
    if (((ku = null), (e = Ql(e)), e !== null)) {
      var t = x(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = S(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return (ku = e), null;
  }
  function Td(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (hm()) {
          case Lc:
            return 2;
          case qc:
            return 8;
          case Bn:
          case ym:
            return 32;
          case Yc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var bc = !1,
    xl = null,
    pl = null,
    vl = null,
    jn = new Map(),
    En = new Map(),
    bl = [],
    Mh =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function _d(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        xl = null;
        break;
      case "dragenter":
      case "dragleave":
        pl = null;
        break;
      case "mouseover":
      case "mouseout":
        vl = null;
        break;
      case "pointerover":
      case "pointerout":
        jn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        En.delete(t.pointerId);
    }
  }
  function wn(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        t !== null && ((t = Vl(t)), t !== null && wd(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function Rh(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return (xl = wn(xl, e, t, l, a, n)), !0;
      case "dragenter":
        return (pl = wn(pl, e, t, l, a, n)), !0;
      case "mouseover":
        return (vl = wn(vl, e, t, l, a, n)), !0;
      case "pointerover":
        var u = n.pointerId;
        return jn.set(u, wn(jn.get(u) || null, e, t, l, a, n)), !0;
      case "gotpointercapture":
        return (
          (u = n.pointerId), En.set(u, wn(En.get(u) || null, e, t, l, a, n)), !0
        );
    }
    return !1;
  }
  function Ad(e) {
    var t = Ql(e.target);
    if (t !== null) {
      var l = x(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = S(l)), t !== null)) {
            (e.blockedOn = t),
              jm(e.priority, function () {
                if (l.tag === 13) {
                  var a = rt();
                  a = di(a);
                  var n = la(l, a);
                  n !== null && ft(n, l, a), gc(l, a);
                }
              });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Zu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = pc(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        (Ni = a), l.target.dispatchEvent(a), (Ni = null);
      } else return (t = Vl(l)), t !== null && wd(t), (e.blockedOn = l), !1;
      t.shift();
    }
    return !0;
  }
  function Md(e, t, l) {
    Zu(e) && l.delete(t);
  }
  function Oh() {
    (bc = !1),
      xl !== null && Zu(xl) && (xl = null),
      pl !== null && Zu(pl) && (pl = null),
      vl !== null && Zu(vl) && (vl = null),
      jn.forEach(Md),
      En.forEach(Md);
  }
  function Ku(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      bc ||
        ((bc = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, Oh)));
  }
  var Ju = null;
  function Rd(e) {
    Ju !== e &&
      ((Ju = e),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        Ju === e && (Ju = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2];
          if (typeof a != "function") {
            if (vc(a || l) === null) continue;
            break;
          }
          var u = Vl(l);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            vs(u, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function Tn(e) {
    function t(y) {
      return Ku(y, e);
    }
    xl !== null && Ku(xl, e),
      pl !== null && Ku(pl, e),
      vl !== null && Ku(vl, e),
      jn.forEach(t),
      En.forEach(t);
    for (var l = 0; l < bl.length; l++) {
      var a = bl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < bl.length && ((l = bl[0]), l.blockedOn === null); )
      Ad(l), l.blockedOn === null && bl.shift();
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          u = l[a + 1],
          c = n[We] || null;
        if (typeof u == "function") c || Rd(l);
        else if (c) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (((n = u), (c = u[We] || null))) f = c.formAction;
            else if (vc(n) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? (l[a + 1] = f) : (l.splice(a, 3), (a -= 3)),
            Rd(l);
        }
      }
  }
  function Sc(e) {
    this._internalRoot = e;
  }
  ($u.prototype.render = Sc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var l = t.current,
        a = rt();
      jd(l, a, e, t, null, null);
    }),
    ($u.prototype.unmount = Sc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          jd(e.current, 2, null, e, null, null), Ru(), (t[Xl] = null);
        }
      });
  function $u(e) {
    this._internalRoot = e;
  }
  $u.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = kc();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < bl.length && t !== 0 && t < bl[l].priority; l++);
      bl.splice(l, 0, e), l === 0 && Ad(e);
    }
  };
  var Od = o.version;
  if (Od !== "19.1.0") throw Error(r(527, Od, "19.1.0"));
  Q.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)));
    return (
      (e = g(t)),
      (e = e !== null ? h(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var Ch = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wu.isDisabled && Wu.supportsFiber)
      try {
        (Ma = Wu.inject(Ch)), (lt = Wu);
      } catch {}
  }
  return (
    (An.createRoot = function (e, t) {
      if (!m(e)) throw Error(r(299));
      var l = !1,
        a = "",
        n = Zf,
        u = Kf,
        c = Jf,
        f = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (f = t.unstable_transitionCallbacks)),
        (t = Sd(e, 1, !1, null, null, l, a, n, u, c, f, null)),
        (e[Xl] = t.current),
        ac(e),
        new Sc(t)
      );
    }),
    (An.hydrateRoot = function (e, t, l) {
      if (!m(e)) throw Error(r(299));
      var a = !1,
        n = "",
        u = Zf,
        c = Kf,
        f = Jf,
        y = null,
        E = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (c = l.onCaughtError),
          l.onRecoverableError !== void 0 && (f = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (y = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (E = l.formState)),
        (t = Sd(e, 1, !0, t, l ?? null, a, n, u, c, f, y, E)),
        (t.context = Nd(null)),
        (l = t.current),
        (a = rt()),
        (a = di(a)),
        (n = al(a)),
        (n.callback = null),
        nl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        Oa(t, l),
        At(t),
        (e[Xl] = t.current),
        ac(e),
        new $u(t)
      );
    }),
    (An.version = "19.1.0"),
    An
  );
}
var Gd;
function Xh() {
  if (Gd) return jc.exports;
  Gd = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), (jc.exports = Gh()), jc.exports;
}
var Qh = Xh(),
  j = Cc(),
  Mn = {},
  Xd;
function Vh() {
  if (Xd) return Mn;
  (Xd = 1),
    Object.defineProperty(Mn, "__esModule", { value: !0 }),
    (Mn.parse = S),
    (Mn.serialize = h);
  const s = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    o = /^[\u0021-\u003A\u003C-\u007E]*$/,
    d =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    m = Object.prototype.toString,
    x = (() => {
      const A = function () {};
      return (A.prototype = Object.create(null)), A;
    })();
  function S(A, H) {
    const C = new x(),
      q = A.length;
    if (q < 2) return C;
    const V = (H == null ? void 0 : H.decode) || R;
    let Y = 0;
    do {
      const k = A.indexOf("=", Y);
      if (k === -1) break;
      const O = A.indexOf(";", Y),
        G = O === -1 ? q : O;
      if (k > G) {
        Y = A.lastIndexOf(";", k - 1) + 1;
        continue;
      }
      const K = w(A, Y, k),
        se = g(A, k, K),
        F = A.slice(K, se);
      if (C[F] === void 0) {
        let ie = w(A, k + 1, G),
          te = g(A, G, ie);
        const je = V(A.slice(ie, te));
        C[F] = je;
      }
      Y = G + 1;
    } while (Y < q);
    return C;
  }
  function w(A, H, C) {
    do {
      const q = A.charCodeAt(H);
      if (q !== 32 && q !== 9) return H;
    } while (++H < C);
    return C;
  }
  function g(A, H, C) {
    for (; H > C; ) {
      const q = A.charCodeAt(--H);
      if (q !== 32 && q !== 9) return H + 1;
    }
    return C;
  }
  function h(A, H, C) {
    const q = (C == null ? void 0 : C.encode) || encodeURIComponent;
    if (!s.test(A)) throw new TypeError(`argument name is invalid: ${A}`);
    const V = q(H);
    if (!o.test(V)) throw new TypeError(`argument val is invalid: ${H}`);
    let Y = A + "=" + V;
    if (!C) return Y;
    if (C.maxAge !== void 0) {
      if (!Number.isInteger(C.maxAge))
        throw new TypeError(`option maxAge is invalid: ${C.maxAge}`);
      Y += "; Max-Age=" + C.maxAge;
    }
    if (C.domain) {
      if (!d.test(C.domain))
        throw new TypeError(`option domain is invalid: ${C.domain}`);
      Y += "; Domain=" + C.domain;
    }
    if (C.path) {
      if (!r.test(C.path))
        throw new TypeError(`option path is invalid: ${C.path}`);
      Y += "; Path=" + C.path;
    }
    if (C.expires) {
      if (!L(C.expires) || !Number.isFinite(C.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${C.expires}`);
      Y += "; Expires=" + C.expires.toUTCString();
    }
    if (
      (C.httpOnly && (Y += "; HttpOnly"),
      C.secure && (Y += "; Secure"),
      C.partitioned && (Y += "; Partitioned"),
      C.priority)
    )
      switch (
        typeof C.priority == "string" ? C.priority.toLowerCase() : void 0
      ) {
        case "low":
          Y += "; Priority=Low";
          break;
        case "medium":
          Y += "; Priority=Medium";
          break;
        case "high":
          Y += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${C.priority}`);
      }
    if (C.sameSite)
      switch (
        typeof C.sameSite == "string" ? C.sameSite.toLowerCase() : C.sameSite
      ) {
        case !0:
        case "strict":
          Y += "; SameSite=Strict";
          break;
        case "lax":
          Y += "; SameSite=Lax";
          break;
        case "none":
          Y += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${C.sameSite}`);
      }
    return Y;
  }
  function R(A) {
    if (A.indexOf("%") === -1) return A;
    try {
      return decodeURIComponent(A);
    } catch {
      return A;
    }
  }
  function L(A) {
    return m.call(A) === "[object Date]";
  }
  return Mn;
}
Vh();
var Qd = "popstate";
function kh(s = {}) {
  function o(r, m) {
    let { pathname: x, search: S, hash: w } = r.location;
    return Rc(
      "",
      { pathname: x, search: S, hash: w },
      (m.state && m.state.usr) || null,
      (m.state && m.state.key) || "default"
    );
  }
  function d(r, m) {
    return typeof m == "string" ? m : Cn(m);
  }
  return Kh(o, d, null, s);
}
function Ae(s, o) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(o);
}
function Mt(s, o) {
  if (!s) {
    typeof console < "u" && console.warn(o);
    try {
      throw new Error(o);
    } catch {}
  }
}
function Zh() {
  return Math.random().toString(36).substring(2, 10);
}
function Vd(s, o) {
  return { usr: s.state, key: s.key, idx: o };
}
function Rc(s, o, d = null, r) {
  return {
    pathname: typeof s == "string" ? s : s.pathname,
    search: "",
    hash: "",
    ...(typeof o == "string" ? _a(o) : o),
    state: d,
    key: (o && o.key) || r || Zh(),
  };
}
function Cn({ pathname: s = "/", search: o = "", hash: d = "" }) {
  return (
    o && o !== "?" && (s += o.charAt(0) === "?" ? o : "?" + o),
    d && d !== "#" && (s += d.charAt(0) === "#" ? d : "#" + d),
    s
  );
}
function _a(s) {
  let o = {};
  if (s) {
    let d = s.indexOf("#");
    d >= 0 && ((o.hash = s.substring(d)), (s = s.substring(0, d)));
    let r = s.indexOf("?");
    r >= 0 && ((o.search = s.substring(r)), (s = s.substring(0, r))),
      s && (o.pathname = s);
  }
  return o;
}
function Kh(s, o, d, r = {}) {
  let { window: m = document.defaultView, v5Compat: x = !1 } = r,
    S = m.history,
    w = "POP",
    g = null,
    h = R();
  h == null && ((h = 0), S.replaceState({ ...S.state, idx: h }, ""));
  function R() {
    return (S.state || { idx: null }).idx;
  }
  function L() {
    w = "POP";
    let V = R(),
      Y = V == null ? null : V - h;
    (h = V), g && g({ action: w, location: q.location, delta: Y });
  }
  function A(V, Y) {
    w = "PUSH";
    let k = Rc(q.location, V, Y);
    h = R() + 1;
    let O = Vd(k, h),
      G = q.createHref(k);
    try {
      S.pushState(O, "", G);
    } catch (K) {
      if (K instanceof DOMException && K.name === "DataCloneError") throw K;
      m.location.assign(G);
    }
    x && g && g({ action: w, location: q.location, delta: 1 });
  }
  function H(V, Y) {
    w = "REPLACE";
    let k = Rc(q.location, V, Y);
    h = R();
    let O = Vd(k, h),
      G = q.createHref(k);
    S.replaceState(O, "", G),
      x && g && g({ action: w, location: q.location, delta: 0 });
  }
  function C(V) {
    return Jh(V);
  }
  let q = {
    get action() {
      return w;
    },
    get location() {
      return s(m, S);
    },
    listen(V) {
      if (g) throw new Error("A history only accepts one active listener");
      return (
        m.addEventListener(Qd, L),
        (g = V),
        () => {
          m.removeEventListener(Qd, L), (g = null);
        }
      );
    },
    createHref(V) {
      return o(m, V);
    },
    createURL: C,
    encodeLocation(V) {
      let Y = C(V);
      return { pathname: Y.pathname, search: Y.search, hash: Y.hash };
    },
    push: A,
    replace: H,
    go(V) {
      return S.go(V);
    },
  };
  return q;
}
function Jh(s, o = !1) {
  let d = "http://localhost";
  typeof window < "u" &&
    (d =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Ae(d, "No window.location.(origin|href) available to create URL");
  let r = typeof s == "string" ? s : Cn(s);
  return (
    (r = r.replace(/ $/, "%20")),
    !o && r.startsWith("//") && (r = d + r),
    new URL(r, d)
  );
}
function $d(s, o, d = "/") {
  return $h(s, o, d, !1);
}
function $h(s, o, d, r) {
  let m = typeof o == "string" ? _a(o) : o,
    x = $t(m.pathname || "/", d);
  if (x == null) return null;
  let S = Wd(s);
  Wh(S);
  let w = null;
  for (let g = 0; w == null && g < S.length; ++g) {
    let h = sy(x);
    w = uy(S[g], h, r);
  }
  return w;
}
function Wd(s, o = [], d = [], r = "") {
  let m = (x, S, w) => {
    let g = {
      relativePath: w === void 0 ? x.path || "" : w,
      caseSensitive: x.caseSensitive === !0,
      childrenIndex: S,
      route: x,
    };
    g.relativePath.startsWith("/") &&
      (Ae(
        g.relativePath.startsWith(r),
        `Absolute route path "${g.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (g.relativePath = g.relativePath.slice(r.length)));
    let h = Jt([r, g.relativePath]),
      R = d.concat(g);
    x.children &&
      x.children.length > 0 &&
      (Ae(
        x.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
      ),
      Wd(x.children, o, R, h)),
      !(x.path == null && !x.index) &&
        o.push({ path: h, score: ay(h, x.index), routesMeta: R });
  };
  return (
    s.forEach((x, S) => {
      var w;
      if (x.path === "" || !((w = x.path) != null && w.includes("?"))) m(x, S);
      else for (let g of Fd(x.path)) m(x, S, g);
    }),
    o
  );
}
function Fd(s) {
  let o = s.split("/");
  if (o.length === 0) return [];
  let [d, ...r] = o,
    m = d.endsWith("?"),
    x = d.replace(/\?$/, "");
  if (r.length === 0) return m ? [x, ""] : [x];
  let S = Fd(r.join("/")),
    w = [];
  return (
    w.push(...S.map((g) => (g === "" ? x : [x, g].join("/")))),
    m && w.push(...S),
    w.map((g) => (s.startsWith("/") && g === "" ? "/" : g))
  );
}
function Wh(s) {
  s.sort((o, d) =>
    o.score !== d.score
      ? d.score - o.score
      : ny(
          o.routesMeta.map((r) => r.childrenIndex),
          d.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Fh = /^:[\w-]+$/,
  Ph = 3,
  Ih = 2,
  ey = 1,
  ty = 10,
  ly = -2,
  kd = (s) => s === "*";
function ay(s, o) {
  let d = s.split("/"),
    r = d.length;
  return (
    d.some(kd) && (r += ly),
    o && (r += Ih),
    d
      .filter((m) => !kd(m))
      .reduce((m, x) => m + (Fh.test(x) ? Ph : x === "" ? ey : ty), r)
  );
}
function ny(s, o) {
  return s.length === o.length && s.slice(0, -1).every((r, m) => r === o[m])
    ? s[s.length - 1] - o[o.length - 1]
    : 0;
}
function uy(s, o, d = !1) {
  let { routesMeta: r } = s,
    m = {},
    x = "/",
    S = [];
  for (let w = 0; w < r.length; ++w) {
    let g = r[w],
      h = w === r.length - 1,
      R = x === "/" ? o : o.slice(x.length) || "/",
      L = ni(
        { path: g.relativePath, caseSensitive: g.caseSensitive, end: h },
        R
      ),
      A = g.route;
    if (
      (!L &&
        h &&
        d &&
        !r[r.length - 1].route.index &&
        (L = ni(
          { path: g.relativePath, caseSensitive: g.caseSensitive, end: !1 },
          R
        )),
      !L)
    )
      return null;
    Object.assign(m, L.params),
      S.push({
        params: m,
        pathname: Jt([x, L.pathname]),
        pathnameBase: oy(Jt([x, L.pathnameBase])),
        route: A,
      }),
      L.pathnameBase !== "/" && (x = Jt([x, L.pathnameBase]));
  }
  return S;
}
function ni(s, o) {
  typeof s == "string" && (s = { path: s, caseSensitive: !1, end: !0 });
  let [d, r] = iy(s.path, s.caseSensitive, s.end),
    m = o.match(d);
  if (!m) return null;
  let x = m[0],
    S = x.replace(/(.)\/+$/, "$1"),
    w = m.slice(1);
  return {
    params: r.reduce((h, { paramName: R, isOptional: L }, A) => {
      if (R === "*") {
        let C = w[A] || "";
        S = x.slice(0, x.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const H = w[A];
      return (
        L && !H ? (h[R] = void 0) : (h[R] = (H || "").replace(/%2F/g, "/")), h
      );
    }, {}),
    pathname: x,
    pathnameBase: S,
    pattern: s,
  };
}
function iy(s, o = !1, d = !0) {
  Mt(
    s === "*" || !s.endsWith("*") || s.endsWith("/*"),
    `Route path "${s}" will be treated as if it were "${s.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let r = [],
    m =
      "^" +
      s
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (S, w, g) => (
            r.push({ paramName: w, isOptional: g != null }),
            g ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    s.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (m += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : d
      ? (m += "\\/*$")
      : s !== "" && s !== "/" && (m += "(?:(?=\\/|$))"),
    [new RegExp(m, o ? void 0 : "i"), r]
  );
}
function sy(s) {
  try {
    return s
      .split("/")
      .map((o) => decodeURIComponent(o).replace(/\//g, "%2F"))
      .join("/");
  } catch (o) {
    return (
      Mt(
        !1,
        `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`
      ),
      s
    );
  }
}
function $t(s, o) {
  if (o === "/") return s;
  if (!s.toLowerCase().startsWith(o.toLowerCase())) return null;
  let d = o.endsWith("/") ? o.length - 1 : o.length,
    r = s.charAt(d);
  return r && r !== "/" ? null : s.slice(d) || "/";
}
function cy(s, o = "/") {
  let {
    pathname: d,
    search: r = "",
    hash: m = "",
  } = typeof s == "string" ? _a(s) : s;
  return {
    pathname: d ? (d.startsWith("/") ? d : ry(d, o)) : o,
    search: dy(r),
    hash: my(m),
  };
}
function ry(s, o) {
  let d = o.replace(/\/+$/, "").split("/");
  return (
    s.split("/").forEach((m) => {
      m === ".." ? d.length > 1 && d.pop() : m !== "." && d.push(m);
    }),
    d.length > 1 ? d.join("/") : "/"
  );
}
function Ac(s, o, d, r) {
  return `Cannot include a '${s}' character in a manually specified \`to.${o}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${d}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function fy(s) {
  return s.filter(
    (o, d) => d === 0 || (o.route.path && o.route.path.length > 0)
  );
}
function Pd(s) {
  let o = fy(s);
  return o.map((d, r) => (r === o.length - 1 ? d.pathname : d.pathnameBase));
}
function Id(s, o, d, r = !1) {
  let m;
  typeof s == "string"
    ? (m = _a(s))
    : ((m = { ...s }),
      Ae(
        !m.pathname || !m.pathname.includes("?"),
        Ac("?", "pathname", "search", m)
      ),
      Ae(
        !m.pathname || !m.pathname.includes("#"),
        Ac("#", "pathname", "hash", m)
      ),
      Ae(!m.search || !m.search.includes("#"), Ac("#", "search", "hash", m)));
  let x = s === "" || m.pathname === "",
    S = x ? "/" : m.pathname,
    w;
  if (S == null) w = d;
  else {
    let L = o.length - 1;
    if (!r && S.startsWith("..")) {
      let A = S.split("/");
      for (; A[0] === ".."; ) A.shift(), (L -= 1);
      m.pathname = A.join("/");
    }
    w = L >= 0 ? o[L] : "/";
  }
  let g = cy(m, w),
    h = S && S !== "/" && S.endsWith("/"),
    R = (x || S === ".") && d.endsWith("/");
  return !g.pathname.endsWith("/") && (h || R) && (g.pathname += "/"), g;
}
var Jt = (s) => s.join("/").replace(/\/\/+/g, "/"),
  oy = (s) => s.replace(/\/+$/, "").replace(/^\/*/, "/"),
  dy = (s) => (!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s),
  my = (s) => (!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s);
function hy(s) {
  return (
    s != null &&
    typeof s.status == "number" &&
    typeof s.statusText == "string" &&
    typeof s.internal == "boolean" &&
    "data" in s
  );
}
var em = ["POST", "PUT", "PATCH", "DELETE"];
new Set(em);
var yy = ["GET", ...em];
new Set(yy);
var Aa = j.createContext(null);
Aa.displayName = "DataRouter";
var ui = j.createContext(null);
ui.displayName = "DataRouterState";
var tm = j.createContext({ isTransitioning: !1 });
tm.displayName = "ViewTransition";
var gy = j.createContext(new Map());
gy.displayName = "Fetchers";
var xy = j.createContext(null);
xy.displayName = "Await";
var Rt = j.createContext(null);
Rt.displayName = "Navigation";
var zn = j.createContext(null);
zn.displayName = "Location";
var Wt = j.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Wt.displayName = "Route";
var zc = j.createContext(null);
zc.displayName = "RouteError";
function py(s, { relative: o } = {}) {
  Ae(
    Dn(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: d, navigator: r } = j.useContext(Rt),
    { hash: m, pathname: x, search: S } = Un(s, { relative: o }),
    w = x;
  return (
    d !== "/" && (w = x === "/" ? d : Jt([d, x])),
    r.createHref({ pathname: w, search: S, hash: m })
  );
}
function Dn() {
  return j.useContext(zn) != null;
}
function Gl() {
  return (
    Ae(
      Dn(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    j.useContext(zn).location
  );
}
var lm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function am(s) {
  j.useContext(Rt).static || j.useLayoutEffect(s);
}
function vy() {
  let { isDataRoute: s } = j.useContext(Wt);
  return s ? Cy() : by();
}
function by() {
  Ae(
    Dn(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let s = j.useContext(Aa),
    { basename: o, navigator: d } = j.useContext(Rt),
    { matches: r } = j.useContext(Wt),
    { pathname: m } = Gl(),
    x = JSON.stringify(Pd(r)),
    S = j.useRef(!1);
  return (
    am(() => {
      S.current = !0;
    }),
    j.useCallback(
      (g, h = {}) => {
        if ((Mt(S.current, lm), !S.current)) return;
        if (typeof g == "number") {
          d.go(g);
          return;
        }
        let R = Id(g, JSON.parse(x), m, h.relative === "path");
        s == null &&
          o !== "/" &&
          (R.pathname = R.pathname === "/" ? o : Jt([o, R.pathname])),
          (h.replace ? d.replace : d.push)(R, h.state, h);
      },
      [o, d, x, m, s]
    )
  );
}
j.createContext(null);
function Un(s, { relative: o } = {}) {
  let { matches: d } = j.useContext(Wt),
    { pathname: r } = Gl(),
    m = JSON.stringify(Pd(d));
  return j.useMemo(() => Id(s, JSON.parse(m), r, o === "path"), [s, m, r, o]);
}
function Sy(s, o) {
  return nm(s, o);
}
function nm(s, o, d, r) {
  var Y;
  Ae(
    Dn(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: m } = j.useContext(Rt),
    { matches: x } = j.useContext(Wt),
    S = x[x.length - 1],
    w = S ? S.params : {},
    g = S ? S.pathname : "/",
    h = S ? S.pathnameBase : "/",
    R = S && S.route;
  {
    let k = (R && R.path) || "";
    um(
      g,
      !R || k.endsWith("*") || k.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${k}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${k}"> to <Route path="${
        k === "/" ? "*" : `${k}/*`
      }">.`
    );
  }
  let L = Gl(),
    A;
  if (o) {
    let k = typeof o == "string" ? _a(o) : o;
    Ae(
      h === "/" || ((Y = k.pathname) == null ? void 0 : Y.startsWith(h)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${h}" but pathname "${k.pathname}" was given in the \`location\` prop.`
    ),
      (A = k);
  } else A = L;
  let H = A.pathname || "/",
    C = H;
  if (h !== "/") {
    let k = h.replace(/^\//, "").split("/");
    C = "/" + H.replace(/^\//, "").split("/").slice(k.length).join("/");
  }
  let q = $d(s, { pathname: C });
  Mt(
    R || q != null,
    `No routes matched location "${A.pathname}${A.search}${A.hash}" `
  ),
    Mt(
      q == null ||
        q[q.length - 1].route.element !== void 0 ||
        q[q.length - 1].route.Component !== void 0 ||
        q[q.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${A.pathname}${A.search}${A.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let V = Ty(
    q &&
      q.map((k) =>
        Object.assign({}, k, {
          params: Object.assign({}, w, k.params),
          pathname: Jt([
            h,
            m.encodeLocation
              ? m.encodeLocation(k.pathname).pathname
              : k.pathname,
          ]),
          pathnameBase:
            k.pathnameBase === "/"
              ? h
              : Jt([
                  h,
                  m.encodeLocation
                    ? m.encodeLocation(k.pathnameBase).pathname
                    : k.pathnameBase,
                ]),
        })
      ),
    x,
    d,
    r
  );
  return o && V
    ? j.createElement(
        zn.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...A,
            },
            navigationType: "POP",
          },
        },
        V
      )
    : V;
}
function Ny() {
  let s = Oy(),
    o = hy(s)
      ? `${s.status} ${s.statusText}`
      : s instanceof Error
      ? s.message
      : JSON.stringify(s),
    d = s instanceof Error ? s.stack : null,
    r = "rgba(200,200,200, 0.5)",
    m = { padding: "0.5rem", backgroundColor: r },
    x = { padding: "2px 4px", backgroundColor: r },
    S = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", s),
    (S = j.createElement(
      j.Fragment,
      null,
      j.createElement("p", null, "💿 Hey developer 👋"),
      j.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        j.createElement("code", { style: x }, "ErrorBoundary"),
        " or",
        " ",
        j.createElement("code", { style: x }, "errorElement"),
        " prop on your route."
      )
    )),
    j.createElement(
      j.Fragment,
      null,
      j.createElement("h2", null, "Unexpected Application Error!"),
      j.createElement("h3", { style: { fontStyle: "italic" } }, o),
      d ? j.createElement("pre", { style: m }, d) : null,
      S
    )
  );
}
var jy = j.createElement(Ny, null),
  Ey = class extends j.Component {
    constructor(s) {
      super(s),
        (this.state = {
          location: s.location,
          revalidation: s.revalidation,
          error: s.error,
        });
    }
    static getDerivedStateFromError(s) {
      return { error: s };
    }
    static getDerivedStateFromProps(s, o) {
      return o.location !== s.location ||
        (o.revalidation !== "idle" && s.revalidation === "idle")
        ? { error: s.error, location: s.location, revalidation: s.revalidation }
        : {
            error: s.error !== void 0 ? s.error : o.error,
            location: o.location,
            revalidation: s.revalidation || o.revalidation,
          };
    }
    componentDidCatch(s, o) {
      console.error(
        "React Router caught the following error during render",
        s,
        o
      );
    }
    render() {
      return this.state.error !== void 0
        ? j.createElement(
            Wt.Provider,
            { value: this.props.routeContext },
            j.createElement(zc.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function wy({ routeContext: s, match: o, children: d }) {
  let r = j.useContext(Aa);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = o.route.id),
    j.createElement(Wt.Provider, { value: s }, d)
  );
}
function Ty(s, o = [], d = null, r = null) {
  if (s == null) {
    if (!d) return null;
    if (d.errors) s = d.matches;
    else if (o.length === 0 && !d.initialized && d.matches.length > 0)
      s = d.matches;
    else return null;
  }
  let m = s,
    x = d == null ? void 0 : d.errors;
  if (x != null) {
    let g = m.findIndex(
      (h) => h.route.id && (x == null ? void 0 : x[h.route.id]) !== void 0
    );
    Ae(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        x
      ).join(",")}`
    ),
      (m = m.slice(0, Math.min(m.length, g + 1)));
  }
  let S = !1,
    w = -1;
  if (d)
    for (let g = 0; g < m.length; g++) {
      let h = m[g];
      if (
        ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (w = g),
        h.route.id)
      ) {
        let { loaderData: R, errors: L } = d,
          A =
            h.route.loader &&
            !R.hasOwnProperty(h.route.id) &&
            (!L || L[h.route.id] === void 0);
        if (h.route.lazy || A) {
          (S = !0), w >= 0 ? (m = m.slice(0, w + 1)) : (m = [m[0]]);
          break;
        }
      }
    }
  return m.reduceRight((g, h, R) => {
    let L,
      A = !1,
      H = null,
      C = null;
    d &&
      ((L = x && h.route.id ? x[h.route.id] : void 0),
      (H = h.route.errorElement || jy),
      S &&
        (w < 0 && R === 0
          ? (um(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (A = !0),
            (C = null))
          : w === R &&
            ((A = !0), (C = h.route.hydrateFallbackElement || null))));
    let q = o.concat(m.slice(0, R + 1)),
      V = () => {
        let Y;
        return (
          L
            ? (Y = H)
            : A
            ? (Y = C)
            : h.route.Component
            ? (Y = j.createElement(h.route.Component, null))
            : h.route.element
            ? (Y = h.route.element)
            : (Y = g),
          j.createElement(wy, {
            match: h,
            routeContext: { outlet: g, matches: q, isDataRoute: d != null },
            children: Y,
          })
        );
      };
    return d && (h.route.ErrorBoundary || h.route.errorElement || R === 0)
      ? j.createElement(Ey, {
          location: d.location,
          revalidation: d.revalidation,
          component: H,
          error: L,
          children: V(),
          routeContext: { outlet: null, matches: q, isDataRoute: !0 },
        })
      : V();
  }, null);
}
function Dc(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function _y(s) {
  let o = j.useContext(Aa);
  return Ae(o, Dc(s)), o;
}
function Ay(s) {
  let o = j.useContext(ui);
  return Ae(o, Dc(s)), o;
}
function My(s) {
  let o = j.useContext(Wt);
  return Ae(o, Dc(s)), o;
}
function Uc(s) {
  let o = My(s),
    d = o.matches[o.matches.length - 1];
  return (
    Ae(
      d.route.id,
      `${s} can only be used on routes that contain a unique "id"`
    ),
    d.route.id
  );
}
function Ry() {
  return Uc("useRouteId");
}
function Oy() {
  var r;
  let s = j.useContext(zc),
    o = Ay("useRouteError"),
    d = Uc("useRouteError");
  return s !== void 0 ? s : (r = o.errors) == null ? void 0 : r[d];
}
function Cy() {
  let { router: s } = _y("useNavigate"),
    o = Uc("useNavigate"),
    d = j.useRef(!1);
  return (
    am(() => {
      d.current = !0;
    }),
    j.useCallback(
      async (m, x = {}) => {
        Mt(d.current, lm),
          d.current &&
            (typeof m == "number"
              ? s.navigate(m)
              : await s.navigate(m, { fromRouteId: o, ...x }));
      },
      [s, o]
    )
  );
}
var Zd = {};
function um(s, o, d) {
  !o && !Zd[s] && ((Zd[s] = !0), Mt(!1, d));
}
j.memo(zy);
function zy({ routes: s, future: o, state: d }) {
  return nm(s, void 0, d, o);
}
function Yl(s) {
  Ae(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Dy({
  basename: s = "/",
  children: o = null,
  location: d,
  navigationType: r = "POP",
  navigator: m,
  static: x = !1,
}) {
  Ae(
    !Dn(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let S = s.replace(/^\/*/, "/"),
    w = j.useMemo(
      () => ({ basename: S, navigator: m, static: x, future: {} }),
      [S, m, x]
    );
  typeof d == "string" && (d = _a(d));
  let {
      pathname: g = "/",
      search: h = "",
      hash: R = "",
      state: L = null,
      key: A = "default",
    } = d,
    H = j.useMemo(() => {
      let C = $t(g, S);
      return C == null
        ? null
        : {
            location: { pathname: C, search: h, hash: R, state: L, key: A },
            navigationType: r,
          };
    }, [S, g, h, R, L, A, r]);
  return (
    Mt(
      H != null,
      `<Router basename="${S}"> is not able to match the URL "${g}${h}${R}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    H == null
      ? null
      : j.createElement(
          Rt.Provider,
          { value: w },
          j.createElement(zn.Provider, { children: o, value: H })
        )
  );
}
function Uy({ children: s, location: o }) {
  return Sy(Oc(s), o);
}
function Oc(s, o = []) {
  let d = [];
  return (
    j.Children.forEach(s, (r, m) => {
      if (!j.isValidElement(r)) return;
      let x = [...o, m];
      if (r.type === j.Fragment) {
        d.push.apply(d, Oc(r.props.children, x));
        return;
      }
      Ae(
        r.type === Yl,
        `[${
          typeof r.type == "string" ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ae(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        );
      let S = {
        id: r.props.id || x.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (S.children = Oc(r.props.children, x)), d.push(S);
    }),
    d
  );
}
var li = "get",
  ai = "application/x-www-form-urlencoded";
function ii(s) {
  return s != null && typeof s.tagName == "string";
}
function Hy(s) {
  return ii(s) && s.tagName.toLowerCase() === "button";
}
function By(s) {
  return ii(s) && s.tagName.toLowerCase() === "form";
}
function Ly(s) {
  return ii(s) && s.tagName.toLowerCase() === "input";
}
function qy(s) {
  return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
}
function Yy(s, o) {
  return s.button === 0 && (!o || o === "_self") && !qy(s);
}
var Fu = null;
function Gy() {
  if (Fu === null)
    try {
      new FormData(document.createElement("form"), 0), (Fu = !1);
    } catch {
      Fu = !0;
    }
  return Fu;
}
var Xy = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Mc(s) {
  return s != null && !Xy.has(s)
    ? (Mt(
        !1,
        `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ai}"`
      ),
      null)
    : s;
}
function Qy(s, o) {
  let d, r, m, x, S;
  if (By(s)) {
    let w = s.getAttribute("action");
    (r = w ? $t(w, o) : null),
      (d = s.getAttribute("method") || li),
      (m = Mc(s.getAttribute("enctype")) || ai),
      (x = new FormData(s));
  } else if (Hy(s) || (Ly(s) && (s.type === "submit" || s.type === "image"))) {
    let w = s.form;
    if (w == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let g = s.getAttribute("formaction") || w.getAttribute("action");
    if (
      ((r = g ? $t(g, o) : null),
      (d = s.getAttribute("formmethod") || w.getAttribute("method") || li),
      (m =
        Mc(s.getAttribute("formenctype")) ||
        Mc(w.getAttribute("enctype")) ||
        ai),
      (x = new FormData(w, s)),
      !Gy())
    ) {
      let { name: h, type: R, value: L } = s;
      if (R === "image") {
        let A = h ? `${h}.` : "";
        x.append(`${A}x`, "0"), x.append(`${A}y`, "0");
      } else h && x.append(h, L);
    }
  } else {
    if (ii(s))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (d = li), (r = null), (m = ai), (S = s);
  }
  return (
    x && m === "text/plain" && ((S = x), (x = void 0)),
    { action: r, method: d.toLowerCase(), encType: m, formData: x, body: S }
  );
}
function Hc(s, o) {
  if (s === !1 || s === null || typeof s > "u") throw new Error(o);
}
async function Vy(s, o) {
  if (s.id in o) return o[s.id];
  try {
    let d = await import(s.module);
    return (o[s.id] = d), d;
  } catch (d) {
    return (
      console.error(
        `Error loading route module \`${s.module}\`, reloading page...`
      ),
      console.error(d),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function ky(s) {
  return s == null
    ? !1
    : s.href == null
    ? s.rel === "preload" &&
      typeof s.imageSrcSet == "string" &&
      typeof s.imageSizes == "string"
    : typeof s.rel == "string" && typeof s.href == "string";
}
async function Zy(s, o, d) {
  let r = await Promise.all(
    s.map(async (m) => {
      let x = o.routes[m.route.id];
      if (x) {
        let S = await Vy(x, d);
        return S.links ? S.links() : [];
      }
      return [];
    })
  );
  return Wy(
    r
      .flat(1)
      .filter(ky)
      .filter((m) => m.rel === "stylesheet" || m.rel === "preload")
      .map((m) =>
        m.rel === "stylesheet"
          ? { ...m, rel: "prefetch", as: "style" }
          : { ...m, rel: "prefetch" }
      )
  );
}
function Kd(s, o, d, r, m, x) {
  let S = (g, h) => (d[h] ? g.route.id !== d[h].route.id : !0),
    w = (g, h) => {
      var R;
      return (
        d[h].pathname !== g.pathname ||
        (((R = d[h].route.path) == null ? void 0 : R.endsWith("*")) &&
          d[h].params["*"] !== g.params["*"])
      );
    };
  return x === "assets"
    ? o.filter((g, h) => S(g, h) || w(g, h))
    : x === "data"
    ? o.filter((g, h) => {
        var L;
        let R = r.routes[g.route.id];
        if (!R || !R.hasLoader) return !1;
        if (S(g, h) || w(g, h)) return !0;
        if (g.route.shouldRevalidate) {
          let A = g.route.shouldRevalidate({
            currentUrl: new URL(m.pathname + m.search + m.hash, window.origin),
            currentParams: ((L = d[0]) == null ? void 0 : L.params) || {},
            nextUrl: new URL(s, window.origin),
            nextParams: g.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof A == "boolean") return A;
        }
        return !0;
      })
    : [];
}
function Ky(s, o, { includeHydrateFallback: d } = {}) {
  return Jy(
    s
      .map((r) => {
        let m = o.routes[r.route.id];
        if (!m) return [];
        let x = [m.module];
        return (
          m.clientActionModule && (x = x.concat(m.clientActionModule)),
          m.clientLoaderModule && (x = x.concat(m.clientLoaderModule)),
          d &&
            m.hydrateFallbackModule &&
            (x = x.concat(m.hydrateFallbackModule)),
          m.imports && (x = x.concat(m.imports)),
          x
        );
      })
      .flat(1)
  );
}
function Jy(s) {
  return [...new Set(s)];
}
function $y(s) {
  let o = {},
    d = Object.keys(s).sort();
  for (let r of d) o[r] = s[r];
  return o;
}
function Wy(s, o) {
  let d = new Set();
  return (
    new Set(o),
    s.reduce((r, m) => {
      let x = JSON.stringify($y(m));
      return d.has(x) || (d.add(x), r.push({ key: x, link: m })), r;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Fy = new Set([100, 101, 204, 205]);
function Py(s, o) {
  let d =
    typeof s == "string"
      ? new URL(
          s,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : s;
  return (
    d.pathname === "/"
      ? (d.pathname = "_root.data")
      : o && $t(d.pathname, o) === "/"
      ? (d.pathname = `${o.replace(/\/$/, "")}/_root.data`)
      : (d.pathname = `${d.pathname.replace(/\/$/, "")}.data`),
    d
  );
}
function im() {
  let s = j.useContext(Aa);
  return (
    Hc(
      s,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    s
  );
}
function Iy() {
  let s = j.useContext(ui);
  return (
    Hc(
      s,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    s
  );
}
var Bc = j.createContext(void 0);
Bc.displayName = "FrameworkContext";
function sm() {
  let s = j.useContext(Bc);
  return (
    Hc(s, "You must render this element inside a <HydratedRouter> element"), s
  );
}
function eg(s, o) {
  let d = j.useContext(Bc),
    [r, m] = j.useState(!1),
    [x, S] = j.useState(!1),
    {
      onFocus: w,
      onBlur: g,
      onMouseEnter: h,
      onMouseLeave: R,
      onTouchStart: L,
    } = o,
    A = j.useRef(null);
  j.useEffect(() => {
    if ((s === "render" && S(!0), s === "viewport")) {
      let q = (Y) => {
          Y.forEach((k) => {
            S(k.isIntersecting);
          });
        },
        V = new IntersectionObserver(q, { threshold: 0.5 });
      return (
        A.current && V.observe(A.current),
        () => {
          V.disconnect();
        }
      );
    }
  }, [s]),
    j.useEffect(() => {
      if (r) {
        let q = setTimeout(() => {
          S(!0);
        }, 100);
        return () => {
          clearTimeout(q);
        };
      }
    }, [r]);
  let H = () => {
      m(!0);
    },
    C = () => {
      m(!1), S(!1);
    };
  return d
    ? s !== "intent"
      ? [x, A, {}]
      : [
          x,
          A,
          {
            onFocus: Rn(w, H),
            onBlur: Rn(g, C),
            onMouseEnter: Rn(h, H),
            onMouseLeave: Rn(R, C),
            onTouchStart: Rn(L, H),
          },
        ]
    : [!1, A, {}];
}
function Rn(s, o) {
  return (d) => {
    s && s(d), d.defaultPrevented || o(d);
  };
}
function tg({ page: s, ...o }) {
  let { router: d } = im(),
    r = j.useMemo(() => $d(d.routes, s, d.basename), [d.routes, s, d.basename]);
  return r ? j.createElement(ag, { page: s, matches: r, ...o }) : null;
}
function lg(s) {
  let { manifest: o, routeModules: d } = sm(),
    [r, m] = j.useState([]);
  return (
    j.useEffect(() => {
      let x = !1;
      return (
        Zy(s, o, d).then((S) => {
          x || m(S);
        }),
        () => {
          x = !0;
        }
      );
    }, [s, o, d]),
    r
  );
}
function ag({ page: s, matches: o, ...d }) {
  let r = Gl(),
    { manifest: m, routeModules: x } = sm(),
    { basename: S } = im(),
    { loaderData: w, matches: g } = Iy(),
    h = j.useMemo(() => Kd(s, o, g, m, r, "data"), [s, o, g, m, r]),
    R = j.useMemo(() => Kd(s, o, g, m, r, "assets"), [s, o, g, m, r]),
    L = j.useMemo(() => {
      if (s === r.pathname + r.search + r.hash) return [];
      let C = new Set(),
        q = !1;
      if (
        (o.forEach((Y) => {
          var O;
          let k = m.routes[Y.route.id];
          !k ||
            !k.hasLoader ||
            ((!h.some((G) => G.route.id === Y.route.id) &&
              Y.route.id in w &&
              (O = x[Y.route.id]) != null &&
              O.shouldRevalidate) ||
            k.hasClientLoader
              ? (q = !0)
              : C.add(Y.route.id));
        }),
        C.size === 0)
      )
        return [];
      let V = Py(s, S);
      return (
        q &&
          C.size > 0 &&
          V.searchParams.set(
            "_routes",
            o
              .filter((Y) => C.has(Y.route.id))
              .map((Y) => Y.route.id)
              .join(",")
          ),
        [V.pathname + V.search]
      );
    }, [S, w, r, m, h, o, s, x]),
    A = j.useMemo(() => Ky(R, m), [R, m]),
    H = lg(R);
  return j.createElement(
    j.Fragment,
    null,
    L.map((C) =>
      j.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...d,
      })
    ),
    A.map((C) =>
      j.createElement("link", { key: C, rel: "modulepreload", href: C, ...d })
    ),
    H.map(({ key: C, link: q }) => j.createElement("link", { key: C, ...q }))
  );
}
function ng(...s) {
  return (o) => {
    s.forEach((d) => {
      typeof d == "function" ? d(o) : d != null && (d.current = o);
    });
  };
}
var cm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  cm && (window.__reactRouterVersion = "7.6.2");
} catch {}
function ug({ basename: s, children: o, window: d }) {
  let r = j.useRef();
  r.current == null && (r.current = kh({ window: d, v5Compat: !0 }));
  let m = r.current,
    [x, S] = j.useState({ action: m.action, location: m.location }),
    w = j.useCallback(
      (g) => {
        j.startTransition(() => S(g));
      },
      [S]
    );
  return (
    j.useLayoutEffect(() => m.listen(w), [m, w]),
    j.createElement(Dy, {
      basename: s,
      children: o,
      location: x.location,
      navigationType: x.action,
      navigator: m,
    })
  );
}
var rm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  fm = j.forwardRef(function (
    {
      onClick: o,
      discover: d = "render",
      prefetch: r = "none",
      relative: m,
      reloadDocument: x,
      replace: S,
      state: w,
      target: g,
      to: h,
      preventScrollReset: R,
      viewTransition: L,
      ...A
    },
    H
  ) {
    let { basename: C } = j.useContext(Rt),
      q = typeof h == "string" && rm.test(h),
      V,
      Y = !1;
    if (typeof h == "string" && q && ((V = h), cm))
      try {
        let te = new URL(window.location.href),
          je = h.startsWith("//") ? new URL(te.protocol + h) : new URL(h),
          $e = $t(je.pathname, C);
        je.origin === te.origin && $e != null
          ? (h = $e + je.search + je.hash)
          : (Y = !0);
      } catch {
        Mt(
          !1,
          `<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let k = py(h, { relative: m }),
      [O, G, K] = eg(r, A),
      se = cg(h, {
        replace: S,
        state: w,
        target: g,
        preventScrollReset: R,
        relative: m,
        viewTransition: L,
      });
    function F(te) {
      o && o(te), te.defaultPrevented || se(te);
    }
    let ie = j.createElement("a", {
      ...A,
      ...K,
      href: V || k,
      onClick: Y || x ? o : F,
      ref: ng(H, G),
      target: g,
      "data-discover": !q && d === "render" ? "true" : void 0,
    });
    return O && !q
      ? j.createElement(j.Fragment, null, ie, j.createElement(tg, { page: k }))
      : ie;
  });
fm.displayName = "Link";
var On = j.forwardRef(function (
  {
    "aria-current": o = "page",
    caseSensitive: d = !1,
    className: r = "",
    end: m = !1,
    style: x,
    to: S,
    viewTransition: w,
    children: g,
    ...h
  },
  R
) {
  let L = Un(S, { relative: h.relative }),
    A = Gl(),
    H = j.useContext(ui),
    { navigator: C, basename: q } = j.useContext(Rt),
    V = H != null && mg(L) && w === !0,
    Y = C.encodeLocation ? C.encodeLocation(L).pathname : L.pathname,
    k = A.pathname,
    O =
      H && H.navigation && H.navigation.location
        ? H.navigation.location.pathname
        : null;
  d ||
    ((k = k.toLowerCase()),
    (O = O ? O.toLowerCase() : null),
    (Y = Y.toLowerCase())),
    O && q && (O = $t(O, q) || O);
  const G = Y !== "/" && Y.endsWith("/") ? Y.length - 1 : Y.length;
  let K = k === Y || (!m && k.startsWith(Y) && k.charAt(G) === "/"),
    se =
      O != null &&
      (O === Y || (!m && O.startsWith(Y) && O.charAt(Y.length) === "/")),
    F = { isActive: K, isPending: se, isTransitioning: V },
    ie = K ? o : void 0,
    te;
  typeof r == "function"
    ? (te = r(F))
    : (te = [
        r,
        K ? "active" : null,
        se ? "pending" : null,
        V ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let je = typeof x == "function" ? x(F) : x;
  return j.createElement(
    fm,
    {
      ...h,
      "aria-current": ie,
      className: te,
      ref: R,
      style: je,
      to: S,
      viewTransition: w,
    },
    typeof g == "function" ? g(F) : g
  );
});
On.displayName = "NavLink";
var ig = j.forwardRef(
  (
    {
      discover: s = "render",
      fetcherKey: o,
      navigate: d,
      reloadDocument: r,
      replace: m,
      state: x,
      method: S = li,
      action: w,
      onSubmit: g,
      relative: h,
      preventScrollReset: R,
      viewTransition: L,
      ...A
    },
    H
  ) => {
    let C = og(),
      q = dg(w, { relative: h }),
      V = S.toLowerCase() === "get" ? "get" : "post",
      Y = typeof w == "string" && rm.test(w),
      k = (O) => {
        if ((g && g(O), O.defaultPrevented)) return;
        O.preventDefault();
        let G = O.nativeEvent.submitter,
          K = (G == null ? void 0 : G.getAttribute("formmethod")) || S;
        C(G || O.currentTarget, {
          fetcherKey: o,
          method: K,
          navigate: d,
          replace: m,
          state: x,
          relative: h,
          preventScrollReset: R,
          viewTransition: L,
        });
      };
    return j.createElement("form", {
      ref: H,
      method: V,
      action: q,
      onSubmit: r ? g : k,
      ...A,
      "data-discover": !Y && s === "render" ? "true" : void 0,
    });
  }
);
ig.displayName = "Form";
function sg(s) {
  return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function om(s) {
  let o = j.useContext(Aa);
  return Ae(o, sg(s)), o;
}
function cg(
  s,
  {
    target: o,
    replace: d,
    state: r,
    preventScrollReset: m,
    relative: x,
    viewTransition: S,
  } = {}
) {
  let w = vy(),
    g = Gl(),
    h = Un(s, { relative: x });
  return j.useCallback(
    (R) => {
      if (Yy(R, o)) {
        R.preventDefault();
        let L = d !== void 0 ? d : Cn(g) === Cn(h);
        w(s, {
          replace: L,
          state: r,
          preventScrollReset: m,
          relative: x,
          viewTransition: S,
        });
      }
    },
    [g, w, h, d, r, o, s, m, x, S]
  );
}
var rg = 0,
  fg = () => `__${String(++rg)}__`;
function og() {
  let { router: s } = om("useSubmit"),
    { basename: o } = j.useContext(Rt),
    d = Ry();
  return j.useCallback(
    async (r, m = {}) => {
      let { action: x, method: S, encType: w, formData: g, body: h } = Qy(r, o);
      if (m.navigate === !1) {
        let R = m.fetcherKey || fg();
        await s.fetch(R, d, m.action || x, {
          preventScrollReset: m.preventScrollReset,
          formData: g,
          body: h,
          formMethod: m.method || S,
          formEncType: m.encType || w,
          flushSync: m.flushSync,
        });
      } else
        await s.navigate(m.action || x, {
          preventScrollReset: m.preventScrollReset,
          formData: g,
          body: h,
          formMethod: m.method || S,
          formEncType: m.encType || w,
          replace: m.replace,
          state: m.state,
          fromRouteId: d,
          flushSync: m.flushSync,
          viewTransition: m.viewTransition,
        });
    },
    [s, o, d]
  );
}
function dg(s, { relative: o } = {}) {
  let { basename: d } = j.useContext(Rt),
    r = j.useContext(Wt);
  Ae(r, "useFormAction must be used inside a RouteContext");
  let [m] = r.matches.slice(-1),
    x = { ...Un(s || ".", { relative: o }) },
    S = Gl();
  if (s == null) {
    x.search = S.search;
    let w = new URLSearchParams(x.search),
      g = w.getAll("index");
    if (g.some((R) => R === "")) {
      w.delete("index"),
        g.filter((L) => L).forEach((L) => w.append("index", L));
      let R = w.toString();
      x.search = R ? `?${R}` : "";
    }
  }
  return (
    (!s || s === ".") &&
      m.route.index &&
      (x.search = x.search ? x.search.replace(/^\?/, "?index&") : "?index"),
    d !== "/" && (x.pathname = x.pathname === "/" ? d : Jt([d, x.pathname])),
    Cn(x)
  );
}
function mg(s, o = {}) {
  let d = j.useContext(tm);
  Ae(
    d != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = om("useViewTransitionState"),
    m = Un(s, { relative: o.relative });
  if (!d.isTransitioning) return !1;
  let x = $t(d.currentLocation.pathname, r) || d.currentLocation.pathname,
    S = $t(d.nextLocation.pathname, r) || d.nextLocation.pathname;
  return ni(m.pathname, S) != null || ni(m.pathname, x) != null;
}
[...Fy];
const hg = ({ listId: s, onClose: o }) => {
    const [d, r] = j.useState([]),
      [m, x] = j.useState(null),
      [S, w] = j.useState(!1),
      [g, h] = j.useState({ page: 1, rowsPerPage: 10, total: 0 }),
      [R, L] = j.useState("all"),
      A = async () => {
        try {
          w(!0);
          const G = await (
            await fetch(
              `/CRM/backend/routes/api.php/api/results?csv_list_id=${s}&limit=1000000`
            )
          ).json();
          r(Array.isArray(G.data) ? G.data : []),
            h((K) => ({
              ...K,
              total: Array.isArray(G.data) ? G.data.length : 0,
            }));
        } catch {
          r([]), x({ type: "error", message: "Failed to load list emails" });
        } finally {
          w(!1);
        }
      },
      H = (O) =>
        (O.validation_response || "").toLowerCase().includes("timeout") ||
        (O.validation_response || "")
          .toLowerCase()
          .includes("connection refused") ||
        (O.validation_response || "")
          .toLowerCase()
          .includes("failed to connect"),
      C = d.filter((O) =>
        R === "all"
          ? !0
          : R === "valid"
          ? O.domain_status === 1
          : R === "invalid"
          ? O.domain_status === 0 && !H(O)
          : R === "timeout"
          ? H(O)
          : !0
      ),
      q = C.slice((g.page - 1) * g.rowsPerPage, g.page * g.rowsPerPage);
    j.useEffect(() => {
      A();
    }, [s]),
      j.useEffect(() => {
        h((O) => ({ ...O, page: 1, total: C.length }));
      }, [R]);
    const V = ({ status: O, onClose: G }) =>
      O &&
      i.jsxs("div", {
        className: `
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            O.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `,
        style: {
          minWidth: 250,
          maxWidth: 400,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
          background:
            O.type === "error"
              ? "rgba(255, 0, 0, 0.29)"
              : "rgba(0, 200, 83, 0.29)",
          borderRadius: "16px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        },
        role: "alert",
        children: [
          i.jsx("i", {
            className: `fas text-lg ${
              O.type === "error"
                ? "fa-exclamation-circle text-red-500"
                : "fa-check-circle text-green-500"
            }`,
          }),
          i.jsx("span", { className: "flex-1", children: O.message }),
          i.jsx("button", {
            onClick: G,
            className:
              "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
            "aria-label": "Close",
            children: i.jsx("i", { className: "fas fa-times" }),
          }),
        ],
      });
    j.useEffect(() => {
      if (m) {
        const O = setTimeout(() => x(null), 4e3);
        return () => clearTimeout(O);
      }
    }, [m]);
    const Y = (O) => {
        let G = [];
        if (
          (O === "valid"
            ? (G = d.filter((je) => je.domain_status === 1))
            : O === "invalid"
            ? (G = d.filter((je) => je.domain_status === 0 && !H(je)))
            : O === "timeout"
            ? (G = d.filter(H))
            : (G = d),
          G.length === 0)
        ) {
          x({ type: "error", message: "No emails found for export." });
          return;
        }
        const se = [
            "EMAILS",
            ...G.map((je) => `"${je.email.replace(/"/g, '""')}"`),
          ].join(`
`),
          F = new Blob([se], { type: "text/csv" }),
          ie = URL.createObjectURL(F),
          te = document.createElement("a");
        (te.href = ie),
          (te.download = `${O}_emails.csv`),
          document.body.appendChild(te),
          te.click(),
          document.body.removeChild(te),
          URL.revokeObjectURL(ie),
          x({ type: "success", message: "Exported successfully." });
      },
      k = (O) =>
        O === "valid"
          ? d.filter((G) => G.domain_status === 1).length
          : O === "invalid"
          ? d.filter((G) => G.domain_status === 0 && !H(G)).length
          : O === "timeout"
          ? d.filter(H).length
          : d.length;
    return i.jsx("div", {
      className:
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
      children: i.jsxs("div", {
        className:
          "bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col",
        onClick: (O) => O.stopPropagation(),
        children: [
          i.jsxs("div", {
            className: "p-6 pb-0 flex justify-between items-start",
            children: [
              i.jsxs("div", {
                children: [
                  i.jsx("h3", {
                    className: "text-2xl font-bold text-gray-800 mb-2",
                    children: "Email List Details",
                  }),
                  i.jsxs("p", {
                    className: "text-gray-600",
                    children: ["List ID: ", s],
                  }),
                ],
              }),
              i.jsx("button", {
                className:
                  "text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100",
                onClick: o,
                "aria-label": "Close",
                children: i.jsx("i", { className: "fas fa-times text-xl" }),
              }),
            ],
          }),
          i.jsx(V, { status: m, onClose: () => x(null) }),
          i.jsx("div", {
            className: "p-6 pt-4 border-b border-gray-200",
            children: i.jsxs("div", {
              className:
                "flex flex-wrap items-center justify-between gap-4 mb-4",
              children: [
                i.jsxs("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    i.jsxs("button", {
                      onClick: () => L("all"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        R === "all"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["All (", k("all"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => L("valid"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        R === "valid"
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Valid (", k("valid"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => L("invalid"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        R === "invalid"
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Invalid (", k("invalid"), ")"],
                    }),
                    i.jsxs("button", {
                      onClick: () => L("timeout"),
                      className: `px-4 py-2 rounded-lg font-medium text-sm ${
                        R === "timeout"
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`,
                      children: ["Timeout (", k("timeout"), ")"],
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    i.jsxs("button", {
                      onClick: () => Y("valid"),
                      className:
                        "px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Valid",
                      ],
                    }),
                    i.jsxs("button", {
                      onClick: () => Y("invalid"),
                      className:
                        "px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Invalid",
                      ],
                    }),
                    i.jsxs("button", {
                      onClick: () => Y("timeout"),
                      className:
                        "px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium text-sm hover:bg-yellow-700 flex items-center gap-2",
                      children: [
                        i.jsx("i", { className: "fas fa-file-export" }),
                        "Export Timeout",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          i.jsx("div", {
            className: "overflow-auto flex-1",
            children: i.jsxs("table", {
              className: "min-w-full divide-y divide-gray-200",
              children: [
                i.jsx("thead", {
                  className: "bg-gray-50 sticky top-0",
                  children: i.jsxs("tr", {
                    children: [
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "ID",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Email",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Account",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Domain",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Verified",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Status",
                      }),
                      i.jsx("th", {
                        className:
                          "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Response",
                      }),
                    ],
                  }),
                }),
                i.jsx("tbody", {
                  className: "bg-white divide-y divide-gray-200",
                  children: S
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 7,
                          className: "px-6 py-8 text-center",
                          children: i.jsx("div", {
                            className: "flex justify-center",
                            children: i.jsx("div", {
                              className:
                                "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500",
                            }),
                          }),
                        }),
                      })
                    : q.length === 0
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 7,
                          className: "px-6 py-8 text-center text-gray-500",
                          children:
                            "No emails found matching the current filter",
                        }),
                      })
                    : q.map((O) =>
                        i.jsxs(
                          "tr",
                          {
                            className: "hover:bg-gray-50",
                            children: [
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: O.id,
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                children: O.raw_emailid || O.email || "N/A",
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: O.sp_account,
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                children: O.sp_domain,
                              }),
                              i.jsx("td", {
                                className: "px-6 py-4 whitespace-nowrap",
                                children: i.jsx("span", {
                                  className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    O.domain_verified == 1
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`,
                                  children:
                                    O.domain_verified == 1
                                      ? "Verified"
                                      : "Invalid",
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-6 py-4 whitespace-nowrap",
                                children: i.jsx("span", {
                                  className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    O.domain_status == 1
                                      ? "bg-blue-100 text-blue-800"
                                      : O.domain_status == 0
                                      ? "bg-orange-100 text-red-800"
                                      : H(O)
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-orange-100 text-red-800"
                                  }`,
                                  children:
                                    O.domain_status == 1
                                      ? "Correct"
                                      : O.domain_status == 0
                                      ? "Wrong"
                                      : H(O)
                                      ? "Timeout"
                                      : "Wrong",
                                }),
                              }),
                              i.jsx("td", {
                                className:
                                  "px-6 py-4 text-sm text-gray-500 max-w-xs truncate",
                                children: O.validation_response || "N/A",
                              }),
                            ],
                          },
                          O.id
                        )
                      ),
                }),
              ],
            }),
          }),
          i.jsxs("div", {
            className:
              "px-6 py-4 border-t border-gray-200 flex items-center justify-between",
            children: [
              i.jsxs("div", {
                className: "flex-1 flex justify-between sm:hidden",
                children: [
                  i.jsx("button", {
                    onClick: () => h((O) => ({ ...O, page: O.page - 1 })),
                    disabled: g.page === 1,
                    className:
                      "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50",
                    children: "Previous",
                  }),
                  i.jsx("button", {
                    onClick: () => h((O) => ({ ...O, page: O.page + 1 })),
                    disabled: g.page >= Math.ceil(C.length / g.rowsPerPage),
                    className:
                      "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50",
                    children: "Next",
                  }),
                ],
              }),
              i.jsxs("div", {
                className:
                  "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between",
                children: [
                  i.jsx("div", {
                    children: i.jsxs("p", {
                      className: "text-sm text-gray-700",
                      children: [
                        "Showing",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: (g.page - 1) * g.rowsPerPage + 1,
                        }),
                        " ",
                        "to",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: Math.min(g.page * g.rowsPerPage, C.length),
                        }),
                        " ",
                        "of ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: C.length,
                        }),
                        " ",
                        "results",
                      ],
                    }),
                  }),
                  i.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          i.jsx("label", {
                            htmlFor: "rows-per-page",
                            className: "mr-2 text-sm text-gray-700",
                            children: "Rows per page:",
                          }),
                          i.jsx("select", {
                            id: "rows-per-page",
                            value: g.rowsPerPage,
                            onChange: (O) => {
                              h({
                                page: 1,
                                rowsPerPage: Number(O.target.value),
                                total: C.length,
                              });
                            },
                            className:
                              "border border-gray-300 rounded-md shadow-sm py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                            children: [10, 25, 50, 100, 200].map((O) =>
                              i.jsx("option", { value: O, children: O }, O)
                            ),
                          }),
                        ],
                      }),
                      i.jsxs("nav", {
                        className:
                          "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                        "aria-label": "Pagination",
                        children: [
                          i.jsxs("button", {
                            onClick: () => h((O) => ({ ...O, page: 1 })),
                            disabled: g.page === 1,
                            className:
                              "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "First",
                              }),
                              i.jsx("i", {
                                className: "fas fa-angle-double-left",
                              }),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((O) => ({ ...O, page: O.page - 1 })),
                            disabled: g.page === 1,
                            className:
                              "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Previous",
                              }),
                              i.jsx("i", { className: "fas fa-angle-left" }),
                            ],
                          }),
                          i.jsxs("span", {
                            className:
                              "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700",
                            children: [
                              "Page ",
                              g.page,
                              " of",
                              " ",
                              Math.ceil(C.length / g.rowsPerPage),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((O) => ({ ...O, page: O.page + 1 })),
                            disabled:
                              g.page >= Math.ceil(C.length / g.rowsPerPage),
                            className:
                              "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Next",
                              }),
                              i.jsx("i", { className: "fas fa-angle-right" }),
                            ],
                          }),
                          i.jsxs("button", {
                            onClick: () =>
                              h((O) => ({
                                ...O,
                                page: Math.ceil(C.length / g.rowsPerPage),
                              })),
                            disabled:
                              g.page >= Math.ceil(C.length / g.rowsPerPage),
                            className:
                              "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50",
                            children: [
                              i.jsx("span", {
                                className: "sr-only",
                                children: "Last",
                              }),
                              i.jsx("i", {
                                className: "fas fa-angle-double-right",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  yg = async () => {
    try {
      return await (
        await fetch(
          "/CRM/backend/includes/retry_smtp.php?progress=1"
        )
      ).json();
    } catch {
      return { processed: 0, total: 0, percent: 0, stage: "error" };
    }
  },
  gg = () => {
    const [s, o] = j.useState({ listName: "", fileName: "", csvFile: null }),
      [d, r] = j.useState(null),
      [m, x] = j.useState(!1),
      [S, w] = j.useState({
        processed: 0,
        total: 0,
        percent: 0,
        stage: "domain",
      }),
      [g, h] = j.useState(!1),
      [R, L] = j.useState([]),
      [A, H] = j.useState({ page: 1, rowsPerPage: 10, total: 0, search: "" }),
      [C, q] = j.useState(null),
      V = j.useRef(null),
      Y = j.useRef(),
      [k, O] = j.useState(0),
      G = async () => {
        try {
          const X = new URLSearchParams({
              page: A.page,
              limit: A.rowsPerPage,
              search: A.search,
            }),
            Q = await (
              await fetch(
                `/CRM/backend/includes/get_csv_list.php?${X}`
              )
            ).json();
          L(Array.isArray(Q.data) ? Q.data : []),
            H((W) => ({ ...W, total: Q.total || 0 }));
        } catch {
          L([]),
            H((T) => ({ ...T, total: 0 })),
            r({ type: "error", message: "Failed to load lists" });
        }
      },
      K = async () => {
        try {
          const T = await (
            await fetch(
              "/CRM/backend/includes/get_results.php?retry_failed=1"
            )
          ).json();
          T.status === "success" ? O(T.total) : O(0);
        } catch {
          O(0);
        }
      };
    j.useEffect(() => {
      K();
    }, [R]),
      j.useEffect(() => {
        const X = setInterval(() => {
          G(), K();
        }, 5e3);
        return () => clearInterval(X);
      }, []),
      j.useEffect(() => {
        G();
      }, [A.page, A.rowsPerPage, A.search]);
    const se = (X) => {
        const { name: T, value: Q } = X.target;
        o((W) => ({ ...W, [T]: Q }));
      },
      F = (X) => {
        o((T) => ({ ...T, csvFile: X.target.files[0] }));
      },
      ie = async (X) => {
        if (
          (X.preventDefault(),
          r(null),
          !s.csvFile || !s.listName || !s.fileName)
        ) {
          r({ type: "error", message: "All fields are required" });
          return;
        }
        const T = new FormData();
        T.append("csv_file", s.csvFile),
          T.append("list_name", s.listName),
          T.append("file_name", s.fileName);
        try {
          x(!0);
          const W = await (
            await fetch(
              "/CRM/backend/routes/api.php/api/upload",
              { method: "POST", body: T }
            )
          ).json();
          W.status === "success"
            ? (r({
                type: "success",
                message: W.message || "Upload successful",
              }),
              h(!0),
              je(),
              o({ listName: "", fileName: "", csvFile: null }),
              G(),
              K())
            : r({ type: "error", message: W.message || "Upload failed" });
        } catch {
          r({ type: "error", message: "Network error" });
        } finally {
          x(!1);
        }
      },
      te = async (X, T) => {
        try {
          const Q = `/CRM/backend/includes/get_results.php?export=${X}&csv_list_id=${T}`,
            ye = await (await fetch(Q)).blob(),
            p = window.URL.createObjectURL(ye),
            B = document.createElement("a");
          (B.href = p),
            (B.download = `${X}_emails_list_${T}.csv`),
            document.body.appendChild(B),
            B.click(),
            B.remove(),
            r({ type: "success", message: `Exported ${X} emails list` });
        } catch {
          r({ type: "error", message: `Failed to export ${X} emails` });
        }
      },
      je = () => {
        V.current && clearInterval(V.current),
          (V.current = setInterval(async () => {
            try {
              const T = await (await fetch("/api/verify/progress")).json();
              w(T),
                G(),
                T.total > 0 &&
                  T.processed >= T.total &&
                  (clearInterval(V.current),
                  setTimeout(() => {
                    h(!1),
                      r({
                        type: "success",
                        message: "Verification completed!",
                      }),
                      G();
                  }, 1e3));
            } catch {
              clearInterval(V.current), h(!1);
            }
          }, 2e3));
      },
      $e = ({ status: X, onClose: T }) =>
        X &&
        i.jsxs("div", {
          className: `
          fixed top-6 left-1/2 transform -translate-x-1/2 z-50
          px-6 py-3 rounded-xl shadow text-base font-semibold
          flex items-center gap-3
          transition-all duration-300
          backdrop-blur-md
          ${
            X.type === "error"
              ? "bg-red-200/60 border border-red-400 text-red-800"
              : "bg-green-200/60 border border-green-400 text-green-800"
          }
        `,
          style: {
            minWidth: 250,
            maxWidth: 400,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
            background:
              X.type === "error"
                ? "rgba(255, 0, 0, 0.29)"
                : "rgba(0, 200, 83, 0.29)",
            borderRadius: "16px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          },
          role: "alert",
          children: [
            i.jsx("i", {
              className: `fas text-lg ${
                X.type === "error"
                  ? "fa-exclamation-circle text-red-500"
                  : "fa-check-circle text-green-500"
              }`,
            }),
            i.jsx("span", { className: "flex-1", children: X.message }),
            i.jsx("button", {
              onClick: T,
              className:
                "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
              "aria-label": "Close",
              children: i.jsx("i", { className: "fas fa-times" }),
            }),
          ],
        });
    j.useEffect(() => {
      if (d) {
        const X = setTimeout(() => r(null), 4e3);
        return () => clearTimeout(X);
      }
    }, [d]),
      j.useEffect(() => {
        let X;
        return (
          g &&
            (X = setInterval(() => {
              G();
            }, 2e3)),
          () => clearInterval(X)
        );
      }, [g]);
    const Be = (X) => {
        const T = X.target.value;
        clearTimeout(Y.current),
          (Y.current = setTimeout(() => {
            H((Q) => ({ ...Q, search: T, page: 1 }));
          }, 400));
      },
      Ot = async () => {
        x(!0), r(null);
        try {
          await K();
          const T = await (
            await fetch(
              "/CRM/backend/includes/get_results.php?retry_failed=1"
            )
          ).json();
          if (T.total === 0) {
            r({ type: "error", message: "No failed emails to retry" }), x(!1);
            return;
          }
          const W = await (
            await fetch(
              "/CRM/backend/routes/api.php/api/retry-failed",
              { method: "POST" }
            )
          ).json();
          if (W.status !== "success")
            throw new Error(W.message || "Failed to start retry");
          r({
            type: "success",
            message: `Retry started for ${T.total} emails`,
          }),
            h(!0);
          const ye = setInterval(async () => {
            const p = await yg();
            w(p),
              G(),
              (p.stage === "complete" || p.stage === "error") &&
                (clearInterval(ye),
                setTimeout(() => {
                  h(!1), G(), K();
                }, 2e3));
          }, 1500);
        } catch (X) {
          r({ type: "error", message: X.message });
        } finally {
          x(!1);
        }
      },
      Ct = (X) => {
        switch (X) {
          case "completed":
            return "bg-emerald-100 text-emerald-800";
          case "running":
            return "bg-blue-100 text-blue-800";
          case "pending":
            return "bg-amber-100 text-amber-800";
          case "failed":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
    return (
      R.filter((X) => X.domain_status === 2).length,
      i.jsxs("div", {
        className: "container mx-auto px-4 py-8 max-w-7xl",
        children: [
          i.jsx($e, { status: d, onClose: () => r(null) }),
          i.jsxs("div", {
            className:
              "bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 mt-12",
            children: [
              i.jsxs("div", {
                className: "flex items-center mb-6",
                children: [
                  i.jsx("div", {
                    className: "bg-blue-100 p-2 rounded-lg mr-4",
                    children: i.jsx("svg", {
                      className: "w-6 h-6 text-blue-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
                      }),
                    }),
                  }),
                  i.jsx("h2", {
                    className: "text-xl font-semibold text-gray-800",
                    children: "Upload Email List",
                  }),
                ],
              }),
              i.jsxs("form", {
                onSubmit: ie,
                className: "space-y-6",
                children: [
                  i.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                      i.jsxs("div", {
                        children: [
                          i.jsxs("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: [
                              "List Name",
                              i.jsx("span", {
                                className: "text-red-500 ml-1",
                                children: "*",
                              }),
                            ],
                          }),
                          i.jsx("input", {
                            type: "text",
                            name: "listName",
                            value: s.listName,
                            onChange: se,
                            className:
                              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            placeholder: "e.g. List_2025",
                            required: !0,
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        children: [
                          i.jsxs("label", {
                            className:
                              "block text-sm font-medium text-gray-700 mb-2",
                            children: [
                              "File Name",
                              i.jsx("span", {
                                className: "text-red-500 ml-1",
                                children: "*",
                              }),
                            ],
                          }),
                          i.jsx("input", {
                            type: "text",
                            name: "fileName",
                            value: s.fileName,
                            onChange: se,
                            className:
                              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            placeholder: "e.g. File_2025.csv",
                            required: !0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    children: [
                      i.jsxs("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-2",
                        children: [
                          "CSV File",
                          i.jsx("span", {
                            className: "text-red-500 ml-1",
                            children: "*",
                          }),
                        ],
                      }),
                      i.jsx("div", {
                        className:
                          "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors",
                        children: i.jsx("div", {
                          className: "space-y-1 text-center",
                          children: s.csvFile
                            ? i.jsxs("div", {
                                className: "flex items-center justify-center",
                                children: [
                                  i.jsx("div", {
                                    className:
                                      "bg-green-100 p-2 rounded-lg mr-4",
                                    children: i.jsx("svg", {
                                      className: "w-6 h-6 text-green-600",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24",
                                      children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                      }),
                                    }),
                                  }),
                                  i.jsxs("div", {
                                    className: "text-left",
                                    children: [
                                      i.jsx("p", {
                                        className:
                                          "text-sm font-medium text-gray-700",
                                        children: s.csvFile.name,
                                      }),
                                      i.jsxs("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                          (s.csvFile.size / 1024).toFixed(1),
                                          " KB",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : i.jsxs(i.Fragment, {
                                children: [
                                  i.jsx("svg", {
                                    className:
                                      "mx-auto h-12 w-12 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: i.jsx("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
                                    }),
                                  }),
                                  i.jsxs("div", {
                                    className:
                                      "flex text-sm text-gray-600 justify-center",
                                    children: [
                                      i.jsxs("label", {
                                        className:
                                          "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none",
                                        children: [
                                          i.jsx("span", {
                                            children: "Upload a file",
                                          }),
                                          i.jsx("input", {
                                            type: "file",
                                            name: "csvFile",
                                            className: "sr-only",
                                            accept: ".csv",
                                            onChange: F,
                                            required: !0,
                                          }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "pl-1",
                                        children: "or drag and drop",
                                      }),
                                    ],
                                  }),
                                  i.jsx("p", {
                                    className: "text-xs text-gray-500",
                                    children: "CSV files",
                                  }),
                                ],
                              }),
                        }),
                      }),
                    ],
                  }),
                  i.jsx("div", {
                    className: "flex justify-center",
                    children: i.jsx("button", {
                      type: "submit",
                      disabled: m,
                      className:
                        "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center disabled:opacity-70",
                      children: m
                        ? i.jsxs(i.Fragment, {
                            children: [
                              i.jsxs("svg", {
                                className:
                                  "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [
                                  i.jsx("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4",
                                  }),
                                  i.jsx("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                                  }),
                                ],
                              }),
                              "Processing...",
                            ],
                          })
                        : i.jsxs(i.Fragment, {
                            children: [
                              i.jsx("svg", {
                                className: "w-5 h-5 mr-2 -ml-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "2",
                                  d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
                                }),
                              }),
                              "Upload & Verify",
                            ],
                          }),
                    }),
                  }),
                ],
              }),
            ],
          }),
          i.jsxs("div", {
            className:
              "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
            children: [
              i.jsxs("div", {
                className:
                  "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center",
                    children: [
                      i.jsx("div", {
                        className: "bg-blue-100 p-2 rounded-lg mr-4",
                        children: i.jsx("svg", {
                          className: "w-6 h-6 text-blue-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                          }),
                        }),
                      }),
                      i.jsx("h2", {
                        className: "text-xl font-semibold text-gray-800",
                        children: "Email Lists",
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className:
                      "flex flex-col sm:flex-row gap-3 w-full sm:w-auto",
                    children: [
                      i.jsxs("div", {
                        className: "relative flex-grow max-w-md",
                        children: [
                          i.jsx("div", {
                            className:
                              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                            children: i.jsx("svg", {
                              className: "h-5 w-5 text-gray-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                              }),
                            }),
                          }),
                          i.jsx("input", {
                            type: "text",
                            placeholder: "Search lists...",
                            className:
                              "pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                            value: A.search,
                            onChange: Be,
                          }),
                        ],
                      }),
                      i.jsx("div", {
                        className: "flex gap-2",
                        children: i.jsxs("button", {
                          onClick: Ot,
                          disabled: m || k === 0,
                          className:
                            "px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center",
                          children: [
                            i.jsx("svg", {
                              className: `w-4 h-4 mr-2 ${
                                m ? "animate-spin" : ""
                              }`,
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24",
                              children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M4 4v5h5M20 20v-5h-5M5.5 8.5a8 8 0 0113 0M18.5 15.5a8 8 0 01-13 0",
                              }),
                            }),
                            m ? "Retrying..." : `Retry Failed (${k})`,
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              i.jsx("div", {
                className: "overflow-x-auto rounded-lg border border-gray-200",
                children: i.jsxs("table", {
                  className: "min-w-full divide-y divide-gray-200",
                  children: [
                    i.jsx("thead", {
                      className: "bg-gray-50",
                      children: i.jsxs("tr", {
                        children: [
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "ID",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "List Name",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Status",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Emails",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Valid/Invalid",
                          }),
                          i.jsx("th", {
                            className:
                              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                            children: "Actions",
                          }),
                        ],
                      }),
                    }),
                    i.jsx("tbody", {
                      className: "bg-white divide-y divide-gray-200",
                      children:
                        R.length === 0
                          ? i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 6,
                                className:
                                  "px-6 py-4 text-center text-gray-500 text-sm",
                                children: A.search
                                  ? "No lists match your search criteria"
                                  : "No lists found. Upload a CSV file to get started.",
                              }),
                            })
                          : R.map((X) =>
                              i.jsxs(
                                "tr",
                                {
                                  className:
                                    "hover:bg-gray-50 transition-colors",
                                  children: [
                                    i.jsx("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                      children: X.id,
                                    }),
                                    i.jsx("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                      children: X.list_name,
                                    }),
                                    i.jsx("td", {
                                      className: "px-6 py-4 whitespace-nowrap",
                                      children: i.jsx("span", {
                                        className: `px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${Ct(
                                          X.status
                                        )}`,
                                        children:
                                          X.status.charAt(0).toUpperCase() +
                                          X.status.slice(1),
                                      }),
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                      children: [X.total_emails, " total"],
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm",
                                      children: [
                                        i.jsxs("span", {
                                          className:
                                            "text-emerald-600 font-medium",
                                          children: [
                                            X.valid_count || 0,
                                            " valid",
                                          ],
                                        }),
                                        " ",
                                        "/",
                                        " ",
                                        i.jsxs("span", {
                                          className: "text-red-600 font-medium",
                                          children: [
                                            X.invalid_count || 0,
                                            " invalid",
                                          ],
                                        }),
                                      ],
                                    }),
                                    i.jsxs("td", {
                                      className:
                                        "px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2",
                                      children: [
                                        i.jsxs("button", {
                                          onClick: () => q(X.id),
                                          className:
                                            "text-blue-600 hover:text-blue-800 transition-colors flex items-center",
                                          children: [
                                            i.jsxs("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: [
                                                i.jsx("path", {
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round",
                                                  strokeWidth: "2",
                                                  d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
                                                }),
                                                i.jsx("path", {
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round",
                                                  strokeWidth: "2",
                                                  d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                                                }),
                                              ],
                                            }),
                                            "View",
                                          ],
                                        }),
                                        i.jsxs("button", {
                                          onClick: () => te("valid", X.id),
                                          className:
                                            "text-green-600 hover:text-green-800 transition-colors flex items-center",
                                          children: [
                                            i.jsx("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                                              }),
                                            }),
                                            "Valid",
                                          ],
                                        }),
                                        i.jsxs("button", {
                                          onClick: () => te("invalid", X.id),
                                          className:
                                            "text-red-600 hover:text-red-800 transition-colors flex items-center",
                                          children: [
                                            i.jsx("svg", {
                                              className: "w-4 h-4 mr-1",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24",
                                              children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                                              }),
                                            }),
                                            "Invalid",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                X.id
                              )
                            ),
                    }),
                  ],
                }),
              }),
              R.length > 0 &&
                i.jsxs("div", {
                  className:
                    "flex flex-col items-center justify-center mt-6 px-1 gap-2",
                  children: [
                    i.jsxs("div", {
                      className: "text-sm text-gray-500 mb-2",
                      children: [
                        "Showing",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: (A.page - 1) * A.rowsPerPage + 1,
                        }),
                        " ",
                        "to",
                        " ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: Math.min(A.page * A.rowsPerPage, A.total),
                        }),
                        " ",
                        "of ",
                        i.jsx("span", {
                          className: "font-medium",
                          children: A.total,
                        }),
                        " ",
                        "lists",
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        i.jsx("button", {
                          onClick: () => H((X) => ({ ...X, page: 1 })),
                          disabled: A.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M11 19l-7-7 7-7m8 14l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () => H((X) => ({ ...X, page: X.page - 1 })),
                          disabled: A.page === 1,
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M15 19l-7-7 7-7",
                            }),
                          }),
                        }),
                        i.jsxs("span", {
                          className: "text-sm font-medium text-gray-700",
                          children: [
                            "Page ",
                            A.page,
                            " of",
                            " ",
                            Math.max(1, Math.ceil(A.total / A.rowsPerPage)),
                          ],
                        }),
                        i.jsx("button", {
                          onClick: () =>
                            H((X) => ({
                              ...X,
                              page: Math.min(
                                Math.ceil(A.total / A.rowsPerPage),
                                X.page + 1
                              ),
                            })),
                          disabled:
                            A.page >= Math.ceil(A.total / A.rowsPerPage),
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M9 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("button", {
                          onClick: () =>
                            H((X) => ({
                              ...X,
                              page: Math.ceil(A.total / A.rowsPerPage),
                            })),
                          disabled:
                            A.page >= Math.ceil(A.total / A.rowsPerPage),
                          className:
                            "p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors",
                          children: i.jsx("svg", {
                            className: "w-5 h-5 text-gray-500",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: "2",
                              d: "M13 5l7 7-7 7M5 5l7 7-7 7",
                            }),
                          }),
                        }),
                        i.jsx("select", {
                          value: A.rowsPerPage,
                          onChange: (X) =>
                            H((T) => ({
                              ...T,
                              rowsPerPage: Number(X.target.value),
                              page: 1,
                            })),
                          className:
                            "border p-2 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors",
                          children: [10, 25, 50, 100].map((X) =>
                            i.jsx("option", { value: X, children: X }, X)
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          C && i.jsx(hg, { listId: C, onClose: () => q(null) }),
        ],
      })
    );
  },
  Pu = "/CRM/backend/routes/api.php/api/master/smtps",
  Iu = {
    name: "",
    host: "",
    port: 465,
    encryption: "ssl",
    email: "",
    password: "",
    daily_limit: 500,
    hourly_limit: 100,
    is_active: !0,
  },
  xg = ({ status: s, onClose: o }) =>
    s &&
    i.jsxs("div", {
      className: `
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          s.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `,
      style: {
        minWidth: 250,
        maxWidth: 400,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
        background:
          s.type === "error"
            ? "rgba(255, 0, 0, 0.29)"
            : "rgba(0, 200, 83, 0.29)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
      role: "alert",
      children: [
        i.jsx("i", {
          className: `fas text-lg ${
            s.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`,
        }),
        i.jsx("span", { className: "flex-1", children: s.message }),
        i.jsx("button", {
          onClick: o,
          className:
            "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
          "aria-label": "Close",
          children: i.jsx("i", { className: "fas fa-times" }),
        }),
      ],
    }),
  pg = () => {
    const [s, o] = j.useState([]),
      [d, r] = j.useState(!0),
      [m, x] = j.useState(!1),
      [S, w] = j.useState(!1),
      [g, h] = j.useState(Iu),
      [R, L] = j.useState(null),
      [A, H] = j.useState(null),
      C = async () => {
        r(!0);
        try {
          const K = await (await fetch(Pu)).json();
          Array.isArray(K.data) ? o(K.data) : Array.isArray(K) ? o(K) : o([]);
        } catch {
          H({ type: "error", message: "Failed to load SMTP servers." }), o([]);
        }
        r(!1);
      };
    j.useEffect(() => {
      C();
    }, []);
    const q = (G) => {
        const { name: K, value: se, type: F, checked: ie } = G.target;
        h((te) => ({ ...te, [K]: F === "checkbox" ? ie : se }));
      },
      V = async (G) => {
        G.preventDefault();
        try {
          const se = await (
            await fetch(Pu, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(g),
            })
          ).json();
          se.success
            ? (H({
                type: "success",
                message: "SMTP server added successfully!",
              }),
              x(!1),
              h(Iu),
              C())
            : H({
                type: "error",
                message: se.message || "Failed to add server.",
              });
        } catch {
          H({ type: "error", message: "Failed to add server." });
        }
      },
      Y = (G) => {
        L(G.id), h({ ...G, is_active: !!G.is_active }), w(!0);
      },
      k = async (G) => {
        G.preventDefault();
        try {
          const se = await (
            await fetch(`${Pu}?id=${R}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(g),
            })
          ).json();
          se.success
            ? (H({
                type: "success",
                message: "SMTP server updated successfully!",
              }),
              w(!1),
              h(Iu),
              L(null),
              C())
            : H({
                type: "error",
                message: se.message || "Failed to update server.",
              });
        } catch {
          H({ type: "error", message: "Failed to update server." });
        }
      },
      O = async (G) => {
        if (window.confirm("Are you sure you want to delete this SMTP server?"))
          try {
            const se = await (
              await fetch(`${Pu}?id=${G}`, { method: "DELETE" })
            ).json();
            se.success
              ? (H({
                  type: "success",
                  message: "SMTP server deleted successfully!",
                }),
                C())
              : H({
                  type: "error",
                  message: se.message || "Failed to delete server.",
                });
          } catch {
            H({ type: "error", message: "Failed to delete server." });
          }
      };
    return (
      j.useEffect(() => {
        if (A) {
          const G = setTimeout(() => H(null), 3e3);
          return () => clearTimeout(G);
        }
      }, [A]),
      i.jsxs("main", {
        className: "max-w-7xl mx-auto px-4 mt-14 sm:px-6 py-6",
        children: [
          i.jsx(xg, { status: A, onClose: () => H(null) }),
          i.jsxs("div", {
            className: "flex justify-between items-center mb-6",
            children: [
              i.jsxs("h1", {
                className: "text-2xl font-bold text-gray-900 flex items-center",
                children: [
                  i.jsx("i", {
                    className: "fas fa-server mr-3 text-indigo-600",
                  }),
                  "SMTP Records",
                ],
              }),
              i.jsxs("button", {
                onClick: () => {
                  h(Iu), x(!0);
                },
                className:
                  "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                children: [
                  i.jsx("i", { className: "fas fa-plus mr-2" }),
                  " Add SMTP Server",
                ],
              }),
            ],
          }),
          i.jsx("div", {
            className: "card overflow-hidden bg-white rounded-xl shadow",
            children: i.jsx("div", {
              className: "overflow-x-auto",
              children: i.jsxs("table", {
                className: "min-w-full divide-y divide-gray-200",
                children: [
                  i.jsx("thead", {
                    className: "bg-gray-50",
                    children: i.jsxs("tr", {
                      children: [
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Name",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Host",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Email",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Status",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Hourly Limit",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Daily Limit",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  i.jsx("tbody", {
                    className: "bg-white divide-y divide-gray-200",
                    children: d
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 7,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : s.length === 0
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 7,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children:
                              "No SMTP servers found. Add one to get started.",
                          }),
                        })
                      : s.map((G) => {
                          var K;
                          return i.jsxs(
                            "tr",
                            {
                              children: [
                                i.jsx("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: i.jsx("div", {
                                    className: "flex items-center",
                                    children: i.jsx("div", {
                                      className:
                                        "text-sm font-medium text-gray-900",
                                      children: G.name,
                                    }),
                                  }),
                                }),
                                i.jsxs("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: [
                                    i.jsx("div", {
                                      className: "text-sm text-gray-900",
                                      children: G.host,
                                    }),
                                    i.jsxs("div", {
                                      className: "text-sm text-gray-500",
                                      children: [
                                        "Port: ",
                                        G.port,
                                        " (",
                                        ((K = G.encryption) == null
                                          ? void 0
                                          : K.toUpperCase()) || "None",
                                        ")",
                                      ],
                                    }),
                                  ],
                                }),
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: G.email,
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: i.jsx("span", {
                                    className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      G.is_active
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`,
                                    children: G.is_active
                                      ? "Active"
                                      : "Inactive",
                                  }),
                                }),
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: G.hourly_limit,
                                }),
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: G.daily_limit,
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm font-medium",
                                  children: [
                                    i.jsxs("button", {
                                      onClick: () => Y(G),
                                      className:
                                        "text-indigo-600 hover:text-indigo-900 mr-3",
                                      children: [
                                        i.jsx("i", {
                                          className: "fas fa-edit mr-1",
                                        }),
                                        " Edit",
                                      ],
                                    }),
                                    i.jsxs("button", {
                                      onClick: () => O(G.id),
                                      className:
                                        "text-red-600 hover:text-red-900",
                                      children: [
                                        i.jsx("i", {
                                          className: "fas fa-trash mr-1",
                                        }),
                                        " Delete",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            G.id
                          );
                        }),
                  }),
                ],
              }),
            }),
          }),
          m &&
            i.jsx("div", {
              className:
                "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center",
              children: i.jsxs("div", {
                className:
                  "relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white",
                children: [
                  i.jsxs("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                      i.jsxs("h3", {
                        className: "text-lg font-medium text-gray-900",
                        children: [
                          i.jsx("i", {
                            className:
                              "fas fa-plus-circle mr-2 text-indigo-600",
                          }),
                          "Add New SMTP Server",
                        ],
                      }),
                      i.jsx("button", {
                        onClick: () => x(!1),
                        className: "text-gray-400 hover:text-gray-500",
                        children: i.jsx("i", { className: "fas fa-times" }),
                      }),
                    ],
                  }),
                  i.jsxs("form", {
                    className: "space-y-4",
                    onSubmit: V,
                    children: [
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Name",
                              }),
                              i.jsx("input", {
                                type: "text",
                                name: "name",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "SMTP1",
                                value: g.name,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Host",
                              }),
                              i.jsx("input", {
                                type: "text",
                                name: "host",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "smtp.example.com",
                                value: g.host,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Port",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "port",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "465",
                                value: g.port,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Encryption",
                              }),
                              i.jsxs("select", {
                                name: "encryption",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.encryption,
                                onChange: q,
                                children: [
                                  i.jsx("option", {
                                    value: "ssl",
                                    children: "SSL",
                                  }),
                                  i.jsx("option", {
                                    value: "tls",
                                    children: "TLS",
                                  }),
                                  i.jsx("option", {
                                    value: "",
                                    children: "None",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Hourly Limit",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "hourly_limit",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "100",
                                value: g.hourly_limit,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Daily Limit",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "daily_limit",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "500",
                                value: g.daily_limit,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email",
                              }),
                              i.jsx("input", {
                                type: "email",
                                name: "email",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "user@example.com",
                                value: g.email,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Password",
                              }),
                              i.jsx("input", {
                                type: "password",
                                name: "password",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                placeholder: "SMTP password",
                                value: g.password,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          i.jsx("input", {
                            type: "checkbox",
                            name: "is_active",
                            id: "is_active",
                            checked: g.is_active,
                            onChange: q,
                            className:
                              "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded",
                          }),
                          i.jsx("label", {
                            htmlFor: "is_active",
                            className: "ml-2 block text-sm text-gray-700",
                            children: "Active",
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "flex justify-end pt-4 space-x-3",
                        children: [
                          i.jsx("button", {
                            type: "button",
                            onClick: () => x(!1),
                            className:
                              "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: "Cancel",
                          }),
                          i.jsxs("button", {
                            type: "submit",
                            className:
                              "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: [
                              i.jsx("i", { className: "fas fa-save mr-2" }),
                              " Save Server",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          S &&
            i.jsx("div", {
              className:
                "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center",
              children: i.jsxs("div", {
                className:
                  "relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white",
                children: [
                  i.jsxs("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                      i.jsxs("h3", {
                        className: "text-lg font-medium text-gray-900",
                        children: [
                          i.jsx("i", {
                            className: "fas fa-edit mr-2 text-indigo-600",
                          }),
                          "Edit SMTP Server",
                        ],
                      }),
                      i.jsx("button", {
                        onClick: () => w(!1),
                        className: "text-gray-400 hover:text-gray-500",
                        children: i.jsx("i", { className: "fas fa-times" }),
                      }),
                    ],
                  }),
                  i.jsxs("form", {
                    className: "space-y-4",
                    onSubmit: k,
                    children: [
                      i.jsx("input", { type: "hidden", name: "id", value: R }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Name",
                              }),
                              i.jsx("input", {
                                type: "text",
                                name: "name",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.name,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Host",
                              }),
                              i.jsx("input", {
                                type: "text",
                                name: "host",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.host,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Port",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "port",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.port,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Encryption",
                              }),
                              i.jsxs("select", {
                                name: "encryption",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.encryption,
                                onChange: q,
                                children: [
                                  i.jsx("option", {
                                    value: "ssl",
                                    children: "SSL",
                                  }),
                                  i.jsx("option", {
                                    value: "tls",
                                    children: "TLS",
                                  }),
                                  i.jsx("option", {
                                    value: "",
                                    children: "None",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Hourly Limit",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "hourly_limit",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.hourly_limit,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Daily Limit",
                              }),
                              i.jsx("input", {
                                type: "number",
                                name: "daily_limit",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.daily_limit,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email",
                              }),
                              i.jsx("input", {
                                type: "email",
                                name: "email",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.email,
                                onChange: q,
                              }),
                            ],
                          }),
                          i.jsxs("div", {
                            children: [
                              i.jsx("label", {
                                className:
                                  "block text-sm font-medium text-gray-700 mb-1",
                                children: "Password",
                              }),
                              i.jsx("input", {
                                type: "password",
                                name: "password",
                                required: !0,
                                className:
                                  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                                value: g.password,
                                onChange: q,
                              }),
                            ],
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          i.jsx("input", {
                            type: "checkbox",
                            name: "is_active",
                            id: "edit_is_active",
                            checked: g.is_active,
                            onChange: q,
                            className:
                              "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded",
                          }),
                          i.jsx("label", {
                            htmlFor: "edit_is_active",
                            className: "ml-2 block text-sm text-gray-700",
                            children: "Active",
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "flex justify-end pt-4 space-x-3",
                        children: [
                          i.jsx("button", {
                            type: "button",
                            onClick: () => w(!1),
                            className:
                              "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: "Cancel",
                          }),
                          i.jsxs("button", {
                            type: "submit",
                            className:
                              "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            children: [
                              i.jsx("i", { className: "fas fa-save mr-2" }),
                              " Update Server",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      })
    );
  },
  ei = { description: "", mail_subject: "", mail_body: "" },
  vg = ({ message: s, onClose: o }) =>
    s &&
    i.jsxs("div", {
      className: `
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded-xl shadow text-base font-semibold
        flex items-center gap-3
        transition-all duration-300
        backdrop-blur-md
        ${
          s.type === "error"
            ? "bg-red-200/60 border border-red-400 text-red-800"
            : "bg-green-200/60 border border-green-400 text-green-800"
        }
      `,
      style: {
        minWidth: 250,
        maxWidth: 400,
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.23)",
        background:
          s.type === "error"
            ? "rgba(255, 0, 0, 0.29)"
            : "rgba(0, 200, 83, 0.29)",
        borderRadius: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
      role: "alert",
      children: [
        i.jsx("i", {
          className: `fas text-lg ${
            s.type === "error"
              ? "fa-exclamation-circle text-red-500"
              : "fa-check-circle text-green-500"
          }`,
        }),
        i.jsx("span", { className: "flex-1", children: s.text }),
        i.jsx("button", {
          onClick: o,
          className:
            "ml-2 text-gray-500 hover:text-gray-700 focus:outline-none",
          "aria-label": "Close",
          children: i.jsx("i", { className: "fas fa-times" }),
        }),
      ],
    }),
  bg = () => {
    const [s, o] = j.useState([]),
      [d, r] = j.useState(!0),
      [m, x] = j.useState(!1),
      [S, w] = j.useState(!1),
      [g, h] = j.useState(ei),
      [R, L] = j.useState(null),
      [A, H] = j.useState(null),
      C = "/CRM/backend/routes/api.php/api/campaigns",
      q = async () => {
        r(!0);
        try {
          const ie = await (await fetch(C)).json();
          o(Array.isArray(ie) ? ie : []);
        } catch {
          H({ type: "error", text: "Failed to load campaigns." });
        }
        r(!1);
      };
    j.useEffect(() => {
      q();
    }, []);
    const V = (F) => {
        const { name: ie, value: te } = F.target;
        h((je) => ({ ...je, [ie]: te }));
      },
      Y = async (F) => {
        F.preventDefault();
        try {
          const te = await (
            await fetch(C, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(g),
            })
          ).json();
          te.success
            ? (H({ type: "success", text: "Campaign added successfully!" }),
              x(!1),
              h(ei),
              q())
            : H({
                type: "error",
                text: te.message || "Failed to add campaign.",
              });
        } catch {
          H({ type: "error", text: "Failed to add campaign." });
        }
      },
      k = (F) => {
        L(F.campaign_id),
          h({
            description: F.description,
            mail_subject: F.mail_subject,
            mail_body: F.mail_body,
          }),
          w(!0);
      },
      O = async (F) => {
        F.preventDefault();
        try {
          const te = await (
            await fetch(`${C}?id=${R}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(g),
            })
          ).json();
          te.success
            ? (H({ type: "success", text: "Campaign updated successfully!" }),
              w(!1),
              h(ei),
              q())
            : H({
                type: "error",
                text: te.message || "Failed to update campaign.",
              });
        } catch {
          H({ type: "error", text: "Failed to update campaign." });
        }
      },
      G = async (F) => {
        if (window.confirm("Are you sure you want to delete this campaign?"))
          try {
            const te = await (
              await fetch(`${C}?id=${F}`, { method: "DELETE" })
            ).json();
            te.success
              ? (H({ type: "success", text: "Campaign deleted successfully!" }),
                q())
              : H({
                  type: "error",
                  text: te.message || "Failed to delete campaign.",
                });
          } catch {
            H({ type: "error", text: "Failed to delete campaign." });
          }
      },
      K = async (F) => {
        try {
          const te = await (await fetch(`${C}?id=${F}`)).json();
          h({
            description: te.description,
            mail_subject: te.mail_subject,
            mail_body: te.mail_body,
          }),
            x(!0);
        } catch {
          H({ type: "error", text: "Failed to load campaign for reuse." });
        }
      };
    j.useEffect(() => {
      if (A) {
        const F = setTimeout(() => H(null), 3e3);
        return () => clearTimeout(F);
      }
    }, [A]);
    const se = (F) => {
      const ie = F.split(/\s+/);
      return ie.slice(0, 30).join(" ") + (ie.length > 30 ? "..." : "");
    };
    return i.jsxs("div", {
      className: "container mx-auto mt-12 px-4 py-8 max-w-7xl",
      children: [
        i.jsx(vg, { message: A, onClose: () => H(null) }),
        i.jsxs("div", {
          className: "flex justify-between items-center mb-6",
          children: [
            i.jsxs("h1", {
              className: "text-2xl font-bold text-gray-800",
              children: [
                i.jsx("i", { className: "fas fa-bullhorn mr-2 text-blue-600" }),
                "Email Campaigns",
              ],
            }),
            i.jsxs("button", {
              onClick: () => {
                h(ei), x(!0);
              },
              className:
                "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center",
              children: [
                i.jsx("i", { className: "fas fa-plus mr-2" }),
                " Add Campaign",
              ],
            }),
          ],
        }),
        i.jsx("div", {
          className: "bg-white rounded-lg shadow overflow-hidden",
          children: i.jsx("div", {
            className: "overflow-x-auto",
            children: i.jsxs("table", {
              className: "min-w-full divide-y divide-gray-200",
              children: [
                i.jsx("thead", {
                  className: "bg-gray-50",
                  children: i.jsxs("tr", {
                    children: [
                      i.jsx("th", {
                        className:
                          "w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "ID",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Description",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Subject",
                      }),
                      i.jsx("th", {
                        className:
                          "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Email Preview",
                      }),
                      i.jsx("th", {
                        className:
                          "w-40 px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                i.jsx("tbody", {
                  className: "bg-white divide-y divide-gray-200",
                  children: d
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-4 text-center text-sm text-gray-500",
                          children: "Loading...",
                        }),
                      })
                    : s.length === 0
                    ? i.jsx("tr", {
                        children: i.jsx("td", {
                          colSpan: 5,
                          className:
                            "px-6 py-4 text-center text-sm text-gray-500",
                          children:
                            "No campaigns found. Add one to get started.",
                        }),
                      })
                    : s.map((F) =>
                        i.jsxs(
                          "tr",
                          {
                            className:
                              "hover:bg-gray-50 transition-colors duration-150",
                            children: [
                              i.jsx("td", {
                                className:
                                  "px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500",
                                children: F.campaign_id,
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm font-medium text-gray-900 truncate max-w-xs",
                                  children: F.description,
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm text-gray-900 truncate max-w-xs",
                                  children: F.mail_subject,
                                }),
                              }),
                              i.jsx("td", {
                                className: "px-4 py-3",
                                children: i.jsx("div", {
                                  className:
                                    "text-sm text-gray-500 truncate max-w-xs",
                                  title: se(F.mail_body),
                                  children: se(F.mail_body),
                                }),
                              }),
                              i.jsx("td", {
                                className:
                                  "px-4 py-3 whitespace-nowrap text-right text-sm font-medium",
                                children: i.jsxs("div", {
                                  className: "flex justify-end space-x-2",
                                  children: [
                                    i.jsx("button", {
                                      onClick: () => k(F),
                                      className:
                                        "text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50",
                                      title: "Edit",
                                      children: i.jsx("i", {
                                        className: "fas fa-edit",
                                      }),
                                    }),
                                    i.jsx("button", {
                                      onClick: () => K(F.campaign_id),
                                      className:
                                        "text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50",
                                      title: "Reuse",
                                      children: i.jsx("i", {
                                        className: "fas fa-copy",
                                      }),
                                    }),
                                    i.jsx("button", {
                                      onClick: () => G(F.campaign_id),
                                      className:
                                        "text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50",
                                      title: "Delete",
                                      children: i.jsx("i", {
                                        className: "fas fa-trash",
                                      }),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          },
                          F.campaign_id
                        )
                      ),
                }),
              ],
            }),
          }),
        }),
        m &&
          i.jsx("div", {
            className:
              "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center",
            children: i.jsxs("div", {
              className:
                "relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white",
              children: [
                i.jsxs("div", {
                  className: "flex justify-between items-center mb-4",
                  children: [
                    i.jsxs("h3", {
                      className: "text-lg font-medium text-gray-900",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-plus-circle mr-2 text-blue-600",
                        }),
                        "Add New Campaign",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => x(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "space-y-4",
                  onSubmit: Y,
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Description",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "description",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          placeholder: "Campaign description",
                          value: g.description,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Subject",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "mail_subject",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          placeholder: "Your email subject",
                          value: g.mail_subject,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Body",
                        }),
                        i.jsx("textarea", {
                          name: "mail_body",
                          rows: 8,
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm",
                          placeholder: "Compose your email content here...",
                          value: g.mail_body,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-4 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => x(!1),
                          className:
                            "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Save Campaign",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        S &&
          i.jsx("div", {
            className:
              "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center",
            children: i.jsxs("div", {
              className:
                "relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white",
              children: [
                i.jsxs("div", {
                  className: "flex justify-between items-center mb-4",
                  children: [
                    i.jsxs("h3", {
                      className: "text-lg font-medium text-gray-900",
                      children: [
                        i.jsx("i", {
                          className: "fas fa-edit mr-2 text-blue-600",
                        }),
                        "Edit Campaign",
                      ],
                    }),
                    i.jsx("button", {
                      onClick: () => w(!1),
                      className: "text-gray-400 hover:text-gray-500",
                      children: i.jsx("i", { className: "fas fa-times" }),
                    }),
                  ],
                }),
                i.jsxs("form", {
                  className: "space-y-4",
                  onSubmit: O,
                  children: [
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Description",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "description",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          value: g.description,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Subject",
                        }),
                        i.jsx("input", {
                          type: "text",
                          name: "mail_subject",
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
                          value: g.mail_subject,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      children: [
                        i.jsx("label", {
                          className:
                            "block text-sm font-medium text-gray-700 mb-1",
                          children: "Email Body",
                        }),
                        i.jsx("textarea", {
                          name: "mail_body",
                          rows: 8,
                          required: !0,
                          className:
                            "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm",
                          value: g.mail_body,
                          onChange: V,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end pt-4 space-x-3",
                      children: [
                        i.jsx("button", {
                          type: "button",
                          onClick: () => w(!1),
                          className:
                            "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: "Cancel",
                        }),
                        i.jsxs("button", {
                          type: "submit",
                          className:
                            "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                          children: [
                            i.jsx("i", { className: "fas fa-save mr-2" }),
                            " Update",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  },
  Sg = "/CRM/backend/routes/api.php/api/campaigns-master",
  Ng = () => {
    const [s, o] = j.useState([]),
      [d, r] = j.useState(!0),
      [m, x] = j.useState(null);
    return (
      j.useEffect(() => {
        (async () => {
          r(!0);
          try {
            const g = await (await fetch(Sg)).json();
            o(Array.isArray(g) ? g : []);
          } catch {
            x({ type: "error", text: "Failed to load data." });
          }
          r(!1);
        })();
      }, []),
      i.jsxs("div", {
        className: "container mx-auto px-4 py-8 mt-12 max-w-7xl",
        children: [
          i.jsx("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Bulk Email Campaign Manager",
          }),
          m &&
            i.jsx("div", {
              className:
                "p-4 mb-6 rounded-md shadow-sm bg-red-100 text-red-800",
              children: m.text,
            }),
          d
            ? i.jsx("div", { children: "Loading..." })
            : i.jsx("div", {
                className: "grid grid-cols-1 gap-6 max-w-6xl",
                children: s.map((S) =>
                  i.jsxs(
                    "div",
                    {
                      className: "bg-white rounded-xl shadow-md p-6",
                      children: [
                        i.jsx("h2", {
                          className: "text-xl font-semibold text-gray-800 mb-1",
                          children: S.description,
                        }),
                        i.jsx("p", {
                          className: "text-sm text-gray-600 mb-2",
                          children: S.mail_subject,
                        }),
                      ],
                    },
                    S.campaign_id
                  )
                ),
              }),
        ],
      })
    );
  },
  jg = {
    pending: "bg-yellow-500",
    running: "bg-blue-600",
    paused: "bg-gray-500",
    completed: "bg-green-600",
    failed: "bg-red-600",
  },
  Eg = () => {
    const [s, o] = j.useState([]),
      [d, r] = j.useState(!0),
      [m, x] = j.useState(null),
      S = async () => {
        r(!0);
        try {
          const g = await (await fetch("/api/monitor/campaigns")).json();
          o(Array.isArray(g) ? g : []);
        } catch {
          x({ type: "error", text: "Failed to load campaigns." });
        }
        r(!1);
      };
    return (
      j.useEffect(() => {
        S();
        const w = setInterval(S, 5e3);
        return () => clearInterval(w);
      }, []),
      i.jsxs("div", {
        className: "container mx-auto px-4 py-8 max-w-7xl",
        children: [
          i.jsxs("h1", {
            className:
              "text-2xl font-bold text-gray-800 mb-6 flex items-center",
            children: [
              i.jsx("i", { className: "fas fa-chart-line mr-2 text-blue-600" }),
              "Campaign Monitor",
            ],
          }),
          m &&
            i.jsxs("div", {
              className:
                "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-start",
              children: [
                i.jsx("div", {
                  className: "ml-3",
                  children: i.jsx("p", {
                    className: "text-sm font-medium",
                    children: m.text,
                  }),
                }),
                i.jsx("div", {
                  className: "ml-auto pl-3",
                  children: i.jsx("button", {
                    onClick: () => x(null),
                    className: "text-gray-500 hover:text-gray-700",
                    children: i.jsx("i", { className: "fas fa-times" }),
                  }),
                }),
              ],
            }),
          i.jsx("div", {
            className: "bg-white rounded-lg shadow overflow-hidden",
            children: i.jsx("div", {
              className: "overflow-x-auto",
              children: i.jsxs("table", {
                className: "min-w-full divide-y divide-gray-200",
                children: [
                  i.jsx("thead", {
                    className: "bg-gray-50",
                    children: i.jsxs("tr", {
                      children: [
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "ID",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Description",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Status",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Progress",
                        }),
                        i.jsx("th", {
                          className:
                            "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                          children: "Emails",
                        }),
                      ],
                    }),
                  }),
                  i.jsx("tbody", {
                    className: "bg-white divide-y divide-gray-200",
                    children: d
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 5,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "Loading...",
                          }),
                        })
                      : s.length === 0
                      ? i.jsx("tr", {
                          children: i.jsx("td", {
                            colSpan: 5,
                            className:
                              "px-6 py-4 text-center text-sm text-gray-500",
                            children: "No campaigns found.",
                          }),
                        })
                      : s.map((w) => {
                          const g = Math.max(w.total_emails || 0, 1),
                            h = Math.min(w.sent_emails || 0, g),
                            R = Math.round((h / g) * 100),
                            L = (w.campaign_status || "pending").toLowerCase();
                          return i.jsxs(
                            "tr",
                            {
                              className: "hover:bg-gray-50",
                              children: [
                                i.jsx("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: w.campaign_id,
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4",
                                  children: i.jsx("div", {
                                    className:
                                      "text-sm font-medium text-gray-900",
                                    children: w.description,
                                  }),
                                }),
                                i.jsx("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: i.jsx("span", {
                                    className: `status-badge px-2 py-1 rounded text-xs font-semibold ${
                                      jg[L] || "bg-gray-400"
                                    } text-white`,
                                    children:
                                      w.campaign_status || "Not started",
                                  }),
                                }),
                                i.jsxs("td", {
                                  className: "px-6 py-4 whitespace-nowrap",
                                  children: [
                                    i.jsx("div", {
                                      className:
                                        "progress-bar h-5 bg-gray-200 rounded",
                                      children: i.jsx("div", {
                                        className:
                                          "progress-fill bg-blue-600 h-5 rounded",
                                        style: { width: `${R}%` },
                                      }),
                                    }),
                                    i.jsxs("div", {
                                      className: "text-xs text-gray-500 mt-1",
                                      children: [
                                        R,
                                        "% (",
                                        w.sent_emails || 0,
                                        "/",
                                        w.total_emails || 0,
                                        ")",
                                      ],
                                    }),
                                  ],
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                  children: [
                                    i.jsxs("div", {
                                      children: [
                                        "Total: ",
                                        w.total_emails || 0,
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        "Pending: ",
                                        w.pending_emails || 0,
                                      ],
                                    }),
                                    i.jsxs("div", {
                                      children: ["Sent: ", w.sent_emails || 0],
                                    }),
                                    i.jsxs("div", {
                                      children: [
                                        "Failed: ",
                                        w.failed_emails || 0,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            w.campaign_id
                          );
                        }),
                  }),
                ],
              }),
            }),
          }),
        ],
      })
    );
  },
  wg = () =>
    i.jsx("div", {
      className: "text-3xl font-bold underline",
      children: "Received Response",
    }),
  Jd = [
    { to: "/", icon: "fa-check-circle", label: "Verification" },
    { to: "/smtp", icon: "fa-server", label: "SMTP" },
    { to: "/campaigns", icon: "fa-bullhorn", label: "Campaigns" },
    { to: "/master", icon: "fa-crown", label: "Master" },
  ],
  ti = [
    { to: "/monitor/email-sent", icon: "fa-paper-plane", label: "Email Sent" },
    {
      to: "/monitor/received-response",
      icon: "fa-reply",
      label: "Received Response",
    },
  ];
function Tg() {
  const [s, o] = j.useState(!1),
    [d, r] = j.useState(!1),
    [m, x] = j.useState(!1);
  return i.jsxs("nav", {
    className: "fixed top-0 left-0 right-0 bg-white shadow-sm z-50",
    children: [
      i.jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: i.jsxs("div", {
          className: "flex justify-between h-16 ",
          children: [
            i.jsx("div", {
              className: "flex items-center",
              children: i.jsxs("div", {
                className: "flex-shrink-0 flex items-center",
                children: [
                  i.jsx("i", {
                    className: "fas fa-envelope text-blue-600 mr-2",
                  }),
                  i.jsx("span", {
                    className: "text-gray-800 font-semibold",
                    children: "Email System",
                  }),
                ],
              }),
            }),
            i.jsxs("div", {
              className: "hidden md:flex items-center space-x-1",
              children: [
                Jd.map((S) =>
                  i.jsxs(
                    On,
                    {
                      to: S.to,
                      className: ({ isActive: w }) =>
                        `${
                          w
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        } px-3 py-2 rounded-md text-sm font-medium flex items-center`,
                      children: [
                        i.jsx("i", { className: `fas ${S.icon} mr-2` }),
                        S.label,
                      ],
                    },
                    S.to
                  )
                ),
                i.jsxs("div", {
                  className: "relative",
                  children: [
                    i.jsxs("button", {
                      onClick: () => r((S) => !S),
                      onBlur: () => setTimeout(() => r(!1), 150),
                      className: `${
                        ti.some((S) =>
                          window.location.pathname.startsWith(S.to)
                        )
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center`,
                      type: "button",
                      children: [
                        i.jsx("i", { className: "fas fa-chart-line mr-2" }),
                        " Monitor",
                        i.jsx("i", {
                          className: "fas fa-chevron-down ml-1 text-xs",
                        }),
                      ],
                    }),
                    d &&
                      i.jsx("div", {
                        className:
                          "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50",
                        children: i.jsx("div", {
                          className: "py-1",
                          children: ti.map((S) =>
                            i.jsxs(
                              On,
                              {
                                to: S.to,
                                className: ({ isActive: w }) =>
                                  `block px-4 py-2 text-sm flex items-center ${
                                    w
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                  }`,
                                children: [
                                  i.jsx("i", {
                                    className: `fas ${S.icon} mr-2 w-4 text-center`,
                                  }),
                                  S.label,
                                ],
                              },
                              S.to
                            )
                          ),
                        }),
                      }),
                  ],
                }),
              ],
            }),
            i.jsx("div", {
              className: "-mr-2 flex items-center md:hidden",
              children: i.jsxs("button", {
                onClick: () => o((S) => !S),
                type: "button",
                className:
                  "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none",
                children: [
                  i.jsx("span", {
                    className: "sr-only",
                    children: "Open main menu",
                  }),
                  i.jsx("i", {
                    className: `fas ${s ? "fa-times" : "fa-bars"}`,
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      s &&
        i.jsx("div", {
          className: "md:hidden bg-white border-t border-gray-200 shadow",
          children: i.jsxs("div", {
            className: "pt-2 pb-3 space-y-1",
            children: [
              Jd.map((S) =>
                i.jsxs(
                  On,
                  {
                    to: S.to,
                    className: ({ isActive: w }) =>
                      `block pl-3 pr-4 py-2 border-l-4 text-base font-medium flex items-center ${
                        w
                          ? "bg-blue-50 text-blue-600 border-blue-500"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-transparent"
                      }`,
                    onClick: () => o(!1),
                    children: [
                      i.jsx("i", { className: `fas ${S.icon} mr-2` }),
                      S.label,
                    ],
                  },
                  S.to
                )
              ),
              i.jsxs("div", {
                className: "border-t border-gray-200 pt-2",
                children: [
                  i.jsxs("button", {
                    onClick: () => x((S) => !S),
                    className: `w-full pl-3 pr-4 py-2 border-l-4 text-base font-medium flex justify-between items-center ${
                      ti.some((S) => window.location.pathname.startsWith(S.to))
                        ? "bg-blue-50 text-blue-600 border-blue-500"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-transparent"
                    }`,
                    children: [
                      i.jsxs("div", {
                        className: "flex items-center",
                        children: [
                          i.jsx("i", { className: "fas fa-chart-line mr-2" }),
                          " Monitor",
                        ],
                      }),
                      i.jsx("i", {
                        className: `fas fa-chevron-right transition-transform duration-200 ${
                          m ? "transform rotate-90" : ""
                        }`,
                      }),
                    ],
                  }),
                  m &&
                    i.jsx("div", {
                      className: "pl-8",
                      children: ti.map((S) =>
                        i.jsxs(
                          On,
                          {
                            to: S.to,
                            className: ({ isActive: w }) =>
                              `block pl-3 pr-4 py-2 text-base font-medium flex items-center ${
                                w
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                              }`,
                            onClick: () => o(!1),
                            children: [
                              i.jsx("i", { className: `fas ${S.icon} mr-2` }),
                              S.label,
                            ],
                          },
                          S.to
                        )
                      ),
                    }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
const _g = () => {
  const [s, o] = j.useState(0),
    [d, r] = j.useState(!1);
  return (
    j.useEffect(() => {
      let m = null;
      const x = async () => {
        try {
          const w = await (
            await fetch(
              "/CRM/backend/includes/progress.php"
            )
          ).json();
          w && typeof w.percent == "number" && w.total > 0 && w.percent < 100
            ? (o(w.percent), r(!0))
            : (r(!1), o(0));
        } catch {
          r(!1), o(0);
        }
      };
      return x(), (m = setInterval(x, 2e3)), () => clearInterval(m);
    }, []),
    d
      ? i.jsx("div", {
          className: "fixed top-0 left-0 w-full z-50",
          children: i.jsx("div", {
            className: "h-1 bg-blue-500 transition-all duration-500",
            style: { width: `${s}%` },
          }),
        })
      : null
  );
};
Qh.createRoot(document.getElementById("root")).render(
  i.jsxs(ug, {
    children: [
      i.jsx(Tg, {}),
      i.jsx(_g, {}),
      i.jsxs(Uy, {
        children: [
          i.jsx(Yl, { path: "/", element: i.jsx(gg, {}) }),
          i.jsx(Yl, { path: "/smtp", element: i.jsx(pg, {}) }),
          i.jsx(Yl, { path: "/campaigns", element: i.jsx(bg, {}) }),
          i.jsx(Yl, { path: "/master", element: i.jsx(Ng, {}) }),
          i.jsx(Yl, { path: "/monitor/email-sent", element: i.jsx(Eg, {}) }),
          i.jsx(Yl, {
            path: "/monitor/received-response",
            element: i.jsx(wg, {}),
          }),
        ],
      }),
    ],
  })
);
