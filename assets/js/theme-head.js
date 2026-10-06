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

  // what we keep in the browsers storage is filed below the root of the site as it is
  // served, which may be another host than the configured `baseURL` or the file
  // system; this script sits in the `js` directory of that root, whatever page loads it
  window.relearn.absBaseUri = new URL('..', document.currentScript.src).href.replace(/\/+$/, '');

  window.relearn.version_js_url = element.dataset.versionJsUrl;
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

// a custom variant is not built by Hugo but made in the browser, which keeps it in its
// storage by its identifier: a `name` like any other variant has and a `stylesheet`
// that applies as it is. we replay what we find there and leave the rest to its author
window.relearn.customVariants = function () {
  return JSON.parse(window.localStorage.getItem(window.relearn.absBaseUri + '/customvariants') || '{}');
};

// the stylesheets of the custom variants are replaced as a whole by what the storage holds
// now; we remember the ones we made, as others adopt stylesheets of their own.
// a stylesheet made in script is none a content security policy has a say in, other than a `<style>` element
window.relearn.customVariantSheets = [];
window.relearn.applyCustomVariants = function () {
  var sheets = Object.values(window.relearn.customVariants()).map(function (customVariant) {
    var sheet = new CSSStyleSheet();
    sheet.replaceSync(customVariant.stylesheet);
    return sheet;
  });
  document.adoptedStyleSheets = document.adoptedStyleSheets.filter((sheet) => !window.relearn.customVariantSheets.includes(sheet)).concat(sheets);
  window.relearn.customVariantSheets = sheets;
};

window.relearn.markVariant = function () {
  var variant = window.localStorage.getItem(window.relearn.absBaseUri + '/variant');
  var customVariants = window.relearn.customVariants();
  document.querySelectorAll('.R-variantswitcher select').forEach((select) => {
    // an entry that is neither of the markup nor in the storage is a custom variant that is gone
    Array.from(select.options).forEach((option) => {
      if (!window.relearn.themevariants.includes(option.value) && !Object.hasOwn(customVariants, option.value)) {
        option.remove();
      }
    });
    // a custom variant follows the ones of the markup, so it has to wait until the parser is done with those
    if (select.nextSibling || document.readyState != 'loading') {
      Object.keys(customVariants).forEach((identifier) => {
        if (!Array.from(select.options).some((option) => option.value == identifier)) {
          select.add(new Option(customVariants[identifier].name, identifier));
        }
      });
    }
    select.value = variant;
  });
};

// a `variant` query parameter selects a variant like the reader does with the variant
// switcher: it goes into the storage, where everything else reads it from. it is a
// one-time request, so it leaves the URL afterwards; if it stayed, a reload would undo
// what the reader has selected since. a variant we don't know leaves the selection alone
window.relearn.adoptVariantParam = function () {
  var url = new URL(window.location.href);
  var variant = url.searchParams.get('variant');
  if (variant === null) {
    return;
  }
  if (window.relearn.themevariants.includes(variant) || Object.hasOwn(window.relearn.customVariants(), variant)) {
    window.localStorage.setItem(window.relearn.absBaseUri + '/variant', variant);
  }
  url.searchParams.delete('variant');
  window.history.replaceState(window.history.state, '', url);
};

window.relearn.initVariant = function () {
  var variant = window.localStorage.getItem(window.relearn.absBaseUri + '/variant') ?? '';
  if (!window.relearn.themevariants.includes(variant) && !Object.hasOwn(window.relearn.customVariants(), variant)) {
    variant = window.relearn.themevariants[0];
    window.localStorage.setItem(window.relearn.absBaseUri + '/variant', variant);
  }
  document.documentElement.dataset.rThemeVariant = variant;
};

// a change of the variant recolors the whole page at once, so we let the browser fade
// from what it shows to what `update` makes of it; where it can not, or the reader
// asked for less motion, the change is there at once
window.relearn.fadeVariant = function (update) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }
  document.startViewTransition(update);
};

window.relearn.applyCustomVariants();
window.relearn.adoptVariantParam();
window.relearn.initVariant();

// a page the browser kept alive in its back/forward cache comes back as it was left,
// without running us again; what was selected or changed on another page since then
// is in the storage, and we bring the page in line with it
window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var oldVariant = document.documentElement.dataset.rThemeVariant;
  var update = function () {
    window.relearn.applyCustomVariants();
    window.relearn.initVariant();
    window.relearn.markVariant();
    var variant = document.documentElement.dataset.rThemeVariant;
    if (oldVariant != variant) {
      document.dispatchEvent(new CustomEvent('themeVariantLoaded', { detail: { variant, oldVariant } }));
    }
  };
  // a page that keeps its variant has nothing to fade
  if (window.localStorage.getItem(window.relearn.absBaseUri + '/variant') == oldVariant) {
    update();
  } else {
    window.relearn.fadeVariant(update);
  }
});

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
        return e.closest('.tab-panel') == tab;
      })
      .forEach(function (e) {
        var active = e.dataset.tabItem == tabId;
        e.classList.toggle('active', active);
        // the state attributes belong to the tabs only, their contents carry none
        if (!e.classList.contains('tab-nav-button')) {
          return;
        }
        // of all tabs of a panel only the selected one is a stop for the tab key,
        // the others are reached from there by the arrow keys
        e.setAttribute('aria-selected', active ? 'true' : 'false');
        e.setAttribute('tabindex', active ? '0' : '-1');
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
