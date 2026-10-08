window.relearn = window.relearn || {};

var theme = true;
var isPrint = document.querySelector('body').classList.contains('print');
var isPrintPreview = false;

var isRtl = document.querySelector('html').getAttribute('dir') == 'rtl';
var dir_key_start = 'ArrowLeft';
var dir_key_end = 'ArrowRight';
var dir_scroll = 1;
if (isRtl) {
  dir_key_start = 'ArrowRight';
  dir_key_end = 'ArrowLeft';
  dir_scroll = -1;
}

var touchsupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var reducedmotion = window.matchMedia('(prefers-reduced-motion: reduce)');
var hovernone = window.matchMedia('(hover: none)');

var formelements = 'button, datalist, fieldset, input, label, legend, meter, optgroup, option, output, progress, select, textarea';

// how far a cursor key scrolls one of our scroll containers; the browsers
// default for this is neither exposed to us nor the same in all of them
var LINE_SCROLL = 40;
// the keys a browser scrolls with
var SCROLL_KEYS = [' ', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

var elc = document.querySelector('#R-body-inner');

function regexEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function documentFocus() {
  elc.focus();
}

let debounceTimeout;
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Toast notification system
function showToast(message) {
  if (!message) return;

  var container = document.querySelector('#toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-atomic', 'true');
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(function () {
    toast.classList.add('toast-hiding');
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300); // Match the fade-out animation duration
  }, 2000);
}

window.relearn.showToast = showToast;

// the latest hold is the one that keeps its element in place
var holds = 0;

// keeps `element` where it is in the viewport by scrolling the content against
// whatever moves it. `isMoving` is asked once the caller is done with its changes
// and from then on with every step of what it has set off, until it denies; the
// element is put back each time, so once more after the last step
function holdInPlace(element, isMoving) {
  var ypos = element.getBoundingClientRect().top;
  var hold = ++holds;
  var step = function () {
    if (hold != holds) {
      return;
    }
    var yposDiff = element.getBoundingClientRect().top - ypos;
    if (yposDiff && elc) {
      elc.scrollTop += yposDiff;
    }
    isMoving() && requestAnimationFrame(step);
  };
  return step;
}

function switchTab(tabGroup, tabId, button) {
  var holdButton = holdInPlace(button, function () {
    return animations.some(function (animation) {
      return animation.playState == 'running';
    });
  });

  var activeText = function (panel) {
    return panel.querySelector(':scope > .tab-content-container > .tab-content.active > .tab-content-text');
  };
  var areas = Array.from(document.querySelectorAll('.tab-panel[data-tab-group="' + tabGroup + '"]')).map(function (panel) {
    var text = activeText(panel);
    return { panel: panel, text: text, height: text ? text.getBoundingClientRect().height : 0 };
  });

  window.relearn.selectTab(tabGroup, tabId);
  initMermaid(true);

  // the new content is there at once and stays at the upper edge, while the area
  // grows or shrinks from the height of the former content to its own
  var animations = [];
  areas.forEach(function (area) {
    var text = activeText(area.panel);
    if (!text || !area.text || text == area.text || reducedmotion.matches) {
      return;
    }
    // a content still on its way from an earlier switch would report the height
    // it has reached by now instead of its own
    text.getAnimations().forEach(function (animation) {
      animation.cancel();
    });
    var height = text.getBoundingClientRect().height;
    if (height == area.height) {
      return;
    }
    // cut off at the height of the area but not to the sides
    animations.push(
      text.animate(
        [
          { height: area.height + 'px', overflowY: 'clip' },
          { height: height + 'px', overflowY: 'clip' },
        ],
        { duration: 175, easing: 'ease' }
      )
    );
  });

  // the areas above the button move it with every step they take
  holdButton();

  // Store the selection to make it persistent
  if (window.localStorage) {
    var selectionsJSON = window.localStorage.getItem(window.relearn.absBaseUri + '/tab-selections');
    if (selectionsJSON) {
      var tabSelections = JSON.parse(selectionsJSON);
    } else {
      var tabSelections = {};
    }
    tabSelections[tabGroup] = tabId;
    window.localStorage.setItem(window.relearn.absBaseUri + '/tab-selections', JSON.stringify(tabSelections));
  }
}

function handleTabs() {
  // one listener for all tabs, also those added later; the innermost panel is the
  // one a button belongs to
  document.addEventListener('click', function (event) {
    var button = event.target.closest('.tab-nav-button[data-tab-item]');
    if (!button) {
      return;
    }
    var tabPanel = button.closest('.tab-panel[data-tab-group]');
    tabPanel && switchTab(tabPanel.dataset.tabGroup, button.dataset.tabItem, button);
  });

  // inside of a list of tabs the arrow keys move on to the neighbouring tab,
  // which is selected right away
  document.addEventListener('keydown', function (event) {
    if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    var button = event.target.closest('.tab-nav-button[data-tab-item]');
    var list = button && button.parentNode;
    if (!list) {
      return;
    }
    var buttons = Array.from(list.querySelectorAll(':scope > .tab-nav-button[data-tab-item]'));
    var index = buttons.indexOf(button);
    if (event.key == dir_key_start) {
      index = (index + buttons.length - 1) % buttons.length;
    } else if (event.key == dir_key_end) {
      index = (index + 1) % buttons.length;
    } else if (event.key == 'Home') {
      index = 0;
    } else if (event.key == 'End') {
      index = buttons.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    buttons[index].focus();
    buttons[index].click();
  });
}

function handleExpanders() {
  // opening an expander closes the open one of its group; if that sits above, the
  // pressed label moves with every step it rolls in. the expander only changes
  // after the click is through, so we look at it with the next frame
  document.addEventListener('click', function (event) {
    var label = event.target.closest('details.expand[name] > summary');
    if (!label) {
      return;
    }
    // the browser does not tell of the transition of the disclosed content, so we
    // take the time it is given by the stylesheet; without one the label is put
    // back just once
    var duration = getComputedStyle(label.parentNode, '::details-content')
      .transitionDuration.split(',')
      .reduce(function (max, duration) {
        return Math.max(max, parseFloat(duration) * 1000 || 0);
      }, 0);
    var end = 0;
    var holdLabel = holdInPlace(label, function () {
      // a frame may be late, so there is some time to spare
      end = end || performance.now() + duration + 50;
      return performance.now() < end;
    });
    requestAnimationFrame(holdLabel);
  });
}

function mermaidLightbox(box, show) {
  // the graph itself is enlarged instead of a copy of it, so it stays the
  // one graph the reader pans and zooms; returns the button that toggles it
  box.classList.toggle('lightbox', show);
  if (show) {
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
  } else {
    box.removeAttribute('role');
    box.removeAttribute('aria-modal');
  }
  var button = box.querySelector('.svg-lightbox-button button');
  if (button) {
    var label = show ? window.T_Close_graph : window.T_Enlarge_graph;
    button.setAttribute('title', label);
    button.setAttribute('aria-label', label);
    button.querySelector('i').className = 'fa-fw fas ' + (show ? 'fa-compress' : 'fa-expand');
  }
  return button;
}

// whether the enlarged graph was opened from this page, which leaves a history
// entry to return to; a page loaded with the graph already enlarged has none
var mermaidLightboxOpenedHere = false;

function openMermaidLightbox(box) {
  mermaidLightbox(box, true);
  if (box.id) {
    // the enlarged graph has its own URL, so it can be linked to and is left by going back
    mermaidLightboxOpenedHere = true;
    window.history.pushState(window.history.state, '', '#' + box.id);
  }
}

function closeMermaidLightbox() {
  var shown = document.querySelector('.mermaid.lightbox');
  if (!shown) {
    return;
  }
  // return to the button it was opened from
  var button = mermaidLightbox(shown, false);
  button && button.focus();
  if (!shown.id || window.location.hash != '#' + shown.id) {
    return;
  }
  if (mermaidLightboxOpenedHere) {
    // leave the lightbox the way we came instead of adding another history entry
    window.history.back();
  } else {
    // going back would leave the page, so its entry is replaced instead
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  }
}

function syncMermaidLightbox() {
  // the graph named by the URL is the enlarged one; a graph that is not shown in
  // the page, like in a collapsed expander, would cover it with nothing to see
  var id = window.location.hash.slice(1);
  var target = !isPrint && id ? document.getElementById(id) : null;
  if (target && !target.matches('.mermaid-container > .mermaid.mermaid-render')) {
    target = null;
  }
  var shown = document.querySelector('.mermaid.lightbox');
  if (shown == target) {
    return;
  }
  var button = shown && mermaidLightbox(shown, false);
  if (target) {
    // a graph not drawn yet takes the focus once it has its button
    button = mermaidLightbox(target, true);
  }
  button && button.focus();
}

function mermaidLightboxKeyHandler(event) {
  // an enlarged graph lies above everything else, so no key reaches the page below it
  var shown = document.querySelector('.mermaid.lightbox');
  if (!shown) {
    return;
  }
  if (event.key == 'Escape') {
    event.stopPropagation();
    closeMermaidLightbox();
  } else if (event.key == 'Tab') {
    // the focus stays inside
    event.preventDefault();
    event.stopPropagation();
    var stops = Array.from(shown.querySelectorAll(':scope > svg[tabindex], .actionbar button')).filter(function (e) {
      return e.getClientRects().length;
    });
    var index = stops.indexOf(document.activeElement);
    if (index == -1) {
      index = event.shiftKey ? 0 : -1;
    }
    var next = stops[(index + (event.shiftKey ? -1 : 1) + stops.length) % stops.length];
    next && next.focus();
  } else if (!shown.contains(event.target)) {
    event.stopPropagation();
  }
}

function mermaidLightboxClickHandler(event) {
  // the backdrop is drawn by the box, so a click on it has the box as its target
  var shown = document.querySelector('.mermaid.lightbox');
  if (!shown || (event.target != shown && shown.contains(event.target))) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  closeMermaidLightbox();
}

function mermaidPostRender(id) {
  var svgs = d3.selectAll('body:not(.print) .mermaid-container > .mermaid > #' + id);
  svgs.each(function () {
    var parent = this.parentElement;
    var reset = '<span class="btn cstyle svg-reset-button action noborder notitle interactive"><button type="button" title="' + window.T_Reset_view + '" aria-label="' + window.T_Reset_view + '"><i class="fa-fw fas fa-undo-alt" aria-hidden="true"></i></button></span>';
    var enlarge = '<span class="btn cstyle svg-lightbox-button action noborder notitle interactive"><button type="button" title="' + window.T_Enlarge_graph + '" aria-label="' + window.T_Enlarge_graph + '"><i class="fa-fw fas fa-expand" aria-hidden="true"></i></button></span>';
    parent.insertAdjacentHTML('beforeend', '<div class="actionbar">' + reset + enlarge + '</div>');
    var enlargeButton = parent.querySelector('.svg-lightbox-button button');
    enlargeButton.addEventListener('click', function () {
      if (parent.classList.contains('lightbox')) {
        closeMermaidLightbox();
      } else {
        openMermaidLightbox(parent);
      }
    });
    if (parent.classList.contains('lightbox')) {
      // enlarged by its URL before it was drawn
      mermaidLightbox(parent, true);
      enlargeButton.focus();
    }
    // the keys the enlarged graph has no use for must not reach the page below it
    var keepKey = function (event) {
      if (parent.classList.contains('lightbox')) {
        event.stopPropagation();
      }
    };
    this.addEventListener('keydown', keepKey);
    parent.querySelector('.actionbar').addEventListener('keydown', keepKey);
  });

  // zoom for Mermaid
  // https://github.com/mermaid-js/mermaid/issues/1860#issuecomment-1345440607
  svgs = d3.selectAll('body:not(.print) .mermaid-container.zoomable > .mermaid > #' + id);
  svgs.each(function () {
    var parent = this.parentElement;
    var svg = d3.select(this);
    // the graph is panned across the whole box instead of vanishing at its own edges;
    // so it spans the box and is kept from growing by its natural height instead
    var viewBox = this.viewBox.baseVal;
    var naturalWidth = this.style.maxWidth || this.getAttribute('width') || '';
    if (viewBox && viewBox.width && parseFloat(naturalWidth) && !naturalWidth.endsWith('%')) {
      this.style.maxHeight = (parseFloat(naturalWidth) * viewBox.height) / viewBox.width + 'px';
      this.style.maxWidth = 'none';
      this.style.width = '100%';
      var container = parent.parentElement;
      var align = container.classList.contains('align-left') ? 'xMin' : container.classList.contains('align-right') ? 'xMax' : 'xMid';
      this.setAttribute('preserveAspectRatio', align + 'YMid meet');
    }
    svg.html('<g>' + svg.html() + '</g>');
    var inner = svg.select('*:scope > g');
    var wrapper = parent.querySelector('.svg-reset-button');
    var button = wrapper.querySelector('button');
    var zoom = d3.zoom().on('zoom', function (e) {
      inner.attr('transform', e.transform);
      if (e.transform.k == 1 && e.transform.x == 0 && e.transform.y == 0) {
        // the button is about to vanish, so the focus it holds goes back to the graph
        if (document.activeElement == button) {
          svg.node().focus();
        }
        wrapper.classList.remove('zoomed');
      } else {
        wrapper.classList.add('zoomed');
      }
    });
    button.addEventListener('click', function () {
      svg.transition().duration(350).call(zoom.transform, d3.zoomIdentity);
      showToast(window.T_View_reset);
    });
    svg.call(zoom);
    // the keyboard has neither a wheel nor can it drag, so the graph is a stop
    // for the tab key and takes the keys a browser scrolls and zooms with
    this.setAttribute('tabindex', '0');
    var panZoomKey = function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }
      // a step is as far on the screen no matter how far we are zoomed in
      var step = LINE_SCROLL / d3.zoomTransform(svg.node()).k;
      if (event.key == 'ArrowLeft') {
        svg.call(zoom.translateBy, step, 0);
      } else if (event.key == 'ArrowRight') {
        svg.call(zoom.translateBy, -step, 0);
      } else if (event.key == 'ArrowUp') {
        svg.call(zoom.translateBy, 0, step);
      } else if (event.key == 'ArrowDown') {
        svg.call(zoom.translateBy, 0, -step);
      } else if (event.key == '+' || event.key == '=') {
        svg.call(zoom.scaleBy, 1.25);
      } else if (event.key == '-') {
        svg.call(zoom.scaleBy, 0.8);
      } else {
        return;
      }
      // the key is used up; otherwise the page would scroll or be left for its neighbour
      event.preventDefault();
      event.stopPropagation();
    };
    this.addEventListener('keydown', panZoomKey);
    // the buttons belong to the graph, so its keys work from them as well
    parent.querySelector('.actionbar').addEventListener('keydown', panZoomKey);
  });
  // we have to mark again once a graph was drawn, to mark terms inside its SVG
  mark();
}

