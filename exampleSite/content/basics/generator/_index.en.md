+++
title = "Stylesheet generator"
weight = 26
hidden = true
+++

This interactive tool may help you to generate your own color variant stylesheet.

To get started, first select a color variant from the theme selector that fits you best as a starting point.

The graph is interactive and reflect the current colors. You can click on any of the colored boxes to adjust the respective color. The graph and the page will update accordingly.

The arrowed lines reflect how colors are inherited thru different parts of the theme if the descendent isn't overwritten. If you want to delete a color and let it inherit from its parent, just delete the value from the input field.

This is best seen in the `neon` variant with the differnet headings colors. There, colors for the heading `h1`, `h2`, `h3` and `h4` are explicitly set. `h5` is not set and inherits its value from `h4`. `h6` is also not set and inherits its value from `h5`.

## Variant generator

<div id="vargenerator" class="mermaid" style="background-color: var(--INTERNAL-MAIN-TEXT-color);" align="center">Graph</div>

<script>
function initGraph(){
  var graphDefinition = generateGraph();
  var element = document.querySelector( '#vargenerator' );
  element.innerHTML = graphDefinition;

  var interval_id = setInterval( function(){
    if( document.querySelectorAll( '#vargenerator.mermaid > svg' ).length ){
      clearInterval( interval_id );
      generateGraphStyles();
    }
  }, 100 );
};

function adjustCSSRules(selector, props, sheets){
  // get stylesheet(s)
  if (!sheets) sheets = [...document.styleSheets];
  else if (sheets.sup){    // sheets is a string
    let absoluteURL = new URL(sheets, document.baseURI).href;
    sheets = [...document.styleSheets].filter(i => i.href == absoluteURL);
  }
  else sheets = [sheets];  // sheets is a stylesheet

  // CSS (& HTML) reduce spaces in selector to one.
  selector = selector.replace(/\s+/g, ' ');
  const findRule = s => [...s.cssRules].reverse().find(i => i.selectorText == selector)
  let rule = sheets.map(findRule).filter(i=>i).pop()

  const propsArr = props.sup
    ? props.split(/\s*;\s*/).map(i => i.split(/\s*:\s*/)) // from string
    : Object.entries(props);                              // from Object

  if (rule) for (let [prop, val] of propsArr){
    // rule.style[prop] = val; is against the spec, and does not support !important.
    rule.style.setProperty(prop, ...val.split(/ *!(?=important)/));
  }
  else {
    sheet = sheets.pop();
    if (!props.sup) props = propsArr.reduce((str, [k, v]) => `${str}; ${k}: ${v}`, '');
    sheet.insertRule(`${selector} { ${props} }`, sheet.cssRules.length);
  }
}

function changeColor( c ){
  var style = null;
  var theme = getTheme();
  for( var n = 0; n < document.styleSheets.length; ++n ){
    if( theme = parseTheme( document.styleSheets[n].href ) ){
      var s = document.styleSheets[n];
      for( var m = 0; m < s.rules.length; ++m ){
        if( s.rules[m].selectorText == ':root' ){
          style = s.rules[m].style;
          break;
        }
      }
      break;
    }
  }
  if( !style ){
    alert( 'Theme stylesheet for theme "' + theme + '" not set or found' );
    return;
  }

  var r = document.querySelector( ':root' );
  var v = getComputedStyle( document.documentElement ).getPropertyValue( '--INTERNAL-'+c ).trim();
  var n = prompt( '--'+c, v ).trim();
  if( n ){
    r = style.quer
    style.setProperty( '--'+c, n );
  }
  else{
    style.removeProperty( '--'+c );
  }
}

