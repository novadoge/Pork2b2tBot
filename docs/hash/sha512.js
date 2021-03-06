/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2017
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
'use strict';
(function(L) {
    function x(c, a, d) {
        var e = 0,
            g = [],
            q = 0,
            f, b, k, h, l, n, t, p, y = !1,
            u = [],
            r = [],
            v, A = !1;
        d = d || {};
        f = d.encoding || "UTF8";
        v = d.numRounds || 1;
        if (v !== parseInt(v, 10) || 1 > v) throw Error("numRounds must a integer >= 1");
        if (0 === c.lastIndexOf("SHA-", 0))
            if (n = function(a, d) {
                    return B(a, d, c)
                }, t = function(a, d, g, e) {
                    var b, f;
                    if ("SHA-384" === c || "SHA-512" === c) b = (d + 129 >>> 10 << 5) + 31, f = 32;
                    else throw Error("Unexpected error in SHA-2 implementation");
                    for (; a.length <= b;) a.push(0);
                    a[d >>> 5] |= 128 << 24 - d % 32;
                    d = d + g;
                    a[b] = d & 4294967295;
                    a[b - 1] = d / 4294967296 | 0;
                    g = a.length;
                    for (d = 0; d < g; d += f) e = B(a.slice(d, d + f), e, c);
                    if ("SHA-384" === c) a = [e[0].a, e[0].b, e[1].a, e[1].b, e[2].a, e[2].b, e[3].a, e[3].b, e[4].a, e[4].b, e[5].a, e[5].b];
                    else if ("SHA-512" === c) a = [e[0].a, e[0].b, e[1].a, e[1].b, e[2].a, e[2].b, e[3].a, e[3].b, e[4].a, e[4].b, e[5].a, e[5].b, e[6].a, e[6].b, e[7].a, e[7].b];
                    else throw Error("Unexpected error in SHA-2 implementation");
                    return a
                }, p = function(a) {
                    return a.slice()
                }, "SHA-384" === c) l = 1024, h = 384;
            else if ("SHA-512" === c) l = 1024, h = 512;
        else throw Error("Chosen SHA variant is not supported");
        else throw Error("Chosen SHA variant is not supported");
        k = C(a, f);
        b = z(c);
        this.setHMACKey = function(a, d, g) {
            var q;
            if (!0 === y) throw Error("HMAC key already set");
            if (!0 === A) throw Error("Cannot set HMAC key after calling update");
            f = (g || {}).encoding || "UTF8";
            d = C(d, f)(a);
            a = d.binLen;
            d = d.value;
            q = l >>> 3;
            g = q / 4 - 1;
            if (q < a / 8) {
                for (d = t(d, a, 0, z(c)); d.length <= g;) d.push(0);
                d[g] &= 4294967040
            } else if (q > a / 8) {
                for (; d.length <= g;) d.push(0);
                d[g] &= 4294967040
            }
            for (a = 0; a <= g; a += 1) u[a] = d[a] ^ 909522486, r[a] = d[a] ^ 1549556828;
            b = n(u, b);
            e = l;
            y = !0
        };
        this.update = function(a) {
            var d, c, m, f = 0,
                h = l >>> 5;
            d = k(a, g, q);
            a = d.binLen;
            c = d.value;
            d = a >>> 5;
            for (m = 0; m < d; m += h) f + l <= a && (b = n(c.slice(m, m + h), b), f += l);
            e += f;
            g = c.slice(f >>> 5);
            q = a % l;
            A = !0
        };
        this.getHash = function(a, d) {
            var f, k, l, n;
            if (!0 === y) throw Error("Cannot call getHash after setting HMAC key");
            l = D(d);
            switch (a) {
                case "HEX":
                    f = function(a) {
                        return E(a, h, l)
                    };
                    break;
                case "B64":
                    f = function(a) {
                        return F(a, h, l)
                    };
                    break;
                case "BYTES":
                    f = function(a) {
                        return G(a, h)
                    };
                    break;
                case "ARRAYBUFFER":
                    try {
                        k = new ArrayBuffer(0)
                    } catch (w) {
                        throw Error("ARRAYBUFFER not supported by this environment");
                    }
                    f = function(a) {
                        return I(a, h)
                    };
                    break;
                default:
                    throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
            }
            n = t(g.slice(), q, e, p(b));
            for (k = 1; k < v; k += 1) n = t(n, h, 0, z(c));
            return f(n)
        };
        this.getHMAC = function(a, d) {
            var f, k, u, v;
            if (!1 === y) throw Error("Cannot call getHMAC without first setting HMAC key");
            u = D(d);
            switch (a) {
                case "HEX":
                    f = function(a) {
                        return E(a, h, u)
                    };
                    break;
                case "B64":
                    f = function(a) {
                        return F(a, h, u)
                    };
                    break;
                case "BYTES":
                    f = function(a) {
                        return G(a, h)
                    };
                    break;
                case "ARRAYBUFFER":
                    try {
                        f = new ArrayBuffer(0)
                    } catch (w) {
                        throw Error("ARRAYBUFFER not supported by this environment");
                    }
                    f = function(a) {
                        return I(a, h)
                    };
                    break;
                default:
                    throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
            }
            k = t(g.slice(), q, e, p(b));
            v = n(r, z(c));
            v = t(k, h, l, v);
            return f(v)
        }
    }

    function c(c, a) {
        this.a = c;
        this.b = a
    }

    function E(c, a, d) {
        var e = "";
        a /= 8;
        var g, b;
        for (g = 0; g < a; g += 1) b = c[g >>> 2] >>> 8 * (3 + g % 4 * -1), e += "0123456789abcdef".charAt(b >>> 4 & 15) + "0123456789abcdef".charAt(b & 15);
        return d.outputUpper ? e.toUpperCase() : e
    }

    function F(c, a, d) {
        var e = "",
            g = a / 8,
            b, f, H;
        for (b = 0; b < g; b += 3)
            for (f = b + 1 < g ? c[b + 1 >>> 2] : 0, H = b + 2 < g ? c[b + 2 >>> 2] :
                0, H = (c[b >>> 2] >>> 8 * (3 + b % 4 * -1) & 255) << 16 | (f >>> 8 * (3 + (b + 1) % 4 * -1) & 255) << 8 | H >>> 8 * (3 + (b + 2) % 4 * -1) & 255, f = 0; 4 > f; f += 1) 8 * b + 6 * f <= a ? e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(H >>> 6 * (3 - f) & 63) : e += d.b64Pad;
        return e
    }

    function G(c, a) {
        var d = "",
            e = a / 8,
            g, b;
        for (g = 0; g < e; g += 1) b = c[g >>> 2] >>> 8 * (3 + g % 4 * -1) & 255, d += String.fromCharCode(b);
        return d
    }

    function I(c, a) {
        var d = a / 8,
            e, g = new ArrayBuffer(d);
        for (e = 0; e < d; e += 1) g[e] = c[e >>> 2] >>> 8 * (3 + e % 4 * -1) & 255;
        return g
    }

    function D(c) {
        var a = {
            outputUpper: !1,
            b64Pad: "=",
            shakeLen: -1
        };
        c = c || {};
        a.outputUpper = c.outputUpper || !1;
        !0 === c.hasOwnProperty("b64Pad") && (a.b64Pad = c.b64Pad);
        if ("boolean" !== typeof a.outputUpper) throw Error("Invalid outputUpper formatting option");
        if ("string" !== typeof a.b64Pad) throw Error("Invalid b64Pad formatting option");
        return a
    }

    function C(c, a) {
        var d;
        switch (a) {
            case "UTF8":
            case "UTF16BE":
            case "UTF16LE":
                break;
            default:
                throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
        }
        switch (c) {
            case "HEX":
                d = function(a, c, d) {
                    var b = a.length,
                        m, k, h, l, n;
                    if (0 !== b %
                        2) throw Error("String of HEX type must be in byte increments");
                    c = c || [0];
                    d = d || 0;
                    n = d >>> 3;
                    for (m = 0; m < b; m += 2) {
                        k = parseInt(a.substr(m, 2), 16);
                        if (isNaN(k)) throw Error("String of HEX type contains invalid characters");
                        l = (m >>> 1) + n;
                        for (h = l >>> 2; c.length <= h;) c.push(0);
                        c[h] |= k << 8 * (3 + l % 4 * -1)
                    }
                    return {
                        value: c,
                        binLen: 4 * b + d
                    }
                };
                break;
            case "TEXT":
                d = function(c, d, b) {
                    var f, m, k = 0,
                        h, l, n, t, p, r;
                    d = d || [0];
                    b = b || 0;
                    n = b >>> 3;
                    if ("UTF8" === a)
                        for (r = 3, h = 0; h < c.length; h += 1)
                            for (f = c.charCodeAt(h), m = [], 128 > f ? m.push(f) : 2048 > f ? (m.push(192 | f >>> 6),
                                    m.push(128 | f & 63)) : 55296 > f || 57344 <= f ? m.push(224 | f >>> 12, 128 | f >>> 6 & 63, 128 | f & 63) : (h += 1, f = 65536 + ((f & 1023) << 10 | c.charCodeAt(h) & 1023), m.push(240 | f >>> 18, 128 | f >>> 12 & 63, 128 | f >>> 6 & 63, 128 | f & 63)), l = 0; l < m.length; l += 1) {
                                p = k + n;
                                for (t = p >>> 2; d.length <= t;) d.push(0);
                                d[t] |= m[l] << 8 * (r + p % 4 * -1);
                                k += 1
                            } else if ("UTF16BE" === a || "UTF16LE" === a)
                                for (r = 2, h = 0; h < c.length; h += 1) {
                                    f = c.charCodeAt(h);
                                    "UTF16LE" === a && (l = f & 255, f = l << 8 | f >>> 8);
                                    p = k + n;
                                    for (t = p >>> 2; d.length <= t;) d.push(0);
                                    d[t] |= f << 8 * (r + p % 4 * -1);
                                    k += 2
                                }
                    return {
                        value: d,
                        binLen: 8 * k + b
                    }
                };
                break;
            case "B64":
                d = function(a, c, d) {
                    var b = 0,
                        m, k, h, l, n, t, p;
                    if (-1 === a.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
                    k = a.indexOf("=");
                    a = a.replace(/\=/g, "");
                    if (-1 !== k && k < a.length) throw Error("Invalid '=' found in base-64 string");
                    c = c || [0];
                    d = d || 0;
                    t = d >>> 3;
                    for (k = 0; k < a.length; k += 4) {
                        n = a.substr(k, 4);
                        for (h = l = 0; h < n.length; h += 1) m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(n[h]), l |= m << 18 - 6 * h;
                        for (h = 0; h < n.length - 1; h += 1) {
                            p = b + t;
                            for (m = p >>> 2; c.length <= m;) c.push(0);
                            c[m] |= (l >>> 16 - 8 * h & 255) << 8 * (3 + p % 4 * -1);
                            b += 1
                        }
                    }
                    return {
                        value: c,
                        binLen: 8 * b + d
                    }
                };
                break;
            case "BYTES":
                d = function(a, c, d) {
                    var b, m, k, h, l;
                    c = c || [0];
                    d = d || 0;
                    k = d >>> 3;
                    for (m = 0; m < a.length; m += 1) b = a.charCodeAt(m), l = m + k, h = l >>> 2, c.length <= h && c.push(0), c[h] |= b << 8 * (3 + l % 4 * -1);
                    return {
                        value: c,
                        binLen: 8 * a.length + d
                    }
                };
                break;
            case "ARRAYBUFFER":
                try {
                    d = new ArrayBuffer(0)
                } catch (e) {
                    throw Error("ARRAYBUFFER not supported by this environment");
                }
                d = function(a, c, d) {
                    var b, m, k, h;
                    c = c || [0];
                    d = d || 0;
                    m = d >>> 3;
                    for (b = 0; b < a.byteLength; b += 1) h = b + m, k = h >>>
                        2, c.length <= k && c.push(0), c[k] |= a[b] << 8 * (3 + h % 4 * -1);
                    return {
                        value: c,
                        binLen: 8 * a.byteLength + d
                    }
                };
                break;
            default:
                throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
        }
        return d
    }

    function r(b, a) {
        var d = null,
            d = new c(b.a, b.b);
        return d = 32 >= a ? new c(d.a >>> a | d.b << 32 - a & 4294967295, d.b >>> a | d.a << 32 - a & 4294967295) : new c(d.b >>> a - 32 | d.a << 64 - a & 4294967295, d.a >>> a - 32 | d.b << 64 - a & 4294967295)
    }

    function J(b, a) {
        var d = null;
        return d = 32 >= a ? new c(b.a >>> a, b.b >>> a | b.a << 32 - a & 4294967295) : new c(0, b.a >>> a - 32)
    }

    function M(b, a, d) {
        return new c(b.a &
            a.a ^ ~b.a & d.a, b.b & a.b ^ ~b.b & d.b)
    }

    function N(b, a, d) {
        return new c(b.a & a.a ^ b.a & d.a ^ a.a & d.a, b.b & a.b ^ b.b & d.b ^ a.b & d.b)
    }

    function O(b) {
        var a = r(b, 28),
            d = r(b, 34);
        b = r(b, 39);
        return new c(a.a ^ d.a ^ b.a, a.b ^ d.b ^ b.b)
    }

    function P(b) {
        var a = r(b, 14),
            d = r(b, 18);
        b = r(b, 41);
        return new c(a.a ^ d.a ^ b.a, a.b ^ d.b ^ b.b)
    }

    function Q(b) {
        var a = r(b, 1),
            d = r(b, 8);
        b = J(b, 7);
        return new c(a.a ^ d.a ^ b.a, a.b ^ d.b ^ b.b)
    }

    function R(b) {
        var a = r(b, 19),
            d = r(b, 61);
        b = J(b, 6);
        return new c(a.a ^ d.a ^ b.a, a.b ^ d.b ^ b.b)
    }

    function S(b, a) {
        var d, e, g;
        d = (b.b & 65535) + (a.b & 65535);
        e = (b.b >>> 16) + (a.b >>> 16) + (d >>> 16);
        g = (e & 65535) << 16 | d & 65535;
        d = (b.a & 65535) + (a.a & 65535) + (e >>> 16);
        e = (b.a >>> 16) + (a.a >>> 16) + (d >>> 16);
        return new c((e & 65535) << 16 | d & 65535, g)
    }

    function T(b, a, d, e) {
        var g, q, f;
        g = (b.b & 65535) + (a.b & 65535) + (d.b & 65535) + (e.b & 65535);
        q = (b.b >>> 16) + (a.b >>> 16) + (d.b >>> 16) + (e.b >>> 16) + (g >>> 16);
        f = (q & 65535) << 16 | g & 65535;
        g = (b.a & 65535) + (a.a & 65535) + (d.a & 65535) + (e.a & 65535) + (q >>> 16);
        q = (b.a >>> 16) + (a.a >>> 16) + (d.a >>> 16) + (e.a >>> 16) + (g >>> 16);
        return new c((q & 65535) << 16 | g & 65535, f)
    }

    function U(b, a, d, e, g) {
        var q,
            f, r;
        q = (b.b & 65535) + (a.b & 65535) + (d.b & 65535) + (e.b & 65535) + (g.b & 65535);
        f = (b.b >>> 16) + (a.b >>> 16) + (d.b >>> 16) + (e.b >>> 16) + (g.b >>> 16) + (q >>> 16);
        r = (f & 65535) << 16 | q & 65535;
        q = (b.a & 65535) + (a.a & 65535) + (d.a & 65535) + (e.a & 65535) + (g.a & 65535) + (f >>> 16);
        f = (b.a >>> 16) + (a.a >>> 16) + (d.a >>> 16) + (e.a >>> 16) + (g.a >>> 16) + (q >>> 16);
        return new c((f & 65535) << 16 | q & 65535, r)
    }

    function z(b) {
        var a = [],
            d;
        if (0 === b.lastIndexOf("SHA-", 0)) switch (a = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428], d = [1779033703, 3144134277,
            1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225
        ], b) {
            case "SHA-224":
                break;
            case "SHA-256":
                a = d;
                break;
            case "SHA-384":
                a = [new c(3418070365, a[0]), new c(1654270250, a[1]), new c(2438529370, a[2]), new c(355462360, a[3]), new c(1731405415, a[4]), new c(41048885895, a[5]), new c(3675008525, a[6]), new c(1203062813, a[7])];
                break;
            case "SHA-512":
                a = [new c(d[0], 4089235720), new c(d[1], 2227873595), new c(d[2], 4271175723), new c(d[3], 1595750129), new c(d[4], 2917565137), new c(d[5], 725511199), new c(d[6], 4215389547),
                    new c(d[7], 327033209)
                ];
                break;
            default:
                throw Error("Unknown SHA variant");
        } else throw Error("No SHA variants supported");
        return a
    }

    function B(b, a, d) {
        var e, g, q, f, r, k, h, l, n, t, p, y, u, x, v, A, z, B, C, D, E, F, w = [],
            G;
        if ("SHA-384" === d || "SHA-512" === d) t = 80, y = 2, F = c, u = S, x = T, v = U, A = Q, z = R, B = O, C = P, E = N, D = M, G = K;
        else throw Error("Unexpected error in SHA-2 implementation");
        d = a[0];
        e = a[1];
        g = a[2];
        q = a[3];
        f = a[4];
        r = a[5];
        k = a[6];
        h = a[7];
        for (p = 0; p < t; p += 1) 16 > p ? (n = p * y, l = b.length <= n ? 0 : b[n], n = b.length <= n + 1 ? 0 : b[n + 1], w[p] = new F(l, n)) : w[p] = x(z(w[p -
            2]), w[p - 7], A(w[p - 15]), w[p - 16]), l = v(h, C(f), D(f, r, k), G[p], w[p]), n = u(B(d), E(d, e, g)), h = k, k = r, r = f, f = u(q, l), q = g, g = e, e = d, d = u(l, n);
        a[0] = u(d, a[0]);
        a[1] = u(e, a[1]);
        a[2] = u(g, a[2]);
        a[3] = u(q, a[3]);
        a[4] = u(f, a[4]);
        a[5] = u(r, a[5]);
        a[6] = u(k, a[6]);
        a[7] = u(h, a[7]);
        return a
    }
    var b, K;
    b = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
        1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
    ];
    K = [new c(b[0], 3609767458), new c(b[1], 602891725), new c(b[2],
            3964484399), new c(b[3], 2173295548), new c(b[4], 4081628472), new c(b[5], 3053834265), new c(b[6], 2937671579), new c(b[7], 3664609560), new c(b[8], 2734883394), new c(b[9], 1164996542), new c(b[10], 1323610764), new c(b[11], 3590304994), new c(b[12], 4068182383), new c(b[13], 991336113), new c(b[14], 633803317), new c(b[15], 3479774868), new c(b[16], 2666613458), new c(b[17], 944711139), new c(b[18], 2341262773), new c(b[19], 2007800933), new c(b[20], 1495990901), new c(b[21], 1856431235), new c(b[22], 3175218132), new c(b[23], 2198950837),
        new c(b[24], 3999719339), new c(b[25], 766784016), new c(b[26], 2566594879), new c(b[27], 3203337956), new c(b[28], 1034457026), new c(b[29], 2466948901), new c(b[30], 3758326383), new c(b[31], 168717936), new c(b[32], 1188179964), new c(b[33], 1546045734), new c(b[34], 1522805485), new c(b[35], 2643833823), new c(b[36], 2343527390), new c(b[37], 1014477480), new c(b[38], 1206759142), new c(b[39], 344077627), new c(b[40], 1290863460), new c(b[41], 3158454273), new c(b[42], 3505952657), new c(b[43], 106217008), new c(b[44], 3606008344), new c(b[45],
            1432725776), new c(b[46], 1467031594), new c(b[47], 851169720), new c(b[48], 3100823752), new c(b[49], 1363258195), new c(b[50], 3750685593), new c(b[51], 3785050280), new c(b[52], 3318307427), new c(b[53], 3812723403), new c(b[54], 2003034995), new c(b[55], 3602036899), new c(b[56], 1575990012), new c(b[57], 1125592928), new c(b[58], 2716904306), new c(b[59], 442776044), new c(b[60], 593698344), new c(b[61], 3733110249), new c(b[62], 2999351573), new c(b[63], 3815920427), new c(3391569614, 3928383900), new c(3515267271, 566280711), new c(3940187606,
            3454069534), new c(4118630271, 4000239992), new c(116418474, 1914138554), new c(174292421, 2731055270), new c(289380356, 3203993006), new c(460393269, 320620315), new c(685471733, 587496836), new c(852142971, 1086792851), new c(1017036298, 365543100), new c(1126000580, 2618297676), new c(1288033470, 3409855158), new c(1501505948, 4234509866), new c(1607167915, 987167468), new c(1816402316, 1246189591)
    ];
    "function" === typeof define && define.amd ? define(function() {
        return x
    }) : "undefined" !== typeof exports ? ("undefined" !== typeof module &&
        module.exports && (module.exports = x), exports = x) : L.jsSHA = x
})(this);