// drawing a graph is by far the most expensive thing we do - a page full of them
// freezes the browser for seconds if we draw them in one go - so we only draw
// what the reader is about to see and hand the thread back between two of them
var mermaidObserver = null;
var mermaidQueue = [];
var mermaidIsDrawing = false;

function drawMermaidQueue() {
  if (mermaidIsDrawing) {
    return;
  }
  mermaidIsDrawing = true;
  (function next() {
    var element = mermaidQueue.shift();
    while (element && element.dataset.processed) {
      // somebody queued us twice, e.g. by printing while we came into view
      element = mermaidQueue.shift();
    }
    if (!element) {
      mermaidIsDrawing = false;
      return;
    }
    mermaid
      .run({ nodes: [element], postRenderCallback: mermaidPostRender, suppressErrors: true })
      // a graph we can not draw must not stop the ones behind it
      .catch(function () {})
      .then(function () {
        // hand the thread back, so the page stays usable while we work through the rest
        setTimeout(next, 0);
      });
  })();
}

function drawMermaidRest() {
  // everything that never came into view, e.g. because we are about to be printed;
  // nobody scrolls a page that goes to the printer, so we draw it in one go instead
  // of handing back the thread - a throttled timer must not make us end up on paper
  // with half of our graphs missing
  mermaidObserver && mermaidObserver.disconnect();
  mermaidQueue.length = 0;
  mermaid.run({
    querySelector: '.mermaid.mermaid-render:not([data-processed])',
    postRenderCallback: mermaidPostRender,
    suppressErrors: true,
  });
}

function drawMermaid() {
  if (document.readyState != 'complete') {
    // the graphs are the last thing the reader needs, so let the page load first
    window.addEventListener('load', drawMermaid, { once: true });
    return;
  }
  if (isPrint || !window.IntersectionObserver) {
    drawMermaidRest();
    return;
  }
  mermaidObserver && mermaidObserver.disconnect();
  mermaidObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        mermaidObserver.unobserve(entry.target);
        mermaidQueue.push(entry.target);
      });
      drawMermaidQueue();
    },
    // a viewport ahead of time, so scrolling and jumps to an anchor usually find
    // the graph drawn instead of having it grow into place under the reader
    { rootMargin: '100% 0px' }
  );
  document.querySelectorAll('.mermaid.mermaid-render:not([data-processed])').forEach(function (element) {
    mermaidObserver.observe(element);
  });
}

