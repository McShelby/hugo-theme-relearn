var isIE = /*@cc_on!@*/false || !!document.documentMode;
if( isIE ){
    // we don't support sidebar flyout in IE
    document.querySelector( 'body' ).classList.remove( 'mobile-support' );
}
else{
    document.querySelector( 'body' ).classList.add( 'mobile-support' );
}
var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)

var formelements = 'button, datalist, fieldset, input, label, legend, meter, optgroup, option, output, progress, select, textarea';

function switchTab(tabGroup, tabId) {
    allTabItems = jQuery("[data-tab-group='"+tabGroup+"']");
    targetTabItems = jQuery("[data-tab-group='"+tabGroup+"'][data-tab-item='"+tabId+"']");

    // if event is undefined then switchTab was called from restoreTabSelection
    // so it's not a button event and we don't need to safe the selction or
    // prevent page jump
    var isButtonEvent = event != undefined;

    if(isButtonEvent){
      // save button position relative to viewport
      var yposButton = event.target.getBoundingClientRect().top;
    }

    allTabItems.removeClass("active");
    targetTabItems.addClass("active");

    if(isButtonEvent){
      // reset screen to the same position relative to clicked button to prevent page jump
      var yposButtonDiff = event.target.getBoundingClientRect().top - yposButton;
      window.scrollTo(window.scrollX, window.scrollY+yposButtonDiff);

      // Store the selection to make it persistent
      if(window.localStorage){
          var selectionsJSON = window.localStorage.getItem(baseUriFull+"tab-selections");
          if(selectionsJSON){
            var tabSelections = JSON.parse(selectionsJSON);
          }else{
            var tabSelections = {};
          }
          tabSelections[tabGroup] = tabId;
          window.localStorage.setItem(baseUriFull+"tab-selections", JSON.stringify(tabSelections));
      }
    }
}

function restoreTabSelections() {
    if(window.localStorage){
        var selectionsJSON = window.localStorage.getItem(baseUriFull+"tab-selections");
        if(selectionsJSON){
          var tabSelections = JSON.parse(selectionsJSON);
        }else{
          var tabSelections = {};
        }
        Object.keys(tabSelections).forEach(function(tabGroup) {
          var tabItem = tabSelections[tabGroup];
          switchTab(tabGroup, tabItem);
        });
    }
}

function initMermaid() {
    $('code.language-mermaid').each(function(index, element) {
        var content = $(element).html().replace(/&amp;/g, '&');
        $(element).parent().replaceWith('<div class="mermaid" align="center">' + content + '</div>');
    });

    if (typeof mermaid != 'undefined' && typeof mermaid.mermaidAPI != 'undefined') {
        mermaid.mermaidAPI.initialize( Object.assign( {}, mermaid.mermaidAPI.getSiteConfig(), { startOnLoad: true } ) );
        mermaid.contentLoaded();
        $(".mermaid svg").svgPanZoom({});
    }
}

function initAnchorClipboard(){
    var clip = new ClipboardJS('.anchor');
    $("h1~h2,h1~h3,h1~h4,h1~h5,h1~h6").append(function(index, html){
        var element = $(this);
        var url = encodeURI(document.location.origin + document.location.pathname);
        var link = url + "#"+element[0].id;
        var html = " " + $( '<span>' ).addClass("anchor").attr("title", window.T_Copy_link_to_clipboard).attr("data-clipboard-text", link).append("<i class='fas fa-link fa-lg'></i>").get(0).outerHTML;
        return html;
    });

    $(".anchor").on('mouseleave', function(e) {
        $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
    });

    clip.on('success', function(e) {
        e.clearSelection();
        $(e.trigger).attr('aria-label', window.T_Link_copied_to_clipboard).addClass('tooltipped tooltipped-s');
    });
}

