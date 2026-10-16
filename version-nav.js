/**
 * Arrow-key version switcher for Snehith Infra samples.
 * ← previous version · → next version
 * Skips when typing in form fields or using modifier keys.
 */
(function () {
  "use strict";

  var MAX_VERSION = 135;

  function pathname() {
    return (location.pathname || "").replace(/\\/g, "/");
  }

  function currentVersion() {
    var match = pathname().match(/\/v(\d+)(?:\/|$)/i);
    if (match) return parseInt(match[1], 10);
    return 1;
  }

  function inVersionFolder() {
    return /\/v\d+(?:\/|$)/i.test(pathname());
  }

  function urlFor(version) {
    if (version < 1) version = MAX_VERSION;
    if (version > MAX_VERSION) version = 1;

    if (version === 1) {
      return inVersionFolder() ? "../index.html" : "./index.html";
    }
    return inVersionFolder() ? "../v" + version + "/" : "./v" + version + "/";
  }

  function isTypingTarget(el) {
    if (!el || el === document.body) return false;
    var tag = (el.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.isContentEditable) return true;
    return false;
  }

  document.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTypingTarget(event.target)) return;

      var key = event.key;
      if (key !== "ArrowLeft" && key !== "ArrowRight") return;

      var current = currentVersion();
      var next = key === "ArrowRight" ? current + 1 : current - 1;
      if (next < 1) next = MAX_VERSION;
      if (next > MAX_VERSION) next = 1;

      event.preventDefault();
      location.assign(urlFor(next));
    },
    false
  );
})();