function initMermaid(update, attrs) {
  if (!window.relearn.themeUseMermaid) {
    return;
  }
  var doBeside = true;
  var isImageRtl = isRtl;

  // we are either in update or initialization mode;
  // during initialization, we want to edit the DOM;
  // during update we only want to execute if something changed
  var decodeHTML = function (html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  var encodeHTML = function (text) {
    var html = document.createElement('textarea');
    html.textContent = text;
    return html.innerHTML;
  };

  var parseGraph = function (graph) {
    // See https://github.com/mermaid-js/mermaid/blob/9a080bb975b03b2b1d4ef6b7927d09e6b6b62760/packages/mermaid/src/diagram-api/frontmatter.ts#L10
    // for reference on the regex originally taken from jekyll
    var YAML = 1;
    var INIT = 2;
    var GRAPH = 3;
    var d = /^(?:\s*[\n\r])*(?:-{3}(\s*[\n\r](?:.*?)[\n\r])-{3}(?:\s*[\n\r]+)+)?(?:\s*(?:%%\s*\{\s*\w+\s*:([^%]*?)%%\s*[\n\r]?))?(.*)$/s;
    var m = d.exec(graph);
    var yaml = {};
    var dir = {};
    var content = graph;
    if (m && m.length == 4) {
      yaml = m[YAML] ? jsyaml.load(m[YAML]) : yaml;
      dir = m[INIT] ? JSON.parse('{ "init": ' + m[INIT]).init : dir;
      content = m[GRAPH] ? m[GRAPH] : content;
    }
    var ret = { yaml: yaml, dir: dir, content: content.trim() };
    return ret;
  };

  var serializeGraph = function (graph) {
    var yamlPart = '';
    if (Object.keys(graph.yaml).length) {
      yamlPart = '---\n' + jsyaml.dump(graph.yaml) + '---\n';
    }
    var dirPart = '';
    if (Object.keys(graph.dir).length) {
      dirPart = '%%{init: ' + JSON.stringify(graph.dir) + '}%%\n';
    }
    return yamlPart + dirPart + graph.content;
  };

  var init_func = function (attrs) {
    var is_initialized = false;
    var theme = attrs.theme;
    document.querySelectorAll('.mermaid').forEach(function (element) {
      var parse = parseGraph(decodeHTML(element.innerHTML));

      if (parse.yaml.theme) {
        parse.yaml.relearn_user_theme = true;
      }
      if (parse.dir.theme) {
        parse.dir.relearn_user_theme = true;
      }
      if (!parse.yaml.relearn_user_theme && !parse.dir.relearn_user_theme) {
        parse.yaml.theme = theme;
      }
      is_initialized = true;

      var graph = encodeHTML(serializeGraph(parse));
      var new_element = document.createElement('div');
      var hasActionbarWrapper = element.classList.contains('actionbar-wrapper');
      Array.from(element.attributes).forEach(function (attr) {
        new_element.setAttribute(attr.name, attr.value);
        element.removeAttribute(attr.name);
      });
      new_element.classList.add('mermaid-container');
      new_element.classList.remove('mermaid');
      new_element.classList.remove('actionbar-wrapper');
      if (new_element.dataset.lightboxId) {
        // the box is what is enlarged, so the URL of the enlarged graph names it
        element.id = new_element.dataset.lightboxId;
        delete new_element.dataset.lightboxId;
      }
      element.classList.add('mermaid');
      if (hasActionbarWrapper) {
        element.classList.add('actionbar-wrapper');
      }

      element.innerHTML = graph;
      if (element.offsetParent !== null) {
        element.classList.add('mermaid-render');
      }
      new_element.innerHTML = '<div class="mermaid-code">' + graph + '</div>' + element.outerHTML;
      element.parentNode.replaceChild(new_element, element);
    });
    return is_initialized;
  };

  var update_func = function (attrs) {
    var is_initialized = false;
    var theme = attrs.theme;
    document.querySelectorAll('.mermaid-container').forEach(function (e) {
      var element = e.querySelector('.mermaid');
      var code = e.querySelector('.mermaid-code');
      var parse = parseGraph(decodeHTML(code.innerHTML));

      if (element.classList.contains('mermaid-render')) {
        if (parse.yaml.relearn_user_theme || parse.dir.relearn_user_theme) {
          return;
        }
        if (parse.yaml.theme == theme || parse.dir.theme == theme) {
          return;
        }
      }
      if (element.offsetParent !== null) {
        element.classList.add('mermaid-render');
      } else {
        element.classList.remove('mermaid-render');
        return;
      }
      is_initialized = true;

      parse.yaml.theme = theme;
      var graph = encodeHTML(serializeGraph(parse));
      element.removeAttribute('data-processed');
      element.innerHTML = graph;
      code.innerHTML = graph;
    });
    return is_initialized;
  };

  var state = this;
  if (update && !state.is_initialized) {
    return;
  }
  if (typeof mermaid == 'undefined' || typeof mermaid.mermaidAPI == 'undefined') {
    return;
  }

  if (!state.is_initialized) {
    state.is_initialized = true;
    // capturing, to be asked before anyone else
    document.addEventListener('keydown', mermaidLightboxKeyHandler, true);
    document.addEventListener('click', mermaidLightboxClickHandler, true);
    window.addEventListener('hashchange', function () {
      syncMermaidLightbox();
      mermaidLightboxOpenedHere = !!document.querySelector('.mermaid.lightbox');
    });
    window.addEventListener(
      'beforeprint',
      function () {
        isPrintPreview = true;
        initMermaid(true, {
          theme: getColorValue('PRINT-MERMAID-theme'),
        });
        // the print dialog will not wait for us, but a graph that never came into
        // view must at least be on its way instead of being left out entirely
        drawMermaidRest();
      }.bind(this)
    );
    window.addEventListener(
      'afterprint',
      function () {
        isPrintPreview = false;
        initMermaid(true);
      }.bind(this)
    );
  }

  attrs = attrs || {
    theme: getColorValue('MERMAID-theme'),
  };

  if (update) {
    // an enlarged graph is taken out of the page, where it can neither be
    // printed nor tell whether it is visible
    closeMermaidLightbox();
    unmark();
  }
  var is_initialized = update ? update_func(attrs) : init_func(attrs);
  if (!update) {
    // the page may have been loaded with the URL of an enlarged graph
    syncMermaidLightbox();
  }
  if (is_initialized) {
    mermaid.initialize(Object.assign({ securityLevel: 'antiscript', startOnLoad: false }, window.relearn.mermaidConfig, { theme: attrs.theme }));
    drawMermaid();
  }
  if (update) {
    // if the page loads Mermaid but does not contain any
    // graphs, no drawing will mark() for us and we have to
    // do it at least once here to redo our unmark()
    // call from the beginning of this function
    mark();
  }
}

// the Swagger UI instance of each spec on the page, by the element it is rendered into
var openapiStates = new WeakMap();

function initOpenapi(update, attrs) {
  // the block is only written by the openapi dependency, so without it the page has
  // nothing to render
  var config = document.querySelector('#R-openapi-config');
  if (!config) {
    return;
  }
  var state = this;
  if (update && !state.is_initialized) {
    return;
  }

  if (!state.is_initialized) {
    state.is_initialized = true;
    window.addEventListener(
      'beforeprint',
      function () {
        isPrintPreview = true;
        initOpenapi(true);
      }.bind(this)
    );
    window.addEventListener(
      'afterprint',
      function () {
        isPrintPreview = false;
        initOpenapi(true);
      }.bind(this)
    );
  }

  attrs = attrs || {};

  function loadStylesheet(root, url, integrity) {
    return new Promise(function (resolve) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      // a stylesheet from a custom URL is none of ours, so there is no hash to check against
      if (integrity) {
        link.integrity = integrity;
      }
      // a stylesheet that can not be loaded must not keep the spec from being shown
      link.addEventListener('load', function () {
        resolve(link);
      });
      link.addEventListener('error', function () {
        resolve(link);
      });
      root.appendChild(link);
    });
  }
  function renderOpenAPI(oc) {
    var print = isPrint || isPrintPreview ? 'PRINT-' : '';
    var swagger_theme = getColorValue(print + 'OPENAPI-theme');
    var swagger_code_theme = getColorValue(print + 'OPENAPI-CODE-theme');

    const openapiId = 'relearn-swagger-ui';
    const openapiErrorClass = 'sc-openapi-error';
    const openapiError = oc.previousElementSibling;
    if (openapiError && openapiError.classList.contains(openapiErrorClass)) {
      openapiError.remove();
    }
    // the spec is rendered into a shadow tree, so the styles of the page and the
    // ones of the library don't get into each other's way; the variables of the
    // theme are inherited by the tree and follow the variant of the page
    var root = oc.shadowRoot;
    if (!root) {
      root = oc.attachShadow({ mode: 'open' });
      root.addEventListener('click', function (event) {
        var expander = event.target.closest('.relearn-expander');
        if (!expander) {
          return;
        }
        event.preventDefault();
        expandOpenAPI(root, expander.dataset.expand == 'true');
      });
      new MutationObserver(scheduleMarkOpenapi).observe(root, { childList: true, subtree: true, characterData: true });
    }
    root.replaceChildren();
    // what the reader has opened is known by the instance we are about to replace
    // and is handed on to the new one; printing opens everything by itself and
    // keeps what was there before for the run after it
    var previous = openapiStates.get(oc) || {};
    var shown = previous.shown;
    if (previous.ui && !previous.print) {
      shown = previous.ui.getState().getIn(['layout', 'shown']);
    }
    var current = { ui: null, print: !!print, shown: shown };
    openapiStates.set(oc, current);
    // the shortcode may ask for another language than the one of the page
    oc.dir = (oc.dataset.openapiDir ? oc.dataset.openapiDir == 'rtl' : isRtl) ? 'rtl' : 'ltr';
    oc.classList.toggle('dark-mode', swagger_theme == 'dark');
    Promise.all([loadStylesheet(root, config.dataset.openapiCssUrl, config.dataset.openapiCssIntegrity), loadStylesheet(root, config.dataset.swaggerCssUrl, config.dataset.swaggerCssIntegrity)])
      .then(function (links) {
        if (links[0].parentNode !== root) {
          // a later run has taken over the tree while the stylesheets were loading
          return;
        }
        // the texts of the expanders are translated by the shortcode and set as
        // text, so they need no escaping
        [false, true].forEach(function (expand) {
          var expander = document.createElement('a');
          expander.classList.add('relearn-expander');
          expander.href = '';
          expander.dataset.expand = expand;
          expander.textContent = expand ? oc.dataset.openapiExpandAll || 'Expand all' : oc.dataset.openapiCollapseAll || 'Collapse all';
          root.appendChild(expander);
        });
        var mount = document.createElement('div');
        mount.id = openapiId;
        root.appendChild(mount);
        var options = {
          defaultModelsExpandDepth: 2,
          defaultModelExpandDepth: 2,
          docExpansion: isPrint || isPrintPreview ? 'full' : 'list',
          domNode: mount,
          filter: !(isPrint || isPrintPreview),
          layout: 'BaseLayout',
          onComplete: function () {
            if (isPrint || isPrintPreview) {
              root.querySelectorAll('.model-container > .model-box > button[aria-expanded=false]').forEach(function (btn) {
                btn.click();
              });
            }
          },
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          syntaxHighlight: {
            activated: true,
            theme: swagger_code_theme,
          },
          validatorUrl: 'none',
        };
        if (oc.dataset.openapiSpec) {
          try {
            Object.assign(options, { spec: JSON.parse(oc.dataset.openapiSpec) });
          } catch (err) {
            try {
              Object.assign(options, { spec: jsyaml.load(oc.dataset.openapiSpec) });
            } catch (err) {
              console.error('OpenAPI: file "' + oc.dataset.openapiUrl + '" could not be parsed as JSON or YAML');
            }
          }
        } else {
          Object.assign(options, { url: oc.dataset.openapiUrl });
        }
        current.ui = SwaggerUIBundle(options);
        if (!print && shown) {
          shown.forEach(function (isShown, thing) {
            current.ui.layoutActions.show(thing && thing.toJS ? thing.toJS() : thing, isShown);
          });
        }
      })
      .catch(function (error) {
        const ed = document.createElement('div');
        ed.classList.add('sc-alert', 'sc-alert-error', openapiErrorClass);
        ed.innerHTML = error;
        root.replaceChildren();
        oc.insertAdjacentElement('beforebegin', ed);
      });
  }
  function expandOpenAPI(doc, expand) {
    // only what is not yet in the wanted state gets clicked
    var current = expand ? 'false' : 'true';
    var clickAll = function (selector) {
      doc.querySelectorAll(selector).forEach(function (btn) {
        btn.click();
      });
    };
    clickAll('.expand-operation[aria-expanded=' + current + ']');
    clickAll('.models-control[aria-expanded=' + current + ']');
    clickAll('.opblock-summary-control[aria-expanded=' + current + ']');
    if (expand) {
      clickAll('.model-container > .model-box > button[aria-expanded=false]');
    } else {
      clickAll('.model-container > .model-box > .model-box > .model > span > button[aria-expanded=true]');
    }
  }
  // the shortcode writes a spec as the text of a hidden `pre`, which gives way to
  // the element the spec is rendered into
  document.querySelectorAll('pre.sc-openapi-spec').forEach(function (pre) {
    var oc = document.createElement('div');
    oc.classList.add('sc-openapi-container');
    oc.id = pre.id;
    for (var key in pre.dataset) {
      oc.dataset[key] = pre.dataset[key];
    }
    oc.dataset.openapiSpec = pre.textContent;
    pre.replaceWith(oc);
  });
  let divo = document.querySelectorAll('.sc-openapi-container');
  for (let i = 0; i < divo.length; i++) {
    renderOpenAPI(divo[i]);
  }
}

// set while we copy with our own textarea, so the global copy event handler
// in initCodeClipboard() doesn't hijack the clipboard data with a possibly
// still active page selection
let isFakeClipboardCopy = false;

// the async clipboard API is only available in secure contexts, so for http
// connections we have to fall back to the deprecated execCommand; see #1222
function writeTextToClipboardFallback(text) {
  const fake = document.createElement('textarea');
  fake.className = 'copy-to-clipboard-fake';
  // keep the element in the current viewport vertically, so focussing it
  // doesn't scroll the page
  fake.style.top = (window.scrollY || document.documentElement.scrollTop) + 'px';
  fake.setAttribute('readonly', '');
  fake.value = text;
  document.body.appendChild(fake);
  fake.select();
  fake.setSelectionRange(0, fake.value.length);
  let copied = false;
  isFakeClipboardCopy = true;
  try {
    copied = document.execCommand('copy');
  } catch (e) {
    copied = false;
  }
  isFakeClipboardCopy = false;
  fake.remove();
  return copied ? Promise.resolve() : Promise.reject();
}

function writeTextToClipboard(text, message) {
  let copy;
  if (navigator.clipboard?.writeText) {
    copy = navigator.clipboard.writeText(text).catch(function () {
      // writing may still be rejected, eg. if the document isn't focused,
      // so give the fallback a chance in that case, too
      return writeTextToClipboardFallback(text);
    });
  } else {
    copy = writeTextToClipboardFallback(text);
  }
  copy.then(
    function () {
      showToast(message);
    },
    function () {
      showToast(window.T_Browser_unsupported_feature);
    }
  );
}

function initAnchorClipboard() {
  const url = document.location.origin == 'null' ? `${document.location.protocol}//${document.location.host}${document.location.pathname}` : `${document.location.origin}${document.location.pathname}`;

  const anchors = Array.from(document.querySelectorAll('.anchor'));
  for (const anchor of anchors) {
    const id = encodeURIComponent(anchor.parentElement.id);
    anchor.setAttribute('data-clipboard-text', `${url}#${id}`);

    if (anchor.classList.contains('copyanchor')) {
      anchor.addEventListener('click', function () {
        this.blur();
        const text = this.getAttribute('data-clipboard-text');
        writeTextToClipboard(text, window.T_Link_copied_to_clipboard);
      });
    }
    if (anchor.classList.contains('scrollanchor')) {
      anchor.addEventListener('click', function () {
        this.parentElement.scrollIntoView({ behavior: reducedmotion.matches ? 'auto' : 'smooth' });
        let state = window.history.state || {};
        state = Object.assign({}, typeof state === 'object' ? state : {});
        history.pushState({}, '', this.dataset.clipboardText);
      });
    }
  }
}

function initCodeClipboard() {
  function getCodeText(node) {
    // if highlight shortcode is used in inline lineno mode, remove lineno nodes before generating text, otherwise it doesn't hurt
    var code = node.cloneNode(true);
    Array.from(code.querySelectorAll('*:scope > span > span:first-child:not(:last-child)')).forEach(function (lineno) {
      lineno.remove();
    });
    var text = code.textContent;
    // remove a trailing line break, this may most likely
    // come from the browser / Hugo transformation
    text = text.replace(/\n$/, '');
    return text;
  }

  document.addEventListener('copy', function (ev) {
    if (isFakeClipboardCopy) {
      return;
    }

    // shabby FF generates empty lines on cursor selection that we need to filter out; see #925
    var selection = document.getSelection();
    var node = selection.anchorNode;

    // in case of GC, it works without this handler;
    // instead GC fails if this handler is active, because it still contains
    // the line number nodes with class 'ln' in the selection, although
    // they are flagged with 'user-select: none;' see https://issues.chromium.org/issues/41393366;
    // so in case of GC we don't want to do anything and bail out early in below code
    function selectionContainsLnClass(selection) {
      for (var i = 0; i < selection.rangeCount; i++) {
        var range = selection.getRangeAt(i);
        var fragment = range.cloneContents();
        if (fragment.querySelector('.ln') || fragment.querySelector('[id]')) {
          return true;
        }
      }
      return false;
    }

    if (!selectionContainsLnClass(selection)) {
      while (node) {
        // selection could start in a text node, so account for this as it
        // obviously does not support `classList`
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('highlight')) {
          // only do this if we are inside of a code highlight node;
          // now fix FFs selection by calculating the text ourself
          var text = selection.toString();
          ev.clipboardData.setData('text/plain', text);
          ev.preventDefault();
          break;
        }
        node = node.parentNode;
      }
    }
  });

  var preOnlyElements = document.querySelectorAll('pre:not(.mermaid) > :not(code), pre:not(.mermaid):not(:has(>*))');
  for (var i = 0; i < preOnlyElements.length; i++) {
    // move everything down one level so that it fits to the next selector
    // and we also get copy-to-clipboard for pre-only elements
    var pre = preOnlyElements[i];
    var div = document.createElement('div');
    div.classList.add('pre-only');
    while (pre.firstChild) {
      div.appendChild(pre.firstChild);
    }
    pre.appendChild(div, pre);
  }

  var codeElements = document.querySelectorAll('code, .pre-only');
  for (var i = 0; i < codeElements.length; i++) {
    var code = codeElements[i];
    var text = getCodeText(code);
    var inPre = code.parentNode.tagName.toLowerCase() == 'pre';
    var inTable = inPre && code.parentNode.parentNode.tagName.toLowerCase() == 'td' && code.parentNode.parentNode.classList.contains('lntd');
    // avoid copy-to-clipboard for highlight shortcode in table lineno mode
    var isFirstLineCell = inTable && code.parentNode.parentNode.parentNode.querySelector('td:first-child > pre > code') == code;
    var isBlock = inTable || inPre;
    var inHeading = false;
    var parent = code.parentNode;
    while (parent && parent !== document) {
      if (/^h[1-6]$/i.test(parent.tagName)) {
        inHeading = true;
        break;
      }
      parent = parent.parentNode;
    }

    if (!isFirstLineCell && (inPre || text.length > 5)) {
      code.classList.add('copy-to-clipboard-code');
      if (inPre) {
        code.classList.add('copy-to-clipboard');
        code.parentNode.classList.add('pre-code');
      } else {
        var clone = code.cloneNode(true);
        var span = document.createElement('span');
        span.classList.add('copy-to-clipboard');
        span.setAttribute('dir', 'auto');
        span.appendChild(clone);
        code.parentNode.replaceChild(span, code);
        code = clone;
      }
      var button = null;
      var insertElement = null;
      var wrapper = null;
      var actionbar = null;
      if (isBlock || (!window.relearn.disableInlineCopyToClipboard && !inHeading)) {
        button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('title', window.T_Copy_to_clipboard);
        button.setAttribute('aria-label', window.T_Copy_to_clipboard);

        if (isBlock) {
          // Wrap in actionbar structure for block buttons
          button.innerHTML = '<i class="fa-fw far fa-copy" aria-hidden="true"></i>';
          wrapper = document.createElement('span');
          wrapper.classList.add('btn', 'cstyle', 'block-copy-to-clipboard-button', 'action', 'noborder', 'notitle', 'interactive');
          wrapper.appendChild(button);
          actionbar = document.createElement('div');
          actionbar.className = 'actionbar';
          actionbar.appendChild(wrapper);
          insertElement = actionbar;
        } else {
          // Wrap in btn structure for inline buttons
          button.innerHTML = '<i class="fa-fw far fa-copy" aria-hidden="true"></i>';
          wrapper = document.createElement('span');
          wrapper.classList.add('btn', 'cstyle', 'inline-copy-to-clipboard-button', 'inline', 'notitle', 'interactive');
          wrapper.appendChild(button);
          insertElement = wrapper;
        }
      }
      if (inTable) {
        var table = code.parentNode.parentNode.parentNode.parentNode.parentNode;
        table.dataset.code = text;
        table.parentNode.insertBefore(insertElement, table.nextSibling);
      } else if (inPre) {
        var pre = code.parentNode;
        pre.dataset.code = text;
        var p = pre.parentNode;
        // html <pre><code> constructs and indented code blocks are missing the div
        while (p != document && (p.tagName.toLowerCase() != 'div' || !p.classList.contains('highlight'))) {
          p = p.parentNode;
        }
        if (p == document) {
          var clone = pre.cloneNode(true);
          var div = document.createElement('div');
          div.classList.add('highlight', 'actionbar-wrapper');
          if (window.relearn.enableBlockCodeWrap) {
            div.classList.add('wrap-code');
          }
          div.setAttribute('dir', 'auto');
          div.appendChild(clone);
          pre.parentNode.replaceChild(div, pre);
          pre = clone;
        }
        pre.parentNode.insertBefore(insertElement, pre.nextSibling);
      } else {
        code.classList.add('highlight');
        code.dataset.code = text;
        if (insertElement) {
          code.parentNode.insertBefore(insertElement, code.nextSibling);
        }
      }
    }
  }

  var buttons = document.querySelectorAll('.block-copy-to-clipboard-button button, .inline-copy-to-clipboard-button button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // For block buttons, get the actionbar's previous sibling; for inline, use wrapper's previous sibling
      var codeElement = this.closest('.actionbar') ? this.closest('.actionbar').previousElementSibling : this.parentElement.previousElementSibling;
      if (!codeElement) {
        return;
      }
      var text = codeElement.dataset.code || '';
      writeTextToClipboard(text, window.T_Copied_to_clipboard);
    });
  });
}

