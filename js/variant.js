// we need to load this script in the html head to avoid flickering
// on page load if the user has selected a non default variant
var variants = {
	variant: '',
	variants: [],
	customvariantname: 'my-custom-variant',

	init: function( variants ){
		this.variants = variants;
		var variant = window.localStorage.getItem( baseUriFull+'variant' ) || ( this.variants.length ? this.variants[0] : '' );
		this.changeVariant( variant );
		document.addEventListener( 'readystatechange', function(){
			if( document.readyState == 'interactive' ){
				this.markSelectedVariant();
			}
		}.bind( this ) );
	},

	getVariant: function(){
		return this.variant;
	},

	setVariant: function( variant ){
		this.variant = variant;
		window.localStorage.setItem( baseUriFull+'variant', variant );
	},

	markSelectedVariant: function(){
		var variant = this.getVariant();
		var select = document.querySelector( '#select-variant' );
		if( !select ){
			return;
		}
		this.addCustomVariantOption();
		if( variant && select.value != variant ){
			select.value = variant;
		}
		// remove selection, because if some uses an arrow navigation"
		// by pressing the left or right cursor key, we will automatically
		// select a different style
		if( document.activeElement ){
			document.activeElement.blur();
		}
	},

	generateVariantPath: function( variant, old_path ){
		var new_path = old_path.replace( /^(.*\/theme-).*?(\.css.*)$/, '$1' + variant + '$2' );
		return new_path;
	},

	addCustomVariantOption: function(){
		var variantbase = window.localStorage.getItem( baseUriFull+'customvariantbase' );
		if( this.variants.indexOf( variantbase ) < 0 ){
			variantbase = '';
		}
		if( !window.localStorage.getItem( baseUriFull+'customvariant' ) ){
			variantbase = '';
		}
		if( !variantbase ){
			return;
		}
		var select = document.querySelector( '#select-variant' );
		if( !select ){
			return;
		}
		var option = document.querySelector( '#' + this.customvariantname );
		if( !option ){
			option = document.createElement( 'option' );
			option.id = this.customvariantname;
			option.value = this.customvariantname;
			option.text = this.customvariantname.replace( /-/g, ' ' ).replace(/\w\S*/g, function(w){ return w.replace(/^\w/g, function(c){ return c.toUpperCase(); }); });
			select.appendChild( option );
			document.querySelectorAll( '.footerVariantSwitch' ).forEach( function( e ){
				e.classList.add( 'showVariantSwitch' );
			});
		}
	},

	removeCustomVariantOption: function(){
		var option = document.querySelector( '#' + this.customvariantname );
		if( option ){
			option.remove();
		}
		if( this.variants.length <= 1 ){
			document.querySelectorAll( '.footerVariantSwitch' ).forEach( function( e ){
				e.classList.remove( 'showVariantSwitch' );
			});
		}
	},

	saveCustomVariant: function(){
		if( this.getVariant() != this.customvariantname ){
			window.localStorage.setItem( baseUriFull+'customvariantbase', this.getVariant() );
		}
		window.localStorage.setItem( baseUriFull+'customvariant', this.generateStylesheet() );
		this.setVariant( this.customvariantname );
		this.markSelectedVariant();
	},

	loadCustomVariant: function(){
		var stylesheet = window.localStorage.getItem( baseUriFull+'customvariant' );

		// temp styles to document
		var head = document.querySelector( 'head' );
		var style = document.createElement( 'style' );
		style.id = 'custom-variant-style';
		style.appendChild( document.createTextNode( stylesheet ) );
		head.appendChild( style );

		var interval_id = setInterval( function(){
			if( this.findLoadedStylesheet( 'variant-style' ) ){
				clearInterval( interval_id );
				// save the styles to the current variant stylesheet
				this.variantvariables.forEach( function( e ){
					this.changeColor( e.name, true );
				}.bind( this ) );

				// remove temp styles
				style.remove();

				this.saveCustomVariant();
			}
		}.bind( this ), 25 );

	},

	resetVariant: function(){
		var variantbase = window.localStorage.getItem( baseUriFull+'customvariantbase' );
		if( variantbase && confirm( 'You have made changes to your custom variant. Are you sure you want to reset all changes?' ) ){
			window.localStorage.removeItem( baseUriFull+'customvariantbase' );
			window.localStorage.removeItem( baseUriFull+'customvariant' );
			this.removeCustomVariantOption();
			if( this.getVariant() == this.customvariantname ){
				this.changeVariant( variantbase );
			}
		}
	},

	switchStylesheet: function( variant, without_check ){
		var link = document.querySelector( '#variant-style' );
		if( !link ){
			return;
		}
		var old_path = link.getAttribute( 'href' );
		var new_path = this.generateVariantPath( variant, old_path );
		link.setAttribute( 'href', new_path );
	},

	changeVariant: function( variant ){
		if( variant == this.customvariantname ){
			var variantbase = window.localStorage.getItem( baseUriFull+'customvariantbase' );
			if( this.variants.indexOf( variantbase ) < 0 ){
				variant = '';
			}
			if( !window.localStorage.getItem( baseUriFull+'customvariant' ) ){
				variant = '';
			}
			this.setVariant( variant );
			if( !variant ){
				return;
			}
			this.switchStylesheet( variantbase );
			this.loadCustomVariant();
		}
		else{
			if( this.variants.indexOf( variant ) < 0 ){
				variant = this.variants.length ? this.variants[ 0 ] : '';
			}
			this.setVariant( variant );
			if( !variant ){
				return;
			}
			this.switchStylesheet( variant );
			this.markSelectedVariant();
		}
	},

	generator: function( vargenerator, vardownload, varreset ){
		var graphDefinition = this.generateGraph();
		var graphs = document.querySelectorAll( vargenerator );
		graphs.forEach( function( e ){ e.innerHTML = graphDefinition; });

		var interval_id = setInterval( function(){
			if( document.querySelectorAll( vargenerator + '.mermaid > svg' ).length ){
				clearInterval( interval_id );
				this.styleGraph();
			}
		}.bind( this ), 25 );

		var downloads = document.querySelectorAll( vardownload );
		downloads.forEach( function( e ){ e.addEventListener('click', this.getStylesheet.bind( this )); }.bind( this ) );

		var resets = document.querySelectorAll( varreset );
		resets.forEach( function( e ){ e.addEventListener('click', this.resetVariant.bind( this )); }.bind( this ) );
	},

	download: function(data, mimetype, filename){
		console.log( data );
		var blob = new Blob([data], { type: mimetype });
		var url = window.URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('download', filename);
		a.click();
	},

	getStylesheet: function(){
		this.download( this.generateStylesheet(), 'text/css', 'theme-' + this.customvariantname + '.css' );
	},

	adjustCSSRules: function(selector, props, sheets){
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
	},

	normalizeColor: function( c ){
		if( !c || !c.trim ){
			return c;
		}
		c = c.trim();
		c = c.replace( /\s*\(\s*/g, "( " );
		c = c.replace( /\s*\)\s*/g, " )" );
		c = c.replace( /\s*,\s*/g, ", " );
		c = c.replace( /0*\./g, "." );
		c = c.replace( / +/g, " " );
		return c;
	},

	getColorValue: function( c ){
		return this.normalizeColor( getComputedStyle( document.documentElement ).getPropertyValue( '--INTERNAL-'+c ) );
	},

	findLoadedStylesheet: function( id ){
		var style = null;
		for( var n = 0; n < document.styleSheets.length; ++n ){
			if( document.styleSheets[n].ownerNode.id == id ){
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
		return style;
	},

	changeColor: function( c, without_prompt ){
		without_prompt = without_prompt || false;
		var read_style = this.findLoadedStylesheet( 'custom-variant-style' );
		var write_style = this.findLoadedStylesheet( 'variant-style' );
		if( !read_style ){
			read_style = write_style;
		}

		var e = this.findColor( c );
		var p = this.normalizeColor( read_style.getPropertyValue( '--'+c ) ).replace( '--INTERNAL-', '--' );
		var f = this.getColorValue( e.fallback );

		var v = this.getColorValue( e.name );
		if( v == f || v == this.normalizeColor(e.default) ){
			v = '';
		}
		if( p ){
			v = p;
		}

		var n = '';
		if( without_prompt ){
			n = v;
		}
		else{
			var t = c + '\n\n' + e.tooltip + '\n';
			if( e.fallback ){
				t += '\nInherits value "' + f + '" from ' + e.fallback + ' if not set\n';
			}
			if( e.default ){
				t += '\nDefaults to value "' + this.normalizeColor(e.default) + '" if not set\n';
			}
			n = prompt( t, v );
		}

		if( n ){
			n = this.normalizeColor( n ).replace( '--INTERNAL-', '--' ).replace( '--', '--INTERNAL-' );
			if( without_prompt || n != v ){
				write_style.setProperty( '--'+c, n );
			}
			if( !without_prompt ){
				this.saveCustomVariant();
			}
		}
		else if( n !== null){
			write_style.removeProperty( '--'+c );
			if( !without_prompt ){
				this.saveCustomVariant();
			}
		}
	},

	findColor: function( name ){
		var f = this.variantvariables.find( function( x ){
			return x.name == name;
		});
		return f;
	},

	generateColorVariable: function( e ){
		var v = '';
		var gen = true;
		if( e.fallback ){
			f = this.findColor( e.fallback );
			gen = this.getColorValue(f.name) != this.getColorValue(e.name);
		}
		else if( e.default ){
			gen = this.normalizeColor(e.default) != this.getColorValue(e.name);
		}
		if( gen ){
			v += '  --' + e.name + ': ' + this.getColorValue(e.name) + '; /* ' + e.tooltip + ' */\n';
		}
		return v;
	},

	generateStylesheet: function(){
		var style =
			'/* ' + this.customvariantname + ' */\n' +
			':root {\n' +
			this.variantvariables.sort( function( l, r ){ return l.name.localeCompare(r.name); } ).reduce( function( a, e ){ return a + this.generateColorVariable( e ); }.bind( this ), '' ) +
			'}\n';
		return style;
	},

	styleGraphGroup: function( selector, colorvar ){
		this.adjustCSSRules( '#body svg '+selector+' > rect', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
		this.adjustCSSRules( '#body svg '+selector+' > .label .nodeLabel', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
		this.adjustCSSRules( '#body svg '+selector+' > .cluster-label .nodeLabel', 'color: var(--INTERNAL-'+colorvar+'); fill: var(--INTERNAL-'+colorvar+'); stroke: #80808080;' );
		this.adjustCSSRules( '#body svg '+selector+' .nodeLabel', 'filter: grayscale(1) invert(1) contrast(10000);' );
	},

	styleGraph: function(){
		this.variantvariables.forEach( function( e ){
			this.styleGraphGroup( '.'+e.name, e.name );
		}.bind( this ) );
		this.styleGraphGroup( '#maincontent', 'MAIN-BG-color' );
		this.styleGraphGroup( '#mainheadings', 'MAIN-BG-color' );
		this.styleGraphGroup( '#inlinecode', 'CODE-INLINE-BG-color' );
		this.styleGraphGroup( '#blockcode', 'CODE-BLOCK-BG-color' );
		this.styleGraphGroup( '#coloredboxes', 'BOX-BG-color' );
		this.styleGraphGroup( '#menu', 'MENU-SECTIONS-BG-color' );
		this.styleGraphGroup( '#menuheader', 'MENU-HEADER-BG-color' );
		this.styleGraphGroup( '#menusections', 'MENU-SECTIONS-ACTIVE-BG-color' );
	},

	generateGraphGroupedEdge: function( e ){
		var edge = '';
		if( e.fallback && e.group == this.findColor( e.fallback ).group ){
			edge += e.fallback+':::'+e.fallback+' --> '+e.name+':::'+e.name;
		}
		else{
			edge += e.name+':::'+e.name;
		}
		return edge;
	},

	generateGraphVarGroupedEdge: function( e ){
		var edge = '';
		if( e.fallback && e.group != this.findColor( e.fallback ).group ){
			edge += '  ' + e.fallback+':::'+e.fallback+' --> '+e.name+':::'+e.name + '\n';
		}
		return edge;
	},

	generateGraph: function(){
		var g_groups = {};
		var g_handler = '';

		this.variantvariables.forEach( function( e ){
			var group = e.group || ' ';
			g_groups[ group ] = ( g_groups[ group ] || [] ).concat( e );
			g_handler += '  click '+e.name+' variants.changeColor\n';
		});

		var graph =
			'flowchart LR\n' +
			'  subgraph menu["menu"]\n' +
			'    direction TB\n' +
			'    subgraph menuheader["header"]\n' +
			'      direction LR\n' +
					g_groups[ 'header' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'    subgraph menusections["sections"]\n' +
			'      direction LR\n' +
					g_groups[ 'sections' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'  end\n' +
			'  subgraph maincontent["content"]\n' +
			'    direction TB\n' +
					g_groups[ 'content' ].reduce( function( a, e ){ return a + '    ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    subgraph mainheadings["headings"]\n' +
			'      direction LR\n' +
					g_groups[ 'headings' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'    subgraph inlinecode["inline code"]\n' +
			'      direction LR\n' +
					g_groups[ 'inline code' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'    subgraph blockcode["code blocks"]\n' +
			'      direction LR\n' +
					g_groups[ 'code blocks' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'    subgraph coloredboxes["colored boxes"]\n' +
			'      direction LR\n' +
					g_groups[ 'colored boxes' ].reduce( function( a, e ){ return a + '      ' + this.generateGraphGroupedEdge( e ) + '\n'; }.bind( this ), '' ) +
			'    end\n' +
			'  end\n' +
				this.variantvariables.reduce( function( a, e ){ return a + this.generateGraphVarGroupedEdge( e ); }.bind( this ), '' ) +
			g_handler;

		console.log( graph );
		return graph;
	},

	variantvariables: [
		{ name: 'MAIN-TEXT-color',                       group: 'content',        default: '#101010',                     tooltip: 'text color of content and h1 titles', },
		{ name: 'MAIN-LINK-color',                       group: 'content',        default: '#486ac9',                     tooltip: 'link color of content', },
		{ name: 'MAIN-LINK-HOVER-color',                 group: 'content',       fallback: 'MAIN-LINK-color',             tooltip: 'hoverd link color of content', },
		{ name: 'MAIN-ANCHOR-color',                     group: 'content',       fallback: 'MAIN-LINK-HOVER-color',       tooltip: 'anchor color of titles', },
		{ name: 'MAIN-BG-color',                         group: 'content',        default: '#ffffff',                     tooltip: 'background color of content', },
		{ name: 'TAG-BG-color',                          group: 'content',       fallback: 'MENU-HEADER-BG-color',        tooltip: 'tag color', },

		{ name: 'MAIN-TITLES-TEXT-color',                group: 'headings',       default: '#4a4a4a',                     tooltip: 'text color of h2-h6 titles and transparent box titles', },
		{ name: 'MAIN-TITLES-H1-color',                  group: 'headings',      fallback: 'MAIN-TEXT-color',             tooltip: 'text color of h1 titles', },
		{ name: 'MAIN-TITLES-H2-color',                  group: 'headings',      fallback: 'MAIN-TITLES-TEXT-color',      tooltip: 'text color of h2-h6 titles', },
		{ name: 'MAIN-TITLES-H3-color',                  group: 'headings',      fallback: 'MAIN-TITLES-H2-color',        tooltip: 'text color of h3-h6 titles', },
		{ name: 'MAIN-TITLES-H4-color',                  group: 'headings',      fallback: 'MAIN-TITLES-H3-color',        tooltip: 'text color of h4-h6 titles', },
		{ name: 'MAIN-TITLES-H5-color',                  group: 'headings',      fallback: 'MAIN-TITLES-H4-color',        tooltip: 'text color of h5-h6 titles', },
		{ name: 'MAIN-TITLES-H6-color',                  group: 'headings',      fallback: 'MAIN-TITLES-H5-color',        tooltip: 'text color of h6 titles', },

		{ name: 'CODE-BLOCK-color',                      group: 'code blocks',    default: '#000000',                     tooltip: 'fallback text color of block code; should be adjusted to your selected chroma style', },
		{ name: 'CODE-BLOCK-BG-color',                   group: 'code blocks',    default: '#f8f8f8',                     tooltip: 'fallback background color of block code; should be adjusted to your selected chroma style', },
		{ name: 'CODE-BLOCK-BORDER-color',               group: 'code blocks',   fallback: 'CODE-BLOCK-BG-color',         tooltip: 'border color of block code', },

		{ name: 'CODE-INLINE-color',                     group: 'inline code',    default: '#5e5e5e',                     tooltip: 'text color of inline code', },
		{ name: 'CODE-INLINE-BG-color',                  group: 'inline code',    default: '#fffae9',                     tooltip: 'background color of inline code', },
		{ name: 'CODE-INLINE-BORDER-color',              group: 'inline code',    default: '#fbf0cb',                     tooltip: 'border color of inline code', },

		{ name: 'MENU-HEADER-BG-color',                  group: 'header',         default: '#7dc903',                     tooltip: 'background color of menu header', },
		{ name: 'MENU-HEADER-BORDER-color',              group: 'header',        fallback: 'MENU-HEADER-BG-color',        tooltip: 'separator color of menu header', },
		{ name: 'MENU-HOME-LINK-color',                  group: 'header',         default: '#323232',                     tooltip: 'home button color if configured', },
		{ name: 'MENU-HOME-LINK-HOVER-color',            group: 'header',         default: '#808080',                     tooltip: 'hoverd home button color if configured', },
		{ name: 'MENU-SEARCH-color',                     group: 'header',         default: '#e0e0e0',                     tooltip: 'text and icon color of search box', },
		{ name: 'MENU-SEARCH-BG-color',                  group: 'header',         default: '#323232',                     tooltip: 'background color of search box', },
		{ name: 'MENU-SEARCH-BORDER-color',              group: 'header',        fallback: 'MENU-SEARCH-BG-color',        tooltip: 'border color of search box', },

		{ name: 'MENU-SECTIONS-BG-color',                group: 'sections',       default: '#282828',                     tooltip: 'background of the menu; this is NOT just a color value but can be a complete CSS background definition including gradients, etc.', },
		{ name: 'MENU-SECTIONS-ACTIVE-BG-color',         group: 'sections',       default: 'rgba( 0, 0, 0, .166 )',       tooltip: 'background color of the active menu section', },
		{ name: 'MENU-SECTION-ACTIVE-CATEGORY-color',    group: 'sections',       default: '#444444',                     tooltip: 'text color of the displayed menu topic', },
		{ name: 'MENU-SECTION-ACTIVE-CATEGORY-BG-color', group: 'sections',      fallback: 'MAIN-BG-color',               tooltip: 'background color of the displayed menu topic', },
		{ name: 'MENU-SECTIONS-LINK-color',              group: 'sections',       default: '#bababa',                     tooltip: 'link color of menu topics', },
		{ name: 'MENU-SECTIONS-LINK-HOVER-color',        group: 'sections',      fallback: 'MENU-SECTIONS-LINK-color',    tooltip: 'hoverd link color of menu topics', },
		{ name: 'MENU-VISITED-color',                    group: 'sections',       default: '#506397',                     tooltip: 'icon color of visited menu topics if configured', },
		{ name: 'MENU-SECTION-HR-color',                 group: 'sections',       default: '#606060',                     tooltip: 'separator color of menu footer', },

		{ name: 'BOX-CAPTION-color',                     group: 'colored boxes',  default: 'rgba( 255, 255, 255, 1 )',    tooltip: 'text color of colored box titles', },
		{ name: 'BOX-BG-color',                          group: 'colored boxes',  default: 'rgba( 255, 255, 255, .833 )', tooltip: 'background color of colored boxes', },
		{ name: 'BOX-TEXT-color',                        group: 'colored boxes',  default: 'rgba( 16, 16, 16, 1 )',       tooltip: 'text color of colored box content', },

		{ name: 'BOX-BLUE-color',                        group: 'colored boxes',  default: 'rgba( 48, 117, 229, 1 )',     tooltip: 'background color of blue boxes', },
		{ name: 'BOX-INFO-color',                        group: 'colored boxes', fallback: 'BOX-BLUE-color',              tooltip: 'background color of info boxes', },
		{ name: 'BOX-BLUE-TEXT-color',                   group: 'colored boxes', fallback: 'BOX-TEXT-color',              tooltip: 'text color of blue boxes', },
		{ name: 'BOX-INFO-TEXT-color',                   group: 'colored boxes', fallback: 'BOX-BLUE-TEXT-color',         tooltip: 'text color of info boxes', },

		{ name: 'BOX-GREEN-color',                       group: 'colored boxes',  default: 'rgba( 42, 178, 24, 1 )',      tooltip: 'background color of green boxes', },
		{ name: 'BOX-TIP-color',                         group: 'colored boxes', fallback: 'BOX-GREEN-color',             tooltip: 'background color of tip boxes', },
		{ name: 'BOX-GREEN-TEXT-color',                  group: 'colored boxes', fallback: 'BOX-TEXT-color',              tooltip: 'text color of green boxes', },
		{ name: 'BOX-TIP-TEXT-color',                    group: 'colored boxes', fallback: 'BOX-GREEN-TEXT-color',        tooltip: 'text color of tip boxes', },

		{ name: 'BOX-GREY-color',                        group: 'colored boxes',  default: 'rgba( 128, 128, 128, 1 )',    tooltip: 'background color of grey boxes', },
		{ name: 'BOX-NEUTRAL-color',                     group: 'colored boxes', fallback: 'BOX-GREY-color',              tooltip: 'background color of neutral boxes', },
		{ name: 'BOX-GREY-TEXT-color',                   group: 'colored boxes', fallback: 'BOX-TEXT-color',              tooltip: 'text color of grey boxes', },
		{ name: 'BOX-NEUTRAL-TEXT-color',                group: 'colored boxes', fallback: 'BOX-GREY-TEXT-color',         tooltip: 'text color of neutral boxes', },

		{ name: 'BOX-ORANGE-color',                      group: 'colored boxes',  default: 'rgba( 237, 153, 9, 1 )',      tooltip: 'background color of orange boxes', },
		{ name: 'BOX-NOTE-color',                        group: 'colored boxes', fallback: 'BOX-ORANGE-color',            tooltip: 'background color of note boxes', },
		{ name: 'BOX-ORANGE-TEXT-color',                 group: 'colored boxes', fallback: 'BOX-TEXT-color',              tooltip: 'text color of orange boxes', },
		{ name: 'BOX-NOTE-TEXT-color',                   group: 'colored boxes', fallback: 'BOX-ORANGE-TEXT-color',       tooltip: 'text color of note boxes', },

		{ name: 'BOX-RED-color',                         group: 'colored boxes',  default: 'rgba( 224, 62, 62, 1 )',      tooltip: 'background color of red boxes', },
		{ name: 'BOX-WARNING-color',                     group: 'colored boxes', fallback: 'BOX-RED-color',               tooltip: 'background color of warning boxes', },
		{ name: 'BOX-RED-TEXT-color',                    group: 'colored boxes', fallback: 'BOX-TEXT-color',              tooltip: 'text color of red boxes', },
		{ name: 'BOX-WARNING-TEXT-color',                group: 'colored boxes', fallback: 'BOX-RED-TEXT-color',          tooltip: 'text color of warning boxes', },
	],
};
