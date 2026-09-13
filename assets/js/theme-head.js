// the head part of the theme: it runs parser blocking and therefore before the
// first paint, so the variant is applied and the scrollbar model is known before
// anything is drawn; everything that may wait for the document lives in theme.js
//
// our input are the `R-<dependency>-config` blocks the dependencies write into the
// head - script elements of a non JavaScript type, which are data blocks the browser
// never executes and a strict CSP therefore never has to allow. the loader hands us
// the `theme` dependency last, so all of them stand in the document by the time we
// run, whatever a consumer called theirs
//
// being parser blocking, we also come before every deferred and every footer script:
// the search adapters find their values, and MathJax - which loads `async` further
// down - finds its global long before it can run itself
//
// this file carries no site or page specific value of its own and is therefore byte
// identical on every page of every site; `script-src 'self'` is all it asks for
window.relearn = window.relearn || {};
window.relearn.readConfig = function (id) {
  var element = document.getElementById(id);
  if (!element) {
    return null;
  }
  var config = {};
  try {
    config = JSON.parse(element.textContent || '{}');
  } catch (e) {
    console.error('relearn: malformed ' + id, e);
  }
  // URLs travel as `data-*-url` attributes instead of inside the JSON: Hugo only
  // rewrites them for `relativeURLs` where the text `url=` precedes the value, and
  // a JSON key can not end in that
  Object.keys(element.dataset).forEach(function (key) {
    config[
      key.replace(/[A-Z]/g, function (c) {
        return '_' + c.toLowerCase();
      })
    ] = element.dataset[key];
  });
  return config;
};

(function () {
  var config = {};
  document.querySelectorAll('script[type="application/json"][id^="R-"][id$="-config"]').forEach(function (element) {
    Object.assign(config, window.relearn.readConfig(element.id));
  });

  Object.keys(config).forEach(function (key) {
    if (key == 'translations' || key == 'themeUseMathJax') {
      return;
    }
    window.relearn[key] = config[key];
  });

  // the translations stay globals of their own, that is how theme.js reads them
  var translations = config.translations || {};
  Object.keys(translations).forEach(function (key) {
    window['T_' + key] = translations[key];
  });

  // the prefix is ours and not configurable, so it stays code and not data
  window.relearn.customvariantprefix = 'my-custom-';

  // MathJax reads a global of its own instead of ours; the defaults are ours,
  // whatever the site configured wins over them
  if (config.themeUseMathJax) {
    window.MathJax = Object.assign(
      window.MathJax || {},
      {
        tex: {
          inlineMath: [
            ['\\(', '\\)'],
            ['$', '$'],
          ],
          displayMath: [
            ['\\[', '\\]'],
            ['$$', '$$'],
          ],
        },
        options: {
          enableMenu: false, // avoid translation hassle for context menu
        },
      },
      config.themeUseMathJax
    );
  }
})();

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
window.relearn.markVariant();

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