function initArrowVerticalNav() {
  var topMain = 0;
  if (!isPrint) {
    topMain = document.querySelector('main').getClientRects()[0].top;
  }

  document.addEventListener('keydown', function (event) {
    if (event.shiftKey || event.ctrlKey || !event.altKey || event.metaKey || (event.key != 'ArrowUp' && event.key != 'ArrowDown')) {
      return;
    }
    // a form field keeps the combination, where Alt+Down opens a select
    if (event.target.matches(formelements)) {
      return;
    }
    // the jump is all that should happen; some browsers scroll on top of it
    event.preventDefault();
    var elems = Array.from(
      document.querySelectorAll(`main :not(.include.hide-first-heading) > :where(
                .article-subheading,
                :not(.article-subheading) + h1:not(.a11y-only),
                h1:not(.a11y-only):first-child,
                h2, h3, h4, h5, h6
            ),
            main .include.hide-first-heading > :where( h1, h2, h3, h4, h5, h6 ) ~ :where( h1, h2, h3, h4, h5, h6 )
        `)
    );
    if (event.key == 'ArrowUp') {
      var target = isPrint ? document.querySelector('#R-body') : document.querySelector('.flex-block-wrapper');
      elems.some(function (elem, i) {
        var top = elem.getBoundingClientRect().top;
        var topBoundary = top - topMain;
        if (topBoundary > -1) {
          target.scrollIntoView();
          return true;
        }
        target = elem;
      });
    } else {
      elems.some(function (elem, i) {
        var top = elem.getBoundingClientRect().top;
        var topBoundary = top - topMain;
        if (topBoundary > -1 && topBoundary < 1) {
          if (i + 1 < elems.length) {
            var target = elems[i + 1];
            target.scrollIntoView();
          }
          return true;
        }
        if (topBoundary >= 1) {
          var target = elem;
          target.scrollIntoView();
          return true;
        }
      });
    }
  });
}

function initArrowHorizontalNav() {
  if (isPrint) {
    return;
  }

  // button navigation
  var prev = document.querySelector('.topbar-button-prev a');
  var next = document.querySelector('.topbar-button-next a');

  // keyboard navigation
  // avoid prev/next navigation if we are not at the start/end of the
  // horizontal area
  var el = document.querySelector('#R-body-inner');
  var scrollStart = 0;
  var scrollEnd = 0;
  document.addEventListener('keydown', function (event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      var f = event.target.matches(formelements);
      if (f) {
        return;
      }
      if (event.key == dir_key_start) {
        if (!scrollStart && +el.scrollLeft.toFixed() * dir_scroll <= 0) {
          prev && prev.click();
        } else if (scrollStart != -1) {
          clearTimeout(scrollStart);
        }
        scrollStart = -1;
      }
      if (event.key == dir_key_end) {
        if (!scrollEnd && +el.scrollLeft.toFixed() * dir_scroll + +el.clientWidth.toFixed() >= +el.scrollWidth.toFixed()) {
          next && next.click();
        } else if (scrollEnd != -1) {
          clearTimeout(scrollEnd);
        }
        scrollEnd = -1;
      }
    }
  });
  document.addEventListener('keyup', function (event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      var f = event.target.matches(formelements);
      if (f) {
        return;
      }
      if (event.key == dir_key_start) {
        // check for false indication if keyup is delayed after navigation
        if (scrollStart == -1) {
          scrollStart = setTimeout(function () {
            scrollStart = 0;
          }, 300);
        }
      }
      if (event.key == dir_key_end) {
        if (scrollEnd == -1) {
          scrollEnd = setTimeout(function () {
            scrollEnd = 0;
          }, 300);
        }
      }
    }
  });
}

// === classic scrollbar quirks ===============================================
// the only JavaScript part of what the `classic scrollbar quirks` block in
// theme.css describes; it goes away together with that block and the
// `#R-scrollbar` markup in menu.html once no supported browser reports a space
// taking scrollbar anymore
function initMenuThumb(elm) {
  // a space taking scrollbar would clip away the menu border and the active entry
  // bleeding into the content area; if the browser gives us overlay scrollbars it
  // draws them itself, otherwise we draw our own and leave the scrolling to it
  if (!window.relearn.scrollbarSize) {
    return;
  }

  var rail = document.querySelector('#R-scrollbar');
  var thumb = document.querySelector('#R-scrollbar-thumb');
  if (!elm || !rail || !thumb) {
    return;
  }

  var scrolling;
  var ticking = false;
  // the menus geometry only changes when something is resized, so remember it
  // instead of forcing a layout on every scroll event
  var scrollport = 0;
  var scrollable = 0;
  var size = 0;

  function measure() {
    scrollport = elm.clientHeight;
    scrollable = elm.scrollHeight - scrollport;
    rail.classList.toggle('scrollable', scrollable > 0);
    if (scrollable <= 0) {
      return;
    }
    // the rail covers the menus scrollport
    rail.style.setProperty('--INTERNAL-SCROLLBAR-height', '' + scrollport + 'px');
    // enforce a minimum size, so the thumb stays grabbable in long menus, but
    // never the whole rail, as that would leave it nothing to travel
    size = Math.max(scrollport / elm.scrollHeight, Math.min(0.9, 20 / scrollport));
    thumb.style.setProperty('--INTERNAL-SCROLLBAR-THUMB-size', size);
  }

  function position() {
    if (scrollable <= 0) {
      return;
    }
    thumb.style.setProperty('--INTERNAL-SCROLLBAR-THUMB-position', (elm.scrollTop / scrollable) * (1 - size));
  }

  elm.addEventListener(
    'scroll',
    function () {
      // however many scroll events the browser fires, the thumb only has to be
      // drawn once per frame
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        position();
        if (!hovernone.matches) {
          // only where there is no mouse does scrolling reveal us; with one, hover
          // and focus do it and the stylesheet has no rule for the class at all
          return;
        }
        rail.classList.add('scrolling');
        clearTimeout(scrolling);
        scrolling = setTimeout(function () {
          rail.classList.remove('scrolling');
        }, 1000);
      });
    },
    { passive: true }
  );
  // the menu changes its height if sections are expanded/collapsed or if the
  // window is resized; a resize observer already runs after layout, so we can
  // measure right away
  var observer = new ResizeObserver(function () {
    measure();
    position();
  });
  observer.observe(elm);
  Array.from(elm.children).forEach(function (e) {
    if (e != rail) {
      observer.observe(e);
    }
  });

  // a browsers scrollbar only reacts to the primary button, so a right click
  // reaches the context menu instead of scrolling us away; a second finger must
  // not take over a gesture the first one is already doing
  function isPrimaryButton(event) {
    return event.button == 0 && event.isPrimary;
  }

  rail.addEventListener('pointerdown', function (event) {
    if (event.target != rail) {
      // the thumb drags itself
      return;
    }
    if (!isPrimaryButton(event)) {
      return;
    }
    // scroll by a page towards the click, like a browsers scrollbar does
    var rect = thumb.getBoundingClientRect();
    var reduced = reducedmotion.matches;
    elm.scrollBy({ top: event.clientY < rect.top ? -elm.clientHeight : elm.clientHeight, behavior: reduced ? 'auto' : 'smooth' });
    event.preventDefault();
  });

  thumb.addEventListener('pointerdown', function (event) {
    if (!isPrimaryButton(event)) {
      return;
    }
    var pointerId = event.pointerId;
    var startY = event.clientY;
    var startTop = elm.scrollTop;
    // none of this changes while we are being dragged, so don't make the
    // browser lay out the menu again for every pointer move
    var track = elm.clientHeight - thumb.offsetHeight;
    var range = elm.scrollHeight - elm.clientHeight;
    function move(e) {
      if (e.pointerId != pointerId) {
        return;
      }
      if (track > 0) {
        elm.scrollTop = startTop + ((e.clientY - startY) * range) / track;
      }
    }
    function end(e) {
      if (e.pointerId != pointerId) {
        return;
      }
      thumb.classList.remove('dragging');
      thumb.removeEventListener('pointermove', move);
      thumb.removeEventListener('pointerup', end);
      thumb.removeEventListener('pointercancel', end);
      // our capture can also be lost without a pointerup reaching us; without
      // this the drag would stay alive and hovering the thumb would scroll us
      thumb.removeEventListener('lostpointercapture', end);
    }
    thumb.classList.add('dragging');
    thumb.setPointerCapture(pointerId);
    thumb.addEventListener('pointermove', move);
    thumb.addEventListener('pointerup', end);
    thumb.addEventListener('pointercancel', end);
    thumb.addEventListener('lostpointercapture', end);
    // don't start a text selection while dragging
    event.preventDefault();
  });

  // not redundant to the observer above: it only reports while we are rendered
  measure();
  position();
}
// === end of classic scrollbar quirks ========================================