function initCodeClipboard(){
    function fallbackMessage(action) {
        var actionMsg = '';
        var actionKey = (action === 'cut' ? 'X' : 'C');

        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        }
        else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        }
        else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }

        return actionMsg;
    }

    $('code').each(function() {
        var code = $(this),
            text = code.text();

        if (text.length > 5) {
            var clip = new ClipboardJS('.copy-to-clipboard-button', {
                text: function(trigger) {
                    var text = $(trigger).prev('code').text();
                    // remove a trailing line break, this may most likely
                    // come from the browser / Hugo transformation
                    text = text.replace(/\n$/, '');
                    // removes leading $ signs from text in an assumption
                    // that this has to be the unix prompt marker - weird
                    return text.replace(/^\$\s/gm, '');
                }
            });

            clip.on('success', function(e) {
                e.clearSelection();
                var inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', window.T_Copied_to_clipboard).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
            });

            clip.on('error', function(e) {
                var inPre = $(e.trigger).parent().prop('tagName') == 'PRE';
                $(e.trigger).attr('aria-label', fallbackMessage(e.action)).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                $(document).one('copy', function(){
                    $(e.trigger).attr('aria-label', window.T_Copied_to_clipboard).addClass('tooltipped tooltipped-' + (inPre ? 'w' : 's'));
                });
            });

            var parent = code.parent();
            var inPre = parent.prop('tagName') == 'PRE';
            code.addClass('copy-to-clipboard-code');
            if( inPre ){
                parent.addClass( 'copy-to-clipboard' );
            }
            else{
                code.replaceWith($('<span/>', {'class': 'copy-to-clipboard'}).append(code.clone() ));
                code = parent.children('.copy-to-clipboard').last().children('.copy-to-clipboard-code');
            }
            code.after( $('<span>').addClass("copy-to-clipboard-button").attr("title", window.T_Copy_to_clipboard).append("<i class='fas fa-copy'></i>") );
            code.next('.copy-to-clipboard-button').on('mouseleave', function() {
                $(this).attr('aria-label', null).removeClass('tooltipped tooltipped-s tooltipped-w');
            });
        }
    });
}

function initArrowNav(){
    // button navigation
    jQuery(function() {
        jQuery('a.nav-prev').click(function(){
            location.href = jQuery(this).attr('href');
        });
        jQuery('a.nav-next').click(function() {
            location.href = jQuery(this).attr('href');
        });
    });

    // keyboard navigation
    jQuery(document).keydown(function(e) {
      if(e.which == '37') {
        jQuery('a.nav-prev').click();
      }
      if(e.which == '39') {
        jQuery('a.nav-next').click();
      }
    });

    // avoid keyboard navigation for input fields
    jQuery(formelements).keydown(function (e) {
        if (e.which == '37' || e.which == '39') {
            e.stopPropagation();
        }
    });
}

function initMenuScrollbar(){
    var content = '#body-inner';
    if( isIE ){
        // IE can not display the topbar as sticky; so we let
        // the whole body scroll instead of just the content
        content = '#body';
    }
    var autofocus = false;
    document.addEventListener('keydown', function(event){
        // for initial keyboard scrolling support, no element
        // may be hovered, but we still want to react on
        // cursor/page up/down. because we can't hack
        // the scrollbars implementation, we try to trick
        // it and give focus to the scrollbar - only
        // to just remove the focus right after scrolling
        // happend
        var p = document.querySelector(content).matches(':hover');
        var m = document.querySelector('#content-wrapper').matches(':hover');
        var f = event.target.matches( formelements );
        if( !p && !m && !f ){
            // only do this hack if none of our scrollbars
            // is hovered
            autofocus = true;
            // if we are showing the sidebar as a flyout we
            // want to scroll the content-wrapper, otherwise we want
            // to scroll the body
            var n = document.querySelector('body').matches('.sidebar-flyout');
            if( n ){
                psm.scrollbarY.focus();
            }
            else{
                psc.scrollbarY.focus();
            }
        }
    });
    // scrollbars will install their own keyboard handlers
    // that need to be executed inbetween our own handlers
    var psm = new PerfectScrollbar('#content-wrapper');
    var psc = new PerfectScrollbar(content);
    window.addEventListener('resize', function(){
        psm && psm.update();
        psc && psc.update();
    });
    document.addEventListener('keydown', function(){
        // if we facked initial scrolling, we want to
        // remove the focus to not leave visual markers on
        // the scrollbar
        if( autofocus ){
            psc.scrollbarY.blur();
            psm.scrollbarY.blur();
            autofocus = false;
        }
    });
}

