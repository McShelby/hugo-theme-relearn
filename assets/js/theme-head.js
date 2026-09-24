// the head part of the theme: it runs parser blocking and therefore before the
// first paint, so the variant is applied and the scrollbar model is known before
// anything is drawn; everything that may wait for the document lives in theme.js
//
// our input is the `R-theme-config` block standing right before our tag - a script
// element of a non JavaScript type, which is a data block the browser never executes
// and a strict CSP therefore never has to allow. we only read our own block; every
// other dependency reads its own from its own script
//
// this file carries no site or page specific value of its own and is therefore byte
// identical on every page of every site; `script-src 'self'` is all it asks for
window.relearn = window.relearn || {};

(function () {
  var element = document.getElementById('R-theme-config');
  var config = JSON.parse(element.textContent);

  // the translations stay globals of their own, that is how our scripts read them
  Object.keys(config.translations).forEach(function (key) {
    window['T_' + key] = config.translations[key];
  });
  delete config.translations;
  Object.assign(window.relearn, config);

  // URLs travel as `data-*-url` attributes instead of inside the JSON: Hugo only
  // rewrites them for `relativeURLs` where the text `url=` precedes the value, and
  // a JSON key can not end in that
  window.relearn.version_js_url = element.dataset.versionJsUrl;

  // the prefix is ours and not configurable, so it stays code and not data
  window.relearn.customvariantprefix = 'my-custom-';
})();

// stylesheets marked `R-async-style` are fetched for print media so they do not hold
// the first paint; once one is there we apply it everywhere. it may have arrived
// before we run - its `sheet` is set then and no `load` event will follow - and as we
// check and listen in the same task, it can not slip in between
document.querySelectorAll('link.R-async-style').forEach(function (link) {
  var apply = function () {
    link.media = 'all';
  };
  if (link.sheet) {
    apply();
  } else {
    link.addEventListener('load', apply, { once: true });
  }
});

window.relearn.changeVariant = function (variant) {
  var oldVariant = document.documentElement.dataset.rThemeVariant;
  window.localStorage.setItem(window.relearn.absBaseUri + '/variant', variant);
  document.documentElement.dataset.rThemeVariant = variant;
  if (oldVariant != variant) {
    document.dispatchEvent(new CustomEvent('themeVariantLoaded', { detail: { variant, oldVariant } }));
    window.relearn.markVariant();
  }
};

window.relearn.markVariant = function () {
  var variant = window.localStorage.getItem(window.relearn.absBaseUri + '/variant');
  document.querySelectorAll('.R-variantswitcher select').forEach((select) => {
    select.value = variant;
  });
};

window.relearn.initVariant = function () {
  var variant = window.localStorage.getItem(window.relearn.absBaseUri + '/variant') ?? '';
  if (
    !variant ||
    (!variant.startsWith(window.relearn.customvariantprefix) && !window.relearn.themevariants.includes(variant)) ||
    (variant.startsWith(window.relearn.customvariantprefix) && !window.localStorage.getItem(window.relearn.absBaseUri + '/variantstylesheet-' + variant))
  ) {
    variant = window.relearn.themevariants[0];
    window.localStorage.setItem(window.relearn.absBaseUri + '/variant', variant);
  }
  document.documentElement.dataset.rThemeVariant = variant;
};

window.relearn.initVariant();

// the markup preselects the first variant and the switcher is drawn while the parser
// is still busy. mutation callbacks run before the next paint, so we correct the
// switcher as soon as it appears; its options arrive one by one, so we keep at it
// until the document is parsed
(function () {
  var observer = new MutationObserver(function () {
    window.relearn.markVariant();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      observer.disconnect();
      window.relearn.markVariant();
    },
    { once: true }
  );
})();

// the browsers scrollbar style has to be known before the first paint; measuring it
// in theme.js would leave the menu with a space taking scrollbar - clipping its
// border and the active entry - for as long as the scripts loaded before it take to run
window.relearn.scrollbarSize = (function () {
  // https://davidwalsh.name/detect-scrollbar-width; we run in the head, so there is no body yet
  var scrollDiv = document.createElement('div');
  scrollDiv.className = 'scrollbar-measure';
  var parent = document.body || document.documentElement;
  parent.appendChild(scrollDiv);
  var size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  parent.removeChild(scrollDiv);
  return size;
})();
if (window.relearn.scrollbarSize) {
  // classic scrollbars take away space, overlay scrollbars - measuring zero - don't;
  // only in the first case the menu has to draw its scrollbar itself
  document.documentElement.classList.add('classic-scrollbars');
}