function initMenuScrollbar() {
  if (isPrint) {
    return;
  }

  var elm = document.querySelector('#R-content-wrapper');

  document.addEventListener('keydown', function (event) {
    // a browser only scrolls the container that holds the focus; the page
    // itself never scrolls, so without our help these keys do nothing as long
    // as the focus is anywhere else, namely right after the page was loaded
    if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || !SCROLL_KEYS.includes(event.key)) {
      return;
    }
    if (event.target.matches('select, textarea, input:not([type="checkbox"])')) {
      // these need the keys for themselves
      return;
    }
    if (event.target.matches('[role="tab"]') && (event.key == 'Home' || event.key == 'End')) {
      // in a list of tabs these lead to its first and last tab
      return;
    }

    var elt = document.querySelector('.topbar-button.topbar-flyout .topbar-content-wrapper');
    var scroller = (elm && elm.contains(event.target) && elm) || (elt && elt.contains(event.target) && elt) || (elc && elc.contains(event.target) && elc);
    var focused = !!scroller;
    if (!scroller) {
      if (event.target.matches(formelements)) {
        return;
      }
      // the focus is in none of our scroll containers, so we scroll the one
      // the user expects: the hovered one, else the one of an open flyout,
      // else the content
      var b = document.querySelector('body');
      scroller = (elt && elt.matches(':hover') && elt) || (elm && elm.matches(':hover') && elm) || (elc && elc.matches(':hover') && elc) || (b.matches('.topbar-flyout') && elt) || (b.matches('.sidebar-flyout') && elm) || elc;
    }

    // browsers disagree on whether they scroll the focused container
    // themselves, so we always do it ourselves
    var by = 0;
    if (event.key == 'ArrowUp') {
      by = -LINE_SCROLL;
    } else if (event.key == 'ArrowDown') {
      by = LINE_SCROLL;
    } else if (event.key == 'PageUp') {
      by = -scroller.clientHeight;
    } else if (event.key == 'PageDown' || (event.key == ' ' && !focused)) {
      // inside of a container the space key belongs to the focused element
      by = scroller.clientHeight;
    } else if (event.key == 'Home') {
      by = -scroller.scrollHeight;
    } else if (event.key == 'End') {
      by = scroller.scrollHeight;
    }
    if (by) {
      // left/right stay untouched, they page to the prev/next article
      scroller.scrollBy({ top: by });
      event.preventDefault();
    }
  });
  document.querySelectorAll('.topbar-button .topbar-content-wrapper').forEach(function (e) {
    e.addEventListener('click', toggleTopbarFlyoutEvent);
  });

  initMenuThumb(elm);
}

function imageKeyHandler(event) {
  // an enlarged image lies above everything else, so the keys are its own
  // wherever the focus is, and none reaches the page below it
  var shown = document.querySelector('.lightbox-back:target');
  if (!shown) {
    return;
  }
  event.stopPropagation();
  if (event.key == 'Escape') {
    shown.click();
  } else if (event.key == 'Tab') {
    // the link that closes it is all there is to move to, so the focus stays inside
    event.preventDefault();
    var close = shown.querySelector('.lightbox-close');
    close && close.focus();
  }
}

// our shortcuts stay on the deprecated `event.which`: it names the letter on the
// key in the reader's layout, which neither replacement does. `event.key` gives
// the character typed, so a non-Latin layout never produces our letters and on
// Windows, where Ctrl+Alt is AltGr, some layouts type another character instead;
// `event.code` gives the key's position on a US keyboard, which moves our
// letters on layouts like AZERTY
function navShortcutHandler(event) {
  if (!event.shiftKey && event.altKey && event.ctrlKey && !event.metaKey && event.which == 78 /* n */) {
    toggleNav();
  }
}

function searchShortcutHandler(event) {
  if (!event.shiftKey && event.altKey && event.ctrlKey && !event.metaKey && event.which == 70 /* f */) {
    showSearch();
  }
}

function tocShortcutHandler(event) {
  if (!event.shiftKey && event.altKey && event.ctrlKey && !event.metaKey && event.which == 84 /* t */) {
    toggleToc();
  }
}

function editShortcutHandler(event) {
  if (!event.shiftKey && event.altKey && event.ctrlKey && !event.metaKey && event.which == 87 /* w */) {
    showEdit();
  }
}

function printShortcutHandler(event) {
  if (!event.shiftKey && event.altKey && event.ctrlKey && !event.metaKey && event.which == 80 /* p */) {
    showPrint();
  }
}

function showSearch() {
  var s = document.querySelector('#R-search-by');
  if (!s) {
    return;
  }
  var b = document.querySelector('body');
  if (s == document.activeElement) {
    if (b.classList.contains('sidebar-flyout')) {
      closeNav();
    }
    documentFocus();
  } else {
    if (!b.classList.contains('sidebar-flyout')) {
      openNav();
    }
    s.focus();
  }
}

// a toggling button tells assistive technology whether its target is shown
function setExpanded(toggles, expanded) {
  toggles.forEach(function (e) {
    e.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

// back to the button that opened what was just closed; one that is not
// displayed can not take the focus, which then stays where it is
function focusToggle(toggle) {
  if (toggle) {
    toggle.focus();
  }
}

function getNavToggles() {
  return document.querySelectorAll('button[data-button-action="toggle-nav"]');
}

// in the small layout the open sidebar lies above the page, which then is out
// of reach for the keyboard and screen readers, same as it is for the mouse;
// the overlay stays in reach, as a click on it closes the sidebar
function adjustNavInert() {
  var b = document.querySelector('body');
  var covered = b.classList.contains('menu-s-width') && b.classList.contains('sidebar-flyout');
  document.querySelectorAll('#R-body > :not(#R-body-overlay)').forEach(function (e) {
    e.inert = covered;
  });
}

function openNav() {
  closeSomeTopbarButtonFlyout();
  var b = document.querySelector('body');
  b.classList.add('sidebar-flyout');
  adjustNavInert();
  setExpanded(getNavToggles(), true);
  var a = document.querySelector('#R-sidebar a');
  if (a) {
    a.focus();
  }
}

function closeNav() {
  var b = document.querySelector('body');
  b.classList.remove('sidebar-flyout');
  adjustNavInert();
  setExpanded(getNavToggles(), false);
  documentFocus();
}

function toggleNav() {
  var b = document.querySelector('body');
  if (b.classList.contains('sidebar-flyout')) {
    closeNav();
  } else {
    openNav();
  }
}

function navEscapeHandler(event) {
  if (event.key == 'Escape') {
    // without an open sidebar there is nothing to close, and the focus stays
    // where it is
    if (document.querySelector('body').classList.contains('sidebar-flyout')) {
      closeNav();
      focusToggle(getNavToggles()[0]);
    }
  }
}

function getTopbarButtonParent(e) {
  var button = e;
  while (button && !button.classList.contains('topbar-button')) {
    button = button.parentElement;
  }
  return button;
}

function getTopbarButtonToggles(button) {
  return button.querySelectorAll(':scope > .btn > button');
}

function openTopbarButtonFlyout(button) {
  closeNav();
  var body = document.querySelector('body');
  button.classList.add('topbar-flyout');
  body.classList.add('topbar-flyout');
  setExpanded(getTopbarButtonToggles(button), true);
  // the focus rests on the button, wherever the flyout was opened from; this
  // announces its new state and has the flyout next in reach
  focusToggle(getTopbarButtonToggles(button)[0]);
}

function closeTopbarButtonFlyout(button) {
  var body = document.querySelector('body');
  button.classList.remove('topbar-flyout');
  body.classList.remove('topbar-flyout');
  setExpanded(getTopbarButtonToggles(button), false);
  documentFocus();
}

function closeSomeTopbarButtonFlyout() {
  var someButton = document.querySelector('.topbar-button.topbar-flyout');
  if (someButton) {
    closeTopbarButtonFlyout(someButton);
  }
  return someButton;
}

function toggleTopbarButtonFlyout(button) {
  var someButton = closeSomeTopbarButtonFlyout();
  if (button && button != someButton) {
    openTopbarButtonFlyout(button);
  }
}

function toggleTopbarFlyout(e) {
  var button = getTopbarButtonParent(e);
  if (!button) {
    return;
  }
  toggleTopbarButtonFlyout(button);
}

function toggleTopbarFlyoutEvent(event) {
  if (event.target.classList.contains('topbar-content') || event.target.classList.contains('topbar-content-wrapper')) {
    // the scrollbar was used, don't close flyout
    return;
  }
  toggleTopbarFlyout(event.target);
}

function handleTopbarButtons() {
  // a toggle of the author: what it shows and hides is unknown to us, so each
  // click changes its state; capturing, for the author's own listener to
  // already find the new state. our own toggles are set where their target
  // is shown and hidden, as that happens by other means than a click as well
  document.addEventListener(
    'click',
    function (event) {
      var button = event.target.closest('.btn > button[aria-expanded]');
      if (!button || ['toggle-nav', 'toggle-flyout'].includes(button.dataset.buttonAction)) {
        return;
      }
      setExpanded([button], button.getAttribute('aria-expanded') != 'true');
    },
    true
  );

  // one listener for all buttons declaring an action, wherever they were moved to;
  // an action we don't know is left to the author's own listener
  document.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-button-action]');
    if (!button) {
      return;
    }
    var action = button.dataset.buttonAction;
    // closing hands the focus to the content, but who closes with the button
    // itself stays on it
    if (action == 'toggle-nav') {
      toggleNav();
      if (!document.querySelector('body').classList.contains('sidebar-flyout')) {
        focusToggle(button);
      }
    } else if (action == 'toggle-flyout') {
      toggleTopbarFlyout(button);
      var parent = getTopbarButtonParent(button);
      if (parent && !parent.classList.contains('topbar-flyout')) {
        focusToggle(button);
      }
    }
  });
}

