// the head part of the theme: it runs parser blocking and therefore before the
// first paint, so the variant is applied and the scrollbar model is known before
// anything is drawn; everything that may wait for the document lives in theme.js
window.relearn = window.relearn || {};

(function () {
  var element = document.querySelector('#R-theme-config');
  var config = JSON.parse(element.textContent);

  // the translations stay globals of their own, that is how our scripts read them
  Object.keys(config.translations).forEach(function (key) {
    window['T_' + key] = config.translations[key];
  });
  delete config.translations;
  Object.assign(window.relearn, config);

  window.relearn.version_js_url = element.dataset.versionJsUrl;

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
  if (!variant || (!variant.startsWith(window.relearn.customvariantprefix) && !window.relearn.themevariants.includes(variant)) || (variant.startsWith(window.relearn.customvariantprefix) && !window.localStorage.getItem(window.relearn.absBaseUri + '/variantstylesheet-' + variant))) {
    variant = window.relearn.themevariants[0];
    window.localStorage.setItem(window.relearn.absBaseUri + '/variant', variant);
  }
  document.documentElement.dataset.rThemeVariant = variant;
};

window.relearn.initVariant();

// activates the tab `tabId` in every panel of `tabGroup` that has one. it only touches
// what is already there and can be run again at will, so it is safe on a panel the
// parser is still busy with: a panel whose tab has not arrived yet is left alone
window.relearn.selectTab = function (tabGroup, tabId) {
  var tabs = Array.from(document.querySelectorAll('.tab-panel[data-tab-group="' + tabGroup + '"]')).filter(function (e) {
    return !!e.querySelector('[data-tab-item="' + tabId + '"]');
  });
  tabs.forEach(function (tab) {
    // only the items of this panel, not those of a panel nested in one of its tabs
    Array.from(tab.querySelectorAll('[data-tab-item]'))
      .filter(function (e) {
        return e.parentNode.parentNode == tab;
      })
      .forEach(function (e) {
        var active = e.dataset.tabItem == tabId;
        e.classList.toggle('active', active);
        e.setAttribute('aria-expanded', active ? 'true' : 'false');
        if (active) {
          e.setAttribute('tabindex', '-1');
        } else {
          e.removeAttribute('tabindex');
        }
      });
  });
};

// the markup preselects the first variant and the first tab of each panel, and both
// are drawn while the parser is still busy. mutation callbacks run before the next
// paint, so we correct them as soon as they appear; as they arrive piece by piece, we
// keep at it until the document is parsed
(function () {
  var tabSelections = JSON.parse(window.localStorage.getItem(window.relearn.absBaseUri + '/tab-selections') || '{}');
  var restoreSelections = function () {
    window.relearn.markVariant();
    Object.keys(tabSelections).forEach(function (tabGroup) {
      window.relearn.selectTab(tabGroup, tabSelections[tabGroup]);
    });
  };
  var observer = new MutationObserver(restoreSelections);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      observer.disconnect();
      restoreSelections();
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