function styleGroup( selector, colorvar ){
  adjustCSSRules( '#body svg '+selector+' > rect', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
  adjustCSSRules( '#body svg '+selector+' > .label .nodeLabel', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
  adjustCSSRules( '#body svg '+selector+' > .cluster-label .nodeLabel', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
//  adjustCSSRules( '#body svg '+selector+' rect', 'stroke: #80808080;' );
  adjustCSSRules( '#body svg '+selector+' .nodeLabel', 'filter: grayscale(1) invert(1) contrast(10000);' );
}

function generateGraphStyles(){
  variables.forEach( function( e ){
    styleGroup( '.'+e.name, e.name );
  });
  //styleGroup( '.root', 'MAIN-TEXT-color' )
  styleGroup( '#maincontent', 'MAIN-BG-color' )
  styleGroup( '#mainheadings', 'MAIN-BG-color' )
  styleGroup( '#inlinecode', 'CODE-INLINE-BG-color' )
  styleGroup( '#blockcode', 'CODE-BLOCK-BG-color' )
  styleGroup( '#coloredboxes', 'BOX-BG-color' );
  styleGroup( '#menu', 'MENU-SECTIONS-BG-color' )
  styleGroup( '#menuheader', 'MENU-HEADER-BG-color' )
  styleGroup( '#menusections', 'MENU-SECTIONS-ACTIVE-BG-color' )
}

function generateGraph(){
  var g_groups = {};
  var g_edges = '';
  var g_handler = '';

  variables.forEach( function( e ){
    var group = e.group || ' ';
    g_groups[ group ] = ( g_groups[ group ] || [] ).concat( e.name );
    if( e.fallback ){
      g_edges += '  ' + e.fallback+':::'+e.fallback+' --> '+e.name+':::'+e.name+';\n';
    }
    else{
      g_edges += '  ' +e.name+':::'+e.name+';\n';
    }
    g_handler += '  click '+e.name+' changeColor\n';
  });

  var graph =
    'flowchart RL\n' +
    '  subgraph menu["menu"]\n' +
    '    direction TB\n' +
    '    subgraph menuheader["header"]\n' +
    '      direction LR\n' +
           g_groups[ 'header' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '    subgraph menusections["sections"]\n' +
    '      direction LR\n' +
           g_groups[ 'sections' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '  end\n' +
    '  subgraph maincontent["content"]\n' +
    '    direction TB\n' +
         g_groups[ 'content' ].reduce( function( a, e ){ return a + '    ' + e + '\n'; }, '' ) +
    '    subgraph mainheadings["headings"]\n' +
    '      direction LR\n' +
           g_groups[ 'headings' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '    subgraph inlinecode["inline code"]\n' +
    '      direction LR\n' +
           g_groups[ 'inline code' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '    subgraph blockcode["code blocks"]\n' +
    '      direction LR\n' +
           g_groups[ 'code blocks' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '    subgraph coloredboxes["colored boxes"]\n' +
    '      direction LR\n' +
           g_groups[ 'colored boxes' ].reduce( function( a, e ){ return a + '      ' + e + '\n'; }, '' ) +
    '    end\n' +
    '  end\n' +
       g_edges +
       g_handler;

  console.log( graph );
  return graph;
}

var variables = [
  { name: 'MAIN-TEXT-color',       group: 'content',  default: '#101010' },
  { name: 'MAIN-LINK-color',       group: 'content',  default: '#486ac9' },
  { name: 'MAIN-LINK-HOVER-color', group: 'content', fallback: 'MAIN-LINK-color' },
  { name: 'MAIN-ANCHOR-color',     group: 'content', fallback: 'MAIN-LINK-color' },
  { name: 'MAIN-BG-color',         group: 'content',  default: '#ffffff' },
  { name: 'TAG-BG-color',          group: 'content', fallback: 'MENU-HEADER-BG-color' },


  { name: 'MAIN-TITLES-TEXT-color',  group: 'headings',  default: '#444753' },
  { name: 'MAIN-TITLES-H1-color',    group: 'headings', fallback: 'MAIN-TEXT-color' },
  { name: 'MAIN-TITLES-H2-color',    group: 'headings', fallback: 'MAIN-TITLES-TEXT-color' },
  { name: 'MAIN-TITLES-H3-color',    group: 'headings', fallback: 'MAIN-TITLES-H2-color' },
  { name: 'MAIN-TITLES-H4-color',    group: 'headings', fallback: 'MAIN-TITLES-H3-color' },
  { name: 'MAIN-TITLES-H5-color',    group: 'headings', fallback: 'MAIN-TITLES-H4-color' },
  { name: 'MAIN-TITLES-H6-color',    group: 'headings', fallback: 'MAIN-TITLES-H5-color' },

  { name: 'CODE-BLOCK-color',        group: 'code blocks',  default: '#000000' },
  { name: 'CODE-BLOCK-BG-color',     group: 'code blocks',  default: '#f8f8f8' },
  { name: 'CODE-BLOCK-BORDER-color', group: 'code blocks', fallback: 'CODE-BLOCK-BG-color' },

  { name: 'CODE-INLINE-color',        group: 'inline code',  default: '#5e5e5e' },
  { name: 'CODE-INLINE-BG-color',     group: 'inline code',  default: '#fffae9' },
  { name: 'CODE-INLINE-BORDER-color', group: 'inline code', fallback: 'CODE-INLINE-BG-color' },

  { name: 'MENU-HEADER-BG-color',       group: 'header',  default: '#7dc903' },
  { name: 'MENU-HEADER-BORDER-color',   group: 'header', fallback: 'MENU-HEADER-BG-color' },
  { name: 'MENU-HOME-LINK-color',       group: 'header',  default: '#323232' },
  { name: 'MENU-HOME-LINK-HOVER-color', group: 'header',  default: '#808080' },
  { name: 'MENU-SEARCH-color',          group: 'header',  default: '#e0e0e0' },
  { name: 'MENU-SEARCH-BG-color',       group: 'header',  default: '#323232' },
  { name: 'MENU-SEARCH-BOX-color',      group: 'header', fallback: 'MENU-SEARCH-BG-color' },

  { name: 'MENU-SECTIONS-BG-color',                group: 'sections',  default: '#282830' },
  { name: 'MENU-SECTIONS-ACTIVE-BG-color',         group: 'sections',  default: '#202028' },
  { name: 'MENU-SECTION-ACTIVE-CATEGORY-color',    group: 'sections',  default: '#444444' },
  { name: 'MENU-SECTION-ACTIVE-CATEGORY-BG-color', group: 'sections', fallback: 'MAIN-BG-color' },
  { name: 'MENU-SECTIONS-LINK-color',              group: 'sections',  default: '#bababa' },
  { name: 'MENU-SECTIONS-LINK-HOVER-color',        group: 'sections', fallback: 'MENU-SECTIONS-LINK-color' },
  { name: 'MENU-VISITED-color',                    group: 'sections',  default: '#506397' },
  { name: 'MENU-SECTION-HR-color',                 group: 'sections',  default: '#606060' },

  { name: 'BOX-CAPTION-color',                 group: 'colored boxes',  default: 'rgba( 255, 255, 255, 1 )' },
  { name: 'BOX-BG-color',                      group: 'colored boxes',  default: 'rgba( 255, 255, 255, .833 )' },
  { name: 'BOX-TEXT-color',                    group: 'colored boxes',  default: 'rgba( 16, 16, 16, 1 )' },

  { name: 'BOX-BLUE-color',                    group: 'colored boxes',  default: 'rgba( 48, 117, 229, 1 )' },
  { name: 'BOX-INFO-color',                    group: 'colored boxes', fallback: 'BOX-BLUE-color' },
  { name: 'BOX-BLUE-TEXT-color',               group: 'colored boxes', fallback: 'BOX-TEXT-color' },
  { name: 'BOX-INFO-TEXT-color',               group: 'colored boxes', fallback: 'BOX-BLUE-TEXT-color' },

  { name: 'BOX-GREEN-color',                   group: 'colored boxes',  default: 'rgba( 42, 178, 24, 1 )' },
  { name: 'BOX-TIP-color',                     group: 'colored boxes', fallback: 'BOX-GREEN-color' },
  { name: 'BOX-GREEN-TEXT-color',              group: 'colored boxes', fallback: 'BOX-TEXT-color' },
  { name: 'BOX-TIP-TEXT-color',                group: 'colored boxes', fallback: 'BOX-GREEN-TEXT-color' },

  { name: 'BOX-GREY-color',                    group: 'colored boxes',  default: 'rgba( 128, 128, 128, 1 )' },
  { name: 'BOX-NEUTRAL-color',                 group: 'colored boxes', fallback: 'BOX-GREY-color' },
  { name: 'BOX-GREY-TEXT-color',               group: 'colored boxes', fallback: 'BOX-TEXT-color' },
  { name: 'BOX-NEUTRAL-TEXT-color',            group: 'colored boxes', fallback: 'BOX-GREY-TEXT-color' },

  { name: 'BOX-ORANGE-color',                  group: 'colored boxes',  default: 'rgba( 237, 153, 9, 1 )' },
  { name: 'BOX-NOTE-color',                    group: 'colored boxes', fallback: 'BOX-ORANGE-color' },
  { name: 'BOX-ORANGE-TEXT-color',             group: 'colored boxes', fallback: 'BOX-TEXT-color' },
  { name: 'BOX-NOTE-TEXT-color',               group: 'colored boxes', fallback: 'BOX-ORANGE-TEXT-color' },

  { name: 'BOX-RED-color',                     group: 'colored boxes',  default: 'rgba( 237, 153, 9, 1 )' },
  { name: 'BOX-WARNING-color',                 group: 'colored boxes', fallback: 'BOX-RED-color' },
  { name: 'BOX-RED-TEXT-color',                group: 'colored boxes', fallback: 'BOX-TEXT-color' },
  { name: 'BOX-WARNING-TEXT-color',            group: 'colored boxes', fallback: 'BOX-RED-TEXT-color' },
];

initGraph();
</script>