function topbarFlyoutEscapeHandler(event) {
  if (event.key == 'Escape') {
    // the target is where the key was pressed; closing moves the focus away
    var target = event.target;
    var button = closeSomeTopbarButtonFlyout();
    if (button) {
      // who is in the flyout loses their place with it and goes back to the
      // button; who has moved on elsewhere stays where they are
      focusToggle(button.contains(target) ? getTopbarButtonToggles(button)[0] : target);
    }
  }
}

function toggleToc() {
  toggleTopbarButtonFlyout(document.querySelector('.topbar-button-toc'));
}

function showEdit() {
  var l = document.querySelector('.topbar-button-edit a');
  if (l) {
    l.click();
  }
}

function showPrint() {
  var l = document.querySelector('.topbar-button-print a');
  if (l) {
    l.click();
  }
}

function initToc() {
  if (isPrint) {
    return;
  }

  document.addEventListener('keydown', editShortcutHandler);
  document.addEventListener('keydown', navShortcutHandler);
  document.addEventListener('keydown', printShortcutHandler);
  document.addEventListener('keydown', searchShortcutHandler);
  document.addEventListener('keydown', tocShortcutHandler);
  document.addEventListener('keydown', navEscapeHandler);
  document.addEventListener('keydown', topbarFlyoutEscapeHandler);

  var b = document.querySelector('#R-body-overlay');
  if (b) {
    b.addEventListener('click', closeNav);
  }
  var m = document.querySelector('#R-main-overlay');
  if (m) {
    m.addEventListener('click', closeSomeTopbarButtonFlyout);
  }

  // the link works without us, but would leave its fragment in the address bar;
  // closing the sidebar hands the focus to the content, which is out of reach
  // as long as the sidebar lies above it
  var s = document.querySelector('#R-skip-link');
  if (s) {
    s.addEventListener('click', function (event) {
      event.preventDefault();
      closeNav();
    });
  }
}

function initSwipeHandler() {
  if (!touchsupport) {
    return;
  }

  var startx = null;
  var starty = null;
  var handleStartX = function (evt) {
    startx = evt.touches[0].clientX;
    starty = evt.touches[0].clientY;
  };
  var handleMoveX = function (evt) {
    if (startx !== null) {
      var diffx = startx - evt.touches[0].clientX;
      var diffy = starty - evt.touches[0].clientY || 0.1;
      if (diffx / Math.abs(diffy) < 2) {
        // detect mostly vertical swipes and reset our starting pos
        // to not detect a horizontal move if vertical swipe is unprecise
        startx = evt.touches[0].clientX;
      } else if (diffx > 30) {
        startx = null;
        starty = null;
        closeNav();
      }
    }
  };
  var handleEndX = function (evt) {
    startx = null;
    starty = null;
  };

  var s = document.querySelector('#R-body-overlay');
  s && s.addEventListener('touchstart', handleStartX, { capture: false, passive: true });
  document.querySelector('#R-sidebar').addEventListener('touchstart', handleStartX, { capture: false, passive: true });
  document.querySelectorAll('#R-sidebar *').forEach(function (e) {
    e.addEventListener('touchstart', handleStartX, { capture: false, passive: true });
  });
  s && s.addEventListener('touchmove', handleMoveX, { capture: false, passive: true });
  document.querySelector('#R-sidebar').addEventListener('touchmove', handleMoveX, { capture: false, passive: true });
  document.querySelectorAll('#R-sidebar *').forEach(function (e) {
    e.addEventListener('touchmove', handleMoveX, { capture: false, passive: true });
  });
  s && s.addEventListener('touchend', handleEndX, { capture: false, passive: true });
  document.querySelector('#R-sidebar').addEventListener('touchend', handleEndX, { capture: false, passive: true });
  document.querySelectorAll('#R-sidebar *').forEach(function (e) {
    e.addEventListener('touchend', handleEndX, { capture: false, passive: true });
  });
}

function initImage() {
  // whether the enlarged image was opened from this page, which leaves a history
  // entry to return to; a page loaded with the image already enlarged has none
  var openedHere = false;

  // capturing, to be asked before anyone else
  document.addEventListener('keydown', imageKeyHandler, true);

  document.querySelectorAll('.lightbox-back').forEach(function (e) {
    e.addEventListener('click', function (event) {
      event.preventDefault();
      var close = e.querySelector('.lightbox-close');
      var opener = close && document.querySelector(close.getAttribute('href'));
      if (openedHere) {
        // leave the lightbox the way we came instead of adding another history entry
        history.back();
      } else if (close) {
        // going back would leave the page, so its entry is replaced instead. the
        // browser only lets go of the enlarged image if the URL targets something
        // else, which is the image's place; after that the fragment can go
        window.location.replace(close.getAttribute('href'));
        window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      }
      // return to the image it was opened from
      opener && opener.focus();
    });
  });

  // the browser hands the focus to an enlarged image it navigates to, but not
  // to one it returns to through its history or still shows after a reload
  var focusShown = function () {
    var shown = document.querySelector('.lightbox-back:target');
    shown && !shown.contains(document.activeElement) && shown.focus();
  };
  window.addEventListener('hashchange', function () {
    openedHere = !!document.querySelector('.lightbox-back:target');
    focusShown();
  });
  // on a reload it only knows the target of the URL once the page is loaded
  if (document.readyState == 'complete') {
    focusShown();
  } else {
    window.addEventListener('load', focusShown);
  }

  // paper has no lightbox to open, so a printout must not carry a link to it
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('.lightbox-link[href]').forEach(function (e) {
      e.dataset.href = e.getAttribute('href');
      e.removeAttribute('href');
    });
  });
  window.addEventListener('afterprint', function () {
    document.querySelectorAll('.lightbox-link[data-href]').forEach(function (e) {
      e.setAttribute('href', e.dataset.href);
      delete e.dataset.href;
    });
  });
}

function initExpand() {
  document.querySelectorAll('.expand > input').forEach(function (e) {
    e.addEventListener('change', initMermaid.bind(null, true, null));
  });
}

function initOverflowTitle() {
  // truncation depends on the current width, so decide on each hover whether the tooltip is needed
  document.addEventListener('pointerover', function (event) {
    var e = event.target.closest('[data-overflow-title]');
    if (!e) {
      return;
    }
    if (e.scrollWidth > e.clientWidth) {
      e.setAttribute('title', e.dataset.overflowTitle);
    } else {
      e.removeAttribute('title');
    }
  });
}

function clearHistory() {
  var visitedItem = window.relearn.absBaseUri + '/visited-url';
  for (var item in window.sessionStorage) {
    if (item.substring(0, visitedItem.length) === visitedItem) {
      window.sessionStorage.removeItem(item);
      var url = item.substring(visitedItem.length);
      document.querySelectorAll('[data-nav-id="' + url + '"]').forEach(function (e) {
        e.classList.remove('visited');
      });
    }
  }
}

function initHistory() {
  var visitedItem = window.relearn.absBaseUri + '/visited-url';
  window.sessionStorage.setItem(visitedItem + document.querySelector('body').dataset.origin, 1);

  // loop through the sessionStorage and see if something should be marked as visited
  for (var item in window.sessionStorage) {
    if (item.substring(0, visitedItem.length) === visitedItem && window.sessionStorage.getItem(item) == 1) {
      var url = item.substring(visitedItem.length);
      // in case we have `relativeURLs=true` we have to strip the
      // relative path to root
      document.querySelectorAll('[data-nav-id="' + url + '"]').forEach(function (e) {
        e.classList.add('visited');
      });
    }
  }
}

function initScrollPositionSaver() {
  var scrollPositionKey = window.relearn.absBaseUri + '/scroll-position/' + document.querySelector('body').dataset.origin;

  function savePosition(event) {
    // #959 if we fiddle around with the history during print preview
    // GC will close the preview immediatley
    if (isPrintPreview) {
      return;
    }
    window.sessionStorage.setItem(scrollPositionKey, +elc.scrollTop);
  }

  var ticking = false;
  elc.addEventListener('scroll', function (event) {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        // #996 GC is so damn slow that we need further throttling
        debounce(savePosition, 200)();
        ticking = false;
      });
      ticking = true;
    }
  });

  document.addEventListener('click', transferScrollToHistory);
  window.addEventListener('pagehide', transferScrollToHistory);
  window.addEventListener('beforeunload', transferScrollToHistory);
}

function transferScrollToHistory(event) {
  // #959 Don't modify history during print preview
  if (isPrintPreview) {
    return;
  }

  var scrollPositionKey = window.relearn.absBaseUri + '/scroll-position/' + document.querySelector('body').dataset.origin;
  var scrollTop = window.sessionStorage.getItem(scrollPositionKey);
  if (scrollTop != null) {
    var state = window.history.state || {};
    state = Object.assign({}, typeof state === 'object' ? state : {});
    state.contentScrollTop = +scrollTop;
    window.history.replaceState(state, '');
    window.sessionStorage.removeItem(scrollPositionKey);
  }
}

function scrollToPositions() {
  // show active menu entry
  window.setTimeout(function () {
    // we move the menu ourselves: `scrollIntoView` also makes the entry the
    // point the tab key starts from, which would lead past the skip link
    var e = document.querySelector('#R-content-wrapper li.active a');
    if (e) {
      var wrapper = document.querySelector('#R-content-wrapper');
      var port = wrapper.getBoundingClientRect();
      var box = e.getBoundingClientRect();
      wrapper.scrollTop += box.top - port.top - (port.height - box.height) / 2;
    }
  }, 10);

  // scroll the content to point of interest;
  // if we have a scroll position saved, the user was here
  // before in his history stack and we want to reposition
  // to the position he was when he left the page;
  // otherwise if he used page search before, we want to position
  // to its last outcome;
  // otherwise he may want to see a specific fragment

  var state = window.history.state || {};
  state = typeof state === 'object' ? state : {};
  if (Object.hasOwn(state, 'contentScrollTop')) {
    window.setTimeout(function () {
      elc.scrollTop = +state.contentScrollTop;
    }, 10);
    return;
  }

  var search = window.sessionStorage.getItem(window.relearn.absBaseUri + '/search-value');
  var words = (search ?? '').split(' ').filter((word) => word.trim() != '');
  if (words && words.length) {
    var found = elementContains(words, elc);
    var searchedElem = found.length && found[0];
    if (searchedElem) {
      searchedElem.scrollIntoView();
      var scrolledY = window.scrollY;
      if (scrolledY) {
        window.scroll(0, scrolledY - 125);
      }
    }
    return;
  }

  if (window.location.hash && window.location.hash.length > 1) {
    window.setTimeout(function () {
      try {
        var e = document.querySelector(window.location.hash);
        if (e && e.scrollIntoView) {
          e.scrollIntoView();
        }
      } catch (e) {}
    }, 10);
    return;
  }
}

function handleHistoryClearer() {
  document.querySelectorAll('.R-historyclearer button').forEach(function (select) {
    select.addEventListener('click', function (event) {
      clearHistory();
      showToast(window.T_History_cleared);
    });
  });
}

function handleLanguageSwitcher() {
  document.querySelectorAll('.R-languageswitcher select').forEach(function (select) {
    select.addEventListener('change', function (event) {
      const url = this.options[`R-select-language-${this.value}`].dataset.url;
      this.value = this.querySelector('[data-selected]')?.value ?? select.value;
      window.location = url;
    });
  });
}

function handleVariantSwitcher() {
  document.querySelectorAll('.R-variantswitcher select').forEach(function (select) {
    select.addEventListener('change', function (event) {
      var variant = this.value;
      window.relearn.fadeVariant(function () {
        window.relearn.changeVariant(variant);
      });
    });
  });
}

function handleVersionSwitcher() {
  document.querySelectorAll('.R-versionswitcher select').forEach(function (select) {
    select.addEventListener('change', function (event) {
      const option = this.options[`R-select-version-${this.value}`];
      const url = option.dataset.url ?? (option.dataset.abs == 'true' ? '' : window.relearn.relBaseUri) + option.dataset.uri + window.relearn.path;
      this.value = this.querySelector('[data-selected]')?.value ?? select.value;
      window.location = url;
    });
  });
}

