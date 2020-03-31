/*
 tableExport.jquery.plugin

 Version 1.10.1

 Copyright (c) 2015-2018 hhurz, https://github.com/hhurz

 Original Work Copyright (c) 2014 Giri Raj

 Licensed under the MIT License
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (c, l, u) {
    c instanceof String && (c = String(c));
    for (var w = c.length, x = 0; x < w; x++) {
        var P = c[x];
        if (l.call(u, P, x, c))
            return {
                i: x,
                v: P
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
    ;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (c, l, u) {
    c != Array.prototype && c != Object.prototype && (c[l] = u.value)
}
    ;
$jscomp.getGlobal = function (c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
}
    ;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (c, l, u, w) {
    if (l) {
        u = $jscomp.global;
        c = c.split(".");
        for (w = 0; w < c.length - 1; w++) {
            var x = c[w];
            x in u || (u[x] = {});
            u = u[x]
        }
        c = c[c.length - 1];
        w = u[c];
        l = l(w);
        l != w && null != l && $jscomp.defineProperty(u, c, {
            configurable: !0,
            writable: !0,
            value: l
        })
    }
}
    ;
$jscomp.polyfill("Array.prototype.find", function (c) {
    return c ? c : function (c, u) {
        return $jscomp.findInternal(this, c, u).v
    }
}, "es6", "es3");
(function (c) {
    c.fn.tableExport = function (l) {
        function u(b) {
            var d = [];
            x(b, "thead").each(function () {
                d.push.apply(d, x(c(this), a.theadSelector).toArray())
            });
            return d
        }
        function w(b) {
            var d = [];
            x(b, "tbody").each(function () {
                d.push.apply(d, x(c(this), a.tbodySelector).toArray())
            });
            a.tfootSelector.length && x(b, "tfoot").each(function () {
                d.push.apply(d, x(c(this), a.tfootSelector).toArray())
            });
            return d
        }
        function x(b, d) {
            var a = b[0].tagName
                , g = b.parents(a).length;
            return b.find(d).filter(function () {
                return g === c(this).closest(a).parents(a).length
            })
        }
        function P(b) {
            var d = [];
            c(b).find("thead").first().find("th").each(function (b, a) {
                void 0 !== c(a).attr("data-field") ? d[b] = c(a).attr("data-field") : d[b] = b.toString()
            });
            return d
        }
        function Q(b) {
            var d = "undefined" !== typeof b[0].cellIndex
                , a = "undefined" !== typeof b[0].rowIndex
                , g = d || a ? Ea(b) : b.is(":visible")
                , h = b.data("tableexport-display");
            d && "none" !== h && "always" !== h && (b = c(b[0].parentNode),
                a = "undefined" !== typeof b[0].rowIndex,
                h = b.data("tableexport-display"));
            a && "none" !== h && "always" !== h && (h = b.closest("table").data("tableexport-display"));
            return "none" !== h && (!0 === g || "always" === h)
        }
        function Ea(b) {
            var d = [];
            U && (d = I.filter(function () {
                var d = !1;
                this.nodeType === b[0].nodeType && ("undefined" !== typeof this.rowIndex && this.rowIndex === b[0].rowIndex ? d = !0 : "undefined" !== typeof this.cellIndex && this.cellIndex === b[0].cellIndex && "undefined" !== typeof this.parentNode.rowIndex && "undefined" !== typeof b[0].parentNode.rowIndex && this.parentNode.rowIndex === b[0].parentNode.rowIndex && (d = !0));
                return d
            }));
            return !1 === U || 0 === d.length
        }
        function Fa(b, d, f) {
            var g = !1;
            Q(b) ? 0 < a.ignoreColumn.length && (-1 !== c.inArray(f, a.ignoreColumn) || -1 !== c.inArray(f - d, a.ignoreColumn) || R.length > f && "undefined" !== typeof R[f] && -1 !== c.inArray(R[f], a.ignoreColumn)) && (g = !0) : g = !0;
            return g
        }
        function D(b, d, f, g, h) {
            if ("function" === typeof h) {
                var k = !1;
                "function" === typeof a.onIgnoreRow && (k = a.onIgnoreRow(c(b), f));
                if (!1 === k && -1 === c.inArray(f, a.ignoreRow) && -1 === c.inArray(f - g, a.ignoreRow) && Q(c(b))) {
                    var y = x(c(b), d)
                        , q = 0;
                    y.each(function (b) {
                        var d = c(this), a, g = S(this), k = T(this);
                        c.each(F, function () {
                            if (f >= this.s.r && f <= this.e.r && q >= this.s.c && q <= this.e.c)
                                for (a = 0; a <= this.e.c - this.s.c; ++a)
                                    h(null, f, q++)
                        });
                        if (!1 === Fa(d, y.length, b)) {
                            if (k || g)
                                g = g || 1,
                                    F.push({
                                        s: {
                                            r: f,
                                            c: q
                                        },
                                        e: {
                                            r: f + (k || 1) - 1,
                                            c: q + g - 1
                                        }
                                    });
                            h(this, f, q++)
                        }
                        if (g)
                            for (a = 0; a < g - 1; ++a)
                                h(null, f, q++)
                    });
                    c.each(F, function () {
                        if (f >= this.s.r && f <= this.e.r && q >= this.s.c && q <= this.e.c)
                            for (aa = 0; aa <= this.e.c - this.s.c; ++aa)
                                h(null, f, q++)
                    })
                }
            }
        }
        function pa(b, d, a, c) {
            if ("undefined" !== typeof c.images && (a = c.images[a],
                "undefined" !== typeof a)) {
                var h = b.width / b.height
                    , f = d.width / d.height
                    , g = b.width
                    , q = b.height
                    , e = 19.049976 / 25.4
                    , l = 0;
                f <= h ? (q = Math.min(b.height, d.height),
                    g = d.width * q / d.height) : f > h && (g = Math.min(b.width, d.width),
                        q = d.height * g / d.width);
                g *= e;
                q *= e;
                q < b.height && (l = (b.height - q) / 2);
                try {
                    c.doc.addImage(a.src, b.textPos.x, b.y + l, g, q)
                } catch (Ka) { }
                b.textPos.x += g
            }
        }
        function qa(b, d) {
            if ("string" === a.outputMode)
                return b.output();
            if ("base64" === a.outputMode)
                return J(b.output());
            if ("window" === a.outputMode)
                window.URL = window.URL || window.webkitURL,
                    window.open(window.URL.createObjectURL(b.output("blob")));
            else
                try {
                    var c = b.output("blob");
                    saveAs(c, a.fileName + ".pdf")
                } catch (g) {
                    G(a.fileName + ".pdf", "data:application/pdf" + (d ? "" : ";base64") + ",", d ? b.output("blob") : b.output())
                }
        }
        function ra(b, a, c) {
            var d = 0;
            "undefined" !== typeof c && (d = c.colspan);
            if (0 <= d) {
                for (var h = b.width, f = b.textPos.x, y = a.table.columns.indexOf(a.column), q = 1; q < d; q++)
                    h += a.table.columns[y + q].width;
                1 < d && ("right" === b.styles.halign ? f = b.textPos.x + h - b.width : "center" === b.styles.halign && (f = b.textPos.x + (h - b.width) / 2));
                b.width = h;
                b.textPos.x = f;
                "undefined" !== typeof c && 1 < c.rowspan && (b.height *= c.rowspan);
                if ("middle" === b.styles.valign || "bottom" === b.styles.valign)
                    c = ("string" === typeof b.text ? b.text.split(/\r\n|\r|\n/g) : b.text).length || 1,
                        2 < c && (b.textPos.y -= (2 - 1.15) / 2 * a.row.styles.fontSize * (c - 2) / 3);
                return !0
            }
            return !1
        }
        function sa(b, a, f) {
            "undefined" !== typeof b && null !== b && (b.hasAttribute("data-tableexport-canvas") ? (a = (new Date).getTime(),
                c(b).attr("data-tableexport-canvas", a),
                f.images[a] = {
                    url: '[data-tableexport-canvas="' + a + '"]',
                    src: null
                }) : "undefined" !== a && null != a && a.each(function () {
                    if (c(this).is("img")) {
                        var a = ta(this.src);
                        f.images[a] = {
                            url: this.src,
                            src: this.src
                        }
                    }
                    sa(b, c(this).children(), f)
                }))
        }
        function Ga(b, a) {
            function d(b) {
                if (b.url)
                    if (b.src) {
                        var d = new Image;
                        g = ++h;
                        d.crossOrigin = "Anonymous";
                        d.onerror = d.onload = function () {
                            if (d.complete && (0 === d.src.indexOf("data:image/") && (d.width = b.width || d.width || 0,
                                d.height = b.height || d.height || 0),
                                d.width + d.height)) {
                                var c = document.createElement("canvas")
                                    , f = c.getContext("2d");
                                c.width = d.width;
                                c.height = d.height;
                                f.drawImage(d, 0, 0);
                                b.src = c.toDataURL("image/png")
                            }
                            --h || a(g)
                        }
                            ;
                        d.src = b.url
                    } else {
                        var f = c(b.url);
                        f.length && (g = ++h,
                            html2canvas(f[0]).then(function (d) {
                                b.src = d.toDataURL("image/png");
                                --h || a(g)
                            }))
                    }
            }
            var g = 0
                , h = 0;
            if ("undefined" !== typeof b.images)
                for (var k in b.images)
                    b.images.hasOwnProperty(k) && d(b.images[k]);
            (b = h) || (a(g),
                b = void 0);
            return b
        }
        function ua(b, d, f) {
            d.each(function () {
                if (c(this).is("div")) {
                    var d = ba(K(this, "background-color"), [255, 255, 255])
                        , h = ba(K(this, "border-top-color"), [0, 0, 0])
                        , k = ca(this, "border-top-width", a.jspdf.unit)
                        , y = this.getBoundingClientRect()
                        , q = this.offsetLeft * f.dw
                        , e = this.offsetTop * f.dh
                        , l = y.width * f.dw;
                    y = y.height * f.dh;
                    f.doc.setDrawColor.apply(void 0, h);
                    f.doc.setFillColor.apply(void 0, d);
                    f.doc.setLineWidth(k);
                    f.doc.rect(b.x + q, b.y + e, l, y, k ? "FD" : "F")
                } else
                    c(this).is("img") && (d = ta(this.src),
                        pa(b, this, d, f));
                ua(b, c(this).children(), f)
            })
        }
        function va(b, d, f) {
            if ("function" === typeof f.onAutotableText)
                f.onAutotableText(f.doc, b, d);
            else {
                var g = b.textPos.x
                    , h = b.textPos.y
                    , k = {
                        halign: b.styles.halign,
                        valign: b.styles.valign
                    };
                if (d.length) {
                    for (d = d[0]; d.previousSibling;)
                        d = d.previousSibling;
                    for (var y = !1, q = !1; d;) {
                        var e = d.innerText || d.textContent || ""
                            , l = e.length && " " === e[0] ? " " : ""
                            , m = 1 < e.length && " " === e[e.length - 1] ? " " : "";
                        !0 !== a.preserve.leadingWS && (e = l + ha(e));
                        !0 !== a.preserve.trailingWS && (e = ia(e) + m);
                        c(d).is("br") && (g = b.textPos.x,
                            h += f.doc.internal.getFontSize());
                        c(d).is("b") ? y = !0 : c(d).is("i") && (q = !0);
                        (y || q) && f.doc.setFontType(y && q ? "bolditalic" : y ? "bold" : "italic");
                        if (l = f.doc.getStringUnitWidth(e) * f.doc.internal.getFontSize()) {
                            "linebreak" === b.styles.overflow && g > b.textPos.x && g + l > b.textPos.x + b.width && (0 <= ".,!%*;:=-".indexOf(e.charAt(0)) && (m = e.charAt(0),
                                l = f.doc.getStringUnitWidth(m) * f.doc.internal.getFontSize(),
                                g + l <= b.textPos.x + b.width && (f.doc.autoTableText(m, g, h, k),
                                    e = e.substring(1, e.length)),
                                l = f.doc.getStringUnitWidth(e) * f.doc.internal.getFontSize()),
                                g = b.textPos.x,
                                h += f.doc.internal.getFontSize());
                            if ("visible" !== b.styles.overflow)
                                for (; e.length && g + l > b.textPos.x + b.width;)
                                    e = e.substring(0, e.length - 1),
                                        l = f.doc.getStringUnitWidth(e) * f.doc.internal.getFontSize();
                            f.doc.autoTableText(e, g, h, k);
                            g += l
                        }
                        if (y || q)
                            c(d).is("b") ? y = !1 : c(d).is("i") && (q = !1),
                                f.doc.setFontType(y || q ? y ? "bold" : "italic" : "normal");
                        d = d.nextSibling
                    }
                    b.textPos.x = g;
                    b.textPos.y = h
                } else
                    f.doc.autoTableText(b.text, b.textPos.x, b.textPos.y, k)
            }
        }
        function da(b, a, c) {
            return null == b ? "" : b.toString().replace(new RegExp(null == a ? "" : a.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), c)
        }
        function ha(b) {
            return null == b ? "" : b.toString().replace(/^\s+/, "")
        }
        function ia(b) {
            return null == b ? "" : b.toString().replace(/\s+$/, "")
        }
        function ja(b) {
            b = da(b || "0", a.numbers.html.thousandsSeparator, "");
            b = da(b, a.numbers.html.decimalMark, ".");
            return "number" === typeof b || !1 !== jQuery.isNumeric(b) ? b : !1
        }
        function Ha(b) {
            -1 < b.indexOf("%") ? (b = ja(b.replace(/%/g, "")),
                !1 !== b && (b /= 100)) : b = !1;
            return b
        }
        function B(b, d, f) {
            var g = "";
            if (null !== b) {
                var h = c(b);
                if (h[0].hasAttribute("data-tableexport-canvas"))
                    var k = "";
                else if (h[0].hasAttribute("data-tableexport-value"))
                    k = (k = h.data("tableexport-value")) ? k + "" : "";
                else if (k = h.html(),
                    "function" === typeof a.onCellHtmlData)
                    k = a.onCellHtmlData(h, d, f, k);
                else if ("" !== k) {
                    var e = c.parseHTML(k)
                        , q = 0
                        , l = 0;
                    k = "";
                    c.each(e, function () {
                        if (c(this).is("input"))
                            k += h.find("input").eq(q++).val();
                        else if (c(this).is("select"))
                            k += h.find("select option:selected").eq(l++).text();
                        else if (c(this).is("br"))
                            k += "<br>";
                        else if ("undefined" === typeof c(this).html())
                            k += c(this).text();
                        else if (void 0 === jQuery().bootstrapTable || !0 !== c(this).hasClass("filterControl") && 0 === c(b).parents(".detail-view").length)
                            k += c(this).html()
                    })
                }
                if (!0 === a.htmlContent)
                    g = c.trim(k);
                else if (k && "" !== k)
                    if ("" !== c(b).data("tableexport-cellformat")) {
                        var m = k.replace(/\n/g, "\u2028").replace(/(<\s*br([^>]*)>)/gi, "\u2060")
                            , n = c("<div/>").html(m).contents();
                        e = !1;
                        m = "";
                        c.each(n.text().split("\u2028"), function (b, d) {
                            0 < b && (m += " ");
                            !0 !== a.preserve.leadingWS && (d = ha(d));
                            m += !0 !== a.preserve.trailingWS ? ia(d) : d
                        });
                        c.each(m.split("\u2060"), function (b, d) {
                            0 < b && (g += "\n");
                            !0 !== a.preserve.leadingWS && (d = ha(d));
                            !0 !== a.preserve.trailingWS && (d = ia(d));
                            g += d.replace(/\u00AD/g, "")
                        });
                        g = g.replace(/\u00A0/g, " ");
                        if ("json" === a.type || "excel" === a.type && "xmlss" === a.mso.fileFormat || !1 === a.numbers.output)
                            e = ja(g),
                                !1 !== e && (g = Number(e));
                        else if (a.numbers.html.decimalMark !== a.numbers.output.decimalMark || a.numbers.html.thousandsSeparator !== a.numbers.output.thousandsSeparator)
                            if (e = ja(g),
                                !1 !== e) {
                                n = ("" + e.substr(0 > e ? 1 : 0)).split(".");
                                1 === n.length && (n[1] = "");
                                var p = 3 < n[0].length ? n[0].length % 3 : 0;
                                g = (0 > e ? "-" : "") + (a.numbers.output.thousandsSeparator ? (p ? n[0].substr(0, p) + a.numbers.output.thousandsSeparator : "") + n[0].substr(p).replace(/(\d{3})(?=\d)/g, "$1" + a.numbers.output.thousandsSeparator) : n[0]) + (n[1].length ? a.numbers.output.decimalMark + n[1] : "")
                            }
                    } else
                        g = k;
                !0 === a.escape && (g = escape(g));
                "function" === typeof a.onCellData && (g = a.onCellData(h, d, f, g))
            }
            return g
        }
        function wa(b) {
            return 0 < b.length && !0 === a.preventInjection && 0 <= "=+-@".indexOf(b.charAt(0)) ? "'" + b : b
        }
        function Ia(b, a, c) {
            return a + "-" + c.toLowerCase()
        }
        function ba(b, a) {
            (b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b)) && (a = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])]);
            return a
        }
        function xa(b) {
            var a = K(b, "text-align")
                , c = K(b, "font-weight")
                , g = K(b, "font-style")
                , h = "";
            "start" === a && (a = "rtl" === K(b, "direction") ? "right" : "left");
            700 <= c && (h = "bold");
            "italic" === g && (h += g);
            "" === h && (h = "normal");
            a = {
                style: {
                    align: a,
                    bcolor: ba(K(b, "background-color"), [255, 255, 255]),
                    color: ba(K(b, "color"), [0, 0, 0]),
                    fstyle: h
                },
                colspan: S(b),
                rowspan: T(b)
            };
            null !== b && (b = b.getBoundingClientRect(),
                a.rect = {
                    width: b.width,
                    height: b.height
                });
            return a
        }
        function S(b) {
            var a = c(b).data("tableexport-colspan");
            "undefined" === typeof a && c(b).is("[colspan]") && (a = c(b).attr("colspan"));
            return parseInt(a) || 0
        }
        function T(b) {
            var a = c(b).data("tableexport-rowspan");
            "undefined" === typeof a && c(b).is("[rowspan]") && (a = c(b).attr("rowspan"));
            return parseInt(a) || 0
        }
        function K(b, a) {
            try {
                return window.getComputedStyle ? (a = a.replace(/([a-z])([A-Z])/, Ia),
                    window.getComputedStyle(b, null).getPropertyValue(a)) : b.currentStyle ? b.currentStyle[a] : b.style[a]
            } catch (f) { }
            return ""
        }
        function ca(b, a, c) {
            a = K(b, a).match(/\d+/);
            if (null !== a) {
                a = a[0];
                b = b.parentElement;
                var d = document.createElement("div");
                d.style.overflow = "hidden";
                d.style.visibility = "hidden";
                b.appendChild(d);
                d.style.width = 100 + c;
                c = 100 / d.offsetWidth;
                b.removeChild(d);
                return a * c
            }
            return 0
        }
        function ka() {
            if (!(this instanceof ka))
                return new ka;
            this.SheetNames = [];
            this.Sheets = {}
        }
        function ya(b) {
            for (var a = new ArrayBuffer(b.length), c = new Uint8Array(a), g = 0; g !== b.length; ++g)
                c[g] = b.charCodeAt(g) & 255;
            return a
        }
        function Ja(b) {
            for (var a = {}, c = {
                s: {
                    c: 1E7,
                    r: 1E7
                },
                e: {
                    c: 0,
                    r: 0
                }
            }, g = 0; g !== b.length; ++g)
                for (var h = 0; h !== b[g].length; ++h) {
                    c.s.r > g && (c.s.r = g);
                    c.s.c > h && (c.s.c = h);
                    c.e.r < g && (c.e.r = g);
                    c.e.c < h && (c.e.c = h);
                    var k = {
                        v: b[g][h]
                    };
                    if (null !== k.v) {
                        var e = XLSX.utils.encode_cell({
                            c: h,
                            r: g
                        });
                        if ("number" === typeof k.v)
                            k.t = "n";
                        else if ("boolean" === typeof k.v)
                            k.t = "b";
                        else if (k.v instanceof Date) {
                            k.t = "n";
                            k.z = XLSX.SSF._table[14];
                            var q = k;
                            var l = (Date.parse(k.v) - new Date(Date.UTC(1899, 11, 30))) / 864E5;
                            q.v = l
                        } else
                            k.t = "s";
                        a[e] = k
                    }
                }
            1E7 > c.s.c && (a["!ref"] = XLSX.utils.encode_range(c));
            return a
        }
        function ta(b) {
            var a = 0, c;
            if (0 === b.length)
                return a;
            var g = 0;
            for (c = b.length; g < c; g++) {
                var h = b.charCodeAt(g);
                a = (a << 5) - a + h;
                a |= 0
            }
            return a
        }
        function G(b, a, c) {
            var d = window.navigator.userAgent;
            if (!1 !== b && window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveOrOpenBlob(new Blob([c]), b);
            else if (!1 !== b && (0 < d.indexOf("MSIE ") || d.match(/Trident.*rv\:11\./))) {
                if (a = document.createElement("iframe")) {
                    document.body.appendChild(a);
                    a.setAttribute("style", "display:none");
                    a.contentDocument.open("txt/plain", "replace");
                    a.contentDocument.write(c);
                    a.contentDocument.close();
                    a.contentDocument.focus();
                    switch (b.substr(b.lastIndexOf(".") + 1)) {
                        case "doc":
                        case "json":
                        case "png":
                        case "pdf":
                        case "xls":
                        case "xlsx":
                            b += ".txt"
                    }
                    a.contentDocument.execCommand("SaveAs", !0, b);
                    document.body.removeChild(a)
                }
            } else {
                var h = document.createElement("a");
                if (h) {
                    var k = null;
                    h.style.display = "none";
                    !1 !== b ? h.download = b : h.target = "_blank";
                    "object" === typeof c ? (window.URL = window.URL || window.webkitURL,
                        b = [],
                        b.push(c),
                        k = window.URL.createObjectURL(new Blob(b, {
                            type: a
                        })),
                        h.href = k) : 0 <= a.toLowerCase().indexOf("base64,") ? h.href = a + J(c) : h.href = a + encodeURIComponent(c);
                    document.body.appendChild(h);
                    if (document.createEvent)
                        null === ea && (ea = document.createEvent("MouseEvents")),
                            ea.initEvent("click", !0, !1),
                            h.dispatchEvent(ea);
                    else if (document.createEventObject)
                        h.fireEvent("onclick");
                    else if ("function" === typeof h.onclick)
                        h.onclick();
                    setTimeout(function () {
                        k && window.URL.revokeObjectURL(k);
                        document.body.removeChild(h)
                    }, 100)
                }
            }
        }
        function J(a) {
            var b, c = "", g = 0;
            if ("string" === typeof a) {
                a = a.replace(/\x0d\x0a/g, "\n");
                var h = "";
                for (b = 0; b < a.length; b++) {
                    var k = a.charCodeAt(b);
                    128 > k ? h += String.fromCharCode(k) : (127 < k && 2048 > k ? h += String.fromCharCode(k >> 6 | 192) : (h += String.fromCharCode(k >> 12 | 224),
                        h += String.fromCharCode(k >> 6 & 63 | 128)),
                        h += String.fromCharCode(k & 63 | 128))
                }
                a = h
            }
            for (; g < a.length;) {
                var e = a.charCodeAt(g++);
                h = a.charCodeAt(g++);
                b = a.charCodeAt(g++);
                k = e >> 2;
                e = (e & 3) << 4 | h >> 4;
                var q = (h & 15) << 2 | b >> 6;
                var l = b & 63;
                isNaN(h) ? q = l = 64 : isNaN(b) && (l = 64);
                c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l)
            }
            return c
        }
        var a = {
            csvEnclosure: '"',
            csvSeparator: ",",
            csvUseBOM: !0,
            displayTableName: !1,
            escape: !1,
            exportHiddenCells: !1,
            fileName: "tableExport",
            htmlContent: !1,
            ignoreColumn: [],
            ignoreRow: [],
            jsonScope: "all",
            jspdf: {
                orientation: "p",
                unit: "pt",
                format: "a4",
                margins: {
                    left: 20,
                    right: 10,
                    top: 10,
                    bottom: 10
                },
                onDocCreated: null,
                autotable: {
                    styles: {
                        cellPadding: 2,
                        rowHeight: 12,
                        fontSize: 8,
                        fillColor: 255,
                        textColor: 50,
                        fontStyle: "normal",
                        overflow: "ellipsize",
                        halign: "inherit",
                        valign: "middle"
                    },
                    headerStyles: {
                        fillColor: [52, 73, 94],
                        textColor: 255,
                        fontStyle: "bold",
                        halign: "inherit",
                        valign: "middle"
                    },
                    alternateRowStyles: {
                        fillColor: 245
                    },
                    tableExport: {
                        doc: null,
                        onAfterAutotable: null,
                        onBeforeAutotable: null,
                        onAutotableText: null,
                        onTable: null,
                        outputImages: !0
                    }
                }
            },
            mso: {
                fileFormat: "xlshtml",
                onMsoNumberFormat: null,
                pageFormat: "a4",
                pageOrientation: "portrait",
                rtl: !1,
                styles: [],
                worksheetName: ""
            },
            numbers: {
                html: {
                    decimalMark: ".",
                    thousandsSeparator: ","
                },
                output: {
                    decimalMark: ".",
                    thousandsSeparator: ","
                }
            },
            onCellData: null,
            onCellHtmlData: null,
            onIgnoreRow: null,
            outputMode: "file",
            pdfmake: {
                enabled: true,
                docDefinition: {
                    footer: {
                        columns: [
                            { text: (new Date()).toLocaleString(), alignment: 'center' }
                        ]
                    },
                    pageOrientation: "portrait",
                    defaultStyle: {
                        font: "fzytk"
                    },
                    styles: {
                        header: {
                            fontSize: 22,
                            bold: true,
                            alignment: 'center'
                        },
                        anotherStyle: {
                            italics: true,
                            alignment: 'center'
                        }
                    }
                },
                fonts: {}
            },
            preserve: {
                leadingWS: !1,
                trailingWS: !1
            },
            preventInjection: !0,
            tbodySelector: "tr",
            tfootSelector: "tr",
            theadSelector: "tr",
            tableName: "Table",
            type: "csv"
        }
            , L = {
                a0: [2383.94, 3370.39],
                a1: [1683.78, 2383.94],
                a2: [1190.55, 1683.78],
                a3: [841.89, 1190.55],
                a4: [595.28, 841.89],
                a5: [419.53, 595.28],
                a6: [297.64, 419.53],
                a7: [209.76, 297.64],
                a8: [147.4, 209.76],
                a9: [104.88, 147.4],
                a10: [73.7, 104.88],
                b0: [2834.65, 4008.19],
                b1: [2004.09, 2834.65],
                b2: [1417.32, 2004.09],
                b3: [1000.63, 1417.32],
                b4: [708.66, 1000.63],
                b5: [498.9, 708.66],
                b6: [354.33, 498.9],
                b7: [249.45, 354.33],
                b8: [175.75, 249.45],
                b9: [124.72, 175.75],
                b10: [87.87, 124.72],
                c0: [2599.37, 3676.54],
                c1: [1836.85, 2599.37],
                c2: [1298.27, 1836.85],
                c3: [918.43, 1298.27],
                c4: [649.13, 918.43],
                c5: [459.21, 649.13],
                c6: [323.15, 459.21],
                c7: [229.61, 323.15],
                c8: [161.57, 229.61],
                c9: [113.39, 161.57],
                c10: [79.37, 113.39],
                dl: [311.81, 623.62],
                letter: [612, 792],
                "government-letter": [576, 756],
                legal: [612, 1008],
                "junior-legal": [576, 360],
                ledger: [1224, 792],
                tabloid: [792, 1224],
                "credit-card": [153, 243]
            }
            , v = this
            , ea = null
            , r = []
            , t = []
            , n = 0
            , p = ""
            , R = []
            , F = []
            , I = []
            , U = !1;
        c.extend(!0, a, l);
        "xlsx" === a.type && (a.mso.fileFormat = a.type,
            a.type = "excel");
        "undefined" !== typeof a.excelFileFormat && "undefined" === a.mso.fileFormat && (a.mso.fileFormat = a.excelFileFormat);
        "undefined" !== typeof a.excelPageFormat && "undefined" === a.mso.pageFormat && (a.mso.pageFormat = a.excelPageFormat);
        "undefined" !== typeof a.excelPageOrientation && "undefined" === a.mso.pageOrientation && (a.mso.pageOrientation = a.excelPageOrientation);
        "undefined" !== typeof a.excelRTL && "undefined" === a.mso.rtl && (a.mso.rtl = a.excelRTL);
        "undefined" !== typeof a.excelstyles && "undefined" === a.mso.styles && (a.mso.styles = a.excelstyles);
        "undefined" !== typeof a.onMsoNumberFormat && "undefined" === a.mso.onMsoNumberFormat && (a.mso.onMsoNumberFormat = a.onMsoNumberFormat);
        "undefined" !== typeof a.worksheetName && "undefined" === a.mso.worksheetName && (a.mso.worksheetName = a.worksheetName);
        a.mso.pageOrientation = "l" === a.mso.pageOrientation.substr(0, 1) ? "landscape" : "portrait";
        R = P(v);
        if ("csv" === a.type || "tsv" === a.type || "txt" === a.type) {
            var M = ""
                , X = 0;
            F = [];
            n = 0;
            var la = function (b, d, f) {
                b.each(function () {
                    p = "";
                    D(this, d, n, f + b.length, function (b, c, d) {
                        var h = p
                            , k = "";
                        if (null !== b)
                            if (b = B(b, c, d),
                                c = null === b || "" === b ? "" : b.toString(),
                                "tsv" === a.type)
                                b instanceof Date && b.toLocaleString(),
                                    k = da(c, "\t", " ");
                            else if (b instanceof Date)
                                k = a.csvEnclosure + b.toLocaleString() + a.csvEnclosure;
                            else if (k = wa(c),
                                k = da(k, a.csvEnclosure, a.csvEnclosure + a.csvEnclosure),
                                0 <= k.indexOf(a.csvSeparator) || /[\r\n ]/g.test(k))
                                k = a.csvEnclosure + k + a.csvEnclosure;
                        p = h + (k + ("tsv" === a.type ? "\t" : a.csvSeparator))
                    });
                    p = c.trim(p).substring(0, p.length - 1);
                    0 < p.length && (0 < M.length && (M += "\n"),
                        M += p);
                    n++
                });
                return b.length
            };
            X += la(c(v).find("thead").first().find(a.theadSelector), "th,td", X);
            x(c(v), "tbody").each(function () {
                X += la(x(c(this), a.tbodySelector), "td,th", X)
            });
            a.tfootSelector.length && la(c(v).find("tfoot").first().find(a.tfootSelector), "td,th", X);
            M += "\n";
            if ("string" === a.outputMode)
                return M;
            if ("base64" === a.outputMode)
                return J(M);
            if ("window" === a.outputMode) {
                G(!1, "data:text/" + ("csv" === a.type ? "csv" : "plain") + ";charset=utf-8,", M);
                return
            }
            try {
                var C = new Blob([M], {
                    type: "text/" + ("csv" === a.type ? "csv" : "plain") + ";charset=utf-8"
                });
                saveAs(C, a.fileName + "." + a.type, "csv" !== a.type || !1 === a.csvUseBOM)
            } catch (b) {
                G(a.fileName + "." + a.type, "data:text/" + ("csv" === a.type ? "csv" : "plain") + ";charset=utf-8," + ("csv" === a.type && a.csvUseBOM ? "\ufeff" : ""), M)
            }
        } else if ("sql" === a.type) {
            n = 0;
            F = [];
            var z = "INSERT INTO `" + a.tableName + "` (";
            r = u(c(v));
            c(r).each(function () {
                D(this, "th,td", n, r.length, function (a, c, f) {
                    z += "'" + B(a, c, f) + "',"
                });
                n++;
                z = c.trim(z).substring(0, z.length - 1)
            });
            z += ") VALUES ";
            t = w(c(v));
            c(t).each(function () {
                p = "";
                D(this, "td,th", n, r.length + t.length, function (a, c, f) {
                    p += "'" + B(a, c, f) + "',"
                });
                3 < p.length && (z += "(" + p,
                    z = c.trim(z).substring(0, z.length - 1),
                    z += "),");
                n++
            });
            z = c.trim(z).substring(0, z.length - 1);
            z += ";";
            if ("string" === a.outputMode)
                return z;
            if ("base64" === a.outputMode)
                return J(z);
            try {
                C = new Blob([z], {
                    type: "text/plain;charset=utf-8"
                }),
                    saveAs(C, a.fileName + ".sql")
            } catch (b) {
                G(a.fileName + ".sql", "data:application/sql;charset=utf-8,", z)
            }
        } else if ("json" === a.type) {
            var V = [];
            F = [];
            r = u(c(v));
            c(r).each(function () {
                var a = [];
                D(this, "th,td", n, r.length, function (b, c, g) {
                    a.push(B(b, c, g))
                });
                V.push(a)
            });
            var ma = [];
            t = w(c(v));
            c(t).each(function () {
                var a = {}
                    , d = 0;
                D(this, "td,th", n, r.length + t.length, function (b, c, h) {
                    V.length ? a[V[V.length - 1][d]] = B(b, c, h) : a[d] = B(b, c, h);
                    d++
                });
                !1 === c.isEmptyObject(a) && ma.push(a);
                n++
            });
            l = "";
            l = "head" === a.jsonScope ? JSON.stringify(V) : "data" === a.jsonScope ? JSON.stringify(ma) : JSON.stringify({
                header: V,
                data: ma
            });
            if ("string" === a.outputMode)
                return l;
            if ("base64" === a.outputMode)
                return J(l);
            try {
                C = new Blob([l], {
                    type: "application/json;charset=utf-8"
                }),
                    saveAs(C, a.fileName + ".json")
            } catch (b) {
                G(a.fileName + ".json", "data:application/json;charset=utf-8;base64,", l)
            }
        } else if ("xml" === a.type) {
            n = 0;
            F = [];
            var N = '<?xml version="1.0" encoding="utf-8"?>';
            N += "<tabledata><fields>";
            r = u(c(v));
            c(r).each(function () {
                D(this, "th,td", n, r.length, function (a, c, f) {
                    N += "<field>" + B(a, c, f) + "</field>"
                });
                n++
            });
            N += "</fields><data>";
            var za = 1;
            t = w(c(v));
            c(t).each(function () {
                var a = 1;
                p = "";
                D(this, "td,th", n, r.length + t.length, function (b, c, g) {
                    p += "<column-" + a + ">" + B(b, c, g) + "</column-" + a + ">";
                    a++
                });
                0 < p.length && "<column-1></column-1>" !== p && (N += '<row id="' + za + '">' + p + "</row>",
                    za++);
                n++
            });
            N += "</data></tabledata>";
            if ("string" === a.outputMode)
                return N;
            if ("base64" === a.outputMode)
                return J(N);
            try {
                C = new Blob([N], {
                    type: "application/xml;charset=utf-8"
                }),
                    saveAs(C, a.fileName + ".xml")
            } catch (b) {
                G(a.fileName + ".xml", "data:application/xml;charset=utf-8;base64,", N)
            }
        } else if ("excel" === a.type && "xmlss" === a.mso.fileFormat) {
            var na = []
                , E = [];
            c(v).filter(function () {
                return Q(c(this))
            }).each(function () {
                function b(a, b, d) {
                    var h = [];
                    c(a).each(function () {
                        var b = 0
                            , k = 0;
                        p = "";
                        D(this, "td,th", n, d + a.length, function (a, d, f) {
                            if (null !== a) {
                                var g = "";
                                d = B(a, d, f);
                                f = "String";
                                if (!1 !== jQuery.isNumeric(d))
                                    f = "Number";
                                else {
                                    var e = Ha(d);
                                    !1 !== e && (d = e,
                                        f = "Number",
                                        g += ' ss:StyleID="pct1"')
                                }
                                "Number" !== f && (d = d.replace(/\n/g, "<br>"));
                                e = S(a);
                                a = T(a);
                                c.each(h, function () {
                                    if (n >= this.s.r && n <= this.e.r && k >= this.s.c && k <= this.e.c)
                                        for (var a = 0; a <= this.e.c - this.s.c; ++a)
                                            k++ ,
                                                b++
                                });
                                if (a || e)
                                    a = a || 1,
                                        e = e || 1,
                                        h.push({
                                            s: {
                                                r: n,
                                                c: k
                                            },
                                            e: {
                                                r: n + a - 1,
                                                c: k + e - 1
                                            }
                                        });
                                1 < e && (g += ' ss:MergeAcross="' + (e - 1) + '"',
                                    k += e - 1);
                                1 < a && (g += ' ss:MergeDown="' + (a - 1) + '" ss:StyleID="rsp1"');
                                0 < b && (g += ' ss:Index="' + (k + 1) + '"',
                                    b = 0);
                                p += "<Cell" + g + '><Data ss:Type="' + f + '">' + c("<div />").text(d).html() + "</Data></Cell>\r";
                                k++
                            }
                        });
                        0 < p.length && (H += '<Row ss:AutoFitHeight="0">\r' + p + "</Row>\r");
                        n++
                    });
                    return a.length
                }
                var d = c(this)
                    , f = "";
                "string" === typeof a.mso.worksheetName && a.mso.worksheetName.length ? f = a.mso.worksheetName + " " + (E.length + 1) : "undefined" !== typeof a.mso.worksheetName[E.length] && (f = a.mso.worksheetName[E.length]);
                f.length || (f = d.find("caption").text() || "");
                f.length || (f = "Table " + (E.length + 1));
                f = c.trim(f.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31));
                E.push(c("<div />").text(f).html());
                !1 === a.exportHiddenCells && (I = d.find("tr, th, td").filter(":hidden"),
                    U = 0 < I.length);
                n = 0;
                R = P(this);
                H = "<Table>\r";
                var g = b(u(d), "th,td", g);
                b(w(d), "td,th", g);
                H += "</Table>\r";
                na.push(H)
            });
            l = {};
            for (var A = {}, m, O, W = 0, aa = E.length; W < aa; W++)
                m = E[W],
                    O = l[m],
                    O = l[m] = null == O ? 1 : O + 1,
                    2 === O && (E[A[m]] = E[A[m]].substring(0, 29) + "-1"),
                    1 < l[m] ? E[W] = E[W].substring(0, 29) + "-" + l[m] : A[m] = W;
            l = '<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>' + (new Date).toISOString() + '</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r';
            for (A = 0; A < na.length; A++)
                l += '<Worksheet ss:Name="' + E[A] + '" ss:RightToLeft="' + (a.mso.rtl ? "1" : "0") + '">\r' + na[A],
                    l = a.mso.rtl ? l + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r' : l + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r',
                    l += "</Worksheet>\r";
            l += "</Workbook>\r";
            if ("string" === a.outputMode)
                return l;
            if ("base64" === a.outputMode)
                return J(l);
            try {
                C = new Blob([l], {
                    type: "application/xml;charset=utf-8"
                }),
                    saveAs(C, a.fileName + ".xml")
            } catch (b) {
                G(a.fileName + ".xml", "data:application/xml;charset=utf-8;base64,", l)
            }
        } else if ("excel" === a.type && "xlsx" === a.mso.fileFormat) {
            var Aa = []
                , oa = [];
            n = 0;
            t = u(c(v));
            t.push.apply(t, w(c(v)));
            c(t).each(function () {
                var b = [];
                D(this, "th,td", n, t.length, function (d, f, g) {
                    if ("undefined" !== typeof d && null !== d) {
                        g = B(d, f, g);
                        f = S(d);
                        d = T(d);
                        c.each(oa, function () {
                            if (n >= this.s.r && n <= this.e.r && b.length >= this.s.c && b.length <= this.e.c)
                                for (var a = 0; a <= this.e.c - this.s.c; ++a)
                                    b.push(null)
                        });
                        if (d || f)
                            f = f || 1,
                                oa.push({
                                    s: {
                                        r: n,
                                        c: b.length
                                    },
                                    e: {
                                        r: n + (d || 1) - 1,
                                        c: b.length + f - 1
                                    }
                                });
                        "function" !== typeof a.onCellData && "" !== g && g === +g && (g = +g);
                        b.push("" !== g ? g : null);
                        if (f)
                            for (d = 0; d < f - 1; ++d)
                                b.push(null)
                    }
                });
                Aa.push(b);
                n++
            });
            l = new ka;
            A = Ja(Aa);
            A["!merges"] = oa;
            XLSX.utils.book_append_sheet(l, A, a.mso.worksheetName);
            l = XLSX.write(l, {
                type: "binary",
                bookType: a.mso.fileFormat,
                bookSST: !1
            });
            try {
                C = new Blob([ya(l)], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                }),
                    saveAs(C, a.fileName + "." + a.mso.fileFormat)
            } catch (b) {
                G(a.fileName + "." + a.mso.fileFormat, "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8,", ya(l))
            }
        } else if ("excel" === a.type || "xls" === a.type || "word" === a.type || "doc" === a.type) {
            l = "excel" === a.type || "xls" === a.type ? "excel" : "word";
            A = "excel" === l ? "xls" : "doc";
            m = 'xmlns:x="urn:schemas-microsoft-com:office:' + l + '"';
            var H = ""
                , Y = "";
            c(v).filter(function () {
                return Q(c(this))
            }).each(function () {
                var b = c(this);
                "" === Y && (Y = a.mso.worksheetName || b.find("caption").text() || "Table",
                    Y = c.trim(Y.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31)));
                !1 === a.exportHiddenCells && (I = b.find("tr, th, td").filter(":hidden"),
                    U = 0 < I.length);
                n = 0;
                F = [];
                R = P(this);
                H += "<table><thead>";
                r = u(b);
                c(r).each(function () {
                    p = "";
                    D(this, "th,td", n, r.length, function (b, f, g) {
                        if (null !== b) {
                            var d = "";
                            p += "<th";
                            for (var k in a.mso.styles)
                                if (a.mso.styles.hasOwnProperty(k)) {
                                    var e = c(b).css(a.mso.styles[k]);
                                    "" !== e && "0px none rgb(0, 0, 0)" !== e && "rgba(0, 0, 0, 0)" !== e && (d += "" === d ? 'style="' : ";",
                                        d += a.mso.styles[k] + ":" + e)
                                }
                            "" !== d && (p += " " + d + '"');
                            d = S(b);
                            0 < d && (p += ' colspan="' + d + '"');
                            d = T(b);
                            0 < d && (p += ' rowspan="' + d + '"');
                            p += ">" + B(b, f, g) + "</th>"
                        }
                    });
                    0 < p.length && (H += "<tr>" + p + "</tr>");
                    n++
                });
                H += "</thead><tbody>";
                t = w(b);
                c(t).each(function () {
                    var b = c(this);
                    p = "";
                    D(this, "td,th", n, r.length + t.length, function (d, e, h) {
                        if (null !== d) {
                            var k = B(d, e, h)
                                , g = ""
                                , f = c(d).data("tableexport-msonumberformat");
                            "undefined" === typeof f && "function" === typeof a.mso.onMsoNumberFormat && (f = a.mso.onMsoNumberFormat(d, e, h));
                            "undefined" !== typeof f && "" !== f && (g = "style=\"mso-number-format:'" + f + "'");
                            for (var l in a.mso.styles)
                                a.mso.styles.hasOwnProperty(l) && (f = c(d).css(a.mso.styles[l]),
                                    "" === f && (f = b.css(a.mso.styles[l])),
                                    "" !== f && "0px none rgb(0, 0, 0)" !== f && "rgba(0, 0, 0, 0)" !== f && (g += "" === g ? 'style="' : ";",
                                        g += a.mso.styles[l] + ":" + f));
                            p += "<td";
                            "" !== g && (p += " " + g + '"');
                            e = S(d);
                            0 < e && (p += ' colspan="' + e + '"');
                            d = T(d);
                            0 < d && (p += ' rowspan="' + d + '"');
                            "string" === typeof k && "" !== k && (k = wa(k),
                                k = k.replace(/\n/g, "<br>"));
                            p += ">" + k + "</td>"
                        }
                    });
                    0 < p.length && (H += "<tr>" + p + "</tr>");
                    n++
                });
                a.displayTableName && (H += "<tr><td></td></tr><tr><td></td></tr><tr><td>" + B(c("<p>" + a.tableName + "</p>")) + "</td></tr>");
                H += "</tbody></table>"
            });
            m = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + m + ' xmlns="http://www.w3.org/TR/REC-html40">' + ('<meta http-equiv="content-type" content="application/vnd.ms-' + l + '; charset=UTF-8">') + "<head>";
            "excel" === l && (m += "\x3c!--[if gte mso 9]>",
                m += "<xml>",
                m += "<x:ExcelWorkbook>",
                m += "<x:ExcelWorksheets>",
                m += "<x:ExcelWorksheet>",
                m += "<x:Name>",
                m += Y,
                m += "</x:Name>",
                m += "<x:WorksheetOptions>",
                m += "<x:DisplayGridlines/>",
                a.mso.rtl && (m += "<x:DisplayRightToLeft/>"),
                m += "</x:WorksheetOptions>",
                m += "</x:ExcelWorksheet>",
                m += "</x:ExcelWorksheets>",
                m += "</x:ExcelWorkbook>",
                m += "</xml>",
                m += "<![endif]--\x3e");
            m += "<style>";
            m += "@page { size:" + a.mso.pageOrientation + "; mso-page-orientation:" + a.mso.pageOrientation + "; }";
            m += "@page Section1 {size:" + L[a.mso.pageFormat][0] + "pt " + L[a.mso.pageFormat][1] + "pt";
            m += "; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            m += "div.Section1 {page:Section1;}";
            m += "@page Section2 {size:" + L[a.mso.pageFormat][1] + "pt " + L[a.mso.pageFormat][0] + "pt";
            m += ";mso-page-orientation:" + a.mso.pageOrientation + ";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            m += "div.Section2 {page:Section2;}";
            m += "br {mso-data-placement:same-cell;}";
            m += "</style>";
            m += "</head>";
            m += "<body>";
            m += '<div class="Section' + ("landscape" === a.mso.pageOrientation ? "2" : "1") + '">';
            m += H;
            m += "</div>";
            m += "</body>";
            m += "</html>";
            if ("string" === a.outputMode)
                return m;
            if ("base64" === a.outputMode)
                return J(m);
            try {
                C = new Blob([m], {
                    type: "application/vnd.ms-" + a.type
                }),
                    saveAs(C, a.fileName + "." + A)
            } catch (b) {
                G(a.fileName + "." + A, "data:application/vnd.ms-" + l + ";base64,", m)
            }
        } else if ("png" === a.type)
            html2canvas(c(v)[0]).then(function (b) {
                b = b.toDataURL();
                for (var c = atob(b.substring(22)), e = new ArrayBuffer(c.length), g = new Uint8Array(e), h = 0; h < c.length; h++)
                    g[h] = c.charCodeAt(h);
                if ("string" === a.outputMode)
                    return c;
                if ("base64" === a.outputMode)
                    return J(b);
                if ("window" === a.outputMode)
                    window.open(b);
                else
                    try {
                        C = new Blob([e], {
                            type: "image/png"
                        }),
                            saveAs(C, a.fileName + ".png")
                    } catch (k) {
                        G(a.fileName + ".png", "data:image/png,", C)
                    }
            });
        else if ("pdf" === a.type)
            if (!0 === a.pdfmake.enabled) {
                l = [];
                var Ba = [];
                n = 0;
                F = [];
                A = function (a, d, e) {
                    var b = 0;
                    c(a).each(function () {
                        var a = [];
                        D(this, d, n, e, function (b, c, d) {
                            if ("undefined" !== typeof b && null !== b) {
                                var h = S(b)
                                    , k = T(b);
                                b = B(b, c, d) || " ";
                                1 < h || 1 < k ? a.push({
                                    colSpan: h || 1,
                                    rowSpan: k || 1,
                                    text: b
                                }) : a.push(b)
                            } else
                                a.push(" ")
                        });
                        a.length && Ba.push(a);
                        b < a.length && (b = a.length);
                        n++
                    });
                    return b
                }
                    ;
                r = u(c(this));
                m = A(r, "th,td", r.length);
                for (O = l.length; O < m; O++)
                    l.push("*");
                t = w(c(this));
                A(t, "th,td", r.length + t.length);
                l = {
                    content: [{
                        table: {
                            headerRows: r.length,
                            widths: l,
                            body: Ba
                        }
                    }]
                };
                c.extend(true, l, a.pdfmake.docDefinition);
                pdfMake.fonts = {
                    Roboto: {
                        normal: "Roboto-Regular.ttf",
                        bold: "Roboto-Medium.ttf",
                        italics: "Roboto-Italic.ttf",
                        bolditalics: "Roboto-MediumItalic.ttf"
                    },
                    fzytk: {
                        normal: "FZXBSJW.TTF",
                        bold: "FZXBSJW.TTF",
                        italics: "FZXBSJW.TTF",
                        bolditalics: "FZXBSJW.TTF"
                    }
                };
                c.extend(true, pdfMake.fonts, a.pdfmake.fonts);
                pdfMake.createPdf(l).getBuffer(function (b) {
                    try {
                        var c = new Blob([b], {
                            type: "application/pdf"
                        });
                        saveAs(c, a.fileName + ".pdf")
                    } catch (f) {
                        G(a.fileName + ".pdf", "application/pdf", b)
                    }
                })
            } else if (!1 === a.jspdf.autotable) {
                l = {
                    dim: {
                        w: ca(c(v).first().get(0), "width", "mm"),
                        h: ca(c(v).first().get(0), "height", "mm")
                    },
                    pagesplit: !1
                };
                var Ca = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format);
                Ca.addHTML(c(v).first(), a.jspdf.margins.left, a.jspdf.margins.top, l, function () {
                    qa(Ca, !1)
                })
            } else {
                var e = a.jspdf.autotable.tableExport;
                if ("string" === typeof a.jspdf.format && "bestfit" === a.jspdf.format.toLowerCase()) {
                    var fa = ""
                        , Z = ""
                        , Da = 0;
                    c(v).each(function () {
                        if (Q(c(this))) {
                            var a = ca(c(this).get(0), "width", "pt");
                            if (a > Da) {
                                a > L.a0[0] && (fa = "a0",
                                    Z = "l");
                                for (var d in L)
                                    L.hasOwnProperty(d) && L[d][1] > a && (fa = d,
                                        Z = "l",
                                        L[d][0] > a && (Z = "p"));
                                Da = a
                            }
                        }
                    });
                    a.jspdf.format = "" === fa ? "a4" : fa;
                    a.jspdf.orientation = "" === Z ? "w" : Z
                }
                if (null == e.doc && (e.doc = new jsPDF(a.jspdf.orientation, a.jspdf.unit, a.jspdf.format),
                    "function" === typeof a.jspdf.onDocCreated))
                    a.jspdf.onDocCreated(e.doc);
                !0 === e.outputImages && (e.images = {});
                "undefined" !== typeof e.images && (c(v).filter(function () {
                    return Q(c(this))
                }).each(function () {
                    var b = 0;
                    F = [];
                    !1 === a.exportHiddenCells && (I = c(this).find("tr, th, td").filter(":hidden"),
                        U = 0 < I.length);
                    r = u(c(this));
                    t = w(c(this));
                    c(t).each(function () {
                        D(this, "td,th", r.length + b, r.length + t.length, function (a) {
                            sa(a, c(a).children(), e)
                        });
                        b++
                    })
                }),
                    r = [],
                    t = []);
                Ga(e, function () {
                    c(v).filter(function () {
                        return Q(c(this))
                    }).each(function () {
                        var b;
                        n = 0;
                        F = [];
                        !1 === a.exportHiddenCells && (I = c(this).find("tr, th, td").filter(":hidden"),
                            U = 0 < I.length);
                        R = P(this);
                        e.columns = [];
                        e.rows = [];
                        e.teCells = {};
                        if ("function" === typeof e.onTable && !1 === e.onTable(c(this), a))
                            return !0;
                        a.jspdf.autotable.tableExport = null;
                        var d = c.extend(!0, {}, a.jspdf.autotable);
                        a.jspdf.autotable.tableExport = e;
                        d.margin = {};
                        c.extend(!0, d.margin, a.jspdf.margins);
                        d.tableExport = e;
                        "function" !== typeof d.beforePageContent && (d.beforePageContent = function (a) {
                            if (1 === a.pageCount) {
                                var b = a.table.rows.concat(a.table.headerRow);
                                c.each(b, function () {
                                    0 < this.height && (this.height += (2 - 1.15) / 2 * this.styles.fontSize,
                                        a.table.height += (2 - 1.15) / 2 * this.styles.fontSize)
                                })
                            }
                        }
                        );
                        "function" !== typeof d.createdHeaderCell && (d.createdHeaderCell = function (a, b) {
                            a.styles = c.extend({}, b.row.styles);
                            if ("undefined" !== typeof e.columns[b.column.dataKey]) {
                                var h = e.columns[b.column.dataKey];
                                if ("undefined" !== typeof h.rect) {
                                    a.contentWidth = h.rect.width;
                                    if ("undefined" === typeof e.heightRatio || 0 === e.heightRatio) {
                                        var k = b.row.raw[b.column.dataKey].rowspan ? b.row.raw[b.column.dataKey].rect.height / b.row.raw[b.column.dataKey].rowspan : b.row.raw[b.column.dataKey].rect.height;
                                        e.heightRatio = a.styles.rowHeight / k
                                    }
                                    k = b.row.raw[b.column.dataKey].rect.height * e.heightRatio;
                                    k > a.styles.rowHeight && (a.styles.rowHeight = k)
                                }
                                a.styles.halign = "inherit" === d.headerStyles.halign ? "center" : d.headerStyles.halign;
                                a.styles.valign = d.headerStyles.valign;
                                "undefined" !== typeof h.style && !0 !== h.style.hidden && ("inherit" === d.headerStyles.halign && (a.styles.halign = h.style.align),
                                    "inherit" === d.styles.fillColor && (a.styles.fillColor = h.style.bcolor),
                                    "inherit" === d.styles.textColor && (a.styles.textColor = h.style.color),
                                    "inherit" === d.styles.fontStyle && (a.styles.fontStyle = h.style.fstyle))
                            }
                        }
                        );
                        "function" !== typeof d.createdCell && (d.createdCell = function (a, b) {
                            b = e.teCells[b.row.index + ":" + b.column.dataKey];
                            a.styles.halign = "inherit" === d.styles.halign ? "center" : d.styles.halign;
                            a.styles.valign = d.styles.valign;
                            "undefined" !== typeof b && "undefined" !== typeof b.style && !0 !== b.style.hidden && ("inherit" === d.styles.halign && (a.styles.halign = b.style.align),
                                "inherit" === d.styles.fillColor && (a.styles.fillColor = b.style.bcolor),
                                "inherit" === d.styles.textColor && (a.styles.textColor = b.style.color),
                                "inherit" === d.styles.fontStyle && (a.styles.fontStyle = b.style.fstyle))
                        }
                        );
                        "function" !== typeof d.drawHeaderCell && (d.drawHeaderCell = function (a, b) {
                            var c = e.columns[b.column.dataKey];
                            return (!0 !== c.style.hasOwnProperty("hidden") || !0 !== c.style.hidden) && 0 <= c.rowIndex ? ra(a, b, c) : !1
                        }
                        );
                        "function" !== typeof d.drawCell && (d.drawCell = function (a, b) {
                            var d = e.teCells[b.row.index + ":" + b.column.dataKey];
                            if (!0 !== ("undefined" !== typeof d && "undefined" !== typeof d.elements && d.elements.length && d.elements[0].hasAttribute("data-tableexport-canvas"))) {
                                if (ra(a, b, d))
                                    if (e.doc.rect(a.x, a.y, a.width, a.height, a.styles.fillStyle),
                                        "undefined" !== typeof d && "undefined" !== typeof d.elements && d.elements.length) {
                                        b = a.height / d.rect.height;
                                        if (b > e.dh || "undefined" === typeof e.dh)
                                            e.dh = b;
                                        e.dw = a.width / d.rect.width;
                                        b = a.textPos.y;
                                        ua(a, d.elements, e);
                                        a.textPos.y = b;
                                        va(a, d.elements, e)
                                    } else
                                        va(a, {}, e)
                            } else
                                d = d.elements[0],
                                    b = c(d).attr("data-tableexport-canvas"),
                                    pa(a, d, b, e);
                            return !1
                        }
                        );
                        e.headerrows = [];
                        r = u(c(this));
                        c(r).each(function () {
                            b = 0;
                            e.headerrows[n] = [];
                            D(this, "th,td", n, r.length, function (a, c, d) {
                                var f = xa(a);
                                f.title = B(a, c, d);
                                f.key = b++;
                                f.rowIndex = n;
                                e.headerrows[n].push(f)
                            });
                            n++
                        });
                        if (0 < n)
                            for (var f = n - 1; 0 <= f;)
                                c.each(e.headerrows[f], function () {
                                    var a = this;
                                    0 < f && null === this.rect && (a = e.headerrows[f - 1][this.key]);
                                    null !== a && 0 <= a.rowIndex && (!0 !== a.style.hasOwnProperty("hidden") || !0 !== a.style.hidden) && e.columns.push(a)
                                }),
                                    f = 0 < e.columns.length ? -1 : f - 1;
                        var g = 0;
                        t = [];
                        t = w(c(this));
                        c(t).each(function () {
                            var a = [];
                            b = 0;
                            D(this, "td,th", n, r.length + t.length, function (d, f, h) {
                                if ("undefined" === typeof e.columns[b]) {
                                    var k = {
                                        title: "",
                                        key: b,
                                        style: {
                                            hidden: !0
                                        }
                                    };
                                    e.columns.push(k)
                                }
                                "undefined" !== typeof d && null !== d ? (k = xa(d),
                                    k.elements = d.hasAttribute("data-tableexport-canvas") ? c(d) : c(d).children()) : (k = c.extend(!0, {}, e.teCells[g + ":" + (b - 1)]),
                                        k.colspan = -1);
                                e.teCells[g + ":" + b++] = k;
                                a.push(B(d, f, h))
                            });
                            a.length && (e.rows.push(a),
                                g++);
                            n++
                        });
                        if ("function" === typeof e.onBeforeAutotable)
                            e.onBeforeAutotable(c(this), e.columns, e.rows, d);
                        e.doc.autoTable(e.columns, e.rows, d);
                        if ("function" === typeof e.onAfterAutotable)
                            e.onAfterAutotable(c(this), d);
                        a.jspdf.autotable.startY = e.doc.autoTableEndPosY() + d.margin.top
                    });
                    qa(e.doc, "undefined" !== typeof e.images && !1 === jQuery.isEmptyObject(e.images));
                    "undefined" !== typeof e.headerrows && (e.headerrows.length = 0);
                    "undefined" !== typeof e.columns && (e.columns.length = 0);
                    "undefined" !== typeof e.rows && (e.rows.length = 0);
                    delete e.doc;
                    e.doc = null
                })
            }
        return this
    }
}
)(jQuery);
