/*!
 * Quill Editor v2.0.0-dev.3
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
!function (t, e) {
    'object' == typeof exports && 'object' == typeof module ? module.exports = e() : 'function' == typeof define && define.amd ? define([], e) : 'object' == typeof exports ? exports.Quill = e() : t.Quill = e();
}(window, function () {
    return function (t) {
        var e = {};

        function s(i) {
            if (e[i]) return e[i].exports;
            var r = e[i] = {i: i, l: !1, exports: {}};
            return t[i].call(r.exports, r, r.exports, s), r.l = !0, r.exports;
        }

        return s.m = t, s.c = e, s.d = function (t, e, i) {
            s.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: i});
        }, s.r = function (t) {
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: 'Module'}), Object.defineProperty(t, '__esModule', {value: !0});
        }, s.t = function (t, e) {
            if (1 & e && (t = s(t)), 8 & e) return t;
            if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (s.r(i), Object.defineProperty(i, 'default', {
                enumerable: !0,
                value: t
            }), 2 & e && 'string' != typeof t) for (var r in t) s.d(i, r, function (e) {
                return t[e];
            }.bind(null, r));
            return i;
        }, s.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default;
            } : function () {
                return t;
            };
            return s.d(e, 'a', e), e;
        }, s.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, s.p = '', s(s.s = 36);
    }([function (t, e, s) {
        'use strict';
        var i;
        s.r(e), function (t) {
            t[t.TYPE = 3] = 'TYPE', t[t.LEVEL = 12] = 'LEVEL', t[t.ATTRIBUTE = 13] = 'ATTRIBUTE', t[t.BLOT = 14] = 'BLOT', t[t.INLINE = 7] = 'INLINE', t[t.BLOCK = 11] = 'BLOCK', t[t.BLOCK_BLOT = 10] = 'BLOCK_BLOT', t[t.INLINE_BLOT = 6] = 'INLINE_BLOT', t[t.BLOCK_ATTRIBUTE = 9] = 'BLOCK_ATTRIBUTE', t[t.INLINE_ATTRIBUTE = 5] = 'INLINE_ATTRIBUTE', t[t.ANY = 15] = 'ANY';
        }(i || (i = {}));
        var r = i;
        var n = class {
            constructor() {
                this.head = null, this.tail = null, this.length = 0;
            }

            append(...t) {
                this.insertBefore(t[0], null), t.length > 1 && this.append.apply(this, t.slice(1));
            }

            at(t) {
                const e = this.iterator();
                let s = e();
                for (; s && t > 0;) t -= 1, s = e();
                return s;
            }

            contains(t) {
                const e = this.iterator();
                let s = e();
                for (; s;) {
                    if (s === t) return !0;
                    s = e();
                }
                return !1;
            }

            indexOf(t) {
                const e = this.iterator();
                let s = e(), i = 0;
                for (; s;) {
                    if (s === t) return i;
                    i += 1, s = e();
                }
                return -1;
            }

            insertBefore(t, e) {
                null != t && (this.remove(t), t.next = e, null != e ? (t.prev = e.prev, null != e.prev && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : null != this.tail ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
            }

            offset(t) {
                let e = 0, s = this.head;
                for (; null != s;) {
                    if (s === t) return e;
                    e += s.length(), s = s.next;
                }
                return -1;
            }

            remove(t) {
                this.contains(t) && (null != t.prev && (t.prev.next = t.next), null != t.next && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
            }

            iterator(t = this.head) {
                return () => {
                    const e = t;
                    return null != t && (t = t.next), e;
                };
            }

            find(t, e = !1) {
                const s = this.iterator();
                let i = s();
                for (; i;) {
                    const r = i.length();
                    if (t < r || e && t === r && (null == i.next || 0 !== i.next.length())) return [i, t];
                    t -= r, i = s();
                }
                return [null, 0];
            }

            forEach(t) {
                const e = this.iterator();
                let s = e();
                for (; s;) t(s), s = e();
            }

            forEachAt(t, e, s) {
                if (e <= 0) return;
                const [i, r] = this.find(t);
                let n = t - r;
                const l = this.iterator(i);
                let o = l();
                for (; o && n < t + e;) {
                    const i = o.length();
                    t > n ? s(o, t - n, Math.min(e, n + i - t)) : s(o, 0, Math.min(i, t + e - n)), n += i, o = l();
                }
            }

            map(t) {
                return this.reduce((e, s) => (e.push(t(s)), e), []);
            }

            reduce(t, e) {
                const s = this.iterator();
                let i = s();
                for (; i;) e = t(e, i), i = s();
                return e;
            }
        };

        class l extends Error {
            constructor(t) {
                super(t = '[Parchment] ' + t), this.message = t, this.name = this.constructor.name;
            }
        }

        class o {
            constructor() {
                this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
            }

            static find(t, e = !1) {
                return null == t ? null : this.blots.has(t) ? this.blots.get(t) || null : e ? this.find(t.parentNode, e) : null;
            }

            create(t, e, s) {
                const i = this.query(e);
                if (null == i) throw new l(`Unable to create ${e} blot`);
                const r = i, n = new r(t, e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : r.create(s), s);
                return o.blots.set(n.domNode, n), n;
            }

            find(t, e = !1) {
                return o.find(t, e);
            }

            query(t, e = r.ANY) {
                let s;
                if ('string' == typeof t) s = this.types[t] || this.attributes[t]; else if (t instanceof Text || t.nodeType === Node.TEXT_NODE) s = this.types.text; else if ('number' == typeof t) t & r.LEVEL & r.BLOCK ? s = this.types.block : t & r.LEVEL & r.INLINE && (s = this.types.inline); else if (t instanceof HTMLElement) {
                    (t.getAttribute('class') || '').split(/\s+/).some(t => !!(s = this.classes[t])), s = s || this.tags[t.tagName];
                }
                return null == s ? null : e & r.LEVEL & s.scope && e & r.TYPE & s.scope ? s : null;
            }

            register(...t) {
                if (t.length > 1) return t.map(t => this.register(t));
                const e = t[0];
                if ('string' != typeof e.blotName && 'string' != typeof e.attrName) throw new l('Invalid definition');
                if ('abstract' === e.blotName) throw new l('Cannot register abstract class');
                if (this.types[e.blotName || e.attrName] = e, 'string' == typeof e.keyName) this.attributes[e.keyName] = e; else if (null != e.className && (this.classes[e.className] = e), null != e.tagName) {
                    Array.isArray(e.tagName) ? e.tagName = e.tagName.map(t => t.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach(t => {
                        null != this.tags[t] && null != e.className || (this.tags[t] = e);
                    });
                }
                return e;
            }
        }

        o.blots = new WeakMap;

        class a {
            constructor(t, e) {
                this.scroll = t, this.domNode = e, o.blots.set(e, this), this.prev = null, this.next = null;
            }

            static create(t) {
                if (null == this.tagName) throw new l('Blot definition missing tagName');
                let e;
                return Array.isArray(this.tagName) ? ('string' == typeof t && (t = t.toUpperCase(), parseInt(t, 10).toString() === t && (t = parseInt(t, 10))), e = 'number' == typeof t ? document.createElement(this.tagName[t - 1]) : this.tagName.indexOf(t) > -1 ? document.createElement(t) : document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e;
            }

            get statics() {
                return this.constructor;
            }

            attach() {
            }

            clone() {
                const t = this.domNode.cloneNode(!1);
                return this.scroll.create(t);
            }

            detach() {
                null != this.parent && this.parent.removeChild(this), o.blots.delete(this.domNode);
            }

            deleteAt(t, e) {
                this.isolate(t, e).remove();
            }

            formatAt(t, e, s, i) {
                const n = this.isolate(t, e);
                if (null != this.scroll.query(s, r.BLOT) && i) n.wrap(s, i); else if (null != this.scroll.query(s, r.ATTRIBUTE)) {
                    const t = this.scroll.create(this.statics.scope);
                    n.wrap(t), t.format(s, i);
                }
            }

            insertAt(t, e, s) {
                const i = null == s ? this.scroll.create('text', e) : this.scroll.create(e, s), r = this.split(t);
                this.parent.insertBefore(i, r || void 0);
            }

            isolate(t, e) {
                const s = this.split(t);
                if (null == s) throw new Error('Attempt to isolate at end');
                return s.split(e), s;
            }

            length() {
                return 1;
            }

            offset(t = this.parent) {
                return null == this.parent || this === t ? 0 : this.parent.children.offset(this) + this.parent.offset(t);
            }

            optimize(t) {
                !this.statics.requiredContainer || this.parent instanceof this.statics.requiredContainer || this.wrap(this.statics.requiredContainer.blotName);
            }

            remove() {
                null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode), this.detach();
            }

            replaceWith(t, e) {
                const s = 'string' == typeof t ? this.scroll.create(t, e) : t;
                return null != this.parent && (this.parent.insertBefore(s, this.next || void 0), this.remove()), s;
            }

            split(t, e) {
                return 0 === t ? this : this.next;
            }

            update(t, e) {
            }

            wrap(t, e) {
                const s = 'string' == typeof t ? this.scroll.create(t, e) : t;
                if (null != this.parent && this.parent.insertBefore(s, this.next || void 0), 'function' != typeof s.appendChild) throw new l(`Cannot wrap ${t}`);
                return s.appendChild(this), s;
            }
        }

        a.blotName = 'abstract';
        var u = a;

        class c extends u {
            constructor(t, e) {
                super(t, e), this.uiNode = null, this.build();
            }

            appendChild(t) {
                this.insertBefore(t);
            }

            attach() {
                super.attach(), this.children.forEach(t => {
                    t.attach();
                });
            }

            attachUI(t) {
                null != this.uiNode && this.uiNode.remove(), this.uiNode = t, c.uiClass && this.uiNode.classList.add(c.uiClass), this.uiNode.setAttribute('contenteditable', 'false'), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
            }

            build() {
                this.children = new n, Array.from(this.domNode.childNodes).filter(t => t !== this.uiNode).reverse().forEach(t => {
                    try {
                        const e = h(t, this.scroll);
                        this.insertBefore(e, this.children.head || void 0);
                    } catch (t) {
                        if (t instanceof l) return;
                        throw t;
                    }
                });
            }

            deleteAt(t, e) {
                if (0 === t && e === this.length()) return this.remove();
                this.children.forEachAt(t, e, (t, e, s) => {
                    t.deleteAt(e, s);
                });
            }

            descendant(t, e = 0) {
                const [s, i] = this.children.find(e);
                return null == t.blotName && t(s) || null != t.blotName && s instanceof t ? [s, i] : s instanceof c ? s.descendant(t, i) : [null, -1];
            }

            descendants(t, e = 0, s = Number.MAX_VALUE) {
                let i = [], r = s;
                return this.children.forEachAt(e, s, (e, s, n) => {
                    (null == t.blotName && t(e) || null != t.blotName && e instanceof t) && i.push(e), e instanceof c && (i = i.concat(e.descendants(t, s, r))), r -= n;
                }), i;
            }

            detach() {
                this.children.forEach(t => {
                    t.detach();
                }), super.detach();
            }

            enforceAllowedChildren() {
                let t = !1;
                this.children.forEach(e => {
                    if (t) return;
                    this.statics.allowedChildren.some(t => e instanceof t) || (e.statics.scope === r.BLOCK_BLOT ? (null != e.next && this.splitAfter(e), null != e.prev && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof c ? e.unwrap() : e.remove());
                });
            }

            formatAt(t, e, s, i) {
                this.children.forEachAt(t, e, (t, e, r) => {
                    t.formatAt(e, r, s, i);
                });
            }

            insertAt(t, e, s) {
                const [i, r] = this.children.find(t);
                if (i) i.insertAt(r, e, s); else {
                    const t = null == s ? this.scroll.create('text', e) : this.scroll.create(e, s);
                    this.appendChild(t);
                }
            }

            insertBefore(t, e) {
                null != t.parent && t.parent.children.remove(t);
                let s = null;
                this.children.insertBefore(t, e || null), null != e && (s = e.domNode), this.domNode.parentNode === t.domNode && this.domNode.nextSibling === s || this.domNode.insertBefore(t.domNode, s), t.parent = this, t.attach();
            }

            length() {
                return this.children.reduce((t, e) => t + e.length(), 0);
            }

            moveChildren(t, e) {
                this.children.forEach(s => {
                    t.insertBefore(s, e);
                });
            }

            optimize(t) {
                if (super.optimize(t), this.enforceAllowedChildren(), null != this.uiNode && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), 0 === this.children.length) if (null != this.statics.defaultChild) {
                    const t = this.scroll.create(this.statics.defaultChild.blotName);
                    this.appendChild(t);
                } else this.remove();
            }

            path(t, e = !1) {
                const [s, i] = this.children.find(t, e), r = [[this, t]];
                return s instanceof c ? r.concat(s.path(i, e)) : (null != s && r.push([s, i]), r);
            }

            removeChild(t) {
                this.children.remove(t);
            }

            replaceWith(t, e) {
                const s = 'string' == typeof t ? this.scroll.create(t, e) : t;
                return s instanceof c && this.moveChildren(s), super.replaceWith(s);
            }

            split(t, e = !1) {
                if (!e) {
                    if (0 === t) return this;
                    if (t === this.length()) return this.next;
                }
                const s = this.clone();
                return this.parent && this.parent.insertBefore(s, this.next || void 0), this.children.forEachAt(t, this.length(), (t, i, r) => {
                    const n = t.split(i, e);
                    null != n && s.appendChild(n);
                }), s;
            }

            splitAfter(t) {
                const e = this.clone();
                for (; null != t.next;) e.appendChild(t.next);
                return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
            }

            unwrap() {
                this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
            }

            update(t, e) {
                const s = [], i = [];
                t.forEach(t => {
                    t.target === this.domNode && 'childList' === t.type && (s.push.apply(s, t.addedNodes), i.push.apply(i, t.removedNodes));
                }), i.forEach(t => {
                    if (null != t.parentNode && 'IFRAME' !== t.tagName && document.body.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) return;
                    const e = this.scroll.find(t);
                    null != e && (null != e.domNode.parentNode && e.domNode.parentNode !== this.domNode || e.detach());
                }), s.filter(t => t.parentNode === this.domNode || t === this.uiNode).sort((t, e) => t === e ? 0 : t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach(t => {
                    let e = null;
                    null != t.nextSibling && (e = this.scroll.find(t.nextSibling));
                    const s = h(t, this.scroll);
                    s.next === e && null != s.next || (null != s.parent && s.parent.removeChild(this), this.insertBefore(s, e || void 0));
                }), this.enforceAllowedChildren();
            }
        }

        function h(t, e) {
            let s = e.find(t);
            if (null == s) try {
                s = e.create(t);
            } catch (i) {
                s = e.create(r.INLINE), Array.from(t.childNodes).forEach(t => {
                    s.domNode.appendChild(t);
                }), t.parentNode && t.parentNode.replaceChild(s.domNode, t), s.attach();
            }
            return s;
        }

        c.uiClass = '';
        var d = c;

        class f extends d {
            checkMerge() {
                return null !== this.next && this.next.statics.blotName === this.statics.blotName;
            }

            deleteAt(t, e) {
                super.deleteAt(t, e), this.enforceAllowedChildren();
            }

            formatAt(t, e, s, i) {
                super.formatAt(t, e, s, i), this.enforceAllowedChildren();
            }

            insertAt(t, e, s) {
                super.insertAt(t, e, s), this.enforceAllowedChildren();
            }

            optimize(t) {
                super.optimize(t), this.children.length > 0 && null != this.next && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
            }
        }

        f.blotName = 'container', f.scope = r.BLOCK_BLOT;
        var p = f;

        class m extends u {
            static value(t) {
                return !0;
            }

            index(t, e) {
                return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
            }

            position(t, e) {
                let s = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
                return t > 0 && (s += 1), [this.parent.domNode, s];
            }

            value() {
                return {[this.statics.blotName]: this.statics.value(this.domNode) || !0};
            }
        }

        m.scope = r.INLINE_BLOT;
        var g = m;

        class b {
            static keys(t) {
                return Array.from(t.attributes).map(t => t.name);
            }

            constructor(t, e, s = {}) {
                this.attrName = t, this.keyName = e;
                const i = r.TYPE & r.ATTRIBUTE;
                this.scope = null != s.scope ? s.scope & r.LEVEL | i : r.ATTRIBUTE, null != s.whitelist && (this.whitelist = s.whitelist);
            }

            add(t, e) {
                return !!this.canAdd(t, e) && (t.setAttribute(this.keyName, e), !0);
            }

            canAdd(t, e) {
                return null == this.whitelist || ('string' == typeof e ? this.whitelist.indexOf(e.replace(/["']/g, '')) > -1 : this.whitelist.indexOf(e) > -1);
            }

            remove(t) {
                t.removeAttribute(this.keyName);
            }

            value(t) {
                const e = t.getAttribute(this.keyName);
                return this.canAdd(t, e) && e ? e : '';
            }
        }

        function y(t, e) {
            return (t.getAttribute('class') || '').split(/\s+/).filter(t => 0 === t.indexOf(`${e}-`));
        }

        var v = class extends b {
            static keys(t) {
                return (t.getAttribute('class') || '').split(/\s+/).map(t => t.split('-').slice(0, -1).join('-'));
            }

            add(t, e) {
                return !!this.canAdd(t, e) && (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0);
            }

            remove(t) {
                y(t, this.keyName).forEach(e => {
                    t.classList.remove(e);
                }), 0 === t.classList.length && t.removeAttribute('class');
            }

            value(t) {
                const e = (y(t, this.keyName)[0] || '').slice(this.keyName.length + 1);
                return this.canAdd(t, e) ? e : '';
            }
        };

        function x(t) {
            const e = t.split('-'), s = e.slice(1).map(t => t[0].toUpperCase() + t.slice(1)).join('');
            return e[0] + s;
        }

        var N = class extends b {
            static keys(t) {
                return (t.getAttribute('style') || '').split(';').map(t => t.split(':')[0].trim());
            }

            add(t, e) {
                return !!this.canAdd(t, e) && (t.style[x(this.keyName)] = e, !0);
            }

            remove(t) {
                t.style[x(this.keyName)] = '', t.getAttribute('style') || t.removeAttribute('style');
            }

            value(t) {
                const e = t.style[x(this.keyName)];
                return this.canAdd(t, e) ? e : '';
            }
        };
        var E = class {
            constructor(t) {
                this.attributes = {}, this.domNode = t, this.build();
            }

            attribute(t, e) {
                e ? t.add(this.domNode, e) && (null != t.value(this.domNode) ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
            }

            build() {
                this.attributes = {};
                const t = o.find(this.domNode);
                if (null == t) return;
                const e = b.keys(this.domNode), s = v.keys(this.domNode), i = N.keys(this.domNode);
                e.concat(s).concat(i).forEach(e => {
                    const s = t.scroll.query(e, r.ATTRIBUTE);
                    s instanceof b && (this.attributes[s.attrName] = s);
                });
            }

            copy(t) {
                Object.keys(this.attributes).forEach(e => {
                    const s = this.attributes[e].value(this.domNode);
                    t.format(e, s);
                });
            }

            move(t) {
                this.copy(t), Object.keys(this.attributes).forEach(t => {
                    this.attributes[t].remove(this.domNode);
                }), this.attributes = {};
            }

            values() {
                return Object.keys(this.attributes).reduce((t, e) => (t[e] = this.attributes[e].value(this.domNode), t), {});
            }
        };

        class A extends d {
            constructor(t, e) {
                super(t, e), this.attributes = new E(this.domNode);
            }

            static formats(t, e) {
                const s = e.query(A.blotName);
                if (null == s || t.tagName !== s.tagName) return 'string' == typeof this.tagName || (Array.isArray(this.tagName) ? t.tagName.toLowerCase() : void 0);
            }

            format(t, e) {
                if (t !== this.statics.blotName || e) {
                    const s = this.scroll.query(t, r.INLINE);
                    if (null == s) return;
                    s instanceof b ? this.attributes.attribute(s, e) : !e || t === this.statics.blotName && this.formats()[t] === e || this.replaceWith(t, e);
                } else this.children.forEach(t => {
                    t instanceof A || (t = t.wrap(A.blotName, !0)), this.attributes.copy(t);
                }), this.unwrap();
            }

            formats() {
                const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
                return null != e && (t[this.statics.blotName] = e), t;
            }

            formatAt(t, e, s, i) {
                if (null != this.formats()[s] || this.scroll.query(s, r.ATTRIBUTE)) {
                    this.isolate(t, e).format(s, i);
                } else super.formatAt(t, e, s, i);
            }

            optimize(t) {
                super.optimize(t);
                const e = this.formats();
                if (0 === Object.keys(e).length) return this.unwrap();
                const s = this.next;
                s instanceof A && s.prev === this && function (t, e) {
                    if (Object.keys(t).length !== Object.keys(e).length) return !1;
                    for (const s in t) if (t[s] !== e[s]) return !1;
                    return !0;
                }(e, s.formats()) && (s.moveChildren(this), s.remove());
            }

            replaceWith(t, e) {
                const s = super.replaceWith(t, e);
                return this.attributes.copy(s), s;
            }

            update(t, e) {
                super.update(t, e), t.some(t => t.target === this.domNode && 'attributes' === t.type) && this.attributes.build();
            }

            wrap(t, e) {
                const s = super.wrap(t, e);
                return s instanceof A && this.attributes.move(s), s;
            }
        }

        A.allowedChildren = [A, g], A.blotName = 'inline', A.scope = r.INLINE_BLOT, A.tagName = 'SPAN';
        var q = A;

        class w extends d {
            constructor(t, e) {
                super(t, e), this.attributes = new E(this.domNode);
            }

            static formats(t, e) {
                const s = e.query(w.blotName);
                if (null == s || t.tagName !== s.tagName) return 'string' == typeof this.tagName || (Array.isArray(this.tagName) ? t.tagName.toLowerCase() : void 0);
            }

            format(t, e) {
                const s = this.scroll.query(t, r.BLOCK);
                null != s && (s instanceof b ? this.attributes.attribute(s, e) : t !== this.statics.blotName || e ? !e || t === this.statics.blotName && this.formats()[t] === e || this.replaceWith(t, e) : this.replaceWith(w.blotName));
            }

            formats() {
                const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
                return null != e && (t[this.statics.blotName] = e), t;
            }

            formatAt(t, e, s, i) {
                null != this.scroll.query(s, r.BLOCK) ? this.format(s, i) : super.formatAt(t, e, s, i);
            }

            insertAt(t, e, s) {
                if (null == s || null != this.scroll.query(e, r.INLINE)) super.insertAt(t, e, s); else {
                    const i = this.split(t);
                    if (null == i) throw new Error('Attempt to insertAt after block boundaries');
                    {
                        const t = this.scroll.create(e, s);
                        i.parent.insertBefore(t, i);
                    }
                }
            }

            replaceWith(t, e) {
                const s = super.replaceWith(t, e);
                return this.attributes.copy(s), s;
            }

            update(t, e) {
                super.update(t, e), t.some(t => t.target === this.domNode && 'attributes' === t.type) && this.attributes.build();
            }
        }

        w.blotName = 'block', w.scope = r.BLOCK_BLOT, w.tagName = 'P', w.allowedChildren = [q, w, g];
        var k = w;
        var L = class extends g {
            static formats(t, e) {
            }

            format(t, e) {
                super.formatAt(0, this.length(), t, e);
            }

            formatAt(t, e, s, i) {
                0 === t && e === this.length() ? this.format(s, i) : super.formatAt(t, e, s, i);
            }

            formats() {
                return this.statics.formats(this.domNode, this.scroll);
            }
        };
        const T = {attributes: !0, characterData: !0, characterDataOldValue: !0, childList: !0, subtree: !0}, S = 100;

        class O extends d {
            constructor(t, e) {
                super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver(t => {
                    this.update(t);
                }), this.observer.observe(this.domNode, T), this.attach();
            }

            create(t, e) {
                return this.registry.create(this, t, e);
            }

            find(t, e = !1) {
                return this.registry.find(t, e);
            }

            query(t, e = r.ANY) {
                return this.registry.query(t, e);
            }

            register(...t) {
                return this.registry.register(...t);
            }

            build() {
                null != this.scroll && super.build();
            }

            detach() {
                super.detach(), this.observer.disconnect();
            }

            deleteAt(t, e) {
                this.update(), 0 === t && e === this.length() ? this.children.forEach(t => {
                    t.remove();
                }) : super.deleteAt(t, e);
            }

            formatAt(t, e, s, i) {
                this.update(), super.formatAt(t, e, s, i);
            }

            insertAt(t, e, s) {
                this.update(), super.insertAt(t, e, s);
            }

            optimize(t = [], e = {}) {
                super.optimize(e);
                const s = e.mutationsMap || new WeakMap;
                let i = Array.from(this.observer.takeRecords());
                for (; i.length > 0;) t.push(i.pop());
                const r = (t, e = !0) => {
                    null != t && t !== this && null != t.domNode.parentNode && (s.has(t.domNode) || s.set(t.domNode, []), e && r(t.parent));
                }, n = t => {
                    s.has(t.domNode) && (t instanceof d && t.children.forEach(n), s.delete(t.domNode), t.optimize(e));
                };
                let l = t;
                for (let e = 0; l.length > 0; e += 1) {
                    if (e >= S) throw new Error('[Parchment] Maximum optimize iterations reached');
                    for (l.forEach(t => {
                        const e = this.find(t.target, !0);
                        null != e && (e.domNode === t.target && ('childList' === t.type ? (r(this.find(t.previousSibling, !1)), Array.from(t.addedNodes).forEach(t => {
                            const e = this.find(t, !1);
                            r(e, !1), e instanceof d && e.children.forEach(t => {
                                r(t, !1);
                            });
                        })) : 'attributes' === t.type && r(e.prev)), r(e));
                    }), this.children.forEach(n), i = (l = Array.from(this.observer.takeRecords())).slice(); i.length > 0;) t.push(i.pop());
                }
            }

            update(t, e = {}) {
                t = t || this.observer.takeRecords();
                const s = new WeakMap;
                t.map(t => {
                    const e = o.find(t.target, !0);
                    return null == e ? null : s.has(e.domNode) ? (s.get(e.domNode).push(t), null) : (s.set(e.domNode, [t]), e);
                }).forEach(t => {
                    null != t && t !== this && s.has(t.domNode) && t.update(s.get(t.domNode) || [], e);
                }), e.mutationsMap = s, s.has(this.domNode) && super.update(s.get(this.domNode), e), this.optimize(t, e);
            }
        }

        O.blotName = 'scroll', O.defaultChild = k, O.allowedChildren = [k, p], O.scope = r.BLOCK_BLOT, O.tagName = 'DIV';
        var C = O;

        class _ extends g {
            constructor(t, e) {
                super(t, e), this.text = this.statics.value(this.domNode);
            }

            static create(t) {
                return document.createTextNode(t);
            }

            static value(t) {
                return t.data;
            }

            deleteAt(t, e) {
                this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
            }

            index(t, e) {
                return this.domNode === t ? e : -1;
            }

            insertAt(t, e, s) {
                null == s ? (this.text = this.text.slice(0, t) + e + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, e, s);
            }

            length() {
                return this.text.length;
            }

            optimize(t) {
                super.optimize(t), this.text = this.statics.value(this.domNode), 0 === this.text.length ? this.remove() : this.next instanceof _ && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
            }

            position(t, e = !1) {
                return [this.domNode, t];
            }

            split(t, e = !1) {
                if (!e) {
                    if (0 === t) return this;
                    if (t === this.length()) return this.next;
                }
                const s = this.scroll.create(this.domNode.splitText(t));
                return this.parent.insertBefore(s, this.next || void 0), this.text = this.statics.value(this.domNode), s;
            }

            update(t, e) {
                t.some(t => 'characterData' === t.type && t.target === this.domNode) && (this.text = this.statics.value(this.domNode));
            }

            value() {
                return this.text;
            }
        }

        _.blotName = 'text', _.scope = r.INLINE_BLOT;
        var M = _;
        s.d(e, 'ParentBlot', function () {
            return d;
        }), s.d(e, 'ContainerBlot', function () {
            return p;
        }), s.d(e, 'LeafBlot', function () {
            return g;
        }), s.d(e, 'EmbedBlot', function () {
            return L;
        }), s.d(e, 'ScrollBlot', function () {
            return C;
        }), s.d(e, 'BlockBlot', function () {
            return k;
        }), s.d(e, 'InlineBlot', function () {
            return q;
        }), s.d(e, 'TextBlot', function () {
            return M;
        }), s.d(e, 'Attributor', function () {
            return b;
        }), s.d(e, 'ClassAttributor', function () {
            return v;
        }), s.d(e, 'StyleAttributor', function () {
            return N;
        }), s.d(e, 'AttributorStore', function () {
            return E;
        }), s.d(e, 'Registry', function () {
            return o;
        }), s.d(e, 'Scope', function () {
            return r;
        });
    }, function (t, e, s) {
        'use strict';
        var i = this && this.__importDefault || function (t) {
                return t && t.__esModule ? t : {default: t};
            }, r = i(s(11)), n = i(s(2)), l = i(s(40)), o = i(s(41)), a = i(s(21)), u = String.fromCharCode(0),
            c = function () {
                function t(t) {
                    Array.isArray(t) ? this.ops = t : null != t && Array.isArray(t.ops) ? this.ops = t.ops : this.ops = [];
                }

                return t.prototype.insert = function (t, e) {
                    var s = {};
                    return 'string' == typeof t && 0 === t.length ? this : (s.insert = t, null != e && 'object' == typeof e && Object.keys(e).length > 0 && (s.attributes = e), this.push(s));
                }, t.prototype.delete = function (t) {
                    return t <= 0 ? this : this.push({delete: t});
                }, t.prototype.retain = function (t, e) {
                    if (t <= 0) return this;
                    var s = {retain: t};
                    return null != e && 'object' == typeof e && Object.keys(e).length > 0 && (s.attributes = e), this.push(s);
                }, t.prototype.push = function (t) {
                    var e = this.ops.length, s = this.ops[e - 1];
                    if (t = n.default(!0, {}, t), 'object' == typeof s) {
                        if ('number' == typeof t.delete && 'number' == typeof s.delete) return this.ops[e - 1] = {delete: s.delete + t.delete}, this;
                        if ('number' == typeof s.delete && null != t.insert && (e -= 1, 'object' != typeof (s = this.ops[e - 1]))) return this.ops.unshift(t), this;
                        if (r.default(t.attributes, s.attributes)) {
                            if ('string' == typeof t.insert && 'string' == typeof s.insert) return this.ops[e - 1] = {insert: s.insert + t.insert}, 'object' == typeof t.attributes && (this.ops[e - 1].attributes = t.attributes), this;
                            if ('number' == typeof t.retain && 'number' == typeof s.retain) return this.ops[e - 1] = {retain: s.retain + t.retain}, 'object' == typeof t.attributes && (this.ops[e - 1].attributes = t.attributes), this;
                        }
                    }
                    return e === this.ops.length ? this.ops.push(t) : this.ops.splice(e, 0, t), this;
                }, t.prototype.chop = function () {
                    var t = this.ops[this.ops.length - 1];
                    return t && t.retain && !t.attributes && this.ops.pop(), this;
                }, t.prototype.filter = function (t) {
                    return this.ops.filter(t);
                }, t.prototype.forEach = function (t) {
                    this.ops.forEach(t);
                }, t.prototype.map = function (t) {
                    return this.ops.map(t);
                }, t.prototype.partition = function (t) {
                    var e = [], s = [];
                    return this.forEach(function (i) {
                        (t(i) ? e : s).push(i);
                    }), [e, s];
                }, t.prototype.reduce = function (t, e) {
                    return this.ops.reduce(t, e);
                }, t.prototype.changeLength = function () {
                    return this.reduce(function (t, e) {
                        return e.insert ? t + a.default.length(e) : e.delete ? t - e.delete : t;
                    }, 0);
                }, t.prototype.length = function () {
                    return this.reduce(function (t, e) {
                        return t + a.default.length(e);
                    }, 0);
                }, t.prototype.slice = function (e, s) {
                    void 0 === e && (e = 0), void 0 === s && (s = 1 / 0);
                    for (var i = [], r = a.default.iterator(this.ops), n = 0; n < s && r.hasNext();) {
                        var l = void 0;
                        n < e ? l = r.next(e - n) : (l = r.next(s - n), i.push(l)), n += a.default.length(l);
                    }
                    return new t(i);
                }, t.prototype.compose = function (e) {
                    var s = a.default.iterator(this.ops), i = a.default.iterator(e.ops), n = [], l = i.peek();
                    if (null != l && 'number' == typeof l.retain && null == l.attributes) {
                        for (var u = l.retain; "insert" === s.peekType() && s.peekLength() <= u;) u -= s.peekLength(), n.push(s.next());
                        l.retain - u > 0 && i.next(l.retain - u);
                    }
                    for (var c = new t(n); s.hasNext() || i.hasNext();) if ('insert' === i.peekType()) c.push(i.next()); else if ('delete' === s.peekType()) c.push(s.next()); else {
                        var h = Math.min(s.peekLength(), i.peekLength()), d = s.next(h), f = i.next(h);
                        if ('number' == typeof f.retain) {
                            var p = {};
                            'number' == typeof d.retain ? p.retain = h : p.insert = d.insert;
                            var m = o.default.compose(d.attributes, f.attributes, 'number' == typeof d.retain);
                            if (m && (p.attributes = m), c.push(p), !i.hasNext() && r.default(c.ops[c.ops.length - 1], p)) {
                                var g = new t(s.rest());
                                return c.concat(g).chop();
                            }
                        } else 'number' == typeof f.delete && 'number' == typeof d.retain && c.push(f);
                    }
                    return c.chop();
                }, t.prototype.concat = function (e) {
                    var s = new t(this.ops.slice());
                    return e.ops.length > 0 && (s.push(e.ops[0]), s.ops = s.ops.concat(e.ops.slice(1))), s;
                }, t.prototype.diff = function (e, s) {
                    if (this.ops === e.ops) return new t;
                    var i = [this, e].map(function (t) {
                            return t.map(function (s) {
                                if (null != s.insert) return 'string' == typeof s.insert ? s.insert : u;
                                throw new Error('diff() called ' + (t === e ? 'on' : 'with') + ' non-document');
                            }).join('');
                        }), n = new t, c = l.default(i[0], i[1], s), h = a.default.iterator(this.ops),
                        d = a.default.iterator(e.ops);
                    return c.forEach(function (t) {
                        for (var e = t[1].length; e > 0;) {
                            var s = 0;
                            switch (t[0]) {
                                case l.default.INSERT:
                                    s = Math.min(d.peekLength(), e), n.push(d.next(s));
                                    break;
                                case l.default.DELETE:
                                    s = Math.min(e, h.peekLength()), h.next(s), n.delete(s);
                                    break;
                                case l.default.EQUAL:
                                    s = Math.min(h.peekLength(), d.peekLength(), e);
                                    var i = h.next(s), a = d.next(s);
                                    r.default(i.insert, a.insert) ? n.retain(s, o.default.diff(i.attributes, a.attributes)) : n.push(a).delete(s);
                            }
                            e -= s;
                        }
                    }), n.chop();
                }, t.prototype.eachLine = function (e, s) {
                    void 0 === s && (s = '\n');
                    for (var i = a.default.iterator(this.ops), r = new t, n = 0; i.hasNext();) {
                        if ('insert' !== i.peekType()) return;
                        var l = i.peek(), o = a.default.length(l) - i.peekLength(),
                            u = 'string' == typeof l.insert ? l.insert.indexOf(s, o) - o : -1;
                        if (u < 0) r.push(i.next()); else if (u > 0) r.push(i.next(u)); else {
                            if (!1 === e(r, i.next(1).attributes || {}, n)) return;
                            n += 1, r = new t;
                        }
                    }
                    r.length() > 0 && e(r, {}, n);
                }, t.prototype.transform = function (e, s) {
                    if (void 0 === s && (s = !1), s = !!s, 'number' == typeof e) return this.transformPosition(e, s);
                    for (var i = e, r = a.default.iterator(this.ops), n = a.default.iterator(i.ops), l = new t; r.hasNext() || n.hasNext();) if ('insert' !== r.peekType() || !s && 'insert' === n.peekType()) if ('insert' === n.peekType()) l.push(n.next()); else {
                        var u = Math.min(r.peekLength(), n.peekLength()), c = r.next(u), h = n.next(u);
                        if (c.delete) continue;
                        h.delete ? l.push(h) : l.retain(u, o.default.transform(c.attributes, h.attributes, s));
                    } else l.retain(a.default.length(r.next()));
                    return l.chop();
                }, t.prototype.transformPosition = function (t, e) {
                    void 0 === e && (e = !1), e = !!e;
                    for (var s = a.default.iterator(this.ops), i = 0; s.hasNext() && i <= t;) {
                        var r = s.peekLength(), n = s.peekType();
                        s.next(), 'delete' !== n ? ('insert' === n && (i < t || !e) && (t += r), i += r) : t -= Math.min(r, t - i);
                    }
                    return t;
                }, t.Op = a.default, t.AttributeMap = o.default, t;
            }();
        t.exports = c;
    }, function (t, e) {
        'use strict';
        var s = Object.prototype.hasOwnProperty, i = Object.prototype.toString, r = Object.defineProperty,
            n = Object.getOwnPropertyDescriptor, l = function (t) {
                return 'function' == typeof Array.isArray ? Array.isArray(t) : '[object Array]' === i.call(t);
            }, o = function (t) {
                if (!t || '[object Object]' !== i.call(t)) return !1;
                var e, r = s.call(t, 'constructor'),
                    n = t.constructor && t.constructor.prototype && s.call(t.constructor.prototype, 'isPrototypeOf');
                if (t.constructor && !r && !n) return !1;
                for (e in t) ;
                return void 0 === e || s.call(t, e);
            }, a = function (t, e) {
                r && '__proto__' === e.name ? r(t, e.name, {
                    enumerable: !0,
                    configurable: !0,
                    value: e.newValue,
                    writable: !0
                }) : t[e.name] = e.newValue;
            }, u = function (t, e) {
                if ('__proto__' === e) {
                    if (!s.call(t, e)) return;
                    if (n) return n(t, e).value;
                }
                return t[e];
            };
        t.exports = function t() {
            var e, s, i, r, n, c, h = arguments[0], d = 1, f = arguments.length, p = !1;
            for ('boolean' == typeof h && (p = h, h = arguments[1] || {}, d = 2), (null == h || 'object' != typeof h && 'function' != typeof h) && (h = {}); d < f; ++d) if (null != (e = arguments[d])) for (s in e) i = u(h, s), h !== (r = u(e, s)) && (p && r && (o(r) || (n = l(r))) ? (n ? (n = !1, c = i && l(i) ? i : []) : c = i && o(i) ? i : {}, a(h, {
                name: s,
                newValue: t(p, c, r)
            })) : void 0 !== r && a(h, {name: s, newValue: r}));
            return h;
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.BlockEmbed = e.bubbleFormats = e.blockDelta = void 0;
        var i = u(s(2)), r = u(s(1)), n = s(0), l = u(s(9)), o = u(s(5)), a = u(s(6));

        function u(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const c = 1;

        class h extends n.BlockBlot {
            constructor(t, e) {
                super(t, e), this.cache = {};
            }

            delta() {
                return null == this.cache.delta && (this.cache.delta = f(this)), this.cache.delta;
            }

            deleteAt(t, e) {
                super.deleteAt(t, e), this.cache = {};
            }

            formatAt(t, e, s, i) {
                e <= 0 || (this.scroll.query(s, n.Scope.BLOCK) ? t + e === this.length() && this.format(s, i) : super.formatAt(t, Math.min(e, this.length() - t - 1), s, i), this.cache = {});
            }

            insertAt(t, e, s) {
                if (null != s) return super.insertAt(t, e, s), void (this.cache = {});
                if (0 === e.length) return;
                const i = e.split('\n'), r = i.shift();
                r.length > 0 && (t < this.length() - 1 || null == this.children.tail ? super.insertAt(Math.min(t, this.length() - 1), r) : this.children.tail.insertAt(this.children.tail.length(), r), this.cache = {});
                let n = this;
                i.reduce((t, e) => ((n = n.split(t, !0)).insertAt(0, e), e.length), t + r.length);
            }

            insertBefore(t, e) {
                const s = this.children.head;
                super.insertBefore(t, e), s instanceof l.default && s.remove(), this.cache = {};
            }

            length() {
                return null == this.cache.length && (this.cache.length = super.length() + c), this.cache.length;
            }

            moveChildren(t, e) {
                super.moveChildren(t, e), this.cache = {};
            }

            optimize(t) {
                super.optimize(t), this.cache = {};
            }

            path(t) {
                return super.path(t, !0);
            }

            removeChild(t) {
                super.removeChild(t), this.cache = {};
            }

            split(t, e = !1) {
                if (e && (0 === t || t >= this.length() - c)) {
                    const e = this.clone();
                    return 0 === t ? (this.parent.insertBefore(e, this), this) : (this.parent.insertBefore(e, this.next), e);
                }
                const s = super.split(t, e);
                return this.cache = {}, s;
            }
        }

        h.blotName = 'block', h.tagName = 'P', h.defaultChild = l.default, h.allowedChildren = [l.default, o.default, n.EmbedBlot, a.default];

        class d extends n.EmbedBlot {
            attach() {
                super.attach(), this.attributes = new n.AttributorStore(this.domNode);
            }

            delta() {
                return (new r.default).insert(this.value(), (0, i.default)(this.formats(), this.attributes.values()));
            }

            format(t, e) {
                const s = this.scroll.query(t, n.Scope.BLOCK_ATTRIBUTE);
                null != s && this.attributes.attribute(s, e);
            }

            formatAt(t, e, s, i) {
                this.format(s, i);
            }

            insertAt(t, e, s) {
                if ('string' == typeof e && e.endsWith('\n')) {
                    const s = this.scroll.create(h.blotName);
                    this.parent.insertBefore(s, 0 === t ? this : this.next), s.insertAt(0, e.slice(0, -1));
                } else super.insertAt(t, e, s);
            }
        }

        function f(t) {
            return t.descendants(n.LeafBlot).reduce((t, e) => 0 === e.length() ? t : t.insert(e.value(), p(e)), new r.default).insert('\n', p(t));
        }

        function p(t, e = {}) {
            return null == t ? e : ('function' == typeof t.formats && delete (e = (0, i.default)(e, t.formats()))['code-token'], null == t.parent || 'scroll' === t.parent.statics.blotName || t.parent.statics.scope !== t.statics.scope ? e : p(t.parent, e));
        }

        d.scope = n.Scope.BLOCK_BLOT, e.blockDelta = f, e.bubbleFormats = p, e.BlockEmbed = d, e.default = h;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.overload = e.expandConfig = e.globalRegistry = void 0;
        var i = function () {
                return function (t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function (t, e) {
                        var s = [], i = !0, r = !1, n = void 0;
                        try {
                            for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                        } catch (t) {
                            r = !0, n = t;
                        } finally {
                            try {
                                !i && o.return && o.return();
                            } finally {
                                if (r) throw n;
                            }
                        }
                        return s;
                    }(t, e);
                    throw new TypeError('Invalid attempt to destructure non-iterable instance');
                };
            }(), r = m(s(1)), n = function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t) for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e.default = t, e;
            }(s(0)), l = m(s(2)), o = m(s(43)), a = m(s(8)), u = m(s(7)), c = s(13), h = m(c), d = m(s(22)), f = m(s(10)),
            p = m(s(23));

        function m(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const g = (0, f.default)('quill'), b = new n.Registry;
        n.ParentBlot.uiClass = 'ql-ui';

        class y {
            static debug(t) {
                !0 === t && (t = 'log'), f.default.level(t);
            }

            static find(t) {
                return d.default.get(t) || b.find(t);
            }

            static import(t) {
                return null == this.imports[t] && g.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
            }

            static register(t, e, s = !1) {
                if ('string' != typeof t) {
                    const s = t.attrName || t.blotName;
                    'string' == typeof s ? this.register(`formats/${s}`, t, e) : Object.keys(t).forEach(s => {
                        this.register(s, t[s], e);
                    });
                } else null == this.imports[t] || s || g.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith('blots/') || t.startsWith('formats/')) && 'abstract' !== e.blotName && b.register(e), 'function' == typeof e.register && e.register(b);
            }

            constructor(t, e = {}) {
                if (this.options = v(t, e), this.container = this.options.container, null == this.container) return g.error('Invalid Quill container', t);
                this.options.debug && y.debug(this.options.debug);
                const s = this.container.innerHTML.trim();
                this.container.classList.add('ql-container'), this.container.innerHTML = '', d.default.set(this.container, this), this.root = this.addContainer('ql-editor'), this.root.addEventListener('dragstart', t => {
                    t.preventDefault();
                }), this.root.classList.add('ql-blank'), this.root.setAttribute('data-gramm', !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new a.default;
                const r = this.options.registry.query(n.ScrollBlot.blotName);
                this.scroll = new r(this.options.registry, this.root, {emitter: this.emitter}), this.editor = new o.default(this.scroll), this.selection = new h.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule('keyboard'), this.clipboard = this.theme.addModule('clipboard'), this.history = this.theme.addModule('history'), this.uploader = this.theme.addModule('uploader'), this.theme.init(), this.emitter.on(a.default.events.EDITOR_CHANGE, t => {
                    t === a.default.events.TEXT_CHANGE && this.root.classList.toggle('ql-blank', this.editor.isBlank());
                }), this.emitter.on(a.default.events.SCROLL_UPDATE, (t, e) => {
                    const s = this.selection.lastRange;
                    var r = this.selection.getRange();
                    const n = i(r, 1)[0], l = s && n ? {oldRange: s, newRange: n} : void 0;
                    x.call(this, () => this.editor.update(null, e, l), t);
                });
                const l = this.clipboard.convert({html: `${s}<p><br></p>`, text: '\n'});
                this.setContents(l), this.history.clear(), this.options.placeholder && this.root.setAttribute('data-placeholder', this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
            }

            addContainer(t, e = null) {
                if ('string' == typeof t) {
                    const e = t;
                    (t = document.createElement('div')).classList.add(e);
                }
                return this.container.insertBefore(t, e), t;
            }

            blur() {
                this.selection.setRange(null);
            }

            deleteText(t, e, s) {
                var r = N(t, e, s), n = i(r, 4);
                return t = n[0], e = n[1], s = n[3], x.call(this, () => this.editor.deleteText(t, e), s, t, -1 * e);
            }

            disable() {
                this.enable(!1);
            }

            editReadOnly(t) {
                this.allowReadOnlyEdits = !0;
                const e = t();
                return this.allowReadOnlyEdits = !1, e;
            }

            enable(t = !0) {
                this.scroll.enable(t), this.container.classList.toggle('ql-disabled', !t);
            }

            focus() {
                const t = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = t, this.scrollIntoView();
            }

            format(t, e, s = a.default.sources.API) {
                return x.call(this, () => {
                    const s = this.getSelection(!0);
                    let i = new r.default;
                    if (null == s) return i;
                    if (this.scroll.query(t, n.Scope.BLOCK)) i = this.editor.formatLine(s.index, s.length, {[t]: e}); else {
                        if (0 === s.length) return this.selection.format(t, e), i;
                        i = this.editor.formatText(s.index, s.length, {[t]: e});
                    }
                    return this.setSelection(s, a.default.sources.SILENT), i;
                }, s);
            }

            formatLine(t, e, s, r, n) {
                let l;
                var o = N(t, e, s, r, n), a = i(o, 4);
                return t = a[0], e = a[1], l = a[2], n = a[3], x.call(this, () => this.editor.formatLine(t, e, l), n, t, 0);
            }

            formatText(t, e, s, r, n) {
                let l;
                var o = N(t, e, s, r, n), a = i(o, 4);
                return t = a[0], e = a[1], l = a[2], n = a[3], x.call(this, () => this.editor.formatText(t, e, l), n, t, 0);
            }

            getBounds(t, e = 0) {
                let s;
                s = 'number' == typeof t ? this.selection.getBounds(t, e) : this.selection.getBounds(t.index, t.length);
                const i = this.container.getBoundingClientRect();
                return {
                    bottom: s.bottom - i.top,
                    height: s.height,
                    left: s.left - i.left,
                    right: s.right - i.left,
                    top: s.top - i.top,
                    width: s.width
                };
            }

            getContents(t = 0, e = this.getLength() - t) {
                var s = N(t, e), r = i(s, 2);
                return t = r[0], e = r[1], this.editor.getContents(t, e);
            }

            getFormat(t = this.getSelection(!0), e = 0) {
                return 'number' == typeof t ? this.editor.getFormat(t, e) : this.editor.getFormat(t.index, t.length);
            }

            getIndex(t) {
                return t.offset(this.scroll);
            }

            getLength() {
                return this.scroll.length();
            }

            getLeaf(t) {
                return this.scroll.leaf(t);
            }

            getLine(t) {
                return this.scroll.line(t);
            }

            getLines(t = 0, e = Number.MAX_VALUE) {
                return 'number' != typeof t ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, e);
            }

            getModule(t) {
                return this.theme.modules[t];
            }

            getSelection(t = !1) {
                return t && this.focus(), this.update(), this.selection.getRange()[0];
            }

            getSemanticHTML(t = 0, e = this.getLength() - t) {
                var s = N(t, e), r = i(s, 2);
                return t = r[0], e = r[1], this.editor.getHTML(t, e);
            }

            getText(t = 0, e = this.getLength() - t) {
                var s = N(t, e), r = i(s, 2);
                return t = r[0], e = r[1], this.editor.getText(t, e);
            }

            hasFocus() {
                return this.selection.hasFocus();
            }

            insertEmbed(t, e, s, i = y.sources.API) {
                return x.call(this, () => this.editor.insertEmbed(t, e, s), i, t);
            }

            insertText(t, e, s, r, n) {
                let l;
                var o = N(t, 0, s, r, n), a = i(o, 4);
                return t = a[0], l = a[2], n = a[3], x.call(this, () => this.editor.insertText(t, e, l), n, t, e.length);
            }

            isEnabled() {
                return this.scroll.isEnabled();
            }

            off(...t) {
                return this.emitter.off(...t);
            }

            on(...t) {
                return this.emitter.on(...t);
            }

            once(...t) {
                return this.emitter.once(...t);
            }

            removeFormat(t, e, s) {
                var r = N(t, e, s), n = i(r, 4);
                return t = n[0], e = n[1], s = n[3], x.call(this, () => this.editor.removeFormat(t, e), s, t);
            }

            scrollIntoView() {
                this.selection.scrollIntoView(this.scrollingContainer);
            }

            setContents(t, e = a.default.sources.API) {
                return x.call(this, () => {
                    t = new r.default(t);
                    const e = this.getLength(), s = this.editor.deleteText(0, e), i = this.editor.applyDelta(t),
                        n = i.ops[i.ops.length - 1];
                    return null != n && 'string' == typeof n.insert && '\n' === n.insert[n.insert.length - 1] && (this.editor.deleteText(this.getLength() - 1, 1), i.delete(1)), s.compose(i);
                }, e);
            }

            setSelection(t, e, s) {
                if (null == t) this.selection.setRange(null, e || y.sources.API); else {
                    var r = N(t, e, s), n = i(r, 4);
                    t = n[0], e = n[1], s = n[3], this.selection.setRange(new c.Range(Math.max(0, t), e), s), s !== a.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
            }

            setText(t, e = a.default.sources.API) {
                const s = (new r.default).insert(t);
                return this.setContents(s, e);
            }

            update(t = a.default.sources.USER) {
                const e = this.scroll.update(t);
                return this.selection.update(t), e;
            }

            updateContents(t, e = a.default.sources.API) {
                return x.call(this, () => (t = new r.default(t), this.editor.applyDelta(t, e)), e, !0);
            }
        }

        function v(t, e) {
            if ((e = (0, l.default)(!0, {
                container: t,
                modules: {clipboard: !0, keyboard: !0, history: !0, uploader: !0}
            }, e)).theme && e.theme !== y.DEFAULTS.theme) {
                if (e.theme = y.import(`themes/${e.theme}`), null == e.theme) throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
            } else e.theme = p.default;
            const s = (0, l.default)(!0, {}, e.theme.DEFAULTS);
            [s, e].forEach(t => {
                t.modules = t.modules || {}, Object.keys(t.modules).forEach(e => {
                    !0 === t.modules[e] && (t.modules[e] = {});
                });
            });
            const i = Object.keys(s.modules).concat(Object.keys(e.modules)).reduce((t, e) => {
                const s = y.import(`modules/${e}`);
                return null == s ? g.error(`Cannot load ${e} module. Are you sure you registered it?`) : t[e] = s.DEFAULTS || {}, t;
            }, {});
            return null != e.modules && e.modules.toolbar && e.modules.toolbar.constructor !== Object && (e.modules.toolbar = {container: e.modules.toolbar}), e = (0, l.default)(!0, {}, y.DEFAULTS, {modules: i}, s, e), ['bounds', 'container', 'scrollingContainer'].forEach(t => {
                'string' == typeof e[t] && (e[t] = document.querySelector(e[t]));
            }), e.modules = Object.keys(e.modules).reduce((t, s) => (e.modules[s] && (t[s] = e.modules[s]), t), {}), e;
        }

        function x(t, e, s, i) {
            if (!this.isEnabled() && e === a.default.sources.USER && !this.allowReadOnlyEdits) return new r.default;
            let n = null == s ? null : this.getSelection();
            const l = this.editor.delta, o = t();
            if (null != n && (!0 === s && (s = n.index), null == i ? n = E(n, o, e) : 0 !== i && (n = E(n, s, i, e)), this.setSelection(n, a.default.sources.SILENT)), o.length() > 0) {
                const t = [a.default.events.TEXT_CHANGE, o, l, e];
                this.emitter.emit(a.default.events.EDITOR_CHANGE, ...t), e !== a.default.sources.SILENT && this.emitter.emit(...t);
            }
            return o;
        }

        function N(t, e, s, i, r) {
            let n = {};
            return 'number' == typeof t.index && 'number' == typeof t.length ? 'number' != typeof e ? (r = i, i = s, s = e, e = t.length, t = t.index) : (e = t.length, t = t.index) : 'number' != typeof e && (r = i, i = s, s = e, e = 0), 'object' == typeof s ? (n = s, r = i) : 'string' == typeof s && (null != i ? n[s] = i : r = s), [t, e, n, r = r || a.default.sources.API];
        }

        function E(t, e, s, n) {
            if (null == t) return null;
            let l, o;
            if (e instanceof r.default) {
                var u = [t.index, t.index + t.length].map(t => e.transformPosition(t, n !== a.default.sources.USER)),
                    h = i(u, 2);
                l = h[0], o = h[1];
            } else {
                var d = [t.index, t.index + t.length].map(t => t < e || t === e && n === a.default.sources.USER ? t : s >= 0 ? t + s : Math.max(e, t + s)),
                    f = i(d, 2);
                l = f[0], o = f[1];
            }
            return new c.Range(l, o - l);
        }

        y.DEFAULTS = {
            bounds: null,
            modules: {},
            placeholder: '',
            readOnly: !1,
            registry: b,
            scrollingContainer: null,
            theme: 'default'
        }, y.events = a.default.events, y.sources = a.default.sources, y.version = '2.0.0-dev.3', y.imports = {
            delta: r.default,
            parchment: n,
            'core/module': u.default,
            'core/theme': p.default
        }, e.globalRegistry = b, e.expandConfig = v, e.overload = N, e.default = y;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0), r = l(s(9)), n = l(s(6));

        function l(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class o extends i.InlineBlot {
            static compare(t, e) {
                const s = o.order.indexOf(t), i = o.order.indexOf(e);
                return s >= 0 || i >= 0 ? s - i : t === e ? 0 : t < e ? -1 : 1;
            }

            formatAt(t, e, s, r) {
                if (o.compare(this.statics.blotName, s) < 0 && this.scroll.query(s, i.Scope.BLOT)) {
                    const i = this.isolate(t, e);
                    r && i.wrap(s, r);
                } else super.formatAt(t, e, s, r);
            }

            optimize(t) {
                if (super.optimize(t), this.parent instanceof o && o.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                    const t = this.parent.isolate(this.offset(), this.length());
                    this.moveChildren(t), t.wrap(this);
                }
            }
        }

        o.allowedChildren = [o, r.default, i.EmbedBlot, n.default], o.order = ['cursor', 'inline', 'underline', 'strike', 'italic', 'bold', 'script', 'link', 'code'], e.default = o;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.escapeText = e.default = void 0;
        var i = s(0);
        e.default = class extends i.TextBlot {
        }, e.escapeText = function (t) {
            return t.replace(/[&<>"']/g, t => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#39;'
            })[t]);
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});

        class i {
            constructor(t, e = {}) {
                this.quill = t, this.options = e;
            }
        }

        i.DEFAULTS = {}, e.default = i;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = n(s(44)), r = n(s(22));

        function n(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const l = (0, n(s(10)).default)('quill:events');
        ['selectionchange', 'mousedown', 'mouseup', 'click'].forEach(t => {
            document.addEventListener(t, (...t) => {
                Array.from(document.querySelectorAll('.ql-container')).forEach(e => {
                    const s = r.default.get(e);
                    s && s.emitter && s.emitter.handleDOM(...t);
                });
            });
        });

        class o extends i.default {
            constructor() {
                super(), this.listeners = {}, this.on('error', l.error);
            }

            emit(...t) {
                l.log.call(l, ...t), super.emit(...t);
            }

            handleDOM(t, ...e) {
                (this.listeners[t.type] || []).forEach(({node: s, handler: i}) => {
                    (t.target === s || s.contains(t.target)) && i(t, ...e);
                });
            }

            listenDOM(t, e, s) {
                this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push({node: e, handler: s});
            }
        }

        o.events = {
            EDITOR_CHANGE: 'editor-change',
            SCROLL_BEFORE_UPDATE: 'scroll-before-update',
            SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
            SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
            SCROLL_OPTIMIZE: 'scroll-optimize',
            SCROLL_UPDATE: 'scroll-update',
            SELECTION_CHANGE: 'selection-change',
            TEXT_CHANGE: 'text-change'
        }, o.sources = {API: 'api', SILENT: 'silent', USER: 'user'}, e.default = o;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0);

        class r extends i.EmbedBlot {
            static value() {
            }

            optimize() {
                (this.prev || this.next) && this.remove();
            }

            length() {
                return 0;
            }

            value() {
                return '';
            }
        }

        r.blotName = 'break', r.tagName = 'BR', e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        const i = ['error', 'warn', 'log', 'info'];
        let r = 'warn';

        function n(t, ...e) {
            i.indexOf(t) <= i.indexOf(r) && console[t](...e);
        }

        function l(t) {
            return i.reduce((e, s) => (e[s] = n.bind(console, s, t), e), {});
        }

        l.level = (t => {
            r = t;
        }), n.level = l.level, e.default = l;
    }, function (t, e, s) {
        var i = Array.prototype.slice, r = s(38), n = s(39), l = t.exports = function (t, e, s) {
            return s || (s = {}), t === e || (t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || 'object' != typeof t && 'object' != typeof e ? s.strict ? t === e : t == e : function (t, e, s) {
                var u, c;
                if (o(t) || o(e)) return !1;
                if (t.prototype !== e.prototype) return !1;
                if (n(t)) return !!n(e) && (t = i.call(t), e = i.call(e), l(t, e, s));
                if (a(t)) {
                    if (!a(e)) return !1;
                    if (t.length !== e.length) return !1;
                    for (u = 0; u < t.length; u++) if (t[u] !== e[u]) return !1;
                    return !0;
                }
                try {
                    var h = r(t), d = r(e);
                } catch (t) {
                    return !1;
                }
                if (h.length != d.length) return !1;
                for (h.sort(), d.sort(), u = h.length - 1; u >= 0; u--) if (h[u] != d[u]) return !1;
                for (u = h.length - 1; u >= 0; u--) if (c = h[u], !l(t[c], e[c], s)) return !1;
                return typeof t == typeof e;
            }(t, e, s));
        };

        function o(t) {
            return null === t || void 0 === t;
        }

        function a(t) {
            return !(!t || 'object' != typeof t || 'number' != typeof t.length) && ('function' == typeof t.copy && 'function' == typeof t.slice && !(t.length > 0 && 'number' != typeof t[0]));
        }
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0);
        e.default = class extends i.ContainerBlot {
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.Range = void 0;
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = s(0), n = a(s(17)), l = a(s(11)), o = a(s(8));

        function a(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const u = (0, a(s(10)).default)('quill:selection');

        class c {
            constructor(t, e = 0) {
                this.index = t, this.length = e;
            }
        }

        function h(t, e) {
            try {
                e.parentNode;
            } catch (t) {
                return !1;
            }
            return t.contains(e);
        }

        e.Range = c, e.default = class {
            constructor(t, e) {
                this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create('cursor', this), this.savedRange = new c(0, 0), this.lastRange = this.savedRange, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM('selectionchange', document, () => {
                    this.mouseDown || this.composing || setTimeout(this.update.bind(this, o.default.sources.USER), 1);
                }), this.emitter.on(o.default.events.SCROLL_BEFORE_UPDATE, () => {
                    if (!this.hasFocus()) return;
                    const t = this.getNativeRange();
                    null != t && t.start.node !== this.cursor.textNode && this.emitter.once(o.default.events.SCROLL_UPDATE, () => {
                        try {
                            this.root.contains(t.start.node) && this.root.contains(t.end.node) && this.setNativeRange(t.start.node, t.start.offset, t.end.node, t.end.offset), this.update(o.default.sources.SILENT);
                        } catch (t) {
                        }
                    });
                }), this.emitter.on(o.default.events.SCROLL_OPTIMIZE, (t, e) => {
                    if (e.range) {
                        var s = e.range;
                        const t = s.startNode, i = s.startOffset, r = s.endNode, n = s.endOffset;
                        this.setNativeRange(t, i, r, n), this.update(o.default.sources.SILENT);
                    }
                }), this.update(o.default.sources.SILENT);
            }

            handleComposition() {
                this.root.addEventListener('compositionstart', () => {
                    this.composing = !0, this.scroll.batchStart();
                }), this.root.addEventListener('compositionend', () => {
                    if (this.scroll.batchEnd(), this.composing = !1, this.cursor.parent) {
                        const t = this.cursor.restore();
                        if (!t) return;
                        setTimeout(() => {
                            this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
                        }, 1);
                    }
                });
            }

            handleDragging() {
                this.emitter.listenDOM('mousedown', document.body, () => {
                    this.mouseDown = !0;
                }), this.emitter.listenDOM('mouseup', document.body, () => {
                    this.mouseDown = !1, this.update(o.default.sources.USER);
                });
            }

            focus() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
            }

            format(t, e) {
                this.scroll.update();
                const s = this.getNativeRange();
                if (null != s && s.native.collapsed && !this.scroll.query(t, r.Scope.BLOCK)) {
                    if (s.start.node !== this.cursor.textNode) {
                        const t = this.scroll.find(s.start.node, !1);
                        if (null == t) return;
                        if (t instanceof r.LeafBlot) {
                            const e = t.split(s.start.offset);
                            t.parent.insertBefore(this.cursor, e);
                        } else t.insertBefore(this.cursor, s.start.node);
                        this.cursor.attach();
                    }
                    this.cursor.format(t, e), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                }
            }

            getBounds(t, e = 0) {
                const s = this.scroll.length();
                let r;
                t = Math.min(t, s - 1), e = Math.min(t + e, s - 1) - t;
                var n = this.scroll.leaf(t), l = i(n, 2);
                let o = l[0], a = l[1];
                if (null == o) return null;
                var u = o.position(a, !0), c = i(u, 2);
                r = c[0], a = c[1];
                const h = document.createRange();
                if (e > 0) {
                    h.setStart(r, a);
                    var d = this.scroll.leaf(t + e), f = i(d, 2);
                    if (o = f[0], a = f[1], null == o) return null;
                    var p = o.position(a, !0), m = i(p, 2);
                    return r = m[0], a = m[1], h.setEnd(r, a), h.getBoundingClientRect();
                }
                let g, b = 'left';
                return r instanceof Text ? (a < r.data.length ? (h.setStart(r, a), h.setEnd(r, a + 1)) : (h.setStart(r, a - 1), h.setEnd(r, a), b = 'right'), g = h.getBoundingClientRect()) : (g = o.domNode.getBoundingClientRect(), a > 0 && (b = 'right')), {
                    bottom: g.top + g.height,
                    height: g.height,
                    left: g[b],
                    right: g[b],
                    top: g.top,
                    width: 0
                };
            }

            getNativeRange() {
                const t = document.getSelection();
                if (null == t || t.rangeCount <= 0) return null;
                const e = t.getRangeAt(0);
                if (null == e) return null;
                const s = this.normalizeNative(e);
                return u.info('getNativeRange', s), s;
            }

            getRange() {
                const t = this.getNativeRange();
                return null == t ? [null, null] : [this.normalizedToRange(t), t];
            }

            hasFocus() {
                return document.activeElement === this.root || h(this.root, document.activeElement);
            }

            normalizedToRange(t) {
                const e = [[t.start.node, t.start.offset]];
                t.native.collapsed || e.push([t.end.node, t.end.offset]);
                const s = e.map(t => {
                    var e = i(t, 2);
                    const s = e[0], n = e[1], l = this.scroll.find(s, !0), o = l.offset(this.scroll);
                    return 0 === n ? o : l instanceof r.LeafBlot ? o + l.index(s, n) : o + l.length();
                }), n = Math.min(Math.max(...s), this.scroll.length() - 1), l = Math.min(n, ...s);
                return new c(l, n - l);
            }

            normalizeNative(t) {
                if (!h(this.root, t.startContainer) || !t.collapsed && !h(this.root, t.endContainer)) return null;
                const e = {
                    start: {node: t.startContainer, offset: t.startOffset},
                    end: {node: t.endContainer, offset: t.endOffset},
                    native: t
                };
                return [e.start, e.end].forEach(t => {
                    let e = t.node, s = t.offset;
                    for (; !(e instanceof Text) && e.childNodes.length > 0;) if (e.childNodes.length > s) e = e.childNodes[s], s = 0; else {
                        if (e.childNodes.length !== s) break;
                        s = (e = e.lastChild) instanceof Text ? e.data.length : e.childNodes.length > 0 ? e.childNodes.length : e.childNodes.length + 1;
                    }
                    t.node = e, t.offset = s;
                }), e;
            }

            rangeToNative(t) {
                const e = t.collapsed ? [t.index] : [t.index, t.index + t.length], s = [], r = this.scroll.length();
                return e.forEach((t, e) => {
                    t = Math.min(r - 1, t);
                    var n = this.scroll.leaf(t), l = i(n, 2);
                    const o = l[0], a = l[1];
                    var u = o.position(a, 0 !== e), c = i(u, 2);
                    const h = c[0], d = c[1];
                    s.push(h, d);
                }), s.length < 2 ? s.concat(s) : s;
            }

            scrollIntoView(t) {
                const e = this.lastRange;
                if (null == e) return;
                const s = this.getBounds(e.index, e.length);
                if (null == s) return;
                const r = this.scroll.length() - 1;
                var n = this.scroll.line(Math.min(e.index, r));
                const l = i(n, 1)[0];
                let o = l;
                if (e.length > 0) {
                    var a = this.scroll.line(Math.min(e.index + e.length, r));
                    o = i(a, 1)[0];
                }
                if (null == l || null == o) return;
                const u = t.getBoundingClientRect();
                s.top < u.top ? t.scrollTop -= u.top - s.top : s.bottom > u.bottom && (t.scrollTop += s.bottom - u.bottom);
            }

            setNativeRange(t, e, s = t, i = e, r = !1) {
                if (u.info('setNativeRange', t, e, s, i), null != t && (null == this.root.parentNode || null == t.parentNode || null == s.parentNode)) return;
                const n = document.getSelection();
                if (null != n) if (null != t) {
                    this.hasFocus() || this.root.focus();
                    const l = (this.getNativeRange() || {}).native;
                    if (null == l || r || t !== l.startContainer || e !== l.startOffset || s !== l.endContainer || i !== l.endOffset) {
                        'BR' === t.tagName && (e = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), 'BR' === s.tagName && (i = Array.from(s.parentNode.childNodes).indexOf(s), s = s.parentNode);
                        const r = document.createRange();
                        r.setStart(t, e), r.setEnd(s, i), n.removeAllRanges(), n.addRange(r);
                    }
                } else n.removeAllRanges(), this.root.blur();
            }

            setRange(t, e = !1, s = o.default.sources.API) {
                if ('string' == typeof e && (s = e, e = !1), u.info('setRange', t), null != t) {
                    const s = this.rangeToNative(t);
                    this.setNativeRange(...s, e);
                } else this.setNativeRange(null);
                this.update(s);
            }

            update(t = o.default.sources.USER) {
                const e = this.lastRange;
                var s = this.getRange(), r = i(s, 2);
                const a = r[0], u = r[1];
                if (this.lastRange = a, null != this.lastRange && (this.savedRange = this.lastRange), !(0, l.default)(e, this.lastRange)) {
                    if (!this.composing && null != u && u.native.collapsed && u.start.node !== this.cursor.textNode) {
                        const t = this.cursor.restore();
                        t && this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
                    }
                    const s = [o.default.events.SELECTION_CHANGE, (0, n.default)(this.lastRange), (0, n.default)(e), t];
                    this.emitter.emit(o.default.events.EDITOR_CHANGE, ...s), t !== o.default.sources.SILENT && this.emitter.emit(...s);
                }
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0), r = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(6));

        class n extends i.EmbedBlot {
            static value() {
            }

            constructor(t, e, s) {
                super(t, e), this.selection = s, this.textNode = document.createTextNode(n.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
            }

            detach() {
                null != this.parent && this.parent.removeChild(this);
            }

            format(t, e) {
                if (0 !== this.savedLength) return void super.format(t, e);
                let s = this, r = 0;
                for (; null != s && s.statics.scope !== i.Scope.BLOCK_BLOT;) r += s.offset(s.parent), s = s.parent;
                null != s && (this.savedLength = n.CONTENTS.length, s.optimize(), s.formatAt(r, n.CONTENTS.length, t, e), this.savedLength = 0);
            }

            index(t, e) {
                return t === this.textNode ? 0 : super.index(t, e);
            }

            length() {
                return this.savedLength;
            }

            position() {
                return [this.textNode, this.textNode.data.length];
            }

            remove() {
                super.remove(), this.parent = null;
            }

            restore() {
                if (this.selection.composing || null == this.parent) return null;
                const t = this.selection.getNativeRange();
                for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode;) this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                const e = this.prev instanceof r.default ? this.prev : null, s = e ? e.length() : 0,
                    i = this.next instanceof r.default ? this.next : null, l = i ? i.text : '', o = this.textNode,
                    a = o.data.split(n.CONTENTS).join('');
                let u;
                if (o.data = n.CONTENTS, e) u = e, (a || i) && (e.insertAt(e.length(), a + l), i && i.remove()); else if (i) u = i, i.insertAt(0, a); else {
                    const t = document.createTextNode(a);
                    u = this.scroll.create(t), this.parent.insertBefore(u, this);
                }
                if (this.remove(), t) {
                    const r = (t, r) => e && t === e.domNode ? r : t === o ? s + r - 1 : i && t === i.domNode ? s + a.length + r : null,
                        n = r(t.start.node, t.start.offset), l = r(t.end.node, t.end.offset);
                    if (null !== n && null !== l) return {
                        startNode: u.domNode,
                        startOffset: n,
                        endNode: u.domNode,
                        endOffset: l
                    };
                }
                return null;
            }

            update(t, e) {
                if (t.some(t => 'characterData' === t.type && t.target === this.textNode)) {
                    const t = this.restore();
                    t && (e.range = t);
                }
            }

            value() {
                return '';
            }
        }

        n.blotName = 'cursor', n.className = 'ql-cursor', n.tagName = 'span', n.CONTENTS = '\ufeff', e.default = n;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.sanitize = e.default = void 0;
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(5));

        class r extends i.default {
            static create(t) {
                const e = super.create(t);
                return e.setAttribute('href', this.sanitize(t)), e.setAttribute('target', '_blank'), e;
            }

            static formats(t) {
                return t.getAttribute('href');
            }

            static sanitize(t) {
                return n(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
            }

            format(t, e) {
                t === this.statics.blotName && e ? this.domNode.setAttribute('href', this.constructor.sanitize(e)) : super.format(t, e);
            }
        }

        function n(t, e) {
            const s = document.createElement('a');
            s.href = t;
            const i = s.href.slice(0, s.href.indexOf(':'));
            return e.indexOf(i) > -1;
        }

        r.blotName = 'link', r.tagName = 'A', r.SANITIZED_URL = 'about:blank', r.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'], e.default = r, e.sanitize = n;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(93));
        let r = 0;

        function n(t, e) {
            t.setAttribute(e, !('true' === t.getAttribute(e)));
        }

        e.default = class {
            constructor(t) {
                this.select = t, this.container = document.createElement('span'), this.buildPicker(), this.select.style.display = 'none', this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener('mousedown', () => {
                    this.togglePicker();
                }), this.label.addEventListener('keydown', t => {
                    switch (t.key) {
                        case'Enter':
                            this.togglePicker();
                            break;
                        case'Escape':
                            this.escape(), t.preventDefault();
                    }
                }), this.select.addEventListener('change', this.update.bind(this));
            }

            togglePicker() {
                this.container.classList.toggle('ql-expanded'), n(this.label, 'aria-expanded'), n(this.options, 'aria-hidden');
            }

            buildItem(t) {
                const e = document.createElement('span');
                return e.tabIndex = '0', e.setAttribute('role', 'button'), e.classList.add('ql-picker-item'), t.hasAttribute('value') && e.setAttribute('data-value', t.getAttribute('value')), t.textContent && e.setAttribute('data-label', t.textContent), e.addEventListener('click', () => {
                    this.selectItem(e, !0);
                }), e.addEventListener('keydown', t => {
                    switch (t.key) {
                        case'Enter':
                            this.selectItem(e, !0), t.preventDefault();
                            break;
                        case'Escape':
                            this.escape(), t.preventDefault();
                    }
                }), e;
            }

            buildLabel() {
                const t = document.createElement('span');
                return t.classList.add('ql-picker-label'), t.innerHTML = i.default, t.tabIndex = '0', t.setAttribute('role', 'button'), t.setAttribute('aria-expanded', 'false'), this.container.appendChild(t), t;
            }

            buildOptions() {
                const t = document.createElement('span');
                t.classList.add('ql-picker-options'), t.setAttribute('aria-hidden', 'true'), t.tabIndex = '-1', t.id = `ql-picker-options-${r}`, r += 1, this.label.setAttribute('aria-controls', t.id), this.options = t, Array.from(this.select.options).forEach(e => {
                    const s = this.buildItem(e);
                    t.appendChild(s), !0 === e.selected && this.selectItem(s);
                }), this.container.appendChild(t);
            }

            buildPicker() {
                Array.from(this.select.attributes).forEach(t => {
                    this.container.setAttribute(t.name, t.value);
                }), this.container.classList.add('ql-picker'), this.label = this.buildLabel(), this.buildOptions();
            }

            escape() {
                this.close(), setTimeout(() => this.label.focus(), 1);
            }

            close() {
                this.container.classList.remove('ql-expanded'), this.label.setAttribute('aria-expanded', 'false'), this.options.setAttribute('aria-hidden', 'true');
            }

            selectItem(t, e = !1) {
                const s = this.container.querySelector('.ql-selected');
                t !== s && (null != s && s.classList.remove('ql-selected'), null != t && (t.classList.add('ql-selected'), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute('data-value') ? this.label.setAttribute('data-value', t.getAttribute('data-value')) : this.label.removeAttribute('data-value'), t.hasAttribute('data-label') ? this.label.setAttribute('data-label', t.getAttribute('data-label')) : this.label.removeAttribute('data-label'), e && (this.select.dispatchEvent(new Event('change')), this.close())));
            }

            update() {
                let t;
                if (this.select.selectedIndex > -1) {
                    const e = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
                    t = this.select.options[this.select.selectedIndex], this.selectItem(e);
                } else this.selectItem(null);
                const e = null != t && t !== this.select.querySelector('option[selected]');
                this.label.classList.toggle('ql-active', e);
            }
        };
    }, function (t, e) {
        var s = function () {
            'use strict';

            function t(t, e) {
                return null != e && t instanceof e;
            }

            var e, s, i;
            try {
                e = Map;
            } catch (t) {
                e = function () {
                };
            }
            try {
                s = Set;
            } catch (t) {
                s = function () {
                };
            }
            try {
                i = Promise;
            } catch (t) {
                i = function () {
                };
            }

            function r(n, o, a, u, c) {
                'object' == typeof o && (a = o.depth, u = o.prototype, c = o.includeNonEnumerable, o = o.circular);
                var h = [], d = [], f = 'undefined' != typeof Buffer;
                return void 0 === o && (o = !0), void 0 === a && (a = 1 / 0), function n(a, p) {
                    if (null === a) return null;
                    if (0 === p) return a;
                    var m, g;
                    if ('object' != typeof a) return a;
                    if (t(a, e)) m = new e; else if (t(a, s)) m = new s; else if (t(a, i)) m = new i(function (t, e) {
                        a.then(function (e) {
                            t(n(e, p - 1));
                        }, function (t) {
                            e(n(t, p - 1));
                        });
                    }); else if (r.__isArray(a)) m = []; else if (r.__isRegExp(a)) m = new RegExp(a.source, l(a)), a.lastIndex && (m.lastIndex = a.lastIndex); else if (r.__isDate(a)) m = new Date(a.getTime()); else {
                        if (f && Buffer.isBuffer(a)) return m = Buffer.allocUnsafe ? Buffer.allocUnsafe(a.length) : new Buffer(a.length), a.copy(m), m;
                        t(a, Error) ? m = Object.create(a) : void 0 === u ? (g = Object.getPrototypeOf(a), m = Object.create(g)) : (m = Object.create(u), g = u);
                    }
                    if (o) {
                        var b = h.indexOf(a);
                        if (-1 != b) return d[b];
                        h.push(a), d.push(m);
                    }
                    for (var y in t(a, e) && a.forEach(function (t, e) {
                        var s = n(e, p - 1), i = n(t, p - 1);
                        m.set(s, i);
                    }), t(a, s) && a.forEach(function (t) {
                        var e = n(t, p - 1);
                        m.add(e);
                    }), a) {
                        var v;
                        g && (v = Object.getOwnPropertyDescriptor(g, y)), v && null == v.set || (m[y] = n(a[y], p - 1));
                    }
                    if (Object.getOwnPropertySymbols) {
                        var x = Object.getOwnPropertySymbols(a);
                        for (y = 0; y < x.length; y++) {
                            var N = x[y];
                            (!(A = Object.getOwnPropertyDescriptor(a, N)) || A.enumerable || c) && (m[N] = n(a[N], p - 1), A.enumerable || Object.defineProperty(m, N, {enumerable: !1}));
                        }
                    }
                    if (c) {
                        var E = Object.getOwnPropertyNames(a);
                        for (y = 0; y < E.length; y++) {
                            var A, q = E[y];
                            (A = Object.getOwnPropertyDescriptor(a, q)) && A.enumerable || (m[q] = n(a[q], p - 1), Object.defineProperty(m, q, {enumerable: !1}));
                        }
                    }
                    return m;
                }(n, a);
            }

            function n(t) {
                return Object.prototype.toString.call(t);
            }

            function l(t) {
                var e = '';
                return t.global && (e += 'g'), t.ignoreCase && (e += 'i'), t.multiline && (e += 'm'), e;
            }

            return r.clonePrototype = function (t) {
                if (null === t) return null;
                var e = function () {
                };
                return e.prototype = t, new e;
            }, r.__objToStr = n, r.__isDate = function (t) {
                return 'object' == typeof t && '[object Date]' === n(t);
            }, r.__isArray = function (t) {
                return 'object' == typeof t && '[object Array]' === n(t);
            }, r.__isRegExp = function (t) {
                return 'object' == typeof t && '[object RegExp]' === n(t);
            }, r.__getRegExpFlags = l, r;
        }();
        'object' == typeof t && t.exports && (t.exports = s);
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.ColorStyle = e.ColorClass = e.ColorAttributor = void 0;
        var i = s(0);

        class r extends i.StyleAttributor {
            value(t) {
                let e = super.value(t);
                if (!e.startsWith('rgb(')) return e;
                return `#${(e = e.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '')).split(',').map(t => `00${parseInt(t, 10).toString(16)}`.slice(-2)).join('')}`;
            }
        }

        const n = new i.ClassAttributor('color', 'ql-color', {scope: i.Scope.INLINE}),
            l = new r('color', 'color', {scope: i.Scope.INLINE});
        e.ColorAttributor = r, e.ColorClass = n, e.ColorStyle = l;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.CodeBlockContainer = e.Code = void 0;
        var i = h(s(3)), r = h(s(9)), n = h(s(14)), l = h(s(5)), o = s(6), a = h(o), u = h(s(12)), c = h(s(4));

        function h(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class d extends u.default {
            static create(t) {
                const e = super.create(t);
                return e.setAttribute('spellcheck', !1), e;
            }

            html(t, e) {
                const s = this.children.map(t => t.domNode.innerText).join('\n').slice(t, t + e);
                return `<pre>${(0, o.escapeText)(s)}</pre>`;
            }
        }

        class f extends i.default {
            static register() {
                c.default.register(d);
            }
        }

        class p extends l.default {
        }

        p.blotName = 'code', p.tagName = 'CODE', f.blotName = 'code-block', f.className = 'ql-code-block', f.tagName = 'DIV', d.blotName = 'code-block-container', d.className = 'ql-code-block-container', d.tagName = 'DIV', d.allowedChildren = [f], f.allowedChildren = [a.default, r.default, n.default], f.requiredContainer = d, f.TAB = '  ', e.Code = p, e.CodeBlockContainer = d, e.default = f;
    }, function (t, e, s) {
        'use strict';
        var i = _(s(64)), r = _(s(65)), n = _(s(66)), l = _(s(67)), o = _(s(68)), a = _(s(69)), u = _(s(70)),
            c = _(s(71)), h = _(s(72)), d = _(s(73)), f = _(s(74)), p = _(s(75)), m = _(s(76)), g = _(s(77)),
            b = _(s(78)), y = _(s(79)), v = _(s(80)), x = _(s(81)), N = _(s(82)), E = _(s(83)), A = _(s(84)),
            q = _(s(85)), w = _(s(86)), k = _(s(87)), L = _(s(88)), T = _(s(89)), S = _(s(90)), O = _(s(91)),
            C = _(s(92));

        function _(t) {
            return t && t.__esModule ? t : {default: t};
        }

        t.exports = {
            align: {'': i.default, center: r.default, right: n.default, justify: l.default},
            background: o.default,
            blockquote: a.default,
            bold: u.default,
            clean: c.default,
            code: h.default,
            'code-block': h.default,
            color: d.default,
            direction: {'': f.default, rtl: p.default},
            formula: m.default,
            header: {1: g.default, 2: b.default},
            italic: y.default,
            image: v.default,
            indent: {'+1': x.default, '-1': N.default},
            link: E.default,
            list: {bullet: A.default, check: q.default, ordered: w.default},
            script: {sub: k.default, super: L.default},
            strike: T.default,
            table: S.default,
            underline: O.default,
            video: C.default
        };
    }, function (t, e, s) {
        'use strict';
        var i = this && this.__importDefault || function (t) {
            return t && t.__esModule ? t : {default: t};
        };
        Object.defineProperty(e, '__esModule', {value: !0});
        var r, n = i(s(42));
        !function (t) {
            t.iterator = function (t) {
                return new n.default(t);
            }, t.length = function (t) {
                return 'number' == typeof t.delete ? t.delete : 'number' == typeof t.retain ? t.retain : 'string' == typeof t.insert ? t.insert.length : 1;
            };
        }(r || (r = {})), e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = new WeakMap;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});

        class i {
            constructor(t, e) {
                this.quill = t, this.options = e, this.modules = {};
            }

            init() {
                Object.keys(this.options.modules).forEach(t => {
                    null == this.modules[t] && this.addModule(t);
                });
            }

            addModule(t) {
                const e = this.quill.constructor.import(`modules/${t}`);
                return this.modules[t] = new e(this.quill, this.options.modules[t] || {}), this.modules[t];
            }
        }

        i.DEFAULTS = {modules: {}}, i.themes = {default: i}, e.default = i;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0), r = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(6));
        const n = '\ufeff';
        e.default = class extends i.EmbedBlot {
            constructor(t, e) {
                super(t, e), this.contentNode = document.createElement('span'), this.contentNode.setAttribute('contenteditable', !1), Array.from(this.domNode.childNodes).forEach(t => {
                    this.contentNode.appendChild(t);
                }), this.leftGuard = document.createTextNode(n), this.rightGuard = document.createTextNode(n), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
            }

            index(t, e) {
                return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
            }

            restore(t) {
                let e, s;
                const i = t.data.split(n).join('');
                if (t === this.leftGuard) if (this.prev instanceof r.default) {
                    const t = this.prev.length();
                    this.prev.insertAt(t, i), e = {startNode: this.prev.domNode, startOffset: t + i.length};
                } else s = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(s), this), e = {
                    startNode: s,
                    startOffset: i.length
                }; else t === this.rightGuard && (this.next instanceof r.default ? (this.next.insertAt(0, i), e = {
                    startNode: this.next.domNode,
                    startOffset: i.length
                }) : (s = document.createTextNode(i), this.parent.insertBefore(this.scroll.create(s), this.next), e = {
                    startNode: s,
                    startOffset: i.length
                }));
                return t.data = n, e;
            }

            update(t, e) {
                t.forEach(t => {
                    if ('characterData' === t.type && (t.target === this.leftGuard || t.target === this.rightGuard)) {
                        const s = this.restore(t.target);
                        s && (e.range = s);
                    }
                });
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.traverse = e.matchText = e.matchNewline = e.matchBlot = e.matchAttributor = e.default = void 0;
        var i = function () {
                return function (t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function (t, e) {
                        var s = [], i = !0, r = !1, n = void 0;
                        try {
                            for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                        } catch (t) {
                            r = !0, n = t;
                        } finally {
                            try {
                                !i && o.return && o.return();
                            } finally {
                                if (r) throw n;
                            }
                        }
                        return s;
                    }(t, e);
                    throw new TypeError('Invalid attempt to destructure non-iterable instance');
                };
            }(), r = b(s(2)), n = b(s(1)), l = s(0), o = b(s(4)), a = b(s(10)), u = b(s(7)), c = s(26), h = s(27),
            d = b(s(19)), f = s(18), p = s(28), m = s(29), g = s(30);

        function b(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const y = (0, a.default)('quill:clipboard'),
            v = [[Node.TEXT_NODE, _], [Node.TEXT_NODE, C], ['br', function (t, e) {
                q(e, '\n') || e.insert('\n');
                return e;
            }], [Node.ELEMENT_NODE, C], [Node.ELEMENT_NODE, O], [Node.ELEMENT_NODE, S], [Node.ELEMENT_NODE, function (t, e) {
                const s = {}, i = t.style || {};
                'italic' === i.fontStyle && (s.italic = !0);
                (i.fontWeight.startsWith('bold') || parseInt(i.fontWeight, 10) >= 700) && (s.bold = !0);
                Object.keys(s).length > 0 && (e = A(e, s));
                if (parseFloat(i.textIndent || 0) > 0) return (new n.default).insert('\t').concat(e);
                return e;
            }], ['li', function (t, e, s) {
                const i = s.query(t);
                if (null == i || 'list' !== i.blotName || !q(e, '\n')) return e;
                let r = -1, l = t.parentNode;
                for (; null != l;) ['OL', 'UL'].includes(l.tagName) && (r += 1), l = l.parentNode;
                return r <= 0 ? e : e.compose((new n.default).retain(e.length() - 1).retain(1, {indent: r}));
            }], ['ol, ul', function (t, e) {
                const s = 'OL' === t.tagName ? 'ordered' : 'bullet';
                return A(e, 'list', s);
            }], ['pre', function (t, e, s) {
                const i = s.query('code-block'), r = !i || i.formats(t, s);
                return A(e, 'code-block', r);
            }], ['tr', function (t, e) {
                const s = 'TABLE' === t.parentNode.tagName ? t.parentNode : t.parentNode.parentNode,
                    i = Array.from(s.querySelectorAll('tr')).indexOf(t) + 1;
                return A(e, 'table', i);
            }], ['b', T.bind(T, 'bold')], ['i', T.bind(T, 'italic')], ['style', function () {
                return new n.default;
            }]], x = [c.AlignAttribute, p.DirectionAttribute].reduce((t, e) => (t[e.keyName] = e, t), {}),
            N = [c.AlignStyle, h.BackgroundStyle, f.ColorStyle, p.DirectionStyle, m.FontStyle, g.SizeStyle].reduce((t, e) => (t[e.keyName] = e, t), {});

        class E extends u.default {
            constructor(t, e) {
                super(t, e), this.quill.root.addEventListener('copy', t => this.onCaptureCopy(t, !1)), this.quill.root.addEventListener('cut', t => this.onCaptureCopy(t, !0)), this.quill.root.addEventListener('paste', this.onCapturePaste.bind(this)), this.matchers = [], v.concat(this.options.matchers).forEach(([t, e]) => {
                    this.addMatcher(t, e);
                });
            }

            addMatcher(t, e) {
                this.matchers.push([t, e]);
            }

            convert({html: t, text: e}, s = {}) {
                if (s[d.default.blotName]) return (new n.default).insert(e, {[d.default.blotName]: s[d.default.blotName]});
                if (!t) return (new n.default).insert(e || '');
                const r = (new DOMParser).parseFromString(t, 'text/html').body, l = new WeakMap;
                var o = this.prepareMatching(r, l), a = i(o, 2);
                const u = a[0], c = a[1], h = L(this.quill.scroll, r, u, c, l);
                return q(h, '\n') && (null == h.ops[h.ops.length - 1].attributes || s.table) ? h.compose((new n.default).retain(h.length() - 1).delete(1)) : h;
            }

            dangerouslyPasteHTML(t, e, s = o.default.sources.API) {
                if ('string' == typeof t) {
                    const s = this.convert({html: t, text: ''});
                    this.quill.setContents(s, e), this.quill.setSelection(0, o.default.sources.SILENT);
                } else {
                    const i = this.convert({html: e, text: ''});
                    this.quill.updateContents((new n.default).retain(t).concat(i), s), this.quill.setSelection(t + i.length(), o.default.sources.SILENT);
                }
            }

            onCaptureCopy(t, e = !1) {
                if (t.defaultPrevented) return;
                t.preventDefault();
                var s = this.quill.selection.getRange();
                const r = i(s, 1)[0];
                if (null == r) return;
                var n = this.onCopy(r, e);
                const l = n.html, a = n.text;
                t.clipboardData.setData('text/plain', a), t.clipboardData.setData('text/html', l), e && this.quill.deleteText(r, o.default.sources.USER);
            }

            onCapturePaste(t) {
                if (t.defaultPrevented || !this.quill.isEnabled()) return;
                t.preventDefault();
                const e = this.quill.getSelection(!0);
                if (null == e) return;
                const s = t.clipboardData.getData('text/html'), i = t.clipboardData.getData('text/plain'),
                    r = Array.from(t.clipboardData.files || []);
                !s && r.length > 0 ? this.quill.uploader.upload(e, r) : this.onPaste(e, {html: s, text: i});
            }

            onCopy(t) {
                const e = this.quill.getText(t);
                return {html: this.quill.getSemanticHTML(t), text: e};
            }

            onPaste(t, {text: e, html: s}) {
                const i = this.quill.getFormat(t.index), r = this.convert({text: e, html: s}, i);
                y.log('onPaste', r, {text: e, html: s});
                const l = (new n.default).retain(t.index).delete(t.length).concat(r);
                this.quill.updateContents(l, o.default.sources.USER), this.quill.setSelection(l.length() - t.length, o.default.sources.SILENT), this.quill.scrollIntoView();
            }

            prepareMatching(t, e) {
                const s = [], r = [];
                return this.matchers.forEach(n => {
                    var l = i(n, 2);
                    const o = l[0], a = l[1];
                    switch (o) {
                        case Node.TEXT_NODE:
                            r.push(a);
                            break;
                        case Node.ELEMENT_NODE:
                            s.push(a);
                            break;
                        default:
                            Array.from(t.querySelectorAll(o)).forEach(t => {
                                if (e.has(t)) {
                                    e.get(t).push(a);
                                } else e.set(t, [a]);
                            });
                    }
                }), [s, r];
            }
        }

        function A(t, e, s) {
            return 'object' == typeof e ? Object.keys(e).reduce((t, s) => A(t, s, e[s]), t) : t.reduce((t, i) => i.attributes && i.attributes[e] ? t.push(i) : t.insert(i.insert, (0, r.default)({}, {[e]: s}, i.attributes)), new n.default);
        }

        function q(t, e) {
            let s = '';
            for (let i = t.ops.length - 1; i >= 0 && s.length < e.length; --i) {
                const e = t.ops[i];
                if ('string' != typeof e.insert) break;
                s = e.insert + s;
            }
            return s.slice(-1 * e.length) === e;
        }

        function w(t) {
            return 0 !== t.childNodes.length && ['address', 'article', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'iframe', 'li', 'main', 'nav', 'ol', 'output', 'p', 'pre', 'section', 'table', 'td', 'tr', 'ul', 'video'].includes(t.tagName.toLowerCase());
        }

        E.DEFAULTS = {matchers: []};
        const k = new WeakMap;

        function L(t, e, s, i, r) {
            return e.nodeType === e.TEXT_NODE ? i.reduce((s, i) => i(e, s, t), new n.default) : e.nodeType === e.ELEMENT_NODE ? Array.from(e.childNodes || []).reduce((n, l) => {
                let o = L(t, l, s, i, r);
                return l.nodeType === e.ELEMENT_NODE && (o = s.reduce((e, s) => s(l, e, t), o), o = (r.get(l) || []).reduce((e, s) => s(l, e, t), o)), n.concat(o);
            }, new n.default) : new n.default;
        }

        function T(t, e, s) {
            return A(s, t, !0);
        }

        function S(t, e, s) {
            const i = l.Attributor.keys(t), r = l.ClassAttributor.keys(t), n = l.StyleAttributor.keys(t), o = {};
            return i.concat(r).concat(n).forEach(e => {
                let i = s.query(e, l.Scope.ATTRIBUTE);
                null != i && (o[i.attrName] = i.value(t), o[i.attrName]) || (null == (i = x[e]) || i.attrName !== e && i.keyName !== e || (o[i.attrName] = i.value(t) || void 0), null == (i = N[e]) || i.attrName !== e && i.keyName !== e || (i = N[e], o[i.attrName] = i.value(t) || void 0));
            }), Object.keys(o).length > 0 ? A(e, o) : e;
        }

        function O(t, e, s) {
            const i = s.query(t);
            if (null == i) return e;
            if (i.prototype instanceof l.EmbedBlot) {
                const e = {}, r = i.value(t);
                if (null != r) return e[i.blotName] = r, (new n.default).insert(e, i.formats(t, s));
            } else if (i.prototype instanceof l.BlockBlot && !q(e, '\n') && e.insert('\n'), 'function' == typeof i.formats) return A(e, i.blotName, i.formats(t, s));
            return e;
        }

        function C(t, e) {
            return q(e, '\n') || (w(t) || e.length() > 0 && t.nextSibling && w(t.nextSibling)) && e.insert('\n'), e;
        }

        function _(t, e) {
            let s = t.data;
            if ('O:P' === t.parentNode.tagName) return e.insert(s.trim());
            if (0 === s.trim().length) return e;
            if (!function t(e) {
                return null != e && (k.has(e) || ('PRE' === e.tagName ? k.set(e, !0) : k.set(e, t(e.parentNode))), k.get(e));
            }(t)) {
                const e = (t, e) => {
                    const s = e.replace(/[^\u00a0]/g, '');
                    return s.length < 1 && t ? ' ' : s;
                };
                s = (s = s.replace(/\r\n/g, ' ').replace(/\n/g, ' ')).replace(/\s\s+/g, e.bind(e, !0)), (null == t.previousSibling && w(t.parentNode) || null != t.previousSibling && w(t.previousSibling)) && (s = s.replace(/^\s+/, e.bind(e, !1))), (null == t.nextSibling && w(t.parentNode) || null != t.nextSibling && w(t.nextSibling)) && (s = s.replace(/\s+$/, e.bind(e, !1)));
            }
            return e.insert(s);
        }

        e.default = E, e.matchAttributor = S, e.matchBlot = O, e.matchNewline = C, e.matchText = _, e.traverse = L;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.AlignStyle = e.AlignClass = e.AlignAttribute = void 0;
        var i = s(0);
        const r = {scope: i.Scope.BLOCK, whitelist: ['right', 'center', 'justify']},
            n = new i.Attributor('align', 'align', r), l = new i.ClassAttributor('align', 'ql-align', r),
            o = new i.StyleAttributor('align', 'text-align', r);
        e.AlignAttribute = n, e.AlignClass = l, e.AlignStyle = o;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.BackgroundStyle = e.BackgroundClass = void 0;
        var i = s(0), r = s(18);
        const n = new i.ClassAttributor('background', 'ql-bg', {scope: i.Scope.INLINE}),
            l = new r.ColorAttributor('background', 'background-color', {scope: i.Scope.INLINE});
        e.BackgroundClass = n, e.BackgroundStyle = l;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.DirectionStyle = e.DirectionClass = e.DirectionAttribute = void 0;
        var i = s(0);
        const r = {scope: i.Scope.BLOCK, whitelist: ['rtl']}, n = new i.Attributor('direction', 'dir', r),
            l = new i.ClassAttributor('direction', 'ql-direction', r),
            o = new i.StyleAttributor('direction', 'direction', r);
        e.DirectionAttribute = n, e.DirectionClass = l, e.DirectionStyle = o;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.FontClass = e.FontStyle = void 0;
        var i = s(0);
        const r = {scope: i.Scope.INLINE, whitelist: ['serif', 'monospace']},
            n = new i.ClassAttributor('font', 'ql-font', r);
        const l = new class extends i.StyleAttributor {
            value(t) {
                return super.value(t).replace(/["']/g, '');
            }
        }('font', 'font-family', r);
        e.FontStyle = l, e.FontClass = n;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.SizeStyle = e.SizeClass = void 0;
        var i = s(0);
        const r = new i.ClassAttributor('size', 'ql-size', {
            scope: i.Scope.INLINE,
            whitelist: ['small', 'large', 'huge']
        }), n = new i.StyleAttributor('size', 'font-size', {
            scope: i.Scope.INLINE,
            whitelist: ['10px', '18px', '32px']
        });
        e.SizeClass = r, e.SizeStyle = n;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(5));

        class r extends i.default {
            static create() {
                return super.create();
            }

            static formats() {
                return !0;
            }

            optimize(t) {
                super.optimize(t), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
            }
        }

        r.blotName = 'bold', r.tagName = ['STRONG', 'B'], e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(16));
        e.default = class extends i.default {
            constructor(t, e) {
                super(t), this.label.innerHTML = e, this.container.classList.add('ql-color-picker'), Array.from(this.container.querySelectorAll('.ql-picker-item')).slice(0, 7).forEach(t => {
                    t.classList.add('ql-primary');
                });
            }

            buildItem(t) {
                const e = super.buildItem(t);
                return e.style.backgroundColor = t.getAttribute('value') || '', e;
            }

            selectItem(t, e) {
                super.selectItem(t, e);
                const s = this.label.querySelector('.ql-color-label'), i = t && t.getAttribute('data-value') || '';
                s && ('line' === s.tagName ? s.style.stroke = i : s.style.fill = i);
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(16));
        e.default = class extends i.default {
            constructor(t, e) {
                super(t), this.container.classList.add('ql-icon-picker'), Array.from(this.container.querySelectorAll('.ql-picker-item')).forEach(t => {
                    t.innerHTML = e[t.getAttribute('data-value') || ''];
                }), this.defaultItem = this.container.querySelector('.ql-selected'), this.selectItem(this.defaultItem);
            }

            selectItem(t, e) {
                super.selectItem(t, e);
                const s = t || this.defaultItem;
                this.label.innerHTML !== s.innerHTML && (this.label.innerHTML = s.innerHTML);
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        e.default = class {
            constructor(t, e) {
                this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer('ql-tooltip'), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener('scroll', () => {
                    this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
                }), this.hide();
            }

            hide() {
                this.root.classList.add('ql-hidden');
            }

            position(t) {
                const e = t.left + t.width / 2 - this.root.offsetWidth / 2, s = t.bottom + this.quill.root.scrollTop;
                this.root.style.left = `${e}px`, this.root.style.top = `${s}px`, this.root.classList.remove('ql-flip');
                const i = this.boundsContainer.getBoundingClientRect(), r = this.root.getBoundingClientRect();
                let n = 0;
                if (r.right > i.right && (n = i.right - r.right, this.root.style.left = `${e + n}px`), r.left < i.left && (n = i.left - r.left, this.root.style.left = `${e + n}px`), r.bottom > i.bottom) {
                    const e = r.bottom - r.top, i = t.bottom - t.top + e;
                    this.root.style.top = `${s - i}px`, this.root.classList.add('ql-flip');
                }
                return n;
            }

            show() {
                this.root.classList.remove('ql-editing'), this.root.classList.remove('ql-hidden');
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.BaseTooltip = void 0;
        var i = c(s(2)), r = c(s(8)), n = c(s(23)), l = c(s(32)), o = c(s(33)), a = c(s(16)), u = c(s(34));

        function c(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const h = [!1, 'center', 'right', 'justify'],
            d = ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'],
            f = [!1, 'serif', 'monospace'], p = ['1', '2', '3', !1], m = ['small', !1, 'large', 'huge'];

        class g extends n.default {
            constructor(t, e) {
                super(t, e);
                const s = e => {
                    document.body.contains(t.root) ? (null == this.tooltip || this.tooltip.root.contains(e.target) || document.activeElement === this.tooltip.textbox || this.quill.hasFocus() || this.tooltip.hide(), null != this.pickers && this.pickers.forEach(t => {
                        t.container.contains(e.target) || t.close();
                    })) : document.body.removeEventListener('click', s);
                };
                t.emitter.listenDOM('click', document.body, s);
            }

            addModule(t) {
                const e = super.addModule(t);
                return 'toolbar' === t && this.extendToolbar(e), e;
            }

            buildButtons(t, e) {
                Array.from(t).forEach(t => {
                    (t.getAttribute('class') || '').split(/\s+/).forEach(s => {
                        if (s.startsWith('ql-') && (s = s.slice('ql-'.length), null != e[s])) if ('direction' === s) t.innerHTML = e[s][''] + e[s].rtl; else if ('string' == typeof e[s]) t.innerHTML = e[s]; else {
                            const i = t.value || '';
                            null != i && e[s][i] && (t.innerHTML = e[s][i]);
                        }
                    });
                });
            }

            buildPickers(t, e) {
                this.pickers = Array.from(t).map(t => {
                    if (t.classList.contains('ql-align')) return null == t.querySelector('option') && b(t, h), new o.default(t, e.align);
                    if (t.classList.contains('ql-background') || t.classList.contains('ql-color')) {
                        const s = t.classList.contains('ql-background') ? 'background' : 'color';
                        return null == t.querySelector('option') && b(t, d, 'background' === s ? '#ffffff' : '#000000'), new l.default(t, e[s]);
                    }
                    return null == t.querySelector('option') && (t.classList.contains('ql-font') ? b(t, f) : t.classList.contains('ql-header') ? b(t, p) : t.classList.contains('ql-size') && b(t, m)), new a.default(t);
                });
                this.quill.on(r.default.events.EDITOR_CHANGE, () => {
                    this.pickers.forEach(t => {
                        t.update();
                    });
                });
            }
        }

        g.DEFAULTS = (0, i.default)(!0, {}, n.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        formula() {
                            this.quill.theme.tooltip.edit('formula');
                        }, image() {
                            let t = this.container.querySelector('input.ql-image[type=file]');
                            null == t && ((t = document.createElement('input')).setAttribute('type', 'file'), t.setAttribute('accept', this.quill.uploader.options.mimetypes.join(', ')), t.classList.add('ql-image'), t.addEventListener('change', () => {
                                const e = this.quill.getSelection(!0);
                                this.quill.uploader.upload(e, t.files), t.value = '';
                            }), this.container.appendChild(t)), t.click();
                        }, video() {
                            this.quill.theme.tooltip.edit('video');
                        }
                    }
                }
            }
        });

        function b(t, e, s = !1) {
            e.forEach(e => {
                const i = document.createElement('option');
                e === s ? i.setAttribute('selected', 'selected') : i.setAttribute('value', e), t.appendChild(i);
            });
        }

        e.BaseTooltip = class extends u.default {
            constructor(t, e) {
                super(t, e), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
            }

            listen() {
                this.textbox.addEventListener('keydown', t => {
                    'Enter' === t.key ? (this.save(), t.preventDefault()) : 'Escape' === t.key && (this.cancel(), t.preventDefault());
                });
            }

            cancel() {
                this.hide();
            }

            edit(t = 'link', e = null) {
                this.root.classList.remove('ql-hidden'), this.root.classList.add('ql-editing'), null != e ? this.textbox.value = e : t !== this.root.getAttribute('data-mode') && (this.textbox.value = ''), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute('placeholder', this.textbox.getAttribute(`data-${t}`) || ''), this.root.setAttribute('data-mode', t);
            }

            restoreFocus() {
                const t = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = t;
            }

            save() {
                let t = this.textbox.value;
                switch (this.root.getAttribute('data-mode')) {
                    case'link': {
                        const e = this.quill.root.scrollTop;
                        this.linkRange ? (this.quill.formatText(this.linkRange, 'link', t, r.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format('link', t, r.default.sources.USER)), this.quill.root.scrollTop = e;
                        break;
                    }
                    case'video':
                        t = function (t) {
                            let e = t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
                            return e ? `${e[1] || 'https'}://www.youtube.com/embed/${e[2]}?showinfo=0` : (e = t.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${e[1] || 'https'}://player.vimeo.com/video/${e[2]}/` : t;
                        }(t);
                    case'formula': {
                        if (!t) break;
                        const e = this.quill.getSelection(!0);
                        if (null != e) {
                            const s = e.index + e.length;
                            this.quill.insertEmbed(s, this.root.getAttribute('data-mode'), t, r.default.sources.USER), 'formula' === this.root.getAttribute('data-mode') && this.quill.insertText(s + 1, ' ', r.default.sources.USER), this.quill.setSelection(s + 2, r.default.sources.USER);
                        }
                        break;
                    }
                }
                this.textbox.value = '', this.hide();
            }
        }, e.default = g;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = B(s(37)), r = s(26), n = s(28), l = B(s(49)), o = B(s(50)), a = B(s(51)), u = B(s(52)), c = s(27),
            h = s(18), d = s(29), f = s(30), p = B(s(31)), m = B(s(53)), g = B(s(15)), b = B(s(54)), y = B(s(55)),
            v = B(s(56)), x = B(s(57)), N = B(s(58)), E = B(s(59)), A = s(19), q = B(A), w = B(s(60)), k = B(s(61)),
            L = B(s(63)), T = B(s(20)), S = B(s(16)), O = B(s(32)), C = B(s(33)), _ = B(s(34)), M = B(s(94)),
            R = B(s(95));

        function B(t) {
            return t && t.__esModule ? t : {default: t};
        }

        i.default.register({
            'attributors/attribute/direction': n.DirectionAttribute,
            'attributors/class/align': r.AlignClass,
            'attributors/class/background': c.BackgroundClass,
            'attributors/class/color': h.ColorClass,
            'attributors/class/direction': n.DirectionClass,
            'attributors/class/font': d.FontClass,
            'attributors/class/size': f.SizeClass,
            'attributors/style/align': r.AlignStyle,
            'attributors/style/background': c.BackgroundStyle,
            'attributors/style/color': h.ColorStyle,
            'attributors/style/direction': n.DirectionStyle,
            'attributors/style/font': d.FontStyle,
            'attributors/style/size': f.SizeStyle
        }, !0), i.default.register({
            'formats/align': r.AlignClass,
            'formats/direction': n.DirectionClass,
            'formats/indent': l.default,
            'formats/background': c.BackgroundStyle,
            'formats/color': h.ColorStyle,
            'formats/font': d.FontClass,
            'formats/size': f.SizeClass,
            'formats/blockquote': o.default,
            'formats/code-block': q.default,
            'formats/header': a.default,
            'formats/list': u.default,
            'formats/bold': p.default,
            'formats/code': A.Code,
            'formats/italic': m.default,
            'formats/link': g.default,
            'formats/script': b.default,
            'formats/strike': y.default,
            'formats/underline': v.default,
            'formats/formula': x.default,
            'formats/image': N.default,
            'formats/video': E.default,
            'modules/syntax': w.default,
            'modules/table': k.default,
            'modules/toolbar': L.default,
            'themes/bubble': M.default,
            'themes/snow': R.default,
            'ui/icons': T.default,
            'ui/picker': S.default,
            'ui/icon-picker': C.default,
            'ui/color-picker': O.default,
            'ui/tooltip': _.default
        }, !0), e.default = i.default;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = b(s(4)), r = s(3), n = b(r), l = b(s(9)), o = b(s(12)), a = b(s(14)), u = b(s(24)), c = b(s(5)),
            h = b(s(45)), d = b(s(6)), f = b(s(25)), p = b(s(46)), m = b(s(47)), g = b(s(48));

        function b(t) {
            return t && t.__esModule ? t : {default: t};
        }

        i.default.register({
            'blots/block': n.default,
            'blots/block/embed': r.BlockEmbed,
            'blots/break': l.default,
            'blots/container': o.default,
            'blots/cursor': a.default,
            'blots/embed': u.default,
            'blots/inline': c.default,
            'blots/scroll': h.default,
            'blots/text': d.default,
            'modules/clipboard': f.default,
            'modules/history': p.default,
            'modules/keyboard': m.default,
            'modules/uploader': g.default
        }), e.default = i.default;
    }, function (t, e) {
        function s(t) {
            var e = [];
            for (var s in t) e.push(s);
            return e;
        }

        (t.exports = 'function' == typeof Object.keys ? Object.keys : s).shim = s;
    }, function (t, e) {
        var s = '[object Arguments]' == function () {
            return Object.prototype.toString.call(arguments);
        }();

        function i(t) {
            return '[object Arguments]' == Object.prototype.toString.call(t);
        }

        function r(t) {
            return t && 'object' == typeof t && 'number' == typeof t.length && Object.prototype.hasOwnProperty.call(t, 'callee') && !Object.prototype.propertyIsEnumerable.call(t, 'callee') || !1;
        }

        (e = t.exports = s ? i : r).supported = i, e.unsupported = r;
    }, function (t, e) {
        var s = -1, i = 1, r = 0;

        function n(t, e, u, c) {
            if (t === e) return t ? [[r, t]] : [];
            if (null != u) {
                var p = function (t, e, s) {
                    var i = 'number' == typeof s ? {index: s, length: 0} : s.oldRange,
                        r = 'number' == typeof s ? null : s.newRange, n = t.length, l = e.length;
                    if (0 === i.length && (null === r || 0 === r.length)) {
                        var o = i.index, a = t.slice(0, o), u = t.slice(o), c = r ? r.index : null, h = o + l - n;
                        if ((null === c || c === h) && !(h < 0 || h > l)) {
                            var d = e.slice(0, h), p = e.slice(h);
                            if (p === u) {
                                var m = Math.min(o, h), g = a.slice(0, m), b = d.slice(0, m);
                                if (g === b) {
                                    var y = a.slice(m), v = d.slice(m);
                                    return f(g, y, v, u);
                                }
                            }
                        }
                        if (null === c || c === o) {
                            var x = o, d = e.slice(0, x), p = e.slice(x);
                            if (d === a) {
                                var N = Math.min(n - x, l - x), E = u.slice(u.length - N), A = p.slice(p.length - N);
                                if (E === A) {
                                    var y = u.slice(0, u.length - N), v = p.slice(0, p.length - N);
                                    return f(a, y, v, E);
                                }
                            }
                        }
                    }
                    if (i.length > 0 && r && 0 === r.length) {
                        var g = t.slice(0, i.index), E = t.slice(i.index + i.length), m = g.length, N = E.length;
                        if (!(l < m + N)) {
                            var b = e.slice(0, m), A = e.slice(l - N);
                            if (g === b && E === A) {
                                var y = t.slice(m, n - N), v = e.slice(m, l - N);
                                return f(g, y, v, E);
                            }
                        }
                    }
                    return null;
                }(t, e, u);
                if (p) return p;
            }
            var m = o(t, e), g = t.substring(0, m);
            m = a(t = t.substring(m), e = e.substring(m));
            var b = t.substring(t.length - m), y = function (t, e) {
                var u;
                if (!t) return [[i, e]];
                if (!e) return [[s, t]];
                var c = t.length > e.length ? t : e, h = t.length > e.length ? e : t, d = c.indexOf(h);
                if (-1 !== d) return u = [[i, c.substring(0, d)], [r, h], [i, c.substring(d + h.length)]], t.length > e.length && (u[0][0] = u[2][0] = s), u;
                if (1 === h.length) return [[s, t], [i, e]];
                var f = function (t, e) {
                    var s = t.length > e.length ? t : e, i = t.length > e.length ? e : t;
                    if (s.length < 4 || 2 * i.length < s.length) return null;

                    function r(t, e, s) {
                        for (var i, r, n, l, u = t.substring(s, s + Math.floor(t.length / 4)), c = -1, h = ''; -1 !== (c = e.indexOf(u, c + 1));) {
                            var d = o(t.substring(s), e.substring(c)), f = a(t.substring(0, s), e.substring(0, c));
                            h.length < f + d && (h = e.substring(c - f, c) + e.substring(c, c + d), i = t.substring(0, s - f), r = t.substring(s + d), n = e.substring(0, c - f), l = e.substring(c + d));
                        }
                        return 2 * h.length >= t.length ? [i, r, n, l, h] : null;
                    }

                    var n, l, u, c, h, d = r(s, i, Math.ceil(s.length / 4)), f = r(s, i, Math.ceil(s.length / 2));
                    if (!d && !f) return null;
                    n = f ? d && d[4].length > f[4].length ? d : f : d;
                    t.length > e.length ? (l = n[0], u = n[1], c = n[2], h = n[3]) : (c = n[0], h = n[1], l = n[2], u = n[3]);
                    var p = n[4];
                    return [l, u, c, h, p];
                }(t, e);
                if (f) {
                    var p = f[0], m = f[1], g = f[2], b = f[3], y = f[4], v = n(p, g), x = n(m, b);
                    return v.concat([[r, y]], x);
                }
                return function (t, e) {
                    for (var r = t.length, n = e.length, o = Math.ceil((r + n) / 2), a = o, u = 2 * o, c = new Array(u), h = new Array(u), d = 0; d < u; d++) c[d] = -1, h[d] = -1;
                    c[a + 1] = 0, h[a + 1] = 0;
                    for (var f = r - n, p = f % 2 != 0, m = 0, g = 0, b = 0, y = 0, v = 0; v < o; v++) {
                        for (var x = -v + m; x <= v - g; x += 2) {
                            for (var N = a + x, E = (L = x === -v || x !== v && c[N - 1] < c[N + 1] ? c[N + 1] : c[N - 1] + 1) - x; L < r && E < n && t.charAt(L) === e.charAt(E);) L++, E++;
                            if (c[N] = L, L > r) g += 2; else if (E > n) m += 2; else if (p) {
                                var A = a + f - x;
                                if (A >= 0 && A < u && -1 !== h[A]) {
                                    var q = r - h[A];
                                    if (L >= q) return l(t, e, L, E);
                                }
                            }
                        }
                        for (var w = -v + b; w <= v - y; w += 2) {
                            for (var A = a + w, k = (q = w === -v || w !== v && h[A - 1] < h[A + 1] ? h[A + 1] : h[A - 1] + 1) - w; q < r && k < n && t.charAt(r - q - 1) === e.charAt(n - k - 1);) q++, k++;
                            if (h[A] = q, q > r) y += 2; else if (k > n) b += 2; else if (!p) {
                                var N = a + f - w;
                                if (N >= 0 && N < u && -1 !== c[N]) {
                                    var L = c[N], E = a + L - N;
                                    if (L >= (q = r - q)) return l(t, e, L, E);
                                }
                            }
                        }
                    }
                    return [[s, t], [i, e]];
                }(t, e);
            }(t = t.substring(0, t.length - m), e = e.substring(0, e.length - m));
            return g && y.unshift([r, g]), b && y.push([r, b]), function t(e, n) {
                e.push([r, '']);
                var l = 0;
                var u = 0;
                var c = 0;
                var f = '';
                var p = '';
                var m;
                for (; l < e.length;) if (l < e.length - 1 && !e[l][1]) e.splice(l, 1); else switch (e[l][0]) {
                    case i:
                        c++, p += e[l][1], l++;
                        break;
                    case s:
                        u++, f += e[l][1], l++;
                        break;
                    case r:
                        var g = l - c - u - 1;
                        if (n) {
                            if (g >= 0 && d(e[g][1])) {
                                var b = e[g][1].slice(-1);
                                if (e[g][1] = e[g][1].slice(0, -1), f = b + f, p = b + p, !e[g][1]) {
                                    e.splice(g, 1), l--;
                                    var y = g - 1;
                                    e[y] && e[y][0] === i && (c++, p = e[y][1] + p, y--), e[y] && e[y][0] === s && (u++, f = e[y][1] + f, y--), g = y;
                                }
                            }
                            if (h(e[l][1])) {
                                var b = e[l][1].charAt(0);
                                e[l][1] = e[l][1].slice(1), f += b, p += b;
                            }
                        }
                        if (l < e.length - 1 && !e[l][1]) {
                            e.splice(l, 1);
                            break;
                        }
                        if (f.length > 0 || p.length > 0) {
                            f.length > 0 && p.length > 0 && (0 !== (m = o(p, f)) && (g >= 0 ? e[g][1] += p.substring(0, m) : (e.splice(0, 0, [r, p.substring(0, m)]), l++), p = p.substring(m), f = f.substring(m)), 0 !== (m = a(p, f)) && (e[l][1] = p.substring(p.length - m) + e[l][1], p = p.substring(0, p.length - m), f = f.substring(0, f.length - m)));
                            var v = c + u;
                            0 === f.length && 0 === p.length ? (e.splice(l - v, v), l -= v) : 0 === f.length ? (e.splice(l - v, v, [i, p]), l = l - v + 1) : 0 === p.length ? (e.splice(l - v, v, [s, f]), l = l - v + 1) : (e.splice(l - v, v, [s, f], [i, p]), l = l - v + 2);
                        }
                        0 !== l && e[l - 1][0] === r ? (e[l - 1][1] += e[l][1], e.splice(l, 1)) : l++, c = 0, u = 0, f = '', p = '';
                }
                '' === e[e.length - 1][1] && e.pop();
                var x = !1;
                l = 1;
                for (; l < e.length - 1;) e[l - 1][0] === r && e[l + 1][0] === r && (e[l][1].substring(e[l][1].length - e[l - 1][1].length) === e[l - 1][1] ? (e[l][1] = e[l - 1][1] + e[l][1].substring(0, e[l][1].length - e[l - 1][1].length), e[l + 1][1] = e[l - 1][1] + e[l + 1][1], e.splice(l - 1, 1), x = !0) : e[l][1].substring(0, e[l + 1][1].length) == e[l + 1][1] && (e[l - 1][1] += e[l + 1][1], e[l][1] = e[l][1].substring(e[l + 1][1].length) + e[l + 1][1], e.splice(l + 1, 1), x = !0)), l++;
                x && t(e, n);
            }(y, c), y;
        }

        function l(t, e, s, i) {
            var r = t.substring(0, s), l = e.substring(0, i), o = t.substring(s), a = e.substring(i), u = n(r, l),
                c = n(o, a);
            return u.concat(c);
        }

        function o(t, e) {
            if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0;
            for (var s = 0, i = Math.min(t.length, e.length), r = i, n = 0; s < r;) t.substring(n, r) == e.substring(n, r) ? n = s = r : i = r, r = Math.floor((i - s) / 2 + s);
            return u(t.charCodeAt(r - 1)) && r--, r;
        }

        function a(t, e) {
            if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0;
            for (var s = 0, i = Math.min(t.length, e.length), r = i, n = 0; s < r;) t.substring(t.length - r, t.length - n) == e.substring(e.length - r, e.length - n) ? n = s = r : i = r, r = Math.floor((i - s) / 2 + s);
            return c(t.charCodeAt(t.length - r)) && r--, r;
        }

        function u(t) {
            return t >= 55296 && t <= 56319;
        }

        function c(t) {
            return t >= 56320 && t <= 57343;
        }

        function h(t) {
            return c(t.charCodeAt(0));
        }

        function d(t) {
            return u(t.charCodeAt(t.length - 1));
        }

        function f(t, e, n, l) {
            return d(t) || h(l) ? null : function (t) {
                for (var e = [], s = 0; s < t.length; s++) t[s][1].length > 0 && e.push(t[s]);
                return e;
            }([[r, t], [s, e], [i, n], [r, l]]);
        }

        function p(t, e, s) {
            return n(t, e, s, !0);
        }

        p.INSERT = i, p.DELETE = s, p.EQUAL = r, t.exports = p;
    }, function (t, e, s) {
        'use strict';
        var i = this && this.__importDefault || function (t) {
            return t && t.__esModule ? t : {default: t};
        };
        Object.defineProperty(e, '__esModule', {value: !0});
        var r, n = i(s(11)), l = i(s(2));
        !function (t) {
            t.compose = function (t, e, s) {
                void 0 === t && (t = {}), void 0 === e && (e = {}), 'object' != typeof t && (t = {}), 'object' != typeof e && (e = {});
                var i = l.default(!0, {}, e);
                for (var r in s || (i = Object.keys(i).reduce(function (t, e) {
                    return null != i[e] && (t[e] = i[e]), t;
                }, {})), t) void 0 !== t[r] && void 0 === e[r] && (i[r] = t[r]);
                return Object.keys(i).length > 0 ? i : void 0;
            }, t.diff = function (t, e) {
                void 0 === t && (t = {}), void 0 === e && (e = {}), 'object' != typeof t && (t = {}), 'object' != typeof e && (e = {});
                var s = Object.keys(t).concat(Object.keys(e)).reduce(function (s, i) {
                    return n.default(t[i], e[i]) || (s[i] = void 0 === e[i] ? null : e[i]), s;
                }, {});
                return Object.keys(s).length > 0 ? s : void 0;
            }, t.transform = function (t, e, s) {
                if (void 0 === s && (s = !1), 'object' != typeof t) return e;
                if ('object' == typeof e) {
                    if (!s) return e;
                    var i = Object.keys(e).reduce(function (s, i) {
                        return void 0 === t[i] && (s[i] = e[i]), s;
                    }, {});
                    return Object.keys(i).length > 0 ? i : void 0;
                }
            };
        }(r || (r = {})), e.default = r;
    }, function (t, e, s) {
        'use strict';
        var i = this && this.__importDefault || function (t) {
            return t && t.__esModule ? t : {default: t};
        };
        Object.defineProperty(e, '__esModule', {value: !0});
        var r = i(s(21)), n = function () {
            function t(t) {
                this.ops = t, this.index = 0, this.offset = 0;
            }

            return t.prototype.hasNext = function () {
                return this.peekLength() < 1 / 0;
            }, t.prototype.next = function (t) {
                t || (t = 1 / 0);
                var e = this.ops[this.index];
                if (e) {
                    var s = this.offset, i = r.default.length(e);
                    if (t >= i - s ? (t = i - s, this.index += 1, this.offset = 0) : this.offset += t, 'number' == typeof e.delete) return {delete: t};
                    var n = {};
                    return e.attributes && (n.attributes = e.attributes), 'number' == typeof e.retain ? n.retain = t : 'string' == typeof e.insert ? n.insert = e.insert.substr(s, t) : n.insert = e.insert, n;
                }
                return {retain: 1 / 0};
            }, t.prototype.peek = function () {
                return this.ops[this.index];
            }, t.prototype.peekLength = function () {
                return this.ops[this.index] ? r.default.length(this.ops[this.index]) - this.offset : 1 / 0;
            }, t.prototype.peekType = function () {
                return this.ops[this.index] ? 'number' == typeof this.ops[this.index].delete ? 'delete' : 'number' == typeof this.ops[this.index].retain ? 'retain' : 'insert' : 'retain';
            }, t.prototype.rest = function () {
                if (this.hasNext()) {
                    if (0 === this.offset) return this.ops.slice(this.index);
                    var t = this.offset, e = this.index, s = this.next(), i = this.ops.slice(this.index);
                    return this.offset = t, this.index = e, [s].concat(i);
                }
                return [];
            }, t;
        }();
        e.default = n;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function () {
                return function (t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function (t, e) {
                        var s = [], i = !0, r = !1, n = void 0;
                        try {
                            for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                        } catch (t) {
                            r = !0, n = t;
                        } finally {
                            try {
                                !i && o.return && o.return();
                            } finally {
                                if (r) throw n;
                            }
                        }
                        return s;
                    }(t, e);
                    throw new TypeError('Invalid attempt to destructure non-iterable instance');
                };
            }(), r = b(s(17)), n = b(s(11)), l = b(s(2)), o = s(1), a = b(o), u = s(0), c = s(13), h = b(s(14)), d = s(3),
            f = b(d), p = b(s(9)), m = s(6), g = b(m);

        function b(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const y = /^[ -~]*$/;

        function v(t, e, s) {
            if (0 === t.length) {
                var r = E(s.pop());
                const t = i(r, 1)[0];
                return e <= 0 ? `</li></${t}>` : `</li></${t}>${v([], e - 1, s)}`;
            }
            var n = function (t) {
                return Array.isArray(t) ? t : Array.from(t);
            }(t), l = n[0];
            const o = l.child, a = l.offset, u = l.length, c = l.indent, h = l.type, d = n.slice(1);
            var f = E(h), p = i(f, 2);
            const m = p[0], g = p[1];
            if (c > e) return s.push(h), `<${m}><li${g}>${x(o, a, u)}${v(d, c, s)}`;
            if (c === e) return `</li><li${g}>${x(o, a, u)}${v(d, c, s)}`;
            var b = E(s.pop());
            return `</li></${i(b, 1)[0]}>${v(t, e - 1, s)}`;
        }

        function x(t, e, s, r = !1) {
            if ('function' == typeof t.html) return t.html(e, s);
            if (t instanceof g.default) return (0, m.escapeText)(t.value().slice(e, e + s));
            if (t.children) {
                if ('list-container' === t.statics.blotName) {
                    const i = [];
                    return t.children.forEachAt(e, s, (t, e, s) => {
                        const r = t.formats();
                        i.push({child: t, offset: e, length: s, indent: r.indent || 0, type: r.list});
                    }), v(i, -1, []);
                }
                const a = [];
                if (t.children.forEachAt(e, s, (t, e, s) => {
                    a.push(x(t, e, s));
                }), r || 'list' === t.statics.blotName) return a.join('');
                var n = t.domNode;
                const u = n.outerHTML, c = n.innerHTML;
                var l = u.split(`>${c}<`), o = i(l, 2);
                const h = o[0], d = o[1];
                return '<table' === h ? `<table style="border: 1px solid #000;">${a.join('')}<${d}` : `${h}>${a.join('')}<${d}`;
            }
            return t.domNode.outerHTML;
        }

        function N(t, e) {
            return Object.keys(e).reduce((s, i) => null == t[i] ? s : (e[i] === t[i] ? s[i] = e[i] : Array.isArray(e[i]) ? e[i].indexOf(t[i]) < 0 && (s[i] = e[i].concat([t[i]])) : s[i] = [e[i], t[i]], s), {});
        }

        function E(t) {
            const e = 'ordered' === t ? 'ol' : 'ul';
            switch (t) {
                case'checked':
                    return [e, ' data-list="checked"'];
                case'unchecked':
                    return [e, ' data-list="unchecked"'];
                default:
                    return [e, ''];
            }
        }

        function A({index: t, length: e}, s) {
            return new c.Range(t + s, e);
        }

        e.default = class {
            constructor(t) {
                this.scroll = t, this.delta = this.getDelta();
            }

            applyDelta(t) {
                let e = !1;
                this.scroll.update();
                let s = this.scroll.length();
                this.scroll.batchStart();
                const r = function (t) {
                    return t.reduce((t, e) => {
                        if ('string' == typeof e.insert) {
                            const s = e.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                            return t.insert(s, e.attributes);
                        }
                        return t.push(e);
                    }, new a.default);
                }(t);
                return r.reduce((t, r) => {
                    const n = r.retain || r.delete || r.insert.length || 1;
                    let a = r.attributes || {};
                    if (null != r.insert) {
                        if ('string' == typeof r.insert) {
                            let n = r.insert;
                            n.endsWith('\n') && e && (e = !1, n = n.slice(0, -1)), (t >= s || this.scroll.descendant(d.BlockEmbed, t)[0]) && !n.endsWith('\n') && (e = !0), this.scroll.insertAt(t, n);
                            var c = this.scroll.line(t), h = i(c, 2);
                            const m = h[0], g = h[1];
                            let b = (0, l.default)({}, (0, d.bubbleFormats)(m));
                            if (m instanceof f.default) {
                                var p = m.descendant(u.LeafBlot, g);
                                const t = i(p, 1)[0];
                                b = (0, l.default)(b, (0, d.bubbleFormats)(t));
                            }
                            a = o.AttributeMap.diff(b, a) || {};
                        } else if ('object' == typeof r.insert) {
                            const e = Object.keys(r.insert)[0];
                            if (null == e) return t;
                            this.scroll.insertAt(t, e, r.insert[e]);
                        }
                        s += n;
                    }
                    return Object.keys(a).forEach(e => {
                        this.scroll.formatAt(t, n, e, a[e]);
                    }), t + n;
                }, 0), r.reduce((t, e) => 'number' == typeof e.delete ? (this.scroll.deleteAt(t, e.delete), t) : t + (e.retain || e.insert.length || 1), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
            }

            deleteText(t, e) {
                return this.scroll.deleteAt(t, e), this.update((new a.default).retain(t).delete(e));
            }

            formatLine(t, e, s = {}) {
                this.scroll.update(), Object.keys(s).forEach(i => {
                    this.scroll.lines(t, Math.max(e, 1)).forEach(t => {
                        t.format(i, s[i]);
                    });
                }), this.scroll.optimize();
                const i = (new a.default).retain(t).retain(e, (0, r.default)(s));
                return this.update(i);
            }

            formatText(t, e, s = {}) {
                Object.keys(s).forEach(i => {
                    this.scroll.formatAt(t, e, i, s[i]);
                });
                const i = (new a.default).retain(t).retain(e, (0, r.default)(s));
                return this.update(i);
            }

            getContents(t, e) {
                return this.delta.slice(t, t + e);
            }

            getDelta() {
                return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new a.default);
            }

            getFormat(t, e = 0) {
                let s = [], r = [];
                0 === e ? this.scroll.path(t).forEach(t => {
                    const e = i(t, 1)[0];
                    e instanceof f.default ? s.push(e) : e instanceof u.LeafBlot && r.push(e);
                }) : (s = this.scroll.lines(t, e), r = this.scroll.descendants(u.LeafBlot, t, e));
                const n = [s, r].map(t => {
                    if (0 === t.length) return {};
                    let e = (0, d.bubbleFormats)(t.shift());
                    for (; Object.keys(e).length > 0;) {
                        const s = t.shift();
                        if (null == s) return e;
                        e = N((0, d.bubbleFormats)(s), e);
                    }
                    return e;
                });
                return l.default.apply(l.default, n);
            }

            getHTML(t, e) {
                var s = this.scroll.line(t), r = i(s, 2);
                const n = r[0], l = r[1];
                return n.length() >= l + e ? x(n, l, e, !0) : x(this.scroll, t, e, !0);
            }

            getText(t, e) {
                return this.getContents(t, e).filter(t => 'string' == typeof t.insert).map(t => t.insert).join('');
            }

            insertEmbed(t, e, s) {
                return this.scroll.insertAt(t, e, s), this.update((new a.default).retain(t).insert({[e]: s}));
            }

            insertText(t, e, s = {}) {
                return e = e.replace(/\r\n/g, '\n').replace(/\r/g, '\n'), this.scroll.insertAt(t, e), Object.keys(s).forEach(i => {
                    this.scroll.formatAt(t, e.length, i, s[i]);
                }), this.update((new a.default).retain(t).insert(e, (0, r.default)(s)));
            }

            isBlank() {
                if (0 === this.scroll.children.length) return !0;
                if (this.scroll.children.length > 1) return !1;
                const t = this.scroll.children.head;
                return t.statics.blotName === f.default.blotName && !(t.children.length > 1) && t.children.head instanceof p.default;
            }

            removeFormat(t, e) {
                const s = this.getText(t, e);
                var r = this.scroll.line(t + e), n = i(r, 2);
                const l = n[0], o = n[1];
                let u = 0, c = new a.default;
                null != l && (u = l.length() - o, c = l.delta().slice(o, o + u - 1).insert('\n'));
                const h = this.getContents(t, e + u).diff((new a.default).insert(s).concat(c)),
                    d = (new a.default).retain(t).concat(h);
                return this.applyDelta(d);
            }

            update(t, e = [], s) {
                const i = this.delta;
                if (1 === e.length && 'characterData' === e[0].type && e[0].target.data.match(y) && this.scroll.find(e[0].target)) {
                    const r = this.scroll.find(e[0].target), n = (0, d.bubbleFormats)(r), l = r.offset(this.scroll),
                        o = e[0].oldValue.replace(h.default.CONTENTS, ''), u = (new a.default).insert(o),
                        c = (new a.default).insert(r.value()),
                        f = s && {oldRange: A(s.oldRange, -l), newRange: A(s.newRange, -l)};
                    t = (new a.default).retain(l).concat(u.diff(c, f)).reduce((t, e) => e.insert ? t.insert(e.insert, n) : t.push(e), new a.default), this.delta = i.compose(t);
                } else this.delta = this.getDelta(), t && (0, n.default)(i.compose(t), this.delta) || (t = i.diff(this.delta, s));
                return t;
            }
        };
    }, function (t, e) {
        'use strict';
        var s = Object.prototype.hasOwnProperty, i = '~';

        function r() {
        }

        function n(t, e, s, r, n) {
            if ('function' != typeof s) throw new TypeError('The listener must be a function');
            var l = new function (t, e, s) {
                this.fn = t, this.context = e, this.once = s || !1;
            }(s, r || t, n), o = i ? i + e : e;
            return t._events[o] ? t._events[o].fn ? t._events[o] = [t._events[o], l] : t._events[o].push(l) : (t._events[o] = l, t._eventsCount++), t;
        }

        function l(t, e) {
            0 == --t._eventsCount ? t._events = new r : delete t._events[e];
        }

        function o() {
            this._events = new r, this._eventsCount = 0;
        }

        Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (i = !1)), o.prototype.eventNames = function () {
            var t, e, r = [];
            if (0 === this._eventsCount) return r;
            for (e in t = this._events) s.call(t, e) && r.push(i ? e.slice(1) : e);
            return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(t)) : r;
        }, o.prototype.listeners = function (t) {
            var e = i ? i + t : t, s = this._events[e];
            if (!s) return [];
            if (s.fn) return [s.fn];
            for (var r = 0, n = s.length, l = new Array(n); r < n; r++) l[r] = s[r].fn;
            return l;
        }, o.prototype.listenerCount = function (t) {
            var e = i ? i + t : t, s = this._events[e];
            return s ? s.fn ? 1 : s.length : 0;
        }, o.prototype.emit = function (t, e, s, r, n, l) {
            var o = i ? i + t : t;
            if (!this._events[o]) return !1;
            var a, u, c = this._events[o], h = arguments.length;
            if (c.fn) {
                switch (c.once && this.removeListener(t, c.fn, void 0, !0), h) {
                    case 1:
                        return c.fn.call(c.context), !0;
                    case 2:
                        return c.fn.call(c.context, e), !0;
                    case 3:
                        return c.fn.call(c.context, e, s), !0;
                    case 4:
                        return c.fn.call(c.context, e, s, r), !0;
                    case 5:
                        return c.fn.call(c.context, e, s, r, n), !0;
                    case 6:
                        return c.fn.call(c.context, e, s, r, n, l), !0;
                }
                for (u = 1, a = new Array(h - 1); u < h; u++) a[u - 1] = arguments[u];
                c.fn.apply(c.context, a);
            } else {
                var d, f = c.length;
                for (u = 0; u < f; u++) switch (c[u].once && this.removeListener(t, c[u].fn, void 0, !0), h) {
                    case 1:
                        c[u].fn.call(c[u].context);
                        break;
                    case 2:
                        c[u].fn.call(c[u].context, e);
                        break;
                    case 3:
                        c[u].fn.call(c[u].context, e, s);
                        break;
                    case 4:
                        c[u].fn.call(c[u].context, e, s, r);
                        break;
                    default:
                        if (!a) for (d = 1, a = new Array(h - 1); d < h; d++) a[d - 1] = arguments[d];
                        c[u].fn.apply(c[u].context, a);
                }
            }
            return !0;
        }, o.prototype.on = function (t, e, s) {
            return n(this, t, e, s, !1);
        }, o.prototype.once = function (t, e, s) {
            return n(this, t, e, s, !0);
        }, o.prototype.removeListener = function (t, e, s, r) {
            var n = i ? i + t : t;
            if (!this._events[n]) return this;
            if (!e) return l(this, n), this;
            var o = this._events[n];
            if (o.fn) o.fn !== e || r && !o.once || s && o.context !== s || l(this, n); else {
                for (var a = 0, u = [], c = o.length; a < c; a++) (o[a].fn !== e || r && !o[a].once || s && o[a].context !== s) && u.push(o[a]);
                u.length ? this._events[n] = 1 === u.length ? u[0] : u : l(this, n);
            }
            return this;
        }, o.prototype.removeAllListeners = function (t) {
            var e;
            return t ? (e = i ? i + t : t, this._events[e] && l(this, e)) : (this._events = new r, this._eventsCount = 0), this;
        }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = i, o.EventEmitter = o, void 0 !== t && (t.exports = o);
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = s(0), n = c(s(8)), l = s(3), o = c(l), a = c(s(9)), u = c(s(12));

        function c(t) {
            return t && t.__esModule ? t : {default: t};
        }

        function h(t) {
            return t instanceof o.default || t instanceof l.BlockEmbed;
        }

        class d extends r.ScrollBlot {
            constructor(t, e, {emitter: s}) {
                super(t, e), this.emitter = s, this.batch = !1, this.optimize(), this.enable();
            }

            batchStart() {
                Array.isArray(this.batch) || (this.batch = []);
            }

            batchEnd() {
                const t = this.batch;
                this.batch = !1, this.update(t);
            }

            emitMount(t) {
                this.emitter.emit(n.default.events.SCROLL_BLOT_MOUNT, t);
            }

            emitUnmount(t) {
                this.emitter.emit(n.default.events.SCROLL_BLOT_UNMOUNT, t);
            }

            deleteAt(t, e) {
                var s = this.line(t), r = i(s, 2);
                const n = r[0], o = r[1];
                var u = this.line(t + e);
                const c = i(u, 1)[0];
                if (super.deleteAt(t, e), null != c && n !== c && o > 0) {
                    if (n instanceof l.BlockEmbed || c instanceof l.BlockEmbed) return void this.optimize();
                    const t = c.children.head instanceof a.default ? null : c.children.head;
                    n.moveChildren(c, t), n.remove();
                }
                this.optimize();
            }

            enable(t = !0) {
                this.domNode.setAttribute('contenteditable', t);
            }

            formatAt(t, e, s, i) {
                super.formatAt(t, e, s, i), this.optimize();
            }

            insertAt(t, e, s) {
                if (t >= this.length()) if (null == s || null == this.scroll.query(e, r.Scope.BLOCK)) {
                    const t = this.scroll.create(this.statics.defaultChild.blotName);
                    this.appendChild(t), null == s && e.endsWith('\n') ? t.insertAt(0, e.slice(0, -1), s) : t.insertAt(0, e, s);
                } else {
                    const t = this.scroll.create(e, s);
                    this.appendChild(t);
                } else super.insertAt(t, e, s);
                this.optimize();
            }

            insertBefore(t, e) {
                if (t.statics.scope === r.Scope.INLINE_BLOT) {
                    const s = this.scroll.create(this.statics.defaultChild.blotName);
                    s.appendChild(t), super.insertBefore(s, e);
                } else super.insertBefore(t, e);
            }

            isEnabled() {
                return 'true' === this.domNode.getAttribute('contenteditable');
            }

            leaf(t) {
                return this.path(t).pop() || [null, -1];
            }

            line(t) {
                return t === this.length() ? this.line(t - 1) : this.descendant(h, t);
            }

            lines(t = 0, e = Number.MAX_VALUE) {
                const s = (t, e, i) => {
                    let n = [], l = i;
                    return t.children.forEachAt(e, i, (t, e, i) => {
                        h(t) ? n.push(t) : t instanceof r.ContainerBlot && (n = n.concat(s(t, e, l))), l -= i;
                    }), n;
                };
                return s(this, t, e);
            }

            optimize(t = [], e = {}) {
                this.batch || (super.optimize(t, e), t.length > 0 && this.emitter.emit(n.default.events.SCROLL_OPTIMIZE, t, e));
            }

            path(t) {
                return super.path(t).slice(1);
            }

            remove() {
            }

            update(t) {
                if (this.batch) return void (Array.isArray(t) && (this.batch = this.batch.concat(t)));
                let e = n.default.sources.USER;
                'string' == typeof t && (e = t), Array.isArray(t) || (t = this.observer.takeRecords()), t.length > 0 && this.emitter.emit(n.default.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(n.default.events.SCROLL_UPDATE, e, t);
            }
        }

        d.blotName = 'scroll', d.className = 'ql-editor', d.tagName = 'DIV', d.defaultChild = o.default, d.allowedChildren = [o.default, l.BlockEmbed, u.default], e.default = d;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.getLastChangeIndex = e.default = void 0;
        var i = s(0), r = s(1), n = a(r), l = a(s(4)), o = a(s(7));

        function a(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class u extends o.default {
            constructor(t, e) {
                super(t, e), this.lastRecorded = 0, this.ignoreChange = !1, this.clear(), this.quill.on(l.default.events.EDITOR_CHANGE, (t, e, s, i) => {
                    t !== l.default.events.TEXT_CHANGE || this.ignoreChange || (this.options.userOnly && i !== l.default.sources.USER ? this.transform(e) : this.record(e, s));
                }), this.quill.keyboard.addBinding({
                    key: 'z',
                    shortKey: !0
                }, this.undo.bind(this)), this.quill.keyboard.addBinding({
                    key: 'z',
                    shortKey: !0,
                    shiftKey: !0
                }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
                    key: 'y',
                    shortKey: !0
                }, this.redo.bind(this));
            }

            change(t, e) {
                if (0 === this.stack[t].length) return;
                const s = this.stack[t].pop();
                this.stack[e].push(s), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(s[t], l.default.sources.USER), this.ignoreChange = !1;
                const i = c(this.quill.scroll, s[t]);
                this.quill.setSelection(i);
            }

            clear() {
                this.stack = {undo: [], redo: []};
            }

            cutoff() {
                this.lastRecorded = 0;
            }

            record(t, e) {
                if (0 === t.ops.length) return;
                this.stack.redo = [];
                let s = function (t) {
                    const e = new n.default;
                    let s = !1;
                    return t.forEach(t => {
                        if (t.insert) e.delete(r.Op.length(t)); else {
                            if (!t.retain || null != t.attributes) return s = !0, !1;
                            e.retain(t.retain);
                        }
                        return !0;
                    }), s ? null : e;
                }(t);
                null == s && (s = this.quill.getContents().diff(e));
                const i = Date.now();
                if (this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0) {
                    const e = this.stack.undo.pop();
                    s = s.compose(e.undo), t = e.redo.compose(t);
                } else this.lastRecorded = i;
                this.stack.undo.push({
                    redo: t,
                    undo: s
                }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
            }

            redo() {
                this.change('redo', 'undo');
            }

            transform(t) {
                this.stack.undo.forEach(e => {
                    e.undo = t.transform(e.undo, !0), e.redo = t.transform(e.redo, !0);
                }), this.stack.redo.forEach(e => {
                    e.undo = t.transform(e.undo, !0), e.redo = t.transform(e.redo, !0);
                });
            }

            undo() {
                this.change('undo', 'redo');
            }
        }

        function c(t, e) {
            const s = e.reduce((t, e) => t + (e.delete || 0), 0);
            let r = e.length() - s;
            return function (t, e) {
                const s = e.ops[e.ops.length - 1];
                return null != s && (null != s.insert ? 'string' == typeof s.insert && s.insert.endsWith('\n') : null != s.attributes && Object.keys(s.attributes).some(e => null != t.query(e, i.Scope.BLOCK)));
            }(t, e) && (r -= 1), r;
        }

        u.DEFAULTS = {delay: 1e3, maxStack: 100, userOnly: !1}, e.default = u, e.getLastChangeIndex = c;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.normalize = e.SHORTKEY = e.default = void 0;
        var i = function () {
                return function (t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return function (t, e) {
                        var s = [], i = !0, r = !1, n = void 0;
                        try {
                            for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                        } catch (t) {
                            r = !0, n = t;
                        } finally {
                            try {
                                !i && o.return && o.return();
                            } finally {
                                if (r) throw n;
                            }
                        }
                        return s;
                    }(t, e);
                    throw new TypeError('Invalid attempt to destructure non-iterable instance');
                };
            }(), r = f(s(17)), n = f(s(11)), l = f(s(2)), o = s(1), a = f(o), u = s(0), c = f(s(4)), h = f(s(10)),
            d = f(s(7));

        function f(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const p = (0, h.default)('quill:keyboard'), m = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

        class g extends d.default {
            static match(t, e) {
                return !['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(s => !!e[s] !== t[s] && null !== e[s]) && (e.key === t.key || e.key === t.which);
            }

            constructor(t, e) {
                super(t, e), this.bindings = {}, Object.keys(this.options.bindings).forEach(t => {
                    this.options.bindings[t] && this.addBinding(this.options.bindings[t]);
                }), this.addBinding({key: 'Enter', shiftKey: null}, x), this.addBinding({
                    key: 'Enter',
                    metaKey: null,
                    ctrlKey: null,
                    altKey: null
                }, () => {
                }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({key: 'Backspace'}, {collapsed: !0}, b), this.addBinding({key: 'Delete'}, {collapsed: !0}, y)) : (this.addBinding({key: 'Backspace'}, {
                    collapsed: !0,
                    prefix: /^.?$/
                }, b), this.addBinding({key: 'Delete'}, {
                    collapsed: !0,
                    suffix: /^.?$/
                }, y)), this.addBinding({key: 'Backspace'}, {collapsed: !1}, v), this.addBinding({key: 'Delete'}, {collapsed: !1}, v), this.addBinding({
                    key: 'Backspace',
                    altKey: null,
                    ctrlKey: null,
                    metaKey: null,
                    shiftKey: null
                }, {collapsed: !0, offset: 0}, b), this.listen();
            }

            addBinding(t, e = {}, s = {}) {
                const i = w(t);
                null != i ? ('function' == typeof e && (e = {handler: e}), 'function' == typeof s && (s = {handler: s}), (Array.isArray(i.key) ? i.key : [i.key]).forEach(t => {
                    const r = (0, l.default)({}, i, {key: t}, e, s);
                    this.bindings[r.key] = this.bindings[r.key] || [], this.bindings[r.key].push(r);
                })) : p.warn('Attempted to add invalid keyboard binding', i);
            }

            listen() {
                this.quill.root.addEventListener('keydown', t => {
                    if (t.defaultPrevented) return;
                    const e = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter(e => g.match(t, e));
                    if (0 === e.length) return;
                    const s = this.quill.getSelection();
                    if (null == s || !this.quill.hasFocus()) return;
                    var r = this.quill.getLine(s.index), l = i(r, 2);
                    const o = l[0], a = l[1];
                    var c = this.quill.getLeaf(s.index), h = i(c, 2);
                    const d = h[0], f = h[1];
                    var p = 0 === s.length ? [d, f] : this.quill.getLeaf(s.index + s.length), m = i(p, 2);
                    const b = m[0], y = m[1], v = d instanceof u.TextBlot ? d.value().slice(0, f) : '',
                        x = b instanceof u.TextBlot ? b.value().slice(y) : '', N = {
                            collapsed: 0 === s.length,
                            empty: 0 === s.length && o.length() <= 1,
                            format: this.quill.getFormat(s),
                            line: o,
                            offset: a,
                            prefix: v,
                            suffix: x,
                            event: t
                        };
                    e.some(t => {
                        if (null != t.collapsed && t.collapsed !== N.collapsed) return !1;
                        if (null != t.empty && t.empty !== N.empty) return !1;
                        if (null != t.offset && t.offset !== N.offset) return !1;
                        if (Array.isArray(t.format)) {
                            if (t.format.every(t => null == N.format[t])) return !1;
                        } else if ('object' == typeof t.format && !Object.keys(t.format).every(e => !0 === t.format[e] ? null != N.format[e] : !1 === t.format[e] ? null == N.format[e] : (0, n.default)(t.format[e], N.format[e]))) return !1;
                        return !(null != t.prefix && !t.prefix.test(N.prefix)) && (!(null != t.suffix && !t.suffix.test(N.suffix)) && !0 !== t.handler.call(this, s, N, t));
                    }) && t.preventDefault();
                });
            }
        }

        function b(t, e) {
            if (0 === t.index || this.quill.getLength() <= 1) return;
            var s = this.quill.getLine(t.index);
            const r = i(s, 1)[0];
            let n = {};
            if (0 === e.offset) {
                var l = this.quill.getLine(t.index - 1);
                const e = i(l, 1)[0];
                if (null != e && (e.length() > 1 || 'table' === e.statics.blotName)) {
                    const e = r.formats(), s = this.quill.getFormat(t.index - 1, 1);
                    n = o.AttributeMap.diff(e, s) || {};
                }
            }
            const a = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
            this.quill.deleteText(t.index - a, a, c.default.sources.USER), Object.keys(n).length > 0 && this.quill.formatLine(t.index - a, a, n, c.default.sources.USER), this.quill.focus();
        }

        function y(t, e) {
            const s = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
            if (t.index >= this.quill.getLength() - s) return;
            let r = {}, n = 0;
            var l = this.quill.getLine(t.index);
            const a = i(l, 1)[0];
            if (e.offset >= a.length() - 1) {
                var u = this.quill.getLine(t.index + 1);
                const e = i(u, 1)[0];
                if (e) {
                    const s = a.formats(), i = this.quill.getFormat(t.index, 1);
                    r = o.AttributeMap.diff(s, i) || {}, n = e.length();
                }
            }
            this.quill.deleteText(t.index, s, c.default.sources.USER), Object.keys(r).length > 0 && this.quill.formatLine(t.index + n - 1, s, r, c.default.sources.USER);
        }

        function v(t) {
            const e = this.quill.getLines(t);
            let s = {};
            if (e.length > 1) {
                const t = e[0].formats(), i = e[e.length - 1].formats();
                s = o.AttributeMap.diff(i, t) || {};
            }
            this.quill.deleteText(t, c.default.sources.USER), Object.keys(s).length > 0 && this.quill.formatLine(t.index, 1, s, c.default.sources.USER), this.quill.setSelection(t.index, c.default.sources.SILENT), this.quill.focus();
        }

        function x(t, e) {
            t.length > 0 && this.quill.scroll.deleteAt(t.index, t.length);
            const s = Object.keys(e.format).reduce((t, s) => (this.quill.scroll.query(s, u.Scope.BLOCK) && !Array.isArray(e.format[s]) && (t[s] = e.format[s]), t), {});
            this.quill.insertText(t.index, '\n', s, c.default.sources.USER), this.quill.setSelection(t.index + 1, c.default.sources.SILENT), this.quill.focus(), Object.keys(e.format).forEach(t => {
                null == s[t] && (Array.isArray(e.format[t]) || 'link' !== t && this.quill.format(t, e.format[t], c.default.sources.USER));
            });
        }

        function N(t) {
            return {
                key: 'Tab', shiftKey: !t, format: {'code-block': !0}, handler(e) {
                    const s = this.quill.scroll.query('code-block'),
                        i = 0 === e.length ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
                    let r = e.index, n = e.length;
                    i.forEach((e, i) => {
                        t ? (e.insertAt(0, s.TAB), 0 === i ? r += s.TAB.length : n += s.TAB.length) : e.domNode.textContent.startsWith(s.TAB) && (e.deleteAt(0, s.TAB.length), 0 === i ? r -= s.TAB.length : n -= s.TAB.length);
                    }), this.quill.update(c.default.sources.USER), this.quill.setSelection(r, n, c.default.sources.SILENT);
                }
            };
        }

        function E(t, e) {
            return {
                key: t, shiftKey: e, altKey: null, ['ArrowLeft' === t ? 'prefix' : 'suffix']: /^$/, handler(s) {
                    let r = s.index;
                    'ArrowRight' === t && (r += s.length + 1);
                    var n = this.quill.getLeaf(r);
                    return !(i(n, 1)[0] instanceof u.EmbedBlot) || ('ArrowLeft' === t ? e ? this.quill.setSelection(s.index - 1, s.length + 1, c.default.sources.USER) : this.quill.setSelection(s.index - 1, c.default.sources.USER) : e ? this.quill.setSelection(s.index, s.length + 1, c.default.sources.USER) : this.quill.setSelection(s.index + s.length + 1, c.default.sources.USER), !1);
                }
            };
        }

        function A(t) {
            return {
                key: t[0], shortKey: !0, handler(e, s) {
                    this.quill.format(t, !s.format[t], c.default.sources.USER);
                }
            };
        }

        function q(t) {
            return {
                key: t ? 'ArrowUp' : 'ArrowDown', collapsed: !0, format: ['table'], handler(e, s) {
                    const i = t ? 'prev' : 'next', r = s.line, n = r.parent[i];
                    if (null != n) {
                        if ('table-row' === n.statics.blotName) {
                            let t = n.children.head, e = r;
                            for (; null != e.prev;) e = e.prev, t = t.next;
                            const i = t.offset(this.quill.scroll) + Math.min(s.offset, t.length() - 1);
                            this.quill.setSelection(i, 0, c.default.sources.USER);
                        }
                    } else {
                        const e = r.table()[i];
                        null != e && (t ? this.quill.setSelection(e.offset(this.quill.scroll) + e.length() - 1, 0, c.default.sources.USER) : this.quill.setSelection(e.offset(this.quill.scroll), 0, c.default.sources.USER));
                    }
                    return !1;
                }
            };
        }

        function w(t) {
            if ('string' == typeof t || 'number' == typeof t) t = {key: t}; else {
                if ('object' != typeof t) return null;
                t = (0, r.default)(t, !1);
            }
            return t.shortKey && (t[m] = t.shortKey, delete t.shortKey), t;
        }

        g.DEFAULTS = {
            bindings: {
                bold: A('bold'),
                italic: A('italic'),
                underline: A('underline'),
                indent: {
                    key: 'Tab', format: ['blockquote', 'indent', 'list'], handler(t, e) {
                        return !(!e.collapsed || 0 === e.offset) || (this.quill.format('indent', '+1', c.default.sources.USER), !1);
                    }
                },
                outdent: {
                    key: 'Tab', shiftKey: !0, format: ['blockquote', 'indent', 'list'], handler(t, e) {
                        return !(!e.collapsed || 0 === e.offset) || (this.quill.format('indent', '-1', c.default.sources.USER), !1);
                    }
                },
                'outdent backspace': {
                    key: 'Backspace',
                    collapsed: !0,
                    shiftKey: null,
                    metaKey: null,
                    ctrlKey: null,
                    altKey: null,
                    format: ['indent', 'list'],
                    offset: 0,
                    handler(t, e) {
                        null != e.format.indent ? this.quill.format('indent', '-1', c.default.sources.USER) : null != e.format.list && this.quill.format('list', !1, c.default.sources.USER);
                    }
                },
                'indent code-block': N(!0),
                'outdent code-block': N(!1),
                'remove tab': {
                    key: 'Tab', shiftKey: !0, collapsed: !0, prefix: /\t$/, handler(t) {
                        this.quill.deleteText(t.index - 1, 1, c.default.sources.USER);
                    }
                },
                tab: {
                    key: 'Tab', handler(t, e) {
                        if (e.format.table) return !0;
                        this.quill.history.cutoff();
                        const s = (new a.default).retain(t.index).delete(t.length).insert('\t');
                        return this.quill.updateContents(s, c.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t.index + 1, c.default.sources.SILENT), !1;
                    }
                },
                'blockquote empty enter': {
                    key: 'Enter', collapsed: !0, format: ['blockquote'], empty: !0, handler() {
                        this.quill.format('blockquote', !1, c.default.sources.USER);
                    }
                },
                'list empty enter': {
                    key: 'Enter', collapsed: !0, format: ['list'], empty: !0, handler(t, e) {
                        const s = {list: !1};
                        e.format.indent && (s.indent = !1), this.quill.formatLine(t.index, t.length, s, c.default.sources.USER);
                    }
                },
                'checklist enter': {
                    key: 'Enter', collapsed: !0, format: {list: 'checked'}, handler(t) {
                        var e = this.quill.getLine(t.index), s = i(e, 2);
                        const r = s[0], n = s[1], o = (0, l.default)({}, r.formats(), {list: 'checked'}),
                            u = (new a.default).retain(t.index).insert('\n', o).retain(r.length() - n - 1).retain(1, {list: 'unchecked'});
                        this.quill.updateContents(u, c.default.sources.USER), this.quill.setSelection(t.index + 1, c.default.sources.SILENT), this.quill.scrollIntoView();
                    }
                },
                'header enter': {
                    key: 'Enter', collapsed: !0, format: ['header'], suffix: /^$/, handler(t, e) {
                        var s = this.quill.getLine(t.index), r = i(s, 2);
                        const n = r[0], l = r[1],
                            o = (new a.default).retain(t.index).insert('\n', e.format).retain(n.length() - l - 1).retain(1, {header: null});
                        this.quill.updateContents(o, c.default.sources.USER), this.quill.setSelection(t.index + 1, c.default.sources.SILENT), this.quill.scrollIntoView();
                    }
                },
                'table backspace': {
                    key: 'Backspace', format: ['table'], collapsed: !0, offset: 0, handler() {
                    }
                },
                'table delete': {
                    key: 'Delete', format: ['table'], collapsed: !0, suffix: /^$/, handler() {
                    }
                },
                'table enter': {
                    key: 'Enter', shiftKey: null, format: ['table'], handler(t) {
                        const e = this.quill.getModule('table');
                        if (e) {
                            var s = e.getTable(t), r = i(s, 4);
                            const n = r[0], l = function (t, e, s, i) {
                                if (null == e.prev && null == e.next) return null == s.prev && null == s.next ? 0 === i ? -1 : 1 : null == s.prev ? -1 : 1;
                                if (null == e.prev) return -1;
                                if (null == e.next) return 1;
                                return null;
                            }(0, r[1], r[2], r[3]);
                            if (null == l) return;
                            let o = n.offset();
                            if (l < 0) {
                                const e = (new a.default).retain(o).insert('\n');
                                this.quill.updateContents(e, c.default.sources.USER), this.quill.setSelection(t.index + 1, t.length, c.default.sources.SILENT);
                            } else if (l > 0) {
                                o += n.length();
                                const t = (new a.default).retain(o).insert('\n');
                                this.quill.updateContents(t, c.default.sources.USER), this.quill.setSelection(o, c.default.sources.USER);
                            }
                        }
                    }
                },
                'table tab': {
                    key: 'Tab', shiftKey: null, format: ['table'], handler(t, e) {
                        const s = e.event, i = e.line, r = i.offset(this.quill.scroll);
                        s.shiftKey ? this.quill.setSelection(r - 1, c.default.sources.USER) : this.quill.setSelection(r + i.length(), c.default.sources.USER);
                    }
                },
                'list autofill': {
                    key: ' ',
                    shiftKey: null,
                    collapsed: !0,
                    format: {list: !1, 'code-block': !1, blockquote: !1, header: !1, table: !1},
                    prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                    handler(t, e) {
                        if (null == this.quill.scroll.query('list')) return !0;
                        const s = e.prefix.length;
                        var r = this.quill.getLine(t.index), n = i(r, 2);
                        const l = n[0], o = n[1];
                        if (o > s) return !0;
                        let u;
                        switch (e.prefix.trim()) {
                            case'[]':
                            case'[ ]':
                                u = 'unchecked';
                                break;
                            case'[x]':
                                u = 'checked';
                                break;
                            case'-':
                            case'*':
                                u = 'bullet';
                                break;
                            default:
                                u = 'ordered';
                        }
                        this.quill.insertText(t.index, ' ', c.default.sources.USER), this.quill.history.cutoff();
                        const h = (new a.default).retain(t.index - o).delete(s + 1).retain(l.length() - 2 - o).retain(1, {list: u});
                        return this.quill.updateContents(h, c.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t.index - s, c.default.sources.SILENT), !1;
                    }
                },
                'code exit': {
                    key: 'Enter',
                    collapsed: !0,
                    format: ['code-block'],
                    prefix: /^$/,
                    suffix: /^\s*$/,
                    handler(t) {
                        var e = this.quill.getLine(t.index), s = i(e, 2);
                        const r = s[0], n = s[1];
                        let l = 2, o = r;
                        for (; null != o && o.length() <= 1 && o.formats()["code-block"];) if (o = o.prev, (l -= 1) <= 0) {
                            const e = (new a.default).retain(t.index + r.length() - n - 2).retain(1, {'code-block': null}).delete(1);
                            return this.quill.updateContents(e, c.default.sources.USER), this.quill.setSelection(t.index - 1, c.default.sources.SILENT), !1;
                        }
                        return !0;
                    }
                },
                'embed left': E('ArrowLeft', !1),
                'embed left shift': E('ArrowLeft', !0),
                'embed right': E('ArrowRight', !1),
                'embed right shift': E('ArrowRight', !0),
                'table down': q(!1),
                'table up': q(!0)
            }
        }, e.default = g, e.SHORTKEY = m, e.normalize = w;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = l(s(1)), r = l(s(8)), n = l(s(7));

        function l(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class o extends n.default {
            constructor(t, e) {
                super(t, e), t.root.addEventListener('drop', e => {
                    let s;
                    if (e.preventDefault(), document.caretRangeFromPoint) s = document.caretRangeFromPoint(e.clientX, e.clientY); else {
                        if (!document.caretPositionFromPoint) return;
                        {
                            const t = document.caretPositionFromPoint(e.clientX, e.clientY);
                            (s = document.createRange()).setStart(t.offsetNode, t.offset), s.setEnd(t.offsetNode, t.offset);
                        }
                    }
                    const i = t.selection.normalizeNative(s), r = t.selection.normalizedToRange(i);
                    this.upload(r, e.dataTransfer.files);
                });
            }

            upload(t, e) {
                const s = [];
                Array.from(e).forEach(t => {
                    t && this.options.mimetypes.includes(t.type) && s.push(t);
                }), s.length > 0 && this.options.handler.call(this, t, s);
            }
        }

        o.DEFAULTS = {
            mimetypes: ['image/png', 'image/jpeg'], handler(t, e) {
                const s = e.map(t => new Promise(e => {
                    const s = new FileReader;
                    s.onload = (t => {
                        e(t.target.result);
                    }), s.readAsDataURL(t);
                }));
                Promise.all(s).then(e => {
                    const s = e.reduce((t, e) => t.insert({image: e}), (new i.default).retain(t.index).delete(t.length));
                    this.quill.updateContents(s, r.default.sources.USER), this.quill.setSelection(t.index + e.length, r.default.sources.SILENT);
                });
            }
        }, e.default = o;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0);
        const r = new class extends i.ClassAttributor {
            add(t, e) {
                if ('+1' === e || '-1' === e) {
                    const s = this.value(t) || 0;
                    e = '+1' === e ? s + 1 : s - 1;
                }
                return 0 === e ? (this.remove(t), !0) : super.add(t, e);
            }

            canAdd(t, e) {
                return super.canAdd(t, e) || super.canAdd(t, parseInt(e, 10));
            }

            value(t) {
                return parseInt(super.value(t), 10) || void 0;
            }
        }('indent', 'ql-indent', {scope: i.Scope.BLOCK, whitelist: [1, 2, 3, 4, 5, 6, 7, 8]});
        e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(3));

        class r extends i.default {
        }

        r.blotName = 'blockquote', r.tagName = 'blockquote', e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(3));

        class r extends i.default {
            static formats(t) {
                return this.tagName.indexOf(t.tagName) + 1;
            }
        }

        r.blotName = 'header', r.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'], e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.ListContainer = void 0;
        var i = l(s(3)), r = l(s(12)), n = l(s(4));

        function l(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class o extends r.default {
        }

        o.blotName = 'list-container', o.tagName = 'OL';

        class a extends i.default {
            static create(t) {
                const e = super.create();
                return e.setAttribute('data-list', t), e;
            }

            static formats(t) {
                return t.getAttribute('data-list') || void 0;
            }

            static register() {
                n.default.register(o);
            }

            constructor(t, e) {
                super(t, e);
                const s = e.ownerDocument.createElement('span'), i = s => {
                    if (!t.isEnabled()) return;
                    const i = this.statics.formats(e, t);
                    'checked' === i ? (this.format('list', 'unchecked'), s.preventDefault()) : 'unchecked' === i && (this.format('list', 'checked'), s.preventDefault());
                };
                s.addEventListener('mousedown', i), s.addEventListener('touchstart', i), this.attachUI(s);
            }

            format(t, e) {
                t === this.statics.blotName && e ? this.domNode.setAttribute('data-list', e) : super.format(t, e);
            }
        }

        a.blotName = 'list', a.tagName = 'LI', o.allowedChildren = [a], a.requiredContainer = o, e.ListContainer = o, e.default = a;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(31));

        class r extends i.default {
        }

        r.blotName = 'italic', r.tagName = ['EM', 'I'], e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(5));

        class r extends i.default {
            static create(t) {
                return 'super' === t ? document.createElement('sup') : 'sub' === t ? document.createElement('sub') : super.create(t);
            }

            static formats(t) {
                return 'SUB' === t.tagName ? 'sub' : 'SUP' === t.tagName ? 'super' : void 0;
            }
        }

        r.blotName = 'script', r.tagName = ['SUB', 'SUP'], e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(5));

        class r extends i.default {
        }

        r.blotName = 'strike', r.tagName = 'S', e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(5));

        class r extends i.default {
        }

        r.blotName = 'underline', r.tagName = 'U', e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(24));

        class r extends i.default {
            static create(t) {
                if (null == window.katex) throw new Error('Formula module requires KaTeX.');
                const e = super.create(t);
                return 'string' == typeof t && (window.katex.render(t, e, {
                    throwOnError: !1,
                    errorColor: '#f00'
                }), e.setAttribute('data-value', t)), e;
            }

            static value(t) {
                return t.getAttribute('data-value');
            }

            html() {
                return `<span>${this.value().formula}</span>`;
            }
        }

        r.blotName = 'formula', r.className = 'ql-formula', r.tagName = 'SPAN', e.default = r;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(0), r = s(15);
        const n = ['alt', 'height', 'width'];

        class l extends i.EmbedBlot {
            static create(t) {
                const e = super.create(t);
                return 'string' == typeof t && e.setAttribute('src', this.sanitize(t)), e;
            }

            static formats(t) {
                return n.reduce((e, s) => (t.hasAttribute(s) && (e[s] = t.getAttribute(s)), e), {});
            }

            static match(t) {
                return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
            }

            static register() {
                /Firefox/i.test(navigator.userAgent) && setTimeout(() => {
                    document.execCommand('enableObjectResizing', !1, !1);
                }, 1);
            }

            static sanitize(t) {
                return (0, r.sanitize)(t, ['http', 'https', 'data']) ? t : '//:0';
            }

            static value(t) {
                return t.getAttribute('src');
            }

            format(t, e) {
                n.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
            }
        }

        l.blotName = 'image', l.tagName = 'IMG', e.default = l;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = s(3), r = function (t) {
            return t && t.__esModule ? t : {default: t};
        }(s(15));
        const n = ['height', 'width'];

        class l extends i.BlockEmbed {
            static create(t) {
                const e = super.create(t);
                return e.setAttribute('frameborder', '0'), e.setAttribute('allowfullscreen', !0), e.setAttribute('src', this.sanitize(t)), e;
            }

            static formats(t) {
                return n.reduce((e, s) => (t.hasAttribute(s) && (e[s] = t.getAttribute(s)), e), {});
            }

            static sanitize(t) {
                return r.default.sanitize(t);
            }

            static value(t) {
                return t.getAttribute('src');
            }

            format(t, e) {
                n.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
            }

            html() {
                const t = this.value().video;
                return `<a href="${t}">${t}</a>`;
            }
        }

        l.blotName = 'video', l.className = 'ql-video', l.tagName = 'IFRAME', e.default = l;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.CodeToken = e.CodeBlock = void 0;
        var i = g(s(1)), r = s(0), n = g(s(5)), l = g(s(4)), o = g(s(7)), a = s(3), u = g(s(9)), c = g(s(14)), h = s(6),
            d = g(h), f = s(19), p = g(f), m = s(25);

        function g(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const b = new r.ClassAttributor('code-token', 'hljs', {scope: r.Scope.INLINE});

        class y extends n.default {
            static formats(t, e) {
                for (; null != t && t !== e.domNode;) {
                    if (t.classList.contains(p.default.className)) return super.formats(t, e);
                    t = t.parentNode;
                }
            }

            constructor(t, e, s) {
                super(t, e, s), b.add(this.domNode, s);
            }

            format(t, e) {
                t !== y.blotName ? super.format(t, e) : e ? b.add(this.domNode, e) : (b.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
            }

            optimize(...t) {
                super.optimize(...t), b.value(this.domNode) || this.unwrap();
            }
        }

        y.blotName = 'code-token', y.className = 'ql-token';

        class v extends p.default {
            static create(t) {
                const e = super.create(t);
                return 'string' == typeof t && e.setAttribute('data-language', t), e;
            }

            static formats(t) {
                return t.getAttribute('data-language') || 'plain';
            }

            static register() {
            }

            format(t, e) {
                t === this.statics.blotName && e ? this.domNode.setAttribute('data-language', e) : super.format(t, e);
            }

            replaceWith(t, e) {
                return this.formatAt(0, this.length(), y.blotName, !1), super.replaceWith(t, e);
            }
        }

        class x extends f.CodeBlockContainer {
            attach() {
                super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
            }

            format(t, e) {
                t === v.blotName && (this.forceNext = !0, this.children.forEach(s => {
                    s.format(t, e);
                }));
            }

            formatAt(t, e, s, i) {
                s === v.blotName && (this.forceNext = !0), super.formatAt(t, e, s, i);
            }

            highlight(t, e = !1) {
                if (null == this.children.head) return;
                const s = `${Array.from(this.domNode.childNodes).filter(t => t !== this.uiNode).map(t => t.textContent).join('\n')}\n`,
                    r = v.formats(this.children.head.domNode);
                if (e || this.forceNext || this.cachedText !== s) {
                    if (s.trim().length > 0 || null == this.cachedText) {
                        const e = this.children.reduce((t, e) => t.concat((0, a.blockDelta)(e)), new i.default),
                            n = t(s, r);
                        e.diff(n).reduce((t, {retain: e, attributes: s}) => e ? (s && Object.keys(s).forEach(i => {
                            [v.blotName, y.blotName].includes(i) && this.formatAt(t, e, i, s[i]);
                        }), t + e) : t, 0);
                    }
                    this.cachedText = s, this.forceNext = !1;
                }
            }

            optimize(t) {
                if (super.optimize(t), null != this.parent && null != this.children.head && null != this.uiNode) {
                    const t = v.formats(this.children.head.domNode);
                    t !== this.uiNode.value && (this.uiNode.value = t);
                }
            }
        }

        x.allowedChildren = [v], v.requiredContainer = x, v.allowedChildren = [y, c.default, d.default, u.default];

        class N extends o.default {
            static register() {
                l.default.register(y, !0), l.default.register(v, !0), l.default.register(x, !0);
            }

            constructor(t, e) {
                if (super(t, e), null == this.options.hljs) throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
                this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
            }

            initListener() {
                this.quill.on(l.default.events.SCROLL_BLOT_MOUNT, t => {
                    if (!(t instanceof x)) return;
                    const e = this.quill.root.ownerDocument.createElement('select');
                    this.options.languages.forEach(({key: t, label: s}) => {
                        const i = e.ownerDocument.createElement('option');
                        i.textContent = s, i.setAttribute('value', t), e.appendChild(i);
                    }), e.addEventListener('change', () => {
                        t.format(v.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
                    }), null == t.uiNode && (t.attachUI(e), t.children.head && (e.value = v.formats(t.children.head.domNode)));
                });
            }

            initTimer() {
                let t = null;
                this.quill.on(l.default.events.SCROLL_OPTIMIZE, () => {
                    clearTimeout(t), t = setTimeout(() => {
                        this.highlight(), t = null;
                    }, this.options.interval);
                });
            }

            highlight(t = null, e = !1) {
                if (this.quill.selection.composing) return;
                this.quill.update(l.default.sources.USER);
                const s = this.quill.getSelection();
                (null == t ? this.quill.scroll.descendants(x) : [t]).forEach(t => {
                    t.highlight(this.highlightBlot, e);
                }), this.quill.update(l.default.sources.SILENT), null != s && this.quill.setSelection(s, l.default.sources.SILENT);
            }

            highlightBlot(t, e = 'plain') {
                if ('plain' === e) return (0, h.escapeText)(t).split('\n').reduce((t, s, i) => (0 !== i && t.insert('\n', {[p.default.blotName]: e}), t.insert(s)), new i.default);
                const s = this.quill.root.ownerDocument.createElement('div');
                return s.classList.add(p.default.className), s.innerHTML = this.options.hljs.highlight(e, t).value, (0, m.traverse)(this.quill.scroll, s, [(t, e) => {
                    const s = b.value(t);
                    return s ? e.compose((new i.default).retain(e.length(), {[y.blotName]: s})) : e;
                }], [(t, s) => t.data.split('\n').reduce((t, s, i) => (0 !== i && t.insert('\n', {[p.default.blotName]: e}), t.insert(s)), s)], new WeakMap);
            }
        }

        N.DEFAULTS = {
            hljs: window.hljs,
            interval: 1e3,
            languages: [{key: 'plain', label: 'Plain'}, {key: 'bash', label: 'Bash'}, {
                key: 'cpp',
                label: 'C++'
            }, {key: 'cs', label: 'C#'}, {key: 'css', label: 'CSS'}, {key: 'diff', label: 'Diff'}, {
                key: 'xml',
                label: 'HTML/XML'
            }, {key: 'java', label: 'Java'}, {key: 'javascript', label: 'Javascript'}, {
                key: 'markdown',
                label: 'Markdown'
            }, {key: 'php', label: 'PHP'}, {key: 'python', label: 'Python'}, {key: 'ruby', label: 'Ruby'}, {
                key: 'sql',
                label: 'SQL'
            }]
        }, e.CodeBlock = v, e.CodeToken = y, e.default = N;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = a(s(1)), n = a(s(4)), l = a(s(7)), o = s(62);

        function a(t) {
            return t && t.__esModule ? t : {default: t};
        }

        e.default = class extends l.default {
            static register() {
                n.default.register(o.TableCell), n.default.register(o.TableRow), n.default.register(o.TableBody), n.default.register(o.TableContainer);
            }

            constructor(...t) {
                super(...t), this.listenBalanceCells();
            }

            balanceTables() {
                this.quill.scroll.descendants(o.TableContainer).forEach(t => {
                    t.balanceCells();
                });
            }

            deleteColumn() {
                var t = this.getTable(), e = i(t, 3);
                const s = e[0], r = e[2];
                null != r && (s.deleteColumn(r.cellOffset()), this.quill.update(n.default.sources.USER));
            }

            deleteRow() {
                var t = this.getTable();
                const e = i(t, 2)[1];
                null != e && (e.remove(), this.quill.update(n.default.sources.USER));
            }

            deleteTable() {
                var t = this.getTable();
                const e = i(t, 1)[0];
                if (null == e) return;
                const s = e.offset();
                e.remove(), this.quill.update(n.default.sources.USER), this.quill.setSelection(s, n.default.sources.SILENT);
            }

            getTable(t = this.quill.getSelection()) {
                if (null == t) return [null, null, null, -1];
                var e = this.quill.getLine(t.index), s = i(e, 2);
                const r = s[0], n = s[1];
                if (null == r || r.statics.blotName !== o.TableCell.blotName) return [null, null, null, -1];
                const l = r.parent;
                return [l.parent.parent, l, r, n];
            }

            insertColumn(t) {
                const e = this.quill.getSelection();
                var s = this.getTable(e), r = i(s, 3);
                const l = r[0], o = r[1], a = r[2];
                if (null == a) return;
                const u = a.cellOffset();
                l.insertColumn(u + t), this.quill.update(n.default.sources.USER);
                let c = o.rowOffset();
                0 === t && (c += 1), this.quill.setSelection(e.index + c, e.length, n.default.sources.SILENT);
            }

            insertColumnLeft() {
                this.insertColumn(0);
            }

            insertColumnRight() {
                this.insertColumn(1);
            }

            insertRow(t) {
                const e = this.quill.getSelection();
                var s = this.getTable(e), r = i(s, 3);
                const l = r[0], o = r[1];
                if (null == r[2]) return;
                const a = o.rowOffset();
                l.insertRow(a + t), this.quill.update(n.default.sources.USER), t > 0 ? this.quill.setSelection(e, n.default.sources.SILENT) : this.quill.setSelection(e.index + o.children.length, e.length, n.default.sources.SILENT);
            }

            insertRowAbove() {
                this.insertRow(0);
            }

            insertRowBelow() {
                this.insertRow(1);
            }

            insertTable(t, e) {
                const s = this.quill.getSelection();
                if (null == s) return;
                const i = new Array(t).fill(0).reduce(t => {
                    const s = new Array(e).fill('\n').join('');
                    return t.insert(s, {table: (0, o.tableId)()});
                }, (new r.default).retain(s.index));
                this.quill.updateContents(i, n.default.sources.USER), this.quill.setSelection(s.index, n.default.sources.SILENT), this.balanceTables();
            }

            listenBalanceCells() {
                this.quill.on(n.default.events.SCROLL_OPTIMIZE, t => {
                    t.some(t => !!['TD', 'TR', 'TBODY', 'TABLE'].includes(t.target.tagName) && (this.quill.once(n.default.events.TEXT_CHANGE, (t, e, s) => {
                        s === n.default.sources.USER && this.balanceTables();
                    }), !0));
                });
            }
        };
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.tableId = e.TableContainer = e.TableBody = e.TableRow = e.TableCell = void 0;
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = l(s(3)), n = l(s(12));

        function l(t) {
            return t && t.__esModule ? t : {default: t};
        }

        class o extends r.default {
            static create(t) {
                const e = super.create();
                return t ? e.setAttribute('data-row', t) : e.setAttribute('data-row', h()), e;
            }

            static formats(t) {
                if (t.hasAttribute('data-row')) return t.getAttribute('data-row');
            }

            cellOffset() {
                return this.parent ? this.parent.children.indexOf(this) : -1;
            }

            format(t, e) {
                t === o.blotName && e ? this.domNode.setAttribute('data-row', e) : super.format(t, e);
            }

            row() {
                return this.parent;
            }

            rowOffset() {
                return this.row() ? this.row().rowOffset() : -1;
            }

            table() {
                return this.row() && this.row().table();
            }
        }

        o.blotName = 'table', o.tagName = 'TD';

        class a extends n.default {
            checkMerge() {
                if (super.checkMerge() && null != this.next.children.head) {
                    const t = this.children.head.formats(), e = this.children.tail.formats(),
                        s = this.next.children.head.formats(), i = this.next.children.tail.formats();
                    return t.table === e.table && t.table === s.table && t.table === i.table;
                }
                return !1;
            }

            optimize(...t) {
                super.optimize(...t), this.children.forEach(t => {
                    if (null == t.next) return;
                    const e = t.formats(), s = t.next.formats();
                    if (e.table !== s.table) {
                        const e = this.splitAfter(t);
                        e && e.optimize(), this.prev && this.prev.optimize();
                    }
                });
            }

            rowOffset() {
                return this.parent ? this.parent.children.indexOf(this) : -1;
            }

            table() {
                return this.parent && this.parent.parent;
            }
        }

        a.blotName = 'table-row', a.tagName = 'TR';

        class u extends n.default {
        }

        u.blotName = 'table-body', u.tagName = 'TBODY';

        class c extends n.default {
            balanceCells() {
                const t = this.descendants(a), e = t.reduce((t, e) => Math.max(e.children.length, t), 0);
                t.forEach(t => {
                    new Array(e - t.children.length).fill(0).forEach(() => {
                        let e;
                        null != t.children.head && (e = o.formats(t.children.head.domNode));
                        const s = this.scroll.create(o.blotName, e);
                        t.appendChild(s), s.optimize();
                    });
                });
            }

            cells(t) {
                return this.rows().map(e => e.children.at(t));
            }

            deleteColumn(t) {
                var e = this.descendant(u);
                const s = i(e, 1)[0];
                null != s && null != s.children.head && s.children.forEach(e => {
                    const s = e.children.at(t);
                    null != s && s.remove();
                });
            }

            insertColumn(t) {
                var e = this.descendant(u);
                const s = i(e, 1)[0];
                null != s && null != s.children.head && s.children.forEach(e => {
                    const s = e.children.at(t), i = o.formats(e.children.head.domNode),
                        r = this.scroll.create(o.blotName, i);
                    e.insertBefore(r, s);
                });
            }

            insertRow(t) {
                var e = this.descendant(u);
                const s = i(e, 1)[0];
                if (null == s || null == s.children.head) return;
                const r = h(), n = this.scroll.create(a.blotName);
                s.children.head.children.forEach(() => {
                    const t = this.scroll.create(o.blotName, r);
                    n.appendChild(t);
                });
                const l = s.children.at(t);
                s.insertBefore(n, l);
            }

            rows() {
                const t = this.children.head;
                return null == t ? [] : t.children.map(t => t);
            }
        }

        function h() {
            return `row-${Math.random().toString(36).slice(2, 6)}`;
        }

        c.blotName = 'table-container', c.tagName = 'TABLE', c.allowedChildren = [u], u.requiredContainer = c, u.allowedChildren = [a], a.requiredContainer = u, a.allowedChildren = [o], o.requiredContainer = a, e.TableCell = o, e.TableRow = a, e.TableBody = u, e.TableContainer = c, e.tableId = h;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.addControls = e.default = void 0;
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = u(s(1)), n = s(0), l = u(s(4)), o = u(s(10)), a = u(s(7));

        function u(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const c = (0, o.default)('quill:toolbar');

        class h extends a.default {
            constructor(t, e) {
                if (super(t, e), Array.isArray(this.options.container)) {
                    const e = document.createElement('div');
                    f(e, this.options.container), t.container.parentNode.insertBefore(e, t.container), this.container = e;
                } else 'string' == typeof this.options.container ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
                if (!(this.container instanceof HTMLElement)) return c.error('Container required for toolbar', this.options);
                this.container.classList.add('ql-toolbar'), this.controls = [], this.handlers = {}, Object.keys(this.options.handlers).forEach(t => {
                    this.addHandler(t, this.options.handlers[t]);
                }), Array.from(this.container.querySelectorAll('button, select')).forEach(t => {
                    this.attach(t);
                }), this.quill.on(l.default.events.EDITOR_CHANGE, (t, e) => {
                    t === l.default.events.SELECTION_CHANGE && this.update(e);
                }), this.quill.on(l.default.events.SCROLL_OPTIMIZE, () => {
                    var t = this.quill.selection.getRange();
                    const e = i(t, 1)[0];
                    this.update(e);
                });
            }

            addHandler(t, e) {
                this.handlers[t] = e;
            }

            attach(t) {
                let e = Array.from(t.classList).find(t => 0 === t.indexOf('ql-'));
                if (!e) return;
                if (e = e.slice('ql-'.length), 'BUTTON' === t.tagName && t.setAttribute('type', 'button'), null == this.handlers[e] && null == this.quill.scroll.query(e)) return void c.warn('ignoring attaching to nonexistent format', e, t);
                const s = 'SELECT' === t.tagName ? 'change' : 'click';
                t.addEventListener(s, s => {
                    let o;
                    if ('SELECT' === t.tagName) {
                        if (t.selectedIndex < 0) return;
                        const e = t.options[t.selectedIndex];
                        o = !e.hasAttribute('selected') && (e.value || !1);
                    } else o = !t.classList.contains('ql-active') && (t.value || !t.hasAttribute('value')), s.preventDefault();
                    this.quill.focus();
                    var a = this.quill.selection.getRange();
                    const u = i(a, 1)[0];
                    if (null != this.handlers[e]) this.handlers[e].call(this, o); else if (this.quill.scroll.query(e).prototype instanceof n.EmbedBlot) {
                        if (!(o = prompt(`Enter ${e}`))) return;
                        this.quill.updateContents((new r.default).retain(u.index).delete(u.length).insert({[e]: o}), l.default.sources.USER);
                    } else this.quill.format(e, o, l.default.sources.USER);
                    this.update(u);
                }), this.controls.push([e, t]);
            }

            update(t) {
                const e = null == t ? {} : this.quill.getFormat(t);
                this.controls.forEach(s => {
                    var r = i(s, 2);
                    const n = r[0], l = r[1];
                    if ('SELECT' === l.tagName) {
                        let s;
                        if (null == t) s = null; else if (null == e[n]) s = l.querySelector('option[selected]'); else if (!Array.isArray(e[n])) {
                            let t = e[n];
                            'string' == typeof t && (t = t.replace(/"/g, '\\"')), s = l.querySelector(`option[value="${t}"]`);
                        }
                        null == s ? (l.value = '', l.selectedIndex = -1) : s.selected = !0;
                    } else if (null == t) l.classList.remove('ql-active'); else if (l.hasAttribute('value')) {
                        const t = e[n] === l.getAttribute('value') || null != e[n] && e[n].toString() === l.getAttribute('value') || null == e[n] && !l.getAttribute('value');
                        l.classList.toggle('ql-active', t);
                    } else l.classList.toggle('ql-active', null != e[n]);
                });
            }
        }

        function d(t, e, s) {
            const i = document.createElement('button');
            i.setAttribute('type', 'button'), i.classList.add(`ql-${e}`), null != s && (i.value = s), t.appendChild(i);
        }

        function f(t, e) {
            Array.isArray(e[0]) || (e = [e]), e.forEach(e => {
                const s = document.createElement('span');
                s.classList.add('ql-formats'), e.forEach(t => {
                    if ('string' == typeof t) d(s, t); else {
                        const e = Object.keys(t)[0], i = t[e];
                        Array.isArray(i) ? function (t, e, s) {
                            const i = document.createElement('select');
                            i.classList.add(`ql-${e}`), s.forEach(t => {
                                const e = document.createElement('option');
                                !1 !== t ? e.setAttribute('value', t) : e.setAttribute('selected', 'selected'), i.appendChild(e);
                            }), t.appendChild(i);
                        }(s, e, i) : d(s, e, i);
                    }
                }), t.appendChild(s);
            });
        }

        h.DEFAULTS = {}, h.DEFAULTS = {
            container: null, handlers: {
                clean() {
                    const t = this.quill.getSelection();
                    if (null != t) if (0 === t.length) {
                        const t = this.quill.getFormat();
                        Object.keys(t).forEach(t => {
                            null != this.quill.scroll.query(t, n.Scope.INLINE) && this.quill.format(t, !1, l.default.sources.USER);
                        });
                    } else this.quill.removeFormat(t, l.default.sources.USER);
                }, direction(t) {
                    const e = this.quill.getFormat().align;
                    'rtl' === t && null == e ? this.quill.format('align', 'right', l.default.sources.USER) : t || 'right' !== e || this.quill.format('align', !1, l.default.sources.USER), this.quill.format('direction', t, l.default.sources.USER);
                }, indent(t) {
                    const e = this.quill.getSelection(), s = this.quill.getFormat(e), i = parseInt(s.indent || 0, 10);
                    if ('+1' === t || '-1' === t) {
                        let e = '+1' === t ? 1 : -1;
                        'rtl' === s.direction && (e *= -1), this.quill.format('indent', i + e, l.default.sources.USER);
                    }
                }, link(t) {
                    !0 === t && (t = prompt('Enter link URL:')), this.quill.format('link', t, l.default.sources.USER);
                }, list(t) {
                    const e = this.quill.getSelection(), s = this.quill.getFormat(e);
                    'check' === t ? 'checked' === s.list || 'unchecked' === s.list ? this.quill.format('list', !1, l.default.sources.USER) : this.quill.format('list', 'unchecked', l.default.sources.USER) : this.quill.format('list', t, l.default.sources.USER);
                }
            }
        }, e.default = h, e.addControls = f;
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
    }, function (t, e) {
        t.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=2 width=3 x=5 y=5></rect> <rect class=ql-fill height=2 width=4 x=9 y=5></rect> <g class="ql-fill ql-transparent"> <rect height=2 width=3 x=5 y=8></rect> <rect height=2 width=4 x=9 y=8></rect> <rect height=2 width=3 x=5 y=11></rect> <rect height=2 width=4 x=9 y=11></rect> </g> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
    }, function (t, e) {
        t.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0}), e.default = e.BubbleTooltip = void 0;
        var i = u(s(2)), r = u(s(8)), n = s(35), l = u(n), o = s(13), a = u(s(20));

        function u(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const c = [['bold', 'italic', 'link'], [{header: 1}, {header: 2}, 'blockquote']];

        class h extends n.BaseTooltip {
            constructor(t, e) {
                super(t, e), this.quill.on(r.default.events.EDITOR_CHANGE, (t, e, s, i) => {
                    if (t === r.default.events.SELECTION_CHANGE) if (null != e && e.length > 0 && i === r.default.sources.USER) {
                        this.show(), this.root.style.left = '0px', this.root.style.width = '', this.root.style.width = `${this.root.offsetWidth}px`;
                        const t = this.quill.getLines(e.index, e.length);
                        if (1 === t.length) this.position(this.quill.getBounds(e)); else {
                            const s = t[t.length - 1], i = this.quill.getIndex(s),
                                r = Math.min(s.length() - 1, e.index + e.length - i),
                                n = this.quill.getBounds(new o.Range(i, r));
                            this.position(n);
                        }
                    } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
                });
            }

            listen() {
                super.listen(), this.root.querySelector('.ql-close').addEventListener('click', () => {
                    this.root.classList.remove('ql-editing');
                }), this.quill.on(r.default.events.SCROLL_OPTIMIZE, () => {
                    setTimeout(() => {
                        if (this.root.classList.contains('ql-hidden')) return;
                        const t = this.quill.getSelection();
                        null != t && this.position(this.quill.getBounds(t));
                    }, 1);
                });
            }

            cancel() {
                this.show();
            }

            position(t) {
                const e = super.position(t), s = this.root.querySelector('.ql-tooltip-arrow');
                return s.style.marginLeft = '', 0 !== e && (s.style.marginLeft = `${-1 * e - s.offsetWidth / 2}px`), e;
            }
        }

        h.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');

        class d extends l.default {
            constructor(t, e) {
                null != e.modules.toolbar && null == e.modules.toolbar.container && (e.modules.toolbar.container = c), super(t, e), this.quill.container.classList.add('ql-bubble');
            }

            extendToolbar(t) {
                this.tooltip = new h(this.quill, this.options.bounds), this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll('button'), a.default), this.buildPickers(t.container.querySelectorAll('select'), a.default);
            }
        }

        d.DEFAULTS = (0, i.default)(!0, {}, l.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        link(t) {
                            t ? this.quill.theme.tooltip.edit() : this.quill.format('link', !1);
                        }
                    }
                }
            }
        }), e.BubbleTooltip = h, e.default = d;
    }, function (t, e, s) {
        'use strict';
        Object.defineProperty(e, '__esModule', {value: !0});
        var i = function () {
            return function (t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function (t, e) {
                    var s = [], i = !0, r = !1, n = void 0;
                    try {
                        for (var l, o = t[Symbol.iterator](); !(i = (l = o.next()).done) && (s.push(l.value), !e || s.length !== e); i = !0) ;
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !i && o.return && o.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                    return s;
                }(t, e);
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            };
        }(), r = h(s(2)), n = h(s(8)), l = s(35), o = h(l), a = h(s(15)), u = s(13), c = h(s(20));

        function h(t) {
            return t && t.__esModule ? t : {default: t};
        }

        const d = [[{header: ['1', '2', '3', !1]}], ['bold', 'italic', 'underline', 'link'], [{list: 'ordered'}, {list: 'bullet'}], ['clean']];

        class f extends l.BaseTooltip {
            constructor(t, e) {
                super(t, e), this.preview = this.root.querySelector('a.ql-preview');
            }

            listen() {
                super.listen(), this.root.querySelector('a.ql-action').addEventListener('click', t => {
                    this.root.classList.contains('ql-editing') ? this.save() : this.edit('link', this.preview.textContent), t.preventDefault();
                }), this.root.querySelector('a.ql-remove').addEventListener('click', t => {
                    if (null != this.linkRange) {
                        const t = this.linkRange;
                        this.restoreFocus(), this.quill.formatText(t, 'link', !1, n.default.sources.USER), delete this.linkRange;
                    }
                    t.preventDefault(), this.hide();
                }), this.quill.on(n.default.events.SELECTION_CHANGE, (t, e, s) => {
                    if (null != t) {
                        if (0 === t.length && s === n.default.sources.USER) {
                            var r = this.quill.scroll.descendant(a.default, t.index), l = i(r, 2);
                            const e = l[0], s = l[1];
                            if (null != e) {
                                this.linkRange = new u.Range(t.index - s, e.length());
                                const i = a.default.formats(e.domNode);
                                return this.preview.textContent = i, this.preview.setAttribute('href', i), this.show(), void this.position(this.quill.getBounds(this.linkRange));
                            }
                        } else delete this.linkRange;
                        this.hide();
                    }
                });
            }

            show() {
                super.show(), this.root.removeAttribute('data-mode');
            }
        }

        f.TEMPLATE = ['<a class="ql-preview" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');

        class p extends o.default {
            constructor(t, e) {
                null != e.modules.toolbar && null == e.modules.toolbar.container && (e.modules.toolbar.container = d), super(t, e), this.quill.container.classList.add('ql-snow');
            }

            extendToolbar(t) {
                t.container.classList.add('ql-snow'), this.buildButtons(t.container.querySelectorAll('button'), c.default), this.buildPickers(t.container.querySelectorAll('select'), c.default), this.tooltip = new f(this.quill, this.options.bounds), t.container.querySelector('.ql-link') && this.quill.keyboard.addBinding({
                    key: 'k',
                    shortKey: !0
                }, (e, s) => {
                    t.handlers.link.call(t, !s.format.link);
                });
            }
        }

        p.DEFAULTS = (0, r.default)(!0, {}, o.default.DEFAULTS, {
            modules: {
                toolbar: {
                    handlers: {
                        link(t) {
                            if (t) {
                                const t = this.quill.getSelection();
                                if (null == t || 0 === t.length) return;
                                let e = this.quill.getText(t);
                                /^\S+@\S+\.\S+$/.test(e) && 0 !== e.indexOf('mailto:') && (e = `mailto:${e}`), this.quill.theme.tooltip.edit('link', e);
                            } else this.quill.format('link', !1);
                        }
                    }
                }
            }
        }), e.default = p;
    }]).default;
});
//# sourceMappingURL=quill.min.js.map