window.addEventListener('popstate', function (event) {
  scrollToPositions();
});

const observer = new PerformanceObserver(function () {
  scrollToPositions();
});
observer.observe({ type: 'navigation' });

// the nodes inside the shadow tree of a spec belong to the library rendering
// them, which stumbles over an element of ours wrapped around its text; so the
// terms in there are painted by ranges, which leave the tree as it is
function markOpenapi() {
  if (!window.Highlight || !CSS.highlights) {
    return;
  }
  var search = window.sessionStorage.getItem(window.relearn.absBaseUri + '/search-value');
  var words = (search ?? '').split(' ').filter((word) => word.trim() != '');
  var ranges = [];
  if (words.length) {
    var re = new RegExp(words.map((word) => regexEscape(word)).join('|'), 'gi');
    document.querySelectorAll('.sc-openapi-container').forEach(function (oc) {
      if (!oc.shadowRoot) {
        return;
      }
      var walker = document.createTreeWalker(oc.shadowRoot, NodeFilter.SHOW_TEXT);
      for (var node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.parentElement || /^(script|style)$/i.test(node.parentElement.tagName)) {
          continue;
        }
        re.lastIndex = 0;
        for (var match = re.exec(node.data); match; match = re.exec(node.data)) {
          var range = new Range();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + match[0].length);
          ranges.push(range);
        }
      }
    });
  }
  if (ranges.length) {
    CSS.highlights.set('relearn-search', new Highlight(...ranges));
  } else {
    CSS.highlights.delete('relearn-search');
  }
}

// the library renders a part of a spec once it is opened, so the terms have to
// be marked again whenever its tree changes
function scheduleMarkOpenapi() {
  if (scheduleMarkOpenapi.pending) {
    return;
  }
  scheduleMarkOpenapi.pending = true;
  requestAnimationFrame(function () {
    scheduleMarkOpenapi.pending = false;
    markOpenapi();
  });
}

function mark() {
  markOpenapi();
  var search = window.sessionStorage.getItem(window.relearn.absBaseUri + '/search-value');
  var words = (search ?? '').split(' ').filter((word) => word.trim() != '');
  if (!words || !words.length) {
    return;
  }

  // mark some additional stuff as searchable
  var bodyInnerLinks = document.querySelectorAll('#R-body-inner a:not(.lightbox-link):not(.btn):not(.lightbox-close)');
  for (var i = 0; i < bodyInnerLinks.length; i++) {
    bodyInnerLinks[i].classList.add('highlight');
  }

  var highlightableElements = document.querySelectorAll('.highlightable');
  highlight(highlightableElements, words, { element: 'mark', className: 'search' });

  var markedElements = document.querySelectorAll('mark.search');
  for (var i = 0; i < markedElements.length; i++) {
    var parent = markedElements[i].parentNode;
    while (parent && parent.classList) {
      if (parent.classList.contains('expand')) {
        if (!parent.classList.contains('expand-marked')) {
          parent.classList.add('expand-marked');
          parent.dataset.open = parent.open ? 'true' : 'false';
          parent.open = true;
        }
      }
      if (parent.tagName.toLowerCase() === 'li' && parent.parentNode && parent.parentNode.tagName.toLowerCase() === 'ul' && parent.parentNode.classList.contains('collapsible-menu')) {
        var toggleInputs = parent.querySelectorAll('input:not(.menu-marked)');
        if (toggleInputs.length) {
          toggleInputs[0].classList.add('menu-marked');
          toggleInputs[0].dataset.checked = toggleInputs[0].checked ? 'true' : 'false';
          toggleInputs[0].checked = true;
        }
      }
      parent = parent.parentNode;
    }
  }
}
window.relearn.markSearch = mark;

function highlight(es, words, options) {
  var settings = {
    className: 'highlight',
    element: 'span',
    caseSensitive: false,
    wordsOnly: false,
  };
  Object.assign(settings, options);

  if (!words.length) {
    return;
  }
  words = words.map(function (word, i) {
    return regexEscape(word);
  });

  var flag = settings.caseSensitive ? '' : 'i';
  var pattern = '(' + words.join('|') + ')';
  if (settings.wordsOnly) {
    pattern = '\\b' + pattern + '\\b';
  }
  var re = new RegExp(pattern, flag);

  for (var i = 0; i < es.length; i++) {
    highlightNode(es[i], re, settings.element, settings.className);
  }
}

function highlightNode(node, re, nodeName, className) {
  if (node.nodeType === 3 && node.parentElement && node.parentElement.namespaceURI == 'http://www.w3.org/1999/xhtml') {
    // text nodes
    var match = node.data.match(re);
    if (match) {
      var highlight = document.createElement(nodeName || 'span');
      highlight.className = className || 'highlight';
      var wordNode = node.splitText(match.index);
      wordNode.splitText(match[0].length);
      var wordClone = wordNode.cloneNode(true);
      highlight.appendChild(wordClone);
      wordNode.parentNode.replaceChild(highlight, wordNode);
      return 1; //skip added node in parent
    }
  } else if (
    node.nodeType === 1 &&
    node.childNodes && // only element nodes that have children
    !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
    !(node.tagName === nodeName.toUpperCase() && node.className === className)
  ) {
    // skip if already highlighted
    for (var i = 0; i < node.childNodes.length; i++) {
      i += highlightNode(node.childNodes[i], re, nodeName, className);
    }
  }
  return 0;
}

function unmark() {
  var markedElements = document.querySelectorAll('mark.search');
  for (var i = 0; i < markedElements.length; i++) {
    var parent = markedElements[i].parentNode;
    while (parent && parent.classList) {
      if (parent.tagName.toLowerCase() === 'li' && parent.parentNode && parent.parentNode.tagName.toLowerCase() === 'ul' && parent.parentNode.classList.contains('collapsible-menu')) {
        var toggleInputs = parent.querySelectorAll('input.menu-marked');
        if (toggleInputs.length) {
          toggleInputs[0].checked = toggleInputs[0].dataset.checked === 'true';
          toggleInputs[0].dataset.checked = null;
          toggleInputs[0].classList.remove('menu-marked');
        }
      }
      if (parent.classList.contains('expand')) {
        if (parent.classList.contains('expand-marked')) {
          parent.open = parent.dataset.open === 'true';
          parent.dataset.open = null;
          parent.classList.remove('expand-marked');
        }
      }
      parent = parent.parentNode;
    }
  }

  var highlighted = document.querySelectorAll('.highlightable');
  unhighlight(highlighted, { element: 'mark', className: 'search' });
  markOpenapi();
}

function unhighlight(es, options) {
  var settings = {
    className: 'highlight',
    element: 'span',
  };
  Object.assign(settings, options);

  for (var i = 0; i < es.length; i++) {
    var highlightedElements = es[i].querySelectorAll(settings.element + '.' + settings.className);
    for (var j = 0; j < highlightedElements.length; j++) {
      var parent = highlightedElements[j].parentNode;
      parent.replaceChild(highlightedElements[j].firstChild, highlightedElements[j]);
      parent.normalize();
    }
  }
}

// replace jQuery.createPseudo with https://stackoverflow.com/a/66318392
function elementContains(words, e) {
  var settings = {
    caseSensitive: false,
    wordsOnly: false,
  };

  if (!words.length) {
    return [];
  }
  if (!e) {
    return [];
  }
  words = words.map(function (word, i) {
    return regexEscape(word);
  });
  var flag = settings.caseSensitive ? '' : 'i';
  var nodes = [];

  var pattern = '(' + words.join('|') + ')';
  if (settings.wordsOnly) {
    pattern = '\\b' + pattern + '\\b';
  }
  var regex = new RegExp(pattern, flag);

  var tree = document.createTreeWalker(
    e,
    4, // NodeFilter.SHOW_TEXT
    function (node) {
      return regex.test(node.data);
    },
    false
  );
  var node = null;
  while ((node = tree.nextNode())) {
    nodes.push(node.parentElement);
  }

  return nodes;
}

function searchInputHandler(value) {
  window.sessionStorage.removeItem(window.relearn.absBaseUri + '/search-value');
  unmark();
  if (value.length) {
    window.sessionStorage.setItem(window.relearn.absBaseUri + '/search-value', value);
    mark();
    scrollMarkedIntoView();
  }
  announceMarked(value);
}

function scrollMarkedIntoView() {
  // marking expands the sections on the way to a match, so the match itself can
  // end up below the menus fold without anything telling the reader about it
  var wrapper = document.querySelector('#R-content-wrapper');
  var marked = wrapper && wrapper.querySelector('mark.search');
  if (!marked) {
    return;
  }
  var port = wrapper.getBoundingClientRect();
  var box = marked.getBoundingClientRect();
  if (box.top >= port.top && box.bottom <= port.bottom) {
    // it can be seen already, so don't move the menu under the readers eyes
    return;
  }
  // center it like we do for the active entry; a section can be taller than the
  // menu, so we go for the match itself and not for the section containing it
  wrapper.scrollTop += box.top - port.top - (port.height - box.height) / 2;
}

var announceMarkedTimer;
function announceMarked(search, delay = 1000) {
  clearTimeout(announceMarkedTimer);
  if (!search.length || document.querySelector('#R-searchresults')) {
    // the search page tells how many pages were found, which is all that
    // matters there
    return;
  }
  // told a moment after the last change of the term, so not with every key
  // typed; a loaded page needs less of a wait, just enough for a screen reader
  // to be done announcing it, as it drops what changes meanwhile
  announceMarkedTimer = setTimeout(function () {
    var count = document.querySelectorAll('#R-body-inner mark.search').length;
    if (count) {
      showToast(
        window.T_N_matches_on_page
          .replace('{1}', count)
          .replace('{0}', function () {
            return search;
          })
      );
    }
  }, delay);
}

function initSearch() {
  // sync input/escape between searchbox and searchdetail
  var inputs = document.querySelectorAll('input.search-by');
  inputs.forEach(function (e) {
    e.addEventListener('keydown', function (event) {
      if (event.key == 'Escape') {
        var input = event.target;
        var search = window.sessionStorage.getItem(window.relearn.absBaseUri + '/search-value');
        var words = (search ?? '').split(' ').filter((word) => word.trim() != '');
        if (!words || !words.length) {
          input.blur();
        }
        searchInputHandler('');
        inputs.forEach(function (e) {
          e.value = '';
        });
        if (!words || !words.length) {
          documentFocus();
        }
      }
    });
    e.addEventListener('input', function (event) {
      var input = event.target;
      var value = input.value;
      searchInputHandler(value);
      inputs.forEach(function (e) {
        if (e != input) {
          e.value = value;
        }
      });
    });
  });

  document.querySelectorAll('[data-search-clear]').forEach(function (e) {
    e.addEventListener('click', function () {
      inputs.forEach(function (e) {
        e.value = '';
        e.dispatchEvent(new Event('input'));
      });
      window.sessionStorage.removeItem(window.relearn.absBaseUri + '/search-value');
      unmark();
    });
  });

  var urlParams = new URLSearchParams(window.location.search);
  var value = urlParams.get('search-by');
  if (value) {
    window.sessionStorage.setItem(window.relearn.absBaseUri + '/search-value', value);
    mark();
  }

  // set initial search value for inputs on page load
  var search = window.sessionStorage.getItem(window.relearn.absBaseUri + '/search-value');
  if (search) {
    inputs.forEach(function (e) {
      e.value = search;
      e.dispatchEvent(new Event('input'));
    });
    // nobody is typing, so this takes the place of the wait set by the inputs
    announceMarked(search, 500);
  }

  window.relearn.isSearchInterfaceReady = true;
  window.relearn.executeInitialSearch && window.relearn.executeInitialSearch();
}

document.addEventListener('themeVariantLoaded', function (ev) {
  updateTheme(ev);
});