function initLightbox(){
    // wrap image inside a lightbox (to get a full size view in a popup)
    var images = $("main#body-inner img").not(".inline");
    images.wrap(function(){
        var image =$(this);
        var o = getUrlParameter(image[0].src);
        var f = o['featherlight'];
        // IF featherlight is false, do not use feather light
        if (f != 'false') {
            if (!image.parent("a").length) {
                var html = $( "<a>" ).attr("href", image[0].src).attr("data-featherlight", "image").get(0).outerHTML;
                return html;
            }
        }
    });

    $('a[rel="lightbox"]').featherlight({
        root: 'div#body'
    });
}

function initImageStyles(){
    // change image styles, depending on parameters set to the image
    var images = $("main#body-inner img").not(".inline");
    images.each(function(index){
        var image = $(this)
        var o = getUrlParameter(image[0].src);
        if (typeof o !== "undefined") {
            var h = o["height"];
            var w = o["width"];
            var c = o["classes"];
            image.css("width", function() {
                if (typeof w !== "undefined") {
                    return w;
                } else {
                    return "auto";
                }
            });
            image.css("height", function() {
                if (typeof h !== "undefined") {
                    return h;
                } else {
                    return "auto";
                }
            });
            if (typeof c !== "undefined") {
                var classes = c.split(',');
                for (i = 0; i < classes.length; i++) {
                    image.addClass(classes[i]);
                }
            }
        }
    });
}

function initToc(){
    function showNav(){
        var b = document.querySelector( 'body' );
        b.classList.toggle( 'sidebar-flyout' );
        var n = b.matches('.sidebar-flyout');
        if( n ){
            b.classList.remove( 'toc-flyout' );
        }
    }
    function showToc(){
        var b = document.querySelector( 'body' );
        b.classList.toggle( 'toc-flyout' );
    }

    document.querySelector( '#sidebar-overlay' ).addEventListener( 'click', showNav );
    document.querySelector( '#sidebar-toggle' ).addEventListener( 'click', showNav );
    document.querySelector( '#toc-overlay' ).addEventListener( 'click', showToc );
    var t = document.querySelector( '#toc-menu' );
    var p = document.querySelector( '.progress' );
    if( t && p ){
        // we may not have a toc
        t.addEventListener( 'click', showToc );
        p.addEventListener( 'click', showToc );
    }
}

function initSwipeHandler(){
    if( !touchsupport ){
        return;
    }

    var startx = null;
    var starty = null;
    var handleStartX = function(evt) {
        startx = evt.touches[0].clientX;
        starty = evt.touches[0].clientY;
        return false;
    };
    var handleMoveX = function(evt) {
        if( startx !== null ){
            var diffx = startx - evt.touches[0].clientX;
            var diffy = starty - evt.touches[0].clientY || .1 ;
            if( diffx / Math.abs( diffy ) < 2 ){
                // detect mostly vertical swipes and reset our starting pos
                // to not detect a horizontal move if vertical swipe is unprecise
                startx = evt.touches[0].clientX;
            }
            else if( diffx > 30 ){
                startx = null;
                starty = null;
                document.querySelector( 'body' ).classList.toggle( 'sidebar-flyout' );
            }
        }
        return false;
    };
    var handleEndX = function(evt) {
        startx = null;
        starty = null;
        return false;
    };

    document.querySelector( '#sidebar-overlay' ).addEventListener("touchstart", handleStartX, false);
    document.querySelector( '#sidebar' ).addEventListener("touchstart", handleStartX, false);
    document.querySelectorAll( '#sidebar *' ).forEach( function(e){ e.addEventListener("touchstart", handleStartX); }, false);
    document.querySelector( '#sidebar-overlay' ).addEventListener("touchmove", handleMoveX, false);
    document.querySelector( '#sidebar' ).addEventListener("touchmove", handleMoveX, false);
    document.querySelectorAll( '#sidebar *' ).forEach( function(e){ e.addEventListener("touchmove", handleMoveX); }, false);
    document.querySelector( '#sidebar-overlay' ).addEventListener("touchend", handleEndX, false);
    document.querySelector( '#sidebar' ).addEventListener("touchend", handleEndX, false);
    document.querySelectorAll( '#sidebar *' ).forEach( function(e){ e.addEventListener("touchend", handleEndX); }, false);
}

function scrollToActiveMenu() {
    window.setTimeout(function(){
        var e = $("#sidebar ul.topics li.active a")[0];
        if( e && e.scrollIntoView ){
            e.scrollIntoView({
                block: 'center',
            });
        }
    }, 10);
}

// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
      var sURLVariables = url[1].split('&'),
          sParameterName,
          i;
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          obj[sParameterName[0]] = sParameterName[1];
      }
    }
    return obj;
};

// debouncing function from John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
(function($, sr) {

    var debounce = function(func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

jQuery(function() {
    initArrowNav();
    initMermaid();
    initMenuScrollbar();
    scrollToActiveMenu();
    initLightbox();
    initImageStyles();
    initToc();
    initAnchorClipboard();
    initCodeClipboard();
    restoreTabSelections();
    initSwipeHandler();

    jQuery('[data-clear-history-toggle]').on('click', function() {
        for( var item in sessionStorage ){
          if( item.substring( 0, baseUriFull.length ) === baseUriFull ){
            sessionStorage.removeItem( item );
          }
        }
        location.reload();
        return false;
    });

    var ajax;
    jQuery('[data-search-input]').on('input', function() {
        var input = jQuery(this),
            value = input.val(),
            items = jQuery('[data-nav-id]');
        items.removeClass('search-match');
        if (!value.length) {
            $('ul.topics').removeClass('searched');
            items.css('display', 'block');
            sessionStorage.removeItem(baseUriFull+'search-value');
            $("mark").parents(".expand-marked").removeClass("expand-marked");
            $(".highlightable").unhighlight({ element: 'mark' })
            return;
        }

        sessionStorage.setItem(baseUriFull+'search-value', value);
        $("mark").parents(".expand-marked").removeClass("expand-marked");
        $(".highlightable").unhighlight({ element: 'mark' }).highlight(value, { element: 'mark' });
        $("mark").parents(".expand").addClass("expand-marked");

        if (ajax && ajax.abort) ajax.abort();

        jQuery('[data-search-clear]').on('click', function() {
            jQuery('[data-search-input]').val('').trigger('input');
            sessionStorage.removeItem(baseUriFull+'search-input');
            $("mark").parents(".expand-marked").removeClass("expand-marked");
            $(".highlightable").unhighlight({ element: 'mark' })
        });
    });

    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    if (sessionStorage.getItem(baseUriFull+'search-value')) {
        var searchValue = sessionStorage.getItem(baseUriFull+'search-value')
        $('[data-search-input]').val(searchValue);
        $('[data-search-input]').trigger('input');
        var searchedElem = $('#body-inner').find(':contains(' + searchValue + ')').get(0);
        if (searchedElem) {
            searchedElem.scrollIntoView(true);
            var scrolledY = window.scrollY;
            if(scrolledY){
                window.scroll(0, scrolledY - 125);
            }
        }
    }

    $(".highlightable").highlight(sessionStorage.getItem(baseUriFull+'search-value'), { element: 'mark' });
    $("mark").parents(".expand").addClass("expand-marked");

    $('#topbar a:not(:has(img)):not(.btn)').addClass('highlight');
    $('#body-inner a:not(:has(img)):not(.btn):not(a[rel="footnote"])').addClass('highlight');

    var visitedItem = baseUriFull + 'visited-url/'
    sessionStorage.setItem(visitedItem+jQuery('body').data('url'), 1);

    // loop through the sessionStorage and see if something should be marked as visited
    for( var item in sessionStorage ){
        if( item.substring( 0, visitedItem.length ) === visitedItem && sessionStorage.getItem( item ) == 1 ){
            var url = item.substring( visitedItem.length );
            // in case we have `relativeURLs=true` we have to strip the
            // relative path to root
            url = url.replace( /\.\.\//g, '/' ).replace( /^\/+\//, '/' );
            jQuery('[data-nav-id="' + url + '"]').addClass('visited');
        }
    }
});

jQuery.extend({
    highlight: function(node, re, nodeName, className) {
        if (node.nodeType === 3 && node.parentElement && node.parentElement.namespaceURI == 'http://www.w3.org/1999/xhtml') { // text nodes
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
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
            !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
            !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function(options) {
    var settings = {
        className: 'highlight',
        element: 'span'
    };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function() {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function(words, options) {
    var settings = {
        className: 'highlight',
        element: 'span',
        caseSensitive: false,
        wordsOnly: false
    };
    jQuery.extend(settings, options);

    if (!words) { return; }

    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i) {
        return word != '';
    });
    words = jQuery.map(words, function(word, i) {
        return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; }
    ;

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);

    return this.each(function() {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};
