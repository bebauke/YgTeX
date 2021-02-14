var $package, $extend, $isItRight, $setOptions;
(function () {
  var a = this;
  $package = function (d) {
    d = d.split(".");
    var b = a,
      f;
    for (f = 0; f < d.length; f++) b[d[f]] || (b[d[f]] = {}), (b = b[d[f]]);
    return b;
  };
  $extend = function (a, b) {
    var f;
    a instanceof Function
      ? (f = new a())
      : ((f = function () {}), (f.prototype = a), (f = new f()));
    var g = function () {
      this.initialize instanceof Function &&
        this.initialize.apply(this, arguments);
    };
    if (a instanceof Function) for (x in a) g[x] = a[x];
    for (x in b)
      b[x] instanceof Function &&
        !("parent" in b[x]) &&
        (b[x].parent = a instanceof Function ? a.prototype : a),
        (f[x] = b[x]);
    g.prototype = f;
    return g;
  };
  $setOptions = function (a, b) {
    var f = $package(a),
        g;
    for (g in b) f[g] = b[g];
    return f;
  };
  $isItRight = function () {
    for (
      var domObjT_script = document.getElementsByTagName("script"), 
          str_jsPath = "/src/imatheqfunctions.js",
          i = 0;
      i < domObjT_script.length;
      i++
    ) {
      var g = domObjT_script[i].src.match(str_jsPath);
      if (null !== g)
        return (
          (domObjT_script = /192.168.86.250/),
          (str_jsPath = new RegExp(document.location.hostname)),
          g[1].match(/src/) || g[1].match(domObjT_script) || g[1].match(str_jsPath)
            ? g[1]
            : "dat war nischt"
        );
    }
  };
  var b = document.createElement("link");
  b.setAttribute("rel", "stylesheet");
  b.setAttribute("type", "text/css");
  b.setAttribute("href", $isItRight() + "com/imatheq/css/imatheqmain.css");
  document.getElementsByTagName("head")[0].appendChild(b);
})();
$package("com.efmase.js.utilities");
(function () {
  com.efmase.js.utilities.XML = {
    newDocument: function (a, b) {
      a || (a = "");
      b || (b = "");
      if (document.implementation && document.implementation.createDocument)
        return document.implementation.createDocument(b, a, null);
      var d = new ActiveXObject("MSXML2.DOMDocument");
      if (a) {
        var e = "",
          f = a,
          g = a.indexOf(":");
        -1 != g && ((e = a.substring(0, g)), (f = a.substring(g + 1)));
        b ? e || (e = "a0") : (e = "");
        d.loadXML(
          "<" +
            (e ? e + ":" : "") +
            f +
            (b ? " xmlns:" + e + '="' + b + '"' : "") +
            "/>"
        );
      }
      return d;
    },
    parse: function (a) {
      if ("undefined" != typeof DOMParser)
        return new DOMParser().parseFromString(a, "application/xml");
      if ("undefined" != typeof ActiveXObject) {
        var b = this.newDocument();
        b.loadXML(a);
        return b;
      }
      a = "data:text/xml;charset=utf-8," + encodeURIComponent(a);
      b = new XMLHttpRequest();
      b.open("GET", a, !1);
      b.send(null);
      return b.responseXML;
    },
    serialize: function (a) {
      if ("undefined" != typeof XMLSerializer)
        return new XMLSerializer().serializeToString(a);
      if (a.xml) return a.xml;
      throw "XML.serialize is not supported or can't serialize " + a;
    },
  };
})();
(function () {
  com.efmase.js.utilities.XMLHttp = {
    _factories: [
      function () {
        return new XMLHttpRequest();
      },
      function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
      },
      function () {
        return new ActiveXObject("Microsoft.XMLHTTP");
      },
    ],
    _factory: null,
    newRequest: function () {
      if (null !== this._factory) return this._factory();
      for (var a = 0; a < this._factories.length; a++)
        try {
          var b = this._factories[a],
            d = b();
          if (null !== d) return (this._factory = b), d;
        } catch (e) {}
      this._factory = function () {
        throw Error("XMLHttpRequest not supported");
      };
      this._factory();
    },
    getText: function (a, b) {
      var d = this.newRequest();
      d.onreadystatechange = function () {
        4 == d.readyState && 200 == d.status && b(d.responseText);
      };
      d.open("GET", a);
      d.send(null);
    },
    getXML: function (a, b) {
      var d = this.newRequest();
      d.onreadystatechange = function () {
        4 == d.readyState && 200 == d.status && b(d.responseXML);
      };
      d.open("GET", a);
      d.send(null);
    },
    post: function (a, b, d, e) {
      var f = this.newRequest();
      f.onreadystatechange = function () {
        4 == f.readyState &&
          (200 == f.status
            ? d(f.responseText)
            : e
            ? e(f.status, f.statusText)
            : d(null));
      };
      f.open("POST", a);
      f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      f.send(this.encodeFormData(b));
    },
    encodeFormData: function (a) {
      var b = [],
        d = /%20/g,
        e;
      for (e in a) {
        var f = a[e].toString(),
          f =
            encodeURIComponent(e).replace(d, "+") +
            "=" +
            encodeURIComponent(f).replace(d, "+");
        b.push(f);
      }
      return b.join("&");
    },
  };
})();
(function () {
  com.efmase.js.utilities.toolset = {
    addEventListener: function (a, b, d) {
      a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener(b, d, !1);
    },
    getViewPort: function () {
      var a, b;
      "undefined" != typeof window.innerWidth
        ? ((a = window.innerWidth), (b = window.innerHeight))
        : "undefined" != typeof document.documentElement &&
          "undefined" != typeof document.documentElement.clientWidth &&
          0 != document.documentElement.clientWidth
        ? ((a = document.documentElement.clientWidth),
          (b = document.documentElement.clientHeight))
        : ((a = document.getElementsByTagName("body")[0].clientWidth),
          (b = document.getElementsByTagName("body")[0].clientHeight));
      return { width: a, height: b };
    },
    isMobile: function () {
      return (
        -1 < navigator.userAgent.toLowerCase().indexOf("android") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("ipad") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iphone") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("windows phone") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iemobile") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("wpdesktop")
      );
    },
    isIE: function () {
      return document.documentMode || /Edge/.test(navigator.userAgent);
    },
    isFirefox: function () {
      return -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
    },
    isIOS: function () {
      return (
        -1 < navigator.userAgent.toLowerCase().indexOf("ipad") ||
        -1 < navigator.userAgent.toLowerCase().indexOf("iphone")
      );
    },
    isSmallWin: function () {
      return (
        570 > parseInt(window.innerWidth) || 400 > parseInt(window.innerHeight)
      );
    },
    loadFont: function (a, b) {
      var d = document.createElement("canvas");
      d.width = 400;
      d.height = 600;
      var e = d.getContext("2d");
      e.save();
      e.font = "8px " + a;
      e.clearRect(0, 0, 400, 600);
      e.fillText(b, 40, 300);
      e.restore();
      document.body.appendChild(d);
      document.body.removeChild(d);
    },
    swap: function (a, b) {
      var d = org.imatheq.formulaeditor.parsing.expression.RevList;
      _swap = function (a, b) {
        for (var g in a) {
          var h = null;
          "bold-script" == b &&
            (h = org.imatheq.formulaeditor.parsing.expression.ScriptList[g]);
          "bold-fraktur" == b &&
            (h = org.imatheq.formulaeditor.parsing.expression.FrakturList[g]);
          d[a[g]] = { key: g, type: b, non_bold: h };
        }
      };
      _swap(
        org.imatheq.formulaeditor.parsing.expression.DoubleStruckList,
        "double-struck"
      );
      _swap(org.imatheq.formulaeditor.parsing.expression.ScriptList, "script");
      _swap(
        org.imatheq.formulaeditor.parsing.expression.ScriptBoldList,
        "bold-script"
      );
      _swap(
        org.imatheq.formulaeditor.parsing.expression.FrakturList,
        "fraktur"
      );
      _swap(
        org.imatheq.formulaeditor.parsing.expression.FrakturBoldList,
        "bold-fraktur"
      );
    },
    setObjsAttrb: function (a, b, d, e) {
      a = document.getElementsByName(a);
      for (var f = 0; f < a.length; f++)
        "class" == b
          ? null === e || void 0 === e || "add" == e
            ? a[f].classList.add(d)
            : a[f].classList.remove(d)
          : null === e || void 0 === e || "add" == e
          ? (a[f].style[b] = d)
          : a[f].style.removeProperty(b);
    },
    barWidth: 12,
  };
})();
$package("org.imatheq.debug");
(function () {
  org.imatheq.debug.Debug = $extend(Object, {
    debug: !0,
    debugBuffer: "",
    debugDiv: null,
    debugLevel: 5,
    frameInitTimeStep: 10,
    idstr: "imatheq Exercise System - PostDebug",
    initialize: function () {
      this.debugChildInit.idstr = this.idstr;
    },
    addDebug: function (a, b) {
      if (void 0 === b || null === b) b = 0;
      if (this.debug && b <= this.debugLevel)
        try {
          this.debugDiv.innerHTML += a + "<br>";
        } catch (d) {
          this.debugBuffer += a + "<br>";
        }
    },
    addMessageListeners: function (a) {
      this.messageListener.debug = this;
      a.addMessageListener(this.idstr, "debug", this.messageListener);
    },
    createDebug: function () {
      if (this.debug) {
        var a = document.createElement("div");
        a.id = "debugWindow";
        a.style.position = "absolute";
        a.style.right = "5px";
        a.style.top = "5px";
        a.style.borderStyle = "solid";
        a.style.borderColor = "#000000";
        a.style.borderWidth = "1px";
        a.style.backgroundColor = "#EEEEEE";
        a.style.padding = "5px";
        a.style.fontSize = "12px";
        a.innerHTML = "<b>Debug-window</b><br />" + this.debugBuffer;
        this.debugDiv = a;
        try {
          this.addDebug("- add debug window"),
            document.body.insertBefore(a, document.body.firstChild);
        } catch (b) {
          this.addDebug("- delayed adding debug window (not ready)");
          var d = this;
          setTimeout(function () {
            d.createDebug();
          }, this.frameInitTimestep);
        }
      }
    },
    debugChildInit: function () {
      for (
        var a = { idstr: arguments.callee.idstr, mode: "debugInit" },
          b = document.getElementsByTagName("iframe"),
          d = 0;
        d < b.length;
        d++
      )
        b[d].contentWindow.postMessage(a, "*");
    },
    messageListener: function (a) {
      if ("object" === typeof a.data) {
        var b = a.data;
        b.idstr == arguments.callee.debug.idstr &&
          "debug" == b.mode &&
          void 0 !== b.text &&
          null !== b.text &&
          arguments.callee.debug.addDebug("[child] " + b.text);
      }
    },
    startDebug: function () {},
  });
})();
$package("org.imatheq.formulaeditor");
(function () {
  org.imatheq.formulaeditor.Cursor = $extend(Object, {
    editor: null,
    position: null,
    visible: !1,
    autoScroll: !1,
    blinkonTimer: null,
    blinkOffTimer: null,
    longBlinkon: !1,
    dimensions: null,
    initialize: function (a, b) {
      this.editor = a;
      this.position = b;
    },
    blinkon: function () {
      if (this.editor.hasFocus()) {
        this.draw({});
        this.longBlinkon && (this.longBlinkon = !1);
        var a = this;
        this.blinkoffTimer = window.setTimeout(function () {
          a.blinkoff();
        }, 600);
      }
    },
    blinkoff: function () {
      if (this.editor.hasFocus()) {
        this.editor.canvas.clearBg();
        this.editor.canvas.drawBar(this.dimensions);
        var a = this;
        this.blinkonTimer = window.setTimeout(function () {
          a.blinkon();
        }, 600);
      }
    },
    showCursor: function () {
      this.longBlinkon = !0;
      null !== this.blinkonTimer &&
        (clearTimeout(this.blinkonTimer), (this.blinkonTimer = null));
      null !== this.blinkoffTimer &&
        (clearTimeout(this.blinkoffTimer), (this.blinkoffTimer = null));
      this.blinkon();
      this.visible = !0;
    },
    hideCursor: function () {
      this.dimensions = null;
      null !== this.blinkonTimer &&
        (clearTimeout(this.blinkonTimer), (this.blinkonTimer = null));
      null !== this.blinkoffTimer &&
        (clearTimeout(this.blinkoffTimer), (this.blinkoffTimer = null));
      this.visible && this.editor.canvas.clearBg();
      this.visible = !1;
    },
    onkeydown: function (a) {
      if (!a.altKey && !a.ctrlKey)
        switch (a.keyCode) {
          case 35:
            return this.moveLast(a.shiftKey), !1;
          case 36:
            return this.moveFirst(a.shiftKey), !1;
          case 37:
            return this.moveLeft(a.shiftKey), !1;
          case 38:
            return this.moveUp(a.shiftKey), !1;
          case 39:
            return this.moveRight(a.shiftKey), !1;
          case 40:
            return this.moveDown(a.shiftKey), !1;
        }
      return this.position.row.onkeydown(a, this.editor);
    },
    setPosition: function (a, b) {
      var d;
      d = this.editor.selection;
      var e = org.imatheq.formulaeditor.presentation,
        f = new org.imatheq.formulaeditor.Options().getOption("defAutoItalic");
      if (d.hasSelection)
        d.parent instanceof e.PArray
          ? ((e = {
              bold: !1,
              forcedItalic: !1,
              autoItalic: f,
              mathcolor: "#000000",
              mtext: !1,
            }),
            this.editor.setButtonStatus(e))
          : d.parent instanceof e.Lines &&
            d.parent.getGrandChild(d.endIndex - 1, !0);
      else {
        if (
          null !== b &&
          void 0 !== b &&
          b &&
          a.row === this.position.row &&
          a.index === this.position.index
        )
          return;
        d = 0 < a.index ? a.row.children[a.index - 1] : a.row.children[a.index];
        null !== d && void 0 !== d && d instanceof e.Symbol
          ? ((e = {
              bold: d.bold,
              forcedItalic: d.forcedItalic,
              autoItalic: d.autoItalic,
              mathcolor: d.mathcolor,
              mtext: d.mtext,
            }),
            this.editor.setButtonStatus(e))
          : null !== d &&
            void 0 !== d &&
            ((e = {
              bold: null !== d.bold ? d.bold : !1,
              forcedItalic: null !== d.forcedItalic ? d.forcedItalic : !1,
              autoItalic: null !== d.autoItalic ? d.autoItalic : f,
              mathcolor: null !== d.mathcolor ? d.mathcolor : "#000000",
              mtext: !1,
            }),
            this.editor.setButtonStatus(e));
      }
      this.position = { row: a.row, index: a.index };
      this.updateEditTabButtons();
      this.autoScroll = !0;
    },
    updateEditTabButtons: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = this.editor.selection,
        d = { bracketed: null, parray: null, lines: null },
        e = null,
        f = this.position.row,
        g = this.position.index;
      b.hasSelection && ((f = b.parent), (g = b.startIndex));
      f = f.getAncestors(g);
      for (g = 1; g < f.length; g++)
        null === d.bracketed &&
          f[g] instanceof a.Bracketed &&
          (d.bracketed = f[g]),
          null === d.parray &&
            f[g] instanceof a.PArray &&
            ((d.parray = {
              row: f[g],
              index: f[g - 1].index,
              startIndex: f[g - 1].index,
              endIndex: f[g - 1].index,
              selection: "no",
            }),
            (e = f[g - 1].index));
      b.hasSelection &&
        ((f = b.parent.children[b.startIndex]),
        (g = b.endIndex - b.startIndex),
        1 == g && f instanceof a.Bracketed
          ? ((d.bracketed = f),
            1 == f.children.length &&
              (f.children[0] instanceof a.PArray
                ? ((d.parray = {
                    row: f.children[0],
                    index: e,
                    startIndex: 0,
                    endIndex: f.children[0].length - 1,
                    selection: "bracket",
                  }),
                  (d.lines = null))
                : f.children[0] instanceof a.Row &&
                  1 == f.children[0].children.length &&
                  f.children[0].children[0] instanceof a.PArray &&
                  ((d.parray = {
                    row: f.children[0].children[0],
                    index: e,
                    startIndex: 0,
                    endIndex: f.children[0].children[0].children.length - 1,
                    selection: "full",
                  }),
                  (d.lines = null))))
          : 1 == g && f instanceof a.PArray
          ? ((d.parray = {
              row: f,
              index: e,
              startIndex: 0,
              endIndex: f.children.length - 1,
              selection: "full",
            }),
            (d.lines = null))
          : b.parent instanceof a.PArray &&
            (d.parray = {
              row: b.parent,
              index: e,
              startIndex: b.startIndex,
              endIndex: b.endIndex - 1,
              selection: "partial",
            }));
      this.position.etb = d;
      var h = document.getElementById("EDITTAB_LINES_ALIGN"),
        a = document.getElementById("EDITTAB_BRACKETS"),
        b = document.getElementById("EDITTAB_EDIT_ROW_COL"),
        e = document.getElementById("EDITTAB_ROW_COL_ALIGN"),
        f = document.getElementById("EDITTAB_DRAW_LINES"),
        g = document.getElementById("EDITTAB_EQUAL_HEIGHT_WIDTH"),
        l = document.getElementById("EDITTAB_ROW_COL_SPACING"),
        m = document.getElementById("EDITTAB_DUMMY_GROUP");
      h.style.display = null !== d.lines ? "block" : "none";
      h = null !== d.lines ? !1 : !0;
      null !== d.bracketed
        ? ((a.style.display = "block"),
          (h = !1),
          (a.style.borderLeft = h ? "0" : "1px solid #BDBDBD"),
          (document.getElementById("efmase_bracket_palette_btn").innerHTML =
            d.bracketed.leftBracket.value
              .replace("<", "&lt;")
              .replace(">", "&gt;") +
            "&nbsp;" +
            d.bracketed.rightBracket.value
              .replace("<", "&lt;")
              .replace(">", "&gt;")))
        : ((a.style.display = "none"), (a.style.borderLeft = "0"));
      null !== d.parray
        ? ((b.style.display = "block"),
          (b.style.borderLeft = h ? "0" : "1px solid #BDBDBD"),
          (h = !1),
          (e.style.display = "block"),
          (e.style.borderLeft = h ? "0" : "1px solid #BDBDBD"),
          (f.style.display = "block"),
          (f.style.borderLeft = h ? "0" : "1px solid #BDBDBD"),
          (l.style.display = "block"),
          (l.style.borderLeft = h ? "0" : "1px solid #BDBDBD"),
          (g.style.display = "block"),
          (g.style.borderLeft = h ? "0" : "1px solid #BDBDBD"))
        : ((b.style.display = "none"),
          (b.style.borderLeft = "0"),
          (e.style.display = "none"),
          (e.style.borderLeft = "0"),
          (f.style.display = "none"),
          (f.style.borderLeft = "0"),
          (l.style.display = "none"),
          (l.style.borderLeft = "0"),
          (g.style.display = "none"),
          (g.style.borderLeft = "0"));
      m.style.borderLeft = "0";
      null !== d.bracketed && d.bracketed.updateEditTabButtons(this.editor);
      null !== d.parray && d.parray.row.updateEditTabButtons(this.editor);
    },
    onkeypress: function (a) {
      return this.position.row.onkeypress(a, this.editor);
    },
    onmousedown: function (a, b, d) {
      var e = this.editor.selection,
        f = this.editor.presentation.getCursorPosition(
          this.editor.getPresentationContext(),
          b,
          d
        );
      if (f)
        if (a.shiftKey) {
          a = e.getSelection(e.startPosition, f);
          if (null != a) {
            e.setSelection(a);
            this.setPosition(f);
            return;
          }
          e.clear();
          this.setPosition(f);
        } else {
          if (e.hasSelection) {
            if (0 != a.button && e.hasSelectionOnPos(f)) return !1;
            e.clear();
            this.showCursor();
          }
          0 < f.index &&
            ((a = f.row.children[f.index - 1]),
            null !== a &&
              void 0 !== a &&
              a instanceof
                org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              f.index--);
          (a = this.editor.testplayermode)
            ? "take_test" == a &&
              f.row.isAnswer &&
              (this.position.row.setHighlight(!1), (this.position = f))
            : (this.setPosition(f, !0),
              (e.startPosition = f),
              (e = {}),
              this.draw(e));
        }
      else this.editor.presentation.onmousedown(a, this.editor, b, d);
      if (null === this.position || void 0 === this.position)
        this.position = this.editor.presentation.getFollowingCursorPosition(
          this.editor.getPresentationContext()
        );
      e = {};
      this.draw(e);
    },
    onmouseup: function (a, b, d) {
      if (
        (a = this.editor.presentation.getCursorPosition(
          this.editor.getPresentationContext(),
          b,
          d
        ))
      )
        this.position = a;
      if (null === this.position || void 0 === this.position)
        this.position = this.editor.presentation.getFollowingCursorPosition(
          this.editor.getPresentationContext()
        );
    },
    moveCursor: function (a, b) {
      var d = this.editor.selection;
      if (null !== a)
        if (b) {
          var e = d.getSelection(d.startPosition, a);
          null !== e && d.setSelection(e);
          this.setPosition(a);
        } else
          this.editor.testplayermode
            ? a.row.isAnswer && ((this.position = a), (d.startPosition = a))
            : (this.setPosition(a), (d.startPosition = a)),
            this.showCursor();
      else d.hasSelection && d.clear();
    },
    isCellMove: function () {
      var a = this.editor.selection;
      return (
        a.hasSelection &&
        this.position.row !== a.parent &&
        !(a.parent instanceof org.imatheq.formulaeditor.presentation.Lines)
      );
    },
    moveRight: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = !a,
        f = this.editor.getPresentationContext(),
        g = this.editor.selection,
        h = org.imatheq.formulaeditor.presentation;
      if (
        b.children[d] instanceof h.BlockSymbol ||
        b.children[d] instanceof h.NewlineSymbol
      )
        d++, this.position.index++;
      if (!a && g.hasSelection) g.clear(), this.showCursor();
      else {
        a &&
          d < b.children.length &&
          g.hasSelection &&
          b.children[d].isAncestorOf(g.startPosition.row) &&
          (e = !0);
        var l = null;
        if (!e && this.isCellMove())
          for (
            l = b.parent.getFollowingCursorPosition(f, b.index, e),
              b = g.getSelection(g.startPosition, l);
            null !== b && g.equals(b);

          ) {
            if (l.index == l.row.children.length && null !== l.row.parent)
              l = l.row.parent.getFollowingCursorPosition(f, l.row.index, e);
            else if (l.index < l.row.children.length)
              l = { row: l.row, index: l.index + 1 };
            else break;
            b = g.getSelection(g.startPosition, l);
          }
        else {
          if (
            g.hasSelection &&
            0 < d &&
            b.children[d - 1] instanceof h.NewlineSymbol
          ) {
            b = b.parent.children[b.index + 1];
            if (null === b)
              throw Error("Error in moveRight(): no next line after newline.");
            d = 0;
            this.position = { row: b, index: d };
          }
          l = b.getFollowingCursorPosition(f, d, e);
          if (a && g.hasSelection)
            for (
              b = g.getSelection(g.startPosition, l);
              null !== b && null !== l.row.parent && g.equals(b);

            )
              (l = l.row.parent.getFollowingCursorPosition(f, l.row.index, e)),
                (b = g.getSelection(g.startPosition, l));
        }
        this.moveCursor(l, a);
      }
    },
    moveLeft: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = this.editor.selection,
        f = !a;
      if (
        (0 < d &&
          !this.editor.selection.hasSelection &&
          b.children[d - 1] instanceof
            org.imatheq.formulaeditor.presentation.BlockSymbol) ||
        b.children[d - 1] instanceof
          org.imatheq.formulaeditor.presentation.NewlineSymbol
      )
        d--, this.position.index--;
      a &&
        0 < d &&
        this.editor.selection.hasSelection &&
        b.children[d - 1].isAncestorOf(
          this.editor.selection.startPosition.row
        ) &&
        (f = !0);
      if (!a && e.hasSelection) e.clear(), this.showCursor();
      else {
        var g = null;
        if (!f && this.isCellMove())
          for (
            g = b.parent.getPrecedingCursorPosition(
              this.editor.getPresentationContext(),
              b.index,
              f
            ),
              b = e.getSelection(e.startPosition, g);
            null !== b && null !== g.row.parent && e.equals(b);

          )
            (g = g.row.parent.getPrecedingCursorPosition(
              this.editor.getPresentationContext(),
              g.row.index,
              f
            )),
              (b = e.getSelection(e.startPosition, g));
        else {
          g = b.getPrecedingCursorPosition(
            this.editor.getPresentationContext(),
            d,
            f
          );
          if (null === g) return;
          if (a && e.hasSelection)
            for (
              b = e.getSelection(e.startPosition, g);
              null !== b && null !== g.row.parent && e.equals(b);

            )
              (g = g.row.parent.getPrecedingCursorPosition(
                this.editor.getPresentationContext(),
                g.row.index,
                f
              )),
                (b = e.getSelection(e.startPosition, g));
        }
        this.moveCursor(g, a);
      }
    },
    moveDown: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = this.editor.selection,
        f = null,
        f =
          a && this.isCellMove()
            ? b.parent.getLowerCursorPosition(
                this.editor.getPresentationContext(),
                b.index,
                this.getX(),
                !a
              )
            : b.getLowerCursorPosition(
                this.editor.getPresentationContext(),
                d,
                this.getX(),
                !a
              );
      !a &&
        null !== f &&
        0 < f.index &&
        f.row.children[f.index - 1] instanceof
          org.imatheq.formulaeditor.presentation.NewlineSymbol &&
        f.index--;
      !a && e.hasSelection
        ? (e.clear(), this.showCursor())
        : (e.hasSelection &&
            a &&
            null !== f &&
            ((b = f.row),
            (d = f.index),
            d < b.children.length &&
            b.children[d].isAncestorOf(e.startPosition.row)
              ? (f = b.children[d].getLowerCursorPosition(
                  this.editor.getPresentationContext(),
                  null,
                  this.getX(),
                  !0
                ))
              : 0 < d &&
                b.children[d - 1].isAncestorOf(e.startPosition.row) &&
                (f = b.children[d - 1].getLowerCursorPosition(
                  this.editor.getPresentationContext(),
                  null,
                  this.getX(),
                  !0
                ))),
          null !== f && this.moveCursor(f, a));
    },
    moveUp: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = !a,
        f = this.editor.selection;
      if (!a && f.hasSelection) f.clear(), this.showCursor();
      else {
        var g = null,
          g =
            !e && this.isCellMove()
              ? b.parent.getHigherCursorPosition(
                  this.editor.getPresentationContext(),
                  b.index,
                  this.getX(),
                  !a
                )
              : b.getHigherCursorPosition(
                  this.editor.getPresentationContext(),
                  d,
                  this.getX(),
                  !a
                );
        !a &&
          null !== g &&
          0 < g.index &&
          g.row.children[g.index - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          g.index--;
        f.hasSelection &&
          a &&
          null !== g &&
          ((b = g.row),
          (d = g.index),
          d < b.children.length &&
          b.children[d].isAncestorOf(f.startPosition.row)
            ? (g = b.children[d].getHigherCursorPosition(
                this.editor.getPresentationContext(),
                null,
                this.getX(),
                !0
              ))
            : 0 < d &&
              b.children[d - 1].isAncestorOf(f.startPosition.row) &&
              (g = b.children[d - 1].getHigherCursorPosition(
                this.editor.getPresentationContext(),
                null,
                this.getX(),
                !0
              )));
        null !== g && this.moveCursor(g, a);
      }
    },
    moveFirst: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = null,
        e =
          a && this.isCellMove()
            ? b.parent.getFirstCursorPosition(
                this.editor.getPresentationContext(),
                b.index
              )
            : b.getFirstCursorPosition(this.editor.getPresentationContext(), d);
      this.moveCursor(e, a);
    },
    moveLast: function (a) {
      var b = this.position.row,
        d = this.position.index,
        e = null,
        e =
          a && this.isCellMove()
            ? b.parent.getLastCursorPosition(
                this.editor.getPresentationContext(),
                b.index
              )
            : b.getLastCursorPosition(this.editor.getPresentationContext(), d);
      this.moveCursor(e, a);
    },
    getX: function () {
      var a = this.position.row,
        b = this.position.index,
        d = a.children[b - 1] ? a.children[b - 1].dimensions : null,
        b = a.children[b] ? a.children[b].dimensions : null;
      null === d && null === b && (b = a.dimensions);
      null === d &&
        null !== b &&
        (d = {
          left: a.dimensions.left,
          top: b.top,
          width: 0,
          height: b.height,
        });
      null === b &&
        null !== d &&
        (b = {
          left: d.left + d.width,
          top: d.top,
          width: 0,
          height: d.height,
        });
      return Math.round(d.left + d.width + (b.left - (d.left + d.width)) / 2);
    },
    getDimensions: function (a, b) {
      var d = org.imatheq.formulaeditor.presentation,
        e = b;
      if (null === e || void 0 === e) e = this.position;
      var f = 0;
      a && a.fontSizeModifier && (f += a.fontSizeModifier);
      var f = 8 < this.editor.canvas.getFontSizeIdx(f) ? 2 : 1,
        g = e.row,
        h = e.index,
        l =
          0 == h
            ? null
            : g.children[h - 1]
            ? g.children[h - 1].dimensions
            : null,
        m = null;
      !g.children[h] ||
        g.children[h] instanceof d.NewlineSymbol ||
        (m = g.children[h].dimensions);
      null === l &&
        null === m &&
        (h == g.children.length && 1 < h
          ? ((l = g.dimensions),
            (m = {
              left: l.left + l.width,
              top: l.top,
              width: 0,
              height: l.height,
            }))
          : (m = g.dimensions));
      null === l &&
        null !== m &&
        (l = {
          left: g.dimensions.left,
          top: m.top,
          width: 0,
          height: m.height,
        });
      null === m &&
        null !== l &&
        (m = {
          left: l.left + l.width,
          top: l.top,
          width: 0,
          height: l.height,
        });
      var e = Math.round(l.left + l.width + (m.left - (l.left + l.width)) / 2),
        t = Math.round(Math.min(l.top, m.top) - 3),
        k = Math.round(Math.max(l.top + l.height, m.top + m.height) + 3);
      g.children[h] instanceof d.BlockSymbol
        ? ((e = Math.round(m.left + m.width / 2 - f / 2)),
          (t = m.top - 3),
          (k = m.top + m.height + 3))
        : !g.children[h] &&
          g.children[h - 1] instanceof d.BlockSymbol &&
          (e = Math.round(l.left + l.width / 2 - f / 2));
      f = 0;
      a && a.fontSizeModifier && (f += a.fontSizeModifier);
      d = Math.round(this.editor.canvas.getPXFontSize(f) / 2);
      d += 6;
      k - t < d && ((d -= k - t), (t -= d / 2), (k += d / 2));
      return { x: e, top: t, bottom: k };
    },
    draw: function (a) {
      var b = org.imatheq.formulaeditor.presentation;
      this.editor.canvas.clearBg();
      0 < this.position.index &&
        this.position.row.children[this.position.index - 1] instanceof
          b.NewlineSymbol &&
        this.position.index--;
      b = 0;
      a && a.fontSizeModifier && (b += a.fontSizeModifier);
      b = 8 < this.editor.canvas.getFontSizeIdx(b) ? 2 : 1;
      this.position.row.children[this.position.index - 1] instanceof
        org.imatheq.formulaeditor.presentation.BlockSymbol &&
        this.position.index--;
      this.dimensions = a = this.getDimensions(a);
      var d = this.editor.canvas.getBgContext();
      d.save();
      d.lineWidth = b;
      d.beginPath();
      d.moveTo(a.x, a.top);
      d.lineTo(a.x, a.bottom);
      d.stroke();
      d.closePath();
      d.restore();
      this.autoScroll && this.editor.setScroll(a);
      com.efmase.js.utilities.toolset.isMobile() &&
        this.editor.canvas.drawBar(a);
    },
    isOnBar: function (a, b) {
      if (null === this.dimensions) return !1;
      var d = com.efmase.js.utilities.toolset.barWidth,
        e = this.dimensions.x,
        f = this.dimensions.bottom;
      return a > e - d && a < e + d && b > f + d && b < f + 3 * d;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.Actions = $extend(Object, {
    editor: null,
    actions: [],
    redoIndex: 0,
    initialize: function (a) {
      this.editor = a;
    },
    clear: function () {
      actions = [];
      redoIndex = 0;
    },
    addAction: function (a, b, d, e, f, g, h, l, m, t, k) {
      this.actions = this.actions.slice(0, this.redoIndex);
      this.actions.push({
        action: a,
        position: b,
        beforePosition: d,
        afterPosition: e,
        replaced: f,
        replaceWith: g,
        distanceToEnd: h,
        beforeSelection: l,
        afterSelection: m,
        beforeButtonStatus: t,
        afterButtonStatus: k,
      });
      this.redoIndex++;
      this.editor.setButtonStatus();
    },
    undo: function () {
      if (0 != this.redoIndex) {
        var a = org.imatheq.formulaeditor.presentation,
          b = this.actions[this.redoIndex - 1],
          d = b.position.row,
          e = b.position.index;
        this.editor.hasFocus() || this.editor.focus();
        switch (b.action) {
          case "fontname":
          case "fontsize":
            b.replaceWith =
              "fontname" == b.action
                ? this.editor.getFontFamilyNameIdx()
                : this.editor.canvas.getFontSizeIdx();
            curIdx = this.editor.palette.changeFont(b.action, b.replaced);
            break;
          case "changeParrayStyle":
            b.replaceWith = d.info;
            d.info = b.replaced;
            break;
          case "updateBracket":
            var f = b.replaced;
            b.replaced = [
              d.leftBracket.value,
              d.rightBracket.value,
              d.leftBracket.onscreen,
              d.rightBracket.onscreen,
            ];
            d.leftBracket.value = f[0];
            d.rightBracket.value = f[1];
            d.leftBracket.onscreen = f[2];
            d.rightBracket.onscreen = f[3];
            break;
          case "onsymmetric":
          case "offsymmetric":
            f = b.replaced;
            b.replaceWith = d.symmetric;
            d.symmetric = f;
            break;
          case "insertabove":
          case "insertbelow":
            f = b.replaced;
            b.replaceWith = {
              entries: d.deleteRows(f.startRow, f.numRows),
              info: d.info,
              startRow: f.startRow,
              numRows: f.numRows,
            };
            d.info = f.info;
            d.info.populateData(d.numrows, d.numcols);
            break;
          case "insertleft":
          case "insertright":
            f = b.replaced;
            b.replaceWith = {
              entries: d.deleteColumns(f.startCol, f.numCols),
              info: d.info,
              startCol: f.startCol,
              numCols: f.numCols,
            };
            d.info = f.info;
            d.info.populateData(d.numrows, d.numcols);
            break;
          case "deleterows":
            f = b.replaced;
            b.replaceWith = {
              info: d.info,
              startRow: f.startRow,
              numRows: f.numRows,
            };
            d.insertRows(f.entries, f.startRow, f.numRows);
            d.info = f.info;
            d.info.populateData(d.numrows, d.numcols);
            break;
          case "deletecolumns":
            f = b.replaced;
            b.replaceWith = {
              info: d.info,
              startCol: f.startCol,
              numCols: f.numCols,
            };
            d.insertColumns(f.entries, f.startCol, f.numCols);
            d.info = f.info;
            d.info.populateData(d.numrows, d.numcols);
            break;
          case "setPArrayAttrbs":
            b.replaceWith = d.info;
            d.info = b.replaced;
            d.info.populateData(d.numrows, d.numcols);
            break;
          default:
            if (((f = d.children.length - b.distanceToEnd), d instanceof a.Row))
              f > e && (b.replaceWith = d.remove(e, f)),
                null !== b.replaced &&
                  (d.children.splice.apply(
                    d.children,
                    [e, 0].concat(b.replaced.children)
                  ),
                  d.updateChildren(),
                  (b.replaced = null));
            else if (d instanceof a.PArray)
              if (f > e)
                (b.replaceWith = d.deleteValues(e, f - 1)),
                  null !== b.replaced &&
                    (d.updateValues(b.replaced, e, f - 1), (b.replaced = null));
              else throw new error("Undo: PArray's endIndex <= startIndex.");
            else
              d instanceof a.Lines &&
                ((f = d.getNumGrandChildren() - b.distanceToEnd),
                f > e && (b.replaceWith = d.remove(e, f)),
                null !== b.replaced &&
                  ((f = b.replaced),
                  f instanceof a.Row && (f = new a.Lines(f)),
                  d.insert(e, f),
                  d.flatten(),
                  d.updateChildren(),
                  (b.replaced = null)));
        }
        null !== b.beforeSelection && void 0 !== b.beforeSelection
          ? this.editor.selection.setSelection(b.beforeSelection)
          : this.editor.selection.clear();
        a = this.editor.getPosition(b.beforePosition);
        this.editor.cursor.setPosition(a);
        this.redoIndex--;
        b.beforeButtonStatus &&
          (b.afterButtonStatus = this.editor.getButtonStatus());
        this.editor.setButtonStatus(b.beforeButtonStatus);
        this.editor.cursor.updateEditTabButtons();
        this.editor.redraw(this.editor.selection.hasSelection);
      }
    },
    redo: function () {
      if (this.redoIndex != this.actions.length) {
        var a = this.actions[this.redoIndex],
          b = a.position.row,
          d = a.position.index,
          e = b.children.length - a.distanceToEnd;
        this.editor.hasFocus() || this.editor.focus();
        switch (a.action) {
          case "fontname":
          case "fontsize":
            a.replaced =
              "fontname" == a.action
                ? this.editor.getFontFamilyNameIdx()
                : this.editor.canvas.getFontSizeIdx();
            curIdx = this.editor.palette.changeFont(a.action, a.replaceWith);
            break;
          case "changeParrayStyle":
            a.replaced = b.info;
            b.info = a.replaceWith;
            break;
          case "updateBracket":
            d = a.replaced;
            a.replaced = [
              b.leftBracket.value,
              b.rightBracket.value,
              b.leftBracket.onscreen,
              b.rightBracket.onscreen,
            ];
            b.leftBracket.value = d[0];
            b.rightBracket.value = d[1];
            b.leftBracket.onscreen = d[2];
            b.rightBracket.onscreen = d[3];
            break;
          case "onsymmetric":
          case "offsymmetric":
            d = a.replaceWith;
            a.replaced = b.symmetric;
            b.symmetric = d;
            break;
          case "insertabove":
          case "insertbelow":
            d = a.replaceWith;
            a.replaced = {
              info: b.info,
              startRow: d.startRow,
              numRows: d.numRows,
            };
            b.insertRows(d.entries, d.startRow, d.numRows);
            b.info = d.info;
            b.info.populateData(b.numrows, b.numcols);
            break;
          case "insertleft":
          case "insertright":
            d = a.replaceWith;
            a.replaced = {
              info: b.info,
              startCol: d.startCol,
              numCols: d.numCols,
            };
            b.insertColumns(d.entries, d.startCol, d.numCols);
            b.info = d.info;
            b.info.populateData(b.numrows, b.numcols);
            break;
          case "deleterows":
            d = a.replaceWith;
            a.replaced = {
              entries: b.deleteRows(d.startRow, d.numRows),
              info: b.info,
              startRow: d.startRow,
              numRows: d.numRows,
            };
            b.info = d.info;
            b.info.populateData(b.numrows, b.numcols);
            break;
          case "deletecolumns":
            d = a.replaceWith;
            a.replaced = {
              entries: b.deleteColumns(d.startCol, d.numCols),
              info: b.info,
              startCol: d.startCol,
              numCols: d.numCols,
            };
            b.info = d.info;
            b.info.populateData(b.numrows, b.numcols);
            break;
          case "setPArrayAttrbs":
            a.replaced = b.info;
            b.info = a.replaceWith;
            b.info.populateData(b.numrows, b.numcols);
            break;
          default:
            if (b instanceof org.imatheq.formulaeditor.presentation.Row)
              "insert" != a.action && (a.replaced = b.remove(d, e)),
                null !== a.replaceWith && b.insert(d, a.replaceWith),
                b.flatten();
            else if (b instanceof org.imatheq.formulaeditor.presentation.PArray)
              if (e > d)
                (a.replaced = b.deleteValues(d, e - 1)),
                  null !== a.replaceWith &&
                    (b.updateValues(a.replaceWith, d, e - 1),
                    (a.replaceWith = null));
              else throw Error("Undo: PArray's endIndex <= startIndex.");
            else
              b instanceof org.imatheq.formulaeditor.presentation.Lines &&
                ((e = b.getNumGrandChildren() - a.distanceToEnd),
                e > d && (a.replaced = b.remove(d, e)),
                null !== a.replaceWith &&
                  (b.insert(d, a.replaceWith), (a.replaceWith = null)));
        }
        this.redoIndex++;
        null !== a.afterSelection && void 0 !== a.afterSelection
          ? this.editor.selection.setSelection(a.afterSelection)
          : this.editor.selection.clear();
        b = this.editor.getPosition(a.afterPosition);
        this.editor.cursor.setPosition(b);
        this.editor.setButtonStatus(a.afterButtonStatus);
        this.editor.cursor.updateEditTabButtons();
        this.editor.redraw(this.editor.selection.hasSelection);
      }
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.Selection = $extend(Object, {
    editor: null,
    hasSelection: !1,
    parent: null,
    startIndex: 0,
    endIndex: 0,
    startPosition: null,
    endPosition: null,
    dimensions: null,
    initialize: function (a) {
      this.editor = a;
    },
    clear: function () {
      var a = this.hasSelection;
      this.hasSelection = !1;
      this.startPosition = null;
      this.editor.canvas.clearBg();
      a &&
        (document.selection
          ? document.selection.empty()
          : window.getSelection &&
            ((this.editor.textbox.innerHTML = ""),
            (this.editor.textbox.value = "")));
      com.efmase.js.utilities.toolset.isMobile() ||
        ((this.editor.textbox.innerHTML = "$"),
        (this.editor.textbox.value = "$"));
    },
    selectAll: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = this.editor.presentation.children[0];
      if (
        !(
          1 == b.children.length &&
          1 == b.children[0].children.length &&
          b.children[0].children[0] instanceof a.BlockSymbol
        )
      ) {
        var d = b.children[b.children.length - 1],
          e = { row: d, index: d.children.length };
        if (
          0 == d.index &&
          1 == e.index &&
          d.children[0] instanceof a.BlockSymbol
        )
          return !1;
        a = this.getSelection({ row: b.children[0], index: 0 }, e);
        this.setSelection(a);
      }
    },
    setSelection: function (a) {
      this.startPosition = {
        row: a.startPosition.row,
        index: a.startPosition.index,
      };
      this.endPosition = { row: a.endPosition.row, index: a.endPosition.index };
      this.hasSelection = !0;
      this.parent = a.parent;
      this.startIndex = a.startIndex;
      this.endIndex = a.endIndex;
      this.startIndexChain = a.startIndexChain;
      this.endIndexChain = a.endIndexChain;
      this.rightMove = a.rightMove;
      this.draw(a.dimensions);
      this.editor.textbox.innerHTML = "$";
      this.editor.textbox.value = "$";
      if (
        com.efmase.js.utilities.toolset.isIE() ||
        com.efmase.js.utilities.toolset.isFirefox()
      ) {
        var b = this;
        setTimeout(function () {
          b.editor.textboxSel = !0;
          b.editor.textbox.select();
        }, 20);
      } else this.editor.textbox.select();
    },
    updateSelection: function (a) {
      if (null === this.startPosition)
        throw Error("Selection.updateSelection: startPosition is null.");
      this.hasSelection = !0;
      this.parent = a.parent;
      this.startIndex = a.startIndex;
      this.endIndex = a.endIndex;
      this.startIndexChain = a.startIndexChain;
      this.endIndexChain = a.endIndexChain;
      this.rightMove = a.rightMove;
    },
    hasSelectionOnPos: function (a) {
      var b = a.row.getIndexChain(a.index);
      return (
        0 >=
        a.row.compareIndexChain(b, this.startIndexChain) *
          a.row.compareIndexChain(b, this.endIndexChain)
      );
    },
    getSelectionObject: function () {
      return this.hasSelection
        ? 1 == this.endIndexx - this.startIndex
          ? this.parent.children[this.startIndex]
          : null
        : null;
    },
    getSelectionCopy: function () {
      return {
        hasSelection: this.hasSelection,
        parent: this.parent,
        startPosition: {
          row: this.startPosition.row,
          index: this.startPosition.index,
        },
        endPosition: {
          row: this.endPosition.row,
          index: this.endPosition.index,
        },
        startIndex: this.startIndex,
        endIndex: this.endIndex,
        startIndexChain: this.startIndexChain,
        endIndexChain: this.endIndexChain,
        rightMove: this.rightMove,
        dimensions: null,
      };
    },
    draw: function (a) {
      this.editor.canvas.clearBg();
      if (null !== a) {
        a instanceof Array
          ? (this.dimensions = a)
          : ((this.dimensions = []), this.dimensions.push(a));
        this.editor.cursor.hideCursor();
        var b, d;
        for (a = 0; a < this.dimensions.length; a++) {
          var e = {
            width: this.dimensions[a].width,
            height: this.dimensions[a].height + 1,
            left: this.dimensions[a].left,
            top: this.dimensions[a].top,
          };
          com.efmase.js.utilities.toolset.isMobile() &&
            (0 == a
              ? (d = b = e.top + e.height)
              : (e.top + e.height < b && (b = e.top + e.height),
                e.top + e.height > d && (d = e.top + e.height)));
          this.editor.canvas.drawBox(e, "#66C", 1, "rgba(160,160,255,0.5)", !0);
        }
        com.efmase.js.utilities.toolset.isMobile() &&
          (this.drawBar("start"), this.drawBar("end"));
      }
    },
    drawBar: function (a) {
      a = this.editor.getPosition(
        "start" == a ? this.startIndexChain : this.endIndexChain
      );
      a = this.editor.cursor.getDimensions({}, a);
      this.editor.canvas.drawBar(a);
    },
    isOnBar: function (a, b, d) {
      var e = this.editor.cursor.getDimensions(
        {},
        "start" == a ? this.startPosition : this.endPosition
      );
      a = com.efmase.js.utilities.toolset.barWidth;
      var f = e.x,
        e = e.bottom;
      return b > f - a && b < f + a && d > e + a && d < e + 3 * a;
    },
    redraw: function () {
      var a;
      a = org.imatheq.formulaeditor.presentation;
      this.editor.canvas.clearBg();
      a =
        this.parent instanceof a.PArray
          ? this.parent.getSelectedArea(this.startIndex, this.endIndex - 1)
          : this.parent instanceof a.Lines
          ? this.parent.getSelectedArea(
              this.startIndexChain,
              this.endIndexChain
            )
          : this.parent.getSelectedArea(this.startIndex, this.endIndex);
      this.draw(a);
    },
    equals: function (a) {
      return this.parent === a.parent &&
        this.startIndex == a.startIndex &&
        this.endIndex == a.endIndex
        ? !0
        : !1;
    },
    getSelection: function (a, b) {
      var d = org.imatheq.formulaeditor.presentation;
      if (null === a || void 0 === a) a = this.editor.cursor.position;
      if (a.row === b.row && a.index === b.index) return null;
      var e = a.row.getAncestors(a.index),
        f = b.row.getAncestors(b.index);
      i = e.length;
      for (j = f.length; 0 < i && 0 < j && e[i - 1] === f[j - 1]; ) i--, j--;
      if (e[i] instanceof d.PArray && 0 != i && 0 != j) {
        if (2 > i && 2 > j)
          throw Error(
            "Selection.getSelection: common Lines ancestor index < 2."
          );
        var g = Math.min(e[i - 1].index, f[j - 1].index),
          h = Math.max(e[i - 1].index, f[j - 1].index),
          l = g == e[i - 1].index,
          m = e[i - 1].getIndexChain(e[i - 2].index),
          t = f[j - 1].getIndexChain(f[j - 2].index);
        return e[i].getSelection(a, b, g, h, m, t, l);
      }
      if (e[i] instanceof d.Lines) {
        if (2 > i || 2 > j)
          throw Error(
            "Selection.getSelection: common Lines ancestor index < 2."
          );
        var k,
          n,
          l = e[i - 1].index < f[j - 1].index,
          m = e[i - 1].getIndexChain(e[i - 2].index),
          t = f[j - 1].getIndexChain(f[j - 2].index);
        l
          ? ((g = e[i - 1].index),
            (k = e[i - 2].index),
            (h = f[j - 1].index),
            (n = 2 == j ? f[j - 2].index : f[j - 2].index + 1))
          : ((g = f[j - 1].index),
            (k = f[j - 2].index),
            (h = e[i - 1].index),
            (n = 2 == i ? e[i - 2].index : e[i - 2].index + 1),
            2 == j &&
              0 < k &&
              f[j - 1].children[k - 1] instanceof d.NewlineSymbol &&
              (g++,
              (k = 0),
              (this.editor.cursor.position.row = f[j].children[g]),
              (this.editor.cursor.position.index = 0)));
        return e[i].getSelection(a, b, g, h, k, n, m, t, l);
      }
      e[i] instanceof d.Row || (i++, j++);
      if (!e[i] instanceof d.Row) return null;
      k = 0;
      0 < i && (k = e[i - 1].index);
      n = 0;
      0 < j && (n = f[j - 1].index);
      if (n > k && 1 != j) n++;
      else if (k > n && 1 != i) k++;
      else if (k == n && (1 != i || 1 != j)) n++;
      else if (k == n && 0 == j)
        return (
          (this.editor.cursor.position = {
            row: b.row.children[b.index],
            index: 0,
          }),
          null
        );
      g = Math.min(k, n);
      h = Math.max(k, n);
      m = e[i].getIndexChain(k);
      t = f[j].getIndexChain(n);
      l = g == k;
      0 < g &&
        k == g &&
        1 == i &&
        e[i].children[g - 1] instanceof d.BlockSymbol &&
        g--;
      k == h && 1 == i && e[i].children[h] instanceof d.BlockSymbol && h++;
      if (1 == h - g && e[i].children[g] instanceof d.BlockSymbol) return null;
      d = e[i].getSelectedArea(g, h);
      return {
        parent: e[i],
        startPosition: { row: a.row, index: a.index },
        endPosition: { row: b.row, index: b.index },
        startIndex: g,
        endIndex: h,
        startIndexChain: m,
        endIndexChain: t,
        rightMove: l,
        dimensions: d,
      };
    },
    removeEndNewline: function () {
      var a = org.imatheq.formulaeditor.presentation;
      if (!(this.parent instanceof a.PArray)) {
        var b = this.editor.getPosition(this.endIndexChain);
        0 < b.index &&
          b.row.children[b.index - 1] instanceof a.NewlineSymbol &&
          (b.index--,
          (this.endIndexChain = b.row.getIndexChain(b.index)),
          this.endIndex--);
      }
    },
    remove: function (a) {
      if (!this.hasSelection) return null;
      var b = org.imatheq.formulaeditor.presentation;
      a = this.getSelectionCopy();
      var d = this.editor.getButtonStatus();
      if (
        this.parent instanceof b.Row &&
        0 < this.endIndex &&
        this.parent.children[this.endIndex - 1] instanceof b.NewlineSymbol
      ) {
        var e = this.parent.parent;
        this.startIndex = e.getGrandChildIndex(
          this.parent.index,
          this.startIndex
        );
        this.endIndex = e.getGrandChildIndex(this.parent.index, this.endIndex);
        this.parent = e;
      }
      if (this.parent instanceof b.Row) {
        var e = this.parent,
          f = e.children.length - this.endIndex,
          g = this.editor.cursor.position,
          h = g.row.getIndexChain(g.index),
          g = this.endIndex;
        this.parent.updateKeyword(this.editor, this.startIndex, "all", a, a);
        this.parent.updateKeyword(this.editor, g, "all", a, a);
        var l = e.remove(this.startIndex, this.endIndex);
        e.isEmpty() &&
          ((g = l.children[this.endIndex - 1]),
          (b = new b.BlockSymbol(
            null,
            g.bold,
            g.mathcolor,
            null,
            g.forcedItalic,
            g.autoItalic
          )),
          e.insert(0, b));
        b = this.parent.getIndexChain(this.startIndex);
        g = { row: this.parent, index: this.startIndex };
        this.clear();
        this.editor.cursor.setPosition(g);
        this.editor.actions.addAction(
          "delete",
          g,
          h,
          b,
          l,
          null,
          f,
          a,
          null,
          d,
          null
        );
        this.editor.redraw();
        return !1;
      }
      if (this.hasSelection && this.parent instanceof b.PArray)
        return (
          (e = this.parent),
          (g = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          }),
          (h = g.row.getIndexChain(g.index)),
          (b = g.row.getIndexChain(g.index)),
          (g.row = this.parent),
          (g.index = this.startIndex),
          (f = e.children.length - this.endIndex),
          (l = e.deleteValues(this.startIndex, this.endIndex - 1)),
          this.clear(),
          this.editor.actions.addAction(
            "delete",
            g,
            h,
            b,
            l,
            null,
            f,
            a,
            a,
            d,
            null
          ),
          this.editor.redraw(!0),
          !1
        );
      if (this.parent instanceof b.Lines) {
        e = this.parent;
        g = this.editor.cursor.position;
        h = this.editor.getPosition(this.startIndexChain);
        f = this.editor.getPosition(this.endIndexChain);
        h.row.updateKeyword(this.editor, h.index, "all", a, a);
        f.row.updateKeyword(this.editor, f.index, "all", a, a);
        var m = null;
        if (
          !this.rightMove &&
          0 < f.index &&
          f.row.children[f.index - 1] instanceof b.NewlineSymbol
        ) {
          f = this.parent.children[f.row.index + 1];
          if (null === f || void 0 === f)
            throw Error("Error in Selection.remove(), no line after newline");
          m = { row: f, index: 0 };
        }
        null !== m && (g = m);
        h = g.row.getIndexChain(g.index);
        f = e.getNumGrandChildren() - this.endIndex;
        l = e.remove(this.startIndex, this.endIndex);
        e.isEmpty() && e.insert();
        g = e.getGrandChild(this.startIndex);
        0 < g.index &&
          g.parent.children[g.index - 1] instanceof b.NewlineSymbol &&
          g.index--;
        b = this.rightMove ? this.startIndexChain : this.endIndexChain;
        g = this.editor.getPosition(b);
        null !== m &&
          ((b = g.row.getIndexChain(g.index)),
          (g = { row: g.row, index: g.index }));
        this.editor.cursor.setPosition(g);
        g = { row: e, index: this.startIndex };
        this.clear();
        this.editor.actions.addAction(
          "delete",
          g,
          h,
          b,
          l,
          null,
          f,
          a,
          null,
          d,
          null
        );
        this.editor.redraw();
        return !1;
      }
    },
    copy: function () {
      if (!this.hasSelection) return null;
      this.parent instanceof org.imatheq.formulaeditor.presentation.Row &&
        this.parent
          .remove(
            Math.min(this.startIndex, this.endIndex),
            Math.max(this.startIndex, this.endIndex)
          )
          .copy();
    },
    setSelSymbFontAttrbs: function (a) {
      if (!this.hasSelection) return null;
      var b = org.imatheq.formulaeditor.presentation,
        d = this.getSelectionCopy(),
        e = this.editor.getButtonStatus();
      if (this.parent instanceof b.Row) {
        var f = this.endIndex;
        this.parent.updateKeyword(this.editor, this.startIndex, "right", d, d);
        this.parent.updateKeyword(this.editor, f, "left", d, d);
        e = this.parent;
        b = e.remove(this.startIndex, this.endIndex);
        f = b.copy();
        f.setSymbFontAttrbs(a);
        for (a = 0; a < f.children.length; a++)
          moveright = e.insert(this.startIndex + a, f.children[a], 0 === a);
        var f = { row: e, index: this.startIndex },
          g = e.children.length - this.endIndex,
          h = f.row.getIndexChain(f.index),
          l = h,
          e = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "setSymbFontAttrbs",
          f,
          h,
          l,
          b,
          null,
          g,
          d,
          d,
          e,
          null
        );
        this.editor.redraw(!0);
        return !1;
      }
      if (this.hasSelection && this.parent instanceof b.PArray)
        return (
          (e = this.parent),
          (f = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          }),
          (h = f.row.getIndexChain(f.index)),
          (l = f.row.getIndexChain(f.index)),
          (f.row = this.parent),
          (f.index = this.startIndex),
          (g = e.children.length - this.endIndex),
          (b = e.setSymbFontAttrbs(a, this.startIndex, this.endIndex - 1)),
          (e = this.editor.getButtonStatus()),
          this.editor.actions.addAction(
            "setSymbFontAttrbs",
            f,
            h,
            l,
            b,
            null,
            g,
            d,
            d,
            e,
            null
          ),
          this.editor.redraw(!0),
          !1
        );
      if (this.parent instanceof b.Lines) {
        e = this.parent;
        f = this.editor.cursor.position;
        g = this.editor.getPosition(this.endIndexChain);
        h = null;
        if (
          !this.rightMove &&
          0 < g.index &&
          g.row.children[g.index - 1] instanceof b.NewlineSymbol
        ) {
          b = this.parent.children[g.row.index + 1];
          if (null === b || void 0 === b)
            throw Error("Error in Selection.remove(), no line after newline");
          h = { row: b, index: 0 };
        }
        null !== h && (f = h);
        h = f.row.getIndexChain(f.index);
        g = e.getNumGrandChildren() - this.endIndex;
        b = e.setSymbFontAttrbs(a, this.startIndex, this.endIndex);
        f = { row: e, index: this.startIndex };
        e = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "setSymbFontAttrbs",
          f,
          h,
          h,
          b,
          null,
          g,
          d,
          d,
          e,
          null
        );
        this.editor.redraw(!0);
        return !1;
      }
    },
    getMathML: function () {
      if (!this.hasSelection) return null;
      var a = org.imatheq.formulaeditor.presentation,
        b = this.parent,
        d = "";
      try {
        return (
          b instanceof a.Row
            ? (d =
                '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
                b.getMathML(!1, this.startIndex, this.endIndex) +
                "</math>")
            : b instanceof a.PArray
            ? (d = b.getSelectionMathML(
                this.editor.getExpressionParsingContext(),
                this.startIndex,
                this.endIndex - 1
              ))
            : b instanceof a.Lines &&
              (d = b.getSelectionMathML(
                this.editor.getExpressionParsingContext(),
                this.startIndex,
                this.endIndex - 1
              )),
          d
        );
      } catch (e) {
        throw Error(
          '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>' +
            e.toString() +
            "</mtext></math>"
        );
      }
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.EventHandler = $extend(Object, {
    mouseIsDown: !1,
    initialize: function () {
      var a = this;
      if (this.onkeydown instanceof Function) {
        var b = window.onkeydown;
        document.onkeydown = function (d) {
          d || (d = window.event);
          return a.onkeydown(d) && b && b(d);
        };
      }
      this.onkeyup instanceof Function &&
        ((b = window.onkeyup),
        (document.onkeyup = function (d) {
          d || (d = window.event);
          return a.onkeyup(d) && b && b(d);
        }));
      if (this.onkeypress instanceof Function) {
        var d = window.onkeypress;
        document.onkeypress = function (b) {
          b || (b = window.event);
          "charCode" in b || (b.charCode = b.keyCode);
          return a.onkeypress(b) && d && d(b);
        };
      }
      this.oncontextmenu instanceof Function &&
        ((d = window.oncontextmenu),
        (document.oncontextmenu = function (b) {
          b || (b = window.event);
          return a.oncontextmenu(b) && d && d(b);
        }));
      this.onselectstart instanceof Function &&
        ((b = window.onselectstart),
        (document.onselectstart = function (d) {
          d || (d = window.event);
          var g = d.target || d.srcElement;
          return "efmase_focus_textarea" == g.className ||
            "EFMASE_Container" == g.className
            ? a.onselectstart(d) && b && b(d)
            : b && b(d);
        }));
      if (this.onmousedown instanceof Function) {
        var e = window.onclick,
          f = window.ontouchstart;
        document.onmousedown = function (b) {
          b || (b = window.event);
          return 1 == b.which || 0 == b.button
            ? ((a.mouseIsDown = !0), a.onmousedown(b) && e && e(b))
            : !0;
        };
        document.ontouchstart = function (b) {
          b || (b = window.event);
          var d = a.rewriteTouchEvent(b);
          return a.onmousedown(d) && f && f(b);
        };
      }
      if (this.onmousemove instanceof Function) {
        var g = window.onmousemove,
          h = window.ontouchmove;
        document.onmousemove = function (b) {
          if (!a.mouseIsDown) return !0;
          b || (b = window.event);
          return 0 == b.which
            ? (a.mouseIsDown = !1)
            : a.onmousemove(b) && g && g(b);
        };
        document.ontouchmove = function (b) {
          b || (b = window.event);
          return a.onmousemove(a.rewriteTouchEvent(b)) && h && h(b);
        };
      }
      if (
        com.efmase.js.utilities.toolset.isIE() &&
        this.onpaste instanceof Function
      ) {
        var l = window.onpaste;
        document.onpaste = function (b) {
          b || (b = window.event);
          return a.onpaste(b) && l && l(b);
        };
      }
      if (this.onmouseup instanceof Function) {
        var l = window.onclick,
          m = window.ontouchend;
        document.onmouseup = function (b) {
          a.mouseIsDown = !1;
          b || (b = window.event);
          return a.onmouseup(b) && l && l(b);
        };
        document.ontouchend = function (b) {
          b || (b = window.event);
          return a.onmouseup(a.rewriteTouchEvent(b)) && m && m(b);
        };
      }
      if (this.onresize instanceof Function) {
        var t = window.onresize;
        window.onresize = function (b) {
          b || (b = window.event);
          return a.onresize(b) && t && t(b);
        };
      }
    },
    rewriteTouchEvent: function (a) {
      var b = a.changedTouches[0],
        d = "";
      switch (a.type) {
        case "touchstart":
          d = "mousedown";
          break;
        case "touchmove":
          d = "mousemove";
          break;
        case "touchend":
          d = "mouseup";
          break;
        default:
          return;
      }
      var e = document.createEvent("MouseEvent");
      e.initMouseEvent(
        d,
        !0,
        !0,
        window,
        1,
        b.screenX,
        b.screenY,
        b.clientX,
        b.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        a.target || a.srcElement
      );
      e.mathdoxnoadjust = !0;
      return e;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.Services = {
    url: "/phrasebook/",
    perform: function (a, b, d, e) {
      var f = this.xmlValueOf;
      com.efmase.js.utilities.XMLHttp.post(
        this.url,
        { output: "xml", service: a, action: b, data: d },
        function (d) {
          d = com.efmase.js.utilities.XML.parse(d);
          var h = d.documentElement.getElementsByTagName("status");
          0 === h.length
            ? alert("Error: no status element found in service response")
            : "ok" != f(h.item(0))
            ? ((d = d.documentElement.getElementsByTagName("error")),
              (d = f(d.item(0))),
              alert("ERROR (while using service " + a + "/" + b + "): " + d))
            : ((d = d.documentElement.getElementsByTagName("data")),
              e(f(d.item(0))));
        }
      );
    },
    openmath2gap: function (a, b) {
      return this.perform("gap", "translate_openmath_native", a, b);
    },
    xmlValueOf: function (a) {
      var b,
        d = [];
      switch (a.nodeType) {
        case 1:
          for (b = 0; b < a.childNodes.length; b++)
            d.push(arguments.callee(a.childNodes[b]));
          return d.join("");
        case 2:
        case 3:
        case 4:
          return a.nodeValue;
        case 9:
          return arguments.callee(a.Element);
      }
      return "";
    },
  };
})();
$package("org.imatheq.formulaeditor.parsing.openmath");
(function () {
  org.imatheq.formulaeditor.parsing.openmath.KeywordList = {};
})();
$package("org.imatheq.formulaeditor.presentation");
(function () {
  org.imatheq.formulaeditor.presentation.SymbolAliases = {
    "\u2062": null,
    "\u2064": null,
    "\u22c5": "\u00b7",
  };
})();
(function () {
  org.imatheq.formulaeditor.presentation.SymbolOnscreens = {
    "-": "\u2212",
    "\u20db": "\u2026",
    "\u203e": "-",
    "\u02dc": "~",
    "\u0302": "^",
    "\u030c": "\u02c7",
    "\u2217": "*",
    "(1": "\u00a1",
    ")1": "\u00a2",
    "[1": "\u00a3",
    "]1": "\u00a4",
    "\u230a1": "\u00a5",
    "\u230b1": "\u00a6",
    "\u23081": "\u00a7",
    "\u23091": "\u00a8",
    "{1": "\u00a9",
    "}1": "\u00aa",
    "<1": "\u00ad",
    ">1": "\u00ae",
    "|m": "6",
    "\u2225m": "w",
    "/1": "\u00b1",
    "\\1": "\u00b2",
    "(2": "\u00b3",
    ")2": "\u00b4",
    "(3": "\u00b5",
    ")3": "\u00b6",
    "[3": "\u2219",
    "]3": "\u00b8",
    "\u230a3": "\u00b9",
    "\u230b3": "\u00ba",
    "\u23083": "\u00bb",
    "\u23093": "\u00bc",
    "{3": "\u00bd",
    "}3": "\u00be",
    "<3": "\u00bf",
    ">3": "\u00c0",
    "/3": "\u00c1",
    "\\3": "\u00c2",
    "(4": "\u00c3",
    ")4": "!",
    "[4": '"',
    "]4": "#",
    "\u230a4": "$",
    "\u230b4": "%",
    "\u23084": "&",
    "\u23094": "'",
    "{4": "(",
    "}4": ")",
    "<4": "*",
    ">4": "+",
    "/4": ",",
    "\\4": "-",
    "/2": ".",
    "\\2": "/",
    "(u": "0",
    ")u": "1",
    "[u": "2",
    "]u": "3",
    "[l": "4",
    "]l": "5",
    "[m": "6",
    "]m": "7",
    "{u": "8",
    "}u": "9",
    "{l": ":",
    "}l": ";",
    "{m": "<",
    "}m": "=",
    "{c": ">",
    "}c": ">",
    "(l": "@",
    ")l": "A",
    "(m": "B",
    ")m": "C",
    "<2": "D",
    ">2": "E",
    "\u222e": "I",
    "\u2211": "X",
    "\u220f": "Y",
    "\u222b1": "Z",
    "\u22c3": "[",
    "\u22c2": "\\",
    "\u22c0": "^",
    "\u22c1": "_",
    "\u22101": "a",
    "\u222c": "\u2018",
    "\u222d": "\u2019",
    "\u222f": "\u201c",
    "\u2230": "\u201d",
    "[2": "h",
    "]2": "i",
    "\u230a2": "j",
    "\u230b2": "k",
    "\u23082": "l",
    "\u23092": "m",
    "{2": "n",
    "}2": "o",
    "\u23221": "\u00a1",
    "\u23222": "\u00b3",
    "\u23224": "\u00c3",
    "\u2322l": "@",
    "\u2322r": "0",
    "~1": "e",
    "\u2194bl": "\u00c7",
    "\u2194l": "\u00cd",
    "\u23de1": "\u00a9",
    "\u23de4": "(",
    "\u23del": ":",
    "\u21bcm": "\u011a",
    "\u21bcl": "\u010e",
    "\u2190m": "\u011a",
    "\u2190l": "\u0118",
    "\u23231": "\u00a2",
    "\u23232": "\u00b4",
    "\u23234": "!",
    "\u2323l": "A",
    "\u2323r": "1",
    "~2": "f",
    "\u2194br": "\u0106",
    "\u2194r": "\u00ce",
    "\u23df1": "\u00aa",
    "\u23df4": ")",
    "\u23dfl": ";",
    "\u21c0m": "\u011a",
    "\u21c0r": "\u0110",
    "\u2192m": "\u011a",
    "\u2192r": "\u00cb",
    "\u23223": "\u00b5",
    "\u2322m": "B",
    "~3": "g",
    "\u2194bm": "?",
    "\u2194m": "\u011a",
    "^1": "b",
    "\u23de3": "\u00bd",
    "\u23der": "8",
    "-m": "\u2014",
    "\u00afm": "\u2014",
    "\u02d81": "\u0139",
    "\u23233": "\u00b6",
    "\u2323m": "C",
    "\u21d0bl": "\u00c4",
    "\u02c71": "\u201c",
    "\u23df3": "\u00be",
    "\u23dfr": "9",
    "\u033fm": "\u0150",
    _m: "\u2122",
    "\u02d82": "\u013a",
    "^2": "c",
    "\u2192br": "\u0106",
    "\u21d0bm": "w",
    "^3": "d",
    "\u23dem": "<",
    "\u02d83": "\u0143",
    "\u02c72": "\u201d",
    "\u2192bm": "?",
    "\u21d2br": "~",
    "\u02c73": "\u2022",
    "\u23dfm": "=",
    "\u21d4br": "\u010c",
    "\u2190bl": "y",
    "\u21d2bm": "w",
    "\u23dec": "\u2018",
    "\u21d4bl": "\u00c9",
    "\u23de2": "n",
    "\u2190bm": "?",
    "\u23dfc": "\u2019",
    "\u21d4bm": "w",
    "\u23df2": "o",
    "\u23223": "\u00b5",
    "\u2322l": "@",
    "\u2322r": "0",
    "\u2322m": "B",
    "\u2323l": "A",
    "\u2323r": "1",
    "\u2323m": "C",
    "\u23de1": "\u00a9",
    "\u23de2": "n",
    "\u23de3": "\u00bd",
    "\u23de4": "(",
    "\u23del": ":",
    "\u23dem": "<",
    "\u23dec": "\u2018",
    "\u23der": "8",
    "\u03bf": "o",
  };
})();
(function () {
  org.imatheq.formulaeditor.presentation.Node = $extend(Object, {
    editor: null,
    parent: null,
    index: null,
    children: [],
    dimensions: null,
    highlight: !1,
    slowDelete: !1,
    onBaseline: !0,
    firstRow: null,
    defCursorPos: null,
    forcedItalic: null,
    autoItalic: null,
    bold: null,
    mathcolor: null,
    in_mathvariant: null,
    in_mathcolor: null,
    initialize: function () {
      this.children = Array.prototype.slice.call(arguments);
      this.updateChildren();
    },
    isEmbellished: function () {
      return 0 < this.children.length && this.children[0].isEmbellished();
    },
    getFontSizeData: function (a, b, d) {
      for (var e = 0; e < this.children.length; e++)
        this.children[e].getFontSizeData(a, b, d);
    },
    getSymbol: function () {
      for (
        var a = this;
        !(a instanceof org.imatheq.formulaeditor.presentation.Symbol) &&
        0 < a.children.length &&
        a.children[0].isEmbellished();

      )
        a = a.getSymbol();
      return a instanceof org.imatheq.formulaeditor.presentation.Symbol
        ? a
        : null;
    },
    getSymbFontAttrbs: function () {
      return {
        bold: this.bold,
        forcedItalic: this.forcedItalic,
        autoItalic: this.autoItalic,
        mathcolor: this.mathcolor,
      };
    },
    setSymbFontAttrbs: function (a) {
      if (
        0 < this.children.length &&
        0 < Object.keys(a).length &&
        a.constructor === Object
      )
        for (var b = 0; b < this.children.length; b++)
          this.children[b].setSymbFontAttrbs(a);
      for (var d in a)
        switch (((b = a[d]), d)) {
          case "bold":
            this.bold = b;
            break;
          case "forcedItalic":
            (this.forcedItalic = b) &&
              void 0 !== a.autoItalic &&
              a.autoItalic &&
              sllert(
                "Error in Node.setSymbFontAttrbs: forceItalic and autoItalic values are conflict"
              );
            break;
          case "autoItalic":
            this.autoItalic = b;
            break;
          case "mathcolor":
            this.mathcolor = b;
            break;
          case "mtext":
            this.setMtext && this.setMtext(b);
        }
    },
    isAncestorOf: function (a) {
      if (null === a.parent || void 0 === a.parent) return !1;
      if (a === this) return !0;
      for (a = a.parent; null !== a && void 0 != a; ) {
        if (a === this) return !0;
        a = a.parent;
      }
      return !1;
    },
    getAncestorOf: function (a) {
      for (; null !== a.parent && a.parent !== this; ) a = a.parent;
      return a.parent === this ? a : null;
    },
    getAncestors: function (a) {
      for (
        var b = [],
          d = null,
          d =
            a == this.children.length
              ? { parent: this, index: a }
              : this.children[a];
        null !== d && void 0 !== d;

      )
        b.push(d), (d = d.parent);
      return b;
    },
    getIndexChain: function (a) {
      indexChain = [];
      indexChain.push(a);
      for (
        a = this;
        null !== a && void 0 !== a && null !== a.index && void 0 !== a.index;

      )
        indexChain.push(a.index), (a = a.parent);
      return indexChain;
    },
    compareIndexChain: function (a, b) {
      for (
        var d = a.length, e = b.length, f = Math.min(d, e), g = 0;
        g < f && a[d - 1 - g] == b[e - 1 - g];

      )
        g++;
      return g == f ? d - e : a[d - 1 - g] - b[e - 1 - g];
    },
    clone: function () {
      var a = function () {};
      a.prototype = Object.getPrototypeOf(this);
      a = new a();
      a.initialize.apply(a, arguments);
      a.bold = this.bold;
      a.forcedItalic = this.forcedItalic;
      a.autoItalic = this.autoItalic;
      a.mathcolor = this.mathcolor;
      for (x in this)
        !Object.prototype.hasOwnProperty.call(this, x) ||
          this[x] instanceof Function ||
          this[x] instanceof Object ||
          (a[x] = this[x]);
      return a;
    },
    copy: function () {
      return this.clone.apply(this, this.copyArray(this.children));
    },
    copyArray: function (a) {
      for (var b = [], d = 0; d < a.length; d++)
        a[d] instanceof Array
          ? b.push(this.copyArray(a[d]))
          : b.push(a[d].copy());
      return b;
    },
    canDelete: function (a) {
      return !this.slowDelete;
    },
    draw: function (a, b, d, e, f) {
      throw Error("abstract method called");
    },
    getMathML: function (a) {
      throw Error("abstract method called");
    },
    onchange: function (a) {
      if (null !== this.parent) this.parent.onchange(this);
    },
    onkeypress: function (a, b) {},
    onmousedown: function (a, b, d, e) {
      return !0;
    },
    flatten: function () {
      for (var a = 0; a < this.children.length; a++)
        this.children[a]
          ? this.children[a].flatten
            ? this.children[a].flatten()
            : alert("no flatten in : " + a + ".")
          : alert("no child at :" + a);
    },
    updateChildren: function (a) {
      if (null === a || void 0 === a) a = 0;
      for (; a < this.children.length; a++)
        this.children[a]
          ? ((this.children[a].parent = this), (this.children[a].index = a))
          : alert("empty child : " + a + ".");
    },
    getCursorPosition: function (a, b, d) {
      return null !== this.parent
        ? b < this.dimensions.left + this.dimensions.width / 2
          ? this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1)
        : null;
    },
    getFirstCursorPosition: function (a, b, d) {
      return null !== this.parent
        ? this.parent.getFirstCursorPosition(a, null, d)
        : null;
    },
    getLastCursorPosition: function (a, b, d) {
      return null !== this.parent
        ? this.parent.getLastCursorPosition(a, null, d)
        : null;
    },
    getFollowingCursorPosition: function (a, b, d) {
      return null;
    },
    getPrecedingCursorPosition: function (a, b) {
      return null;
    },
    getLowerCursorPosition: function (a, b, d, e) {
      var f = org.imatheq.formulaeditor.presentation;
      return null !== this.parent
        ? (null === b || void 0 === b) && this.parent instanceof f.Row
          ? this.index == this.parent.children.length - 1 &&
            Math.abs(this.dimensions.left - d) >
              Math.abs(this.dimensions.left + this.dimensions.width - d)
            ? { row: this.parent, index: this.index + 1 }
            : { row: this.parent, index: this.index }
          : this.parent.getLowerCursorPosition(a, this.index, d, e)
        : null;
    },
    getHigherCursorPosition: function (a, b, d, e) {
      var f = org.imatheq.formulaeditor.presentation;
      return null !== this.parent
        ? (null === b || void 0 === b) && this.parent instanceof f.Row
          ? this.index == this.parent.children.length - 1 &&
            Math.abs(this.dimensions.left - d) >
              Math.abs(this.dimensions.left + this.dimensions.width - d)
            ? { row: this.parent, index: this.index + 1 }
            : { row: this.parent, index: this.index }
          : this.parent.getHigherCursorPosition(a, this.index, d, e)
        : null;
    },
    toString: function () {
      if (this.value) return this.value;
      if (this.children) {
        for (var a = "[ ", b = 0; b < this.children.length; b++)
          (a += this.children[b]), b < this.children.length - 1 && (a += ", ");
        return a + " ]";
      }
    },
    maxDimensions: function (a, b, d) {
      var e = { top: b, left: a, width: 0, height: 0 },
        f,
        g;
      for (a = 0; a < d.length; a++)
        (b = Math.min(e.top, d[a].top)),
          (f = Math.max(e.top + e.height, d[a].top + d[a].height)),
          (g = Math.min(e.left, d[a].left)),
          (e = Math.max(e.left + e.width, d[a].left + d[a].width)),
          (e = { top: b, left: g, width: e - g, height: f - b });
      return e;
    },
    setHighlight: function (a) {
      if (!0 === a || !1 === a) this.highlight = a;
      if (!1 === a && 0 < this.children.length)
        for (a = 0; a < this.children.length; a++)
          this.children[a].setHighlight(!1);
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.Symbol = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      value: null,
      onscreen: null,
      keyword: null,
      lspace: null,
      rspace: null,
      mtext: !1,
      mo: !1,
      mn: !1,
      doubleStruck: !1,
      script: !1,
      fraktur: !1,
      initialize: function () {
        var a = null;
        0 < arguments.length &&
          (arguments[0] instanceof Array
            ? ((this.value = arguments[0][0]),
              1 < arguments[0].length && (this.onscreen = arguments[0][1]))
            : (this.value = arguments[0]),
          (a = org.imatheq.formulaeditor.presentation.SymbolAliases),
          void 0 !== a[this.value] &&
            null !== a[this.value] &&
            (this.value = a[this.value]),
          (a = org.imatheq.formulaeditor.presentation.SymbolOnscreens),
          null === this.onscreen &&
            void 0 !== a[this.value] &&
            null !== a[this.value] &&
            (this.onscreen = a[this.value]));
        13 < arguments.length &&
          null !== arguments[13] &&
          void 0 !== arguments[13] &&
          (this.fraktur = arguments[13]);
        12 < arguments.length &&
          null !== arguments[12] &&
          void 0 !== arguments[12] &&
          (this.script = arguments[12]);
        11 < arguments.length &&
          null !== arguments[11] &&
          void 0 !== arguments[11] &&
          (this.doubleStruck = arguments[11]);
        10 < arguments.length &&
          null !== arguments[10] &&
          void 0 !== arguments[10] &&
          (this.mn = arguments[10]);
        9 < arguments.length &&
          null !== arguments[9] &&
          void 0 !== arguments[9] &&
          (this.mo = arguments[9]);
        8 < arguments.length &&
          null !== arguments[8] &&
          void 0 !== arguments[8] &&
          (this.rspace = arguments[8]);
        7 < arguments.length &&
          null !== arguments[7] &&
          void 0 !== arguments[7] &&
          (this.lspace = arguments[7]);
        6 < arguments.length &&
          null !== arguments[6] &&
          void 0 !== arguments[6] &&
          (this.keyword = arguments[6]);
        this.bold =
          1 < arguments.length
            ? null !== arguments[1] && void 0 !== arguments[1]
              ? arguments[1]
              : !1
            : !1;
        this.mathcolor =
          2 < arguments.length
            ? null !== arguments[2] && void 0 !== arguments[2]
              ? arguments[2]
              : "#000000"
            : "#000000";
        3 < arguments.length &&
          null !== arguments[3] &&
          void 0 !== arguments[3] &&
          (this.mtext = arguments[3]);
        4 < arguments.length &&
          null !== arguments[4] &&
          void 0 !== arguments[4] &&
          (this.forcedItalic = arguments[4]);
        5 < arguments.length &&
          null !== arguments[5] &&
          void 0 !== arguments[5] &&
          ((this.autoItalic = arguments[5]),
          "auto" == this.autoItalic &&
            ((a = org.imatheq.formulaeditor.FormulaEditor.getEditor()),
            null == a
              ? alert("Error symbol.initialize: failed to get editor")
              : ((this.autoItalic = a.isAutoItalic()),
                this.autoItalic || (this.forcedItalic = !0))),
          this.autoItalic && (this.forcedItalic = !1));
        if (0 < arguments.length) {
          a = org.imatheq.formulaeditor.FormulaEditor.getEditor();
          if (null === this.autoItalic || void 0 === this.autoItalic)
            this.autoItalic =
              null !== a && void 0 !== a
                ? a.isAutoItalic()
                : new org.imatheq.formulaeditor.Options().getOption(
                    "defAutoItalic"
                  );
          if (null === this.forcedItalic || void 0 === this.forcedItalic)
            this.forcedItalic =
              null !== a && void 0 !== a ? a.isForcedItalic() : !1;
          if (null === this.bold || void 0 === this.bold)
            this.bold = null !== a && void 0 !== a ? a.isBold() : !1;
        }
      },
      isSymbolAutoItalic: function () {
        var a = !0,
          b = org.imatheq.formulaeditor.presentation.SymbolOnscreens,
          d = this.value;
        if (this.mo || this.mn || this.mtext) return !1;
        null === this.onscreen &&
          void 0 !== b[d] &&
          null !== b[d] &&
          (d = b[d]);
        if (
          null !== this.keyword ||
          ("0" <= d && "9" >= d) ||
          void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[d] ||
          -1 !=
            org.imatheq.formulaeditor.parsing.expression.NonItalicMiList.indexOf(
              d
            ) ||
          void 0 !== org.imatheq.formulaeditor.parsing.expression.RevList[d]
        )
          a = !1;
        return a;
      },
      getItalicValue: function () {
        return this.autoItalic
          ? this.isSymbolAutoItalic(this.value)
          : this.forcedItalic;
      },
      getStyleString: function (a) {
        var b = "",
          b = a
            ? null != this.keyword
              ? this.forcedItalic
                ? this.bold
                  ? "bold-italic"
                  : "italic"
                : this.bold
                ? "bold"
                : ""
              : this.bold
              ? "bold"
              : ""
            : this.bold
            ? this.autoItalic
              ? "bold" + (this.isSymbolAutoItalic(this.value) ? "-italic" : "")
              : "bold" + (this.forcedItalic ? "-italic" : "")
            : this.forcedItalic
            ? ""
            : this.autoItalic
            ? ""
            : "normal";
        "" != b && (b = ' mathvariant="' + b + '"');
        "#000000" != this.mathcolor &&
          (b += ' mathcolor="' + this.mathcolor + '"');
        return b;
      },
      hasSameStyle: function (a, b) {
        var d = !0;
        if (
          this.mtext != a.mtext ||
          this.mo != a.mo ||
          this.mn != a.mn ||
          this.doubleStruck != a.doubleStruck ||
          this.script != a.script ||
          this.fraktur != a.fraktur
        )
          return !1;
        (null !== this.bold && null !== a.bold) ||
          alert("Error in hasSameStyle: bold is null");
        this.bold != a.bold && (d = !1);
        (null !== this.mathcolor && null !== a.mathcolor) ||
          alert("Error in hasSameStyle: mathcolor is null");
        this.mathcolor != a.mathcolor && (d = !1);
        var e =
            org.imatheq.formulaeditor.parsing.expression.RevList[this.value],
          f = org.imatheq.formulaeditor.parsing.expression.RevList[a.value];
        if (
          (void 0 === e && void 0 !== e) ||
          (void 0 !== e && void 0 === e) ||
          (void 0 !== e && void 0 !== f && e.type != f.type)
        )
          d = !1;
        if (
          (null === this.keyword && null !== a.keyword) ||
          (null !== this.keyword && null === a.keyword) ||
          (null !== this.keyword &&
            null !== a.keyword &&
            this.keyword != a.keyword)
        )
          d = !1;
        if (
          null === this.forcedItalic ||
          null === this.autoItalic ||
          null === a.forcedItalic ||
          null === a.autoItalic
        )
          alert("Error in hasSameStyle: some italic para is null.");
        else {
          if (this.forcedItalic != a.forcedItalic) return !1;
          b && this.autoItalic != a.autoItalic && (d = !1);
        }
        return d;
      },
      getEncodedStr: function () {
        var a = this.value,
          b = "",
          d = function (a) {
            return 128 < a.charCodeAt()
              ? "&#x" + a.charCodeAt().toString(16) + ";"
              : " " == a
              ? "&#xA0;"
              : a
                  .replace(/&/g, "&amp;")
                  .replace(/>/g, "&gt;")
                  .replace(/</g, "&lt;")
                  .replace(/"/g, "&quot;");
          },
          e = org.imatheq.formulaeditor.parsing.expression.RevList[a];
        if (void 0 === e) b = d(a);
        else {
          if (this.doubleStruck || this.script || this.fraktur) return e.key;
          this.bold &&
            ("script" == e.type
              ? (a =
                  org.imatheq.formulaeditor.parsing.expression.ScriptBoldList[
                    e.key
                  ])
              : "fraktur" == e.type &&
                (a =
                  org.imatheq.formulaeditor.parsing.expression.FrakturBoldList[
                    e.key
                  ]));
          b = d(a);
          if (2 == a.length)
            if ("double-struck" == e.type)
              b = "&#x1D5" + d(a[1]).toUpperCase().slice(5);
            else if ("script" == e.type || "bold-script" == e.type)
              (b = d(a[1]).toUpperCase().slice(5)),
                (b = ("9C" > b ? "&#x1D5" : "&#x1D4") + b);
            else if ("fraktur" == e.type || "bold-fraktur" == e.type)
              b = "&#x1D5" + d(a[1]).toUpperCase().slice(5);
        }
        return b;
      },
      isEmbellished: function () {
        return (
          void 0 !==
          org.imatheq.formulaeditor.parsing.expression.MOList[this.value]
        );
      },
      setMtext: function (a) {
        this.mtext = a;
      },
      copy: function () {
        return this.clone(
          null !== this.onscreen ? [this.value, this.onscreen] : this.value,
          this.bold,
          this.mathcolor,
          this.mtext,
          this.forcedItalic,
          this.autoItalic,
          this.keyword,
          this.lspace,
          this.rspace,
          this.mo,
          this.mn,
          this.doubleStruck,
          this.script,
          this.fraktur
        );
      },
      getFontSizeData: function (a, b, d, e) {
        var f = !1;
        if (
          (null !== e && void 0 !== e && e) ||
          -1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(g)
        )
          f = !0;
        var g = this.value;
        f ||
          null === this.onscreen ||
          -1 !=
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              g
            ) ||
          (g = this.onscreen);
        e = 0;
        void 0 !== b.fontSizeModifier &&
          null !== b.fontSizeModifier &&
          (e = b.fontSizeModifier);
        b = this.getItalicValue();
        f && (b = !1);
        var h = null !== this.bold && void 0 !== this.bold ? this.bold : !1;
        f && (h = !1);
        f = a.canvas.getFontInfo(g, e, b, h);
        if (
          f.hasDimensions &&
          ((a = f.fontSizeGroup),
          (f = f.bmpSize),
          (g = org.imatheq.formulaeditor.MathCanvas.fontsByPosition),
          null === g[a] ||
            void 0 === g[a] ||
            null === g[a][f] ||
            void 0 === g[a][f])
        ) {
          if (null === d[a] || void 0 === d[a]) d[a] = {};
          if (null === d[a][f] || void 0 === d[a][f]) d[a][f] = "";
        }
      },
      draw: function (a, b, d, e, f, g) {
        var h = org.imatheq.formulaeditor.presentation,
          l = this.value;
        null !== this.onscreen &&
          -1 ==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              l
            ) &&
          (l = this.onscreen);
        var m = g;
        if (void 0 === g || null === g) m = { lspace: 0, rspace: 0 };
        g = 0;
        void 0 !== b.fontSizeModifier &&
          null !== b.fontSizeModifier &&
          (g = b.fontSizeModifier);
        var t = this.getItalicValue();
        this.parent instanceof h.Row &&
          0 < this.index &&
          this.parent.children[this.index - 1] instanceof h.Symbol &&
          a.getFontSizeIdx(b.fontSizeModifier);
        a = a.drawSymbol(
          l,
          Math.round(d + 0 + m.lspace),
          Math.round(e),
          f,
          t,
          this.bold,
          this.mathcolor,
          g
        );
        return (this.dimensions = {
          left: d + 0,
          top: a.top,
          width: a.width + m.lspace + m.rspace,
          height: a.height,
        });
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Subsup = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      onBaseline: !1,
      margin: 1,
      mtype: "msubsup",
      msubtype: "",
      initialize: function () {
        this.children = [];
        if (0 < arguments.length) {
          this.mtype = arguments[0];
          var a = arguments[1];
          null !== a && void 0 !== a && this.children.push(a);
          a = arguments[2];
          null !== a && void 0 !== a && this.children.push(a);
        }
        this.updateChildren();
      },
      getFontSizeData: function (a, b, d) {
        var e = null,
          f = null;
        "msubsup" == this.mtype
          ? ((f = this.children[0]), (e = this.children[1]))
          : "msub" == this.mtype
          ? (e = this.children[0])
          : (f = this.children[0]);
        var g = { fontSizeModifier: 0 },
          h;
        for (h in b) g[h] = b[h];
        --g.fontSizeModifier;
        null !== f && f.getFontSizeData(a, g, d);
        null !== e && e.getFontSizeData(a, g, d);
      },
      draw: function (a, b, d, e, f, g) {
        var h = null,
          l = null;
        "msubsup" == this.mtype
          ? ((l = this.children[0]), (h = this.children[1]))
          : "msub" == this.mtype
          ? (h = this.children[0])
          : (l = this.children[0]);
        var m,
          t = org.imatheq.formulaeditor.presentation,
          k = { fontSizeModifier: 0 },
          n;
        for (n in b) k[n] = b[n];
        --k.fontSizeModifier;
        b = 0;
        if (this.parent instanceof t.Row)
          for (
            b = this.index - 1,
              0 <= b && (m = this.parent.children[b].dimensions);
            0 < b && !0 !== this.parent.children[b].onBaseline;

          )
            b--;
        0 <= b
          ? ((t = this.parent.children[b].dimensions),
            (m = {
              left: m.left,
              top: t.top,
              width: m.width,
              height: t.height,
            }))
          : ((m = a.getXDimentions(k, d, e)), (m.left = d - m.width));
        t =
          null !== h && void 0 !== h
            ? h.draw(a, k, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        b =
          null !== l && void 0 !== l
            ? l.draw(a, k, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        n = a.getXDimentions(k, d, e);
        var p = Math.round((m.height + n.height) / 2) - 2 * this.margin;
        e = d = p - Math.round(n.height / 2);
        t.height < p && (d = t.height - Math.round(n.height / 2));
        b.height < p && (e = b.height - Math.round(n.height / 2));
        var r;
        n = 0;
        var p = null,
          q = m.left + m.width;
        null !== h &&
          void 0 !== h &&
          ((p = m.top + m.height + t.height - d),
          (r = p - t.height),
          (n = t.width),
          (r = Math.min(r, m.top)));
        null !== l &&
          void 0 !== l &&
          ((r = m.top - b.height + e),
          null === p && (p = r + b.height),
          (n = Math.max(n, b.width)),
          (p = Math.max(p, m.top + m.height)));
        this.dimensions = {
          left: q,
          top: Math.min(r, m.top),
          width: n + g.rspace,
          height: p - r,
        };
        if (!1 === f || null === f || void 0 === f)
          null !== h &&
            void 0 !== h &&
            h.draw(a, k, m.left + m.width, m.top + m.height - t.top - d, f),
            null !== l &&
              void 0 !== l &&
              l.draw(a, k, m.left + m.width, m.top - (b.height + b.top) + e, f);
        return this.dimensions;
      },
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var e = this.children[0].dimensions;
            return d < (e.top + e.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(a, b, d)
              : this.children[1].getCursorPosition(a, b, d);
          }
          return this.children[0].getCursorPosition(a, b, d);
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : 0 == b && !0 === a.continuingNavigation && 2 == this.children.length
          ? this.children[1].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? d
            ? { row: this.parent, index: this.index + 1 }
            : this.parent.getFollowingCursorPosition(a, this.index, d)
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation && 2 == this.children.length) {
          if (null === b || void 0 === b)
            return this.children[1].getPrecedingCursorPosition(a, null, d);
          if (1 == b)
            return this.children[0].getPrecedingCursorPosition(a, null, d);
        }
        return null === b || void 0 === b
          ? this.children[0].getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? d
            ? { row: this.parent, index: this.index }
            : this.parent.getPrecedingCursorPosition(a, this.index, d)
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : 0 === b && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[1].getHigherCursorPosition(a, null, d, e)
          : 1 == b
          ? this.children[0].getHigherCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, e)
          : null;
      },
      copy: function () {
        var a = null,
          b = null;
        "msubsup" == this.mtype
          ? ((b = this.children[0].copy()), (a = this.children[1].copy()))
          : "msub" == this.mtype
          ? (a = this.children[0].copy())
          : (b = this.children[0].copy());
        return this.clone(this.mtype, a, b);
      },
      getMathML: function (a) {
        var b = "";
        "msubsup" == this.mtype
          ? (b =
              this.children[1].getMathML(!0) + this.children[0].getMathML(!0))
          : "msub" == this.mtype
          ? ((b = this.children[0].getMathML(!0)), a && (b += "<none>"))
          : (b = this.children[0].getMathML(!0));
        return b;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.LargeOpSubsup = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      onBaseline: !1,
      margin: 1,
      mtype: "msubsup",
      base: null,
      sub: null,
      sup: null,
      initialize: function () {
        this.children = [];
        0 < arguments.length &&
          ((this.mtype = arguments[0]),
          (this.base = arguments[1]),
          (this.sup = arguments[2]),
          null !== this.sup &&
            void 0 !== this.sup &&
            this.children.push(this.sup),
          (this.sub = arguments[3]),
          null !== this.sub &&
            void 0 !== this.sub &&
            this.children.push(this.sub));
        this.updateChildren();
      },
      getFontSizeData: function (a, b, d) {
        var e = { fontSizeModifier: 0 },
          f;
        for (f in b) e[f] = b[f];
        --e.fontSizeModifier;
        null !== this.sup && this.sup.getFontSizeData(a, e, d);
        null !== this.sub && this.sub.getFontSizeData(a, e, d);
        this.base.getFontSizeData(a, b, d);
      },
      setSymbFontAttrbs: function (a) {
        this.base.setSymbFontAttrbs(a);
        arguments.callee.parent.setSymbFontAttrbs.call(this, a);
      },
      draw: function (a, b, d, e, f) {
        var g = { fontSizeModifier: 0 },
          h;
        for (h in b) g[h] = b[h];
        --g.fontSizeModifier;
        this.base.draw(a, b, 0, 0, !0);
        var l;
        h =
          null !== this.sub && void 0 !== this.sub
            ? this.sub.draw(a, g, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        l =
          null !== this.sup && void 0 !== this.sup
            ? this.sup.draw(a, g, 0, 0, !0)
            : { left: 0, top: 0, width: 0, height: 0 };
        var m = 0;
        this.base.dimensions.bottomindent &&
          (m = -this.base.dimensions.bottomindent);
        e = a.getXDimentions(g, d, e);
        var t =
            Math.round((this.base.dimensions.height + e.height) / 2) -
            2 * this.margin,
          k = t - Math.round(e.height / 2),
          n = k;
        h.height < t && (k = h.height - Math.round(e.height / 2));
        l.height < t && (n = l.height - Math.round(e.height / 2));
        e = e.top + Math.round(0.4 * e.height - 0.5);
        t =
          -Math.round(this.base.dimensions.height / 2) -
          this.base.dimensions.top;
        this.dimensions = {
          left: d,
          top: e - (l.height - n) - Math.round(this.base.dimensions.height / 2),
          width:
            this.base.dimensions.width +
            this.margin +
            Math.max(h.width + m, l.width),
          height: this.base.dimensions.height + l.height + h.height - k - n,
        };
        if (!1 === f || null === f || void 0 === f)
          this.base.draw(a, b, d, e + t, f),
            null !== this.sub &&
              void 0 !== this.sub &&
              this.sub.draw(
                a,
                g,
                this.base.dimensions.left +
                  this.base.dimensions.width +
                  m +
                  this.margin,
                this.base.dimensions.top +
                  this.base.dimensions.height -
                  h.top -
                  k,
                f
              ),
            null !== this.sup &&
              void 0 !== this.sup &&
              this.sup.draw(
                a,
                g,
                this.base.dimensions.left +
                  this.base.dimensions.width +
                  this.margin,
                this.dimensions.top - l.top,
                f
              );
        return this.dimensions;
      },
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var e = this.children[0].dimensions;
            return d < (e.top + e.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(a, b, d)
              : this.children[1].getCursorPosition(a, b, d);
          }
          return this.children[0].getCursorPosition(a, b, d);
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : 0 === b && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[1].getHigherCursorPosition(a, null, d, e)
          : 1 == b
          ? this.children[0].getHigherCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, e)
          : null;
      },
      getMathML: function () {
        var a =
          "<" +
          this.mtype +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          "><mo>" +
          this.base.getEncodedStr() +
          "</mo>";
        if ("msub" == this.mtype || "msubsup" == this.mtype)
          a += this.sub.getMathML(!0);
        if ("msup" == this.mtype || "msubsup" == this.mtype)
          a += this.sup.getMathML(!0);
        return (a += "</" + this.mtype + ">");
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.base.copy(),
          this.sup.copy(),
          this.sub.copy()
        );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PreSubsup = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      onBaseline: !1,
      margin: 1,
      getFontSizeData: function (a, b, d) {
        var e = null,
          f = null,
          f = this.children[0],
          e = this.children[1],
          g = { fontSizeModifier: 0 },
          h;
        for (h in b) g[h] = b[h];
        --g.fontSizeModifier;
        null !== f && f.getFontSizeData(a, g, d);
        null !== e && e.getFontSizeData(a, g, d);
      },
      draw: function (a, b, d, e, f, g) {
        var h = this.children[1],
          l = this.children[0],
          m = org.imatheq.formulaeditor.presentation,
          t = { fontSizeModifier: 0 },
          k;
        for (k in b) t[k] = b[k];
        --t.fontSizeModifier;
        k = null;
        var n, p;
        if (this.parent instanceof m.Row) {
          k = this.index + 1;
          for (
            k < this.parent.children.length &&
            (n = this.parent.children[k].draw(a, b, d, e, !0));
            k < this.parent.children.length &&
            !0 !== this.parent.children[k].onBaseline;

          )
            k++;
          k >= this.parent.children.length && (k = null);
        }
        null !== k
          ? ((p = this.parent.children[k].draw(a, b, d, e, !0)),
            (b = {
              left: n.left,
              top: p.top,
              width: n.width,
              height: p.height,
            }))
          : ((b = a.getXDimentions(t, d, e)), (b.left = d - b.width));
        m =
          null !== h && void 0 !== h
            ? h.draw(a, t, 0, 0, !0)
            : { left: 0, top: p.top, width: 0, height: 0 };
        n =
          null !== l && void 0 !== l
            ? l.draw(a, t, 0, 0, !0)
            : { left: 0, top: p.top + p.height, width: 0, height: 0 };
        var r = a.getXDimentions(t, d, e),
          q = Math.round((b.height + r.height) / 2) - 2 * this.margin;
        k = e = q - Math.round(r.height / 2);
        m.height < q && (e = m.height - Math.round(r.height / 2));
        n.height < q && (k = n.height - Math.round(r.height / 2));
        var q = Math.max(m.width, n.width),
          r = q - m.width,
          q = q - n.width,
          u,
          v;
        u =
          null !== h && void 0 !== h
            ? h.draw(a, t, d + r, b.top + b.height - m.top - e, !0)
            : { left: d + r, top: p.top, width: 0, height: 0 };
        v =
          null !== l && void 0 !== l
            ? l.draw(a, t, d + q, b.top - (n.height + n.top) + k, !0)
            : { left: d + q, top: p.top + p.height, width: 0, height: 0 };
        p = Math.min(u.left, v.left);
        var y = Math.min(b.top, v.top);
        v = Math.max(u.left + u.width, v.left + v.width);
        u = Math.max(b.top + b.height, u.top + u.height);
        this.dimensions = {
          left: p,
          top: y,
          width: v - p + g.lspace + g.rspace,
          height: u - y,
        };
        if (!1 === f || null === f || void 0 === f)
          null !== h &&
            void 0 !== h &&
            h.draw(a, t, d + r + g.lspace, b.top + b.height - m.top - e, f),
            null !== l &&
              void 0 !== l &&
              l.draw(a, t, d + q + g.lspace, b.top - (n.height + n.top) + k, f);
        return this.dimensions;
      },
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          var e = this.children[0].dimensions;
          return d < (e.top + e.height + this.children[1].dimensions.top) / 2
            ? this.children[0].getCursorPosition(a, b, d)
            : this.children[1].getCursorPosition(a, b, d);
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : 0 == b && !0 === a.continuingNavigation && 2 == this.children.length
          ? this.children[1].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation && 2 == this.children.length) {
          if (null === b || void 0 === b)
            return this.children[1].getPrecedingCursorPosition(a, null, d);
          if (1 == b)
            return this.children[0].getPrecedingCursorPosition(a, null, d);
        }
        return null === b || void 0 === b
          ? this.children[0].getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : 0 === b
          ? this.children[1].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[1].getHigherCursorPosition(a, null, d, e)
          : 1 == b
          ? this.children[0].getHigherCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, e)
          : null;
      },
      getMathML: function () {
        var a =
          null === this.children[1] || void 0 === this.children[1]
            ? "<none>"
            : this.children[1].getMathML(!0);
        return (a +=
          null === this.children[0] || void 0 === this.children[0]
            ? "<none>"
            : this.children[0].getMathML(!0));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.BlockSymbol = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      initialize: function () {
        this.value = "\u25a1";
        this.onscreen = "c";
        0 < arguments.length &&
          null !== arguments[0] &&
          void 0 != arguments[0] &&
          (this.onscreen = arguments[0]);
        1 < arguments.length
          ? arguments.callee.parent.initialize.call(
              this,
              this.value,
              arguments[1],
              arguments[2],
              arguments[3],
              arguments[4],
              arguments[5]
            )
          : arguments.callee.parent.initialize.call(this, this.value);
      },
      copy: function () {
        return this.clone(this.onscreen);
      },
      draw: function (a, b, d, e, f) {
        var g = 0;
        void 0 !== b.fontSizeModifier &&
          null !== b.fontSizeModifier &&
          (g = b.fontSizeModifier);
        b = a.readonly ? !0 : f;
        return (this.dimensions = a.drawcBox(
          Math.round(d),
          Math.round(e),
          b,
          this.onscreen,
          !0,
          !1,
          this.mathcolor,
          g
        ));
      },
      isEmbellished: function () {
        return !1;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.NewlineSymbol = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      initialize: function () {
        this.value = "\n";
        this.onscreen = 1 == arguments.length ? arguments[0] : "a";
      },
      copy: function () {
        return this.clone(this.onscreen);
      },
      setMtext: function (a) {
        this.mtext = !1;
      },
      draw: function (a, b, d, e, f) {
        return (this.dimensions = new org.imatheq.formulaeditor.presentation.Space(
          "0.2em",
          "0.5em",
          "0.1em",
          " "
        ).draw(a, b, d, e, !0));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Space = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      width: 0,
      height: 0,
      depth: 0,
      initialize: function () {
        var a = org.imatheq.formulaeditor.FormulaEditor.getEditor().canvas;
        0 < arguments.length && (this.width = a.getEMSize(arguments[0]));
        1 < arguments.length && (this.height = a.getEMSize(arguments[1]));
        2 < arguments.length && (this.depth = a.getEMSize(arguments[2]));
        3 < arguments.length && (this.value = arguments[3]);
        4 < arguments.length && (this.mtext = arguments[4]);
        arguments.callee.parent.initialize.call(this, this.value);
      },
      copy: function () {
        return this.clone(
          this.width + "em",
          this.height + "em",
          this.depth + "em",
          this.value,
          this.mtext
        );
      },
      setMtext: function (a) {
        this.mtext = 0 <= this.width ? a : !1;
      },
      getFontSizeData: function (a, b, d) {},
      draw: function (a, b, d, e, f) {
        f = 0;
        void 0 !== b.fontSizeModifier &&
          null !== b.fontSizeModifier &&
          (f = b.fontSizeModifier);
        b = Math.round(this.width * a.getFontUnitEm(f));
        var g = Math.round(this.height * a.getFontUnitEm(f)),
          h = Math.round(this.depth * a.getFontUnitEm(f));
        this.dimensions = a.drawFBox(
          Math.round(d),
          Math.round(e),
          !0,
          "x",
          !1,
          !1,
          "#000000",
          f
        );
        this.dimensions.top =
          this.dimensions.top + this.dimensions.height - g + h;
        this.dimensions.height = g - h;
        this.dimensions.width = 0 < b ? b : 0;
        this.dimensions.left =
          0 < b ? this.dimensions.left : this.dimensions.left + b;
        return this.dimensions;
      },
      getMathML: function () {
        return this.mtext && 0 < this.width && 0.4 > this.width
          ? "&#x200A;"
          : this.mtext && 0.4 <= this.width
          ? "&#x2007;"
          : null !== this.value
          ? "<mo>" + this.getEncodedStr() + "</mo>"
          : '<mspace width="' +
            this.width +
            'em" height="' +
            this.height +
            'em" depth="' +
            this.depth +
            'em"/>';
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Row = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      isAnswer: !1,
      margin: 2,
      inputType: null,
      keywordIdx: 0,
      initialize: function () {
        var a = org.imatheq.formulaeditor.presentation.BlockSymbol,
          b;
        if (1 == arguments.length && "string" == typeof arguments[0]) {
          var a = arguments[0],
            d = [];
          for (b = 0; b < a.length; b++) d.push(this.newSymbol(a.charAt(b)));
        } else
          for (
            d = Array.prototype.slice.call(arguments),
              0 === d.length && ((d = []), d.push(null)),
              b = 0;
            b < d.length;
            b++
          )
            if (null === d[b] || void 0 === d[b]) d[b] = new a();
        arguments.callee.parent.initialize.apply(this, d);
      },
      getBracketedAncestor: function (a) {
        a = this.getAncestors(position.index);
        for (
          var b = 0;
          b < a.length && !(a[b] instanceof presentation.Bracketed);

        )
          b++;
        b == a.length &&
          console.log("updateBracket: error cannot find Bracketed parent.");
      },
      getFontSizeData: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        new e.Symbol("x", !1, null, null, !0, !1).getFontSizeData(a, b, d);
        new e.Symbol("x", !1, null, null, !1, !1).getFontSizeData(a, b, d);
        new e.Symbol("x", !0, null, null, !0, !1).getFontSizeData(a, b, d);
        new e.Symbol("x", !0, null, null, !1, !1).getFontSizeData(a, b, d);
        new e.Symbol("c", !1, null, null, !0).getFontSizeData(a, b, d);
        arguments.callee.parent.getFontSizeData.call(this, a, b, d);
      },
      curindex: 0,
      getMathML: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        if (
          0 == this.children.length ||
          (1 == this.children.length &&
            this.children[0] instanceof e.BlockSymbol)
        )
          return "<mrow/>";
        this.curindex = null === b || void 0 === b ? 0 : b;
        b = null === d || void 0 === d ? this.children.length : d;
        d = "";
        var f = 0,
          g = "",
          h = "";
        for (
          0 < b &&
          this.children[b - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          b--;
          this.curindex < b;

        ) {
          h = this.children[this.curindex];
          if (h instanceof e.PreSubsup) {
            for (
              var l = "", m = "", t = "";
              this.curindex < b && h instanceof e.PreSubsup;

            )
              (l += h.getMathML()), (h = this.children[++this.curindex]);
            for (
              t =
                this.curindex < b && !(h instanceof e.Subsup)
                  ? this.getSubMathML(b)
                  : "<mrow/>";
              this.curindex < b && h instanceof e.Subsup;

            )
              (m += h.getMathML(!0)), (h = this.children[++this.curindex]);
            h = "<mmultiscripts>";
            "" == l
              ? ((h += g + m), (g = ""))
              : (h += t + m + "<mprescripts/>" + l);
            h += "</mmultiscripts>";
          } else
            h instanceof e.Subsup
              ? ((m = ""),
                (m += h.getMathML(!1)),
                (h = "<" + h.mtype + ">" + g + m + "</" + h.mtype + ">"),
                (g = ""),
                this.curindex++)
              : (h = this.getSubMathML(b));
          d += g;
          g = h;
          f++;
        }
        d += g;
        1 < f && a && (d = "<mrow>" + d + "</mrow>");
        return d;
      },
      getSubMathML: function (a) {
        var b = org.imatheq.formulaeditor.presentation,
          d = function (a) {
            var b = a.length;
            arrDot = a.split(".");
            2 < arrDot.length && (b = arrDot[0].length + arrDot[1].length + 1);
            1 < arrDot.length &&
              -1 != arrDot[1].indexOf(",") &&
              (b = arrDot[0].length + arrDot[1].indexOf(",") + 1);
            arrComma = arrDot[0].split(",");
            len1 = arrComma[0].length;
            for (a = 1; a < arrComma.length; a++) {
              if (3 != arrComma[a].length) {
                b = len1;
                break;
              }
              len1 += 4;
            }
            return b;
          },
          e = function (a) {
            var b = "";
            a.doubleStruck
              ? (b = "double-struck")
              : a.script
              ? (b = (a.bold ? "bold-" : "") + "script")
              : a.fraktur
              ? (b = (a.bold ? "bold-" : "") + "fraktur")
              : a.isSymbolAutoItalic()
              ? a.bold
                ? (b = a.forcedItalic
                    ? "bold-italic"
                    : a.autoItalic
                    ? "bold-italic"
                    : "bold")
                : a.forcedItalic || a.autoItalic || (b = "normal")
              : (b = a.forcedItalic
                  ? a.bold
                    ? "bold-italic"
                    : "italic"
                  : a.bold
                  ? "bold"
                  : "");
            "" != b && (b = ' mathvariant="' + b + '"');
            return (b +=
              null === a.mathcolor ||
              "" == a.mathcolor ||
              "null" == a.mathcolor ||
              "#000000" == a.mathcolor
                ? ""
                : ' mathcolor="' + a.mathcolor + '"');
          },
          f = "";
        child = this.children[this.curindex];
        if (child instanceof b.BlockSymbol) (f = "<mrow/>"), this.curindex++;
        else if ("string" == typeof child.value) {
          e(child);
          var b = child.keyword,
            g = null !== child.mtext && void 0 !== child.mtext && child.mtext,
            h = child.value;
          void 0 === b && (b = null);
          var l = b;
          null !== b &&
            0 < b.indexOf("_") &&
            (l = b.slice(0, child.keyword.indexOf("_")));
          if (g) {
            f += "<mtext" + e(child) + ">" + child.getEncodedStr();
            for (
              this.curindex++;
              this.curindex < a &&
              ("string" == typeof this.children[this.curindex].value ||
                (this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space &&
                  0 < this.children[this.curindex].width)) &&
              child.hasSameStyle(this.children[this.curindex], !1);

            )
              f =
                this.children[this.curindex] instanceof
                org.imatheq.formulaeditor.presentation.Space
                  ? f + this.children[this.curindex++].getMathML()
                  : f + this.children[this.curindex++].getEncodedStr();
            f += "</mtext>";
          } else if (child.mn && null !== b && 0 == b.indexOf(h)) {
            for (var d = "", g = this.curindex, m = 0; m < l.length; m++)
              if (
                ((h = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof this.children[this.curindex].value &&
                  h == b.charAt(m) &&
                  this.children[this.curindex].mn &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                d =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? d + this.children[this.curindex++].getMathML()
                    : d + this.children[this.curindex++].getEncodedStr();
              else {
                for (
                  iKeyword = g;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == b;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mn = !1),
                    iKeyword++;
                b = null;
                this.curindex = g;
                break;
              }
            this.curindex != g && (f += "<mn" + e(child) + ">" + d + "</mn>");
          } else if (child.mo && null !== b && 0 == b.indexOf(h)) {
            d = "";
            g = this.curindex;
            for (m = 0; m < l.length; m++)
              if (
                ((h = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof this.children[this.curindex].value &&
                  h == b.charAt(m) &&
                  this.children[this.curindex].mo &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                d =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? d + this.children[this.curindex++].getMathML()
                    : d + this.children[this.curindex++].getEncodedStr();
              else {
                for (
                  iKeyword = g;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == b;

                )
                  (this.children[iKeyword].keyword = null),
                    (this.children[iKeyword].mo = !1),
                    iKeyword++;
                b = null;
                this.curindex = g;
                break;
              }
            this.curindex != g &&
              (f +=
                "<mo" +
                e(child) +
                (null !== child.in_attrs && void 0 !== child.in_attrs
                  ? child.in_attrs
                  : "") +
                ">" +
                d +
                "</mo>");
          } else if ("0" <= h && "9" >= h) {
            f += "<mn" + e(child) + ">";
            e = h;
            for (
              g = this.curindex + 1;
              g < a &&
              "string" == typeof this.children[g].value &&
              (("0" <= this.children[g] && "9" >= this.children[g]) ||
                "." == this.children[g] ||
                "," == this.children[g]) &&
              child.hasSameStyle(this.children[g], !1);

            )
              e += this.children[g++];
            a = d(e);
            f += e.slice(0, a);
            this.curindex += a;
            f += "</mn>";
          } else if (
            void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[h]
          )
            (f +=
              "<mo" +
              e(child) +
              (null !== child.in_attrs && void 0 !== child.in_attrs
                ? child.in_attrs
                : "") +
              ">" +
              child.getEncodedStr(h) +
              "</mo>"),
              this.curindex++;
          else if (
            void 0 !== org.imatheq.formulaeditor.parsing.expression.RevList[h]
          ) {
            for (
              d = child.getEncodedStr();
              ++this.curindex < a &&
              "string" == typeof this.children[this.curindex].value &&
              child.hasSameStyle(this.children[this.curindex], !1);

            )
              d += this.children[this.curindex].getEncodedStr();
            f += "<mi" + e(child) + ">" + d + "</mi>";
          } else if (
            null === child.keyword ||
            0 != b.indexOf(h) ||
            (child.bold && !child.forcedItalic && child.autoItalic)
          )
            if (
              (null !== child.keyword ||
                child.bold ||
                child.forcedItalic ||
                child.autoItalic) &&
              (null !== child.keyword ||
                child.bold ||
                child.forcedItalic ||
                child.autoItalic)
            )
              (f += "<mi" + e(child) + ">" + child.getEncodedStr(h) + "</mi>"),
                this.curindex++;
            else {
              f += "<mi" + e(child) + ">" + child.getEncodedStr();
              this.curindex++;
              for (
                h =
                  this.curindex < a ? this.children[this.curindex].value : null;
                this.curindex < a &&
                "string" == typeof this.children[this.curindex].value &&
                void 0 ===
                  org.imatheq.formulaeditor.parsing.expression.MOList[h] &&
                ("0" > h || "9" < h) &&
                child.hasSameStyle(this.children[this.curindex], !0);

              )
                f += this.children[this.curindex++].getEncodedStr();
              f += "</mi>";
            }
          else {
            d = "";
            g = this.curindex;
            for (m = 0; m < l.length; m++)
              if (
                ((h = this.children[this.curindex].value),
                this.curindex < a &&
                  "string" == typeof this.children[this.curindex].value &&
                  h == b.charAt(m) &&
                  child.hasSameStyle(this.children[this.curindex], !1))
              )
                d =
                  this.children[this.curindex] instanceof
                  org.imatheq.formulaeditor.presentation.Space
                    ? d + this.children[this.curindex++].getMathML()
                    : d + this.children[this.curindex++].getEncodedStr();
              else {
                for (
                  iKeyword = g;
                  null !== this.children[iKeyword].keyword &&
                  this.children[iKeyword].keyword == b;

                )
                  (this.children[iKeyword].keyword = null), iKeyword++;
                b = null;
                this.curindex = g;
                break;
              }
            this.curindex != g && (f += "<mi" + e(child) + ">" + d + "</mi>");
          }
        } else (f += child.getMathML()), this.curindex++;
        return f;
      },
      isSpaceLike: function (a) {
        var b = org.imatheq.formulaeditor.presentation;
        return a instanceof b.Space || a instanceof b.NewlineSymbol;
      },
      isEmbellished: function () {
        if (0 == this.children.length) return !1;
        for (
          var a = 0;
          a < this.children.length && this.isSpaceLike(this.children[a]);

        )
          a++;
        if (a == this.children.length || !this.isSpaceLike(this.children[a]))
          return !1;
        for (
          var b = this.children.length - 1;
          b > a && this.isSpaceLike(this.children[a]);

        )
          b--;
        return a == b && this.isSpaceLike(this.children[a]) ? !0 : !1;
      },
      getSymbol: function () {
        if (!this.isEmbellished()) return null;
        for (
          var a = 0;
          a < this.children.length && this.isSpaceLike(this.children[a]);

        )
          a++;
        return this.children[a];
      },
      getMOSpaces: function (a, b, d) {
        var e = org.imatheq.formulaeditor.parsing.expression.MOList[b.value],
          f = null;
        if (null !== b.lspace || null !== b.rspace)
          return {
            lspace: null !== b.lspace ? a.getPXSize(b.lspace) : 0,
            rspace: null !== b.rspace ? a.getPXSize(b.rspace) : 0,
          };
        if (void 0 !== e[d] && null !== e[d])
          f = {
            lspace:
              null !== b.lspace ? b.lspace : a.getPXSize(e[d].ls / 18 + "em"),
            rspace:
              null !== b.rspace ? b.rspace : a.getPXSize(e[d].rs / 18 + "em"),
          };
        else {
          b = 0;
          for (var g, f = 0; 3 > f; f++)
            null !== e[f] && void 0 !== e[f] && ((g = f), b++);
          f =
            1 == b
              ? {
                  lspace: a.getPXSize(e[g].ls / 18 + "em"),
                  rspace: a.getPXSize(e[g].rs / 18 + "em"),
                }
              : 2 == d && void 0 !== e[1] && null !== e[1]
              ? { lspace: a.getPXSize(e[1].ls / 18 + "em"), rspace: 0 }
              : 0 == d && void 0 !== e[1] && null !== e[1]
              ? { lspace: 0, rspace: a.getPXSize(e[1].rs / 18 + "em") }
              : {
                  lspace: 0 == d ? 0 : a.getPXSize("0.28em"),
                  rspace: 2 == d ? 0 : a.getPXSize("0.28em"),
                };
        }
        return f;
      },
      draw: function (a, b, d, e, f) {
        var g = org.imatheq.formulaeditor.presentation;
        if (0 < this.children.length) {
          for (
            var h = d,
              l = e,
              m = d,
              t = e,
              k = null,
              n = 0,
              p = !1,
              r = !1,
              q = this.children[0].getMathvariant
                ? this.children[0].getMathvariant()
                : null,
              u = this.children[0].mathcolor,
              v = null,
              y = null,
              w = null,
              z = null,
              A = !1,
              C = !1,
              D =
                8 <
                org.imatheq.formulaeditor.FormulaEditor.getEditor().canvas.getFontSizeIdx(
                  D
                )
                  ? 2
                  : 1,
              B = 0;
            B < this.children.length;
            B++
          )
            this.isSpaceLike(this.children[B]) ||
              (null === k && (k = B), (n = B));
          for (B = 0; B < this.children.length; B++) {
            var E = this.children[B],
              F = null !== E.mtext && void 0 !== E.mtext && E.mtext,
              G = {
                lspace:
                  null === E.lspace || void 0 === E.lspace
                    ? 0
                    : a.getPXSize(E.lspace),
                rspace:
                  null === E.rspace || void 0 === E.rspace
                    ? 0
                    : a.getPXSize(E.rspace),
              },
              H = E.getMathvariant ? E.getMathvariant() : null,
              A =
                (null === v && F) ||
                (null !== v && (q !== H || u !== E.mathcolor)),
              C = !1;
            F && B == this.children.length - 1
              ? (C = !0)
              : F &&
                ((C = this.children[B + 1].getMathvariant
                  ? this.children[B + 1].getMathvariant()
                  : null),
                (C =
                  !this.children[B + 1].mtext ||
                  H !== C ||
                  E.mathcolor !== this.children[B + 1].mathcolor));
            if (F) G = { lspace: A ? D : 0, rspace: C ? D : 0 };
            else if (k != n && B >= k && B <= n)
              if (r) (r = !1), (G = { lspace: 0, rspace: nextRspace });
              else if (E.isEmbellished()) {
                u = 0;
                B > k && B < n ? (u = 1) : B == n && (u = 2);
                q = E.getSymbol();
                if (null === q || void 0 === q)
                  throw Error(
                    "Error failed to find operator in embellished node"
                  );
                G = this.getMOSpaces(a, q, u);
                B < n &&
                  this.children[B + 1] instanceof g.Subsup &&
                  ((p = !0), (nextRspace = G.rspace), (G.rspace = 0));
              } else if (p) (G.rspace = nextRspace), (nextRspace = 0), (p = !1);
              else if (
                E instanceof g.PreSubsup &&
                B < n &&
                this.children[B + 1].isEmbellished()
              ) {
                u = 0;
                B + 1 > k && B + 1 < n ? (u = 1) : B + 1 == n && (u = 2);
                q = this.children[B + 1].getSymbol();
                if (null === q || void 0 === q)
                  throw Error(
                    "Error failed to find operator in embellished node"
                  );
                G = this.getMOSpaces(a, q, u);
                r = !0;
                nextRspace = G.rspace;
                G.rspace = 0;
              }
            u = E.draw(a, b, m, e, f, G);
            h = Math.min(h, u.left);
            l = Math.min(l, u.top);
            d = Math.max(d, u.left + u.width);
            m = u.left + u.width;
            t = Math.max(t, u.top + u.height);
            A
              ? ((v = u.left),
                (y = u.top),
                (w = u.left + u.width),
                (z = u.top + u.height))
              : F &&
                ((v = Math.min(v, u.left)),
                (y = Math.min(y, u.top)),
                (w = Math.max(w, u.left + u.width)),
                (z = Math.max(z, u.top + u.height)));
            C &&
              ((mt_dimensions = {
                left: v + D,
                top: y,
                width: w - v - D,
                height: z - y + 2 * D,
              }),
              f || a.drawBox(mt_dimensions, "#99ebff"),
              (z = w = y = v = null));
            q = this.children[B].getMathvariant
              ? this.children[B].getMathvariant()
              : null;
            u = E.mathcolor;
          }
          this.dimensions = { left: h, top: l, width: d - h, height: t - l };
        } else {
          var D = 0;
          void 0 !== b.fontSizeModifier &&
            null !== b.fontSizeModifier &&
            (D = b.fontSizeModifier);
          this.dimensions = a.drawFBox(d, e, !0, null, !1, !1, u, D);
        }
        return this.dimensions;
      },
      getSelectedArea: function (a, b) {
        for (var d = null, e = a; e < b; e++)
          if (e < this.children.length)
            var f = this.children[e],
              d =
                e == a
                  ? {
                      top: f.dimensions.top,
                      left: f.dimensions.left,
                      width: f.dimensions.width,
                      height: f.dimensions.height,
                    }
                  : {
                      top: Math.min(d.top, f.dimensions.top),
                      left: Math.min(d.left, f.dimensions.left),
                      width:
                        Math.max(
                          d.left + d.width,
                          f.dimensions.left + f.dimensions.width
                        ) - Math.min(d.left, f.dimensions.left),
                      height:
                        Math.max(
                          d.top + d.height,
                          f.dimensions.top + f.dimensions.height
                        ) - Math.min(d.top, f.dimensions.top),
                    };
        1 == b - a &&
          this.children[a] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol &&
          (d = {
            top: this.dimensions.top,
            left: d.left,
            width: d.width,
            height: this.dimensions.height,
          });
        return d;
      },
      newSymbol: function (a, b, d, e, f, g) {
        var h = org.imatheq.formulaeditor.presentation;
        return " " == a || "\u00a0" == a
          ? new h.Space("0.4em", "0.5em", "0.1em", a)
          : new h.Symbol(a, b, d, e, f, g);
      },
      onkeydown: function (a, b) {
        return !0;
      },
      backDelete: function (a) {
        var b = org.imatheq.formulaeditor.presentation,
          d = { row: a.cursor.position.row, index: a.cursor.position.index },
          e = a.getButtonStatus();
        if (0 < d.index)
          if (this.children[d.index - 1].canDelete(a)) {
            var f = this.children.length - d.index,
              g = this.remove(d.index - 1),
              h = this.getIndexChain(d.index),
              l = this.getIndexChain(d.index - 1);
            d.index--;
            if (this.isEmpty()) {
              var m = g.children[0];
              (this.parent instanceof b.Lines && 0 != this.index) ||
                ((b = new b.BlockSymbol(
                  null,
                  m.bold,
                  m.mathcolor,
                  null,
                  m.forcedItalic,
                  m.autoItalic
                )),
                this.insert(0, b));
            }
            a.cursor.setPosition(d);
            a.actions.addAction("delete", d, h, l, g, null, f, null, null, e);
            a.redraw();
          } else
            (e = { row: d.row, index: d.index - 1 }),
              (f = { row: d.row, index: d.index }),
              (g = d.row.getIndexChain(d.index - 1)),
              (h = d.row.getIndexChain(d.index)),
              a.selection.setSelection({
                parent: this,
                startPosition: e,
                endPosition: f,
                startIndex: d.index - 1,
                endIndex: d.index,
                startIndexChain: g,
                endIndexChain: h,
                dimensions: this.children[d.index - 1].dimensions,
              });
      },
      foreDelete: function (a) {
        var b = { row: a.cursor.position.row, index: a.cursor.position.index },
          d = a.getButtonStatus();
        if (b.index < this.children.length)
          if (this.children[b.index].canDelete(a)) {
            var e = this.remove(b.index),
              f = this.getIndexChain(b.index),
              g = this.getIndexChain(b.index);
            this.isEmpty() && this.insert(0);
            a.cursor.setPosition(b);
            a.actions.addAction(
              "delete",
              b,
              f,
              g,
              e,
              null,
              this.children.length - b.index,
              null,
              null,
              d
            );
            a.redraw();
          } else
            (d = { row: b.row, index: b.index }),
              (e = { row: b.row, index: b.index + 1 }),
              (f = b.row.getIndexChain(b.index)),
              (g = b.row.getIndexChain(b.index + 1)),
              a.selection.setSelection({
                parent: this,
                startPosition: d,
                endPosition: e,
                startIndex: b.index,
                endIndex: b.index + 1,
                startIndexChain: f,
                endIndexChain: g,
                dimensions: this.children[b.index].dimensions,
              });
      },
      onkeypress: function (a, b) {
        if (!a.altKey && !a.ctrlKey) {
          var d = String.fromCharCode(a.charCode);
          return 13 == a.charCode ? !1 : this.charInput(d, b);
        }
        return !0;
      },
      charInput: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = null,
          f = b.getButtonStatus(),
          g = org.imatheq.formulaeditor.presentation.BlockSymbol,
          h = { row: b.cursor.position.row, index: b.cursor.position.index },
          l = h.row.getIndexChain(h.index),
          m,
          t = b.selection,
          k = "insert";
        t.hasSelection
          ? ((e = t.getSelectionCopy()),
            (h.row = t.parent),
            (g = t.startIndex),
            (k = t.endIndex),
            0 < k && this.children[k - 1] instanceof d.NewlineSymbol && k--,
            this.updateKeyword(b, g),
            this.updateKeyword(b, k),
            (d = this.children.length - k),
            k > g && (m = this.remove(g, k)),
            t.clear(),
            (k = "update"),
            (h.index = g))
          : (this.updateKeyword(b, h.index),
            (d = this.children.length - h.index),
            0 <= h.index - 1 && this.children[h.index - 1] instanceof g
              ? (h.index--, (m = this.remove(h.index)), (k = "update"))
              : this.children[h.index] instanceof g
              ? ((m = this.remove(h.index)), d--, (k = "update"))
              : (m = null));
        null != m &&
          ((t = m.children[m.children.length - 1]),
          (f.bold = t.bold),
          (f.mathcolor = t.mathcolor),
          (f.forcedItalic = t.forcedItalic),
          (f.autoItalic = t.autoItalic),
          (f.mtext = t.mtext));
        t = this.insert(
          h.index,
          this.newSymbol(
            a,
            f.bold,
            f.mathcolor,
            f.mtext,
            f.forcedItalic,
            f.autoItalic
          )
        );
        b.cursor.setPosition(h);
        t && b.cursor.moveRight(!1);
        t = b.cursor.position.row.getIndexChain(b.cursor.position.index);
        b.actions.addAction(k, h, l, t, m, null, d, e, null, f, f);
        this.convertKeyword(b);
        return !1;
      },
      updateKeyword: function (a, b, d, e, f) {
        d = org.imatheq.formulaeditor.presentation;
        new org.imatheq.formulaeditor.Options();
        if (
          0 < b &&
          b < this.children.length &&
          "string" == typeof this.children[b].value &&
          "string" == typeof this.children[b - 1].value &&
          null !== this.children[b].keyword &&
          this.children[b - 1].keyword == this.children[b].keyword
        ) {
          for (
            var g = b, h = this.children[b].keyword;
            g < this.children.length &&
            "string" == typeof this.children[g].value &&
            this.children[g].keyword == h;

          )
            g++;
          for (
            var l = g, g = b - 1;
            0 <= g &&
            "string" == typeof this.children[g].value &&
            this.children[g].keyword == h;

          )
            g--;
          var g = g + 1,
            m = [];
          h.slice(h.indexOf("_") + 1);
          for (h = g; h < l; h++)
            m.push(this.children[h].copy()),
              (this.children[h].keyword = null),
              (this.children[h].mo = !1),
              (this.children[h].mn = !1);
          l = this.children.length - l;
          d = new d.Row();
          d.initialize.apply(d, m);
          g = { row: this, index: g };
          b = this.getIndexChain(b);
          m = a.getButtonStatus();
          a.actions.addAction("update", g, b, b, d, null, l, e, f, m, null);
          a.redraw(!0);
        }
      },
      convertKeyword: function (a) {
        var b = org.imatheq.formulaeditor.presentation,
          d = a.cursor.position.index,
          e = a.cursor.position.row;
        if (1 < d) {
          var f = d - 1,
            g = e.children[f],
            h = "",
            l = g;
          for (
            hasKeyword = !1;
            0 <= f &&
            7 >= d - f &&
            "string" == typeof g.value &&
            l.hasSameStyle(g);

          ) {
            if (null !== g.keyword) {
              var m = g.keyword.slice(0, g.keyword.indexOf("_")),
                t = m.length;
              if (7 < d - f - 1 + t) break;
              else (hasKeyword = !0), (h = m + h), (f -= t);
            } else (h = g.value + h), f--;
            0 <= f && (g = e.children[f]);
          }
          g = f + 1;
          for (
            f = 0;
            f < h.length - 1 &&
            ((str1 = h.slice(f, h.length)),
            void 0 ===
              org.imatheq.formulaeditor.parsing.expression.KeywordList[str1]);

          )
            f++;
          g += f;
          if (f < h.length - 1) {
            for (f = l = 0; f < this.children.length; f++)
              null !== this.children[f].keyword &&
                void 0 !== this.children[f].keyword &&
                ((m = parseInt(
                  this.children[f].keyword.slice(
                    this.children[f].keyword.indexOf("_") + 1
                  )
                )),
                (l = Math.max(l, m)));
            f = this.children.length - d;
            b = new b.Row();
            m = [];
            for (t = g; t < d; t++)
              m.push(e.children[t].copy()),
                (e.children[t].keyword = h + "_" + (l + 1));
            b.initialize.apply(b, m);
            h = { row: e, index: g };
            d = e.getIndexChain(d);
            e = a.getButtonStatus();
            a.actions.addAction(
              "setSymbFontAttrbs",
              h,
              d,
              d,
              b,
              null,
              f,
              null,
              null,
              e,
              null
            );
          }
        }
        a.redraw(!0);
      },
      flatten: function () {
        var a = org.imatheq.formulaeditor.presentation.Row;
        arguments.callee.parent.flatten.apply(this);
        for (var b = this.children, d = 0; d < b.length; d++) {
          var e = b[d];
          e instanceof a && b.splice.apply(b, [d, 1].concat(e.children));
        }
        this.updateChildren();
      },
      getCursorPosition: function (a, b, d) {
        for (var e = this.children.length, f = 0; f < e; f++) {
          var g = this.children[f].dimensions;
          if (b < g.left + g.width || f == e - 1)
            return this.children[f].getCursorPosition(a, b, d);
        }
        return { row: this, index: 0 };
      },
      getFirstCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        return null === b || void 0 === b || 0 < b
          ? this.getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getFirstCursorPosition(a, null, d)
          : null;
      },
      getLastCursorPosition: function (a, b, d) {
        return null === b || void 0 === b || b < this.children.length
          ? this.getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getLastCursorPosition(a, null, d)
          : null;
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return null === this.parent && null !== this.children[0]
            ? this.children[0].getFollowingCursorPosition(a, null, d)
            : { row: this, index: 0 };
        if (b < this.children.length) {
          var e = null;
          d && (e = this.children[b].getFollowingCursorPosition(a, null, d));
          null === e && (e = { row: this, index: b + 1 });
          return e;
        }
        return null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, d)
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b) {
          if (0 == this.children.length)
            throw Error(
              "Error in Row.getPrecedingCursorPosition: children length is 0."
            );
          return this.children[this.children.length - 1] instanceof
            org.imatheq.formulaeditor.presentation.NewlineSymbol
            ? { row: this, index: this.children.length - 1 }
            : { row: this, index: this.children.length };
        }
        if (0 < b) {
          var e = null;
          d &&
            (e = this.children[b - 1].getPrecedingCursorPosition(a, null, d));
          null === e && (e = { row: this, index: b - 1 });
          return e;
        }
        return null !== this.parent
          ? this.parent.getPrecedingCursorPosition(a, this.index, d)
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        if (null === b || void 0 === b) {
          if (0 == this.children.length) return { row: this, index: 0 };
          b = null;
          for (var f = 0, g = 0; g <= this.children.length; g++) {
            var h;
            g < this.children.length
              ? (h = this.children[g].dimensions.left)
              : 0 < this.children.length
              ? ((h = this.children[this.children.length - 1].dimensions),
                (h = h.left + h.width))
              : (h = this.dimensions.left);
            h = Math.abs(h - d);
            if (null === b || h < b) (b = h), (f = g);
          }
          if (e) {
            if (
              f < this.children.length &&
              null !== this.children[f] &&
              void 0 !== this.children[f]
            )
              return this.children[f].getLowerCursorPosition(a, null, d, e);
            if (
              0 < f &&
              f == this.children.length &&
              null !== this.children[f - 1] &&
              void 0 !== this.children[f - 1]
            )
              return this.children[f - 1].getLowerCursorPosition(a, null, d, e);
          } else return { row: this, index: f };
        } else return this.parent.getLowerCursorPosition(a, this.index, d, e);
      },
      getHigherCursorPosition: function (a, b, d, e) {
        if (null === b || void 0 === b) {
          b = null;
          for (var f = 0, g = 0; g <= this.children.length; g++) {
            var h;
            g < this.children.length
              ? (h = this.children[g].dimensions.left)
              : 0 < this.children.length
              ? ((h = this.children[this.children.length - 1].dimensions),
                (h = h.left + h.width))
              : (h = this.dimensions.left);
            h = Math.abs(h - d);
            if (null === b || h < b) (b = h), (f = g);
          }
          if (e) {
            if (
              f < this.children.length &&
              null !== this.children[f] &&
              void 0 !== this.children[f]
            )
              return this.children[f].getHigherCursorPosition(a, null, d, e);
            if (
              0 < f &&
              f == this.children.length &&
              null !== this.children[f - 1] &&
              void 0 !== this.children[f - 1]
            )
              return this.children[f - 1].getHigherCursorPosition(
                a,
                null,
                d,
                e
              );
          } else return { row: this, index: f };
        } else return this.parent.getHigherCursorPosition(a, this.index, d, e);
      },
      isEmpty: function () {
        return 0 === this.children.length;
      },
      insert: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation.BlockSymbol,
          f = a,
          g = !0;
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b) b = new e();
        d && a <= this.children.length && this.children[a] instanceof e
          ? this.children.splice(a, 1, b)
          : d && 0 <= a - 1 && this.children[a - 1] instanceof e
          ? (this.children.splice(a - 1, 1, b), (f = a - 1), (g = !1))
          : this.children.splice(f, 0, b);
        this.updateChildren(f);
        return g;
      },
      replace: function (a, b) {
        this.children.splice(a, 1, b);
        this.updateChildren(a);
      },
      remove: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation,
          f = b;
        if (null === b || void 0 === b) f = a + 1;
        b = new e.Row();
        b.initialize.apply(b, this.children.splice(a, f - a));
        0 == this.children.length &&
          null !== d &&
          void 0 !== d &&
          d &&
          ((d = b.children[b.children.length - 1]),
          (e = new e.BlockSymbol(
            null,
            d.bold,
            null,
            null,
            d.forcedItalic,
            d.autoItalic
          )),
          this.children.splice(0, 0, e));
        this.updateChildren(a);
        return b;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Bracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      leftBracket: null,
      rightBracket: null,
      separator: null,
      slowDelete: !0,
      symmetric: null,
      isMO: !1,
      margin: 2,
      initialize: function () {
        if (0 < arguments.length) {
          this.leftBracket = arguments[0];
          var a = arguments[1];
          this.rightBracket = arguments[2];
          this.children = [];
          this.children.push(a);
          3 < arguments.length && (this.mathcolor = arguments[3]);
        } else this.children = [];
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            b = this.functionsFromRow.length - 1;
          0 <= b;
          b--
        )
          this[this.functionsFromRow[b]] ||
            (this[this.functionsFromRow[b]] = a[this.functionsFromRow[b]]);
        this.updateChildren();
      },
      draw: function (a, b, d, e, f) {
        var g, h;
        g = this.getSymmetric();
        h = a.getXDimentions(b, 0, 0);
        baseline = h.top + Math.round(0.4 * h.height);
        7 > a.getFontSizeIdx(b.fontSizeModifier) && (this.margin = 1);
        h = this.children[0];
        h.draw(a, b, 0, 0, !0);
        var l = Math.max(
            h.dimensions.top < baseline ? baseline - h.dimensions.top : 0,
            h.dimensions.top + h.dimensions.height > baseline
              ? h.dimensions.top + h.dimensions.height - baseline
              : 0
          ),
          m = g ? baseline - l : h.dimensions.top,
          t = g ? 2 * l : h.dimensions.height;
        g = g ? 2 * l + 2 * this.margin : h.dimensions.height + 2 * this.margin;
        this.leftBracket.minimumHeight = g;
        this.rightBracket.minimumHeight = g;
        "" != this.leftBracket.value && this.leftBracket.draw(a, b, 0, 0, !0);
        "" != this.rightBracket.value && this.rightBracket.draw(a, b, 0, 0, !0);
        "" == this.leftBracket.value && "" == this.rightBracket.value
          ? ((this.leftBracket.dimensions = {
              top: m,
              left: h.dimensions.left,
              width: 0,
              height: t,
            }),
            (this.rightBracket.dimensions = {
              top: m,
              left: h.dimensions.left + h.dimensions.width,
              width: 0,
              height: t,
            }))
          : "" == this.leftBracket.value
          ? (this.leftBracket.dimensions = {
              top: this.rightBracket.dimensions.top,
              left: h.dimensions.left,
              width: 0,
              height: this.rightBracket.dimensions.height,
            })
          : "" == this.rightBracket.value &&
            (this.rightBracket.dimensions = {
              top: this.leftBracket.dimensions.top,
              left: h.dimensions.left + h.dimensions.width,
              width: 0,
              height: this.leftBracket.dimensions.height,
            });
        g = Math.max(
          this.leftBracket.dimensions.height,
          t,
          this.rightBracket.dimensions.height
        );
        var l = this.leftBracket.value,
          k = this.rightBracket.value;
        if (
          "\u27e8" == l ||
          "\u2329" == l ||
          "<" == l ||
          "\u2308" == l ||
          "\u230a" == l
        )
          (this.leftBracket.minimumHeight = g),
            this.leftBracket.draw(a, b, 0, 0, !0);
        if (
          "\u27e9" == k ||
          "\u2329" == k ||
          ">" == k ||
          "\u2309" == k ||
          "\u230b" == k
        )
          (this.rightBracket.minimumHeight = g),
            this.rightBracket.draw(a, b, 0, 0, !0);
        var n = (k = l = 0);
        g > t && (l = (g - t) / 2);
        this.leftBracket.dimensions.height < g &&
          (k = (g - this.leftBracket.dimensions.height) / 2);
        this.rightBracket.dimensions.height < g &&
          (n = (g - this.rightBracket.dimensions.height) / 2);
        this.dimensions = {
          height: g,
          width:
            this.leftBracket.dimensions.width +
            h.dimensions.width +
            this.rightBracket.dimensions.width +
            2 * this.margin +
            2,
          left: d,
          top: e + m - l,
        };
        if (!1 === f || null === f || void 0 === f)
          "" != this.leftBracket.value &&
            this.leftBracket.draw(
              a,
              b,
              d + 1 - this.leftBracket.dimensions.left,
              this.dimensions.top + k - this.leftBracket.dimensions.top,
              f
            ),
            h.draw(
              a,
              b,
              d +
                1 +
                this.leftBracket.dimensions.width -
                h.dimensions.left +
                this.margin,
              e,
              f
            ),
            "" != this.rightBracket.value &&
              this.rightBracket.draw(
                a,
                b,
                d +
                  1 +
                  this.leftBracket.dimensions.width +
                  h.dimensions.width -
                  this.rightBracket.dimensions.left +
                  2 * this.margin,
                this.dimensions.top + n - this.rightBracket.dimensions.top,
                f
              );
        return this.dimensions;
      },
      getFontSizeData: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        if ("" != this.leftBracket.value) {
          var f = this.leftBracket.onscreen
            ? this.leftBracket.onscreen
            : this.leftBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new e.Symbol(f).getFontSizeData(a, b, d, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new e.Symbol(f + "1").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new e.Symbol(f + "m").getFontSizeData(a, b, d, !0);
        }
        "" != this.rightBracket.value &&
          ((f = this.rightBracket.onscreen
            ? this.rightBracket.onscreen
            : this.rightBracket.value),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new e.Symbol(f).getFontSizeData(a, b, d, !0),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new e.Symbol(f + "1").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new e.Symbol(f + "m").getFontSizeData(a, b, d, !0));
        arguments.callee.parent.getFontSizeData.call(this, a, b, d);
      },
      setSymbFontAttrbs: function (a) {
        this.leftBracket.setSymbFontAttrbs(a);
        this.rightBracket.setSymbFontAttrbs(a);
        arguments.callee.parent.setSymbFontAttrbs.call(this, a);
        this.isMO = !1;
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (a, b, d) {
        var e;
        if (
          "" != this.leftBracket.value &&
          ((e = this.leftBracket.dimensions),
          b < e.left + Math.floor(e.width / 2))
        )
          return null !== this.parent
            ? { row: this.parent, index: this.index }
            : null;
        e = this.children[0].dimensions;
        return b < e.left + e.width
          ? this.children[0].getCursorPosition(a, b, d)
          : "" != this.rightBracket.value &&
            ((e = this.rightBracket.dimensions),
            b < e.left + Math.floor(e.width / 2))
          ? { row: this.children[0], index: this.children[0].children.length }
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : this.getPrecedingCursorPosition(a);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, !1)
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return this.children[0].getPrecedingCursorPosition(a, null, d);
        var e = null;
        1 == b &&
          d &&
          (e = this.children[0].getPrecedingCursorPosition(a, null, d));
        return null === e && null !== this.parent
          ? this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : e;
      },
      copy: function () {
        return this.clone(
          this.leftBracket.copy(),
          this.children[0].copy(),
          this.rightBracket.copy()
        );
      },
      getMathML: function () {
        var a, b;
        this.isMO
          ? ((a = this.leftBracket.getMathML() + "<mrow>"),
            (b = "</mrow>" + this.rightBracket.getMathML()))
          : ((a =
              "<mfenced" +
              ("(" == this.leftBracket.value
                ? ""
                : " open='" + this.leftBracket.getEncodedStr() + "'") +
              (")" == this.rightBracket.value
                ? ""
                : " close='" + this.rightBracket.getEncodedStr() + "'") +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              "><mrow>"),
            (b = "</mrow></mfenced>"),
            null != this.symmetric &&
              ((a = '<mstyle symmetric="' + this.symmetric + '">' + a),
              (b += "</mstyle>")));
        for (var d = 0; d < this.children.length; d++)
          a += this.children[d].getMathML();
        return a + b;
      },
      getSymmetric: function () {
        var a = new org.imatheq.formulaeditor.Options().getOption(
          "defSymmetric"
        );
        return null === this.symmetric ? a : this.symmetric;
      },
      setSymmetric: function (a) {
        this.symmetric = a;
      },
      updateEditTabButtons: function (a) {
        a = document.getElementById("BRACKETS_SYMMETRIC_ON");
        var b = document.getElementById("BRACKETS_SYMMETRIC_OFF");
        this.getSymmetric()
          ? (a.classList.add("efmase_palettebutton_select"),
            b.classList.remove("efmase_palettebutton_select"))
          : (a.classList.remove("efmase_palettebutton_select"),
            b.classList.add("efmase_palettebutton_select"));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Bracket = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      value: null,
      onscreen: null,
      minimumHeight: 1,
      initialize: function () {
        0 < arguments.length && (this.value = arguments[0]);
        1 < arguments.length &&
          null !== arguments[1] &&
          void 0 !== arguments[1] &&
          (this.mathcolor = arguments[1]);
        2 < arguments.length &&
          null !== arguments[2] &&
          void 0 !== arguments[2] &&
          (this.minimumHeight = arguments[2]);
        3 < arguments.length && (this.onscreen = arguments[3]);
      },
      copy: function () {
        return this.clone(this.value, this.minimumHeight, this.onscreen);
      },
      draw: function (a, b, d, e, f) {
        var g = this.value;
        null !== this.onscreen && (g = this.onscreen);
        return (this.dimensions =
          "\u27e8" == g ||
          "\u2329" == g ||
          "<" == g ||
          "\u27e9" == g ||
          "\u232a" == g ||
          ">" == g
            ? a.drawAngleBracket(
                b,
                g,
                Math.round(d),
                Math.round(e),
                this.minimumHeight,
                f,
                null,
                this.mathcolor
              )
            : "\u2308" == g || "\u230a" == g || "\u2309" == g || "\u230b" == g
            ? a.drawCeilingFloorBracket(
                b,
                g,
                Math.round(d),
                Math.round(e),
                this.minimumHeight,
                f,
                null,
                this.mathcolor
              )
            : a.drawBracket(
                b,
                g,
                Math.round(d),
                Math.round(e),
                this.minimumHeight,
                f,
                null,
                this.mathcolor
              ));
      },
      getMathML: function () {
        var a = "<mo",
          b;
        for (b in this)
          Object.prototype.hasOwnProperty.call(this, b) &&
            "mo_" == b.substring(0, 3) &&
            (a += " " + b.substring(3) + '="' + this[b] + '"');
        return (a += ">" + this.value + "</mo>");
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.VerticalBracket = $extend(
    org.imatheq.formulaeditor.presentation.Symbol,
    {
      value: null,
      onscreen: null,
      minimumWidth: 1,
      fullWidth: 1,
      accent: !0,
      initialize: function () {
        0 < arguments.length && (this.value = arguments[0]);
        1 < arguments.length &&
          null !== arguments[1] &&
          (this.minimumWidth = arguments[1]);
        2 < arguments.length && (this.onscreen = arguments[2]);
        3 < arguments.length &&
          null !== arguments[3] &&
          (this.accent = arguments[3]);
        4 < arguments.length && (this.mathcolor = arguments[4]);
      },
      copy: function () {
        return this.clone(
          this.value,
          this.minimumWidth,
          this.onscreen,
          this.accent
        );
      },
      getFontSizeData: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        new e.Symbol("(1").getFontSizeData(a, b, d, !0);
        new e.Symbol("~1").getFontSizeData(a, b, d, !0);
      },
      draw: function (a, b, d, e, f) {
        var g = this.value;
        null !== this.onscreen && (g = this.onscreen);
        return (this.dimensions = a.drawVerticalBracket(
          g,
          Math.round(d),
          Math.round(e),
          this.minimumWidth,
          this.fullWidth,
          f,
          this.mathcolor,
          b.fontSizeModifier,
          this.accent
        ));
      },
    }
  );
})();
$package("org.imatheq.formulaeditor.parsing.expression");
(function () {
  org.imatheq.formulaeditor.parsing.expression.KeywordList = {};
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.OperatorList = {};
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.BracketList =
    "()[]{}||\u27e8\u27e9\u2308\u2309\u230a\u230b\u2225\u2225";
  org.imatheq.formulaeditor.parsing.expression.VertBracketList =
    "_\u23de\u23df\u2322\u2323\u02d8^\u02c7-\u00af\u033f~\u21c0\u21bc\u02d9\u00a8\u2026`\u00b4\u2192\u2190\u2194\u21d2\u21d0\u21d4\u03a3\u220f\u2210\u22c3\u22c2\u22c1\u22c0\u222b\u222d\u222c\u222e\u222f\u2230";
  org.imatheq.formulaeditor.parsing.expression.MidVertBracketList =
    "\u21c0\u21bc\u02d9\u00a8\u2026\u2192\u2190\u2194\u21d2\u21d0\u21d4";
  org.imatheq.formulaeditor.parsing.expression.LargeopList =
    "\u2211\u220f\u2210\u22c3\u22c2\u22c1\u22c0\u222b\u222d\u222c\u222e\u222f\u2230";
  org.imatheq.formulaeditor.parsing.expression.DoubleStruckList = {
    C: "\u2102",
    H: "\u210d",
    N: "\u2115",
    P: "\u2119",
    Q: "\u211a",
    R: "\u211d",
    Z: "\u2124",
  };
  org.imatheq.formulaeditor.parsing.expression.DoubleStruckList = {
    A: "\ud835\udd38",
    B: "\ud835\udd39",
    C: "\u2102",
    D: "\ud835\udd3b",
    E: "\ud835\udd3c",
    F: "\ud835\udd3d",
    G: "\ud835\udd3e",
    H: "\u210d",
    I: "\ud835\udd40",
    J: "\ud835\udd41",
    K: "\ud835\udd42",
    L: "\ud835\udd43",
    M: "\ud835\udd44",
    N: "\u2115",
    O: "\ud835\udd46",
    P: "\u2119",
    Q: "\u211a",
    R: "\u211d",
    S: "\ud835\udd4a",
    T: "\ud835\udd4b",
    U: "\ud835\udd4c",
    V: "\ud835\udd4d",
    W: "\ud835\udd4e",
    X: "\ud835\udd4f",
    Y: "\ud835\udd50",
    Z: "\u2124",
  };
  org.imatheq.formulaeditor.parsing.expression.ScriptList = {
    A: "\ud835\udc9c",
    B: "\u212c",
    C: "\ud835\udc9e",
    D: "\ud835\udc9f",
    E: "\u2130",
    F: "\u2131",
    G: "\ud835\udca2",
    H: "\u210b",
    I: "\u2110",
    J: "\ud835\udca5",
    K: "\ud835\udca6",
    L: "\u2112",
    M: "\u2133",
    N: "\ud835\udca9",
    O: "\ud835\udcaa",
    P: "\ud835\udcab",
    Q: "\ud835\udcac",
    R: "\u211b",
    S: "\ud835\udcae",
    T: "\ud835\udcaf",
    U: "\ud835\udcb0",
    V: "\ud835\udcb1",
    W: "\ud835\udcb2",
    X: "\ud835\udcb3",
    Y: "\ud835\udcb4",
    Z: "\ud835\udcb5",
    a: "\ud835\udcb6",
    b: "\ud835\udcb7",
    c: "\ud835\udcb8",
    d: "\ud835\udcb9",
    e: "\u212f",
    f: "\ud835\udcbb",
    g: "\u210a",
    h: "\ud835\udcbd",
    i: "\ud835\udcbe",
    j: "\ud835\udcbf",
    k: "\ud835\udcc0",
    l: "\ud835\udcc1",
    m: "\ud835\udcc2",
    n: "\ud835\udcc3",
    o: "\u2134",
    p: "\ud835\udcc5",
    q: "\ud835\udcc6",
    r: "\ud835\udcc7",
    s: "\ud835\udcc8",
    t: "\ud835\udcc9",
    u: "\ud835\udcca",
    v: "\ud835\udccb",
    w: "\ud835\udccc",
    x: "\ud835\udccd",
    y: "\ud835\udcce",
    z: "\ud835\udccf",
  };
  org.imatheq.formulaeditor.parsing.expression.ScriptBoldList = {
    A: "\ud835\udcd0",
    B: "\ud835\udcd1",
    C: "\ud835\udcd2",
    D: "\ud835\udcd3",
    E: "\ud835\udcd4",
    F: "\ud835\udcd5",
    G: "\ud835\udcd6",
    H: "\ud835\udcd7",
    I: "\ud835\udcd8",
    J: "\ud835\udcd9",
    K: "\ud835\udcda",
    L: "\ud835\udcdb",
    M: "\ud835\udcdc",
    N: "\ud835\udcdd",
    O: "\ud835\udcde",
    P: "\ud835\udcdf",
    Q: "\ud835\udce0",
    R: "\ud835\udce1",
    S: "\ud835\udce2",
    T: "\ud835\udce3",
    U: "\ud835\udce4",
    V: "\ud835\udce5",
    W: "\ud835\udce6",
    X: "\ud835\udce7",
    Y: "\ud835\udce8",
    Z: "\ud835\udce9",
    a: "\ud835\udcea",
    b: "\ud835\udceb",
    c: "\ud835\udcec",
    d: "\ud835\udced",
    e: "\ud835\udcee",
    f: "\ud835\udcef",
    g: "\ud835\udcf0",
    h: "\ud835\udcf1",
    i: "\ud835\udcf2",
    j: "\ud835\udcf3",
    k: "\ud835\udcf4",
    l: "\ud835\udcf5",
    m: "\ud835\udcf6",
    n: "\ud835\udcf7",
    o: "\ud835\udcf8",
    p: "\ud835\udcf9",
    q: "\ud835\udcfa",
    r: "\ud835\udcfb",
    s: "\ud835\udcfc",
    t: "\ud835\udcfd",
    u: "\ud835\udcfe",
    v: "\ud835\udcff",
    w: "\ud835\udd00",
    x: "\ud835\udd01",
    y: "\ud835\udd02",
    z: "\ud835\udd03",
  };
  org.imatheq.formulaeditor.parsing.expression.FrakturList = {
    A: "\ud835\udd04",
    B: "\ud835\udd05",
    C: "\u212d",
    D: "\ud835\udd07",
    E: "\ud835\udd08",
    F: "\ud835\udd09",
    G: "\ud835\udd0a",
    H: "\u210c",
    I: "\u2111",
    J: "\ud835\udd0d",
    K: "\ud835\udd0e",
    L: "\ud835\udd0f",
    M: "\ud835\udd10",
    N: "\ud835\udd11",
    O: "\ud835\udd12",
    P: "\ud835\udd13",
    Q: "\ud835\udd14",
    R: "\u211c",
    S: "\ud835\udd16",
    T: "\ud835\udd17",
    U: "\ud835\udd18",
    V: "\ud835\udd19",
    W: "\ud835\udd1a",
    X: "\ud835\udd1b",
    Y: "\ud835\udd1c",
    Z: "\u2128",
    a: "\ud835\udd1e",
    b: "\ud835\udd1f",
    c: "\ud835\udd20",
    d: "\ud835\udd21",
    e: "\ud835\udd22",
    f: "\ud835\udd23",
    g: "\ud835\udd24",
    h: "\ud835\udd25",
    i: "\ud835\udd26",
    j: "\ud835\udd27",
    k: "\ud835\udd28",
    l: "\ud835\udd29",
    m: "\ud835\udd2a",
    n: "\ud835\udd2b",
    o: "\ud835\udd2c",
    p: "\ud835\udd2d",
    q: "\ud835\udd2e",
    r: "\ud835\udd2f",
    s: "\ud835\udd30",
    t: "\ud835\udd31",
    u: "\ud835\udd32",
    v: "\ud835\udd33",
    w: "\ud835\udd34",
    x: "\ud835\udd35",
    y: "\ud835\udd36",
    z: "\ud835\udd37",
  };
  org.imatheq.formulaeditor.parsing.expression.FrakturBoldList = {
    A: "\ud835\udd6c",
    B: "\ud835\udd6d",
    C: "\ud835\udd6e",
    D: "\ud835\udd6f",
    E: "\ud835\udd70",
    F: "\ud835\udd71",
    G: "\ud835\udd72",
    H: "\ud835\udd73",
    I: "\ud835\udd74",
    J: "\ud835\udd75",
    K: "\ud835\udd76",
    L: "\ud835\udd77",
    M: "\ud835\udd78",
    N: "\ud835\udd79",
    O: "\ud835\udd7a",
    P: "\ud835\udd7b",
    Q: "\ud835\udd7c",
    R: "\ud835\udd7d",
    S: "\ud835\udd7e",
    T: "\ud835\udd7f",
    U: "\ud835\udd80",
    V: "\ud835\udd81",
    W: "\ud835\udd82",
    X: "\ud835\udd83",
    Y: "\ud835\udd84",
    Z: "\ud835\udd85",
    a: "\ud835\udd86",
    b: "\ud835\udd87",
    c: "\ud835\udd88",
    d: "\ud835\udd89",
    e: "\ud835\udd8a",
    f: "\ud835\udd8b",
    g: "\ud835\udd8c",
    h: "\ud835\udd8d",
    i: "\ud835\udd8e",
    j: "\ud835\udd8f",
    k: "\ud835\udd90",
    l: "\ud835\udd91",
    m: "\ud835\udd92",
    n: "\ud835\udd93",
    o: "\ud835\udd94",
    p: "\ud835\udd95",
    q: "\ud835\udd96",
    r: "\ud835\udd97",
    s: "\ud835\udd98",
    t: "\ud835\udd99",
    u: "\ud835\udd9a",
    v: "\ud835\udd9b",
    w: "\ud835\udd9c",
    x: "\ud835\udd9d",
    y: "\ud835\udd9e",
    z: "\ud835\udd9f",
  };
  org.imatheq.formulaeditor.parsing.expression.RevList = {};
  com.efmase.js.utilities.toolset.swap();
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.NonItalicMiList =
    "\u221e\u2102\u2145\u210d\u212a\u2115\u2119\u211a\u211d\u2124\u2135\u2205";
})();
$package("org.imatheq.parsing");
$package("org.imatheq.formulaeditor.options");
(function () {
  org.imatheq.formulaeditor.Options = $extend(Object, {
    defaultOptions: {
      debug: !1,
      continuingNavigation: !0,
      decimalMark: ".",
      featureUndo: !0,
      modeArith1Divide: "restricted",
      optionVerboseStyle: "false",
      optionArith1UnaryMinusBrackets: "false",
      optionInterval1Brackets: { lo: "(", lc: "[", ro: ")", rc: "]" },
      optionResizeBrackets: !0,
      styleArith1Divide: "mfrac",
      styleArith1Times: "cross",
      styleTransc1Log: "function",
      symbolArith1Times: "\u00b7",
      defaultFontName: "Math Font",
      defaultFontSizeIdx: com.efmase.js.utilities.toolset.isMobile() ? 9 : 6,
      defaultFont4NewSymbol: "Times New Roman",
      defAutoItalic: !0,
      defSymmetric: !0,
    },
    getOption: function (a) {
      return void 0 !== org.imatheq.formulaeditor.options[a]
        ? org.imatheq.formulaeditor.options[a]
        : void 0 !== this.defaultOptions[a]
        ? this.defaultOptions[a]
        : null;
    },
    getArith1DivideMode: function () {
      var a = this.getOption("modeArith1Divide");
      return "normal" == a || "restricted" == a || "inline" == a
        ? a
        : "restricted";
    },
    getArith1PowerOptionInversePrefix: function () {
      return "true" == this.getOption("optionArith1PowerInversePrefix")
        ? "true"
        : "false";
    },
    getArith1PowerOptionPrefix: function () {
      return "true" == this.getOption("optionArith1PowerPrefix")
        ? "true"
        : "false";
    },
    getArith1TimesStyle: function () {
      var a = this.getOption("styleArith1Times");
      return "dot" == a || "cross" == a || "star" == a
        ? a
        : this.defaultOptions.styleArith1Times;
    },
    getArith1TimesSymbol: function () {
      var a = this.getOption("styleArith1Times");
      return "dot" == a
        ? "\u00b7"
        : "cross" == a
        ? "\u00d7"
        : "star" == a
        ? "*"
        : this.defaultOptions.symbolArith1Times;
    },
    getArith1UnaryMinusOptionBrackets: function () {
      return "true" == this.getOption("optionArith1UnaryMinusBrackets")
        ? "true"
        : "false";
    },
    getDecimalMark: function () {
      var a = this.getOption("decimalMark");
      return "." === a || "," === a ? a : this.defaultOptions.decimalMark;
    },
    getContinuingNavigation: function () {
      var a = this.getOption("continuingNavigation");
      return 1 == a || 0 == a ? a : this.defaultOptions.optionResizeBrackets;
    },
    getInterval1BracketsOption: function () {
      var a = this.getOption("continuingNavigation");
      return "object" === typeof a &&
        "string" === typeof a.lo &&
        "string" === typeof a.lc &&
        "string" === typeof a.ro &&
        "string" === typeof a.rc
        ? a
        : this.defaultOptions.optionInterval1Brackets;
    },
    getListSeparator: function () {
      var a = this.getDecimalMark();
      if ("." === a) return ",";
      if ("," === a) return ";";
      alert("Options: unable to get listseparator.");
      return null;
    },
    getListSeparatorFixed: function () {
      var a = this.getOption("optionListSeparatorFixed"),
        b = this.getListSeparator();
      return null !== a ? a : b;
    },
    getResizeBracketsOption: function () {
      var a = this.getOption("optionResizeBrackets");
      return 1 == a || 0 == a ? a : this.defaultOptions.optionResizeBrackets;
    },
    getTransc1LogStyle: function () {
      var a = this.getOption("styleTransc1Log");
      return "prefix" == a || "postfix" == a || "function" == a
        ? a
        : this.defaultOptions.styleTransc1Log;
    },
    getVerboseStyleOption: function () {
      var a = this.getOption("optionVerboseStyle");
      return "true" == a || "false" == a
        ? a
        : this.defaultOptions.optionVerboseStyle;
    },
    getExpressionParsingContext: function () {
      return {
        decimalMark: this.getDecimalMark(),
        continuingNavigation: this.getContinuingNavigation(),
        listSeparator: this.getListSeparator(),
        optionArith1DivideMode: this.getArith1DivideMode(),
        optionArith1PowerInversePrefix: this.getArith1PowerOptionInversePrefix(),
        optionArith1PowerPrefix: this.getArith1PowerOptionPrefix(),
        optionArith1UnaryMinusBrackets: this.getArith1UnaryMinusOptionBrackets(),
        styleTransc1Log: this.getTransc1LogStyle(),
        symbolArith1Times: this.getArith1TimesSymbol(),
      };
    },
    getPresentationContext: function () {
      return {
        decimalMark: this.getDecimalMark(),
        continuingNavigation: this.getContinuingNavigation(),
        listSeparator: this.getListSeparator(),
        listSeparatorFixed: this.getListSeparatorFixed(),
        modeArith1Divide: this.getArith1DivideMode(),
        optionArith1UnaryMinusBrackets: this.getArith1UnaryMinusOptionBrackets(),
        optionInterval1Brackets: this.getInterval1BracketsOption(),
        optionResizeBrackets: this.getResizeBracketsOption(),
        styleTransc1Log: this.getTransc1LogStyle(),
        symbolArith1Times: this.getArith1TimesSymbol(),
      };
    },
  });
})();
(function () {
  var a = org.imatheq.parsing.Parser,
    b = [],
    d = null;
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser = $extend(
    Object,
    {
      getParser: function (d) {
        var f;
        if (null === d || void 0 === d) d = this.getContext();
        if (void 0 === d.parser) {
          var g = a;
          for (f = 0; f < b.length; f++) g = $extend(g, b[f](d));
          d.parser = g;
        }
        return d.parser;
      },
    }
  );
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.addFunction = function (
    a
  ) {
    b.push(a);
  };
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.clearCache = function () {
    d = null;
  };
  org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.getContext = function () {
    null === d &&
      (d = new org.imatheq.formulaeditor.Options().getExpressionParsingContext());
    return d;
  };
})();
$package("org.imatheq.formulaeditor.parsing.xml");
(function () {
  org.imatheq.formulaeditor.parsing.xml.XMLParser = $extend(Object, {
    name: "XMLParser",
    xmldoc: null,
    parse: function (a, b) {
      var d,
        e = [],
        f,
        g;
      for (d = 0; d < a.childNodes.length; d++) {
        f = a.childNodes.item(d);
        g = f.getAttribute("id");
        var h = this.handle(f);
        e[g] = {
          id: g,
          w: f.getAttribute("w"),
          h: f.getAttribute("h"),
          l: f.getAttribute("l"),
          t: f.getAttribute("t"),
          b: f.getAttribute("b"),
          entry: h,
        };
      }
      return e;
    },
    loadXml: function (a) {
      var b,
        d = a.match(/\s*<[^(>|\s)]*\s*/);
      if (null === d) throw Error("Invalid XML string: " + a);
      if (window.DOMParser) {
        parser = new DOMParser();
        try {
          b = parser.parseFromString(a, "text/xml");
        } catch (e) {
          throw Error("XML parsing error.");
        }
      } else
        (b = new ActiveXObject("Microsoft.XMLDOM")),
          (b.async = !1),
          b.loadXML(a);
      a = null;
      if (b.parseError && 0 != b.parseError.errorCode)
        throw (
          ((a =
            "XML Parsing Error: " +
            b.parseError.reason +
            " at line " +
            b.parseError.line +
            " at position " +
            b.parseError.linepos),
          Error(a))
        );
      if (b.documentElement.localName != d[0].trim().slice(1))
        throw Error(
          "Error parsing XML: wrong root node" +
            b.documentElement.localName +
            ", instead of " +
            d[0].slice(1) +
            " returned"
        );
      return b;
    },
    parseString: function (a, b, d) {
      if ("string" != typeof a)
        throw Error("Error in parseString(): input not string");
      a = a.replace(/&nbsp;/g, "&#xa0;");
      this.xmldoc = a = this.loadXml(a);
      a = a.documentElement;
      if ("math" != a.localName.toLowerCase()) {
        var e = this.loadXml(
          '<math xmlns="http://www.w3.org/1998/Math/MathML"/>'
        );
        this.xmldoc = e;
        e.documentElement.appendChild(a);
        a = e.documentElement;
      }
      if (null !== a) this.removeComments(a), this.removeWhitespace(a);
      else return null;
      if (
        1 == a.childNodes.length &&
        "mrow" == a.childNodes.item(0).localName.toLowerCase()
      ) {
        var f = a.childNodes.item(0);
        for (a.removeChild(f); 0 < f.childNodes.length; )
          (e = f.childNodes.item(0)), a.appendChild(e);
      }
      if (null !== d && void 0 !== d && d)
        for (d = a.childNodes.length - 1; 0 <= d; d--)
          (e = a.childNodes.item(d)),
            ("mo" != e.localName.toLowerCase() &&
              "mspace" != e.localName.toLowerCase()) ||
              null === e.getAttribute("linebreak") ||
              "newline" != e.getAttribute("linebreak").toLowerCase() ||
              a.removeChild(e);
      return this.handle(a, b);
    },
    handle: function (a, b) {
      if (null === a.localName) return null;
      var d = "handle" + a.localName;
      if (d in this) {
        var e = a.parentNode,
          f = a.getAttribute("mathvariant"),
          g = a.getAttribute("mathcolor"),
          h = a.getAttribute("symmetric");
        "math" != a.localName.toLowerCase() &&
          null !== e &&
          void 0 !== e &&
          (null === f &&
            null !== e.getAttribute("mathvariant") &&
            ((f = e.getAttribute("mathvariant")),
            a.setAttribute("mathvariant", f)),
          null === g &&
            null !== e.getAttribute("mathcolor") &&
            ((g = e.getAttribute("mathcolor")), a.setAttribute("mathcolor", g)),
          null === h &&
            null !== e.getAttribute("symmetric") &&
            ((h = e.getAttribute("symmetric")),
            a.setAttribute("symmetric", h)));
        e = null;
        e = null !== b && void 0 !== b ? this[d](a, b) : this[d](a);
        "mi" != a.localName &&
          "mn" != a.localName &&
          "mo" != a.localName &&
          "ms" != a.localName &&
          "mtext" != a.localName &&
          (null !== f &&
            ("normal" == f.toLowerCase()
              ? ((e.bold = !1), (e.forcedItalic = !1), (e.autoItalic = !1))
              : "bold" == f.toLowerCase()
              ? ((e.bold = !0), (e.forcedItalic = !1), (e.autoItalic = !1))
              : "italic" == f.toLowerCase()
              ? ((e.bold = !1), (e.forcedItalic = !0), (e.autoItalic = !1))
              : "bold-italic" == f.toLowerCase() &&
                ((e.bold = !0), (e.forcedItalic = !0), (e.autoItalic = !1))),
          null !== g && (e.mathcolor = g));
        return e;
      }
      throw Error(
        this.name + " doesn't know how to handle this node: " + a + ". INFO: 1."
      );
    },
    removeComments: function (a) {
      for (var b = a.childNodes, d = b.length - 1; 0 <= d; d--) {
        var e = b.item(d);
        e &&
          (8 == e.nodeType
            ? a.removeChild(e)
            : e.hasChildNodes() && this.removeComments(e));
      }
    },
    removeWhitespace: function (a) {
      for (var b = a.childNodes, d = b.length - 1; 0 <= d; d--) {
        var e = b.item(d);
        if (e)
          if (3 == e.nodeType) {
            var f = e.nodeValue.trim();
            "" === f &&
            "mo" == e.parentNode.localName.toLowerCase() &&
            1 == e.parentNode.childNodes.length
              ? -1 != e.nodeValue.indexOf("\u00a0")
                ? (e.nodeValue = "\u00a0")
                : -1 != e.nodeValue.charAt(" ") && (e.nodeValue = " ")
              : "" === f && a.removeChild(e);
          } else e.hasChildNodes() && this.removeWhitespace(e);
      }
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.parsing.openmath.VariableList = {};
})();
(function () {
  org.imatheq.formulaeditor.presentation.Fraction = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      draw: function (a, b, d, e, f) {
        e = a.getXDimentions(b, d, e);
        e = e.top + Math.round(0.4 * e.height);
        d = Math.round(d);
        var g = this.children[0],
          h = this.children[1],
          l = g.draw(a, b, 0, 0, !0),
          m = h.draw(a, b, 0, 0, !0),
          t = d + Math.min(l.left, m.left),
          k = e - l.height - 4,
          n = Math.max(l.width, m.width) + 8 + 4;
        this.dimensions = {
          left: t,
          top: k,
          width: n,
          height: l.height + m.height + 8 + 1,
        };
        f ||
          (g.draw(a, b, d + Math.round((n - l.width) / 2), k - l.top, f),
          (g = a.getContext()),
          g.save(),
          (g.strokeStyle = this.mathcolor),
          (g.lineWidth = 1),
          g.beginPath(),
          g.moveTo(d + 2, e),
          g.lineTo(d + n - 2, e),
          g.stroke(),
          g.closePath(),
          g.restore(),
          h.draw(
            a,
            b,
            d + Math.round((n - m.width) / 2),
            e + 4 - m.top + 1,
            f
          ));
        return this.dimensions;
      },
      getCursorPosition: function (a, b, d) {
        var e = this.children[0].dimensions,
          f = this.children[1].dimensions;
        return b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
          ? d < (e.top + e.height + f.top) / 2
            ? this.children[0].getCursorPosition(a, b, d)
            : this.children[1].getCursorPosition(a, b, d)
          : b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : 0 == b && !0 === a.continuingNavigation
          ? this.children[1].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation) {
          if (null === b || void 0 === b)
            return this.children[1].getPrecedingCursorPosition(a, null, d);
          if (1 == b)
            return this.children[0].getPrecedingCursorPosition(a, null, d);
        }
        return null === b || void 0 === b
          ? this.children[0].getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : 0 === b
          ? this.children[1].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[1].getHigherCursorPosition(a, null, d, e)
          : 1 == b
          ? this.children[0].getHigherCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, e)
          : null;
      },
      getMathML: function () {
        return (
          "<mfrac" +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          ">" +
          this.children[0].getMathML(!0) +
          this.children[1].getMathML(!0) +
          "</mfrac>"
        );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.VerticalBracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      mtype: "mover",
      accent: "",
      accentunder: "",
      middle: null,
      upperBracket: null,
      lowerBracket: null,
      slowDelete: !0,
      margin: 2,
      initialize: function () {
        0 < arguments.length
          ? ((this.mtype = arguments[0]),
            (this.upperBracket = arguments[1]),
            (this.middle = arguments[2]),
            (this.lowerBracket = arguments[3]),
            4 < arguments.length && (this.mathcolor = arguments[4]),
            (this.children = []),
            this.children.push(this.middle))
          : (this.children = []);
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            b = this.functionsFromRow.length - 1;
          0 <= b;
          b--
        )
          this[this.functionsFromRow[b]] ||
            (this[this.functionsFromRow[b]] = a[this.functionsFromRow[b]]);
        this.updateChildren();
      },
      getFontSizeData: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        if ("" != this.upperBracket.value) {
          var f = this.upperBracket.onscreen
            ? this.upperBracket.onscreen
            : this.upperBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new e.Symbol(f).getFontSizeData(a, b, d, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new e.Symbol(f + "1").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new e.Symbol(f + "m").getFontSizeData(a, b, d, !0);
        }
        "" != this.lowerBracket.value &&
          ((f = this.lowerBracket.onscreen
            ? this.lowerBracket.onscreen
            : this.lowerBracket.value),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new e.Symbol(f).getFontSizeData(a, b, d, !0),
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new e.Symbol(f + "1").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"] &&
              new e.Symbol(f + "m").getFontSizeData(a, b, d, !0));
        arguments.callee.parent.getFontSizeData.call(this, a, b, d);
      },
      draw: function (a, b, d, e, f) {
        6 > a.getFontSizeIdx(b.fontSizeModifier) && (this.margin = 1);
        this.middle.draw(a, b, 0, 0, !0);
        this.upperBracket.minimumWidth =
          this.middle.dimensions.width -
          Math.min(
            this.middle.children[0].dimensions.width,
            this.middle.children[this.middle.children.length - 1].dimensions
              .width
          );
        1 == this.middle.children.length &&
          (this.upperBracket.minimumWidth = this.middle.dimensions.width);
        this.lowerBracket.minimumWidth = this.upperBracket.minimumWidth;
        this.upperBracket.fullWidth = this.middle.dimensions.width;
        this.lowerBracket.fullWidth = this.middle.dimensions.width;
        "" == this.upperBracket.value
          ? (this.upperBracket.dimensions = {
              top: this.middle.dimensions.top,
              left: this.middle.dimensions.left,
              width: this.middle.dimensions.width,
              height: 0,
            })
          : this.upperBracket.draw(a, b, 0, 0, !0);
        "" == this.lowerBracket.value
          ? (this.lowerBracket.dimensions = {
              top: this.middle.dimensions.top + this.middle.dimensions.height,
              left: this.middle.dimensions.left,
              width: this.middle.dimensions.width,
              height: 0,
            })
          : this.lowerBracket.draw(a, b, 0, 0, !0);
        width = Math.max(
          this.upperBracket.dimensions.width,
          this.middle.dimensions.width,
          this.lowerBracket.dimensions.width
        );
        var g = 0,
          h = 0,
          l = 0;
        width > this.middle.dimensions.width &&
          (g = (width - this.middle.dimensions.width) / 2);
        this.upperBracket.dimensions.width < width &&
          (h = (width - this.upperBracket.dimensions.width) / 2);
        this.lowerBracket.dimensions.width < width &&
          (l = (width - this.lowerBracket.dimensions.width) / 2);
        this.dimensions = {
          width: width,
          height:
            this.upperBracket.dimensions.height +
            this.middle.dimensions.height +
            this.lowerBracket.dimensions.height +
            2 * this.margin,
          left: d,
          top:
            e +
            this.middle.dimensions.top -
            this.upperBracket.dimensions.height -
            this.margin,
        };
        this.upperBracket.fullWidth = this.middle.dimensions.width;
        "" != this.upperBracket.value &&
          this.upperBracket.draw(
            a,
            b,
            d + h,
            this.dimensions.top - this.upperBracket.dimensions.top,
            f
          );
        this.middle.draw(a, b, d + g, e, f);
        this.lowerBracket.fullWidth = this.middle.dimensions.width;
        "" != this.lowerBracket.value &&
          this.lowerBracket.draw(
            a,
            b,
            d + l,
            this.middle.dimensions.top +
              this.middle.dimensions.height -
              this.lowerBracket.dimensions.top +
              this.margin,
            f
          );
        return this.dimensions;
      },
      setSymbFontAttrbs: function (a) {
        "" != this.upperBracket.value && this.upperBracket.setSymbFontAttrbs(a);
        "" != this.lowerBracket.value && this.lowerBracket.setSymbFontAttrbs(a);
        arguments.callee.parent.setSymbFontAttrbs.call(this, a);
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (a, b, d) {
        var e;
        e = this.middle.dimensions;
        return b >= e.left && b < e.left + e.width
          ? this.middle.getCursorPosition(a, b, d)
          : b < e.left
          ? null !== this.parent
            ? { row: this.parent, index: 0 == this.index ? 0 : this.index - 1 }
            : this.getPrecedingCursorPosition(a)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : this.getPrecedingCursorPosition(a);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return this.middle.getFollowingCursorPosition(a, null, d);
        if (null !== this.parent)
          return this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return this.middle.getPrecedingCursorPosition(a, null, d);
        if (null !== this.parent)
          return this.parent.getPrecedingCursorPosition(a, this.index + 1, !1);
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.upperBracket.copy(),
          this.children[0].copy(),
          this.lowerBracket.copy()
        );
      },
      getMathML: function () {
        var a = "<" + this.mtype;
        if ("mover" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accent
              ? a + (" accent='" + this.accent + "'")
              : "" != this.upperBracket
              ? a + " accent='true'"
              : a + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accentunder
              ? a + (" accentunder='" + this.accentunder + "'")
              : "" != this.lowerBracket
              ? a + " accentunder='true'"
              : a + " accentunder='false'";
        a +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        a += ">" + this.middle.getMathML(!0);
        "" != this.lowerBracket.value &&
          (a += "<mo>" + this.lowerBracket.getEncodedStr() + "</mo>");
        "" != this.upperBracket.value &&
          (a += "<mo>" + this.upperBracket.getEncodedStr() + "</mo>");
        return (a += "</" + this.mtype + ">");
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.MiddleBracketed = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      middleBracket: null,
      upper: null,
      lower: null,
      slowDelete: !0,
      margin: 2,
      mtype: "mover",
      accent: "",
      accentunder: "",
      initialize: function () {
        0 < arguments.length
          ? ((this.mtype = arguments[0]),
            (this.middleBracket = arguments[1]),
            (this.children = arguments[2]),
            3 < arguments.length && (this.mathcolor = arguments[3]),
            (this.lower = this.upper = null),
            "mover" == this.mtype
              ? (this.upper = this.children[0])
              : "munder" == this.mtype
              ? (this.lower = this.children[0])
              : ((this.upper = this.children[0]),
                (this.lower = this.children[1])))
          : (this.children = []);
        this.updateChildren();
      },
      isEmbellished: function () {
        return (
          void 0 !==
          org.imatheq.formulaeditor.parsing.expression.MOList[
            this.middleBracket
          ]
        );
      },
      getSymbol: function () {
        return this.middleBracket;
      },
      getFontSizeData: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation;
        if ("" != this.middleBracket.value) {
          var f = this.middleBracket.onscreen
            ? this.middleBracket.onscreen
            : this.middleBracket.value;
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f] &&
            new e.Symbol(f).getFontSizeData(a, b, d, !0);
          org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "1"]
            ? new e.Symbol(f + "1").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "m"]
            ? new e.Symbol(f + "m").getFontSizeData(a, b, d, !0)
            : org.imatheq.formulaeditor.MathCanvas.symbolPositions[f + "bm"] &&
              new e.Symbol(f + "bm").getFontSizeData(a, b, d, !0);
        }
        var e = { fontSizeModifier: 0 },
          g;
        for (g in b) e[g] = b[g];
        --e.fontSizeModifier;
        null !== this.upper && this.upper.getFontSizeData(a, e, d);
        null !== this.lower && this.lower.getFontSizeData(a, e, d);
        arguments.callee.parent.getFontSizeData.call(this, a, b, d);
      },
      draw: function (a, b, d, e, f, g) {
        var h = g;
        if (void 0 === g || null === g) h = { lspace: 0, rspace: 0 };
        6 > a.getFontSizeIdx(b.fontSizeModifier) && (this.margin = 1);
        g = { fontSizeModifier: 0 };
        for (var l in b) g[l] = b[l];
        --g.fontSizeModifier;
        var m = 0,
          t = (l = 0),
          k = 0;
        null !== this.upper &&
          void 0 !== this.upper &&
          (this.upper.draw(a, g, 0, 0, !0),
          (m = this.upper.dimensions.width),
          (l = this.upper.dimensions.height));
        null !== this.lower &&
          void 0 !== this.lower &&
          (this.lower.draw(a, g, 0, 0, !0),
          (t = this.lower.dimensions.width),
          (k = this.lower.dimensions.height));
        if (null === this.upper || void 0 === this.upper)
          m = this.lower.dimensions.width;
        if (null === this.lower || void 0 === this.lower)
          t = this.upper.dimensions.width;
        this.middleBracket.minimumWidth = Math.max(m, t);
        this.middleBracket.fullWidth = this.middleBracket.minimumWidth;
        this.middleBracket.draw(a, b, 0, 0, !0);
        var n = 0,
          p = 0,
          r = 0;
        if (this.middleBracket.dimensions.topcentre) {
          var r =
              Math.max(
                Math.round(m / 2),
                this.middleBracket.dimensions.topcentre
              ) - this.middleBracket.dimensions.topcentre,
            n =
              Math.max(
                Math.round(m / 2),
                this.middleBracket.dimensions.width -
                  this.middleBracket.dimensions.topcentre
              ) -
              (this.middleBracket.dimensions.width -
                this.middleBracket.dimensions.topcentre),
            q =
              Math.max(
                Math.round(t / 2),
                this.middleBracket.dimensions.bottomcentre
              ) - this.middleBracket.dimensions.bottomcentre,
            p =
              Math.max(
                Math.round(t / 2),
                this.middleBracket.dimensions.width -
                  this.middleBracket.dimensions.bottomcentre
              ) -
              (this.middleBracket.dimensions.width -
                this.middleBracket.dimensions.bottomcentre),
            r = Math.max(r, q),
            n = Math.max(n, p);
          width = r + this.middleBracket.dimensions.width + n;
          n = r + this.middleBracket.dimensions.topcentre - Math.round(m / 2);
          p =
            r + this.middleBracket.dimensions.bottomcentre - Math.round(t / 2);
        } else
          (width = Math.max(m, this.middleBracket.dimensions.width, t)),
            (n = Math.max(0, Math.round((width - m) / 2))),
            (p = Math.max(0, Math.round((width - t) / 2))),
            (r = Math.max(
              0,
              Math.round((width - this.middleBracket.dimensions.width) / 2)
            ));
        e = a.getXDimentions(b, d, e);
        e = e.top + Math.round(0.4 * e.height - 0.5);
        m =
          -Math.round(this.middleBracket.dimensions.height / 2) -
          this.middleBracket.dimensions.top;
        this.dimensions = {
          width: width + h.lspace + h.rspace,
          height:
            l + this.middleBracket.dimensions.height + k + 2 * this.margin,
          left: d,
          top:
            e -
            l -
            Math.round(this.middleBracket.dimensions.height / 2) -
            this.margin,
        };
        f ||
          (null !== this.upper &&
            void 0 !== this.upper &&
            this.upper.draw(
              a,
              g,
              d + n + h.lspace,
              this.dimensions.top - this.upper.dimensions.top,
              f
            ),
          this.middleBracket.draw(a, b, d + r + h.lspace, e + m, f),
          null !== this.lower &&
            void 0 !== this.lower &&
            this.lower.draw(
              a,
              g,
              d + p + h.lspace,
              e +
                Math.round(this.middleBracket.dimensions.height / 2) +
                this.margin -
                this.lower.dimensions.top,
              f
            ));
        return this.dimensions;
      },
      setSymbFontAttrbs: function (a) {
        "" != this.middleBracket.value &&
          this.middleBracket.setSymbFontAttrbs(a);
        arguments.callee.parent.setSymbFontAttrbs.call(this, a);
      },
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          if (2 == this.children.length) {
            var e = this.children[0].dimensions;
            return d < (e.top + e.height + this.children[1].dimensions.top) / 2
              ? this.children[0].getCursorPosition(a, b, d)
              : this.children[1].getCursorPosition(a, b, d);
          }
          return this.children[0].getCursorPosition(a, b, d);
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? (console.log("error fraction no parent."), null)
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        return null === b || void 0 === b
          ? this.children[0].getFollowingCursorPosition(a, null, d)
          : 0 == b && 1 < this.children.length && !0 === a.continuingNavigation
          ? this.children[1].getFollowingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index + 1 }
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation) {
          if (null === b || void 0 === b)
            return 1 == this.children.length
              ? this.children[0].getPrecedingCursorPosition(a, null, d)
              : this.children[1].getPrecedingCursorPosition(a, null, d);
          if (1 == b)
            return this.children[0].getPrecedingCursorPosition(a, null, d);
        }
        return null === b || void 0 === b
          ? this.children[0].getPrecedingCursorPosition(a, null, d)
          : null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : 0 === b && 2 == this.children.length
          ? this.children[1].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        return (null !== b && void 0 !== b) || 2 != this.children.length
          ? 1 == b
            ? this.children[0].getHigherCursorPosition(a, null, d, e)
            : null !== this.parent
            ? this.parent.getHigherCursorPosition(a, this.index, d)
            : null
          : this.children[1].getHigherCursorPosition(a, null, d, e);
      },
      copy: function () {
        return this.clone(
          this.mtype,
          this.middleBracket.copy(),
          this.copyArray(this.children)
        );
      },
      getMathML: function () {
        var a = "<" + this.mtype;
        if ("mover" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accent
              ? a + (" accent='" + this.accent + "'")
              : a + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accentunder
              ? a + (" accentunder='" + this.accentunder + "'")
              : a + " accentunder='false'";
        a +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        a += "><mo>" + this.middleBracket.getEncodedStr() + "</mo>";
        a =
          "mover" == this.mtype || "munder" == this.mtype
            ? a + this.children[0].getMathML(!0)
            : a + this.children[1].getMathML(!0);
        "munderover" == this.mtype && (a += this.children[0].getMathML(!0));
        return (a += "</" + this.mtype + ">");
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Column = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      margin: 2,
      align: "center",
      fontSizeModifierArray: null,
      baselineIndex: null,
      mtype: "",
      accent: "",
      accentunder: "",
      getFontSizeData: function (a, b, d) {
        for (var e = 0; e < this.children.length; e++) {
          var f;
          if (
            null !== this.fontSizeModifierArray &&
            void 0 !== this.fontSizeModifierArray[e] &&
            null !== this.fontSizeModifierArray[e]
          ) {
            f = { fontSizeModifier: 0 };
            for (var g in b) f[g] = b[g];
            f.fontSizeModifier += this.fontSizeModifierArray[e];
          } else f = b;
          this.children[e].getFontSizeData(a, f, d);
        }
      },
      draw: function (a, b, d, e, f) {
        for (
          var g = this.margin, h = [], l = 0, m = 0, t = [], k = 0;
          k < this.children.length;
          k++
        ) {
          var n, p, r;
          if (
            null !== this.fontSizeModifierArray &&
            void 0 !== this.fontSizeModifierArray[k] &&
            null !== this.fontSizeModifierArray[k]
          ) {
            n = { fontSizeModifier: 0 };
            for (var q in b) n[q] = b[q];
            n.fontSizeModifier += this.fontSizeModifierArray[k];
          } else n = b;
          t.push(n);
          var u = this.children[k].draw(a, t[k], 0, 0, !0),
            l = Math.max(l, u.width);
          n = u.height;
          0 === k
            ? ((r = 0), (p = r + u.top), (m += n))
            : ((p = h[k - 1].top + h[k - 1].height + g),
              (r = p - u.top),
              (m += n + g));
          h[k] = { height: n, top: p, baseline: r };
        }
        g =
          null === this.baselineIndex
            ? h[Math.floor(this.children.length / 2)].baseline
            : h[this.baselineIndex].baseline;
        for (b = 0; b < this.children.length; b++)
          (h[b].top -= g), (h[b].baseline -= g);
        this.dimensions = { top: e + h[0].top, left: d, width: l, height: m };
        m = d + l / 2;
        for (b = 0; b < this.children.length; b++)
          (g = d),
            "center" == this.align
              ? (g = m - this.children[b].dimensions.width / 2)
              : "right" == this.align &&
                (g = l - this.children[b].dimensions.width),
            this.children[b].draw(a, t[b], g, e + h[b].baseline, f);
        return this.dimensions;
      },
      getMathML: function () {
        var a = "<" + this.mtype;
        if ("mover" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accent
              ? a + (" accent='" + this.accent + "'")
              : a + " accent='false'";
        if ("munder" == this.mtype || "munderover" == this.mtype)
          a =
            "" != this.accentunder
              ? a + (" accentunder='" + this.accentunder + "'")
              : a + " accentunder='false'";
        a +=
          null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"';
        a =
          "mover" == this.mtype || "munderover" == this.mtype
            ? a + (">" + this.children[1].getMathML(!0))
            : a + (">" + this.children[0].getMathML(!0));
        "mover" == this.mtype
          ? (a += this.children[0].getMathML(!0))
          : "munder" == this.mtype
          ? (a += this.children[1].getMathML(!0))
          : "munderover" == this.mtype && (a += this.children[2].getMathML(!0));
        "munderover" == this.mtype && (a += this.children[0].getMathML(!0));
        return (a += "</" + this.mtype + ">");
      },
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          for (var e = 0; e < this.children.length - 1; e++)
            if (d < this.children[e + 1].dimensions.top)
              return this.children[e].getCursorPosition(a, b, d);
          return this.children[this.children.length - 1].getCursorPosition(
            a,
            b,
            d
          );
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        var e = null;
        if (!0 === a.continuingNavigation)
          null === b || void 0 === b
            ? (e = this.children[0].getFollowingCursorPosition(a, null, d))
            : b + 1 < this.children.length &&
              (e = this.children[b + 1].getFollowingCursorPosition(a, null, d));
        else if (null === b || void 0 === b)
          for (
            var f = (b = Math.floor(this.children.length / 2));
            null === e && 0 <= f && f < this.children.length;

          )
            (e = this.children[f].getFollowingCursorPosition(a, null, d)),
              (f = f >= b ? 2 * b - f - 1 : 2 * b - f);
        null === e &&
          null !== this.parent &&
          (e = this.parent.getFollowingCursorPosition(a, this.index, !1));
        return e;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation)
          if (null === b || void 0 === b) {
            if (0 < this.children.length)
              return this.children[
                this.children.length - 1
              ].getPrecedingCursorPosition(a, null, d);
          } else if (0 < b)
            return this.children[b - 1].getPrecedingCursorPosition(a, null, d);
        if (null === b || void 0 === b) {
          b = null;
          for (
            var e = Math.floor(this.children.length / 2), f = e;
            null === b && 0 <= f && f < this.children.length;

          )
            (b = this.children[f].getPrecedingCursorPosition(a, null, d)),
              (f = f >= e ? 2 * e - f - 1 : 2 * e - f);
          return b;
        }
        return null !== this.parent
          ? { row: this.parent, index: this.index }
          : null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        var f = this.children.length - 1;
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : b < f
          ? this.children[b + 1].getLowerCursorPosition(a, null, d, e)
          : arguments.callee.parent.getLowerCursorPosition.call(
              a,
              this,
              b,
              d,
              e
            );
      },
      getHigherCursorPosition: function (a, b, d, e) {
        var f = this.children.length - 1;
        return null === b || void 0 === b
          ? this.children[f].getHigherCursorPosition(a, null, d, e)
          : 0 < b
          ? this.children[b - 1].getHigherCursorPosition(a, null, d, e)
          : arguments.callee.parent.getHigherCursorPosition.call(
              a,
              this,
              b,
              d,
              e
            );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Lines = $extend(
    org.imatheq.formulaeditor.presentation.Column,
    {
      fontSizeModifierArray: null,
      margin: 20,
      align: "left",
      baselineIndex: null,
      mtype: "",
      initialize: function () {
        var a = arguments.callee.parent,
          b = [];
        return 0 == arguments.length
          ? a.initialize.apply(this, b)
          : a.initialize.apply(this, arguments);
      },
      getRowSpace: function () {
        return this.margin;
      },
      getSelection: function (a, b, d, e, f, g, h, l, m) {
        for (var t = f, k = g, n = 0; n < d; n++)
          (t += this.children[n].children.length),
            (k += this.children[n].children.length);
        for (var p = [], n = d; n <= e; n++) {
          var r = 0,
            q,
            u = this.children[n];
          n == d && (r = f);
          n == e
            ? (q = g)
            : ((k += this.children[n].children.length),
              (q = this.children[n].children.length));
          for (var v, y, w, z, A = r; A < q; A++) {
            var C = u.children[A].dimensions;
            u.children[A] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (C = {
                left: C.left,
                top: u.dimensions.top,
                width: C.width,
                height: u.dimensions.height,
              });
            A == r
              ? ((v = C.left),
                (y = C.top),
                (w = C.left + C.width),
                (z = C.top + C.height))
              : ((v = Math.min(v, C.left)),
                (y = Math.min(y, C.top)),
                (w = Math.max(w, C.left + C.width)),
                (z = Math.max(z, C.top + C.height)));
          }
          p.push({ left: v, top: y, width: w - v, height: z - y });
        }
        return {
          parent: this,
          startPosition: { row: a.row, index: a.index },
          endPosition: { row: b.row, index: b.index },
          startIndex: t,
          endIndex: k,
          startIndexChain: h,
          endIndexChain: l,
          rightMove: m,
          dimensions: p,
        };
      },
      getSelectedArea: function (a, b) {
        for (
          var d = a[a.length - 2],
            e = b[b.length - 2],
            f = a[a.length - 3],
            g = b[b.length - 3],
            h = d <= e ? d : e,
            l = d > e ? d : e,
            m = d < e ? f : d == e ? Math.min(f, g) : g,
            d = d > e ? f : d == e ? Math.max(f, g) : g,
            e = [],
            f = h;
          f <= l;
          f++
        ) {
          var g = 0,
            t,
            k = this.children[f];
          f == h && (g = m);
          t = f == l ? d : this.children[f].children.length;
          for (var n, p, r, q, u = g; u < t; u++) {
            var v = k.children[u].dimensions;
            k.children[u] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (v = {
                left: v.left,
                top: k.dimensions.top,
                width: v.width,
                height: k.dimensions.height,
              });
            u == g
              ? ((n = v.left),
                (p = v.top),
                (r = v.left + v.width),
                (q = v.top + v.height))
              : ((n = Math.min(n, v.left)),
                (p = Math.min(p, v.top)),
                (r = Math.max(r, v.left + v.width)),
                (q = Math.max(q, v.top + v.height)));
          }
          e.push({ left: n, top: p, width: r - n, height: q - p });
        }
        return e;
      },
      getMathML: function () {
        for (var a = "", b = 0; b < this.children.length; b++) {
          var d = this.children[b].getMathML(!1);
          1 < this.children.length &&
            b == this.children.length - 1 &&
            "<mrow/>" === d &&
            (d = "");
          a += d;
          b != this.children.length - 1 &&
            (a += '<mspace linebreak="newline"/>');
        }
        return a;
      },
      getSelectionMathML: function (a, b, d) {
        a = '<math xmlns="http://www.w3.org/1998/Math/MathML">';
        b = this.getGrandChild(b, !0);
        d = this.getGrandChild(d, !0);
        for (var e = b.parent.index; e <= d.parent.index; e++) {
          var f = this.children[e],
            g = e == b.parent.index ? b.index : 0,
            h = e == d.parent.index ? d.index : f.children.length - 1;
          null === f.children[h] ||
            void 0 === f.children[h] ||
            f.children[h] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol ||
            h++;
          h >= g &&
            ((a += f.getMathML(!1, g, h)),
            f.children[h] instanceof
              org.imatheq.formulaeditor.presentation.NewlineSymbol &&
              (a += '<mspace linebreak="newline"/>'));
        }
        return a + "</math>";
      },
      onkeypress: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        if (!a.altKey && !a.ctrlKey) {
          var e = String.fromCharCode(a.charCode),
            e = new d.Row(b.cursor.position.row.newSymbol(e)),
            f = new d.Lines(e),
            e = null;
          if (13 == a.charCode) return !1;
          var g = b.selection,
            h = this.getGrandChild(g.startIndex),
            l = h.parent;
          g.hasSelection && (e = g.getSelectionCopy());
          var m = b.cursor.position,
            h = m.index;
          0 < h && m.row.children[h - 1] instanceof d.NewlineSymbol && h--;
          var d = m.row.getIndexChain(h),
            m = g.startIndex,
            t = this.getNumGrandChildren() - g.endIndex,
            k = this.remove(m, g.endIndex);
          g.clear();
          this.insert(m, f);
          this.updateChildren();
          h = this.getGrandChild(g.startIndex + 1);
          f = h.parent.getIndexChain(h.index);
          m = { row: this, index: m };
          b.cursor.position.row = h.parent;
          b.cursor.position.index = h.index;
          b.actions.addAction("update", m, d, f, k, null, t, e);
          l.convertKeyword(b);
          return !1;
        }
        return !0;
      },
      onNewline: function (a) {
        var b = a.selection,
          d = org.imatheq.formulaeditor.presentation,
          e = a.cursor.position,
          f = e.row.getIndexChain(e.index),
          g = { parent: e.row, index: e.index },
          h = "insert",
          l = null,
          m = null,
          l = null;
        if (b.hasSelection) {
          h = "update";
          e = b.parent;
          if (e instanceof d.PArray) return;
          m = {
            parent: e,
            startIndex: b.startIndex,
            endIndex: b.endIndex,
            dimensions: b.dimensions,
          };
          l = e.remove(b.startIndex, b.endIndex);
          g = { parent: e, index: b.startIndex };
        }
        var e = this.getAncestorOf(g),
          t = e.getAncestorOf(g).index;
        !b.hasSelection &&
          1 == e.children.length &&
          e.children[0] instanceof d.BlockSymbol &&
          ((l = e.remove(0)), (t = 0));
        g.parent !== e && t++;
        var t = this.getGrandChildIndex(e.index, t),
          b = this.getNumGrandChildren() - t,
          e = { row: this, index: t },
          k = new d.Row(new d.NewlineSymbol()),
          d = new d.Lines(k);
        this.insert(t, d);
        d = this.children[g.parent.index + 1];
        g = d.getIndexChain(0);
        a.cursor.setPosition({ row: d, index: 0 });
        a.actions.addAction(h, e, f, g, l, null, b, m);
        a.redraw();
        return !1;
      },
      deleteNewline: function (a, b) {
        var d = this.children[b],
          e = d.children.length - 1,
          f = { row: a.cursor.position.row, index: a.cursor.position.index },
          g = f.row.getIndexChain(f.index),
          h = d.getIndexChain(e),
          f = { row: this, index: this.getGrandChildIndex(b, e) },
          e = a.getButtonStatus();
        a.cursor.setPosition({ row: d, index: d.children.length - 1 });
        var d = this.getNumGrandChildren() - f.index - 1,
          l = this.remove(f.index, f.index + 1);
        a.actions.addAction("delete", f, g, h, l, null, d, null, null, e);
        a.redraw();
        return !1;
      },
      getGrandChildIndex: function (a, b) {
        for (var d = b, e = 0; e < a; e++)
          d += this.children[e].children.length;
        return d;
      },
      getNumGrandChildren: function () {
        return this.getGrandChildIndex(
          this.children.length - 1,
          this.children[this.children.length - 1].children.length
        );
      },
      getGrandChild: function (a, b) {
        var d = 0;
        if (a == this.getNumGrandChildren())
          return 0 == a
            ? { parent: this.children[0], index: 0 }
            : {
                parent: this.children[this.children.length - 1],
                index: this.children[this.children.length - 1].children.length,
              };
        for (var e = 0; e < this.children.length; e++) {
          if (a >= d && a <= d + this.children[e].children.length)
            if (a == d + this.children[e].children.length) {
              if (0 == a - d && 0 == this.children[e].children.length)
                return { parent: this.children[e], index: 0 };
              if (null === b || void 0 === b || !1 === b)
                return {
                  parent: this.children[e],
                  index: this.children[e].children.length,
                };
            } else return this.children[e].children[a - d];
          d += this.children[e].children.length;
        }
      },
      setSymbFontAttrbs: function (a, b, d) {
        var e = org.imatheq.formulaeditor.presentation,
          f = this.getGrandChild(b, !0),
          g = this.getGrandChild(d, !0);
        d = [];
        b = f.parent;
        var h = g.parent,
          l = f.index,
          f = g.index;
        if (b.index == h.index) {
          var g = new e.Row(),
            m = [];
          for (d.push(g); l < f; l++)
            m.push(b.children[l].copy()), b.children[l].setSymbFontAttrbs(a);
          g.initialize.apply(g, m);
        } else {
          g = new e.Row();
          m = [];
          for (d.push(g); l < b.children.length; l++)
            m.push(b.children[l].copy()), b.children[l].setSymbFontAttrbs(a);
          g.initialize.apply(g, m);
          g = new e.Row();
          m = [];
          for (l = 0; l < f; l++)
            m.push(h.children[l].copy()), h.children[l].setSymbFontAttrbs(a);
          g.initialize.apply(g, m);
          for (l = b.index + 1; l < h.index; l++)
            d.push(this.children[l].copy()),
              this.children[l].setSymbFontAttrbs(a);
          d.push(g);
        }
        a = new e.Lines();
        a.initialize.apply(a, d);
        return a;
      },
      remove: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = this.getGrandChild(a, !0),
          f = this.getGrandChild(b, !0),
          g = [],
          h = e.parent,
          l = f.parent,
          e = e.index,
          f = f.index,
          m;
        if (h.index == l.index) (m = h.remove(e, f)), h.updateChildren();
        else {
          for (m = h.remove(e, h.children.length); l.children.length > f; )
            (g = l.children.pop()), h.children.splice(e, 0, g);
          h.updateChildren();
          g = this.children.splice(h.index + 1, l.index - h.index);
        }
        g.splice(0, 0, m);
        this.updateChildren();
        d = new d.Lines();
        d.initialize.apply(d, g);
        return d;
      },
      insert: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        if (0 == arguments.length) {
          var e = this.children[0];
          null === e
            ? ((e = new d.Row()), this.children.splice(0, 0, e))
            : e.insert(0);
        } else {
          if (0 == b.children.length) return null;
          if (0 == this.children.length)
            for (; 0 < b.children.length; )
              (e = b.children.pop()), this.children.splice(0, 0, e);
          else {
            var f = this.getGrandChild(a, !0),
              e = f.parent,
              f = f.index,
              g = b.children[b.children.length - 1];
            (0 == g.children.length
              ? null
              : g.children[g.children.length - 1]) instanceof d.NewlineSymbol &&
              ((g = new d.Row()),
              g.children.splice(0, 1),
              b.children.push(g),
              b.updateChildren());
            for (var h = g.children.length; e.children.length > f; )
              (d = e.children.pop()),
                g.children.splice(h, 0, d),
                g.updateChildren();
            for (g = b.children[0]; 0 < g.children.length; )
              (d = g.children.pop()),
                e.children.splice(f, 0, d),
                e.updateChildren();
            for (; 1 < b.children.length; )
              (f = b.children.pop()), this.children.splice(e.index + 1, 0, f);
          }
        }
        this.updateChildren();
      },
      isEmpty: function () {
        return (
          0 == this.children.length ||
          (1 == this.children.length && this.children[0].isEmpty())
        );
      },
      getCursorPosition: function (a, b, d) {
        for (var e = this.getRowSpace(), f = 0; f < this.children.length; f++) {
          var g = this.children[f];
          if (
            d > g.dimensions.top - e / 2 &&
            (f == this.children.length - 1 ||
              d < g.dimensions.top + g.dimensions.height + e / 2)
          )
            return this.children[f].getCursorPosition(a, b, d);
        }
      },
      getFollowingCursorPosition: function (a, b, d) {
        var e = null;
        if (!0 === a.continuingNavigation)
          if (null === b || void 0 === b)
            e = this.children[0].getFollowingCursorPosition(a, null, d);
          else if (b + 1 < this.children.length)
            e = this.children[b + 1].getFollowingCursorPosition(a, null, d);
          else {
            if (b + 1 == this.children.length) return null;
          }
        else if (null === b || void 0 === b)
          for (
            var f = (b = Math.floor(this.children.length / 2));
            null === e && 0 <= f && f < this.children.length;

          )
            (e = this.children[f].getFollowingCursorPosition(a, null, d)),
              (f = f >= b ? 2 * b - f - 1 : 2 * b - f);
        null === e &&
          null !== this.parent &&
          (e = this.parent.getFollowingCursorPosition(a, this.index, !1));
        return e;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (!0 === a.continuingNavigation)
          if (null === b || void 0 === b) {
            if (0 < this.children.length)
              return this.children[
                this.children.length - 1
              ].getPrecedingCursorPosition(a, null, d);
          } else {
            if (0 < b)
              return this.children[b - 1].getPrecedingCursorPosition(
                a,
                null,
                d
              );
            if (0 == b) return null;
          }
        if (null === b || void 0 === b) {
          b = null;
          for (
            var e = Math.floor(this.children.length / 2), f = e;
            null === b && 0 <= f && f < this.children.length;

          )
            (b = this.children[f].getPrecedingCursorPosition(a, null, d)),
              (f = f >= e ? 2 * e - f - 1 : 2 * e - f);
          return b;
        }
        return null;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        var f = this.children.length - 1;
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : b < f
          ? this.children[b + 1].getLowerCursorPosition(a, null, d, e)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        var f = this.children.length - 1;
        return null === b || void 0 === b
          ? this.children[f].getHigherCursorPosition(a, null, d, e)
          : 0 < b
          ? this.children[b - 1].getHigherCursorPosition(a, null, d, e)
          : null;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Root = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      lineWidth: 1,
      margin: 2,
      drawBase: !1,
      left: { dimensions: null },
      top: { dimensions: null },
      initialize: function () {
        0 < arguments.length
          ? ((this.children = []),
            null !== arguments[1] && this.children.push(arguments[1]),
            null !== arguments[2] && (this.mathcolor = arguments[2]),
            this.children.push(arguments[0]))
          : (this.children = []);
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            b = this.functionsFromRow.length - 1;
          0 <= b;
          b--
        )
          this[this.functionsFromRow[b]] ||
            (this[this.functionsFromRow[b]] = a[this.functionsFromRow[b]]);
        this.drawBase = this.drawBaseQ();
        this.updateChildren();
      },
      drawBaseQ: function () {
        return 2 == this.children.length;
      },
      getFontSizeData: function (a, b, d) {
        var e = this.children[this.children.length - 1],
          f = 1 == this.children.length ? null : this.children[0];
        if (null !== f) {
          var g = { fontSizeModifier: 0 },
            h;
          for (h in b) g[h] = b[h];
          g.fontSizeModifier -= 2;
          f.getFontSizeData(a, g, d);
        }
        e.getFontSizeData(a, b, d);
      },
      drawTopLeft: function (a, b, d, e, f, g, h, l, m, t, k) {
        k = { fontSizeModifier: 0 };
        for (var n in t) k[n] = t[n];
        k.fontSizeModifier -= 2;
        var p = 0,
          r = 0,
          q;
        null !== g &&
          void 0 !== g &&
          (g.draw(a, k, 0, 0, !0),
          (p = g.dimensions.width),
          (r = g.dimensions.height),
          (q = g.dimensions.top));
        var u = Math.round(0.38 * a.getPXFontSize(t.fontSizeModifier)),
          v = Math.max(f, 8),
          y = Math.max(Math.round(u / 3), 1),
          w = Math.round(0.38 * v);
        t = l + 1;
        var z = Math.floor((6 * u) / 4 - h),
          A = Math.max(p, z) - z;
        h = b + A;
        n = d - (w - y);
        var y = h + y,
          w = d - w,
          C = h + u,
          D = h + 2 * u,
          B = d - v;
        if (null === g || void 0 === g) q = B;
        var E = D + e,
          v = d - v,
          F = Math.floor(f / 2);
        f = f + Math.max(r, F) - F;
        p = b + z - Math.min(z, p);
        b = { height: f, width: A + 2 * u + e + 1, left: b, top: d - f };
        if (void 0 === m || null === m || !1 === m)
          null !== g && void 0 !== g && g.draw(a, k, p, d - f - q, m),
            (this.left.dimensions = {
              left: h,
              top: B,
              width: b.width - e,
              height: b.height,
            }),
            (this.top.dimensions = {
              left: D,
              top: B,
              width: b.width,
              height: l,
            }),
            (a = a.getContext()),
            a.save(),
            (a.strokeStyle = this.mathcolor),
            (a.lineWidth = l),
            a.beginPath(),
            a.moveTo(h, n),
            a.lineTo(y, w),
            (a.lineWidth = t),
            a.lineTo(C, d),
            (a.lineWidth = l),
            a.lineTo(D, B),
            a.lineTo(E, v),
            a.stroke(),
            a.restore();
        return b;
      },
      draw: function (a, b, d, e, f) {
        var g = org.imatheq.formulaeditor.presentation,
          h = a.getFontSizeIdx(b.fontSizeModifier);
        8 < h && (this.lineWidth = 2);
        6 > h && (this.margin = 1);
        var h = this.children[this.children.length - 1],
          l = 1 == this.children.length ? null : this.children[0];
        h.draw(a, b, 0, 0, !0);
        var m = h.dimensions.height + this.lineWidth + 2 * this.margin,
          t = h.dimensions.width + 2 * this.margin;
        1 <= h.children.length &&
          !(h.children[h.children.length - 1] instanceof g.Root) &&
          (t += this.margin);
        this.dimensions = this.drawTopLeft(
          a,
          d,
          e + (h.dimensions.top + h.dimensions.height) + this.margin,
          t,
          m,
          l,
          this.margin,
          this.lineWidth,
          f,
          b
        );
        f || h.draw(a, b, d + this.dimensions.width - t + this.margin, e, f);
        return this.dimensions;
      },
      functionsFromRow: [
        "getFirstCursorPosition",
        "getLastCursorPosition",
        "getLowerCursorPosition",
        "getHigherCursorPosition",
      ],
      getCursorPosition: function (a, b, d) {
        if (
          b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
        ) {
          var e = this.children[this.children.length - 1],
            f = 1 == this.children.length ? null : this.children[0];
          if (this.drawBase) {
            var g =
              (f.dimensions.left + f.dimensions.width + e.dimensions.left) / 2;
            return b < g
              ? f.getCursorPosition(a, b, d)
              : e.getCursorPosition(a, b, d);
          }
          g = (this.dimensions.left + e.dimensions.left) / 2;
          return b < g
            ? { row: this.parent, index: this.index }
            : e.getCursorPosition(a, b, d);
        }
        return b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        var e = this.children[this.children.length - 1],
          f = 1 == this.children.length ? null : this.children[0];
        if (null === b || void 0 === b)
          return this.drawBase
            ? f.getFollowingCursorPosition(a, null, d)
            : e.getFollowingCursorPosition(a, null, d);
        e = null;
        if (0 === b)
          if (d)
            this.drawBase &&
              (e = this.children[1].getFollowingCursorPosition(a, null, d));
          else if (this.drawBase) return { row: this.children[1], index: 0 };
        return null === e && null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, !1)
          : e;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        var e = this.children[this.children.length - 1];
        if (null === b || void 0 === b)
          return e.getPrecedingCursorPosition(a, null, d);
        e = null;
        if (1 == b)
          if (d) e = this.children[0].getLastCursorPosition(a, null, d);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === e && null !== this.parent
          ? { row: this.parent, index: this.index }
          : e;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === b || void 0 === b)
          return this.children[0].getLowerCursorPosition(a, null, d, e);
        var f = null;
        if (1 < this.children.length && 0 === b)
          if (e)
            f = this.children[this.children.length - 1].getLowerCursorPosition(
              a,
              null,
              d,
              e
            );
          else return { row: this.moddle, index: 0 };
        return null === f && null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, !1)
          : f;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === b || void 0 === b)
          return this.children[
            this.children.length - 1
          ].getHigherCursorPosition(a, null, d, e);
        var f = null;
        if (1 < this.children.length && 1 === b)
          if (e) f = this.children[0].getHigherCursorPosition(a, null, d, e);
          else return { row: this.moddle, index: 0 };
        return null === f && null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, !1)
          : f;
      },
      copy: function () {
        return 2 == this.children.length
          ? this.clone(this.children[1].copy(), this.children[0].copy())
          : this.clone(this.children[0].copy(), null);
      },
      getMathML: function () {
        var a = this.children[this.children.length - 1],
          b = 1 == this.children.length ? null : this.children[0];
        return null === b
          ? "<msqrt" +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              ">" +
              a.getMathML(!0) +
              "</msqrt>"
          : "<mroot" +
              (null === this.mathcolor ||
              "" == this.mathcolor ||
              "null" == this.mathcolor ||
              "#000000" == this.mathcolor
                ? ""
                : ' mathcolor="' + this.mathcolor + '"') +
              ">" +
              a.getMathML(!0) +
              b.getMathML(!0) +
              "</mroot>";
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PArray = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      numrows: 0,
      numcols: 0,
      tblframe: null,
      tblFrame: null,
      editor: null,
      info: null,
      initialize: function () {
        0 < arguments.length &&
          ((this.entries = Array.prototype.slice.call(arguments)),
          (this.numrows = this.entries.length),
          (this.numcols = this.entries[0].length));
        this.children = [];
        for (var a = 0; a < this.numrows; a++)
          for (var b = 0; b < this.numcols; b++)
            this.children.push(this.entries[a][b]);
        this.updateChildren();
        this.editor = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        null == this.editor &&
          alert("Error PArray.initialize: failed to get editor");
      },
      insertRows: function (a, b, d) {
        for (var e = b; e < b + d; e++)
          for (var f = 0; f < this.numcols; f++)
            this.children.splice(e * this.numcols + f, 0, a[e - b][f]);
        this.entries.splice.apply(this.entries, [b, 0].concat(a));
        this.numrows += d;
        this.updateChildren();
      },
      insertColumns: function (a, b, d) {
        for (var e = this.numrows - 1; 0 <= e; e--) {
          for (var f = 0; f < d; f++)
            this.children.splice(e * this.numcols + b + f, 0, a[e][f]);
          this.entries[e].splice.apply(this.entries[e], [b, 0].concat(a[e]));
        }
        this.numcols += d;
        this.updateChildren();
      },
      deleteRows: function (a, b) {
        var d = this.entries.splice(a, b);
        this.children.splice(a * this.numcols, b * this.numcols);
        this.updateChildren();
        this.numrows -= b;
        this.updateChildren();
        return d;
      },
      deleteColumns: function (a, b) {
        for (var d = [], e = this.numrows - 1; 0 <= e; e--)
          d.splice(0, 0, this.entries[e].splice(a, b)),
            this.children.splice(e * this.numcols + a, b);
        this.numcols -= b;
        this.updateChildren();
        return d;
      },
      actInsertRows: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = a.selection,
          f = null,
          g = null,
          h = a.cursor.position,
          l = h.etb.parray,
          m = null,
          t = null,
          k = null,
          n = Math.floor(l.startIndex / this.numcols),
          p = Math.floor(l.endIndex / this.numcols) + 1 - n,
          r = this.info,
          q = "front",
          u = n;
        "insertbelow" == b && ((u += p), (q = "behind"));
        var k = {
            info: this.info.copy(this.numrows, this.numcols),
            startRow: u,
            numRows: p,
          },
          v = { row: this, index: l.startIndex },
          y = h.row.getIndexChain(h.index),
          w = h.row.children[h.index];
        e.hasSelection &&
          ((m = this.children[l.startIndex]),
          (t = this.children[l.endIndex]),
          (f = e.getSelectionCopy()));
        l = h.row.children[h.index];
        if (null === l || void 0 === l) l = h.row.children[h.index - 1];
        for (var l = l.getSymbFontAttrbs(), z = [], A = 0; A < p; A++) {
          for (var C = [], D = 0; D < this.numcols; D++) {
            var B = new d.Row(new d.BlockSymbol());
            B.setSymbFontAttrbs(l);
            C.splice(0, 0, B);
          }
          z.splice(0, 0, C);
        }
        this.insertRows(z, u, p);
        r.rowalign = r.insertArrayAtttrbs(
          r.rowalign,
          n,
          n + p - 1,
          q,
          "baseline"
        );
        r.rows = r.insertArrayAtttrbs(r.rows, n, n + p - 1, q, "baseline");
        r.rowspacing = r.insertArrayAtttrbs(
          r.rowspacing,
          n,
          n + p - 1,
          q,
          "1.0ex"
        );
        r.rowlines = r.insertArrayAtttrbs(r.rowlines, n, n + p - 1, q, "none");
        r.populateData(this.numrows, this.numcols);
        d = {
          row: null !== w && void 0 !== w ? w.parent : h.row,
          index: null !== w && void 0 !== w ? w.index : h.index,
        };
        n = d.row.getIndexChain(d.index);
        e.hasSelection &&
          ((g = m.parent.getIndexChain(m.index)),
          (h = t.parent.getIndexChain(t.index)),
          (m = this.getSelection(
            e.startPosition,
            e.endPosition,
            m.index,
            t.index,
            g,
            h,
            e.rightMove
          )),
          e.setSelection(m),
          (n = e.endPosition.row.getIndexChain(e.endPosition.index)),
          (g = e.getSelectionCopy()));
        h = { row: d.row, index: d.index };
        a.cursor.setPosition(h);
        m = a.getButtonStatus();
        a.actions.addAction(b, v, y, n, k, null, null, f, g, m, m);
        a.cursor.setPosition(d);
        a.redraw(e.hasSelection);
      },
      actInsertColumns: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = a.selection,
          f = null,
          g = null,
          h = a.cursor.position,
          l = h.etb.parray,
          m = null,
          t = null,
          k = null,
          n = l.startIndex % this.numcols,
          p = (l.endIndex % this.numcols) + 1 - n,
          r = this.info,
          q = "front",
          u = n;
        "insertright" == b && ((u += p), (q = "behind"));
        var k = {
            info: this.info.copy(this.numrows, this.numcols),
            startCol: u,
            numCols: p,
          },
          v = { row: this, index: l.startIndex },
          y = h.row.getIndexChain(h.index),
          w = h.row.children[h.index];
        e.hasSelection &&
          ((m = this.children[l.startIndex]),
          (t = this.children[l.endIndex]),
          (f = e.getSelectionCopy()));
        l = h.row.children[h.index];
        if (null === l || void 0 === l) l = h.row.children[h.index - 1];
        for (
          var l = l.getSymbFontAttrbs(), z = [], A = 0;
          A < this.numrows;
          A++
        ) {
          for (var C = [], D = 0; D < p; D++) {
            var B = new d.Row(new d.BlockSymbol());
            B.setSymbFontAttrbs(l);
            C.splice(0, 0, B);
          }
          z.splice(A, 0, C);
        }
        this.insertColumns(z, u, p);
        r.colalign = r.insertArrayAtttrbs(
          r.colalign,
          n,
          n + p - 1,
          q,
          "center"
        );
        for (A = 0; A < this.numrows; A++)
          (r.rows[A].colalign = r.insertArrayAtttrbs(
            r.rows[A].colalign,
            n,
            n + p - 1,
            q,
            "center"
          )),
            (r.rows[A].cols = r.insertArrayAtttrbs(
              r.rows[A].cols,
              n,
              n + p - 1,
              q,
              "center"
            ));
        r.colspacing = r.insertArrayAtttrbs(
          r.colspacing,
          n,
          n + p - 1,
          q,
          "0.8em"
        );
        r.collines = r.insertArrayAtttrbs(r.collines, n, n + p - 1, q, "none");
        r.populateData(this.numrows, this.numcols);
        d = {
          row: null !== w && void 0 !== w ? w.parent : h.row,
          index: null !== w && void 0 !== w ? w.index : h.index,
        };
        h = d.row.getIndexChain(d.index);
        e.hasSelection &&
          ((g = m.parent.getIndexChain(m.index)),
          (h = t.parent.getIndexChain(t.index)),
          (m = this.getSelection(
            e.startPosition,
            e.endPosition,
            m.index,
            t.index,
            g,
            h,
            e.rightMove
          )),
          e.setSelection(m),
          (h = e.endPosition.row.getIndexChain(e.endPosition.index)),
          (g = e.getSelectionCopy()));
        this.updateEditTabButtons(a);
        m = a.getButtonStatus();
        a.actions.addAction(b, v, y, h, k, null, null, f, g, m, m);
        a.cursor.setPosition(d);
        a.redraw(e.hasSelection);
      },
      actDeleteRows: function (a) {
        var b = a.cursor.position,
          d = b.etb.parray,
          e = Math.floor(d.startIndex / this.numcols),
          f = Math.floor(d.endIndex / this.numcols) + 1,
          g = a.selection,
          h = null,
          l = null,
          m,
          t = "deleterows",
          k = null,
          l = this.info,
          d = { row: this, index: d.startIndex },
          n = b.row.getIndexChain(b.index),
          p = null;
        g.hasSelection && (h = g.getSelectionCopy());
        var r = a.getButtonStatus();
        if (f - e == this.numrows)
          (k = this.parent),
            (d = { row: k, index: this.index }),
            (l = { row: k, index: this.index }),
            (m = k.children.length - this.index - 1),
            (p = k.remove(this.index, this.index + 1, !0)),
            (t = "delete");
        else {
          var q = b.row.children[b.index];
          if (null === q || void 0 === q) q = b.row.children[b.index - 1];
          q = this.getAncestorOf(q);
          p = q.index;
          p =
            f < this.numrows
              ? f * this.numcols + (p % this.numcols)
              : (e - 1) * this.numcols + (p % this.numcols);
          q = this.children[p];
          p = {
            entries: this.deleteRows(e, f - e),
            info: this.info.copy(this.numrows, this.numcols),
            startRow: e,
            numRows: f - e,
          };
          l.rowalign = l.deleteArrayAtttrbs(
            l.rowalign,
            e,
            f - 1,
            this.numrows,
            !0,
            "baseline"
          );
          l.rows = l.deleteArrayAtttrbs(l.rows, e, f - 1, this.numrows, !1);
          l.rowspacing = l.deleteArrayAtttrbs(
            l.rowspacing,
            f - 1,
            this.numrows,
            !0,
            "1.0ex"
          );
          l.rowlines = l.deleteArrayAtttrbs(
            l.rowlines,
            e,
            f - 1,
            this.numrows,
            !0,
            "none"
          );
          l.populateData(this.numrows, this.numcols);
          l = { row: q, index: 0 };
        }
        e = l.row.getIndexChain(l.index);
        g.clear();
        a.cursor.setPosition(l);
        f = a.getButtonStatus();
        null === k && this.updateEditTabButtons(a);
        a.actions.addAction(t, d, n, e, p, null, m, h, null, r, f);
        a.redraw(g.hasSelection);
      },
      actDeleteColumns: function (a) {
        var b = a.cursor.position,
          d = b.etb.parray,
          e = d.startIndex % this.numcols,
          f = (d.endIndex % this.numcols) + 1,
          g = a.selection,
          h = null,
          l = null,
          m,
          t = "deletecolumns",
          k = null,
          l = this.info,
          d = { row: this, index: d.startIndex },
          n = b.row.getIndexChain(b.index),
          p = null;
        g.hasSelection && (h = g.getSelectionCopy());
        var r = a.getButtonStatus();
        if (f - e == this.numcols)
          (k = this.parent),
            (d = { row: k, index: this.index }),
            (l = { row: k, index: this.index }),
            (m = k.children.length - this.index - 1),
            (p = k.remove(this.index, this.index + 1, !0)),
            (t = "delete");
        else {
          var q = b.row.children[b.index];
          if (null === q || void 0 === q) q = b.row.children[b.index - 1];
          q = this.getAncestorOf(q);
          p = q.index;
          p =
            f < this.numcols
              ? Math.floor(p / this.numcols) * this.numcols + f
              : Math.floor(p / this.numcols) * this.numcols + e - 1;
          q = this.children[p];
          p = {
            entries: this.deleteColumns(e, f - e),
            info: this.info.copy(this.numrows, this.numcols),
            startCol: e,
            numCols: f - e,
          };
          l.colalign = l.deleteArrayAtttrbs(
            l.colalign,
            e,
            f - 1,
            this.numcols,
            !0,
            "center"
          );
          for (b = 0; b < this.numrows; b++)
            (l.rows[b].colalign = l.deleteArrayAtttrbs(
              l.rows[b].colalign,
              e,
              f - 1,
              this.numcols,
              !1
            )),
              (l.rows[b].cols = l.deleteArrayAtttrbs(
                l.rows[b].cols,
                e,
                f - 1,
                this.numcols,
                !1
              ));
          l.colspacing = l.deleteArrayAtttrbs(
            l.colspacing,
            f - 1,
            this.numcols,
            !0,
            "0.8em"
          );
          l.collines = l.deleteArrayAtttrbs(
            l.collines,
            e,
            f - 1,
            this.numcols,
            !0,
            "none"
          );
          l.populateData(this.numrows, this.numcols);
          l = { row: q, index: 0 };
        }
        e = l.row.getIndexChain(l.index);
        g.clear();
        a.cursor.setPosition(l);
        f = a.getButtonStatus();
        null === k && this.updateEditTabButtons(a);
        a.actions.addAction(t, d, n, e, p, null, m, h, null, r, f);
        a.redraw(g.hasSelection);
      },
      getSelection: function (a, b, d, e, f, g, h) {
        var l = null,
          m = this.entries,
          t = Math.floor(d / this.numcols);
        d %= this.numcols;
        var k = Math.floor(e / this.numcols);
        e %= this.numcols;
        a = {
          parent: this,
          startPosition: { row: a.row, index: a.index },
          endPosition: { row: b.row, index: b.index },
          startIndex: t * this.numcols + d,
          endIndex: k * this.numcols + e + 1,
          startIndexChain: f,
          endIndexChain: g,
          rightMove: h,
          dimensions: null,
        };
        if (null === a.startIndex || null === a.endIndex) return null;
        for (b = Math.min(t, k); b <= Math.max(t, k); b++)
          for (f = Math.min(d, e); f <= Math.max(d, e); f++)
            (g = m[b][f]),
              null === l
                ? (l = {
                    top: g.dimensions.top,
                    left: g.dimensions.left,
                    width: g.dimensions.width,
                    height: g.dimensions.height,
                  })
                : ((l.top = Math.min(l.top, g.dimensions.top)),
                  (l.left = Math.min(l.left, g.dimensions.left)),
                  (l.width =
                    Math.max(
                      l.left + l.width,
                      g.dimensions.left + g.dimensions.width
                    ) - Math.min(l.left, g.dimensions.left)),
                  (l.height =
                    Math.max(
                      l.top + l.height,
                      g.dimensions.top + g.dimensions.height
                    ) - Math.min(l.top, g.dimensions.top)));
        a.dimensions = l;
        return a;
      },
      getSelectedArea: function (a, b) {
        var d = null,
          e = this.entries,
          f = Math.floor(a / this.numcols),
          g = a % this.numcols,
          h = Math.floor(b / this.numcols),
          l = b % this.numcols;
        if (null === a || null === b)
          throw Error("PArray failed to find input children.");
        for (var m = Math.min(f, h); m <= Math.max(f, h); m++)
          for (var t = Math.min(g, l); t <= Math.max(g, l); t++) {
            var k = e[m][t];
            null === d
              ? (d = {
                  top: k.dimensions.top,
                  left: k.dimensions.left,
                  width: k.dimensions.width,
                  height: k.dimensions.height,
                })
              : ((d.top = Math.min(d.top, k.dimensions.top)),
                (d.left = Math.min(d.left, k.dimensions.left)),
                (d.width =
                  Math.max(
                    d.left + d.width,
                    k.dimensions.left + k.dimensions.width
                  ) - Math.min(d.left, k.dimensions.left)),
                (d.height =
                  Math.max(
                    d.top + d.height,
                    k.dimensions.top + k.dimensions.height
                  ) - Math.min(d.top, k.dimensions.top)));
          }
        return d;
      },
      deleteValues: function (a, b) {
        var d = this.entries,
          e = Math.floor(a / this.numcols),
          f = a % this.numcols,
          g = Math.floor(b / this.numcols),
          h = b % this.numcols,
          l = [];
        if (null === a || null === b)
          throw Error("PArray failed to find input children.");
        for (var m = 0, t = Math.min(e, g); t <= Math.max(e, g); t++)
          for (var k = Math.min(f, h); k <= Math.max(f, h); k++) {
            var n = d[t][k];
            l[m++] = n.remove(0, n.children.length, !0);
          }
        return l;
      },
      updateValues: function (a, b, d) {
        var e = this.entries,
          f = Math.floor(b / this.numcols),
          g = b % this.numcols,
          h = Math.floor(d / this.numcols),
          l = d % this.numcols,
          m = Math.min(f, h),
          f = Math.max(f, h),
          h = Math.min(g, l),
          g = Math.max(g, l);
        if (null === b || null === d)
          throw Error("PArray failed to find input children.");
        b = 0;
        for (d = m; d <= f; d++)
          for (l = h; l <= g; l++) {
            var t = e[d][l];
            for (
              value =
                a instanceof Array
                  ? a[b++]
                  : a instanceof org.imatheq.formulaeditor.presentation.PArray
                  ? a.entries[(d - m) % a.columns][(l - h) % a.rows].copy()
                  : a.copy();
              0 < value.children.length;

            )
              t.insert(0, value.children.pop());
          }
        return [];
      },
      setSymbFontAttrbs: function (a, b, d) {
        var e = this.entries,
          f,
          g,
          h,
          l;
        if (null === b || void 0 === b)
          (h = f = 0), (g = e.length - 1), (l = e[0].length - 1);
        else {
          g = Math.floor(b / this.numcols);
          h = Math.floor(d / this.numcols);
          f = Math.min(g, h);
          g = Math.max(g, h);
          l = b % this.numcols;
          var m = d % this.numcols;
          h = Math.min(l, m);
          l = Math.max(l, m);
        }
        m = [];
        if (null === b || null === d)
          throw Error("PArray failed to find input children.");
        for (b = 0; f <= g; f++)
          for (d = h; d <= l; d++) {
            var t = e[f][d];
            m[b++] = t.copy();
            t.setSymbFontAttrbs(a);
          }
        this.setSymbFontAttrbs.parent.setSymbFontAttrbs.call(this, a);
        return m;
      },
      setStylingAttrbs: function (a, b, d) {
        var e = a.startIndex % this.numcols,
          f = a.endIndex % this.numcols,
          g = Math.floor(a.startIndex / this.numcols);
        a = Math.floor(a.endIndex / this.numcols);
        var h = 0 == e && f == this.numcols - 1,
          l = 0 == g && a == this.numrows - 1,
          m = this.info;
        switch (b) {
          case "rowalign":
            if (h)
              for (
                m.rowalign = m.populateArrayAtttrbs(
                  m.rowalign,
                  g,
                  a,
                  this.numrows,
                  d,
                  "baseline"
                ),
                  b = g;
                b <= a;
                b++
              ) {
                if (void 0 !== m.rows[b])
                  for (m.rows[b].rowalign = null, g = 0; g < this.cols; g++)
                    m.clearColAttrb(b, g, "rowalign");
              }
            else
              for (b = g; b <= a; b++)
                for (g = e; g <= f; g++) m.setColAttrb(b, g, "rowalign", d);
            break;
          case "colalign":
            if (l) {
              m.colalign = m.populateArrayAtttrbs(
                m.colalign,
                e,
                f,
                this.numcols,
                d,
                "center"
              );
              for (b = 0; b < this.numrows; b++)
                m.rows[b] = m.populateArrayAtttrbs(
                  m.rows[b],
                  e,
                  f,
                  this.numcols,
                  d,
                  "center"
                );
              for (g = e; g <= f; g++)
                for (b = 0; b < this.numrows; b++)
                  void 0 !== m.rows[b] &&
                    (m.rows[b].colalign &&
                      void 0 !== m.rows[b].colalign[g] &&
                      delete m.rows[b].colalign[g],
                    m.clearColAttrb(b, g, "colalign"));
            } else
              for (b = g; b <= a; b++)
                for (g = e; g <= f; g++) m.setColAttrb(b, g, "colalign", d);
            break;
          case "addframe":
            m.frame = this.editor.getPArrayLine();
            break;
          case "removeframe":
            m.frame = "none";
            break;
          case "addrowline":
            m.rowlines = m.populateArrayAtttrbs(
              m.rowlines,
              g,
              a,
              this.numrows,
              this.editor.getPArrayLine(),
              "none"
            );
            break;
          case "removerowline":
            m.rowlines = m.populateArrayAtttrbs(
              m.rowlines,
              g,
              a,
              this.numrows,
              "none",
              "none"
            );
            break;
          case "addcolline":
            m.collines = m.populateArrayAtttrbs(
              m.collines,
              e,
              f,
              this.numcols,
              this.editor.getPArrayLine(),
              "none"
            );
            break;
          case "removecolline":
            m.collines = m.populateArrayAtttrbs(
              m.collines,
              e,
              f,
              this.numcols,
              "none",
              "none"
            );
            break;
          case "setsolidline":
            this.editor.setPArrayLine("solid");
            break;
          case "setdashedline":
            this.editor.setPArrayLine("dashed");
            break;
          case "toggleequalrows":
            m.equalrows = m.equalrows && "true" == m.equalrows ? null : "true";
            break;
          case "toggleequalcols":
            m.equalcols = m.equalcols && "true" == m.equalcols ? null : "true";
            break;
          case "rowspacing":
            m.rowspacing = m.populateArrayAtttrbs(
              m.rowspacing,
              g,
              a,
              this.numrows,
              d,
              "1.0ex"
            );
            break;
          case "colspacing":
            m.colspacing = m.populateArrayAtttrbs(
              m.colspacing,
              e,
              f,
              this.numcols,
              d,
              "0.8em"
            );
        }
      },
      updateEditTabButtons: function (a) {
        etb = a.cursor.position.etb.parray;
        var b = etb.startIndex % this.numcols,
          d = Math.floor(etb.startIndex / this.numcols),
          e = "none";
        a = "none";
        e = this.info.infod.cells[d][b].rowalign;
        a = this.info.infod.cells[d][b].colalign;
        for (
          var b = etb.startIndex % this.numcols,
            d = Math.floor(etb.startIndex / this.numcols),
            f = etb.endIndex % this.numcols,
            g = Math.floor(etb.endIndex / this.numcols),
            h = document.querySelectorAll('[id^="PARRAY_ROW_ALIGN_"]'),
            l = "PARRAY_ROW_ALIGN_" + e.toUpperCase(),
            e = 0;
          e < h.length;
          e++
        ) {
          var m = h[e].id;
          m == l
            ? h[e].classList.add("efmase_palettebutton_select")
            : h[e].classList.remove("efmase_palettebutton_select");
        }
        h = document.querySelectorAll('[id^="PARRAY_COL_ALIGN_"]');
        l = "PARRAY_COL_ALIGN_" + a.toUpperCase();
        for (e = 0; e < h.length; e++)
          (m = h[e].id),
            m == l
              ? h[e].classList.add("efmase_palettebutton_select")
              : h[e].classList.remove("efmase_palettebutton_select");
        a = document.querySelectorAll('[id^="PARRAY_INS_DEL_"]');
        for (e = 0; e < a.length; e++)
          (h = (f - b + 1).toString()),
            -1 != a[e].id.indexOf("PARRAY_INS_DEL_ROW_") &&
              (h = (g - d + 1).toString()),
            (a[e].title = a[e].title.replace(/[0-9]+/, h)),
            (a[e].firstChild.alt = a[e].title.replace(/[0-9]+/, h)),
            (a[e].firstChild.title = a[e].title.replace(/[0-9]+/, h));
        a = document.getElementById("PARRAY_ROW_H_EQUAL");
        this.info.infod.equalrows
          ? a.classList.add("efmase_palettebutton_select")
          : a.classList.remove("efmase_palettebutton_select");
        a = document.getElementById("PARRAY_COL_W_EQUAL");
        this.info.infod.equalcols
          ? a.classList.add("efmase_palettebutton_select")
          : a.classList.remove("efmase_palettebutton_select");
      },
      getMathML: function () {
        var a = this.entries,
          b = this.info,
          d;
        d = "<mtable" + (b.frame ? ' frame="' + b.frame + '"' : "");
        d += b.displaystyle ? ' displaystyle="' + b.displaystyle + '"' : "";
        d += b.side ? ' side="' + b.side + '"' : "";
        d += b.width ? ' width="' + b.width + '"' : "";
        d += b.groupalign ? ' groupalign="' + b.groupalign + '"' : "";
        d += b.alignmentscope
          ? ' alignmentscope="' + b.alignmentscope + '"'
          : "";
        d += b.colwidth ? ' columnwidth="' + b.colwidth + '"' : "";
        d += b.minlabelspacing
          ? ' minlabelspacing="' + b.minlabelspacing + '"'
          : "";
        d += b.equalrows ? ' equalrows="' + b.equalrows + '"' : "";
        d += b.equalcols ? ' equalcolumns="' + b.equalcols + '"' : "";
        if (b.align) {
          var e = b.align;
          b.alignrow && e + " " + b.alignrow.toString();
          d += ' align="' + e + '"';
        }
        b.vspacing && (d += ' framespacing="' + e + '"');
        e = function (a, b, d) {
          var g = "";
          if (null !== a && void 0 !== a && a[b]) {
            for (var e = a[b][0], h = 1; h < a[b].length; h++)
              e += " " + a[b][h];
            g += " " + d + '="' + e + '"';
          }
          return g;
        };
        d += e(b, "rowspacing", "rowspacing");
        d += e(b, "rowlines", "rowlines");
        d += e(b, "rowalign", "rowalign");
        d += e(b, "colspacing", "columnspacing");
        d += e(b, "collines", "columnlines");
        d += e(b, "colalign", "columnalign");
        d += ">";
        for (var f = 0; f < a.length; f++) {
          d += "<mtr";
          d += e(b.rows[f], "rowalign", "rowalign");
          d += e(b.rows[f], "colalign", "columnalign");
          d += b.rows[f].groupalign
            ? ' groupalign="' + b.rows[f].groupalign + '"'
            : "";
          d += ">";
          for (var g = 0; g < a[f].length; g++) {
            var h = "<mtd",
              h =
                h +
                (b.rows[f].cols[g].rowspan
                  ? ' rowspan="' + b.rows[f].cols[g].rowspan + '"'
                  : ""),
              h =
                h +
                (b.rows[f].cols[g].colspan
                  ? ' columnspan="' + b.rows[f].cols[g].colspan + '"'
                  : ""),
              h =
                h +
                (b.rows[f].cols[g].rowalign
                  ? ' rowalign="' + b.rows[f].cols[g].rowalign + '"'
                  : ""),
              h =
                h +
                (b.rows[f].cols[g].colalign
                  ? ' columnalign="' + b.rows[f].cols[g].colalign + '"'
                  : ""),
              h =
                h +
                (b.rows[f].cols[g].groupalign
                  ? ' groupalign="' + b.rows[f].cols[g].groupalign + '"'
                  : ""),
              h = h + ">",
              h = h + (a[f][g].getMathML() + "</mtd>");
            d += "<mtd><mrow/></mtd>" == h ? "<mtd/>" : h;
          }
          d += "</mtr>";
        }
        return d + "</mtable>";
      },
      getSelectionMathML: function (a, b, d) {
        a = this.entries;
        var e = Math.floor(b / this.numcols),
          f = b % this.numcols,
          g = Math.floor(d / this.numcols),
          h = d % this.numcols;
        b = Math.min(e, g);
        d = Math.min(f, h);
        e = Math.max(e, g);
        f = Math.max(f, h);
        for (
          g = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtable>';
          b <= e;
          b++
        ) {
          g += "<mtr>";
          for (h = d; h <= f; h++)
            (g += "<mtd>"), (g += a[b][h].getMathML()), (g += "</mtd>");
          g += "</mtr>";
        }
        return g + "</mtable></math>";
      },
      getMaxHeight: function (a) {
        for (var b = 0, d = 0, e = 0; e < this.numcols; e++)
          (b = Math.min(b, this.entries[a][e].dimensions.top)),
            (d = Math.max(
              d,
              this.entries[a][e].dimensions.top +
                this.entries[a][e].dimensions.height
            ));
        return { height: d - b, top: b, bottom: d };
      },
      getMaxWidth: function (a) {
        for (var b = 0, d = 0; d < this.numrows; d++)
          b = Math.max(b, this.entries[d][a].dimensions.width);
        return b;
      },
      draw: function (a, b, d, e, f) {
        var g,
          h = org.imatheq.formulaeditor.presentation;
        g = b.fontSizeModifier;
        this.editor.canvas.getFontSizeIdx(g);
        var l = a.getLinewidth(b.fontModifier),
          m = a.getMargin(b.fontModifier),
          t = 0,
          k = this.info,
          n = this.info.infod;
        "none" != n.frame
          ? ((n.vspacing =
              null === k.vspacing ? null : a.getPXSize(k.vspacing, g)),
            (n.vspacing =
              null === n.vspacing ? a.getPXSize("0.5ex", g) : n.vspacing),
            (n.hspacing =
              null === k.hspacing ? null : a.getPXSize(k.hspacing, g)),
            (n.hspacing =
              null === n.hspacing ? a.getPXSize("0.4em", g) : n.hspacing))
          : ((n.vspacing = m), (n.hspacing = m));
        n.rowspacing = [];
        for (var p = 0; p < this.numrows; p++)
          (n.rowspacing[p] =
            null === k.rowspacing || void 0 === k.rowspacing[p]
              ? null
              : a.getPXSize(k.rowspacing[p], g)),
            null === n.rowspacing[p] &&
              (n.rowspacing[p] =
                0 == p ? a.getPXSize("1.0ex", g) : n.rowspacing[p - 1]);
        n.colspacing = [];
        for (p = 0; p < this.numcols; p++)
          (n.colspacing[p] =
            null === k.colspacing || void 0 === k.colspacing[p]
              ? null
              : a.getPXSize(k.colspacing[p], g)),
            null === n.colspacing[p] &&
              (n.colspacing[p] =
                0 == p ? a.getPXSize("0.8em", g) : n.colspacing[p - 1]);
        for (g = 0; g < this.numrows; g++)
          for (k = 0; k < this.numcols; k++)
            this.entries[g][k] && this.entries[g][k].draw
              ? this.entries[g][k].draw(a, b, 0, 0, !0)
              : alert("PArray could not draw row:" + g + ", col:" + k + ".");
        k = 0;
        arrRowInfo = [];
        for (g = 0; g < this.numrows; g++)
          (arrRowInfo[g] = this.getMaxHeight(g)),
            n.equalrows && (k = Math.max(k, arrRowInfo[g].height));
        n.maxRowHeight = k;
        for (g = 0; g < this.numrows; g++) {
          var p = Math.max(k, arrRowInfo[g].height),
            r,
            q,
            u;
          0 === g
            ? ((u = 0),
              (r = u + arrRowInfo[g].top - (p - arrRowInfo[g].height) / 2),
              (q = r + p / 2),
              (t += p + n.vspacing + m))
            : ((r =
                n.rows[g - 1].top + n.rows[g - 1].height + n.rowspacing[g - 1]),
              (q = r + p / 2),
              (u = r - arrRowInfo[g].top + (p - arrRowInfo[g].height) / 2),
              (t += p + n.rowspacing[g - 1]));
          n.rows[g].height = p;
          n.rows[g].top = r;
          n.rows[g].center = q;
          n.rows[g].baseline = u;
        }
        t += n.vspacing + m;
        g = new h.Symbol("x").draw(a, b, d, e, !0);
        k =
          Math.round((t - 2 * n.vspacing - 2 * m) / 2) +
          n.rows[0].top +
          Math.round(0.6 * g.height - 0.5);
        for (g = 0; g < this.numrows; g++)
          (n.rows[g].top -= k),
            (n.rows[g].center -= k),
            (n.rows[g].baseline -= k);
        g = h = 0;
        arrColInfo = [];
        for (k = 0; k < this.numcols; k++)
          (arrColInfo[k] = this.getMaxWidth(k)),
            n.equalcols && (g = Math.max(g, arrColInfo[k]));
        for (k = 0; k < this.numcols; k++)
          (p = Math.max(g, arrColInfo[k])),
            0 === k
              ? ((colCenter = p / 2 + n.hspacing + m),
                (h += p + n.hspacing + m))
              : ((colCenter =
                  n.cols[k - 1].center +
                  n.cols[k - 1].width / 2 +
                  n.colspacing[k - 1] +
                  p / 2),
                (h += p + n.colspacing[k - 1] + m)),
            (n.cols[k].left = colCenter - p / 2),
            (n.cols[k].width = p),
            (n.cols[k].center = colCenter);
        h += n.hspacing;
        n.framedim = {
          left: d + m,
          top: e + n.rows[0].top - n.vspacing,
          width: h - 2 * m,
          height: t - 2 * m,
        };
        if (!f) {
          for (g = 0; g < this.numrows; g++) {
            for (k = 0; k < this.numcols; k++) {
              p = this.entries[g][k];
              r = p.dimensions.width;
              u = p.dimensions.height;
              var v = p.dimensions.top;
              q = e + n.rows[g].baseline;
              var y = n.rows[g].baseline + v;
              switch (n.cells[g][k].rowalign) {
                case "top":
                  var w = n.rows[g].top;
                  q -= y - w;
                  break;
                case "bottom":
                  w = n.rows[g].top + n.rows[g].height - u;
                  q += w - y;
                  n.rows[g].top + n.rows[g].height - v - u;
                  break;
                case "center":
                  (w = n.rows[g].center - u / 2), (q += w - y);
              }
              u = d + n.cols[k].center - r / 2;
              v = n.cells[g][k].colalign;
              "left" == v
                ? (u = d + n.cols[k].left)
                : "right" == v &&
                  (u = d + n.cols[k].left + n.cols[k].width - r);
              p.draw(a, b, u, q, f);
              g == this.numrows - 1 &&
                "none" != n.collines[k] &&
                ((p = a.getContext()),
                (r =
                  d + n.cols[k].left + n.cols[k].width + n.colspacing[k] / 2),
                p.save(),
                "dashed" == n.collines[k] && p.setLineDash([5, 3]),
                (p.strokeStyle = this.mathcolor),
                (p.lineWidth = l),
                p.beginPath(),
                p.moveTo(r, n.framedim.top),
                p.lineTo(r, n.framedim.top + n.framedim.height - l),
                p.stroke(),
                p.closePath(),
                p.restore());
            }
            "none" != n.rowlines[g] &&
              ((p = a.getContext()),
              (k = e + n.rows[g].top + n.rows[g].height + n.rowspacing[g] / 2),
              p.save(),
              "dashed" == n.rowlines[g] && p.setLineDash([5, 3]),
              (p.strokeStyle = this.mathcolor),
              (p.lineWidth = l),
              p.beginPath(),
              p.moveTo(n.framedim.left, k),
              p.lineTo(n.framedim.left + n.framedim.width - l, k),
              p.stroke(),
              p.closePath(),
              p.restore());
          }
          "none" != n.frame &&
            this.editor.canvas.drawBox(
              n.framedim,
              this.mathcolor,
              l,
              null,
              null,
              "dashed" == n.frame ? [5, 3] : null
            );
        }
        return (this.dimensions = {
          top: e + n.rows[0].top - n.vspacing - m,
          left: d,
          width: h,
          height: t,
        });
      },
      getCoordinatesFromPosition: function (a, b) {
        var d, e;
        for (
          d = 0;
          d < this.numrows - 1 &&
          b >
            this.entries[d][0].dimensions.top -
              (this.info.infod.rows[d].height -
                this.entries[d][0].dimensions.height) /
                2 +
              this.info.infod.rows[d].height;

        )
          d++;
        for (
          e = 0;
          e < this.numcols - 1 &&
          a >
            this.dimensions.left +
              this.info.infod.cols[e].left +
              this.info.infod.cols[e].width;

        )
          e++;
        return { row: d, col: e };
      },
      getEntryFromPosition: function (a, b) {
        var d = this.getCoordinatesFromPosition(a, b);
        return this.entries[d.row][d.col];
      },
      getCursorPosition: function (a, b, d) {
        return b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
          ? this.getEntryFromPosition(b, d).getCursorPosition(a, b, d)
          : b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        var e = null,
          f;
        if (!0 === a.continuingNavigation)
          return (
            null === b || void 0 === b
              ? (e = this.children[0].getFollowingCursorPosition(a, null, d))
              : b + 1 < this.children.length &&
                (e = this.children[b + 1].getFollowingCursorPosition(
                  a,
                  null,
                  d
                )),
            (null !== e && void 0 !== e) ||
              null === this.parent ||
              (e = this.parent.getFollowingCursorPosition(a, this.index, !1)),
            e
          );
        if (null === b || void 0 === b) {
          for (
            f = middle = Math.floor(this.numrows / 2);
            null === e && 0 <= f && f < this.numrows;

          )
            (e = this.entries[f][0].getFollowingCursorPosition(a, null, d)),
              (f = f >= middle ? 2 * middle - f - 1 : 2 * middle - f);
          return e;
        }
        f = Math.floor(b / this.numcols);
        b %= this.numcols;
        b + 1 < this.numcols &&
          (e = this.entries[f][b + 1].getFirstCursorPosition(a, null, d));
        (null !== e && void 0 !== e) ||
          null === this.parent ||
          (e = this.parent.getFollowingCursorPosition(a, this.index, !1));
        return e;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        var e = null,
          f = null,
          g = null;
        if (!0 === a.continuingNavigation)
          return (
            null === b || void 0 === b
              ? 0 < this.children.length &&
                (e = this.children[
                  this.children.length - 1
                ].getPrecedingCursorPosition(a, null, d))
              : 0 < b &&
                (e = this.children[b - 1].getPrecedingCursorPosition(
                  a,
                  null,
                  d
                )),
            (null !== e && void 0 !== e) ||
              null === this.parent ||
              (e = this.parent.getPrecedingCursorPosition(a, this.index, !1)),
            e
          );
        if (null === b || void 0 === b) {
          for (
            f = b = Math.floor(this.numrows / 2);
            null === e && 0 <= f && f < this.numrows;

          )
            (g = this.entries[f].length - 1),
              (e = this.entries[f][g].getPrecedingCursorPosition(a, null, d)),
              (f = f >= b ? 2 * b - f - 1 : 2 * b - f);
          return e;
        }
        0 < b &&
          ((f = Math.floor(b / this.numcols)),
          (g = b % this.numcols),
          0 < g &&
            (e = this.entries[f][g - 1].getLastCursorPosition(a, null, d)));
        (null !== e && void 0 !== e) ||
          null === this.parent ||
          (e = this.parent.getPrecedingCursorPosition(a, this.index, !1));
        return e;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        if (null === b || void 0 === b)
          return this.entries[0][0].getLowerCursorPosition(a, null, d, e);
        var f = Math.floor(b / this.numcols);
        b %= this.numcols;
        var g;
        f + 1 < this.numrows &&
          (g = this.entries[f + 1][b].getLowerCursorPosition(a, null, d, e));
        (null !== g && void 0 !== g) ||
          null === this.parent ||
          (g = this.parent.getLowerCursorPosition(a, this.index, d, e));
        return g;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        if (null === b || void 0 === b)
          return this.entries[0][this.numrows - 1].getHigherCursorPosition(
            a,
            null,
            d,
            e
          );
        if (b < this.children.length) {
          var f = Math.floor(b / this.numcols);
          b %= this.numcols;
          var g;
          0 < f &&
            (g = this.entries[f - 1][b].getHigherCursorPosition(a, null, d, e));
          (null !== g && void 0 !== g) ||
            null === this.parent ||
            (g = this.parent.getHigherCursorPosition(a, this.index, d, e));
          return g;
        }
        return null;
      },
      copy: function () {
        parray = this.clone.apply(this, this.copyArray(this.entries));
        parray.info = this.info.copy(this.numrows, this.numcols);
        return parray;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PArray.Info = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      align: null,
      alignrow: null,
      spacing: null,
      frame: null,
      displaystyle: null,
      side: null,
      width: null,
      groupalign: null,
      alignmentscope: null,
      colwidth: null,
      width: null,
      minlabelspacing: null,
      rowspacing: null,
      rowlines: null,
      rowalign: null,
      equalrows: null,
      colspacing: null,
      collines: null,
      colalign: null,
      equalcols: null,
      rows: null,
      cols: null,
      infod: null,
      initialize: function () {
        var a = org.imatheq.formulaeditor.presentation;
        if (1 == arguments.length && arguments[0] instanceof a.PArray)
          for (
            a = arguments[0], this.rows = [], row = 0;
            row < a.numrows;
            row++
          )
            for (
              this.rows[row] = {
                rowalign: null,
                colalign: null,
                groupalign: null,
                cols: [],
              },
                col = 0;
              col < a.numcols;
              col++
            )
              this.rows[row].cols[col] = {
                rowspan: null,
                colspan: null,
                rowalign: null,
                colalign: null,
                groupalign: null,
              };
        else if (1 == arguments.length) {
          var a = arguments[0],
            b = /s*(true|false)s*/,
            d = a.getAttribute("align"),
            e = /s*(top|bottom|center|baseline|axis)(s+-?[0-9]+)?s*/;
          d &&
            e.test(d) &&
            ((d = d.split(/\s+/)),
            (this.align = d[0]),
            (this.alignrow = 1 < arrAlign.length ? parseInt(arrAlign[1]) : 0));
          (d = a.getAttribute("frame")) &&
            /s*(none|solid|dashed)s*/.test(d) &&
            (this.frame = d);
          a.getAttribute("framespacing") &&
            ((d = fspacing.split(/\s+/)),
            (this.hspacing = arrFSpacing[0]),
            (this.vspacing = 0 < d.length ? arrFSpacing[1] : null));
          (d = a.getAttribute("displaystyle")) &&
            b.test(d) &&
            (this.displaystyle = d);
          d = a.getAttribute("side");
          e = /s*(left|right|leftoverlap|rightoverlap)s*/;
          d && e.test(d) && (this.side = d);
          d = parseInt(a.getAttribute("width"));
          isNaN(d) || (this.width = d);
          this.groupAlign = a.getAttribute("groupalign");
          this.alignmentscope = a.getAttribute("alignmentscope");
          this.colwidth = a.getAttribute("columnwidth");
          this.width = a.getAttribute("width");
          this.minLabelSpacing = a.getAttribute("minlabelspacing");
          (d = a.getAttribute("rowspacing")) &&
            "" != d.trim() &&
            (this.rowspacing = d.trim().split(/\s+/));
          (d = a.getAttribute("columnspacing")) &&
            "" != d.trim() &&
            (this.colspacing = d.trim().split(/\s+/));
          d = /s*(none|solid|dashed)s*(s+(none|solid|dashed)s*)*/;
          (e = a.getAttribute("rowlines")) &&
            d.test(e) &&
            (this.rowlines = e.trim().split(/\s+/));
          (e = a.getAttribute("columnlines")) &&
            d.test(e) &&
            (this.collines = e.trim().split(/\s+/));
          d = a.getAttribute("rowalign");
          e = /s*(top|bottom|center|baseline|axis)s*(s+(top|bottom|center|baseline|axis)s*)*/;
          d && e.test(d) && (this.rowalign = d.trim().split(/\s+/));
          d = a.getAttribute("columnalign");
          e = /s*(left|center|right)s*(s+(left|center|right)s*)*/;
          d && e.test(d) && (this.colalign = d.trim().split(/\s+/));
          (d = a.getAttribute("equalrows")) &&
            b.test(d) &&
            (this.equalrows = d.trim());
          (d = a.getAttribute("equalcolumns")) &&
            b.test(d) &&
            (this.equalcols = d.trim());
          b = a.childNodes.length;
          for (row = d = 0; row < b; row++)
            for (
              e = a.childNodes.item(row),
                this.setRowAttrbs(row, e),
                d = Math.max(d, e.childNodes.length),
                col = 0;
              col < e.childNodes.length;
              col++
            ) {
              var f = e.childNodes.item(col);
              this.setColAttrbs(row, col, f);
            }
          this.populateData(b, d);
        } else
          1 < arguments.length &&
            ((this.rows = arguments[0]),
            (this.cols = arguments[1]),
            (this.rowspacing = arguments[2]),
            (this.colspacing = arguments[3]),
            (this.rowlines = arguments[4]),
            (this.collines = arguments[5]),
            (this.rowalign = arguments[6]),
            (this.colalign = arguments[7]),
            this.populateData(b, d));
      },
      setRowAttrbs: function (a, b) {
        this.rows || (this.rows = []);
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            cols: [],
          });
        var d = b.getAttribute("rowalign"),
          e = /s*(top|bottom|center|baseline|axis)s*/;
        d && e.test(d) && (this.rows[a].rowalign = d.trim());
        d = b.getAttribute("columnalign");
        e = /s*(left|center|right)s*(s+(left|center|right)s*)*/;
        d && e.test(d) && (this.rows[a].colalign = d.split(/\s+/));
        this.rows[a].groupAlign = b.getAttribute("groupalign");
      },
      setColAttrbs: function (a, b, d) {
        this.rows || (this.rows = []);
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            cols: [],
          });
        var e = this.rows[a].cols;
        void 0 === e[b] &&
          (e[b] = {
            rowspan: null,
            colspan: null,
            rowalign: null,
            colalign: null,
            groupalign: null,
          });
        var f = parseInt(d.getAttribute("rowspan"));
        isNaN(f) || (e[b].rowspan = f);
        f = parseInt(d.getAttribute("colspan"));
        isNaN(f) || (e[b].colspan = f);
        var f = d.getAttribute("rowalign"),
          g = /s*(top|bottom|center|baseline|axis)s*/;
        f && g.test(f) && (e[b].rowalign = f.trim());
        f = d.getAttribute("columnalign");
        g = /s*(left|center|right)s*/;
        f && g.test(f) && (e[b].colalign = f.trim());
        this.rows[a].groupAlign = d.getAttribute("groupalign");
      },
      mergeArrayAtttrbs: function (a, b) {
        for (var d = a.length, e = a[d - 1], d = d - 2; 0 <= d; d--)
          a[d] == e && a.splice(-1, 1);
        if (0 == a.length || (1 == a.length && a[0] == b)) a = null;
        return a;
      },
      populateArrayAtttrbs: function (a, b, d, e, f, g) {
        a || (a = []);
        for (var h = a.length; h < b; h++)
          a[h] = 0 == a.length ? g : a[a.length - 1];
        d + 1 >= a.length &&
          d + 1 < e &&
          (a[d + 1] = 0 == a.length ? g : a[a.length - 1]);
        for (h = b; h <= d; h++) a[h] = f;
        a && (a = this.mergeArrayAtttrbs(a, g));
        return a;
      },
      insertArrayAtttrbs: function (a, b, d, e, f) {
        var g = "behind" == e ? d + 1 : b;
        if (!a) return null;
        e = "behind" == e ? a[d] : a[b];
        if (null === e || void 0 === e) return a;
        b = d - b + 1;
        if ("object" != typeof e) {
          for (d = 0; d < b; d++) a.splice(g, 0, e);
          a && (a = this.mergeArrayAtttrbs(a, f));
        } else
          for (d = 0; d < b; d++) (f = this.copyObject(e)), a.splice(g, 0, f);
        return a;
      },
      deleteArrayAtttrbs: function (a, b, d, e, f, g) {
        if (!a) return null;
        var h = !1;
        if (f && d < e - 1 && a[b] && void 0 !== a[b] && void 0 === a[d])
          for (h = !0, e = d; e >= b; e--)
            if (h && void 0 !== a[e]) {
              a[d + 1] = this.copyObject(a[e]);
              break;
            }
        a.splice(b, d - b + 1);
        f && (a = this.mergeArrayAtttrbs(a, g));
        return a;
      },
      populateData: function (a, b) {
        this.infod || (this.infod = {});
        var d = this.infod;
        d.frame = "none";
        if ("solid" == this.frame || "dashed" == this.frame)
          d.frame = this.frame;
        d.equalrows = !1;
        "true" == this.equalrows && (d.equalrows = !0);
        d.equalcols = !1;
        "true" == this.equalcols && (d.equalcols = !0);
        var e = function (a, b, d, g) {
          return b && 0 != b.length ? (b[a] ? b[a] : d[a - 1]) : g;
        };
        d.rowlines = [];
        d.rows = [];
        for (var f = [], g = 0; g < a; g++)
          (d.rows[g] = {}),
            (d.rowlines[g] =
              g == a - 1 ? "none" : e(g, this.rowlines, d.rowlines, "none")),
            (f[g] = e(g, this.rowalign, f, "baseline"));
        d.collines = [];
        d.cols = [];
        for (var h = [], g = 0; g < b; g++)
          (d.cols[g] = {}),
            (d.collines[g] =
              g == b - 1 ? "none" : e(g, this.collines, d.collines, "none")),
            (h[g] = e(g, this.colalign, h, "center"));
        d.cells = [];
        for (g = 0; g < a; g++)
          for (
            this.rows &&
              void 0 !== this.rows[g] &&
              null !== this.rows[g].rowalign &&
              void 0 !== this.rows[g].rowalign &&
              (f[g] = this.rows[g].rowalign),
              d.cells[g] = [],
              e = 0;
            e < b;
            e++
          )
            d.cells[g][e] =
              this.rows &&
              void 0 !== this.rows[g] &&
              null !== this.rows[g].colalign &&
              void 0 !== this.rows[g].colalign[e]
                ? { colalign: this.rows[g].colalign[e] }
                : { colalign: h[e] };
        for (g = 0; g < a; g++)
          for (e = 0; e < b; e++)
            (d.cells[g][e].rowalign =
              this.rows &&
              void 0 !== this.rows[g] &&
              this.rows[g].cols &&
              this.rows[g].cols[e] &&
              void 0 !== this.rows[g].cols[e] &&
              null !== this.rows[g].cols[e].rowalign &&
              void 0 !== this.rows[g].cols[e].rowalign
                ? this.rows[g].cols[e].rowalign
                : f[g]),
              this.rows &&
                void 0 !== this.rows[g] &&
                this.rows[g].cols &&
                this.rows[g].cols[e] &&
                void 0 !== this.rows[g].cols[e] &&
                null !== this.rows[g].cols[e].colalign &&
                void 0 !== this.rows[g].cols[e].colalign &&
                (d.cells[g][e].colalign = this.rows[g].cols[e].colalign);
      },
      setColAttrb: function (a, b, d, e) {
        void 0 === this.rows[a] &&
          (this.rows[a] = {
            rowalign: null,
            colalign: null,
            groupalign: null,
            cols: [],
          });
        a = this.rows[a].cols;
        void 0 === a[b] &&
          (a[b] = {
            rowspan: null,
            colspan: null,
            rowalign: null,
            colalign: null,
            groupalign: null,
          });
        switch (d) {
          case "rowalign":
            d = /s*(top|bottom|center|baseline|axis)s*/;
            e && d.test(e)
              ? (a[b].rowalign = e.trim())
              : (a[b].rowalign = null);
            break;
          case "colalign":
            d = /s*(left|center|right)s*/;
            e && d.test(e)
              ? (a[b].colalign = e.trim())
              : (a[b].colalign = null);
            break;
          case "rowspan":
            e = parseInt(e);
            isNaN(e) ? (a[b].rowspan = null) : (a[b].rowspan = e);
            break;
          case "colspan":
            e = parseInt(e);
            isNaN(e) ? (a[b].colspan = null) : (a[b].colspan = e);
            break;
          case "groupalign":
            a[b].groupalign = e;
        }
      },
      clearColAttrb: function (a, b, d) {
        if (
          void 0 !== this.rows[a] &&
          ((a = this.rows[a].cols), void 0 !== a[b])
        )
          switch (d) {
            case "rowalign":
              a[b].rowalign = null;
              break;
            case "colalign":
              a[b].colalign = null;
              break;
            case "rowspan":
              a[b].rowspan = null;
              break;
            case "colspan":
              a[b].colspan = null;
              break;
            case "groupalign":
              a[b].groupalign = value;
          }
      },
      copyObject: function (a) {
        "function" != typeof Object.assign &&
          (Object.assign = function (a, b) {
            if (null == a)
              throw new TypeError("Cannot convert undefined or null to object");
            for (var d = Object(a), h = 1; h < arguments.length; h++) {
              var l = arguments[h];
              if (null != l)
                for (var m in l)
                  Object.prototype.hasOwnProperty.call(l, m) && (d[m] = l[m]);
            }
            return d;
          });
        if (null === a) return null;
        if ("object" != typeof a) return a;
        var b = null;
        if (Array.isArray(a))
          for (var b = [], d = 0; d < a.length; d++)
            b[d] = this.copyObject(a[d]);
        else
          for (d in ((b = Object.assign({}, a)), a))
            Object.prototype.hasOwnProperty.call(a, d) &&
              null !== a[d] &&
              "object" == typeof a[d] &&
              (b[d] = this.copyObject(a[d]));
        return b;
      },
      copy: function (a, b) {
        var d = this.clone();
        for (prop in this)
          !Object.prototype.hasOwnProperty.call(this, prop) ||
            this[prop] instanceof Function ||
            "children" == prop ||
            "infod" == prop ||
            (d[prop] = this.copyObject(this[prop]));
        d.populateData(a, b);
        return d;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.PseudoRow = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      draw: null,
      functionsFromRow: "getFirstCursorPosition getFollowingCursorPosition getPrecedingCursorPosition getLastCursorPosition getLowerCursorPosition getHigherCursorPosition draw isEmpty getMathML insert replace remove".split(
        " "
      ),
      initialize: function () {
        this.children = Array.prototype.slice.call(arguments);
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            b = this.functionsFromRow.length - 1;
          0 <= b;
          b--
        )
          this[this.functionsFromRow[b]] ||
            (this[this.functionsFromRow[b]] = a[this.functionsFromRow[b]]);
        this.updateChildren();
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Enclose = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      notations: ["longdiv"],
      children: null,
      margin: {
        box: { l: 5, t: 5, r: 5, b: 5 },
        circle: { l: 1, t: 1, r: 0, b: 0 },
        horizontalstrike: { l: 3, t: 0, r: 3, b: 0 },
        updiagonalstrike: { l: 1, t: 2, r: 1, b: 2 },
        downdiagonalstrike: { l: 1, t: 2, r: 1, b: 2 },
      },
      border_color: "#000000",
      lineWidth: 1,
      slowDelete: !0,
      initialize: function () {
        this.children = 0 == arguments.length ? [] : [arguments[0]];
        1 < arguments.length && (this.notations = arguments[1]);
        2 < arguments.length && (this.mathcolor = arguments[2]);
        this.updateChildren();
      },
      draw: function (a, b, d, e, f) {
        for (
          var g = org.imatheq.formulaeditor.presentation,
            h = d,
            l = e,
            m = d,
            t = e,
            k = null,
            n = 0;
          n < this.notations.length;
          n++
        ) {
          var p = this.margin[this.notations[n]];
          1 == this.children[0].children.length &&
            this.children[0].children[0] instanceof g.Enclose &&
            (p =
              1 == this.children[0].children[0].notations.length &&
              "horizontalstrike" == this.children[0].children[0].notations[0]
                ? {
                    l: 1,
                    t: this.margin[this.notations[n]].t,
                    r: 1,
                    b: this.margin[this.notations[n]].b,
                  }
                : { l: 1, t: 1, r: 1, b: 1 });
          switch (this.notations[n]) {
            case "box":
              k = this.drawBox(a, b, p, d, e, f);
              break;
            case "circle":
              k = this.drawCircle(a, b, p, d, e, f);
              break;
            case "horizontalstrike":
              k = this.drawHStrike(a, b, p, d, e, f);
              break;
            case "updiagonalstrike":
              k = this.drawSlash(a, b, p, d, e, f);
              break;
            case "downdiagonalstrike":
              k = this.drawBackslash(a, b, p, d, e, f);
          }
          h = Math.min(h, k.left);
          l = Math.min(l, k.top);
          m = Math.max(m, k.left + k.width);
          t = Math.max(t, k.top + k.height);
        }
        return { left: h, top: l, width: m - h, height: t - l };
      },
      drawBox: function (a, b, d, e, f, g) {
        var h = this.children[0].draw(a, b, 0, 0, !0);
        this.dimensions = {
          height:
            this.children[0].dimensions.height + d.t + d.b + this.lineWidth,
          width: this.children[0].dimensions.width + d.l + d.r + this.lineWidth,
          left: h.left + e,
          top: h.top + f - d.t,
        };
        g ||
          (a.drawBox(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(a, b, e + d.l, f, !1));
        return this.dimensions;
      },
      drawSlash: function (a, b, d, e, f, g) {
        var h = this.children[0].draw(a, b, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height + d.t + d.b,
          width: this.children[0].dimensions.width + d.l + d.r,
          left: h.left + e,
          top: h.top + f - d.t,
        };
        g ||
          (a.drawSlash(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(a, b, e + d.l, f, !1));
        return this.dimensions;
      },
      drawBackslash: function (a, b, d, e, f, g) {
        var h = this.children[0].draw(a, b, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height + d.t + d.b,
          width: this.children[0].dimensions.width + d.l + d.r,
          left: h.left + e,
          top: h.top + f - d.t,
        };
        g ||
          (a.drawBackslash(this.dimensions, this.mathcolor, this.lineWidth),
          this.children[0].draw(a, b, e + d.l, f, !1));
        return this.dimensions;
      },
      drawHStrike: function (a, b, d, e, f, g) {
        var h = this.children[0].draw(a, b, 0, 0, !0);
        this.dimensions = {
          height: this.children[0].dimensions.height,
          width: this.children[0].dimensions.width + d.l + d.r,
          left: h.left + e,
          top: h.top + f,
        };
        g ||
          (this.children[0].draw(a, b, e + d.l, f, !1),
          a.drawHStrike(this.dimensions, this.mathcolor, this.lineWidth));
        return this.dimensions;
      },
      drawCircle: function (a, b, d, e, f, g) {
        var h = this.children[0].draw(a, b, 0, 0, !0),
          h = {
            left: h.left,
            top: h.top - d.t,
            width: h.width + d.l + d.r,
            height: h.height + d.t + d.b,
          },
          l = Math.round((0.414 * h.width) / 2),
          m = Math.round((0.414 * h.height) / 2);
        this.dimensions = {
          left: e + h.left,
          top: f + h.top - m,
          width: h.width + 2 * l + this.lineWidth,
          height: h.height + 2 * m + this.lineWidth,
        };
        g ||
          ((h = this.children[0].draw(a, b, e + l + d.l, f, !1)),
          (h = {
            left: h.left - d.l,
            top: h.top - d.t,
            width: h.width + d.l + d.r,
            height: h.height + d.t + d.b,
          }),
          (this.dimensions = a.drawCircle(h, this.mathcolor, this.lineWidth)));
        return this.dimensions;
      },
      getFirstCursorPosition: function (a, b, d) {
        return this.getFollowingCursorPosition(a, null, d);
      },
      getLastCursorPosition: function (a, b, d) {
        return this.getPrecedingCursorPosition(a, null, d);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        var e = this.children[0];
        if (null === b || void 0 === b)
          return e.getFollowingCursorPosition(a, null, d);
        if (null !== this.parent)
          return this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        var e = this.children[0];
        if (null === b || void 0 === b)
          return e.getPrecedingCursorPosition(a, null, d);
        e = null;
        if (1 == b)
          if (d) e = this.children[0].getLastCursorPosition(a, null, d);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === e && null !== this.parent
          ? { row: this.parent, index: this.index }
          : e;
      },
      getCursorPosition: function (a, b, d) {
        return b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
          ? b < (this.dimensions.left + this.children[0].dimensions.left) / 2
            ? { row: this.parent, index: this.index }
            : this.children[0].getCursorPosition(a, b, d)
          : b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getLowerCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        return null === b || void 0 === b
          ? this.children[0].getLowerCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, !1)
          : null;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        return null === b || void 0 === b
          ? this.children[0].getHigherCursorPosition(a, null, d, e)
          : null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, !1)
          : null;
      },
      copy: function () {
        return this.clone(this.children[0].copy(), this.notations);
      },
      getMathML: function () {
        return (
          '<menclose notation="' +
          this.notations.join(" ") +
          '"' +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          ">" +
          this.children[0].getMathML() +
          "</menclose>"
        );
      },
    }
  );
})();
$package("org.imatheq.formulaeditor.parsing.mathml");
(function () {
  org.imatheq.formulaeditor.parsing.mathml.MathMLParser = $extend(
    org.imatheq.formulaeditor.parsing.xml.XMLParser,
    {
      name: "MathMLParser",
      handlemath: function (a, b) {
        return this.handlelines(a, b);
      },
      handleTextNode: function (a, b, d) {
        d = org.imatheq.formulaeditor.presentation;
        var e = "";
        if (null !== a.firstChild) e = "" + a.firstChild.nodeValue;
        else return null;
        var f = e.charAt(0);
        b = [];
        var g,
          h =
            null === a.getAttribute("lspace") ? null : a.getAttribute("lspace"),
          l =
            null === a.getAttribute("rspace") ? null : a.getAttribute("rspace"),
          m = "mtext" == a.localName.toLowerCase();
        g = a.getAttribute("mathvariant");
        var t = a.getAttribute("mathcolor"),
          k = !1,
          n = !1,
          p = !1,
          r = "mo" == a.localName.toLowerCase(),
          q = void 0 !== org.imatheq.formulaeditor.parsing.expression.MOList[f],
          u = "mn" == a.localName.toLowerCase(),
          v = !1,
          y = !1,
          w = !1,
          z = ("mi" == a.localName.toLowerCase() || r || u) && 1 < e.length,
          A = z ? "" : null;
        null === g && (g = "");
        switch (g) {
          case "":
            w = m || r || u || z || q ? null : "auto";
            break;
          case "bold":
            v = !0;
            break;
          case "italic":
            y = !0;
            break;
          case "bold-italic":
            v = !0;
            z ? (y = !0) : (w = "auto");
            break;
          case "double-struck":
            k = !0;
            A = null;
            z = !1;
            break;
          case "script":
            n = !0;
            w = "auto";
            A = null;
            z = !1;
            break;
          case "bold-script":
            v = n = !0;
            w = "auto";
            A = null;
            z = !1;
            break;
          case "fraktur":
            p = !0;
            A = null;
            z = !1;
            break;
          case "bold-fraktur":
            (p = !0), (A = null), (z = !1), (v = !0);
        }
        arrCh = [];
        for (g = 0; g < e.length; g++)
          if (
            ((f = e.charAt(g)),
            (q =
              org.imatheq.formulaeditor.parsing.expression.RevList[
                e.slice(g, g + 2)
              ]),
            g + 1 < e.length && void 0 !== q && (f = e.slice(g, ++g + 1)),
            void 0 === org.imatheq.formulaeditor.presentation.SymbolAliases[f])
          ) {
            q = org.imatheq.formulaeditor.parsing.expression.RevList[f];
            if (void 0 !== q) {
              !n && v && "script" == q.type && (n = !0);
              !p && v && "fraktur" == q.type && (p = !0);
              if ("bold-script" == q.type || "bold-fraktur" == q.type)
                (f = q.non_bold), (v = !0);
              if ("bold-script" == q.type || "script" == q.type) italic = !0;
            }
            k &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.DoubleStruckList[
                  f
                ] &&
              (f =
                org.imatheq.formulaeditor.parsing.expression.DoubleStruckList[
                  f
                ]);
            n &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.ScriptList[f] &&
              (f = org.imatheq.formulaeditor.parsing.expression.ScriptList[f]);
            p &&
              void 0 !==
                org.imatheq.formulaeditor.parsing.expression.FrakturList[f] &&
              (f = org.imatheq.formulaeditor.parsing.expression.FrakturList[f]);
            " " == f
              ? arrCh.push([" ", null, null, null])
              : arrCh.push([f, v, n, p]);
            z && (A += f);
          }
        for (g = 0; g < arrCh.length; g++)
          if (" " == arrCh[g][0])
            b.push(new d.Space("0.4em", "0.5em", "0.1em", f, m));
          else {
            e = null;
            e = new d.Symbol(
              arrCh[g][0],
              arrCh[g][1],
              t,
              m,
              y,
              w,
              A,
              h,
              l,
              r,
              u,
              k,
              arrCh[g][2],
              arrCh[g][3]
            );
            n = "form fence separator lspace rspace stretchy symmetric maxsize minsize largeop movablelimits accent".split(
              " "
            );
            p = "";
            for (v = 0; v < a.attributes.length; v++)
              (z = a.attributes[v]),
                -1 != n.indexOf(z.localName) &&
                  (p += " " + z.localName + '="' + z.value + '"');
            e.in_attrs = p;
            b.push(e);
          }
        a = new d.Row();
        a.initialize.apply(a, b);
        return a;
      },
      handleInferredMrow: function (a, b) {
        var d = a.childNodes;
        return 1 != d.length ? this.handlemrow(a, b) : this.handle(d.item(0));
      },
      handlemi: function (a, b) {
        return this.handleTextNode(a, b, "math");
      },
      handlemn: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlemo: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlems: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        return new d.Row(
          new d.Symbol('"'),
          this.handleTextNode(a, b),
          new d.Symbol('"')
        );
      },
      handlemspace: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e =
            "" == a.getAttribute("width") || null === a.getAttribute("width")
              ? "0em"
              : a.getAttribute("width"),
          f =
            "" == a.getAttribute("height") || null === a.getAttribute("height")
              ? "0em"
              : a.getAttribute("height"),
          g =
            "" == a.getAttribute("depth") || null === a.getAttribute("depth")
              ? "0em"
              : a.getAttribute("depth");
        return new d.Space(e, f, g);
      },
      handlemtext: function (a, b) {
        return this.handleTextNode(a, b);
      },
      handlelines: function (a, b) {
        var d = a.childNodes,
          e = [],
          f = [],
          g = org.imatheq.formulaeditor.presentation;
        1 == d.length &&
          "mrow" == d.item(0).localName.toLowerCase() &&
          (d = d.item(0).childNodes);
        for (var h = 0; h < d.length; h++)
          if (
            ((child = d.item(h)),
            ("mo" != child.localName && "mspace" != child.localName) ||
              "newline" != child.getAttribute("linebreak"))
          )
            (a = this.handle(d.item(h), b)), null !== a && f.push(a);
          else {
            "before" == child.getAttribute("linebreakstyle") &&
              ((a = this.handle(d.item(h), b)), null !== a && f.push(child));
            f.push(new g.NewlineSymbol());
            var l = new g.Row();
            l.initialize.apply(l, f);
            l.flatten();
            e.push(l);
            f = [];
            "after" == child.getAttribute("linebreakstyle") &&
              ((a = this.handle(d.item(h), b)), null !== a && f.push(child));
          }
        l = new g.Row();
        0 != f.length ? l.initialize.apply(l, f) : l.remove(0, 1);
        l.flatten();
        e.push(l);
        if (0 == e.length) return null;
        if (1 == e.length)
          return 1 == e[0].children.length &&
            e[0].children[0] instanceof g.PArray
            ? e[0].children[0]
            : e[0];
        d = new g.Lines();
        d.initialize.apply(d, e);
        return d;
      },
      handlemstack: function (a, b) {
        var d = a.childNodes,
          e = [],
          f = [],
          g = org.imatheq.formulaeditor.presentation;
        1 == d.length &&
          "mrow" == d.item(0).localName.toLowerCase() &&
          (d = d.item(0).childNodes);
        for (var h = "0", l = d.length - 1; 0 <= l; l--)
          if ("msgroup" == p.localName) {
            var m = d.item(l);
            h++;
            for (
              var t = m.getAttribute("position"),
                k = m.getAttribute("shift"),
                n = m.length - 1;
              0 <= n;
              n--
            ) {
              var p = m.childNodes.item(n);
              p.setAttribute("group_id", h);
              p.setAttribute("group_position", t);
              p.setAttribute("group_shift", k);
              m.removeChild(p);
              a.appendChild(p);
            }
            a.removeChild(m);
          } else if ("mscarries" == p.localName)
            for (
              var m = d.item(l),
                t = m.getAttribute("position"),
                k = m.getAttribute("location"),
                n = m.getAttribute("crossout"),
                r = m.getAttribute("scriptsizemultiplier"),
                q = 0;
              q < m.childNods.length;
              q++
            )
              (p = m.childNodes.item(q)),
                p.setAttribute("msc_position", t),
                p.setAttribute("msc_location", k),
                p.setAttribute("msc_crossout", n),
                p.setAttribute("msc_scriptsizemultiplier", r);
        h = null;
        for (l = 0; l < d.length; l++)
          "mscarries" == p.localName
            ? null === h && (h = l)
            : ((msrow = d.item(l)),
              ("mo" != p.localName && "mspace" != p.localName) ||
              "newline" != p.getAttribute("linebreak")
                ? ((a = this.handle(d.item(l), b)), null !== a && f.push(a))
                : ("before" == p.getAttribute("linebreakstyle") &&
                    ((a = this.handle(d.item(l), b)), null !== a && f.push(p)),
                  f.push(new g.NewlineSymbol()),
                  (h = new g.Row()),
                  h.initialize.apply(h, f),
                  h.flatten(),
                  h.updateChildren(),
                  e.push(h),
                  (f = []),
                  "after" == p.getAttribute("linebreakstyle") &&
                    ((a = this.handle(d.item(l), b)), null !== a && f.push(p))),
              (h = null));
        h = new g.Row();
        0 != f.length ? h.initialize.apply(h, f) : h.remove(0, 1);
        e.push(h);
        if (0 == e.length) return null;
        if (1 == e.length)
          return 1 == e[0].children.length &&
            e[0].children[0] instanceof g.PArray
            ? e[0].children[0]
            : e[0];
        d = new g.Lines();
        d.initialize.apply(d, e);
        return d;
      },
      handlemrow: function (a, b) {
        for (
          var d = a.childNodes,
            e = [],
            f = org.imatheq.formulaeditor.presentation,
            g = 0;
          g < d.length;
          g++
        ) {
          var h = this.handle(d.item(g), b);
          null !== h && e.push(h);
        }
        0 == e.length && e.push(new f.BlockSymbol());
        d = new f.Row();
        d.initialize.apply(d, e);
        d.flatten();
        d.updateChildren();
        a.getAttribute("is_answer") &&
          "true" == a.getAttribute("is_answer") &&
          (d.isAnswer = !0);
        return d;
      },
      handlemfrac: function (a, b) {
        for (
          var d = a.childNodes,
            e = [],
            f = org.imatheq.formulaeditor.presentation,
            g = 0;
          g < d.length;
          g++
        ) {
          var h = this.handle(d.item(g), b);
          e.push(h);
        }
        return "true" == a.getAttribute("bevelled")
          ? new f.BevelledFraction(e[0], e[1])
          : new f.Fraction(e[0], e[1]);
      },
      handlemover: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunder: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunderover: function (a, b) {
        return this.handlemunderovers(a, b);
      },
      handlemunderovers: function (a, b) {
        var d = a.childNodes,
          e = org.imatheq.formulaeditor.presentation;
        a.getAttribute("accent");
        a.getAttribute("accentunder");
        var f = a.getAttribute("mathcolor"),
          g = a.localName,
          h = e.SymbolOnscreens,
          l = null;
        "mo" == d.item(0).localName
          ? (l = d.item(0))
          : "mrow" == d.item(0).localName &&
            1 == d.item(0).childElementCount &&
            "mo" == d.item(0).firstChild.localName &&
            (l = d.item(0).firstChild);
        if (
          l &&
          0 == l.childElementCount &&
          "string" == typeof l.firstChild.nodeValue &&
          1 == l.firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              l.firstChild.nodeValue
            ) ||
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                l.firstChild.nodeValue
              ) ||
            (void 0 !== h[l.firstChild.nodeValue] &&
              (-1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  h[l.firstChild.nodeValue]
                ) ||
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                    h[l.firstChild.nodeValue]
                  ))))
        ) {
          var m = h[l.firstChild.nodeValue],
            m = void 0 === m ? null : m;
          if (
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                l.firstChild.nodeValue
              ) ||
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.MidVertBracketList.indexOf(
                l.firstChild.nodeValue
              )
          )
            m = null;
          var t = new e.VerticalBracket(l.firstChild.nodeValue, null, m, !1, f),
            h = [];
          "munderover" != g &&
            (2 <= d.length
              ? h.push(this.handle(d.item(1), b))
              : h.push(new e.Row(new e.BlockSymbol())));
          "munderover" == g &&
            (3 <= d.length
              ? h.push(this.handle(d.item(2), b))
              : h.push(new e.Row(new e.BlockSymbol())),
            2 <= d.length
              ? h.push(this.handle(d.item(1), b))
              : h.push(new e.Row(new e.BlockSymbol())));
          return new e.MiddleBracketed(g, t, h, f);
        }
        var k = (l = !1),
          n;
        2 <= d.length
          ? "mo" == d.item(1).localName &&
            0 == d.item(1).childElementCount &&
            "string" == typeof d.item(1).firstChild.nodeValue &&
            1 == d.item(1).firstChild.nodeValue.length &&
            (-1 !==
              org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                d.item(1).firstChild.nodeValue
              ) ||
              (void 0 !== h[d.item(1).firstChild.nodeValue] &&
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                    h[d.item(1).firstChild.nodeValue]
                  )))
            ? ((m = h[d.item(1).firstChild.nodeValue]),
              (m = void 0 === m ? null : m),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.nodeValue
                ) && (m = null),
              (l = !0),
              (n = new e.VerticalBracket(
                d.item(1).firstChild.nodeValue,
                null,
                m,
                null,
                f
              )))
            : "mrow" == d.item(1).localName &&
              1 == d.item(1).childElementCount &&
              "mo" == d.item(1).firstChild.localName &&
              0 == d.item(1).firstChild.childElementCount &&
              "string" == typeof d.item(1).firstChild.firstChild.nodeValue &&
              1 == d.item(1).firstChild.firstChild.nodeValue.length &&
              (-1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.firstChild.nodeValue
                ) ||
                (void 0 !== h[d.item(1).firstChild.firstChild.nodeValue] &&
                  -1 !==
                    org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                      h[d.item(1).firstChild.firstChild.nodeValue]
                    )))
            ? ((m = h[d.item(1).firstChild.firstChild.nodeValue]),
              (m = void 0 === m ? null : m),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(1).firstChild.firstChild.nodeValue
                ) && (m = null),
              (l = !0),
              (n = new e.VerticalBracket(
                d.item(1).firstChild.firstChild.nodeValue,
                null,
                m,
                null,
                f
              )))
            : (n = this.handle(d.item(1), b))
          : (n = new e.Row(new e.BlockSymbol()));
        3 <= d.length
          ? "mo" == d.item(2).localName &&
            0 == d.item(1).childElementCount &&
            "string" == typeof d.item(1).firstChild.nodeValue &&
            1 == d.item(1).firstChild.nodeValue.length &&
            (-1 !==
              org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                d.item(2).firstChild.nodeValue
              ) ||
              (void 0 !== h[d.item(2).firstChild.nodeValue] &&
                -1 !==
                  org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                    h[d.item(2).firstChild.nodeValue]
                  )))
            ? ((m = h[d.item(2).firstChild.nodeValue]),
              (m = void 0 === m ? null : m),
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.VertBracketList.indexOf(
                  d.item(2).firstChild.nodeValue
                ) && (m = null),
              (k = !0),
              (t = new e.VerticalBracket(
                d.item(2).firstChild.nodeValue,
                null,
                m,
                null,
                f
              )))
            : (t = this.handle(d.item(2), b))
          : "munderover" == g && (t = new e.Row(new e.BlockSymbol()));
        d = this.handle(d.item(0), b);
        if (l || k) {
          if ("munderover" == g)
            return (
              l
                ? k || ((d = new e.column(d)), (t = new e.VerticalBracket("")))
                : ((d = new e.column(n, d)), (n = new e.VerticalBracket(""))),
              new e.VerticalBracketed(g, t, d, n, f)
            );
          t = new e.VerticalBracket("");
          return "mover" == g
            ? new e.VerticalBracketed(g, n, d, t, f)
            : new e.VerticalBracketed(g, t, d, n, f);
        }
        if ("mover" == g)
          return (
            (column = new e.Column(n, d)),
            (column.fontSizeModifierArray = [-1, 0]),
            (column.baselineIndex = 1),
            (column.mtype = g),
            column
          );
        if ("munder" == g)
          return (
            (column = new e.Column(d, n)),
            (column.fontSizeModifierArray = [0, -1]),
            (column.baselineIndex = 0),
            (column.mtype = g),
            column
          );
        column = new e.Column(t, d, n);
        column.fontSizeModifierArray = [-1, 0, -1];
        column.baselineIndex = 1;
        column.mtype = g;
        return column;
      },
      handlemsqrt: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = a.getAttribute("mathcolor"),
          f = this.handleInferredMrow(a, b);
        return new d.Row(new d.Root(f, null, e));
      },
      handlemroot: function (a, b) {
        var d = a.childNodes,
          e = a.getAttribute("mathcolor");
        "" == e && (e = null);
        var f = this.handle(d.item(0), b),
          d = this.handle(d.item(1), b);
        return new org.imatheq.formulaeditor.presentation.Root(f, d, e);
      },
      handlemstyle: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlemerror: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlempadded: function (a, b) {
        return this.handlemrow(a, b);
      },
      handlemfenced: function (a, b) {
        var d = a.getAttribute("open"),
          e = a.getAttribute("close"),
          f = a.getAttribute("separators"),
          g = a.getAttribute("mathcolor"),
          h = a.childNodes,
          l = org.imatheq.formulaeditor.presentation,
          m = l.SymbolOnscreens,
          t = [];
        "" == g && (g = null);
        if (null === d || void 0 === d) d = "(";
        var k = m[d],
          d = new l.Bracket(d, g, null, void 0 === k ? null : k);
        if (null === e || void 0 === e) e = ")";
        closeOnscreen = m[e];
        closeOnscreen = void 0 === closeOnscreen ? null : closeOnscreen;
        e = new l.Bracket(e, g, null, closeOnscreen);
        for (m = 0; m < a.attributes.length; m++)
          (k = a.attributes[m]),
            (g = k.localName.split("_")),
            1 < g.length && "open" == g[0] && (d["mo_" + g[1]] = k.value),
            1 < g.length && "close" == g[0] && (e["mo_" + g[1]] = k.value);
        if (null === f || void 0 === f) f = "";
        if ("" == f) m = null;
        else if (
          ((m = f.split("\\s+")),
          "" === m[0] && (m = m.slice(1)),
          0 < m.length && "" === m[m.length] && m.splice(m.length - 1),
          1 == m.length)
        ) {
          g = [];
          for (f = 0; f < m[0].length; f++) g.push(m[0].charAt(f));
          m = g;
        }
        for (f = 0; f < h.length; f++) {
          if (0 < f && null !== m) {
            var n;
            0 < m.length && (n = f < m.length ? m[f] : m[0]);
            for (g = 0; g < n.length; g++) t.push(new l.Symbol(n.charAt(g)));
          }
          g = this.handle(h.item(f), b);
          t.push(g);
        }
        h = new l.Row();
        h.initialize.apply(h, t);
        l = new l.Bracketed(d, h, e);
        "true" == a.getAttribute("isMO") && (l.isMO = !0);
        null != a.getAttribute("symmetric") &&
          (l.symmetric =
            "true" == a.getAttribute("symmetric").toLowerCase()
              ? !0
              : "false" == a.getAttribute("symmetric").toLowerCase()
              ? !1
              : null);
        return l;
      },
      handlemtable: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = [],
          f,
          g,
          h,
          l = new org.imatheq.formulaeditor.presentation.PArray.Info(a);
        for (f = 0; f < a.childNodes.length; f++) {
          var m = [],
            t = a.childNodes.item(f);
          for (g = 0; g < t.childNodes.length; g++) {
            var k = t.childNodes.item(g),
              n = [];
            for (h = 0; h < k.childNodes.length; h++) {
              var p = k.childNodes.item(h);
              n.push(this.handle(p, b));
            }
            1 == n.length
              ? m.push(n[0])
              : ((h = new d.Row()), h.initialize.apply(h, n), m.push(h));
          }
          e.push(m);
        }
        for (f = t = 0; f < e.length; f++) t < e[f].length && (t = e[f].length);
        for (f = 0; f < e.length; f++)
          if (e[f].length < t)
            for (m = e[f], g = m.length; g < t; g++)
              m.push(new d.BlockSymbol());
        d = new org.imatheq.formulaeditor.presentation.PArray();
        d.initialize.apply(d, e);
        d.margin = 10;
        d.info = l;
        return d;
      },
      handlemenclose: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = a.getAttribute("notation").replace(/\s\s+/g, " ").split(" "),
          f = a.getAttribute("mathcolor"),
          f = "" == f ? null : f,
          g = this.handleInferredMrow(a, b);
        return new d.Enclose(g, e, f);
      },
      handlemsub: function (a, b) {
        return this.handlemsubsup(a, b);
      },
      handlemsup: function (a, b) {
        return this.handlemsubsup(a, b);
      },
      handlemsubsup: function (a, b) {
        var d = a.childNodes,
          e = org.imatheq.formulaeditor.presentation,
          f = a.localName,
          g = a.getAttribute("mathcolor"),
          h = e.SymbolOnscreens;
        if (
          "mo" == d.item(0).localName &&
          0 == d.item(0).childElementCount &&
          "string" == typeof d.item(0).firstChild.nodeValue &&
          1 == d.item(0).firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.nodeValue
            ) ||
            (void 0 !== h[d.item(0).firstChild.nodeValue] &&
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  h[d.item(0).firstChild.nodeValue]
                )))
        ) {
          var l = h[d.item(0).firstChild.nodeValue],
            l = void 0 === l ? null : l;
          -1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.nodeValue
            ) && (l = null);
          g = new e.VerticalBracket(
            d.item(0).firstChild.nodeValue,
            null,
            l,
            !1,
            g
          );
          l = h = null;
          h =
            2 <= d.length
              ? this.handle(d.item(1), b)
              : new e.Row(new e.BlockSymbol());
          "msubsup" == f &&
            (l =
              3 <= d.length
                ? this.handle(d.item(2), b)
                : new e.Row(new e.BlockSymbol()));
          return new e.LargeOpSubsup(a.localName, g, l, h);
        }
        if (
          "mrow" == d.item(0).localName &&
          1 == d.item(0).childElementCount &&
          "mo" == d.item(0).firstChild.localName &&
          0 == d.item(0).firstChild.childElementCount &&
          "string" == typeof d.item(0).firstChild.firstChild.nodeValue &&
          1 == d.item(0).firstChild.firstChild.nodeValue.length &&
          (-1 !==
            org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
              d.item(0).firstChild.firstChild.nodeValue
            ) ||
            (void 0 !== h[d.item(0).firstChild.firstChild.nodeValue] &&
              -1 !==
                org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                  h[d.item(0).firstChild.firstChild.nodeValue]
                )))
        )
          return (
            (l = h[d.item(0).firstChild.firstChild.nodeValue]),
            (l = void 0 === l ? null : l),
            -1 !==
              org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(
                d.item(0).firstChild.firstChild.nodeValue
              ) && (l = null),
            (g = new e.VerticalBracket(
              d.item(0).firstChild.firstChild.nodeValue,
              null,
              l,
              !1,
              g
            )),
            (l = null),
            (h =
              2 <= d.length
                ? this.handle(d.item(1), b)
                : new e.Row(new e.BlockSymbol())),
            "msubsup" == f &&
              (l =
                3 <= d.length
                  ? this.handle(d.item(2), b)
                  : new e.Row(new e.BlockSymbol())),
            new e.LargeOpSubsup(a.localName, g, l, h)
          );
        g = this.handle(d.item(0), b);
        h =
          2 <= d.length
            ? this.handle(d.item(1), b)
            : new e.Row(new e.BlockSymbol());
        "msubsup" == f &&
          (l =
            3 <= d.length
              ? this.handle(d.item(2), b)
              : new e.Row(new e.BlockSymbol()));
        return new e.Row(g, new e.Subsup(f, l, h));
      },
      handlemmultiscripts: function (a, b) {
        for (
          var d = a.childNodes,
            e = [],
            f = [],
            g = org.imatheq.formulaeditor.presentation,
            h = this.handle(d.item(0), b),
            l = !1,
            m = 1;
          m < d.length;
          m++
        )
          if ("mprescripts" == d.item(m).localName) l = !0;
          else {
            var t = null;
            "none" != d.item(m).localName && (t = this.handle(d.item(m), b));
            var k = null;
            m + 1 <= d.length &&
              "none" != d.item(m + 1).localName &&
              (k = this.handle(d.item(m + 1), b));
            l
              ? f.push(new g.PreSubsup(k, t))
              : e.push(new g.Subsup("mmultiscripts", k, t));
            m++;
          }
        f.push(h);
        for (m = 0; m < e.length; m++) f.push(e[m]);
        d = new g.Row();
        d.initialize.apply(d, f);
        return d;
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.presentation.Editor = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      margin: 4,
      barwidth: 10,
      barcolor: { on: "#AAF", off: "#DDF" },
      barstatus: null,
      initialize: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation.Row;
        void 0 !== b && null !== b && (this.paletteEnabled = b);
        this.children = [];
        a ? ((d = new d(a)), d.flatten()) : (d = new d());
        this.children.push(d);
        this.updateChildren();
      },
      copy: function () {
        return this.clone(this.children[0].copy(), this.paletteEnabled);
      },
      draw: function (a, b, d, e, f) {
        var g = this.children[0].draw(a, b, 0, 0, !0);
        f ||
          this.children[0].draw(
            a,
            b,
            d + this.margin - g.left,
            e + this.margin
          );
        b = {
          left: d + g.width + 2 * this.margin,
          top: e + g.top,
          height: g.height + 2 * this.margin,
          width: this.barwidth,
        };
        f ||
          ((f = this.paletteEnabled ? this.barcolor.on : this.barcolor.off),
          a.drawBox(b, f, 1, f));
        return (this.dimensions = {
          left: d,
          top: b.top,
          height: b.height,
          width: g.width + 2 * this.margin + this.barwidth,
        });
      },
      getCursorPosition: function (a, b, d) {
        return b < this.dimensions.width - this.barwidth
          ? this.children[0].getCursorPosition(a, b, d)
          : null;
      },
      getFirstCursorPosition: function (a, b, d) {
        return this.children[0].getFollowingCursorPosition(a, null, d);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        return d
          ? null === b || void 0 === b
            ? this.children[0].getFollowingCursorPosition(a, null, d)
            : null
          : null;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        return d
          ? null === b || void 0 === b
            ? this.children[0].getPrecedingCursorPosition(a, null, d)
            : null
          : null;
      },
      getLastCursorPosition: function (a, b, d) {
        return this.children[0].getPrecedingCursorPosition(a, null, d);
      },
      onmousedown: function (a, b, d, e) {
        d >= this.dimensions.width - this.barwidth &&
          (b.togglePalette(), (this.paletteEnabled = b.palette ? !0 : !1));
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.version = {
    showAboutPopup: function () {
      alert(
        "imatheq Formulaeditor\nversion: " +
          this.toString() +
          "\nhttp://imatheq.org/formulaeditor/\ninfo@imatheq.org"
      );
    },
    toString: function () {
      return this.versionInfo;
    },
    versionInfo: "1.1.31f",
  };
})();
(function () {
  org.imatheq.formulaeditor.Palettes = { defaultPalette: null };
})();
(function () {
  org.imatheq.formulaeditor.MathCanvas = $extend(Object, {
    editor: null,
    canvas: null,
    fontName: "cmr",
    fontFamilyNameIdx: 0,
    exFontCache: [],
    fontSizes: [
      144,
      173,
      193,
      207,
      249,
      298,
      358,
      430,
      537,
      716,
      860,
      1074,
      1432,
      1720,
    ],
    fontNames: "Math Font;Arial;Courier New;Tahoma;Times New Roman;Verdana".split(
      ";"
    ),
    fontSizeIdx: null,
    imageCache: null,
    loadingImages: 0,
    loadingCallbacks: [],
    readonly: !1,
    initialize: function (a, b) {
      this.editor = a;
      this.canvas = b;
      this.imageCache = {};
      if (org.imatheq.formulaeditor.options.fontSize) {
        for (
          var d = 0;
          d < this.fontSizes.length - 1 &&
          this.fontSizes[d] < org.imatheq.formulaeditor.options.fontSize;

        )
          d++;
        this.fontSizeIdx = d;
      } else
        this.fontSizeIdx = new org.imatheq.formulaeditor.Options().getOption(
          "defaultFontSizeIdx"
        );
    },
    drawBracketFont: function (a, b, d, e, f) {
      var g = document.createElement("span");
      g.style.position = "absolute";
      g.style.top = d;
      g.style.left = b;
      g.style.width = e;
      g.style.height = f;
      g.innerHTML = a;
    },
    waitToLoadImage: function () {
      var a = this;
      checkImgLoading = function () {
        0 < a.loadingImages
          ? ((document.getElementById("com_imatheq_loading_msg").style.display =
              ""),
            window.setTimeout(checkImgLoading, 500))
          : (document.getElementById("com_imatheq_loading_msg").style.display =
              "none");
      };
      window.setTimeout(checkImgLoading, 500);
    },
    getLinewidth: function (a) {
      return 8 < this.getFontSizeIdx(a) ? 2 : 1;
    },
    getMargin: function (a) {
      return 8 < this.getFontSizeIdx(a) ? 2 : 1;
    },
    getPXSize: function (a, b) {
      var d, e;
      if (null === a || void 0 === a) return null;
      a = a.trim();
      if ("0" == a) return 0;
      "%" == a.slice(a.length - 1)
        ? ((d = parseFloat(a.slice(0, a.length - 1))), (e = "%"))
        : ((d = parseFloat(a.slice(0, a.length - 2))),
          (e = a.slice(a.length - 2).toLowerCase()));
      switch (e) {
        case "px":
          return d;
        case "em":
          d *= this.getFontUnitEm(b);
          break;
        case "ex":
          d *= this.getFontUnitEx(b);
          break;
        case "in":
          d *= 96;
          break;
        case "cm":
          d = (96 * d) / 2.54;
          break;
        case "mm":
          d = (96 * d) / 25.4;
          break;
        case "pt":
          d = (96 * d) / 72;
          break;
        case "pc":
          d = (96 * d) / 6;
          break;
        case "%":
          d = (d * this.getFontUnitEm(b)) / 100;
          break;
        case "ce":
          switch (a) {
            case "veryverythinmathspace":
              d = this.getFontUnitEm(b) / 18;
              break;
            case "verythinmathspace":
              d = (2 * this.getFontUnitEm(b)) / 18;
              break;
            case "thinmathspace":
              d = (3 * this.getFontUnitEm(b)) / 18;
              break;
            case "mediummathspace":
              d = (4 * this.getFontUnitEm(b)) / 18;
              break;
            case "thickmathspace":
              d = (5 * this.getFontUnitEm(b)) / 18;
              break;
            case "verythickmathspace":
              d = (6 * this.getFontUnitEm(b)) / 18;
              break;
            case "veryverythickmathspace":
              d = (7 * this.getFontUnitEm(b)) / 18;
              break;
            case "negativeveryverythinmathspace":
              d = -this.getFontUnitEm(b) / 18;
              break;
            case "negativeverythinmathspace":
              d = (2 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativethinmathspace":
              d = (3 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativemediummathspace":
              d = (4 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativethickmathspace":
              d = (5 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativeverythickmathspace":
              d = (6 * -this.getFontUnitEm(b)) / 18;
              break;
            case "negativeveryverythickmathspace":
              d = (7 * -this.getFontUnitEm(b)) / 18;
              break;
            default:
              return null;
          }
          break;
        default:
          return null;
      }
      return Math.round(d);
    },
    getEMStringFromPx: function (a, b) {
      return a / this.getFontUnitEm(b);
    },
    getEMSize: function (a, b) {
      var d, e;
      if ("%" == a.trim().slice(a.trim().length - 1))
        (d = parseFloat(a.trim().slice(0, a.trim().length - 1))), (e = "%");
      else {
        if (-1 != a.indexOf("mathspace")) {
          switch (a) {
            case "veryverythinmathspace":
              d = 1 / 18;
              break;
            case "verythinmathspace":
              d = 2 / 18;
              break;
            case "thinmathspace":
              d = 3 / 18;
              break;
            case "mediummathspace":
              d = 4 / 18;
              break;
            case "thickmathspace":
              d = 5 / 18;
              break;
            case "verythickmathspace":
              d = 6 / 18;
              break;
            case "veryverythickmathspace":
              d = 7 / 18;
              break;
            case "negativeveryverythinmathspace":
              d = -1 / 18;
              break;
            case "negativeverythinmathspace":
              d = -2 / 18;
              break;
            case "negativethinmathspace":
              d = -3 / 18;
              break;
            case "negativemediummathspace":
              d = -4 / 18;
              break;
            case "negativethickmathspace":
              d = -5 / 18;
              break;
            case "negativeverythickmathspace":
              d = -6 / 18;
              break;
            case "negativeveryverythickmathspace":
              d = -7 / 18;
          }
          return d;
        }
        d = parseFloat(a.trim().slice(0, a.trim().length - 2));
        e = a
          .trim()
          .slice(a.trim().length - 2)
          .toLowerCase();
      }
      switch (e) {
        case "ex":
          d = (d * this.getFontUnitEx(b)) / this.getFontUnitEm(b);
          break;
        case "in":
          d = (96 * d) / this.getFontUnitEm(b);
          break;
        case "cm":
          d = (96 * d) / 2.54 / this.getFontUnitEm(b);
          break;
        case "mm":
          d = (96 * d) / 25.4 / this.getFontUnitEm(b);
          break;
        case "pt":
          d = (96 * d) / 72 / this.getFontUnitEm(b);
          break;
        case "pc":
          d = (96 * d) / 6 / this.getFontUnitEm(b);
          break;
        case "%":
          d /= 100;
      }
      return d;
    },
    getPXFontSize: function (a, b) {
      return [10, 12, 13, 14, 17, 20, 24, 32, 40, 48, 64, 80, 96, 128][
        this.getFontSizeIdx(a, b)
      ];
    },
    getFontSizeFromPX: function (a) {
      return [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96].indexOf(a);
    },
    isTTFFont: function (a, b) {
      var d = this.getFontSizeIdx(b),
        e = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a];
      return null === e ||
        void 0 === e ||
        ("cmex10" != e.font &&
          "cmey10" != e.font &&
          "bnormal10" != e.font &&
          "msbm10" != e.font &&
          "imescr10" != e.font &&
          "eufm10" != e.font)
        ? 7 <= d
        : !0;
    },
    getContext: function () {
      return this.canvas.getContext("2d");
    },
    getBgContext: function () {
      return this.bgCanvas.getContext("2d");
    },
    setFontSizeIdx: function (a) {
      this.fontSizeIdx = a;
    },
    drawBracket: function (a, b, d, e, f, g, h, l) {
      h = 0;
      void 0 !== a.fontSizeModifier && null !== h && (h = a.fontSizeModifier);
      if (
        -1 ==
        org.imatheq.formulaeditor.parsing.expression.BracketList.indexOf(b)
      )
        return this.drawSymbol(b, d, e, g, !1, !1, l, h);
      var m;
      a = null;
      for (var t = 4; 0 <= t; t--) {
        var k = b + t;
        0 == t && (k = b);
        var n = this.getSymbolDataByPosition(k, h);
        null !== n && void 0 !== n && n.height >= f && ((a = k), (m = n));
      }
      var p;
      if (null !== m && void 0 !== m)
        return this.drawSymbol(a, d, e, g, !1, !1, l, h);
      m = b + "u";
      var r = this.getSymbolDataByPosition(m, h);
      a = b + "l";
      var q = this.getSymbolDataByPosition(a, h),
        t = b + "c",
        k = this.getSymbolDataByPosition(t, h);
      b += "m";
      n = this.getSymbolDataByPosition(b, h);
      null === r &&
        (r = {
          font: null,
          height: 0,
          width: n.width,
          x: n.x,
          xadjust: n.xadjust,
          y: n.y,
          yadjust: n.yadjust,
        });
      null === q &&
        (q = {
          font: null,
          height: 0,
          width: n.width,
          x: n.x,
          xadjust: n.xadjust,
          y: n.y,
          yadjust: n.yadjust,
        });
      null === k &&
        (k = {
          font: null,
          height: 0,
          width: n.width,
          x: n.x,
          xadjust: n.xadjust,
          y: n.y,
          yadjust: n.yadjust,
        });
      n.adjusted ||
        ((n.adjusted = !0),
        1 < r.height && --r.height,
        2 < k.height && ((k.height -= 2), (k.x += 1)),
        1 < q.height && (--q.height, (q.x += 1)));
      f = Math.max(f, r.height + n.height + q.height + 2 * k.height);
      e = e - f + q.yadjust;
      p = Math.max(r.width, n.width, k.width, q.width);
      if (!g) {
        var u = Math.min(r.xadjust, q.xadjust, n.xadjust, k.xadjust),
          v = d + r.xadjust - u,
          y = e + r.height - r.yadjust,
          r = r.height,
          w = d + q.xadjust - u,
          z = e + f - q.yadjust,
          q = q.height,
          A = 0,
          C = 0;
        0 < k.height &&
          ((A = (f - r - q - n.height) / 2),
          (A = Math.round(A)),
          (C = f - r - q - n.height - A));
        var D = d - n.xadjust + u,
          B = e + r + A + n.height - n.yadjust,
          E = f - r - q - A - C,
          F = null,
          G = null;
        0 < k.height &&
          ((F = {
            x: d - k.xadjust + u,
            y: e + r + k.height - k.yadjust,
            width: k.width,
            height: A,
          }),
          (G = {
            x: d - k.xadjust + u,
            y: e + r + A + n.height + k.height - k.yadjust,
            width: k.width,
            height: C,
          }));
        0 < r && this.drawSymbol(m, v, y, g, !1, !1, l, h);
        0 < E &&
          this.drawSymbol(
            b,
            D,
            B,
            g,
            !1,
            !1,
            l,
            h,
            null,
            0 == k.height ? E : null
          );
        0 < k.height &&
          (0 < A &&
            this.drawSymbol(t, F.x, F.y, g, !1, !1, l, h, null, F.height),
          0 < C &&
            this.drawSymbol(t, G.x, G.y, g, !1, !1, l, h, null, G.height));
        0 < q && this.drawSymbol(a, w, z, g, !1, !1, l, h);
      }
      return { left: d, top: e, width: p, height: f };
    },
    drawAngleBracket: function (a, b, d, e, f, g, h, l, m) {
      a = this.getContext();
      h = 0;
      void 0 !== a.fontSizeModifier &&
        null !== a.fontSizeModifier &&
        (h = a.fontSizeModifier);
      if (void 0 === m || null === m) m = 1;
      h = Math.min(Math.round(f / 4), this.getFontUnitEm(h));
      var t = e + Math.round(f / 2),
        k = "\u27e8" == b || "\u2329" == b || "<" == b ? d + m : d + h + m;
      b = "\u27e8" == b || "\u2329" == b || "<" == b ? d + h + m : d + m;
      g ||
        (a.save(),
        void 0 !== l && (a.strokeStyle = l),
        (a.lineWidth = m),
        a.beginPath(),
        a.moveTo(b, e),
        a.lineTo(k, t),
        a.lineTo(b, e + f),
        a.stroke(),
        a.closePath(),
        a.restore());
      return { left: d, top: e, width: h + 2 * m, height: f };
    },
    drawCeilingFloorBracket: function (a, b, d, e, f, g, h, l, m) {
      a = this.getContext();
      h = 0;
      void 0 !== a.fontSizeModifier &&
        null !== a.fontSizeModifier &&
        (h = a.fontSizeModifier);
      if (void 0 === m || null === m) m = 1;
      h = Math.round(Math.min(f / 6, this.getFontUnitEm(h) / 2));
      h = 2 > h ? 2 : h;
      var t = "\u2308" == b || "\u230a" == b ? d + m : d + h + m,
        k = "\u230a" == b || "\u230b" == b ? e : e + f,
        n = "\u230a" == b || "\u230b" == b ? e + f : e,
        p = "\u2309" == b || "\u230b" == b ? d + m : d + h + m;
      b = "\u2308" == b || "\u2309" == b ? e : e + f;
      g ||
        (a.save(),
        void 0 !== l && (a.strokeStyle = l),
        (a.lineWidth = m),
        a.beginPath(),
        a.moveTo(t, k),
        a.lineTo(t, n),
        a.lineTo(p, b),
        a.stroke(),
        a.closePath(),
        a.restore());
      return { left: d, top: e, width: h + 2 * m, height: f };
    },
    drawVerticalBracket: function (a, b, d, e, f, g, h, l, m, t) {
      for (
        var k, n = (t = null), p = null, r = null, q = null, u = 65535, v = 5;
        1 <= v;
        v--
      ) {
        var y = this.getSymbolDataByPosition(a + v, l);
        if (
          null !== y &&
          void 0 !== y &&
          (null === n && ((r = a + v), (n = y)),
          null === p && y.width <= 0.7 * f && ((q = a + v), (p = y)),
          y.width >= e)
        ) {
          var w = y.width > f ? y.width - f : f - y.width;
          w < u && ((t = a + v), (k = y), (u = w));
        }
      }
      e = null;
      u = m ? "" : "b";
      m = a + u + "m";
      e = this.getSymbolDataByPosition(m, l);
      (null !== k && void 0 !== k) ||
        (null !== e && void 0 !== e) ||
        (null !== n && void 0 !== n
          ? ((t = r), (k = n))
          : ((t = a), (k = this.getSymbolDataByPosition(a, l))));
      -1 !== "\u02d8^\u02c7~".indexOf(a) &&
        (null !== p
          ? ((k = p), (t = q))
          : void 0 !==
              org.imatheq.formulaeditor.MathCanvas.symbolPositions[a] &&
            ((t = a), (k = this.getSymbolDataByPosition(a, l))));
      if (null !== k && void 0 !== k)
        return (
          (b = this.drawSymbol(t, b, d, g, !1, !1, h, l)),
          k.topcentre
            ? {
                left: b.left,
                top: b.top,
                width: b.width,
                height: b.height,
                topcentre: k.topcentre,
                bottomcentre: k.bottomcentre,
                bottomindent: k.bottomindent,
              }
            : { left: b.left, top: b.top, width: b.width, height: b.height }
        );
      k = a + u + "l";
      var z = this.getSymbolDataByPosition(k, l);
      t = a + u + "r";
      var A = this.getSymbolDataByPosition(t, l),
        n = a + u + "c",
        p = this.getSymbolDataByPosition(n, l),
        q = (r = 0);
      null === z &&
        ((z = {
          font: null,
          height: e.height,
          width: 0,
          x: e.x,
          xadjust: e.xadjust,
          y: e.y,
          yadjust: e.yadjust,
        }),
        this.isTTFFont(m, l) && (null !== p ? (r = 1) : null !== e && (r = 1)));
      Array.prototype.slice.call(e);
      null === A &&
        ((A = {
          font: null,
          height: e.height,
          width: 0,
          x: e.x,
          xadjust: e.xadjust,
          y: e.y,
          yadjust: e.yadjust,
        }),
        this.isTTFFont(m, l) && (null !== p ? (q = 1) : null !== e && (q = 1)));
      null === p &&
        (p = {
          font: null,
          height: e.height,
          width: 0,
          x: e.x,
          xadjust: e.xadjust,
          y: e.y,
          yadjust: e.yadjust,
        });
      e.adjusted ||
        this.isTTFFont(m, l) ||
        ((e.adjusted = !0),
        1 < z.width && --z.width,
        2 < e.width && ((e.width -= 2), (e.x += 1)),
        2 < p.width && ((p.width -= 2), (p.x += 1)),
        1 < A.width && (--A.width, (A.x += 1)));
      u = Math.max(z.yadjust, e.yadjust, p.yadjust, A.yadjust);
      a = Math.max(z.height, e.height, p.height, A.height);
      u = d - a + u;
      f = Math.max(f, z.width + e.width + A.width + 2 * p.width);
      if (!g) {
        var v = Math.min(z.yadjust, A.yadjust, e.yadjust, p.yadjust),
          y = b + r,
          w = d - z.yadjust + v,
          z = z.width,
          C = b + f + r + q - A.width,
          D = d - A.yadjust + v,
          A = A.width,
          B = 0,
          E = 0;
        0 < p.width &&
          ((B = (f - z - A - e.width) / 2),
          (B = Math.round(B)),
          (E = f - z - A - e.width - B));
        var F = y + z + B,
          G = d - e.yadjust + v,
          H = f - z - A - B - E,
          I = null,
          J = null;
        0 < p.width &&
          ((I = { x: y + z, y: d - p.yadjust + v, width: B, height: p.height }),
          (J = {
            x: y + z + B + e.width,
            y: d - p.yadjust + v,
            width: E,
            height: p.height,
          }));
        0 < z && this.drawSymbol(k, y, w, g, !1, !1, h, l);
        0 < H &&
          this.drawSymbol(m, F, G, g, !1, !1, h, l, 0 == p.width ? H : null);
        0 < p.width &&
          (0 < B && this.drawSymbol(n, I.x, I.y, g, !1, !1, h, l, I.width),
          0 < E && this.drawSymbol(n, J.x, J.y, g, !1, !1, h, l, J.width));
        0 < A && this.drawSymbol(t, C, D, g, !1, !1, h, l);
      }
      return { left: b, top: u, width: f + r + q, height: a };
    },
    drawBox: function (a, b, d, e, f, g) {
      var h = null,
        l = d;
      if (void 0 === d || null === d) l = 1;
      h = void 0 != f && f ? this.getBgContext() : this.getContext();
      h.save();
      void 0 !== g && null !== g && h.setLineDash(g);
      void 0 !== e && null !== e && (h.fillStyle = e);
      void 0 !== b && (h.strokeStyle = b);
      e && h.fillRect(a.left, a.top, a.width, a.height);
      if (!e || (e && b))
        (h.lineWidth = l),
          h.strokeRect(a.left, a.top, a.width - 1, a.height - 1);
      h.restore();
    },
    drawBar: function (a) {
      if (null !== a) {
        var b = this.editor.canvas.getBgContext();
        if (com.efmase.js.utilities.toolset.isMobile()) {
          b.save();
          b.lineWidth = 1;
          b.beginPath();
          var d = com.efmase.js.utilities.toolset.barWidth;
          b.strokeStyle = "#0F8394";
          b.fillStyle = "#18DAF6";
          b.moveTo(a.x, a.bottom + 2);
          b.lineTo(a.x - d, a.bottom + 2 + d);
          b.lineTo(a.x - d, a.bottom + 2 + 3 * d);
          b.lineTo(a.x + d, a.bottom + 2 + 3 * d);
          b.lineTo(a.x + d, a.bottom + 2 + d);
          b.lineTo(a.x, a.bottom + 2);
          b.fill();
          b.stroke();
          b.closePath();
          b.restore();
        }
      }
    },
    drawSlash: function (a, b, d) {
      var e = this.getContext();
      e.save();
      void 0 !== b && (e.strokeStyle = b);
      e.lineWidth = d;
      e.beginPath();
      e.moveTo(a.left, a.top + a.height);
      e.lineTo(a.left + a.width, a.top);
      e.stroke();
      e.closePath();
      e.restore();
    },
    drawBackslash: function (a, b, d) {
      var e = this.getContext();
      e.save();
      void 0 !== b && (e.strokeStyle = b);
      e.lineWidth = d;
      e.beginPath();
      e.moveTo(a.left, a.top);
      e.lineTo(a.left + a.width, a.top + a.height);
      e.stroke();
      e.closePath();
      e.restore();
    },
    drawHStrike: function (a, b, d) {
      var e = null,
        e = this.getContext();
      e.save();
      void 0 !== b && (e.strokeStyle = b);
      e.lineWidth = d;
      if (void 0 === d || null === d) e.lineWidth = 1;
      e.beginPath();
      e.moveTo(a.left, a.top + Math.round(a.height / 2));
      e.lineTo(a.left + a.width, a.top + Math.round(a.height / 2));
      e.stroke();
      e.closePath();
      e.restore();
    },
    drawCircle: function (a, b, d) {
      var e = this.getContext(),
        f = Math.round(a.width / 2),
        g = Math.round(a.height / 2),
        f = a.left + f,
        g = a.top + g,
        h = 1.414 * a.width;
      a = 1.414 * a.height;
      e.save();
      e.beginPath();
      var l = f - h / 2,
        m = f + h / 2,
        t = g - a / 2,
        k = g + a / 2,
        n = (0.551784 * h) / 2,
        p = (0.551784 * a) / 2;
      e.moveTo(f, t);
      e.bezierCurveTo(f + n, t, m, g - p, m, g);
      e.bezierCurveTo(m, g + p, f + n, k, f, k);
      e.bezierCurveTo(f - n, k, l, g + p, l, g);
      e.bezierCurveTo(l, g - p, f - n, t, f, t);
      e.strokeStyle = b;
      e.lineWidth = d;
      e.stroke();
      e.restore();
      return {
        left: f - Math.round(h / 2),
        top: g - Math.round(a / 2),
        width: h + d,
        height: a + d,
      };
    },
    drawCircle1: function (a, b, d) {
      var e = this.getContext(),
        f = Math.round(a.width / 2 - d / 2),
        g = Math.round(a.height / 2 - d / 2),
        h = Math.round((a.width * Math.sqrt(2)) / 2 - d / 2),
        l = Math.round((a.height * Math.sqrt(2)) / 4 - d / 4),
        m = a.left + f,
        t = a.top + g,
        k = [];
      k.push({ rc_x: m + a.width - h, rc_y: t - 2 * l, x: m + f, y: t - g });
      k.push({ rc_x: m + h, rc_y: t - l + 1, x: m + h, y: t });
      k.push({
        rc_x: m + h,
        rc_y: t + l - 1,
        x: a.left + a.width,
        y: a.top + a.height,
      });
      k.push({ rc_x: m + a.width - h, rc_y: t + 2 * l, x: m, y: t + 2 * l });
      k.push({ rc_x: m - a.width + h, rc_y: t + 2 * l, x: m - f, y: t + g });
      k.push({ rc_x: m - h, rc_y: t + l - 1, x: m - h, y: t });
      k.push({ rc_x: m - h, rc_y: t - l + 1, x: m - f, y: t - g });
      k.push({ rc_x: m - a.width + h, rc_y: t - 2 * l, x: m, y: t - 2 * l });
      e.save();
      e.beginPath();
      e.moveTo(k[k.length - 1].x, k[k.length - 1].y);
      for (a = 0; a < k.length; a++)
        e.quadraticCurveTo(k[a].rc_x, k[a].rc_y, k[a].x, k[a].y);
      e.strokeStyle = b;
      e.lineWidth = d;
      e.stroke();
      e.restore();
      return {
        left: m - h,
        top: t - 2 * l,
        width: 2 * h + d,
        height: 2 * l + d,
      };
    },
    drawBoxWithBaseline: function (a, b, d, e) {
      this.drawBox(a, e, 1, d);
      e = this.getContext();
      e.save();
      b &&
        (void 0 !== d && (e.strokeStyle = d),
        e.beginPath(),
        e.moveTo(a.left, b),
        e.lineTo(a.left + a.width - 1, b),
        e.stroke(),
        e.closePath());
      e.restore();
    },
    drawFBox: function (a, b, d, e, f, g, h, l) {
      if (null === e || void 0 === e) e = "f";
      a = this.drawSymbol(e, a, b, !0, f, g, h, l);
      d ||
        ((d = this.getContext()),
        d.save(),
        (d.fillStyle = "rgba(167,191,255, 0.5)"),
        d.fillRect(a.left + 1, a.top + 1, a.width - 2, a.height - 2),
        (d.lineWidth = "1"),
        (d.strokeStyle = "black"),
        d.strokeRect(a.left, a.top, a.width, a.height),
        d.restore());
      return a;
    },
    drawcBox: function (a, b, d, e, f, g, h, l) {
      if (null === e || void 0 === e) e = "c";
      dim0 = this.getXDimentions(m, a, b);
      baseline = dim0.top + Math.round(0.4 * dim0.height);
      a = this.drawSymbol(e, a, b, !0, f, g, h, l);
      a.height = 2 * Math.round(a.width / 2);
      a.top = baseline - a.height / 2;
      if (!d) {
        var m = this.getContext();
        m.save();
        m.fillStyle = "rgba(167,191,255, 0.5)";
        m.fillRect(a.left + 1, a.top + 1, a.width - 2, a.height - 2);
        m.lineWidth = "1";
        m.strokeStyle = "black";
        m.strokeRect(a.left, a.top, a.width, a.height);
        m.restore();
      }
      return a;
    },
    getObjectOffset: function (a) {
      var b = (currtop = 0);
      if (a.offsetParent) {
        do (b += a.offsetLeft), (currtop += a.offsetTop);
        while ((a = a.offsetParent));
      } else (b += a.offsetLeft), (currtop += a.offsetTop);
      return [b, currtop];
    },
    getExFontHeights: function (a, b, d, e) {
      var f = document.createElement("span");
      f.style.fontFamily = b;
      f.style.fontSize = d + "px";
      f.style.fontStyle = e;
      f.innerHTML = a;
      d = document.createElement("div");
      d.style.display = "inline-block";
      d.style.width = "1px";
      d.style.height = "0px";
      a = document.createElement("div");
      a.appendChild(f);
      a.appendChild(d);
      a.style.height = "0px";
      a.style.overflow = "hidden";
      document.body.appendChild(a);
      d.style.verticalAlign = "baseline";
      e = this.getObjectOffset(d);
      var g = this.getObjectOffset(f);
      b = e[1] - g[1];
      d.style.verticalAlign = "bottom";
      e = this.getObjectOffset(d);
      g = this.getObjectOffset(f);
      f = e[1] - g[1];
      d = f - b;
      document.body.removeChild(a);
      return [b, f, d];
    },
    getCachedExFontHeights: function (a, b) {
      var d = null,
        e = "normal";
      b.italic && b.bold
        ? (e = "bold_italic")
        : b.bold
        ? (e = "bold")
        : b.italic && (e = "italic");
      if (null === this.exFontCache[a] || void 0 === this.exFontCache[a])
        this.exFontCache[a] = [];
      if (
        null === this.exFontCache[a][b.ttfFontFamily] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily]
      )
        this.exFontCache[a][b.ttfFontFamily] = [];
      if (
        null === this.exFontCache[a][b.ttfFontFamily][e] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily][e]
      )
        this.exFontCache[a][b.ttfFontFamily][e] = [];
      return null === this.exFontCache[a][b.ttfFontFamily][e][b.pxSize] ||
        void 0 === this.exFontCache[a][b.ttfFontFamily][e][b.pxSize]
        ? ((typeface = e.replace("_", " ")),
          (d = this.getExFontHeights(a, b.ttfFontFamily, b.pxSize, typeface)),
          (this.exFontCache[a][b.ttfFontFamily][e][b.pxSize] = d))
        : this.exFontCache[a][b.ttfFontFamily][e][b.pxSize];
    },
    getXDimentions: function (a, b, d) {
      b = 0;
      a && a.fontSizeModifier && (b = a.fontSizeModifier);
      a = this.getSymbolDataByPosition("x", b, !1, this.editor.isBold());
      a.top = d + a.yadjust - a.height;
      return a;
    },
    drawSymbol: function (a, b, d, e, f, g, h, l, m, t) {
      var k = org.imatheq.formulaeditor.MathCanvas;
      if (void 0 !== k.specialSymbols[a]) {
        m = { top: d, left: b, width: 0, height: 0 };
        var n,
          p = k.specialSymbols[a];
        for (n = 0; n < p.length; n++)
          (t = m),
            (m = this.drawSymbol(p[n], b, d, e, f, g, h, l)),
            (m = {
              top: Math.min(t.top, m.top),
              height:
                Math.max(t.top + t.height, m.top + m.height) -
                Math.min(t.top, m.top),
              left: Math.min(t.left, m.left),
              width:
                Math.max(t.left + t.width, m.left + m.width) -
                Math.min(t.left, m.left),
            });
        return m;
      }
      n = this.getFontInfo(a, l, f, g);
      if ("BMP" != n.glyphType) {
        var r = this.getSymbolDataByPosition(a, l, f, g);
        f = n.onscreen ? n.onscreen : a;
        if (
          "msbm7" == n.ttfFontFamily ||
          "imescr7" == n.ttfFontFamily ||
          "eufm7" == n.ttfFontFamily
        )
          f = org.imatheq.formulaeditor.parsing.expression.RevList[f].key;
        p = 0;
        -1 !==
          org.imatheq.formulaeditor.parsing.expression.LargeopList.indexOf(a) &&
          ((g = this.getXDimentions({ fontSizeModifier: 0 }, b, d)),
          (l = d - r.height + r.yadjust),
          (p =
            Math.round(g.top + Math.round(0.4 * g.height) - r.height / 2) - l));
        g = {
          left: b,
          top: d - r.height + r.yadjust + p,
          width: r.width,
          height: r.height,
        };
        if (!0 !== e) {
          e = this.getContext("2d");
          e.save();
          e.font = n.typeface;
          e.fillStyle = h;
          if (null !== m && void 0 !== m)
            for (h = Math.round(m / r.width + 0.5), n = 0; n < h; n++)
              e.fillText(
                f,
                b + r.xadjust + (n < h - 1 ? n * r.width : m - r.width),
                d
              );
          else if (null !== t && void 0 !== t)
            for (h = Math.round(t / r.height + 0.5), n = 0; n < h; n++)
              e.fillText(
                f,
                b + r.xadjust,
                d + (n < h - 1 ? n * r.height : t - r.height)
              );
          else e.fillText(f, b + r.xadjust, d + p);
          e.restore();
        }
        return g;
      }
      var r = this.getSymbolDataByPosition(a, l, f, g),
        q = r.font;
      r.margin &&
        (r = this.extendObject(r, {
          x: r.x - r.margin,
          width: r.width + 2 * r.margin,
        }));
      var u = d - r.height + r.yadjust + p,
        v = null !== m && void 0 !== m ? m : r.width,
        y = null !== t && void 0 !== t ? t : r.height;
      if (!e) {
        var w = this.canvas,
          z = this.imageCache;
        d = function () {
          w.getContext("2d").drawImage(
            z[q.image],
            r.x,
            r.y,
            2 * r.width,
            2 * r.height,
            b,
            u,
            v,
            y
          );
        };
        if (null === z[q.image] || void 0 === z[q.image]) {
          var A = new Image(),
            k = this;
          A.onload = function () {
            if (z[q.image] instanceof Array) {
              var a = z[q.image];
              z[q.image] = A;
              for (var b = 0; b < a.length; b++) a[b]();
              k.loadingImages--;
            }
          };
          z[q.image] = [];
          z[q.image].push(d);
          A.src = q.image;
          this.loadingImages++;
          this.waitToLoadImage();
        } else z[q.image] instanceof Array ? z[q.image].push(d) : d();
      }
      return { left: b, top: u, width: v, height: y };
    },
    extendObject: function (a, b) {
      var d = {},
        e;
      for (e in a) d[e] = a[e];
      for (e in b) d[e] = b[e];
      return d;
    },
    getFontInfo: function (a, b, d, e) {
      if (" " == a)
        return (
          console.log(
            "getFontInfo: space character should be handled by presentation.Spcae!"
          ),
          null
        );
      var f = org.imatheq.formulaeditor.MathCanvas.symbolPositions["m" + a];
      2 == a.length &&
        "m" == a.charAt(0) &&
        (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a]);
      var g = 0 == this.fontFamilyNameIdx && d && null !== f && void 0 !== f,
        h = this.getFontSizeIdx(b),
        h = this.fontSizes[h];
      b = this.getPXFontSize(b);
      g || (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[a]);
      if (1 < a.length && (null === f || void 0 === f)) return null;
      var l = org.imatheq.formulaeditor.presentation.SymbolOnscreens[a];
      void 0 === l && (l = null);
      l &&
        null !== f &&
        void 0 !== f &&
        "cmex10" != f.font &&
        "cmey10" != f.font &&
        (f = org.imatheq.formulaeditor.MathCanvas.symbolPositions[l]);
      var m =
          null !== f &&
          void 0 !== f &&
          ("cmex10" == f.font ||
            "cmey10" == f.font ||
            0 == this.fontFamilyNameIdx),
        t =
          null !== f &&
          void 0 !== f &&
          f.font &&
          f.font.indexOf("10") == f.font.length - 2,
        k;
      t && (k = f.font.slice(0, f.font.length - 2));
      var n;
      "cmex" == k || "cmey" == k
        ? (n = k + "10")
        : g || "msbm" == k || "imescr" == k || "eufm" == k || "\u2202" == a
        ? (n = k + (e ? "b" : "") + "10")
        : ((n = k + (d ? "i" : "") + (e ? "b" : "") + "10"),
          0 != this.fontFamilyNameIdx &&
            (n =
              this.fontNames[this.fontFamilyNameIdx].replace(/ /g, "") +
              "_" +
              n));
      if (0 == this.fontFamilyNameIdx || "cmex" == k || "cmey" == k)
        if (m) {
          if (((m = k + "7"), "cmsy" == k || "cmsz" == k || "bnormal" == k))
            m = "cmr7";
        } else
          m = new org.imatheq.formulaeditor.Options().getOption(
            "defaultFont4NewSymbol"
          );
      else m = this.fontNames[this.fontFamilyNameIdx];
      var p = "TTF_WO_DIM";
      t && (p = "TTF_W_DIM");
      var r = !1;
      if (!t) {
        r = "normal";
        if (e && d) r = "bold_italic";
        else if (e || d) r = e ? "bold" : "italic";
        r =
          this.exFontCache[a] &&
          this.exFontCache[a][m] &&
          this.exFontCache[a][m][r] &&
          this.exFontCache[a][m][r][b];
      }
      var q = (e ? "bold " : "") + "" + b + "px " + m;
      d &&
        !g &&
        "msbm" != k &&
        "imescr" != k &&
        "eufm" != k &&
        "\u2202" != a &&
        (q = "italic " + q);
      return {
        ttfFontFamily: m,
        pxSize: b,
        typeface: q,
        bold: e,
        italic: d,
        glyphType: p,
        fontSizeGroup: n,
        isCmmi: g,
        hasDimensions: t,
        cached: r,
        bmpSize: h,
        row: f ? f.row : null,
        col: f ? f.col : null,
        onscreen: l,
      };
    },
    getSymbolDataByPosition: function (a, b, d, e) {
      d = null !== d && void 0 !== d ? d : !1;
      e = null !== e && void 0 !== e ? e : !1;
      var f = this.getFontInfo(a, b, d, e),
        g = org.imatheq.formulaeditor.MathCanvas.fontsByPosition;
      if (!f) {
        if (1 < a.length) return null;
        throw Error("getFontInfo() returns null");
      }
      if (f.hasDimensions)
        a = g[f.fontSizeGroup][f.bmpSize][16 * f.row + f.col];
      else {
        if ("cmex10" == f.fontSizeGroup || "cmey10" == f.fontSizeGroup)
          return null;
        var g = this.getContext("2d"),
          h = this.getCachedExFontHeights(a, f);
        g.font =
          (d ? "italic " : "") +
          (e ? "bold " : "") +
          this.getPXFontSize(b) +
          "px " +
          f.ttfFontFamily;
        a = {
          font: f.ttfFontFamily,
          x: 0,
          y: 0,
          xadjust: 0,
          yadjust: 2 * h[2],
          width: 2 * g.measureText(a).width,
          height: 2 * h[1],
        };
      }
      b = a.x;
      d = a.y;
      e = a.xadjust;
      var f = a.yadjust,
        g = a.width,
        h = a.height,
        l = a.topcentre ? a.topcentre : null,
        m = a.bottomcentre ? a.bottomcentre : null,
        t = a.bottomindent ? a.bottomindent : null;
      0 != e % 2 && (e--, g++, b--, l && l++, m && m++);
      0 != g % 2 && (g++, t && t++);
      0 != f % 2 && (f++, h++);
      0 != h % 2 && (h++, d--);
      l && 0 != l % 2 && l++;
      m && 0 != m % 2 && m++;
      t && 0 != t % 2 && t++;
      return {
        font: a.font,
        x: b,
        y: d,
        xadjust: e / 2,
        yadjust: f / 2,
        width: g / 2,
        height: h / 2,
        topcentre: a.topcentre ? l / 2 : null,
        bottomcentre: a.bottomcentre ? m / 2 : null,
        bottomindent: a.bottomindent ? t / 2 : null,
      };
    },
    getFontSizeIdx: function (a, b) {
      var d = null === b || void 0 === b ? this.fontSizeIdx : b;
      null !== a && void 0 !== a && (d += a);
      0 > d && (d = 0);
      d > this.fontSizes.length - 1 && (d = this.fontSizes.length - 1);
      return d;
    },
    getFontUnit: function (a, b, d, e, f) {
      if ("em" == a)
        return (a = this.getSymbolDataByPosition("M", b, e, f)), a.width;
      a = this.getSymbolDataByPosition("x", b, e, f);
      return a.height;
    },
    getFontUnitEm: function (a) {
      return this.getFontUnit("em", a);
    },
    getFontUnitEx: function (a) {
      return this.getFontUnit("ex", a);
    },
    clear: function () {
      var a = this.canvas,
        b = a.width,
        d = a.height;
      a.getContext("2d").clearRect(0, 0, b, d);
    },
    clearBg: function () {
      var a = this.bgCanvas,
        b = a.width,
        d = a.height;
      a.getContext("2d").clearRect(0, 0, b, d);
    },
    decreaseSize: function () {
      0 < this.fontSizeIdx && --this.fontSizeIdx;
    },
    increaseSize: function () {
      this.fontSizeIdx < this.fontSizes.length - 1 && (this.fontSizeIdx += 1);
    },
  });
  org.imatheq.formulaeditor.MathCanvas.addFont = function (a, b) {
    var d = "" + a;
    org.imatheq.formulaeditor.MathCanvas.fontsByPosition ||
      (org.imatheq.formulaeditor.MathCanvas.fontsByPosition = {});
    var e = org.imatheq.formulaeditor.MathCanvas.fontsByPosition,
      f;
    for (f in b) {
      e[f] || (e[f] = {});
      var g = e[f],
        h = b[f],
        l = { image: $isItRight() + "com/imatheq/fonts/" + f + "/" + d + ".png" };
      g[d] || (g[d] = []);
      for (var g = g[d], m = h.length, t = 0; 8 > t; t++)
        for (var k = 0; 16 > k; k++) {
          var n = 16 * t + k;
          if (n < m - 3) {
            var p = 0,
              r = h[n][0],
              q = h[n][1],
              u = h[n][2];
            h[n][3] && (p = h[n][3]);
            p = h[n][4]
              ? {
                  x: h[m - 3][k] - p,
                  y: h[m - 2][t] - q + u,
                  width: r,
                  height: q,
                  xadjust: -p,
                  yadjust: u,
                  font: l,
                  topcentre: h[n][4],
                  bottomcentre: h[n][5],
                  bottomindent: h[n][6],
                }
              : {
                  x: h[m - 3][k] - p,
                  y: h[m - 2][t] - q + u,
                  width: r,
                  height: q,
                  xadjust: -p,
                  yadjust: u,
                  font: l,
                };
          }
          g.push(p);
        }
    }
  };
  org.imatheq.formulaeditor.MathCanvas.symbolsInFont = {
    msbm10: [
      "\ud835\udd38 \ud835\udd39 \u2102 \ud835\udd3b \ud835\udd3c \ud835\udd3d \ud835\udd3e \u210d \ud835\udd40 \ud835\udd41 \ud835\udd42 \ud835\udd43 \ud835\udd44 \u2115 \ud835\udd46 \u2119".split(
        " "
      ),
      [
        "\u211a",
        "\u211d",
        "\ud835\udd4a",
        "\ud835\udd4b",
        "\ud835\udd4c",
        "\ud835\udd4d",
        "\ud835\udd4e",
        "\ud835\udd4f",
        "\ud835\udd50",
        "\u2124",
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    imescr10: [
      "\ud835\udc9c \u212c \ud835\udc9e \ud835\udc9f \u2130 \u2131 \ud835\udca2 \u210b \u2110 \ud835\udca5 \ud835\udca6 \u2112 \u2133 \ud835\udca9 \ud835\udcaa \ud835\udcab".split(
        " "
      ),
      "\ud835\udcac \u211b \ud835\udcae \ud835\udcaf \ud835\udcb0 \ud835\udcb1 \ud835\udcb2 \ud835\udcb3 \ud835\udcb4 \ud835\udcb5 \ud835\udcb6 \ud835\udcb7 \ud835\udcb8 \ud835\udcb9 \u212f \ud835\udcbb".split(
        " "
      ),
      "\u210a \ud835\udcbd \ud835\udcbe \ud835\udcbf \ud835\udcc0 \ud835\udcc1 \ud835\udcc2 \ud835\udcc3 \u2134 \ud835\udcc5 \ud835\udcc6 \ud835\udcc7 \ud835\udcc8 \ud835\udcc9 \ud835\udcca \ud835\udccb".split(
        " "
      ),
      [
        "\ud835\udccc",
        "\ud835\udccd",
        "\ud835\udcce",
        "\ud835\udccf",
        null,
        null,
        null,
        null,
      ],
    ],
    eufm10: [
      "\ud835\udd04 \ud835\udd05 \u212d \ud835\udd07 \ud835\udd08 \ud835\udd09 \ud835\udd0a \u210c \u2111 \ud835\udd0d \ud835\udd0e \ud835\udd0f \ud835\udd10 \ud835\udd11 \ud835\udd12 \ud835\udd13".split(
        " "
      ),
      "\ud835\udd14 \u211c \ud835\udd16 \ud835\udd17 \ud835\udd18 \ud835\udd19 \ud835\udd1a \ud835\udd1b \ud835\udd1c \u2128 \ud835\udd1e \ud835\udd1f \ud835\udd20 \ud835\udd21 \ud835\udd22 \ud835\udd23".split(
        " "
      ),
      "\ud835\udd24 \ud835\udd25 \ud835\udd26 \ud835\udd27 \ud835\udd28 \ud835\udd29 \ud835\udd2a \ud835\udd2b \ud835\udd2c \ud835\udd2d \ud835\udd2e \ud835\udd2f \ud835\udd30 \ud835\udd31 \ud835\udd32 \ud835\udd33".split(
        " "
      ),
      [
        "\ud835\udd34",
        "\ud835\udd35",
        "\ud835\udd36",
        "\ud835\udd37",
        null,
        null,
        null,
        null,
      ],
    ],
    bnormal10: [
      "\u03b1\u03b2\u03b3\u03b4\u03b5\u03f5\u03b6\u03b7\u03b8\u03d1\u03b9\u03ba\u03bb\u03bc\u03bd\u03be".split(
        ""
      ),
      [
        "\u03bf",
        "\u03c0",
        "\u03d6",
        "\u03c1",
        "\u03f1",
        "\u03c3",
        "\u03c2",
        "\u03c4",
        "\u03c5",
        "\u03c6",
        "\u03d5",
        "\u03c7",
        "\u03c8",
        "\u03c9",
        null,
        "\u2145",
      ],
      [
        null,
        "\u212a",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmr10: [
      "\u0393\u0394\u0398\u039e\u039b\u03a0\u03a3\u03d2\u03a6\u03a8\u03a9\ufb00\ufb01\ufb02\ufb03\ufb04".split(
        ""
      ),
      [
        "\u2030",
        "\u02d8",
        "`",
        "\u00b4",
        "\u02c7",
        "\u2026",
        null,
        "\u00b0",
        "\u00b8",
        "\u00df",
        "\u00e6",
        "\u0153",
        "\u00f8",
        "\u00c6",
        "\u0152",
        "\u00d8",
      ],
      [
        null,
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        null,
        ".",
        "/",
      ],
      "0123456789:;<=>?".split(""),
      "@ABCDEFGHIJKLMNO".split(""),
      "PQRSTUVWXYZ[\\]^\u02d9".split(""),
      [
        null,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
      ],
      [
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        null,
        null,
        null,
        "~",
        "\u00a8",
      ],
    ],
    cmex10: [
      "(1 )1 [1 ]1 \u230a1 \u230b1 \u23081 \u23091 {1 }1 <1 >1 |m \u2225m /1 \\1".split(
        " "
      ),
      "(2 )2 (3 )3 [3 ]3 \u230a3 \u230b3 \u23083 \u23093 {3 }3 <3 >3 /3 \\3".split(
        " "
      ),
      "(4 )4 [4 ]4 \u230a4 \u230b4 \u23084 \u23094 {4 }4 <4 >4 /4 \\4 /2 \\2".split(
        " "
      ),
      "(u )u [u ]u [l ]l [m ]m {u }u {l }l {m }m {c }c".split(" "),
      [
        "(l",
        ")l",
        "(m",
        ")m",
        "<2",
        ">2",
        null,
        null,
        null,
        "\u222e",
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "\u2211",
        "\u220f",
        "\u222b1",
        "\u22c3",
        "\u22c2",
        null,
        "\u22c0",
        "\u22c1",
      ],
      [
        null,
        "\u22101",
        "\u222c",
        "\u222d",
        "\u222f",
        "\u2230",
        null,
        null,
        "[2",
        "]2",
        "\u230a2",
        "\u230b2",
        "\u23082",
        "\u23092",
        "{2",
        "}2",
      ],
      [
        "v1",
        "v2",
        "v3",
        "v4",
        "vl",
        "vm",
        "vu",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmey10: [
      [
        "\u23221",
        "\u23222",
        "\u23224",
        "\u2322l",
        "\u2322r",
        "~1",
        "\u2194bl",
        "\u2194l",
        "\u23de1",
        null,
        "\u23de4",
        "\u23del",
        "\u21bcm",
        "\u21bcl",
        "\u2190m",
        "\u2190l",
      ],
      [
        "\u23231",
        "\u23232",
        "\u23234",
        "\u2323l",
        "\u2323r",
        "~2",
        "\u2194br",
        "\u2194r",
        "\u23df1",
        null,
        "\u23df4",
        "\u23dfl",
        "\u21c0m",
        "\u21c0r",
        "\u2192m",
        "\u2192r",
      ],
      [
        null,
        "\u23223",
        null,
        null,
        "\u2322m",
        "~3",
        "\u2194bm",
        "\u2194m",
        "^1",
        "\u23de3",
        null,
        "\u23der",
        "-m",
        "\u00afm",
        "\u02d81",
        null,
      ],
      [
        null,
        "\u23233",
        null,
        null,
        "\u2323m",
        null,
        "\u21d0bl",
        null,
        "\u02c71",
        "\u23df3",
        null,
        "\u23dfr",
        "\u033fm",
        "_m",
        "\u02d82",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        "^2",
        "\u2192br",
        "\u21d0bm",
        null,
        null,
        "^3",
        null,
        "\u23dem",
        null,
        null,
        "\u02d83",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        "\u02c72",
        "\u2192bm",
        "\u21d2br",
        null,
        null,
        "\u02c73",
        null,
        "\u23dfm",
        "\u21d4br",
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        "\u2190bl",
        "\u21d2bm",
        null,
        null,
        null,
        null,
        "\u23dec",
        "\u21d4bl",
        null,
        "\u23de2",
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        "\u2190bm",
        null,
        null,
        null,
        null,
        null,
        "\u23dfc",
        "\u21d4bm",
        null,
        "\u23df2",
        null,
      ],
    ],
    cmmi10: [
      "m\u0393 m\u0394 m\u0398 m\u039b m\u039e m\u03a0 m\u03a3 m\u03d2 m\u03a6 m\u03a8 m\u03a9 m\u03b1 m\u03b2 m\u03b3 m\u03b4 m\u03f5".split(
        " "
      ),
      "m\u03b6 m\u03b7 m\u03b8 m\u03b9 m\u03ba m\u03bb m\u03bc m\u03bd m\u03be m\u03c0 m\u03c1 m\u03c3 m\u03c4 m\u03c5 m\u03d5 m\u03c7".split(
        " "
      ),
      [
        "m\u03c8",
        "m\u03c9",
        "m\u03b5",
        "m\u03d1",
        "m\u03d6",
        "m\u03f1",
        "m\u03c2",
        "m\u03c6",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      "\u2202 mA mB mC mD mE mF mG mH mI mJ mK mL mM mN mO".split(" "),
      [
        "mP",
        "mQ",
        "mR",
        "mS",
        "mT",
        "mU",
        "mV",
        "mW",
        "mX",
        "mY",
        "mZ",
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        "ma",
        "mb",
        "mc",
        "md",
        "me",
        "mf",
        "mg",
        "mh",
        "mi",
        "mj",
        "mk",
        "ml",
        "mm",
        "mn",
        "mo",
      ],
      [
        "mp",
        "mq",
        "mr",
        "ms",
        "mt",
        "mu",
        "mv",
        "mw",
        "mx",
        "my",
        "mz",
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    cmsy10: [
      "\u2212\u00b7\u00d7\u204e\u00f7\u22c4\u00b1\u2213\u2295\u2296\u2297\u2298\u2299\u25cb\u2218\u2022".split(
        ""
      ),
      "\u224d\u2261\u2286\u2287\u2264\u2265\u227c\u227d\u223c\u2248\u2282\u2283\u226a\u226b\u227a\u227b".split(
        ""
      ),
      "\u2190\u2192\u2191\u2193\u2194\u2197\u2198\u2243\u21d0\u21d2\u21d1\u21d3\u21d4\u2196\u2199\u221d".split(
        ""
      ),
      [
        "\u2032",
        "\u221e",
        "\u2208",
        "\u220b",
        "\u25b3",
        "\u25bd",
        "\u2215",
        null,
        "\u2200",
        "\u2203",
        "\u00ac",
        "\u2205",
        null,
        null,
        "\u22a4",
        "\u22a5",
      ],
      [
        "\u2135",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "\u222a",
        "\u2229",
        "\u228e",
        "\u2227",
        "\u2228",
      ],
      [
        "\u22a2",
        "\u22a3",
        "\u230a",
        "\u230b",
        "\u2308",
        "\u2309",
        "{",
        "}",
        "\u27e8",
        "\u27e9",
        "|",
        "\u2225",
        "\u2195",
        "\u21d5",
        null,
        "\u2240",
      ],
      "\u221a\u2210\u2207\u222b\u2294\u2293\u2291\u2292\u00a7\u2020\u2021\u00b6\u2663\u2662\u2661\u2660".split(
        ""
      ),
    ],
    cmsz10: [
      "\u2201\u2204\u2220\u2221\u2222\u221f\u2234\u2235\u2260\u2262\u2245\u226e\u226f\u2270\u2271\u2209".split(
        ""
      ),
      [
        "\u2241",
        "\u2249",
        "\u2244",
        "\u2247",
        "\u220c",
        "\u2284",
        "\u2285",
        "\u2288",
        "\u2289",
        "\u00a1",
        "\u00bf",
        "\u22ef",
        "\u22ee",
        "\u22f0",
        "\u22f1",
        null,
      ],
      "\u22b2\u22b3\u228f\u2290\u2226\u21a9\u21aa\u21ab\u21ac\u21a2\u21a3\u21b0\u21b1\u21b2\u21b3\u21da".split(
        ""
      ),
      "\u21db\u21b6\u21b7\u21ba\u21bb\u22b8\u21ad\u21dc\u21dd\u219c\u219d\u219e\u21a0\u219a\u219b\u21ae".split(
        ""
      ),
      [
        "\u21cd",
        "\u21cf",
        "\u21ce",
        "\u21e0",
        "\u21e2",
        "\u21a4",
        "\u21a6",
        "\u296a",
        "\u296d",
        "\u21cb",
        "\u21cc",
        "\u21c6",
        "\u21c4",
        "\u21c7",
        "\u21c9",
        null,
      ],
      [
        "\u21bf",
        "\u21be",
        "\u21c3",
        "\u21c2",
        "\u296e",
        "\u296f",
        "\u21c8",
        "\u21ca",
        "\u21c5",
        "\u21f5",
        "\u2921",
        "\u2922",
        "\u2206",
        null,
        null,
        null,
      ],
      [
        "\u21bc",
        "\u21bd",
        "\u21c0",
        "\u21c1",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
  };
  org.imatheq.formulaeditor.MathCanvas.specialSymbols = { "\u2146": ["d"] };
  org.imatheq.formulaeditor.MathCanvas.fillSymbolPositions = function () {
    var a, b;
    org.imatheq.formulaeditor.MathCanvas.symbolPositions ||
      (org.imatheq.formulaeditor.MathCanvas.symbolPositions = {});
    a = org.imatheq.formulaeditor.MathCanvas.symbolPositions;
    b = org.imatheq.formulaeditor.MathCanvas.symbolsInFont;
    for (var d in b)
      for (var e = b[d], f = 0; f < e.length; f++)
        for (var g = 0; g < e[f].length; g++) {
          var h = e[f][g];
          null !== h &&
            void 0 !== h &&
            (h in a
              ? alert(
                  'duplicate entry for "' +
                    h +
                    '"\n' +
                    a[h].font +
                    ": (" +
                    a[h].row +
                    ", " +
                    a[h].col +
                    ")\n" +
                    d +
                    ": (" +
                    f +
                    ", " +
                    g +
                    ")\n"
                )
              : (a[h] = { font: d, row: f, col: g }));
        }
  };
  org.imatheq.formulaeditor.MathCanvas.fillSymbolPositions();
})();
(function () {
  org.imatheq.formulaeditor.MathCanvas.fontsByPosition = {};
})();
(function () {
  var a = [],
    b,
    d = null;
  org.imatheq.formulaeditor.FormulaEditor = $extend(Object, {
    system: "java",
    container: null,
    textarea: null,
    inMathml: null,
    canvas: null,
    keyboard: null,
    textbox: null,
    textboxHeight: 0,
    textboxSel: !1,
    presentation: null,
    selection: null,
    actions: null,
    cursor: null,
    palette: null,
    gifunc: {},
    showPalette: !0,
    testplayermode: !1,
    lst: "0",
    swNenuOn: !1,
    mouseIsDown: !1,
    onCursorBar: !1,
    onStartBar: !1,
    onEndBar: !1,
    isDragging: !1,
    pressTimer: null,
    initPosition: null,
    width: null,
    height: null,
    lang: null,
    isMobile: !1,
    pasteCache: null,
    pasteEvtSupport: !1,
    ctrlPressed: !1,
    cmdPressed: !1,
    initializing: !0,
    redrawing: !0,
    onComposition: !1,
    parrayLine: "PARRAY_LINE_SOLID",
    keyboardNavi: 0,
    keyboardNaviSW: 0,
    menuItems: null,
    curMenuItem: 0,
    paletteTabs: null,
    paletteBtns: null,
    curPaletteBtn: null,
    btnBarBtns: null,
    curBtnBarBtn: null,
    smallWinItems: null,
    hasFocus: function () {
      return "efmase_focus_textarea" === document.activeElement.className;
    },
    isBold: function () {
      var a = document.getElementById("efmase_menubar_item_bold");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    isForcedItalic: function () {
      var a = document.getElementById("efmase_menubar_item_italic");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    isAutoItalic: function () {
      var a = document.getElementById("efmase_menubar_item_autoitalic");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    isMtext: function () {
      var a = document.getElementById("efmase_menubar_item_mtext");
      return this.checkClass(a.className, "efmase_palettebutton_down");
    },
    getMathColor: function () {
      return document
        .getElementById("efmase_menubar_item_mathcolor")
        .getAttribute("mathcolor");
    },
    getPArrayLine: function () {
      var a = document.getElementById("PARRAY_LINE_SOLID");
      return this.checkClass(a.className, "efmase_palettebutton_select")
        ? "solid"
        : "dashed";
    },
    setPArrayLine: function (a) {
      var b = document.getElementById("PARRAY_LINE_SOLID"),
        d = document.getElementById("PARRAY_LINE_DASHED");
      "solid" == a
        ? (b.classList.add("efmase_palettebutton_select"),
          d.classList.remove("efmase_palettebutton_select"))
        : (b.classList.remove("efmase_palettebutton_select"),
          d.classList.add("efmase_palettebutton_select"));
      this.parrayLine = "PARRAY_LINE_" + a.toUpperCase();
    },
    addPalette: function (a, d) {
      b || (b = []);
      this.palette = new org.imatheq.formulaeditor.Palette();
      b.push(this.palette);
      this.palette.initialize(this.container, a, d);
    },
    setButtonStatus: function (a) {
      var b = com.efmase.js.utilities.toolset;
      if (null !== a && void 0 !== a)
        for (var d in a)
          switch (d) {
            case "bold":
              a[d]
                ? b.setObjsAttrb(
                    "efmase_menubar_item_bold",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : b.setObjsAttrb(
                    "efmase_menubar_item_bold",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "forcedItalic":
              a[d]
                ? b.setObjsAttrb(
                    "efmase_menubar_item_italic",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : b.setObjsAttrb(
                    "efmase_menubar_item_italic",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "autoItalic":
              a[d]
                ? b.setObjsAttrb(
                    "efmase_menubar_item_autoitalic",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : b.setObjsAttrb(
                    "efmase_menubar_item_autoitalic",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
              break;
            case "mathcolor":
              document
                .getElementById("efmase_menubar_item_mathcolor")
                .setAttribute("mathcolor", a[d]);
              break;
            case "mtext":
              a[d]
                ? b.setObjsAttrb(
                    "efmase_menubar_item_mtext",
                    "class",
                    "efmase_palettebutton_down"
                  )
                : b.setObjsAttrb(
                    "efmase_menubar_item_mtext",
                    "class",
                    "efmase_palettebutton_down",
                    "remove"
                  );
          }
      0 == this.actions.redoIndex
        ? b.setObjsAttrb(
            "efmase_menubar_item_undo",
            "class",
            "efmase_palettebtn_disabled"
          )
        : b.setObjsAttrb(
            "efmase_menubar_item_undo",
            "class",
            "efmase_palettebtn_disabled",
            "remove"
          );
      this.actions.redoIndex == this.actions.actions.length
        ? b.setObjsAttrb(
            "efmase_menubar_item_redo",
            "class",
            "efmase_palettebtn_disabled"
          )
        : b.setObjsAttrb(
            "efmase_menubar_item_redo",
            "class",
            "efmase_palettebtn_disabled",
            "remove"
          );
    },
    getButtonStatus: function () {
      return {
        bold: this.isBold(),
        forcedItalic: this.isForcedItalic(),
        autoItalic: this.isAutoItalic(),
        mathcolor: this.getMathColor(),
        mtext: this.isMtext(),
        parrayLine: this.getPArrayLine(),
      };
    },
    getBracketedObject: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = null;
      this.selection.hasSelection &&
        this.selection.getSelectionObject() instanceof a.Bracketed &&
        (b = this.selection.getSelectionObject());
      if (null === b) {
        for (
          var d = this.cursor.position.row.getAncestors(
              this.cursor.position.index
            ),
            e = 0;
          e < d.length && !(d[e] instanceof a.Bracketed);

        )
          e++;
        e == d.length
          ? console.log("updateBracket: error cannot find Bracketed parent.")
          : (b = d[e]);
      }
      return b;
    },
    checkClass: function (a, b) {
      var d = a.split(" "),
        e;
      for (e = 0; e < d.length; e++) if (d[e] == b) return !0;
      return !1;
    },
    togglePalette: function () {
      this.palette
        ? org.imatheq.formulaeditor.Palette.removePalette(this.palette)
        : this.addPalette();
    },
    initialize: function (d, e, f, m, t, k, n, p, r, q, u) {
      var v,
        y = null;
      this.lskey = f;
      this.lang = m;
      this.initializing = !0;
      null !== t && void 0 !== t && (this.width = t);
      null !== k && void 0 !== k && (this.height = k);
      null !== q &&
        void 0 !== q &&
        $setOptions("org.imatheq.formulaeditor.options", { defAutoItalic: q });
      null !== u &&
        void 0 !== u &&
        $setOptions("org.imatheq.formulaeditor.options", { defSymmetric: u });
      if (d) {
        var w = this;
        this.container = d;
        this.inMathml = "div" == d.localName ? d.innerHTML : d.value;
        d.innerHTML = "";
        f = org.imatheq.formulaeditor.Cursor;
        t = org.imatheq.formulaeditor.Selection;
        k = org.imatheq.formulaeditor.Actions;
        q = org.imatheq.formulaeditor.MathCanvas;
        this.isMobile = com.efmase.js.utilities.toolset.isMobile();
        for (u = 0; u < a.length; u++) if (a[u].container == d) return a[u];
        if (e)
          (this.container = d),
            (this.canvas = new q(this, e)),
            (this.canvas.bgCanvas = y);
        else {
          this.isMobile
            ? ((e = this.createHiDPICanvas(10, 10)),
              (y = this.createHiDPICanvas(10, 10)))
            : ((e = document.createElement("canvas")),
              (y = document.createElement("canvas")));
          this.textbox = document.createElement("textarea");
          this.textbox.autocapitalize = "off";
          this.textbox.autocomplete = "off";
          this.textbox.autocorrect = "off";
          this.textbox.spellcheck = !1;
          this.textbox.className = "efmase_focus_textarea";
          this.textbox.innerHTML = "$";
          this.textbox.value = "$";
          this.container = d;
          this.canvas = new q(this, e);
          this.canvas.bgCanvas = y;
          e.mozImageSmoothingEnabled = !1;
          e.webkitImageSmoothingEnabled = !1;
          e.msImageSmoothingEnabled = !1;
          e.imageSmoothingEnabled = !1;
          y.mozImageSmoothingEnabled = !1;
          y.webkitImageSmoothingEnabled = !1;
          y.msImageSmoothingEnabled = !1;
          y.imageSmoothingEnabled = !1;
          q = new org.imatheq.formulaeditor.Options();
          u = q.getOption("defaultFontNameIdx");
          u =
            null === n || void 0 === n || -1 == this.canvas.fontNames.indexOf(n)
              ? u
              : this.canvas.fontNames.indexOf(n);
          this.setFontFamilyNameIdx(u);
          n = q.getOption("defaultFontSizeIdx");
          n = com.efmase.js.utilities.toolset.isMobile()
            ? null === r ||
              void 0 === r ||
              isNaN(r) ||
              -1 == this.canvas.getFontSizeFromPX(r)
              ? n
              : this.canvas.getFontSizeFromPX(r)
            : null === p ||
              void 0 === p ||
              isNaN(p) ||
              -1 == this.canvas.getFontSizeFromPX(p)
            ? n
            : this.canvas.getFontSizeFromPX(p);
          this.canvas.setFontSizeIdx(n);
          if (!org.imatheq.formulaeditor.options.ignoreTextareaStyle)
            for (v in d.style)
              try {
                e.style[v] = d.style[v];
              } catch (z) {}
          e.className = "imatheqformula";
          null !== d.getAttribute("style") &&
          void 0 !== d.getAttribute("style") &&
          void 0 !== d.getAttribute("style").value
            ? e.setAttribute("style", d.getAttribute("style"))
            : org.imatheq.formulaeditor.options.inputStyle
            ? e.setAttribute(
                "style",
                org.imatheq.formulaeditor.options.inputStyle
              )
            : ((e.className = "fore_canvas"), (y.className = "bg_canvas"));
          "div" == d.localName &&
          this.checkClass(d.className, "imatheqvisibletextarea")
            ? (d.parentNode.insertBefore(e, d.nextSibling),
              (p = document.createElement("div")),
              (p.className = "EFMASE_Container"),
              d.parentNode.replaceChild(p, e),
              p.appendChild(e),
              e.parentNode.insertBefore(y, e),
              p.parentNode.insertBefore(this.textbox, p.nextSibling),
              (w = this),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "input",
                (function () {
                  return function (a) {
                    if (!w.isMobile && w.onComposition) return !0;
                    if ("" == this.value || "$" == this.value) return !1;
                    a = this.value;
                    this.value = "";
                    this.innerHTML = this.value = "$";
                    1 < a.length && "$" == a[0] && (a = a.slice(1));
                    if (w.hasFocus())
                      for (var b = 0; b < a.length; b++)
                        w.isMobile ||
                          ("a" <= this.value && "z" >= this.value) ||
                          ("0" <= this.value && "9" >= this.value) ||
                          ((this.value = ""),
                          (result = w.cursor.position.row.charInput(a[b], w))),
                          w.isMobile &&
                            (result = w.cursor.position.row.charInput(a[b], w));
                    return !1;
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "copy",
                (function () {
                  return function (a) {
                    w.onCutCopy(a, "copy");
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "compositionstart",
                (function () {
                  return function (a) {
                    w.onComposition = !0;
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "compositionend",
                (function () {
                  return function (a) {
                    if ("" == this.value || "$" == this.value) return !1;
                    a = this.value;
                    this.value = "";
                    1 < a.length && "$" == a[0]
                      ? (a = a.slice(1))
                      : 1 < a.length &&
                        "$" == a[a.length - 1] &&
                        (a = a.slice(0, a.length - 1));
                    if (w.hasFocus())
                      for (var b = 0; b < a.length; b++)
                        w.isMobile ||
                          ("a" <= this.value && "z" >= this.value) ||
                          ("0" <= this.value && "9" >= this.value) ||
                          ((this.value = ""),
                          (result = w.cursor.position.row.charInput(a[b], w))),
                          w.isMobile &&
                            (result = w.cursor.position.row.charInput(a[b], w));
                    return (w.onComposition = !1);
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "compositionupdate",
                (function () {
                  return function (a) {};
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "cut",
                (function () {
                  return function (a) {
                    w.onCutCopy(a, "cut");
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                this.textbox,
                "paste",
                (function () {
                  return function (a) {
                    w.onpaste(a);
                    a.preventDefault();
                  };
                })()
              ),
              com.efmase.js.utilities.toolset.isFirefox() &&
                com.efmase.js.utilities.toolset.addEventListener(
                  this.textbox,
                  "select",
                  (function () {
                    return function (a) {
                      w.onselectstart(a);
                      a.preventDefault();
                    };
                  })()
                ),
              this.resizeWindow(),
              this.resizeCanvas(this.getPresentationContext()),
              com.efmase.js.utilities.toolset.addEventListener(
                p,
                "scroll",
                (function () {
                  return function (a) {
                    a = org.imatheq.formulaeditor.FormulaEditor.getFirstEditor();
                    a.cursor && (a.cursor.autoScroll = !1);
                    return !1;
                  };
                })()
              ))
            : d.parentNode.insertBefore(e, d);
        }
        pasteCache = document.createElement("div");
        pasteCache.setAttribute("id", "efmase_paste_cache");
        pasteCache.setAttribute("contenteditable", "");
        pasteCache.style.cssText =
          "opacity:0;position:fixed;top:0px;left:0px;width:10px;margin-left:-20px;";
        document.body.appendChild(pasteCache);
        this.pasteCache = pasteCache;
        e = new MutationObserver(function (a) {
          var b = "";
          a.forEach(function (a) {
            if (
              !0 === w.pasteEvtSupport ||
              0 == w.ctrlPressed ||
              "childList" != a.type
            )
              return !0;
            1 == a.addedNodes.length && (b += a.addedNodes[0].textContent);
          });
          "" != b &&
            ((b = w.pasteCache.innerText),
            w.focus(),
            w.doonpaste(b, !1),
            setTimeout(function () {
              w.pasteCache.innerHTML = "";
            }, 20));
        });
        y = document.getElementById("efmase_paste_cache");
        e.observe(y, { attributes: !0, childList: !0, characterData: !0 });
        this.gifunc.gi0 = function () {
          return w.gi0();
        };
        e = document.createElement("div");
        e.setAttribute("id", "com_imatheq_loading_msg");
        e.innerHTML = "Loading, please wait...";
        document.body.appendChild(e);
        this.checkClass(d.className, "imatheqpalette")
          ? (this.showPalette = this.showPalette && !0)
          : this.checkClass(d.className, "imatheqnopalette")
          ? (this.showPalette = this.showPalette && !1)
          : (this.showPalette =
              "all" == org.imatheq.formulaeditor.options.paletteShow
                ? this.showPalette && !0
                : "none" == org.imatheq.formulaeditor.options.paletteShow
                ? this.showPalette && !1
                : this.showPalette && !b);
        this.showPalette =
          this.showPalette &&
          (this.checkClass(d.className, "imatheqpalette") ||
            (!this.checkClass(d.className, "imatheqnopalette") && !b));
        this.checkClass(d.className, "imatheqvisibletextarea") ||
          (d.style.display = "none");
        this.checkClass(d.className, "testplayermode") &&
          (this.testplayermode = !0);
        this.load();
        this.selection = new t(this);
        this.actions = new k(this);
        this.cursor = new f(
          this,
          this.presentation.getFollowingCursorPosition(
            this.getPresentationContext()
          )
        );
        this.showPalette && this.addPalette(this, m);
        this.gifunc.gi25536 = function () {
          return w.gi25536();
        };
        null === org.imatheq.formulaeditor.Palettes.defaultPalette
          ? ((d = window.location.href.split("/")),
            (e = $isItRight()),
            (y =
              e.substring(0, e.indexOf("/")) +
              "//www.imatheq.com/imatheq?token=12345&lang=" +
              m),
            "java" == this.system && (y = e + "imatheq?token=12345&lang=" + m),
            "net" == this.system &&
              (y = e + "com/imatheq/default.aspx?token=12345&lang=" + m),
            $.ajax({
              url: y,
              type: "get",
              dataType: "json",
              data: {
                action: "headataj",
                dm: d[2].replace(":", "_"),
                lsk: this.lskey,
              },
              mimeType: "application/json",
              success: function (a) {
                void 0 !== a.error
                  ? alert(a.error)
                  : ((w.lst = a.lstype), (w.pData = a), w.loadPaletteData(m));
              },
              error: function (a, b, d) {
                "" == a.responseText
                  ? alert(
                      "error: " +
                        a.responseText +
                        ", status: " +
                        b +
                        ", error:" +
                        d
                    )
                  : alert(a.responseText);
              },
            }))
          : this.loadPaletteData(m);
        a.push(this);
      }
    },
    loadPaletteData: function (a) {
      var b = this;
      if (null === this.palette.symbols) {
        var d = window.location.href.split("/"),
          e = $isItRight(),
          f =
            e.substring(0, e.indexOf("/")) +
            "//www.imatheq.com/imatheq?token=12345&lang=" +
            a;
        "java" == this.system && (f = e + "imatheq?token=12345&lang=" + a);
        "net" == this.system &&
          (f = e + "com/imatheq/default.aspx?token=12345&lang=" + a);
        $.ajax({
          url: f,
          type: "get",
          dataType: "json",
          data: {
            action: "paldataj",
            dm: d[2].replace(":", "_"),
            lsk: this.lskey,
          },
          mimeType: "application/json",
          success: function (d) {
            void 0 !== d.error
              ? alert(d.error)
              : ((b.palette.symbols = d), b.drawEditor(a));
          },
          error: function (a, b, d) {
            "" == a.responseText
              ? alert(
                  "error: " + a.responseText + ", status: " + b + ", error:" + d
                )
              : alert(a.responseText);
          },
        });
      } else this.drawEditor(a);
    },
    drawEditor: function (a) {
      this.palette.draw();
      this.palette.initPanels();
      this.redraw(!1);
    },
    PIXEL_RATIO: (function () {
      var a = document.createElement("canvas").getContext("2d");
      return (
        (window.devicePixelRatio || 1) /
        (a.webkitBackingStorePixelRatio ||
          a.mozBackingStorePixelRatio ||
          a.msBackingStorePixelRatio ||
          a.oBackingStorePixelRatio ||
          a.backingStorePixelRatio ||
          1)
      );
    })(),
    createHiDPICanvas: function (a, b, d) {
      d || (d = this.PIXEL_RATIO);
      var e = document.createElement("canvas");
      e.width = a * d;
      e.height = b * d;
      e.style.width = a + "px";
      e.style.height = b + "px";
      e.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
      return e;
    },
    setHiDPICanvasDims: function (a, b, d, e) {
      e || (e = this.PIXEL_RATIO);
      a.width = b * e;
      a.height = d * e;
      a.style.width = b + "px";
      a.style.height = d + "px";
      a.getContext("2d").setTransform(e, 0, 0, e, 0, 0);
    },
    load: function () {
      var a = org.imatheq.formulaeditor.presentation,
        b = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
        d = org.imatheq.formulaeditor.presentation.Editor,
        e = org.imatheq.formulaeditor.presentation.Row,
        f;
      try {
        var k = new b().parseString(this.inMathml);
        if (org.imatheq.formulaeditor.options.useBar)
          (f = this.palette ? !0 : !1),
            (this.presentation = new d(
              k.getPresentation(this.getPresentationContext()),
              f
            ));
        else {
          var n = new e(k),
            p = new a.Lines(n);
          this.presentation = new a.Row(p);
          this.presentation.flatten();
        }
      } catch (r) {
        org.imatheq.formulaeditor.options.useBar
          ? ((f = this.palette ? !0 : !1), (this.presentation = new d(null, f)))
          : ((p = new a.Lines(new a.Row(new a.BlockSymbol()))),
            (a = []),
            a.push(p),
            (e = new e()),
            e.initialize.apply(e, a),
            (this.presentation = e));
      }
    },
    loadMathML: function (a) {
      org.imatheq.formulaeditor.FormulaEditor.addDebug("loading MathML");
      var b = org.imatheq.formulaeditor.presentation.Editor,
        d = org.imatheq.formulaeditor.presentation.Row;
      a = new org.imatheq.formulaeditor.parsing.mathml.MathMLParser().parse(
        a,
        this.getPresentationContext()
      );
      org.imatheq.formulaeditor.FormulaEditor.addDebug("parsed: " + a);
      org.imatheq.formulaeditor.options.useBar
        ? ((d = this.palette ? !0 : !1), (this.presentation = new b(a, d)))
        : ((this.presentation = new d(a)), this.presentation.flatten());
    },
    insertLiteral: function (a, b) {
      var d = document.createTextNode(a);
      b.appendChild(d);
      return d;
    },
    save: function () {
      return { success: "".success, errorString: "".errorString };
    },
    redraw: function (a) {
      editor = this;
      this.redrawing = !0;
      this.cursor.hideCursor();
      var b = {};
      a = [];
      this.presentation.getFontSizeData(this, {}, b);
      for (var d in b)
        if (b.hasOwnProperty(d)) for (var e in b[d]) a.push(d + "_" + e);
      0 !== Object.keys(b).length && JSON.stringify(b) !== JSON.stringify({})
        ? ((d = window.location.href.split("/")),
          (e = $isItRight()),
          (b =
            e.substring(0, e.indexOf("/")) +
            "//www.imatheq.com/imatheq?token=12345&lang=" +
            this.lang),
          "java" == this.system &&
            (b = e + "imatheq?token=12345&lang=" + this.lang),
          "net" == this.system &&
            (b = e + "com/imatheq/default.aspx?token=12345&lang=" + this.lang),
          $.ajax({
            url: b,
            type: "get",
            dataType: "json",
            data: {
              action: "fondata",
              dm: d[2].replace(":", "_"),
              lsk: this.lskey,
              fsgroups: a.toString(),
            },
            contentType: "application/json",
            mimeType: "application/json",
            success: function (a) {
              for (var b in a)
                if (a.hasOwnProperty(b)) {
                  if ("error" == b) {
                    alert(a[b]);
                    return;
                  }
                  var d = b.substring(b.lastIndexOf("_") + 1);
                  org.imatheq.formulaeditor.MathCanvas.addFont(d, a[b]);
                }
              editor.redraw_func();
            },
            error: function (a, b, d) {
              "" == a.responseText
                ? alert(
                    "error: " +
                      a.responseText +
                      ", status: " +
                      b +
                      ", error:" +
                      d
                  )
                : alert(a.responseText);
            },
          }))
        : this.redraw_func();
    },
    redraw_func: function () {
      bb = function () {
        for (
          var a = document.getElementsByTagName("script"),
            b = /(.*)com\/imatheq\/scripts\/imatheqfunctions.js/,
            d = 0;
          d < a.length;
          d++
        ) {
          var e = a[d].src.match(b);
          if (null !== e)
            return (
              (a = /192.168.86.250/),
              (b = new RegExp(document.location.hostname)),
              e[1].match(/www.imatheq.com/) || e[1].match(a) || e[1].match(b)
                ? !0
                : !1
            );
        }
      };
      if (bb()) {
        this.canvas.clear();
        var a = this.selection.hasSelection;
        this.draw(a);
        a && this.selection.redraw();
        this.hasFocus() && !a && this.cursor.showCursor();
        this.initializing = this.redrawing = !1;
      }
    },
    setScroll: function (a) {
      var b = {},
        d = this.canvas.canvas.parentNode,
        e = this.getScrollBarWidth();
      (null !== a && void 0 !== a) || this.cursor.getDimensions(b);
      var b = Math.round((parseInt(d.style.width) - e) / 2),
        f = Math.round((parseInt(d.style.height) - e) / 2);
      if (
        a.x - d.scrollLeft > parseInt(d.style.width) - e - 8 ||
        20 > a.x - d.scrollLeft
      )
        d.scrollLeft = a.x > b ? a.x - b : 0;
      if (
        a.bottom - d.scrollTop > parseInt(d.style.height) - e - 8 ||
        8 > a.top - d.scrollTop
      )
        d.scrollTop = a.top > f ? a.top - f : 0;
    },
    draw: function (a) {
      var b,
        d = {};
      org.imatheq.formulaeditor.options.useBar
        ? (b = this.presentation.draw(this.canvas, d, 0, 0, !0))
        : ((b = this.presentation.draw(this.canvas, d, 0, 0, !0)),
          (b = {
            top: b.top - 8,
            left: b.left - 20,
            width: b.width + 28,
            height: b.height + 8,
          }));
      this.canvas.clear();
      (null !== a && void 0 !== a && a) || this.selection.clear();
      this.resizeCanvas(this.getPresentationContext(), b);
      this.presentation.draw(this.canvas, d, -b.left, -b.top);
    },
    gi25536: function () {
      var a;
      try {
        var b = this.canvas.canvas;
        b.toDataURL("image/png");
        var d = document.getElementById("com_imatheq_loading_msg");
        d.innerHTML = "Generating image, please wait...";
        d.style.display = "";
        this.canvas.readonly = !0;
        this.redraw();
        var e = document.createElement("canvas"),
          f = 2 * this.presentation.dimensions.width,
          k = 2 * this.presentation.dimensions.height;
        e.setAttribute("width", f / 2 + 20);
        e.setAttribute("height", k / 2 + 8);
        e.getContext("2d").drawImage(b, 40, 16, f, k, 2, 2, f / 2, k / 2);
        a = e.toDataURL("image/png");
        this.canvas.readonly = !1;
        this.redraw();
        d.innerHTML = "Loading, please wait...";
        d.style.display = "none";
      } catch (n) {}
      return a;
    },
    getPosition: function (a) {
      for (var b = this.presentation, d = a[0], e = a.length - 1; 0 < e; e--)
        b = b.children[a[e]];
      return { row: b, index: d };
    },
    onkeydown: function (a) {
      (17 != a.keyCode && !a.metaKey && !a.ctrlKey) ||
        this.ctrlPressed ||
        (this.ctrlPressed = !0);
      if (null !== this.palette.activePanel)
        return this.palette.activePanel.onkeydown(a);
      if (this.swMenuOn) {
        9 == a.keyCode &&
          ((this.smallWinItems = document.querySelectorAll(
            ".small_win_menu_item"
          )),
          0 == this.keyboardNaviSW
            ? document
                .getElementById("efmase_menubar_item_Close")
                .style.removeProperty("border")
            : this.smallWinItems[this.keyboardNaviSW - 1].style.removeProperty(
                "border"
              ),
          a.shiftKey
            ? --this.keyboardNaviSW
            : (this.keyboardNaviSW = ++this.keyboardNaviSW),
          0 > this.keyboardNaviSW &&
            (this.keyboardNaviSW = this.smallWinItems.length - 1),
          this.keyboardNaviSW > this.smallWinItems.length &&
            (this.keyboardNaviSW = 0),
          0 == this.keyboardNaviSW
            ? (document.getElementById(
                "efmase_menubar_item_Close"
              ).style.border = "2px solid #000000")
            : (this.smallWinItems[this.keyboardNaviSW - 1].style.border =
                "2px solid #000000"));
        if (13 == a.charCode || 13 == a.keyCode) this.onEnter(a);
        return !1;
      }
      if (9 == a.keyCode)
        return (
          console.log("b/4 this.keyboardNavi=" + this.keyboardNavi),
          this.clearKBNavi(),
          this.hasFocus() && 4 == this.keyboardNavi && this.blur(),
          a.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          0 >= this.keyboardNavi && (this.keyboardNavi = 5),
          6 <= this.keyboardNavi && (this.keyboardNavi = 1),
          this.palette.isSmallWin() &&
            2 == this.keyboardNavi &&
            (a.shiftKey ? --this.keyboardNavi : ++this.keyboardNavi),
          this.setKBNavi(a),
          console.log("after this.keyboardNavi=" + this.keyboardNavi),
          !1
        );
      if (this.hasFocus()) {
        if (this.ctrlPressed && !a.altKey)
          switch (a.keyCode) {
            case 67:
            case 88:
              return !0;
            case 86:
              if (
                void 0 != document.activeElement &&
                "text" == document.activeElement.type
              )
                return !1;
              1 == this.ctrlPressed &&
                null != this.pasteCache &&
                this.pasteCache.focus();
              return !0;
            case 90:
              return this.actions.undo(), !1;
            case 89:
              return this.actions.redo(), !1;
            case 65:
              return this.selection.selectAll(), !1;
            case 107:
              return this.changeFontsize(1), !1;
            case 109:
              return this.changeFontsize(-1), !1;
          }
        switch (a.keyCode) {
          case 116:
            a = org.imatheq.formulaeditor.Cursor;
            var b = this.save();
            b.success
              ? (this.load(),
                (this.cursor = new a(
                  this,
                  this.presentation.getFollowingCursorPosition(
                    this.getPresentationContext()
                  )
                )),
                this.focus(),
                this.redraw())
              : alert(
                  "The formula could not be interpreted correctly. The error message was:\n" +
                    b.errorString
                );
            return !1;
          case 8:
            return (
              this.selection.hasSelection
                ? this.selection.remove()
                : ((a = this.cursor.position),
                  0 < a.index
                    ? (a.row.updateKeyword(this, a.index),
                      a.row.updateKeyword(this, a.index - 1),
                      a.row.backDelete(this))
                    : null !== a.row.parent &&
                      void 0 !== a.row.parent &&
                      a.row.parent instanceof
                        org.imatheq.formulaeditor.presentation.Lines &&
                      0 < a.row.index &&
                      this.presentation.children[0].deleteNewline(
                        this,
                        a.row.index - 1
                      )),
              !1
            );
          case 46:
            return (
              this.selection.hasSelection
                ? this.selection.remove()
                : ((a = this.cursor.position),
                  a.index < a.row.children.length &&
                  !(
                    a.row.children[a.index] instanceof
                    org.imatheq.formulaeditor.presentation.NewlineSymbol
                  )
                    ? (a.row.updateKeyword(this, a.index + 1),
                      a.row.updateKeyword(this, a.index),
                      a.row.foreDelete(this))
                    : null !== a.row.parent &&
                      void 0 !== a.row.parent &&
                      a.row.children[a.index] instanceof
                        org.imatheq.formulaeditor.presentation.NewlineSymbol &&
                      a.row.index < a.row.parent.children.length - 1 &&
                      this.presentation.children[0].deleteNewline(
                        this,
                        a.row.index
                      )),
              !1
            );
        }
        return this.cursor.onkeydown(a);
      }
      if (4 != this.keyboardNavi)
        switch (a.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
      if (13 == a.charCode || 13 == a.keyCode) this.onEnter(a);
    },
    kbNaviMove: function (a) {
      switch (this.keyboardNavi) {
        case 1:
          var b = this.curMenuItem,
            d = this.menuItems[b],
            e = document.getElementById("efmase_menubar_item_" + d);
          do
            "left" == a ? b-- : "right" == a && b++,
              (d = this.menuItems[b]),
              (d = document.getElementById("efmase_menubar_item_" + d));
          while (
            0 <= b &&
            b <= this.menuItems.length &&
            null !== d &&
            this.checkClass(d.className, "efmase_palettebtn_disabled")
          );
          0 <= b &&
            b < this.menuItems.length &&
            null !== d &&
            !this.checkClass(d.className, "efmase_palettebtn_disabled") &&
            ((this.curMenuItem = b),
            e.style.removeProperty("border"),
            (d.style.border = "2px solid #000000"));
          break;
        case 2:
          e = b = this.paletteTabs.indexOf(this.palette.curtab);
          "left" == a && 0 < e
            ? e--
            : "right" == a && e < this.paletteTabs.length - 1 && e++;
          if (e == b) break;
          this.palette.handleTabBtnOverClick(this.paletteTabs[e]);
          break;
        case 3:
          if (null === this.curPaletteBtn) break;
          else {
            var f = this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS,
              k = f[this.curPaletteBtn.group].ROWS,
              n = k[this.curPaletteBtn.row].ITEMS,
              b = this.curPaletteBtn.tab,
              e = this.curPaletteBtn.group,
              d = this.curPaletteBtn.row,
              p = this.curPaletteBtn.col;
            if ("left" == a || "right" == a) {
              if (((p += "left" == a ? -1 : 1), 0 > p || p >= n.length)) {
                e += "left" == a ? -1 : 1;
                if (0 > e && 0 == d) break;
                e >= f.length
                  ? ((e = 0), d++)
                  : 0 > e && ((e = f.length - 1), d--);
                k = f[e].ROWS;
                for (
                  p = document.getElementById(f[e].id);
                  0 <= e &&
                  e < f.length &&
                  (d >= k.length || "none" == p.style.display);

                ) {
                  e += "left" == a ? -1 : 1;
                  if (("left" == a && 0 > e) || ("right" == a && e >= f.length))
                    return;
                  k = f[e].ROWS;
                  p = document.getElementById(f[e].id);
                }
                if (0 > e || e >= f.length) break;
                n = k[d].ITEMS;
                p = "left" == a ? n.length - 1 : 0;
              }
            } else {
              d += "up" == a ? -1 : 1;
              if (0 > d || d >= k.length) break;
              n = k[d].ITEMS;
              if (p >= n.length) break;
            }
            f = n[p];
            a = f.id;
            "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
              (a = this.palette.symbols[f.id].name);
            f = com.efmase.js.utilities.toolset;
            this.clearKBNavi();
            f.setObjsAttrb(a, "border", "2px solid #000000");
            this.curPaletteBtn = { tab: b, group: e, row: d, col: p };
          }
          break;
        case 5:
          if ("left" != a && "right" != a) break;
          b = document.getElementsByClassName("imatheq_save_buttons");
          0 == b.length && (b = document.getElementsByTagName("input"));
          curBtn = this.curBtnBarBtn;
          curBtn += "left" == a ? -1 : 1;
          0 <= curBtn &&
            curBtn < b.length &&
            (b[this.curBtnBarBtn].blur(),
            b[curBtn].focus(),
            (this.curBtnBarBtn = curBtn));
      }
    },
    onEnter: function (a) {
      if (this.swMenuOn) {
        var b;
        0 == this.keyboardNaviSW
          ? (document.getElementById("efmase_menubar_item_Close"),
            this.palette.efmase_menugrp_click("Close", a))
          : ((b = this.smallWinItems[this.keyboardNaviSW - 1]),
            (b = null !== b.name && void 0 !== b.name ? b.name : b.id),
            0 == b.indexOf("PALETTE_TAB_")
              ? this.palette.handleTabBtnOverClick(b)
              : 0 == b.indexOf("efmase_menubar_item_")
              ? this.palette.efmase_menugrp_click(b.substring(20), a)
              : 0 == b.indexOf("efmase_submenu_item_fontname_")
              ? this.palette.execPalCmd(
                  this.palette.symbols["108"],
                  "",
                  parseInt(b.substring(29))
                )
              : 0 == b.indexOf("efmase_submenu_item_fontsize_") &&
                this.palette.execPalCmd(
                  this.palette.symbols["109"],
                  "",
                  parseInt(b.substring(29))
                ));
        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        a.stopPropagation();
        a.preventDefault();
        return !1;
      }
      switch (this.keyboardNavi) {
        case 1:
          b = this.palette.isSmallWin()
            ? "Menu"
            : this.menuItems[this.curMenuItem];
          var d = document.getElementById("efmase_menubar_item_" + b);
          this.palette.isSmallWin()
            ? (d.style.background = "#E8EAEB")
            : d.style.removeProperty("border");
          this.clearKBNavi();
          this.keyboardNavi = 4;
          this.curMenuItem = 0;
          this.palette.efmase_menugrp_click(b, a);
          this.hasFocus() || this.focus();
          this.selection.hasSelection || this.cursor.showCursor();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
          a.preventDefault();
          break;
        case 3:
          return (
            (b = this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS[
              this.curPaletteBtn.group
            ].ROWS[this.curPaletteBtn.row].ITEMS[this.curPaletteBtn.col]),
            this.clearKBNavi(),
            (this.keyboardNavi = 4),
            this.palette.handlePaletteBtnOverClick(b.id, a.pageX, a.pageY),
            org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a),
            a.preventDefault(),
            !1
          );
      }
    },
    setKBNavi: function (a) {
      switch (this.keyboardNavi) {
        case 1:
          if (this.palette.isSmallWin())
            document.getElementById("efmase_menubar_item_Menu").style.border =
              "2px solid #000000";
          else
            for (a = 0; a < this.menuItems.length; a++) {
              var b = document.getElementById(
                "efmase_menubar_item_" + this.menuItems[a]
              );
              if (!this.checkClass(b.className, "efmase_palettebtn_disabled")) {
                b.style.border = "2px solid #000000";
                this.curMenuItem = a;
                break;
              }
            }
          break;
        case 3:
          a = this.paletteTabs.indexOf(this.palette.curtab);
          var d = this.pData.PALETTE[a].GROUPS,
            b = 0;
          if ("PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab) {
            for (var e = 0; e < d.length; e++)
              if (
                ((gDiv = document.getElementById(d[e].id)),
                "none" != gDiv.style.display)
              ) {
                b = e;
                break;
              }
            e >= d.length && ((b = -1), (this.curPaletteBtn = null));
          }
          -1 != b &&
            ((d = d[b].ROWS[0].ITEMS[0]),
            (e = d.id),
            "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
              (e = this.palette.symbols[d.id].name),
            com.efmase.js.utilities.toolset.setObjsAttrb(
              e,
              "border",
              "2px solid #000000"
            ),
            (this.curPaletteBtn = { tab: a, group: b, row: 0, col: 0 }));
          break;
        case 4:
          this.hasFocus() ||
            (this.focus(),
            this.selection.hasSelection || this.cursor.showCursor());
          break;
        case 5:
          (b = document.getElementsByClassName("imatheq_save_buttons")),
            0 == b.length && (b = document.getElementsByTagName("input")),
            0 < b.length && b[0].focus(),
            (this.curBtnBarBtn = 0),
            org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a),
            a.stopPropagation(),
            a.preventDefault(a);
      }
    },
    clearKBNavi: function () {
      switch (this.keyboardNavi) {
        case 1:
          this.palette.isSmallWin()
            ? document
                .getElementById("efmase_menubar_item_Menu")
                .style.removeProperty("border")
            : document
                .getElementById(
                  "efmase_menubar_item_" + this.menuItems[this.curMenuItem]
                )
                .style.removeProperty("border");
          this.curMenuItem = 0;
          break;
        case 3:
          if (null === this.curPaletteBtn) break;
          var a = this.pData.PALETTE[this.curPaletteBtn.tab].GROUPS[
              this.curPaletteBtn.group
            ].ROWS[this.curPaletteBtn.row].ITEMS[this.curPaletteBtn.col],
            b = a.id;
          "PALETTE_TAB_EDIT_BUTTONS" == this.palette.curtab &&
            (b = this.palette.symbols[a.id].name);
          com.efmase.js.utilities.toolset.setObjsAttrb(
            b,
            "border",
            null,
            "remove"
          );
          this.curPaletteBtn = null;
          break;
        case 5:
          (a = document.getElementsByClassName("imatheq_save_buttons")),
            0 == a.length && (a = document.getElementsByTagName("input")),
            0 < a.length && a[0].focus(),
            null !== a[this.curBtnBarBtn] &&
              void 0 != a[this.curBtnBarBtn] &&
              a[this.curBtnBarBtn].blur(),
            (this.curBtnBarBtn = 0);
      }
    },
    isSmallWinMenu: function () {
      return (
        document.getElementById("efmase_menubar_item_Close") &&
        "" == document.getElementById("efmase_menubar_item_Close").style.display
      );
    },
    onkeyup: function (a) {
      if (0 == a.ctrlKey && 1 == this.ctrlPressed) this.ctrlPressed = !1;
      else if (0 == a.metaKey && 1 == this.cmdPressed)
        this.ctrlPressed = this.cmdPressed = !1;
      else if (
        editor.isMobile &&
        229 == a.keyCode &&
        "efmase_focus_textarea" === a.target.className &&
        "" == a.target.value
      ) {
        if (this.selection.hasSelection) this.selection.remove();
        else {
          var b = this.cursor.position;
          0 < b.index
            ? (b.row.updateKeyword(this, b.index),
              b.row.updateKeyword(this, b.index - 1),
              b.row.backDelete(this))
            : null !== b.row.parent &&
              void 0 !== b.row.parent &&
              b.row.parent instanceof
                org.imatheq.formulaeditor.presentation.Lines &&
              0 < b.row.index &&
              this.presentation.children[0].deleteNewline(
                this,
                b.row.index - 1
              );
        }
        a.target.value = "$";
        a.target.innerHTML = "$";
        return !1;
      }
    },
    oncontextmenu: function (a) {
      if (this.selection.hasSelection) {
        if (
          com.efmase.js.utilities.toolset.isIE() ||
          com.efmase.js.utilities.toolset.isFirefox()
        )
          this.textboxSel = !0;
        this.textbox.select();
      }
      return !0;
    },
    onselectstart: function (a) {
      if (this.textboxSel) return (this.textboxSel = !1), !0;
      this.selection.selectAll();
    },
    changeFontsize: function (a) {
      a = this.canvas.getFontSizeIdx(a);
      for (i = 0; i < b.length; i++)
        b[i].execPalCmd(b[i].symbols["109"], "", a), b[i].editor.redraw();
      return !1;
    },
    setFontSizeIdx: function (b) {
      for (var d = 0; d < a.length; d++)
        a[d].canvas &&
          (a[d].canvas.setFontSizeIdx(b),
          a[d].canvas.clearBg(),
          a[d].redraw(!0));
      return !0;
    },
    setFontFamilyNameIdx: function (b) {
      for (var d = 0; d < a.length; d++)
        a[d].canvas && ((a[d].canvas.fontFamilyNameIdx = b), a[d].redraw());
      return !0;
    },
    initPress: function (a) {
      if (
        this.isMobile &&
        ((this.pressTimer = null), null === this.pressTimer)
      ) {
        var b = this;
        this.pressTimer = setTimeout(function () {
          b.onpress(a);
          b.cancelPress();
        }, 500);
      }
    },
    cancelPress: function () {
      null !== this.pressTimer &&
        (clearTimeout(this.pressTimer), (this.pressTimer = null));
    },
    mouseMoved: function (a, b) {
      var d = this.initPosition;
      return 4 < Math.sqrt((d.x - a) * (d.x - a) + (d.y - b) * (d.y - b));
    },
    onkeypress: function (a) {
      if (null !== this.palette.activePanel)
        return this.palette.activePanel.onkeypress(a);
      if (this.hasFocus()) {
        var b = !0;
        if (a.ctrlKey)
          switch (a.charCode) {
            case 43:
              this.changeFontsize(1);
              b = !1;
              $;
              break;
            case 45:
              this.changeFontsize(-1), (b = !1);
          }
        else if (13 == a.charCode || 13 == a.keyCode)
          return this.presentation.children[0].onNewline(this);
        b &&
          (b = this.selection.hasSelection
            ? this.selection.parent.onkeypress(a, this)
            : this.cursor.position.row.onkeypress(a, this));
        return b;
      }
    },
    mouseeventinfo: function (a) {
      var b = document.body.scrollTop + a.clientY,
        d = a.target || a.srcElement || a.relatedTarget;
      if ("efmase_focus_textarea" == d.className) {
        var b = a.clientX,
          d = a.clientY,
          e = window.pageXOffset,
          f = window.pageYOffset;
        if (null === e || void 0 === e)
          (f = document.documentElement),
            (f && f.scrollLeft) || (f = document.body),
            (e = f.scrollLeft),
            (f = f.scrollTop);
        a.imatheqnoadjust || ((b += e), (d += f));
        var f = this.canvas.canvas,
          k = (e = 0),
          n = f.offsetWidth,
          p = f.offsetHeight;
        parent = f.parentNode;
        if ("EFMASE_Container" == parent.className) {
          var r = getComputedStyle(parent, "");
          parseInt(r.paddingLeft);
          parseInt(r.paddingTop);
          parseInt(r.paddingRight);
          parseInt(r.paddingBottom);
        }
        var r =
            void 0 !== f.currentStyle && null !== f.currentStyle
              ? f.currentStyle
              : getComputedStyle(f, null),
          q,
          u;
        u = parseInt(r.borderLeftWidth);
        q = parseInt(r.paddingLeft);
        isFinite(q) && isFinite(u)
          ? (e = q > u ? e + q : e + u)
          : isFinite(q)
          ? (e += q)
          : isFinite(u) && (e += u);
        u = parseInt(r.borderTopWidth);
        q = parseInt(r.paddingTop);
        for (
          isFinite(q) && isFinite(u)
            ? (k = q > u ? k + q : k + u)
            : isFinite(q)
            ? (k += q)
            : isFinite(u) && (k += u);
          f;

        )
          (e += f.offsetLeft), (k += f.offsetTop), (f = f.offsetParent);
        for (f = this.canvas.canvas; f; )
          f.scrollLeft &&
            "div" == f.localName.toLowerCase() &&
            (e -= f.scrollLeft),
            f.scrollTop &&
              "div" == f.localName.toLowerCase() &&
              (k -= f.scrollTop),
            (f = f.parentNode);
        return !this.isMobile &&
          ((f = this.canvas.canvas.parentNode),
          a.offsetX >= f.clientWidth || a.offsetY >= f.clientHeight)
          ? { pos: "out", x: 0, y: 0 }
          : e <= b && b <= e + n && k <= d && d <= k + p
          ? { pos: "canvas", x: b - e, y: d - k }
          : { pos: "canvas", x: b < e ? 0 : n, y: d < k ? 0 : p };
      }
      if ("EFMASE_Container" == d.className)
        return { pos: "scroll", x: 0, y: 0 };
      a = 0;
      for (d = this.canvas.canvas.parentNode; d; )
        (a += d.offsetTop - d.scrollTop + d.clientTop), (d = d.offsetParent);
      return b <= a
        ? { pos: "palette", x: 0, y: 0 }
        : { pos: "out", x: 0, y: 0 };
    },
    onpress: function (a) {
      if (this.swMenuOn) return !0;
      a = this.mouseeventinfo(a);
      if ("canvas" == a.pos)
        this.selection.hasSelection && this.selection.clear(),
          (a = this.cursor.position),
          (a = this.selection.getSelection(
            { row: a.row, index: 0 },
            { row: a.row, index: a.row.children.length }
          )),
          null != a && this.selection.setSelection(a);
      else return "out" == a.pos && this.blur(), !0;
    },
    onmousedown: function (a) {
      var b = !0;
      this.palette.clearPanels();
      if (!this.swMenuOn) {
        var d = this.mouseeventinfo(a);
        "canvas" == d.pos
          ? (this.clearKBNavi(),
            (this.keyboardNavi = 4),
            0 == a.button &&
              ((this.mouseIsDown = !0),
              (this.initPosition = { x: a.clientX, y: a.clientY }),
              this.isMobile &&
                ((this.isDragging = this.onEndBar = this.onStartBar = this.onCursorBar = !1),
                this.selection.hasSelection
                  ? ((this.onStartBar = this.selection.isOnBar(
                      "start",
                      d.x,
                      d.y
                    )),
                    (this.onEndBar = this.selection.isOnBar("end", d.x, d.y)))
                  : this.hasFocus() &&
                    (this.onCursorBar = this.cursor.isOnBar(d.x, d.y)),
                this.onStartBar ||
                  this.onEndBar ||
                  this.onCursorBar ||
                  this.initPress(a)),
              document.selection
                ? document.selection.empty()
                : window.getSelection &&
                  window.getSelection().removeAllRanges()),
            this.hasFocus() ||
              (this.focus(),
              this.selection.hasSelection || this.cursor.showCursor(),
              com.efmase.js.utilities.toolset.isIE() || window.focus()),
            !this.isMobile &&
              com.efmase.js.utilities.toolset.isIE() &&
              a.preventDefault(),
            (b = this.cursor.onmousedown(a, d.x, d.y)))
          : "out" == d.pos &&
            (this.clearKBNavi(), (this.keyboardNavi = 0), this.blur());
      }
      return b;
    },
    onmousemove: function (a) {
      if (!this.mouseIsDown) return !0;
      var b = this.mouseeventinfo(a);
      if ("canvas" == b.pos) {
        if (
          this.isMobile &&
          (!this.isDragging &&
            this.mouseMoved(a.clientX, a.clientY) &&
            ((this.isDragging = !0),
            null !== this.pressTimer && this.cancelPress()),
          !this.isDragging)
        )
          return !1;
        var d = b.x,
          b = b.y,
          e = null,
          f = (e = null);
        if (this.isMobile) {
          if (this.onCursorBar || this.onStartBar || this.onEndBar)
            b -= 2 * com.efmase.js.utilities.toolset.barWidth;
          if (this.onCursorBar) return this.cursor.onmousedown(a, d, b);
          this.onStartBar
            ? ((e = this.selection.endPosition),
              (this.onStartBar = !1),
              (this.onEndBar = !0))
            : this.onEndBar && (e = this.selection.startPosition);
        } else e = this.selection.startPosition;
        if (
          (f = this.presentation.getCursorPosition(
            this.getPresentationContext(),
            d,
            b
          ))
        )
          (e = this.selection.getSelection(e, f)),
            null != e ? this.selection.setSelection(e) : this.selection.clear(),
            this.cursor.setPosition(f);
        this.isMobile || a.preventDefault();
      }
      return !0;
    },
    onmouseup: function (a) {
      this.isDragging = this.onEndBar = this.onStartBar = this.onCursorBar = this.mouseIsDown = !1;
      this.initPosition = null;
      this.isMobile && this.cancelPress();
      return !0;
    },
    oncopy: function (a) {
      if (!this.selection.hasSelection) return !0;
      window.clipboardData
        ? window.clipboardData.setData("text/plain", this.selection.getMathML())
        : a.clipboardData
        ? a.clipboardData.setData("text/plain", this.selection.getMathML())
        : alert("Clipboard Data are not supported in this browser. Sorry.");
      a.preventDefault();
    },
    onCutCopy: function (a, b) {
      if (!this.selection.hasSelection) return !0;
      this.hasFocus() || this.focus();
      var d = this.selection.getMathML();
      "cut" == b && this.selection.remove();
      if (document.body.createTextRange) {
        var e = document.createElement("div");
        e.style.opacity = 0;
        e.style.position = "absolute";
        e.style.pointerEvents = "none";
        e.style.zIndex = -1;
        document.body.appendChild(e);
        e.innerHTML = d
          .replace(/&/g, "&amp;")
          .replace(/>/g, "&gt;")
          .replace(/</g, "&lt;")
          .replace(/"/g, "&quot;");
        d = document.createRange();
        d.setStartBefore(e.firstChild);
        d.setEndAfter(e.lastChild);
        window.getSelection().addRange(d);
        try {
          document.execCommand("copy") ||
            console.log("execCommand returned false !");
        } catch (f) {
          console.log("execCommand failed ! exception " + f);
        }
        document.body.removeChild(e);
      } else if (window.clipboardData)
        window.clipboardData.setData("text/plain", d);
      else if (a.clipboardData) a.clipboardData.setData("text/plain", d);
      else {
        e = document.createElement("textarea");
        e.style.opacity = 0;
        e.style.position = "absolute";
        e.style.pointerEvents = "none";
        e.style.zIndex = -1;
        document.body.appendChild(e);
        e.value = d;
        e.select();
        try {
          document.execCommand("copy") ||
            console.log("execCommand returned false !");
        } catch (k) {
          console.log("execCommand failed ! exception " + k);
        }
      }
      a.preventDefault();
      this.focus();
    },
    clearMathML: function () {
      if (this.redrawing || this.initializing) {
        var a = this;
        setTimeout(function () {
          a.clearMathML();
        }, 1e3);
      } else
        try {
          this.selection.selectAll(),
            this.selection.remove(),
            this.actions.clear();
        } catch (b) {
          throw Error("Error in clearMathML()");
        }
    },
    doonpaste: function (a, b) {
      var d = org.imatheq.formulaeditor.presentation,
        e = this.selection,
        f = this.getButtonStatus(),
        k = null;
      e.hasSelection && (k = e.getSelectionCopy());
      this.cursor.hideCursor();
      var n = this.getExpressionParsingContext(),
        p = {
          row: this.cursor.position.row,
          index: this.cursor.position.index,
        },
        r = {
          row: this.cursor.position.row,
          index: this.cursor.position.index,
        },
        q =
          (e.hasSelection &&
            (e.parent instanceof d.PArray ||
              (!(e.parent instanceof d.Lines) &&
                !(e.parent.parent instanceof d.Lines)))) ||
          (!e.hasSelection &&
            !(this.cursor.position.row.parent instanceof d.Lines));
      a = a.replace(RegExp("<mi>\u21b5</mi>", "g"), "");
      a = a.replace(RegExp("opens*=s*['|\"]<['|\"]", "g"), "open='&lt;'");
      a = a.replace(RegExp("closes*=s*['|\"]>['|\"]", "g"), "close='&gt;'");
      a = a.replace(RegExp('mathcolor="null"', "g"), "");
      var u = this.getPresentationFromMathML(n, a, q, b);
      if (null === u && ((u = new d.Row(a)), null === u)) return !1;
      if (e.hasSelection && e.parent instanceof d.PArray) {
        f = e.copy();
        n = this.cursor.position.row.getIndexChain(this.cursor.position.index);
        q = "update";
        k = e.parent;
        r.row = k;
        if (e.endIndex < e.startIndex)
          throw new error(
            "onpaste: PArray selection.endIndex<selection.startIndex"
          );
        var v = k.deleteValues(e.startIndex, e.endIndex - 1);
        r.index = e.startIndex;
        var y = k.children.length - e.endIndex;
        k.updateValues(u, e.startIndex, e.endIndex - 1);
        p = k.children[e.endIndex - 1].getLastCursorPosition(
          this.getPresentationContext()
        );
        e.clear();
        u = p.row.getIndexChain(p.index);
        this.actions.addAction(q, r, n, u, v, null, y, f);
      } else {
        var n = this.cursor.position.row.getIndexChain(
            this.cursor.position.index
          ),
          q = "insert",
          v = null,
          w = this.cursor.position.row,
          y =
            this.cursor.position.row.children.length -
            this.cursor.position.index;
        e.hasSelection &&
          ((q = "update"),
          (r.row = e.parent),
          e.removeEndNewline(),
          e.parent instanceof d.Row
            ? ((p = { row: e.parent, index: e.startIndex }),
              (y = e.parent.children.length - e.endIndex))
            : ((v = e.parent.getGrandChild(e.startIndex)),
              (p = { row: v.parent, index: v.index }),
              (y = e.parent.getNumGrandChildren() - e.endIndex)),
          (v = e.parent.remove(e.startIndex, e.endIndex)),
          (r.index = e.startIndex),
          (w = p.row));
        u instanceof d.PArray && (u = new d.Row(u));
        1 == w.children.length &&
          w.children[0] instanceof d.BlockSymbol &&
          ((q = "update"),
          (v = w.remove(0, 1)),
          (y = 0),
          1 == p.index && (p.index = 0));
        if (u instanceof d.Row) {
          if (u.children)
            for (var z = 0; z < u.children.length; z++)
              (d = w.insert(p.index, u.children[z], 0 === z)) && p.index++;
          w.flatten();
          u = p.row.getIndexChain(p.index);
        } else
          (r = w.parent.getGrandChildIndex(
            w.index,
            this.cursor.position.index
          )),
            (y = w.parent.getNumGrandChildren() - r),
            (p = r + u.getNumGrandChildren()),
            w.parent.insert(r, u),
            (p = w.parent.getGrandChild(p)),
            (u = p.parent.getIndexChain(p.index)),
            (p = { row: p.parent, index: p.index }),
            (r = { row: w.parent, index: r });
        e.clear();
        this.actions.addAction(q, r, n, u, v, null, y, k, null, f);
      }
      this.cursor.setPosition(p);
      this.redraw();
      return !1;
    },
    onpaste: function (a) {
      var b = "";
      if (!this.hasFocus()) return !0;
      this.pasteEvtSupport = !1;
      null !== this.pasteCache && (this.pasteCache.innerHTML = "");
      window.clipboardData
        ? (b = window.clipboardData.getData("Text"))
        : a.clipboardData && (b = a.clipboardData.getData("Text"));
      "" != b && (this.doonpaste(b, !1), a.preventDefault());
    },
    onresize: function (a) {
      if (!this.isMobile) {
        clearTimeout(this.resizeTimer);
        var b = this;
        this.resizeTimer = setTimeout(function () {
          b.resizeWindow();
          b.redraw();
        }, 250);
      }
    },
    getScrollBarWidth: function () {
      var a = document.createElement("p");
      a.style.width = "100%";
      a.style.height = "200px";
      var b = document.createElement("div");
      b.style.position = "absolute";
      b.style.top = "0px";
      b.style.left = "0px";
      b.style.visibility = "hidden";
      b.style.width = "200px";
      b.style.height = "150px";
      b.style.overflow = "hidden";
      b.appendChild(a);
      document.body.appendChild(b);
      var d = a.offsetWidth;
      b.style.overflow = "scroll";
      a = a.offsetWidth;
      d == a && (a = b.clientWidth);
      document.body.removeChild(b);
      return d - a;
    },
    resizeWindow: function () {
      var a = window.innerWidth;
      this.isMobile || null === this.width || (a = this.width);
      var b = window.innerHeight;
      this.isMobile || null === this.height || (b = this.height + 21);
      for (
        var d = document.querySelectorAll(".efmase_palette"), e = 0;
        e < d.length;
        e++
      )
        d[e].style.width = parseInt(a) - 18 + "px";
      a = parseInt(a) - 28;
      b = parseInt(b) - 290;
      this.isMobile && (b = 120);
      d = this.canvas.canvas.parentNode;
      d.style.width = a + 22 + "px";
      d.style.height = b + 22 + "px";
      this.textbox.style.width = a + "px";
      this.textbox.style.height = b + "px";
      this.isMobile && (this.textbox.style.height = b + 22 + "px");
      this.textbox.style.marginTop = -b - 28 + "px";
      null === this.palette || this.isMobile || this.palette.redrawMenuTabBar();
    },
    resizeCanvas: function (a, b) {
      var d = this.canvas.canvas,
        e = this.canvas.bgCanvas,
        f = window.innerWidth;
      this.isMobile || null === this.width || (f = this.width);
      var k = window.innerHeight;
      this.isMobile || null === this.height || (k = this.height + 21);
      yScrollbarWidth = xScrollbarWidth = this.getScrollBarWidth();
      var n = parseInt(f) - 6 - xScrollbarWidth - 12,
        p = parseInt(k) - 290 - xScrollbarWidth;
      this.isMobile && (p = 140);
      var f = n,
        k = p,
        r = 0,
        r = 0;
      null !== b &&
        void 0 !== b &&
        b.width >= n &&
        ((r = Math.round(n / 2)), (f = Math.round(b.width / r + 0.5) * r));
      null !== b &&
        void 0 !== b &&
        b.height >= p &&
        ((r = Math.round(p / 2)),
        (k = Math.round(b.height / r + 0.5) * r),
        this.isMobile &&
          (k =
            Math.round(
              (b.height + 3 * com.efmase.js.utilities.toolset.barWidth) / r +
                0.5
            ) * r));
      null === b ||
        void 0 === b ||
        (f == parseInt(d.style.width) && k == parseInt(d.style.height)) ||
        (d.setAttribute("width", 2 * f),
        d.setAttribute("height", 2 * k),
        e.setAttribute("width", 2 * f),
        e.setAttribute("height", 2 * k),
        (d.style.width = f + "px"),
        (d.style.height = k + "px"),
        (d.style.marginTop = -k - 4 + "px"),
        (e.style.width = f + "px"),
        (e.style.height = k + "px"),
        d.getContext("2d").scale(2, 2),
        e.getContext("2d").scale(2, 2));
      var q = this;
      this.resizeTimer = setTimeout(function () {
        q.textbox.style.width = n + 2 + "px";
        q.textbox.style.height = p + 22 + "px";
        q.isMobile && (q.textbox.style.height = p + "px");
      }, 250);
    },
    getPresentationFromMathML: function (a, b, d, e) {
      if ("" == b) return null;
      var f = org.imatheq.formulaeditor.presentation,
        k = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
        n = {},
        p;
      for (p in a) n[p] = a[p];
      try {
        var r = new k().parseString(b, n, d);
        return 1 == r.children.length &&
          1 == r.children[0].children.length &&
          r.children[0].children[0] instanceof f.PArray &&
          e
          ? r.children[0].children[0]
          : r;
      } catch (q) {
        try {
          return (
            (newmathml =
              "<math><mi>" +
              b
                .replace(/&/g, "&amp;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/"/g, "&quot;") +
              "</mi></math>"),
            (r = new k().parseString(newmathml, n, d)),
            1 == r.children.length &&
            1 == r.children[0].children.length &&
            r.children[0].children[0] instanceof f.PArray &&
            e
              ? r.children[0].children[0]
              : r
          );
        } catch (u) {
          return new f.Row(b.trim());
        }
      }
    },
    focus: function () {
      this.textbox.focus();
      var a = this.cursor.position;
      1 == a.row.children.length &&
        a.row.children[0] instanceof
          org.imatheq.formulaeditor.presentation.BlockSymbol &&
        (a.index = 0);
    },
    blur: function () {
      this.hasFocus() &&
        (org.imatheq.formulaeditor.FormulaEditor.lastFocused = this);
      this.cursor.hideCursor();
      this.textbox.blur();
    },
    getFontFamilyNameIdx: function () {
      return this.canvas.fontFamilyNameIdx;
    },
    getMathML: function () {
      var a;
      try {
        a =
          '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
          this.presentation.getMathML() +
          "</math>";
      } catch (b) {
        a =
          '<math xmlns="http://www.w3.org/1998/Math/MathML"><mtext>' +
          b.toString() +
          "</mtext></math>";
      }
      return a;
    },
    setMathML: function (a) {
      if (null !== a && void 0 !== a && "" != a)
        if (this.redrawing || this.initializing) {
          var b = this;
          setTimeout(function () {
            b.setMathML(a);
          }, 1e3);
        } else
          try {
            this.selection.selectAll(),
              this.focus(),
              this.doonpaste(a, !1),
              this.actions.clear();
          } catch (d) {
            throw Error("Error in setMathML()");
          }
    },
    getImage: function () {
      return this.gifunc["gi" + this.lst]();
    },
    indentXML: function (a) {
      var b = [],
        d,
        e,
        f = 0,
        k,
        n = function () {
          var a;
          0 < b.length && b.push("\n");
          for (a = f; 0 < a; a--) b.push("  ");
        };
      for (d = 0; 0 <= (e = a.indexOf("<", d)); ) {
        e > d && (!0 === k && n(), b.push(a.substr(d, e - d)), (d = e));
        e++;
        c = a.charAt(e);
        switch (c) {
          case "/":
            --f;
            0 > f && (f = 0);
            !0 === k && n();
            e = a.indexOf(">", e);
            if (0 > e) return b.join("") + a.substr(d);
            e += 1;
            k = !0;
            break;
          case "!":
            e++;
            c = a.charAt(e);
            switch (c) {
              case "[":
                k = !0;
                e = a.indexOf("]]\x3e", e);
                if (0 > e) return b.join("") + a.substr(d);
                e += 3;
                n();
                break;
              case "-":
                k = !0;
                e = a.indexOf("--\x3e", e);
                if (0 > e) return b.join("") + a.substr(d);
                e += 3;
                n();
                break;
              default:
                return b.join("") + a.substr(d);
            }
            break;
          default:
            e = a.indexOf(">", e);
            if (0 > e) return b.join("") + a.substr(d);
            n();
            "/" != a.charAt(e - 1) ? ((k = !1), (f += 1)) : (k = !0);
            e += 1;
        }
        b.push(a.substr(d, e - d));
        d = e;
      }
      d < a.length && b.push(a.substr(d));
      return b.join("");
    },
    gi0: function () {
      var a;
      try {
        var b = this.canvas.canvas;
        b.toDataURL("image/png");
        var d = document.getElementById("com_imatheq_loading_msg");
        d.innerHTML = "Generating image, please wait...";
        d.style.display = "";
        this.canvas.readonly = !0;
        this.redraw();
        var e = document.createElement("canvas"),
          f = 2 * this.presentation.dimensions.width,
          k = 2 * this.presentation.dimensions.height;
        e.setAttribute("width", f / 2 + 20);
        e.setAttribute("height", k / 2 + 8);
        e.getContext("2d").drawImage(b, 40, 16, f, k, 2, 2, f / 2, k / 2);
        e.toDataURL("image/png");
        e.toDataURL("image/png");
        this.canvas.readonly = !1;
        this.redraw();
        var n = document.createElement("canvas"),
          p = n.getContext("2d"),
          r,
          q;
        r = n.width = e.width;
        q = n.height = e.height;
        p.drawImage(e, 0, 0);
        n.toDataURL("image/png");
        lineW = 40 < r ? 20 : r / 2;
        b = lineW / 2;
        p.beginPath();
        p.globalAlpha = 0.5;
        p.lineWidth = lineW;
        for (p.strokeStyle = "#97F1EC"; b < r + q - lineW / 2; )
          b < q
            ? (p.moveTo(b, 0), p.lineTo(0, b))
            : (b < r ? p.moveTo(b, 0) : p.moveTo(r, b - r), p.lineTo(b - q, q)),
            (b += 2 * lineW);
        p.stroke();
        a = n.toDataURL("image/png");
        d.innerHTML = "Loading, please wait...";
        d.style.display = "none";
      } catch (u) {}
      return a;
    },
    getExpressionParsingContext: function () {
      return org.imatheq.formulaeditor.parsing.expression.ExpressionContextParser.getContext();
    },
    getPresentationContext: function () {
      Options = new org.imatheq.formulaeditor.Options();
      return Options.getPresentationContext();
    },
  });
  org.imatheq.formulaeditor.FormulaEditor.addDebug = function (a) {
    void 0 !== d && null !== d && d.addDebug(a);
    return d;
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanup = function () {
    this.cleanupEditors();
    this.cleanupCanvases();
    this.cleanupTextareas();
    this.cleanupGroup();
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupCanvases = function () {
    var a = document.getElementsByTagName("canvas");
    for (i = 0; i < a.length; i++) {
      var b = a[i];
      (classattribute = b.getAttribute("class")) ||
        (classattribute = b.getAttribute("className"));
      classattribute &&
        classattribute.match(/(^| )imatheqformula($| )/) &&
        (this.getEditorByCanvas(b) || b.parentNode.removeChild(b));
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupEditors = function () {
    for (var b = a.length; 0 < b; b--) {
      var d = a[b - 1].canvas.canvas,
        e = a[b - 1].textarea;
      (d && e) ||
        (d && d.parentNode && d.parentNode.removeChild(d),
        e && e.parentNode && e.parentNode.removeChild(e),
        delete a[b - 1],
        a.splice(b - 1, 1));
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupGroup = function () {
    var b,
      d = !0;
    for (b = 0; b < a.length; b++) {
      var e = a[b].canvas.canvas,
        f = a[b].textarea;
      e && e.parentNode && f && f.parentNode
        ? (e.nextSibling && e.nextSibling == f) ||
          ((f = f.cloneNode(!0)),
          e.nextSibling
            ? e.parentNode.insertBefore(f, e.nextSibling)
            : e.parentNode.appendChild(f),
          (a[b].textarea = f),
          textarea.parentNode.removeChild(textarea))
        : (d = !1);
    }
    return d;
  };
  org.imatheq.formulaeditor.FormulaEditor.cleanupTextareas = function () {
    var a = document.getElementsByTagName("textarea");
    for (i = 0; i < a.length; i++) {
      var b = a[i];
      (classattribute = b.getAttribute("class")) ||
        (classattribute = b.getAttribute("className"));
      if (classattribute && classattribute.match(/(^| )imatheqformula($| )/)) {
        var d = this.getEditorByTextArea(b);
        d ? (b.innerHTML = d.textarea.value) : b.parentNode.removeChild(b);
      }
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.deleteEditor = function (b) {
    var d;
    if ("number" == typeof b) {
      if (((d = b), 0 > d || d >= a.length)) return !1;
    } else if (b instanceof org.imatheq.formuleditor.FormulaEditor) {
      for (d = 0; d < a.length && a[d] != b; ) d++;
      if (d == a.length) return !1;
    } else return !1;
    b = a[d].canvas.canvas;
    var e = a[d].textarea;
    b && b.parentNode && b.parentNode.removeChild(b);
    e && e.parentNode && e.parentNode.removeChild(e);
    delete a[d];
    a.splice(d, 1);
    return !0;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditorByCanvas = function (b) {
    var d;
    if (void 0 === b || null === b) return null;
    if ("string" == typeof b)
      for (d = 0; d < a.length; d++) {
        if (b == a[d].canvas.id) return a[d];
      }
    else if (b instanceof HTMLElement)
      for (d = 0; d < a.length; d++) if (a[d].canvas.canvas == b) return a[d];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea = function (b) {
    var d;
    if (void 0 === b || null === b) return null;
    if ("string" == typeof b)
      for (d = 0; d < a.length; d++) {
        if (b == a[d].textarea.id) return a[d];
      }
    else if (b instanceof HTMLElement)
      for (d = 0; d < a.length; d++) if (a[d].textarea == b) return a[d];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor = function () {
    for (var b = 0; b < a.length; b++) if (a[b].hasFocus()) return a[b];
    return null;
  };
  org.imatheq.formulaeditor.FormulaEditor.getFirstEditor = function () {
    return a[0];
  };
  org.imatheq.formulaeditor.FormulaEditor.lastFocused = null;
  org.imatheq.formulaeditor.FormulaEditor.getLastFocusedEditor = function () {
    var a = org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor();
    return null !== a ? a : org.imatheq.formulaeditor.FormulaEditor.lastFocused;
  };
  org.imatheq.formulaeditor.FormulaEditor.getEditor = function () {
    var a = org.imatheq.formulaeditor.FormulaEditor.getFocusedEditor();
    null === a &&
      (a = org.imatheq.formulaeditor.FormulaEditor.getFirstEditor());
    return a;
  };
  org.imatheq.formulaeditor.FormulaEditor.updateByTextAreas = function (b) {
    var d = document.getElementsByTagName("div"),
      e;
    if (b) {
      for (b = 0; b < a.length; ) {
        for (e = 0; e < d.length && a[b].textarea != d[e]; ) e++;
        e == d.length ? this.deleteEditor(b) : (b += 1);
      }
      this.cleanupCanvases();
    }
    for (b = 0; b < d.length; b++) {
      var f = d[b];
      (e = f.getAttribute("class")) || (e = f.getAttribute("className"));
      e &&
        e.match(/(^| )imatheqformula($| )/) &&
        new org.imatheq.formulaeditor.FormulaEditor(f);
    }
  };
  org.imatheq.formulaeditor.FormulaEditor.addEventListener = function (
    a,
    b,
    d
  ) {
    a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener(b, d, !1);
  };
  org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation = function (a) {
    a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
  };
  org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault = function (a) {
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  };
  org.imatheq.formulaeditor.Palette = $extend(
    org.imatheq.formulaeditor.FormulaEditor,
    {
      container: null,
      menubar: null,
      palette: null,
      editor: null,
      curtab: "PALETTE_TAB_BASIC",
      symbols: null,
      smallwindow: null,
      matrixPanel: null,
      bracketPanel: null,
      colorPanel: null,
      sizePanel: null,
      fontsizePanel: null,
      fontnamePanel: null,
      description: null,
      curBtnId: null,
      activePanel: null,
      isSmallWin: function () {
        return null !== this.smallwindow && this.smallwindow;
      },
      htmlelement: null,
      initialize: function (a, d, e) {
        if (!a) return null;
        this.container = a;
        this.editor = d;
        this.symbols = null;
        org.imatheq.formulaeditor.options.paletteURL
          ? ((a = org.imatheq.formulaeditor.options.paletteURL),
            org.imatheq.formulaeditor.Palette.description ||
              ((org.imatheq.formulaeditor.Palette.description = "loading"),
              com.efmase.js.utilities.XMLHttp.getText(a, function (a) {
                org.imatheq.formulaeditor.Palette.description = a;
                for (a = 0; a < b.length; a++)
                  b[a].loadPalette(
                    org.imatheq.formulaeditor.Palette.description
                  ),
                    b[a].draw();
              })),
            (d.palette = this))
          : (org.imatheq.formulaeditor.Palette.description =
              org.imatheq.formulaeditor.Palettes.defaultPalette);
      },
      initPanels: function () {
        this.matrixPanel = new org.imatheq.formulaeditor.presentation.MatrixPanel(
          this
        );
        this.bracketPanel = new org.imatheq.formulaeditor.presentation.BracketPanel(
          this
        );
        this.sizePanel = new org.imatheq.formulaeditor.presentation.SizePanel(
          this,
          "0px 1px 2px 3px 4px 5px 6px 7px 8px 9px 10px 12px 15px 20px 25px 30px 35px 40px".split(
            " "
          )
        );
        this.fontsizePanel = new org.imatheq.formulaeditor.presentation.SizePanel(
          this,
          [8, 9, 10, 11, 12, 15, 18, 24, 30, 36, 48, 60, 72, 96]
        );
        for (
          var a = this.editor.palette.symbols["108"].ITEMS, b = [], d = 0;
          d < a.length;
          d++
        )
          b.push(this.editor.pData.TITLES[a[d]]);
        this.fontnamePanel = new org.imatheq.formulaeditor.presentation.SizePanel(
          this,
          b,
          1
        );
        this.colorPanel = new org.imatheq.formulaeditor.presentation.ColorPanel(
          this
        );
      },
      loadPalette: function (a, b) {
        var d = new org.imatheq.formulaeditor.parsing.xml.XMLParser(),
          e;
        e = d.loadXml(a).documentElement;
        d.removeComments(e);
        d.removeWhitespace(e);
        this.menubar = e.childNodes.item(0);
        this.palette = e.childNodes.item(1);
      },
      efmase_menugrp_timeout: 500,
      efmase_menugrp_closetimer: 0,
      efmase_menugrp_ddmenugrp: 0,
      efmase_menugrp_cancelclosetime: function () {
        this.efmase_menugrp_closetimer &&
          (window.clearTimeout(this.efmase_menugrp_closetimer),
          (this.efmase_menugrp_closetimer = null));
      },
      efmase_menugrp_click: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation;
        this.clearPanels();
        this.efmase_menugrp_cancelclosetime();
        this.efmase_menugrp_ddmenugrp &&
          (this.efmase_menugrp_ddmenugrp.style.visibility = "hidden");
        var e = document.getElementById("efmase_menubar_item_" + a);
        if (null !== e && void 0 !== e) {
          var f = this.editor,
            k = e.getAttribute("name");
          switch (k) {
            case "efmase_menubar_item_undo":
              f.actions.undo();
              break;
            case "efmase_menubar_item_redo":
              f.actions.redo();
              break;
            case "efmase_menubar_item_bold":
              f.hasFocus() || f.focus();
              k = { bold: !f.isBold() };
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(k)
                : ((e =
                    f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(k));
              f.setButtonStatus(k);
              break;
            case "efmase_menubar_item_italic":
              f.hasFocus() || f.focus();
              e = !f.isForcedItalic();
              k = { forcedItalic: e };
              e && f.isAutoItalic() && (k.autoItalic = !1);
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(k)
                : (f.hasFocus() || f.focus(),
                  (e = f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(k));
              f.setButtonStatus(k);
              break;
            case "efmase_menubar_item_autoitalic":
              f.hasFocus() || f.focus();
              e = !f.isAutoItalic();
              k = { autoItalic: e };
              e && f.isForcedItalic() && (k.forcedItalic = !1);
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(k)
                : (f.hasFocus() || f.focus(),
                  (e = f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(k));
              f.setButtonStatus(k);
              break;
            case "efmase_menubar_item_mathcolor":
              f.hasFocus() || f.focus();
              this.colorPanel.show(b.pageX, b.pageY);
              break;
            case "efmase_menubar_item_mtext":
              f.hasFocus() || f.focus();
              k = { mtext: !f.isMtext() };
              f.selection.hasSelection
                ? f.selection.setSelSymbFontAttrbs(k)
                : (f.hasFocus() || f.focus(),
                  (e = f.cursor.position.row.children[f.cursor.position.index]),
                  e instanceof d.BlockSymbol && e.setSymbFontAttrbs(k));
              f.setButtonStatus(k);
              break;
            case "fontname":
            case "fontsize":
              f = e.getAttribute("btn_id");
              "fontname" == k
                ? ((d = this.editor.getFontFamilyNameIdx()),
                  this.fontnamePanel.show(f, b.pageX, b.pageY, d))
                : ((d = this.editor.canvas.getFontSizeIdx()),
                  this.fontsizePanel.show(f, b.pageX, b.pageY, d));
              break;
            case "efmase_menubar_item_Menu":
            case "efmase_menubar_item_Close":
              (d = com.efmase.js.utilities.toolset),
                (k = document.getElementById("efmase_sw_menutab_div")),
                (this.editor.smallWinItems = document.querySelectorAll(
                  ".small_win_menu_item"
                )),
                "none" == k.style.display
                  ? (f.hasFocus() && f.blur(),
                    (this.editor.swMenuOn = !0),
                    (this.editor.keyboardNaviSW = 0),
                    (k.style.display = ""),
                    d.setObjsAttrb(
                      this.curtab,
                      "class",
                      "efmase_palettebutton_focus"
                    ),
                    (document.getElementById(
                      "efmase_menubar_item_Menu"
                    ).style.display = "none"),
                    (document.getElementById(
                      "efmase_menubar_item_Close"
                    ).style.display = ""))
                  : ((k.style.display = "none"),
                    (this.editor.swMenuOn = !1),
                    0 == this.editor.keyboardNaviSW
                      ? document
                          .getElementById("efmase_menubar_item_Close")
                          .style.removeProperty("border")
                      : this.editor.smallWinItems[
                          this.editor.keyboardNaviSW - 1
                        ].style.removeProperty("border"),
                    (document.getElementById(
                      "efmase_menubar_item_Menu"
                    ).style.display = ""),
                    (document.getElementById(
                      "efmase_menubar_item_Close"
                    ).style.display = "none"),
                    (this.editor.keyboardNavi = 4),
                    f.redraw(),
                    f.focus(),
                    f.selection.hasSelection || f.cursor.showCursor());
          }
        }
      },
      efmase_menugrp_close: function () {
        this.efmase_menugrp_ddmenugrp &&
          (this.efmase_menugrp_ddmenugrp.style.visibility = "hidden");
      },
      efmase_menugrp_closetime: function () {
        var a = this;
        this.efmase_menugrp_closetimer = window.setTimeout(function () {
          a.efmase_menugrp_close();
        }, this.efmase_menugrp_timeout);
      },
      efmase_submenuitem_select: function (a, b) {
        var d = document.getElementById(b),
          e = document.getElementById(a),
          f = d.getAttribute("cld_id"),
          f = document.getElementById(f);
        null != f && void 0 != f && (f.className = "");
        f = d.getAttribute("name");
        d.setAttribute("cld_id", a);
        if (this.isSmallWin())
          e.className = "efmase_mobile_font_n_size_focused";
        else {
          if ("fontsize" == f || "fontname" == f)
            d.innerHTML = e.innerHTML.slice(0, 11);
          this.efmase_menugrp_close();
        }
        d = org.imatheq.formulaeditor.FormulaEditor.getEditor();
        if ("Edit" == f)
          switch (document.getElementById(a).innerHTML) {
            case "Undo":
              d.actions.undo();
              break;
            case "Redo":
              d.actions.redo();
              break;
            case "Cut":
              d.selection.hasSelection && d.selection.remove();
              break;
            case "Copy":
              d.selection.hasSelection && d.selection.copy();
              break;
            case "Test":
              d.onTest();
          }
        else
          "fontsize" == f
            ? ((e = parseInt(a.substring(a.lastIndexOf("_") + 1, a.length))),
              d.setFontSizeIdx(e))
            : "fontname" == f &&
              ((fontnameIdx = parseInt(
                a.substring(a.lastIndexOf("_") + 1, a.length)
              )),
              d.setFontFamilyNameIdx(fontnameIdx));
      },
      clearMenuTabBar: function () {
        var a = document.getElementById("efmase_menubar");
        null !== a && ((a = a.parentNode), a.parentNode.removeChild(a));
        a = document.getElementById("efmase_header");
        null !== a && ((a = a.parentNode), a.parentNode.removeChild(a));
        oSWMenuTabBar = document.getElementById("efmase_sw_menutab_div");
        null !== oSWMenuTabBar &&
          oSWMenuTabBar.parentNode.removeChild(oSWMenuTabBar);
        this.smallwindow = null;
      },
      drawMenuTabBar: function (a) {
        var b = a;
        if (null === a || void 0 === a)
          b = com.efmase.js.utilities.toolset.isSmallWin();
        this.smallwindow = b;
        a = document.createElement("div");
        this.container.insertBefore(a, this.container.firstChild);
        var d = document.createElement("ul");
        d.setAttribute("id", "efmase_menubar");
        a.appendChild(d);
        var e = this.editor.pData.MENUBAR;
        a = this.editor.pData.TITLES;
        var f = new org.imatheq.formulaeditor.Options();
        this.editor.menuItems = [];
        for (var k = 0; k < e.length; k++) {
          var n = e[k].id,
            p = this.symbols[n];
          0 < k && this.editor.menuItems.push(p.name);
          if (
            !((b && 0 < k && k < e.length - 2) || (!b && k >= e.length - 2))
          ) {
            if (1 == k) {
              var r = document.createElement("li");
              r.className = p["class"];
              r.style["float"] = "left";
              d.appendChild(r);
              var q = document.createElement("span");
              r.appendChild(q);
              q.innerHTML = "&nbsp;";
            }
            var u = document.createElement("li");
            u.className = p["class"];
            u.style["float"] = "left";
            k >= e.length - 2 && (u.style["float"] = "right");
            d.appendChild(u);
            0 == k &&
              ((u.style.height = "37px"),
              (u.style.marginTop = "-3px"),
              (u.style.marginLeft = "-2px"),
              (u.style.marginBottom = "0"),
              (u.style.marginRight = "-2px"),
              (u.style.padding = "0"));
            if ("efmase_menugrp_drop" != p["class"])
              (q = document.createElement("button")),
                (q.title = a[n]),
                (q.name = "efmase_menubar_item_" + p.name),
                "undo" == p.name || "redo" == p.name
                  ? (q.className =
                      "efmase_palettebutton efmase_palettebtn_disabled")
                  : "autoitalic" == p.name
                  ? f.getOption("defAutoItalic")
                    ? (q.className =
                        "efmase_palettebutton efmase_palettebutton_down")
                    : (q.className = "efmase_palettebutton")
                  : ("mathcolor" == p.name &&
                      q.setAttribute("mathcolor", "#000000"),
                    (q.className = "efmase_palettebutton")),
                (q.style.width = p.w + "px"),
                (q.style.height = p.h + "px"),
                (r = document.createElement("img")),
                (r.alt = a[n]),
                (r.style.width = "1500px"),
                (r.style.height = "220px"),
                (r.src = $isItRight() + "com/imatheq/icons/icons_2x.png"),
                (r.title = a[n]),
                (r.style.marginLeft = p.l + "px"),
                (r.style.marginTop = p.t + "px"),
                (r.style.marginBottom = p.b + "px"),
                q.setAttribute("id", "efmase_menubar_item_" + p.name),
                q.setAttribute("name", "efmase_menubar_item_" + p.name),
                q.appendChild(r),
                k == e.length - 1 && (q.style.display = "none");
            else {
              var v = p.name,
                r =
                  "fontname" == v
                    ? this.editor.getFontFamilyNameIdx()
                    : this.editor.canvas.getFontSizeIdx(),
                y = p.ITEMS[r],
                q = document.createElement("a");
              q.title = a[n];
              q.innerHTML = a[y];
              q.setAttribute("name", v);
              q.setAttribute("btn_id", n);
              n = this.symbols[y];
              q.setAttribute("style", "width:auto");
              q.setAttribute("id", "efmase_menubar_item_" + p.name);
              n = this.symbols[y];
              void 0 !== n && q.setAttribute("cld_name", n.name);
              q.setAttribute("cld_id", r);
            }
            u.appendChild(q);
            if ("efmase_menugrp_drop" == p["class"]) {
              r = document.createElement("div");
              r.setAttribute("id", "efmase_menugrp_" + p.name);
              r.setAttribute("style", "width:auto");
              var w = this;
              com.efmase.js.utilities.toolset.addEventListener(
                r,
                "mouseover",
                function (a) {
                  w.efmase_menugrp_cancelclosetime();
                  return !1;
                }
              );
              y = ["efmase_menugrp_" + p.name];
              com.efmase.js.utilities.toolset.addEventListener(
                r,
                "mouseout",
                (function (a) {
                  return function (b) {
                    b.toElement.getAttribute("id") != a[0] &&
                      b.toElement.parentElement.getAttribute("id") != a[0] &&
                      w.efmase_menugrp_close();
                    return !1;
                  };
                })(y)
              );
              u.appendChild(r);
              for (u = 0; u < p.ITEMS.length; u++)
                (y = p.ITEMS[u]),
                  (n = document.createElement("a")),
                  (n.innerHTML = a[y]),
                  r.appendChild(n),
                  n.setAttribute(
                    "id",
                    "efmase_submenu_item_" + p.name + "_" + u
                  ),
                  (w = this),
                  (y = ["efmase_submenu_item_" + p.name + "_" + u]),
                  (v = ["efmase_menubar_item_" + p.name]),
                  com.efmase.js.utilities.toolset.addEventListener(
                    n,
                    "mousedown",
                    (function (a, b) {
                      return function (d) {
                        var e = w.editor.canvas.getFontSizeIdx(),
                          f = parseInt(
                            a[0].substring(
                              a[0].lastIndexOf("_") + 1,
                              a[0].length
                            )
                          );
                        if (e != f) {
                          w.efmase_submenuitem_select(a[0], b[0]);
                          var f = {
                              row: w.editor.cursor.position.row,
                              index: w.editor.cursor.position.index,
                            },
                            g = f.row.getIndexChain(f.index);
                          w.editor.actions.addAction(
                            "fontsize",
                            f,
                            g,
                            g,
                            e,
                            null,
                            0
                          );
                        }
                        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                          d
                        );
                        d.stopPropagation();
                        return !1;
                      };
                    })(y, v)
                  );
            }
            y = [p.name];
            w = this;
            com.efmase.js.utilities.toolset.addEventListener(
              q,
              "mousedown",
              (function (a) {
                return function (b) {
                  w.efmase_menugrp_click(a[0], b);
                  org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                    b
                  );
                  b.preventDefault();
                  return !1;
                };
              })(y)
            );
            com.efmase.js.utilities.toolset.addEventListener(
              q,
              "mouseout",
              function (a) {
                w.efmase_menugrp_closetime();
                return !1;
              }
            );
          }
        }
        u = document.createElement("li");
        d.appendChild(u);
        q = document.createElement("span");
        u.appendChild(q);
        q.innerHTML = "&nbsp;";
        e = this.editor.pData.PALETTE;
        this.editor.paletteTabs = [];
        if (b) {
          b = document.createElement("div");
          document.body.appendChild(b);
          b.id = "efmase_sw_menutab_div";
          b.style.display = "none";
          q = document.createElement("div");
          b.appendChild(q);
          q.className = "efmase_sw_menutab_title";
          q.innerHTML = "Select symbol group";
          f = document.createElement("div");
          b.appendChild(f);
          f.className = "efmase_mobile_tabs";
          k = e.length;
          for (d = 0; d < k; d++)
            (u = e[d].id),
              (y = this.symbols[u]),
              (q = document.createElement("a")),
              (q = document.createElement("button")),
              (q.title = a[u]),
              (q.name =
                "PALETTE_TAB_" + y.name.replace(/ /, "_").toUpperCase()),
              this.editor.paletteTabs.push(q.name),
              (q.className = "efmase_palettebutton"),
              (q.style.width = y.w + "px"),
              (q.style.height = y.h + "px"),
              com.efmase.js.utilities.toolset.isIOS() &&
                (q.style.padding = "1px 6px"),
              q.classList.add("small_win_menu_item"),
              (r = document.createElement("img")),
              (r.alt = a[u]),
              (r.style.width = "1500px"),
              (r.style.height = "220px"),
              (r.src = $isItRight() + "com/imatheq/icons/icons_2x.png"),
              (r.title = a[u]),
              (r.style.marginLeft = y.l + "px"),
              (r.style.marginTop = y.t + "px"),
              (r.style.marginBottom = y.b + "px"),
              q.appendChild(r),
              f.appendChild(q),
              d == this.curtab &&
                (q.className += " efmase_palettebutton_focus"),
              (r = [q.name]),
              (w = this),
              com.efmase.js.utilities.toolset.addEventListener(
                q,
                "mousedown",
                (function (a) {
                  return function (b) {
                    w.handleTabBtnOverClick(a[0]);
                  };
                })(r)
              );
          q = document.createElement("div");
          b.appendChild(q);
          q.className = "efmase_sw_menutab_title";
          q.innerHTML = "Tools";
          a = document.createElement("div");
          b.appendChild(a);
          d = document.createElement("ul");
          d.setAttribute("id", "efmase_menubar");
          a.appendChild(d);
          e = this.editor.pData.MENUBAR;
          a = this.editor.pData.TITLES;
          f = new org.imatheq.formulaeditor.Options();
          r = document.createElement("li");
          r.style["float"] = "left";
          d.appendChild(r);
          q = document.createElement("span");
          r.appendChild(q);
          q.innerHTML = "&nbsp;";
          for (k = 1; 8 > k; k++)
            (y = e[k].id),
              (p = this.symbols[y]),
              (u = document.createElement("li")),
              (u.style["float"] = "left"),
              d.appendChild(u),
              (q = document.createElement("button")),
              (q.title = a[y]),
              (q.name = "efmase_menubar_item_" + p.name),
              "undo" == p.name || "redo" == p.name
                ? (q.className =
                    "efmase_palettebutton efmase_palettebtn_disabled")
                : "autoitalic" == p.name
                ? f.getOption("defAutoItalic")
                  ? (q.className = "efmase_palettebutton")
                  : (q.className =
                      "efmase_palettebutton efmase_palettebutton_down")
                : ("mathcolor" == p.name &&
                    q.setAttribute("mathcolor", "#000000"),
                  (q.className = "efmase_palettebutton")),
              (q.style.width = p.w + "px"),
              (q.style.height = p.h + "px"),
              q.classList.add("small_win_menu_item"),
              (r = document.createElement("img")),
              (r.alt = a[y]),
              (r.style.width = "1500px"),
              (r.style.height = "220px"),
              (r.src = $isItRight() + "com/imatheq/icons/icons_2x.png"),
              (r.title = a[y]),
              (r.style.marginLeft = p.l + "px"),
              (r.style.marginTop = p.t + "px"),
              (r.style.marginBottom = p.b + "px"),
              q.setAttribute("id", "efmase_menubar_item_" + p.name),
              com.efmase.js.utilities.toolset.isIOS() &&
                (q.style.padding = "1px 6px"),
              q.appendChild(r),
              u.appendChild(q),
              (y = [p.name]),
              (w = this),
              com.efmase.js.utilities.toolset.addEventListener(
                q,
                "mousedown",
                (function (a) {
                  return function (b) {
                    w.efmase_menugrp_click(a[0], b);
                    return !1;
                  };
                })(y)
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                q,
                "mouseout",
                function (a) {
                  w.efmase_menugrp_closetime();
                  return !1;
                }
              );
          u = document.createElement("li");
          d.appendChild(u);
          q = document.createElement("span");
          u.appendChild(q);
          q.innerHTML = "&nbsp;";
          q = document.createElement("div");
          b.appendChild(q);
          q.className = "efmase_sw_menutab_title";
          q.innerHTML = "Select font";
          for (k = 8; 10 > k; k++)
            for (
              9 == k &&
                ((q = document.createElement("div")),
                b.appendChild(q),
                (q.className = "efmase_sw_menutab_title"),
                (q.innerHTML = "Select font size")),
                n = e[k].id,
                p = this.symbols[n],
                r = document.createElement("div"),
                r.setAttribute("id", "efmase_menubar_item_" + p.name),
                v = p.name,
                r.setAttribute("name", v),
                q =
                  "fontname" == v
                    ? this.editor.getFontFamilyNameIdx()
                    : this.editor.canvas.getFontSizeIdx(),
                r.setAttribute("cld_id", q),
                8 == k
                  ? (r.style.display = "block")
                  : (r.className = "efmase_mobile_font_size_tabs"),
                w = this,
                b.appendChild(r),
                u = 0;
              u < p.ITEMS.length;
              u++
            )
              (d = document.createElement("div")),
                r.appendChild(d),
                (y = p.ITEMS[u]),
                (n = document.createElement("a")),
                (n.innerHTML = a[y]),
                (d.innerHTML = a[y]),
                d.setAttribute("id", "efmase_submenu_item_" + p.name + "_" + u),
                u == q && (d.className = "efmase_mobile_font_n_size_focused"),
                d.classList.add("small_win_menu_item"),
                (w = this),
                (y = ["efmase_submenu_item_" + p.name + "_" + u]),
                (v = ["efmase_menubar_item_" + p.name]),
                com.efmase.js.utilities.toolset.addEventListener(
                  d,
                  "mousedown",
                  (function (a, b) {
                    return function (b) {
                      var d = parseInt(
                        a[0].substring(a[0].lastIndexOf("_") + 1, a[0].length)
                      );
                      w.execPalCmd(p, "", d);
                      org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                        b
                      );
                      b.stopPropagation();
                      return !1;
                    };
                  })(y, v)
                );
          q = document.createElement("div");
          b.appendChild(q);
          q.className = "efmase_sw_menutab_title";
          q.innerHTML = "Term of use";
          r = document.createElement("div");
          a = document.createElement("a");
          a.target = "blank";
          a.href =
            "EN" == this.editor.lang
              ? "legalterms.html"
              : "legalterms_zh_cn.html";
          a.innerHTML = "Term of use";
          r.appendChild(a);
          r.style.display = "block";
          b.appendChild(r);
        } else
          for (
            f = document.createElement("div"),
              this.container.insertBefore(
                f,
                this.container.firstChild.nextSibling
              ),
              oTabbar = document.createElement("ul"),
              oTabbar.id = "efmase_header",
              f.appendChild(oTabbar),
              b = document.createElement("li"),
              q = document.createElement("button"),
              q.className = "efmase_button_head",
              b.appendChild(q),
              oTabbar.appendChild(b),
              k = e.length,
              d = 0;
            d < k;
            d++
          )
            (b = document.createElement("li")),
              (u = e[d].id),
              (y = this.symbols[u]),
              (q = document.createElement("a")),
              (q = document.createElement("button")),
              (q.title = a[u]),
              (q.name =
                "PALETTE_TAB_" + y.name.toUpperCase().replace(/ /, "_")),
              this.editor.paletteTabs.push(q.name),
              (q.className = "efmase_palettebutton"),
              q.name == this.curtab &&
                (q.className += " efmase_palettebutton_focus"),
              (q.style.width = y.w + "px"),
              (q.style.height = y.h + "px"),
              (r = document.createElement("img")),
              (r.alt = a[u]),
              (r.style.width = "1500px"),
              (r.style.height = "220px"),
              (r.src = $isItRight() + "com/imatheq/icons/icons_2x.png"),
              (r.title = a[u]),
              (r.style.marginLeft = y.l + "px"),
              (r.style.marginTop = y.t + "px"),
              (r.style.marginBottom = y.b + "px"),
              q.appendChild(r),
              b.appendChild(q),
              d == this.curtab &&
                (q.className += " efmase_palettebutton_focus"),
              oTabbar.appendChild(b),
              (r = [q.name]),
              (w = this),
              com.efmase.js.utilities.toolset.addEventListener(
                q,
                "mouseover",
                (function (a) {
                  return function (b) {
                    w.editor.clearKBNavi();
                    w.handleTabBtnOverClick(a[0]);
                  };
                })(r)
              ),
              com.efmase.js.utilities.toolset.addEventListener(
                q,
                "mousedown",
                (function (a) {
                  return function (b) {
                    w.editor.clearKBNavi();
                    w.handleTabBtnOverClick(a[0]);
                  };
                })(r)
              );
      },
      redrawMenuTabBar: function () {
        var a =
          com.efmase.js.utilities.toolset.isSmallWin() || this.editor.isMobile;
        if (this.smallwindow !== a) {
          var b = null;
          null !== this.smallwindow && (b = this.editor.getButtonStatus());
          this.smallwindow = a;
          this.clearMenuTabBar();
          this.drawMenuTabBar(a);
          null !== b && this.editor.setButtonStatus(b);
        }
      },
      draw: function () {
        var a = document.createElement("div");
        a.className = "efmase_palettes";
        this.container.appendChild(a);
        for (
          var b = this.editor.pData.PALETTE,
            d = b.length,
            e = this.editor.pData.TITLES,
            f = 0;
          f < d;
          f++
        ) {
          var k =
              "PALETTE_TAB_" +
              this.symbols[b[f].id].name.replace(/ /, "_").toUpperCase() +
              "_BODY",
            n = document.createElement("div");
          n.className = "efmase_palette";
          n.style.width = parseInt(window.innerWidth) - 48 + "px";
          n.id = k;
          n.style.display = k == this.curtab + "_BODY" ? "" : "none";
          a.appendChild(n);
          k = document.createElement("table");
          n.appendChild(k);
          oTR = document.createElement("tr");
          k.appendChild(oTR);
          n = b[f].GROUPS;
          for (k = 0; k < n.length; k++) {
            gType = n[k].hasOwnProperty("type") ? n[k].type : "";
            var p = n[k].ROWS,
              r = n[k].id;
            oTD = document.createElement("td");
            oTR.appendChild(oTD);
            var q = document.createElement("div");
            "Edit Buttons" == this.symbols[b[f].id].name &&
              ((q.id = r),
              (q.name = r),
              (q.style.display = "none"),
              (oTD.style.borderLeft = "0"));
            q.className = "efmase_palette_grp_div";
            "dummy" == gType && (q.style.display = "block");
            oTD.appendChild(q);
            oTable = document.createElement("table");
            q.appendChild(oTable);
            oTbody = document.createElement("tbody");
            oTable.appendChild(oTbody);
            r = null;
            this.editor.isMobile &&
              ((r = document.createElement("tr")), oTbody.appendChild(r));
            for (q = 0; q < p.length; q++) {
              this.editor.isMobile ||
                ((r = document.createElement("tr")), oTbody.appendChild(r));
              for (var u = p[q].ITEMS, v = 0; v < u.length; v++) {
                var y = u[v].id,
                  w = this.symbols[y],
                  z = document.createElement("td");
                r.appendChild(z);
                var A = document.createElement("button");
                A.title = e[y];
                "Edit Buttons" == this.symbols[b[f].id].name
                  ? ((A.id = w.name), (A.name = w.name))
                  : (A.name = y);
                A.className = "efmase_palettebutton";
                "dummy" == gType &&
                  (A.className = "efmase_palettebutton_dummy");
                void 0 !== w.name &&
                  this.editor.parrayLine == w.name &&
                  (A.className += " efmase_palettebutton_select");
                "menu_b" == w.tp &&
                  ((A.id = "efmase_menubar_item_" + w.name),
                  (A.name = "efmase_menubar_item_" + w.name),
                  "undo" == w.name || "redo" == w.name) &&
                  (A.className += " efmase_palettebtn_disabled");
                A.style.width = w.w + "px";
                A.style.height = w.h + "px";
                A.style.padding = "1px 6px";
                com.efmase.js.utilities.toolset.isIOS() &&
                  (A.style.padding = "1px 6px");
                z.appendChild(A);
                "988" == y && (aaa = 2);
                if ("BRACKETS_UPDATE" == w.name)
                  (z = document.createElement("div")),
                    (oBracket = document.createElement("a")),
                    (oBracket.style.fontSize = "22px"),
                    z.appendChild(oBracket),
                    A.appendChild(z),
                    (oSpan = document.createElement("span")),
                    (oSpan.id = "efmase_bracket_palette_btn"),
                    (oSpan.name = w.name),
                    oBracket.appendChild(oSpan),
                    (oSpan.innerHTML = "(&nbsp;)"),
                    A.classList.add("efmase_menugrp_drop"),
                    (A.style.width = "auto"),
                    (A.style.height = "auto"),
                    (A.style.padding = "1px"),
                    (z.style.width = "auto"),
                    (z.style.height = "auto"),
                    (z.style.border = "1px solid #000000"),
                    (z.style.padding = "2px 4px 3px 4px");
                else if (void 0 !== w.itp)
                  (oLink = document.createElement("a")),
                    (oLink.style.fontSize = "22px"),
                    A.appendChild(oLink),
                    (oSpan = document.createElement("span")),
                    oLink.appendChild(oSpan),
                    (oSpan.innerHTML = w.ich),
                    (A.style.fontFamily = w.font),
                    (A.style.width = "auto"),
                    (A.marginTop = "-1px");
                else if (
                  ((z = document.createElement("img")),
                  (z.alt = e[y]),
                  750 > parseInt(y)
                    ? ((z.style.width = "1500px"),
                      (z.style.height = "220px"),
                      (z.src = $isItRight() + "com/imatheq/icons/icons_2x.png"))
                    : ((z.style.width = "2000px"),
                      (z.style.height = "327px"),
                      (z.src = $isItRight() + "com/imatheq/icons/icons2_2x.png")),
                  (z.title = e[y]),
                  (z.style.marginLeft = w.l + "px"),
                  (z.style.marginTop = w.t + "px"),
                  (z.style.marginBottom = w.b + "px"),
                  "PARRAY_ROW_SPACING" == w.name ||
                    "PARRAY_COL_SPACING" == w.name)
                ) {
                  A.style.width = w.w + 8 + "px";
                  A.style.height = w.h + 8 + "px";
                  A.style.padding = "1px";
                  var C = document.createElement("div");
                  C.style.width = w.w + "px";
                  C.style.height = w.h + "px";
                  C.style.border = "1px solid";
                  oSpan = document.createElement("div");
                  oSpan.appendChild(z);
                  C.appendChild(oSpan);
                  A.appendChild(C);
                  A.classList.add("efmase_menugrp_drop");
                } else A.appendChild(z);
                var D = this;
                com.efmase.js.utilities.toolset.addEventListener(
                  A,
                  "mousedown",
                  (function (a) {
                    return function (b) {
                      D.clearPanels();
                      var d = D.handlePaletteBtnOverClick(
                        a[0],
                        b.pageX,
                        b.pageY
                      );
                      org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(
                        b
                      );
                      b.preventDefault();
                      return d;
                    };
                  })([y])
                );
              }
            }
          }
        }
        this.redrawMenuTabBar();
      },
      getPresentation: function (a, b) {
        var d = org.imatheq.formulaeditor.presentation,
          e = null;
        switch (a.tp) {
          case "ch":
            e = new d.Symbol(a.ch);
            break;
          case "sp":
            e = new d.Space(a.width + "em", a.height + "em", a.depth + "em");
            break;
          case "xml":
            var d = org.imatheq.formulaeditor.parsing.mathml.MathMLParser,
              f = {},
              k;
            for (k in b) f[k] = b[k];
            try {
              var n =
                  "<math xmlns='http://www.w3.org/1998/Math/MathML'>" +
                  a.xml +
                  "</math>",
                p = new d().parseString(n, f, !0);
              if (null !== a.firstRowPos && void 0 !== a.firstRowPos) {
                p.firstRow = p.children[a.firstRowPos[0]];
                for (var r = 1; r < a.firstRowPos.length; r++)
                  p.firstRow = p.firstRow.children[a.firstRowPos[r]];
              }
              if (null !== a.defCursorPos && void 0 !== a.defCursorPos) {
                for (
                  var q = p.children[a.defCursorPos[0]], r = 1;
                  r < a.defCursorPos.length;
                  r++
                )
                  q = q.children[a.defCursorPos[r]];
                p.defCursorPos = { row: q, index: 0 };
              }
              e = p;
            } catch (u) {
              throw Error(
                "Compound symbol: " + this.mathml + "cannot be parsed."
              );
            }
            break;
          case "mx_d":
          case "mx":
            f = {};
            for (k in b) f[k] = b[k];
            f.inMatrix = !0;
            e = [];
            f = a.inputNumRows;
            if (null === f || void 0 === f) f = a.num_rows;
            k = a.inputNumCols;
            if (null === k || void 0 === k) k = a.num_cols;
            if ("IdentityWith0" == a.data_type)
              for (n = 0; n < f; n++) {
                p = [];
                for (r = 0; r < k; r++)
                  (q =
                    n == r
                      ? new d.Row(new d.Symbol(a.one))
                      : new d.Row(new d.Symbol(a.zero))),
                    p.push(q);
                e[n] = p;
              }
            else
              for (n = 0; n < f; n++) {
                p = [];
                for (r = 0; r < k; r++)
                  (q = new d.Row(new d.BlockSymbol())), p.push(q);
                e[n] = p;
              }
            f = new d.Bracket(a.left_bracket);
            k = new d.Bracket(a.right_bracket);
            pArray = new org.imatheq.formulaeditor.presentation.PArray();
            pArray.initialize.apply(pArray, e);
            e = new org.imatheq.formulaeditor.presentation.PArray.Info(pArray);
            void 0 != a.col_align && (e.colalign = [a.col_align]);
            e.populateData(pArray.numrows, pArray.numcols);
            pArray.info = e;
            "" == f.value && "" == k.value
              ? (e = pArray)
              : ((e = new d.Row(pArray)), (e = new d.Bracketed(f, e, k)));
            if (null !== a.firstRowPos && void 0 !== a.firstRowPos)
              for (
                e.firstRow = e.children[a.firstRowPos[0]], r = 1;
                r < a.firstRowPos.length;
                r++
              )
                e.firstRow = e.firstRow.children[a.firstRowPos[r]];
            if (null !== a.defCursorPos && void 0 !== a.defCursorPos) {
              q = e.children[a.defCursorPos[0]];
              for (r = 1; r < a.defCursorPos.length; r++)
                q = q.children[a.defCursorPos[r]];
              e.defCursorPos = { row: q, index: 0 };
            }
        }
        return e;
      },
      changeFont: function (a, b) {
        var d =
          "fontname" == a
            ? this.editor.getFontFamilyNameIdx()
            : this.editor.canvas.getFontSizeIdx();
        if (b != d) {
          var e = "efmase_submenu_item_" + a + "_" + d,
            f = "efmase_submenu_item_" + a + "_" + b,
            k = document.getElementById("efmase_menubar_item_" + a);
          "fontname" == a
            ? this.editor.setFontFamilyNameIdx(b)
            : this.editor.canvas.setFontSizeIdx(b);
          this.isSmallWin()
            ? ((f = document.getElementById(f)),
              document
                .getElementById(e)
                .classList.remove("efmase_mobile_font_n_size_focused"),
              f.classList.add("efmase_mobile_font_n_size_focused"))
            : (k.innerHTML = ("fontname" == a
                ? this.fontnamePanel
                : this.fontsizePanel
              ).getValue(b));
        }
        return d;
      },
      execPalCmd: function (a, b, d) {
        switch (a.cmd) {
          case "fontname":
          case "fontsize":
            curIdx = this.changeFont(a.cmd, d);
            if (d != curIdx) {
              var e = {
                row: this.editor.cursor.position.row,
                index: this.editor.cursor.position.index,
              };
              d = e.row.getIndexChain(e.index);
              this.editor.actions.addAction(a.cmd, e, d, d, curIdx, null, 0);
            }
            break;
          case "addrowline":
          case "removerowline":
            var e = this.editor.cursor.position,
              f = e.etb.parray;
            if (Math.floor(f.startIndex / f.row.numcols) == f.row.numrows - 1)
              break;
          case "addcolline":
          case "removecolline":
            if (
              ((e = this.editor.cursor.position),
              (f = e.etb.parray),
              f.startIndex % f.row.numcols == f.row.numcols - 1)
            )
              break;
          case "rowalign":
          case "colalign":
          case "addframe":
          case "removeframe":
          case "setsolidline":
          case "setdashedline":
          case "toggleequalrows":
          case "toggleequalcols":
          case "rowspacing":
          case "colspacing":
            var k = null,
              n = null,
              p = null,
              r = this.editor,
              e = this.editor.cursor.position,
              f = e.etb.parray,
              q = { row: f.row, index: f.index };
            d = e.row.getIndexChain(e.index);
            var e = e.row.getIndexChain(e.index),
              u,
              k = {
                parent: f.row,
                position: q,
                beforePosition: d,
                afterPosition: e,
                startIndex: f.startIndex,
                endIndex: f.endIndex,
                hasSelection: !1,
              };
            r.selection.hasSelection &&
              ((n = this.editor.selection.getSelectionCopy()),
              (p = this.editor.selection.getSelectionCopy()));
            u = f.row.info.copy(f.row.numrows, f.row.numcols);
            b = "rowspacing" == a.cmd || "colspacing" == a.cmd ? b : a.dir;
            f.row.setStylingAttrbs(k, a.cmd, b);
            f.row.info.populateData(f.row.numrows, f.row.numcols);
            f.row.updateEditTabButtons(r);
            b = this.editor.getButtonStatus();
            this.editor.actions.addAction(
              "setPArrayAttrbs",
              q,
              d,
              e,
              u,
              null,
              null,
              n,
              p,
              b,
              null
            );
            this.editor.redraw(r.selection.hasSelection);
            break;
          case "insertabove":
          case "insertbelow":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actInsertRows(this.editor, a.cmd);
            break;
          case "insertleft":
          case "insertright":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actInsertColumns(this.editor, a.cmd);
            break;
          case "deleterows":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actDeleteRows(this.editor);
            break;
          case "deletecolumns":
            e = this.editor.cursor.position;
            f = e.etb.parray;
            f.row.actDeleteColumns(this.editor);
            break;
          case "onsymmetric":
          case "offsymmetric":
            if (
              ((p = n = null),
              (r = this.editor),
              (e = r.cursor.position),
              (b = e.etb.bracketed),
              (b.getSymmetric() && "offsymmetric" == a.cmd) ||
                (!b.getSymmetric() && "onsymmetric" == a.cmd))
            )
              (q = { row: b, index: e.index }),
                (d = e.row.getIndexChain(e.index)),
                (e = e.row.getIndexChain(e.index)),
                (u = b.symmetric),
                r.selection.hasSelection &&
                  ((n = this.editor.selection.getSelectionCopy()),
                  (p = this.editor.selection.getSelectionCopy())),
                b.setSymmetric("offsymmetric" == a.cmd ? !1 : !0),
                b.updateEditTabButtons(r),
                (b = this.editor.getButtonStatus()),
                this.editor.actions.addAction(
                  a.cmd,
                  q,
                  d,
                  e,
                  u,
                  null,
                  null,
                  n,
                  p,
                  b,
                  null
                ),
                (this.isMO = !1),
                this.editor.redraw(r.selection.hasSelection);
        }
      },
      updateBracket: function (a, b, d) {
        var e = null,
          e = (a = null),
          f = this.editor,
          k = {
            row: this.editor.cursor.position.row,
            index: this.editor.cursor.position.index,
          },
          n = k.row.getIndexChain(k.index),
          p = k.row.getIndexChain(k.index),
          r,
          q = this.editor.getBracketedObject();
        k.row = q;
        k.index = q.index;
        f.selection.hasSelection && (a = e = f.selection.getSelectionCopy());
        r = [
          q.leftBracket.value,
          q.rightBracket.value,
          q.leftBracket.onscreen,
          q.rightBracket.onscreen,
        ];
        q.leftBracket.value = b.replace("&lt;", "<").replace("&gt;", ">");
        q.rightBracket.value = d.replace("&lt;", "<").replace("&gt;", ">");
        q.leftBracket.onscreen = null;
        q.rightBracket.onscreen = null;
        document.getElementById("efmase_bracket_palette_btn").innerHTML =
          b.replace("<", "&lt;").replace(">", "&gt;") +
          "&nbsp;" +
          d.replace("<", "&lt;").replace(">", "&gt;");
        b = this.editor.getButtonStatus();
        this.editor.actions.addAction(
          "updateBracket",
          k,
          n,
          p,
          r,
          null,
          null,
          a,
          e,
          b,
          null
        );
        this.editor.redraw(f.selection.hasSelection);
        this.editor.clearKBNavi();
        this.editor.keyboardNavi = 4;
      },
      handlePaletteBtnOverClick: function (a, b, d) {
        var e = this.editor;
        e.getButtonStatus();
        this.curBtnId = parseInt(a);
        var f = this.symbols[this.curBtnId],
          k = null !== f.sub_tp && void 0 !== f.sub_tp ? f.sub_tp : "";
        return "mx" == f.tp && "panel" == k
          ? (this.matrixPanel.show(a, b, d), !1)
          : "bkt_panel" == k
          ? (this.bracketPanel.show(a, b, d), !1)
          : "PARRAY_ROW_SPACING" == f.name || "PARRAY_COL_SPACING" == f.name
          ? (this.sizePanel.show(a, b, d), !1)
          : "emx" == f.tp
          ? ((f = this.symbols[this.curBtnId]), this.execPalCmd(f), !1)
          : this.handlePaletteBtnClick(e, b, d);
      },
      handleTabBtnOverClick: function (a) {
        var b = com.efmase.js.utilities.toolset;
        a != this.curtab &&
          (b.setObjsAttrb(
            this.curtab,
            "class",
            "efmase_palettebutton_focus",
            "remove"
          ),
          (document.getElementById(a + "_BODY").style.display = ""),
          (document.getElementById(this.curtab + "_BODY").style.display =
            "none"),
          (this.curtab = a),
          b.setObjsAttrb(a, "class", "efmase_palettebutton_focus"));
      },
      handlePaletteBtnClick: function (a, b, d) {
        a = this.editor;
        var e = org.imatheq.formulaeditor.presentation,
          f = a.selection,
          k = a.getButtonStatus(),
          n = null,
          p = null;
        a.cursor.hideCursor();
        f.hasSelection && (n = f.getSelectionCopy());
        a.hasFocus() || a.focus();
        var r = { row: a.cursor.position.row, index: a.cursor.position.index },
          q = { row: a.cursor.position.row, index: a.cursor.position.index },
          u = r.row.getIndexChain(r.index),
          v = this.symbols[this.curBtnId];
        if ("menu_b" == v.tp) {
          switch (v.name) {
            case "undo":
              a.actions.undo();
              break;
            case "redo":
              a.actions.redo();
          }
          return !1;
        }
        900 <= this.curBtnId &&
          908 > this.curBtnId &&
          ((v.inputNumRows = b),
          (v.inputNumCols = d),
          "906" == this.curBtnId || "907" == this.curBtnId) &&
          ((v.inputNumRows = Math.max(b, d)),
          (v.inputNumCols = v.inputNumRows));
        406 == this.curBtnId &&
          (v.xml =
            "<mfenced open='" +
            b.replace("<", "&lt;").replace(">", "&gt;") +
            "' close='" +
            d.replace("<", "&lt;").replace(">", "&gt;") +
            "'><mrow/></mfenced>");
        b = "insert";
        var y = null,
          w = null,
          z = r.row,
          A = v.basePosition;
        d = r.row.children.length - r.index;
        if (f.hasSelection) {
          b = "update";
          f.parent instanceof e.PArray &&
            0 == f.startIndex &&
            f.endIndex == f.parent.children.length &&
            ((f = a.selection.getSelectionCopy()),
            (f.parent = a.selection.parent.parent),
            (f.startIndex = a.selection.parent.index),
            (f.endIndex = a.selection.parent.index + 1));
          z = f.parent;
          y = null;
          r.row = f.parent;
          var C = f.startIndex,
            D = f.endIndex;
          if (z instanceof e.Row)
            0 < D && z.children[D - 1] instanceof e.NewlineSymbol && D--,
              (q = { row: f.parent, index: C }),
              null === A || void 0 === A
                ? ((d = z.children.length - D),
                  (y = z.remove(C, D)),
                  a.selection.clear(),
                  (r.index = C))
                : "i" == A
                ? ((d = z.children.length - D),
                  (y = z.remove(C, D)),
                  (w = y.copy()),
                  (r.index = C))
                : "r" == A
                ? ((b = "insert"), (r.index = C), (d = z.children.length - C))
                : "l" == A &&
                  ((b = "insert"), (r.index = D), (d = z.children.length - D));
          else if (z instanceof e.Lines)
            (A = null),
              (q = z),
              (d = q.getNumGrandChildren() - D),
              (y = q.remove(C, D)),
              a.selection.clear(),
              (q = a.getPosition(f.startIndexChain)),
              (r.index = C),
              (z = q.row);
          else return !1;
        } else
          a.cursor.position.row.children[a.cursor.position.index] instanceof
            e.BlockSymbol &&
            (0 <= q.index - 1 &&
            z.children[q.index - 1] instanceof e.BlockSymbol
              ? (q.index--, (y = z.remove(q.index)), (b = "update"))
              : z.children[q.index] instanceof e.BlockSymbol
              ? ((y = z.remove(q.index)), d--, (b = "update"))
              : (y = null));
        var B = this.getPresentation(v, this.getPresentationContext());
        B.setSymbFontAttrbs(k);
        "ch" == v.tp &&
          B instanceof e.Symbol &&
          ((v = org.imatheq.formulaeditor.parsing.expression.RevList[v.ch]),
          void 0 !== v &&
            ("script" == v.type
              ? (B.script = !0)
              : "fraktur" == v.type
              ? (B.fraktur = !0)
              : "double-struck" == v.type && (B.doubleStruck = !0)));
        var v = B.firstRow,
          D = (C = null),
          E = B.defCursorPos;
        a.selection.hasSelection &&
          null !== v &&
          "i" == A &&
          (v instanceof e.Row
            ? v.children.splice(0, v.children.length, w)
            : v.parent instanceof e.Row &&
              ((C = v.index),
              (D = v.parent.children.length - C - 1),
              v.parent.children.splice(v.index, 1, w)));
        w = new e.Row(B);
        w.flatten();
        if (w.children)
          for (var F = 0; F < w.children.length; F++)
            (B = z.insert(q.index, w.children[F], 0 === F)) && q.index++;
        else (B = z.insert(q.index, w, !0)) && q.index++;
        z = null;
        a.selection.hasSelection
          ? ("i" == A && null !== v
              ? v instanceof e.Row
                ? (z = {
                    parent: v,
                    startPosition: { row: v, index: 0 },
                    endPosition: { row: v, index: v.children.length },
                    startIndex: 0,
                    endIndex: v.children.length,
                    startIndexChain: v.getIndexChain(0),
                    endIndexChain: v.getIndexChain(v.children.length),
                    rightMove: !1,
                    dimensions: null,
                  })
                : ((f = v.parent.children.length - D),
                  (z = {
                    parent: v.parent,
                    startPosition: { row: v.parent, index: C },
                    endPosition: {
                      row: v.parent,
                      index: v.parent.children.length - D,
                    },
                    startIndex: C,
                    endIndex: v.parent.children.length - D,
                    startIndexChain: v.parent.getIndexChain(C),
                    endIndexChain: v.getIndexChain(f),
                    rightMove: !1,
                    dimensions: null,
                  }))
              : "r" == A &&
                ((f = q.index + f.endIndex - f.startIndex),
                (z = {
                  parent: q.row,
                  startPosition: { row: q.row, index: q.index },
                  endPosition: { row: q.row, index: f },
                  startIndex: q.index,
                  endIndex: f,
                  startIndexChain: q.row.getIndexChain(q.index),
                  endIndexChain: q.row.getIndexChain(f),
                  rightMove: !1,
                  dimensions: null,
                })),
            null !== z && void 0 !== z && z
              ? (a.selection.setSelection(z),
                (p = a.selection.getSelectionCopy()))
              : 900 <= this.curBtnId &&
                908 > this.curBtnId &&
                a.selection.clear())
          : a.selection.clear();
        E
          ? E.row instanceof e.Row
            ? a.cursor.setPosition(E)
            : null === z
            ? a.cursor.setPosition({ row: E.row.parent, index: E.row.index })
            : a.cursor.setPosition({ row: z.parent, index: z.endIndex })
          : a.cursor.setPosition(q);
        e = a.cursor.position.row.getIndexChain(a.cursor.position.index);
        a.actions.addAction(b, r, u, e, y, null, d, n, p, k, null);
        900 <= this.curBtnId && 908 > this.curBtnId && this.matrixPanel.hide();
        406 == this.curBtnId && this.bracketPanel.hide();
        (900 > this.curBtnId || 908 <= this.curBtnId) && a.redraw(null !== z);
        this.editor.clearKBNavi();
        this.editor.keyboardNavi = 4;
        return !1;
      },
      clearPanels: function () {
        null !== this.activePanel &&
          this.activePanel instanceof
            org.imatheq.formulaeditor.presentation.SizePanel &&
          this.activePanel.hide();
      },
    }
  );
  org.imatheq.formulaeditor.Palette.removePalette = function (d) {
    if (null !== d && void 0 !== d) {
      var e;
      for (e = 0; e < b.length; e++) b[e] == d && b.splice(e, 1);
      for (e = 0; e < a.length; e++) a[e].palette == d && (a[e].palette = null);
      d =
        null !== d.htmlelement && void 0 !== d.htmlelement
          ? d.htmlelement
          : d.canvas.canvas;
      d.parentNode.removeChild(d);
    }
  };
  var e = function () {
    com.efmase.js.utilities.toolset.loadFont("cmr7", "a");
    com.efmase.js.utilities.toolset.loadFont("cmmi7", "a");
    com.efmase.js.utilities.toolset.loadFont("cmex7", "\u00b3");
    com.efmase.js.utilities.toolset.loadFont("cmey7", "\u00c9");
    com.efmase.js.utilities.toolset.loadFont("msbm7", "A");
    com.efmase.js.utilities.toolset.loadFont("imescr7", "A");
    com.efmase.js.utilities.toolset.loadFont("eufm7", "A");
    !0 === new org.imatheq.formulaeditor.Options().getOption("debug") &&
      ((d = new org.imatheq.debug.Debug()), d.createDebug());
    for (
      var b = document.getElementsByTagName("textarea"), e = 0;
      e < b.length;
      e++
    ) {
      var f = b[e],
        m = f.getAttribute("class");
      m || (m = f.getAttribute("className"));
      m &&
        m.match(/(^| )imatheqformula($| )/) &&
        new org.imatheq.formulaeditor.FormulaEditor(f);
    }
    b = new org.imatheq.formulaeditor.Options().getOption("onloadFocus");
    if ("string" == typeof b) {
      if ((b = document.getElementById(b)))
        if (
          (b = org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea(b))
        )
          b.hasFocus() || b.focus(),
            b.selection.hasSelection || b.cursor.showCursor();
    } else
      1 == b &&
        (a[0].hasFocus() || a[0].focus(),
        a[0].selection.hasSelection || a[0].cursor.showCursor());
  };
  org.imatheq.formulaeditor.createEditor = function (
    b,
    e,
    f,
    m,
    t,
    k,
    n,
    p,
    r,
    q,
    u,
    v
  ) {
    !0 === new org.imatheq.formulaeditor.Options().getOption("debug") &&
      ((d = new org.imatheq.debug.Debug()), d.createDebug());
    b = new org.imatheq.formulaeditor.FormulaEditor(
      b,
      null,
      e,
      f,
      m,
      t,
      k,
      n,
      p,
      r,
      q,
      u,
      v
    );
    new ($extend(org.imatheq.formulaeditor.EventHandler, {
      onpress: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].onpress(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeydown: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].onkeydown(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeyup: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].onkeyup(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onkeypress: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].onkeypress(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncontextmenu: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].oncontextmenu(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onselectstart: function (b) {
        for (var d = !0, e = 0; e < a.length; e++) {
          var f = a[e].onselectstart(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onmousedown: function (b) {
        var d = (this.mouseIsDown = !0),
          e;
        viewport = com.efmase.js.utilities.toolset.getViewPort();
        for (e = 0; e < a.length; e++) {
          var f = a[e].onmousedown(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onmousemove: function (b) {
        var d = !0,
          e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].onmousemove(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncopy: function (b) {
        var d = !0,
          e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].oncopy(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onpaste: function (b) {
        var d = !0,
          e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].onpaste(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      oncut: function (b) {
        var d = !0,
          e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].oncut(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onmouseup: function (b) {
        var d = !0;
        this.mouseIsDown = !1;
        var e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].onmouseup(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
      onresize: function (b) {
        var d = !0,
          e;
        for (e = 0; e < a.length; e++) {
          var f = a[e].onresize(b);
          null !== f && void 0 !== f && !1 === f && (d = !1);
        }
        return d;
      },
    }))();
    e = new org.imatheq.formulaeditor.Options().getOption("onloadFocus");
    if ("string" == typeof e) {
      if ((e = document.getElementById(e)))
        if (
          (e = org.imatheq.formulaeditor.FormulaEditor.getEditorByTextArea(e))
        )
          e.hasFocus() || e.focus(),
            e.selection.hasSelection || e.cursor.showCursor();
    } else
      1 == e &&
        (a[0].hasFocus() || a[0].focus(),
        a[0].selection.hasSelection || a[0].cursor.showCursor());
    return b;
  };
  if (window.addEventListener)
    org.imatheq.formulaeditor.hasLoaded ||
    (document.readyState && "complete" == document.readyState)
      ? e()
      : window.addEventListener("load", e, !1);
  else {
    var f;
    f = function () {
      document.body
        ? document.body.attachEvent &&
          ("complete" == document.readyState
            ? e()
            : document.body.attachEvent("onload", e))
        : setTimeout(f, 50);
    };
    f();
  }
})();
(function () {
  org.imatheq.formulaeditor.presentation.MatrixPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    rowNoInput: null,
    colNoInput: null,
    matrixBtnTbody: null,
    initialize: function (a) {
      this.palette = a;
    },
    create: function (a) {
      var b = this,
        d = this.palette.editor,
        e = document.createElement("div");
      e.id = "efmase_matrix_pad";
      e.style.display = "none";
      var f = document.createElement("div");
      e.appendChild(f);
      f.innerHTML = d.pData.TITLES["2203"];
      oClose = document.createElement("span");
      oClose.id = "matrix_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      f.appendChild(oClose);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (a) {
          b.hide();
          return !1;
        }
      );
      var g = document.createElement("div");
      e.appendChild(g);
      f = document.createElement("table");
      f.id = "efmase_pad_table";
      g.appendChild(f);
      var h = document.createElement("table");
      g.appendChild(h);
      var l = document.createElement("tbody");
      h.appendChild(l);
      var m = document.createElement("tr"),
        h = document.createElement("td");
      h.className = "efmase_pad_label";
      h.innerHTML = d.pData.TITLES["2204"];
      m.appendChild(h);
      var t = document.createElement("td");
      m.appendChild(t);
      h = document.createElement("input");
      h.id = "matrix_panel_2";
      h.className = "efmase_pad_input";
      h.type = "number";
      h.title = "Rows";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        h,
        "focus",
        function (a) {
          b.keyboardNavi = 2;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      t.appendChild(h);
      var k = document.createElement("tr"),
        t = document.createElement("td");
      t.className = "efmase_pad_label";
      t.innerHTML = d.pData.TITLES["2204"];
      k.appendChild(t);
      var n = document.createElement("td");
      n.style.verticalAlign = "right";
      k.appendChild(n);
      t = document.createElement("input");
      t.id = "matrix_panel_3";
      t.className = "efmase_pad_input";
      t.type = "number";
      t.title = "Rows";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        t,
        "focus",
        function (a) {
          b.keyboardNavi = 3;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      n.appendChild(t);
      l.appendChild(m);
      l.appendChild(k);
      l = document.createElement("div");
      l.style.zindex = "500";
      g.appendChild(l);
      g = document.createElement("input");
      g.id = "matrix_panel_4";
      g.type = "button";
      g.value = d.pData.TITLES["2200"];
      l.appendChild(g);
      g.onclick = function (a) {
        return b.onSubmit(a);
      };
      g = document.createElement("input");
      g.id = "matrix_panel_5";
      g.type = "button";
      g.value = d.pData.TITLES["2201"];
      l.appendChild(g);
      g.onclick = function (a) {
        b.hide();
        return !1;
      };
      d = document.createElement("tbody");
      f.appendChild(d);
      for (l = 0; 6 > l; l++) {
        m = document.createElement("tr");
        for (k = 0; 6 > k; k++)
          (n = document.createElement("td")),
            (btnDiv = document.createElement("div")),
            (btnDiv.className = "efmase_pad_btn"),
            org.imatheq.formulaeditor.FormulaEditor.addEventListener(
              btnDiv,
              "mouseover",
              (function (a, d) {
                return function (e) {
                  return b.onDrag(d[0], a[0]);
                };
              })([k], [l])
            ),
            org.imatheq.formulaeditor.FormulaEditor.addEventListener(
              btnDiv,
              "mousedown",
              function (a) {
                return b.onSubmit(a);
              }
            ),
            n.appendChild(btnDiv),
            m.appendChild(n);
        d.appendChild(m);
      }
      f.appendChild(d);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        e,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      a.appendChild(e);
      this.padWindow = e;
      this.rowNoInput = h;
      this.colNoInput = t;
      this.oCancel = g;
      this.matrixBtnTbody = d;
    },
    show: function (a, b, d) {
      null === this.padWindow && this.create(this.palette.container, b, d);
      this.palette.isSmallWin()
        ? (document.getElementById("efmase_pad_table").style.display = "none")
        : ((document.getElementById("efmase_pad_table").style.display = ""),
          (document.getElementById("efmase_matrix_pad").style.left = b + "px"),
          (document.getElementById("efmase_matrix_pad").style.top = d + "px"));
      editor.blur();
      this.padWindow.btnId = a;
      b + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (b = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = b + "px";
      this.padWindow.style.top = d + "px";
      this.padWindow.style.display = "block";
      editor.textboxHeight = editor.textbox.style.height;
      editor.textbox.style.height = 0;
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
      this.onDrag(1, 1);
    },
    hide: function () {
      this.rowNoInput.blur();
      this.colNoInput.blur();
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var a = org.imatheq.formulaeditor.FormulaEditor.getFirstEditor();
      a.textbox.style.height = a.textboxHeight;
      a.hasFocus() || a.focus();
      a.redraw();
      a.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
    },
    onDrag: function (a, b) {
      if ("906" == this.padWindow.btnId || "907" == this.padWindow.btnId)
        b = a = Math.max(a, b);
      for (var d = 0; d < this.matrixBtnTbody.childNodes.length; d++)
        for (
          var e = 0;
          e < this.matrixBtnTbody.childNodes[d].childNodes.length;
          e++
        )
          this.matrixBtnTbody.childNodes[d].childNodes[
            e
          ].firstChild.style.backgroundColor =
            d <= a && e <= b ? "#778E9A" : "#fff";
      this.rowNoInput.value = a + 1;
      this.colNoInput.value = b + 1;
    },
    onSubmit: function (a) {
      if ("906" == this.padWindow.btnId || "907" == this.padWindow.btnId)
        (this.rowNoInput.value =
          Math.max(this.rowNoInput.value, this.colNoInput.value) + 1),
          (this.colNoInput.value = this.rowNoInput.value);
      this.palette.handlePaletteBtnClick(
        this.palette.editor,
        this.rowNoInput.value,
        this.colNoInput.value
      );
      org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
      a.preventDefault();
      return !1;
    },
    onkeydown: function (a) {
      if (9 == a.keyCode)
        return (
          this.clearKBNavi("matrix_panel_"),
          a.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 5),
          6 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("matrix_panel_", a),
          !1
        );
      if (13 == a.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(a),
              a.preventDefault(),
              !1)
            : this.onSubmit(a)
        );
      if (
        1 == this.keyboardNavi &&
        "matrix_panel_2" != document.activeElement.id &&
        "matrix_panel_3" != document.activeElement.id
      )
        switch (a.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    kbNaviMove: function (a) {
      if (1 == this.keyboardNavi) {
        var b = this.rowNoInput.value - 1,
          d = this.colNoInput.value - 1;
        0 < d && "left" == a && d--;
        5 > d && "right" == a && d++;
        0 < b && "up" == a && b--;
        5 > b && "down" == a && b++;
        this.onDrag(b, d);
      }
      return !1;
    },
    setKBNavi: function (a, b) {
      if (1 != this.keyboardNavi) {
        var d = document.getElementById(a + this.keyboardNavi);
        d.focus();
        0 == this.keyboardNavi && d.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (a) {
      1 != this.keyboardNavi &&
        ((a = document.getElementById(a + this.keyboardNavi)),
        a.blur(),
        0 == this.keyboardNavi &&
          a.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.BracketPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    bracketBtnTbody: null,
    row: 0,
    col: 0,
    titleElm: null,
    initialize: function (a) {
      this.palette = a;
    },
    create: function (a) {
      var b = this,
        d = this.palette.editor,
        e = document.createElement("div");
      e.id = "efmase_bracket_pad";
      brackets = org.imatheq.formulaeditor.parsing.expression.BracketList;
      var f = document.createElement("div");
      e.appendChild(f);
      var g = document.createElement("span");
      f.appendChild(g);
      this.titleElm = g;
      oClose = document.createElement("span");
      f.appendChild(oClose);
      oClose.id = "bracket_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (a) {
          b.hide();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
          a.preventDefault();
          return !1;
        }
      );
      g = document.createElement("div");
      e.appendChild(g);
      f = document.createElement("table");
      f.id = "efmase_bracket_pad_table";
      g.appendChild(f);
      var h = document.createElement("div");
      h.style.zindex = "500";
      g.appendChild(h);
      g = document.createElement("input");
      g.type = "button";
      g.value = d.pData.TITLES["2200"];
      g.id = "bracket_panel_2";
      h.appendChild(g);
      g.onclick = function (a) {
        return b.onSubmit(a);
      };
      g = document.createElement("input");
      g.type = "button";
      g.value = d.pData.TITLES["2201"];
      g.id = "bracket_panel_3";
      h.appendChild(g);
      g.onclick = function (a) {
        b.hide();
        org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(event);
        event.preventDefault();
        return !1;
      };
      d = document.createElement("tbody");
      f.appendChild(d);
      for (h = 0; h < brackets.length / 2 + 1; h++) {
        for (var l = document.createElement("tr"), m = 0; 2 > m; m++) {
          var t = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_bracket_pad_btn";
          h < brackets.length / 2
            ? ((btnDiv.innerHTML = brackets[2 * h + m]),
              (btnDiv.id = "efmase_bracket_" + brackets[2 * h + m]))
            : ((btnDiv.innerHTML = "&nbsp;"), (btnDiv.id = "efmase_bracket_"));
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (a, d) {
              return function (e) {
                return b.onSelect(d[0], a[0], e);
              };
            })([m], [h])
          );
          t.appendChild(btnDiv);
          l.appendChild(t);
        }
        d.appendChild(l);
      }
      f.appendChild(d);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        e,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      a.appendChild(e);
      this.padWindow = e;
      this.oCancel = g;
      this.bracketBtnTbody = d;
    },
    show: function (a, b, d, e) {
      var f = "406" == a ? "create" : "edit";
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      document.getElementById("efmase_bracket_pad_table").style.display = "";
      document.getElementById("efmase_bracket_pad").style.left = b + "px";
      document.getElementById("efmase_bracket_pad").style.top = d + "px";
      e = this.palette.editor;
      e.blur();
      this.padWindow.btnId = a;
      this.titleElm.innerHTML = e.pData.TITLES[a];
      a = ["(", ")"];
      "edit" == f &&
        ((a = e.getBracketedObject()),
        (a = [
          "" == a.leftBracket.value ? "&nbsp;" : a.leftBracket.value,
          "" == a.rightBracket.value ? "&nbsp;" : a.rightBracket.value,
        ]));
      for (
        var f = document.getElementById("efmase_bracket_pad_table").firstChild,
          g = 0;
        g < f.childNodes.length;
        g++
      ) {
        var h = f.childNodes[g].childNodes[0].firstChild;
        h.innerText != a[0] && h.innerHTML != a[0]
          ? h.classList.remove("efmase_bracket_panel_sel")
          : ((this.row = g),
            (this.col = 0),
            h.classList.add("efmase_bracket_panel_sel"));
        h = f.childNodes[g].childNodes[1].firstChild;
        h.innerText != a[1] && h.innerHTML != a[1]
          ? h.classList.remove("efmase_bracket_panel_sel")
          : h.classList.add("efmase_bracket_panel_sel");
      }
      b + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (b = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = b + "px";
      this.padWindow.style.top = d + "px";
      this.padWindow.style.display = "block";
      e.textboxHeight = e.textbox.style.height;
      e.textbox.style.height = 0;
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
    },
    hide: function () {
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var a = this.palette.editor;
      a.textbox.style.height = a.textboxHeight;
      a.hasFocus() ||
        (a.focus(), a.selection.hasSelection || a.cursor.showCursor());
      a.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
    },
    onSubmit: function (a) {
      var b = this.palette.editor,
        d = document.getElementsByClassName("efmase_bracket_panel_sel");
      2 != d.length && alert("Please select left bracket and right bracket");
      d =
        null === d[0].parentNode.nextSibling
          ? [d[1].innerHTML, d[0].innerHTML]
          : [d[0].innerHTML, d[1].innerHTML];
      "&nbsp;" == d[0] && (d[0] = "");
      "&nbsp;" == d[1] && (d[1] = "");
      "406" == this.padWindow.btnId
        ? ("" == d[0] && "" == d[1]) ||
          this.palette.handlePaletteBtnClick(b, d[0], d[1])
        : this.palette.updateBracket(this.padWindow.btnId, d[0], d[1]);
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(a);
      a.preventDefault();
      return !1;
    },
    onSelect: function (a, b, d) {
      for (var e = 0; e < this.bracketBtnTbody.childNodes.length; e++) {
        var f = this.bracketBtnTbody.childNodes[e].childNodes[b].firstChild;
        e != a && f.classList.contains("efmase_bracket_panel_sel")
          ? (f.classList.remove("efmase_bracket_panel_sel"),
            f.classList.contains("efmase_common_panel_hover") &&
              f.classList.remove("efmase_common_panel_hover"))
          : e != a ||
            f.classList.contains("efmase_bracket_panel_sel") ||
            (f.classList.add("efmase_bracket_panel_sel"),
            f.classList.contains("efmase_common_panel_hover") &&
              f.classList.remove("efmase_common_panel_hover"));
      }
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(d);
      d.preventDefault();
      return !1;
    },
    onkeydown: function (a) {
      if (9 == a.keyCode)
        return (
          this.clearKBNavi("bracket_panel_"),
          a.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 3),
          4 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("bracket_panel_", a),
          !1
        );
      if (13 == a.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(a),
              a.preventDefault(),
              !1)
            : this.onSubmit(a)
        );
      if (1 == this.keyboardNavi)
        switch (a.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    onkeypress: function (a) {
      if (1 == this.keyboardNavi && 32 == a.charCode)
        this.onSelect(this.row, this.col, a);
    },
    kbNaviMove: function (a) {
      if (1 == this.keyboardNavi) {
        var b = this.bracketBtnTbody.childNodes[this.row].childNodes[this.col]
          .firstChild;
        b.classList.contains("efmase_bracket_panel_sel") ||
          b.classList.remove("efmase_common_panel_hover");
        0 < this.col && "left" == a && this.col--;
        0 == this.col && "right" == a && this.col++;
        0 < this.row && "up" == a && this.row--;
        this.row < this.bracketBtnTbody.childNodes.length - 1 &&
          "down" == a &&
          this.row++;
        b = this.bracketBtnTbody.childNodes[this.row].childNodes[this.col]
          .firstChild;
        b.classList.contains("efmase_bracket_panel_sel") ||
          b.classList.add("efmase_common_panel_hover");
      }
      return !1;
    },
    setKBNavi: function (a, b) {
      if (1 != this.keyboardNavi) {
        var d = document.getElementById(a + this.keyboardNavi);
        d.focus();
        0 == this.keyboardNavi && d.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (a) {
      1 != this.keyboardNavi &&
        ((a = document.getElementById(a + this.keyboardNavi)),
        a.blur(),
        0 == this.keyboardNavi &&
          a.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.SizePanel = $extend(Object, {
    palette: null,
    padWindow: null,
    bracketBtnTbody: null,
    sizes: null,
    numRows: null,
    numCols: 2,
    row: -1,
    col: -1,
    titleElm: null,
    initialize: function (a, b, d) {
      this.palette = a;
      this.sizes = b;
      null !== d && void 0 !== d && (this.numCols = d);
      this.numRows = this.sizes.length / this.numCols;
    },
    getValue: function (a) {
      return this.sizes[a];
    },
    create: function (a) {
      var b = this,
        d = document.createElement("div");
      d.id = "efmase_size_pad";
      var e = document.createElement("div");
      d.appendChild(e);
      this.titleElm = e;
      var f = document.createElement("div");
      d.appendChild(f);
      e = document.createElement("table");
      e.id = "efmase_size_pad_table";
      f.appendChild(e);
      f = document.createElement("tbody");
      e.appendChild(f);
      for (var g = 0; g < this.numRows; g++) {
        for (
          var h = document.createElement("tr"), l = 0;
          l < this.numCols;
          l++
        ) {
          var m = this.sizes[g * this.numCols + l],
            t = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_bracket_pad_btn";
          btnDiv.innerHTML = m;
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (a, d) {
              return function (e) {
                return b.onSubmit(a[0], d[0], e);
              };
            })([g], [l])
          );
          t.appendChild(btnDiv);
          h.appendChild(t);
        }
        f.appendChild(h);
      }
      e.appendChild(f);
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        d,
        "mousedown",
        function (a) {
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      a.appendChild(d);
      this.padWindow = this.sizePad = d;
      this.sizeBtnTbody = f;
    },
    show: function (a, b, d, e) {
      this.col = this.row = -1;
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      null !== e &&
        void 0 !== e &&
        ((this.row = Math.floor(e / this.numCols)),
        (this.col = 1 == this.numCols ? 0 : e % this.numCols));
      document.getElementById("efmase_size_pad_table").style.display = "";
      document.getElementById("efmase_size_pad").style.left = b + "px";
      document.getElementById("efmase_size_pad").style.top = d + "px";
      e = this.palette.editor;
      e.blur();
      this.padWindow.btnId = a;
      this.titleElm.innerHTML =
        "&nbsp;&nbsp;" + e.pData.TITLES[a] + "&nbsp;&nbsp;";
      -1 !== this.row &&
        ((cell = this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
          .firstChild),
        cell.classList.add("efmase_common_panel_hover"));
      b + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (b = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = b + "px";
      this.padWindow.style.top = d + "px";
      this.padWindow.style.display = "block";
      e.textboxHeight = e.textbox.style.height;
      e.textbox.style.height = 0;
      this.palette.activePanel = this;
    },
    hide: function () {
      this.padWindow.btnId = "";
      this.padWindow.style.display = "none";
      var a = this.palette.editor;
      a.textbox.style.height = a.textboxHeight;
      a.hasFocus() ||
        (a.focus(), a.selection.hasSelection || a.cursor.showCursor());
      a.keyboardNavi = 4;
      a.redraw();
      this.palette.activePanel === this && (this.palette.activePanel = null);
      -1 !== this.row &&
        ((cell = this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
          .firstChild),
        cell.classList.remove("efmase_common_panel_hover"));
    },
    onSubmit: function (a, b, d) {
      if (0 <= a && 0 <= b) {
        var e = this.sizeBtnTbody.childNodes[a].childNodes[b].firstChild;
        e.classList.remove("efmase_common_panel_hover");
        this.palette.execPalCmd(
          this.palette.symbols[this.padWindow.btnId],
          e.innerHTML,
          a * this.numCols + b
        );
      }
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(d);
      d.preventDefault();
      return !1;
    },
    onkeydown: function (a) {
      if (13 == a.keyCode) return this.onSubmit(this.row, this.col, a);
      switch (a.keyCode) {
        case 37:
          return this.kbNaviMove("left"), !1;
        case 38:
          return this.kbNaviMove("up"), !1;
        case 39:
          return this.kbNaviMove("right"), !1;
        case 40:
          return this.kbNaviMove("down"), !1;
      }
    },
    onkeypress: function (a) {
      return !1;
    },
    kbNaviMove: function (a) {
      if (-1 == this.row && -1 == this.col) this.col = this.row = 0;
      else {
        var b = this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
          .firstChild;
        b.classList.contains("efmase_common_panel_hover") &&
          b.classList.remove("efmase_common_panel_hover");
        0 < this.col && "left" == a && this.col--;
        this.col < this.numCols - 1 && "right" == a && this.col++;
        0 < this.row && "up" == a && this.row--;
        this.row < this.sizeBtnTbody.childNodes.length - 1 &&
          "down" == a &&
          this.row++;
      }
      b = this.sizeBtnTbody.childNodes[this.row].childNodes[this.col]
        .firstChild;
      b.classList.add("efmase_common_panel_hover");
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.ColorPanel = $extend(Object, {
    palette: null,
    padWindow: null,
    oCancel: null,
    keyboardNavi: 1,
    colorCodeInput: null,
    colorBtnTbody: null,
    row: 0,
    col: 0,
    curRow: 0,
    curCol: 0,
    titleElm: null,
    initialize: function (a) {
      this.palette = a;
    },
    create: function (a) {
      var b = this,
        d = this.palette.editor,
        e = document.createElement("div");
      e.id = "efmase_color_pad";
      e.style.display = "none";
      var f = document.createElement("div");
      e.appendChild(f);
      var g = document.createElement("span");
      f.appendChild(g);
      this.titleElm = g;
      oClose = document.createElement("span");
      f.appendChild(oClose);
      oClose.id = "color_panel_0";
      oClose.className = "efmase_panel_close";
      oClose.innerHTML = "x";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        oClose,
        "mousedown",
        function (a) {
          b.hide();
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
          a.preventDefault();
          return !1;
        }
      );
      var h = document.createElement("div");
      e.appendChild(h);
      f = document.createElement("table");
      f.id = "efmase_color_pad_table";
      h.appendChild(f);
      g = document.createElement("table");
      h.appendChild(g);
      var l = document.createElement("tbody");
      g.appendChild(l);
      var m = document.createElement("tr"),
        g = document.createElement("td");
      g.className = "efmase_pad_label";
      g.innerHTML = d.pData.TITLES["2202"];
      m.appendChild(g);
      var t = document.createElement("td");
      m.appendChild(t);
      g = document.createElement("input");
      g.className = "efmase_pad_input";
      g.id = "color_panel_2";
      g.value = "#000000";
      g.row = 0;
      g.col = 0;
      g.style.width = "80px";
      g.type = "text";
      g.title = "Input color code, like #00000";
      org.imatheq.formulaeditor.FormulaEditor.addEventListener(
        g,
        "focus",
        function (a) {
          b.keyboardNavi = 2;
          org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        }
      );
      t.appendChild(g);
      l.appendChild(m);
      l = document.createElement("div");
      l.style.zindex = "500";
      h.appendChild(l);
      h = document.createElement("input");
      h.type = "button";
      h.value = d.pData.TITLES["2200"];
      h.id = "color_panel_3";
      l.appendChild(h);
      h.onclick = function (a) {
        b.onSubmit(a);
        b.hide();
        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        a.preventDefault();
        return !1;
      };
      h = document.createElement("input");
      h.type = "button";
      h.value = d.pData.TITLES["2201"];
      h.id = "color_panel_4";
      l.appendChild(h);
      h.onclick = function (a) {
        b.hide();
        org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(a);
        a.preventDefault();
        return !1;
      };
      d = document.createElement("tbody");
      f.appendChild(d);
      for (l = 0; 8 > l; l++) {
        3 > l &&
          ((m = document.createElement("tr")),
          d.appendChild(m),
          (t = document.createElement("td")),
          (t.height = "5px"),
          m.appendChild(t));
        for (var m = document.createElement("tr"), k = 0; 10 > k; k++) {
          t = document.createElement("td");
          btnDiv = document.createElement("div");
          btnDiv.className = "efmase_pad_btn";
          btnDiv.id = "efmase_color_" + l + "_" + k;
          var n = org.imatheq.formulaeditor.color_palette[l][k].rgb;
          btnDiv.style.backgroundColor =
            "rgb(" +
            n[0].toString() +
            "," +
            n[1].toString() +
            "," +
            n[2].toString() +
            ")";
          org.imatheq.formulaeditor.FormulaEditor.addEventListener(
            btnDiv,
            "mousedown",
            (function (a, d) {
              return function (e) {
                var f = org.imatheq.formulaeditor.color_palette[d[0]][a[0]].rgb;
                b.colorCodeInput.value =
                  "#" +
                  ("0" + f[0].toString(16)).slice(-2) +
                  ("0" + f[1].toString(16)).slice(-2) +
                  ("0" + f[2].toString(16)).slice(-2);
                b.onSubmit(e);
                b.hide();
                org.imatheq.formulaeditor.FormulaEditor.stopEventPropagation(e);
                e.preventDefault();
                return !1;
              };
            })([k], [l])
          );
          t.appendChild(btnDiv);
          m.appendChild(t);
        }
        d.appendChild(m);
      }
      f.appendChild(d);
      a.appendChild(e);
      this.padWindow = e;
      this.colorCodeInput = g;
      this.oCancel = h;
      this.colorBtnTbody = d;
    },
    show: function (a, b, d) {
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      document.getElementById("efmase_color_pad_table").style.display = "";
      document.getElementById("efmase_color_pad").style.left = a + "px";
      document.getElementById("efmase_color_pad").style.top = b + "px";
      d = this.palette.editor;
      this.titleElm.innerHTML =
        "&nbsp;&nbsp;" + d.pData.TITLES["106"] + "&nbsp;&nbsp;";
      this.colorCodeInput.value = d.getMathColor();
      this.hlightColorBtn();
      a + this.padWindow.offsetWidth > parseInt(window.innerWidth) &&
        (a = parseInt(window.innerWidth) - this.padWindow.offsetWidth);
      this.padWindow.style.left = a + "px";
      this.padWindow.style.top = b + "px";
      this.padWindow.style.display = "block";
      d.blur();
      d.textboxHeight = d.textbox.style.height;
      d.textbox.style.height = 0;
      this.palette.activePanel = this;
      this.keyboardNavi = 1;
    },
    hide: function () {
      this.colorCodeInput.blur();
      this.padWindow.style.display = "none";
      var a = this.palette.editor;
      a.textbox.style.height = a.textboxHeight;
      a.hasFocus() || a.focus();
      a.selection.hasSelection || a.cursor.showCursor();
      a.redraw();
      a.keyboardNavi = 4;
      this.palette.activePanel === this && (this.palette.activePanel = null);
    },
    onSubmit: function (a) {
      var b = this.colorCodeInput.value,
        d = org.imatheq.formulaeditor.presentation,
        e = { mathcolor: b },
        f = this.palette.editor;
      if (f.selection.hasSelection) f.selection.setSelSymbFontAttrbs(e);
      else {
        var g = f.cursor.position.row.children[f.cursor.position.index];
        g instanceof d.BlockSymbol && g.setSymbFontAttrbs(e);
      }
      f.setButtonStatus({ mathcolor: b });
      this.hide();
      org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(a);
      a.preventDefault();
      return !1;
    },
    hlightColorBtn: function () {
      var a = parseInt(this.colorCodeInput.value.slice(1), 16),
        b = (a >> 16) & 255,
        d = (a >> 8) & 255,
        a = a & 255,
        e = document.getElementById(
          "efmase_color_" + this.row + "_" + this.col
        );
      null !== e &&
        void 0 !== e &&
        (e.parentNode.classList.remove("efmase_color_pad_table_sel"),
        (this.col = this.row = 255));
      for (e = 0; 8 > e; e++)
        for (var f = 0; 10 > f; f++) {
          var g = org.imatheq.formulaeditor.color_palette[e][f].rgb;
          if (g[0] == b && g[1] == d && g[2] == a) {
            document
              .getElementById("efmase_color_" + e + "_" + f)
              .parentNode.classList.add("efmase_color_pad_table_sel");
            this.row = e;
            this.col = f;
            this.curRow = e;
            this.curCol = f;
            break;
          }
        }
    },
    setMathcolor: function () {
      (null !== this.padWindow && void 0 !== this.padWindow) ||
        this.create(this.palette.container);
      this.colorCodeInput.value = colorCode;
      this.hlightColorBtn();
    },
    getMathcolor: function () {
      return null === this.padWindow || void 0 === this.padWindow
        ? "#000000"
        : this.colorCodeInput.value;
    },
    onkeydown: function (a) {
      if (9 == a.keyCode)
        return (
          this.clearKBNavi("color_panel_"),
          a.shiftKey
            ? --this.keyboardNavi
            : (this.keyboardNavi = ++this.keyboardNavi),
          -1 == this.keyboardNavi && (this.keyboardNavi = 4),
          5 == this.keyboardNavi && (this.keyboardNavi = 0),
          this.setKBNavi("color_panel_", a),
          !1
        );
      if (13 == a.keyCode)
        return (
          (activeElm = document.activeElement),
          ("input" == activeElm.localName.toLowerCase() &&
            "cancel" == activeElm.value.toLowerCase()) ||
          ("span" == activeElm.localName.toLowerCase() &&
            "x" == activeElm.value.toLowerCase())
            ? (this.hide(),
              org.imatheq.formulaeditor.FormulaEditor.eventPreventDefault(a),
              a.preventDefault(),
              !1)
            : this.onSubmit(a)
        );
      if (
        1 == this.keyboardNavi &&
        "color_panel_2" != document.activeElement.id
      )
        switch (a.keyCode) {
          case 37:
            return this.kbNaviMove("left"), !1;
          case 38:
            return this.kbNaviMove("up"), !1;
          case 39:
            return this.kbNaviMove("right"), !1;
          case 40:
            return this.kbNaviMove("down"), !1;
        }
    },
    onkeypress: function (a) {},
    kbNaviMove: function (a) {
      if (1 == this.keyboardNavi) {
        var b = org.imatheq.formulaeditor.color_palette.length,
          d = org.imatheq.formulaeditor.color_palette[0].length,
          e = 3 > this.row ? 2 * this.row + 1 : this.row + 3,
          e = this.colorBtnTbody.childNodes[e].childNodes[this.col];
        e.classList.remove("efmase_color_pad_table_sel");
        0 < this.col && "left" == a && this.col--;
        this.col < d - 1 && "right" == a && this.col++;
        0 < this.row && "up" == a && this.row--;
        this.row < b - 1 && "down" == a && this.row++;
        e = 3 > this.row ? 2 * this.row + 1 : this.row + 3;
        e = this.colorBtnTbody.childNodes[e].childNodes[this.col];
        e.classList.contains("efmase_color_pad_table_sel") ||
          e.classList.add("efmase_color_pad_table_sel");
        a = org.imatheq.formulaeditor.color_palette[this.row][this.col].rgb;
        this.colorCodeInput.value =
          "#" +
          ("0" + a[0].toString(16)).slice(-2) +
          ("0" + a[1].toString(16)).slice(-2) +
          ("0" + a[2].toString(16)).slice(-2);
      }
      return !1;
    },
    setKBNavi: function (a, b) {
      if (1 != this.keyboardNavi) {
        var d = document.getElementById(a + this.keyboardNavi);
        d.focus();
        0 == this.keyboardNavi && d.classList.add("efmase_panel_close_hover");
      }
      return !1;
    },
    clearKBNavi: function (a) {
      1 != this.keyboardNavi &&
        ((a = document.getElementById(a + this.keyboardNavi)),
        a.blur(),
        0 == this.keyboardNavi &&
          a.classList.remove("efmase_panel_close_hover"));
      return !1;
    },
  });
})();
(function () {
  org.imatheq.formulaeditor.presentation.BevelledFraction = $extend(
    org.imatheq.formulaeditor.presentation.Node,
    {
      slowDelete: !0,
      draw: function (a, b, d, e, f) {
        var g,
          h,
          l,
          m = 1,
          t = 2;
        e =
          this.parent instanceof org.imatheq.formulaeditor.presentation.Row &&
          0 < this.index
            ? this.parent.children[this.index - 1].dimensions
            : a.getXDimentions(b, d, e);
        e = e.top + e.height / 2;
        d = Math.round(d);
        e = Math.round(e);
        var k = 0;
        void 0 !== b.fontSizeModifier &&
          null !== b.fontSizeModifier &&
          (k = b.fontSizeModifier);
        var n = a.getFontSizeIdx(k),
          k = { fontSizeModifier: k };
        for (l in b) k[l] = b[l];
        8 < n && (m = 2);
        6 > n && (t = 1);
        this.children[1].draw(a, b, 0, 0, !0);
        g = this.children[1].dimensions.height;
        this.children[0].draw(a, k, 0, 0, !0);
        h = this.children[0].dimensions.height;
        slashDims = {
          left: d,
          top: e,
          width: Math.round(0.4 * (g + h)),
          height: g + h,
        };
        l = slashDims.height;
        var p = l / 2,
          n = 0,
          n = Math.min(
            0,
            slashDims.width - 0.4 * h - (this.children[0].dimensions.width + t)
          );
        leftXAdjust = Math.max(
          0,
          slashDims.width - 0.4 * h - (this.children[0].dimensions.width + t)
        );
        var r = 0,
          r = Math.min(
            0,
            slashDims.width - 0.4 * g - (this.children[1].dimensions.width + t)
          );
        middleXAdjust = 0.4 * g + t;
        +Math.max(0, 0.4 * h - this.children[1].dimensions.width - t);
        this.dimensions = {
          height: l,
          width: slashDims.width + -n - r,
          left: d,
          top: e - slashDims.height / 2,
        };
        this.children[0].draw(
          a,
          k,
          d - this.children[0].dimensions.left + leftXAdjust,
          e +
            p -
            (l - this.children[0].dimensions.height) -
            (this.children[0].dimensions.top +
              this.children[0].dimensions.height),
          f
        );
        this.children[1].draw(
          a,
          b,
          d - n + middleXAdjust,
          e +
            p -
            (this.children[1].dimensions.top +
              this.children[1].dimensions.height),
          f
        );
        f ||
          ((a = a.getContext()),
          a.save(),
          (a.strokeStyle = this.mathcolor),
          (a.lineWidth = m),
          a.beginPath(),
          a.moveTo(d - n + slashDims.width, this.dimensions.top),
          a.lineTo(d - n, this.dimensions.top + l),
          a.stroke(),
          a.closePath(),
          a.restore());
        return this.dimensions;
      },
      functionsFromRow: ["getFirstCursorPosition", "getLastCursorPosition"],
      getCursorPosition: function (a, b, d) {
        return b > this.dimensions.left &&
          b < this.dimensions.left + this.dimensions.width - 1
          ? ((right_dim = this.children[1].dimensions),
            b < right_dim.left
              ? this.children[0].getCursorPosition(a, b, d)
              : this.children[1].getCursorPosition(a, b, d))
          : b <= this.dimensions.left
          ? null === this.parent || void 0 === this.parent
            ? null
            : this.parent.getPrecedingCursorPosition(a, this.index + 1, !1)
          : this.parent.getFollowingCursorPosition(a, this.index, !1);
      },
      getFollowingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return this.children[0].getFollowingCursorPosition(a, null, d);
        var e = null;
        if (0 === b)
          if (d) e = this.children[1].getFollowingCursorPosition(a, null, d);
          else return { row: this.children[1], index: 0 };
        return null === e && null !== this.parent
          ? this.parent.getFollowingCursorPosition(a, this.index, !1)
          : e;
      },
      getPrecedingCursorPosition: function (a, b, d) {
        if (null === d || void 0 === d) d = !0;
        if (null === b || void 0 === b)
          return this.children[1].getPrecedingCursorPosition(a, null, d);
        var e = null;
        if (1 == b)
          if (d) e = this.children[0].getLastCursorPosition(a, null, d);
          else
            return {
              row: this.children[0],
              index: this.children[0].children.length,
            };
        return null === e && null !== this.parent
          ? { row: this.parent, index: this.index }
          : e;
      },
      getLowerCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === b || void 0 === b)
          return this.children[0].getLowerCursorPosition(a, null, d, e);
        var f = null;
        if (0 === b)
          if (e) f = this.children[1].getLowerCursorPosition(a, null, d, e);
          else return { row: this.moddle, index: 0 };
        return null === f && null !== this.parent
          ? this.parent.getLowerCursorPosition(a, this.index, d, !1)
          : f;
      },
      getHigherCursorPosition: function (a, b, d, e) {
        if (null === e || void 0 === e) e = !0;
        if (null === b || void 0 === b)
          return this.children[1].getHigherCursorPosition(a, null, d, e);
        var f = null;
        if (1 === b)
          if (e) f = this.children[0].getHigherCursorPosition(a, null, d, e);
          else return { row: this.moddle, index: 0 };
        return null === f && null !== this.parent
          ? this.parent.getHigherCursorPosition(a, this.index, d, !1)
          : f;
      },
      initialize: function () {
        0 < arguments.length
          ? ((this.children = []),
            this.children.push(arguments[0]),
            this.children.push(arguments[1]))
          : (this.children = []);
        for (
          var a = new org.imatheq.formulaeditor.presentation.Row(),
            b = this.functionsFromRow.length - 1;
          0 <= b;
          b--
        )
          this[this.functionsFromRow[b]] ||
            (this[this.functionsFromRow[b]] = a[this.functionsFromRow[b]]);
        this.updateChildren();
      },
      copy: function () {
        return 2 == this.children.length
          ? this.clone(this.children[0].copy(), this.children[1].copy())
          : this.clone();
      },
      getMathML: function () {
        return (
          '<mfrac bevelled="true"' +
          (null === this.mathcolor ||
          "" == this.mathcolor ||
          "null" == this.mathcolor ||
          "#000000" == this.mathcolor
            ? ""
            : ' mathcolor="' + this.mathcolor + '"') +
          ">" +
          this.children[0].getMathML(!0) +
          this.children[1].getMathML(!0) +
          "</mfrac>"
        );
      },
    }
  );
})();
(function () {
  org.imatheq.formulaeditor.color_palette = [
    [
      { t: "black", rgb: [0, 0, 0] },
      { t: "dark gray 4", rgb: [67, 67, 67] },
      { t: "dark gray 3", rgb: [102, 102, 102] },
      { t: "dark gray 2", rgb: [153, 153, 153] },
      { t: "dark gray 1", rgb: [183, 183, 183] },
      { t: "gray", rgb: [204, 204, 204] },
      { t: "light gray 1", rgb: [217, 217, 217] },
      { t: "light gray 2", rgb: [239, 239, 239] },
      { t: "light gray 3", rgb: [243, 243, 243] },
      { t: "white", rgb: [255, 255, 255] },
    ],
    [
      { t: "red berry", rgb: [152, 0, 0] },
      { t: "red", rgb: [255, 0, 0] },
      { t: "orange", rgb: [255, 153, 0] },
      { t: "yellow", rgb: [255, 255, 0] },
      { t: "green", rgb: [0, 255, 0] },
      { t: "cyan", rgb: [0, 255, 255] },
      { t: "cornflower blue", rgb: [74, 134, 232] },
      { t: "blue", rgb: [0, 0, 255] },
      { t: "purple", rgb: [153, 0, 255] },
      { t: "magenta", rgb: [255, 0, 255] },
    ],
    [
      { t: "light red berry 3", rgb: [230, 184, 175] },
      { t: "light red 3", rgb: [244, 204, 204] },
      { t: "light orange 3", rgb: [252, 229, 205] },
      { t: "light yellow 3", rgb: [255, 242, 204] },
      { t: "light green 3", rgb: [217, 234, 211] },
      { t: "light cyan 3", rgb: [208, 224, 227] },
      { t: "light cornflower blue 3", rgb: [201, 218, 248] },
      { t: "light blue 3", rgb: [207, 226, 243] },
      { t: "light purple 3", rgb: [217, 210, 233] },
      { t: "light magenta 3", rgb: [234, 209, 220] },
    ],
    [
      { t: "light red berry 2", rgb: [221, 126, 107] },
      { t: "light red 2", rgb: [234, 153, 153] },
      { t: "light orange 2", rgb: [249, 203, 156] },
      { t: "light yellow 2", rgb: [255, 229, 153] },
      { t: "light green 2", rgb: [182, 215, 168] },
      { t: "light cyan 2", rgb: [162, 196, 201] },
      { t: "light cornflower blue 2", rgb: [164, 194, 244] },
      { t: "light blue 2", rgb: [159, 197, 232] },
      { t: "light purple 2", rgb: [180, 167, 214] },
      { t: "light magenta 2", rgb: [213, 166, 189] },
    ],
    [
      { t: "light red berry 1", rgb: [204, 65, 37] },
      { t: "light red 1", rgb: [224, 102, 102] },
      { t: "light orange 1", rgb: [246, 178, 107] },
      { t: "light yellow 1", rgb: [255, 217, 102] },
      { t: "light green 1", rgb: [147, 196, 125] },
      { t: "light cyan 1", rgb: [118, 165, 175] },
      { t: "light cornflower blue 1", rgb: [109, 158, 235] },
      { t: "light blue 1", rgb: [111, 168, 220] },
      { t: "light purple 1", rgb: [142, 124, 195] },
      { t: "light magenta 1", rgb: [194, 123, 160] },
    ],
    [
      { t: "dark red berry 1", rgb: [166, 28, 0] },
      { t: "dark red 1", rgb: [204, 0, 0] },
      { t: "dark orange 1", rgb: [230, 145, 56] },
      { t: "dark yellow 1", rgb: [241, 194, 50] },
      { t: "dark green 1", rgb: [106, 168, 79] },
      { t: "dark cyan 1", rgb: [69, 129, 142] },
      { t: "dark cornflower blue 1", rgb: [60, 120, 216] },
      { t: "dark blue 1", rgb: [61, 133, 198] },
      { t: "dark purple 1", rgb: [103, 78, 167] },
      { t: "dark magenta 1", rgb: [166, 77, 121] },
    ],
    [
      { t: "dark red berry 2", rgb: [133, 32, 12] },
      { t: "dark red 2", rgb: [153, 0, 0] },
      { t: "dark orange 2", rgb: [180, 95, 6] },
      { t: "dark yellow 2", rgb: [191, 144, 0] },
      { t: "dark green 2", rgb: [56, 118, 29] },
      { t: "dark cyan 2", rgb: [19, 79, 92] },
      { t: "dark cornflower blue 2", rgb: [17, 85, 204] },
      { t: "dark blue 2", rgb: [11, 83, 148] },
      { t: "dark purple 2", rgb: [53, 28, 117] },
      { t: "dark magenta 2", rgb: [116, 27, 71] },
    ],
    [
      { t: "dark red berry 3", rgb: [91, 15, 0] },
      { t: "dark red 3", rgb: [102, 0, 0] },
      { t: "dark orange 3", rgb: [120, 63, 4] },
      { t: "dark yellow 3", rgb: [127, 96, 0] },
      { t: "dark green 3", rgb: [39, 78, 19] },
      { t: "dark cyan 3", rgb: [12, 52, 61] },
      { t: "dark cornflower blue 3", rgb: [28, 69, 135] },
      { t: "dark blue 3", rgb: [7, 55, 99] },
      { t: "dark purple 3", rgb: [32, 18, 77] },
      { t: "dark magenta 3", rgb: [76, 17, 48] },
    ],
  ];
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.KeywordList = {
    arccos: { type: "f", fix: "i" },
    arccosh: { type: "f", fix: "i" },
    arccot: { type: "f", fix: "i" },
    arccoth: { type: "f", fix: "i" },
    arccsc: { type: "f", fix: "i" },
    arccsch: { type: "f", fix: "i" },
    arcsec: { type: "f", fix: "i" },
    arcsech: { type: "f", fix: "i" },
    arcsin: { type: "f", fix: "i" },
    arcsinh: { type: "f", fix: "i" },
    arctan: { type: "f", fix: "i" },
    arctanh: { type: "f", fix: "i" },
    cos: { type: "f", fix: "i" },
    cosh: { type: "f", fix: "i" },
    cot: { type: "f", fix: "i" },
    coth: { type: "f", fix: "i" },
    csc: { type: "f", fix: "i" },
    csch: { type: "f", fix: "i" },
    exp: { type: "f", fix: "i" },
    ln: { type: "f", fix: "i" },
    log: { type: "f", fix: "i" },
    sec: { type: "f", fix: "i" },
    sech: { type: "f", fix: "i" },
    sin: { type: "f", fix: "i" },
    sinh: { type: "f", fix: "i" },
    tan: { type: "f", fix: "i" },
    tanh: { type: "f", fix: "i" },
  };
})();
(function () {
  org.imatheq.formulaeditor.parsing.expression.MOList = {
    " ": {
      0: null,
      1: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      2: null,
    },
    "\u00a0": {
      0: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      1: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
      2: { gl: " ", nm: "space", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "'": {
      0: null,
      1: null,
      2: { gl: "'", nm: "apostrophe", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "-": {
      0: { gl: "-", nm: "hyphen-minus", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "-", nm: "hyphen-minus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "--": {
      0: null,
      1: null,
      2: {
        gl: "--",
        nm: "multiple character operator: --",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "!": {
      0: null,
      1: null,
      2: { gl: "!", nm: "exclamation mark", pr: 810, ls: 1, rs: 0, pp: "" },
    },
    "!!": {
      0: null,
      1: null,
      2: {
        gl: "!!",
        nm: "multiple character operator: !!",
        pr: 810,
        ls: 1,
        rs: 0,
        pp: "",
      },
    },
    "!=": {
      0: null,
      1: {
        gl: "!=",
        nm: "multiple character operator: !=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "%": {
      0: null,
      1: { gl: "%", nm: "percent sign", pr: 640, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2030": {
      0: null,
      1: { gl: "\u2030", nm: "permille sign", pr: 640, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2016": {
      0: {
        gl: "\u2016",
        nm: "double vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
      1: null,
      2: {
        gl: "\u2016",
        nm: "double vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
    },
    "\u2018": {
      0: {
        gl: "\u2018",
        nm: "left single quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
      1: null,
      2: null,
    },
    "\u2019": {
      0: null,
      1: null,
      2: {
        gl: "\u2019",
        nm: "right single quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
    },
    "\u201a": {
      0: null,
      1: null,
      2: {
        gl: "\u201a",
        nm: "single low-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201b": {
      0: null,
      1: null,
      2: {
        gl: "\u201b",
        nm: "single high-reversed-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201c": {
      0: {
        gl: "\u201c",
        nm: "left double quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
      1: null,
      2: null,
    },
    "\u201d": {
      0: null,
      1: null,
      2: {
        gl: "\u201d",
        nm: "right double quotation mark",
        pr: 10,
        ls: 0,
        rs: 0,
        pp: "fence",
      },
    },
    "\u201e": {
      0: null,
      1: null,
      2: {
        gl: "\u201e",
        nm: "double low-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u201f": {
      0: null,
      1: null,
      2: {
        gl: "\u201f",
        nm: "double high-reversed-9 quotation mark",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2022": {
      0: null,
      1: { gl: "\u2022", nm: "bullet", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2026": {
      0: null,
      1: {
        gl: "\u2026",
        nm: "horizontal ellipsis",
        pr: 150,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2032": {
      0: null,
      1: null,
      2: { gl: "\u2032", nm: "prime", pr: 800, ls: 0, rs: 0, pp: "" },
    },
    "\u2033": {
      0: null,
      1: null,
      2: {
        gl: "\u2033",
        nm: "double prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2034": {
      0: null,
      1: null,
      2: {
        gl: "\u2034",
        nm: "triple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2035": {
      0: null,
      1: null,
      2: {
        gl: "\u2035",
        nm: "reversed prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2036": {
      0: null,
      1: null,
      2: {
        gl: "\u2036",
        nm: "reversed double prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2037": {
      0: null,
      1: null,
      2: {
        gl: "\u2037",
        nm: "reversed triple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u203e": {
      0: null,
      1: null,
      2: {
        gl: "\u203e",
        nm: "overline",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u2043": {
      0: null,
      1: { gl: "\u2043", nm: "hyphen bullet", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2044": {
      0: null,
      1: {
        gl: "\u2044",
        nm: "fraction slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2057": {
      0: null,
      1: null,
      2: {
        gl: "\u2057",
        nm: "quadruple prime",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2061": {
      0: null,
      1: {
        gl: "&#x2061;",
        nm: "\u2061function application",
        pr: 850,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2062": {
      0: null,
      1: {
        gl: "&#x2062;",
        nm: "\u2062invisible times",
        pr: 390,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u2063": {
      0: null,
      1: {
        gl: "&#x2063;",
        nm: "\u2063invisible separator",
        pr: 40,
        ls: 0,
        rs: 0,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    "\u2064": {
      0: null,
      1: {
        gl: "&#x2064;",
        nm: "\u2064invisible plus",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u20db": {
      0: null,
      1: null,
      2: {
        gl: "\u20db",
        nm: "combining three dots above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u20dc": {
      0: null,
      1: null,
      2: {
        gl: "\u20dc",
        nm: "combining four dots above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u2145": {
      0: {
        gl: "\u2145",
        nm: "double-struck italic capital d",
        pr: 845,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2146": {
      0: {
        gl: "\u2146",
        nm: "double-struck italic small d",
        pr: 845,
        ls: 2,
        rs: 0,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2190": {
      0: null,
      1: {
        gl: "\u2190",
        nm: "leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2191": {
      0: null,
      1: {
        gl: "\u2191",
        nm: "upwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2192": {
      0: null,
      1: {
        gl: "\u2192",
        nm: "rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2193": {
      0: null,
      1: {
        gl: "\u2193",
        nm: "downwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2194": {
      0: null,
      1: {
        gl: "\u2194",
        nm: "left right arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2195": {
      0: null,
      1: {
        gl: "\u2195",
        nm: "up down arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2196": {
      0: null,
      1: {
        gl: "\u2196",
        nm: "north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2197": {
      0: null,
      1: {
        gl: "\u2197",
        nm: "north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2198": {
      0: null,
      1: {
        gl: "\u2198",
        nm: "south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2199": {
      0: null,
      1: {
        gl: "\u2199",
        nm: "south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u219a": {
      0: null,
      1: {
        gl: "\u219a",
        nm: "leftwards arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u219b": {
      0: null,
      1: {
        gl: "\u219b",
        nm: "rightwards arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u219c": {
      0: null,
      1: {
        gl: "\u219c",
        nm: "leftwards wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219d": {
      0: null,
      1: {
        gl: "\u219d",
        nm: "rightwards wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219e": {
      0: null,
      1: {
        gl: "\u219e",
        nm: "leftwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u219f": {
      0: null,
      1: {
        gl: "\u219f",
        nm: "upwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a0": {
      0: null,
      1: {
        gl: "\u21a0",
        nm: "rightwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a1": {
      0: null,
      1: {
        gl: "\u21a1",
        nm: "downwards two headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a2": {
      0: null,
      1: {
        gl: "\u21a2",
        nm: "leftwards arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a3": {
      0: null,
      1: {
        gl: "\u21a3",
        nm: "rightwards arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a4": {
      0: null,
      1: {
        gl: "\u21a4",
        nm: "leftwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a5": {
      0: null,
      1: {
        gl: "\u21a5",
        nm: "upwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a6": {
      0: null,
      1: {
        gl: "\u21a6",
        nm: "rightwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21a7": {
      0: null,
      1: {
        gl: "\u21a7",
        nm: "downwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a8": {
      0: null,
      1: {
        gl: "\u21a8",
        nm: "up down arrow with base",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21a9": {
      0: null,
      1: {
        gl: "\u21a9",
        nm: "leftwards arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21aa": {
      0: null,
      1: {
        gl: "\u21aa",
        nm: "rightwards arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ab": {
      0: null,
      1: {
        gl: "\u21ab",
        nm: "leftwards arrow with loop",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ac": {
      0: null,
      1: {
        gl: "\u21ac",
        nm: "rightwards arrow with loop",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ad": {
      0: null,
      1: {
        gl: "\u21ad",
        nm: "left right wave arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ae": {
      0: null,
      1: {
        gl: "\u21ae",
        nm: "left right arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21af": {
      0: null,
      1: {
        gl: "\u21af",
        nm: "downwards zigzag arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b0": {
      0: null,
      1: {
        gl: "\u21b0",
        nm: "upwards arrow with tip leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b1": {
      0: null,
      1: {
        gl: "\u21b1",
        nm: "upwards arrow with tip rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b2": {
      0: null,
      1: {
        gl: "\u21b2",
        nm: "downwards arrow with tip leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b3": {
      0: null,
      1: {
        gl: "\u21b3",
        nm: "downwards arrow with tip rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b4": {
      0: null,
      1: {
        gl: "\u21b4",
        nm: "rightwards arrow with corner downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b5": {
      0: null,
      1: {
        gl: "\u21b5",
        nm: "downwards arrow with corner leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21b6": {
      0: null,
      1: {
        gl: "\u21b6",
        nm: "anticlockwise top semicircle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21b7": {
      0: null,
      1: {
        gl: "\u21b7",
        nm: "clockwise top semicircle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21b8": {
      0: null,
      1: {
        gl: "\u21b8",
        nm: "north west arrow to long bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21b9": {
      0: null,
      1: {
        gl: "\u21b9",
        nm: "leftwards arrow to bar over rightwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ba": {
      0: null,
      1: {
        gl: "\u21ba",
        nm: "anticlockwise open circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21bb": {
      0: null,
      1: {
        gl: "\u21bb",
        nm: "clockwise open circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21bc": {
      0: null,
      1: {
        gl: "\u21bc",
        nm: "leftwards harpoon with barb upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21bd": {
      0: null,
      1: {
        gl: "\u21bd",
        nm: "leftwards harpoon with barb downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21be": {
      0: null,
      1: {
        gl: "\u21be",
        nm: "upwards harpoon with barb rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21bf": {
      0: null,
      1: {
        gl: "\u21bf",
        nm: "upwards harpoon with barb leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c0": {
      0: null,
      1: {
        gl: "\u21c0",
        nm: "rightwards harpoon with barb upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c1": {
      0: null,
      1: {
        gl: "\u21c1",
        nm: "rightwards harpoon with barb downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c2": {
      0: null,
      1: {
        gl: "\u21c2",
        nm: "downwards harpoon with barb rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c3": {
      0: null,
      1: {
        gl: "\u21c3",
        nm: "downwards harpoon with barb leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c4": {
      0: null,
      1: {
        gl: "\u21c4",
        nm: "rightwards arrow over leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c5": {
      0: null,
      1: {
        gl: "\u21c5",
        nm: "upwards arrow leftwards of downwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c6": {
      0: null,
      1: {
        gl: "\u21c6",
        nm: "leftwards arrow over rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c7": {
      0: null,
      1: {
        gl: "\u21c7",
        nm: "leftwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21c8": {
      0: null,
      1: {
        gl: "\u21c8",
        nm: "upwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21c9": {
      0: null,
      1: {
        gl: "\u21c9",
        nm: "rightwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ca": {
      0: null,
      1: {
        gl: "\u21ca",
        nm: "downwards paired arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21cb": {
      0: null,
      1: {
        gl: "\u21cb",
        nm: "leftwards harpoon over rightwards harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21cc": {
      0: null,
      1: {
        gl: "\u21cc",
        nm: "rightwards harpoon over leftwards harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21cd": {
      0: null,
      1: {
        gl: "\u21cd",
        nm: "leftwards double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21ce": {
      0: null,
      1: {
        gl: "\u21ce",
        nm: "left right double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21cf": {
      0: null,
      1: {
        gl: "\u21cf",
        nm: "rightwards double arrow with stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21d0": {
      0: null,
      1: {
        gl: "\u21d0",
        nm: "leftwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d1": {
      0: null,
      1: {
        gl: "\u21d1",
        nm: "upwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d2": {
      0: null,
      1: {
        gl: "\u21d2",
        nm: "rightwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d3": {
      0: null,
      1: {
        gl: "\u21d3",
        nm: "downwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d4": {
      0: null,
      1: {
        gl: "\u21d4",
        nm: "left right double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21d5": {
      0: null,
      1: {
        gl: "\u21d5",
        nm: "up down double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d6": {
      0: null,
      1: {
        gl: "\u21d6",
        nm: "north west double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d7": {
      0: null,
      1: {
        gl: "\u21d7",
        nm: "north east double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d8": {
      0: null,
      1: {
        gl: "\u21d8",
        nm: "south east double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21d9": {
      0: null,
      1: {
        gl: "\u21d9",
        nm: "south west double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21da": {
      0: null,
      1: {
        gl: "\u21da",
        nm: "leftwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21db": {
      0: null,
      1: {
        gl: "\u21db",
        nm: "rightwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21dc": {
      0: null,
      1: {
        gl: "\u21dc",
        nm: "leftwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21dd": {
      0: null,
      1: {
        gl: "\u21dd",
        nm: "rightwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21de": {
      0: null,
      1: {
        gl: "\u21de",
        nm: "upwards arrow with double stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21df": {
      0: null,
      1: {
        gl: "\u21df",
        nm: "downwards arrow with double stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21e0": {
      0: null,
      1: {
        gl: "\u21e0",
        nm: "leftwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e1": {
      0: null,
      1: {
        gl: "\u21e1",
        nm: "upwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e2": {
      0: null,
      1: {
        gl: "\u21e2",
        nm: "rightwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e3": {
      0: null,
      1: {
        gl: "\u21e3",
        nm: "downwards dashed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e4": {
      0: null,
      1: {
        gl: "\u21e4",
        nm: "leftwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e5": {
      0: null,
      1: {
        gl: "\u21e5",
        nm: "rightwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e6": {
      0: null,
      1: {
        gl: "\u21e6",
        nm: "leftwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e7": {
      0: null,
      1: {
        gl: "\u21e7",
        nm: "upwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21e8": {
      0: null,
      1: {
        gl: "\u21e8",
        nm: "rightwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21e9": {
      0: null,
      1: {
        gl: "\u21e9",
        nm: "downwards white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ea": {
      0: null,
      1: {
        gl: "\u21ea",
        nm: "upwards white arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21eb": {
      0: null,
      1: {
        gl: "\u21eb",
        nm: "upwards white arrow on pedestal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ec": {
      0: null,
      1: {
        gl: "\u21ec",
        nm: "upwards white arrow on pedestal with horizontal bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ed": {
      0: null,
      1: {
        gl: "\u21ed",
        nm: "upwards white arrow on pedestal with vertical bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ee": {
      0: null,
      1: {
        gl: "\u21ee",
        nm: "upwards white double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21ef": {
      0: null,
      1: {
        gl: "\u21ef",
        nm: "upwards white double arrow on pedestal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f0": {
      0: null,
      1: {
        gl: "\u21f0",
        nm: "rightwards white arrow from wall",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21f1": {
      0: null,
      1: {
        gl: "\u21f1",
        nm: "north west arrow to corner",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21f2": {
      0: null,
      1: {
        gl: "\u21f2",
        nm: "south east arrow to corner",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u21f3": {
      0: null,
      1: {
        gl: "\u21f3",
        nm: "up down white arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f4": {
      0: null,
      1: {
        gl: "\u21f4",
        nm: "right arrow with small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f5": {
      0: null,
      1: {
        gl: "\u21f5",
        nm: "downwards arrow leftwards of upwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u21f6": {
      0: null,
      1: {
        gl: "\u21f6",
        nm: "three rightwards arrows",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21f7": {
      0: null,
      1: {
        gl: "\u21f7",
        nm: "leftwards arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f8": {
      0: null,
      1: {
        gl: "\u21f8",
        nm: "rightwards arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21f9": {
      0: null,
      1: {
        gl: "\u21f9",
        nm: "left right arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fa": {
      0: null,
      1: {
        gl: "\u21fa",
        nm: "leftwards arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fb": {
      0: null,
      1: {
        gl: "\u21fb",
        nm: "rightwards arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fc": {
      0: null,
      1: {
        gl: "\u21fc",
        nm: "left right arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u21fd": {
      0: null,
      1: {
        gl: "\u21fd",
        nm: "leftwards open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21fe": {
      0: null,
      1: {
        gl: "\u21fe",
        nm: "rightwards open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u21ff": {
      0: null,
      1: {
        gl: "\u21ff",
        nm: "left right open-headed arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2200": {
      0: { gl: "\u2200", nm: "for all", pr: 230, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2201": {
      0: null,
      1: { gl: "\u2201", nm: "complement", pr: 240, ls: 1, rs: 2, pp: "" },
      2: null,
    },
    "\u2202": {
      0: {
        gl: "\u2202",
        nm: "partial differential",
        pr: 740,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2203": {
      0: { gl: "\u2203", nm: "there exists", pr: 230, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2204": {
      0: {
        gl: "\u2204",
        nm: "there does not exist",
        pr: 230,
        ls: 2,
        rs: 1,
        pp: "",
      },
      1: null,
      2: null,
    },
    "\u2206": {
      0: null,
      1: { gl: "\u2206", nm: "increment", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2207": {
      0: { gl: "\u2207", nm: "nabla", pr: 740, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u2208": {
      0: null,
      1: { gl: "\u2208", nm: "element of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2209": {
      0: null,
      1: {
        gl: "\u2209",
        nm: "not an element of",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220a": {
      0: null,
      1: {
        gl: "\u220a",
        nm: "small element of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220b": {
      0: null,
      1: {
        gl: "\u220b",
        nm: "contains as member",
        pr: 160,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220c": {
      0: null,
      1: {
        gl: "\u220c",
        nm: "does not contain as member",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220d": {
      0: null,
      1: {
        gl: "\u220d",
        nm: "small contains as member",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u220e": {
      0: null,
      1: { gl: "\u220e", nm: "end of proof", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u220f": {
      0: {
        gl: "\u220f",
        nm: "n-ary product",
        pr: 350,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2210": {
      0: {
        gl: "\u2210",
        nm: "n-ary coproduct",
        pr: 350,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2211": {
      0: {
        gl: "\u2211",
        nm: "n-ary summation",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2212": {
      0: { gl: "\u2212", nm: "minus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "\u2212", nm: "minus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2213": {
      0: {
        gl: "\u2213",
        nm: "minus-or-plus sign",
        pr: 275,
        ls: 0,
        rs: 1,
        pp: "",
      },
      1: {
        gl: "\u2213",
        nm: "minus-or-plus sign",
        pr: 275,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2214": {
      0: null,
      1: { gl: "\u2214", nm: "dot plus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2215": {
      0: null,
      1: {
        gl: "\u2215",
        nm: "division slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2216": {
      0: null,
      1: { gl: "\u2216", nm: "set minus", pr: 650, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2217": {
      0: null,
      1: {
        gl: "\u2217",
        nm: "asterisk operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2218": {
      0: null,
      1: { gl: "\u2218", nm: "ring operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2219": {
      0: null,
      1: { gl: "\u2219", nm: "bullet operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u221a": {
      0: {
        gl: "\u221a",
        nm: "square root",
        pr: 845,
        ls: 1,
        rs: 1,
        pp: "stretchy",
      },
      1: null,
      2: null,
    },
    "\u221b": {
      0: { gl: "\u221b", nm: "cube root", pr: 845, ls: 1, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u221c": {
      0: { gl: "\u221c", nm: "fourth root", pr: 845, ls: 1, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u221d": {
      0: null,
      1: { gl: "\u221d", nm: "proportional to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u221f": {
      0: null,
      1: { gl: "\u221f", nm: "right angle", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2220": {
      0: { gl: "\u2220", nm: "angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2221": {
      0: { gl: "\u2221", nm: "measured angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2222": {
      0: { gl: "\u2222", nm: "spherical angle", pr: 670, ls: 0, rs: 0, pp: "" },
      1: null,
      2: null,
    },
    "\u2223": {
      0: null,
      1: { gl: "\u2223", nm: "divides", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2224": {
      0: null,
      1: { gl: "\u2224", nm: "does not divide", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2225": {
      0: null,
      1: { gl: "\u2225", nm: "parallel to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2226": {
      0: null,
      1: { gl: "\u2226", nm: "not parallel to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2227": {
      0: null,
      1: { gl: "\u2227", nm: "logical and", pr: 200, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2228": {
      0: null,
      1: { gl: "\u2228", nm: "logical or", pr: 190, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2229": {
      0: null,
      1: { gl: "\u2229", nm: "intersection", pr: 350, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u222a": {
      0: null,
      1: { gl: "\u222a", nm: "union", pr: 350, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u222b": {
      0: {
        gl: "\u222b",
        nm: "integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222c": {
      0: {
        gl: "\u222c",
        nm: "double integral",
        pr: 300,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222d": {
      0: {
        gl: "\u222d",
        nm: "triple integral",
        pr: 300,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222e": {
      0: {
        gl: "\u222e",
        nm: "contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u222f": {
      0: {
        gl: "\u222f",
        nm: "surface integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2230": {
      0: {
        gl: "\u2230",
        nm: "volume integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2231": {
      0: {
        gl: "\u2231",
        nm: "clockwise integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2232": {
      0: {
        gl: "\u2232",
        nm: "clockwise contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2233": {
      0: {
        gl: "\u2233",
        nm: "anticlockwise contour integral",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2234": {
      0: null,
      1: { gl: "\u2234", nm: "therefore", pr: 70, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2235": {
      0: null,
      1: { gl: "\u2235", nm: "because", pr: 70, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2236": {
      0: null,
      1: { gl: "\u2236", nm: "ratio", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2237": {
      0: null,
      1: { gl: "\u2237", nm: "proportion", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2238": {
      0: null,
      1: { gl: "\u2238", nm: "dot minus", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2239": {
      0: null,
      1: { gl: "\u2239", nm: "excess", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223a": {
      0: null,
      1: {
        gl: "\u223a",
        nm: "geometric proportion",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u223b": {
      0: null,
      1: { gl: "\u223b", nm: "homothetic", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223c": {
      0: null,
      1: { gl: "\u223c", nm: "tilde operator", pr: 250, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223d": {
      0: null,
      1: { gl: "\u223d", nm: "reversed tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223d\u0331": {
      0: null,
      1: {
        gl: "\u223d\u0331",
        nm: "reversed tilde with underline",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u223e": {
      0: null,
      1: { gl: "\u223e", nm: "inverted lazy s", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u223f": {
      0: null,
      1: { gl: "\u223f", nm: "sine wave", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2240": {
      0: null,
      1: { gl: "\u2240", nm: "wreath product", pr: 340, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2241": {
      0: null,
      1: { gl: "\u2241", nm: "not tilde", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2242": {
      0: null,
      1: { gl: "\u2242", nm: "minus tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2242\u0338": {
      0: null,
      1: {
        gl: "\u2242\u0338",
        nm: "minus tilde with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2243": {
      0: null,
      1: {
        gl: "\u2243",
        nm: "asymptotically equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2244": {
      0: null,
      1: {
        gl: "\u2244",
        nm: "not asymptotically equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2245": {
      0: null,
      1: {
        gl: "\u2245",
        nm: "approximately equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2246": {
      0: null,
      1: {
        gl: "\u2246",
        nm: "approximately but not actually equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2247": {
      0: null,
      1: {
        gl: "\u2247",
        nm: "neither approximately nor actually equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2248": {
      0: null,
      1: { gl: "\u2248", nm: "almost equal to", pr: 247, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2249": {
      0: null,
      1: {
        gl: "\u2249",
        nm: "not almost equal to",
        pr: 250,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224a": {
      0: null,
      1: {
        gl: "\u224a",
        nm: "almost equal or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224b": {
      0: null,
      1: { gl: "\u224b", nm: "triple tilde", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224c": {
      0: null,
      1: { gl: "\u224c", nm: "all equal to", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224d": {
      0: null,
      1: { gl: "\u224d", nm: "equivalent to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u224e": {
      0: null,
      1: {
        gl: "\u224e",
        nm: "geometrically equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224e\u0338": {
      0: null,
      1: {
        gl: "\u224e\u0338",
        nm: "geometrically equivalent to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224f": {
      0: null,
      1: {
        gl: "\u224f",
        nm: "difference between",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u224f\u0338": {
      0: null,
      1: {
        gl: "\u224f\u0338",
        nm: "difference between with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2250": {
      0: null,
      1: {
        gl: "\u2250",
        nm: "approaches the limit",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2251": {
      0: null,
      1: {
        gl: "\u2251",
        nm: "geometrically equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2252": {
      0: null,
      1: {
        gl: "\u2252",
        nm: "approximately equal to or the image of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2253": {
      0: null,
      1: {
        gl: "\u2253",
        nm: "image of or approximately equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2254": {
      0: null,
      1: { gl: "\u2254", nm: "colon equals", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2255": {
      0: null,
      1: { gl: "\u2255", nm: "equals colon", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2256": {
      0: null,
      1: {
        gl: "\u2256",
        nm: "ring in equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2257": {
      0: null,
      1: { gl: "\u2257", nm: "ring equal to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2258": {
      0: null,
      1: { gl: "\u2258", nm: "corresponds to", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2259": {
      0: null,
      1: { gl: "\u2259", nm: "estimates", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225a": {
      0: null,
      1: { gl: "\u225a", nm: "equiangular to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225b": {
      0: null,
      1: { gl: "\u225b", nm: "star equals", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225c": {
      0: null,
      1: { gl: "\u225c", nm: "delta equal to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225d": {
      0: null,
      1: {
        gl: "\u225d",
        nm: "equal to by definition",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u225e": {
      0: null,
      1: { gl: "\u225e", nm: "measured by", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u225f": {
      0: null,
      1: {
        gl: "\u225f",
        nm: "questioned equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2260": {
      0: null,
      1: { gl: "\u2260", nm: "not equal to", pr: 255, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2261": {
      0: null,
      1: { gl: "\u2261", nm: "identical to", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2262": {
      0: null,
      1: {
        gl: "\u2262",
        nm: "not identical to",
        pr: 252,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2263": {
      0: null,
      1: {
        gl: "\u2263",
        nm: "strictly equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2264": {
      0: null,
      1: {
        gl: "\u2264",
        nm: "less-than or equal to",
        pr: 241,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2265": {
      0: null,
      1: {
        gl: "\u2265",
        nm: "greater-than or equal to",
        pr: 242,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2266": {
      0: null,
      1: {
        gl: "\u2266",
        nm: "less-than over equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2266\u0338": {
      0: null,
      1: {
        gl: "\u2266\u0338",
        nm: "less-than over equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2267": {
      0: null,
      1: {
        gl: "\u2267",
        nm: "greater-than over equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2268": {
      0: null,
      1: {
        gl: "\u2268",
        nm: "less-than but not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2269": {
      0: null,
      1: {
        gl: "\u2269",
        nm: "greater-than but not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226a": {
      0: null,
      1: { gl: "\u226a", nm: "much less-than", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226a\u0338": {
      0: null,
      1: {
        gl: "\u226a\u0338",
        nm: "much less than with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226b": {
      0: null,
      1: {
        gl: "\u226b",
        nm: "much greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226b\u0338": {
      0: null,
      1: {
        gl: "\u226b\u0338",
        nm: "much greater than with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226c": {
      0: null,
      1: { gl: "\u226c", nm: "between", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226d": {
      0: null,
      1: {
        gl: "\u226d",
        nm: "not equivalent to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u226e": {
      0: null,
      1: { gl: "\u226e", nm: "not less-than", pr: 246, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u226f": {
      0: null,
      1: {
        gl: "\u226f",
        nm: "not greater-than",
        pr: 244,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2270": {
      0: null,
      1: {
        gl: "\u2270",
        nm: "neither less-than nor equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2271": {
      0: null,
      1: {
        gl: "\u2271",
        nm: "neither greater-than nor equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2272": {
      0: null,
      1: {
        gl: "\u2272",
        nm: "less-than or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2273": {
      0: null,
      1: {
        gl: "\u2273",
        nm: "greater-than or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2274": {
      0: null,
      1: {
        gl: "\u2274",
        nm: "neither less-than nor equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2275": {
      0: null,
      1: {
        gl: "\u2275",
        nm: "neither greater-than nor equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2276": {
      0: null,
      1: {
        gl: "\u2276",
        nm: "less-than or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2277": {
      0: null,
      1: {
        gl: "\u2277",
        nm: "greater-than or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2278": {
      0: null,
      1: {
        gl: "\u2278",
        nm: "neither less-than nor greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2279": {
      0: null,
      1: {
        gl: "\u2279",
        nm: "neither greater-than nor less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227a": {
      0: null,
      1: { gl: "\u227a", nm: "precedes", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u227b": {
      0: null,
      1: { gl: "\u227b", nm: "succeeds", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u227c": {
      0: null,
      1: {
        gl: "\u227c",
        nm: "precedes or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227d": {
      0: null,
      1: {
        gl: "\u227d",
        nm: "succeeds or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227e": {
      0: null,
      1: {
        gl: "\u227e",
        nm: "precedes or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227f": {
      0: null,
      1: {
        gl: "\u227f",
        nm: "succeeds or equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u227f\u0338": {
      0: null,
      1: {
        gl: "\u227f\u0338",
        nm: "succeeds or equivalent to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2280": {
      0: null,
      1: {
        gl: "\u2280",
        nm: "does not precede",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2281": {
      0: null,
      1: {
        gl: "\u2281",
        nm: "does not succeed",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2282": {
      0: null,
      1: { gl: "\u2282", nm: "subset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2282\u20d2": {
      0: null,
      1: {
        gl: "\u2282\u20d2",
        nm: "subset of with vertical line",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2283": {
      0: null,
      1: { gl: "\u2283", nm: "superset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2283\u20d2": {
      0: null,
      1: {
        gl: "\u2283\u20d2",
        nm: "superset of with vertical line",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2284": {
      0: null,
      1: { gl: "\u2284", nm: "not a subset of", pr: 240, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2285": {
      0: null,
      1: {
        gl: "\u2285",
        nm: "not a superset of",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2286": {
      0: null,
      1: {
        gl: "\u2286",
        nm: "subset of or equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2287": {
      0: null,
      1: {
        gl: "\u2287",
        nm: "superset of or equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2288": {
      0: null,
      1: {
        gl: "\u2288",
        nm: "neither a subset of nor equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2289": {
      0: null,
      1: {
        gl: "\u2289",
        nm: "neither a superset of nor equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228a": {
      0: null,
      1: {
        gl: "\u228a",
        nm: "subset of with not equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228b": {
      0: null,
      1: {
        gl: "\u228b",
        nm: "superset of with not equal to",
        pr: 240,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u228c": {
      0: null,
      1: { gl: "\u228c", nm: "multiset", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u228d": {
      0: null,
      1: {
        gl: "\u228d",
        nm: "multiset multiplication",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u228e": {
      0: null,
      1: { gl: "\u228e", nm: "multiset union", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u228f": {
      0: null,
      1: { gl: "\u228f", nm: "square image of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u228f\u0338": {
      0: null,
      1: {
        gl: "\u228f\u0338",
        nm: "square image of with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2290": {
      0: null,
      1: {
        gl: "\u2290",
        nm: "square original of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2290\u0338": {
      0: null,
      1: {
        gl: "\u2290\u0338",
        nm: "square original of with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2291": {
      0: null,
      1: {
        gl: "\u2291",
        nm: "square image of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2292": {
      0: null,
      1: {
        gl: "\u2292",
        nm: "square original of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2293": {
      0: null,
      1: { gl: "\u2293", nm: "square cap", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2294": {
      0: null,
      1: { gl: "\u2294", nm: "square cup", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2295": {
      0: null,
      1: { gl: "\u2295", nm: "circled plus", pr: 300, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2296": {
      0: null,
      1: { gl: "\u2296", nm: "circled minus", pr: 300, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2297": {
      0: null,
      1: { gl: "\u2297", nm: "circled times", pr: 410, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2298": {
      0: null,
      1: {
        gl: "\u2298",
        nm: "circled division slash",
        pr: 300,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2299": {
      0: null,
      1: {
        gl: "\u2299",
        nm: "circled dot operator",
        pr: 710,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229a": {
      0: null,
      1: {
        gl: "\u229a",
        nm: "circled ring operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229b": {
      0: null,
      1: {
        gl: "\u229b",
        nm: "circled asterisk operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u229c": {
      0: null,
      1: { gl: "\u229c", nm: "circled equals", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229d": {
      0: null,
      1: { gl: "\u229d", nm: "circled dash", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229e": {
      0: null,
      1: { gl: "\u229e", nm: "squared plus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u229f": {
      0: null,
      1: { gl: "\u229f", nm: "squared minus", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22a0": {
      0: null,
      1: { gl: "\u22a0", nm: "squared times", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22a1": {
      0: null,
      1: {
        gl: "\u22a1",
        nm: "squared dot operator",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22a2": {
      0: null,
      1: { gl: "\u22a2", nm: "right tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a3": {
      0: null,
      1: { gl: "\u22a3", nm: "left tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a4": {
      0: null,
      1: { gl: "\u22a4", nm: "down tack", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a5": {
      0: null,
      1: { gl: "\u22a5", nm: "up tack", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a6": {
      0: null,
      1: { gl: "\u22a6", nm: "assertion", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a7": {
      0: null,
      1: { gl: "\u22a7", nm: "models", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a8": {
      0: null,
      1: { gl: "\u22a8", nm: "", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22a9": {
      0: null,
      1: { gl: "\u22a9", nm: "forces", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22aa": {
      0: null,
      1: {
        gl: "\u22aa",
        nm: "triple vertical bar right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ab": {
      0: null,
      1: {
        gl: "\u22ab",
        nm: "double vertical bar double right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ac": {
      0: null,
      1: { gl: "\u22ac", nm: "does not prove", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22ad": {
      0: null,
      1: { gl: "\u22ad", nm: "not true", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22ae": {
      0: null,
      1: { gl: "\u22ae", nm: "does not force", pr: 170, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22af": {
      0: null,
      1: {
        gl: "\u22af",
        nm: "negated double vertical bar double right turnstile",
        pr: 170,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b0": {
      0: null,
      1: {
        gl: "\u22b0",
        nm: "precedes under relation",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b1": {
      0: null,
      1: {
        gl: "\u22b1",
        nm: "succeeds under relation",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b2": {
      0: null,
      1: {
        gl: "\u22b2",
        nm: "normal subgroup of",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b3": {
      0: null,
      1: {
        gl: "\u22b3",
        nm: "contains as normal subgroup",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b4": {
      0: null,
      1: {
        gl: "\u22b4",
        nm: "normal subgroup of or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b5": {
      0: null,
      1: {
        gl: "\u22b5",
        nm: "contains as normal subgroup or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22b6": {
      0: null,
      1: { gl: "\u22b6", nm: "original of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b7": {
      0: null,
      1: { gl: "\u22b7", nm: "image of", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b8": {
      0: null,
      1: { gl: "\u22b8", nm: "multimap", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22b9": {
      0: null,
      1: {
        gl: "\u22b9",
        nm: "hermitian conjugate matrix",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ba": {
      0: null,
      1: { gl: "\u22ba", nm: "intercalate", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bb": {
      0: null,
      1: { gl: "\u22bb", nm: "xor", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bc": {
      0: null,
      1: { gl: "\u22bc", nm: "nand", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22bd": {
      0: null,
      1: { gl: "\u22bd", nm: "nor", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22be": {
      0: null,
      1: {
        gl: "\u22be",
        nm: "right angle with arc",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u22bf": {
      0: null,
      1: { gl: "\u22bf", nm: "right triangle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u22c0": {
      0: {
        gl: "\u22c0",
        nm: "n-ary logical and",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c1": {
      0: {
        gl: "\u22c1",
        nm: "n-ary logical or",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c2": {
      0: {
        gl: "\u22c2",
        nm: "n-ary intersection",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c3": {
      0: {
        gl: "\u22c3",
        nm: "n-ary union",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u22c4": {
      0: null,
      1: {
        gl: "\u22c4",
        nm: "diamond operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22c5": {
      0: null,
      1: { gl: "\u22c5", nm: "dot operator", pr: 390, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c6": {
      0: null,
      1: { gl: "\u22c6", nm: "star operator", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c7": {
      0: null,
      1: { gl: "\u22c7", nm: "division times", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22c8": {
      0: null,
      1: { gl: "\u22c8", nm: "bowtie", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22c9": {
      0: null,
      1: {
        gl: "\u22c9",
        nm: "left normal factor semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22ca": {
      0: null,
      1: {
        gl: "\u22ca",
        nm: "right normal factor semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cb": {
      0: null,
      1: {
        gl: "\u22cb",
        nm: "left semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cc": {
      0: null,
      1: {
        gl: "\u22cc",
        nm: "right semidirect product",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cd": {
      0: null,
      1: {
        gl: "\u22cd",
        nm: "reversed tilde equals",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ce": {
      0: null,
      1: {
        gl: "\u22ce",
        nm: "curly logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22cf": {
      0: null,
      1: {
        gl: "\u22cf",
        nm: "curly logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22d0": {
      0: null,
      1: { gl: "\u22d0", nm: "double subset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d1": {
      0: null,
      1: { gl: "\u22d1", nm: "double superset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d2": {
      0: null,
      1: {
        gl: "\u22d2",
        nm: "double intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u22d3": {
      0: null,
      1: { gl: "\u22d3", nm: "double union", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u22d4": {
      0: null,
      1: { gl: "\u22d4", nm: "pitchfork", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u22d5": {
      0: null,
      1: {
        gl: "\u22d5",
        nm: "equal and parallel to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d6": {
      0: null,
      1: {
        gl: "\u22d6",
        nm: "less-than with dot",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d7": {
      0: null,
      1: {
        gl: "\u22d7",
        nm: "greater-than with dot",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d8": {
      0: null,
      1: {
        gl: "\u22d8",
        nm: "very much less-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22d9": {
      0: null,
      1: {
        gl: "\u22d9",
        nm: "very much greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22da": {
      0: null,
      1: {
        gl: "\u22da",
        nm: "less-than equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22db": {
      0: null,
      1: {
        gl: "\u22db",
        nm: "greater-than equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22dc": {
      0: null,
      1: {
        gl: "\u22dc",
        nm: "equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22dd": {
      0: null,
      1: {
        gl: "\u22dd",
        nm: "equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22de": {
      0: null,
      1: {
        gl: "\u22de",
        nm: "equal to or precedes",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22df": {
      0: null,
      1: {
        gl: "\u22df",
        nm: "equal to or succeeds",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e0": {
      0: null,
      1: {
        gl: "\u22e0",
        nm: "does not precede or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e1": {
      0: null,
      1: {
        gl: "\u22e1",
        nm: "does not succeed or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e2": {
      0: null,
      1: {
        gl: "\u22e2",
        nm: "not square image of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e3": {
      0: null,
      1: {
        gl: "\u22e3",
        nm: "not square original of or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e4": {
      0: null,
      1: {
        gl: "\u22e4",
        nm: "square image of or not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e5": {
      0: null,
      1: {
        gl: "\u22e5",
        nm: "square original of or not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e6": {
      0: null,
      1: {
        gl: "\u22e6",
        nm: "less-than but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e7": {
      0: null,
      1: {
        gl: "\u22e7",
        nm: "greater-than but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e8": {
      0: null,
      1: {
        gl: "\u22e8",
        nm: "precedes but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22e9": {
      0: null,
      1: {
        gl: "\u22e9",
        nm: "succeeds but not equivalent to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ea": {
      0: null,
      1: {
        gl: "\u22ea",
        nm: "not normal subgroup of",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22eb": {
      0: null,
      1: {
        gl: "\u22eb",
        nm: "does not contain as normal subgroup",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ec": {
      0: null,
      1: {
        gl: "\u22ec",
        nm: "not normal subgroup of or equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ed": {
      0: null,
      1: {
        gl: "\u22ed",
        nm: "does not contain as normal subgroup or equal",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ee": {
      0: null,
      1: {
        gl: "\u22ee",
        nm: "vertical ellipsis",
        pr: 150,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ef": {
      0: null,
      1: {
        gl: "\u22ef",
        nm: "midline horizontal ellipsis",
        pr: 150,
        ls: 0,
        rs: 0,
        pp: "",
      },
      2: null,
    },
    "\u22f0": {
      0: null,
      1: {
        gl: "\u22f0",
        nm: "up right diagonal ellipsis",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f1": {
      0: null,
      1: {
        gl: "\u22f1",
        nm: "down right diagonal ellipsis",
        pr: 150,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f2": {
      0: null,
      1: {
        gl: "\u22f2",
        nm: "element of with long horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f3": {
      0: null,
      1: {
        gl: "\u22f3",
        nm: "element of with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f4": {
      0: null,
      1: {
        gl: "\u22f4",
        nm: "small element of with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f5": {
      0: null,
      1: {
        gl: "\u22f5",
        nm: "element of with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f6": {
      0: null,
      1: {
        gl: "\u22f6",
        nm: "element of with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f7": {
      0: null,
      1: {
        gl: "\u22f7",
        nm: "small element of with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f8": {
      0: null,
      1: {
        gl: "\u22f8",
        nm: "element of with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22f9": {
      0: null,
      1: {
        gl: "\u22f9",
        nm: "element of with two horizontal strokes",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fa": {
      0: null,
      1: {
        gl: "\u22fa",
        nm: "contains with long horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fb": {
      0: null,
      1: {
        gl: "\u22fb",
        nm: "contains with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fc": {
      0: null,
      1: {
        gl: "\u22fc",
        nm: "small contains with vertical bar at end of horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fd": {
      0: null,
      1: {
        gl: "\u22fd",
        nm: "contains with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22fe": {
      0: null,
      1: {
        gl: "\u22fe",
        nm: "small contains with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u22ff": {
      0: null,
      1: {
        gl: "\u22ff",
        nm: "z notation bag membership",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2308": {
      0: {
        gl: "\u2308",
        nm: "left ceiling",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2309": {
      0: null,
      1: null,
      2: {
        gl: "\u2309",
        nm: "right ceiling",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u230a": {
      0: {
        gl: "\u230a",
        nm: "left floor",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u230b": {
      0: null,
      1: null,
      2: {
        gl: "\u230b",
        nm: "right floor",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2329": {
      0: {
        gl: "\u2329",
        nm: "left-pointing angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u232a": {
      0: null,
      1: null,
      2: {
        gl: "\u232a",
        nm: "right-pointing angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u23b4": {
      0: null,
      1: null,
      2: {
        gl: "\u23b4",
        nm: "top square bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23b5": {
      0: null,
      1: null,
      2: {
        gl: "\u23b5",
        nm: "bottom square bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23dc": {
      0: null,
      1: null,
      2: {
        gl: "\u23dc",
        nm: "top parenthesis",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23dd": {
      0: null,
      1: null,
      2: {
        gl: "\u23dd",
        nm: "bottom parenthesis",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23de": {
      0: null,
      1: null,
      2: {
        gl: "\u23de",
        nm: "top curly bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23df": {
      0: null,
      1: null,
      2: {
        gl: "\u23df",
        nm: "bottom curly bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23e0": {
      0: null,
      1: null,
      2: {
        gl: "\u23e0",
        nm: "top tortoise shell bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u23e1": {
      0: null,
      1: null,
      2: {
        gl: "\u23e1",
        nm: "bottom tortoise shell bracket",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u25a0": {
      0: null,
      1: { gl: "\u25a0", nm: "black square", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25a1": {
      0: null,
      1: { gl: "\u25a1", nm: "white square", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25aa": {
      0: null,
      1: {
        gl: "\u25aa",
        nm: "black small square",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25ab": {
      0: null,
      1: {
        gl: "\u25ab",
        nm: "white small square",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25ad": {
      0: null,
      1: { gl: "\u25ad", nm: "white rectangle", pr: 260, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u25ae": {
      0: null,
      1: {
        gl: "\u25ae",
        nm: "black vertical rectangle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25af": {
      0: null,
      1: {
        gl: "\u25af",
        nm: "white vertical rectangle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b0": {
      0: null,
      1: {
        gl: "\u25b0",
        nm: "black parallelogram",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b1": {
      0: null,
      1: {
        gl: "\u25b1",
        nm: "white parallelogram",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u25b2": {
      0: null,
      1: {
        gl: "\u25b2",
        nm: "black up-pointing triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b3": {
      0: null,
      1: {
        gl: "\u25b3",
        nm: "white up-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b4": {
      0: null,
      1: {
        gl: "\u25b4",
        nm: "black up-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b5": {
      0: null,
      1: {
        gl: "\u25b5",
        nm: "white up-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b6": {
      0: null,
      1: {
        gl: "\u25b6",
        nm: "black right-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b7": {
      0: null,
      1: {
        gl: "\u25b7",
        nm: "white right-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b8": {
      0: null,
      1: {
        gl: "\u25b8",
        nm: "black right-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25b9": {
      0: null,
      1: {
        gl: "\u25b9",
        nm: "white right-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bc": {
      0: null,
      1: {
        gl: "\u25bc",
        nm: "black down-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bd": {
      0: null,
      1: {
        gl: "\u25bd",
        nm: "white down-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25be": {
      0: null,
      1: {
        gl: "\u25be",
        nm: "black down-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25bf": {
      0: null,
      1: {
        gl: "\u25bf",
        nm: "white down-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c0": {
      0: null,
      1: {
        gl: "\u25c0",
        nm: "black left-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c1": {
      0: null,
      1: {
        gl: "\u25c1",
        nm: "white left-pointing triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c2": {
      0: null,
      1: {
        gl: "\u25c2",
        nm: "black left-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c3": {
      0: null,
      1: {
        gl: "\u25c3",
        nm: "white left-pointing small triangle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c4": {
      0: null,
      1: {
        gl: "\u25c4",
        nm: "black left-pointing pointer",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c5": {
      0: null,
      1: {
        gl: "\u25c5",
        nm: "white left-pointing pointer",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c6": {
      0: null,
      1: { gl: "\u25c6", nm: "black diamond", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25c7": {
      0: null,
      1: { gl: "\u25c7", nm: "white diamond", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25c8": {
      0: null,
      1: {
        gl: "\u25c8",
        nm: "white diamond containing black small diamond",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25c9": {
      0: null,
      1: { gl: "\u25c9", nm: "fisheye", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cc": {
      0: null,
      1: { gl: "\u25cc", nm: "dotted circle", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cd": {
      0: null,
      1: {
        gl: "\u25cd",
        nm: "circle with vertical fill",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25ce": {
      0: null,
      1: { gl: "\u25ce", nm: "bullseye", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25cf": {
      0: null,
      1: { gl: "\u25cf", nm: "black circle", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u25d6": {
      0: null,
      1: {
        gl: "\u25d6",
        nm: "left half black circle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25d7": {
      0: null,
      1: {
        gl: "\u25d7",
        nm: "right half black circle",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u25e6": {
      0: null,
      1: { gl: "\u25e6", nm: "white bullet", pr: 260, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u266d": {
      0: null,
      1: null,
      2: { gl: "\u266d", nm: "music flat sign", pr: 800, ls: 0, rs: 2, pp: "" },
    },
    "\u266e": {
      0: null,
      1: null,
      2: {
        gl: "\u266e",
        nm: "music natural sign",
        pr: 800,
        ls: 0,
        rs: 2,
        pp: "",
      },
    },
    "\u266f": {
      0: null,
      1: null,
      2: {
        gl: "\u266f",
        nm: "music sharp sign",
        pr: 800,
        ls: 0,
        r$s: 2,
        pp: "",
      },
    },
    "\u2758": {
      0: null,
      1: {
        gl: "\u2758",
        nm: "light vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2772": {
      0: {
        gl: "\u2772",
        nm: "light left tortoise shell bracket ornament",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2773": {
      0: null,
      1: null,
      2: {
        gl: "\u2773",
        nm: "light right tortoise shell bracket ornament",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27e6": {
      0: {
        gl: "\u27e6",
        nm: "mathematical left white square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27e7": {
      0: null,
      1: null,
      2: {
        gl: "\u27e7",
        nm: "mathematical right white square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27e8": {
      0: {
        gl: "\u27e8",
        nm: "mathematical left angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27e9": {
      0: null,
      1: null,
      2: {
        gl: "\u27e9",
        nm: "mathematical right angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ea": {
      0: {
        gl: "\u27ea",
        nm: "mathematical left double angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27eb": {
      0: null,
      1: null,
      2: {
        gl: "\u27eb",
        nm: "mathematical right double angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ec": {
      0: {
        gl: "\u27ec",
        nm: "mathematical left white tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27ed": {
      0: null,
      1: null,
      2: {
        gl: "\u27ed",
        nm: "mathematical right white tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27ee": {
      0: {
        gl: "\u27ee",
        nm: "mathematical left flattened parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u27ef": {
      0: null,
      1: null,
      2: {
        gl: "\u27ef",
        nm: "mathematical right flattened parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u27f0": {
      0: null,
      1: {
        gl: "\u27f0",
        nm: "upwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u27f1": {
      0: null,
      1: {
        gl: "\u27f1",
        nm: "downwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u27f5": {
      0: null,
      1: {
        gl: "\u27f5",
        nm: "long leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f6": {
      0: null,
      1: {
        gl: "\u27f6",
        nm: "long rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f7": {
      0: null,
      1: {
        gl: "\u27f7",
        nm: "long left right arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f8": {
      0: null,
      1: {
        gl: "\u27f8",
        nm: "long leftwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27f9": {
      0: null,
      1: {
        gl: "\u27f9",
        nm: "long rightwards double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fa": {
      0: null,
      1: {
        gl: "\u27fa",
        nm: "long left right double arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fb": {
      0: null,
      1: {
        gl: "\u27fb",
        nm: "long leftwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fc": {
      0: null,
      1: {
        gl: "\u27fc",
        nm: "long rightwards arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fd": {
      0: null,
      1: {
        gl: "\u27fd",
        nm: "long leftwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27fe": {
      0: null,
      1: {
        gl: "\u27fe",
        nm: "long rightwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u27ff": {
      0: null,
      1: {
        gl: "\u27ff",
        nm: "long rightwards squiggle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2900": {
      0: null,
      1: {
        gl: "\u2900",
        nm: "rightwards two-headed arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2901": {
      0: null,
      1: {
        gl: "\u2901",
        nm: "rightwards two-headed arrow with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2902": {
      0: null,
      1: {
        gl: "\u2902",
        nm: "leftwards double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2903": {
      0: null,
      1: {
        gl: "\u2903",
        nm: "rightwards double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2904": {
      0: null,
      1: {
        gl: "\u2904",
        nm: "left right double arrow with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2905": {
      0: null,
      1: {
        gl: "\u2905",
        nm: "rightwards two-headed arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2906": {
      0: null,
      1: {
        gl: "\u2906",
        nm: "leftwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2907": {
      0: null,
      1: {
        gl: "\u2907",
        nm: "rightwards double arrow from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2908": {
      0: null,
      1: {
        gl: "\u2908",
        nm: "downwards arrow with horizontal stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2909": {
      0: null,
      1: {
        gl: "\u2909",
        nm: "upwards arrow with horizontal stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u290a": {
      0: null,
      1: {
        gl: "\u290a",
        nm: "upwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u290b": {
      0: null,
      1: {
        gl: "\u290b",
        nm: "downwards triple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u290c": {
      0: null,
      1: {
        gl: "\u290c",
        nm: "leftwards double dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290d": {
      0: null,
      1: {
        gl: "\u290d",
        nm: "rightwards double dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290e": {
      0: null,
      1: {
        gl: "\u290e",
        nm: "leftwards triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u290f": {
      0: null,
      1: {
        gl: "\u290f",
        nm: "rightwards triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2910": {
      0: null,
      1: {
        gl: "\u2910",
        nm: "rightwards two-headed triple dash arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2911": {
      0: null,
      1: {
        gl: "\u2911",
        nm: "rightwards arrow with dotted stem",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2912": {
      0: null,
      1: {
        gl: "\u2912",
        nm: "upwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2913": {
      0: null,
      1: {
        gl: "\u2913",
        nm: "downwards arrow to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2914": {
      0: null,
      1: {
        gl: "\u2914",
        nm: "rightwards arrow with tail with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2915": {
      0: null,
      1: {
        gl: "\u2915",
        nm: "rightwards arrow with tail with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2916": {
      0: null,
      1: {
        gl: "\u2916",
        nm: "rightwards two-headed arrow with tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2917": {
      0: null,
      1: {
        gl: "\u2917",
        nm: "rightwards two-headed arrow with tail with vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2918": {
      0: null,
      1: {
        gl: "\u2918",
        nm: "rightwards two-headed arrow with tail with double vertical stroke",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2919": {
      0: null,
      1: {
        gl: "\u2919",
        nm: "leftwards arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291a": {
      0: null,
      1: {
        gl: "\u291a",
        nm: "rightwards arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291b": {
      0: null,
      1: {
        gl: "\u291b",
        nm: "leftwards double arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291c": {
      0: null,
      1: {
        gl: "\u291c",
        nm: "rightwards double arrow-tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291d": {
      0: null,
      1: {
        gl: "\u291d",
        nm: "leftwards arrow to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291e": {
      0: null,
      1: {
        gl: "\u291e",
        nm: "rightwards arrow to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u291f": {
      0: null,
      1: {
        gl: "\u291f",
        nm: "leftwards arrow from bar to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2920": {
      0: null,
      1: {
        gl: "\u2920",
        nm: "rightwards arrow from bar to black diamond",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2921": {
      0: null,
      1: {
        gl: "\u2921",
        nm: "north west and south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2922": {
      0: null,
      1: {
        gl: "\u2922",
        nm: "north east and south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2923": {
      0: null,
      1: {
        gl: "\u2923",
        nm: "north west arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2924": {
      0: null,
      1: {
        gl: "\u2924",
        nm: "north east arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2925": {
      0: null,
      1: {
        gl: "\u2925",
        nm: "south east arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2926": {
      0: null,
      1: {
        gl: "\u2926",
        nm: "south west arrow with hook",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2927": {
      0: null,
      1: {
        gl: "\u2927",
        nm: "north west arrow and north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2928": {
      0: null,
      1: {
        gl: "\u2928",
        nm: "north east arrow and south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2929": {
      0: null,
      1: {
        gl: "\u2929",
        nm: "south east arrow and south west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292a": {
      0: null,
      1: {
        gl: "\u292a",
        nm: "south west arrow and north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292b": {
      0: null,
      1: {
        gl: "\u292b",
        nm: "rising diagonal crossing falling diagonal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292c": {
      0: null,
      1: {
        gl: "\u292c",
        nm: "falling diagonal crossing rising diagonal",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292d": {
      0: null,
      1: {
        gl: "\u292d",
        nm: "south east arrow crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292e": {
      0: null,
      1: {
        gl: "\u292e",
        nm: "north east arrow crossing south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u292f": {
      0: null,
      1: {
        gl: "\u292f",
        nm: "falling diagonal crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2930": {
      0: null,
      1: {
        gl: "\u2930",
        nm: "rising diagonal crossing south east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2931": {
      0: null,
      1: {
        gl: "\u2931",
        nm: "north east arrow crossing north west arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2932": {
      0: null,
      1: {
        gl: "\u2932",
        nm: "north west arrow crossing north east arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2933": {
      0: null,
      1: {
        gl: "\u2933",
        nm: "wave arrow pointing directly right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2934": {
      0: null,
      1: {
        gl: "\u2934",
        nm: "arrow pointing rightwards then curving upwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2935": {
      0: null,
      1: {
        gl: "\u2935",
        nm: "arrow pointing rightwards then curving downwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2936": {
      0: null,
      1: {
        gl: "\u2936",
        nm: "arrow pointing downwards then curving leftwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2937": {
      0: null,
      1: {
        gl: "\u2937",
        nm: "arrow pointing downwards then curving rightwards",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2938": {
      0: null,
      1: {
        gl: "\u2938",
        nm: "right-side arc clockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2939": {
      0: null,
      1: {
        gl: "\u2939",
        nm: "left-side arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u293a": {
      0: null,
      1: {
        gl: "\u293a",
        nm: "top arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293b": {
      0: null,
      1: {
        gl: "\u293b",
        nm: "bottom arc anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293c": {
      0: null,
      1: {
        gl: "\u293c",
        nm: "top arc clockwise arrow with minus",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293d": {
      0: null,
      1: {
        gl: "\u293d",
        nm: "top arc anticlockwise arrow with plus",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u293e": {
      0: null,
      1: {
        gl: "\u293e",
        nm: "lower right semicircular clockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u293f": {
      0: null,
      1: {
        gl: "\u293f",
        nm: "lower left semicircular anticlockwise arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2940": {
      0: null,
      1: {
        gl: "\u2940",
        nm: "anticlockwise closed circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2941": {
      0: null,
      1: {
        gl: "\u2941",
        nm: "clockwise closed circle arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2942": {
      0: null,
      1: {
        gl: "\u2942",
        nm: "rightwards arrow above short leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2943": {
      0: null,
      1: {
        gl: "\u2943",
        nm: "leftwards arrow above short rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2944": {
      0: null,
      1: {
        gl: "\u2944",
        nm: "short rightwards arrow above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2945": {
      0: null,
      1: {
        gl: "\u2945",
        nm: "rightwards arrow with plus below",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2946": {
      0: null,
      1: {
        gl: "\u2946",
        nm: "leftwards arrow with plus below",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2947": {
      0: null,
      1: {
        gl: "\u2947",
        nm: "rightwards arrow through x",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2948": {
      0: null,
      1: {
        gl: "\u2948",
        nm: "left right arrow through small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2949": {
      0: null,
      1: {
        gl: "\u2949",
        nm: "upwards two-headed arrow from small circle",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294a": {
      0: null,
      1: {
        gl: "\u294a",
        nm: "left barb up right barb down harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u294b": {
      0: null,
      1: {
        gl: "\u294b",
        nm: "left barb down right barb up harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u294c": {
      0: null,
      1: {
        gl: "\u294c",
        nm: "up barb right down barb left harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294d": {
      0: null,
      1: {
        gl: "\u294d",
        nm: "up barb left down barb right harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u294e": {
      0: null,
      1: {
        gl: "\u294e",
        nm: "left barb up right barb up harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u294f": {
      0: null,
      1: {
        gl: "\u294f",
        nm: "up barb right down barb right harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2950": {
      0: null,
      1: {
        gl: "\u2950",
        nm: "left barb down right barb down harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2951": {
      0: null,
      1: {
        gl: "\u2951",
        nm: "up barb left down barb left harpoon",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2952": {
      0: null,
      1: {
        gl: "\u2952",
        nm: "leftwards harpoon with barb up to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2953": {
      0: null,
      1: {
        gl: "\u2953",
        nm: "rightwards harpoon with barb up to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2954": {
      0: null,
      1: {
        gl: "\u2954",
        nm: "upwards harpoon with barb right to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2955": {
      0: null,
      1: {
        gl: "\u2955",
        nm: "downwards harpoon with barb right to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2956": {
      0: null,
      1: {
        gl: "\u2956",
        nm: "leftwards harpoon with barb down to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2957": {
      0: null,
      1: {
        gl: "\u2957",
        nm: "rightwards harpoon with barb down to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2958": {
      0: null,
      1: {
        gl: "\u2958",
        nm: "upwards harpoon with barb left to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2959": {
      0: null,
      1: {
        gl: "\u2959",
        nm: "downwards harpoon with barb left to bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295a": {
      0: null,
      1: {
        gl: "\u295a",
        nm: "leftwards harpoon with barb up from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295b": {
      0: null,
      1: {
        gl: "\u295b",
        nm: "rightwards harpoon with barb up from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295c": {
      0: null,
      1: {
        gl: "\u295c",
        nm: "upwards harpoon with barb right from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295d": {
      0: null,
      1: {
        gl: "\u295d",
        nm: "downwards harpoon with barb right from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u295e": {
      0: null,
      1: {
        gl: "\u295e",
        nm: "leftwards harpoon with barb down from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u295f": {
      0: null,
      1: {
        gl: "\u295f",
        nm: "rightwards harpoon with barb down from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy, accent",
      },
      2: null,
    },
    "\u2960": {
      0: null,
      1: {
        gl: "\u2960",
        nm: "upwards harpoon with barb left from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2961": {
      0: null,
      1: {
        gl: "\u2961",
        nm: "downwards harpoon with barb left from bar",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2962": {
      0: null,
      1: {
        gl: "\u2962",
        nm:
          "leftwards harpoon with barb up above leftwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2963": {
      0: null,
      1: {
        gl: "\u2963",
        nm:
          "upwards harpoon with barb left beside upwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2964": {
      0: null,
      1: {
        gl: "\u2964",
        nm:
          "rightwards harpoon with barb up above rightwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2965": {
      0: null,
      1: {
        gl: "\u2965",
        nm:
          "downwards harpoon with barb left beside downwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2966": {
      0: null,
      1: {
        gl: "\u2966",
        nm:
          "leftwards harpoon with barb up above rightwards harpoon with barb up",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2967": {
      0: null,
      1: {
        gl: "\u2967",
        nm:
          "leftwards harpoon with barb down above rightwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2968": {
      0: null,
      1: {
        gl: "\u2968",
        nm:
          "rightwards harpoon with barb up above leftwards harpoon with barb up",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2969": {
      0: null,
      1: {
        gl: "\u2969",
        nm:
          "rightwards harpoon with barb down above leftwards harpoon with barb down",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296a": {
      0: null,
      1: {
        gl: "\u296a",
        nm: "leftwards harpoon with barb up above long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296b": {
      0: null,
      1: {
        gl: "\u296b",
        nm: "leftwards harpoon with barb down below long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296c": {
      0: null,
      1: {
        gl: "\u296c",
        nm: "rightwards harpoon with barb up above long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296d": {
      0: null,
      1: {
        gl: "\u296d",
        nm: "rightwards harpoon with barb down below long dash",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u296e": {
      0: null,
      1: {
        gl: "\u296e",
        nm:
          "upwards harpoon with barb left beside downwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u296f": {
      0: null,
      1: {
        gl: "\u296f",
        nm:
          "downwards harpoon with barb left beside upwards harpoon with barb right",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2970": {
      0: null,
      1: {
        gl: "\u2970",
        nm: "right double arrow with rounded head",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2971": {
      0: null,
      1: {
        gl: "\u2971",
        nm: "equals sign above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2972": {
      0: null,
      1: {
        gl: "\u2972",
        nm: "tilde operator above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2973": {
      0: null,
      1: {
        gl: "\u2973",
        nm: "leftwards arrow above tilde operator",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2974": {
      0: null,
      1: {
        gl: "\u2974",
        nm: "rightwards arrow above tilde operator",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2975": {
      0: null,
      1: {
        gl: "\u2975",
        nm: "rightwards arrow above almost equal to",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2976": {
      0: null,
      1: {
        gl: "\u2976",
        nm: "less-than above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2977": {
      0: null,
      1: {
        gl: "\u2977",
        nm: "leftwards arrow through less-than",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2978": {
      0: null,
      1: {
        gl: "\u2978",
        nm: "greater-than above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u2979": {
      0: null,
      1: {
        gl: "\u2979",
        nm: "subset above rightwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297a": {
      0: null,
      1: {
        gl: "\u297a",
        nm: "leftwards arrow through subset",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297b": {
      0: null,
      1: {
        gl: "\u297b",
        nm: "superset above leftwards arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297c": {
      0: null,
      1: {
        gl: "\u297c",
        nm: "left fish tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297d": {
      0: null,
      1: {
        gl: "\u297d",
        nm: "right fish tail",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "accent",
      },
      2: null,
    },
    "\u297e": {
      0: null,
      1: { gl: "\u297e", nm: "up fish tail", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u297f": {
      0: null,
      1: { gl: "\u297f", nm: "down fish tail", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2980": {
      0: {
        gl: "\u2980",
        nm: "triple vertical bar delimiter",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
      1: null,
      2: {
        gl: "\u2980",
        nm: "triple vertical bar delimiter",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy",
      },
    },
    "\u2981": {
      0: null,
      1: { gl: "\u2981", nm: "z notation spot", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2982": {
      0: null,
      1: {
        gl: "\u2982",
        nm: "z notation type colon",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2983": {
      0: {
        gl: "\u2983",
        nm: "left white curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2984": {
      0: null,
      1: null,
      2: {
        gl: "\u2984",
        nm: "right white curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2985": {
      0: {
        gl: "\u2985",
        nm: "left white parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2986": {
      0: null,
      1: null,
      2: {
        gl: "\u2986",
        nm: "right white parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2987": {
      0: {
        gl: "\u2987",
        nm: "z notation left image bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2988": {
      0: null,
      1: null,
      2: {
        gl: "\u2988",
        nm: "z notation right image bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2989": {
      0: {
        gl: "\u2989",
        nm: "z notation left binding bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298a": {
      0: null,
      1: null,
      2: {
        gl: "\u298a",
        nm: "z notation right binding bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298b": {
      0: {
        gl: "\u298b",
        nm: "left square bracket with underbar",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298c": {
      0: null,
      1: null,
      2: {
        gl: "\u298c",
        nm: "right square bracket with underbar",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298d": {
      0: {
        gl: "\u298d",
        nm: "left square bracket with tick in top corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u298e": {
      0: null,
      1: null,
      2: {
        gl: "\u298e",
        nm: "right square bracket with tick in bottom corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u298f": {
      0: {
        gl: "\u298f",
        nm: "left square bracket with tick in bottom corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2990": {
      0: null,
      1: null,
      2: {
        gl: "\u2990",
        nm: "right square bracket with tick in top corner",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2991": {
      0: {
        gl: "\u2991",
        nm: "left angle bracket with dot",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2992": {
      0: null,
      1: null,
      2: {
        gl: "\u2992",
        nm: "right angle bracket with dot",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2993": {
      0: {
        gl: "\u2993",
        nm: "left arc less-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2994": {
      0: null,
      1: null,
      2: {
        gl: "\u2994",
        nm: "right arc greater-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2995": {
      0: {
        gl: "\u2995",
        nm: "double left arc greater-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2996": {
      0: null,
      1: null,
      2: {
        gl: "\u2996",
        nm: "double right arc less-than bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2997": {
      0: {
        gl: "\u2997",
        nm: "left black tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2998": {
      0: null,
      1: null,
      2: {
        gl: "\u2998",
        nm: "right black tortoise shell bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u2999": {
      0: null,
      1: { gl: "\u2999", nm: "dotted fence", pr: 270, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u299a": {
      0: null,
      1: {
        gl: "\u299a",
        nm: "vertical zigzag line",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299b": {
      0: null,
      1: {
        gl: "\u299b",
        nm: "measured angle opening left",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299c": {
      0: null,
      1: {
        gl: "\u299c",
        nm: "right angle variant with square",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299d": {
      0: null,
      1: {
        gl: "\u299d",
        nm: "measured right angle with dot",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299e": {
      0: null,
      1: {
        gl: "\u299e",
        nm: "angle with s inside",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u299f": {
      0: null,
      1: { gl: "\u299f", nm: "acute angle", pr: 270, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a0": {
      0: null,
      1: {
        gl: "\u29a0",
        nm: "spherical angle opening left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a1": {
      0: null,
      1: {
        gl: "\u29a1",
        nm: "spherical angle opening up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a2": {
      0: null,
      1: { gl: "\u29a2", nm: "turned angle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a3": {
      0: null,
      1: { gl: "\u29a3", nm: "reversed angle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29a4": {
      0: null,
      1: {
        gl: "\u29a4",
        nm: "angle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a5": {
      0: null,
      1: {
        gl: "\u29a5",
        nm: "reversed angle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a6": {
      0: null,
      1: {
        gl: "\u29a6",
        nm: "oblique angle opening up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a7": {
      0: null,
      1: {
        gl: "\u29a7",
        nm: "oblique angle opening down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a8": {
      0: null,
      1: {
        gl: "\u29a8",
        nm:
          "measured angle with open arm ending in arrow pointing up and right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29a9": {
      0: null,
      1: {
        gl: "\u29a9",
        nm: "measured angle with open arm ending in arrow pointing up and left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29aa": {
      0: null,
      1: {
        gl: "\u29aa",
        nm:
          "measured angle with open arm ending in arrow pointing down and right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ab": {
      0: null,
      1: {
        gl: "\u29ab",
        nm:
          "measured angle with open arm ending in arrow pointing down and left",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ac": {
      0: null,
      1: {
        gl: "\u29ac",
        nm:
          "measured angle with open arm ending in arrow pointing right and up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ad": {
      0: null,
      1: {
        gl: "\u29ad",
        nm: "measured angle with open arm ending in arrow pointing left and up",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ae": {
      0: null,
      1: {
        gl: "\u29ae",
        nm:
          "measured angle with open arm ending in arrow pointing right and down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29af": {
      0: null,
      1: {
        gl: "\u29af",
        nm:
          "measured angle with open arm ending in arrow pointing left and down",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b0": {
      0: null,
      1: {
        gl: "\u29b0",
        nm: "reversed empty set",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b1": {
      0: null,
      1: {
        gl: "\u29b1",
        nm: "empty set with overbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b2": {
      0: null,
      1: {
        gl: "\u29b2",
        nm: "empty set with small circle above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b3": {
      0: null,
      1: {
        gl: "\u29b3",
        nm: "empty set with right arrow above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b4": {
      0: null,
      1: {
        gl: "\u29b4",
        nm: "empty set with left arrow above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b5": {
      0: null,
      1: {
        gl: "\u29b5",
        nm: "circle with horizontal bar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29b6": {
      0: null,
      1: {
        gl: "\u29b6",
        nm: "circled vertical bar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b7": {
      0: null,
      1: {
        gl: "\u29b7",
        nm: "circled parallel",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b8": {
      0: null,
      1: {
        gl: "\u29b8",
        nm: "circled reverse solidus",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29b9": {
      0: null,
      1: {
        gl: "\u29b9",
        nm: "circled perpendicular",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29ba": {
      0: null,
      1: {
        gl: "\u29ba",
        nm:
          "circle divided by horizontal bar and top half divided by vertical bar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bb": {
      0: null,
      1: {
        gl: "\u29bb",
        nm: "circle with superimposed x",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bc": {
      0: null,
      1: {
        gl: "\u29bc",
        nm: "circled anticlockwise-rotated division sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bd": {
      0: null,
      1: {
        gl: "\u29bd",
        nm: "up arrow through circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29be": {
      0: null,
      1: {
        gl: "\u29be",
        nm: "circled white bullet",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29bf": {
      0: null,
      1: { gl: "\u29bf", nm: "circled bullet", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29c0": {
      0: null,
      1: {
        gl: "\u29c0",
        nm: "circled less-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29c1": {
      0: null,
      1: {
        gl: "\u29c1",
        nm: "circled greater-than",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29c2": {
      0: null,
      1: {
        gl: "\u29c2",
        nm: "circle with small circle to the right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29c3": {
      0: null,
      1: {
        gl: "\u29c3",
        nm: "circle with two horizontal strokes to the right",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29c4": {
      0: null,
      1: {
        gl: "\u29c4",
        nm: "squared rising diagonal slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c5": {
      0: null,
      1: {
        gl: "\u29c5",
        nm: "squared falling diagonal slash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c6": {
      0: null,
      1: {
        gl: "\u29c6",
        nm: "squared asterisk",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c7": {
      0: null,
      1: {
        gl: "\u29c7",
        nm: "squared small circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29c8": {
      0: null,
      1: { gl: "\u29c8", nm: "squared square", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29c9": {
      0: null,
      1: {
        gl: "\u29c9",
        nm: "two joined squares",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ca": {
      0: null,
      1: {
        gl: "\u29ca",
        nm: "triangle with dot above",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29cb": {
      0: null,
      1: {
        gl: "\u29cb",
        nm: "triangle with underbar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29cc": {
      0: null,
      1: { gl: "\u29cc", nm: "s in triangle", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29cd": {
      0: null,
      1: {
        gl: "\u29cd",
        nm: "triangle with serifs at bottom",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ce": {
      0: null,
      1: {
        gl: "\u29ce",
        nm: "right triangle above left triangle",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29cf": {
      0: null,
      1: {
        gl: "\u29cf",
        nm: "left triangle beside vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29cf\u0338": {
      0: null,
      1: {
        gl: "\u29cf\u0338",
        nm: "left triangle beside vertical bar with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d0": {
      0: null,
      1: {
        gl: "\u29d0",
        nm: "vertical bar beside right triangle",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d0\u0338": {
      0: null,
      1: {
        gl: "\u29d0\u0338",
        nm: "vertical bar beside right triangle with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d1": {
      0: null,
      1: {
        gl: "\u29d1",
        nm: "bowtie with left half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d2": {
      0: null,
      1: {
        gl: "\u29d2",
        nm: "bowtie with right half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d3": {
      0: null,
      1: { gl: "\u29d3", nm: "black bowtie", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29d4": {
      0: null,
      1: {
        gl: "\u29d4",
        nm: "times with left half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d5": {
      0: null,
      1: {
        gl: "\u29d5",
        nm: "times with right half black",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29d6": {
      0: null,
      1: { gl: "\u29d6", nm: "white hourglass", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29d7": {
      0: null,
      1: { gl: "\u29d7", nm: "black hourglass", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29d8": {
      0: null,
      1: {
        gl: "\u29d8",
        nm: "left wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29d9": {
      0: null,
      1: {
        gl: "\u29d9",
        nm: "right wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29db": {
      0: null,
      1: {
        gl: "\u29db",
        nm: "right double wiggly fence",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29dc": {
      0: null,
      1: {
        gl: "\u29dc",
        nm: "incomplete infinity",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29dd": {
      0: null,
      1: {
        gl: "\u29dd",
        nm: "tie over infinity",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29de": {
      0: null,
      1: {
        gl: "\u29de",
        nm: "infinity negated with vertical bar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29df": {
      0: null,
      1: {
        gl: "\u29df",
        nm: "double-ended multimap",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e0": {
      0: null,
      1: {
        gl: "\u29e0",
        nm: "square with contoured outline",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e1": {
      0: null,
      1: { gl: "\u29e1", nm: "increases as", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29e2": {
      0: null,
      1: { gl: "\u29e2", nm: "shuffle product", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29e3": {
      0: null,
      1: {
        gl: "\u29e3",
        nm: "equals sign and slanted parallel",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e4": {
      0: null,
      1: {
        gl: "\u29e4",
        nm: "equals sign and slanted parallel with tilde above",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e5": {
      0: null,
      1: {
        gl: "\u29e5",
        nm: "identical to and slanted parallel",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u29e6": {
      0: null,
      1: { gl: "\u29e6", nm: "gleich stark", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29e7": {
      0: null,
      1: { gl: "\u29e7", nm: "thermodynamic", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29e8": {
      0: null,
      1: {
        gl: "\u29e8",
        nm: "down-pointing triangle with left half black",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29e9": {
      0: null,
      1: {
        gl: "\u29e9",
        nm: "down-pointing triangle with right half black",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ea": {
      0: null,
      1: {
        gl: "\u29ea",
        nm: "black diamond with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29eb": {
      0: null,
      1: { gl: "\u29eb", nm: "black lozenge", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29ec": {
      0: null,
      1: {
        gl: "\u29ec",
        nm: "white circle with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ed": {
      0: null,
      1: {
        gl: "\u29ed",
        nm: "black circle with down arrow",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ee": {
      0: null,
      1: {
        gl: "\u29ee",
        nm: "error-barred white square",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29ef": {
      0: null,
      1: {
        gl: "\u29ef",
        nm: "error-barred black square",
        pr: 270,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f0": {
      0: null,
      1: {
        gl: "\u29f0",
        nm: "error-barred white diamond",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f1": {
      0: null,
      1: {
        gl: "\u29f1",
        nm: "error-barred black diamond",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f2": {
      0: null,
      1: {
        gl: "\u29f2",
        nm: "error-barred white circle",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f3": {
      0: null,
      1: {
        gl: "\u29f3",
        nm: "error-barred black circle",
        pr: 260,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29f4": {
      0: null,
      1: { gl: "\u29f4", nm: "rule-delayed", pr: 270, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u29f5": {
      0: null,
      1: {
        gl: "\u29f5",
        nm: "reverse solidus operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f6": {
      0: null,
      1: {
        gl: "\u29f6",
        nm: "solidus with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f7": {
      0: null,
      1: {
        gl: "\u29f7",
        nm: "reverse solidus with horizontal stroke",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u29f8": {
      0: null,
      1: { gl: "\u29f8", nm: "big solidus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29f9": {
      0: null,
      1: {
        gl: "\u29f9",
        nm: "big reverse solidus",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u29fa": {
      0: null,
      1: { gl: "\u29fa", nm: "double plus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29fb": {
      0: null,
      1: { gl: "\u29fb", nm: "triple plus", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u29fc": {
      0: {
        gl: "\u29fc",
        nm: "left-pointing curved angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\u29fd": {
      0: null,
      1: null,
      2: {
        gl: "\u29fd",
        nm: "right-pointing curved angle bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "\u29fe": {
      0: null,
      1: { gl: "\u29fe", nm: "tiny", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u29ff": {
      0: null,
      1: { gl: "\u29ff", nm: "miny", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2a00": {
      0: {
        gl: "\u2a00",
        nm: "n-ary circled dot operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a01": {
      0: {
        gl: "\u2a01",
        nm: "n-ary circled plus operator",
        pr: 300,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a02": {
      0: {
        gl: "\u2a02",
        nm: "n-ary circled times operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a03": {
      0: {
        gl: "\u2a03",
        nm: "n-ary union operator with dot",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a04": {
      0: {
        gl: "\u2a04",
        nm: "n-ary union operator with plus",
        pr: 320,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a05": {
      0: {
        gl: "\u2a05",
        nm: "n-ary square intersection operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a06": {
      0: {
        gl: "\u2a06",
        nm: "n-ary square union operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a07": {
      0: {
        gl: "\u2a07",
        nm: "two logical and operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a08": {
      0: {
        gl: "\u2a08",
        nm: "two logical or operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a09": {
      0: {
        gl: "\u2a09",
        nm: "n-ary times operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0a": {
      0: {
        gl: "\u2a0a",
        nm: "modulo two sum",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0b": {
      0: {
        gl: "\u2a0b",
        nm: "summation with integral",
        pr: 290,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0c": {
      0: {
        gl: "\u2a0c",
        nm: "quadruple integral operator",
        pr: 310,
        ls: 0,
        rs: 1,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0d": {
      0: {
        gl: "\u2a0d",
        nm: "finite part integral",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0e": {
      0: {
        gl: "\u2a0e",
        nm: "integral with double stroke",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a0f": {
      0: {
        gl: "\u2a0f",
        nm: "integral average with slash",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a10": {
      0: {
        gl: "\u2a10",
        nm: "circulation function",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a11": {
      0: {
        gl: "\u2a11",
        nm: "anticlockwise integration",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a12": {
      0: {
        gl: "\u2a12",
        nm: "line integration with rectangular path around pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a13": {
      0: {
        gl: "\u2a13",
        nm: "line integration with semicircular path around pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a14": {
      0: {
        gl: "\u2a14",
        nm: "line integration not including the pole",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a15": {
      0: {
        gl: "\u2a15",
        nm: "integral around a point operator",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a16": {
      0: {
        gl: "\u2a16",
        nm: "quaternion integral operator",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a17": {
      0: {
        gl: "\u2a17",
        nm: "integral with leftwards arrow with hook",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a18": {
      0: {
        gl: "\u2a18",
        nm: "integral with times sign",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a19": {
      0: {
        gl: "\u2a19",
        nm: "integral with intersection",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1a": {
      0: {
        gl: "\u2a1a",
        nm: "integral with union",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1b": {
      0: {
        gl: "\u2a1b",
        nm: "integral with overbar",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1c": {
      0: {
        gl: "\u2a1c",
        nm: "integral with underbar",
        pr: 310,
        ls: 1,
        rs: 2,
        pp: "largeop, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2a1d": {
      0: null,
      1: { gl: "\u2a1d", nm: "join", pr: 265, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "\u2a1e": {
      0: null,
      1: {
        gl: "\u2a1e",
        nm: "large left triangle operator",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a1f": {
      0: null,
      1: {
        gl: "\u2a1f",
        nm: "z notation schema composition",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a20": {
      0: null,
      1: {
        gl: "\u2a20",
        nm: "z notation schema piping",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a21": {
      0: null,
      1: {
        gl: "\u2a21",
        nm: "z notation schema projection",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2a22": {
      0: null,
      1: {
        gl: "\u2a22",
        nm: "plus sign with small circle above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a23": {
      0: null,
      1: {
        gl: "\u2a23",
        nm: "plus sign with circumflex accent above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a24": {
      0: null,
      1: {
        gl: "\u2a24",
        nm: "plus sign with tilde above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a25": {
      0: null,
      1: {
        gl: "\u2a25",
        nm: "plus sign with dot below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a26": {
      0: null,
      1: {
        gl: "\u2a26",
        nm: "plus sign with tilde below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a27": {
      0: null,
      1: {
        gl: "\u2a27",
        nm: "plus sign with subscript two",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a28": {
      0: null,
      1: {
        gl: "\u2a28",
        nm: "plus sign with black triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a29": {
      0: null,
      1: {
        gl: "\u2a29",
        nm: "minus sign with comma above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2a": {
      0: null,
      1: {
        gl: "\u2a2a",
        nm: "minus sign with dot below",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2b": {
      0: null,
      1: {
        gl: "\u2a2b",
        nm: "minus sign with falling dots",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2c": {
      0: null,
      1: {
        gl: "\u2a2c",
        nm: "minus sign with rising dots",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2d": {
      0: null,
      1: {
        gl: "\u2a2d",
        nm: "plus sign in left half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2e": {
      0: null,
      1: {
        gl: "\u2a2e",
        nm: "plus sign in right half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a2f": {
      0: null,
      1: {
        gl: "\u2a2f",
        nm: "vector or cross product",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a30": {
      0: null,
      1: {
        gl: "\u2a30",
        nm: "multiplication sign with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a31": {
      0: null,
      1: {
        gl: "\u2a31",
        nm: "multiplication sign with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a32": {
      0: null,
      1: {
        gl: "\u2a32",
        nm: "semidirect product with bottom closed",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a33": {
      0: null,
      1: { gl: "\u2a33", nm: "smash product", pr: 265, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u2a34": {
      0: null,
      1: {
        gl: "\u2a34",
        nm: "multiplication sign in left half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a35": {
      0: null,
      1: {
        gl: "\u2a35",
        nm: "multiplication sign in right half circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a36": {
      0: null,
      1: {
        gl: "\u2a36",
        nm: "circled multiplication sign with circumflex accent",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a37": {
      0: null,
      1: {
        gl: "\u2a37",
        nm: "multiplication sign in double circle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a38": {
      0: null,
      1: {
        gl: "\u2a38",
        nm: "circled division sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a39": {
      0: null,
      1: {
        gl: "\u2a39",
        nm: "plus sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3a": {
      0: null,
      1: {
        gl: "\u2a3a",
        nm: "minus sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3b": {
      0: null,
      1: {
        gl: "\u2a3b",
        nm: "multiplication sign in triangle",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3c": {
      0: null,
      1: {
        gl: "\u2a3c",
        nm: "interior product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3d": {
      0: null,
      1: {
        gl: "\u2a3d",
        nm: "righthand interior product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3e": {
      0: null,
      1: {
        gl: "\u2a3e",
        nm: "z notation relational composition",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a3f": {
      0: null,
      1: {
        gl: "\u2a3f",
        nm: "amalgamation or coproduct",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a40": {
      0: null,
      1: {
        gl: "\u2a40",
        nm: "intersection with dot",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a41": {
      0: null,
      1: {
        gl: "\u2a41",
        nm: "union with minus sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a42": {
      0: null,
      1: {
        gl: "\u2a42",
        nm: "union with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a43": {
      0: null,
      1: {
        gl: "\u2a43",
        nm: "intersection with overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a44": {
      0: null,
      1: {
        gl: "\u2a44",
        nm: "intersection with logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a45": {
      0: null,
      1: {
        gl: "\u2a45",
        nm: "union with logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a46": {
      0: null,
      1: {
        gl: "\u2a46",
        nm: "union above intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a47": {
      0: null,
      1: {
        gl: "\u2a47",
        nm: "intersection above union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a48": {
      0: null,
      1: {
        gl: "\u2a48",
        nm: "union above bar above intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a49": {
      0: null,
      1: {
        gl: "\u2a49",
        nm: "intersection above bar above union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4a": {
      0: null,
      1: {
        gl: "\u2a4a",
        nm: "union beside and joined with union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4b": {
      0: null,
      1: {
        gl: "\u2a4b",
        nm: "intersection beside and joined with intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4c": {
      0: null,
      1: {
        gl: "\u2a4c",
        nm: "closed union with serifs",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4d": {
      0: null,
      1: {
        gl: "\u2a4d",
        nm: "closed intersection with serifs",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4e": {
      0: null,
      1: {
        gl: "\u2a4e",
        nm: "double square intersection",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a4f": {
      0: null,
      1: {
        gl: "\u2a4f",
        nm: "double square union",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a50": {
      0: null,
      1: {
        gl: "\u2a50",
        nm: "closed union with serifs and smash product",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a51": {
      0: null,
      1: {
        gl: "\u2a51",
        nm: "logical and with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a52": {
      0: null,
      1: {
        gl: "\u2a52",
        nm: "logical or with dot above",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a53": {
      0: null,
      1: {
        gl: "\u2a53",
        nm: "double logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a54": {
      0: null,
      1: {
        gl: "\u2a54",
        nm: "double logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a55": {
      0: null,
      1: {
        gl: "\u2a55",
        nm: "two intersecting logical and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a56": {
      0: null,
      1: {
        gl: "\u2a56",
        nm: "two intersecting logical or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a57": {
      0: null,
      1: {
        gl: "\u2a57",
        nm: "sloping large or",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a58": {
      0: null,
      1: {
        gl: "\u2a58",
        nm: "sloping large and",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a59": {
      0: null,
      1: {
        gl: "\u2a59",
        nm: "logical or overlapping logical and",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a5a": {
      0: null,
      1: {
        gl: "\u2a5a",
        nm: "logical and with middle stem",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5b": {
      0: null,
      1: {
        gl: "\u2a5b",
        nm: "logical or with middle stem",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5c": {
      0: null,
      1: {
        gl: "\u2a5c",
        nm: "logical and with horizontal dash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5d": {
      0: null,
      1: {
        gl: "\u2a5d",
        nm: "logical or with horizontal dash",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5e": {
      0: null,
      1: {
        gl: "\u2a5e",
        nm: "logical and with double overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a5f": {
      0: null,
      1: {
        gl: "\u2a5f",
        nm: "logical and with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a60": {
      0: null,
      1: {
        gl: "\u2a60",
        nm: "logical and with double underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a61": {
      0: null,
      1: {
        gl: "\u2a61",
        nm: "small vee with underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a62": {
      0: null,
      1: {
        gl: "\u2a62",
        nm: "logical or with double overbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a63": {
      0: null,
      1: {
        gl: "\u2a63",
        nm: "logical or with double underbar",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a64": {
      0: null,
      1: {
        gl: "\u2a64",
        nm: "z notation domain antirestriction",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a65": {
      0: null,
      1: {
        gl: "\u2a65",
        nm: "z notation range antirestriction",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a66": {
      0: null,
      1: {
        gl: "\u2a66",
        nm: "equals sign with dot below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a67": {
      0: null,
      1: {
        gl: "\u2a67",
        nm: "identical with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a68": {
      0: null,
      1: {
        gl: "\u2a68",
        nm: "triple horizontal bar with double vertical stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a69": {
      0: null,
      1: {
        gl: "\u2a69",
        nm: "triple horizontal bar with triple vertical stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6a": {
      0: null,
      1: {
        gl: "\u2a6a",
        nm: "tilde operator with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6b": {
      0: null,
      1: {
        gl: "\u2a6b",
        nm: "tilde operator with rising dots",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6c": {
      0: null,
      1: {
        gl: "\u2a6c",
        nm: "similar minus similar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6d": {
      0: null,
      1: {
        gl: "\u2a6d",
        nm: "congruent with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6e": {
      0: null,
      1: {
        gl: "\u2a6e",
        nm: "equals with asterisk",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a6f": {
      0: null,
      1: {
        gl: "\u2a6f",
        nm: "almost equal to with circumflex accent",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a70": {
      0: null,
      1: {
        gl: "\u2a70",
        nm: "approximately equal or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a71": {
      0: null,
      1: {
        gl: "\u2a71",
        nm: "equals sign above plus sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a72": {
      0: null,
      1: {
        gl: "\u2a72",
        nm: "plus sign above equals sign",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2a73": {
      0: null,
      1: {
        gl: "\u2a73",
        nm: "equals sign above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a74": {
      0: null,
      1: {
        gl: "\u2a74",
        nm: "double colon equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a75": {
      0: null,
      1: {
        gl: "\u2a75",
        nm: "two consecutive equals signs",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a76": {
      0: null,
      1: {
        gl: "\u2a76",
        nm: "three consecutive equals signs",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a77": {
      0: null,
      1: {
        gl: "\u2a77",
        nm: "equals sign with two dots above and two dots below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a78": {
      0: null,
      1: {
        gl: "\u2a78",
        nm: "equivalent with four dots above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a79": {
      0: null,
      1: {
        gl: "\u2a79",
        nm: "less-than with circle inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7a": {
      0: null,
      1: {
        gl: "\u2a7a",
        nm: "greater-than with circle inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7b": {
      0: null,
      1: {
        gl: "\u2a7b",
        nm: "less-than with question mark above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7c": {
      0: null,
      1: {
        gl: "\u2a7c",
        nm: "greater-than with question mark above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7d": {
      0: null,
      1: {
        gl: "\u2a7d",
        nm: "less-than or slanted equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7d\u0338": {
      0: null,
      1: {
        gl: "\u2a7d\u0338",
        nm: "less-than or slanted equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7e": {
      0: null,
      1: {
        gl: "\u2a7e",
        nm: "greater-than or slanted equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7e\u0338": {
      0: null,
      1: {
        gl: "\u2a7e\u0338",
        nm: "greater-than or slanted equal to with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a7f": {
      0: null,
      1: {
        gl: "\u2a7f",
        nm: "less-than or slanted equal to with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a80": {
      0: null,
      1: {
        gl: "\u2a80",
        nm: "greater-than or slanted equal to with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a81": {
      0: null,
      1: {
        gl: "\u2a81",
        nm: "less-than or slanted equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a82": {
      0: null,
      1: {
        gl: "\u2a82",
        nm: "greater-than or slanted equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a83": {
      0: null,
      1: {
        gl: "\u2a83",
        nm: "less-than or slanted equal to with dot above right",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a84": {
      0: null,
      1: {
        gl: "\u2a84",
        nm: "greater-than or slanted equal to with dot above left",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a85": {
      0: null,
      1: {
        gl: "\u2a85",
        nm: "less-than or approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a86": {
      0: null,
      1: {
        gl: "\u2a86",
        nm: "greater-than or approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a87": {
      0: null,
      1: {
        gl: "\u2a87",
        nm: "less-than and single-line not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a88": {
      0: null,
      1: {
        gl: "\u2a88",
        nm: "greater-than and single-line not equal to",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a89": {
      0: null,
      1: {
        gl: "\u2a89",
        nm: "less-than and not approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8a": {
      0: null,
      1: {
        gl: "\u2a8a",
        nm: "greater-than and not approximate",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8b": {
      0: null,
      1: {
        gl: "\u2a8b",
        nm: "less-than above double-line equal above greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8c": {
      0: null,
      1: {
        gl: "\u2a8c",
        nm: "greater-than above double-line equal above less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8d": {
      0: null,
      1: {
        gl: "\u2a8d",
        nm: "less-than above similar or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8e": {
      0: null,
      1: {
        gl: "\u2a8e",
        nm: "greater-than above similar or equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a8f": {
      0: null,
      1: {
        gl: "\u2a8f",
        nm: "less-than above similar above greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a90": {
      0: null,
      1: {
        gl: "\u2a90",
        nm: "greater-than above similar above less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a91": {
      0: null,
      1: {
        gl: "\u2a91",
        nm: "less-than above greater-than above double-line equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a92": {
      0: null,
      1: {
        gl: "\u2a92",
        nm: "greater-than above less-than above double-line equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a93": {
      0: null,
      1: {
        gl: "\u2a93",
        nm:
          "less-than above slanted equal above greater-than above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a94": {
      0: null,
      1: {
        gl: "\u2a94",
        nm:
          "greater-than above slanted equal above less-than above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a95": {
      0: null,
      1: {
        gl: "\u2a95",
        nm: "slanted equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a96": {
      0: null,
      1: {
        gl: "\u2a96",
        nm: "slanted equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a97": {
      0: null,
      1: {
        gl: "\u2a97",
        nm: "slanted equal to or less-than with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a98": {
      0: null,
      1: {
        gl: "\u2a98",
        nm: "slanted equal to or greater-than with dot inside",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a99": {
      0: null,
      1: {
        gl: "\u2a99",
        nm: "double-line equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9a": {
      0: null,
      1: {
        gl: "\u2a9a",
        nm: "double-line equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9b": {
      0: null,
      1: {
        gl: "\u2a9b",
        nm: "double-line slanted equal to or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9c": {
      0: null,
      1: {
        gl: "\u2a9c",
        nm: "double-line slanted equal to or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9d": {
      0: null,
      1: {
        gl: "\u2a9d",
        nm: "similar or less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9e": {
      0: null,
      1: {
        gl: "\u2a9e",
        nm: "similar or greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2a9f": {
      0: null,
      1: {
        gl: "\u2a9f",
        nm: "similar above less-than above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa0": {
      0: null,
      1: {
        gl: "\u2aa0",
        nm: "similar above greater-than above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa1": {
      0: null,
      1: {
        gl: "\u2aa1",
        nm: "double nested less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa1\u0338": {
      0: null,
      1: {
        gl: "\u2aa1\u0338",
        nm: "double nested less-than with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa2": {
      0: null,
      1: {
        gl: "\u2aa2",
        nm: "double nested greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa2\u0338": {
      0: null,
      1: {
        gl: "\u2aa2\u0338",
        nm: "double nested greater-than with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa3": {
      0: null,
      1: {
        gl: "\u2aa3",
        nm: "double nested less-than with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa4": {
      0: null,
      1: {
        gl: "\u2aa4",
        nm: "greater-than overlapping less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa5": {
      0: null,
      1: {
        gl: "\u2aa5",
        nm: "greater-than beside less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa6": {
      0: null,
      1: {
        gl: "\u2aa6",
        nm: "less-than closed by curve",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa7": {
      0: null,
      1: {
        gl: "\u2aa7",
        nm: "greater-than closed by curve",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa8": {
      0: null,
      1: {
        gl: "\u2aa8",
        nm: "less-than closed by curve above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aa9": {
      0: null,
      1: {
        gl: "\u2aa9",
        nm: "greater-than closed by curve above slanted equal",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaa": {
      0: null,
      1: { gl: "\u2aaa", nm: "smaller than", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aab": {
      0: null,
      1: { gl: "\u2aab", nm: "larger than", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aac": {
      0: null,
      1: {
        gl: "\u2aac",
        nm: "smaller than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aad": {
      0: null,
      1: {
        gl: "\u2aad",
        nm: "larger than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aae": {
      0: null,
      1: {
        gl: "\u2aae",
        nm: "equals sign with bumpy above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaf": {
      0: null,
      1: {
        gl: "\u2aaf",
        nm: "precedes above single-line equals sign",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aaf\u0338": {
      0: null,
      1: {
        gl: "\u2aaf\u0338",
        nm: "precedes above single-line equals sign with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab0": {
      0: null,
      1: {
        gl: "\u2ab0",
        nm: "succeeds above single-line equals sign",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab0\u0338": {
      0: null,
      1: {
        gl: "\u2ab0\u0338",
        nm: "succeeds above single-line equals sign with slash",
        pr: 260,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab1": {
      0: null,
      1: {
        gl: "\u2ab1",
        nm: "precedes above single-line not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab2": {
      0: null,
      1: {
        gl: "\u2ab2",
        nm: "succeeds above single-line not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab3": {
      0: null,
      1: {
        gl: "\u2ab3",
        nm: "precedes above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab4": {
      0: null,
      1: {
        gl: "\u2ab4",
        nm: "succeeds above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab5": {
      0: null,
      1: {
        gl: "\u2ab5",
        nm: "precedes above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab6": {
      0: null,
      1: {
        gl: "\u2ab6",
        nm: "succeeds above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab7": {
      0: null,
      1: {
        gl: "\u2ab7",
        nm: "precedes above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab8": {
      0: null,
      1: {
        gl: "\u2ab8",
        nm: "succeeds above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ab9": {
      0: null,
      1: {
        gl: "\u2ab9",
        nm: "precedes above not almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aba": {
      0: null,
      1: {
        gl: "\u2aba",
        nm: "succeeds above not almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2abb": {
      0: null,
      1: { gl: "\u2abb", nm: "double precedes", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abc": {
      0: null,
      1: { gl: "\u2abc", nm: "double succeeds", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abd": {
      0: null,
      1: { gl: "\u2abd", nm: "subset with dot", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2abe": {
      0: null,
      1: {
        gl: "\u2abe",
        nm: "superset with dot",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2abf": {
      0: null,
      1: {
        gl: "\u2abf",
        nm: "subset with plus sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac0": {
      0: null,
      1: {
        gl: "\u2ac0",
        nm: "superset with plus sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac1": {
      0: null,
      1: {
        gl: "\u2ac1",
        nm: "subset with multiplication sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac2": {
      0: null,
      1: {
        gl: "\u2ac2",
        nm: "superset with multiplication sign below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac3": {
      0: null,
      1: {
        gl: "\u2ac3",
        nm: "subset of or equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac4": {
      0: null,
      1: {
        gl: "\u2ac4",
        nm: "superset of or equal to with dot above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac5": {
      0: null,
      1: {
        gl: "\u2ac5",
        nm: "subset of above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac6": {
      0: null,
      1: {
        gl: "\u2ac6",
        nm: "superset of above equals sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac7": {
      0: null,
      1: {
        gl: "\u2ac7",
        nm: "subset of above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac8": {
      0: null,
      1: {
        gl: "\u2ac8",
        nm: "superset of above tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ac9": {
      0: null,
      1: {
        gl: "\u2ac9",
        nm: "subset of above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aca": {
      0: null,
      1: {
        gl: "\u2aca",
        nm: "superset of above almost equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acb": {
      0: null,
      1: {
        gl: "\u2acb",
        nm: "subset of above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acc": {
      0: null,
      1: {
        gl: "\u2acc",
        nm: "superset of above not equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acd": {
      0: null,
      1: {
        gl: "\u2acd",
        nm: "square left open box operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ace": {
      0: null,
      1: {
        gl: "\u2ace",
        nm: "square right open box operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2acf": {
      0: null,
      1: { gl: "\u2acf", nm: "closed subset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ad0": {
      0: null,
      1: { gl: "\u2ad0", nm: "closed superset", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ad1": {
      0: null,
      1: {
        gl: "\u2ad1",
        nm: "closed subset or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad2": {
      0: null,
      1: {
        gl: "\u2ad2",
        nm: "closed superset or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad3": {
      0: null,
      1: {
        gl: "\u2ad3",
        nm: "subset above superset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad4": {
      0: null,
      1: {
        gl: "\u2ad4",
        nm: "superset above subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad5": {
      0: null,
      1: {
        gl: "\u2ad5",
        nm: "subset above subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad6": {
      0: null,
      1: {
        gl: "\u2ad6",
        nm: "superset above superset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad7": {
      0: null,
      1: {
        gl: "\u2ad7",
        nm: "superset beside subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad8": {
      0: null,
      1: {
        gl: "\u2ad8",
        nm: "superset beside and joined by dash with subset",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ad9": {
      0: null,
      1: {
        gl: "\u2ad9",
        nm: "element of opening downwards",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ada": {
      0: null,
      1: {
        gl: "\u2ada",
        nm: "pitchfork with tee top",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2adb": {
      0: null,
      1: {
        gl: "\u2adb",
        nm: "transversal intersection",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2add": {
      0: null,
      1: { gl: "\u2add", nm: "nonforking", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2add\u0338": {
      0: null,
      1: {
        gl: "\u2add\u0338",
        nm: "nonforking with slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ade": {
      0: null,
      1: { gl: "\u2ade", nm: "short left tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2adf": {
      0: null,
      1: { gl: "\u2adf", nm: "short down tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ae0": {
      0: null,
      1: { gl: "\u2ae0", nm: "short up tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2ae1": {
      0: null,
      1: {
        gl: "\u2ae1",
        nm: "perpendicular with s",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae2": {
      0: null,
      1: {
        gl: "\u2ae2",
        nm: "vertical bar triple right turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae3": {
      0: null,
      1: {
        gl: "\u2ae3",
        nm: "double vertical bar left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae4": {
      0: null,
      1: {
        gl: "\u2ae4",
        nm: "vertical bar double left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae5": {
      0: null,
      1: {
        gl: "\u2ae5",
        nm: "double vertical bar double left turnstile",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae6": {
      0: null,
      1: {
        gl: "\u2ae6",
        nm: "long dash from left member of double vertical",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae7": {
      0: null,
      1: {
        gl: "\u2ae7",
        nm: "short down tack with overbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae8": {
      0: null,
      1: {
        gl: "\u2ae8",
        nm: "short up tack with underbar",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2ae9": {
      0: null,
      1: {
        gl: "\u2ae9",
        nm: "short up tack above short down tack",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aea": {
      0: null,
      1: {
        gl: "\u2aea",
        nm: "double down tack",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aeb": {
      0: null,
      1: { gl: "\u2aeb", nm: "double up tack", pr: 265, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "\u2aec": {
      0: null,
      1: {
        gl: "\u2aec",
        nm: "double stroke not sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aed": {
      0: null,
      1: {
        gl: "\u2aed",
        nm: "reversed double stroke not sign",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aee": {
      0: null,
      1: {
        gl: "\u2aee",
        nm: "does not divide with reversed negation slash",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2aef": {
      0: null,
      1: {
        gl: "\u2aef",
        nm: "vertical line with circle above",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af0": {
      0: null,
      1: {
        gl: "\u2af0",
        nm: "vertical line with circle below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af1": {
      0: null,
      1: {
        gl: "\u2af1",
        nm: "down tack with circle below",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af2": {
      0: null,
      1: {
        gl: "\u2af2",
        nm: "parallel with horizontal stroke",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af3": {
      0: null,
      1: {
        gl: "\u2af3",
        nm: "parallel with tilde operator",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af4": {
      0: null,
      1: {
        gl: "\u2af4",
        nm: "triple vertical bar binary relation",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af5": {
      0: null,
      1: {
        gl: "\u2af5",
        nm: "triple vertical bar with horizontal stroke",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af6": {
      0: null,
      1: {
        gl: "\u2af6",
        nm: "triple colon operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2af7": {
      0: null,
      1: {
        gl: "\u2af7",
        nm: "triple nested less-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af8": {
      0: null,
      1: {
        gl: "\u2af8",
        nm: "triple nested greater-than",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2af9": {
      0: null,
      1: {
        gl: "\u2af9",
        nm: "double-line slanted less-than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2afa": {
      0: null,
      1: {
        gl: "\u2afa",
        nm: "double-line slanted greater-than or equal to",
        pr: 265,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u2afb": {
      0: null,
      1: {
        gl: "\u2afb",
        nm: "triple solidus binary relation",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2afc": {
      0: {
        gl: "\u2afc",
        nm: "large triple vertical bar operator",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2afd": {
      0: null,
      1: {
        gl: "\u2afd",
        nm: "double solidus operator",
        pr: 265,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u2afe": {
      0: null,
      1: {
        gl: "\u2afe",
        nm: "white vertical bar",
        pr: 265,
        ls: 3,
        rs: 3,
        pp: "",
      },
      2: null,
    },
    "\u2aff": {
      0: {
        gl: "\u2aff",
        nm: "n-ary white vertical bar",
        pr: 330,
        ls: 1,
        rs: 2,
        pp: "largeop, movablelimits, symmetric",
      },
      1: null,
      2: null,
    },
    "\u2b45": {
      0: null,
      1: {
        gl: "\u2b45",
        nm: "leftwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u2b46": {
      0: null,
      1: {
        gl: "\u2b46",
        nm: "rightwards quadruple arrow",
        pr: 270,
        ls: 5,
        rs: 5,
        pp: "stretchy",
      },
      2: null,
    },
    "\u02c6": {
      0: null,
      1: null,
      2: {
        gl: "\u02c6",
        nm: "modifier letter circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02c7": {
      0: null,
      1: null,
      2: {
        gl: "\u02c7",
        nm: "caron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02c9": {
      0: null,
      1: null,
      2: {
        gl: "\u02c9",
        nm: "modifier letter macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02ca": {
      0: null,
      1: null,
      2: {
        gl: "\u02ca",
        nm: "modifier letter acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02cb": {
      0: null,
      1: null,
      2: {
        gl: "\u02cb",
        nm: "modifier letter grave accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02cd": {
      0: null,
      1: null,
      2: {
        gl: "\u02cd",
        nm: "modifier letter low macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02d8": {
      0: null,
      1: null,
      2: { gl: "\u02d8", nm: "breve", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u02d9": {
      0: null,
      1: null,
      2: { gl: "\u02d9", nm: "dot above", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u02da": {
      0: null,
      1: null,
      2: {
        gl: "\u02da",
        nm: "ring above",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02dc": {
      0: null,
      1: null,
      2: {
        gl: "&#x2DC;",
        nm: "\u02dcsmall tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u02dd": {
      0: null,
      1: null,
      2: {
        gl: "\u02dd",
        nm: "double acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u02f7": {
      0: null,
      1: null,
      2: {
        gl: "\u02f7",
        nm: "modifier letter low tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u0302": {
      0: null,
      1: null,
      2: {
        gl: "\u0302",
        nm: "combining circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u0311": {
      0: null,
      1: null,
      2: {
        gl: "\u0311",
        nm: "combining inverted breve",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u03f6": {
      0: null,
      1: {
        gl: "\u03f6",
        nm: "greek reversed lunate epsilon symbol",
        pr: 110,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "\u00a8": {
      0: null,
      1: null,
      2: { gl: "\u00a8", nm: "diaeresis", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u00aa": {
      0: null,
      1: null,
      2: {
        gl: "\u00aa",
        nm: "feminine ordinal indicator",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00ac": {
      0: { gl: "\u00ac", nm: "not sign", pr: 680, ls: 2, rs: 1, pp: "" },
      1: null,
      2: null,
    },
    "\u00af": {
      0: null,
      1: null,
      2: {
        gl: "\u00af",
        nm: "macron",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "\u00b0": {
      0: null,
      1: null,
      2: { gl: "\u00b0", nm: "degree sign", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "\u00b1": {
      0: { gl: "\u00b1", nm: "plus-minus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "\u00b1", nm: "plus-minus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u00b2": {
      0: null,
      1: null,
      2: {
        gl: "\u00b2",
        nm: "superscript two",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b3": {
      0: null,
      1: null,
      2: {
        gl: "\u00b3",
        nm: "superscript three",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b4": {
      0: null,
      1: null,
      2: {
        gl: "\u00b4",
        nm: "acute accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00b7": {
      0: null,
      1: { gl: "\u00b7", nm: "middle dot", pr: 400, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "\u00b8": {
      0: null,
      1: null,
      2: { gl: "\u00b8", nm: "cedilla", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "\u00b9": {
      0: null,
      1: null,
      2: {
        gl: "\u00b9",
        nm: "superscript one",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00ba": {
      0: null,
      1: null,
      2: {
        gl: "\u00ba",
        nm: "masculine ordinal indicator",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
    "\u00d7": {
      0: null,
      1: {
        gl: "\u00d7",
        nm: "multiplication sign",
        pr: 390,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "\u00f7": {
      0: null,
      1: { gl: "\u00f7", nm: "division sign", pr: 660, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "&amp": {
      0: null,
      1: null,
      2: { gl: "&", nm: "ampersand", pr: 880, ls: 0, rs: 0, pp: "" },
    },
    "&amp&amp": {
      0: null,
      1: {
        gl: "&&",
        nm: "multiple character operator: &&",
        pr: 200,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "<": {
      0: null,
      1: { gl: "<", nm: "less-than sign", pr: 245, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "&lt=": {
      0: null,
      1: {
        gl: "<=",
        nm: "multiple character operator: <=",
        pr: 241,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    "&lt>": {
      0: null,
      1: {
        gl: "<>",
        nm: "multiple character operator: <>",
        pr: 780,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "(": {
      0: {
        gl: "(",
        nm: "left parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    ")": {
      0: null,
      1: null,
      2: {
        gl: ")",
        nm: "right parenthesis",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "*": {
      0: null,
      1: { gl: "*", nm: "asterisk", pr: 390, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "**": {
      0: null,
      1: {
        gl: "**",
        nm: "multiple character operator: **",
        pr: 780,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "*=": {
      0: null,
      1: {
        gl: "*=",
        nm: "multiple character operator: *=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ",": {
      0: null,
      1: {
        gl: ",",
        nm: "comma",
        pr: 40,
        ls: 0,
        rs: 3,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    ".": {
      0: null,
      1: { gl: ".", nm: "full stop", pr: 390, ls: 3, rs: 3, pp: "" },
      2: null,
    },
    "..": {
      0: null,
      1: null,
      2: {
        gl: "..",
        nm: "multiple character operator: ..",
        pr: 100,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "...": {
      0: null,
      1: null,
      2: {
        gl: "...",
        nm: "multiple character operator: ...",
        pr: 100,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "/": {
      0: null,
      1: { gl: "/", nm: "solidus", pr: 660, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "//": {
      0: null,
      1: {
        gl: "//",
        nm: "multiple character operator: //",
        pr: 820,
        ls: 1,
        rs: 1,
        pp: "",
      },
      2: null,
    },
    "/=": {
      0: null,
      1: {
        gl: "/=",
        nm: "multiple character operator: /=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ":": {
      0: null,
      1: { gl: ":", nm: "colon", pr: 100, ls: 1, rs: 2, pp: "" },
      2: null,
    },
    ":=": {
      0: null,
      1: {
        gl: ":=",
        nm: "multiple character operator: :=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "": {
      0: null,
      1: {
        gl: ";",
        nm: "semicolon",
        pr: 30,
        ls: 0,
        rs: 3,
        pp: "separator, linebreakstyle=after",
      },
      2: null,
    },
    "?": {
      0: null,
      1: { gl: "?", nm: "question mark", pr: 835, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "@": {
      0: null,
      1: { gl: "@", nm: "commercial at", pr: 825, ls: 1, rs: 1, pp: "" },
      2: null,
    },
    "[": {
      0: {
        gl: "[",
        nm: "left square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "\\": {
      0: null,
      1: { gl: "\\", nm: "reverse solidus", pr: 650, ls: 0, rs: 0, pp: "" },
      2: null,
    },
    "]": {
      0: null,
      1: null,
      2: {
        gl: "]",
        nm: "right square bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "^": {
      0: null,
      1: { gl: "^", nm: "circumflex accent", pr: 780, ls: 1, rs: 1, pp: "" },
      2: {
        gl: "^",
        nm: "circumflex accent",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    _: {
      0: null,
      1: { gl: "_", nm: "low line", pr: 900, ls: 1, rs: 1, pp: "" },
      2: {
        gl: "_",
        nm: "low line",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "`": {
      0: null,
      1: null,
      2: { gl: "`", nm: "grave accent", pr: 880, ls: 0, rs: 0, pp: "accent" },
    },
    "{": {
      0: {
        gl: "{",
        nm: "left curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: null,
      2: null,
    },
    "|": {
      0: {
        gl: "|",
        nm: "vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "|",
        nm: "vertical line",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "|",
        nm: "vertical line",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "||": {
      0: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "||",
        nm: "multiple character operator: ||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "|||": {
      0: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
      1: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 270,
        ls: 2,
        rs: 2,
        pp: "fence, stretchy, symmetric",
      },
      2: {
        gl: "|||",
        nm: "multiple character operator: |||",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "}": {
      0: null,
      1: null,
      2: {
        gl: "}",
        nm: "right curly bracket",
        pr: 20,
        ls: 0,
        rs: 0,
        pp: "fence, stretchy, symmetric",
      },
    },
    "~": {
      0: null,
      1: null,
      2: {
        gl: "~",
        nm: "tilde",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "stretchy, accent",
      },
    },
    "+": {
      0: { gl: "+", nm: "plus sign", pr: 275, ls: 0, rs: 1, pp: "" },
      1: { gl: "+", nm: "plus sign", pr: 275, ls: 4, rs: 4, pp: "" },
      2: null,
    },
    "++": {
      0: null,
      1: null,
      2: {
        gl: "++",
        nm: "multiple character operator: ++",
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "",
      },
    },
    "+=": {
      0: null,
      1: {
        gl: "+=",
        nm: "multiple character operator: +=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "=": {
      0: null,
      1: { gl: "=", nm: "equals sign", pr: 260, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "-=": {
      0: null,
      1: {
        gl: "-=",
        nm: "multiple character operator: -=",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    "==": {
      0: null,
      1: {
        gl: "==",
        nm: "multiple character operator: ==",
        pr: 260,
        ls: 4,
        rs: 4,
        pp: "",
      },
      2: null,
    },
    ">": {
      0: null,
      1: { gl: ">", nm: "greater-than sign", pr: 243, ls: 5, rs: 5, pp: "" },
      2: null,
    },
    "->": {
      0: null,
      1: {
        gl: "->",
        nm: "multiple character operator: ->",
        pr: 90,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    ">=": {
      0: null,
      1: {
        gl: ">=",
        nm: "multiple character operator: >=",
        pr: 243,
        ls: 5,
        rs: 5,
        pp: "",
      },
      2: null,
    },
    '"': {
      0: null,
      1: null,
      2: {
        gl: '"',
        nm: 'quotation mark: "',
        pr: 880,
        ls: 0,
        rs: 0,
        pp: "accent",
      },
    },
  };
})();
org.imatheq.formulaeditor.hasLoaded = !1;
if (window.addEventListener) {
  var setLoaded = function () {
    org.imatheq.formulaeditor.hasLoaded = !0;
  };
  window.addEventListener("load", setLoaded, !1);
}