function updateTheme(ev) {
  if (window.relearn.lastVariant == ev.detail.variant) {
    return;
  }
  window.relearn.lastVariant = ev.detail.variant;

  initMermaid(true);
  initOpenapi(true);
}

(function () {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    initMermaid(true);
    initOpenapi(true);
  });
})();

function useMermaid(config) {
  delete config.theme;
  window.relearn.mermaidConfig = config;
  if (typeof mermaid != 'undefined' && typeof mermaid.mermaidAPI != 'undefined') {
    mermaid.initialize(Object.assign({ securityLevel: 'antiscript', startOnLoad: false }, config));
  }
}
(function () {
  // the block is only written by the mermaid dependency; we are deferred, so it
  // stands in the document by now wherever the dependency put it
  var config = document.querySelector('#R-mermaid-config');
  if (config) {
    window.relearn.themeUseMermaid = JSON.parse(config.textContent);
    useMermaid(window.relearn.themeUseMermaid);
  }
})();

// an icon written by the author, like the one of a menu entry, comes as it is;
// it is decoration unless it says otherwise, so assistive technology skips it
function initIcons() {
  document.querySelectorAll('i[class*="fa-"]:not([aria-hidden]):not([aria-label]):not([role]):not([title])').forEach(function (e) {
    e.setAttribute('aria-hidden', 'true');
  });
}

function initEdits() {
  // a screen reader doesn't tell where inserted or deleted text starts and
  // ends, so the stylesheet writes it around the text; being the same for
  // all languages, it gets the texts from here
  var texts = {
    '--ins-start-text': window.T_Inserted_text_start,
    '--ins-end-text': window.T_Inserted_text_end,
    '--del-start-text': window.T_Deleted_text_start,
    '--del-end-text': window.T_Deleted_text_end,
  };
  Object.keys(texts).forEach(function (name) {
    document.documentElement.style.setProperty(name, JSON.stringify(' ' + texts[name] + ' '));
  });
}

function ready(fn) {
  if (document.readyState == 'complete') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  initIcons();
  initArrowVerticalNav();
  initArrowHorizontalNav();
  handleHistoryClearer();
  handleLanguageSwitcher();
  handleVariantSwitcher();
  handleVersionSwitcher();
  initMermaid();
  initOpenapi();
  initMenuScrollbar();
  initToc();
  initAnchorClipboard();
  initCodeClipboard();
  handleTabs();
  handleExpanders();
  handleTopbarButtons();
  initSwipeHandler();
  initHistory();
  initSearch();
  initImage();
  initExpand();
  initOverflowTitle();
  initScrollPositionSaver();
  initEdits();
});

(function () {
  var body = document.querySelector('body');
  var topbar = document.querySelector('#R-topbar');
  function addTopbarButtonInfos() {
    // initially add some management infos to buttons and areas
    var areas = body.querySelectorAll('.topbar-area');
    areas.forEach(function (area) {
      area.dataset.area = 'area-' + area.dataset.area;
      var buttons = area.querySelectorAll(':scope > .topbar-button');
      buttons.forEach(function (button) {
        button.dataset.origin = area.dataset.area;
        button.dataset.action = 'show';
        var placeholder = document.createElement('div');
        placeholder.classList.add('topbar-placeholder');
        placeholder.dataset.action = 'show';
        button.insertAdjacentElement('afterend', placeholder);
      });
      var placeholder = document.createElement('div');
      area.insertAdjacentElement('beforeend', placeholder);
      var hidden = document.createElement('div');
      hidden.classList.add('topbar-hidden');
      hidden.dataset.area = area.dataset.area;
      var hplaceholder = document.createElement('div');
      hidden.insertAdjacentElement('beforeend', hplaceholder);
      area.insertAdjacentElement('afterend', hidden);
    });
  }
  function moveAreaTopbarButtons(width) {
    topbar.querySelectorAll('.topbar-hidden .topbar-button').forEach(function (button) {
      // move hidden to origins area
      var placeholder = button.parentNode.parentNode.querySelector(':scope > .topbar-area .topbar-placeholder[data-action="hide"]');
      placeholder.dataset.action = 'show';
      button.dataset.action = 'show';
      placeholder.insertAdjacentElement('beforebegin', button);
    });
    topbar.querySelectorAll('.topbar-area .topbar-button').forEach(function (button) {
      var current_area = button.dataset.action;
      var origin_area = button.dataset.origin;
      if (current_area != 'show' && origin_area != current_area) {
        // move moved to origins area
        var placeholder = topbar.querySelector('.topbar-area[data-area="' + origin_area + '"] > .topbar-placeholder[data-action="' + current_area + '"]');
        placeholder.dataset.action = 'show';
        button.dataset.action = 'show';
        placeholder.insertAdjacentElement('beforebegin', button);
      }
    });
    Array.from(topbar.querySelectorAll('.topbar-area .topbar-button'))
      .reverse()
      .forEach(function (button) {
        var parent = button.parentElement;
        var current_area = parent.dataset.area;
        var action = button.dataset['width' + width.toUpperCase()];
        if (action == 'show') {
        } else if (action == 'hide') {
          // move to origins hidden
          var hidden = button.parentNode.parentNode.querySelector(':scope > .topbar-hidden > *');
          var placeholder = button.nextSibling;
          placeholder.dataset.action = action;
          button.dataset.action = action;
          hidden.insertAdjacentElement('beforebegin', button);
        } else if (action != current_area) {
          // move to action area
          var dest = button.parentNode.parentNode.querySelector('.topbar-area[data-area="' + action + '"] > *');
          if (dest) {
            var placeholder = button.nextSibling;
            placeholder.dataset.action = action;
            button.dataset.action = action;
            dest.insertAdjacentElement('beforebegin', button);
          }
        }
      });
  }
  function moveTopbarButtons() {
    var isS = body.classList.contains('menu-s-width');
    var isM = body.classList.contains('menu-m-width');
    var isL = body.classList.contains('menu-l-width');
    // move buttons once, width has a distinct value
    if (isS && !isM && !isL) {
      moveAreaTopbarButtons('s');
    } else if (!isS && isM && !isL) {
      moveAreaTopbarButtons('m');
    } else if (!isS && !isM && isL) {
      moveAreaTopbarButtons('l');
    }
  }
  function adjustEmptyTopbarContents() {
    var buttons = Array.from(document.querySelectorAll('.topbar-button > .topbar-content > .topbar-content-wrapper'));
    // we have to reverse order to make sure to handle innermost areas first
    buttons.reverse().forEach(function (wrapper) {
      var button = getTopbarButtonParent(wrapper);
      if (button) {
        var isEmpty = true;
        var area = wrapper.querySelector(':scope > .topbar-area');
        if (area) {
          // if it's an area, we have to check each contained button
          // manually for its display property
          var areabuttons = area.querySelectorAll(':scope > .topbar-button');
          isEmpty = true;
          areabuttons.forEach(function (ab) {
            if (ab.style.display != 'none') {
              isEmpty = false;
            }
          });
        } else {
          isEmpty = !wrapper.innerHTML.trim();
        }
        button.querySelector('button').disabled = isEmpty;
        button.querySelector('.btn').classList.toggle('interactive', !isEmpty);
        button.style.display = isEmpty && button.dataset.contentEmpty == 'hide' ? 'none' : 'inline-block';
      }
    });
  }
  function adjustBreadcrumbTabstops() {
    // the small layout puts the linked entries out of sight, where they must
    // not be a stop for the tab key but stay for screen readers; an entry
    // that is always out of sight is written that way and left alone
    var isS = body.classList.contains('menu-s-width');
    topbar.querySelectorAll('.topbar-breadcrumbs li:not(.a11y-only) > a').forEach(function (a) {
      if (isS) {
        a.setAttribute('tabindex', '-1');
      } else {
        a.removeAttribute('tabindex');
      }
    });
  }
  function setWidthS(e) {
    body.classList[e.matches ? 'add' : 'remove']('menu-s-width');
  }
  function setWidthM(e) {
    body.classList[e.matches ? 'add' : 'remove']('menu-m-width');
  }
  function setWidthL(e) {
    body.classList[e.matches ? 'add' : 'remove']('menu-l-width');
  }
  function onWidthChange(setWidth, e) {
    setWidth(e);
    moveTopbarButtons();
    adjustEmptyTopbarContents();
    adjustBreadcrumbTabstops();
    adjustNavInert();
  }
  if (topbar) {
    var mqs = window.matchMedia('only screen and (max-width: 47.999rem)');
    mqs.addEventListener('change', onWidthChange.bind(null, setWidthS));
    var mqm = window.matchMedia('only screen and (min-width: 48rem) and (max-width: 59.999rem)');
    mqm.addEventListener('change', onWidthChange.bind(null, setWidthM));
    var mql = window.matchMedia('only screen and (min-width: 60rem)');
    mql.addEventListener('change', onWidthChange.bind(null, setWidthL));

    addTopbarButtonInfos();
    setWidthS(mqs);
    setWidthM(mqm);
    setWidthL(mql);
    moveTopbarButtons();
    adjustEmptyTopbarContents();
    adjustBreadcrumbTabstops();
  }
})();

function getColorValue(c) {
  return this.normalizeColor(getComputedStyle(document.documentElement).getPropertyValue('--INTERNAL-' + c));
}

function normalizeColor(c) {
  if (!c || !c.trim) {
    return c;
  }
  c = c.trim();
  c = c.replace(/\s*\(\s*/g, '( ');
  c = c.replace(/\s*\)\s*/g, ' )');
  c = c.replace(/\s*,\s*/g, ', ');
  c = c.replace(/0*\./g, '.');
  c = c.replace(/ +/g, ' ');
  return c;
}

function initVersionIndex(index) {
  if (!index || !index.length) {
    return;
  }

  document.querySelectorAll('.R-versionswitcher select').forEach(function (select) {
    var preSelectedOption = select.querySelector('[data-selected]')?.cloneNode(true);

    var selectedOption = null;
    if (select.selectedIndex >= 0) {
      selectedOption = select.options[select.selectedIndex].cloneNode(true);
    }

    // Remove all existing options
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }

    // Add all options from the index
    index.forEach(function (version) {
      // Create new option element
      var option = document.createElement('option');
      option.id = 'R-select-version-' + version.value;
      option.value = version.value;
      option.dataset.abs = version.isAbs;
      option.dataset.uri = version.baseURL;
      option.dataset.identifier = version.identifier;
      option.textContent = version.title;

      // Add the option to the select
      select.appendChild(option);
    });

    if (preSelectedOption) {
      const option = select.querySelector(`option[value="${preSelectedOption.value}"]`);
      if (!option) {
        select.appendChild(preSelectedOption);
      } else {
        option.dataset.selected = '';
      }
    }
    if (selectedOption) {
      // Re-select the previously selected option if it exists
      const option = select.querySelector(`option[value="${selectedOption.value}"]`);
      if (!option) {
        select.appendChild(selectedOption);
      }
      select.value = selectedOption.value;
    } else if (select.options.length > 0) {
      // If there was no selection before, select the first option
      select.selectedIndex = 0;
      return;
    }
  });
}

function initVersionJs() {
  if (window.relearn.version_js_url) {
    var js = document.createElement('script');
    // we need to add a random number on each call to read this file fresh from the server;
    // it may reside in a different Hugo instance and therefore we do not know when it changes
    var url = new URL(window.relearn.version_js_url, window.location.href);
    var randomNum = Math.floor(Math.random() * 1000000);
    url.searchParams.set('v', randomNum.toString());
    js.src = url.toString();
    js.setAttribute('async', '');
    js.addEventListener('load', function () {
      initVersionIndex(relearn_versionindex);
    });
    js.addEventListener('error', function (e) {
      console.error('Error getting version index file');
    });
    document.head.appendChild(js);
  }
}

initVersionJs();
