// ==UserScript==
// @name         ThreeJS Krunker Dev Tools
// @namespace    https://github.com/MasterP-kr
// @version      0.0.1
// @description  ThreeJS Hooker
// @author       MasterP
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    const replace = String.prototype.replace;
    var hideHook = function (fn, oFn) {
       fn.toString = oFn.toString.bind(oFn);
    }
    // only big iq people read this ttap#4547
    // big up my boy hrt and ttap for releasing
    const handler = {
       construct(target, args) {
          if (args.length == 2 && args[1].includes('Seen')) {
             var script = args[1];
             //Three js dev tools hook
             script = replace.call(script, /\w+\['exports'\]\['initScene'\]=function\(\w+,\w+\){/, (a, b) => {
                return `${a}((typeof __THREE_DEVTOOLS__ !== 'undefined') ?(__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.scene })),__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this.renderer }))) : console.error("Three JS Dev tools not loaded"));`
             })
             args[1] = script;
          }
          return new target(...args);
       }
    };
    // credits for bypass: https://github.com/hrt/
    var original_Function = Function;
    Function = new Proxy(Function, handler);
    hideHook(Function, original_Function);
 })()