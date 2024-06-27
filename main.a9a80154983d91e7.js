"use strict";
(self.webpackChunkKhaiDev = self.webpackChunkKhaiDev || []).push([
    [179], {
        948: () => {
            function ie(e) {
                return "function" == typeof e
            }

            function Xo(e) {
                const t = e(r => {
                    Error.call(r), r.stack = (new Error).stack
                });
                return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
            }
            const As = Xo(e => function(t) {
                e(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((r,o)=>`${o+1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t
            });

            function Rr(e, n) {
                if (e) {
                    const t = e.indexOf(n);
                    0 <= t && e.splice(t, 1)
                }
            }
            class dt {
                constructor(n) {
                    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null
                }
                unsubscribe() {
                    let n;
                    if (!this.closed) {
                        this.closed = !0;
                        const {
                            _parentage: t
                        } = this;
                        if (t)
                            if (this._parentage = null, Array.isArray(t))
                                for (const i of t) i.remove(this);
                            else t.remove(this);
                        const {
                            initialTeardown: r
                        } = this;
                        if (ie(r)) try {
                            r()
                        } catch (i) {
                            n = i instanceof As ? i.errors : [i]
                        }
                        const {
                            _finalizers: o
                        } = this;
                        if (o) {
                            this._finalizers = null;
                            for (const i of o) try {
                                qh(i)
                            } catch (s) {
                                n = n ? ? [], s instanceof As ? n = [...n, ...s.errors] : n.push(s)
                            }
                        }
                        if (n) throw new As(n)
                    }
                }
                add(n) {
                    var t;
                    if (n && n !== this)
                        if (this.closed) qh(n);
                        else {
                            if (n instanceof dt) {
                                if (n.closed || n._hasParent(this)) return;
                                n._addParent(this)
                            }(this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(n)
                        }
                }
                _hasParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    return t === n || Array.isArray(t) && t.includes(n)
                }
                _addParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
                }
                _removeParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    t === n ? this._parentage = null : Array.isArray(t) && Rr(t, n)
                }
                remove(n) {
                    const {
                        _finalizers: t
                    } = this;
                    t && Rr(t, n), n instanceof dt && n._removeParent(this)
                }
            }
            dt.EMPTY = (() => {
                const e = new dt;
                return e.closed = !0, e
            })();
            const zh = dt.EMPTY;

            function Gh(e) {
                return e instanceof dt || e && "closed" in e && ie(e.remove) && ie(e.add) && ie(e.unsubscribe)
            }

            function qh(e) {
                ie(e) ? e() : e.unsubscribe()
            }
            const lr = {
                    onUnhandledError: null,
                    onStoppedNotification: null,
                    Promise: void 0,
                    useDeprecatedSynchronousErrorHandling: !1,
                    useDeprecatedNextContext: !1
                },
                Ts = {
                    setTimeout(e, n, ...t) {
                        const {
                            delegate: r
                        } = Ts;
                        return r ? .setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t)
                    },
                    clearTimeout(e) {
                        const {
                            delegate: n
                        } = Ts;
                        return (n ? .clearTimeout || clearTimeout)(e)
                    },
                    delegate: void 0
                };

            function Wh(e) {
                Ts.setTimeout(() => {
                    const {
                        onUnhandledError: n
                    } = lr;
                    if (!n) throw e;
                    n(e)
                })
            }

            function sc() {}
            const sE = ac("C", void 0, void 0);

            function ac(e, n, t) {
                return {
                    kind: e,
                    value: n,
                    error: t
                }
            }
            let cr = null;

            function Os(e) {
                if (lr.useDeprecatedSynchronousErrorHandling) {
                    const n = !cr;
                    if (n && (cr = {
                            errorThrown: !1,
                            error: null
                        }), e(), n) {
                        const {
                            errorThrown: t,
                            error: r
                        } = cr;
                        if (cr = null, t) throw r
                    }
                } else e()
            }
            class lc extends dt {
                constructor(n) {
                    super(), this.isStopped = !1, n ? (this.destination = n, Gh(n) && n.add(this)) : this.destination = hE
                }
                static create(n, t, r) {
                    return new Jo(n, t, r)
                }
                next(n) {
                    this.isStopped ? uc(function lE(e) {
                        return ac("N", e, void 0)
                    }(n), this) : this._next(n)
                }
                error(n) {
                    this.isStopped ? uc(function aE(e) {
                        return ac("E", void 0, e)
                    }(n), this) : (this.isStopped = !0, this._error(n))
                }
                complete() {
                    this.isStopped ? uc(sE, this) : (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
                }
                _next(n) {
                    this.destination.next(n)
                }
                _error(n) {
                    try {
                        this.destination.error(n)
                    } finally {
                        this.unsubscribe()
                    }
                }
                _complete() {
                    try {
                        this.destination.complete()
                    } finally {
                        this.unsubscribe()
                    }
                }
            }
            const uE = Function.prototype.bind;

            function cc(e, n) {
                return uE.call(e, n)
            }
            class dE {
                constructor(n) {
                    this.partialObserver = n
                }
                next(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.next) try {
                        t.next(n)
                    } catch (r) {
                        Ps(r)
                    }
                }
                error(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.error) try {
                        t.error(n)
                    } catch (r) {
                        Ps(r)
                    } else Ps(n)
                }
                complete() {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.complete) try {
                        n.complete()
                    } catch (t) {
                        Ps(t)
                    }
                }
            }
            class Jo extends lc {
                constructor(n, t, r) {
                    let o;
                    if (super(), ie(n) || !n) o = {
                        next: n ? ? void 0,
                        error: t ? ? void 0,
                        complete: r ? ? void 0
                    };
                    else {
                        let i;
                        this && lr.useDeprecatedNextContext ? (i = Object.create(n), i.unsubscribe = () => this.unsubscribe(), o = {
                            next: n.next && cc(n.next, i),
                            error: n.error && cc(n.error, i),
                            complete: n.complete && cc(n.complete, i)
                        }) : o = n
                    }
                    this.destination = new dE(o)
                }
            }

            function Ps(e) {
                lr.useDeprecatedSynchronousErrorHandling ? function cE(e) {
                    lr.useDeprecatedSynchronousErrorHandling && cr && (cr.errorThrown = !0, cr.error = e)
                }(e) : Wh(e)
            }

            function uc(e, n) {
                const {
                    onStoppedNotification: t
                } = lr;
                t && Ts.setTimeout(() => t(e, n))
            }
            const hE = {
                    closed: !0,
                    next: sc,
                    error: function fE(e) {
                        throw e
                    },
                    complete: sc
                },
                dc = "function" == typeof Symbol && Symbol.observable || "@@observable";

            function Vn(e) {
                return e
            }

            function Zh(e) {
                return 0 === e.length ? Vn : 1 === e.length ? e[0] : function(t) {
                    return e.reduce((r, o) => o(r), t)
                }
            }
            let De = (() => {
                class e {
                    constructor(t) {
                        t && (this._subscribe = t)
                    }
                    lift(t) {
                        const r = new e;
                        return r.source = this, r.operator = t, r
                    }
                    subscribe(t, r, o) {
                        const i = function mE(e) {
                            return e && e instanceof lc || function gE(e) {
                                return e && ie(e.next) && ie(e.error) && ie(e.complete)
                            }(e) && Gh(e)
                        }(t) ? t : new Jo(t, r, o);
                        return Os(() => {
                            const {
                                operator: s,
                                source: a
                            } = this;
                            i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                        }), i
                    }
                    _trySubscribe(t) {
                        try {
                            return this._subscribe(t)
                        } catch (r) {
                            t.error(r)
                        }
                    }
                    forEach(t, r) {
                        return new(r = Yh(r))((o, i) => {
                            const s = new Jo({
                                next: a => {
                                    try {
                                        t(a)
                                    } catch (l) {
                                        i(l), s.unsubscribe()
                                    }
                                },
                                error: i,
                                complete: o
                            });
                            this.subscribe(s)
                        })
                    }
                    _subscribe(t) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(t)
                    }[dc]() {
                        return this
                    }
                    pipe(...t) {
                        return Zh(t)(this)
                    }
                    toPromise(t) {
                        return new(t = Yh(t))((r, o) => {
                            let i;
                            this.subscribe(s => i = s, s => o(s), () => r(i))
                        })
                    }
                }
                return e.create = n => new e(n), e
            })();

            function Yh(e) {
                var n;
                return null !== (n = e ? ? lr.Promise) && void 0 !== n ? n : Promise
            }
            const yE = Xo(e => function() {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            });
            let Ue = (() => {
                class e extends De {
                    constructor() {
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    }
                    lift(t) {
                        const r = new Qh(this, this);
                        return r.operator = t, r
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new yE
                    }
                    next(t) {
                        Os(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers) r.next(t)
                            }
                        })
                    }
                    error(t) {
                        Os(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = t;
                                const {
                                    observers: r
                                } = this;
                                for (; r.length;) r.shift().error(t)
                            }
                        })
                    }
                    complete() {
                        Os(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const {
                                    observers: t
                                } = this;
                                for (; t.length;) t.shift().complete()
                            }
                        })
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                    }
                    get observed() {
                        var t;
                        return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                    }
                    _trySubscribe(t) {
                        return this._throwIfClosed(), super._trySubscribe(t)
                    }
                    _subscribe(t) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
                    }
                    _innerSubscribe(t) {
                        const {
                            hasError: r,
                            isStopped: o,
                            observers: i
                        } = this;
                        return r || o ? zh : (this.currentObservers = null, i.push(t), new dt(() => {
                            this.currentObservers = null, Rr(i, t)
                        }))
                    }
                    _checkFinalizedStatuses(t) {
                        const {
                            hasError: r,
                            thrownError: o,
                            isStopped: i
                        } = this;
                        r ? t.error(o) : i && t.complete()
                    }
                    asObservable() {
                        const t = new De;
                        return t.source = this, t
                    }
                }
                return e.create = (n, t) => new Qh(n, t), e
            })();
            class Qh extends Ue {
                constructor(n, t) {
                    super(), this.destination = n, this.source = t
                }
                next(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === r || r.call(t, n)
                }
                error(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === r || r.call(t, n)
                }
                complete() {
                    var n, t;
                    null === (t = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) || void 0 === t || t.call(n)
                }
                _subscribe(n) {
                    var t, r;
                    return null !== (r = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n)) && void 0 !== r ? r : zh
                }
            }

            function Xh(e) {
                return ie(e ? .lift)
            }

            function Te(e) {
                return n => {
                    if (Xh(n)) return n.lift(function(t) {
                        try {
                            return e(t, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type")
                }
            }

            function xe(e, n, t, r, o) {
                return new vE(e, n, t, r, o)
            }
            class vE extends lc {
                constructor(n, t, r, o, i, s) {
                    super(n), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = t ? function(a) {
                        try {
                            t(a)
                        } catch (l) {
                            n.error(l)
                        }
                    } : super._next, this._error = o ? function(a) {
                        try {
                            o(a)
                        } catch (l) {
                            n.error(l)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._error, this._complete = r ? function() {
                        try {
                            r()
                        } catch (a) {
                            n.error(a)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._complete
                }
                unsubscribe() {
                    var n;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const {
                            closed: t
                        } = this;
                        super.unsubscribe(), !t && (null === (n = this.onFinalize) || void 0 === n || n.call(this))
                    }
                }
            }

            function Q(e, n) {
                return Te((t, r) => {
                    let o = 0;
                    t.subscribe(xe(r, i => {
                        r.next(e.call(n, i, o++))
                    }))
                })
            }

            function jn(e) {
                return this instanceof jn ? (this.v = e, this) : new jn(e)
            }

            function tp(e) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = function gc(e) {
                    var n = "function" == typeof Symbol && Symbol.iterator,
                        t = n && e[n],
                        r = 0;
                    if (t) return t.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
                    return this
                }, t);

                function r(i) {
                    t[i] = e[i] && function(s) {
                        return new Promise(function(a, l) {
                            ! function o(i, s, a, l) {
                                Promise.resolve(l).then(function(c) {
                                    i({
                                        value: c,
                                        done: a
                                    })
                                }, s)
                            }(a, l, (s = e[i](s)).done, s.value)
                        })
                    }
                }
            }
            "function" == typeof SuppressedError && SuppressedError;
            const np = e => e && "number" == typeof e.length && "function" != typeof e;

            function rp(e) {
                return ie(e ? .then)
            }

            function op(e) {
                return ie(e[dc])
            }

            function ip(e) {
                return Symbol.asyncIterator && ie(e ? .[Symbol.asyncIterator])
            }

            function sp(e) {
                return new TypeError(`You provided ${null!==e&&"object"==typeof e?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
            }
            const ap = function $E() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }();

            function lp(e) {
                return ie(e ? .[ap])
            }

            function cp(e) {
                return function ep(e, n, t) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var o, r = t.apply(e, n || []),
                        i = [];
                    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
                        return this
                    }, o;

                    function s(f) {
                        r[f] && (o[f] = function(h) {
                            return new Promise(function(p, g) {
                                i.push([f, h, p, g]) > 1 || a(f, h)
                            })
                        })
                    }

                    function a(f, h) {
                        try {
                            ! function l(f) {
                                f.value instanceof jn ? Promise.resolve(f.value.v).then(c, u) : d(i[0][2], f)
                            }(r[f](h))
                        } catch (p) {
                            d(i[0][3], p)
                        }
                    }

                    function c(f) {
                        a("next", f)
                    }

                    function u(f) {
                        a("throw", f)
                    }

                    function d(f, h) {
                        f(h), i.shift(), i.length && a(i[0][0], i[0][1])
                    }
                }(this, arguments, function*() {
                    const t = e.getReader();
                    try {
                        for (;;) {
                            const {
                                value: r,
                                done: o
                            } = yield jn(t.read());
                            if (o) return yield jn(void 0);
                            yield yield jn(r)
                        }
                    } finally {
                        t.releaseLock()
                    }
                })
            }

            function up(e) {
                return ie(e ? .getReader)
            }

            function Dt(e) {
                if (e instanceof De) return e;
                if (null != e) {
                    if (op(e)) return function BE(e) {
                        return new De(n => {
                            const t = e[dc]();
                            if (ie(t.subscribe)) return t.subscribe(n);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        })
                    }(e);
                    if (np(e)) return function HE(e) {
                        return new De(n => {
                            for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                            n.complete()
                        })
                    }(e);
                    if (rp(e)) return function UE(e) {
                        return new De(n => {
                            e.then(t => {
                                n.closed || (n.next(t), n.complete())
                            }, t => n.error(t)).then(null, Wh)
                        })
                    }(e);
                    if (ip(e)) return dp(e);
                    if (lp(e)) return function zE(e) {
                        return new De(n => {
                            for (const t of e)
                                if (n.next(t), n.closed) return;
                            n.complete()
                        })
                    }(e);
                    if (up(e)) return function GE(e) {
                        return dp(cp(e))
                    }(e)
                }
                throw sp(e)
            }

            function dp(e) {
                return new De(n => {
                    (function qE(e, n) {
                        var t, r, o, i;
                        return function Jh(e, n, t, r) {
                            return new(t || (t = Promise))(function(i, s) {
                                function a(u) {
                                    try {
                                        c(r.next(u))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function l(u) {
                                    try {
                                        c(r.throw(u))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function c(u) {
                                    u.done ? i(u.value) : function o(i) {
                                        return i instanceof t ? i : new t(function(s) {
                                            s(i)
                                        })
                                    }(u.value).then(a, l)
                                }
                                c((r = r.apply(e, n || [])).next())
                            })
                        }(this, void 0, void 0, function*() {
                            try {
                                for (t = tp(e); !(r = yield t.next()).done;)
                                    if (n.next(r.value), n.closed) return
                            } catch (s) {
                                o = {
                                    error: s
                                }
                            } finally {
                                try {
                                    r && !r.done && (i = t.return) && (yield i.call(t))
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            n.complete()
                        })
                    })(e, n).catch(t => n.error(t))
                })
            }

            function _n(e, n, t, r = 0, o = !1) {
                const i = n.schedule(function() {
                    t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
                }, r);
                if (e.add(i), !o) return i
            }

            function Le(e, n, t = 1 / 0) {
                return ie(n) ? Le((r, o) => Q((i, s) => n(r, i, o, s))(Dt(e(r, o))), t) : ("number" == typeof n && (t = n), Te((r, o) => function WE(e, n, t, r, o, i, s, a) {
                    const l = [];
                    let c = 0,
                        u = 0,
                        d = !1;
                    const f = () => {
                            d && !l.length && !c && n.complete()
                        },
                        h = g => c < r ? p(g) : l.push(g),
                        p = g => {
                            i && n.next(g), c++;
                            let y = !1;
                            Dt(t(g, u++)).subscribe(xe(n, v => {
                                o ? .(v), i ? h(v) : n.next(v)
                            }, () => {
                                y = !0
                            }, void 0, () => {
                                if (y) try {
                                    for (c--; l.length && c < r;) {
                                        const v = l.shift();
                                        s ? _n(n, s, () => p(v)) : p(v)
                                    }
                                    f()
                                } catch (v) {
                                    n.error(v)
                                }
                            }))
                        };
                    return e.subscribe(xe(n, h, () => {
                        d = !0, f()
                    })), () => {
                        a ? .()
                    }
                }(r, o, e, t)))
            }

            function Fr(e = 1 / 0) {
                return Le(Vn, e)
            }
            const en = new De(e => e.complete());

            function fp(e) {
                return e && ie(e.schedule)
            }

            function mc(e) {
                return e[e.length - 1]
            }

            function hp(e) {
                return ie(mc(e)) ? e.pop() : void 0
            }

            function Ko(e) {
                return fp(mc(e)) ? e.pop() : void 0
            }

            function pp(e, n = 0) {
                return Te((t, r) => {
                    t.subscribe(xe(r, o => _n(r, e, () => r.next(o), n), () => _n(r, e, () => r.complete(), n), o => _n(r, e, () => r.error(o), n)))
                })
            }

            function gp(e, n = 0) {
                return Te((t, r) => {
                    r.add(e.schedule(() => t.subscribe(r), n))
                })
            }

            function mp(e, n) {
                if (!e) throw new Error("Iterable cannot be null");
                return new De(t => {
                    _n(t, n, () => {
                        const r = e[Symbol.asyncIterator]();
                        _n(t, n, () => {
                            r.next().then(o => {
                                o.done ? t.complete() : t.next(o.value)
                            })
                        }, 0, !0)
                    })
                })
            }

            function Oe(e, n) {
                return n ? function tM(e, n) {
                    if (null != e) {
                        if (op(e)) return function QE(e, n) {
                            return Dt(e).pipe(gp(n), pp(n))
                        }(e, n);
                        if (np(e)) return function JE(e, n) {
                            return new De(t => {
                                let r = 0;
                                return n.schedule(function() {
                                    r === e.length ? t.complete() : (t.next(e[r++]), t.closed || this.schedule())
                                })
                            })
                        }(e, n);
                        if (rp(e)) return function XE(e, n) {
                            return Dt(e).pipe(gp(n), pp(n))
                        }(e, n);
                        if (ip(e)) return mp(e, n);
                        if (lp(e)) return function KE(e, n) {
                            return new De(t => {
                                let r;
                                return _n(t, n, () => {
                                    r = e[ap](), _n(t, n, () => {
                                        let o, i;
                                        try {
                                            ({
                                                value: o,
                                                done: i
                                            } = r.next())
                                        } catch (s) {
                                            return void t.error(s)
                                        }
                                        i ? t.complete() : t.next(o)
                                    }, 0, !0)
                                }), () => ie(r ? .return) && r.return()
                            })
                        }(e, n);
                        if (up(e)) return function eM(e, n) {
                            return mp(cp(e), n)
                        }(e, n)
                    }
                    throw sp(e)
                }(e, n) : Dt(e)
            }

            function yp(...e) {
                const n = Ko(e),
                    t = function YE(e, n) {
                        return "number" == typeof mc(e) ? e.pop() : n
                    }(e, 1 / 0),
                    r = e;
                return r.length ? 1 === r.length ? Dt(r[0]) : Fr(t)(Oe(r, n)) : en
            }
            class Rt extends Ue {
                constructor(n) {
                    super(), this._value = n
                }
                get value() {
                    return this.getValue()
                }
                _subscribe(n) {
                    const t = super._subscribe(n);
                    return !t.closed && n.next(this._value), t
                }
                getValue() {
                    const {
                        hasError: n,
                        thrownError: t,
                        _value: r
                    } = this;
                    if (n) throw t;
                    return this._throwIfClosed(), r
                }
                next(n) {
                    super.next(this._value = n)
                }
            }

            function k(...e) {
                return Oe(e, Ko(e))
            }

            function yc(e = {}) {
                const {
                    connector: n = (() => new Ue),
                    resetOnError: t = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0
                } = e;
                return i => {
                    let s, a, l, c = 0,
                        u = !1,
                        d = !1;
                    const f = () => {
                            a ? .unsubscribe(), a = void 0
                        },
                        h = () => {
                            f(), s = l = void 0, u = d = !1
                        },
                        p = () => {
                            const g = s;
                            h(), g ? .unsubscribe()
                        };
                    return Te((g, y) => {
                        c++, !d && !u && f();
                        const v = l = l ? ? n();
                        y.add(() => {
                            c--, 0 === c && !d && !u && (a = vc(p, o))
                        }), v.subscribe(y), !s && c > 0 && (s = new Jo({
                            next: m => v.next(m),
                            error: m => {
                                d = !0, f(), a = vc(h, t, m), v.error(m)
                            },
                            complete: () => {
                                u = !0, f(), a = vc(h, r), v.complete()
                            }
                        }), Dt(g).subscribe(s))
                    })(i)
                }
            }

            function vc(e, n, ...t) {
                if (!0 === n) return void e();
                if (!1 === n) return;
                const r = new Jo({
                    next: () => {
                        r.unsubscribe(), e()
                    }
                });
                return Dt(n(...t)).subscribe(r)
            }

            function Ft(e, n) {
                return Te((t, r) => {
                    let o = null,
                        i = 0,
                        s = !1;
                    const a = () => s && !o && r.complete();
                    t.subscribe(xe(r, l => {
                        o ? .unsubscribe();
                        let c = 0;
                        const u = i++;
                        Dt(e(l, u)).subscribe(o = xe(r, d => r.next(n ? n(l, d, u, c++) : d), () => {
                            o = null, a()
                        }))
                    }, () => {
                        s = !0, a()
                    }))
                })
            }

            function vp(e, n = Vn) {
                return e = e ? ? nM, Te((t, r) => {
                    let o, i = !0;
                    t.subscribe(xe(r, s => {
                        const a = n(s);
                        (i || !e(o, a)) && (i = !1, o = a, r.next(s))
                    }))
                })
            }

            function nM(e, n) {
                return e === n
            }

            function te(e) {
                for (let n in e)
                    if (e[n] === te) return n;
                throw Error("Could not find renamed property on target object.")
            }

            function ks(e, n) {
                for (const t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
            }

            function Pe(e) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return "[" + e.map(Pe).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const n = e.toString();
                if (null == n) return "" + n;
                const t = n.indexOf("\n");
                return -1 === t ? n : n.substring(0, t)
            }

            function _c(e, n) {
                return null == e || "" === e ? null === n ? "" : n : null == n || "" === n ? e : e + " " + n
            }
            const rM = te({
                __forward_ref__: te
            });

            function ue(e) {
                return e.__forward_ref__ = ue, e.toString = function() {
                    return Pe(this())
                }, e
            }

            function j(e) {
                return Cc(e) ? e() : e
            }

            function Cc(e) {
                return "function" == typeof e && e.hasOwnProperty(rM) && e.__forward_ref__ === ue
            }

            function Dc(e) {
                return e && !!e.\u0275providers
            }
            const _p = "https://g.co/ng/security#xss";
            class D extends Error {
                constructor(n, t) {
                    super(function Ns(e, n) {
                        return `NG0${Math.abs(e)}${n?": "+n:""}`
                    }(n, t)), this.code = n
                }
            }

            function B(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }

            function wc(e, n) {
                throw new D(-201, !1)
            }

            function Lt(e, n) {
                null == e && function N(e, n, t, r) {
                    throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`))
                }(n, e, null, "!=")
            }

            function A(e) {
                return {
                    token: e.token,
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function ft(e) {
                return {
                    providers: e.providers || [],
                    imports: e.imports || []
                }
            }

            function Rs(e) {
                return Cp(e, Ls) || Cp(e, Dp)
            }

            function Cp(e, n) {
                return e.hasOwnProperty(n) ? e[n] : null
            }

            function Fs(e) {
                return e && (e.hasOwnProperty(bc) || e.hasOwnProperty(dM)) ? e[bc] : null
            }
            const Ls = te({\
                    u0275prov: te
                }),
                bc = te({\
                    u0275inj: te
                }),
                Dp = te({
                    ngInjectableDef: te
                }),
                dM = te({
                    ngInjectorDef: te
                });
            var q = function(e) {
                return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
            }(q || {});
            let Ec;

            function ht(e) {
                const n = Ec;
                return Ec = e, n
            }

            function bp(e, n, t) {
                const r = Rs(e);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : t & q.Optional ? null : void 0 !== n ? n : void wc(Pe(e))
            }
            const de = globalThis;
            class E {
                constructor(n, t) {
                    this._desc = n, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = A({
                        token: this,
                        providedIn: t.providedIn || "root",
                        factory: t.factory
                    }))
                }
                get multi() {
                    return this
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }
            const ei = {},
                Ac = "__NG_DI_FLAG__",
                Vs = "ngTempTokenPath",
                pM = /\n/gm,
                Mp = "__source";
            let Lr;

            function $n(e) {
                const n = Lr;
                return Lr = e, n
            }

            function yM(e, n = q.Default) {
                if (void 0 === Lr) throw new D(-203, !1);
                return null === Lr ? bp(e, void 0, n) : Lr.get(e, n & q.Optional ? null : void 0, n)
            }

            function I(e, n = q.Default) {
                return (function wp() {
                    return Ec
                }() || yM)(j(e), n)
            }

            function M(e, n = q.Default) {
                return I(e, js(n))
            }

            function js(e) {
                return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
            }

            function Tc(e) {
                const n = [];
                for (let t = 0; t < e.length; t++) {
                    const r = j(e[t]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new D(900, !1);
                        let o, i = q.Default;
                        for (let s = 0; s < r.length; s++) {
                            const a = r[s],
                                l = vM(a);
                            "number" == typeof l ? -1 === l ? o = a.token : i |= l : o = a
                        }
                        n.push(I(o, i))
                    } else n.push(I(r))
                }
                return n
            }

            function ti(e, n) {
                return e[Ac] = n, e.prototype[Ac] = n, e
            }

            function vM(e) {
                return e[Ac]
            }

            function Cn(e) {
                return {
                    toString: e
                }.toString()
            }
            var $s = function(e) {
                    return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
                }($s || {}),
                zt = function(e) {
                    return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
                }(zt || {});
            const tn = {},
                X = [],
                Bs = te({\
                    u0275cmp: te
                }),
                Oc = te({\
                    u0275dir: te
                }),
                Pc = te({\
                    u0275pipe: te
                }),
                xp = te({\
                    u0275mod: te
                }),
                Dn = te({\
                    u0275fac: te
                }),
                ni = te({
                    __NG_ELEMENT_ID__: te
                }),
                Sp = te({
                    __NG_ENV_ID__: te
                });

            function Ap(e, n, t) {
                let r = e.length;
                for (;;) {
                    const o = e.indexOf(n, t);
                    if (-1 === o) return o;
                    if (0 === o || e.charCodeAt(o - 1) <= 32) {
                        const i = n.length;
                        if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                    }
                    t = o + 1
                }
            }

            function kc(e, n, t) {
                let r = 0;
                for (; r < t.length;) {
                    const o = t[r];
                    if ("number" == typeof o) {
                        if (0 !== o) break;
                        r++;
                        const i = t[r++],
                            s = t[r++],
                            a = t[r++];
                        e.setAttribute(n, s, a, i)
                    } else {
                        const i = o,
                            s = t[++r];
                        Op(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++
                    }
                }
                return r
            }

            function Tp(e) {
                return 3 === e || 4 === e || 6 === e
            }

            function Op(e) {
                return 64 === e.charCodeAt(0)
            }

            function ri(e, n) {
                if (null !== n && 0 !== n.length)
                    if (null === e || 0 === e.length) e = n.slice();
                    else {
                        let t = -1;
                        for (let r = 0; r < n.length; r++) {
                            const o = n[r];
                            "number" == typeof o ? t = o : 0 === t || Pp(e, t, o, null, -1 === t || 2 === t ? n[++r] : null)
                        }
                    }
                return e
            }

            function Pp(e, n, t, r, o) {
                let i = 0,
                    s = e.length;
                if (-1 === n) s = -1;
                else
                    for (; i < e.length;) {
                        const a = e[i++];
                        if ("number" == typeof a) {
                            if (a === n) {
                                s = -1;
                                break
                            }
                            if (a > n) {
                                s = i - 1;
                                break
                            }
                        }
                    }
                for (; i < e.length;) {
                    const a = e[i];
                    if ("number" == typeof a) break;
                    if (a === t) {
                        if (null === r) return void(null !== o && (e[i + 1] = o));
                        if (r === e[i + 1]) return void(e[i + 2] = o)
                    }
                    i++, null !== r && i++, null !== o && i++
                } - 1 !== s && (e.splice(s, 0, n), i = s + 1), e.splice(i++, 0, t), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
            }
            const kp = "ng-template";

            function DM(e, n, t) {
                let r = 0,
                    o = !0;
                for (; r < e.length;) {
                    let i = e[r++];
                    if ("string" == typeof i && o) {
                        const s = e[r++];
                        if (t && "class" === i && -1 !== Ap(s.toLowerCase(), n, 0)) return !0
                    } else {
                        if (1 === i) {
                            for (; r < e.length && "string" == typeof(i = e[r++]);)
                                if (i.toLowerCase() === n) return !0;
                            return !1
                        }
                        "number" == typeof i && (o = !1)
                    }
                }
                return !1
            }

            function Np(e) {
                return 4 === e.type && e.value !== kp
            }

            function wM(e, n, t) {
                return n === (4 !== e.type || t ? e.value : kp)
            }

            function bM(e, n, t) {
                let r = 4;
                const o = e.attrs || [],
                    i = function IM(e) {
                        for (let n = 0; n < e.length; n++)
                            if (Tp(e[n])) return n;
                        return e.length
                    }(o);
                let s = !1;
                for (let a = 0; a < n.length; a++) {
                    const l = n[a];
                    if ("number" != typeof l) {
                        if (!s)
                            if (4 & r) {
                                if (r = 2 | 1 & r, "" !== l && !wM(e, l, t) || "" === l && 1 === n.length) {
                                    if (Gt(r)) return !1;
                                    s = !0
                                }
                            } else {
                                const c = 8 & r ? l : n[++a];
                                if (8 & r && null !== e.attrs) {
                                    if (!DM(e.attrs, c, t)) {
                                        if (Gt(r)) return !1;
                                        s = !0
                                    }
                                    continue
                                }
                                const d = EM(8 & r ? "class" : l, o, Np(e), t);
                                if (-1 === d) {
                                    if (Gt(r)) return !1;
                                    s = !0;
                                    continue
                                }
                                if ("" !== c) {
                                    let f;
                                    f = d > i ? "" : o[d + 1].toLowerCase();
                                    const h = 8 & r ? f : null;
                                    if (h && -1 !== Ap(h, c, 0) || 2 & r && c !== f) {
                                        if (Gt(r)) return !1;
                                        s = !0
                                    }
                                }
                            }
                    } else {
                        if (!s && !Gt(r) && !Gt(l)) return !1;
                        if (s && Gt(l)) continue;
                        s = !1, r = l | 1 & r
                    }
                }
                return Gt(r) || s
            }

            function Gt(e) {
                return 0 == (1 & e)
            }

            function EM(e, n, t, r) {
                if (null === n) return -1;
                let o = 0;
                if (r || !t) {
                    let i = !1;
                    for (; o < n.length;) {
                        const s = n[o];
                        if (s === e) return o;
                        if (3 === s || 6 === s) i = !0;
                        else {
                            if (1 === s || 2 === s) {
                                let a = n[++o];
                                for (;
                                    "string" == typeof a;) a = n[++o];
                                continue
                            }
                            if (4 === s) break;
                            if (0 === s) {
                                o += 4;
                                continue
                            }
                        }
                        o += i ? 1 : 2
                    }
                    return -1
                }
                return function xM(e, n) {
                    let t = e.indexOf(4);
                    if (t > -1)
                        for (t++; t < e.length;) {
                            const r = e[t];
                            if ("number" == typeof r) return -1;
                            if (r === n) return t;
                            t++
                        }
                    return -1
                }(n, e)
            }

            function Rp(e, n, t = !1) {
                for (let r = 0; r < n.length; r++)
                    if (bM(e, n[r], t)) return !0;
                return !1
            }

            function SM(e, n) {
                e: for (let t = 0; t < n.length; t++) {
                    const r = n[t];
                    if (e.length === r.length) {
                        for (let o = 0; o < e.length; o++)
                            if (e[o] !== r[o]) continue e;
                        return !0
                    }
                }
                return !1
            }

            function Fp(e, n) {
                return e ? ":not(" + n.trim() + ")" : n
            }

            function AM(e) {
                let n = e[0],
                    t = 1,
                    r = 2,
                    o = "",
                    i = !1;
                for (; t < e.length;) {
                    let s = e[t];
                    if ("string" == typeof s)
                        if (2 & r) {
                            const a = e[++t];
                            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                        } else 8 & r ? o += "." + s : 4 & r && (o += " " + s);
                    else "" !== o && !Gt(s) && (n += Fp(i, o), o = ""), r = s, i = i || !Gt(r);
                    t++
                }
                return "" !== o && (n += Fp(i, o)), n
            }

            function wn(e) {
                return Cn(() => {
                    const n = Vp(e),
                        t = { ...n,
                            decls: e.decls,
                            vars: e.vars,
                            template: e.template,
                            consts: e.consts || null,
                            ngContentSelectors: e.ngContentSelectors,
                            onPush: e.changeDetection === $s.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            dependencies: n.standalone && e.dependencies || null,
                            getStandaloneInjector: null,
                            signals: e.signals ? ? !1,
                            data: e.data || {},
                            encapsulation: e.encapsulation || zt.Emulated,
                            styles: e.styles || X,
                            _: null,
                            schemas: e.schemas || null,
                            tView: null,
                            id: ""
                        };
                    jp(t);
                    const r = e.dependencies;
                    return t.directiveDefs = Hs(r, !1), t.pipeDefs = Hs(r, !0), t.id = function LM(e) {
                        let n = 0;
                        const t = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                        for (const o of t) n = Math.imul(31, n) + o.charCodeAt(0) << 0;
                        return n += 2147483648, "c" + n
                    }(t), t
                })
            }

            function kM(e) {
                return Z(e) || Ve(e)
            }

            function NM(e) {
                return null !== e
            }

            function bt(e) {
                return Cn(() => ({
                    type: e.type,
                    bootstrap: e.bootstrap || X,
                    declarations: e.declarations || X,
                    imports: e.imports || X,
                    exports: e.exports || X,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                }))
            }

            function Lp(e, n) {
                if (null == e) return tn;
                const t = {};
                for (const r in e)
                    if (e.hasOwnProperty(r)) {
                        let o = e[r],
                            i = o;
                        Array.isArray(o) && (i = o[1], o = o[0]), t[o] = r, n && (n[o] = i)
                    }
                return t
            }

            function $(e) {
                return Cn(() => {
                    const n = Vp(e);
                    return jp(n), n
                })
            }

            function ze(e) {
                return {
                    type: e.type,
                    name: e.name,
                    factory: null,
                    pure: !1 !== e.pure,
                    standalone: !0 === e.standalone,
                    onDestroy: e.type.prototype.ngOnDestroy || null
                }
            }

            function Z(e) {
                return e[Bs] || null
            }

            function Ve(e) {
                return e[Oc] || null
            }

            function et(e) {
                return e[Pc] || null
            }

            function Et(e, n) {
                const t = e[xp] || null;
                if (!t && !0 === n) throw new Error(`Type ${Pe(e)} does not have '\u0275mod' property.`);
                return t
            }

            function Vp(e) {
                const n = {};
                return {
                    type: e.type,
                    providersResolver: null,
                    factory: null,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: n,
                    inputTransforms: null,
                    inputConfig: e.inputs || tn,
                    exportAs: e.exportAs || null,
                    standalone: !0 === e.standalone,
                    signals: !0 === e.signals,
                    selectors: e.selectors || X,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    setInput: null,
                    findHostDirectiveDefs: null,
                    hostDirectives: null,
                    inputs: Lp(e.inputs, n),
                    outputs: Lp(e.outputs)
                }
            }

            function jp(e) {
                e.features ? .forEach(n => n(e))
            }

            function Hs(e, n) {
                if (!e) return null;
                const t = n ? et : kM;
                return () => ("function" == typeof e ? e() : e).map(r => t(r)).filter(NM)
            }
            const we = 0,
                b = 1,
                z = 2,
                ve = 3,
                qt = 4,
                oi = 5,
                Ge = 6,
                jr = 7,
                Ee = 8,
                Bn = 9,
                $r = 10,
                H = 11,
                ii = 12,
                $p = 13,
                Br = 14,
                Me = 15,
                si = 16,
                Hr = 17,
                nn = 18,
                ai = 19,
                Bp = 20,
                Hn = 21,
                bn = 22,
                li = 23,
                ci = 24,
                W = 25,
                Nc = 1,
                Hp = 2,
                rn = 7,
                Ur = 9,
                je = 11;

            function pt(e) {
                return Array.isArray(e) && "object" == typeof e[Nc]
            }

            function tt(e) {
                return Array.isArray(e) && !0 === e[Nc]
            }

            function Rc(e) {
                return 0 != (4 & e.flags)
            }

            function dr(e) {
                return e.componentOffset > -1
            }

            function zs(e) {
                return 1 == (1 & e.flags)
            }

            function Wt(e) {
                return !!e.template
            }

            function Fc(e) {
                return 0 != (512 & e[z])
            }

            function fr(e, n) {
                return e.hasOwnProperty(Dn) ? e[Dn] : null
            }
            let $e = null,
                Gs = !1;

            function Vt(e) {
                const n = $e;
                return $e = e, n
            }
            const Gp = {
                version: 0,
                dirty: !1,
                producerNode: void 0,
                producerLastReadVersion: void 0,
                producerIndexOfThis: void 0,
                nextProducerIndex: 0,
                liveConsumerNode: void 0,
                liveConsumerIndexOfThis: void 0,
                consumerAllowSignalWrites: !1,
                consumerIsAlwaysLive: !1,
                producerMustRecompute: () => !1,
                producerRecomputeValue: () => {},
                consumerMarkedDirty: () => {}
            };

            function Wp(e) {
                if (!di(e) || e.dirty) {
                    if (!e.producerMustRecompute(e) && !Qp(e)) return void(e.dirty = !1);
                    e.producerRecomputeValue(e), e.dirty = !1
                }
            }

            function Yp(e) {
                e.dirty = !0,
                    function Zp(e) {
                        if (void 0 === e.liveConsumerNode) return;
                        const n = Gs;
                        Gs = !0;
                        try {
                            for (const t of e.liveConsumerNode) t.dirty || Yp(t)
                        } finally {
                            Gs = n
                        }
                    }(e), e.consumerMarkedDirty ? .(e)
            }

            function Vc(e) {
                return e && (e.nextProducerIndex = 0), Vt(e)
            }

            function jc(e, n) {
                if (Vt(n), e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion) {
                    if (di(e))
                        for (let t = e.nextProducerIndex; t < e.producerNode.length; t++) qs(e.producerNode[t], e.producerIndexOfThis[t]);
                    for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
                }
            }

            function Qp(e) {
                zr(e);
                for (let n = 0; n < e.producerNode.length; n++) {
                    const t = e.producerNode[n],
                        r = e.producerLastReadVersion[n];
                    if (r !== t.version || (Wp(t), r !== t.version)) return !0
                }
                return !1
            }

            function Xp(e) {
                if (zr(e), di(e))
                    for (let n = 0; n < e.producerNode.length; n++) qs(e.producerNode[n], e.producerIndexOfThis[n]);
                e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
            }

            function qs(e, n) {
                if (function Kp(e) {
                        e.liveConsumerNode ? ? = [], e.liveConsumerIndexOfThis ? ? = []
                    }(e), zr(e), 1 === e.liveConsumerNode.length)
                    for (let r = 0; r < e.producerNode.length; r++) qs(e.producerNode[r], e.producerIndexOfThis[r]);
                const t = e.liveConsumerNode.length - 1;
                if (e.liveConsumerNode[n] = e.liveConsumerNode[t], e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, n < e.liveConsumerNode.length) {
                    const r = e.liveConsumerIndexOfThis[n],
                        o = e.liveConsumerNode[n];
                    zr(o), o.producerIndexOfThis[r] = n
                }
            }

            function di(e) {
                return e.consumerIsAlwaysLive || (e ? .liveConsumerNode ? .length ? ? 0) > 0
            }

            function zr(e) {
                e.producerNode ? ? = [], e.producerIndexOfThis ? ? = [], e.producerLastReadVersion ? ? = []
            }
            let eg = null;

            function rg(e) {
                const n = Vt(null);
                try {
                    return e()
                } finally {
                    Vt(n)
                }
            }
            const og = () => {},
                QM = (() => ({ ...Gp,
                    consumerIsAlwaysLive: !0,
                    consumerAllowSignalWrites: !1,
                    consumerMarkedDirty: e => {
                        e.schedule(e.ref)
                    },
                    hasRun: !1,
                    cleanupFn: og
                }))();
            class XM {
                constructor(n, t, r) {
                    this.previousValue = n, this.currentValue = t, this.firstChange = r
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function Mt() {
                return ig
            }

            function ig(e) {
                return e.type.prototype.ngOnChanges && (e.setInput = KM), JM
            }

            function JM() {
                const e = ag(this),
                    n = e ? .current;
                if (n) {
                    const t = e.previous;
                    if (t === tn) e.previous = n;
                    else
                        for (let r in n) t[r] = n[r];
                    e.current = null, this.ngOnChanges(n)
                }
            }

            function KM(e, n, t, r) {
                const o = this.declaredInputs[t],
                    i = ag(e) || function eI(e, n) {
                        return e[sg] = n
                    }(e, {
                        previous: tn,
                        current: null
                    }),
                    s = i.current || (i.current = {}),
                    a = i.previous,
                    l = a[o];
                s[o] = new XM(l && l.currentValue, n, a === tn), e[r] = n
            }
            Mt.ngInherit = !0;
            const sg = "__ngSimpleChanges__";

            function ag(e) {
                return e[sg] || null
            }
            const on = function(e, n, t) {},
                lg = "svg";

            function fe(e) {
                for (; Array.isArray(e);) e = e[we];
                return e
            }

            function Ws(e, n) {
                return fe(n[e])
            }

            function gt(e, n) {
                return fe(n[e.index])
            }

            function ug(e, n) {
                return e.data[n]
            }

            function It(e, n) {
                const t = n[e];
                return pt(t) ? t : t[we]
            }

            function zn(e, n) {
                return null == n ? null : e[n]
            }

            function dg(e) {
                e[Hr] = 0
            }

            function sI(e) {
                1024 & e[z] || (e[z] |= 1024, hg(e, 1))
            }

            function fg(e) {
                1024 & e[z] && (e[z] &= -1025, hg(e, -1))
            }

            function hg(e, n) {
                let t = e[ve];
                if (null === t) return;
                t[oi] += n;
                let r = t;
                for (t = t[ve]; null !== t && (1 === n && 1 === r[oi] || -1 === n && 0 === r[oi]);) t[oi] += n, r = t, t = t[ve]
            }
            const R = {
                lFrame: Eg(null),
                bindingsEnabled: !0,
                skipHydrationRootTNode: null
            };

            function mg() {
                return R.bindingsEnabled
            }

            function qr() {
                return null !== R.skipHydrationRootTNode
            }

            function _() {
                return R.lFrame.lView
            }

            function Y() {
                return R.lFrame.tView
            }

            function hr(e) {
                return R.lFrame.contextLView = e, e[Ee]
            }

            function pr(e) {
                return R.lFrame.contextLView = null, e
            }

            function Be() {
                let e = yg();
                for (; null !== e && 64 === e.type;) e = e.parent;
                return e
            }

            function yg() {
                return R.lFrame.currentTNode
            }

            function sn(e, n) {
                const t = R.lFrame;
                t.currentTNode = e, t.isParent = n
            }

            function zc() {
                return R.lFrame.isParent
            }

            function Gc() {
                R.lFrame.isParent = !1
            }

            function nt() {
                const e = R.lFrame;
                let n = e.bindingRootIndex;
                return -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
            }

            function Wr() {
                return R.lFrame.bindingIndex++
            }

            function vI(e, n) {
                const t = R.lFrame;
                t.bindingIndex = t.bindingRootIndex = e, qc(n)
            }

            function qc(e) {
                R.lFrame.currentDirectiveIndex = e
            }

            function Dg() {
                return R.lFrame.currentQueryIndex
            }

            function Zc(e) {
                R.lFrame.currentQueryIndex = e
            }

            function CI(e) {
                const n = e[b];
                return 2 === n.type ? n.declTNode : 1 === n.type ? e[Ge] : null
            }

            function wg(e, n, t) {
                if (t & q.SkipSelf) {
                    let o = n,
                        i = e;
                    for (; !(o = o.parent, null !== o || t & q.Host || (o = CI(i), null === o || (i = i[Br], 10 & o.type))););
                    if (null === o) return !1;
                    n = o, e = i
                }
                const r = R.lFrame = bg();
                return r.currentTNode = n, r.lView = e, !0
            }

            function Yc(e) {
                const n = bg(),
                    t = e[b];
                R.lFrame = n, n.currentTNode = t.firstChild, n.lView = e, n.tView = t, n.contextLView = e, n.bindingIndex = t.bindingStartIndex, n.inI18n = !1
            }

            function bg() {
                const e = R.lFrame,
                    n = null === e ? null : e.child;
                return null === n ? Eg(e) : n
            }

            function Eg(e) {
                const n = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: e,
                    child: null,
                    inI18n: !1
                };
                return null !== e && (e.child = n), n
            }

            function Mg() {
                const e = R.lFrame;
                return R.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
            }
            const Ig = Mg;

            function Qc() {
                const e = Mg();
                e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
            }

            function rt() {
                return R.lFrame.selectedIndex
            }

            function gr(e) {
                R.lFrame.selectedIndex = e
            }

            function Ce() {
                const e = R.lFrame;
                return ug(e.tView, e.selectedIndex)
            }

            function Zs() {
                R.lFrame.currentNamespace = lg
            }
            let Sg = !0;

            function Ys() {
                return Sg
            }

            function Gn(e) {
                Sg = e
            }

            function Qs(e, n) {
                for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
                    const i = e.data[t].type.prototype,
                        {
                            ngAfterContentInit: s,
                            ngAfterContentChecked: a,
                            ngAfterViewInit: l,
                            ngAfterViewChecked: c,
                            ngOnDestroy: u
                        } = i;
                    s && (e.contentHooks ? ? = []).push(-t, s), a && ((e.contentHooks ? ? = []).push(t, a), (e.contentCheckHooks ? ? = []).push(t, a)), l && (e.viewHooks ? ? = []).push(-t, l), c && ((e.viewHooks ? ? = []).push(t, c), (e.viewCheckHooks ? ? = []).push(t, c)), null != u && (e.destroyHooks ? ? = []).push(t, u)
                }
            }

            function Xs(e, n, t) {
                Ag(e, n, 3, t)
            }

            function Js(e, n, t, r) {
                (3 & e[z]) === t && Ag(e, n, t, r)
            }

            function Xc(e, n) {
                let t = e[z];
                (3 & t) === n && (t &= 8191, t += 1, e[z] = t)
            }

            function Ag(e, n, t, r) {
                const i = r ? ? -1,
                    s = n.length - 1;
                let a = 0;
                for (let l = void 0 !== r ? 65535 & e[Hr] : 0; l < s; l++)
                    if ("number" == typeof n[l + 1]) {
                        if (a = n[l], null != r && a >= r) break
                    } else n[l] < 0 && (e[Hr] += 65536), (a < i || -1 == i) && (xI(e, t, n, l), e[Hr] = (4294901760 & e[Hr]) + l + 2), l++
            }

            function Tg(e, n) {
                on(4, e, n);
                const t = Vt(null);
                try {
                    n.call(e)
                } finally {
                    Vt(t), on(5, e, n)
                }
            }

            function xI(e, n, t, r) {
                const o = t[r] < 0,
                    i = t[r + 1],
                    a = e[o ? -t[r] : t[r]];
                o ? e[z] >> 13 < e[Hr] >> 16 && (3 & e[z]) === n && (e[z] += 8192, Tg(a, i)) : Tg(a, i)
            }
            const Zr = -1;
            class hi {
                constructor(n, t, r) {
                    this.factory = n, this.resolving = !1, this.canSeeViewProviders = t, this.injectImpl = r
                }
            }

            function Kc(e) {
                return e !== Zr
            }

            function pi(e) {
                return 32767 & e
            }

            function gi(e, n) {
                let t = function OI(e) {
                        return e >> 16
                    }(e),
                    r = n;
                for (; t > 0;) r = r[Br], t--;
                return r
            }
            let eu = !0;

            function Ks(e) {
                const n = eu;
                return eu = e, n
            }
            const Og = 255,
                Pg = 5;
            let PI = 0;
            const an = {};

            function ea(e, n) {
                const t = kg(e, n);
                if (-1 !== t) return t;
                const r = n[b];
                r.firstCreatePass && (e.injectorIndex = n.length, tu(r.data, e), tu(n, null), tu(r.blueprint, null));
                const o = ta(e, n),
                    i = e.injectorIndex;
                if (Kc(o)) {
                    const s = pi(o),
                        a = gi(o, n),
                        l = a[b].data;
                    for (let c = 0; c < 8; c++) n[i + c] = a[s + c] | l[s + c]
                }
                return n[i + 8] = o, i
            }

            function tu(e, n) {
                e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
            }

            function kg(e, n) {
                return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === n[e.injectorIndex + 8] ? -1 : e.injectorIndex
            }

            function ta(e, n) {
                if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
                let t = 0,
                    r = null,
                    o = n;
                for (; null !== o;) {
                    if (r = $g(o), null === r) return Zr;
                    if (t++, o = o[Br], -1 !== r.injectorIndex) return r.injectorIndex | t << 16
                }
                return Zr
            }

            function nu(e, n, t) {
                ! function kI(e, n, t) {
                    let r;
                    "string" == typeof t ? r = t.charCodeAt(0) || 0 : t.hasOwnProperty(ni) && (r = t[ni]), null == r && (r = t[ni] = PI++);
                    const o = r & Og;
                    n.data[e + (o >> Pg)] |= 1 << o
                }(e, n, t)
            }

            function Ng(e, n, t) {
                if (t & q.Optional || void 0 !== e) return e;
                wc()
            }

            function Rg(e, n, t, r) {
                if (t & q.Optional && void 0 === r && (r = null), !(t & (q.Self | q.Host))) {
                    const o = e[Bn],
                        i = ht(void 0);
                    try {
                        return o ? o.get(n, r, t & q.Optional) : bp(n, r, t & q.Optional)
                    } finally {
                        ht(i)
                    }
                }
                return Ng(r, 0, t)
            }

            function Fg(e, n, t, r = q.Default, o) {
                if (null !== e) {
                    if (2048 & n[z] && !(r & q.Self)) {
                        const s = function jI(e, n, t, r, o) {
                            let i = e,
                                s = n;
                            for (; null !== i && null !== s && 2048 & s[z] && !(512 & s[z]);) {
                                const a = Lg(i, s, t, r | q.Self, an);
                                if (a !== an) return a;
                                let l = i.parent;
                                if (!l) {
                                    const c = s[Bp];
                                    if (c) {
                                        const u = c.get(t, an, r);
                                        if (u !== an) return u
                                    }
                                    l = $g(s), s = s[Br]
                                }
                                i = l
                            }
                            return o
                        }(e, n, t, r, an);
                        if (s !== an) return s
                    }
                    const i = Lg(e, n, t, r, an);
                    if (i !== an) return i
                }
                return Rg(n, t, r, o)
            }

            function Lg(e, n, t, r, o) {
                const i = function FI(e) {
                    if ("string" == typeof e) return e.charCodeAt(0) || 0;
                    const n = e.hasOwnProperty(ni) ? e[ni] : void 0;
                    return "number" == typeof n ? n >= 0 ? n & Og : VI : n
                }(t);
                if ("function" == typeof i) {
                    if (!wg(n, e, r)) return r & q.Host ? Ng(o, 0, r) : Rg(n, t, r, o);
                    try {
                        let s;
                        if (s = i(r), null != s || r & q.Optional) return s;
                        wc()
                    } finally {
                        Ig()
                    }
                } else if ("number" == typeof i) {
                    let s = null,
                        a = kg(e, n),
                        l = Zr,
                        c = r & q.Host ? n[Me][Ge] : null;
                    for ((-1 === a || r & q.SkipSelf) && (l = -1 === a ? ta(e, n) : n[a + 8], l !== Zr && jg(r, !1) ? (s = n[b], a = pi(l), n = gi(l, n)) : a = -1); - 1 !== a;) {
                        const u = n[b];
                        if (Vg(i, a, u.data)) {
                            const d = RI(a, n, t, s, r, c);
                            if (d !== an) return d
                        }
                        l = n[a + 8], l !== Zr && jg(r, n[b].data[a + 8] === c) && Vg(i, a, n) ? (s = u, a = pi(l), n = gi(l, n)) : a = -1
                    }
                }
                return o
            }

            function RI(e, n, t, r, o, i) {
                const s = n[b],
                    a = s.data[e + 8],
                    u = na(a, s, t, null == r ? dr(a) && eu : r != s && 0 != (3 & a.type), o & q.Host && i === a);
                return null !== u ? mr(n, s, u, a) : an
            }

            function na(e, n, t, r, o) {
                const i = e.providerIndexes,
                    s = n.data,
                    a = 1048575 & i,
                    l = e.directiveStart,
                    u = i >> 20,
                    f = o ? a + u : e.directiveEnd;
                for (let h = r ? a : a + u; h < f; h++) {
                    const p = s[h];
                    if (h < l && t === p || h >= l && p.type === t) return h
                }
                if (o) {
                    const h = s[l];
                    if (h && Wt(h) && h.type === t) return l
                }
                return null
            }

            function mr(e, n, t, r) {
                let o = e[t];
                const i = n.data;
                if (function SI(e) {
                        return e instanceof hi
                    }(o)) {
                    const s = o;
                    s.resolving && function oM(e, n) {
                        const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
                        throw new D(-200, `Circular dependency in DI detected for ${e}${t}`)
                    }(function ee(e) {
                        return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : B(e)
                    }(i[t]));
                    const a = Ks(s.canSeeViewProviders);
                    s.resolving = !0;
                    const c = s.injectImpl ? ht(s.injectImpl) : null;
                    wg(e, r, q.Default);
                    try {
                        o = e[t] = s.factory(void 0, i, e, r), n.firstCreatePass && t >= r.directiveStart && function II(e, n, t) {
                            const {
                                ngOnChanges: r,
                                ngOnInit: o,
                                ngDoCheck: i
                            } = n.type.prototype;
                            if (r) {
                                const s = ig(n);
                                (t.preOrderHooks ? ? = []).push(e, s), (t.preOrderCheckHooks ? ? = []).push(e, s)
                            }
                            o && (t.preOrderHooks ? ? = []).push(0 - e, o), i && ((t.preOrderHooks ? ? = []).push(e, i), (t.preOrderCheckHooks ? ? = []).push(e, i))
                        }(t, i[t], n)
                    } finally {
                        null !== c && ht(c), Ks(a), s.resolving = !1, Ig()
                    }
                }
                return o
            }

            function Vg(e, n, t) {
                return !!(t[n + (e >> Pg)] & 1 << e)
            }

            function jg(e, n) {
                return !(e & q.Self || e & q.Host && n)
            }
            class ot {
                constructor(n, t) {
                    this._tNode = n, this._lView = t
                }
                get(n, t, r) {
                    return Fg(this._tNode, this._lView, n, js(r), t)
                }
            }

            function VI() {
                return new ot(Be(), _())
            }

            function He(e) {
                return Cn(() => {
                    const n = e.prototype.constructor,
                        t = n[Dn] || ru(n),
                        r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r;) {
                        const i = o[Dn] || ru(o);
                        if (i && i !== t) return i;
                        o = Object.getPrototypeOf(o)
                    }
                    return i => new i
                })
            }

            function ru(e) {
                return Cc(e) ? () => {
                    const n = ru(j(e));
                    return n && n()
                } : fr(e)
            }

            function $g(e) {
                const n = e[b],
                    t = n.type;
                return 2 === t ? n.declTNode : 1 === t ? e[Ge] : null
            }
            const Qr = "__parameters__";

            function Jr(e, n, t) {
                return Cn(() => {
                    const r = function ou(e) {
                        return function(...t) {
                            if (e) {
                                const r = e(...t);
                                for (const o in r) this[o] = r[o]
                            }
                        }
                    }(n);

                    function o(...i) {
                        if (this instanceof o) return r.apply(this, i), this;
                        const s = new o(...i);
                        return a.annotation = s, a;

                        function a(l, c, u) {
                            const d = l.hasOwnProperty(Qr) ? l[Qr] : Object.defineProperty(l, Qr, {
                                value: []
                            })[Qr];
                            for (; d.length <= u;) d.push(null);
                            return (d[u] = d[u] || []).push(s), l
                        }
                    }
                    return t && (o.prototype = Object.create(t.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
                })
            }

            function eo(e, n) {
                e.forEach(t => Array.isArray(t) ? eo(t, n) : n(t))
            }

            function Hg(e, n, t) {
                n >= e.length ? e.push(t) : e.splice(n, 0, t)
            }

            function oa(e, n) {
                return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
            }

            function vi(e, n) {
                const t = [];
                for (let r = 0; r < e; r++) t.push(n);
                return t
            }

            function xt(e, n, t) {
                let r = to(e, n);
                return r >= 0 ? e[1 | r] = t : (r = ~r, function qI(e, n, t, r) {
                    let o = e.length;
                    if (o == n) e.push(t, r);
                    else if (1 === o) e.push(r, e[0]), e[0] = t;
                    else {
                        for (o--, e.push(e[o - 1], e[o]); o > n;) e[o] = e[o - 2], o--;
                        e[n] = t, e[n + 1] = r
                    }
                }(e, r, n, t)), r
            }

            function iu(e, n) {
                const t = to(e, n);
                if (t >= 0) return e[1 | t]
            }

            function to(e, n) {
                return function Ug(e, n, t) {
                    let r = 0,
                        o = e.length >> t;
                    for (; o !== r;) {
                        const i = r + (o - r >> 1),
                            s = e[i << t];
                        if (n === s) return i << t;
                        s > n ? o = i : r = i + 1
                    }
                    return ~(o << t)
                }(e, n, 1)
            }
            const sa = ti(Jr("Optional"), 8),
                aa = ti(Jr("SkipSelf"), 4);

            function fa(e) {
                return 128 == (128 & e.flags)
            }
            var qn = function(e) {
                return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
            }(qn || {});
            const uu = new Map;
            let mx = 0;
            const fu = "__ngContext__";

            function qe(e, n) {
                pt(n) ? (e[fu] = n[ai], function vx(e) {
                    uu.set(e[ai], e)
                }(n)) : e[fu] = n
            }
            let hu;

            function pu(e, n) {
                return hu(e, n)
            }

            function Di(e) {
                const n = e[ve];
                return tt(n) ? n[ve] : n
            }

            function cm(e) {
                return dm(e[ii])
            }

            function um(e) {
                return dm(e[qt])
            }

            function dm(e) {
                for (; null !== e && !tt(e);) e = e[qt];
                return e
            }

            function oo(e, n, t, r, o) {
                if (null != r) {
                    let i, s = !1;
                    tt(r) ? i = r : pt(r) && (s = !0, r = r[we]);
                    const a = fe(r);
                    0 === e && null !== t ? null == o ? gm(n, t, a) : yr(n, t, a, o || null, !0) : 1 === e && null !== t ? yr(n, t, a, o || null, !0) : 2 === e ? function _a(e, n, t) {
                        const r = ya(e, n);
                        r && function Lx(e, n, t, r) {
                            e.removeChild(n, t, r)
                        }(e, r, n, t)
                    }(n, a, s) : 3 === e && n.destroyNode(a), null != i && function $x(e, n, t, r, o) {
                        const i = t[rn];
                        i !== fe(t) && oo(n, e, r, i, o);
                        for (let a = je; a < t.length; a++) {
                            const l = t[a];
                            bi(l[b], l, e, n, r, i)
                        }
                    }(n, e, i, t, o)
                }
            }

            function ga(e, n, t) {
                return e.createElement(n, t)
            }

            function hm(e, n) {
                const t = e[Ur],
                    r = t.indexOf(n);
                fg(n), t.splice(r, 1)
            }

            function ma(e, n) {
                if (e.length <= je) return;
                const t = je + n,
                    r = e[t];
                if (r) {
                    const o = r[si];
                    null !== o && o !== e && hm(o, r), n > 0 && (e[t - 1][qt] = r[qt]);
                    const i = oa(e, je + n);
                    ! function Ax(e, n) {
                        bi(e, n, n[H], 2, null, null), n[we] = null, n[Ge] = null
                    }(r[b], r);
                    const s = i[nn];
                    null !== s && s.detachView(i[b]), r[ve] = null, r[qt] = null, r[z] &= -129
                }
                return r
            }

            function mu(e, n) {
                if (!(256 & n[z])) {
                    const t = n[H];
                    n[li] && Xp(n[li]), n[ci] && Xp(n[ci]), t.destroyNode && bi(e, n, t, 3, null, null),
                        function Px(e) {
                            let n = e[ii];
                            if (!n) return yu(e[b], e);
                            for (; n;) {
                                let t = null;
                                if (pt(n)) t = n[ii];
                                else {
                                    const r = n[je];
                                    r && (t = r)
                                }
                                if (!t) {
                                    for (; n && !n[qt] && n !== e;) pt(n) && yu(n[b], n), n = n[ve];
                                    null === n && (n = e), pt(n) && yu(n[b], n), t = n && n[qt]
                                }
                                n = t
                            }
                        }(n)
                }
            }

            function yu(e, n) {
                if (!(256 & n[z])) {
                    n[z] &= -129, n[z] |= 256,
                        function Fx(e, n) {
                            let t;
                            if (null != e && null != (t = e.destroyHooks))
                                for (let r = 0; r < t.length; r += 2) {
                                    const o = n[t[r]];
                                    if (!(o instanceof hi)) {
                                        const i = t[r + 1];
                                        if (Array.isArray(i))
                                            for (let s = 0; s < i.length; s += 2) {
                                                const a = o[i[s]],
                                                    l = i[s + 1];
                                                on(4, a, l);
                                                try {
                                                    l.call(a)
                                                } finally {
                                                    on(5, a, l)
                                                }
                                            } else {
                                                on(4, o, i);
                                                try {
                                                    i.call(o)
                                                } finally {
                                                    on(5, o, i)
                                                }
                                            }
                                    }
                                }
                        }(e, n),
                        function Rx(e, n) {
                            const t = e.cleanup,
                                r = n[jr];
                            if (null !== t)
                                for (let i = 0; i < t.length - 1; i += 2)
                                    if ("string" == typeof t[i]) {
                                        const s = t[i + 3];
                                        s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
                                    } else t[i].call(r[t[i + 1]]);
                            null !== r && (n[jr] = null);
                            const o = n[Hn];
                            if (null !== o) {
                                n[Hn] = null;
                                for (let i = 0; i < o.length; i++)(0, o[i])()
                            }
                        }(e, n), 1 === n[b].type && n[H].destroy();
                    const t = n[si];
                    if (null !== t && tt(n[ve])) {
                        t !== n[ve] && hm(t, n);
                        const r = n[nn];
                        null !== r && r.detachView(e)
                    }! function _x(e) {
                        uu.delete(e[ai])
                    }(n)
                }
            }

            function vu(e, n, t) {
                return function pm(e, n, t) {
                    let r = n;
                    for (; null !== r && 40 & r.type;) r = (n = r).parent;
                    if (null === r) return t[we]; {
                        const {
                            componentOffset: o
                        } = r;
                        if (o > -1) {
                            const {
                                encapsulation: i
                            } = e.data[r.directiveStart + o];
                            if (i === zt.None || i === zt.Emulated) return null
                        }
                        return gt(r, t)
                    }
                }(e, n.parent, t)
            }

            function yr(e, n, t, r, o) {
                e.insertBefore(n, t, r, o)
            }

            function gm(e, n, t) {
                e.appendChild(n, t)
            }

            function mm(e, n, t, r, o) {
                null !== r ? yr(e, n, t, r, o) : gm(e, n, t)
            }

            function ya(e, n) {
                return e.parentNode(n)
            }

            function ym(e, n, t) {
                return _m(e, n, t)
            }
            let _u, Ca, bu, _m = function vm(e, n, t) {
                return 40 & e.type ? gt(e, t) : null
            };

            function va(e, n, t, r) {
                const o = vu(e, r, n),
                    i = n[H],
                    a = ym(r.parent || n[Ge], r, n);
                if (null != o)
                    if (Array.isArray(t))
                        for (let l = 0; l < t.length; l++) mm(i, o, t[l], a, !1);
                    else mm(i, o, t, a, !1);
                void 0 !== _u && _u(i, r, n, t, o)
            }

            function wi(e, n) {
                if (null !== n) {
                    const t = n.type;
                    if (3 & t) return gt(n, e);
                    if (4 & t) return Cu(-1, e[n.index]);
                    if (8 & t) {
                        const r = n.child;
                        if (null !== r) return wi(e, r); {
                            const o = e[n.index];
                            return tt(o) ? Cu(-1, o) : fe(o)
                        }
                    }
                    if (32 & t) return pu(n, e)() || fe(e[n.index]); {
                        const r = Dm(e, n);
                        return null !== r ? Array.isArray(r) ? r[0] : wi(Di(e[Me]), r) : wi(e, n.next)
                    }
                }
                return null
            }

            function Dm(e, n) {
                return null !== n ? e[Me][Ge].projection[n.projection] : null
            }

            function Cu(e, n) {
                const t = je + e + 1;
                if (t < n.length) {
                    const r = n[t],
                        o = r[b].firstChild;
                    if (null !== o) return wi(r, o)
                }
                return n[rn]
            }

            function Du(e, n, t, r, o, i, s) {
                for (; null != t;) {
                    const a = r[t.index],
                        l = t.type;
                    if (s && 0 === n && (a && qe(fe(a), r), t.flags |= 2), 32 != (32 & t.flags))
                        if (8 & l) Du(e, n, t.child, r, o, i, !1), oo(n, e, o, a, i);
                        else if (32 & l) {
                        const c = pu(t, r);
                        let u;
                        for (; u = c();) oo(n, e, o, u, i);
                        oo(n, e, o, a, i)
                    } else 16 & l ? bm(e, n, r, t, o, i) : oo(n, e, o, a, i);
                    t = s ? t.projectionNext : t.next
                }
            }

            function bi(e, n, t, r, o, i) {
                Du(t, r, e.firstChild, n, o, i, !1)
            }

            function bm(e, n, t, r, o, i) {
                const s = t[Me],
                    l = s[Ge].projection[r.projection];
                if (Array.isArray(l))
                    for (let c = 0; c < l.length; c++) oo(n, e, o, l[c], i);
                else {
                    let c = l;
                    const u = s[ve];
                    fa(r) && (c.flags |= 128), Du(e, n, c, u, o, i, !0)
                }
            }

            function Em(e, n, t) {
                "" === t ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t)
            }

            function Mm(e, n, t) {
                const {
                    mergedAttrs: r,
                    classes: o,
                    styles: i
                } = t;
                null !== r && kc(e, n, r), null !== o && Em(e, n, o), null !== i && function Hx(e, n, t) {
                    e.setAttribute(n, "style", t)
                }(e, n, i)
            }

            function io(e) {
                return function wu() {
                    if (void 0 === Ca && (Ca = null, de.trustedTypes)) try {
                        Ca = de.trustedTypes.createPolicy("angular", {
                            createHTML: e => e,
                            createScript: e => e,
                            createScriptURL: e => e
                        })
                    } catch {}
                    return Ca
                }() ? .createHTML(e) || e
            }
            class vr {
                constructor(n) {
                    this.changingThisBreaksApplicationSecurity = n
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${_p})`
                }
            }
            class Wx extends vr {
                getTypeName() {
                    return "HTML"
                }
            }
            class Zx extends vr {
                getTypeName() {
                    return "Style"
                }
            }
            class Yx extends vr {
                getTypeName() {
                    return "Script"
                }
            }
            class Qx extends vr {
                getTypeName() {
                    return "URL"
                }
            }
            class Xx extends vr {
                getTypeName() {
                    return "ResourceURL"
                }
            }

            function St(e) {
                return e instanceof vr ? e.changingThisBreaksApplicationSecurity : e
            }

            function ln(e, n) {
                const t = function Jx(e) {
                    return e instanceof vr && e.getTypeName() || null
                }(e);
                if (null != t && t !== n) {
                    if ("ResourceURL" === t && "URL" === n) return !0;
                    throw new Error(`Required a safe ${n}, got a ${t} (see ${_p})`)
                }
                return t === n
            }
            class oS {
                constructor(n) {
                    this.inertDocumentHelper = n
                }
                getInertBodyElement(n) {
                    n = "<body><remove></remove>" + n;
                    try {
                        const t = (new window.DOMParser).parseFromString(io(n), "text/html").body;
                        return null === t ? this.inertDocumentHelper.getInertBodyElement(n) : (t.removeChild(t.firstChild), t)
                    } catch {
                        return null
                    }
                }
            }
            class iS {
                constructor(n) {
                    this.defaultDoc = n, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
                }
                getInertBodyElement(n) {
                    const t = this.inertDocument.createElement("template");
                    return t.innerHTML = io(n), t
                }
            }
            const aS = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

            function wa(e) {
                return (e = String(e)).match(aS) ? e : "unsafe:" + e
            }

            function In(e) {
                const n = {};
                for (const t of e.split(",")) n[t] = !0;
                return n
            }

            function Ei(...e) {
                const n = {};
                for (const t of e)
                    for (const r in t) t.hasOwnProperty(r) && (n[r] = !0);
                return n
            }
            const Tm = In("area,br,col,hr,img,wbr"),
                Om = In("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                Pm = In("rp,rt"),
                Mu = Ei(Tm, Ei(Om, In("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Ei(Pm, In("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Ei(Pm, Om)),
                Iu = In("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                km = Ei(Iu, In("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), In("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                lS = In("script,style,template");
            class cS {
                constructor() {
                    this.sanitizedSomething = !1, this.buf = []
                }
                sanitizeChildren(n) {
                    let t = n.firstChild,
                        r = !0;
                    for (; t;)
                        if (t.nodeType === Node.ELEMENT_NODE ? r = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, r && t.firstChild) t = t.firstChild;
                        else
                            for (; t;) {
                                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                                let o = this.checkClobberedElement(t, t.nextSibling);
                                if (o) {
                                    t = o;
                                    break
                                }
                                t = this.checkClobberedElement(t, t.parentNode)
                            }
                    return this.buf.join("")
                }
                startElement(n) {
                    const t = n.nodeName.toLowerCase();
                    if (!Mu.hasOwnProperty(t)) return this.sanitizedSomething = !0, !lS.hasOwnProperty(t);
                    this.buf.push("<"), this.buf.push(t);
                    const r = n.attributes;
                    for (let o = 0; o < r.length; o++) {
                        const i = r.item(o),
                            s = i.name,
                            a = s.toLowerCase();
                        if (!km.hasOwnProperty(a)) {
                            this.sanitizedSomething = !0;
                            continue
                        }
                        let l = i.value;
                        Iu[a] && (l = wa(l)), this.buf.push(" ", s, '="', Nm(l), '"')
                    }
                    return this.buf.push(">"), !0
                }
                endElement(n) {
                    const t = n.nodeName.toLowerCase();
                    Mu.hasOwnProperty(t) && !Tm.hasOwnProperty(t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"))
                }
                chars(n) {
                    this.buf.push(Nm(n))
                }
                checkClobberedElement(n, t) {
                    if (t && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${n.outerHTML}`);
                    return t
                }
            }
            const uS = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                dS = /([^\#-~ |!])/g;

            function Nm(e) {
                return e.replace(/&/g, "&amp;").replace(uS, function(n) {
                    return "&#" + (1024 * (n.charCodeAt(0) - 55296) + (n.charCodeAt(1) - 56320) + 65536) + ";"
                }).replace(dS, function(n) {
                    return "&#" + n.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            let ba;

            function Rm(e, n) {
                let t = null;
                try {
                    ba = ba || function Am(e) {
                        const n = new iS(e);
                        return function sS() {
                            try {
                                return !!(new window.DOMParser).parseFromString(io(""), "text/html")
                            } catch {
                                return !1
                            }
                        }() ? new oS(n) : n
                    }(e);
                    let r = n ? String(n) : "";
                    t = ba.getInertBodyElement(r);
                    let o = 5,
                        i = r;
                    do {
                        if (0 === o) throw new Error("Failed to sanitize html because the input is unstable");
                        o--, r = i, i = t.innerHTML, t = ba.getInertBodyElement(r)
                    } while (r !== i);
                    return io((new cS).sanitizeChildren(xu(t) || t))
                } finally {
                    if (t) {
                        const r = xu(t) || t;
                        for (; r.firstChild;) r.removeChild(r.firstChild)
                    }
                }
            }

            function xu(e) {
                return "content" in e && function fS(e) {
                    return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
                }(e) ? e.content : null
            }
            var At = function(e) {
                return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
            }(At || {});

            function We(e) {
                const n = function Mi() {
                    const e = _();
                    return e && e[$r].sanitizer
                }();
                return n ? n.sanitize(At.URL, e) || "" : ln(e, "URL") ? St(e) : wa(B(e))
            }
            const Ii = new E("ENVIRONMENT_INITIALIZER"),
                Vm = new E("INJECTOR", -1),
                jm = new E("INJECTOR_DEF_TYPES");
            class Su {
                get(n, t = ei) {
                    if (t === ei) {
                        const r = new Error(`NullInjectorError: No provider for ${Pe(n)}!`);
                        throw r.name = "NullInjectorError", r
                    }
                    return t
                }
            }

            function _S(...e) {
                return {\
                    u0275providers: $m(0, e),
                    \u0275fromNgModule: !0
                }
            }

            function $m(e, ...n) {
                const t = [],
                    r = new Set;
                let o;
                const i = s => {
                    t.push(s)
                };
                return eo(n, s => {
                    const a = s;
                    Ea(a, i, [], r) && (o || = [], o.push(a))
                }), void 0 !== o && Bm(o, i), t
            }

            function Bm(e, n) {
                for (let t = 0; t < e.length; t++) {
                    const {
                        ngModule: r,
                        providers: o
                    } = e[t];
                    Tu(o, i => {
                        n(i, r)
                    })
                }
            }

            function Ea(e, n, t, r) {
                if (!(e = j(e))) return !1;
                let o = null,
                    i = Fs(e);
                const s = !i && Z(e);
                if (i || s) {
                    if (s && !s.standalone) return !1;
                    o = e
                } else {
                    const l = e.ngModule;
                    if (i = Fs(l), !i) return !1;
                    o = l
                }
                const a = r.has(o);
                if (s) {
                    if (a) return !1;
                    if (r.add(o), s.dependencies) {
                        const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                        for (const c of l) Ea(c, n, t, r)
                    }
                } else {
                    if (!i) return !1; {
                        if (null != i.imports && !a) {
                            let c;
                            r.add(o);
                            try {
                                eo(i.imports, u => {
                                    Ea(u, n, t, r) && (c || = [], c.push(u))
                                })
                            } finally {}
                            void 0 !== c && Bm(c, n)
                        }
                        if (!a) {
                            const c = fr(o) || (() => new o);
                            n({
                                provide: o,
                                useFactory: c,
                                deps: X
                            }, o), n({
                                provide: jm,
                                useValue: o,
                                multi: !0
                            }, o), n({
                                provide: Ii,
                                useValue: () => I(o),
                                multi: !0
                            }, o)
                        }
                        const l = i.providers;
                        if (null != l && !a) {
                            const c = e;
                            Tu(l, u => {
                                n(u, c)
                            })
                        }
                    }
                }
                return o !== e && void 0 !== e.providers
            }

            function Tu(e, n) {
                for (let t of e) Dc(t) && (t = t.\u0275providers), Array.isArray(t) ? Tu(t, n) : n(t)
            }
            const CS = te({
                provide: String,
                useValue: te
            });

            function Ou(e) {
                return null !== e && "object" == typeof e && CS in e
            }

            function _r(e) {
                return "function" == typeof e
            }
            const Pu = new E("Set Injector scope."),
                Ma = {},
                wS = {};
            let ku;

            function Ia() {
                return void 0 === ku && (ku = new Su), ku
            }
            class Tt {}
            class ao extends Tt {
                get destroyed() {
                    return this._destroyed
                }
                constructor(n, t, r, o) {
                    super(), this.parent = t, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, Ru(n, s => this.processProvider(s)), this.records.set(Vm, lo(void 0, this)), o.has("environment") && this.records.set(Tt, lo(void 0, this));
                    const i = this.records.get(Pu);
                    null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(jm.multi, X, q.Self))
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
                        const n = this._onDestroyHooks;
                        this._onDestroyHooks = [];
                        for (const t of n) t()
                    } finally {
                        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear()
                    }
                }
                onDestroy(n) {
                    return this.assertNotDestroyed(), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n)
                }
                runInContext(n) {
                    this.assertNotDestroyed();
                    const t = $n(this),
                        r = ht(void 0);
                    try {
                        return n()
                    } finally {
                        $n(t), ht(r)
                    }
                }
                get(n, t = ei, r = q.Default) {
                    if (this.assertNotDestroyed(), n.hasOwnProperty(Sp)) return n[Sp](this);
                    r = js(r);
                    const i = $n(this),
                        s = ht(void 0);
                    try {
                        if (!(r & q.SkipSelf)) {
                            let l = this.records.get(n);
                            if (void 0 === l) {
                                const c = function xS(e) {
                                    return "function" == typeof e || "object" == typeof e && e instanceof E
                                }(n) && Rs(n);
                                l = c && this.injectableDefInScope(c) ? lo(Nu(n), Ma) : null, this.records.set(n, l)
                            }
                            if (null != l) return this.hydrate(n, l)
                        }
                        return (r & q.Self ? Ia() : this.parent).get(n, t = r & q.Optional && t === ei ? null : t)
                    } catch (a) {
                        if ("NullInjectorError" === a.name) {
                            if ((a[Vs] = a[Vs] || []).unshift(Pe(n)), i) throw a;
                            return function _M(e, n, t, r) {
                                const o = e[Vs];
                                throw n[Mp] && o.unshift(n[Mp]), e.message = function CM(e, n, t, r = null) {
                                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                    let o = Pe(n);
                                    if (Array.isArray(n)) o = n.map(Pe).join(" -> ");
                                    else if ("object" == typeof n) {
                                        let i = [];
                                        for (let s in n)
                                            if (n.hasOwnProperty(s)) {
                                                let a = n[s];
                                                i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Pe(a)))
                                            }
                                        o = `{${i.join(", ")}}`
                                    }
                                    return `${t}${r?"("+r+")":""}[${o}]: ${e.replace(pM,"\n  ")}`
                                }("\n" + e.message, o, t, r), e.ngTokenPath = o, e[Vs] = null, e
                            }(a, n, "R3InjectorError", this.source)
                        }
                        throw a
                    } finally {
                        ht(s), $n(i)
                    }
                }
                resolveInjectorInitializers() {
                    const n = $n(this),
                        t = ht(void 0);
                    try {
                        const o = this.get(Ii.multi, X, q.Self);
                        for (const i of o) i()
                    } finally {
                        $n(n), ht(t)
                    }
                }
                toString() {
                    const n = [],
                        t = this.records;
                    for (const r of t.keys()) n.push(Pe(r));
                    return `R3Injector[${n.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new D(205, !1)
                }
                processProvider(n) {
                    let t = _r(n = j(n)) ? n : j(n && n.provide);
                    const r = function ES(e) {
                        return Ou(e) ? lo(void 0, e.useValue) : lo(zm(e), Ma)
                    }(n);
                    if (_r(n) || !0 !== n.multi) this.records.get(t);
                    else {
                        let o = this.records.get(t);
                        o || (o = lo(void 0, Ma, !0), o.factory = () => Tc(o.multi), this.records.set(t, o)), t = n, o.multi.push(n)
                    }
                    this.records.set(t, r)
                }
                hydrate(n, t) {
                    return t.value === Ma && (t.value = wS, t.value = t.factory()), "object" == typeof t.value && t.value && function IS(e) {
                        return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                    }(t.value) && this._ngOnDestroyHooks.add(t.value), t.value
                }
                injectableDefInScope(n) {
                    if (!n.providedIn) return !1;
                    const t = j(n.providedIn);
                    return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t)
                }
                removeOnDestroy(n) {
                    const t = this._onDestroyHooks.indexOf(n); - 1 !== t && this._onDestroyHooks.splice(t, 1)
                }
            }

            function Nu(e) {
                const n = Rs(e),
                    t = null !== n ? n.factory : fr(e);
                if (null !== t) return t;
                if (e instanceof E) throw new D(204, !1);
                if (e instanceof Function) return function bS(e) {
                    const n = e.length;
                    if (n > 0) throw vi(n, "?"), new D(204, !1);
                    const t = function uM(e) {
                        return e && (e[Ls] || e[Dp]) || null
                    }(e);
                    return null !== t ? () => t.factory(e) : () => new e
                }(e);
                throw new D(204, !1)
            }

            function zm(e, n, t) {
                let r;
                if (_r(e)) {
                    const o = j(e);
                    return fr(o) || Nu(o)
                }
                if (Ou(e)) r = () => j(e.useValue);
                else if (function Um(e) {
                        return !(!e || !e.useFactory)
                    }(e)) r = () => e.useFactory(...Tc(e.deps || []));
                else if (function Hm(e) {
                        return !(!e || !e.useExisting)
                    }(e)) r = () => I(j(e.useExisting));
                else {
                    const o = j(e && (e.useClass || e.provide));
                    if (! function MS(e) {
                            return !!e.deps
                        }(e)) return fr(o) || Nu(o);
                    r = () => new o(...Tc(e.deps))
                }
                return r
            }

            function lo(e, n, t = !1) {
                return {
                    factory: e,
                    value: n,
                    multi: t ? [] : void 0
                }
            }

            function Ru(e, n) {
                for (const t of e) Array.isArray(t) ? Ru(t, n) : t && Dc(t) ? Ru(t.\u0275providers, n) : n(t)
            }
            const xa = new E("AppId", {
                    providedIn: "root",
                    factory: () => SS
                }),
                SS = "ng",
                Gm = new E("Platform Initializer"),
                Wn = new E("Platform ID", {
                    providedIn: "platform",
                    factory: () => "unknown"
                }),
                qm = new E("CSP nonce", {
                    providedIn: "root",
                    factory: () => function so() {
                        if (void 0 !== bu) return bu;
                        if (typeof document < "u") return document;
                        throw new D(210, !1)
                    }().body ? .querySelector("[ngCspNonce]") ? .getAttribute("ngCspNonce") || null
                });
            let Wm = (e, n, t) => null;

            function Uu(e, n, t = !1) {
                return Wm(e, n, t)
            }
            class VS {}
            class Qm {}
            class $S {
                resolveComponentFactory(n) {
                    throw function jS(e) {
                        const n = Error(`No component factory found for ${Pe(e)}.`);
                        return n.ngComponent = e, n
                    }(n)
                }
            }
            let ka = (() => {
                class e {
                    static# e = this.NULL = new $S
                }
                return e
            })();

            function BS() {
                return fo(Be(), _())
            }

            function fo(e, n) {
                return new it(gt(e, n))
            }
            let it = (() => {
                class e {
                    constructor(t) {
                        this.nativeElement = t
                    }
                    static# e = this.__NG_ELEMENT_ID__ = BS
                }
                return e
            })();

            function HS(e) {
                return e instanceof it ? e.nativeElement : e
            }
            class Jm {}
            let cn = (() => {
                    class e {
                        constructor() {
                            this.destroyNode = null
                        }
                        static# e = this.__NG_ELEMENT_ID__ = () => function US() {
                            const e = _(),
                                t = It(Be().index, e);
                            return (pt(t) ? t : e)[H]
                        }()
                    }
                    return e
                })(),
                zS = (() => {
                    class e {
                        static# e = this.\u0275prov = A({
                            token: e,
                            providedIn: "root",
                            factory: () => null
                        })
                    }
                    return e
                })();
            class Ai {
                constructor(n) {
                    this.full = n, this.major = n.split(".")[0], this.minor = n.split(".")[1], this.patch = n.split(".").slice(2).join(".")
                }
            }
            const GS = new Ai("16.2.12"),
                qu = {};

            function ny(e, n = null, t = null, r) {
                const o = ry(e, n, t, r);
                return o.resolveInjectorInitializers(), o
            }

            function ry(e, n = null, t = null, r, o = new Set) {
                const i = [t || X, _S(e)];
                return r = r || ("object" == typeof e ? void 0 : Pe(e)), new ao(i, n || Ia(), r || null, o)
            }
            let yt = (() => {
                class e {
                    static# e = this.THROW_IF_NOT_FOUND = ei;
                    static# t = this.NULL = new Su;
                    static create(t, r) {
                        if (Array.isArray(t)) return ny({
                            name: ""
                        }, r, t, ""); {
                            const o = t.name ? ? "";
                            return ny({
                                name: o
                            }, t.parent, t.providers, o)
                        }
                    }
                    static# n = this.\u0275prov = A({
                        token: e,
                        providedIn: "any",
                        factory: () => I(Vm)
                    });
                    static# r = this.__NG_ELEMENT_ID__ = -1
                }
                return e
            })();

            function Zu(e) {
                return e.ngOriginalError
            }
            class xn {
                constructor() {
                    this._console = console
                }
                handleError(n) {
                    const t = this._findOriginalError(n);
                    this._console.error("ERROR", n), t && this._console.error("ORIGINAL ERROR", t)
                }
                _findOriginalError(n) {
                    let t = n && Zu(n);
                    for (; t && Zu(t);) t = Zu(t);
                    return t || null
                }
            }

            function Qu(e) {
                return n => {
                    setTimeout(e, void 0, n)
                }
            }
            const ye = class JS extends Ue {
                constructor(n = !1) {
                    super(), this.__isAsync = n
                }
                emit(n) {
                    super.next(n)
                }
                subscribe(n, t, r) {
                    let o = n,
                        i = t || (() => null),
                        s = r;
                    if (n && "object" == typeof n) {
                        const l = n;
                        o = l.next ? .bind(l), i = l.error ? .bind(l), s = l.complete ? .bind(l)
                    }
                    this.__isAsync && (i = Qu(i), o && (o = Qu(o)), s && (s = Qu(s)));
                    const a = super.subscribe({
                        next: o,
                        error: i,
                        complete: s
                    });
                    return n instanceof dt && n.add(a), a
                }
            };

            function iy(...e) {}
            class se {
                constructor({
                    enableLongStackTrace: n = !1,
                    shouldCoalesceEventChangeDetection: t = !1,
                    shouldCoalesceRunChangeDetection: r = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new ye(!1), this.onMicrotaskEmpty = new ye(!1), this.onStable = new ye(!1), this.onError = new ye(!1), typeof Zone > "u") throw new D(908, !1);
                    Zone.assertZonePatched();
                    const o = this;
                    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && t, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function KS() {
                            const e = "function" == typeof de.requestAnimationFrame;
                            let n = de[e ? "requestAnimationFrame" : "setTimeout"],
                                t = de[e ? "cancelAnimationFrame" : "clearTimeout"];
                            if (typeof Zone < "u" && n && t) {
                                const r = n[Zone.__symbol__("OriginalDelegate")];
                                r && (n = r);
                                const o = t[Zone.__symbol__("OriginalDelegate")];
                                o && (t = o)
                            }
                            return {
                                nativeRequestAnimationFrame: n,
                                nativeCancelAnimationFrame: t
                            }
                        }().nativeRequestAnimationFrame,
                        function nA(e) {
                            const n = () => {
                                ! function tA(e) {
                                    e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(de, () => {
                                        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            e.lastRequestAnimationFrameId = -1, Ju(e), e.isCheckStableRunning = !0, Xu(e), e.isCheckStableRunning = !1
                                        }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke()
                                    }), Ju(e))
                                }(e)
                            };
                            e._inner = e._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0
                                },
                                onInvokeTask: (t, r, o, i, s, a) => {
                                    if (function oA(e) {
                                            return !(!Array.isArray(e) || 1 !== e.length) && !0 === e[0].data ? .__ignore_ng_zone__
                                        }(a)) return t.invokeTask(o, i, s, a);
                                    try {
                                        return sy(e), t.invokeTask(o, i, s, a)
                                    } finally {
                                        (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && n(), ay(e)
                                    }
                                },
                                onInvoke: (t, r, o, i, s, a, l) => {
                                    try {
                                        return sy(e), t.invoke(o, i, s, a, l)
                                    } finally {
                                        e.shouldCoalesceRunChangeDetection && n(), ay(e)
                                    }
                                },
                                onHasTask: (t, r, o, i) => {
                                    t.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, Ju(e), Xu(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                                },
                                onHandleError: (t, r, o, i) => (t.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                            })
                        }(o)
                }
                static isInAngularZone() {
                    return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!se.isInAngularZone()) throw new D(909, !1)
                }
                static assertNotInAngularZone() {
                    if (se.isInAngularZone()) throw new D(909, !1)
                }
                run(n, t, r) {
                    return this._inner.run(n, t, r)
                }
                runTask(n, t, r, o) {
                    const i = this._inner,
                        s = i.scheduleEventTask("NgZoneEvent: " + o, n, eA, iy, iy);
                    try {
                        return i.runTask(s, t, r)
                    } finally {
                        i.cancelTask(s)
                    }
                }
                runGuarded(n, t, r) {
                    return this._inner.runGuarded(n, t, r)
                }
                runOutsideAngular(n) {
                    return this._outer.run(n)
                }
            }
            const eA = {};

            function Xu(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--, !e.hasPendingMicrotasks) try {
                        e.runOutsideAngular(() => e.onStable.emit(null))
                    } finally {
                        e.isStable = !0
                    }
                }
            }

            function Ju(e) {
                e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
            }

            function sy(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function ay(e) {
                e._nesting--, Xu(e)
            }
            class rA {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new ye, this.onMicrotaskEmpty = new ye, this.onStable = new ye, this.onError = new ye
                }
                run(n, t, r) {
                    return n.apply(t, r)
                }
                runGuarded(n, t, r) {
                    return n.apply(t, r)
                }
                runOutsideAngular(n) {
                    return n()
                }
                runTask(n, t, r, o) {
                    return n.apply(t, r)
                }
            }
            const ly = new E("", {
                providedIn: "root",
                factory: cy
            });

            function cy() {
                const e = M(se);
                let n = !0;
                return yp(new De(o => {
                    n = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks, e.runOutsideAngular(() => {
                        o.next(n), o.complete()
                    })
                }), new De(o => {
                    let i;
                    e.runOutsideAngular(() => {
                        i = e.onStable.subscribe(() => {
                            se.assertNotInAngularZone(), queueMicrotask(() => {
                                !n && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks && (n = !0, o.next(!0))
                            })
                        })
                    });
                    const s = e.onUnstable.subscribe(() => {
                        se.assertInAngularZone(), n && (n = !1, e.runOutsideAngular(() => {
                            o.next(!1)
                        }))
                    });
                    return () => {
                        i.unsubscribe(), s.unsubscribe()
                    }
                }).pipe(yc()))
            }

            function Sn(e) {
                return e instanceof Function ? e() : e
            }
            let Ku = (() => {
                class e {
                    constructor() {
                        this.renderDepth = 0, this.handler = null
                    }
                    begin() {
                        this.handler ? .validateBegin(), this.renderDepth++
                    }
                    end() {
                        this.renderDepth--, 0 === this.renderDepth && this.handler ? .execute()
                    }
                    ngOnDestroy() {
                        this.handler ? .destroy(), this.handler = null
                    }
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: () => new e
                    })
                }
                return e
            })();

            function Ti(e) {
                for (; e;) {
                    e[z] |= 64;
                    const n = Di(e);
                    if (Fc(e) && !n) return e;
                    e = n
                }
                return null
            }
            const py = new E("", {
                providedIn: "root",
                factory: () => !1
            });
            let Ra = null;

            function vy(e, n) {
                return e[n] ? ? Dy()
            }

            function _y(e, n) {
                const t = Dy();
                t.producerNode ? .length && (e[n] = Ra, t.lView = e, Ra = Cy())
            }
            const pA = { ...Gp,
                consumerIsAlwaysLive: !0,
                consumerMarkedDirty: e => {
                    Ti(e.lView)
                },
                lView: null
            };

            function Cy() {
                return Object.create(pA)
            }

            function Dy() {
                return Ra ? ? = Cy(), Ra
            }
            const U = {};

            function F(e) {
                wy(Y(), _(), rt() + e, !1)
            }

            function wy(e, n, t, r) {
                if (!r)
                    if (3 == (3 & n[z])) {
                        const i = e.preOrderCheckHooks;
                        null !== i && Xs(n, i, t)
                    } else {
                        const i = e.preOrderHooks;
                        null !== i && Js(n, i, 0, t)
                    }
                gr(t)
            }

            function C(e, n = q.Default) {
                const t = _();
                return null === t ? I(e, n) : Fg(Be(), t, j(e), n)
            }

            function Fa(e, n, t, r, o, i, s, a, l, c, u) {
                const d = n.blueprint.slice();
                return d[we] = o, d[z] = 140 | r, (null !== c || e && 2048 & e[z]) && (d[z] |= 2048), dg(d), d[ve] = d[Br] = e, d[Ee] = t, d[$r] = s || e && e[$r], d[H] = a || e && e[H], d[Bn] = l || e && e[Bn] || null, d[Ge] = i, d[ai] = function yx() {
                    return mx++
                }(), d[bn] = u, d[Bp] = c, d[Me] = 2 == n.type ? e[Me] : d, d
            }

            function go(e, n, t, r, o) {
                let i = e.data[n];
                if (null === i) i = function ed(e, n, t, r, o) {
                        const i = yg(),
                            s = zc(),
                            l = e.data[n] = function wA(e, n, t, r, o, i) {
                                let s = n ? n.injectorIndex : -1,
                                    a = 0;
                                return qr() && (a |= 128), {
                                    type: t,
                                    index: r,
                                    insertBeforeIndex: null,
                                    injectorIndex: s,
                                    directiveStart: -1,
                                    directiveEnd: -1,
                                    directiveStylingLast: -1,
                                    componentOffset: -1,
                                    propertyBindings: null,
                                    flags: a,
                                    providerIndexes: 0,
                                    value: o,
                                    attrs: i,
                                    mergedAttrs: null,
                                    localNames: null,
                                    initialInputs: void 0,
                                    inputs: null,
                                    outputs: null,
                                    tView: null,
                                    next: null,
                                    prev: null,
                                    projectionNext: null,
                                    child: null,
                                    parent: n,
                                    projection: null,
                                    styles: null,
                                    stylesWithoutHost: null,
                                    residualStyles: void 0,
                                    classes: null,
                                    classesWithoutHost: null,
                                    residualClasses: void 0,
                                    classBindings: 0,
                                    styleBindings: 0
                                }
                            }(0, s ? i : i && i.parent, t, n, r, o);
                        return null === e.firstChild && (e.firstChild = l), null !== i && (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l, l.prev = i)), l
                    }(e, n, t, r, o),
                    function yI() {
                        return R.lFrame.inI18n
                    }() && (i.flags |= 32);
                else if (64 & i.type) {
                    i.type = t, i.value = r, i.attrs = o;
                    const s = function fi() {
                        const e = R.lFrame,
                            n = e.currentTNode;
                        return e.isParent ? n : n.parent
                    }();
                    i.injectorIndex = null === s ? -1 : s.injectorIndex
                }
                return sn(i, !0), i
            }

            function Oi(e, n, t, r) {
                if (0 === t) return -1;
                const o = n.length;
                for (let i = 0; i < t; i++) n.push(r), e.blueprint.push(r), e.data.push(null);
                return o
            }

            function Ey(e, n, t, r, o) {
                const i = vy(n, li),
                    s = rt(),
                    a = 2 & r;
                try {
                    gr(-1), a && n.length > W && wy(e, n, W, !1), on(a ? 2 : 0, o);
                    const c = a ? i : null,
                        u = Vc(c);
                    try {
                        null !== c && (c.dirty = !1), t(r, o)
                    } finally {
                        jc(c, u)
                    }
                } finally {
                    a && null === n[li] && _y(n, li), gr(s), on(a ? 3 : 1, o)
                }
            }

            function td(e, n, t) {
                if (Rc(n)) {
                    const r = Vt(null);
                    try {
                        const i = n.directiveEnd;
                        for (let s = n.directiveStart; s < i; s++) {
                            const a = e.data[s];
                            a.contentQueries && a.contentQueries(1, t[s], s)
                        }
                    } finally {
                        Vt(r)
                    }
                }
            }

            function nd(e, n, t) {
                mg() && (function AA(e, n, t, r) {
                    const o = t.directiveStart,
                        i = t.directiveEnd;
                    dr(t) && function FA(e, n, t) {
                        const r = gt(n, e),
                            o = My(t);
                        let s = 16;
                        t.signals ? s = 4096 : t.onPush && (s = 64);
                        const a = La(e, Fa(e, o, null, s, r, n, null, e[$r].rendererFactory.createRenderer(r, t), null, null, null));
                        e[n.index] = a
                    }(n, t, e.data[o + t.componentOffset]), e.firstCreatePass || ea(t, n), qe(r, n);
                    const s = t.initialInputs;
                    for (let a = o; a < i; a++) {
                        const l = e.data[a],
                            c = mr(n, e, a, t);
                        qe(c, n), null !== s && LA(0, a - o, c, l, 0, s), Wt(l) && (It(t.index, n)[Ee] = mr(n, e, a, t))
                    }
                }(e, n, t, gt(t, n)), 64 == (64 & t.flags) && Ty(e, n, t))
            }

            function rd(e, n, t = gt) {
                const r = n.localNames;
                if (null !== r) {
                    let o = n.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1],
                            a = -1 === s ? t(n, e) : e[s];
                        e[o++] = a
                    }
                }
            }

            function My(e) {
                const n = e.tView;
                return null === n || n.incompleteFirstPass ? e.tView = od(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : n
            }

            function od(e, n, t, r, o, i, s, a, l, c, u) {
                const d = W + r,
                    f = d + o,
                    h = function mA(e, n) {
                        const t = [];
                        for (let r = 0; r < n; r++) t.push(r < e ? null : U);
                        return t
                    }(d, f),
                    p = "function" == typeof c ? c() : c;
                return h[b] = {
                    type: e,
                    blueprint: h,
                    template: t,
                    queries: null,
                    viewQuery: a,
                    declTNode: n,
                    data: h.slice().fill(null, d),
                    bindingStartIndex: d,
                    expandoStartIndex: f,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof s ? s() : s,
                    firstChild: null,
                    schemas: l,
                    consts: p,
                    incompleteFirstPass: !1,
                    ssrId: u
                }
            }
            let Iy = e => null;

            function xy(e, n, t, r) {
                for (let o in e)
                    if (e.hasOwnProperty(o)) {
                        t = null === t ? {} : t;
                        const i = e[o];
                        null === r ? Sy(t, n, o, i) : r.hasOwnProperty(o) && Sy(t, n, r[o], i)
                    }
                return t
            }

            function Sy(e, n, t, r) {
                e.hasOwnProperty(t) ? e[t].push(n, r) : e[t] = [n, r]
            }

            function Ot(e, n, t, r, o, i, s, a) {
                const l = gt(n, t);
                let u, c = n.inputs;
                !a && null != c && (u = c[r]) ? (cd(e, t, u, r, o), dr(n) && function MA(e, n) {
                    const t = It(n, e);
                    16 & t[z] || (t[z] |= 64)
                }(t, n.index)) : 3 & n.type && (r = function EA(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r), o = null != s ? s(o, n.value || "", r) : o, i.setProperty(l, r, o))
            }

            function id(e, n, t, r) {
                if (mg()) {
                    const o = null === r ? null : {
                            "": -1
                        },
                        i = function OA(e, n) {
                            const t = e.directiveRegistry;
                            let r = null,
                                o = null;
                            if (t)
                                for (let i = 0; i < t.length; i++) {
                                    const s = t[i];
                                    if (Rp(n, s.selectors, !1))
                                        if (r || (r = []), Wt(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s), sd(e, n, a.length)
                                            } else r.unshift(s), sd(e, n, 0);
                                    else o = o || new Map, s.findHostDirectiveDefs ? .(s, r, o), r.push(s)
                                }
                            return null === r ? null : [r, o]
                        }(e, t);
                    let s, a;
                    null === i ? s = a = null : [s, a] = i, null !== s && Ay(e, n, t, s, o, a), o && function PA(e, n, t) {
                        if (n) {
                            const r = e.localNames = [];
                            for (let o = 0; o < n.length; o += 2) {
                                const i = t[n[o + 1]];
                                if (null == i) throw new D(-301, !1);
                                r.push(n[o], i)
                            }
                        }
                    }(t, r, o)
                }
                t.mergedAttrs = ri(t.mergedAttrs, t.attrs)
            }

            function Ay(e, n, t, r, o, i) {
                for (let c = 0; c < r.length; c++) nu(ea(t, n), e, r[c].type);
                ! function NA(e, n, t) {
                    e.flags |= 1, e.directiveStart = n, e.directiveEnd = n + t, e.providerIndexes = n
                }(t, e.data.length, r.length);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    u.providersResolver && u.providersResolver(u)
                }
                let s = !1,
                    a = !1,
                    l = Oi(e, n, r.length, null);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    t.mergedAttrs = ri(t.mergedAttrs, u.hostAttrs), RA(e, t, n, l, u), kA(l, u, o), null !== u.contentQueries && (t.flags |= 4), (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (t.flags |= 64);
                    const d = u.type.prototype;
                    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ? ? = []).push(t.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ? ? = []).push(t.index), a = !0), l++
                }! function bA(e, n, t) {
                    const o = n.directiveEnd,
                        i = e.data,
                        s = n.attrs,
                        a = [];
                    let l = null,
                        c = null;
                    for (let u = n.directiveStart; u < o; u++) {
                        const d = i[u],
                            f = t ? t.get(d) : null,
                            p = f ? f.outputs : null;
                        l = xy(d.inputs, u, l, f ? f.inputs : null), c = xy(d.outputs, u, c, p);
                        const g = null === l || null === s || Np(n) ? null : VA(l, u, s);
                        a.push(g)
                    }
                    null !== l && (l.hasOwnProperty("class") && (n.flags |= 8), l.hasOwnProperty("style") && (n.flags |= 16)), n.initialInputs = a, n.inputs = l, n.outputs = c
                }(e, t, i)
            }

            function Ty(e, n, t) {
                const r = t.directiveStart,
                    o = t.directiveEnd,
                    i = t.index,
                    s = function _I() {
                        return R.lFrame.currentDirectiveIndex
                    }();
                try {
                    gr(i);
                    for (let a = r; a < o; a++) {
                        const l = e.data[a],
                            c = n[a];
                        qc(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && TA(l, c)
                    }
                } finally {
                    gr(-1), qc(s)
                }
            }

            function TA(e, n) {
                null !== e.hostBindings && e.hostBindings(1, n)
            }

            function sd(e, n, t) {
                n.componentOffset = t, (e.components ? ? = []).push(n.index)
            }

            function kA(e, n, t) {
                if (t) {
                    if (n.exportAs)
                        for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
                    Wt(n) && (t[""] = e)
                }
            }

            function RA(e, n, t, r, o) {
                e.data[r] = o;
                const i = o.factory || (o.factory = fr(o.type)),
                    s = new hi(i, Wt(o), C);
                e.blueprint[r] = s, t[r] = s,
                    function xA(e, n, t, r, o) {
                        const i = o.hostBindings;
                        if (i) {
                            let s = e.hostBindingOpCodes;
                            null === s && (s = e.hostBindingOpCodes = []);
                            const a = ~n.index;
                            (function SA(e) {
                                let n = e.length;
                                for (; n > 0;) {
                                    const t = e[--n];
                                    if ("number" == typeof t && t < 0) return t
                                }
                                return 0
                            })(s) != a && s.push(a), s.push(t, r, i)
                        }
                    }(e, n, r, Oi(e, t, o.hostVars, U), o)
            }

            function un(e, n, t, r, o, i) {
                const s = gt(e, n);
                ! function ad(e, n, t, r, o, i, s) {
                    if (null == i) e.removeAttribute(n, o, t);
                    else {
                        const a = null == s ? B(i) : s(i, r || "", o);
                        e.setAttribute(n, o, a, t)
                    }
                }(n[H], s, i, e.value, t, r, o)
            }

            function LA(e, n, t, r, o, i) {
                const s = i[n];
                if (null !== s)
                    for (let a = 0; a < s.length;) Oy(r, t, s[a++], s[a++], s[a++])
            }

            function Oy(e, n, t, r, o) {
                const i = Vt(null);
                try {
                    const s = e.inputTransforms;
                    null !== s && s.hasOwnProperty(r) && (o = s[r].call(n, o)), null !== e.setInput ? e.setInput(n, o, t, r) : n[r] = o
                } finally {
                    Vt(i)
                }
            }

            function VA(e, n, t) {
                let r = null,
                    o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (0 !== i)
                        if (5 !== i) {
                            if ("number" == typeof i) break;
                            if (e.hasOwnProperty(i)) {
                                null === r && (r = []);
                                const s = e[i];
                                for (let a = 0; a < s.length; a += 2)
                                    if (s[a] === n) {
                                        r.push(i, s[a + 1], t[o + 1]);
                                        break
                                    }
                            }
                            o += 2
                        } else o += 2;
                    else o += 4
                }
                return r
            }

            function Py(e, n, t, r) {
                return [e, !0, !1, n, null, 0, r, t, null, null, null]
            }

            function ky(e, n) {
                const t = e.contentQueries;
                if (null !== t)
                    for (let r = 0; r < t.length; r += 2) {
                        const i = t[r + 1];
                        if (-1 !== i) {
                            const s = e.data[i];
                            Zc(t[r]), s.contentQueries(2, n[i], i)
                        }
                    }
            }

            function La(e, n) {
                return e[ii] ? e[$p][qt] = n : e[ii] = n, e[$p] = n, n
            }

            function ld(e, n, t) {
                Zc(0);
                const r = Vt(null);
                try {
                    n(e, t)
                } finally {
                    Vt(r)
                }
            }

            function Ny(e) {
                return e[jr] || (e[jr] = [])
            }

            function Ry(e) {
                return e.cleanup || (e.cleanup = [])
            }

            function Ly(e, n) {
                const t = e[Bn],
                    r = t ? t.get(xn, null) : null;
                r && r.handleError(n)
            }

            function cd(e, n, t, r, o) {
                for (let i = 0; i < t.length;) {
                    const s = t[i++],
                        a = t[i++];
                    Oy(e.data[s], n[s], r, a, o)
                }
            }

            function jA(e, n) {
                const t = It(n, e),
                    r = t[b];
                ! function $A(e, n) {
                    for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t])
                }(r, t);
                const o = t[we];
                null !== o && null === t[bn] && (t[bn] = Uu(o, t[Bn])), ud(r, t, t[Ee])
            }

            function ud(e, n, t) {
                Yc(n);
                try {
                    const r = e.viewQuery;
                    null !== r && ld(1, r, t);
                    const o = e.template;
                    null !== o && Ey(e, n, o, 1, t), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && ky(e, n), e.staticViewQueries && ld(2, e.viewQuery, t);
                    const i = e.components;
                    null !== i && function BA(e, n) {
                        for (let t = 0; t < n.length; t++) jA(e, n[t])
                    }(n, i)
                } catch (r) {
                    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
                } finally {
                    n[z] &= -5, Qc()
                }
            }
            let Vy = (() => {
                class e {
                    constructor() {
                        this.all = new Set, this.queue = new Map
                    }
                    create(t, r, o) {
                        const i = typeof Zone > "u" ? null : Zone.current,
                            s = function YM(e, n, t) {
                                const r = Object.create(QM);
                                t && (r.consumerAllowSignalWrites = !0), r.fn = e, r.schedule = n;
                                const o = s => {
                                    r.cleanupFn = s
                                };
                                return r.ref = {
                                    notify: () => Yp(r),
                                    run: () => {
                                        if (r.dirty = !1, r.hasRun && !Qp(r)) return;
                                        r.hasRun = !0;
                                        const s = Vc(r);
                                        try {
                                            r.cleanupFn(), r.cleanupFn = og, r.fn(o)
                                        } finally {
                                            jc(r, s)
                                        }
                                    },
                                    cleanup: () => r.cleanupFn()
                                }, r.ref
                            }(t, c => {
                                this.all.has(c) && this.queue.set(c, i)
                            }, o);
                        let a;
                        this.all.add(s), s.notify();
                        const l = () => {
                            s.cleanup(), a ? .(), this.all.delete(s), this.queue.delete(s)
                        };
                        return a = r ? .onDestroy(l), {
                            destroy: l
                        }
                    }
                    flush() {
                        if (0 !== this.queue.size)
                            for (const [t, r] of this.queue) this.queue.delete(t), r ? r.run(() => t.run()) : t.run()
                    }
                    get isQueueEmpty() {
                        return 0 === this.queue.size
                    }
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: () => new e
                    })
                }
                return e
            })();

            function Va(e, n, t) {
                let r = t ? e.styles : null,
                    o = t ? e.classes : null,
                    i = 0;
                if (null !== n)
                    for (let s = 0; s < n.length; s++) {
                        const a = n[s];
                        "number" == typeof a ? i = a : 1 == i ? o = _c(o, a) : 2 == i && (r = _c(r, a + ": " + n[++s] + ";"))
                    }
                t ? e.styles = r : e.stylesWithoutHost = r, t ? e.classes = o : e.classesWithoutHost = o
            }

            function Pi(e, n, t, r, o = !1) {
                for (; null !== t;) {
                    const i = n[t.index];
                    null !== i && r.push(fe(i)), tt(i) && jy(i, r);
                    const s = t.type;
                    if (8 & s) Pi(e, n, t.child, r);
                    else if (32 & s) {
                        const a = pu(t, n);
                        let l;
                        for (; l = a();) r.push(l)
                    } else if (16 & s) {
                        const a = Dm(n, t);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const l = Di(n[Me]);
                            Pi(l[b], l, a, r, !0)
                        }
                    }
                    t = o ? t.projectionNext : t.next
                }
                return r
            }

            function jy(e, n) {
                for (let t = je; t < e.length; t++) {
                    const r = e[t],
                        o = r[b].firstChild;
                    null !== o && Pi(r[b], r, o, n)
                }
                e[rn] !== e[we] && n.push(e[rn])
            }

            function ja(e, n, t, r = !0) {
                const o = n[$r],
                    i = o.rendererFactory,
                    s = o.afterRenderEventManager;
                i.begin ? .(), s ? .begin();
                try {
                    $y(e, n, e.template, t)
                } catch (l) {
                    throw r && Ly(n, l), l
                } finally {
                    i.end ? .(), o.effectManager ? .flush(), s ? .end()
                }
            }

            function $y(e, n, t, r) {
                const o = n[z];
                if (256 != (256 & o)) {
                    n[$r].effectManager ? .flush(), Yc(n);
                    try {
                        dg(n),
                            function _g(e) {
                                return R.lFrame.bindingIndex = e
                            }(e.bindingStartIndex), null !== t && Ey(e, n, t, 2, r);
                        const s = 3 == (3 & o);
                        if (s) {
                            const c = e.preOrderCheckHooks;
                            null !== c && Xs(n, c, null)
                        } else {
                            const c = e.preOrderHooks;
                            null !== c && Js(n, c, 0, null), Xc(n, 0)
                        }
                        if (function zA(e) {
                                for (let n = cm(e); null !== n; n = um(n)) {
                                    if (!n[Hp]) continue;
                                    const t = n[Ur];
                                    for (let r = 0; r < t.length; r++) {
                                        sI(t[r])
                                    }
                                }
                            }(n), By(n, 2), null !== e.contentQueries && ky(e, n), s) {
                            const c = e.contentCheckHooks;
                            null !== c && Xs(n, c)
                        } else {
                            const c = e.contentHooks;
                            null !== c && Js(n, c, 1), Xc(n, 1)
                        }! function gA(e, n) {
                            const t = e.hostBindingOpCodes;
                            if (null === t) return;
                            const r = vy(n, ci);
                            try {
                                for (let o = 0; o < t.length; o++) {
                                    const i = t[o];
                                    if (i < 0) gr(~i);
                                    else {
                                        const s = i,
                                            a = t[++o],
                                            l = t[++o];
                                        vI(a, s), r.dirty = !1;
                                        const c = Vc(r);
                                        try {
                                            l(2, n[s])
                                        } finally {
                                            jc(r, c)
                                        }
                                    }
                                }
                            } finally {
                                null === n[ci] && _y(n, ci), gr(-1)
                            }
                        }(e, n);
                        const a = e.components;
                        null !== a && Uy(n, a, 0);
                        const l = e.viewQuery;
                        if (null !== l && ld(2, l, r), s) {
                            const c = e.viewCheckHooks;
                            null !== c && Xs(n, c)
                        } else {
                            const c = e.viewHooks;
                            null !== c && Js(n, c, 2), Xc(n, 2)
                        }!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), n[z] &= -73, fg(n)
                    } finally {
                        Qc()
                    }
                }
            }

            function By(e, n) {
                for (let t = cm(e); null !== t; t = um(t))
                    for (let r = je; r < t.length; r++) Hy(t[r], n)
            }

            function GA(e, n, t) {
                Hy(It(n, e), t)
            }

            function Hy(e, n) {
                if (! function oI(e) {
                        return 128 == (128 & e[z])
                    }(e)) return;
                const t = e[b],
                    r = e[z];
                if (80 & r && 0 === n || 1024 & r || 2 === n) $y(t, e, t.template, e[Ee]);
                else if (e[oi] > 0) {
                    By(e, 1);
                    const o = t.components;
                    null !== o && Uy(e, o, 1)
                }
            }

            function Uy(e, n, t) {
                for (let r = 0; r < n.length; r++) GA(e, n[r], t)
            }
            class ki {
                get rootNodes() {
                    const n = this._lView,
                        t = n[b];
                    return Pi(t, n, t.firstChild, [])
                }
                constructor(n, t) {
                    this._lView = n, this._cdRefInjectingView = t, this._appRef = null, this._attachedToViewContainer = !1
                }
                get context() {
                    return this._lView[Ee]
                }
                set context(n) {
                    this._lView[Ee] = n
                }
                get destroyed() {
                    return 256 == (256 & this._lView[z])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const n = this._lView[ve];
                        if (tt(n)) {
                            const t = n[8],
                                r = t ? t.indexOf(this) : -1;
                            r > -1 && (ma(n, r), oa(t, r))
                        }
                        this._attachedToViewContainer = !1
                    }
                    mu(this._lView[b], this._lView)
                }
                onDestroy(n) {
                    ! function pg(e, n) {
                        if (256 == (256 & e[z])) throw new D(911, !1);
                        null === e[Hn] && (e[Hn] = []), e[Hn].push(n)
                    }(this._lView, n)
                }
                markForCheck() {
                    Ti(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[z] &= -129
                }
                reattach() {
                    this._lView[z] |= 128
                }
                detectChanges() {
                    ja(this._lView[b], this._lView, this.context)
                }
                checkNoChanges() {}
                attachToViewContainerRef() {
                    if (this._appRef) throw new D(902, !1);
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    this._appRef = null,
                        function Ox(e, n) {
                            bi(e, n, n[H], 2, null, null)
                        }(this._lView[b], this._lView)
                }
                attachToAppRef(n) {
                    if (this._attachedToViewContainer) throw new D(902, !1);
                    this._appRef = n
                }
            }
            class qA extends ki {
                constructor(n) {
                    super(n), this._view = n
                }
                detectChanges() {
                    const n = this._view;
                    ja(n[b], n, n[Ee], !1)
                }
                checkNoChanges() {}
                get context() {
                    return null
                }
            }
            class zy extends ka {
                constructor(n) {
                    super(), this.ngModule = n
                }
                resolveComponentFactory(n) {
                    const t = Z(n);
                    return new Ni(t, this.ngModule)
                }
            }

            function Gy(e) {
                const n = [];
                for (let t in e) e.hasOwnProperty(t) && n.push({
                    propName: e[t],
                    templateName: t
                });
                return n
            }
            class ZA {
                constructor(n, t) {
                    this.injector = n, this.parentInjector = t
                }
                get(n, t, r) {
                    r = js(r);
                    const o = this.injector.get(n, qu, r);
                    return o !== qu || t === qu ? o : this.parentInjector.get(n, t, r)
                }
            }
            class Ni extends Qm {
                get inputs() {
                    const n = this.componentDef,
                        t = n.inputTransforms,
                        r = Gy(n.inputs);
                    if (null !== t)
                        for (const o of r) t.hasOwnProperty(o.propName) && (o.transform = t[o.propName]);
                    return r
                }
                get outputs() {
                    return Gy(this.componentDef.outputs)
                }
                constructor(n, t) {
                    super(), this.componentDef = n, this.ngModule = t, this.componentType = n.type, this.selector = function TM(e) {
                        return e.map(AM).join(",")
                    }(n.selectors), this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : [], this.isBoundToModule = !!t
                }
                create(n, t, r, o) {
                    let i = (o = o || this.ngModule) instanceof Tt ? o : o ? .injector;
                    i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                    const s = i ? new ZA(n, i) : n,
                        a = s.get(Jm, null);
                    if (null === a) throw new D(407, !1);
                    const d = {
                            rendererFactory: a,
                            sanitizer: s.get(zS, null),
                            effectManager: s.get(Vy, null),
                            afterRenderEventManager: s.get(Ku, null)
                        },
                        f = a.createRenderer(null, this.componentDef),
                        h = this.componentDef.selectors[0][0] || "div",
                        p = r ? function yA(e, n, t, r) {
                            const i = r.get(py, !1) || t === zt.ShadowDom,
                                s = e.selectRootElement(n, i);
                            return function vA(e) {
                                Iy(e)
                            }(s), s
                        }(f, r, this.componentDef.encapsulation, s) : ga(f, h, function WA(e) {
                            const n = e.toLowerCase();
                            return "svg" === n ? lg : "math" === n ? "math" : null
                        }(h)),
                        v = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528;
                    let m = null;
                    null !== p && (m = Uu(p, s, !0));
                    const w = od(0, null, null, 1, 0, null, null, null, null, null, null),
                        S = Fa(null, w, null, v, null, null, d, f, s, null, m);
                    let P, oe;
                    Yc(S);
                    try {
                        const Ke = this.componentDef;
                        let vn, Uh = null;
                        Ke.findHostDirectiveDefs ? (vn = [], Uh = new Map, Ke.findHostDirectiveDefs(Ke, vn, Uh), vn.push(Ke)) : vn = [Ke];
                        const H$ = function QA(e, n) {
                                const t = e[b],
                                    r = W;
                                return e[r] = n, go(t, r, 2, "#host", null)
                            }(S, p),
                            U$ = function XA(e, n, t, r, o, i, s) {
                                const a = o[b];
                                ! function JA(e, n, t, r) {
                                    for (const o of e) n.mergedAttrs = ri(n.mergedAttrs, o.hostAttrs);
                                    null !== n.mergedAttrs && (Va(n, n.mergedAttrs, !0), null !== t && Mm(r, t, n))
                                }(r, e, n, s);
                                let l = null;
                                null !== n && (l = Uu(n, o[Bn]));
                                const c = i.rendererFactory.createRenderer(n, t);
                                let u = 16;
                                t.signals ? u = 4096 : t.onPush && (u = 64);
                                const d = Fa(o, My(t), null, u, o[e.index], e, i, c, null, null, l);
                                return a.firstCreatePass && sd(a, e, r.length - 1), La(o, d), o[e.index] = d
                            }(H$, p, Ke, vn, S, d, f);
                        oe = ug(w, W), p && function eT(e, n, t, r) {
                            if (r) kc(e, t, ["ng-version", GS.full]);
                            else {
                                const {
                                    attrs: o,
                                    classes: i
                                } = function OM(e) {
                                    const n = [],
                                        t = [];
                                    let r = 1,
                                        o = 2;
                                    for (; r < e.length;) {
                                        let i = e[r];
                                        if ("string" == typeof i) 2 === o ? "" !== i && n.push(i, e[++r]) : 8 === o && t.push(i);
                                        else {
                                            if (!Gt(o)) break;
                                            o = i
                                        }
                                        r++
                                    }
                                    return {
                                        attrs: n,
                                        classes: t
                                    }
                                }(n.selectors[0]);
                                o && kc(e, t, o), i && i.length > 0 && Em(e, t, i.join(" "))
                            }
                        }(f, Ke, p, r), void 0 !== t && function tT(e, n, t) {
                            const r = e.projection = [];
                            for (let o = 0; o < n.length; o++) {
                                const i = t[o];
                                r.push(null != i ? Array.from(i) : null)
                            }
                        }(oe, this.ngContentSelectors, t), P = function KA(e, n, t, r, o, i) {
                            const s = Be(),
                                a = o[b],
                                l = gt(s, o);
                            Ay(a, o, s, t, null, r);
                            for (let u = 0; u < t.length; u++) qe(mr(o, a, s.directiveStart + u, s), o);
                            Ty(a, o, s), l && qe(l, o);
                            const c = mr(o, a, s.directiveStart + s.componentOffset, s);
                            if (e[Ee] = o[Ee] = c, null !== i)
                                for (const u of i) u(c, n);
                            return td(a, s, e), c
                        }(U$, Ke, vn, Uh, S, [nT]), ud(w, S, null)
                    } finally {
                        Qc()
                    }
                    return new YA(this.componentType, P, fo(oe, S), S, oe)
                }
            }
            class YA extends VS {
                constructor(n, t, r, o, i) {
                    super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = t, this.hostView = this.changeDetectorRef = new qA(o), this.componentType = n
                }
                setInput(n, t) {
                    const r = this._tNode.inputs;
                    let o;
                    if (null !== r && (o = r[n])) {
                        if (this.previousInputValues ? ? = new Map, this.previousInputValues.has(n) && Object.is(this.previousInputValues.get(n), t)) return;
                        const i = this._rootLView;
                        cd(i[b], i, o, n, t), this.previousInputValues.set(n, t), Ti(It(this._tNode.index, i))
                    }
                }
                get injector() {
                    return new ot(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(n) {
                    this.hostView.onDestroy(n)
                }
            }

            function nT() {
                const e = Be();
                Qs(_()[b], e)
            }

            function ne(e) {
                let n = function qy(e) {
                        return Object.getPrototypeOf(e.prototype).constructor
                    }(e.type),
                    t = !0;
                const r = [e];
                for (; n;) {
                    let o;
                    if (Wt(e)) o = n.\u0275cmp || n.\u0275dir;
                    else {
                        if (n.\u0275cmp) throw new D(903, !1);
                        o = n.\u0275dir
                    }
                    if (o) {
                        if (t) {
                            r.push(o);
                            const s = e;
                            s.inputs = $a(e.inputs), s.inputTransforms = $a(e.inputTransforms), s.declaredInputs = $a(e.declaredInputs), s.outputs = $a(e.outputs);
                            const a = o.hostBindings;
                            a && sT(e, a);
                            const l = o.viewQuery,
                                c = o.contentQueries;
                            if (l && oT(e, l), c && iT(e, c), ks(e.inputs, o.inputs), ks(e.declaredInputs, o.declaredInputs), ks(e.outputs, o.outputs), null !== o.inputTransforms && (null === s.inputTransforms && (s.inputTransforms = {}), ks(s.inputTransforms, o.inputTransforms)), Wt(o) && o.data.animation) {
                                const u = e.data;
                                u.animation = (u.animation || []).concat(o.data.animation)
                            }
                        }
                        const i = o.features;
                        if (i)
                            for (let s = 0; s < i.length; s++) {
                                const a = i[s];
                                a && a.ngInherit && a(e), a === ne && (t = !1)
                            }
                    }
                    n = Object.getPrototypeOf(n)
                }! function rT(e) {
                    let n = 0,
                        t = null;
                    for (let r = e.length - 1; r >= 0; r--) {
                        const o = e[r];
                        o.hostVars = n += o.hostVars, o.hostAttrs = ri(o.hostAttrs, t = ri(t, o.hostAttrs))
                    }
                }(r)
            }

            function $a(e) {
                return e === tn ? {} : e === X ? [] : e
            }

            function oT(e, n) {
                const t = e.viewQuery;
                e.viewQuery = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }

            function iT(e, n) {
                const t = e.contentQueries;
                e.contentQueries = t ? (r, o, i) => {
                    n(r, o, i), t(r, o, i)
                } : n
            }

            function sT(e, n) {
                const t = e.hostBindings;
                e.hostBindings = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }

            function Ba(e) {
                return !!dd(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e)
            }

            function dd(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }

            function dn(e, n, t) {
                return e[n] = t
            }

            function Ze(e, n, t) {
                return !Object.is(e[n], t) && (e[n] = t, !0)
            }

            function Cr(e, n, t, r) {
                const o = Ze(e, n, t);
                return Ze(e, n + 1, r) || o
            }

            function $t(e, n, t, r, o, i) {
                const s = Cr(e, n, t, r);
                return Cr(e, n + 2, o, i) || s
            }

            function vt(e, n, t, r) {
                const o = _();
                return Ze(o, Wr(), n) && (Y(), un(Ce(), o, e, n, t, r)), vt
            }

            function yo(e, n, t, r) {
                return Ze(e, Wr(), t) ? n + B(t) + r : U
            }

            function Ne(e, n, t, r, o, i, s, a) {
                const l = _(),
                    c = Y(),
                    u = e + W,
                    d = c.firstCreatePass ? function OT(e, n, t, r, o, i, s, a, l) {
                        const c = n.consts,
                            u = go(n, e, 4, s || null, zn(c, a));
                        id(n, t, u, zn(c, l)), Qs(n, u);
                        const d = u.tView = od(2, u, r, o, i, n.directiveRegistry, n.pipeRegistry, null, n.schemas, c, null);
                        return null !== n.queries && (n.queries.template(n, u), d.queries = n.queries.embeddedTView(u)), u
                    }(u, c, l, n, t, r, o, i, s) : c.data[u];
                sn(d, !1);
                const f = cv(c, l, d, e);
                Ys() && va(c, l, f, d), qe(f, l), La(l, l[u] = Py(f, l, f, d)), zs(d) && nd(c, l, d), null != s && rd(l, d, a)
            }
            let cv = function uv(e, n, t, r) {
                return Gn(!0), n[H].createComment("")
            };

            function ae(e, n, t) {
                const r = _();
                return Ze(r, Wr(), n) && Ot(Y(), Ce(), r, e, n, r[H], t, !1), ae
            }

            function yd(e, n, t, r, o) {
                const s = o ? "class" : "style";
                cd(e, t, n.inputs[s], s, r)
            }

            function L(e, n, t, r) {
                const o = _(),
                    i = Y(),
                    s = W + e,
                    a = o[H],
                    l = i.firstCreatePass ? function FT(e, n, t, r, o, i) {
                        const s = n.consts,
                            l = go(n, e, 2, r, zn(s, o));
                        return id(n, t, l, zn(s, i)), null !== l.attrs && Va(l, l.attrs, !1), null !== l.mergedAttrs && Va(l, l.mergedAttrs, !0), null !== n.queries && n.queries.elementStart(n, l), l
                    }(s, i, o, n, t, r) : i.data[s],
                    c = dv(i, o, l, a, n, e);
                o[s] = c;
                const u = zs(l);
                return sn(l, !0), Mm(a, c, l), 32 != (32 & l.flags) && Ys() && va(i, o, c, l), 0 === function lI() {
                        return R.lFrame.elementDepthCount
                    }() && qe(c, o),
                    function cI() {
                        R.lFrame.elementDepthCount++
                    }(), u && (nd(i, o, l), td(i, l, o)), null !== r && rd(o, l), L
            }

            function V() {
                let e = Be();
                zc() ? Gc() : (e = e.parent, sn(e, !1));
                const n = e;
                (function dI(e) {
                    return R.skipHydrationRootTNode === e
                })(n) && function gI() {
                    R.skipHydrationRootTNode = null
                }(),
                function uI() {
                    R.lFrame.elementDepthCount--
                }();
                const t = Y();
                return t.firstCreatePass && (Qs(t, e), Rc(e) && t.queries.elementEnd(e)), null != n.classesWithoutHost && function AI(e) {
                    return 0 != (8 & e.flags)
                }(n) && yd(t, n, _(), n.classesWithoutHost, !0), null != n.stylesWithoutHost && function TI(e) {
                    return 0 != (16 & e.flags)
                }(n) && yd(t, n, _(), n.stylesWithoutHost, !1), V
            }

            function he(e, n, t, r) {
                return L(e, n, t, r), V(), he
            }
            let dv = (e, n, t, r, o, i) => (Gn(!0), ga(r, o, function xg() {
                return R.lFrame.currentNamespace
            }()));

            function Mo() {
                return _()
            }

            function ji(e) {
                return !!e && "function" == typeof e.then
            }

            function pv(e) {
                return !!e && "function" == typeof e.subscribe
            }

            function Se(e, n, t, r) {
                const o = _(),
                    i = Y(),
                    s = Be();
                return function mv(e, n, t, r, o, i, s) {
                    const a = zs(r),
                        c = e.firstCreatePass && Ry(e),
                        u = n[Ee],
                        d = Ny(n);
                    let f = !0;
                    if (3 & r.type || s) {
                        const g = gt(r, n),
                            y = s ? s(g) : g,
                            v = d.length,
                            m = s ? S => s(fe(S[r.index])) : r.index;
                        let w = null;
                        if (!s && a && (w = function HT(e, n, t, r) {
                                const o = e.cleanup;
                                if (null != o)
                                    for (let i = 0; i < o.length - 1; i += 2) {
                                        const s = o[i];
                                        if (s === t && o[i + 1] === r) {
                                            const a = n[jr],
                                                l = o[i + 2];
                                            return a.length > l ? a[l] : null
                                        }
                                        "string" == typeof s && (i += 2)
                                    }
                                return null
                            }(e, n, o, r.index)), null !== w)(w.__ngLastListenerFn__ || w).__ngNextListenerFn__ = i, w.__ngLastListenerFn__ = i, f = !1;
                        else {
                            i = vv(r, n, u, i, !1);
                            const S = t.listen(y, o, i);
                            d.push(i, S), c && c.push(o, m, v, v + 1)
                        }
                    } else i = vv(r, n, u, i, !1);
                    const h = r.outputs;
                    let p;
                    if (f && null !== h && (p = h[o])) {
                        const g = p.length;
                        if (g)
                            for (let y = 0; y < g; y += 2) {
                                const P = n[p[y]][p[y + 1]].subscribe(i),
                                    oe = d.length;
                                d.push(i, P), c && c.push(o, r.index, oe, -(oe + 1))
                            }
                    }
                }(i, o, o[H], s, e, n, r), Se
            }

            function yv(e, n, t, r) {
                try {
                    return on(6, n, t), !1 !== t(r)
                } catch (o) {
                    return Ly(e, o), !1
                } finally {
                    on(7, n, t)
                }
            }

            function vv(e, n, t, r, o) {
                return function i(s) {
                    if (s === Function) return r;
                    Ti(e.componentOffset > -1 ? It(e.index, n) : n);
                    let l = yv(n, t, r, s),
                        c = i.__ngNextListenerFn__;
                    for (; c;) l = yv(n, t, c, s) && l, c = c.__ngNextListenerFn__;
                    return o && !1 === l && s.preventDefault(), l
                }
            }

            function pe(e = 1) {
                return function DI(e) {
                    return (R.lFrame.contextLView = function wI(e, n) {
                        for (; e > 0;) n = n[Br], e--;
                        return n
                    }(e, R.lFrame.contextLView))[Ee]
                }(e)
            }

            function UT(e, n) {
                let t = null;
                const r = function MM(e) {
                    const n = e.attrs;
                    if (null != n) {
                        const t = n.indexOf(5);
                        if (!(1 & t)) return n[t + 1]
                    }
                    return null
                }(e);
                for (let o = 0; o < n.length; o++) {
                    const i = n[o];
                    if ("*" !== i) {
                        if (null === r ? Rp(e, i, !0) : SM(r, i)) return o
                    } else t = o
                }
                return t
            }

            function Pt(e, n, t) {
                return Zt(e, "", n, "", t), Pt
            }

            function Zt(e, n, t, r, o) {
                const i = _(),
                    s = yo(i, n, t, r);
                return s !== U && Ot(Y(), Ce(), i, e, s, i[H], o, !1), Zt
            }

            function qa(e, n) {
                return e << 17 | n << 2
            }

            function Zn(e) {
                return e >> 17 & 32767
            }

            function Cd(e) {
                return 2 | e
            }

            function Dr(e) {
                return (131068 & e) >> 2
            }

            function Dd(e, n) {
                return -131069 & e | n << 2
            }

            function wd(e) {
                return 1 | e
            }

            function Av(e, n, t, r, o) {
                const i = e[t + 1],
                    s = null === n;
                let a = r ? Zn(i) : Dr(i),
                    l = !1;
                for (; 0 !== a && (!1 === l || s);) {
                    const u = e[a + 1];
                    YT(e[a], n) && (l = !0, e[a + 1] = r ? wd(u) : Cd(u)), a = r ? Zn(u) : Dr(u)
                }
                l && (e[t + 1] = r ? Cd(i) : wd(i))
            }

            function YT(e, n) {
                return null === e || null == n || (Array.isArray(e) ? e[1] : e) === n || !(!Array.isArray(e) || "string" != typeof n) && to(e, n) >= 0
            }

            function $i(e, n) {
                return function Yt(e, n, t, r) {
                    const o = _(),
                        i = Y(),
                        s = function Mn(e) {
                            const n = R.lFrame,
                                t = n.bindingIndex;
                            return n.bindingIndex = n.bindingIndex + e, t
                        }(2);
                    i.firstUpdatePass && function Vv(e, n, t, r) {
                        const o = e.data;
                        if (null === o[t + 1]) {
                            const i = o[rt()],
                                s = function Lv(e, n) {
                                    return n >= e.expandoStartIndex
                                }(e, t);
                            (function Hv(e, n) {
                                return 0 != (e.flags & (n ? 8 : 16))
                            })(i, r) && null === n && !s && (n = !1), n = function o1(e, n, t, r) {
                                    const o = function Wc(e) {
                                        const n = R.lFrame.currentDirectiveIndex;
                                        return -1 === n ? null : e[n]
                                    }(e);
                                    let i = r ? n.residualClasses : n.residualStyles;
                                    if (null === o) 0 === (r ? n.classBindings : n.styleBindings) && (t = Bi(t = bd(null, e, n, t, r), n.attrs, r), i = null);
                                    else {
                                        const s = n.directiveStylingLast;
                                        if (-1 === s || e[s] !== o)
                                            if (t = bd(o, e, n, t, r), null === i) {
                                                let l = function i1(e, n, t) {
                                                    const r = t ? n.classBindings : n.styleBindings;
                                                    if (0 !== Dr(r)) return e[Zn(r)]
                                                }(e, n, r);
                                                void 0 !== l && Array.isArray(l) && (l = bd(null, e, n, l[1], r), l = Bi(l, n.attrs, r), function s1(e, n, t, r) {
                                                    e[Zn(t ? n.classBindings : n.styleBindings)] = r
                                                }(e, n, r, l))
                                            } else i = function a1(e, n, t) {
                                                let r;
                                                const o = n.directiveEnd;
                                                for (let i = 1 + n.directiveStylingLast; i < o; i++) r = Bi(r, e[i].hostAttrs, t);
                                                return Bi(r, n.attrs, t)
                                            }(e, n, r)
                                    }
                                    return void 0 !== i && (r ? n.residualClasses = i : n.residualStyles = i), t
                                }(o, i, n, r),
                                function WT(e, n, t, r, o, i) {
                                    let s = i ? n.classBindings : n.styleBindings,
                                        a = Zn(s),
                                        l = Dr(s);
                                    e[r] = t;
                                    let u, c = !1;
                                    if (Array.isArray(t) ? (u = t[1], (null === u || to(t, u) > 0) && (c = !0)) : u = t, o)
                                        if (0 !== l) {
                                            const f = Zn(e[a + 1]);
                                            e[r + 1] = qa(f, a), 0 !== f && (e[f + 1] = Dd(e[f + 1], r)), e[a + 1] = function GT(e, n) {
                                                return 131071 & e | n << 17
                                            }(e[a + 1], r)
                                        } else e[r + 1] = qa(a, 0), 0 !== a && (e[a + 1] = Dd(e[a + 1], r)), a = r;
                                    else e[r + 1] = qa(l, 0), 0 === a ? a = r : e[l + 1] = Dd(e[l + 1], r), l = r;
                                    c && (e[r + 1] = Cd(e[r + 1])), Av(e, u, r, !0), Av(e, u, r, !1),
                                        function ZT(e, n, t, r, o) {
                                            const i = o ? e.residualClasses : e.residualStyles;
                                            null != i && "string" == typeof n && to(i, n) >= 0 && (t[r + 1] = wd(t[r + 1]))
                                        }(n, u, e, r, i), s = qa(a, l), i ? n.classBindings = s : n.styleBindings = s
                                }(o, i, n, t, s, r)
                        }
                    }(i, e, s, r), n !== U && Ze(o, s, n) && function $v(e, n, t, r, o, i, s, a) {
                        if (!(3 & n.type)) return;
                        const l = e.data,
                            c = l[a + 1],
                            u = function qT(e) {
                                return 1 == (1 & e)
                            }(c) ? Bv(l, n, t, o, Dr(c), s) : void 0;
                        Wa(u) || (Wa(i) || function zT(e) {
                            return 2 == (2 & e)
                        }(c) && (i = Bv(l, null, t, o, a, s)), function Bx(e, n, t, r, o) {
                            if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
                            else {
                                let i = -1 === r.indexOf("-") ? void 0 : qn.DashCase;
                                null == o ? e.removeStyle(t, r, i) : ("string" == typeof o && o.endsWith("!important") && (o = o.slice(0, -10), i |= qn.Important), e.setStyle(t, r, o, i))
                            }
                        }(r, s, Ws(rt(), t), o, i))
                    }(i, i.data[rt()], o, o[H], e, o[s + 1] = function d1(e, n) {
                        return null == e || "" === e || ("string" == typeof n ? e += n : "object" == typeof e && (e = Pe(St(e)))), e
                    }(n, t), r, s)
                }(e, n, null, !0), $i
            }

            function bd(e, n, t, r, o) {
                let i = null;
                const s = t.directiveEnd;
                let a = t.directiveStylingLast;
                for (-1 === a ? a = t.directiveStart : a++; a < s && (i = n[a], r = Bi(r, i.hostAttrs, o), i !== e);) a++;
                return null !== e && (t.directiveStylingLast = a), r
            }

            function Bi(e, n, t) {
                const r = t ? 1 : 2;
                let o = -1;
                if (null !== n)
                    for (let i = 0; i < n.length; i++) {
                        const s = n[i];
                        "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), xt(e, s, !!t || n[++i]))
                    }
                return void 0 === e ? null : e
            }

            function Bv(e, n, t, r, o, i) {
                const s = null === n;
                let a;
                for (; o > 0;) {
                    const l = e[o],
                        c = Array.isArray(l),
                        u = c ? l[1] : l,
                        d = null === u;
                    let f = t[o + 1];
                    f === U && (f = d ? X : void 0);
                    let h = d ? iu(f, r) : u === r ? f : void 0;
                    if (c && !Wa(h) && (h = iu(l, r)), Wa(h) && (a = h, s)) return a;
                    const p = e[o + 1];
                    o = s ? Zn(p) : Dr(p)
                }
                if (null !== n) {
                    let l = i ? n.residualClasses : n.residualStyles;
                    null != l && (a = iu(l, r))
                }
                return a
            }

            function Wa(e) {
                return void 0 !== e
            }

            function Fe(e, n = "") {
                const t = _(),
                    r = Y(),
                    o = e + W,
                    i = r.firstCreatePass ? go(r, o, 1, n, null) : r.data[o],
                    s = Uv(r, t, i, n, e);
                t[o] = s, Ys() && va(r, t, s, i), sn(i, !1)
            }
            let Uv = (e, n, t, r, o) => (Gn(!0), function pa(e, n) {
                return e.createText(n)
            }(n[H], r));

            function Ye(e) {
                return Ed("", e, ""), Ye
            }

            function Ed(e, n, t) {
                const r = _(),
                    o = yo(r, e, n, t);
                return o !== U && function An(e, n, t) {
                    const r = Ws(n, e);
                    ! function fm(e, n, t) {
                        e.setValue(n, t)
                    }(e[H], r, t)
                }(r, rt(), o), Ed
            }
            const So = "en-US";
            let d_ = So;

            function xd(e, n, t, r, o) {
                if (e = j(e), Array.isArray(e))
                    for (let i = 0; i < e.length; i++) xd(e[i], n, t, r, o);
                else {
                    const i = Y(),
                        s = _(),
                        a = Be();
                    let l = _r(e) ? e : j(e.provide);
                    const c = zm(e),
                        u = 1048575 & a.providerIndexes,
                        d = a.directiveStart,
                        f = a.providerIndexes >> 20;
                    if (_r(e) || !e.multi) {
                        const h = new hi(c, o, C),
                            p = Ad(l, n, o ? u : u + f, d); - 1 === p ? (nu(ea(a, s), i, l), Sd(i, e, n.length), n.push(l), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), t.push(h), s.push(h)) : (t[p] = h, s[p] = h)
                    } else {
                        const h = Ad(l, n, u + f, d),
                            p = Ad(l, n, u, u + f),
                            y = p >= 0 && t[p];
                        if (o && !y || !o && !(h >= 0 && t[h])) {
                            nu(ea(a, s), i, l);
                            const v = function PO(e, n, t, r, o) {
                                const i = new hi(e, t, C);
                                return i.multi = [], i.index = n, i.componentProviders = 0, F_(i, o, r && !t), i
                            }(o ? OO : TO, t.length, o, r, c);
                            !o && y && (t[p].providerFactory = v), Sd(i, e, n.length, 0), n.push(l), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), t.push(v), s.push(v)
                        } else Sd(i, e, h > -1 ? h : p, F_(t[o ? p : h], c, !o && r));
                        !o && r && y && t[p].componentProviders++
                    }
                }
            }

            function Sd(e, n, t, r) {
                const o = _r(n),
                    i = function DS(e) {
                        return !!e.useClass
                    }(n);
                if (o || i) {
                    const l = (i ? j(n.useClass) : n).prototype.ngOnDestroy;
                    if (l) {
                        const c = e.destroyHooks || (e.destroyHooks = []);
                        if (!o && n.multi) {
                            const u = c.indexOf(t); - 1 === u ? c.push(t, [r, l]) : c[u + 1].push(r, l)
                        } else c.push(t, l)
                    }
                }
            }

            function F_(e, n, t) {
                return t && e.componentProviders++, e.multi.push(n) - 1
            }

            function Ad(e, n, t, r) {
                for (let o = t; o < r; o++)
                    if (n[o] === e) return o;
                return -1
            }

            function TO(e, n, t, r) {
                return Td(this.multi, [])
            }

            function OO(e, n, t, r) {
                const o = this.multi;
                let i;
                if (this.providerFactory) {
                    const s = this.providerFactory.componentProviders,
                        a = mr(t, t[b], this.providerFactory.index, r);
                    i = a.slice(0, s), Td(o, i);
                    for (let l = s; l < a.length; l++) i.push(a[l])
                } else i = [], Td(o, i);
                return i
            }

            function Td(e, n) {
                for (let t = 0; t < e.length; t++) n.push((0, e[t])());
                return n
            }

            function _e(e, n = []) {
                return t => {
                    t.providersResolver = (r, o) => function AO(e, n, t) {
                        const r = Y();
                        if (r.firstCreatePass) {
                            const o = Wt(e);
                            xd(t, r.data, r.blueprint, o, !0), xd(n, r.data, r.blueprint, o, !1)
                        }
                    }(r, o ? o(e) : e, n)
                }
            }
            class br {}
            class L_ {}
            class Od extends br {
                constructor(n, t, r) {
                    super(), this._parent = t, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new zy(this);
                    const o = Et(n);
                    this._bootstrapComponents = Sn(o.bootstrap), this._r3Injector = ry(n, t, [{
                        provide: br,
                        useValue: this
                    }, {
                        provide: ka,
                        useValue: this.componentFactoryResolver
                    }, ...r], Pe(n), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(n)
                }
                get injector() {
                    return this._r3Injector
                }
                destroy() {
                    const n = this._r3Injector;
                    !n.destroyed && n.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
                }
                onDestroy(n) {
                    this.destroyCbs.push(n)
                }
            }
            class Pd extends L_ {
                constructor(n) {
                    super(), this.moduleType = n
                }
                create(n) {
                    return new Od(this.moduleType, n, [])
                }
            }
            class V_ extends br {
                constructor(n) {
                    super(), this.componentFactoryResolver = new zy(this), this.instance = null;
                    const t = new ao([...n.providers, {
                        provide: br,
                        useValue: this
                    }, {
                        provide: ka,
                        useValue: this.componentFactoryResolver
                    }], n.parent || Ia(), n.debugName, new Set(["environment"]));
                    this.injector = t, n.runEnvironmentInitializers && t.resolveInjectorInitializers()
                }
                destroy() {
                    this.injector.destroy()
                }
                onDestroy(n) {
                    this.injector.onDestroy(n)
                }
            }

            function kd(e, n, t = null) {
                return new V_({
                    providers: e,
                    parent: n,
                    debugName: t,
                    runEnvironmentInitializers: !0
                }).injector
            }
            let RO = (() => {
                class e {
                    constructor(t) {
                        this._injector = t, this.cachedInjectors = new Map
                    }
                    getOrCreateStandaloneInjector(t) {
                        if (!t.standalone) return null;
                        if (!this.cachedInjectors.has(t)) {
                            const r = $m(0, t.type),
                                o = r.length > 0 ? kd([r], this._injector, `Standalone[${t.type.name}]`) : null;
                            this.cachedInjectors.set(t, o)
                        }
                        return this.cachedInjectors.get(t)
                    }
                    ngOnDestroy() {
                        try {
                            for (const t of this.cachedInjectors.values()) null !== t && t.destroy()
                        } finally {
                            this.cachedInjectors.clear()
                        }
                    }
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "environment",
                        factory: () => new e(I(Tt))
                    })
                }
                return e
            })();

            function j_(e) {
                e.getStandaloneInjector = n => n.get(RO).getOrCreateStandaloneInjector(e)
            }

            function W_(e, n, t, r, o) {
                return function Q_(e, n, t, r, o, i, s) {
                    const a = n + t;
                    return Cr(e, a, o, i) ? dn(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : Wi(e, a + 2)
                }(_(), nt(), e, n, t, r, o)
            }

            function Wi(e, n) {
                const t = e[n];
                return t === U ? void 0 : t
            }

            function Y_(e, n, t, r, o, i) {
                const s = n + t;
                return Ze(e, s, o) ? dn(e, s + 1, i ? r.call(i, o) : r(o)) : Wi(e, s + 1)
            }

            function Rd(e, n) {
                const t = Y();
                let r;
                const o = e + W;
                t.firstCreatePass ? (r = function XO(e, n) {
                    if (n)
                        for (let t = n.length - 1; t >= 0; t--) {
                            const r = n[t];
                            if (e === r.name) return r
                        }
                }(n, t.pipeRegistry), t.data[o] = r, r.onDestroy && (t.destroyHooks ? ? = []).push(o, r.onDestroy)) : r = t.data[o];
                const i = r.factory || (r.factory = fr(r.type)),
                    a = ht(C);
                try {
                    const l = Ks(!1),
                        c = i();
                    return Ks(l),
                        function NT(e, n, t, r) {
                            t >= e.data.length && (e.data[t] = null, e.blueprint[t] = null), n[t] = r
                        }(t, _(), o, c), c
                } finally {
                    ht(a)
                }
            }

            function Fd(e, n, t) {
                const r = e + W,
                    o = _(),
                    i = function Gr(e, n) {
                        return e[n]
                    }(o, r);
                return function Zi(e, n) {
                    return e[b].data[n].pure
                }(o, r) ? Y_(o, nt(), n, i.transform, t, i) : i.transform(t)
            }

            function nP() {
                return this._results[Symbol.iterator]()
            }
            class Ld {
                static# e = Symbol.iterator;
                get changes() {
                    return this._changes || (this._changes = new ye)
                }
                constructor(n = !1) {
                    this._emitDistinctChangesOnly = n, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                    const t = Ld.prototype;
                    t[Symbol.iterator] || (t[Symbol.iterator] = nP)
                }
                get(n) {
                    return this._results[n]
                }
                map(n) {
                    return this._results.map(n)
                }
                filter(n) {
                    return this._results.filter(n)
                }
                find(n) {
                    return this._results.find(n)
                }
                reduce(n, t) {
                    return this._results.reduce(n, t)
                }
                forEach(n) {
                    this._results.forEach(n)
                }
                some(n) {
                    return this._results.some(n)
                }
                toArray() {
                    return this._results.slice()
                }
                toString() {
                    return this._results.toString()
                }
                reset(n, t) {
                    const r = this;
                    r.dirty = !1;
                    const o = function jt(e) {
                        return e.flat(Number.POSITIVE_INFINITY)
                    }(n);
                    (this._changesDetected = ! function zI(e, n, t) {
                        if (e.length !== n.length) return !1;
                        for (let r = 0; r < e.length; r++) {
                            let o = e[r],
                                i = n[r];
                            if (t && (o = t(o), i = t(i)), i !== o) return !1
                        }
                        return !0
                    }(r._results, o, t)) && (r._results = o, r.length = o.length, r.last = o[this.length - 1], r.first = o[0])
                }
                notifyOnChanges() {
                    this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
                }
                setDirty() {
                    this.dirty = !0
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe()
                }
            }

            function oP(e, n, t, r = !0) {
                const o = n[b];
                if (function kx(e, n, t, r) {
                        const o = je + r,
                            i = t.length;
                        r > 0 && (t[o - 1][qt] = n), r < i - je ? (n[qt] = t[o], Hg(t, je + r, n)) : (t.push(n), n[qt] = null), n[ve] = t;
                        const s = n[si];
                        null !== s && t !== s && function Nx(e, n) {
                            const t = e[Ur];
                            n[Me] !== n[ve][ve][Me] && (e[Hp] = !0), null === t ? e[Ur] = [n] : t.push(n)
                        }(s, n);
                        const a = n[nn];
                        null !== a && a.insertView(e), n[z] |= 128
                    }(o, n, e, t), r) {
                    const i = Cu(t, e),
                        s = n[H],
                        a = ya(s, e[rn]);
                    null !== a && function Tx(e, n, t, r, o, i) {
                        r[we] = o, r[Ge] = n, bi(e, r, t, 1, o, i)
                    }(o, e[Ge], s, n, a, i)
                }
            }
            let Tn = (() => {
                class e {
                    static# e = this.__NG_ELEMENT_ID__ = aP
                }
                return e
            })();
            const iP = Tn,
                sP = class extends iP {
                    constructor(n, t, r) {
                        super(), this._declarationLView = n, this._declarationTContainer = t, this.elementRef = r
                    }
                    get ssrId() {
                        return this._declarationTContainer.tView ? .ssrId || null
                    }
                    createEmbeddedView(n, t) {
                        return this.createEmbeddedViewImpl(n, t)
                    }
                    createEmbeddedViewImpl(n, t, r) {
                        const o = function rP(e, n, t, r) {
                            const o = n.tView,
                                a = Fa(e, o, t, 4096 & e[z] ? 4096 : 16, null, n, null, null, null, r ? .injector ? ? null, r ? .hydrationInfo ? ? null);
                            a[si] = e[n.index];
                            const c = e[nn];
                            return null !== c && (a[nn] = c.createEmbeddedView(o)), ud(o, a, t), a
                        }(this._declarationLView, this._declarationTContainer, n, {
                            injector: t,
                            hydrationInfo: r
                        });
                        return new ki(o)
                    }
                };

            function aP() {
                return Ja(Be(), _())
            }

            function Ja(e, n) {
                return 4 & e.type ? new sP(n, e, fo(e, n)) : null
            }
            let kt = (() => {
                class e {
                    static# e = this.__NG_ELEMENT_ID__ = hP
                }
                return e
            })();

            function hP() {
                return sC(Be(), _())
            }
            const pP = kt,
                oC = class extends pP {
                    constructor(n, t, r) {
                        super(), this._lContainer = n, this._hostTNode = t, this._hostLView = r
                    }
                    get element() {
                        return fo(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new ot(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const n = ta(this._hostTNode, this._hostLView);
                        if (Kc(n)) {
                            const t = gi(n, this._hostLView),
                                r = pi(n);
                            return new ot(t[b].data[r + 8], t)
                        }
                        return new ot(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(n) {
                        const t = iC(this._lContainer);
                        return null !== t && t[n] || null
                    }
                    get length() {
                        return this._lContainer.length - je
                    }
                    createEmbeddedView(n, t, r) {
                        let o, i;
                        "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                        const a = n.createEmbeddedViewImpl(t || {}, i, null);
                        return this.insertImpl(a, o, false), a
                    }
                    createComponent(n, t, r, o, i) {
                        const s = n && ! function yi(e) {
                            return "function" == typeof e
                        }(n);
                        let a;
                        if (s) a = t;
                        else {
                            const g = t || {};
                            a = g.index, r = g.injector, o = g.projectableNodes, i = g.environmentInjector || g.ngModuleRef
                        }
                        const l = s ? n : new Ni(Z(n)),
                            c = r || this.parentInjector;
                        if (!i && null == l.ngModule) {
                            const y = (s ? c : this.parentInjector).get(Tt, null);
                            y && (i = y)
                        }
                        Z(l.componentType ? ? {});
                        const h = l.create(c, o, null, i);
                        return this.insertImpl(h.hostView, a, false), h
                    }
                    insert(n, t) {
                        return this.insertImpl(n, t, !1)
                    }
                    insertImpl(n, t, r) {
                        const o = n._lView;
                        if (function iI(e) {
                                return tt(e[ve])
                            }(o)) {
                            const l = this.indexOf(n);
                            if (-1 !== l) this.detach(l);
                            else {
                                const c = o[ve],
                                    u = new oC(c, c[Ge], c[ve]);
                                u.detach(u.indexOf(n))
                            }
                        }
                        const s = this._adjustIndex(t),
                            a = this._lContainer;
                        return oP(a, o, s, !r), n.attachToViewContainerRef(), Hg(Vd(a), s, n), n
                    }
                    move(n, t) {
                        return this.insert(n, t)
                    }
                    indexOf(n) {
                        const t = iC(this._lContainer);
                        return null !== t ? t.indexOf(n) : -1
                    }
                    remove(n) {
                        const t = this._adjustIndex(n, -1),
                            r = ma(this._lContainer, t);
                        r && (oa(Vd(this._lContainer), t), mu(r[b], r))
                    }
                    detach(n) {
                        const t = this._adjustIndex(n, -1),
                            r = ma(this._lContainer, t);
                        return r && null != oa(Vd(this._lContainer), t) ? new ki(r) : null
                    }
                    _adjustIndex(n, t = 0) {
                        return n ? ? this.length + t
                    }
                };

            function iC(e) {
                return e[8]
            }

            function Vd(e) {
                return e[8] || (e[8] = [])
            }

            function sC(e, n) {
                let t;
                const r = n[e.index];
                return tt(r) ? t = r : (t = Py(r, n, null, e), n[e.index] = t, La(n, t)), aC(t, n, e, r), new oC(t, e, n)
            }
            let aC = function lC(e, n, t, r) {
                if (e[rn]) return;
                let o;
                o = 8 & t.type ? fe(r) : function gP(e, n) {
                    const t = e[H],
                        r = t.createComment(""),
                        o = gt(n, e);
                    return yr(t, ya(t, o), r, function Vx(e, n) {
                        return e.nextSibling(n)
                    }(t, o), !1), r
                }(n, t), e[rn] = o
            };
            class jd {
                constructor(n) {
                    this.queryList = n, this.matches = null
                }
                clone() {
                    return new jd(this.queryList)
                }
                setDirty() {
                    this.queryList.setDirty()
                }
            }
            class $d {
                constructor(n = []) {
                    this.queries = n
                }
                createEmbeddedView(n) {
                    const t = n.queries;
                    if (null !== t) {
                        const r = null !== n.contentQueries ? n.contentQueries[0] : t.length,
                            o = [];
                        for (let i = 0; i < r; i++) {
                            const s = t.getByIndex(i);
                            o.push(this.queries[s.indexInDeclarationView].clone())
                        }
                        return new $d(o)
                    }
                    return null
                }
                insertView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                detachView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                dirtyQueriesWithMatches(n) {
                    for (let t = 0; t < this.queries.length; t++) null !== pC(n, t).matches && this.queries[t].setDirty()
                }
            }
            class cC {
                constructor(n, t, r = null) {
                    this.predicate = n, this.flags = t, this.read = r
                }
            }
            class Bd {
                constructor(n = []) {
                    this.queries = n
                }
                elementStart(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, t)
                }
                elementEnd(n) {
                    for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n)
                }
                embeddedTView(n) {
                    let t = null;
                    for (let r = 0; r < this.length; r++) {
                        const o = null !== t ? t.length : 0,
                            i = this.getByIndex(r).embeddedTView(n, o);
                        i && (i.indexInDeclarationView = r, null !== t ? t.push(i) : t = [i])
                    }
                    return null !== t ? new Bd(t) : null
                }
                template(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, t)
                }
                getByIndex(n) {
                    return this.queries[n]
                }
                get length() {
                    return this.queries.length
                }
                track(n) {
                    this.queries.push(n)
                }
            }
            class Hd {
                constructor(n, t = -1) {
                    this.metadata = n, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = t
                }
                elementStart(n, t) {
                    this.isApplyingToNode(t) && this.matchTNode(n, t)
                }
                elementEnd(n) {
                    this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1)
                }
                template(n, t) {
                    this.elementStart(n, t)
                }
                embeddedTView(n, t) {
                    return this.isApplyingToNode(n) ? (this.crossesNgTemplate = !0, this.addMatch(-n.index, t), new Hd(this.metadata)) : null
                }
                isApplyingToNode(n) {
                    if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                        const t = this._declarationNodeIndex;
                        let r = n.parent;
                        for (; null !== r && 8 & r.type && r.index !== t;) r = r.parent;
                        return t === (null !== r ? r.index : -1)
                    }
                    return this._appliesToNextNode
                }
                matchTNode(n, t) {
                    const r = this.metadata.predicate;
                    if (Array.isArray(r))
                        for (let o = 0; o < r.length; o++) {
                            const i = r[o];
                            this.matchTNodeWithReadOption(n, t, vP(t, i)), this.matchTNodeWithReadOption(n, t, na(t, n, i, !1, !1))
                        } else r === Tn ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1) : this.matchTNodeWithReadOption(n, t, na(t, n, r, !1, !1))
                }
                matchTNodeWithReadOption(n, t, r) {
                    if (null !== r) {
                        const o = this.metadata.read;
                        if (null !== o)
                            if (o === it || o === kt || o === Tn && 4 & t.type) this.addMatch(t.index, -2);
                            else {
                                const i = na(t, n, o, !1, !1);
                                null !== i && this.addMatch(t.index, i)
                            }
                        else this.addMatch(t.index, r)
                    }
                }
                addMatch(n, t) {
                    null === this.matches ? this.matches = [n, t] : this.matches.push(n, t)
                }
            }

            function vP(e, n) {
                const t = e.localNames;
                if (null !== t)
                    for (let r = 0; r < t.length; r += 2)
                        if (t[r] === n) return t[r + 1];
                return null
            }

            function CP(e, n, t, r) {
                return -1 === t ? function _P(e, n) {
                    return 11 & e.type ? fo(e, n) : 4 & e.type ? Ja(e, n) : null
                }(n, e) : -2 === t ? function DP(e, n, t) {
                    return t === it ? fo(n, e) : t === Tn ? Ja(n, e) : t === kt ? sC(n, e) : void 0
                }(e, n, r) : mr(e, e[b], t, n)
            }

            function uC(e, n, t, r) {
                const o = n[nn].queries[r];
                if (null === o.matches) {
                    const i = e.data,
                        s = t.matches,
                        a = [];
                    for (let l = 0; l < s.length; l += 2) {
                        const c = s[l];
                        a.push(c < 0 ? null : CP(n, i[c], s[l + 1], t.metadata.read))
                    }
                    o.matches = a
                }
                return o.matches
            }

            function Ud(e, n, t, r) {
                const o = e.queries.getByIndex(t),
                    i = o.matches;
                if (null !== i) {
                    const s = uC(e, n, o, t);
                    for (let a = 0; a < i.length; a += 2) {
                        const l = i[a];
                        if (l > 0) r.push(s[a / 2]);
                        else {
                            const c = i[a + 1],
                                u = n[-l];
                            for (let d = je; d < u.length; d++) {
                                const f = u[d];
                                f[si] === f[ve] && Ud(f[b], f, c, r)
                            }
                            if (null !== u[Ur]) {
                                const d = u[Ur];
                                for (let f = 0; f < d.length; f++) {
                                    const h = d[f];
                                    Ud(h[b], h, c, r)
                                }
                            }
                        }
                    }
                }
                return r
            }

            function Ao(e) {
                const n = _(),
                    t = Y(),
                    r = Dg();
                Zc(r + 1);
                const o = pC(t, r);
                if (e.dirty && function rI(e) {
                        return 4 == (4 & e[z])
                    }(n) === (2 == (2 & o.metadata.flags))) {
                    if (null === o.matches) e.reset([]);
                    else {
                        const i = o.crossesNgTemplate ? Ud(t, n, r, []) : uC(t, n, o, r);
                        e.reset(i, HS), e.notifyOnChanges()
                    }
                    return !0
                }
                return !1
            }

            function Yi(e, n, t) {
                const r = Y();
                r.firstCreatePass && (function hC(e, n, t) {
                        null === e.queries && (e.queries = new Bd), e.queries.track(new Hd(n, t))
                    }(r, new cC(e, n, t), -1), 2 == (2 & n) && (r.staticViewQueries = !0)),
                    function fC(e, n, t) {
                        const r = new Ld(4 == (4 & t));
                        (function DA(e, n, t, r) {
                            const o = Ny(n);
                            o.push(t), e.firstCreatePass && Ry(e).push(r, o.length - 1)
                        })(e, n, r, r.destroy), null === n[nn] && (n[nn] = new $d), n[nn].queries.push(new jd(r))
                    }(r, _(), n)
            }

            function To() {
                return function wP(e, n) {
                    return e[nn].queries[n].queryList
                }(_(), Dg())
            }

            function pC(e, n) {
                return e.queries.getByIndex(n)
            }
            const Yd = new E("Application Initializer");
            let Qd = (() => {
                    class e {
                        constructor() {
                            this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, r) => {
                                this.resolve = t, this.reject = r
                            }), this.appInits = M(Yd, {
                                optional: !0
                            }) ? ? []
                        }
                        runInitializers() {
                            if (this.initialized) return;
                            const t = [];
                            for (const o of this.appInits) {
                                const i = o();
                                if (ji(i)) t.push(i);
                                else if (pv(i)) {
                                    const s = new Promise((a, l) => {
                                        i.subscribe({
                                            complete: a,
                                            error: l
                                        })
                                    });
                                    t.push(s)
                                }
                            }
                            const r = () => {
                                this.done = !0, this.resolve()
                            };
                            Promise.all(t).then(() => {
                                r()
                            }).catch(o => {
                                this.reject(o)
                            }), 0 === t.length && r(), this.initialized = !0
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                OC = (() => {
                    class e {
                        log(t) {
                            console.log(t)
                        }
                        warn(t) {
                            console.warn(t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })();
            const On = new E("LocaleId", {
                providedIn: "root",
                factory: () => M(On, q.Optional | q.SkipSelf) || function GP() {
                    return typeof $localize < "u" && $localize.locale || So
                }()
            });
            let tl = (() => {
                class e {
                    constructor() {
                        this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new Rt(!1)
                    }
                    add() {
                        this.hasPendingTasks.next(!0);
                        const t = this.taskId++;
                        return this.pendingTasks.add(t), t
                    }
                    remove(t) {
                        this.pendingTasks.delete(t), 0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
                    }
                    ngOnDestroy() {
                        this.pendingTasks.clear(), this.hasPendingTasks.next(!1)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class ZP {
                constructor(n, t) {
                    this.ngModuleFactory = n, this.componentFactories = t
                }
            }
            let PC = (() => {
                class e {
                    compileModuleSync(t) {
                        return new Pd(t)
                    }
                    compileModuleAsync(t) {
                        return Promise.resolve(this.compileModuleSync(t))
                    }
                    compileModuleAndAllComponentsSync(t) {
                        const r = this.compileModuleSync(t),
                            i = Sn(Et(t).declarations).reduce((s, a) => {
                                const l = Z(a);
                                return l && s.push(new Ni(l)), s
                            }, []);
                        return new ZP(r, i)
                    }
                    compileModuleAndAllComponentsAsync(t) {
                        return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
                    }
                    clearCache() {}
                    clearCacheFor(t) {}
                    getModuleId(t) {}
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const FC = new E(""),
                rl = new E("");
            let tf, Kd = (() => {
                    class e {
                        constructor(t, r, o) {
                            this._ngZone = t, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, tf || (function mk(e) {
                                tf = e
                            }(o), o.addToWindow(r)), this._watchAngularEvents(), t.run(() => {
                                this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                            })
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    this._didWork = !0, this._isZoneStable = !1
                                }
                            }), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.subscribe({
                                    next: () => {
                                        se.assertNotInAngularZone(), queueMicrotask(() => {
                                            this._isZoneStable = !0, this._runCallbacksIfReady()
                                        })
                                    }
                                })
                            })
                        }
                        increasePendingRequestCount() {
                            return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                        }
                        decreasePendingRequestCount() {
                            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                            return this._runCallbacksIfReady(), this._pendingCount
                        }
                        isStable() {
                            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable()) queueMicrotask(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let t = this._callbacks.pop();
                                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                                }
                                this._didWork = !1
                            });
                            else {
                                let t = this.getPendingTasks();
                                this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(t) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                                source: t.source,
                                creationLocation: t.creationLocation,
                                data: t.data
                            })) : []
                        }
                        addCallback(t, r, o) {
                            let i = -1;
                            r && r > 0 && (i = setTimeout(() => {
                                this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), t(this._didWork, this.getPendingTasks())
                            }, r)), this._callbacks.push({
                                doneCb: t,
                                timeoutId: i,
                                updateCb: o
                            })
                        }
                        whenStable(t, r, o) {
                            if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                            this.addCallback(t, r, o), this._runCallbacksIfReady()
                        }
                        getPendingRequestCount() {
                            return this._pendingCount
                        }
                        registerApplication(t) {
                            this.registry.registerApplication(t, this)
                        }
                        unregisterApplication(t) {
                            this.registry.unregisterApplication(t)
                        }
                        findProviders(t, r, o) {
                            return []
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(se), I(ef), I(rl))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                ef = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map
                        }
                        registerApplication(t, r) {
                            this._applications.set(t, r)
                        }
                        unregisterApplication(t) {
                            this._applications.delete(t)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(t) {
                            return this._applications.get(t) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(t, r = !0) {
                            return tf ? .findTestabilityInTree(this, t, r) ? ? null
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })(),
                Yn = null;
            const LC = new E("AllowMultipleToken"),
                nf = new E("PlatformDestroyListeners"),
                rf = new E("appBootstrapListener");
            class jC {
                constructor(n, t) {
                    this.name = n, this.token = t
                }
            }

            function BC(e, n, t = []) {
                const r = `Platform: ${n}`,
                    o = new E(r);
                return (i = []) => {
                    let s = sf();
                    if (!s || s.injector.get(LC, !1)) {
                        const a = [...t, ...i, {
                            provide: o,
                            useValue: !0
                        }];
                        e ? e(a) : function _k(e) {
                            if (Yn && !Yn.get(LC, !1)) throw new D(400, !1);
                            (function VC() {
                                ! function zM(e) {
                                    eg = e
                                }(() => {
                                    throw new D(600, !1)
                                })
                            })(), Yn = e;
                            const n = e.get(UC);
                            (function $C(e) {
                                e.get(Gm, null) ? .forEach(t => t())
                            })(e)
                        }(function HC(e = [], n) {
                            return yt.create({
                                name: n,
                                providers: [{
                                    provide: Pu,
                                    useValue: "platform"
                                }, {
                                    provide: nf,
                                    useValue: new Set([() => Yn = null])
                                }, ...e]
                            })
                        }(a, r))
                    }
                    return function Dk(e) {
                        const n = sf();
                        if (!n) throw new D(401, !1);
                        return n
                    }()
                }
            }

            function sf() {
                return Yn ? .get(UC) ? ? null
            }
            let UC = (() => {
                class e {
                    constructor(t) {
                        this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(t, r) {
                        const o = function wk(e = "zone.js", n) {
                            return "noop" === e ? new rA : "zone.js" === e ? new se(n) : e
                        }(r ? .ngZone, function zC(e) {
                            return {
                                enableLongStackTrace: !1,
                                shouldCoalesceEventChangeDetection: e ? .eventCoalescing ? ? !1,
                                shouldCoalesceRunChangeDetection: e ? .runCoalescing ? ? !1
                            }
                        }({
                            eventCoalescing: r ? .ngZoneEventCoalescing,
                            runCoalescing: r ? .ngZoneRunCoalescing
                        }));
                        return o.run(() => {
                            const i = function NO(e, n, t) {
                                    return new Od(e, n, t)
                                }(t.moduleType, this.injector, function YC(e) {
                                    return [{
                                        provide: se,
                                        useFactory: e
                                    }, {
                                        provide: Ii,
                                        multi: !0,
                                        useFactory: () => {
                                            const n = M(Ek, {
                                                optional: !0
                                            });
                                            return () => n.initialize()
                                        }
                                    }, {
                                        provide: ZC,
                                        useFactory: bk
                                    }, {
                                        provide: ly,
                                        useFactory: cy
                                    }]
                                }(() => o)),
                                s = i.injector.get(xn, null);
                            return o.runOutsideAngular(() => {
                                    const a = o.onError.subscribe({
                                        next: l => {
                                            s.handleError(l)
                                        }
                                    });
                                    i.onDestroy(() => {
                                        ol(this._modules, i), a.unsubscribe()
                                    })
                                }),
                                function GC(e, n, t) {
                                    try {
                                        const r = t();
                                        return ji(r) ? r.catch(o => {
                                            throw n.runOutsideAngular(() => e.handleError(o)), o
                                        }) : r
                                    } catch (r) {
                                        throw n.runOutsideAngular(() => e.handleError(r)), r
                                    }
                                }(s, o, () => {
                                    const a = i.injector.get(Qd);
                                    return a.runInitializers(), a.donePromise.then(() => (function f_(e) {
                                        Lt(e, "Expected localeId to be defined"), "string" == typeof e && (d_ = e.toLowerCase().replace(/_/g, "-"))
                                    }(i.injector.get(On, So) || So), this._moduleDoBootstrap(i), i))
                                })
                        })
                    }
                    bootstrapModule(t, r = []) {
                        const o = qC({}, r);
                        return function yk(e, n, t) {
                            const r = new Pd(t);
                            return Promise.resolve(r)
                        }(0, 0, t).then(i => this.bootstrapModuleFactory(i, o))
                    }
                    _moduleDoBootstrap(t) {
                        const r = t.injector.get(ko);
                        if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(o => r.bootstrap(o));
                        else {
                            if (!t.instance.ngDoBootstrap) throw new D(-403, !1);
                            t.instance.ngDoBootstrap(r)
                        }
                        this._modules.push(t)
                    }
                    onDestroy(t) {
                        this._destroyListeners.push(t)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new D(404, !1);
                        this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                        const t = this._injector.get(nf, null);
                        t && (t.forEach(r => r()), t.clear()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(yt))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "platform"
                    })
                }
                return e
            })();

            function qC(e, n) {
                return Array.isArray(n) ? n.reduce(qC, e) : { ...e,
                    ...n
                }
            }
            let ko = (() => {
                class e {
                    constructor() {
                        this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = M(ZC), this.zoneIsStable = M(ly), this.componentTypes = [], this.components = [], this.isStable = M(tl).hasPendingTasks.pipe(Ft(t => t ? k(!1) : this.zoneIsStable), vp(), yc()), this._injector = M(Tt)
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                    get injector() {
                        return this._injector
                    }
                    bootstrap(t, r) {
                        const o = t instanceof Qm;
                        if (!this._injector.get(Qd).done) throw !o && function Vr(e) {
                            const n = Z(e) || Ve(e) || et(e);
                            return null !== n && n.standalone
                        }(t), new D(405, !1);
                        let s;
                        s = o ? t : this._injector.get(ka).resolveComponentFactory(t), this.componentTypes.push(s.componentType);
                        const a = function vk(e) {
                                return e.isBoundToModule
                            }(s) ? void 0 : this._injector.get(br),
                            c = s.create(yt.NULL, [], r || s.selector, a),
                            u = c.location.nativeElement,
                            d = c.injector.get(FC, null);
                        return d ? .registerApplication(u), c.onDestroy(() => {
                            this.detachView(c.hostView), ol(this.components, c), d ? .unregisterApplication(u)
                        }), this._loadComponent(c), c
                    }
                    tick() {
                        if (this._runningTick) throw new D(101, !1);
                        try {
                            this._runningTick = !0;
                            for (let t of this._views) t.detectChanges()
                        } catch (t) {
                            this.internalErrorHandler(t)
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(t) {
                        const r = t;
                        this._views.push(r), r.attachToAppRef(this)
                    }
                    detachView(t) {
                        const r = t;
                        ol(this._views, r), r.detachFromAppRef()
                    }
                    _loadComponent(t) {
                        this.attachView(t.hostView), this.tick(), this.components.push(t);
                        const r = this._injector.get(rf, []);
                        r.push(...this._bootstrapListeners), r.forEach(o => o(t))
                    }
                    ngOnDestroy() {
                        if (!this._destroyed) try {
                            this._destroyListeners.forEach(t => t()), this._views.slice().forEach(t => t.destroy())
                        } finally {
                            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                        }
                    }
                    onDestroy(t) {
                        return this._destroyListeners.push(t), () => ol(this._destroyListeners, t)
                    }
                    destroy() {
                        if (this._destroyed) throw new D(406, !1);
                        const t = this._injector;
                        t.destroy && !t.destroyed && t.destroy()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                    warnIfDestroyed() {}
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function ol(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }
            const ZC = new E("", {
                providedIn: "root",
                factory: () => M(xn).handleError.bind(void 0)
            });

            function bk() {
                const e = M(se),
                    n = M(xn);
                return t => e.runOutsideAngular(() => n.handleError(t))
            }
            let Ek = (() => {
                class e {
                    constructor() {
                        this.zone = M(se), this.applicationRef = M(ko)
                    }
                    initialize() {
                        this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this.zone.run(() => {
                                    this.applicationRef.tick()
                                })
                            }
                        }))
                    }
                    ngOnDestroy() {
                        this._onMicrotaskEmptySubscription ? .unsubscribe()
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            let il = (() => {
                class e {
                    static# e = this.__NG_ELEMENT_ID__ = Ik
                }
                return e
            })();

            function Ik(e) {
                return function xk(e, n, t) {
                    if (dr(e) && !t) {
                        const r = It(e.index, n);
                        return new ki(r, r)
                    }
                    return 47 & e.type ? new ki(n[Me], n) : null
                }(Be(), _(), 16 == (16 & e))
            }
            class KC {
                constructor() {}
                supports(n) {
                    return Ba(n)
                }
                create(n) {
                    return new kk(n)
                }
            }
            const Pk = (e, n) => n;
            class kk {
                constructor(n) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = n || Pk
                }
                forEachItem(n) {
                    let t;
                    for (t = this._itHead; null !== t; t = t._next) n(t)
                }
                forEachOperation(n) {
                    let t = this._itHead,
                        r = this._removalsHead,
                        o = 0,
                        i = null;
                    for (; t || r;) {
                        const s = !r || t && t.currentIndex < tD(r, o, i) ? t : r,
                            a = tD(s, o, i),
                            l = s.currentIndex;
                        if (s === r) o--, r = r._nextRemoved;
                        else if (t = t._next, null == s.previousIndex) o++;
                        else {
                            i || (i = []);
                            const c = a - o,
                                u = l - o;
                            if (c != u) {
                                for (let f = 0; f < c; f++) {
                                    const h = f < i.length ? i[f] : i[f] = 0,
                                        p = h + f;
                                    u <= p && p < c && (i[f] = h + 1)
                                }
                                i[s.previousIndex] = u - c
                            }
                        }
                        a !== l && n(s, a, l)
                    }
                }
                forEachPreviousItem(n) {
                    let t;
                    for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t)
                }
                forEachAddedItem(n) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
                }
                forEachMovedItem(n) {
                    let t;
                    for (t = this._movesHead; null !== t; t = t._nextMoved) n(t)
                }
                forEachRemovedItem(n) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
                }
                forEachIdentityChange(n) {
                    let t;
                    for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) n(t)
                }
                diff(n) {
                    if (null == n && (n = []), !Ba(n)) throw new D(900, !1);
                    return this.check(n) ? this : null
                }
                onDestroy() {}
                check(n) {
                    this._reset();
                    let o, i, s, t = this._itHead,
                        r = !1;
                    if (Array.isArray(n)) {
                        this.length = n.length;
                        for (let a = 0; a < this.length; a++) i = n[a], s = this._trackByFn(a, i), null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, i, s, a)), Object.is(t.item, i) || this._addIdentityChange(t, i)) : (t = this._mismatch(t, i, s, a), r = !0), t = t._next
                    } else o = 0,
                        function hT(e, n) {
                            if (Array.isArray(e))
                                for (let t = 0; t < e.length; t++) n(e[t]);
                            else {
                                const t = e[Symbol.iterator]();
                                let r;
                                for (; !(r = t.next()).done;) n(r.value)
                            }
                        }(n, a => {
                            s = this._trackByFn(o, a), null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, a, s, o)), Object.is(t.item, a) || this._addIdentityChange(t, a)) : (t = this._mismatch(t, a, s, o), r = !0), t = t._next, o++
                        }), this.length = o;
                    return this._truncate(t), this.collection = n, this.isDirty
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                }
                _reset() {
                    if (this.isDirty) {
                        let n;
                        for (n = this._previousItHead = this._itHead; null !== n; n = n._next) n._nextPrevious = n._next;
                        for (n = this._additionsHead; null !== n; n = n._nextAdded) n.previousIndex = n.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, n = this._movesHead; null !== n; n = n._nextMoved) n.previousIndex = n.currentIndex;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                    }
                }
                _mismatch(n, t, r, o) {
                    let i;
                    return null === n ? i = this._itTail : (i = n._prev, this._remove(n)), null !== (n = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._reinsertAfter(n, i, o)) : null !== (n = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._moveAfter(n, i, o)) : n = this._addAfter(new Nk(t, r), i, o), n
                }
                _verifyReinsertion(n, t, r, o) {
                    let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                    return null !== i ? n = this._reinsertAfter(i, n._prev, o) : n.currentIndex != o && (n.currentIndex = o, this._addToMoves(n, o)), n
                }
                _truncate(n) {
                    for (; null !== n;) {
                        const t = n._next;
                        this._addToRemovals(this._unlink(n)), n = t
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                }
                _reinsertAfter(n, t, r) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
                    const o = n._prevRemoved,
                        i = n._nextRemoved;
                    return null === o ? this._removalsHead = i : o._nextRemoved = i, null === i ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(n, t, r), this._addToMoves(n, r), n
                }
                _moveAfter(n, t, r) {
                    return this._unlink(n), this._insertAfter(n, t, r), this._addToMoves(n, r), n
                }
                _addAfter(n, t, r) {
                    return this._insertAfter(n, t, r), this._additionsTail = null === this._additionsTail ? this._additionsHead = n : this._additionsTail._nextAdded = n, n
                }
                _insertAfter(n, t, r) {
                    const o = null === t ? this._itHead : t._next;
                    return n._next = o, n._prev = t, null === o ? this._itTail = n : o._prev = n, null === t ? this._itHead = n : t._next = n, null === this._linkedRecords && (this._linkedRecords = new eD), this._linkedRecords.put(n), n.currentIndex = r, n
                }
                _remove(n) {
                    return this._addToRemovals(this._unlink(n))
                }
                _unlink(n) {
                    null !== this._linkedRecords && this._linkedRecords.remove(n);
                    const t = n._prev,
                        r = n._next;
                    return null === t ? this._itHead = r : t._next = r, null === r ? this._itTail = t : r._prev = t, n
                }
                _addToMoves(n, t) {
                    return n.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = n : this._movesTail._nextMoved = n), n
                }
                _addToRemovals(n) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new eD), this._unlinkedRecords.put(n), n.currentIndex = null, n._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = n, n._prevRemoved = null) : (n._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = n), n
                }
                _addIdentityChange(n, t) {
                    return n.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = n : this._identityChangesTail._nextIdentityChange = n, n
                }
            }
            class Nk {
                constructor(n, t) {
                    this.item = n, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                }
            }
            class Rk {
                constructor() {
                    this._head = null, this._tail = null
                }
                add(n) {
                    null === this._head ? (this._head = this._tail = n, n._nextDup = null, n._prevDup = null) : (this._tail._nextDup = n, n._prevDup = this._tail, n._nextDup = null, this._tail = n)
                }
                get(n, t) {
                    let r;
                    for (r = this._head; null !== r; r = r._nextDup)
                        if ((null === t || t <= r.currentIndex) && Object.is(r.trackById, n)) return r;
                    return null
                }
                remove(n) {
                    const t = n._prevDup,
                        r = n._nextDup;
                    return null === t ? this._head = r : t._nextDup = r, null === r ? this._tail = t : r._prevDup = t, null === this._head
                }
            }
            class eD {
                constructor() {
                    this.map = new Map
                }
                put(n) {
                    const t = n.trackById;
                    let r = this.map.get(t);
                    r || (r = new Rk, this.map.set(t, r)), r.add(n)
                }
                get(n, t) {
                    const o = this.map.get(n);
                    return o ? o.get(n, t) : null
                }
                remove(n) {
                    const t = n.trackById;
                    return this.map.get(t).remove(n) && this.map.delete(t), n
                }
                get isEmpty() {
                    return 0 === this.map.size
                }
                clear() {
                    this.map.clear()
                }
            }

            function tD(e, n, t) {
                const r = e.previousIndex;
                if (null === r) return r;
                let o = 0;
                return t && r < t.length && (o = t[r]), r + n + o
            }
            class nD {
                constructor() {}
                supports(n) {
                    return n instanceof Map || dd(n)
                }
                create() {
                    return new Fk
                }
            }
            class Fk {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(n) {
                    let t;
                    for (t = this._mapHead; null !== t; t = t._next) n(t)
                }
                forEachPreviousItem(n) {
                    let t;
                    for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t)
                }
                forEachChangedItem(n) {
                    let t;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) n(t)
                }
                forEachAddedItem(n) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
                }
                forEachRemovedItem(n) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
                }
                diff(n) {
                    if (n) {
                        if (!(n instanceof Map || dd(n))) throw new D(900, !1)
                    } else n = new Map;
                    return this.check(n) ? this : null
                }
                onDestroy() {}
                check(n) {
                    this._reset();
                    let t = this._mapHead;
                    if (this._appendAfter = null, this._forEach(n, (r, o) => {
                            if (t && t.key === o) this._maybeAddToChanges(t, r), this._appendAfter = t, t = t._next;
                            else {
                                const i = this._getOrCreateRecordForKey(o, r);
                                t = this._insertBeforeOrAppend(t, i)
                            }
                        }), t) {
                        t._prev && (t._prev._next = null), this._removalsHead = t;
                        for (let r = t; null !== r; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(n, t) {
                    if (n) {
                        const r = n._prev;
                        return t._next = n, t._prev = r, n._prev = t, r && (r._next = t), n === this._mapHead && (this._mapHead = t), this._appendAfter = n, n
                    }
                    return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
                }
                _getOrCreateRecordForKey(n, t) {
                    if (this._records.has(n)) {
                        const o = this._records.get(n);
                        this._maybeAddToChanges(o, t);
                        const i = o._prev,
                            s = o._next;
                        return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
                    }
                    const r = new Lk(n);
                    return this._records.set(n, r), r.currentValue = t, this._addToAdditions(r), r
                }
                _reset() {
                    if (this.isDirty) {
                        let n;
                        for (this._previousMapHead = this._mapHead, n = this._previousMapHead; null !== n; n = n._next) n._nextPrevious = n._next;
                        for (n = this._changesHead; null !== n; n = n._nextChanged) n.previousValue = n.currentValue;
                        for (n = this._additionsHead; null != n; n = n._nextAdded) n.previousValue = n.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(n, t) {
                    Object.is(t, n.currentValue) || (n.previousValue = n.currentValue, n.currentValue = t, this._addToChanges(n))
                }
                _addToAdditions(n) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = n : (this._additionsTail._nextAdded = n, this._additionsTail = n)
                }
                _addToChanges(n) {
                    null === this._changesHead ? this._changesHead = this._changesTail = n : (this._changesTail._nextChanged = n, this._changesTail = n)
                }
                _forEach(n, t) {
                    n instanceof Map ? n.forEach(t) : Object.keys(n).forEach(r => t(n[r], r))
                }
            }
            class Lk {
                constructor(n) {
                    this.key = n, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }

            function rD() {
                return new ll([new KC])
            }
            let ll = (() => {
                class e {
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: rD
                    });
                    constructor(t) {
                        this.factories = t
                    }
                    static create(t, r) {
                        if (null != r) {
                            const o = r.factories.slice();
                            t = t.concat(o)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: r => e.create(t, r || rD()),
                            deps: [
                                [e, new aa, new sa]
                            ]
                        }
                    }
                    find(t) {
                        const r = this.factories.find(o => o.supports(t));
                        if (null != r) return r;
                        throw new D(901, !1)
                    }
                }
                return e
            })();

            function oD() {
                return new Ji([new nD])
            }
            let Ji = (() => {
                class e {
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: oD
                    });
                    constructor(t) {
                        this.factories = t
                    }
                    static create(t, r) {
                        if (r) {
                            const o = r.factories.slice();
                            t = t.concat(o)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: r => e.create(t, r || oD()),
                            deps: [
                                [e, new aa, new sa]
                            ]
                        }
                    }
                    find(t) {
                        const r = this.factories.find(o => o.supports(t));
                        if (r) return r;
                        throw new D(901, !1)
                    }
                }
                return e
            })();
            const $k = BC(null, "core", []);
            let Bk = (() => {
                class e {
                    constructor(t) {}
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(ko))
                    };
                    static# t = this.\u0275mod = bt({
                        type: e
                    });
                    static# n = this.\u0275inj = ft({})
                }
                return e
            })();
            let ff = null;

            function Qn() {
                return ff
            }
            class tN {}
            const lt = new E("DocumentToken");
            let hf = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("Not implemented")
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return M(rN)
                        },
                        providedIn: "platform"
                    })
                }
                return e
            })();
            const nN = new E("Location Initialized");
            let rN = (() => {
                class e extends hf {
                    constructor() {
                        super(), this._doc = M(lt), this._location = window.location, this._history = window.history
                    }
                    getBaseHrefFromDOM() {
                        return Qn().getBaseHref(this._doc)
                    }
                    onPopState(t) {
                        const r = Qn().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("popstate", t, !1), () => r.removeEventListener("popstate", t)
                    }
                    onHashChange(t) {
                        const r = Qn().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("hashchange", t, !1), () => r.removeEventListener("hashchange", t)
                    }
                    get href() {
                        return this._location.href
                    }
                    get protocol() {
                        return this._location.protocol
                    }
                    get hostname() {
                        return this._location.hostname
                    }
                    get port() {
                        return this._location.port
                    }
                    get pathname() {
                        return this._location.pathname
                    }
                    get search() {
                        return this._location.search
                    }
                    get hash() {
                        return this._location.hash
                    }
                    set pathname(t) {
                        this._location.pathname = t
                    }
                    pushState(t, r, o) {
                        this._history.pushState(t, r, o)
                    }
                    replaceState(t, r, o) {
                        this._history.replaceState(t, r, o)
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    historyGo(t = 0) {
                        this._history.go(t)
                    }
                    getState() {
                        return this._history.state
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return new e
                        },
                        providedIn: "platform"
                    })
                }
                return e
            })();

            function pf(e, n) {
                if (0 == e.length) return n;
                if (0 == n.length) return e;
                let t = 0;
                return e.endsWith("/") && t++, n.startsWith("/") && t++, 2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
            }

            function hD(e) {
                const n = e.match(/#|\?|$/),
                    t = n && n.index || e.length;
                return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t)
            }

            function Pn(e) {
                return e && "?" !== e[0] ? "?" + e : e
            }
            let Mr = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("Not implemented")
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return M(gD)
                        },
                        providedIn: "root"
                    })
                }
                return e
            })();
            const pD = new E("appBaseHref");
            let gD = (() => {
                    class e extends Mr {
                        constructor(t, r) {
                            super(), this._platformLocation = t, this._removeListenerFns = [], this._baseHref = r ? ? this._platformLocation.getBaseHrefFromDOM() ? ? M(lt).location ? .origin ? ? ""
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(t) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        prepareExternalUrl(t) {
                            return pf(this._baseHref, t)
                        }
                        path(t = !1) {
                            const r = this._platformLocation.pathname + Pn(this._platformLocation.search),
                                o = this._platformLocation.hash;
                            return o && t ? `${r}${o}` : r
                        }
                        pushState(t, r, o, i) {
                            const s = this.prepareExternalUrl(o + Pn(i));
                            this._platformLocation.pushState(t, r, s)
                        }
                        replaceState(t, r, o, i) {
                            const s = this.prepareExternalUrl(o + Pn(i));
                            this._platformLocation.replaceState(t, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(t = 0) {
                            this._platformLocation.historyGo ? .(t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(hf), I(pD, 8))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                oN = (() => {
                    class e extends Mr {
                        constructor(t, r) {
                            super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(t) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        path(t = !1) {
                            let r = this._platformLocation.hash;
                            return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r
                        }
                        prepareExternalUrl(t) {
                            const r = pf(this._baseHref, t);
                            return r.length > 0 ? "#" + r : r
                        }
                        pushState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Pn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, r, s)
                        }
                        replaceState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Pn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(t = 0) {
                            this._platformLocation.historyGo ? .(t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(hf), I(pD, 8))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                gf = (() => {
                    class e {
                        constructor(t) {
                            this._subject = new ye, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = t;
                            const r = this._locationStrategy.getBaseHref();
                            this._basePath = function aN(e) {
                                if (new RegExp("^(https?:)?//").test(e)) {
                                    const [, t] = e.split(/\/\/[^\/]+/);
                                    return t
                                }
                                return e
                            }(hD(mD(r))), this._locationStrategy.onPopState(o => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: o.state,
                                    type: o.type
                                })
                            })
                        }
                        ngOnDestroy() {
                            this._urlChangeSubscription ? .unsubscribe(), this._urlChangeListeners = []
                        }
                        path(t = !1) {
                            return this.normalize(this._locationStrategy.path(t))
                        }
                        getState() {
                            return this._locationStrategy.getState()
                        }
                        isCurrentPathEqualTo(t, r = "") {
                            return this.path() == this.normalize(t + Pn(r))
                        }
                        normalize(t) {
                            return e.stripTrailingSlash(function sN(e, n) {
                                if (!e || !n.startsWith(e)) return n;
                                const t = n.substring(e.length);
                                return "" === t || ["/", ";", "?", "#"].includes(t[0]) ? t : n
                            }(this._basePath, mD(t)))
                        }
                        prepareExternalUrl(t) {
                            return t && "/" !== t[0] && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t)
                        }
                        go(t, r = "", o = null) {
                            this._locationStrategy.pushState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Pn(r)), o)
                        }
                        replaceState(t, r = "", o = null) {
                            this._locationStrategy.replaceState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Pn(r)), o)
                        }
                        forward() {
                            this._locationStrategy.forward()
                        }
                        back() {
                            this._locationStrategy.back()
                        }
                        historyGo(t = 0) {
                            this._locationStrategy.historyGo ? .(t)
                        }
                        onUrlChange(t) {
                            return this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
                                this._notifyUrlChangeListeners(r.url, r.state)
                            })), () => {
                                const r = this._urlChangeListeners.indexOf(t);
                                this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription ? .unsubscribe(), this._urlChangeSubscription = null)
                            }
                        }
                        _notifyUrlChangeListeners(t = "", r) {
                            this._urlChangeListeners.forEach(o => o(t, r))
                        }
                        subscribe(t, r, o) {
                            return this._subject.subscribe({
                                next: t,
                                error: r,
                                complete: o
                            })
                        }
                        static# e = this.normalizeQueryParams = Pn;
                        static# t = this.joinWithSlash = pf;
                        static# n = this.stripTrailingSlash = hD;
                        static# r = this.\u0275fac = function(r) {
                            return new(r || e)(I(Mr))
                        };
                        static# o = this.\u0275prov = A({
                            token: e,
                            factory: function() {
                                return function iN() {
                                    return new gf(I(Mr))
                                }()
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();

            function mD(e) {
                return e.replace(/\/index.html$/, "")
            }

            function MD(e, n) {
                n = encodeURIComponent(n);
                for (const t of e.split(";")) {
                    const r = t.indexOf("="),
                        [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
                    if (o.trim() === n) return decodeURIComponent(i)
                }
                return null
            }
            const Mf = /\s+/,
                ID = [];
            let xD = (() => {
                class e {
                    constructor(t, r, o, i) {
                        this._iterableDiffers = t, this._keyValueDiffers = r, this._ngEl = o, this._renderer = i, this.initialClasses = ID, this.stateMap = new Map
                    }
                    set klass(t) {
                        this.initialClasses = null != t ? t.trim().split(Mf) : ID
                    }
                    set ngClass(t) {
                        this.rawClass = "string" == typeof t ? t.trim().split(Mf) : t
                    }
                    ngDoCheck() {
                        for (const r of this.initialClasses) this._updateState(r, !0);
                        const t = this.rawClass;
                        if (Array.isArray(t) || t instanceof Set)
                            for (const r of t) this._updateState(r, !0);
                        else if (null != t)
                            for (const r of Object.keys(t)) this._updateState(r, !!t[r]);
                        this._applyStateDiff()
                    }
                    _updateState(t, r) {
                        const o = this.stateMap.get(t);
                        void 0 !== o ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(t, {
                            enabled: r,
                            changed: !0,
                            touched: !0
                        })
                    }
                    _applyStateDiff() {
                        for (const t of this.stateMap) {
                            const r = t[0],
                                o = t[1];
                            o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                        }
                    }
                    _toggleClass(t, r) {
                        (t = t.trim()).length > 0 && t.split(Mf).forEach(o => {
                            r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                        })
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(ll), C(Ji), C(it), C(cn))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["", "ngClass", ""]
                        ],
                        inputs: {
                            klass: ["class", "klass"],
                            ngClass: "ngClass"
                        },
                        standalone: !0
                    })
                }
                return e
            })();
            class qN {
                constructor(n, t, r, o) {
                    this.$implicit = n, this.ngForOf = t, this.index = r, this.count = o
                }
                get first() {
                    return 0 === this.index
                }
                get last() {
                    return this.index === this.count - 1
                }
                get even() {
                    return this.index % 2 == 0
                }
                get odd() {
                    return !this.even
                }
            }
            let AD = (() => {
                class e {
                    set ngForOf(t) {
                        this._ngForOf = t, this._ngForOfDirty = !0
                    }
                    set ngForTrackBy(t) {
                        this._trackByFn = t
                    }
                    get ngForTrackBy() {
                        return this._trackByFn
                    }
                    constructor(t, r, o) {
                        this._viewContainer = t, this._template = r, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                    }
                    set ngForTemplate(t) {
                        t && (this._template = t)
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const t = this._ngForOf;
                            !this._differ && t && (this._differ = this._differs.find(t).create(this.ngForTrackBy))
                        }
                        if (this._differ) {
                            const t = this._differ.diff(this._ngForOf);
                            t && this._applyChanges(t)
                        }
                    }
                    _applyChanges(t) {
                        const r = this._viewContainer;
                        t.forEachOperation((o, i, s) => {
                            if (null == o.previousIndex) r.createEmbeddedView(this._template, new qN(o.item, this._ngForOf, -1, -1), null === s ? void 0 : s);
                            else if (null == s) r.remove(null === i ? void 0 : i);
                            else if (null !== i) {
                                const a = r.get(i);
                                r.move(a, s), TD(a, o)
                            }
                        });
                        for (let o = 0, i = r.length; o < i; o++) {
                            const a = r.get(o).context;
                            a.index = o, a.count = i, a.ngForOf = this._ngForOf
                        }
                        t.forEachIdentityChange(o => {
                            TD(r.get(o.currentIndex), o)
                        })
                    }
                    static ngTemplateContextGuard(t, r) {
                        return !0
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(kt), C(Tn), C(ll))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["", "ngFor", "", "ngForOf", ""]
                        ],
                        inputs: {
                            ngForOf: "ngForOf",
                            ngForTrackBy: "ngForTrackBy",
                            ngForTemplate: "ngForTemplate"
                        },
                        standalone: !0
                    })
                }
                return e
            })();

            function TD(e, n) {
                e.context.$implicit = n.item
            }
            let OD = (() => {
                class e {
                    constructor(t, r) {
                        this._viewContainer = t, this._context = new WN, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
                    }
                    set ngIf(t) {
                        this._context.$implicit = this._context.ngIf = t, this._updateView()
                    }
                    set ngIfThen(t) {
                        PD("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(t) {
                        PD("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                    static ngTemplateContextGuard(t, r) {
                        return !0
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(kt), C(Tn))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["", "ngIf", ""]
                        ],
                        inputs: {
                            ngIf: "ngIf",
                            ngIfThen: "ngIfThen",
                            ngIfElse: "ngIfElse"
                        },
                        standalone: !0
                    })
                }
                return e
            })();
            class WN {
                constructor() {
                    this.$implicit = null, this.ngIf = null
                }
            }

            function PD(e, n) {
                if (n && !n.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${Pe(n)}'.`)
            }
            let ND = (() => {
                class e {
                    constructor(t, r, o) {
                        this._ngEl = t, this._differs = r, this._renderer = o, this._ngStyle = null, this._differ = null
                    }
                    set ngStyle(t) {
                        this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create())
                    }
                    ngDoCheck() {
                        if (this._differ) {
                            const t = this._differ.diff(this._ngStyle);
                            t && this._applyChanges(t)
                        }
                    }
                    _setStyle(t, r) {
                        const [o, i] = t.split("."), s = -1 === o.indexOf("-") ? void 0 : qn.DashCase;
                        null != r ? this._renderer.setStyle(this._ngEl.nativeElement, o, i ? `${r}${i}` : r, s) : this._renderer.removeStyle(this._ngEl.nativeElement, o, s)
                    }
                    _applyChanges(t) {
                        t.forEachRemovedItem(r => this._setStyle(r.key, null)), t.forEachAddedItem(r => this._setStyle(r.key, r.currentValue)), t.forEachChangedItem(r => this._setStyle(r.key, r.currentValue))
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(it), C(Ji), C(cn))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["", "ngStyle", ""]
                        ],
                        inputs: {
                            ngStyle: "ngStyle"
                        },
                        standalone: !0
                    })
                }
                return e
            })();
            class XN {
                createSubscription(n, t) {
                    return rg(() => n.subscribe({
                        next: t,
                        error: r => {
                            throw r
                        }
                    }))
                }
                dispose(n) {
                    rg(() => n.unsubscribe())
                }
            }
            class JN {
                createSubscription(n, t) {
                    return n.then(t, r => {
                        throw r
                    })
                }
                dispose(n) {}
            }
            const KN = new JN,
                eR = new XN;
            let RD = (() => {
                    class e {
                        constructor(t) {
                            this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null, this._ref = t
                        }
                        ngOnDestroy() {
                            this._subscription && this._dispose(), this._ref = null
                        }
                        transform(t) {
                            return this._obj ? t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue : (t && this._subscribe(t), this._latestValue)
                        }
                        _subscribe(t) {
                            this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, r => this._updateLatestValue(t, r))
                        }
                        _selectStrategy(t) {
                            if (ji(t)) return KN;
                            if (pv(t)) return eR;
                            throw function Jt(e, n) {
                                return new D(2100, !1)
                            }()
                        }
                        _dispose() {
                            this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
                        }
                        _updateLatestValue(t, r) {
                            t === this._obj && (this._latestValue = r, this._ref.markForCheck())
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(C(il, 16))
                        };
                        static# t = this.\u0275pipe = ze({
                            name: "async",
                            type: e,
                            pure: !1,
                            standalone: !0
                        })
                    }
                    return e
                })(),
                LD = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({})
                    }
                    return e
                })();
            const VD = "browser";

            function Fo(e) {
                return e === VD
            }

            function jD(e) {
                return "server" === e
            }
            let DR = (() => {
                class e {
                    static# e = this.\u0275prov = A({
                        token: e,
                        providedIn: "root",
                        factory: () => new wR(I(lt), window)
                    })
                }
                return e
            })();
            class wR {
                constructor(n, t) {
                    this.document = n, this.window = t, this.offset = () => [0, 0]
                }
                setOffset(n) {
                    this.offset = Array.isArray(n) ? () => n : n
                }
                getScrollPosition() {
                    return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
                }
                scrollToPosition(n) {
                    this.supportsScrolling() && this.window.scrollTo(n[0], n[1])
                }
                scrollToAnchor(n) {
                    if (!this.supportsScrolling()) return;
                    const t = function bR(e, n) {
                        const t = e.getElementById(n) || e.getElementsByName(n)[0];
                        if (t) return t;
                        if ("function" == typeof e.createTreeWalker && e.body && "function" == typeof e.body.attachShadow) {
                            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                            let o = r.currentNode;
                            for (; o;) {
                                const i = o.shadowRoot;
                                if (i) {
                                    const s = i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                                    if (s) return s
                                }
                                o = r.nextNode()
                            }
                        }
                        return null
                    }(this.document, n);
                    t && (this.scrollToElement(t), t.focus())
                }
                setHistoryScrollRestoration(n) {
                    this.supportsScrolling() && (this.window.history.scrollRestoration = n)
                }
                scrollToElement(n) {
                    const t = n.getBoundingClientRect(),
                        r = t.left + this.window.pageXOffset,
                        o = t.top + this.window.pageYOffset,
                        i = this.offset();
                    this.window.scrollTo(r - i[0], o - i[1])
                }
                supportsScrolling() {
                    try {
                        return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                    } catch {
                        return !1
                    }
                }
            }
            class $D {}
            class qR extends tN {
                constructor() {
                    super(...arguments), this.supportsDOMEvents = !0
                }
            }
            class Pf extends qR {
                static makeCurrent() {
                    ! function eN(e) {
                        ff || (ff = e)
                    }(new Pf)
                }
                onAndCancel(n, t, r) {
                    return n.addEventListener(t, r), () => {
                        n.removeEventListener(t, r)
                    }
                }
                dispatchEvent(n, t) {
                    n.dispatchEvent(t)
                }
                remove(n) {
                    n.parentNode && n.parentNode.removeChild(n)
                }
                createElement(n, t) {
                    return (t = t || this.getDefaultDocument()).createElement(n)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(n) {
                    return n.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(n) {
                    return n instanceof DocumentFragment
                }
                getGlobalEventTarget(n, t) {
                    return "window" === t ? window : "document" === t ? n : "body" === t ? n.body : null
                }
                getBaseHref(n) {
                    const t = function WR() {
                        return ns = ns || document.querySelector("base"), ns ? ns.getAttribute("href") : null
                    }();
                    return null == t ? null : function ZR(e) {
                        wl = wl || document.createElement("a"), wl.setAttribute("href", e);
                        const n = wl.pathname;
                        return "/" === n.charAt(0) ? n : `/${n}`
                    }(t)
                }
                resetBaseElement() {
                    ns = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                getCookie(n) {
                    return MD(document.cookie, n)
                }
            }
            let wl, ns = null,
                QR = (() => {
                    class e {
                        build() {
                            return new XMLHttpRequest
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })();
            const kf = new E("EventManagerPlugins");
            let GD = (() => {
                class e {
                    constructor(t, r) {
                        this._zone = r, this._eventNameToPlugin = new Map, t.forEach(o => {
                            o.manager = this
                        }), this._plugins = t.slice().reverse()
                    }
                    addEventListener(t, r, o) {
                        return this._findPluginFor(r).addEventListener(t, r, o)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(t) {
                        let r = this._eventNameToPlugin.get(t);
                        if (r) return r;
                        if (r = this._plugins.find(i => i.supports(t)), !r) throw new D(5101, !1);
                        return this._eventNameToPlugin.set(t, r), r
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(kf), I(se))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class qD {
                constructor(n) {
                    this._doc = n
                }
            }
            const Nf = "ng-app-id";
            let WD = (() => {
                class e {
                    constructor(t, r, o, i = {}) {
                        this.doc = t, this.appId = r, this.nonce = o, this.platformId = i, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = jD(i), this.resetHostNodes()
                    }
                    addStyles(t) {
                        for (const r of t) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                    }
                    removeStyles(t) {
                        for (const r of t) this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
                    }
                    ngOnDestroy() {
                        const t = this.styleNodesInDOM;
                        t && (t.forEach(r => r.remove()), t.clear());
                        for (const r of this.getAllStyles()) this.onStyleRemoved(r);
                        this.resetHostNodes()
                    }
                    addHost(t) {
                        this.hostNodes.add(t);
                        for (const r of this.getAllStyles()) this.addStyleToHost(t, r)
                    }
                    removeHost(t) {
                        this.hostNodes.delete(t)
                    }
                    getAllStyles() {
                        return this.styleRef.keys()
                    }
                    onStyleAdded(t) {
                        for (const r of this.hostNodes) this.addStyleToHost(r, t)
                    }
                    onStyleRemoved(t) {
                        const r = this.styleRef;
                        r.get(t) ? .elements ? .forEach(o => o.remove()), r.delete(t)
                    }
                    collectServerRenderedStyles() {
                        const t = this.doc.head ? .querySelectorAll(`style[${Nf}="${this.appId}"]`);
                        if (t ? .length) {
                            const r = new Map;
                            return t.forEach(o => {
                                null != o.textContent && r.set(o.textContent, o)
                            }), r
                        }
                        return null
                    }
                    changeUsageCount(t, r) {
                        const o = this.styleRef;
                        if (o.has(t)) {
                            const i = o.get(t);
                            return i.usage += r, i.usage
                        }
                        return o.set(t, {
                            usage: r,
                            elements: []
                        }), r
                    }
                    getStyleElement(t, r) {
                        const o = this.styleNodesInDOM,
                            i = o ? .get(r);
                        if (i ? .parentNode === t) return o.delete(r), i.removeAttribute(Nf), i; {
                            const s = this.doc.createElement("style");
                            return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = r, this.platformIsServer && s.setAttribute(Nf, this.appId), s
                        }
                    }
                    addStyleToHost(t, r) {
                        const o = this.getStyleElement(t, r);
                        t.appendChild(o);
                        const i = this.styleRef,
                            s = i.get(r) ? .elements;
                        s ? s.push(o) : i.set(r, {
                            elements: [o],
                            usage: 1
                        })
                    }
                    resetHostNodes() {
                        const t = this.hostNodes;
                        t.clear(), t.add(this.doc.head)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(lt), I(xa), I(qm, 8), I(Wn))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const Rf = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/",
                    math: "http://www.w3.org/1998/MathML/"
                },
                Ff = /%COMP%/g,
                eF = new E("RemoveStylesOnCompDestroy", {
                    providedIn: "root",
                    factory: () => !1
                });

            function YD(e, n) {
                return n.map(t => t.replace(Ff, e))
            }
            let QD = (() => {
                class e {
                    constructor(t, r, o, i, s, a, l, c = null) {
                        this.eventManager = t, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = l, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = jD(a), this.defaultRenderer = new Lf(t, s, l, this.platformIsServer)
                    }
                    createRenderer(t, r) {
                        if (!t || !r) return this.defaultRenderer;
                        this.platformIsServer && r.encapsulation === zt.ShadowDom && (r = { ...r,
                            encapsulation: zt.Emulated
                        });
                        const o = this.getOrCreateRenderer(t, r);
                        return o instanceof JD ? o.applyToHost(t) : o instanceof Vf && o.applyStyles(), o
                    }
                    getOrCreateRenderer(t, r) {
                        const o = this.rendererByCompId;
                        let i = o.get(r.id);
                        if (!i) {
                            const s = this.doc,
                                a = this.ngZone,
                                l = this.eventManager,
                                c = this.sharedStylesHost,
                                u = this.removeStylesOnCompDestroy,
                                d = this.platformIsServer;
                            switch (r.encapsulation) {
                                case zt.Emulated:
                                    i = new JD(l, c, r, this.appId, u, s, a, d);
                                    break;
                                case zt.ShadowDom:
                                    return new oF(l, c, t, r, s, a, this.nonce, d);
                                default:
                                    i = new Vf(l, c, r, u, s, a, d)
                            }
                            o.set(r.id, i)
                        }
                        return i
                    }
                    ngOnDestroy() {
                        this.rendererByCompId.clear()
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(GD), I(WD), I(xa), I(eF), I(lt), I(Wn), I(se), I(qm))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class Lf {
                constructor(n, t, r, o) {
                    this.eventManager = n, this.doc = t, this.ngZone = r, this.platformIsServer = o, this.data = Object.create(null), this.destroyNode = null
                }
                destroy() {}
                createElement(n, t) {
                    return t ? this.doc.createElementNS(Rf[t] || t, n) : this.doc.createElement(n)
                }
                createComment(n) {
                    return this.doc.createComment(n)
                }
                createText(n) {
                    return this.doc.createTextNode(n)
                }
                appendChild(n, t) {
                    (XD(n) ? n.content : n).appendChild(t)
                }
                insertBefore(n, t, r) {
                    n && (XD(n) ? n.content : n).insertBefore(t, r)
                }
                removeChild(n, t) {
                    n && n.removeChild(t)
                }
                selectRootElement(n, t) {
                    let r = "string" == typeof n ? this.doc.querySelector(n) : n;
                    if (!r) throw new D(-5104, !1);
                    return t || (r.textContent = ""), r
                }
                parentNode(n) {
                    return n.parentNode
                }
                nextSibling(n) {
                    return n.nextSibling
                }
                setAttribute(n, t, r, o) {
                    if (o) {
                        t = o + ":" + t;
                        const i = Rf[o];
                        i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r)
                    } else n.setAttribute(t, r)
                }
                removeAttribute(n, t, r) {
                    if (r) {
                        const o = Rf[r];
                        o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`)
                    } else n.removeAttribute(t)
                }
                addClass(n, t) {
                    n.classList.add(t)
                }
                removeClass(n, t) {
                    n.classList.remove(t)
                }
                setStyle(n, t, r, o) {
                    o & (qn.DashCase | qn.Important) ? n.style.setProperty(t, r, o & qn.Important ? "important" : "") : n.style[t] = r
                }
                removeStyle(n, t, r) {
                    r & qn.DashCase ? n.style.removeProperty(t) : n.style[t] = ""
                }
                setProperty(n, t, r) {
                    n[t] = r
                }
                setValue(n, t) {
                    n.nodeValue = t
                }
                listen(n, t, r) {
                    if ("string" == typeof n && !(n = Qn().getGlobalEventTarget(this.doc, n))) throw new Error(`Unsupported event target ${n} for event ${t}`);
                    return this.eventManager.addEventListener(n, t, this.decoratePreventDefault(r))
                }
                decoratePreventDefault(n) {
                    return t => {
                        if ("__ngUnwrap__" === t) return n;
                        !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) && t.preventDefault()
                    }
                }
            }

            function XD(e) {
                return "TEMPLATE" === e.tagName && void 0 !== e.content
            }
            class oF extends Lf {
                constructor(n, t, r, o, i, s, a, l) {
                    super(n, i, s, l), this.sharedStylesHost = t, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const c = YD(o.id, o.styles);
                    for (const u of c) {
                        const d = document.createElement("style");
                        a && d.setAttribute("nonce", a), d.textContent = u, this.shadowRoot.appendChild(d)
                    }
                }
                nodeOrShadowRoot(n) {
                    return n === this.hostEl ? this.shadowRoot : n
                }
                appendChild(n, t) {
                    return super.appendChild(this.nodeOrShadowRoot(n), t)
                }
                insertBefore(n, t, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(n), t, r)
                }
                removeChild(n, t) {
                    return super.removeChild(this.nodeOrShadowRoot(n), t)
                }
                parentNode(n) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
            }
            class Vf extends Lf {
                constructor(n, t, r, o, i, s, a, l) {
                    super(n, i, s, a), this.sharedStylesHost = t, this.removeStylesOnCompDestroy = o, this.styles = l ? YD(l, r.styles) : r.styles
                }
                applyStyles() {
                    this.sharedStylesHost.addStyles(this.styles)
                }
                destroy() {
                    this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
                }
            }
            class JD extends Vf {
                constructor(n, t, r, o, i, s, a, l) {
                    const c = o + "-" + r.id;
                    super(n, t, r, i, s, a, l, c), this.contentAttr = function tF(e) {
                        return "_ngcontent-%COMP%".replace(Ff, e)
                    }(c), this.hostAttr = function nF(e) {
                        return "_nghost-%COMP%".replace(Ff, e)
                    }(c)
                }
                applyToHost(n) {
                    this.applyStyles(), this.setAttribute(n, this.hostAttr, "")
                }
                createElement(n, t) {
                    const r = super.createElement(n, t);
                    return super.setAttribute(r, this.contentAttr, ""), r
                }
            }
            let iF = (() => {
                class e extends qD {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return !0
                    }
                    addEventListener(t, r, o) {
                        return t.addEventListener(r, o, !1), () => this.removeEventListener(t, r, o)
                    }
                    removeEventListener(t, r, o) {
                        return t.removeEventListener(r, o)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(lt))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const KD = ["alt", "control", "meta", "shift"],
                sF = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                aF = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                };
            let lF = (() => {
                class e extends qD {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return null != e.parseEventName(t)
                    }
                    addEventListener(t, r, o) {
                        const i = e.parseEventName(r),
                            s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => Qn().onAndCancel(t, i.domEventName, s))
                    }
                    static parseEventName(t) {
                        const r = t.toLowerCase().split("."),
                            o = r.shift();
                        if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                        const i = e._normalizeKey(r.pop());
                        let s = "",
                            a = r.indexOf("code");
                        if (a > -1 && (r.splice(a, 1), s = "code."), KD.forEach(c => {
                                const u = r.indexOf(c);
                                u > -1 && (r.splice(u, 1), s += c + ".")
                            }), s += i, 0 != r.length || 0 === i.length) return null;
                        const l = {};
                        return l.domEventName = o, l.fullKey = s, l
                    }
                    static matchEventFullKeyCode(t, r) {
                        let o = sF[t.key] || t.key,
                            i = "";
                        return r.indexOf("code.") > -1 && (o = t.code, i = "code."), !(null == o || !o) && (o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), KD.forEach(s => {
                            s !== o && (0, aF[s])(t) && (i += s + ".")
                        }), i += o, i === r)
                    }
                    static eventCallback(t, r, o) {
                        return i => {
                            e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i))
                        }
                    }
                    static _normalizeKey(t) {
                        return "esc" === t ? "escape" : t
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(lt))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const fF = BC($k, "browser", [{
                    provide: Wn,
                    useValue: VD
                }, {
                    provide: Gm,
                    useValue: function cF() {
                        Pf.makeCurrent()
                    },
                    multi: !0
                }, {
                    provide: lt,
                    useFactory: function dF() {
                        return function qx(e) {
                            bu = e
                        }(document), document
                    },
                    deps: []
                }]),
                hF = new E(""),
                nw = [{
                    provide: rl,
                    useClass: class YR {
                        addToWindow(n) {
                            de.getAngularTestability = (r, o = !0) => {
                                const i = n.findTestabilityInTree(r, o);
                                if (null == i) throw new D(5103, !1);
                                return i
                            }, de.getAllAngularTestabilities = () => n.getAllTestabilities(), de.getAllAngularRootElements = () => n.getAllRootElements(), de.frameworkStabilizers || (de.frameworkStabilizers = []), de.frameworkStabilizers.push(r => {
                                const o = de.getAllAngularTestabilities();
                                let i = o.length,
                                    s = !1;
                                const a = function(l) {
                                    s = s || l, i--, 0 == i && r(s)
                                };
                                o.forEach(l => {
                                    l.whenStable(a)
                                })
                            })
                        }
                        findTestabilityInTree(n, t, r) {
                            return null == t ? null : n.getTestability(t) ? ? (r ? Qn().isShadowRoot(t) ? this.findTestabilityInTree(n, t.host, !0) : this.findTestabilityInTree(n, t.parentElement, !0) : null)
                        }
                    },
                    deps: []
                }, {
                    provide: FC,
                    useClass: Kd,
                    deps: [se, ef, rl]
                }, {
                    provide: Kd,
                    useClass: Kd,
                    deps: [se, ef, rl]
                }],
                rw = [{
                        provide: Pu,
                        useValue: "root"
                    }, {
                        provide: xn,
                        useFactory: function uF() {
                            return new xn
                        },
                        deps: []
                    }, {
                        provide: kf,
                        useClass: iF,
                        multi: !0,
                        deps: [lt, se, Wn]
                    }, {
                        provide: kf,
                        useClass: lF,
                        multi: !0,
                        deps: [lt]
                    }, QD, WD, GD, {
                        provide: Jm,
                        useExisting: QD
                    }, {
                        provide: $D,
                        useClass: QR,
                        deps: []
                    },
                    []
                ];
            let pF = (() => {
                    class e {
                        constructor(t) {}
                        static withServerTransition(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: xa,
                                    useValue: t.appId
                                }]
                            }
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(hF, 12))
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            providers: [...rw, ...nw],
                            imports: [LD, Bk]
                        })
                    }
                    return e
                })(),
                ow = (() => {
                    class e {
                        constructor(t) {
                            this._doc = t
                        }
                        getTitle() {
                            return this._doc.title
                        }
                        setTitle(t) {
                            this._doc.title = t || ""
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(lt))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function(r) {
                                let o = null;
                                return o = r ? new r : function mF() {
                                    return new ow(I(lt))
                                }(), o
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            typeof window < "u" && window;
            let $f = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function(r) {
                                let o = null;
                                return o = r ? new(r || e) : I(aw), o
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                aw = (() => {
                    class e extends $f {
                        constructor(t) {
                            super(), this._doc = t
                        }
                        sanitize(t, r) {
                            if (null == r) return null;
                            switch (t) {
                                case At.NONE:
                                    return r;
                                case At.HTML:
                                    return ln(r, "HTML") ? St(r) : Rm(this._doc, String(r)).toString();
                                case At.STYLE:
                                    return ln(r, "Style") ? St(r) : r;
                                case At.SCRIPT:
                                    if (ln(r, "Script")) return St(r);
                                    throw new D(5200, !1);
                                case At.URL:
                                    return ln(r, "URL") ? St(r) : wa(String(r));
                                case At.RESOURCE_URL:
                                    if (ln(r, "ResourceURL")) return St(r);
                                    throw new D(5201, !1);
                                default:
                                    throw new D(5202, !1)
                            }
                        }
                        bypassSecurityTrustHtml(t) {
                            return function Kx(e) {
                                return new Wx(e)
                            }(t)
                        }
                        bypassSecurityTrustStyle(t) {
                            return function eS(e) {
                                return new Zx(e)
                            }(t)
                        }
                        bypassSecurityTrustScript(t) {
                            return function tS(e) {
                                return new Yx(e)
                            }(t)
                        }
                        bypassSecurityTrustUrl(t) {
                            return function nS(e) {
                                return new Qx(e)
                            }(t)
                        }
                        bypassSecurityTrustResourceUrl(t) {
                            return function rS(e) {
                                return new Xx(e)
                            }(t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(lt))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function(r) {
                                let o = null;
                                return o = r ? new r : function CF(e) {
                                    return new aw(e.get(lt))
                                }(I(yt)), o
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            const {
                isArray: DF
            } = Array, {
                getPrototypeOf: wF,
                prototype: bF,
                keys: EF
            } = Object;

            function cw(e) {
                if (1 === e.length) {
                    const n = e[0];
                    if (DF(n)) return {
                        args: n,
                        keys: null
                    };
                    if (function MF(e) {
                            return e && "object" == typeof e && wF(e) === bF
                        }(n)) {
                        const t = EF(n);
                        return {
                            args: t.map(r => n[r]),
                            keys: t
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }
            const {
                isArray: IF
            } = Array;

            function uw(e) {
                return Q(n => function xF(e, n) {
                    return IF(n) ? e(...n) : e(n)
                }(e, n))
            }

            function dw(e, n) {
                return e.reduce((t, r, o) => (t[r] = n[o], t), {})
            }
            let fw = (() => {
                    class e {
                        constructor(t, r) {
                            this._renderer = t, this._elementRef = r, this.onChange = o => {}, this.onTouched = () => {}
                        }
                        setProperty(t, r) {
                            this._renderer.setProperty(this._elementRef.nativeElement, t, r)
                        }
                        registerOnTouched(t) {
                            this.onTouched = t
                        }
                        registerOnChange(t) {
                            this.onChange = t
                        }
                        setDisabledState(t) {
                            this.setProperty("disabled", t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(C(cn), C(it))
                        };
                        static# t = this.\u0275dir = $({
                            type: e
                        })
                    }
                    return e
                })(),
                Ir = (() => {
                    class e extends fw {
                        static# e = this.\u0275fac = function() {
                            let t;
                            return function(o) {
                                return (t || (t = He(e)))(o || e)
                            }
                        }();
                        static# t = this.\u0275dir = $({
                            type: e,
                            features: [ne]
                        })
                    }
                    return e
                })();
            const pn = new E("NgValueAccessor"),
                TF = {
                    provide: pn,
                    useExisting: ue(() => bl),
                    multi: !0
                },
                PF = new E("CompositionEventMode");
            let bl = (() => {
                class e extends fw {
                    constructor(t, r, o) {
                        super(t, r), this._compositionMode = o, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function OF() {
                            const e = Qn() ? Qn().getUserAgent() : "";
                            return /android (\d+)/.test(e.toLowerCase())
                        }())
                    }
                    writeValue(t) {
                        this.setProperty("value", t ? ? "")
                    }
                    _handleInput(t) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(t) {
                        this._composing = !1, this._compositionMode && this.onChange(t)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(cn), C(it), C(PF, 8))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["input", "formControlName", "", 3, "type", "checkbox"],
                            ["textarea", "formControlName", ""],
                            ["input", "formControl", "", 3, "type", "checkbox"],
                            ["textarea", "formControl", ""],
                            ["input", "ngModel", "", 3, "type", "checkbox"],
                            ["textarea", "ngModel", ""],
                            ["", "ngDefaultControl", ""]
                        ],
                        hostBindings: function(r, o) {
                            1 & r && Se("input", function(s) {
                                return o._handleInput(s.target.value)
                            })("blur", function() {
                                return o.onTouched()
                            })("compositionstart", function() {
                                return o._compositionStart()
                            })("compositionend", function(s) {
                                return o._compositionEnd(s.target.value)
                            })
                        },
                        features: [_e([TF]), ne]
                    })
                }
                return e
            })();
            const Qe = new E("NgValidators"),
                Kn = new E("NgAsyncValidators");

            function bw(e) {
                return null != e
            }

            function Ew(e) {
                return ji(e) ? Oe(e) : e
            }

            function Mw(e) {
                let n = {};
                return e.forEach(t => {
                    n = null != t ? { ...n,
                        ...t
                    } : n
                }), 0 === Object.keys(n).length ? null : n
            }

            function Iw(e, n) {
                return n.map(t => t(e))
            }

            function xw(e) {
                return e.map(n => function NF(e) {
                    return !e.validate
                }(n) ? n : t => n.validate(t))
            }

            function Bf(e) {
                return null != e ? function Sw(e) {
                    if (!e) return null;
                    const n = e.filter(bw);
                    return 0 == n.length ? null : function(t) {
                        return Mw(Iw(t, n))
                    }
                }(xw(e)) : null
            }

            function Hf(e) {
                return null != e ? function Aw(e) {
                    if (!e) return null;
                    const n = e.filter(bw);
                    return 0 == n.length ? null : function(t) {
                        return function SF(...e) {
                            const n = hp(e),
                                {
                                    args: t,
                                    keys: r
                                } = cw(e),
                                o = new De(i => {
                                    const {
                                        length: s
                                    } = t;
                                    if (!s) return void i.complete();
                                    const a = new Array(s);
                                    let l = s,
                                        c = s;
                                    for (let u = 0; u < s; u++) {
                                        let d = !1;
                                        Dt(t[u]).subscribe(xe(i, f => {
                                            d || (d = !0, c--), a[u] = f
                                        }, () => l--, void 0, () => {
                                            (!l || !d) && (c || i.next(r ? dw(r, a) : a), i.complete())
                                        }))
                                    }
                                });
                            return n ? o.pipe(uw(n)) : o
                        }(Iw(t, n).map(Ew)).pipe(Q(Mw))
                    }
                }(xw(e)) : null
            }

            function Tw(e, n) {
                return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
            }

            function Uf(e) {
                return e ? Array.isArray(e) ? e : [e] : []
            }

            function Ml(e, n) {
                return Array.isArray(e) ? e.includes(n) : e === n
            }

            function kw(e, n) {
                const t = Uf(n);
                return Uf(e).forEach(o => {
                    Ml(t, o) || t.push(o)
                }), t
            }

            function Nw(e, n) {
                return Uf(n).filter(t => !Ml(e, t))
            }
            class Rw {
                constructor() {
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                }
                get value() {
                    return this.control ? this.control.value : null
                }
                get valid() {
                    return this.control ? this.control.valid : null
                }
                get invalid() {
                    return this.control ? this.control.invalid : null
                }
                get pending() {
                    return this.control ? this.control.pending : null
                }
                get disabled() {
                    return this.control ? this.control.disabled : null
                }
                get enabled() {
                    return this.control ? this.control.enabled : null
                }
                get errors() {
                    return this.control ? this.control.errors : null
                }
                get pristine() {
                    return this.control ? this.control.pristine : null
                }
                get dirty() {
                    return this.control ? this.control.dirty : null
                }
                get touched() {
                    return this.control ? this.control.touched : null
                }
                get status() {
                    return this.control ? this.control.status : null
                }
                get untouched() {
                    return this.control ? this.control.untouched : null
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null
                }
                get path() {
                    return null
                }
                _setValidators(n) {
                    this._rawValidators = n || [], this._composedValidatorFn = Bf(this._rawValidators)
                }
                _setAsyncValidators(n) {
                    this._rawAsyncValidators = n || [], this._composedAsyncValidatorFn = Hf(this._rawAsyncValidators)
                }
                get validator() {
                    return this._composedValidatorFn || null
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null
                }
                _registerOnDestroy(n) {
                    this._onDestroyCallbacks.push(n)
                }
                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach(n => n()), this._onDestroyCallbacks = []
                }
                reset(n = void 0) {
                    this.control && this.control.reset(n)
                }
                hasError(n, t) {
                    return !!this.control && this.control.hasError(n, t)
                }
                getError(n, t) {
                    return this.control ? this.control.getError(n, t) : null
                }
            }
            class ut extends Rw {
                get formDirective() {
                    return null
                }
                get path() {
                    return null
                }
            }
            class er extends Rw {
                constructor() {
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
                }
            }
            class Fw {
                constructor(n) {
                    this._cd = n
                }
                get isTouched() {
                    return !!this._cd ? .control ? .touched
                }
                get isUntouched() {
                    return !!this._cd ? .control ? .untouched
                }
                get isPristine() {
                    return !!this._cd ? .control ? .pristine
                }
                get isDirty() {
                    return !!this._cd ? .control ? .dirty
                }
                get isValid() {
                    return !!this._cd ? .control ? .valid
                }
                get isInvalid() {
                    return !!this._cd ? .control ? .invalid
                }
                get isPending() {
                    return !!this._cd ? .control ? .pending
                }
                get isSubmitted() {
                    return !!this._cd ? .submitted
                }
            }
            let Lw = (() => {
                class e extends Fw {
                    constructor(t) {
                        super(t)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(er, 2))
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["", "formControlName", ""],
                            ["", "ngModel", ""],
                            ["", "formControl", ""]
                        ],
                        hostVars: 14,
                        hostBindings: function(r, o) {
                            2 & r && $i("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)
                        },
                        features: [ne]
                    })
                }
                return e
            })();
            const rs = "VALID",
                xl = "INVALID",
                Lo = "PENDING",
                os = "DISABLED";

            function Sl(e) {
                return null != e && !Array.isArray(e) && "object" == typeof e
            }
            class Bw {
                constructor(n, t) {
                    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(n), this._assignAsyncValidators(t)
                }
                get validator() {
                    return this._composedValidatorFn
                }
                set validator(n) {
                    this._rawValidators = this._composedValidatorFn = n
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn
                }
                set asyncValidator(n) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = n
                }
                get parent() {
                    return this._parent
                }
                get valid() {
                    return this.status === rs
                }
                get invalid() {
                    return this.status === xl
                }
                get pending() {
                    return this.status == Lo
                }
                get disabled() {
                    return this.status === os
                }
                get enabled() {
                    return this.status !== os
                }
                get dirty() {
                    return !this.pristine
                }
                get untouched() {
                    return !this.touched
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
                }
                setValidators(n) {
                    this._assignValidators(n)
                }
                setAsyncValidators(n) {
                    this._assignAsyncValidators(n)
                }
                addValidators(n) {
                    this.setValidators(kw(n, this._rawValidators))
                }
                addAsyncValidators(n) {
                    this.setAsyncValidators(kw(n, this._rawAsyncValidators))
                }
                removeValidators(n) {
                    this.setValidators(Nw(n, this._rawValidators))
                }
                removeAsyncValidators(n) {
                    this.setAsyncValidators(Nw(n, this._rawAsyncValidators))
                }
                hasValidator(n) {
                    return Ml(this._rawValidators, n)
                }
                hasAsyncValidator(n) {
                    return Ml(this._rawAsyncValidators, n)
                }
                clearValidators() {
                    this.validator = null
                }
                clearAsyncValidators() {
                    this.asyncValidator = null
                }
                markAsTouched(n = {}) {
                    this.touched = !0, this._parent && !n.onlySelf && this._parent.markAsTouched(n)
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild(n => n.markAllAsTouched())
                }
                markAsUntouched(n = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
                        t.markAsUntouched({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                markAsDirty(n = {}) {
                    this.pristine = !1, this._parent && !n.onlySelf && this._parent.markAsDirty(n)
                }
                markAsPristine(n = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
                        t.markAsPristine({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                markAsPending(n = {}) {
                    this.status = Lo, !1 !== n.emitEvent && this.statusChanges.emit(this.status), this._parent && !n.onlySelf && this._parent.markAsPending(n)
                }
                disable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = os, this.errors = null, this._forEachChild(r => {
                        r.disable({ ...n,
                            onlySelf: !0
                        })
                    }), this._updateValue(), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({ ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!0))
                }
                enable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = rs, this._forEachChild(r => {
                        r.enable({ ...n,
                            onlySelf: !0
                        })
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    }), this._updateAncestors({ ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!1))
                }
                _updateAncestors(n) {
                    this._parent && !n.onlySelf && (this._parent.updateValueAndValidity(n), n.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
                }
                setParent(n) {
                    this._parent = n
                }
                getRawValue() {
                    return this.value
                }
                updateValueAndValidity(n = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === rs || this.status === Lo) && this._runAsyncValidator(n.emitEvent)), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.updateValueAndValidity(n)
                }
                _updateTreeValidity(n = {
                    emitEvent: !0
                }) {
                    this._forEachChild(t => t._updateTreeValidity(n)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? os : rs
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null
                }
                _runAsyncValidator(n) {
                    if (this.asyncValidator) {
                        this.status = Lo, this._hasOwnPendingAsyncValidator = !0;
                        const t = Ew(this.asyncValidator(this));
                        this._asyncValidationSubscription = t.subscribe(r => {
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                                emitEvent: n
                            })
                        })
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
                }
                setErrors(n, t = {}) {
                    this.errors = n, this._updateControlsErrors(!1 !== t.emitEvent)
                }
                get(n) {
                    let t = n;
                    return null == t || (Array.isArray(t) || (t = t.split(".")), 0 === t.length) ? null : t.reduce((r, o) => r && r._find(o), this)
                }
                getError(n, t) {
                    const r = t ? this.get(t) : this;
                    return r && r.errors ? r.errors[n] : null
                }
                hasError(n, t) {
                    return !!this.getError(n, t)
                }
                get root() {
                    let n = this;
                    for (; n._parent;) n = n._parent;
                    return n
                }
                _updateControlsErrors(n) {
                    this.status = this._calculateStatus(), n && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(n)
                }
                _initObservables() {
                    this.valueChanges = new ye, this.statusChanges = new ye
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? os : this.errors ? xl : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Lo) ? Lo : this._anyControlsHaveStatus(xl) ? xl : rs
                }
                _anyControlsHaveStatus(n) {
                    return this._anyControls(t => t.status === n)
                }
                _anyControlsDirty() {
                    return this._anyControls(n => n.dirty)
                }
                _anyControlsTouched() {
                    return this._anyControls(n => n.touched)
                }
                _updatePristine(n = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                _updateTouched(n = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                _registerOnCollectionChange(n) {
                    this._onCollectionChange = n
                }
                _setUpdateStrategy(n) {
                    Sl(n) && null != n.updateOn && (this._updateOn = n.updateOn)
                }
                _parentMarkedDirty(n) {
                    return !n && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
                }
                _find(n) {
                    return null
                }
                _assignValidators(n) {
                    this._rawValidators = Array.isArray(n) ? n.slice() : n, this._composedValidatorFn = function jF(e) {
                        return Array.isArray(e) ? Bf(e) : e || null
                    }(this._rawValidators)
                }
                _assignAsyncValidators(n) {
                    this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n, this._composedAsyncValidatorFn = function $F(e) {
                        return Array.isArray(e) ? Hf(e) : e || null
                    }(this._rawAsyncValidators)
                }
            }
            const xr = new E("CallSetDisabledState", {
                    providedIn: "root",
                    factory: () => is
                }),
                is = "always";

            function ss(e, n, t = is) {
                (function Yf(e, n) {
                    const t = function Ow(e) {
                        return e._rawValidators
                    }(e);
                    null !== n.validator ? e.setValidators(Tw(t, n.validator)) : "function" == typeof t && e.setValidators([t]);
                    const r = function Pw(e) {
                        return e._rawAsyncValidators
                    }(e);
                    null !== n.asyncValidator ? e.setAsyncValidators(Tw(r, n.asyncValidator)) : "function" == typeof r && e.setAsyncValidators([r]);
                    const o = () => e.updateValueAndValidity();
                    Ol(n._rawValidators, o), Ol(n._rawAsyncValidators, o)
                })(e, n), n.valueAccessor.writeValue(e.value), (e.disabled || "always" === t) && n.valueAccessor.setDisabledState ? .(e.disabled),
                    function UF(e, n) {
                        n.valueAccessor.registerOnChange(t => {
                            e._pendingValue = t, e._pendingChange = !0, e._pendingDirty = !0, "change" === e.updateOn && Hw(e, n)
                        })
                    }(e, n),
                    function GF(e, n) {
                        const t = (r, o) => {
                            n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r)
                        };
                        e.registerOnChange(t), n._registerOnDestroy(() => {
                            e._unregisterOnChange(t)
                        })
                    }(e, n),
                    function zF(e, n) {
                        n.valueAccessor.registerOnTouched(() => {
                            e._pendingTouched = !0, "blur" === e.updateOn && e._pendingChange && Hw(e, n), "submit" !== e.updateOn && e.markAsTouched()
                        })
                    }(e, n),
                    function HF(e, n) {
                        if (n.valueAccessor.setDisabledState) {
                            const t = r => {
                                n.valueAccessor.setDisabledState(r)
                            };
                            e.registerOnDisabledChange(t), n._registerOnDestroy(() => {
                                e._unregisterOnDisabledChange(t)
                            })
                        }
                    }(e, n)
            }

            function Ol(e, n) {
                e.forEach(t => {
                    t.registerOnValidatorChange && t.registerOnValidatorChange(n)
                })
            }

            function Hw(e, n) {
                e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {
                    emitModelToViewChange: !1
                }), n.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
            }

            function Gw(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }

            function qw(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e
            }
            const Ww = class extends Bw {
                    constructor(n = null, t, r) {
                        super(function qf(e) {
                            return (Sl(e) ? e.validators : e) || null
                        }(t), function Wf(e, n) {
                            return (Sl(n) ? n.asyncValidators : e) || null
                        }(r, t)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(n), this._setUpdateStrategy(t), this._initObservables(), this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: !!this.asyncValidator
                        }), Sl(t) && (t.nonNullable || t.initialValueIsDefault) && (this.defaultValue = qw(n) ? n.value : n)
                    }
                    setValue(n, t = {}) {
                        this.value = this._pendingValue = n, this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(r => r(this.value, !1 !== t.emitViewToModelChange)), this.updateValueAndValidity(t)
                    }
                    patchValue(n, t = {}) {
                        this.setValue(n, t)
                    }
                    reset(n = this.defaultValue, t = {}) {
                        this._applyFormState(n), this.markAsPristine(t), this.markAsUntouched(t), this.setValue(this.value, t), this._pendingChange = !1
                    }
                    _updateValue() {}
                    _anyControls(n) {
                        return !1
                    }
                    _allControlsDisabled() {
                        return this.disabled
                    }
                    registerOnChange(n) {
                        this._onChange.push(n)
                    }
                    _unregisterOnChange(n) {
                        Gw(this._onChange, n)
                    }
                    registerOnDisabledChange(n) {
                        this._onDisabledChange.push(n)
                    }
                    _unregisterOnDisabledChange(n) {
                        Gw(this._onDisabledChange, n)
                    }
                    _forEachChild(n) {}
                    _syncPendingControls() {
                        return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                            onlySelf: !0,
                            emitModelToViewChange: !1
                        }), 0))
                    }
                    _applyFormState(n) {
                        qw(n) ? (this.value = this._pendingValue = n.value, n.disabled ? this.disable({
                            onlySelf: !0,
                            emitEvent: !1
                        }) : this.enable({
                            onlySelf: !0,
                            emitEvent: !1
                        })) : this.value = this._pendingValue = n
                    }
                },
                KF = {
                    provide: er,
                    useExisting: ue(() => eh)
                },
                Qw = (() => Promise.resolve())();
            let eh = (() => {
                    class e extends er {
                        constructor(t, r, o, i, s, a) {
                            super(), this._changeDetectorRef = s, this.callSetDisabledState = a, this.control = new Ww, this._registered = !1, this.name = "", this.update = new ye, this._parent = t, this._setValidators(r), this._setAsyncValidators(o), this.valueAccessor = function Jf(e, n) {
                                if (!n) return null;
                                let t, r, o;
                                return Array.isArray(n), n.forEach(i => {
                                    i.constructor === bl ? t = i : function ZF(e) {
                                        return Object.getPrototypeOf(e.constructor) === Ir
                                    }(i) ? r = i : o = i
                                }), o || r || t || null
                            }(0, i)
                        }
                        ngOnChanges(t) {
                            if (this._checkForErrors(), !this._registered || "name" in t) {
                                if (this._registered && (this._checkName(), this.formDirective)) {
                                    const r = t.name.previousValue;
                                    this.formDirective.removeControl({
                                        name: r,
                                        path: this._getPath(r)
                                    })
                                }
                                this._setUpControl()
                            }
                            "isDisabled" in t && this._updateDisabled(t),
                                function Xf(e, n) {
                                    if (!e.hasOwnProperty("model")) return !1;
                                    const t = e.model;
                                    return !!t.isFirstChange() || !Object.is(n, t.currentValue)
                                }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                        }
                        ngOnDestroy() {
                            this.formDirective && this.formDirective.removeControl(this)
                        }
                        get path() {
                            return this._getPath(this.name)
                        }
                        get formDirective() {
                            return this._parent ? this._parent.formDirective : null
                        }
                        viewToModelUpdate(t) {
                            this.viewModel = t, this.update.emit(t)
                        }
                        _setUpControl() {
                            this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
                        }
                        _setUpdateStrategy() {
                            this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                        }
                        _isStandalone() {
                            return !this._parent || !(!this.options || !this.options.standalone)
                        }
                        _setUpStandalone() {
                            ss(this.control, this, this.callSetDisabledState), this.control.updateValueAndValidity({
                                emitEvent: !1
                            })
                        }
                        _checkForErrors() {
                            this._isStandalone() || this._checkParentType(), this._checkName()
                        }
                        _checkParentType() {}
                        _checkName() {
                            this.options && this.options.name && (this.name = this.options.name), this._isStandalone()
                        }
                        _updateValue(t) {
                            Qw.then(() => {
                                this.control.setValue(t, {
                                    emitViewToModelChange: !1
                                }), this._changeDetectorRef ? .markForCheck()
                            })
                        }
                        _updateDisabled(t) {
                            const r = t.isDisabled.currentValue,
                                o = 0 !== r && function No(e) {
                                    return "boolean" == typeof e ? e : null != e && "false" !== e
                                }(r);
                            Qw.then(() => {
                                o && !this.control.disabled ? this.control.disable() : !o && this.control.disabled && this.control.enable(), this._changeDetectorRef ? .markForCheck()
                            })
                        }
                        _getPath(t) {
                            return this._parent ? function Al(e, n) {
                                return [...n.path, e]
                            }(t, this._parent) : [t]
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(C(ut, 9), C(Qe, 10), C(Kn, 10), C(pn, 10), C(il, 8), C(xr, 8))
                        };
                        static# t = this.\u0275dir = $({
                            type: e,
                            selectors: [
                                ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]
                            ],
                            inputs: {
                                name: "name",
                                isDisabled: ["disabled", "isDisabled"],
                                model: ["ngModel", "model"],
                                options: ["ngModelOptions", "options"]
                            },
                            outputs: {
                                update: "ngModelChange"
                            },
                            exportAs: ["ngModel"],
                            features: [_e([KF]), ne, Mt]
                        })
                    }
                    return e
                })(),
                Jw = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({})
                    }
                    return e
                })();
            const th = new E("NgModelWithFormControlWarning");
            let m0 = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [Jw]
                        })
                    }
                    return e
                })(),
                M2 = (() => {
                    class e {
                        static withConfig(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: xr,
                                    useValue: t.callSetDisabledState ? ? is
                                }]
                            }
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [m0]
                        })
                    }
                    return e
                })(),
                I2 = (() => {
                    class e {
                        static withConfig(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: th,
                                    useValue: t.warnOnNgModelWithFormControl ? ? "always"
                                }, {
                                    provide: xr,
                                    useValue: t.callSetDisabledState ? ? is
                                }]
                            }
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [m0]
                        })
                    }
                    return e
                })();

            function Vo(e, n) {
                return ie(n) ? Le(e, n, 1) : Le(e, 1)
            }

            function Rn(e, n) {
                return Te((t, r) => {
                    let o = 0;
                    t.subscribe(xe(r, i => e.call(n, i, o++) && r.next(i)))
                })
            }

            function ls(e) {
                return Te((n, t) => {
                    try {
                        n.subscribe(t)
                    } finally {
                        t.add(e)
                    }
                })
            }
            class kl {}
            class Nl {}
            class gn {
                constructor(n) {
                    this.normalizedNames = new Map, this.lazyUpdate = null, n ? "string" == typeof n ? this.lazyInit = () => {
                        this.headers = new Map, n.split("\n").forEach(t => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                                const o = t.slice(0, r),
                                    i = o.toLowerCase(),
                                    s = t.slice(r + 1).trim();
                                this.maybeSetNormalizedName(o, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                            }
                        })
                    } : typeof Headers < "u" && n instanceof Headers ? (this.headers = new Map, n.forEach((t, r) => {
                        this.setHeaderEntries(r, t)
                    })) : this.lazyInit = () => {
                        this.headers = new Map, Object.entries(n).forEach(([t, r]) => {
                            this.setHeaderEntries(t, r)
                        })
                    } : this.headers = new Map
                }
                has(n) {
                    return this.init(), this.headers.has(n.toLowerCase())
                }
                get(n) {
                    this.init();
                    const t = this.headers.get(n.toLowerCase());
                    return t && t.length > 0 ? t[0] : null
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values())
                }
                getAll(n) {
                    return this.init(), this.headers.get(n.toLowerCase()) || null
                }
                append(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "a"
                    })
                }
                set(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "d"
                    })
                }
                maybeSetNormalizedName(n, t) {
                    this.normalizedNames.has(t) || this.normalizedNames.set(t, n)
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof gn ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(n => this.applyUpdate(n)), this.lazyUpdate = null))
                }
                copyFrom(n) {
                    n.init(), Array.from(n.headers.keys()).forEach(t => {
                        this.headers.set(t, n.headers.get(t)), this.normalizedNames.set(t, n.normalizedNames.get(t))
                    })
                }
                clone(n) {
                    const t = new gn;
                    return t.lazyInit = this.lazyInit && this.lazyInit instanceof gn ? this.lazyInit : this, t.lazyUpdate = (this.lazyUpdate || []).concat([n]), t
                }
                applyUpdate(n) {
                    const t = n.name.toLowerCase();
                    switch (n.op) {
                        case "a":
                        case "s":
                            let r = n.value;
                            if ("string" == typeof r && (r = [r]), 0 === r.length) return;
                            this.maybeSetNormalizedName(n.name, t);
                            const o = ("a" === n.op ? this.headers.get(t) : void 0) || [];
                            o.push(...r), this.headers.set(t, o);
                            break;
                        case "d":
                            const i = n.value;
                            if (i) {
                                let s = this.headers.get(t);
                                if (!s) return;
                                s = s.filter(a => -1 === i.indexOf(a)), 0 === s.length ? (this.headers.delete(t), this.normalizedNames.delete(t)) : this.headers.set(t, s)
                            } else this.headers.delete(t), this.normalizedNames.delete(t)
                    }
                }
                setHeaderEntries(n, t) {
                    const r = (Array.isArray(t) ? t : [t]).map(i => i.toString()),
                        o = n.toLowerCase();
                    this.headers.set(o, r), this.maybeSetNormalizedName(n, o)
                }
                forEach(n) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach(t => n(this.normalizedNames.get(t), this.headers.get(t)))
                }
            }
            class x2 {
                encodeKey(n) {
                    return y0(n)
                }
                encodeValue(n) {
                    return y0(n)
                }
                decodeKey(n) {
                    return decodeURIComponent(n)
                }
                decodeValue(n) {
                    return decodeURIComponent(n)
                }
            }
            const A2 = /%(\d[a-f0-9])/gi,
                T2 = {
                    40: "@",
                    "3A": ":",
                    24: "$",
                    "2C": ",",
                    "3B": ";",
                    "3D": "=",
                    "3F": "?",
                    "2F": "/"
                };

            function y0(e) {
                return encodeURIComponent(e).replace(A2, (n, t) => T2[t] ? ? n)
            }

            function Rl(e) {
                return `${e}`
            }
            class tr {
                constructor(n = {}) {
                    if (this.updates = null, this.cloneFrom = null, this.encoder = n.encoder || new x2, n.fromString) {
                        if (n.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function S2(e, n) {
                            const t = new Map;
                            return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
                                const i = o.indexOf("="),
                                    [s, a] = -1 == i ? [n.decodeKey(o), ""] : [n.decodeKey(o.slice(0, i)), n.decodeValue(o.slice(i + 1))],
                                    l = t.get(s) || [];
                                l.push(a), t.set(s, l)
                            }), t
                        }(n.fromString, this.encoder)
                    } else n.fromObject ? (this.map = new Map, Object.keys(n.fromObject).forEach(t => {
                        const r = n.fromObject[t],
                            o = Array.isArray(r) ? r.map(Rl) : [Rl(r)];
                        this.map.set(t, o)
                    })) : this.map = null
                }
                has(n) {
                    return this.init(), this.map.has(n)
                }
                get(n) {
                    this.init();
                    const t = this.map.get(n);
                    return t ? t[0] : null
                }
                getAll(n) {
                    return this.init(), this.map.get(n) || null
                }
                keys() {
                    return this.init(), Array.from(this.map.keys())
                }
                append(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "a"
                    })
                }
                appendAll(n) {
                    const t = [];
                    return Object.keys(n).forEach(r => {
                        const o = n[r];
                        Array.isArray(o) ? o.forEach(i => {
                            t.push({
                                param: r,
                                value: i,
                                op: "a"
                            })
                        }) : t.push({
                            param: r,
                            value: o,
                            op: "a"
                        })
                    }), this.clone(t)
                }
                set(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "d"
                    })
                }
                toString() {
                    return this.init(), this.keys().map(n => {
                        const t = this.encoder.encodeKey(n);
                        return this.map.get(n).map(r => t + "=" + this.encoder.encodeValue(r)).join("&")
                    }).filter(n => "" !== n).join("&")
                }
                clone(n) {
                    const t = new tr({
                        encoder: this.encoder
                    });
                    return t.cloneFrom = this.cloneFrom || this, t.updates = (this.updates || []).concat(n), t
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(n => this.map.set(n, this.cloneFrom.map.get(n))), this.updates.forEach(n => {
                        switch (n.op) {
                            case "a":
                            case "s":
                                const t = ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                                t.push(Rl(n.value)), this.map.set(n.param, t);
                                break;
                            case "d":
                                if (void 0 === n.value) {
                                    this.map.delete(n.param);
                                    break
                                } {
                                    let r = this.map.get(n.param) || [];
                                    const o = r.indexOf(Rl(n.value)); - 1 !== o && r.splice(o, 1), r.length > 0 ? this.map.set(n.param, r) : this.map.delete(n.param)
                                }
                        }
                    }), this.cloneFrom = this.updates = null)
                }
            }
            class O2 {
                constructor() {
                    this.map = new Map
                }
                set(n, t) {
                    return this.map.set(n, t), this
                }
                get(n) {
                    return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
                }
                delete(n) {
                    return this.map.delete(n), this
                }
                has(n) {
                    return this.map.has(n)
                }
                keys() {
                    return this.map.keys()
                }
            }

            function v0(e) {
                return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
            }

            function _0(e) {
                return typeof Blob < "u" && e instanceof Blob
            }

            function C0(e) {
                return typeof FormData < "u" && e instanceof FormData
            }
            class cs {
                constructor(n, t, r, o) {
                    let i;
                    if (this.url = t, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = n.toUpperCase(), function P2(e) {
                            switch (e) {
                                case "DELETE":
                                case "GET":
                                case "HEAD":
                                case "OPTIONS":
                                case "JSONP":
                                    return !1;
                                default:
                                    return !0
                            }
                        }(this.method) || o ? (this.body = void 0 !== r ? r : null, i = o) : i = r, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params)), this.headers || (this.headers = new gn), this.context || (this.context = new O2), this.params) {
                        const s = this.params.toString();
                        if (0 === s.length) this.urlWithParams = t;
                        else {
                            const a = t.indexOf("?");
                            this.urlWithParams = t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s
                        }
                    } else this.params = new tr, this.urlWithParams = t
                }
                serializeBody() {
                    return null === this.body ? null : v0(this.body) || _0(this.body) || C0(this.body) || function k2(e) {
                        return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                    }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof tr ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
                }
                detectContentTypeHeader() {
                    return null === this.body || C0(this.body) ? null : _0(this.body) ? this.body.type || null : v0(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof tr ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
                }
                clone(n = {}) {
                    const t = n.method || this.method,
                        r = n.url || this.url,
                        o = n.responseType || this.responseType,
                        i = void 0 !== n.body ? n.body : this.body,
                        s = void 0 !== n.withCredentials ? n.withCredentials : this.withCredentials,
                        a = void 0 !== n.reportProgress ? n.reportProgress : this.reportProgress;
                    let l = n.headers || this.headers,
                        c = n.params || this.params;
                    const u = n.context ? ? this.context;
                    return void 0 !== n.setHeaders && (l = Object.keys(n.setHeaders).reduce((d, f) => d.set(f, n.setHeaders[f]), l)), n.setParams && (c = Object.keys(n.setParams).reduce((d, f) => d.set(f, n.setParams[f]), c)), new cs(t, r, i, {
                        params: c,
                        headers: l,
                        context: u,
                        reportProgress: a,
                        responseType: o,
                        withCredentials: s
                    })
                }
            }
            var jo = function(e) {
                return e[e.Sent = 0] = "Sent", e[e.UploadProgress = 1] = "UploadProgress", e[e.ResponseHeader = 2] = "ResponseHeader", e[e.DownloadProgress = 3] = "DownloadProgress", e[e.Response = 4] = "Response", e[e.User = 5] = "User", e
            }(jo || {});
            class lh {
                constructor(n, t = 200, r = "OK") {
                    this.headers = n.headers || new gn, this.status = void 0 !== n.status ? n.status : t, this.statusText = n.statusText || r, this.url = n.url || null, this.ok = this.status >= 200 && this.status < 300
                }
            }
            class ch extends lh {
                constructor(n = {}) {
                    super(n), this.type = jo.ResponseHeader
                }
                clone(n = {}) {
                    return new ch({
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class $o extends lh {
                constructor(n = {}) {
                    super(n), this.type = jo.Response, this.body = void 0 !== n.body ? n.body : null
                }
                clone(n = {}) {
                    return new $o({
                        body: void 0 !== n.body ? n.body : this.body,
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class D0 extends lh {
                constructor(n) {
                    super(n, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${n.url||"(unknown url)"}` : `Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`, this.error = n.error || null
                }
            }

            function uh(e, n) {
                return {
                    body: n,
                    headers: e.headers,
                    context: e.context,
                    observe: e.observe,
                    params: e.params,
                    reportProgress: e.reportProgress,
                    responseType: e.responseType,
                    withCredentials: e.withCredentials
                }
            }
            let Fl = (() => {
                class e {
                    constructor(t) {
                        this.handler = t
                    }
                    request(t, r, o = {}) {
                        let i;
                        if (t instanceof cs) i = t;
                        else {
                            let l, c;
                            l = o.headers instanceof gn ? o.headers : new gn(o.headers), o.params && (c = o.params instanceof tr ? o.params : new tr({
                                fromObject: o.params
                            })), i = new cs(t, r, void 0 !== o.body ? o.body : null, {
                                headers: l,
                                context: o.context,
                                params: c,
                                reportProgress: o.reportProgress,
                                responseType: o.responseType || "json",
                                withCredentials: o.withCredentials
                            })
                        }
                        const s = k(i).pipe(Vo(l => this.handler.handle(l)));
                        if (t instanceof cs || "events" === o.observe) return s;
                        const a = s.pipe(Rn(l => l instanceof $o));
                        switch (o.observe || "body") {
                            case "body":
                                switch (i.responseType) {
                                    case "arraybuffer":
                                        return a.pipe(Q(l => {
                                            if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return l.body
                                        }));
                                    case "blob":
                                        return a.pipe(Q(l => {
                                            if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return l.body
                                        }));
                                    case "text":
                                        return a.pipe(Q(l => {
                                            if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
                                            return l.body
                                        }));
                                    default:
                                        return a.pipe(Q(l => l.body))
                                }
                            case "response":
                                return a;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                        }
                    }
                    delete(t, r = {}) {
                        return this.request("DELETE", t, r)
                    }
                    get(t, r = {}) {
                        return this.request("GET", t, r)
                    }
                    head(t, r = {}) {
                        return this.request("HEAD", t, r)
                    }
                    jsonp(t, r) {
                        return this.request("JSONP", t, {
                            params: (new tr).append(r, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(t, r = {}) {
                        return this.request("OPTIONS", t, r)
                    }
                    patch(t, r, o = {}) {
                        return this.request("PATCH", t, uh(o, r))
                    }
                    post(t, r, o = {}) {
                        return this.request("POST", t, uh(o, r))
                    }
                    put(t, r, o = {}) {
                        return this.request("PUT", t, uh(o, r))
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(kl))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function E0(e, n) {
                return n(e)
            }

            function R2(e, n) {
                return (t, r) => n.intercept(t, {
                    handle: o => e(o, r)
                })
            }
            const L2 = new E(""),
                us = new E(""),
                M0 = new E("");

            function V2() {
                let e = null;
                return (n, t) => {
                    null === e && (e = (M(L2, {
                        optional: !0
                    }) ? ? []).reduceRight(R2, E0));
                    const r = M(tl),
                        o = r.add();
                    return e(n, t).pipe(ls(() => r.remove(o)))
                }
            }
            let I0 = (() => {
                class e extends kl {
                    constructor(t, r) {
                        super(), this.backend = t, this.injector = r, this.chain = null, this.pendingTasks = M(tl)
                    }
                    handle(t) {
                        if (null === this.chain) {
                            const o = Array.from(new Set([...this.injector.get(us), ...this.injector.get(M0, [])]));
                            this.chain = o.reduceRight((i, s) => function F2(e, n, t) {
                                return (r, o) => t.runInContext(() => n(r, i => e(i, o)))
                            }(i, s, this.injector), E0)
                        }
                        const r = this.pendingTasks.add();
                        return this.chain(t, o => this.backend.handle(o)).pipe(ls(() => this.pendingTasks.remove(r)))
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(Nl), I(Tt))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const H2 = /^\)\]\}',?\n/;
            let S0 = (() => {
                class e {
                    constructor(t) {
                        this.xhrFactory = t
                    }
                    handle(t) {
                        if ("JSONP" === t.method) throw new D(-2800, !1);
                        const r = this.xhrFactory;
                        return (r.\u0275loadImpl ? Oe(r.\u0275loadImpl()) : k(null)).pipe(Ft(() => new De(i => {
                            const s = r.build();
                            if (s.open(t.method, t.urlWithParams), t.withCredentials && (s.withCredentials = !0), t.headers.forEach((g, y) => s.setRequestHeader(g, y.join(","))), t.headers.has("Accept") || s.setRequestHeader("Accept", "application/json, text/plain, */*"), !t.headers.has("Content-Type")) {
                                const g = t.detectContentTypeHeader();
                                null !== g && s.setRequestHeader("Content-Type", g)
                            }
                            if (t.responseType) {
                                const g = t.responseType.toLowerCase();
                                s.responseType = "json" !== g ? g : "text"
                            }
                            const a = t.serializeBody();
                            let l = null;
                            const c = () => {
                                    if (null !== l) return l;
                                    const g = s.statusText || "OK",
                                        y = new gn(s.getAllResponseHeaders()),
                                        v = function U2(e) {
                                            return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                                        }(s) || t.url;
                                    return l = new ch({
                                        headers: y,
                                        status: s.status,
                                        statusText: g,
                                        url: v
                                    }), l
                                },
                                u = () => {
                                    let {
                                        headers: g,
                                        status: y,
                                        statusText: v,
                                        url: m
                                    } = c(), w = null;
                                    204 !== y && (w = typeof s.response > "u" ? s.responseText : s.response), 0 === y && (y = w ? 200 : 0);
                                    let S = y >= 200 && y < 300;
                                    if ("json" === t.responseType && "string" == typeof w) {
                                        const P = w;
                                        w = w.replace(H2, "");
                                        try {
                                            w = "" !== w ? JSON.parse(w) : null
                                        } catch (oe) {
                                            w = P, S && (S = !1, w = {
                                                error: oe,
                                                text: w
                                            })
                                        }
                                    }
                                    S ? (i.next(new $o({
                                        body: w,
                                        headers: g,
                                        status: y,
                                        statusText: v,
                                        url: m || void 0
                                    })), i.complete()) : i.error(new D0({
                                        error: w,
                                        headers: g,
                                        status: y,
                                        statusText: v,
                                        url: m || void 0
                                    }))
                                },
                                d = g => {
                                    const {
                                        url: y
                                    } = c(), v = new D0({
                                        error: g,
                                        status: s.status || 0,
                                        statusText: s.statusText || "Unknown Error",
                                        url: y || void 0
                                    });
                                    i.error(v)
                                };
                            let f = !1;
                            const h = g => {
                                    f || (i.next(c()), f = !0);
                                    let y = {
                                        type: jo.DownloadProgress,
                                        loaded: g.loaded
                                    };
                                    g.lengthComputable && (y.total = g.total), "text" === t.responseType && s.responseText && (y.partialText = s.responseText), i.next(y)
                                },
                                p = g => {
                                    let y = {
                                        type: jo.UploadProgress,
                                        loaded: g.loaded
                                    };
                                    g.lengthComputable && (y.total = g.total), i.next(y)
                                };
                            return s.addEventListener("load", u), s.addEventListener("error", d), s.addEventListener("timeout", d), s.addEventListener("abort", d), t.reportProgress && (s.addEventListener("progress", h), null !== a && s.upload && s.upload.addEventListener("progress", p)), s.send(a), i.next({
                                type: jo.Sent
                            }), () => {
                                s.removeEventListener("error", d), s.removeEventListener("abort", d), s.removeEventListener("load", u), s.removeEventListener("timeout", d), t.reportProgress && (s.removeEventListener("progress", h), null !== a && s.upload && s.upload.removeEventListener("progress", p)), s.readyState !== s.DONE && s.abort()
                            }
                        })))
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I($D))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const dh = new E("XSRF_ENABLED"),
                A0 = new E("XSRF_COOKIE_NAME", {
                    providedIn: "root",
                    factory: () => "XSRF-TOKEN"
                }),
                T0 = new E("XSRF_HEADER_NAME", {
                    providedIn: "root",
                    factory: () => "X-XSRF-TOKEN"
                });
            class O0 {}
            let q2 = (() => {
                class e {
                    constructor(t, r, o) {
                        this.doc = t, this.platform = r, this.cookieName = o, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                    }
                    getToken() {
                        if ("server" === this.platform) return null;
                        const t = this.doc.cookie || "";
                        return t !== this.lastCookieString && (this.parseCount++, this.lastToken = MD(t, this.cookieName), this.lastCookieString = t), this.lastToken
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(lt), I(Wn), I(A0))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function W2(e, n) {
                const t = e.url.toLowerCase();
                if (!M(dh) || "GET" === e.method || "HEAD" === e.method || t.startsWith("http://") || t.startsWith("https://")) return n(e);
                const r = M(O0).getToken(),
                    o = M(T0);
                return null != r && !e.headers.has(o) && (e = e.clone({
                    headers: e.headers.set(o, r)
                })), n(e)
            }
            var nr = function(e) {
                return e[e.Interceptors = 0] = "Interceptors", e[e.LegacyInterceptors = 1] = "LegacyInterceptors", e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", e[e.NoXsrfProtection = 3] = "NoXsrfProtection", e[e.JsonpSupport = 4] = "JsonpSupport", e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", e[e.Fetch = 6] = "Fetch", e
            }(nr || {});

            function Z2(...e) {
                const n = [Fl, S0, I0, {
                    provide: kl,
                    useExisting: I0
                }, {
                    provide: Nl,
                    useExisting: S0
                }, {
                    provide: us,
                    useValue: W2,
                    multi: !0
                }, {
                    provide: dh,
                    useValue: !0
                }, {
                    provide: O0,
                    useClass: q2
                }];
                for (const t of e) n.push(...t.\u0275providers);
                return function Au(e) {
                    return {\
                        u0275providers: e
                    }
                }(n)
            }
            const P0 = new E("LEGACY_INTERCEPTOR_FN");

            function Y2() {
                return function Ar(e, n) {
                    return {\
                        u0275kind: e,
                        \u0275providers: n
                    }
                }(nr.LegacyInterceptors, [{
                    provide: P0,
                    useFactory: V2
                }, {
                    provide: us,
                    useExisting: P0,
                    multi: !0
                }])
            }
            let Q2 = (() => {
                class e {
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275mod = bt({
                        type: e
                    });
                    static# n = this.\u0275inj = ft({
                        providers: [Z2(Y2())]
                    })
                }
                return e
            })();

            function fh(...e) {
                const n = Ko(e),
                    t = hp(e),
                    {
                        args: r,
                        keys: o
                    } = cw(e);
                if (0 === r.length) return Oe([], n);
                const i = new De(function rL(e, n, t = Vn) {
                    return r => {
                        k0(n, () => {
                            const {
                                length: o
                            } = e, i = new Array(o);
                            let s = o,
                                a = o;
                            for (let l = 0; l < o; l++) k0(n, () => {
                                const c = Oe(e[l], n);
                                let u = !1;
                                c.subscribe(xe(r, d => {
                                    i[l] = d, u || (u = !0, a--), a || r.next(t(i.slice()))
                                }, () => {
                                    --s || r.complete()
                                }))
                            }, r)
                        }, r)
                    }
                }(r, n, o ? s => dw(o, s) : Vn));
                return t ? i.pipe(uw(t)) : i
            }

            function k0(e, n, t) {
                e ? _n(t, e, n) : n()
            }
            const Vl = Xo(e => function() {
                e(this), this.name = "EmptyError", this.message = "no elements in sequence"
            });

            function hh(...e) {
                return function oL() {
                    return Fr(1)
                }()(Oe(e, Ko(e)))
            }

            function N0(e) {
                return new De(n => {
                    Dt(e()).subscribe(n)
                })
            }

            function ds(e, n) {
                const t = ie(e) ? e : () => e,
                    r = o => o.error(t());
                return new De(n ? o => n.schedule(r, 0, o) : r)
            }

            function ph() {
                return Te((e, n) => {
                    let t = null;
                    e._refCount++;
                    const r = xe(n, void 0, void 0, void 0, () => {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) return void(t = null);
                        const o = e._connection,
                            i = t;
                        t = null, o && (!i || o === i) && o.unsubscribe(), n.unsubscribe()
                    });
                    e.subscribe(r), r.closed || (t = e.connect())
                })
            }
            class R0 extends De {
                constructor(n, t) {
                    super(), this.source = n, this.subjectFactory = t, this._subject = null, this._refCount = 0, this._connection = null, Xh(n) && (this.lift = n.lift)
                }
                _subscribe(n) {
                    return this.getSubject().subscribe(n)
                }
                getSubject() {
                    const n = this._subject;
                    return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject
                }
                _teardown() {
                    this._refCount = 0;
                    const {
                        _connection: n
                    } = this;
                    this._subject = this._connection = null, n ? .unsubscribe()
                }
                connect() {
                    let n = this._connection;
                    if (!n) {
                        n = this._connection = new dt;
                        const t = this.getSubject();
                        n.add(this.source.subscribe(xe(t, void 0, () => {
                            this._teardown(), t.complete()
                        }, r => {
                            this._teardown(), t.error(r)
                        }, () => this._teardown()))), n.closed && (this._connection = null, n = dt.EMPTY)
                    }
                    return n
                }
                refCount() {
                    return ph()(this)
                }
            }

            function Bo(e) {
                return e <= 0 ? () => en : Te((n, t) => {
                    let r = 0;
                    n.subscribe(xe(t, o => {
                        ++r <= e && (t.next(o), e <= r && t.complete())
                    }))
                })
            }

            function F0(...e) {
                const n = Ko(e);
                return Te((t, r) => {
                    (n ? hh(e, t, n) : hh(e, t)).subscribe(r)
                })
            }

            function jl(e) {
                return Te((n, t) => {
                    let r = !1;
                    n.subscribe(xe(t, o => {
                        r = !0, t.next(o)
                    }, () => {
                        r || t.next(e), t.complete()
                    }))
                })
            }

            function L0(e = iL) {
                return Te((n, t) => {
                    let r = !1;
                    n.subscribe(xe(t, o => {
                        r = !0, t.next(o)
                    }, () => r ? t.complete() : t.error(e())))
                })
            }

            function iL() {
                return new Vl
            }

            function rr(e, n) {
                const t = arguments.length >= 2;
                return r => r.pipe(e ? Rn((o, i) => e(o, i, r)) : Vn, Bo(1), t ? jl(n) : L0(() => new Vl))
            }

            function Xe(e, n, t) {
                const r = ie(e) || n || t ? {
                    next: e,
                    error: n,
                    complete: t
                } : e;
                return r ? Te((o, i) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    o.subscribe(xe(i, l => {
                        var c;
                        null === (c = r.next) || void 0 === c || c.call(r, l), i.next(l)
                    }, () => {
                        var l;
                        a = !1, null === (l = r.complete) || void 0 === l || l.call(r), i.complete()
                    }, l => {
                        var c;
                        a = !1, null === (c = r.error) || void 0 === c || c.call(r, l), i.error(l)
                    }, () => {
                        var l, c;
                        a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (c = r.finalize) || void 0 === c || c.call(r)
                    }))
                }) : Vn
            }

            function Tr(e) {
                return Te((n, t) => {
                    let i, r = null,
                        o = !1;
                    r = n.subscribe(xe(t, void 0, void 0, s => {
                        i = Dt(e(s, Tr(e)(n))), r ? (r.unsubscribe(), r = null, i.subscribe(t)) : o = !0
                    })), o && (r.unsubscribe(), r = null, i.subscribe(t))
                })
            }

            function gh(e) {
                return e <= 0 ? () => en : Te((n, t) => {
                    let r = [];
                    n.subscribe(xe(t, o => {
                        r.push(o), e < r.length && r.shift()
                    }, () => {
                        for (const o of r) t.next(o);
                        t.complete()
                    }, void 0, () => {
                        r = null
                    }))
                })
            }

            function V0(e) {
                return Q(() => e)
            }

            function j0(e) {
                return Te((n, t) => {
                    Dt(e).subscribe(xe(t, () => t.complete(), sc)), !t.closed && n.subscribe(t)
                })
            }
            const G = "primary",
                fs = Symbol("RouteTitle");
            class cL {
                constructor(n) {
                    this.params = n || {}
                }
                has(n) {
                    return Object.prototype.hasOwnProperty.call(this.params, n)
                }
                get(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t[0] : t
                    }
                    return null
                }
                getAll(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t : [t]
                    }
                    return []
                }
                get keys() {
                    return Object.keys(this.params)
                }
            }

            function Ho(e) {
                return new cL(e)
            }

            function uL(e, n, t) {
                const r = t.path.split("/");
                if (r.length > e.length || "full" === t.pathMatch && (n.hasChildren() || r.length < e.length)) return null;
                const o = {};
                for (let i = 0; i < r.length; i++) {
                    const s = r[i],
                        a = e[i];
                    if (s.startsWith(":")) o[s.substring(1)] = a;
                    else if (s !== a.path) return null
                }
                return {
                    consumed: e.slice(0, r.length),
                    posParams: o
                }
            }

            function mn(e, n) {
                const t = e ? Object.keys(e) : void 0,
                    r = n ? Object.keys(n) : void 0;
                if (!t || !r || t.length != r.length) return !1;
                let o;
                for (let i = 0; i < t.length; i++)
                    if (o = t[i], !$0(e[o], n[o])) return !1;
                return !0
            }

            function $0(e, n) {
                if (Array.isArray(e) && Array.isArray(n)) {
                    if (e.length !== n.length) return !1;
                    const t = [...e].sort(),
                        r = [...n].sort();
                    return t.every((o, i) => r[i] === o)
                }
                return e === n
            }

            function B0(e) {
                return e.length > 0 ? e[e.length - 1] : null
            }

            function or(e) {
                return function nL(e) {
                    return !!e && (e instanceof De || ie(e.lift) && ie(e.subscribe))
                }(e) ? e : ji(e) ? Oe(Promise.resolve(e)) : k(e)
            }
            const fL = {
                    exact: function z0(e, n, t) {
                        if (!Or(e.segments, n.segments) || !$l(e.segments, n.segments, t) || e.numberOfChildren !== n.numberOfChildren) return !1;
                        for (const r in n.children)
                            if (!e.children[r] || !z0(e.children[r], n.children[r], t)) return !1;
                        return !0
                    },
                    subset: G0
                },
                H0 = {
                    exact: function hL(e, n) {
                        return mn(e, n)
                    },
                    subset: function pL(e, n) {
                        return Object.keys(n).length <= Object.keys(e).length && Object.keys(n).every(t => $0(e[t], n[t]))
                    },
                    ignored: () => !0
                };

            function U0(e, n, t) {
                return fL[t.paths](e.root, n.root, t.matrixParams) && H0[t.queryParams](e.queryParams, n.queryParams) && !("exact" === t.fragment && e.fragment !== n.fragment)
            }

            function G0(e, n, t) {
                return q0(e, n, n.segments, t)
            }

            function q0(e, n, t, r) {
                if (e.segments.length > t.length) {
                    const o = e.segments.slice(0, t.length);
                    return !(!Or(o, t) || n.hasChildren() || !$l(o, t, r))
                }
                if (e.segments.length === t.length) {
                    if (!Or(e.segments, t) || !$l(e.segments, t, r)) return !1;
                    for (const o in n.children)
                        if (!e.children[o] || !G0(e.children[o], n.children[o], r)) return !1;
                    return !0
                } {
                    const o = t.slice(0, e.segments.length),
                        i = t.slice(e.segments.length);
                    return !!(Or(e.segments, o) && $l(e.segments, o, r) && e.children[G]) && q0(e.children[G], n, i, r)
                }
            }

            function $l(e, n, t) {
                return n.every((r, o) => H0[t](e[o].parameters, r.parameters))
            }
            class Uo {
                constructor(n = new re([], {}), t = {}, r = null) {
                    this.root = n, this.queryParams = t, this.fragment = r
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = Ho(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return yL.serialize(this)
                }
            }
            class re {
                constructor(n, t) {
                    this.segments = n, this.children = t, this.parent = null, Object.values(t).forEach(r => r.parent = this)
                }
                hasChildren() {
                    return this.numberOfChildren > 0
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length
                }
                toString() {
                    return Bl(this)
                }
            }
            class hs {
                constructor(n, t) {
                    this.path = n, this.parameters = t
                }
                get parameterMap() {
                    return this._parameterMap || (this._parameterMap = Ho(this.parameters)), this._parameterMap
                }
                toString() {
                    return Y0(this)
                }
            }

            function Or(e, n) {
                return e.length === n.length && e.every((t, r) => t.path === n[r].path)
            }
            let ps = (() => {
                class e {
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: function() {
                            return new mh
                        },
                        providedIn: "root"
                    })
                }
                return e
            })();
            class mh {
                parse(n) {
                    const t = new SL(n);
                    return new Uo(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment())
                }
                serialize(n) {
                    const t = `/${gs(n.root,!0)}`,
                        r = function CL(e) {
                            const n = Object.keys(e).map(t => {
                                const r = e[t];
                                return Array.isArray(r) ? r.map(o => `${Hl(t)}=${Hl(o)}`).join("&") : `${Hl(t)}=${Hl(r)}`
                            }).filter(t => !!t);
                            return n.length ? `?${n.join("&")}` : ""
                        }(n.queryParams);
                    return `${t}${r}${"string"==typeof n.fragment?`#${function vL(e){return encodeURI(e)}(n.fragment)}`:""}`
                }
            }
            const yL = new mh;

            function Bl(e) {
                return e.segments.map(n => Y0(n)).join("/")
            }

            function gs(e, n) {
                if (!e.hasChildren()) return Bl(e);
                if (n) {
                    const t = e.children[G] ? gs(e.children[G], !1) : "",
                        r = [];
                    return Object.entries(e.children).forEach(([o, i]) => {
                        o !== G && r.push(`${o}:${gs(i,!1)}`)
                    }), r.length > 0 ? `${t}(${r.join("//")})` : t
                } {
                    const t = function mL(e, n) {
                        let t = [];
                        return Object.entries(e.children).forEach(([r, o]) => {
                            r === G && (t = t.concat(n(o, r)))
                        }), Object.entries(e.children).forEach(([r, o]) => {
                            r !== G && (t = t.concat(n(o, r)))
                        }), t
                    }(e, (r, o) => o === G ? [gs(e.children[G], !1)] : [`${o}:${gs(r,!1)}`]);
                    return 1 === Object.keys(e.children).length && null != e.children[G] ? `${Bl(e)}/${t[0]}` : `${Bl(e)}/(${t.join("//")})`
                }
            }

            function W0(e) {
                return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
            }

            function Hl(e) {
                return W0(e).replace(/%3B/gi, ";")
            }

            function yh(e) {
                return W0(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
            }

            function Ul(e) {
                return decodeURIComponent(e)
            }

            function Z0(e) {
                return Ul(e.replace(/\+/g, "%20"))
            }

            function Y0(e) {
                return `${yh(e.path)}${function _L(e){return Object.keys(e).map(n=>`;${yh(n)}=${yh(e[n])}`).join("")}(e.parameters)}`
            }
            const DL = /^[^\/()?;#]+/;

            function vh(e) {
                const n = e.match(DL);
                return n ? n[0] : ""
            }
            const wL = /^[^\/()?;=#]+/,
                EL = /^[^=?&#]+/,
                IL = /^[^&#]+/;
            class SL {
                constructor(n) {
                    this.url = n, this.remaining = n
                }
                parseRootSegment() {
                    return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new re([], {}) : new re([], this.parseChildren())
                }
                parseQueryParams() {
                    const n = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(n)
                        } while (this.consumeOptional("&"));
                    return n
                }
                parseFragment() {
                    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const n = [];
                    for (this.peekStartsWith("(") || n.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), n.push(this.parseSegment());
                    let t = {};
                    this.peekStartsWith("/(") && (this.capture("/"), t = this.parseParens(!0));
                    let r = {};
                    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (n.length > 0 || Object.keys(t).length > 0) && (r[G] = new re(n, t)), r
                }
                parseSegment() {
                    const n = vh(this.remaining);
                    if ("" === n && this.peekStartsWith(";")) throw new D(4009, !1);
                    return this.capture(n), new hs(Ul(n), this.parseMatrixParams())
                }
                parseMatrixParams() {
                    const n = {};
                    for (; this.consumeOptional(";");) this.parseParam(n);
                    return n
                }
                parseParam(n) {
                    const t = function bL(e) {
                        const n = e.match(wL);
                        return n ? n[0] : ""
                    }(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const o = vh(this.remaining);
                        o && (r = o, this.capture(r))
                    }
                    n[Ul(t)] = Ul(r)
                }
                parseQueryParam(n) {
                    const t = function ML(e) {
                        const n = e.match(EL);
                        return n ? n[0] : ""
                    }(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const s = function xL(e) {
                            const n = e.match(IL);
                            return n ? n[0] : ""
                        }(this.remaining);
                        s && (r = s, this.capture(r))
                    }
                    const o = Z0(t),
                        i = Z0(r);
                    if (n.hasOwnProperty(o)) {
                        let s = n[o];
                        Array.isArray(s) || (s = [s], n[o] = s), s.push(i)
                    } else n[o] = i
                }
                parseParens(n) {
                    const t = {};
                    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                        const r = vh(this.remaining),
                            o = this.remaining[r.length];
                        if ("/" !== o && ")" !== o && ";" !== o) throw new D(4010, !1);
                        let i;
                        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : n && (i = G);
                        const s = this.parseChildren();
                        t[i] = 1 === Object.keys(s).length ? s[G] : new re([], s), this.consumeOptional("//")
                    }
                    return t
                }
                peekStartsWith(n) {
                    return this.remaining.startsWith(n)
                }
                consumeOptional(n) {
                    return !!this.peekStartsWith(n) && (this.remaining = this.remaining.substring(n.length), !0)
                }
                capture(n) {
                    if (!this.consumeOptional(n)) throw new D(4011, !1)
                }
            }

            function Q0(e) {
                return e.segments.length > 0 ? new re([], {
                    [G]: e
                }) : e
            }

            function X0(e) {
                const n = {};
                for (const r of Object.keys(e.children)) {
                    const i = X0(e.children[r]);
                    if (r === G && 0 === i.segments.length && i.hasChildren())
                        for (const [s, a] of Object.entries(i.children)) n[s] = a;
                    else(i.segments.length > 0 || i.hasChildren()) && (n[r] = i)
                }
                return function AL(e) {
                    if (1 === e.numberOfChildren && e.children[G]) {
                        const n = e.children[G];
                        return new re(e.segments.concat(n.segments), n.children)
                    }
                    return e
                }(new re(e.segments, n))
            }

            function Pr(e) {
                return e instanceof Uo
            }

            function J0(e) {
                let n;
                const o = Q0(function t(i) {
                    const s = {};
                    for (const l of i.children) {
                        const c = t(l);
                        s[l.outlet] = c
                    }
                    const a = new re(i.url, s);
                    return i === e && (n = a), a
                }(e.root));
                return n ? ? o
            }

            function K0(e, n, t, r) {
                let o = e;
                for (; o.parent;) o = o.parent;
                if (0 === n.length) return _h(o, o, o, t, r);
                const i = function OL(e) {
                    if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new tb(!0, 0, e);
                    let n = 0,
                        t = !1;
                    const r = e.reduce((o, i, s) => {
                        if ("object" == typeof i && null != i) {
                            if (i.outlets) {
                                const a = {};
                                return Object.entries(i.outlets).forEach(([l, c]) => {
                                    a[l] = "string" == typeof c ? c.split("/") : c
                                }), [...o, {
                                    outlets: a
                                }]
                            }
                            if (i.segmentPath) return [...o, i.segmentPath]
                        }
                        return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a, l) => {
                            0 == l && "." === a || (0 == l && "" === a ? t = !0 : ".." === a ? n++ : "" != a && o.push(a))
                        }), o) : [...o, i]
                    }, []);
                    return new tb(t, n, r)
                }(n);
                if (i.toRoot()) return _h(o, o, new re([], {}), t, r);
                const s = function PL(e, n, t) {
                        if (e.isAbsolute) return new Gl(n, !0, 0);
                        if (!t) return new Gl(n, !1, NaN);
                        if (null === t.parent) return new Gl(t, !0, 0);
                        const r = zl(e.commands[0]) ? 0 : 1;
                        return function kL(e, n, t) {
                            let r = e,
                                o = n,
                                i = t;
                            for (; i > o;) {
                                if (i -= o, r = r.parent, !r) throw new D(4005, !1);
                                o = r.segments.length
                            }
                            return new Gl(r, !1, o - i)
                        }(t, t.segments.length - 1 + r, e.numberOfDoubleDots)
                    }(i, o, e),
                    a = s.processChildren ? ys(s.segmentGroup, s.index, i.commands) : nb(s.segmentGroup, s.index, i.commands);
                return _h(o, s.segmentGroup, a, t, r)
            }

            function zl(e) {
                return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
            }

            function ms(e) {
                return "object" == typeof e && null != e && e.outlets
            }

            function _h(e, n, t, r, o) {
                let s, i = {};
                r && Object.entries(r).forEach(([l, c]) => {
                    i[l] = Array.isArray(c) ? c.map(u => `${u}`) : `${c}`
                }), s = e === n ? t : eb(e, n, t);
                const a = Q0(X0(s));
                return new Uo(a, i, o)
            }

            function eb(e, n, t) {
                const r = {};
                return Object.entries(e.children).forEach(([o, i]) => {
                    r[o] = i === n ? t : eb(i, n, t)
                }), new re(e.segments, r)
            }
            class tb {
                constructor(n, t, r) {
                    if (this.isAbsolute = n, this.numberOfDoubleDots = t, this.commands = r, n && r.length > 0 && zl(r[0])) throw new D(4003, !1);
                    const o = r.find(ms);
                    if (o && o !== B0(r)) throw new D(4004, !1)
                }
                toRoot() {
                    return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
                }
            }
            class Gl {
                constructor(n, t, r) {
                    this.segmentGroup = n, this.processChildren = t, this.index = r
                }
            }

            function nb(e, n, t) {
                if (e || (e = new re([], {})), 0 === e.segments.length && e.hasChildren()) return ys(e, n, t);
                const r = function RL(e, n, t) {
                        let r = 0,
                            o = n;
                        const i = {
                            match: !1,
                            pathIndex: 0,
                            commandIndex: 0
                        };
                        for (; o < e.segments.length;) {
                            if (r >= t.length) return i;
                            const s = e.segments[o],
                                a = t[r];
                            if (ms(a)) break;
                            const l = `${a}`,
                                c = r < t.length - 1 ? t[r + 1] : null;
                            if (o > 0 && void 0 === l) break;
                            if (l && c && "object" == typeof c && void 0 === c.outlets) {
                                if (!ob(l, c, s)) return i;
                                r += 2
                            } else {
                                if (!ob(l, {}, s)) return i;
                                r++
                            }
                            o++
                        }
                        return {
                            match: !0,
                            pathIndex: o,
                            commandIndex: r
                        }
                    }(e, n, t),
                    o = t.slice(r.commandIndex);
                if (r.match && r.pathIndex < e.segments.length) {
                    const i = new re(e.segments.slice(0, r.pathIndex), {});
                    return i.children[G] = new re(e.segments.slice(r.pathIndex), e.children), ys(i, 0, o)
                }
                return r.match && 0 === o.length ? new re(e.segments, {}) : r.match && !e.hasChildren() ? Ch(e, n, t) : r.match ? ys(e, 0, o) : Ch(e, n, t)
            }

            function ys(e, n, t) {
                if (0 === t.length) return new re(e.segments, {}); {
                    const r = function NL(e) {
                            return ms(e[0]) ? e[0].outlets : {
                                [G]: e
                            }
                        }(t),
                        o = {};
                    if (Object.keys(r).some(i => i !== G) && e.children[G] && 1 === e.numberOfChildren && 0 === e.children[G].segments.length) {
                        const i = ys(e.children[G], n, t);
                        return new re(e.segments, i.children)
                    }
                    return Object.entries(r).forEach(([i, s]) => {
                        "string" == typeof s && (s = [s]), null !== s && (o[i] = nb(e.children[i], n, s))
                    }), Object.entries(e.children).forEach(([i, s]) => {
                        void 0 === r[i] && (o[i] = s)
                    }), new re(e.segments, o)
                }
            }

            function Ch(e, n, t) {
                const r = e.segments.slice(0, n);
                let o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (ms(i)) {
                        const l = FL(i.outlets);
                        return new re(r, l)
                    }
                    if (0 === o && zl(t[0])) {
                        r.push(new hs(e.segments[n].path, rb(t[0]))), o++;
                        continue
                    }
                    const s = ms(i) ? i.outlets[G] : `${i}`,
                        a = o < t.length - 1 ? t[o + 1] : null;
                    s && a && zl(a) ? (r.push(new hs(s, rb(a))), o += 2) : (r.push(new hs(s, {})), o++)
                }
                return new re(r, {})
            }

            function FL(e) {
                const n = {};
                return Object.entries(e).forEach(([t, r]) => {
                    "string" == typeof r && (r = [r]), null !== r && (n[t] = Ch(new re([], {}), 0, r))
                }), n
            }

            function rb(e) {
                const n = {};
                return Object.entries(e).forEach(([t, r]) => n[t] = `${r}`), n
            }

            function ob(e, n, t) {
                return e == t.path && mn(n, t.parameters)
            }
            const vs = "imperative";
            class yn {
                constructor(n, t) {
                    this.id = n, this.url = t
                }
            }
            class ql extends yn {
                constructor(n, t, r = "imperative", o = null) {
                    super(n, t), this.type = 0, this.navigationTrigger = r, this.restoredState = o
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
            }
            class ir extends yn {
                constructor(n, t, r) {
                    super(n, t), this.urlAfterRedirects = r, this.type = 1
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                }
            }
            class _s extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = 2
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
            }
            class zo extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = 16
                }
            }
            class Wl extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.error = r, this.target = o, this.type = 3
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                }
            }
            class ib extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 4
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class LL extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 7
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class VL extends yn {
                constructor(n, t, r, o, i) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = 8
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                }
            }
            class jL extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 5
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class $L extends yn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 6
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class BL {
                constructor(n) {
                    this.route = n, this.type = 9
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`
                }
            }
            class HL {
                constructor(n) {
                    this.route = n, this.type = 10
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
            }
            class UL {
                constructor(n) {
                    this.snapshot = n, this.type = 11
                }
                toString() {
                    return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class zL {
                constructor(n) {
                    this.snapshot = n, this.type = 12
                }
                toString() {
                    return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class GL {
                constructor(n) {
                    this.snapshot = n, this.type = 13
                }
                toString() {
                    return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class qL {
                constructor(n) {
                    this.snapshot = n, this.type = 14
                }
                toString() {
                    return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class sb {
                constructor(n, t, r) {
                    this.routerEvent = n, this.position = t, this.anchor = r, this.type = 15
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                }
            }
            class Dh {}
            class wh {
                constructor(n) {
                    this.url = n
                }
            }
            class WL {
                constructor() {
                    this.outlet = null, this.route = null, this.injector = null, this.children = new Cs, this.attachRef = null
                }
            }
            let Cs = (() => {
                class e {
                    constructor() {
                        this.contexts = new Map
                    }
                    onChildOutletCreated(t, r) {
                        const o = this.getOrCreateContext(t);
                        o.outlet = r, this.contexts.set(t, o)
                    }
                    onChildOutletDestroyed(t) {
                        const r = this.getContext(t);
                        r && (r.outlet = null, r.attachRef = null)
                    }
                    onOutletDeactivated() {
                        const t = this.contexts;
                        return this.contexts = new Map, t
                    }
                    onOutletReAttached(t) {
                        this.contexts = t
                    }
                    getOrCreateContext(t) {
                        let r = this.getContext(t);
                        return r || (r = new WL, this.contexts.set(t, r)), r
                    }
                    getContext(t) {
                        return this.contexts.get(t) || null
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class ab {
                constructor(n) {
                    this._root = n
                }
                get root() {
                    return this._root.value
                }
                parent(n) {
                    const t = this.pathFromRoot(n);
                    return t.length > 1 ? t[t.length - 2] : null
                }
                children(n) {
                    const t = bh(n, this._root);
                    return t ? t.children.map(r => r.value) : []
                }
                firstChild(n) {
                    const t = bh(n, this._root);
                    return t && t.children.length > 0 ? t.children[0].value : null
                }
                siblings(n) {
                    const t = Eh(n, this._root);
                    return t.length < 2 ? [] : t[t.length - 2].children.map(o => o.value).filter(o => o !== n)
                }
                pathFromRoot(n) {
                    return Eh(n, this._root).map(t => t.value)
                }
            }

            function bh(e, n) {
                if (e === n.value) return n;
                for (const t of n.children) {
                    const r = bh(e, t);
                    if (r) return r
                }
                return null
            }

            function Eh(e, n) {
                if (e === n.value) return [n];
                for (const t of n.children) {
                    const r = Eh(e, t);
                    if (r.length) return r.unshift(n), r
                }
                return []
            }
            class Fn {
                constructor(n, t) {
                    this.value = n, this.children = t
                }
                toString() {
                    return `TreeNode(${this.value})`
                }
            }

            function Go(e) {
                const n = {};
                return e && e.children.forEach(t => n[t.value.outlet] = t), n
            }
            class lb extends ab {
                constructor(n, t) {
                    super(n), this.snapshot = t, Mh(this, n)
                }
                toString() {
                    return this.snapshot.toString()
                }
            }

            function cb(e, n) {
                const t = function ZL(e, n) {
                        const s = new Zl([], {}, {}, "", {}, G, n, null, {});
                        return new db("", new Fn(s, []))
                    }(0, n),
                    r = new Rt([new hs("", {})]),
                    o = new Rt({}),
                    i = new Rt({}),
                    s = new Rt({}),
                    a = new Rt(""),
                    l = new qo(r, o, s, a, i, G, n, t.root);
                return l.snapshot = t.root, new lb(new Fn(l, []), t)
            }
            class qo {
                constructor(n, t, r, o, i, s, a, l) {
                    this.urlSubject = n, this.paramsSubject = t, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = l, this.title = this.dataSubject ? .pipe(Q(c => c[fs])) ? ? k(void 0), this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = this.params.pipe(Q(n => Ho(n)))), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(Q(n => Ho(n)))), this._queryParamMap
                }
                toString() {
                    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
                }
            }

            function ub(e, n = "emptyOnly") {
                const t = e.pathFromRoot;
                let r = 0;
                if ("always" !== n)
                    for (r = t.length - 1; r >= 1;) {
                        const o = t[r],
                            i = t[r - 1];
                        if (o.routeConfig && "" === o.routeConfig.path) r--;
                        else {
                            if (i.component) break;
                            r--
                        }
                    }
                return function YL(e) {
                    return e.reduce((n, t) => ({
                        params: { ...n.params,
                            ...t.params
                        },
                        data: { ...n.data,
                            ...t.data
                        },
                        resolve: { ...t.data,
                            ...n.resolve,
                            ...t.routeConfig ? .data,
                            ...t._resolvedData
                        }
                    }), {
                        params: {},
                        data: {},
                        resolve: {}
                    })
                }(t.slice(r))
            }
            class Zl {
                get title() {
                    return this.data ? .[fs]
                }
                constructor(n, t, r, o, i, s, a, l, c) {
                    this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = l, this._resolve = c
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = Ho(this.params)), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = Ho(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
                }
            }
            class db extends ab {
                constructor(n, t) {
                    super(t), this.url = n, Mh(this, t)
                }
                toString() {
                    return fb(this._root)
                }
            }

            function Mh(e, n) {
                n.value._routerState = e, n.children.forEach(t => Mh(e, t))
            }

            function fb(e) {
                const n = e.children.length > 0 ? ` { ${e.children.map(fb).join(", ")} } ` : "";
                return `${e.value}${n}`
            }

            function Ih(e) {
                if (e.snapshot) {
                    const n = e.snapshot,
                        t = e._futureSnapshot;
                    e.snapshot = t, mn(n.queryParams, t.queryParams) || e.queryParamsSubject.next(t.queryParams), n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment), mn(n.params, t.params) || e.paramsSubject.next(t.params),
                        function dL(e, n) {
                            if (e.length !== n.length) return !1;
                            for (let t = 0; t < e.length; ++t)
                                if (!mn(e[t], n[t])) return !1;
                            return !0
                        }(n.url, t.url) || e.urlSubject.next(t.url), mn(n.data, t.data) || e.dataSubject.next(t.data)
                } else e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data)
            }

            function xh(e, n) {
                const t = mn(e.params, n.params) && function gL(e, n) {
                    return Or(e, n) && e.every((t, r) => mn(t.parameters, n[r].parameters))
                }(e.url, n.url);
                return t && !(!e.parent != !n.parent) && (!e.parent || xh(e.parent, n.parent))
            }
            let Sh = (() => {
                class e {
                    constructor() {
                        this.activated = null, this._activatedRoute = null, this.name = G, this.activateEvents = new ye, this.deactivateEvents = new ye, this.attachEvents = new ye, this.detachEvents = new ye, this.parentContexts = M(Cs), this.location = M(kt), this.changeDetector = M(il), this.environmentInjector = M(Tt), this.inputBinder = M(Yl, {
                            optional: !0
                        }), this.supportsBindingToComponentInputs = !0
                    }
                    get activatedComponentRef() {
                        return this.activated
                    }
                    ngOnChanges(t) {
                        if (t.name) {
                            const {
                                firstChange: r,
                                previousValue: o
                            } = t.name;
                            if (r) return;
                            this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                        }
                    }
                    ngOnDestroy() {
                        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder ? .unsubscribeFromRouteData(this)
                    }
                    isTrackedInParentContexts(t) {
                        return this.parentContexts.getContext(t) ? .outlet === this
                    }
                    ngOnInit() {
                        this.initializeOutletWithName()
                    }
                    initializeOutletWithName() {
                        if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                        const t = this.parentContexts.getContext(this.name);
                        t ? .route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.injector))
                    }
                    get isActivated() {
                        return !!this.activated
                    }
                    get component() {
                        if (!this.activated) throw new D(4012, !1);
                        return this.activated.instance
                    }
                    get activatedRoute() {
                        if (!this.activated) throw new D(4012, !1);
                        return this._activatedRoute
                    }
                    get activatedRouteData() {
                        return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                    }
                    detach() {
                        if (!this.activated) throw new D(4012, !1);
                        this.location.detach();
                        const t = this.activated;
                        return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(t.instance), t
                    }
                    attach(t, r) {
                        this.activated = t, this._activatedRoute = r, this.location.insert(t.hostView), this.inputBinder ? .bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(t.instance)
                    }
                    deactivate() {
                        if (this.activated) {
                            const t = this.component;
                            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
                        }
                    }
                    activateWith(t, r) {
                        if (this.isActivated) throw new D(4013, !1);
                        this._activatedRoute = t;
                        const o = this.location,
                            s = t.snapshot.component,
                            a = this.parentContexts.getOrCreateContext(this.name).children,
                            l = new QL(t, a, o.injector);
                        this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: l,
                            environmentInjector: r ? ? this.environmentInjector
                        }), this.changeDetector.markForCheck(), this.inputBinder ? .bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275dir = $({
                        type: e,
                        selectors: [
                            ["router-outlet"]
                        ],
                        inputs: {
                            name: "name"
                        },
                        outputs: {
                            activateEvents: "activate",
                            deactivateEvents: "deactivate",
                            attachEvents: "attach",
                            detachEvents: "detach"
                        },
                        exportAs: ["outlet"],
                        standalone: !0,
                        features: [Mt]
                    })
                }
                return e
            })();
            class QL {
                constructor(n, t, r) {
                    this.route = n, this.childContexts = t, this.parent = r
                }
                get(n, t) {
                    return n === qo ? this.route : n === Cs ? this.childContexts : this.parent.get(n, t)
                }
            }
            const Yl = new E("");
            let hb = (() => {
                class e {
                    constructor() {
                        this.outletDataSubscriptions = new Map
                    }
                    bindActivatedRouteToOutletComponent(t) {
                        this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t)
                    }
                    unsubscribeFromRouteData(t) {
                        this.outletDataSubscriptions.get(t) ? .unsubscribe(), this.outletDataSubscriptions.delete(t)
                    }
                    subscribeToRouteData(t) {
                        const {
                            activatedRoute: r
                        } = t, o = fh([r.queryParams, r.params, r.data]).pipe(Ft(([i, s, a], l) => (a = { ...i,
                            ...s,
                            ...a
                        }, 0 === l ? k(a) : Promise.resolve(a)))).subscribe(i => {
                            if (!t.isActivated || !t.activatedComponentRef || t.activatedRoute !== r || null === r.component) return void this.unsubscribeFromRouteData(t);
                            const s = function Kk(e) {
                                const n = Z(e);
                                if (!n) return null;
                                const t = new Ni(n);
                                return {
                                    get selector() {
                                        return t.selector
                                    },
                                    get type() {
                                        return t.componentType
                                    },
                                    get inputs() {
                                        return t.inputs
                                    },
                                    get outputs() {
                                        return t.outputs
                                    },
                                    get ngContentSelectors() {
                                        return t.ngContentSelectors
                                    },
                                    get isStandalone() {
                                        return n.standalone
                                    },
                                    get isSignal() {
                                        return n.signals
                                    }
                                }
                            }(r.component);
                            if (s)
                                for (const {
                                        templateName: a
                                    } of s.inputs) t.activatedComponentRef.setInput(a, i[a]);
                            else this.unsubscribeFromRouteData(t)
                        });
                        this.outletDataSubscriptions.set(t, o)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function Ds(e, n, t) {
                if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
                    const r = t.value;
                    r._futureSnapshot = n.value;
                    const o = function JL(e, n, t) {
                        return n.children.map(r => {
                            for (const o of t.children)
                                if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Ds(e, r, o);
                            return Ds(e, r)
                        })
                    }(e, n, t);
                    return new Fn(r, o)
                } {
                    if (e.shouldAttach(n.value)) {
                        const i = e.retrieve(n.value);
                        if (null !== i) {
                            const s = i.route;
                            return s.value._futureSnapshot = n.value, s.children = n.children.map(a => Ds(e, a)), s
                        }
                    }
                    const r = function KL(e) {
                            return new qo(new Rt(e.url), new Rt(e.params), new Rt(e.queryParams), new Rt(e.fragment), new Rt(e.data), e.outlet, e.component, e)
                        }(n.value),
                        o = n.children.map(i => Ds(e, i));
                    return new Fn(r, o)
                }
            }
            const Ah = "ngNavigationCancelingError";

            function pb(e, n) {
                const {
                    redirectTo: t,
                    navigationBehaviorOptions: r
                } = Pr(n) ? {
                    redirectTo: n,
                    navigationBehaviorOptions: void 0
                } : n, o = gb(!1, 0, n);
                return o.url = t, o.navigationBehaviorOptions = r, o
            }

            function gb(e, n, t) {
                const r = new Error("NavigationCancelingError: " + (e || ""));
                return r[Ah] = !0, r.cancellationCode = n, t && (r.url = t), r
            }

            function mb(e) {
                return e && e[Ah]
            }
            let yb = (() => {
                class e {
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275cmp = wn({
                        type: e,
                        selectors: [
                            ["ng-component"]
                        ],
                        standalone: !0,
                        features: [j_],
                        decls: 1,
                        vars: 0,
                        template: function(r, o) {
                            1 & r && he(0, "router-outlet")
                        },
                        dependencies: [Sh],
                        encapsulation: 2
                    })
                }
                return e
            })();

            function Th(e) {
                const n = e.children && e.children.map(Th),
                    t = n ? { ...e,
                        children: n
                    } : { ...e
                    };
                return !t.component && !t.loadComponent && (n || t.loadChildren) && t.outlet && t.outlet !== G && (t.component = yb), t
            }

            function Kt(e) {
                return e.outlet || G
            }

            function ws(e) {
                if (!e) return null;
                if (e.routeConfig ? ._injector) return e.routeConfig._injector;
                for (let n = e.parent; n; n = n.parent) {
                    const t = n.routeConfig;
                    if (t ? ._loadedInjector) return t._loadedInjector;
                    if (t ? ._injector) return t._injector
                }
                return null
            }
            class aV {
                constructor(n, t, r, o, i) {
                    this.routeReuseStrategy = n, this.futureState = t, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i
                }
                activate(n) {
                    const t = this.futureState._root,
                        r = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(t, r, n), Ih(this.futureState.root), this.activateChildRoutes(t, r, n)
                }
                deactivateChildRoutes(n, t, r) {
                    const o = Go(t);
                    n.children.forEach(i => {
                        const s = i.value.outlet;
                        this.deactivateRoutes(i, o[s], r), delete o[s]
                    }), Object.values(o).forEach(i => {
                        this.deactivateRouteAndItsChildren(i, r)
                    })
                }
                deactivateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (o === i)
                        if (o.component) {
                            const s = r.getContext(o.outlet);
                            s && this.deactivateChildRoutes(n, t, s.children)
                        } else this.deactivateChildRoutes(n, t, r);
                    else i && this.deactivateRouteAndItsChildren(t, r)
                }
                deactivateRouteAndItsChildren(n, t) {
                    n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot) ? this.detachAndStoreRouteSubtree(n, t) : this.deactivateRouteAndOutlet(n, t)
                }
                detachAndStoreRouteSubtree(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = Go(n);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    if (r && r.outlet) {
                        const s = r.outlet.detach(),
                            a = r.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(n.value.snapshot, {
                            componentRef: s,
                            route: n,
                            contexts: a
                        })
                    }
                }
                deactivateRouteAndOutlet(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = Go(n);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
                }
                activateChildRoutes(n, t, r) {
                    const o = Go(t);
                    n.children.forEach(i => {
                        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new qL(i.value.snapshot))
                    }), n.children.length && this.forwardEvent(new zL(n.value.snapshot))
                }
                activateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (Ih(o), o === i)
                        if (o.component) {
                            const s = r.getOrCreateContext(o.outlet);
                            this.activateChildRoutes(n, t, s.children)
                        } else this.activateChildRoutes(n, t, r);
                    else if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                            const a = this.routeReuseStrategy.retrieve(o.snapshot);
                            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Ih(a.route.value), this.activateChildRoutes(n, null, s.children)
                        } else {
                            const a = ws(o.snapshot);
                            s.attachRef = null, s.route = o, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(n, null, s.children)
                        }
                    } else this.activateChildRoutes(n, null, r)
                }
            }
            class vb {
                constructor(n) {
                    this.path = n, this.route = this.path[this.path.length - 1]
                }
            }
            class Ql {
                constructor(n, t) {
                    this.component = n, this.route = t
                }
            }

            function lV(e, n, t) {
                const r = e._root;
                return bs(r, n ? n._root : null, t, [r.value])
            }

            function Wo(e, n) {
                const t = Symbol(),
                    r = n.get(e, t);
                return r === t ? "function" != typeof e || function cM(e) {
                    return null !== Rs(e)
                }(e) ? n.get(e) : e : r
            }

            function bs(e, n, t, r, o = {
                canDeactivateChecks: [],
                canActivateChecks: []
            }) {
                const i = Go(n);
                return e.children.forEach(s => {
                    (function uV(e, n, t, r, o = {
                        canDeactivateChecks: [],
                        canActivateChecks: []
                    }) {
                        const i = e.value,
                            s = n ? n.value : null,
                            a = t ? t.getContext(e.value.outlet) : null;
                        if (s && i.routeConfig === s.routeConfig) {
                            const l = function dV(e, n, t) {
                                if ("function" == typeof t) return t(e, n);
                                switch (t) {
                                    case "pathParamsChange":
                                        return !Or(e.url, n.url);
                                    case "pathParamsOrQueryParamsChange":
                                        return !Or(e.url, n.url) || !mn(e.queryParams, n.queryParams);
                                    case "always":
                                        return !0;
                                    case "paramsOrQueryParamsChange":
                                        return !xh(e, n) || !mn(e.queryParams, n.queryParams);
                                    default:
                                        return !xh(e, n)
                                }
                            }(s, i, i.routeConfig.runGuardsAndResolvers);
                            l ? o.canActivateChecks.push(new vb(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), bs(e, n, i.component ? a ? a.children : null : t, r, o), l && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new Ql(a.outlet.component, s))
                        } else s && Es(n, a, o), o.canActivateChecks.push(new vb(r)), bs(e, null, i.component ? a ? a.children : null : t, r, o)
                    })(s, i[s.value.outlet], t, r.concat([s.value]), o), delete i[s.value.outlet]
                }), Object.entries(i).forEach(([s, a]) => Es(a, t.getContext(s), o)), o
            }

            function Es(e, n, t) {
                const r = Go(e),
                    o = e.value;
                Object.entries(r).forEach(([i, s]) => {
                    Es(s, o.component ? n ? n.children.getContext(i) : null : n, t)
                }), t.canDeactivateChecks.push(new Ql(o.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, o))
            }

            function Ms(e) {
                return "function" == typeof e
            }

            function _b(e) {
                return e instanceof Vl || "EmptyError" === e ? .name
            }
            const Xl = Symbol("INITIAL_VALUE");

            function Zo() {
                return Ft(e => fh(e.map(n => n.pipe(Bo(1), F0(Xl)))).pipe(Q(n => {
                    for (const t of n)
                        if (!0 !== t) {
                            if (t === Xl) return Xl;
                            if (!1 === t || t instanceof Uo) return t
                        }
                    return !0
                }), Rn(n => n !== Xl), Bo(1)))
            }

            function Cb(e) {
                return function pE(...e) {
                    return Zh(e)
                }(Xe(n => {
                    if (Pr(n)) throw pb(0, n)
                }), Q(n => !0 === n))
            }
            class Jl {
                constructor(n) {
                    this.segmentGroup = n || null
                }
            }
            class Db {
                constructor(n) {
                    this.urlTree = n
                }
            }

            function Yo(e) {
                return ds(new Jl(e))
            }

            function wb(e) {
                return ds(new Db(e))
            }
            class OV {
                constructor(n, t) {
                    this.urlSerializer = n, this.urlTree = t
                }
                noMatchError(n) {
                    return new D(4002, !1)
                }
                lineralizeSegments(n, t) {
                    let r = [],
                        o = t.root;
                    for (;;) {
                        if (r = r.concat(o.segments), 0 === o.numberOfChildren) return k(r);
                        if (o.numberOfChildren > 1 || !o.children[G]) return ds(new D(4e3, !1));
                        o = o.children[G]
                    }
                }
                applyRedirectCommands(n, t, r) {
                    return this.applyRedirectCreateUrlTree(t, this.urlSerializer.parse(t), n, r)
                }
                applyRedirectCreateUrlTree(n, t, r, o) {
                    const i = this.createSegmentGroup(n, t.root, r, o);
                    return new Uo(i, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment)
                }
                createQueryParams(n, t) {
                    const r = {};
                    return Object.entries(n).forEach(([o, i]) => {
                        if ("string" == typeof i && i.startsWith(":")) {
                            const a = i.substring(1);
                            r[o] = t[a]
                        } else r[o] = i
                    }), r
                }
                createSegmentGroup(n, t, r, o) {
                    const i = this.createSegments(n, t.segments, r, o);
                    let s = {};
                    return Object.entries(t.children).forEach(([a, l]) => {
                        s[a] = this.createSegmentGroup(n, l, r, o)
                    }), new re(i, s)
                }
                createSegments(n, t, r, o) {
                    return t.map(i => i.path.startsWith(":") ? this.findPosParam(n, i, o) : this.findOrReturn(i, r))
                }
                findPosParam(n, t, r) {
                    const o = r[t.path.substring(1)];
                    if (!o) throw new D(4001, !1);
                    return o
                }
                findOrReturn(n, t) {
                    let r = 0;
                    for (const o of t) {
                        if (o.path === n.path) return t.splice(r), o;
                        r++
                    }
                    return n
                }
            }
            const Oh = {
                matched: !1,
                consumedSegments: [],
                remainingSegments: [],
                parameters: {},
                positionalParamSegments: {}
            };

            function PV(e, n, t, r, o) {
                const i = Ph(e, n, t);
                return i.matched ? (r = function tV(e, n) {
                    return e.providers && !e._injector && (e._injector = kd(e.providers, n, `Route: ${e.path}`)), e._injector ? ? n
                }(n, r), function SV(e, n, t, r) {
                    const o = n.canMatch;
                    return o && 0 !== o.length ? k(o.map(s => {
                        const a = Wo(s, e);
                        return or(function yV(e) {
                            return e && Ms(e.canMatch)
                        }(a) ? a.canMatch(n, t) : e.runInContext(() => a(n, t)))
                    })).pipe(Zo(), Cb()) : k(!0)
                }(r, n, t).pipe(Q(s => !0 === s ? i : { ...Oh
                }))) : k(i)
            }

            function Ph(e, n, t) {
                if ("" === n.path) return "full" === n.pathMatch && (e.hasChildren() || t.length > 0) ? { ...Oh
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: t,
                    parameters: {},
                    positionalParamSegments: {}
                };
                const o = (n.matcher || uL)(t, e, n);
                if (!o) return { ...Oh
                };
                const i = {};
                Object.entries(o.posParams ? ? {}).forEach(([a, l]) => {
                    i[a] = l.path
                });
                const s = o.consumed.length > 0 ? { ...i,
                    ...o.consumed[o.consumed.length - 1].parameters
                } : i;
                return {
                    matched: !0,
                    consumedSegments: o.consumed,
                    remainingSegments: t.slice(o.consumed.length),
                    parameters: s,
                    positionalParamSegments: o.posParams ? ? {}
                }
            }

            function bb(e, n, t, r) {
                return t.length > 0 && function RV(e, n, t) {
                    return t.some(r => Kl(e, n, r) && Kt(r) !== G)
                }(e, t, r) ? {
                    segmentGroup: new re(n, NV(r, new re(t, e.children))),
                    slicedSegments: []
                } : 0 === t.length && function FV(e, n, t) {
                    return t.some(r => Kl(e, n, r))
                }(e, t, r) ? {
                    segmentGroup: new re(e.segments, kV(e, 0, t, r, e.children)),
                    slicedSegments: t
                } : {
                    segmentGroup: new re(e.segments, e.children),
                    slicedSegments: t
                }
            }

            function kV(e, n, t, r, o) {
                const i = {};
                for (const s of r)
                    if (Kl(e, t, s) && !o[Kt(s)]) {
                        const a = new re([], {});
                        i[Kt(s)] = a
                    }
                return { ...o,
                    ...i
                }
            }

            function NV(e, n) {
                const t = {};
                t[G] = n;
                for (const r of e)
                    if ("" === r.path && Kt(r) !== G) {
                        const o = new re([], {});
                        t[Kt(r)] = o
                    }
                return t
            }

            function Kl(e, n, t) {
                return (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) && "" === t.path
            }
            class $V {
                constructor(n, t, r, o, i, s, a) {
                    this.injector = n, this.configLoader = t, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.allowRedirects = !0, this.applyRedirects = new OV(this.urlSerializer, this.urlTree)
                }
                noMatchError(n) {
                    return new D(4002, !1)
                }
                recognize() {
                    const n = bb(this.urlTree.root, [], [], this.config).segmentGroup;
                    return this.processSegmentGroup(this.injector, this.config, n, G).pipe(Tr(t => {
                        if (t instanceof Db) return this.allowRedirects = !1, this.urlTree = t.urlTree, this.match(t.urlTree);
                        throw t instanceof Jl ? this.noMatchError(t) : t
                    }), Q(t => {
                        const r = new Zl([], Object.freeze({}), Object.freeze({ ...this.urlTree.queryParams
                            }), this.urlTree.fragment, {}, G, this.rootComponentType, null, {}),
                            o = new Fn(r, t),
                            i = new db("", o),
                            s = function TL(e, n, t = null, r = null) {
                                return K0(J0(e), n, t, r)
                            }(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                        return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), this.inheritParamsAndData(i._root), {
                            state: i,
                            tree: s
                        }
                    }))
                }
                match(n) {
                    return this.processSegmentGroup(this.injector, this.config, n.root, G).pipe(Tr(r => {
                        throw r instanceof Jl ? this.noMatchError(r) : r
                    }))
                }
                inheritParamsAndData(n) {
                    const t = n.value,
                        r = ub(t, this.paramsInheritanceStrategy);
                    t.params = Object.freeze(r.params), t.data = Object.freeze(r.data), n.children.forEach(o => this.inheritParamsAndData(o))
                }
                processSegmentGroup(n, t, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.processChildren(n, t, r) : this.processSegment(n, t, r, r.segments, o, !0)
                }
                processChildren(n, t, r) {
                    const o = [];
                    for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
                    return Oe(o).pipe(Vo(i => {
                        const s = r.children[i],
                            a = function iV(e, n) {
                                const t = e.filter(r => Kt(r) === n);
                                return t.push(...e.filter(r => Kt(r) !== n)), t
                            }(t, i);
                        return this.processSegmentGroup(n, a, s, i)
                    }), function aL(e, n) {
                        return Te(function sL(e, n, t, r, o) {
                            return (i, s) => {
                                let a = t,
                                    l = n,
                                    c = 0;
                                i.subscribe(xe(s, u => {
                                    const d = c++;
                                    l = a ? e(l, u, d) : (a = !0, u), r && s.next(l)
                                }, o && (() => {
                                    a && s.next(l), s.complete()
                                })))
                            }
                        }(e, n, arguments.length >= 2, !0))
                    }((i, s) => (i.push(...s), i)), jl(null), function lL(e, n) {
                        const t = arguments.length >= 2;
                        return r => r.pipe(e ? Rn((o, i) => e(o, i, r)) : Vn, gh(1), t ? jl(n) : L0(() => new Vl))
                    }(), Le(i => {
                        if (null === i) return Yo(r);
                        const s = Eb(i);
                        return function BV(e) {
                            e.sort((n, t) => n.value.outlet === G ? -1 : t.value.outlet === G ? 1 : n.value.outlet.localeCompare(t.value.outlet))
                        }(s), k(s)
                    }))
                }
                processSegment(n, t, r, o, i, s) {
                    return Oe(t).pipe(Vo(a => this.processSegmentAgainstRoute(a._injector ? ? n, t, a, r, o, i, s).pipe(Tr(l => {
                        if (l instanceof Jl) return k(null);
                        throw l
                    }))), rr(a => !!a), Tr(a => {
                        if (_b(a)) return function VV(e, n, t) {
                            return 0 === n.length && !e.children[t]
                        }(r, o, i) ? k([]) : Yo(r);
                        throw a
                    }))
                }
                processSegmentAgainstRoute(n, t, r, o, i, s, a) {
                    return function LV(e, n, t, r) {
                        return !!(Kt(e) === r || r !== G && Kl(n, t, e)) && ("**" === e.path || Ph(n, e, t).matched)
                    }(r, o, i, s) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(n, o, r, i, s, a) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(n, o, t, r, i, s) : Yo(o) : Yo(o)
                }
                expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
                    return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s)
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
                    const i = this.applyRedirects.applyRedirectCommands([], r.redirectTo, {});
                    return r.redirectTo.startsWith("/") ? wb(i) : this.applyRedirects.lineralizeSegments(r, i).pipe(Le(s => {
                        const a = new re(s, {});
                        return this.processSegment(n, t, a, s, o, !1)
                    }))
                }
                expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
                    const {
                        matched: a,
                        consumedSegments: l,
                        remainingSegments: c,
                        positionalParamSegments: u
                    } = Ph(t, o, i);
                    if (!a) return Yo(t);
                    const d = this.applyRedirects.applyRedirectCommands(l, o.redirectTo, u);
                    return o.redirectTo.startsWith("/") ? wb(d) : this.applyRedirects.lineralizeSegments(o, d).pipe(Le(f => this.processSegment(n, r, t, f.concat(c), s, !1)))
                }
                matchSegmentAgainstRoute(n, t, r, o, i, s) {
                    let a;
                    if ("**" === r.path) {
                        const l = o.length > 0 ? B0(o).parameters : {};
                        a = k({
                            snapshot: new Zl(o, l, Object.freeze({ ...this.urlTree.queryParams
                            }), this.urlTree.fragment, Mb(r), Kt(r), r.component ? ? r._loadedComponent ? ? null, r, Ib(r)),
                            consumedSegments: [],
                            remainingSegments: []
                        }), t.children = {}
                    } else a = PV(t, r, o, n).pipe(Q(({
                        matched: l,
                        consumedSegments: c,
                        remainingSegments: u,
                        parameters: d
                    }) => l ? {
                        snapshot: new Zl(c, d, Object.freeze({ ...this.urlTree.queryParams
                        }), this.urlTree.fragment, Mb(r), Kt(r), r.component ? ? r._loadedComponent ? ? null, r, Ib(r)),
                        consumedSegments: c,
                        remainingSegments: u
                    } : null));
                    return a.pipe(Ft(l => null === l ? Yo(t) : this.getChildConfig(n = r._injector ? ? n, r, o).pipe(Ft(({
                        routes: c
                    }) => {
                        const u = r._loadedInjector ? ? n,
                            {
                                snapshot: d,
                                consumedSegments: f,
                                remainingSegments: h
                            } = l,
                            {
                                segmentGroup: p,
                                slicedSegments: g
                            } = bb(t, f, h, c);
                        if (0 === g.length && p.hasChildren()) return this.processChildren(u, c, p).pipe(Q(v => null === v ? null : [new Fn(d, v)]));
                        if (0 === c.length && 0 === g.length) return k([new Fn(d, [])]);
                        const y = Kt(r) === i;
                        return this.processSegment(u, c, p, g, y ? G : i, !0).pipe(Q(v => [new Fn(d, v)]))
                    }))))
                }
                getChildConfig(n, t, r) {
                    return t.children ? k({
                        routes: t.children,
                        injector: n
                    }) : t.loadChildren ? void 0 !== t._loadedRoutes ? k({
                        routes: t._loadedRoutes,
                        injector: t._loadedInjector
                    }) : function xV(e, n, t, r) {
                        const o = n.canLoad;
                        return void 0 === o || 0 === o.length ? k(!0) : k(o.map(s => {
                            const a = Wo(s, e);
                            return or(function hV(e) {
                                return e && Ms(e.canLoad)
                            }(a) ? a.canLoad(n, t) : e.runInContext(() => a(n, t)))
                        })).pipe(Zo(), Cb())
                    }(n, t, r).pipe(Le(o => o ? this.configLoader.loadChildren(n, t).pipe(Xe(i => {
                        t._loadedRoutes = i.routes, t._loadedInjector = i.injector
                    })) : function TV(e) {
                        return ds(gb(!1, 3))
                    }())) : k({
                        routes: [],
                        injector: n
                    })
                }
            }

            function HV(e) {
                const n = e.value.routeConfig;
                return n && "" === n.path
            }

            function Eb(e) {
                const n = [],
                    t = new Set;
                for (const r of e) {
                    if (!HV(r)) {
                        n.push(r);
                        continue
                    }
                    const o = n.find(i => r.value.routeConfig === i.value.routeConfig);
                    void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r)
                }
                for (const r of t) {
                    const o = Eb(r.children);
                    n.push(new Fn(r.value, o))
                }
                return n.filter(r => !t.has(r))
            }

            function Mb(e) {
                return e.data || {}
            }

            function Ib(e) {
                return e.resolve || {}
            }

            function xb(e) {
                return "string" == typeof e.title || null === e.title
            }

            function kh(e) {
                return Ft(n => {
                    const t = e(n);
                    return t ? Oe(t).pipe(Q(() => n)) : k(n)
                })
            }
            const Qo = new E("ROUTES");
            let Nh = (() => {
                class e {
                    constructor() {
                        this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = M(PC)
                    }
                    loadComponent(t) {
                        if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
                        if (t._loadedComponent) return k(t._loadedComponent);
                        this.onLoadStartListener && this.onLoadStartListener(t);
                        const r = or(t.loadComponent()).pipe(Q(Sb), Xe(i => {
                                this.onLoadEndListener && this.onLoadEndListener(t), t._loadedComponent = i
                            }), ls(() => {
                                this.componentLoaders.delete(t)
                            })),
                            o = new R0(r, () => new Ue).pipe(ph());
                        return this.componentLoaders.set(t, o), o
                    }
                    loadChildren(t, r) {
                        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                        if (r._loadedRoutes) return k({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                        this.onLoadStartListener && this.onLoadStartListener(r);
                        const i = function YV(e, n, t, r) {
                                return or(e.loadChildren()).pipe(Q(Sb), Le(o => o instanceof L_ || Array.isArray(o) ? k(o) : Oe(n.compileModuleAsync(o))), Q(o => {
                                    r && r(e);
                                    let i, s, a = !1;
                                    return Array.isArray(o) ? (s = o, !0) : (i = o.create(t).injector, s = i.get(Qo, [], {
                                        optional: !0,
                                        self: !0
                                    }).flat()), {
                                        routes: s.map(Th),
                                        injector: i
                                    }
                                }))
                            }(r, this.compiler, t, this.onLoadEndListener).pipe(ls(() => {
                                this.childrenLoaders.delete(r)
                            })),
                            s = new R0(i, () => new Ue).pipe(ph());
                        return this.childrenLoaders.set(r, s), s
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function Sb(e) {
                return function QV(e) {
                    return e && "object" == typeof e && "default" in e
                }(e) ? e.default : e
            }
            let ec = (() => {
                class e {
                    get hasRequestedNavigation() {
                        return 0 !== this.navigationId
                    }
                    constructor() {
                        this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new Ue, this.transitionAbortSubject = new Ue, this.configLoader = M(Nh), this.environmentInjector = M(Tt), this.urlSerializer = M(ps), this.rootContexts = M(Cs), this.inputBindingEnabled = null !== M(Yl, {
                            optional: !0
                        }), this.navigationId = 0, this.afterPreactivation = () => k(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = o => this.events.next(new HL(o)), this.configLoader.onLoadStartListener = o => this.events.next(new BL(o))
                    }
                    complete() {
                        this.transitions ? .complete()
                    }
                    handleNavigationRequest(t) {
                        const r = ++this.navigationId;
                        this.transitions ? .next({ ...this.transitions.value,
                            ...t,
                            id: r
                        })
                    }
                    setupNavigations(t, r, o) {
                        return this.transitions = new Rt({
                            id: 0,
                            currentUrlTree: r,
                            currentRawUrl: r,
                            currentBrowserUrl: r,
                            extractedUrl: t.urlHandlingStrategy.extract(r),
                            urlAfterRedirects: t.urlHandlingStrategy.extract(r),
                            rawUrl: r,
                            extras: {},
                            resolve: null,
                            reject: null,
                            promise: Promise.resolve(!0),
                            source: vs,
                            restoredState: null,
                            currentSnapshot: o.snapshot,
                            targetSnapshot: null,
                            currentRouterState: o,
                            targetRouterState: null,
                            guards: {
                                canActivateChecks: [],
                                canDeactivateChecks: []
                            },
                            guardsResult: null
                        }), this.transitions.pipe(Rn(i => 0 !== i.id), Q(i => ({ ...i,
                            extractedUrl: t.urlHandlingStrategy.extract(i.rawUrl)
                        })), Ft(i => {
                            this.currentTransition = i;
                            let s = !1,
                                a = !1;
                            return k(i).pipe(Xe(l => {
                                this.currentNavigation = {
                                    id: l.id,
                                    initialUrl: l.rawUrl,
                                    extractedUrl: l.extractedUrl,
                                    trigger: l.source,
                                    extras: l.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? { ...this.lastSuccessfulNavigation,
                                        previousNavigation: null
                                    } : null
                                }
                            }), Ft(l => {
                                const c = l.currentBrowserUrl.toString(),
                                    u = !t.navigated || l.extractedUrl.toString() !== c || c !== l.currentUrlTree.toString();
                                if (!u && "reload" !== (l.extras.onSameUrlNavigation ? ? t.onSameUrlNavigation)) {
                                    const f = "";
                                    return this.events.next(new zo(l.id, this.urlSerializer.serialize(l.rawUrl), f, 0)), l.resolve(null), en
                                }
                                if (t.urlHandlingStrategy.shouldProcessUrl(l.rawUrl)) return k(l).pipe(Ft(f => {
                                    const h = this.transitions ? .getValue();
                                    return this.events.next(new ql(f.id, this.urlSerializer.serialize(f.extractedUrl), f.source, f.restoredState)), h !== this.transitions ? .getValue() ? en : Promise.resolve(f)
                                }), function UV(e, n, t, r, o, i) {
                                    return Le(s => function jV(e, n, t, r, o, i, s = "emptyOnly") {
                                        return new $V(e, n, t, r, o, s, i).recognize()
                                    }(e, n, t, r, s.extractedUrl, o, i).pipe(Q(({
                                        state: a,
                                        tree: l
                                    }) => ({ ...s,
                                        targetSnapshot: a,
                                        urlAfterRedirects: l
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.rootComponentType, t.config, this.urlSerializer, t.paramsInheritanceStrategy), Xe(f => {
                                    i.targetSnapshot = f.targetSnapshot, i.urlAfterRedirects = f.urlAfterRedirects, this.currentNavigation = { ...this.currentNavigation,
                                        finalUrl: f.urlAfterRedirects
                                    };
                                    const h = new ib(f.id, this.urlSerializer.serialize(f.extractedUrl), this.urlSerializer.serialize(f.urlAfterRedirects), f.targetSnapshot);
                                    this.events.next(h)
                                }));
                                if (u && t.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)) {
                                    const {
                                        id: f,
                                        extractedUrl: h,
                                        source: p,
                                        restoredState: g,
                                        extras: y
                                    } = l, v = new ql(f, this.urlSerializer.serialize(h), p, g);
                                    this.events.next(v);
                                    const m = cb(0, this.rootComponentType).snapshot;
                                    return this.currentTransition = i = { ...l,
                                        targetSnapshot: m,
                                        urlAfterRedirects: h,
                                        extras: { ...y,
                                            skipLocationChange: !1,
                                            replaceUrl: !1
                                        }
                                    }, k(i)
                                } {
                                    const f = "";
                                    return this.events.next(new zo(l.id, this.urlSerializer.serialize(l.extractedUrl), f, 1)), l.resolve(null), en
                                }
                            }), Xe(l => {
                                const c = new LL(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot);
                                this.events.next(c)
                            }), Q(l => (this.currentTransition = i = { ...l,
                                guards: lV(l.targetSnapshot, l.currentSnapshot, this.rootContexts)
                            }, i)), function _V(e, n) {
                                return Le(t => {
                                    const {
                                        targetSnapshot: r,
                                        currentSnapshot: o,
                                        guards: {
                                            canActivateChecks: i,
                                            canDeactivateChecks: s
                                        }
                                    } = t;
                                    return 0 === s.length && 0 === i.length ? k({ ...t,
                                        guardsResult: !0
                                    }) : function CV(e, n, t, r) {
                                        return Oe(e).pipe(Le(o => function IV(e, n, t, r, o) {
                                            const i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
                                            return i && 0 !== i.length ? k(i.map(a => {
                                                const l = ws(n) ? ? o,
                                                    c = Wo(a, l);
                                                return or(function mV(e) {
                                                    return e && Ms(e.canDeactivate)
                                                }(c) ? c.canDeactivate(e, n, t, r) : l.runInContext(() => c(e, n, t, r))).pipe(rr())
                                            })).pipe(Zo()) : k(!0)
                                        }(o.component, o.route, t, n, r)), rr(o => !0 !== o, !0))
                                    }(s, r, o, e).pipe(Le(a => a && function fV(e) {
                                        return "boolean" == typeof e
                                    }(a) ? function DV(e, n, t, r) {
                                        return Oe(n).pipe(Vo(o => hh(function bV(e, n) {
                                            return null !== e && n && n(new UL(e)), k(!0)
                                        }(o.route.parent, r), function wV(e, n) {
                                            return null !== e && n && n(new GL(e)), k(!0)
                                        }(o.route, r), function MV(e, n, t) {
                                            const r = n[n.length - 1],
                                                i = n.slice(0, n.length - 1).reverse().map(s => function cV(e) {
                                                    const n = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                    return n && 0 !== n.length ? {
                                                        node: e,
                                                        guards: n
                                                    } : null
                                                }(s)).filter(s => null !== s).map(s => N0(() => k(s.guards.map(l => {
                                                    const c = ws(s.node) ? ? t,
                                                        u = Wo(l, c);
                                                    return or(function gV(e) {
                                                        return e && Ms(e.canActivateChild)
                                                    }(u) ? u.canActivateChild(r, e) : c.runInContext(() => u(r, e))).pipe(rr())
                                                })).pipe(Zo())));
                                            return k(i).pipe(Zo())
                                        }(e, o.path, t), function EV(e, n, t) {
                                            const r = n.routeConfig ? n.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return k(!0);
                                            const o = r.map(i => N0(() => {
                                                const s = ws(n) ? ? t,
                                                    a = Wo(i, s);
                                                return or(function pV(e) {
                                                    return e && Ms(e.canActivate)
                                                }(a) ? a.canActivate(n, e) : s.runInContext(() => a(n, e))).pipe(rr())
                                            }));
                                            return k(o).pipe(Zo())
                                        }(e, o.route, t))), rr(o => !0 !== o, !0))
                                    }(r, i, e, n) : k(a)), Q(a => ({ ...t,
                                        guardsResult: a
                                    })))
                                })
                            }(this.environmentInjector, l => this.events.next(l)), Xe(l => {
                                if (i.guardsResult = l.guardsResult, Pr(l.guardsResult)) throw pb(0, l.guardsResult);
                                const c = new VL(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot, !!l.guardsResult);
                                this.events.next(c)
                            }), Rn(l => !!l.guardsResult || (this.cancelNavigationTransition(l, "", 3), !1)), kh(l => {
                                if (l.guards.canActivateChecks.length) return k(l).pipe(Xe(c => {
                                    const u = new jL(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(u)
                                }), Ft(c => {
                                    let u = !1;
                                    return k(c).pipe(function zV(e, n) {
                                        return Le(t => {
                                            const {
                                                targetSnapshot: r,
                                                guards: {
                                                    canActivateChecks: o
                                                }
                                            } = t;
                                            if (!o.length) return k(t);
                                            let i = 0;
                                            return Oe(o).pipe(Vo(s => function GV(e, n, t, r) {
                                                const o = e.routeConfig,
                                                    i = e._resolve;
                                                return void 0 !== o ? .title && !xb(o) && (i[fs] = o.title),
                                                    function qV(e, n, t, r) {
                                                        const o = function WV(e) {
                                                            return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                        }(e);
                                                        if (0 === o.length) return k({});
                                                        const i = {};
                                                        return Oe(o).pipe(Le(s => function ZV(e, n, t, r) {
                                                            const o = ws(n) ? ? r,
                                                                i = Wo(e, o);
                                                            return or(i.resolve ? i.resolve(n, t) : o.runInContext(() => i(n, t)))
                                                        }(e[s], n, t, r).pipe(rr(), Xe(a => {
                                                            i[s] = a
                                                        }))), gh(1), V0(i), Tr(s => _b(s) ? en : ds(s)))
                                                    }(i, e, n, r).pipe(Q(s => (e._resolvedData = s, e.data = ub(e, t).resolve, o && xb(o) && (e.data[fs] = o.title), null)))
                                            }(s.route, r, e, n)), Xe(() => i++), gh(1), Le(s => i === o.length ? k(t) : en))
                                        })
                                    }(t.paramsInheritanceStrategy, this.environmentInjector), Xe({
                                        next: () => u = !0,
                                        complete: () => {
                                            u || this.cancelNavigationTransition(c, "", 2)
                                        }
                                    }))
                                }), Xe(c => {
                                    const u = new $L(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(u)
                                }))
                            }), kh(l => {
                                const c = u => {
                                    const d = [];
                                    u.routeConfig ? .loadComponent && !u.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(u.routeConfig).pipe(Xe(f => {
                                        u.component = f
                                    }), Q(() => {})));
                                    for (const f of u.children) d.push(...c(f));
                                    return d
                                };
                                return fh(c(l.targetSnapshot.root)).pipe(jl(), Bo(1))
                            }), kh(() => this.afterPreactivation()), Q(l => {
                                const c = function XL(e, n, t) {
                                    const r = Ds(e, n._root, t ? t._root : void 0);
                                    return new lb(r, n)
                                }(t.routeReuseStrategy, l.targetSnapshot, l.currentRouterState);
                                return this.currentTransition = i = { ...l,
                                    targetRouterState: c
                                }, i
                            }), Xe(() => {
                                this.events.next(new Dh)
                            }), ((e, n, t, r) => Q(o => (new aV(n, o.targetRouterState, o.currentRouterState, t, r).activate(e), o)))(this.rootContexts, t.routeReuseStrategy, l => this.events.next(l), this.inputBindingEnabled), Bo(1), Xe({
                                next: l => {
                                    s = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new ir(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects))), t.titleStrategy ? .updateTitle(l.targetRouterState.snapshot), l.resolve(!0)
                                },
                                complete: () => {
                                    s = !0
                                }
                            }), j0(this.transitionAbortSubject.pipe(Xe(l => {
                                throw l
                            }))), ls(() => {
                                s || a || this.cancelNavigationTransition(i, "", 1), this.currentNavigation ? .id === i.id && (this.currentNavigation = null)
                            }), Tr(l => {
                                if (a = !0, mb(l)) this.events.next(new _s(i.id, this.urlSerializer.serialize(i.extractedUrl), l.message, l.cancellationCode)),
                                    function eV(e) {
                                        return mb(e) && Pr(e.url)
                                    }(l) ? this.events.next(new wh(l.url)) : i.resolve(!1);
                                else {
                                    this.events.next(new Wl(i.id, this.urlSerializer.serialize(i.extractedUrl), l, i.targetSnapshot ? ? void 0));
                                    try {
                                        i.resolve(t.errorHandler(l))
                                    } catch (c) {
                                        i.reject(c)
                                    }
                                }
                                return en
                            }))
                        }))
                    }
                    cancelNavigationTransition(t, r, o) {
                        const i = new _s(t.id, this.urlSerializer.serialize(t.extractedUrl), r, o);
                        this.events.next(i), t.resolve(!1)
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function Ab(e) {
                return e !== vs
            }
            let Tb = (() => {
                    class e {
                        buildTitle(t) {
                            let r, o = t.root;
                            for (; void 0 !== o;) r = this.getResolvedTitleForRoute(o) ? ? r, o = o.children.find(i => i.outlet === G);
                            return r
                        }
                        getResolvedTitleForRoute(t) {
                            return t.data[fs]
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function() {
                                return M(XV)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                XV = (() => {
                    class e extends Tb {
                        constructor(t) {
                            super(), this.title = t
                        }
                        updateTitle(t) {
                            const r = this.buildTitle(t);
                            void 0 !== r && this.title.setTitle(r)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(ow))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                JV = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function() {
                                return M(ej)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            class KV {
                shouldDetach(n) {
                    return !1
                }
                store(n, t) {}
                shouldAttach(n) {
                    return !1
                }
                retrieve(n) {
                    return null
                }
                shouldReuseRoute(n, t) {
                    return n.routeConfig === t.routeConfig
                }
            }
            let ej = (() => {
                class e extends KV {
                    static# e = this.\u0275fac = function() {
                        let t;
                        return function(o) {
                            return (t || (t = He(e)))(o || e)
                        }
                    }();
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const tc = new E("", {
                providedIn: "root",
                factory: () => ({})
            });
            let tj = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: function() {
                                return M(nj)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                nj = (() => {
                    class e {
                        shouldProcessUrl(t) {
                            return !0
                        }
                        extract(t) {
                            return t
                        }
                        merge(t, r) {
                            return t
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            var Is = function(e) {
                return e[e.COMPLETE = 0] = "COMPLETE", e[e.FAILED = 1] = "FAILED", e[e.REDIRECTING = 2] = "REDIRECTING", e
            }(Is || {});

            function Ob(e, n) {
                e.events.pipe(Rn(t => t instanceof ir || t instanceof _s || t instanceof Wl || t instanceof zo), Q(t => t instanceof ir || t instanceof zo ? Is.COMPLETE : t instanceof _s && (0 === t.code || 1 === t.code) ? Is.REDIRECTING : Is.FAILED), Rn(t => t !== Is.REDIRECTING), Bo(1)).subscribe(() => {
                    n()
                })
            }

            function rj(e) {
                throw e
            }

            function oj(e, n, t) {
                return n.parse("/")
            }
            const ij = {
                    paths: "exact",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "exact"
                },
                sj = {
                    paths: "subset",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "subset"
                };
            let Ut = (() => {
                class e {
                    get navigationId() {
                        return this.navigationTransitions.navigationId
                    }
                    get browserPageId() {
                        return "computed" !== this.canceledNavigationResolution ? this.currentPageId : this.location.getState() ? .\u0275routerPageId ? ? this.currentPageId
                    }
                    get events() {
                        return this._events
                    }
                    constructor() {
                        this.disposed = !1, this.currentPageId = 0, this.console = M(OC), this.isNgZoneEnabled = !1, this._events = new Ue, this.options = M(tc, {
                            optional: !0
                        }) || {}, this.pendingTasks = M(tl), this.errorHandler = this.options.errorHandler || rj, this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || oj, this.navigated = !1, this.lastSuccessfulId = -1, this.urlHandlingStrategy = M(tj), this.routeReuseStrategy = M(JV), this.titleStrategy = M(Tb), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.config = M(Qo, {
                            optional: !0
                        }) ? .flat() ? ? [], this.navigationTransitions = M(ec), this.urlSerializer = M(ps), this.location = M(gf), this.componentInputBindingEnabled = !!M(Yl, {
                            optional: !0
                        }), this.eventsSubscription = new dt, this.isNgZoneEnabled = M(se) instanceof se && se.isInAngularZone(), this.resetConfig(this.config), this.currentUrlTree = new Uo, this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = cb(0, null), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe(t => {
                            this.lastSuccessfulId = t.id, this.currentPageId = this.browserPageId
                        }, t => {
                            this.console.warn(`Unhandled Navigation Error: ${t}`)
                        }), this.subscribeToNavigationEvents()
                    }
                    subscribeToNavigationEvents() {
                        const t = this.navigationTransitions.events.subscribe(r => {
                            try {
                                const {
                                    currentTransition: o
                                } = this.navigationTransitions;
                                if (null === o) return void(Pb(r) && this._events.next(r));
                                if (r instanceof ql) Ab(o.source) && (this.browserUrlTree = o.extractedUrl);
                                else if (r instanceof zo) this.rawUrlTree = o.rawUrl;
                                else if (r instanceof ib) {
                                    if ("eager" === this.urlUpdateStrategy) {
                                        if (!o.extras.skipLocationChange) {
                                            const i = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl);
                                            this.setBrowserUrl(i, o)
                                        }
                                        this.browserUrlTree = o.urlAfterRedirects
                                    }
                                } else if (r instanceof Dh) this.currentUrlTree = o.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl), this.routerState = o.targetRouterState, "deferred" === this.urlUpdateStrategy && (o.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, o), this.browserUrlTree = o.urlAfterRedirects);
                                else if (r instanceof _s) 0 !== r.code && 1 !== r.code && (this.navigated = !0), (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                                else if (r instanceof wh) {
                                    const i = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                                        s = {
                                            skipLocationChange: o.extras.skipLocationChange,
                                            replaceUrl: "eager" === this.urlUpdateStrategy || Ab(o.source)
                                        };
                                    this.scheduleNavigation(i, vs, null, s, {
                                        resolve: o.resolve,
                                        reject: o.reject,
                                        promise: o.promise
                                    })
                                }
                                r instanceof Wl && this.restoreHistory(o, !0), r instanceof ir && (this.navigated = !0), Pb(r) && this._events.next(r)
                            } catch (o) {
                                this.navigationTransitions.transitionAbortSubject.next(o)
                            }
                        });
                        this.eventsSubscription.add(t)
                    }
                    resetRootComponentType(t) {
                        this.routerState.root.component = t, this.navigationTransitions.rootComponentType = t
                    }
                    initialNavigation() {
                        if (this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation) {
                            const t = this.location.getState();
                            this.navigateToSyncWithBrowser(this.location.path(!0), vs, t)
                        }
                    }
                    setUpLocationChangeListener() {
                        this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                            const r = "popstate" === t.type ? "popstate" : "hashchange";
                            "popstate" === r && setTimeout(() => {
                                this.navigateToSyncWithBrowser(t.url, r, t.state)
                            }, 0)
                        }))
                    }
                    navigateToSyncWithBrowser(t, r, o) {
                        const i = {
                                replaceUrl: !0
                            },
                            s = o ? .navigationId ? o : null;
                        if (o) {
                            const l = { ...o
                            };
                            delete l.navigationId, delete l.\u0275routerPageId, 0 !== Object.keys(l).length && (i.state = l)
                        }
                        const a = this.parseUrl(t);
                        this.scheduleNavigation(a, r, s, i)
                    }
                    get url() {
                        return this.serializeUrl(this.currentUrlTree)
                    }
                    getCurrentNavigation() {
                        return this.navigationTransitions.currentNavigation
                    }
                    get lastSuccessfulNavigation() {
                        return this.navigationTransitions.lastSuccessfulNavigation
                    }
                    resetConfig(t) {
                        this.config = t.map(Th), this.navigated = !1, this.lastSuccessfulId = -1
                    }
                    ngOnDestroy() {
                        this.dispose()
                    }
                    dispose() {
                        this.navigationTransitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
                    }
                    createUrlTree(t, r = {}) {
                        const {
                            relativeTo: o,
                            queryParams: i,
                            fragment: s,
                            queryParamsHandling: a,
                            preserveFragment: l
                        } = r, c = l ? this.currentUrlTree.fragment : s;
                        let d, u = null;
                        switch (a) {
                            case "merge":
                                u = { ...this.currentUrlTree.queryParams,
                                    ...i
                                };
                                break;
                            case "preserve":
                                u = this.currentUrlTree.queryParams;
                                break;
                            default:
                                u = i || null
                        }
                        null !== u && (u = this.removeEmptyProps(u));
                        try {
                            d = J0(o ? o.snapshot : this.routerState.snapshot.root)
                        } catch {
                            ("string" != typeof t[0] || !t[0].startsWith("/")) && (t = []), d = this.currentUrlTree.root
                        }
                        return K0(d, t, u, c ? ? null)
                    }
                    navigateByUrl(t, r = {
                        skipLocationChange: !1
                    }) {
                        const o = Pr(t) ? t : this.parseUrl(t),
                            i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                        return this.scheduleNavigation(i, vs, null, r)
                    }
                    navigate(t, r = {
                        skipLocationChange: !1
                    }) {
                        return function aj(e) {
                            for (let n = 0; n < e.length; n++)
                                if (null == e[n]) throw new D(4008, !1)
                        }(t), this.navigateByUrl(this.createUrlTree(t, r), r)
                    }
                    serializeUrl(t) {
                        return this.urlSerializer.serialize(t)
                    }
                    parseUrl(t) {
                        let r;
                        try {
                            r = this.urlSerializer.parse(t)
                        } catch (o) {
                            r = this.malformedUriErrorHandler(o, this.urlSerializer, t)
                        }
                        return r
                    }
                    isActive(t, r) {
                        let o;
                        if (o = !0 === r ? { ...ij
                            } : !1 === r ? { ...sj
                            } : r, Pr(t)) return U0(this.currentUrlTree, t, o);
                        const i = this.parseUrl(t);
                        return U0(this.currentUrlTree, i, o)
                    }
                    removeEmptyProps(t) {
                        return Object.keys(t).reduce((r, o) => {
                            const i = t[o];
                            return null != i && (r[o] = i), r
                        }, {})
                    }
                    scheduleNavigation(t, r, o, i, s) {
                        if (this.disposed) return Promise.resolve(!1);
                        let a, l, c;
                        s ? (a = s.resolve, l = s.reject, c = s.promise) : c = new Promise((d, f) => {
                            a = d, l = f
                        });
                        const u = this.pendingTasks.add();
                        return Ob(this, () => {
                            queueMicrotask(() => this.pendingTasks.remove(u))
                        }), this.navigationTransitions.handleNavigationRequest({
                            source: r,
                            restoredState: o,
                            currentUrlTree: this.currentUrlTree,
                            currentRawUrl: this.currentUrlTree,
                            currentBrowserUrl: this.browserUrlTree,
                            rawUrl: t,
                            extras: i,
                            resolve: a,
                            reject: l,
                            promise: c,
                            currentSnapshot: this.routerState.snapshot,
                            currentRouterState: this.routerState
                        }), c.catch(d => Promise.reject(d))
                    }
                    setBrowserUrl(t, r) {
                        const o = this.urlSerializer.serialize(t);
                        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
                            const s = { ...r.extras.state,
                                ...this.generateNgRouterState(r.id, this.browserPageId)
                            };
                            this.location.replaceState(o, "", s)
                        } else {
                            const i = { ...r.extras.state,
                                ...this.generateNgRouterState(r.id, this.browserPageId + 1)
                            };
                            this.location.go(o, "", i)
                        }
                    }
                    restoreHistory(t, r = !1) {
                        if ("computed" === this.canceledNavigationResolution) {
                            const i = this.currentPageId - this.browserPageId;
                            0 !== i ? this.location.historyGo(i) : this.currentUrlTree === this.getCurrentNavigation() ? .finalUrl && 0 === i && (this.resetState(t), this.browserUrlTree = t.currentUrlTree, this.resetUrlToCurrentUrlTree())
                        } else "replace" === this.canceledNavigationResolution && (r && this.resetState(t), this.resetUrlToCurrentUrlTree())
                    }
                    resetState(t) {
                        this.routerState = t.currentRouterState, this.currentUrlTree = t.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl)
                    }
                    resetUrlToCurrentUrlTree() {
                        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                    }
                    generateNgRouterState(t, r) {
                        return "computed" === this.canceledNavigationResolution ? {
                            navigationId: t,
                            \u0275routerPageId: r
                        } : {
                            navigationId: t
                        }
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function Pb(e) {
                return !(e instanceof Dh || e instanceof wh)
            }
            class kb {}
            let uj = (() => {
                class e {
                    constructor(t, r, o, i, s) {
                        this.router = t, this.injector = o, this.preloadingStrategy = i, this.loader = s
                    }
                    setUpPreloading() {
                        this.subscription = this.router.events.pipe(Rn(t => t instanceof ir), Vo(() => this.preload())).subscribe(() => {})
                    }
                    preload() {
                        return this.processRoutes(this.injector, this.router.config)
                    }
                    ngOnDestroy() {
                        this.subscription && this.subscription.unsubscribe()
                    }
                    processRoutes(t, r) {
                        const o = [];
                        for (const i of r) {
                            i.providers && !i._injector && (i._injector = kd(i.providers, t, `Route: ${i.path}`));
                            const s = i._injector ? ? t,
                                a = i._loadedInjector ? ? s;
                            (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent) && o.push(this.preloadConfig(s, i)), (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ? ? i._loadedRoutes))
                        }
                        return Oe(o).pipe(Fr())
                    }
                    preloadConfig(t, r) {
                        return this.preloadingStrategy.preload(r, () => {
                            let o;
                            o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(t, r) : k(null);
                            const i = o.pipe(Le(s => null === s ? k(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ? ? t, s.routes))));
                            return r.loadComponent && !r._loadedComponent ? Oe([i, this.loader.loadComponent(r)]).pipe(Fr()) : i
                        })
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(Ut), I(PC), I(Tt), I(kb), I(Nh))
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const Fh = new E("");
            let Nb = (() => {
                class e {
                    constructor(t, r, o, i, s = {}) {
                        this.urlSerializer = t, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled", s.anchorScrolling = s.anchorScrolling || "disabled"
                    }
                    init() {
                        "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                    }
                    createScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof ql ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof ir ? (this.lastId = t.id, this.scheduleScrollEvent(t, this.urlSerializer.parse(t.urlAfterRedirects).fragment)) : t instanceof zo && 0 === t.code && (this.lastSource = void 0, this.restoredId = 0, this.scheduleScrollEvent(t, this.urlSerializer.parse(t.url).fragment))
                        })
                    }
                    consumeScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof sb && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                        })
                    }
                    scheduleScrollEvent(t, r) {
                        this.zone.runOutsideAngular(() => {
                            setTimeout(() => {
                                this.zone.run(() => {
                                    this.transitions.events.next(new sb(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
                                })
                            }, 0)
                        })
                    }
                    ngOnDestroy() {
                        this.routerEventsSubscription ? .unsubscribe(), this.scrollEventsSubscription ? .unsubscribe()
                    }
                    static# e = this.\u0275fac = function(r) {
                        ! function by() {
                            throw new Error("invalid")
                        }()
                    };
                    static# t = this.\u0275prov = A({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function Ln(e, n) {
                return {\
                    u0275kind: e,
                    \u0275providers: n
                }
            }

            function Fb() {
                const e = M(yt);
                return n => {
                    const t = e.get(ko);
                    if (n !== t.components[0]) return;
                    const r = e.get(Ut),
                        o = e.get(Lb);
                    1 === e.get(Lh) && r.initialNavigation(), e.get(Vb, null, q.Optional) ? .setUpPreloading(), e.get(Fh, null, q.Optional) ? .init(), r.resetRootComponentType(t.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe())
                }
            }
            const Lb = new E("", {
                    factory: () => new Ue
                }),
                Lh = new E("", {
                    providedIn: "root",
                    factory: () => 1
                }),
                Vb = new E("");

            function pj(e) {
                return Ln(0, [{
                    provide: Vb,
                    useExisting: uj
                }, {
                    provide: kb,
                    useExisting: e
                }])
            }
            const jb = new E("ROUTER_FORROOT_GUARD"),
                mj = [gf, {
                    provide: ps,
                    useClass: mh
                }, Ut, Cs, {
                    provide: qo,
                    useFactory: function Rb(e) {
                        return e.routerState.root
                    },
                    deps: [Ut]
                }, Nh, []];

            function yj() {
                return new jC("Router", Ut)
            }
            let $b = (() => {
                class e {
                    constructor(t) {}
                    static forRoot(t, r) {
                        return {
                            ngModule: e,
                            providers: [mj, [], {
                                    provide: Qo,
                                    multi: !0,
                                    useValue: t
                                }, {
                                    provide: jb,
                                    useFactory: Dj,
                                    deps: [
                                        [Ut, new sa, new aa]
                                    ]
                                }, {
                                    provide: tc,
                                    useValue: r || {}
                                }, r ? .useHash ? {
                                    provide: Mr,
                                    useClass: oN
                                } : {
                                    provide: Mr,
                                    useClass: gD
                                }, {
                                    provide: Fh,
                                    useFactory: () => {
                                        const e = M(DR),
                                            n = M(se),
                                            t = M(tc),
                                            r = M(ec),
                                            o = M(ps);
                                        return t.scrollOffset && e.setOffset(t.scrollOffset), new Nb(o, r, e, n, t)
                                    }
                                }, r ? .preloadingStrategy ? pj(r.preloadingStrategy).\u0275providers : [], {
                                    provide: jC,
                                    multi: !0,
                                    useFactory: yj
                                }, r ? .initialNavigation ? wj(r) : [], r ? .bindToComponentInputs ? Ln(8, [hb, {
                                    provide: Yl,
                                    useExisting: hb
                                }]).\u0275providers : [],
                                [{
                                    provide: Bb,
                                    useFactory: Fb
                                }, {
                                    provide: rf,
                                    multi: !0,
                                    useExisting: Bb
                                }]
                            ]
                        }
                    }
                    static forChild(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Qo,
                                multi: !0,
                                useValue: t
                            }]
                        }
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(I(jb, 8))
                    };
                    static# t = this.\u0275mod = bt({
                        type: e
                    });
                    static# n = this.\u0275inj = ft({})
                }
                return e
            })();

            function Dj(e) {
                return "guarded"
            }

            function wj(e) {
                return ["disabled" === e.initialNavigation ? Ln(3, [{
                    provide: Yd,
                    multi: !0,
                    useFactory: () => {
                        const n = M(Ut);
                        return () => {
                            n.setUpLocationChangeListener()
                        }
                    }
                }, {
                    provide: Lh,
                    useValue: 2
                }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? Ln(2, [{
                    provide: Lh,
                    useValue: 0
                }, {
                    provide: Yd,
                    multi: !0,
                    deps: [yt],
                    useFactory: n => {
                        const t = n.get(nN, Promise.resolve());
                        return () => t.then(() => new Promise(r => {
                            const o = n.get(Ut),
                                i = n.get(Lb);
                            Ob(o, () => {
                                r(!0)
                            }), n.get(ec).afterPreactivation = () => (r(!0), i.closed ? k(void 0) : i), o.initialNavigation()
                        }))
                    }
                }]).\u0275providers : []]
            }
            const Bb = new E(""),
                Ej = ["ring"];

            function Hb() {
                let e = !1;
                return n = navigator.userAgent || navigator.vendor, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(n) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(n.substr(0, 4))) && (e = !0), e;
                var n
            }
            let Mj = (() => {
                    class e {
                        constructor() {}
                        ngOnInit() {
                            Hb() || document.addEventListener("mousemove", t => {
                                this.ring.nativeElement.style.display = "block", this.ring.nativeElement.style.transform = `translate(calc(${t.clientX}px - 1rem), calc(${t.clientY}px - 1rem))`
                            })
                        }
                        ngAfterViewInit() {
                            Hb() || (document.addEventListener("mouseout", t => {
                                t.relatedTarget || (this.ring.nativeElement.style.display = "none")
                            }), document.addEventListener("mouseover", () => {
                                this.ring.nativeElement.style.display = "block"
                            }), document.querySelectorAll(".hovered").forEach(t => {
                                t.addEventListener("mouseover", () => {
                                    this.ring.nativeElement.classList.add("hover")
                                }), t.addEventListener("mouseout", () => {
                                    this.ring.nativeElement.classList.remove("hover")
                                })
                            }))
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275cmp = wn({
                            type: e,
                            selectors: [
                                ["app-custom-cursor"]
                            ],
                            viewQuery: function(r, o) {
                                if (1 & r && Yi(Ej, 5), 2 & r) {
                                    let i;
                                    Ao(i = To()) && (o.ring = i.first)
                                }
                            },
                            decls: 4,
                            vars: 0,
                            consts: [
                                ["id", "cursor", 1, "cursor"],
                                ["id", "ring", 1, "ring-cursor", 2, "display", "none"],
                                ["ring", ""]
                            ],
                            template: function(r, o) {
                                1 & r && (L(0, "div", 0)(1, "div", 1, 2), he(3, "div"), V()())
                            },
                            styles: [".cursor[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:2rem;height:2rem;z-index:2;pointer-events:none}.cursor[_ngcontent-%COMP%]   .ring-cursor[_ngcontent-%COMP%]{position:absolute;display:grid;place-items:center}.cursor[_ngcontent-%COMP%]   .ring-cursor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{border:1px solid #fff;border-radius:50%;box-shadow:0 0 50px 5px #ffffff6e}.cursor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%;height:100%;transition:transform .2s ease-out}.hover[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{transform:scale(1.5)}"]
                        })
                    }
                    return e
                })(),
                Ij = (() => {
                    class e {
                        constructor() {
                            this.strTime = ""
                        }
                        ngOnInit() {
                            this.updateTime(), setInterval(() => this.updateTime(), 1e3)
                        }
                        updateTime() {
                            const t = new Date;
                            let r = t.getHours();
                            const o = t.getMinutes(),
                                i = t.getSeconds(),
                                s = r >= 12 ? "PM" : "AM";
                            r %= 12, r = r || 12, this.strTime = (r < 10 ? "0" + r : r) + ":" + (o < 10 ? "0" + o : o) + ":" + (i < 10 ? "0" + i : i) + " " + s
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275cmp = wn({
                            type: e,
                            selectors: [
                                ["app-clock"]
                            ],
                            decls: 4,
                            vars: 2,
                            consts: [
                                [1, "glitch"],
                                [1, "clock", "is-off"],
                                [1, "time"]
                            ],
                            template: function(r, o) {
                                1 & r && (L(0, "div", 0)(1, "div", 1)(2, "span", 2), Fe(3), V()()()), 2 & r && (F(2), vt("data-time", o.strTime), F(1), Ye(o.strTime))
                            },
                            styles: ['.clock[_ngcontent-%COMP%]{display:block;width:720px;text-align:center;inset:0;margin:auto;cursor:url(pointer.42b17b9a8b5ff79f.png),default}.clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;position:relative;font-size:40px;font-weight:700;line-height:1}.clock.is-off[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_is-off 2s linear infinite!important}.glitch[_ngcontent-%COMP%]:before{content:"";inset:0;animation:_ngcontent-%COMP%_bg-move 2s linear infinite;background-size:100% 8px;background-image:linear-gradient(0,rgba(255,255,255,.05) 10%,transparent 10%,transparent 50%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.05) 60%,transparent 60%,transparent)}.glitch[_ngcontent-%COMP%]   .figure[_ngcontent-%COMP%], .glitch[_ngcontent-%COMP%]   .figure-mask[_ngcontent-%COMP%]{transform:skew(0) scaleY(1);animation:_ngcontent-%COMP%_tr-bag 4s linear infinite}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]{transform:skew(0) scaleY(1);animation:_ngcontent-%COMP%_clock-bag 4s linear infinite}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before, .glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{display:block;content:attr(data-time);position:absolute;top:0;color:#fff;overflow:hidden;width:720px;clip:rect(0,900px,0,0)}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{left:-2px;text-shadow:2px 0 #00f;animation:_ngcontent-%COMP%_c2 1s infinite linear alternate-reverse}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{left:3px;text-shadow:-2px 0 #f00;animation:_ngcontent-%COMP%_c1 2s infinite linear alternate-reverse}@media screen and (max-width: 768px){.clock[_ngcontent-%COMP%]{width:100%;height:100%}.clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:30px}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before, .glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{display:block;content:attr(data-time);position:absolute;top:0;color:#fff;overflow:hidden;width:100%;clip:rect(0,900px,0,0)}}@keyframes _ngcontent-%COMP%_is-off{0%{opacity:1}50%{opacity:1}56%{opacity:0}57%{opacity:0}58%{opacity:1}71%{transform:scaleY(1) skew(0)}72%{transform:scaleY(3) skew(-60deg)}73%{transform:scaleY(1) skew(0)}80%{opacity:1}81%{opacity:0}84%{opacity:0}85%{opacity:1}91%{transform:scaleX(1) scaleY(1) skew(0);color:#fff}92%{transform:scaleX(1.5) scaleY(.2) skew(80deg);color:green}93%{transform:scaleX(1) scaleY(1) skew(0);color:#fff}}@keyframes _ngcontent-%COMP%_c1{0%{clip:rect(45px,9999px,38px,0)}5%{clip:rect(39px,9999px,78px,0)}10%{clip:rect(13px,9999px,55px,0)}15.000000000000002%{clip:rect(20px,9999px,17px,0)}20%{clip:rect(58px,9999px,75px,0)}25%{clip:rect(98px,9999px,62px,0)}30.000000000000004%{clip:rect(43px,9999px,15px,0)}35.00000000000001%{clip:rect(10px,9999px,97px,0)}40%{clip:rect(28px,9999px,48px,0)}45%{clip:rect(92px,9999px,53px,0)}50%{clip:rect(21px,9999px,95px,0)}55%{clip:rect(88px,9999px,74px,0)}60.00000000000001%{clip:rect(84px,9999px,34px,0)}65%{clip:rect(85px,9999px,71px,0)}70.00000000000001%{clip:rect(45px,9999px,71px,0)}75%{clip:rect(73px,9999px,16px,0)}80%{clip:rect(48px,9999px,90px,0)}85%{clip:rect(13px,9999px,89px,0)}90%{clip:rect(37px,9999px,37px,0)}95%{clip:rect(3px,9999px,16px,0)}to{clip:rect(35px,9999px,44px,0)}}@keyframes _ngcontent-%COMP%_c2{0%{clip:rect(78px,9999px,41px,0)}5%{clip:rect(72px,9999px,71px,0)}10%{clip:rect(73px,9999px,58px,0)}15.000000000000002%{clip:rect(55px,9999px,14px,0)}20%{clip:rect(8px,9999px,12px,0)}25%{clip:rect(55px,9999px,53px,0)}30.000000000000004%{clip:rect(85px,9999px,11px,0)}35.00000000000001%{clip:rect(87px,9999px,75px,0)}40%{clip:rect(41px,9999px,18px,0)}45%{clip:rect(52px,9999px,70px,0)}50%{clip:rect(41px,9999px,8px,0)}55%{clip:rect(69px,9999px,98px,0)}60.00000000000001%{clip:rect(8px,9999px,92px,0)}65%{clip:rect(88px,9999px,16px,0)}70.00000000000001%{clip:rect(42px,9999px,96px,0)}75%{clip:rect(7px,9999px,29px,0)}80%{clip:rect(38px,9999px,4px,0)}85%{clip:rect(22px,9999px,82px,0)}90%{clip:rect(31px,9999px,97px,0)}95%{clip:rect(71px,9999px,99px,0)}to{clip:rect(42px,9999px,95px,0)}23%{transform:scaleX(.8)}}@keyframes _ngcontent-%COMP%_clock-bag{0%{transform:translate(5px,3px)}2%{transform:translate(4px,4px)}4%{transform:translate(2px,4px)}6%{transform:translate(1px,5px)}8%{transform:translate(1px,5px)}10%{transform:translate(2px,1px)}12%{transform:translate(4px,2px)}14.000000000000002%{transform:translate(3px,5px)}16%{transform:translate(4px,1px)}18%{transform:translate(1px,3px)}20%{transform:translate(4px,1px)}22%{transform:translate(3px,4px)}24%{transform:translate(5px,2px)}26%{transform:translate(1px,4px)}28.000000000000004%{transform:translate(5px,1px)}30%{transform:translate(2px,5px)}32%{transform:translate(2px,4px)}34%{transform:translate(2px,4px)}36%{transform:translate(2px,5px)}38%{transform:translate(5px,4px)}40%{transform:translate(2px,1px)}42%{transform:translate(3px,4px)}44%{transform:translate(4px,5px)}46.00000000000001%{transform:translate(4px,4px)}48%{transform:translate(1px,3px)}50%{transform:translate(4px,3px)}52%{transform:translate(3px,2px)}54%{transform:translate(5px,3px)}56.00000000000001%{transform:translate(2px,3px)}58%{transform:translate(4px,3px)}60%{transform:translate(1px,4px)}62%{transform:translate(4px,3px)}64%{transform:translate(2px,4px)}66%{transform:translate(3px,4px)}68%{transform:translate(4px,2px)}70.00000000000001%{transform:translate(4px,1px)}72%{transform:translate(4px,1px)}74%{transform:translate(3px,4px)}76%{transform:translate(1px,5px)}78%{transform:translate(2px,5px)}80%{transform:translate(5px,5px)}82.00000000000001%{transform:translate(1px,5px)}84%{transform:translate(5px,2px)}86%{transform:translate(2px,5px)}88%{transform:translate(4px,3px)}90%{transform:translate(5px,3px)}92.00000000000001%{transform:translate(2px,5px)}94%{transform:translate(1px,5px)}96%{transform:translate(3px,4px)}98%{transform:translate(5px,4px)}to{transform:translate(4px,3px)}1%{transform:scaleY(1) skew(0)}1.5%{transform:scaleY(3) skew(-60deg)}2%{transform:scaleY(1) skew(0)}51%{transform:scaleX(1) scaleY(1) skew(0)}52%{transform:scaleX(1.5) scaleY(.2) skew(80deg)}53%{transform:scaleX(1) scaleY(1) skew(0)}}@keyframes _ngcontent-%COMP%_tr-bag{0%{transform:translate(3px,1px)}2%{transform:translate(5px,4px)}4%{transform:translate(4px,5px)}6%{transform:translate(3px,5px)}8%{transform:translate(1px,3px)}10%{transform:translate(1px,5px)}12%{transform:translate(2px,4px)}14.000000000000002%{transform:translate(4px,4px)}16%{transform:translate(3px,5px)}18%{transform:translate(5px,5px)}20%{transform:translate(2px,3px)}22%{transform:translate(4px,5px)}24%{transform:translate(3px,3px)}26%{transform:translate(1px,3px)}28.000000000000004%{transform:translate(5px,5px)}30%{transform:translate(1px,4px)}32%{transform:translate(1px,3px)}34%{transform:translate(5px,3px)}36%{transform:translate(2px,3px)}38%{transform:translate(1px,2px)}40%{transform:translate(1px,3px)}42%{transform:translate(4px,1px)}44%{transform:translate(3px,2px)}46.00000000000001%{transform:translate(5px,1px)}48%{transform:translate(1px,2px)}50%{transform:translate(2px,1px)}52%{transform:translate(3px,5px)}54%{transform:translate(2px,1px)}56.00000000000001%{transform:translate(5px,2px)}58%{transform:translate(5px,4px)}60%{transform:translate(2px,5px)}62%{transform:translate(1px,5px)}64%{transform:translate(2px,3px)}66%{transform:translate(2px,5px)}68%{transform:translate(5px,3px)}70.00000000000001%{transform:translate(1px,1px)}72%{transform:translate(5px,1px)}74%{transform:translate(3px,3px)}76%{transform:translate(1px,1px)}78%{transform:translate(4px,2px)}80%{transform:translate(4px,2px)}82.00000000000001%{transform:translate(4px,4px)}84%{transform:translate(3px,3px)}86%{transform:translate(5px,4px)}88%{transform:translate(3px,3px)}90%{transform:translate(4px,4px)}92.00000000000001%{transform:translate(3px,4px)}94%{transform:translate(4px,2px)}96%{transform:translate(1px,1px)}98%{transform:translate(1px,5px)}to{transform:translate(4px,2px)}1%{transform:scaleY(1) skew(0)}1.5%{transform:scaleY(3) skew(-60deg)}2%{transform:scaleY(1) skew(0)}51%{transform:scaleX(1) scaleY(1) skew(0)}52%{transform:scaleX(1.5) scaleY(.2) skew(80deg)}53%{transform:scaleX(1) scaleY(1) skew(0)}}@keyframes _ngcontent-%COMP%_bg-move{0%{background-position:0 0}to{background-position:0 -32px}}']
                        })
                    }
                    return e
                })();
            const kr = {
                discordId: "871329074046435338",
                banner: "https://raw.githubusercontent.com/KhaiClone/archive/main/banner.gif",
                avatar_decoration: "a_c6b3bc1dc49e5b284dca0b6437831004",
                theme_colors: ["#0501FA", "#FA0101"],
                profile_effect: {
                    intro: "https://raw.githubusercontent.com/KhaiClone/archive/main/profileEffect/intro.png",
                    loop: "https://raw.githubusercontent.com/KhaiClone/archive/main/profileEffect/loop.png"
                }
            };
            let xj = (() => {
                    class e {
                        constructor(t) {
                            this.http = t, this.urlDiscordApi = "https://khaidevapi.up.railway.app/api/profile/"
                        }
                        getDiscordUser(t) {
                            return this.http.get(this.urlDiscordApi + t)
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(Fl))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                Sj = (() => {
                    class e {
                        constructor(t) {
                            this.http = t, this.webSocketUrl = "wss://api.lanyard.rest/socket", this.dataInitial = {
                                op: 2,
                                d: {
                                    subscribe_to_id: kr.discordId
                                }
                            }, this.heartbeat_interval = 3e4, this.lanyardData = new Ue
                        }
                        setupWebSocket() {
                            this.socket = new WebSocket(this.webSocketUrl), this.socket.onopen = () => {
                                this.socket ? .send(JSON.stringify(this.dataInitial)), this.heartbeat = setInterval(() => {
                                    this.socket ? .send(JSON.stringify({
                                        op: 3
                                    }))
                                }, this.heartbeat_interval)
                            }, this.socket.onmessage = t => {
                                const r = JSON.parse(t.data);
                                this.heartbeat_interval = r.d.heartbeat_interval, "INIT_STATE" === r.t && this.setLanyardData(r), "PRESENCE_UPDATE" === r.t && this.setLanyardData(r)
                            }, this.socket.onclose = () => {
                                clearInterval(this.heartbeat), setTimeout(() => {
                                    this.setupWebSocket()
                                }, 5e3)
                            }
                        }
                        setLanyardData(t) {
                            this.lanyardData.next(t)
                        }
                        getLanyardData() {
                            return this.lanyardData.asObservable()
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(Fl))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            class Aj extends dt {
                constructor(n, t) {
                    super()
                }
                schedule(n, t = 0) {
                    return this
                }
            }
            const nc = {
                    setInterval(e, n, ...t) {
                        const {
                            delegate: r
                        } = nc;
                        return r ? .setInterval ? r.setInterval(e, n, ...t) : setInterval(e, n, ...t)
                    },
                    clearInterval(e) {
                        const {
                            delegate: n
                        } = nc;
                        return (n ? .clearInterval || clearInterval)(e)
                    },
                    delegate: void 0
                },
                Vh = {
                    now: () => (Vh.delegate || Date).now(),
                    delegate: void 0
                };
            class xs {
                constructor(n, t = xs.now) {
                    this.schedulerActionCtor = n, this.now = t
                }
                schedule(n, t = 0, r) {
                    return new this.schedulerActionCtor(this, n).schedule(r, t)
                }
            }
            xs.now = Vh.now;
            const Pj = new class Oj extends xs {
                constructor(n, t = xs.now) {
                    super(n, t), this.actions = [], this._active = !1
                }
                flush(n) {
                    const {
                        actions: t
                    } = this;
                    if (this._active) return void t.push(n);
                    let r;
                    this._active = !0;
                    do {
                        if (r = n.execute(n.state, n.delay)) break
                    } while (n = t.shift());
                    if (this._active = !1, r) {
                        for (; n = t.shift();) n.unsubscribe();
                        throw r
                    }
                }
            }(class Tj extends Aj {
                constructor(n, t) {
                    super(n, t), this.scheduler = n, this.work = t, this.pending = !1
                }
                schedule(n, t = 0) {
                    var r;
                    if (this.closed) return this;
                    this.state = n;
                    const o = this.id,
                        i = this.scheduler;
                    return null != o && (this.id = this.recycleAsyncId(i, o, t)), this.pending = !0, this.delay = t, this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(i, this.id, t), this
                }
                requestAsyncId(n, t, r = 0) {
                    return nc.setInterval(n.flush.bind(n, this), r)
                }
                recycleAsyncId(n, t, r = 0) {
                    if (null != r && this.delay === r && !1 === this.pending) return t;
                    null != t && nc.clearInterval(t)
                }
                execute(n, t) {
                    if (this.closed) return new Error("executing a cancelled action");
                    this.pending = !1;
                    const r = this._execute(n, t);
                    if (r) return r;
                    !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                }
                _execute(n, t) {
                    let o, r = !1;
                    try {
                        this.work(n)
                    } catch (i) {
                        r = !0, o = i || new Error("Scheduled action threw falsy error")
                    }
                    if (r) return this.unsubscribe(), o
                }
                unsubscribe() {
                    if (!this.closed) {
                        const {
                            id: n,
                            scheduler: t
                        } = this, {
                            actions: r
                        } = t;
                        this.work = this.state = this.scheduler = null, this.pending = !1, Rr(r, this), null != n && (this.id = this.recycleAsyncId(t, n, null)), this.delay = null, super.unsubscribe()
                    }
                }
            });
            class Rj extends Ue {
                constructor(n = 1 / 0, t = 1 / 0, r = Vh) {
                    super(), this._bufferSize = n, this._windowTime = t, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = t === 1 / 0, this._bufferSize = Math.max(1, n), this._windowTime = Math.max(1, t)
                }
                next(n) {
                    const {
                        isStopped: t,
                        _buffer: r,
                        _infiniteTimeWindow: o,
                        _timestampProvider: i,
                        _windowTime: s
                    } = this;
                    t || (r.push(n), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(n)
                }
                _subscribe(n) {
                    this._throwIfClosed(), this._trimBuffer();
                    const t = this._innerSubscribe(n),
                        {
                            _infiniteTimeWindow: r,
                            _buffer: o
                        } = this,
                        i = o.slice();
                    for (let s = 0; s < i.length && !n.closed; s += r ? 1 : 2) n.next(i[s]);
                    return this._checkFinalizedStatuses(n), t
                }
                _trimBuffer() {
                    const {
                        _bufferSize: n,
                        _timestampProvider: t,
                        _buffer: r,
                        _infiniteTimeWindow: o
                    } = this, i = (o ? 1 : 2) * n;
                    if (n < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
                        const s = t.now();
                        let a = 0;
                        for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
                        a && r.splice(0, a + 1)
                    }
                }
            }
            let Nr = {
                async: !1,
                baseUrl: null,
                breaks: !1,
                extensions: null,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                hooks: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: null,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartypants: !1,
                tokenizer: null,
                walkTokens: null,
                xhtml: !1
            };
            const zb = /[&<>"']/,
                Vj = new RegExp(zb.source, "g"),
                Gb = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
                jj = new RegExp(Gb.source, "g"),
                $j = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                qb = e => $j[e];

            function Je(e, n) {
                if (n) {
                    if (zb.test(e)) return e.replace(Vj, qb)
                } else if (Gb.test(e)) return e.replace(jj, qb);
                return e
            }
            const Bj = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

            function Wb(e) {
                return e.replace(Bj, (n, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : "")
            }
            const Hj = /(^|[^\[])\^/g;

            function ce(e, n) {
                e = "string" == typeof e ? e : e.source, n = n || "";
                const t = {
                    replace: (r, o) => (o = (o = o.source || o).replace(Hj, "$1"), e = e.replace(r, o), t),
                    getRegex: () => new RegExp(e, n)
                };
                return t
            }
            const Uj = /[^\w:]/g,
                zj = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

            function Zb(e, n, t) {
                if (e) {
                    let r;
                    try {
                        r = decodeURIComponent(Wb(t)).replace(Uj, "").toLowerCase()
                    } catch {
                        return null
                    }
                    if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:") || 0 === r.indexOf("data:")) return null
                }
                n && !zj.test(t) && (t = function Zj(e, n) {
                    rc[" " + e] || (rc[" " + e] = Gj.test(e) ? e + "/" : ic(e, "/", !0));
                    const t = -1 === (e = rc[" " + e]).indexOf(":");
                    return "//" === n.substring(0, 2) ? t ? n : e.replace(qj, "$1") + n : "/" === n.charAt(0) ? t ? n : e.replace(Wj, "$1") + n : e + n
                }(n, t));
                try {
                    t = encodeURI(t).replace(/%25/g, "%")
                } catch {
                    return null
                }
                return t
            }
            const rc = {},
                Gj = /^[^:]+:\/*[^/]*$/,
                qj = /^([^:]+:)[\s\S]*$/,
                Wj = /^([^:]+:\/*[^/]*)[\s\S]*$/,
                oc = {
                    exec: function() {}
                };

            function Yb(e, n) {
                const r = e.replace(/\|/g, (i, s, a) => {
                    let l = !1,
                        c = s;
                    for (; --c >= 0 && "\\" === a[c];) l = !l;
                    return l ? "|" : " |"
                }).split(/ \|/);
                let o = 0;
                if (r[0].trim() || r.shift(), r.length > 0 && !r[r.length - 1].trim() && r.pop(), r.length > n) r.splice(n);
                else
                    for (; r.length < n;) r.push("");
                for (; o < r.length; o++) r[o] = r[o].trim().replace(/\\\|/g, "|");
                return r
            }

            function ic(e, n, t) {
                const r = e.length;
                if (0 === r) return "";
                let o = 0;
                for (; o < r;) {
                    const i = e.charAt(r - o - 1);
                    if (i !== n || t) {
                        if (i === n || !t) break;
                        o++
                    } else o++
                }
                return e.slice(0, r - o)
            }

            function Qb(e, n) {
                if (n < 1) return "";
                let t = "";
                for (; n > 1;) 1 & n && (t += e), n >>= 1, e += e;
                return t + e
            }

            function Xb(e, n, t, r) {
                const o = n.href,
                    i = n.title ? Je(n.title) : null,
                    s = e[1].replace(/\\([\[\]])/g, "$1");
                if ("!" !== e[0].charAt(0)) {
                    r.state.inLink = !0;
                    const a = {
                        type: "link",
                        raw: t,
                        href: o,
                        title: i,
                        text: s,
                        tokens: r.inlineTokens(s)
                    };
                    return r.state.inLink = !1, a
                }
                return {
                    type: "image",
                    raw: t,
                    href: o,
                    title: i,
                    text: Je(s)
                }
            }
            class jh {
                constructor(n) {
                    this.options = n || Nr
                }
                space(n) {
                    const t = this.rules.block.newline.exec(n);
                    if (t && t[0].length > 0) return {
                        type: "space",
                        raw: t[0]
                    }
                }
                code(n) {
                    const t = this.rules.block.code.exec(n);
                    if (t) {
                        const r = t[0].replace(/^ {1,4}/gm, "");
                        return {
                            type: "code",
                            raw: t[0],
                            codeBlockStyle: "indented",
                            text: this.options.pedantic ? r : ic(r, "\n")
                        }
                    }
                }
                fences(n) {
                    const t = this.rules.block.fences.exec(n);
                    if (t) {
                        const r = t[0],
                            o = function Xj(e, n) {
                                const t = e.match(/^(\s+)(?:```)/);
                                if (null === t) return n;
                                const r = t[1];
                                return n.split("\n").map(o => {
                                    const i = o.match(/^\s+/);
                                    if (null === i) return o;
                                    const [s] = i;
                                    return s.length >= r.length ? o.slice(r.length) : o
                                }).join("\n")
                            }(r, t[3] || "");
                        return {
                            type: "code",
                            raw: r,
                            lang: t[2] ? t[2].trim().replace(this.rules.inline._escapes, "$1") : t[2],
                            text: o
                        }
                    }
                }
                heading(n) {
                    const t = this.rules.block.heading.exec(n);
                    if (t) {
                        let r = t[2].trim();
                        if (/#$/.test(r)) {
                            const o = ic(r, "#");
                            (this.options.pedantic || !o || / $/.test(o)) && (r = o.trim())
                        }
                        return {
                            type: "heading",
                            raw: t[0],
                            depth: t[1].length,
                            text: r,
                            tokens: this.lexer.inline(r)
                        }
                    }
                }
                hr(n) {
                    const t = this.rules.block.hr.exec(n);
                    if (t) return {
                        type: "hr",
                        raw: t[0]
                    }
                }
                blockquote(n) {
                    const t = this.rules.block.blockquote.exec(n);
                    if (t) {
                        const r = t[0].replace(/^ *>[ \t]?/gm, ""),
                            o = this.lexer.state.top;
                        this.lexer.state.top = !0;
                        const i = this.lexer.blockTokens(r);
                        return this.lexer.state.top = o, {
                            type: "blockquote",
                            raw: t[0],
                            tokens: i,
                            text: r
                        }
                    }
                }
                list(n) {
                    let t = this.rules.block.list.exec(n);
                    if (t) {
                        let r, o, i, s, a, l, c, u, d, f, h, p, g = t[1].trim();
                        const y = g.length > 1,
                            v = {
                                type: "list",
                                raw: "",
                                ordered: y,
                                start: y ? +g.slice(0, -1) : "",
                                loose: !1,
                                items: []
                            };
                        g = y ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`, this.options.pedantic && (g = y ? g : "[*+-]");
                        const m = new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                        for (; n && (p = !1, (t = m.exec(n)) && !this.rules.block.hr.test(n));) {
                            if (r = t[0], n = n.substring(r.length), u = t[2].split("\n", 1)[0].replace(/^\t+/, S => " ".repeat(3 * S.length)), d = n.split("\n", 1)[0], this.options.pedantic ? (s = 2, h = u.trimLeft()) : (s = t[2].search(/[^ ]/), s = s > 4 ? 1 : s, h = u.slice(s), s += t[1].length), l = !1, !u && /^ *$/.test(d) && (r += d + "\n", n = n.substring(d.length + 1), p = !0), !p) {
                                const S = new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
                                    P = new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                                    oe = new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),
                                    Ke = new RegExp(`^ {0,${Math.min(3,s-1)}}#`);
                                for (; n && (f = n.split("\n", 1)[0], d = f, this.options.pedantic && (d = d.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !(oe.test(d) || Ke.test(d) || S.test(d) || P.test(n)));) {
                                    if (d.search(/[^ ]/) >= s || !d.trim()) h += "\n" + d.slice(s);
                                    else {
                                        if (l || u.search(/[^ ]/) >= 4 || oe.test(u) || Ke.test(u) || P.test(u)) break;
                                        h += "\n" + d
                                    }!l && !d.trim() && (l = !0), r += f + "\n", n = n.substring(f.length + 1), u = d.slice(s)
                                }
                            }
                            v.loose || (c ? v.loose = !0 : /\n *\n *$/.test(r) && (c = !0)), this.options.gfm && (o = /^\[[ xX]\] /.exec(h), o && (i = "[ ] " !== o[0], h = h.replace(/^\[[ xX]\] +/, ""))), v.items.push({
                                type: "list_item",
                                raw: r,
                                task: !!o,
                                checked: i,
                                loose: !1,
                                text: h
                            }), v.raw += r
                        }
                        v.items[v.items.length - 1].raw = r.trimRight(), v.items[v.items.length - 1].text = h.trimRight(), v.raw = v.raw.trimRight();
                        const w = v.items.length;
                        for (a = 0; a < w; a++)
                            if (this.lexer.state.top = !1, v.items[a].tokens = this.lexer.blockTokens(v.items[a].text, []), !v.loose) {
                                const S = v.items[a].tokens.filter(oe => "space" === oe.type),
                                    P = S.length > 0 && S.some(oe => /\n.*\n/.test(oe.raw));
                                v.loose = P
                            }
                        if (v.loose)
                            for (a = 0; a < w; a++) v.items[a].loose = !0;
                        return v
                    }
                }
                html(n) {
                    const t = this.rules.block.html.exec(n);
                    if (t) {
                        const r = {
                            type: "html",
                            raw: t[0],
                            pre: !this.options.sanitizer && ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
                            text: t[0]
                        };
                        if (this.options.sanitize) {
                            const o = this.options.sanitizer ? this.options.sanitizer(t[0]) : Je(t[0]);
                            r.type = "paragraph", r.text = o, r.tokens = this.lexer.inline(o)
                        }
                        return r
                    }
                }
                def(n) {
                    const t = this.rules.block.def.exec(n);
                    if (t) {
                        const r = t[1].toLowerCase().replace(/\s+/g, " "),
                            o = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "",
                            i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline._escapes, "$1") : t[3];
                        return {
                            type: "def",
                            tag: r,
                            raw: t[0],
                            href: o,
                            title: i
                        }
                    }
                }
                table(n) {
                    const t = this.rules.block.table.exec(n);
                    if (t) {
                        const r = {
                            type: "table",
                            header: Yb(t[1]).map(o => ({
                                text: o
                            })),
                            align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                            rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : []
                        };
                        if (r.header.length === r.align.length) {
                            r.raw = t[0];
                            let i, s, a, l, o = r.align.length;
                            for (i = 0; i < o; i++) r.align[i] = /^ *-+: *$/.test(r.align[i]) ? "right" : /^ *:-+: *$/.test(r.align[i]) ? "center" : /^ *:-+ *$/.test(r.align[i]) ? "left" : null;
                            for (o = r.rows.length, i = 0; i < o; i++) r.rows[i] = Yb(r.rows[i], r.header.length).map(c => ({
                                text: c
                            }));
                            for (o = r.header.length, s = 0; s < o; s++) r.header[s].tokens = this.lexer.inline(r.header[s].text);
                            for (o = r.rows.length, s = 0; s < o; s++)
                                for (l = r.rows[s], a = 0; a < l.length; a++) l[a].tokens = this.lexer.inline(l[a].text);
                            return r
                        }
                    }
                }
                lheading(n) {
                    const t = this.rules.block.lheading.exec(n);
                    if (t) return {
                        type: "heading",
                        raw: t[0],
                        depth: "=" === t[2].charAt(0) ? 1 : 2,
                        text: t[1],
                        tokens: this.lexer.inline(t[1])
                    }
                }
                paragraph(n) {
                    const t = this.rules.block.paragraph.exec(n);
                    if (t) {
                        const r = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                        return {
                            type: "paragraph",
                            raw: t[0],
                            text: r,
                            tokens: this.lexer.inline(r)
                        }
                    }
                }
                text(n) {
                    const t = this.rules.block.text.exec(n);
                    if (t) return {
                        type: "text",
                        raw: t[0],
                        text: t[0],
                        tokens: this.lexer.inline(t[0])
                    }
                }
                escape(n) {
                    const t = this.rules.inline.escape.exec(n);
                    if (t) return {
                        type: "escape",
                        raw: t[0],
                        text: Je(t[1])
                    }
                }
                tag(n) {
                    const t = this.rules.inline.tag.exec(n);
                    if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
                        type: this.options.sanitize ? "text" : "html",
                        raw: t[0],
                        inLink: this.lexer.state.inLink,
                        inRawBlock: this.lexer.state.inRawBlock,
                        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : Je(t[0]) : t[0]
                    }
                }
                link(n) {
                    const t = this.rules.inline.link.exec(n);
                    if (t) {
                        const r = t[2].trim();
                        if (!this.options.pedantic && /^</.test(r)) {
                            if (!/>$/.test(r)) return;
                            const s = ic(r.slice(0, -1), "\\");
                            if ((r.length - s.length) % 2 == 0) return
                        } else {
                            const s = function Yj(e, n) {
                                if (-1 === e.indexOf(n[1])) return -1;
                                const t = e.length;
                                let r = 0,
                                    o = 0;
                                for (; o < t; o++)
                                    if ("\\" === e[o]) o++;
                                    else if (e[o] === n[0]) r++;
                                else if (e[o] === n[1] && (r--, r < 0)) return o;
                                return -1
                            }(t[2], "()");
                            if (s > -1) {
                                const l = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + s;
                                t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, l).trim(), t[3] = ""
                            }
                        }
                        let o = t[2],
                            i = "";
                        if (this.options.pedantic) {
                            const s = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);
                            s && (o = s[1], i = s[3])
                        } else i = t[3] ? t[3].slice(1, -1) : "";
                        return o = o.trim(), /^</.test(o) && (o = this.options.pedantic && !/>$/.test(r) ? o.slice(1) : o.slice(1, -1)), Xb(t, {
                            href: o && o.replace(this.rules.inline._escapes, "$1"),
                            title: i && i.replace(this.rules.inline._escapes, "$1")
                        }, t[0], this.lexer)
                    }
                }
                reflink(n, t) {
                    let r;
                    if ((r = this.rules.inline.reflink.exec(n)) || (r = this.rules.inline.nolink.exec(n))) {
                        let o = (r[2] || r[1]).replace(/\s+/g, " ");
                        if (o = t[o.toLowerCase()], !o) {
                            const i = r[0].charAt(0);
                            return {
                                type: "text",
                                raw: i,
                                text: i
                            }
                        }
                        return Xb(r, o, r[0], this.lexer)
                    }
                }
                emStrong(n, t, r = "") {
                    let o = this.rules.inline.emStrong.lDelim.exec(n);
                    if (!o || o[3] && r.match(/[\p{L}\p{N}]/u)) return;
                    const i = o[1] || o[2] || "";
                    if (!i || i && ("" === r || this.rules.inline.punctuation.exec(r))) {
                        const s = o[0].length - 1;
                        let a, l, c = s,
                            u = 0;
                        const d = "*" === o[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                        for (d.lastIndex = 0, t = t.slice(-1 * n.length + s); null != (o = d.exec(t));) {
                            if (a = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !a) continue;
                            if (l = a.length, o[3] || o[4]) {
                                c += l;
                                continue
                            }
                            if ((o[5] || o[6]) && s % 3 && !((s + l) % 3)) {
                                u += l;
                                continue
                            }
                            if (c -= l, c > 0) continue;
                            l = Math.min(l, l + c + u);
                            const f = n.slice(0, s + o.index + (o[0].length - a.length) + l);
                            if (Math.min(s, l) % 2) {
                                const p = f.slice(1, -1);
                                return {
                                    type: "em",
                                    raw: f,
                                    text: p,
                                    tokens: this.lexer.inlineTokens(p)
                                }
                            }
                            const h = f.slice(2, -2);
                            return {
                                type: "strong",
                                raw: f,
                                text: h,
                                tokens: this.lexer.inlineTokens(h)
                            }
                        }
                    }
                }
                codespan(n) {
                    const t = this.rules.inline.code.exec(n);
                    if (t) {
                        let r = t[2].replace(/\n/g, " ");
                        const o = /[^ ]/.test(r),
                            i = /^ /.test(r) && / $/.test(r);
                        return o && i && (r = r.substring(1, r.length - 1)), r = Je(r, !0), {
                            type: "codespan",
                            raw: t[0],
                            text: r
                        }
                    }
                }
                br(n) {
                    const t = this.rules.inline.br.exec(n);
                    if (t) return {
                        type: "br",
                        raw: t[0]
                    }
                }
                del(n) {
                    const t = this.rules.inline.del.exec(n);
                    if (t) return {
                        type: "del",
                        raw: t[0],
                        text: t[2],
                        tokens: this.lexer.inlineTokens(t[2])
                    }
                }
                autolink(n, t) {
                    const r = this.rules.inline.autolink.exec(n);
                    if (r) {
                        let o, i;
                        return "@" === r[2] ? (o = Je(this.options.mangle ? t(r[1]) : r[1]), i = "mailto:" + o) : (o = Je(r[1]), i = o), {
                            type: "link",
                            raw: r[0],
                            text: o,
                            href: i,
                            tokens: [{
                                type: "text",
                                raw: o,
                                text: o
                            }]
                        }
                    }
                }
                url(n, t) {
                    let r;
                    if (r = this.rules.inline.url.exec(n)) {
                        let o, i;
                        if ("@" === r[2]) o = Je(this.options.mangle ? t(r[0]) : r[0]), i = "mailto:" + o;
                        else {
                            let s;
                            do {
                                s = r[0], r[0] = this.rules.inline._backpedal.exec(r[0])[0]
                            } while (s !== r[0]);
                            o = Je(r[0]), i = "www." === r[1] ? "http://" + r[0] : r[0]
                        }
                        return {
                            type: "link",
                            raw: r[0],
                            text: o,
                            href: i,
                            tokens: [{
                                type: "text",
                                raw: o,
                                text: o
                            }]
                        }
                    }
                }
                inlineText(n, t) {
                    const r = this.rules.inline.text.exec(n);
                    if (r) {
                        let o;
                        return o = this.lexer.state.inRawBlock ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(r[0]) : Je(r[0]) : r[0] : Je(this.options.smartypants ? t(r[0]) : r[0]), {
                            type: "text",
                            raw: r[0],
                            text: o
                        }
                    }
                }
            }
            const T = {
                newline: /^(?: *(?:\n|$))+/,
                code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
                fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
                hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
                heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
                blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
                list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
                html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
                def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
                table: oc,
                lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
                _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
                text: /^[^\n]+/,
                _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
                _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
            };
            T.def = ce(T.def).replace("label", T._label).replace("title", T._title).getRegex(), T.bullet = /(?:[*+-]|\d{1,9}[.)])/, T.listItemStart = ce(/^( *)(bull) */).replace("bull", T.bullet).getRegex(), T.list = ce(T.list).replace(/bull/g, T.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + T.def.source + ")").getRegex(), T._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", T._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, T.html = ce(T.html, "i").replace("comment", T._comment).replace("tag", T._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), T.paragraph = ce(T._paragraph).replace("hr", T.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", T._tag).getRegex(), T.blockquote = ce(T.blockquote).replace("paragraph", T.paragraph).getRegex(), T.normal = { ...T
            }, T.gfm = { ...T.normal,
                table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
            }, T.gfm.table = ce(T.gfm.table).replace("hr", T.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", T._tag).getRegex(), T.gfm.paragraph = ce(T._paragraph).replace("hr", T.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", T.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", T._tag).getRegex(), T.pedantic = { ...T.normal,
                html: ce("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", T._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
                def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                heading: /^(#{1,6})(.*)(?:\n+|$)/,
                fences: oc,
                lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
                paragraph: ce(T.normal._paragraph).replace("hr", T.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", T.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
            };
            const x = {
                escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
                autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
                url: oc,
                tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
                link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
                reflink: /^!?\[(label)\]\[(ref)\]/,
                nolink: /^!?\[(ref)\](?:\[\])?/,
                reflinkSearch: "reflink|nolink(?!\\()",
                emStrong: {
                    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
                    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
                    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
                },
                code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
                br: /^( {2,}|\\)\n(?!\s*$)/,
                del: oc,
                text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
                punctuation: /^([\spunctuation])/
            };

            function Jj(e) {
                return e.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201c").replace(/"/g, "\u201d").replace(/\.{3}/g, "\u2026")
            }

            function Jb(e) {
                let t, r, n = "";
                const o = e.length;
                for (t = 0; t < o; t++) r = e.charCodeAt(t), Math.random() > .5 && (r = "x" + r.toString(16)), n += "&#" + r + ";";
                return n
            }
            x._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~", x.punctuation = ce(x.punctuation).replace(/punctuation/g, x._punctuation).getRegex(), x.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g, x.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g, x._comment = ce(T._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), x.emStrong.lDelim = ce(x.emStrong.lDelim).replace(/punct/g, x._punctuation).getRegex(), x.emStrong.rDelimAst = ce(x.emStrong.rDelimAst, "g").replace(/punct/g, x._punctuation).getRegex(), x.emStrong.rDelimUnd = ce(x.emStrong.rDelimUnd, "g").replace(/punct/g, x._punctuation).getRegex(), x._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, x._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, x._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, x.autolink = ce(x.autolink).replace("scheme", x._scheme).replace("email", x._email).getRegex(), x._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, x.tag = ce(x.tag).replace("comment", x._comment).replace("attribute", x._attribute).getRegex(), x._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, x._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, x._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, x.link = ce(x.link).replace("label", x._label).replace("href", x._href).replace("title", x._title).getRegex(), x.reflink = ce(x.reflink).replace("label", x._label).replace("ref", T._label).getRegex(), x.nolink = ce(x.nolink).replace("ref", T._label).getRegex(), x.reflinkSearch = ce(x.reflinkSearch, "g").replace("reflink", x.reflink).replace("nolink", x.nolink).getRegex(), x.normal = { ...x
            }, x.pedantic = { ...x.normal,
                strong: {
                    start: /^__|\*\*/,
                    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                    endAst: /\*\*(?!\*)/g,
                    endUnd: /__(?!_)/g
                },
                em: {
                    start: /^_|\*/,
                    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
                    endAst: /\*(?!\*)/g,
                    endUnd: /_(?!_)/g
                },
                link: ce(/^!?\[(label)\]\((.*?)\)/).replace("label", x._label).getRegex(),
                reflink: ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", x._label).getRegex()
            }, x.gfm = { ...x.normal,
                escape: ce(x.escape).replace("])", "~|])").getRegex(),
                _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
                del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
                text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
            }, x.gfm.url = ce(x.gfm.url, "i").replace("email", x.gfm._extended_email).getRegex(), x.breaks = { ...x.gfm,
                br: ce(x.br).replace("{2,}", "*").getRegex(),
                text: ce(x.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
            };
            class sr {
                constructor(n) {
                    this.tokens = [], this.tokens.links = Object.create(null), this.options = n || Nr, this.options.tokenizer = this.options.tokenizer || new jh, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
                        inLink: !1,
                        inRawBlock: !1,
                        top: !0
                    };
                    const t = {
                        block: T.normal,
                        inline: x.normal
                    };
                    this.options.pedantic ? (t.block = T.pedantic, t.inline = x.pedantic) : this.options.gfm && (t.block = T.gfm, t.inline = this.options.breaks ? x.breaks : x.gfm), this.tokenizer.rules = t
                }
                static get rules() {
                    return {
                        block: T,
                        inline: x
                    }
                }
                static lex(n, t) {
                    return new sr(t).lex(n)
                }
                static lexInline(n, t) {
                    return new sr(t).inlineTokens(n)
                }
                lex(n) {
                    let t;
                    for (n = n.replace(/\r\n|\r/g, "\n"), this.blockTokens(n, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
                    return this.tokens
                }
                blockTokens(n, t = []) {
                    let r, o, i, s;
                    for (n = this.options.pedantic ? n.replace(/\t/g, "    ").replace(/^ +$/gm, "") : n.replace(/^( *)(\t+)/gm, (a, l, c) => l + "    ".repeat(c.length)); n;)
                        if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(a => !!(r = a.call({
                                lexer: this
                            }, n, t)) && (n = n.substring(r.raw.length), t.push(r), !0)))) {
                            if (r = this.tokenizer.space(n)) {
                                n = n.substring(r.raw.length), 1 === r.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.code(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? t.push(r) : (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
                                continue
                            }
                            if (r = this.tokenizer.fences(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.heading(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.hr(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.blockquote(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.list(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.html(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.def(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
                                    href: r.href,
                                    title: r.title
                                }) : (o.raw += "\n" + r.raw, o.text += "\n" + r.raw, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
                                continue
                            }
                            if (r = this.tokenizer.table(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.lheading(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (i = n, this.options.extensions && this.options.extensions.startBlock) {
                                let a = 1 / 0;
                                const l = n.slice(1);
                                let c;
                                this.options.extensions.startBlock.forEach(function(u) {
                                    c = u.call({
                                        lexer: this
                                    }, l), "number" == typeof c && c >= 0 && (a = Math.min(a, c))
                                }), a < 1 / 0 && a >= 0 && (i = n.substring(0, a + 1))
                            }
                            if (this.state.top && (r = this.tokenizer.paragraph(i))) {
                                o = t[t.length - 1], s && "paragraph" === o.type ? (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(r), s = i.length !== n.length, n = n.substring(r.raw.length);
                                continue
                            }
                            if (r = this.tokenizer.text(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === o.type ? (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(r);
                                continue
                            }
                            if (n) {
                                const a = "Infinite loop on byte: " + n.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(a);
                                    break
                                }
                                throw new Error(a)
                            }
                        }
                    return this.state.top = !0, t
                }
                inline(n, t = []) {
                    return this.inlineQueue.push({
                        src: n,
                        tokens: t
                    }), t
                }
                inlineTokens(n, t = []) {
                    let r, o, i, a, l, c, s = n;
                    if (this.tokens.links) {
                        const u = Object.keys(this.tokens.links);
                        if (u.length > 0)
                            for (; null != (a = this.tokenizer.rules.inline.reflinkSearch.exec(s));) u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, a.index) + "[" + Qb("a", a[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
                    }
                    for (; null != (a = this.tokenizer.rules.inline.blockSkip.exec(s));) s = s.slice(0, a.index) + "[" + Qb("a", a[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                    for (; null != (a = this.tokenizer.rules.inline.escapedEmSt.exec(s));) s = s.slice(0, a.index + a[0].length - 2) + "++" + s.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex), this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
                    for (; n;)
                        if (l || (c = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(u => !!(r = u.call({
                                lexer: this
                            }, n, t)) && (n = n.substring(r.raw.length), t.push(r), !0)))) {
                            if (r = this.tokenizer.escape(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.tag(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === r.type && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.link(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.reflink(n, this.tokens.links)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === r.type && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.emStrong(n, s, c)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.codespan(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.br(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.del(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.autolink(n, Jb)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (!this.state.inLink && (r = this.tokenizer.url(n, Jb))) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (i = n, this.options.extensions && this.options.extensions.startInline) {
                                let u = 1 / 0;
                                const d = n.slice(1);
                                let f;
                                this.options.extensions.startInline.forEach(function(h) {
                                    f = h.call({
                                        lexer: this
                                    }, d), "number" == typeof f && f >= 0 && (u = Math.min(u, f))
                                }), u < 1 / 0 && u >= 0 && (i = n.substring(0, u + 1))
                            }
                            if (r = this.tokenizer.inlineText(i, Jj)) {
                                n = n.substring(r.raw.length), "_" !== r.raw.slice(-1) && (c = r.raw.slice(-1)), l = !0, o = t[t.length - 1], o && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (n) {
                                const u = "Infinite loop on byte: " + n.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(u);
                                    break
                                }
                                throw new Error(u)
                            }
                        }
                    return t
                }
            }
            class Ss {
                constructor(n) {
                    this.options = n || Nr
                }
                code(n, t, r) {
                    const o = (t || "").match(/\S*/)[0];
                    if (this.options.highlight) {
                        const i = this.options.highlight(n, o);
                        null != i && i !== n && (r = !0, n = i)
                    }
                    return n = n.replace(/\n$/, "") + "\n", o ? '<pre><code class="' + this.options.langPrefix + Je(o) + '">' + (r ? n : Je(n, !0)) + "</code></pre>\n" : "<pre><code>" + (r ? n : Je(n, !0)) + "</code></pre>\n"
                }
                blockquote(n) {
                    return `<blockquote>\n${n}</blockquote>\n`
                }
                html(n) {
                    return n
                }
                heading(n, t, r, o) {
                    return this.options.headerIds ? `<h${t} id="${this.options.headerPrefix+o.slug(r)}">${n}</h${t}>\n` : `<h${t}>${n}</h${t}>\n`
                }
                hr() {
                    return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
                }
                list(n, t, r) {
                    const o = t ? "ol" : "ul";
                    return "<" + o + (t && 1 !== r ? ' start="' + r + '"' : "") + ">\n" + n + "</" + o + ">\n"
                }
                listitem(n) {
                    return `<li>${n}</li>\n`
                }
                checkbox(n) {
                    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> "
                }
                paragraph(n) {
                    return `<p>${n}</p>\n`
                }
                table(n, t) {
                    return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + n + "</thead>\n" + t + "</table>\n"
                }
                tablerow(n) {
                    return `<tr>\n${n}</tr>\n`
                }
                tablecell(n, t) {
                    const r = t.header ? "th" : "td";
                    return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + n + `</${r}>\n`
                }
                strong(n) {
                    return `<strong>${n}</strong>`
                }
                em(n) {
                    return `<em>${n}</em>`
                }
                codespan(n) {
                    return `<code>${n}</code>`
                }
                br() {
                    return this.options.xhtml ? "<br/>" : "<br>"
                }
                del(n) {
                    return `<del>${n}</del>`
                }
                link(n, t, r) {
                    if (null === (n = Zb(this.options.sanitize, this.options.baseUrl, n))) return r;
                    let o = '<a href="' + n + '"';
                    return t && (o += ' title="' + t + '"'), o += ">" + r + "</a>", o
                }
                image(n, t, r) {
                    if (null === (n = Zb(this.options.sanitize, this.options.baseUrl, n))) return r;
                    let o = `<img src="${n}" alt="${r}"`;
                    return t && (o += ` title="${t}"`), o += this.options.xhtml ? "/>" : ">", o
                }
                text(n) {
                    return n
                }
            }
            class Kb {
                strong(n) {
                    return n
                }
                em(n) {
                    return n
                }
                codespan(n) {
                    return n
                }
                del(n) {
                    return n
                }
                html(n) {
                    return n
                }
                text(n) {
                    return n
                }
                link(n, t, r) {
                    return "" + r
                }
                image(n, t, r) {
                    return "" + r
                }
                br() {
                    return ""
                }
            }
            class eE {
                constructor() {
                    this.seen = {}
                }
                serialize(n) {
                    return n.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-")
                }
                getNextSafeSlug(n, t) {
                    let r = n,
                        o = 0;
                    if (this.seen.hasOwnProperty(r)) {
                        o = this.seen[n];
                        do {
                            o++, r = n + "-" + o
                        } while (this.seen.hasOwnProperty(r))
                    }
                    return t || (this.seen[n] = o, this.seen[r] = 0), r
                }
                slug(n, t = {}) {
                    const r = this.serialize(n);
                    return this.getNextSafeSlug(r, t.dryrun)
                }
            }
            class ar {
                constructor(n) {
                    this.options = n || Nr, this.options.renderer = this.options.renderer || new Ss, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new Kb, this.slugger = new eE
                }
                static parse(n, t) {
                    return new ar(t).parse(n)
                }
                static parseInline(n, t) {
                    return new ar(t).parseInline(n)
                }
                parse(n, t = !0) {
                    let o, i, s, a, l, c, u, d, f, h, p, g, y, v, m, w, S, P, oe, r = "";
                    const Ke = n.length;
                    for (o = 0; o < Ke; o++)
                        if (h = n[o], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[h.type] && (oe = this.options.extensions.renderers[h.type].call({
                                parser: this
                            }, h), !1 !== oe || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(h.type))) r += oe || "";
                        else switch (h.type) {
                            case "space":
                                continue;
                            case "hr":
                                r += this.renderer.hr();
                                continue;
                            case "heading":
                                r += this.renderer.heading(this.parseInline(h.tokens), h.depth, Wb(this.parseInline(h.tokens, this.textRenderer)), this.slugger);
                                continue;
                            case "code":
                                r += this.renderer.code(h.text, h.lang, h.escaped);
                                continue;
                            case "table":
                                for (d = "", u = "", a = h.header.length, i = 0; i < a; i++) u += this.renderer.tablecell(this.parseInline(h.header[i].tokens), {
                                    header: !0,
                                    align: h.align[i]
                                });
                                for (d += this.renderer.tablerow(u), f = "", a = h.rows.length, i = 0; i < a; i++) {
                                    for (c = h.rows[i], u = "", l = c.length, s = 0; s < l; s++) u += this.renderer.tablecell(this.parseInline(c[s].tokens), {
                                        header: !1,
                                        align: h.align[s]
                                    });
                                    f += this.renderer.tablerow(u)
                                }
                                r += this.renderer.table(d, f);
                                continue;
                            case "blockquote":
                                f = this.parse(h.tokens), r += this.renderer.blockquote(f);
                                continue;
                            case "list":
                                for (p = h.ordered, g = h.start, y = h.loose, a = h.items.length, f = "", i = 0; i < a; i++) m = h.items[i], w = m.checked, S = m.task, v = "", m.task && (P = this.renderer.checkbox(w), y ? m.tokens.length > 0 && "paragraph" === m.tokens[0].type ? (m.tokens[0].text = P + " " + m.tokens[0].text, m.tokens[0].tokens && m.tokens[0].tokens.length > 0 && "text" === m.tokens[0].tokens[0].type && (m.tokens[0].tokens[0].text = P + " " + m.tokens[0].tokens[0].text)) : m.tokens.unshift({
                                    type: "text",
                                    text: P
                                }) : v += P), v += this.parse(m.tokens, y), f += this.renderer.listitem(v, S, w);
                                r += this.renderer.list(f, p, g);
                                continue;
                            case "html":
                                r += this.renderer.html(h.text);
                                continue;
                            case "paragraph":
                                r += this.renderer.paragraph(this.parseInline(h.tokens));
                                continue;
                            case "text":
                                for (f = h.tokens ? this.parseInline(h.tokens) : h.text; o + 1 < Ke && "text" === n[o + 1].type;) h = n[++o], f += "\n" + (h.tokens ? this.parseInline(h.tokens) : h.text);
                                r += t ? this.renderer.paragraph(f) : f;
                                continue;
                            default:
                                {
                                    const vn = 'Token with "' + h.type + '" type was not found.';
                                    if (this.options.silent) return void console.error(vn);
                                    throw new Error(vn)
                                }
                        }
                    return r
                }
                parseInline(n, t) {
                    t = t || this.renderer;
                    let o, i, s, r = "";
                    const a = n.length;
                    for (o = 0; o < a; o++)
                        if (i = n[o], this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type] && (s = this.options.extensions.renderers[i.type].call({
                                parser: this
                            }, i), !1 !== s || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type))) r += s || "";
                        else switch (i.type) {
                            case "escape":
                            case "text":
                                r += t.text(i.text);
                                break;
                            case "html":
                                r += t.html(i.text);
                                break;
                            case "link":
                                r += t.link(i.href, i.title, this.parseInline(i.tokens, t));
                                break;
                            case "image":
                                r += t.image(i.href, i.title, i.text);
                                break;
                            case "strong":
                                r += t.strong(this.parseInline(i.tokens, t));
                                break;
                            case "em":
                                r += t.em(this.parseInline(i.tokens, t));
                                break;
                            case "codespan":
                                r += t.codespan(i.text);
                                break;
                            case "br":
                                r += t.br();
                                break;
                            case "del":
                                r += t.del(this.parseInline(i.tokens, t));
                                break;
                            default:
                                {
                                    const l = 'Token with "' + i.type + '" type was not found.';
                                    if (this.options.silent) return void console.error(l);
                                    throw new Error(l)
                                }
                        }
                    return r
                }
            }
            class $h {
                constructor(n) {
                    this.options = n || Nr
                }
                static passThroughHooks = new Set(["preprocess", "postprocess"]);
                preprocess(n) {
                    return n
                }
                postprocess(n) {
                    return n
                }
            }

            function tE(e, n) {
                return (t, r, o) => {
                    "function" == typeof r && (o = r, r = null);
                    const i = { ...r
                        },
                        s = function Kj(e, n, t) {
                            return r => {
                                if (r.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
                                    const o = "<p>An error occurred:</p><pre>" + Je(r.message + "", !0) + "</pre>";
                                    return n ? Promise.resolve(o) : t ? void t(null, o) : o
                                }
                                if (n) return Promise.reject(r);
                                if (!t) throw r;
                                t(r)
                            }
                        }((r = { ...O.defaults,
                            ...i
                        }).silent, r.async, o);
                    if (typeof t > "u" || null === t) return s(new Error("marked(): input parameter is undefined or null"));
                    if ("string" != typeof t) return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
                    if (function Qj(e) {
                            e && e.sanitize && !e.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")
                        }(r), r.hooks && (r.hooks.options = r), o) {
                        const a = r.highlight;
                        let l;
                        try {
                            r.hooks && (t = r.hooks.preprocess(t)), l = e(t, r)
                        } catch (d) {
                            return s(d)
                        }
                        const c = function(d) {
                            let f;
                            if (!d) try {
                                r.walkTokens && O.walkTokens(l, r.walkTokens), f = n(l, r), r.hooks && (f = r.hooks.postprocess(f))
                            } catch (h) {
                                d = h
                            }
                            return r.highlight = a, d ? s(d) : o(null, f)
                        };
                        if (!a || a.length < 3 || (delete r.highlight, !l.length)) return c();
                        let u = 0;
                        return O.walkTokens(l, function(d) {
                            "code" === d.type && (u++, setTimeout(() => {
                                a(d.text, d.lang, function(f, h) {
                                    if (f) return c(f);
                                    null != h && h !== d.text && (d.text = h, d.escaped = !0), u--, 0 === u && c()
                                })
                            }, 0))
                        }), void(0 === u && c())
                    }
                    if (r.async) return Promise.resolve(r.hooks ? r.hooks.preprocess(t) : t).then(a => e(a, r)).then(a => r.walkTokens ? Promise.all(O.walkTokens(a, r.walkTokens)).then(() => a) : a).then(a => n(a, r)).then(a => r.hooks ? r.hooks.postprocess(a) : a).catch(s);
                    try {
                        r.hooks && (t = r.hooks.preprocess(t));
                        const a = e(t, r);
                        r.walkTokens && O.walkTokens(a, r.walkTokens);
                        let l = n(a, r);
                        return r.hooks && (l = r.hooks.postprocess(l)), l
                    } catch (a) {
                        return s(a)
                    }
                }
            }

            function O(e, n, t) {
                return tE(sr.lex, ar.parse)(e, n, t)
            }
            O.options = O.setOptions = function(e) {
                return function Lj(e) {
                    Nr = e
                }(O.defaults = { ...O.defaults,
                    ...e
                }), O
            }, O.getDefaults = function Ub() {
                return {
                    async: !1,
                    baseUrl: null,
                    breaks: !1,
                    extensions: null,
                    gfm: !0,
                    headerIds: !0,
                    headerPrefix: "",
                    highlight: null,
                    hooks: null,
                    langPrefix: "language-",
                    mangle: !0,
                    pedantic: !1,
                    renderer: null,
                    sanitize: !1,
                    sanitizer: null,
                    silent: !1,
                    smartypants: !1,
                    tokenizer: null,
                    walkTokens: null,
                    xhtml: !1
                }
            }, O.defaults = Nr, O.use = function(...e) {
                const n = O.defaults.extensions || {
                    renderers: {},
                    childTokens: {}
                };
                e.forEach(t => {
                    const r = { ...t
                    };
                    if (r.async = O.defaults.async || r.async || !1, t.extensions && (t.extensions.forEach(o => {
                            if (!o.name) throw new Error("extension name required");
                            if (o.renderer) {
                                const i = n.renderers[o.name];
                                n.renderers[o.name] = i ? function(...s) {
                                    let a = o.renderer.apply(this, s);
                                    return !1 === a && (a = i.apply(this, s)), a
                                } : o.renderer
                            }
                            if (o.tokenizer) {
                                if (!o.level || "block" !== o.level && "inline" !== o.level) throw new Error("extension level must be 'block' or 'inline'");
                                n[o.level] ? n[o.level].unshift(o.tokenizer) : n[o.level] = [o.tokenizer], o.start && ("block" === o.level ? n.startBlock ? n.startBlock.push(o.start) : n.startBlock = [o.start] : "inline" === o.level && (n.startInline ? n.startInline.push(o.start) : n.startInline = [o.start]))
                            }
                            o.childTokens && (n.childTokens[o.name] = o.childTokens)
                        }), r.extensions = n), t.renderer) {
                        const o = O.defaults.renderer || new Ss;
                        for (const i in t.renderer) {
                            const s = o[i];
                            o[i] = (...a) => {
                                let l = t.renderer[i].apply(o, a);
                                return !1 === l && (l = s.apply(o, a)), l
                            }
                        }
                        r.renderer = o
                    }
                    if (t.tokenizer) {
                        const o = O.defaults.tokenizer || new jh;
                        for (const i in t.tokenizer) {
                            const s = o[i];
                            o[i] = (...a) => {
                                let l = t.tokenizer[i].apply(o, a);
                                return !1 === l && (l = s.apply(o, a)), l
                            }
                        }
                        r.tokenizer = o
                    }
                    if (t.hooks) {
                        const o = O.defaults.hooks || new $h;
                        for (const i in t.hooks) {
                            const s = o[i];
                            o[i] = $h.passThroughHooks.has(i) ? a => {
                                if (O.defaults.async) return Promise.resolve(t.hooks[i].call(o, a)).then(c => s.call(o, c));
                                const l = t.hooks[i].call(o, a);
                                return s.call(o, l)
                            } : (...a) => {
                                let l = t.hooks[i].apply(o, a);
                                return !1 === l && (l = s.apply(o, a)), l
                            }
                        }
                        r.hooks = o
                    }
                    if (t.walkTokens) {
                        const o = O.defaults.walkTokens;
                        r.walkTokens = function(i) {
                            let s = [];
                            return s.push(t.walkTokens.call(this, i)), o && (s = s.concat(o.call(this, i))), s
                        }
                    }
                    O.setOptions(r)
                })
            }, O.walkTokens = function(e, n) {
                let t = [];
                for (const r of e) switch (t = t.concat(n.call(O, r)), r.type) {
                    case "table":
                        for (const o of r.header) t = t.concat(O.walkTokens(o.tokens, n));
                        for (const o of r.rows)
                            for (const i of o) t = t.concat(O.walkTokens(i.tokens, n));
                        break;
                    case "list":
                        t = t.concat(O.walkTokens(r.items, n));
                        break;
                    default:
                        O.defaults.extensions && O.defaults.extensions.childTokens && O.defaults.extensions.childTokens[r.type] ? O.defaults.extensions.childTokens[r.type].forEach(function(o) {
                            t = t.concat(O.walkTokens(r[o], n))
                        }) : r.tokens && (t = t.concat(O.walkTokens(r.tokens, n)))
                }
                return t
            }, O.parseInline = tE(sr.lexInline, ar.parseInline), O.Parser = ar, O.parser = ar.parse, O.Renderer = Ss, O.TextRenderer = Kb, O.Lexer = sr, O.lexer = sr.lex, O.Tokenizer = jh, O.Slugger = eE, O.Hooks = $h, O.parse = O;
            const e$ = ["*"];
            let nE = (() => {
                class e {
                    constructor() {
                        this._buttonClick$ = new Ue, this.copied$ = this._buttonClick$.pipe(Ft(() => yp(k(!0), function Nj(e = 0, n, t = Pj) {
                            let r = -1;
                            return null != n && (fp(n) ? t = n : r = n), new De(o => {
                                let i = function kj(e) {
                                    return e instanceof Date && !isNaN(e)
                                }(e) ? +e - t.now() : e;
                                i < 0 && (i = 0);
                                let s = 0;
                                return t.schedule(function() {
                                    o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
                                }, i)
                            })
                        }(3e3).pipe(V0(!1)))), vp(), function Fj(e, n, t) {
                            let r, o = !1;
                            return e && "object" == typeof e ? ({
                                bufferSize: r = 1 / 0,
                                windowTime: n = 1 / 0,
                                refCount: o = !1,
                                scheduler: t
                            } = e) : r = e ? ? 1 / 0, yc({
                                connector: () => new Rj(r, n, t),
                                resetOnError: !0,
                                resetOnComplete: !1,
                                resetOnRefCountZero: o
                            })
                        }(1)), this.copiedText$ = this.copied$.pipe(F0(!1), Q(t => t ? "Copied" : "Copy"))
                    }
                    onCopyToClipboardClick() {
                        this._buttonClick$.next()
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static# t = this.\u0275cmp = wn({
                        type: e,
                        selectors: [
                            ["markdown-clipboard"]
                        ],
                        decls: 4,
                        vars: 7,
                        consts: [
                            [1, "markdown-clipboard-button", 3, "click"]
                        ],
                        template: function(r, o) {
                            1 & r && (L(0, "button", 0), Se("click", function() {
                                return o.onCopyToClipboardClick()
                            }), Rd(1, "async"), Fe(2), Rd(3, "async"), V()), 2 & r && ($i("copied", Fd(1, 3, o.copied$)), F(2), Ye(Fd(3, 5, o.copiedText$)))
                        },
                        dependencies: [RD],
                        encapsulation: 2,
                        changeDetection: 0
                    })
                }
                return e
            })();
            class r$ {}
            var Bh = function(e) {
                return e.CommandLine = "command-line", e.LineHighlight = "line-highlight", e.LineNumbers = "line-numbers", e
            }(Bh || {});
            class i$ {}
            const rE = new E("SECURITY_CONTEXT");
            let Hh = (() => {
                    class e {
                        get options() {
                            return this._options
                        }
                        set options(t) {
                            this._options = { ...this.DEFAULT_MARKED_OPTIONS,
                                ...t
                            }
                        }
                        get renderer() {
                            return this.options.renderer
                        }
                        set renderer(t) {
                            this.options.renderer = t
                        }
                        constructor(t, r, o, i, s, a) {
                            this.platform = t, this.securityContext = r, this.http = o, this.clipboardOptions = i, this.sanitizer = a, this.DEFAULT_MARKED_OPTIONS = {
                                renderer: new Ss
                            }, this.DEFAULT_KATEX_OPTIONS = {
                                delimiters: [{
                                    left: "$$",
                                    right: "$$",
                                    display: !0
                                }, {
                                    left: "$",
                                    right: "$",
                                    display: !1
                                }, {
                                    left: "\\(",
                                    right: "\\)",
                                    display: !1
                                }, {
                                    left: "\\begin{equation}",
                                    right: "\\end{equation}",
                                    display: !0
                                }, {
                                    left: "\\begin{align}",
                                    right: "\\end{align}",
                                    display: !0
                                }, {
                                    left: "\\begin{alignat}",
                                    right: "\\end{alignat}",
                                    display: !0
                                }, {
                                    left: "\\begin{gather}",
                                    right: "\\end{gather}",
                                    display: !0
                                }, {
                                    left: "\\begin{CD}",
                                    right: "\\end{CD}",
                                    display: !0
                                }, {
                                    left: "\\[",
                                    right: "\\]",
                                    display: !0
                                }]
                            }, this.DEFAULT_MERMAID_OPTIONS = {
                                startOnLoad: !1
                            }, this.DEFAULT_CLIPBOARD_OPTIONS = {
                                buttonComponent: void 0
                            }, this.DEFAULT_PARSE_OPTIONS = {
                                decodeHtml: !1,
                                inline: !1,
                                emoji: !1,
                                mermaid: !1,
                                markedOptions: this.DEFAULT_MARKED_OPTIONS,
                                disableSanitizer: !1
                            }, this.DEFAULT_RENDER_OPTIONS = {
                                clipboard: !1,
                                clipboardOptions: void 0,
                                katex: !1,
                                katexOptions: void 0,
                                mermaid: !1,
                                mermaidOptions: void 0
                            }, this._reload$ = new Ue, this.reload$ = this._reload$.asObservable(), this.options = s
                        }
                        parse(t, r = this.DEFAULT_PARSE_OPTIONS) {
                            const {
                                decodeHtml: o,
                                inline: i,
                                emoji: s,
                                mermaid: a,
                                disableSanitizer: l
                            } = r, c = { ...this.options,
                                ...r.markedOptions
                            };
                            a && (this.renderer = this.extendRenderer(c.renderer || new Ss));
                            const u = this.trimIndentation(t),
                                d = o ? this.decodeHtml(u) : u,
                                f = s ? this.parseEmoji(d) : d,
                                h = this.parseMarked(f, c, i);
                            return (l ? h : this.sanitizer.sanitize(this.securityContext, h)) || ""
                        }
                        render(t, r = this.DEFAULT_RENDER_OPTIONS, o) {
                            const {
                                clipboard: i,
                                clipboardOptions: s,
                                katex: a,
                                katexOptions: l,
                                mermaid: c,
                                mermaidOptions: u
                            } = r;
                            i && this.renderClipboard(t, o, { ...this.DEFAULT_CLIPBOARD_OPTIONS,
                                ...this.clipboardOptions,
                                ...s
                            }), a && this.renderKatex(t, { ...this.DEFAULT_KATEX_OPTIONS,
                                ...l
                            }), c && this.renderMermaid(t, { ...this.DEFAULT_MERMAID_OPTIONS,
                                ...u
                            }), this.highlight(t)
                        }
                        reload() {
                            this._reload$.next()
                        }
                        getSource(t) {
                            if (!this.http) throw new Error("[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information");
                            return this.http.get(t, {
                                responseType: "text"
                            }).pipe(Q(r => this.handleExtension(t, r)))
                        }
                        highlight(t) {
                            if (!Fo(this.platform) || typeof Prism > "u" || typeof Prism.highlightAllUnder > "u") return;
                            t || (t = document);
                            const r = t.querySelectorAll('pre code:not([class*="language-"])');
                            Array.prototype.forEach.call(r, o => o.classList.add("language-none")), Prism.highlightAllUnder(t)
                        }
                        decodeHtml(t) {
                            if (!Fo(this.platform)) return t;
                            const r = document.createElement("textarea");
                            return r.innerHTML = t, r.value
                        }
                        extendRenderer(t) {
                            const r = t;
                            if (!0 === r.\u0275NgxMarkdownRendererExtended) return t;
                            const o = t.code;
                            return t.code = function(i, s, a) {
                                return "mermaid" === s ? `<div class="mermaid">${i}</div>` : o.call(this, i, s, a)
                            }, r.\u0275NgxMarkdownRendererExtended = !0, t
                        }
                        handleExtension(t, r) {
                            const o = t.lastIndexOf("://"),
                                i = o > -1 ? t.substring(o + 4) : t,
                                s = i.lastIndexOf("/"),
                                a = s > -1 ? i.substring(s + 1).split("?")[0] : "",
                                l = a.lastIndexOf("."),
                                c = l > -1 ? a.substring(l + 1) : "";
                            return c && "md" !== c ? "```" + c + "\n" + r + "\n```" : r
                        }
                        parseMarked(t, r, o = !1) {
                            return o ? O.parseInline(t, r) : O.parse(t, r)
                        }
                        parseEmoji(t) {
                            if (!Fo(this.platform)) return t;
                            if (typeof joypixels > "u" || typeof joypixels.shortnameToUnicode > "u") throw new Error("[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information");
                            return joypixels.shortnameToUnicode(t)
                        }
                        renderKatex(t, r) {
                            if (Fo(this.platform)) {
                                if (typeof katex > "u" || typeof renderMathInElement > "u") throw new Error("[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information");
                                renderMathInElement(t, r)
                            }
                        }
                        renderClipboard(t, r, o) {
                            if (!Fo(this.platform)) return;
                            if (typeof ClipboardJS > "u") throw new Error("[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information");
                            if (!r) throw new Error("[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function");
                            const {
                                buttonComponent: i,
                                buttonTemplate: s
                            } = o, a = t.querySelectorAll("pre");
                            for (let l = 0; l < a.length; l++) {
                                const c = a.item(l),
                                    u = document.createElement("div");
                                u.style.position = "relative", c.parentNode.insertBefore(u, c), u.appendChild(c);
                                const d = document.createElement("div");
                                let f, h;
                                d.style.position = "absolute", d.style.top = ".5em", d.style.right = ".5em", d.style.opacity = "0", d.style.transition = "opacity 250ms ease-out", u.insertAdjacentElement("beforeend", d), c.onmouseover = () => d.style.opacity = "1", c.onmouseout = () => d.style.opacity = "0", f = i ? r.createComponent(i).hostView : s ? r.createEmbeddedView(s) : r.createComponent(nE).hostView, f.rootNodes.forEach(p => {
                                    p.onmouseover = () => d.style.opacity = "1", d.appendChild(p), h = new ClipboardJS(p, {
                                        text: () => c.innerText
                                    })
                                }), f.onDestroy(() => h.destroy())
                            }
                        }
                        renderMermaid(t, r = this.DEFAULT_MERMAID_OPTIONS) {
                            if (!Fo(this.platform)) return;
                            if (typeof mermaid > "u" || typeof mermaid.init > "u") throw new Error("[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information");
                            const o = t.querySelectorAll(".mermaid");
                            0 !== o.length && (mermaid.initialize(r), mermaid.init(o))
                        }
                        trimIndentation(t) {
                            if (!t) return "";
                            let r;
                            return t.split("\n").map(o => {
                                let i = r;
                                return o.length > 0 && (i = isNaN(i) ? o.search(/\S|$/) : Math.min(o.search(/\S|$/), i)), isNaN(r) && (r = i), i ? o.substring(i) : o
                            }).join("\n")
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(I(Wn), I(rE), I(Fl, 8), I(r$, 8), I(i$, 8), I($f))
                        };
                        static# t = this.\u0275prov = A({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                oE = (() => {
                    class e {
                        get disableSanitizer() {
                            return this._disableSanitizer
                        }
                        set disableSanitizer(t) {
                            this._disableSanitizer = this.coerceBooleanProperty(t)
                        }
                        get inline() {
                            return this._inline
                        }
                        set inline(t) {
                            this._inline = this.coerceBooleanProperty(t)
                        }
                        get srcRelativeLink() {
                            return this._srcRelativeLink
                        }
                        set srcRelativeLink(t) {
                            this._srcRelativeLink = this.coerceBooleanProperty(t)
                        }
                        get clipboard() {
                            return this._clipboard
                        }
                        set clipboard(t) {
                            this._clipboard = this.coerceBooleanProperty(t)
                        }
                        get emoji() {
                            return this._emoji
                        }
                        set emoji(t) {
                            this._emoji = this.coerceBooleanProperty(t)
                        }
                        get katex() {
                            return this._katex
                        }
                        set katex(t) {
                            this._katex = this.coerceBooleanProperty(t)
                        }
                        get mermaid() {
                            return this._mermaid
                        }
                        set mermaid(t) {
                            this._mermaid = this.coerceBooleanProperty(t)
                        }
                        get lineHighlight() {
                            return this._lineHighlight
                        }
                        set lineHighlight(t) {
                            this._lineHighlight = this.coerceBooleanProperty(t)
                        }
                        get lineNumbers() {
                            return this._lineNumbers
                        }
                        set lineNumbers(t) {
                            this._lineNumbers = this.coerceBooleanProperty(t)
                        }
                        get commandLine() {
                            return this._commandLine
                        }
                        set commandLine(t) {
                            this._commandLine = this.coerceBooleanProperty(t)
                        }
                        constructor(t, r, o) {
                            this.element = t, this.markdownService = r, this.viewContainerRef = o, this.error = new ye, this.load = new ye, this.ready = new ye, this._clipboard = !1, this._commandLine = !1, this._disableSanitizer = !1, this._emoji = !1, this._inline = !1, this._katex = !1, this._lineHighlight = !1, this._lineNumbers = !1, this._mermaid = !1, this._srcRelativeLink = !1, this.destroyed$ = new Ue
                        }
                        ngOnChanges() {
                            this.loadContent()
                        }
                        loadContent() {
                            null == this.data ? null == this.src || this.handleSrc() : this.handleData()
                        }
                        ngAfterViewInit() {
                            !this.data && !this.src && this.handleTransclusion(), this.markdownService.reload$.pipe(j0(this.destroyed$)).subscribe(() => this.loadContent())
                        }
                        ngOnDestroy() {
                            this.destroyed$.next(), this.destroyed$.complete()
                        }
                        render(t, r = !1) {
                            let o;
                            this.src && this.srcRelativeLink && (o = {
                                baseUrl: new URL(this.src, location.origin).pathname
                            });
                            const s = {
                                    clipboard: this.clipboard,
                                    clipboardOptions: {
                                        buttonComponent: this.clipboardButtonComponent,
                                        buttonTemplate: this.clipboardButtonTemplate
                                    },
                                    katex: this.katex,
                                    katexOptions: this.katexOptions,
                                    mermaid: this.mermaid,
                                    mermaidOptions: this.mermaidOptions
                                },
                                a = this.markdownService.parse(t, {
                                    decodeHtml: r,
                                    inline: this.inline,
                                    emoji: this.emoji,
                                    mermaid: this.mermaid,
                                    markedOptions: o,
                                    disableSanitizer: this.disableSanitizer
                                });
                            this.element.nativeElement.innerHTML = a, this.handlePlugins(), this.markdownService.render(this.element.nativeElement, s, this.viewContainerRef), this.ready.emit()
                        }
                        coerceBooleanProperty(t) {
                            return null != t && "false" != `${String(t)}`
                        }
                        handleData() {
                            this.render(this.data)
                        }
                        handleSrc() {
                            this.markdownService.getSource(this.src).subscribe({
                                next: t => {
                                    this.render(t), this.load.emit(t)
                                },
                                error: t => this.error.emit(t)
                            })
                        }
                        handleTransclusion() {
                            this.render(this.element.nativeElement.innerHTML, !0)
                        }
                        handlePlugins() {
                            this.commandLine && (this.setPluginClass(this.element.nativeElement, Bh.CommandLine), this.setPluginOptions(this.element.nativeElement, {
                                dataFilterOutput: this.filterOutput,
                                dataHost: this.host,
                                dataPrompt: this.prompt,
                                dataOutput: this.output,
                                dataUser: this.user
                            })), this.lineHighlight && this.setPluginOptions(this.element.nativeElement, {
                                dataLine: this.line,
                                dataLineOffset: this.lineOffset
                            }), this.lineNumbers && (this.setPluginClass(this.element.nativeElement, Bh.LineNumbers), this.setPluginOptions(this.element.nativeElement, {
                                dataStart: this.start
                            }))
                        }
                        setPluginClass(t, r) {
                            const o = t.querySelectorAll("pre");
                            for (let i = 0; i < o.length; i++) {
                                const s = r instanceof Array ? r : [r];
                                o.item(i).classList.add(...s)
                            }
                        }
                        setPluginOptions(t, r) {
                            const o = t.querySelectorAll("pre");
                            for (let i = 0; i < o.length; i++) Object.keys(r).forEach(s => {
                                const a = r[s];
                                if (a) {
                                    const l = this.toLispCase(s);
                                    o.item(i).setAttribute(l, a.toString())
                                }
                            })
                        }
                        toLispCase(t) {
                            const r = t.match(/([A-Z])/g);
                            if (!r) return t;
                            let o = t.toString();
                            for (let i = 0, s = r.length; i < s; i++) o = o.replace(new RegExp(r[i]), "-" + r[i].toLowerCase());
                            return "-" === o.slice(0, 1) && (o = o.slice(1)), o
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)(C(it), C(Hh), C(kt))
                        };
                        static# t = this.\u0275cmp = wn({
                            type: e,
                            selectors: [
                                ["markdown"],
                                ["", "markdown", ""]
                            ],
                            inputs: {
                                data: "data",
                                src: "src",
                                disableSanitizer: "disableSanitizer",
                                inline: "inline",
                                srcRelativeLink: "srcRelativeLink",
                                clipboard: "clipboard",
                                clipboardButtonComponent: "clipboardButtonComponent",
                                clipboardButtonTemplate: "clipboardButtonTemplate",
                                emoji: "emoji",
                                katex: "katex",
                                katexOptions: "katexOptions",
                                mermaid: "mermaid",
                                mermaidOptions: "mermaidOptions",
                                lineHighlight: "lineHighlight",
                                line: "line",
                                lineOffset: "lineOffset",
                                lineNumbers: "lineNumbers",
                                start: "start",
                                commandLine: "commandLine",
                                filterOutput: "filterOutput",
                                host: "host",
                                prompt: "prompt",
                                output: "output",
                                user: "user"
                            },
                            outputs: {
                                error: "error",
                                load: "load",
                                ready: "ready"
                            },
                            features: [Mt],
                            ngContentSelectors: e$,
                            decls: 1,
                            vars: 0,
                            template: function(r, o) {
                                1 & r && (function _v(e) {
                                    const n = _()[Me][Ge];
                                    if (!n.projection) {
                                        const r = n.projection = vi(e ? e.length : 1, null),
                                            o = r.slice();
                                        let i = n.child;
                                        for (; null !== i;) {
                                            const s = e ? UT(i, e) : 0;
                                            null !== s && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i), i = i.next
                                        }
                                    }
                                }(), function Cv(e, n = 0, t) {
                                    const r = _(),
                                        o = Y(),
                                        i = go(o, W + e, 16, null, t || null);
                                    null === i.projection && (i.projection = n), Gc(), (!r[bn] || qr()) && 32 != (32 & i.flags) && function jx(e, n, t) {
                                        bm(n[H], 0, n, t, vu(e, t, n), ym(t.parent || n[Ge], t, n))
                                    }(o, r, i)
                                }(0))
                            },
                            encapsulation: 2
                        })
                    }
                    return e
                })(),
                f$ = (() => {
                    class e {
                        static forRoot(t) {
                            return {
                                ngModule: e,
                                providers: [Hh, t && t.loader || [], t && t.clipboardOptions || [], t && t.markedOptions || [], {
                                    provide: rE,
                                    useValue: t && null != t.sanitize ? t.sanitize : At.HTML
                                }]
                            }
                        }
                        static forChild() {
                            return {
                                ngModule: e
                            }
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [LD]
                        })
                    }
                    return e
                })();
            var iE;

            function h$(e, n) {
                1 & e && he(0, "img", 33), 2 & e && Pt("src", pe(2).environment.profile_effect.intro, We)
            }

            function p$(e, n) {
                1 & e && he(0, "img", 34), 2 & e && Pt("src", pe(2).environment.profile_effect.loop, We)
            }

            function g$(e, n) {
                if (1 & e && (L(0, "div", 35)(1, "a", 36), he(2, "img", 37), L(3, "div", 38), Fe(4), V()()()), 2 & e) {
                    const t = n.$implicit;
                    F(1), Pt("href", t.link || "", We), F(1), Zt("src", "https://khaidevapi.up.railway.app/api/badge/", t.icon, ".png", We), Pt("alt", t.id), F(2), Ye(t.description)
                }
            }

            function m$(e, n) {
                1 & e && (Zs(), L(0, "svg", 39), he(1, "path", 40), V()), 2 & e && vt("fill", pe(2).statusColor)
            }

            function y$(e, n) {
                1 & e && (Zs(), L(0, "svg", 41), he(1, "path", 42), V()), 2 & e && vt("fill", pe(2).statusColor)
            }

            function v$(e, n) {
                1 & e && (Zs(), L(0, "svg", 43), he(1, "path", 44), V()), 2 & e && vt("fill", pe(2).statusColor)
            }

            function _$(e, n) {
                if (1 & e && (L(0, "div", 45)(1, "div", 46), Fe(2, "About Me"), V(), he(3, "markdown", 47), V()), 2 & e) {
                    const t = pe(2);
                    F(3), ae("data", t.userBioFormatted)("inline", !1)
                }
            }

            function C$(e, n) {
                if (1 & e) {
                    const t = Mo();
                    L(0, "img", 58), Se("error", function(o) {
                        return hr(t), pr(pe(5).handleImageError(o))
                    }), V()
                }
                if (2 & e) {
                    const t = pe(2).$implicit;
                    Pt("src", pe(3).getActivityImageUrl(t, null == t.assets ? null : t.assets.small_image), We), Pt("alt", t.type)
                }
            }

            function D$(e, n) {
                if (1 & e) {
                    const t = Mo();
                    L(0, "div")(1, "img", 56), Se("error", function(o) {
                        return hr(t), pr(pe(4).handleImageError(o))
                    }), V(), Ne(2, C$, 1, 2, "img", 57), V()
                }
                if (2 & e) {
                    const t = pe().$implicit,
                        r = pe(3);
                    F(1), Pt("src", r.getActivityImageUrl(t, null == t.assets ? null : t.assets.large_image), We), Pt("alt", t.type), F(1), ae("ngIf", null == t.assets ? null : t.assets.small_image)
                }
            }

            function w$(e, n) {
                if (1 & e) {
                    const t = Mo();
                    L(0, "img", 58), Se("error", function(o) {
                        return hr(t), pr(pe(5).handleImageError(o))
                    }), V()
                }
                if (2 & e) {
                    const t = pe(2).$implicit,
                        r = pe(3);
                    Pt("alt", t.type), ae("src", r.getActivityImageUrl(t, null == t.assets ? null : t.assets.small_image), We)
                }
            }

            function b$(e, n) {
                if (1 & e) {
                    const t = Mo();
                    L(0, "div")(1, "a", 59)(2, "img", 56), Se("error", function(o) {
                        return hr(t), pr(pe(4).handleImageError(o))
                    }), V(), Ne(3, w$, 1, 2, "img", 57), V()()
                }
                if (2 & e) {
                    const t = pe().$implicit,
                        r = pe(3);
                    F(1), Zt("href", "https://open.spotify.com/track/", t.sync_id, "", We), F(1), Pt("alt", t.type), ae("src", r.getActivityImageUrl(t, null == t.assets ? null : t.assets.large_image), We), F(1), ae("ngIf", null == t.assets ? null : t.assets.small_image)
                }
            }

            function E$(e, n) {
                if (1 & e && (L(0, "a", 59), Fe(1), V()), 2 & e) {
                    const t = pe().$implicit;
                    Zt("href", "https://open.spotify.com/track/", t.sync_id, "", We), F(1), Ye(t.details)
                }
            }

            function M$(e, n) {
                if (1 & e && (L(0, "p"), Fe(1), V()), 2 & e) {
                    const t = pe().$implicit;
                    F(1), Ye(t.details)
                }
            }

            function I$(e, n) {
                if (1 & e && (L(0, "div")(1, "div", 50)(2, "div", 51), Ne(3, D$, 3, 3, "div", 52), Ne(4, b$, 4, 4, "div", 52), V(), L(5, "div", 53)(6, "p", 54), Fe(7), V(), Ne(8, E$, 2, 2, "a", 55), Ne(9, M$, 2, 1, "p", 52), L(10, "p"), Fe(11), V(), L(12, "p"), Fe(13), V()()()()), 2 & e) {
                    const t = n.$implicit;
                    F(3), ae("ngIf", "Spotify" !== t.name), F(1), ae("ngIf", "Spotify" === t.name), F(3), Ye(t.name), F(1), ae("ngIf", "Spotify" === t.name), F(1), ae("ngIf", "Spotify" !== t.name), F(2), Ye(t.state), F(2), Ye(null == t.timestamps ? null : t.timestamps.start)
                }
            }

            function x$(e, n) {
                if (1 & e && (L(0, "div", 48)(1, "div", 46), Fe(2), V(), Ne(3, I$, 14, 7, "div", 49), V()), 2 & e) {
                    const t = pe(2);
                    F(2), Ye(t.lanyardActivities.length > 1 ? "Activities" : "Activity"), F(1), ae("ngForOf", t.lanyardActivities)
                }
            }

            function S$(e, n) {
                if (1 & e && (L(0, "div", 63), he(1, "img", 64), L(2, "div", 65), Fe(3), V()()), 2 & e) {
                    const t = n.$implicit;
                    F(1), Zt("src", "../../../assets/images/connections/", t.type, ".svg", We), Pt("alt", t.type), F(2), Ye(t.name)
                }
            }

            function A$(e, n) {
                if (1 & e && (L(0, "div", 60)(1, "div", 46), Fe(2, "Connected accounts"), V(), L(3, "div", 61), Ne(4, S$, 4, 3, "div", 62), V()()), 2 & e) {
                    const t = pe(2);
                    F(4), ae("ngForOf", null == t.userData ? null : t.userData.connected_accounts)
                }
            }! function(e) {
                let n;
                var o;
                let t, r;
                (o = n = e.SecurityLevel || (e.SecurityLevel = {})).Strict = "strict", o.Loose = "loose", o.Antiscript = "antiscript", o.Sandbox = "sandbox",
                    function(o) {
                        o.Base = "base", o.Forest = "forest", o.Dark = "dark", o.Default = "default", o.Neutral = "neutral"
                    }(t = e.Theme || (e.Theme = {})),
                    function(o) {
                        o[o.Debug = 1] = "Debug", o[o.Info = 2] = "Info", o[o.Warn = 3] = "Warn", o[o.Error = 4] = "Error", o[o.Fatal = 5] = "Fatal"
                    }(r = e.LogLevel || (e.LogLevel = {}))
            }(iE || (iE = {}));
            const T$ = function(e, n) {
                    return {
                        "--color1": e,
                        "--color2": n
                    }
                },
                O$ = function(e) {
                    return {
                        "background-image": e
                    }
                },
                P$ = function(e, n, t, r, o, i, s, a) {
                    return {
                        online: e,
                        idle: n,
                        dnd: t,
                        offline: r,
                        streaming: o,
                        invisible: i,
                        unknown: s,
                        default: a
                    }
                };

            function k$(e, n) {
                if (1 & e) {
                    const t = Mo();
                    L(0, "div", 5)(1, "div", 6), Ne(2, h$, 1, 1, "img", 7), Ne(3, p$, 1, 1, "img", 8), L(4, "div", 9), he(5, "div", 10), V(), L(6, "div", 11)(7, "div", 12)(8, "a", 13), he(9, "img", 14), L(10, "div", 15), he(11, "img", 16)(12, "div", 17), V()(), L(13, "div", 18), Ne(14, g$, 5, 4, "div", 19), V()(), L(15, "div", 20)(16, "div", 21)(17, "p"), Fe(18), V(), L(19, "div", 22), Ne(20, m$, 2, 1, "svg", 23), Ne(21, y$, 2, 1, "svg", 24), Ne(22, v$, 2, 1, "svg", 25), V()(), L(23, "div", 26)(24, "p"), Fe(25), V()(), L(26, "div", 27)(27, "p"), Fe(28), V()(), he(29, "hr"), Ne(30, _$, 4, 2, "div", 28), Ne(31, x$, 4, 2, "div", 29), Ne(32, A$, 5, 1, "div", 30), L(33, "div", 31)(34, "input", 32), Se("ngModelChange", function(o) {
                        return hr(t), pr(pe().message = o)
                    })("keyup.enter", function() {
                        return hr(t), pr(pe().sendMessage())
                    }), V()()()()()()
                }
                if (2 & e) {
                    const t = pe();
                    F(1), ae("ngStyle", W_(20, T$, t.themesColor[0] ? t.themesColor[0] : "#5C5C5C", t.themesColor[1] ? t.themesColor[1] : "#5C5C5C")), F(1), ae("ngIf", t.environment.profile_effect.intro), F(1), ae("ngIf", t.environment.profile_effect.loop), F(2), ae("ngStyle", function q_(e, n, t, r) {
                        return Y_(_(), nt(), e, n, t, r)
                    }(23, O$, t.banner)), F(3), Zt("href", "https://discord.com/users/", t.userId, "", We), F(1), Zt("src", "https://cdn.discordapp.com/avatar-decoration-presets/", t.avatarDecorationAsset, ".png", We), F(2), Zt("src", "https://khaidevapi.up.railway.app/api/avatar/", t.userId, "", We), F(1), ae("ngClass", function Z_(e, n, t, r, o, i, s, a, l, c, u) {
                        const d = nt() + e,
                            f = _(),
                            h = $t(f, d, t, r, o, i);
                        return $t(f, d + 4, s, a, l, c) || h ? dn(f, d + 8, u ? n.call(u, t, r, o, i, s, a, l, c) : n(t, r, o, i, s, a, l, c)) : function Ri(e, n) {
                            return e[n]
                        }(f, d + 8)
                    }(25, P$, "online" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "idle" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "dnd" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "offline" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "streaming" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "invisible" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "unknown" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), !(null != t.lanyardData && null != t.lanyardData.d && t.lanyardData.d.discord_status))), F(2), ae("ngForOf", null == t.userData ? null : t.userData.badges), F(4), Ye((null == t.userData || null == t.userData.user ? null : t.userData.user.global_name) || (null == t.userData || null == t.userData.user ? null : t.userData.user.username)), F(2), ae("ngIf", null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.active_on_discord_desktop), F(1), ae("ngIf", null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.active_on_discord_web), F(1), ae("ngIf", null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.active_on_discord_mobile), F(3), Ye(null == t.userData || null == t.userData.user ? null : t.userData.user.username), F(3), Ye((null == t.userData || null == t.userData.user_profile ? null : t.userData.user_profile.pronouns) || ""), F(2), ae("ngIf", (null == t.userData || null == t.userData.user_profile ? null : t.userData.user_profile.bio.length) > 0), F(1), ae("ngIf", t.lanyardActivities.length > 0), F(1), ae("ngIf", (null == t.userData ? null : t.userData.connected_accounts.length) > 0), F(2), Zt("placeholder", "Send a message to @", null == t.userData || null == t.userData.user ? null : t.userData.user.username, ""), ae("ngModel", t.message)
                }
            }
            let N$ = (() => {
                class e {
                    constructor(t, r) {
                        this.discordApiService = t, this.lanyardService = r, this.intervals = [], this.environment = kr, this.userId = kr.discordId, this.userDataStatus = !1, this.themesColor = [], this.avatarDecorationAsset = "", this.parseInt = parseInt, this.isImage = function(i) {
                            const s = new Image;
                            var a = !1;
                            return s.onload = () => a = !0, s.src = i, a
                        }, this.banner = "", this.message = "", this.lanyardActivities = [], this.statusColor = "#43b581"
                    }
                    ngOnInit() {
                        this.getDiscordUserData(), this.getLanyardData(), setInterval(() => {
                            const t = document.getElementById("profileEffectIntro");
                            t && (t.setAttribute("src", ""), t.setAttribute("src", kr.profile_effect.intro))
                        }, 6e4)
                    }
                    getDiscordUserData() {
                        this.discordApiService.getDiscordUser(this.userId).subscribe({
                            next: t => {
                                this.userDataStatus = !0, this.userData = t, this.userBioFormatted = this.userData.user_profile ? .bio ? .replace(/\n/g, "<br>"), this.themesColor = this.userData.user_profile ? .theme_colors ? .map(r => `#${r.toString(16).padStart(6,"0")}`) || kr.theme_colors, this.avatarDecorationAsset = this.userData.user ? .avatar_decoration_data ? .asset || kr.avatar_decoration, this.banner = `url(${this.userData.user?.banner?`https://cdn.discordapp.com/banners/${this.userId}/${this.userData.user.banner}?size=2048`:kr.banner})`
                            },
                            error: t => {
                                this.userDataStatus = !1, console.log(t)
                            }
                        }).add(() => {
                            window.loadAtropos()
                        })
                    }
                    getLanyardData() {
                        this.lanyardService.setupWebSocket(), this.lanyardService.getLanyardData().subscribe({
                            next: t => {
                                switch (this.lanyardData = t, this.lanyardActivities = this.lanyardData.d ? .activities || [], this.intervals.forEach(r => {
                                    clearInterval(r)
                                }), this.lanyardData.d ? .discord_status) {
                                    case "online":
                                        this.statusColor = "#43b581";
                                        break;
                                    case "idle":
                                        this.statusColor = "#faa61a";
                                        break;
                                    case "dnd":
                                        this.statusColor = "#f04747";
                                        break;
                                    case "offline":
                                    case "invisible":
                                    case "unknown":
                                    default:
                                        this.statusColor = "#747f8d";
                                        break;
                                    case "streaming":
                                        this.statusColor = "#593695"
                                }
                                this.lanyardActivities.forEach(r => {
                                    if (r.timestamps) {
                                        const {
                                            start: o
                                        } = r.timestamps, i = new Date(o), s = () => {
                                            const l = (new Date).getTime() - i.getTime(),
                                                c = Math.floor(l / 36e5);
                                            let u = Math.floor(l % 36e5 / 6e4),
                                                d = Math.floor(l % 6e4 / 1e3),
                                                f = "";
                                            return d >= 60 && (d %= 60, u += Math.floor(d / 60)), c > 0 && (f += `${c} ${1===c?"hour":"hours"}`), u > 0 && (f += `${f?" : ":""}${u} ${1===u?"minute":"minutes"}`), d > 0 && (f += `${f?" : ":""}${d} ${1===d?"second":"seconds"}`), f
                                        };
                                        r.timestamps.start = s() || "", this.intervals.push(setInterval(() => {
                                            r.timestamps && (r.timestamps.start = s() || "")
                                        }, 1e3))
                                    }
                                })
                            },
                            error: t => {
                                console.log(t)
                            }
                        })
                    }
                    getActivityImageUrl(t, r) {
                        return "custom" === t.id ? t.emoji ? .id ? `https://cdn.discordapp.com/emojis/${t.emoji.id}.${t.emoji.animated?"gif":"png"}` : `https://khaidevapi.up.railway.app/api/avatar/${this.userId}` : r && r.startsWith("spotify:") ? `https://i.scdn.co/image/${r.split(":")[1]}` : r && -1 !== r.search("https/") ? `https://${r.split("https/")[1]}` : `https://dcdn.dstn.to/app-icons/${t.application_id}.png`
                    }
                    sendMessage() {
                        window.open(`https://discord.com/users/${this.userId}`, "_blank"), this.message = ""
                    }
                    handleImageError(t) {
                        t.target.src = "../../../assets/images/no-image-found.jpg"
                    }
                    static# e = this.\u0275fac = function(r) {
                        return new(r || e)(C(xj), C(Sj))
                    };
                    static# t = this.\u0275cmp = wn({
                        type: e,
                        selectors: [
                            ["app-card-profile"]
                        ],
                        decls: 5,
                        vars: 1,
                        consts: [
                            [1, "atropos", "atropos-card"],
                            [1, "atropos-scale"],
                            [1, "atropos-rotate"],
                            [1, "atropos-inner"],
                            ["class", "my-[0.45rem]", "data-atropos-opacity", "0.9;1", 4, "ngIf"],
                            ["data-atropos-opacity", "0.9;1", 1, "my-[0.45rem]"],
                            [1, "card", "nitro-card", 2, "position", "relative", 3, "ngStyle"],
                            ["id", "profileEffectIntro", "style", "z-index: 1; position: absolute; border-radius: 9px; width: 100%; height: 100%; object-fit: fill; pointer-events: none;", 3, "src", 4, "ngIf"],
                            ["id", "profileEffectLoop", "style", "z-index: 1; position: absolute; border-radius: 9px; width: 100%; height: 100%; object-fit: fill; pointer-events: none;", 3, "src", 4, "ngIf"],
                            [1, "card-header"],
                            [1, "banner-img", 3, "ngStyle"],
                            [1, "card-body"],
                            ["data-atropos-offset", "2.5", 1, "profile-header"],
                            ["target", "_blank", 3, "href"],
                            ["alt", "Avatar decoration", 1, "avatar-decoration", 3, "src"],
                            [1, "profile-logo"],
                            [3, "src"],
                            [1, "presence-state", 3, "ngClass"],
                            [1, "badges-container"],
                            ["class", "badge-item", 4, "ngFor", "ngForOf"],
                            ["data-atropos-offset", "2.5", 1, "profile-body"],
                            [1, "global-name", "flex", "justify-between", "items-center"],
                            [1, "flex", "flex-wrap", "gap-2", "items-center"],
                            ["aria-label", "Desktop", "height", "20", "width", "20", "viewBox", "0 0 24 24", 4, "ngIf"],
                            ["aria-label", "Web", "height", "20", "width", "20", "viewBox", "0 0 24 24", 4, "ngIf"],
                            ["aria-label", "Mobile", "height", "18", "width", "18", "viewBox", "0 0 1000 1500", 4, "ngIf"],
                            [1, "username"],
                            [1, "pronouns"],
                            ["class", "basic-infos", 4, "ngIf"],
                            ["class", "activities", 4, "ngIf"],
                            ["class", "connected-accounts", 4, "ngIf"],
                            [1, "message"],
                            ["type", "text", 3, "placeholder", "ngModel", "ngModelChange", "keyup.enter"],
                            ["id", "profileEffectIntro", 2, "z-index", "1", "position", "absolute", "border-radius", "9px", "width", "100%", "height", "100%", "object-fit", "fill", "pointer-events", "none", 3, "src"],
                            ["id", "profileEffectLoop", 2, "z-index", "1", "position", "absolute", "border-radius", "9px", "width", "100%", "height", "100%", "object-fit", "fill", "pointer-events", "none", 3, "src"],
                            [1, "badge-item"],
                            ["target", "_blank", 1, "badge-link", 3, "href"],
                            [3, "src", "alt"],
                            [1, "tooltip", "tooltip-up"],
                            ["aria-label", "Desktop", "height", "20", "width", "20", "viewBox", "0 0 24 24"],
                            ["d", "M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z"],
                            ["aria-label", "Web", "height", "20", "width", "20", "viewBox", "0 0 24 24"],
                            ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"],
                            ["aria-label", "Mobile", "height", "18", "width", "18", "viewBox", "0 0 1000 1500"],
                            ["d", "M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z"],
                            [1, "basic-infos"],
                            [1, "category-title"],
                            [1, "markdown", 3, "data", "inline"],
                            [1, "activities"],
                            [4, "ngFor", "ngForOf"],
                            [1, "flex", "items-center", "gap-4", "my-4"],
                            [1, "activity-icon"],
                            [4, "ngIf"],
                            [1, "activity-info"],
                            [1, "font-bold"],
                            ["target", "_blank", "class", "link", 3, "href", 4, "ngIf"],
                            [1, "large-img", 3, "src", "alt", "error"],
                            ["class", "small-img", 3, "src", "alt", "error", 4, "ngIf"],
                            [1, "small-img", 3, "src", "alt", "error"],
                            ["target", "_blank", 1, "link", 3, "href"],
                            [1, "connected-accounts"],
                            [1, "badges-connected-accounts"],
                            ["class", "badge-connected-account", 4, "ngFor", "ngForOf"],
                            [1, "badge-connected-account"],
                            ["width", "24px", "height", "24px", 3, "src", "alt"],
                            [1, "tooltip", "tooltip-down"]
                        ],
                        template: function(r, o) {
                            1 & r && (L(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3), Ne(4, k$, 35, 34, "div", 4), V()()()()), 2 & r && (F(4), ae("ngIf", o.userDataStatus))
                        },
                        dependencies: [xD, AD, OD, ND, bl, Lw, eh, oE],
                        styles: ['.tooltip[_ngcontent-%COMP%]{display:block;position:absolute;color:#b6b7b7;background:#18191c;padding:.4rem;border-radius:3px;max-width:160px;width:max-content;font-size:.9rem;transform:scale(0);transition:55ms ease-in-out transform;z-index:10;box-shadow:0 0 5px #00000059;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,.35)}.tooltip-up[_ngcontent-%COMP%]{bottom:42px}.tooltip-up[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:-6px;left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #18191c}.tooltip-down[_ngcontent-%COMP%]{top:45px}.tooltip-down[_ngcontent-%COMP%]:after{content:"";position:absolute;top:-6px;left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #18191c}a[_ngcontent-%COMP%]{cursor:url(link.38d1de5d4c03b83a.png),default}.atropos-inner[_ngcontent-%COMP%]{overflow:visible;border-radius:10px}.atropos-card[_ngcontent-%COMP%]{display:block;margin:0 auto;width:358px}.card[_ngcontent-%COMP%]{background:#292b2f;width:345px;max-height:100%;height:max-content;border-radius:9px;box-shadow:0 0 16px 3px #0003;-webkit-box-shadow:0px 0px 16px 3px rgba(0,0,0,.2);scrollbar-width:none}.card[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.card-header[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{width:100%;height:60px;background:#ff8527;border-radius:6px 6px 0 0;overflow:hidden}.card-header[_ngcontent-%COMP%]   .banner-img[_ngcontent-%COMP%]{width:100%;height:120px;background-position:center!important;background-size:100% auto!important;border-radius:6px 6px 0 0;overflow:hidden}.card-body[_ngcontent-%COMP%]{padding:15px;position:relative}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]{position:absolute;display:flex;flex-direction:row;align-items:flex-end;justify-content:space-between;width:calc(100% - 30px);top:-50px}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:relative}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .avatar-decoration[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;z-index:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]{position:relative;border:6px solid #292b2f;border-radius:50%;border-color:var(--color1)}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:80px;height:80px;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:before{content:"See Profile";position:absolute;right:0;top:0;cursor:url(link.38d1de5d4c03b83a.png),default;opacity:0;width:100%;height:100%;color:#eee;background:rgba(0,0,0,.4941176471);display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:.7rem;font-weight:600;text-transform:uppercase;transition-duration:.15s;z-index:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;z-index:-1;margin:-6px;border-radius:50%;background-color:var(--color1)}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:hover:before{opacity:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state[_ngcontent-%COMP%]{position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;border:2px solid #292b2f;z-index:0}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.online[_ngcontent-%COMP%]{background:#43b581}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.dnd[_ngcontent-%COMP%]{background:#f04747}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.dnd[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:8px;height:3px;background:#292b2f}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.idle[_ngcontent-%COMP%]{background:#faa61a}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.idle[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:11px;height:11px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.offline[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.offline[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.streaming[_ngcontent-%COMP%]{background:#593695}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.invisible[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.invisible[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.default[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.default[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.unknown[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:flex-end;background:#18191c;border-radius:7px;padding:3px}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   .badge-link[_ngcontent-%COMP%]{position:relative;margin:3px;width:22px;height:22px;display:flex;justify-content:center;align-items:center;cursor:url(link.38d1de5d4c03b83a.png),default}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   .badge-link[_ngcontent-%COMP%]:hover > .tooltip[_ngcontent-%COMP%]{transform:scale(1)}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]{background:#18191c;border-radius:7px;padding:13px;margin-top:40px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .global-name[_ngcontent-%COMP%]{color:#eee;font-weight:700;font-size:1.2rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%]{color:#eee;font-weight:600;font-size:.9rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .pronouns[_ngcontent-%COMP%]{color:#eee;margin-bottom:13px;font-weight:400;font-size:.9rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{border:none;border-top:.5px solid #33353b}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-transform:uppercase;font-size:.8rem;margin-bottom:8px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .connected-accounts[_ngcontent-%COMP%]{margin-top:12px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]{color:#fff;margin-top:12px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]{position:relative;width:80px;height:auto}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]   .large-img[_ngcontent-%COMP%]{border-radius:.5rem;height:57px;width:57px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]   .small-img[_ngcontent-%COMP%]{position:absolute;bottom:0;right:0;transform:translate(6px,6px);width:30px;height:30px;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]{font-size:.9rem;text-wrap:nowrap;overflow:overlay;text-overflow:ellipsis}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;background-color:#f5f5f595}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar{width:12px;height:8px;background-color:#f5f5f55e;border-radius:10px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#55555581}.markdown[_ngcontent-%COMP%]{color:#ddd;font-size:.9rem;line-height:1.5}.badges-connected-accounts[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;padding:.4rem;border-radius:.6rem}.badges-connected-accounts[_ngcontent-%COMP%]   .badge-connected-account[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;cursor:url(link.38d1de5d4c03b83a.png),default;padding:.4rem;border-radius:.6rem;background-blend-mode:multiply;background-color:#00000026}.badges-connected-accounts[_ngcontent-%COMP%]   .badge-connected-account[_ngcontent-%COMP%]:hover > .tooltip[_ngcontent-%COMP%]{transform:scale(1)}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]{margin-bottom:14px;margin-top:12px;color:#bdbebf}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#bdbebf;font-size:.9rem}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#02a5e6;text-decoration:none}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#ddd}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .roles[_ngcontent-%COMP%]{margin-bottom:14px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .roles[_ngcontent-%COMP%]   .roles-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;outline:none;border:1.2px solid #4b4b4b;padding:13px;font-size:.8rem;width:100%;border-radius:4px;color:#eee;margin-top:14px}.nitro-card[_ngcontent-%COMP%]{display:block;margin:0 auto;position:relative;background-image:linear-gradient(0,var(--color2),var(--color1));background-blend-mode:multiply;background-color:#0000006c}.nitro-card[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;z-index:-1;margin:-5px;border-radius:12px;background:linear-gradient(0,var(--color2),var(--color1))}.nitro-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]{background:rgba(24,25,28,.568627451)}.nitro-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]{background:rgba(24,25,28,.4666666667)}.link[_ngcontent-%COMP%]:hover{text-decoration:underline}']
                    })
                }
                return e
            })();
            const R$ = ["bgVideo"],
                F$ = ["iconVolume"],
                L$ = ["volumeInput"],
                V$ = [{
                    path: "",
                    component: (() => {
                        class e {
                            constructor(t) {
                                this.renderer = t, this.isMuted = !0, this.volume = 0
                            }
                            ngOnInit() {}
                            ngAfterViewInit() {
                                this.bgVideo.nativeElement.muted = this.isMuted
                            }
                            changeVolume(t) {
                                const r = t.target.value;
                                this.volume = r, this.bgVideo.nativeElement.volume = r / 100, localStorage.setItem("volume", r), this.iconVolume && (0 == r ? (this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-full"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-flip-vertical")) : (this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-flip-vertical"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-full"))), this.isMuted = 0 == r, this.bgVideo.nativeElement.muted = this.isMuted
                            }
                            toggleMute() {
                                if (this.bgVideo && (this.isMuted = !this.isMuted, this.bgVideo.nativeElement.muted = this.isMuted, this.iconVolume))
                                    if (this.isMuted) this.volume = 0, this.volumeInput.nativeElement.value = 0, this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-full"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-flip-vertical");
                                    else {
                                        let t = localStorage.getItem("volume");
                                        this.volume = t ? parseInt(t) : 100, this.volumeInput.nativeElement.value = this.volume, this.bgVideo.nativeElement.volume = this.volume / 100, this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-flip-vertical"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-full")
                                    }
                            }
                            static# e = this.\u0275fac = function(r) {
                                return new(r || e)(C(cn))
                            };
                            static# t = this.\u0275cmp = wn({
                                type: e,
                                selectors: [
                                    ["app-main"]
                                ],
                                viewQuery: function(r, o) {
                                    if (1 & r && (Yi(R$, 5), Yi(F$, 5), Yi(L$, 5)), 2 & r) {
                                        let i;
                                        Ao(i = To()) && (o.bgVideo = i.first), Ao(i = To()) && (o.iconVolume = i.first), Ao(i = To()) && (o.volumeInput = i.first)
                                    }
                                },
                                decls: 31,
                                vars: 1,
                                consts: [
                                    [1, "video-container"],
                                    ["id", "video_cover"],
                                    ["id", "myVideo", "autoplay", "", "muted", "", "loop", ""],
                                    ["bgVideo", ""],
                                    ["src", "../../../assets/videos/bgVideo.mp4", "type", "video/mp4"],
                                    [1, "video-overlay"],
                                    [1, "container-info"],
                                    [1, "grid", "content-center", "justify-items-center", "text-white"],
                                    [1, "text-white", "font-semibold", "my-4", "text-[18px]", "md:text-[25px]"],
                                    [1, "glowing-icons"],
                                    [1, "flex", "flex-wrap", "gap-2"],
                                    ["href", "https://github.com/TruongDuyKhai/", "target", "_blank", 1, "hovered"],
                                    [1, "fa-brands", "fa-github"],
                                    ["href", "https://www.facebook.com/khaidev1012/", "target", "_blank", 1, "hovered"],
                                    [1, "fa-brands", "fa-facebook"],
                                    ["href", "https://dsc.gg/nyxcode/", "target", "_blank", 1, "hovered"],
                                    [1, "fa-brands", "fa-discord"],
                                    ["id", "sound-slider__container", 1, "mt-5"],
                                    [1, "iconVolume", "text-white", "hovered", "bx", "bxs-volume-mute", "bx-tada", "bx-flip-vertical", 3, "click"],
                                    ["iconVolume", ""],
                                    ["type", "range", "value", "0", "min", "0", "max", "100", "id", "sound-slider", 1, "hovered", 3, "input"],
                                    ["volumeInput", ""],
                                    ["id", "volume"]
                                ],
                                template: function(r, o) {
                                    1 & r && (he(0, "app-custom-cursor"), L(1, "div", 0), he(2, "div", 1), L(3, "video", 2, 3), he(5, "source", 4), V(), he(6, "div", 5), V(), L(7, "div", 6)(8, "div", 7), he(9, "app-clock"), L(10, "p", 8), Fe(11, " Discord Bot Developer "), V(), L(12, "section", 9)(13, "ul", 10)(14, "li")(15, "a", 11), he(16, "i", 12), V()(), L(17, "li")(18, "a", 13), he(19, "i", 14), V()(), L(20, "li")(21, "a", 15), he(22, "i", 16), V()()()(), L(23, "div", 17)(24, "i", 18, 19), Se("click", function() {
                                        return o.toggleMute()
                                    }), V(), L(26, "input", 20, 21), Se("input", function(s) {
                                        return o.changeVolume(s)
                                    }), V(), L(28, "p", 22), Fe(29), V()()(), he(30, "app-card-profile"), V()), 2 & r && (F(29), Ye(o.volume))
                                },
                                dependencies: [Mj, Ij, N$],
                                styles: ['.myAtropos[_ngcontent-%COMP%]{position:relative;overflow:hidden}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:url(link.38d1de5d4c03b83a.png),default;position:relative;background:#202020;text-decoration:none;border-radius:50%;color:gray;transition:.5s;display:flex;justify-content:center;align-items:center;width:50px;height:50px}.glowing-icons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background:#ffffff;transition:.5s;transform:scale(.9);z-index:-1}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{transform:scale(1.1);box-shadow:0 0 15px #fff}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}@media screen and (max-width: 768px){.rxps[_ngcontent-%COMP%]{position:relative;display:inline-block;list-style-type:none;margin:0rem .5rem 1rem}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:55px;height:55px}.glowing-icons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}}.video-container[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{position:absolute;overflow:hidden;top:50%;left:50%;transform:translate(-50%,-50%);object-fit:cover;height:100%;width:100%}.container-info[_ngcontent-%COMP%]{height:100vh;width:100vw;overflow-y:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:2rem}@media screen and (max-height: 816px){.container-info[_ngcontent-%COMP%]{justify-content:flex-start;padding:4rem 0rem}}#video_cover[_ngcontent-%COMP%]{position:absolute;overflow:hidden;width:100%;height:100%;z-index:-100;background:url(video_cover.8f49fdf525be9ddd.gif) no-repeat;background-size:cover;background-position:center}#myVideo[_ngcontent-%COMP%]{position:absolute;overflow:hidden;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-100;object-fit:cover;height:100%;width:100%}.video-overlay[_ngcontent-%COMP%]{position:fixed;overflow:hidden;top:0;left:0;height:100vh;width:100vw;background-color:#0009;z-index:-10}@media screen and (max-width: 768px){.video-container[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100vw;height:auto}}.iconVolume[_ngcontent-%COMP%]{font-size:20px!important;cursor:url(link.38d1de5d4c03b83a.png),default}#sound-slider__container[_ngcontent-%COMP%]{display:flex;gap:10px;width:300px;height:20px;padding:20px 40px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.03);border-radius:1in;align-items:center;justify-content:center;position:relative;overflow:hidden}#sound-slider[_ngcontent-%COMP%]{margin:0 10px;appearance:none;width:100%;border-radius:1in;outline:none;transition:.2s;cursor:pointer;background:rgba(255,255,255,.4);cursor:url(link.38d1de5d4c03b83a.png),default}#sound-slider[_ngcontent-%COMP%]:hover{background:rgba(255,255,255,.6)}#sound-slider[_ngcontent-%COMP%]::-webkit-slider-thumb{appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;cursor:pointer;cursor:url(link.38d1de5d4c03b83a.png),default;-webkit-transition:.2s;transition:.2s}#sound-slider[_ngcontent-%COMP%]::-moz-range-thumb{appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;cursor:pointer;cursor:url(link.38d1de5d4c03b83a.png),default;-moz-transition:.2s;transition:.2s}#sound-slider[_ngcontent-%COMP%]::-webkit-slider-thumb:hover{transform:scale(1.2)}#volume[_ngcontent-%COMP%]{color:#dcdcdc;text-align:right}']
                            })
                        }
                        return e
                    })()
                }, {
                    path: "**",
                    redirectTo: "",
                    pathMatch: "full"
                }];
            let j$ = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [$b.forRoot(V$), $b]
                        })
                    }
                    return e
                })(),
                $$ = (() => {
                    class e {
                        constructor() {
                            this.title = "K h 4 i D 3 v", this.animSeq = ["/", "$", "\\", "|", "$"], this.animIndex = 0, this.titleIndex = 0
                        }
                        ngOnInit() {
                            this.doInverseSpinZeroPitch(), setInterval(() => {
                                this.doInverseSpinZeroPitch()
                            }, 100), document.addEventListener("contextmenu", function(t) {
                                t.preventDefault()
                            }, !1), document.addEventListener("keydown", function(t) {
                                t.ctrlKey && (85 === t.keyCode || 73 === t.keyCode || 67 === t.keyCode || 86 === t.keyCode || 83 === t.keyCode || 123 === t.keyCode) && t.preventDefault()
                            }, !1)
                        }
                        doInverseSpinZeroPitch() {
                            const t = this.title.substring(0, this.titleIndex);
                            this.titleIndex > this.title.length && (this.animIndex = 0, this.titleIndex = 0), this.animIndex > 3 && (this.titleIndex++, this.animIndex = 0), document.title = t + this.animSeq[this.animIndex], this.animIndex++
                        }
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275cmp = wn({
                            type: e,
                            selectors: [
                                ["app-root"]
                            ],
                            decls: 1,
                            vars: 0,
                            template: function(r, o) {
                                1 & r && he(0, "router-outlet")
                            },
                            dependencies: [Sh]
                        })
                    }
                    return e
                })(),
                B$ = (() => {
                    class e {
                        static# e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static# t = this.\u0275mod = bt({
                            type: e,
                            bootstrap: [$$]
                        });
                        static# n = this.\u0275inj = ft({
                            imports: [pF, M2, I2, j$, Q2, f$.forRoot()]
                        })
                    }
                    return e
                })();
            fF().bootstrapModule(B$).catch(e => console.error(e))
        }
    },
    ie => {
        ie(ie.s = 948)
    }
]);