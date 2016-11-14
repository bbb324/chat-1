/**
 * Created by jun on 2016/11/14.
 */
!function(x) {
    function w() {
        var a = r.getBoundingClientRect().width;
        a / v > 840 && (a = 840 * v), x.rem = (a / 16 ) < 20 ? 20 : (a / 16), r.style.fontSize = x.rem + "px";
    }
    var v, u, t, s = x.document, r = s.documentElement, q = s.querySelector('meta[name="viewport"]'), p = s.querySelector('meta[name="flexible"]');
    if (q) {
        //console.warn("灏嗘牴鎹凡鏈夌殑meta鏍囩鏉ヨ缃缉鏀炬瘮渚�");
        var o = q.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        o && (u = parseFloat(o[2]), v = parseInt(1 / u))
    } else {
        if (p) {
            var o = p.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
            o && (v = parseFloat(o[2]), u = parseFloat((1 / v).toFixed(2)))
        }
    }
    if (!v && !u) {
        var n = (x.navigator.appVersion.match(/android/gi), x.navigator.appVersion.match(/iphone/gi)), v = x.devicePixelRatio;
        v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, u = 1 / v
    }
    if (r.setAttribute("data-dpr", v), !q) {
        if (q = s.createElement("meta"), q.setAttribute("name", "viewport"), q.setAttribute("content", "initial-scale=" + u + ", maximum-scale=" + u + ", minimum-scale=" + u + ", user-scalable=no"), r.firstElementChild) {
            r.firstElementChild.appendChild(q)
        } else {
            var m = s.createElement("div");
            m.appendChild(q), s.write(m.innerHTML)
        }
    }
    x.dpr = v, x.addEventListener("resize", function() {
        clearTimeout(t), t = setTimeout(w, 300)
    }, !1), x.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(t), t = setTimeout(w, 300))
    }, !1), "complete" === s.readyState ? s.body.style.fontSize = 12 * v + "px" : s.addEventListener("DOMContentLoaded", function() {
        s.body.style.fontSize = 12 * v + "px"
    }, !1), w();
}(window);
//鍏煎cmd
typeof define !== 'undefined' && define('modules/autofull',function (require, exports, module) {});