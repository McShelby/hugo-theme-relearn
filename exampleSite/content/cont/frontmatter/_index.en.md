+++
title = "Frontmatter"
weight = 2
+++

Each Hugo page has to define a [frontmatter](https://gohugo.io/content/front-matter/) in _toml_, _yaml_ or _json_. This site will use _toml_ for documentation in all cases.

````toml
+++
# If an option value is said to be not set, you can achieve the same behavior
# by given it an empty string value.

###############################################################################
# Hugo
# These options usually apply to other themes aswell.

# The social media image of your page.
# Default: not set
# This is used for generating social media meta information for the opengraph
# protocol and twitter cards.
# If not set, the set value of your site's hugo.toml is used.
images = [ "images/hero.png" ]

# The title of your page.
# Default: not set
# A page without a title is treated as a hidden page.
title = "Example Page"

# The description of your page.
# Default: not set
# This is used for generating HTML meta tags, social media meta information
# for the opengraph protocol and twitter cards.
# If not set, the set value of your site's hugo.toml is used for the html
# meta tag, social media meta information for the opengraph protocol and
# twitter cards.
description = ""

###############################################################################
# Relearn Theme
# These options are specific to the Relearn theme.

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Topbar
# These options modify the topbar appearance.

# Hide the table of contents button.
# Default: false
# If the TOC button is hidden, also the keyboard shortcut is disabled.
# If not set, the set value of your site's hugo.toml is used.
disableToc = false

# Hide the breadcrumbs.
# Default: false
# If the breadcrumbs are hidden, the title of the displayed page will still be
# shown in the topbar.
disableBreadcrumb = false

# Hide Next and Previous navigation buttons.
# Default: false
# If the navigation buttons are hidden, also the keyboard shortcuts are
# disabled.
disableNextPrev = false

# The URL prefix to edit a page.
# Default: not set
# If set, an edit button will be shown in the topbar. If the button is hidden,
# also the keyboard shortcuts are disabled. The value can contain the macro
# `${FilePath}` which will be replaced by the file path of your displayed page.
# If not set, the set value of your site's hugo.toml is used. If the global
# parameter is given but you want to hide the button for the displayed page,
# you can set the value to an empty string. If instead of hiding you want to have
# an disabled button, you can set the value to a string containing just spaces.
# This is useful if you want to give the opportunity for people to create merge
# request for your content.
editURL = ""

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Menu
# These options modify the menu apperance.

# The title in main menu.
# Default: <title>
# If set, this will be used for the page's menu entry instead of the `title`
# option.
menuTitle = ""

# Prefix for the title in main menu.
# Default: not set
# The title of the page in the menu will be prefixed by this HTML content.
menuPre = ""

# Suffix for the title in main menu.
# Default: not set
# The title of the page in the menu will be suffixed by this HTML content.
menuPost = ""

# The order of main menu submenus.
# Default: "weight"
# Submenus can be ordered by "weight", "title", "linktitle", "modifieddate",
# "expirydate", "publishdate", "date", "length" or "default" (adhering to
# Hugo's default sort order).
# If not set, the value of the parent menu entry is used.
ordersectionsby = "weight"

# The initial expand state of submenus.
# Default: not set
# This controls whether submenus will be expanded (true), or collapsed (false)
# in the menu. If not set, the first menu level is set to false, all others
# levels are set to true. If not set, the value of the parent menu entry is used.
# If the displayed page has submenus, they will always been displayed expanded
# regardless of this option.
alwaysopen = ""

# Shows expander for submenus.
# Default: false
# If set to true, a submenu in the sidebar will be displayed in a collapsible
# tree view and a clickable expander is set in front of the entry.
# If not set, the set value of your site's hugo.toml is used.
collapsibleMenu = true

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Hidden pages
# These options configure how hidden pages are treated.
# A page flagged as hidden, is only removed from the main menu if you are
# currently not on this page or the hidden page is not part of current page's
# ancestors. For all other functionality in Hugo a hidden page behaves like any
# other page if not otherwise configured.

# Hide a page's menu entry.
# Default: false
# If this value is true, the page is hidden from the menu.
hidden = false

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Content
# These options modify how your content is displayed.

# Prefix for the title in the content area.
# Default: not set
# The title of the page heading will be prefixed by this HTML content.
headingPre = ""

# Suffix for the title in the content area.
# Default: not set
# The title of the page heading will be suffixed by this HTML content.
headingPost = ""

# Display name of the page's last editor.
# Default: not set
# If set, it will be displayed in the default footer.
LastModifierDisplayName = ""

# Email address of the page's last editor.
# Default: not set
# If set together with LastModifierDisplayName, it will be displayed in the
# default footer.
LastModifierEmail = ""

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Highlight
# These options configure how code is displayed.

# Wrap for code blocks.
# Default: true
# By default lines of code blocks wrap around if the line is too long to be
# displayed on screen. If you dislike this behavior, you can reconfigure it
# here.
# Note that lines always wrap in print mode regardless of this option.
# If not set, the set value of your site's hugo.toml is used or given as a
# parameter to individual code blocks.
highlightWrap = true

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Images
# These options configure how images are displayed.

# Image effects.
# See the documentation for how you can even add your own arbitrary effects to
# the list.
# All effect values default to the values of your site's hugo.toml and can be
# overridden thru URL parameter given to the image. See the documentation for
# details.

# Default: false
imageEffects.border = true
# Default: true
imageEffects.lightbox = true
# Default: false
imageEffects.shadow = false

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# MathJax
# These options configure how math formulae are displayed.

# Initialization options for MathJax.
# Default: not set
# A JSON value. See the MathJaxdocumentation for possible parameter.
# If not set, the set value of your site's hugo.toml is used.
mathJaxInitialize = "{}"

# Only load MathJax if needed.
# Default: true
# If a Math shortcode is found, the option will be ignored and
# MathJax will be loaded regardlessly. The option is still useful in case you
# are using scripting to set up your graph. In this case no shortcode or
# codefence is involved and the library is not loaded by default. In this case
# you can set `disableMathJax=false` in your frontmatter to force the library to
# be loaded.
# If not set, the set value of your site's hugo.toml is used.
disableMathJax = true

# URL for external MathJax library.
# Default: not set
# Specifies the remote location of the MathJax library. By default the shipped
# version will be used.
# If not set, the set value of your site's hugo.toml is used.
customMathJaxURL = "" # "https://unpkg.com/mathjax/es5/tex-mml-chtml.js"

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Mermaid
# These options configure how Mermaid graphs are displayed.

# Make graphs panable and zoomable
# Default: false
# For huge graphs it can be helpful to make them zoomable. Zoomable graphs come
# with a reset button for the zoom.
# If not set, the set value of your site's hugo.toml is used or given as a
# parameter to individual graphs.
mermaidZoom = true

# Initialization options for Mermaid.
# Default: not set
# A JSON value. See the Mermaid documentation for possible parameter.
# If not set, the set value of your site's hugo.toml is used.
mermaidInitialize = "{ \"securityLevel\": \"loose\" }"

# Only load Mermaid if needed.
# Default: true
# If a Mermaid shortcode or codefence is found, the option will be ignored and
# Mermaid will be loaded regardlessly. The option is still useful in case you
# are using scripting to set up your graph. In this case no shortcode or
# codefence is involved and the library is not loaded by default. In this case
# you can set `disableMermaid=false` in your frontmatter to force the library to
# be loaded.
# If not set, the set value of your site's hugo.toml is used.
disableMermaid = true

# URL for external Mermaid library.
# Default: not set
# Specifies the remote location of the Mermaid library. By default the shipped
# version will be used.
# If not set, the set value of your site's hugo.toml is used.
customMermaidURL = "" # "https://unpkg.com/mermaid/dist/mermaid.min.js"

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
# OpenApi
# These options configure how OpenAPI specifications are displayed.

# Only load OpenAPI if needed.
# Default: true
# If a OpenAPI shortcode is found, the option will be ignored and
# OpenAPI will be loaded regardlessly. The option is still useful in case you
# are using scripting to set up your graph. In this case no shortcode or
# codefence is involved and the library is not loaded by default. In this case
# you can set `disableOpenapi=false` in your frontmatter to force the library to
# be loaded.
# If not set, the set value of your site's hugo.toml is used.
disableOpenapi = true

# URL for external OpenAPI library.
# Default: not set
# Specifies the remote location of the OpenAPI library. By default the shipped
# version will be used.
# If not set, the set value of your site's hugo.toml is used.
customOpenapiURL = "" # "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"
+++
````

## Some Detailed Examples

### Add Icon to a Menu Entry

In the page frontmatter, add a `menuPre` param to insert any HTML code before the menu label. The example below uses the GitHub icon.

````toml
+++
title = "GitHub repo"
menuPre = "<i class='fab fa-github'></i> "
+++
````

![Title with icon](frontmatter-icon.png?width=18.75rem)

### Ordering Sibling Menu/Page Entries

Hugo provides a [flexible way](https://gohugo.io/content/ordering/) to handle order for your pages.

The simplest way is to set `weight` parameter to a number.

````toml
+++
title = "My page"
weight = 5
+++
````

### Using a Custom Title for Menu Entries

By default, the Relearn theme will use a page's `title` attribute for the menu item (or `linkTitle` if defined).

But a page's title has to be descriptive on its own while the menu is a hierarchy.
We've added the `menuTitle` parameter for that purpose:

For example (for a page named `content/install/linux.md`):

````toml
+++
title = "Install on Linux"
menuTitle = "Linux"
+++
````

### Override Expand State Rules for Menu Entries

You can change how the theme expands menu entries on the side of the content with the `alwaysopen` setting on a per page basis. If `alwaysopen=false` for any given entry, its children will not be shown in the menu as long as it is not necessary for the sake of navigation.

The theme generates the menu based on the following rules:

- all parent entries of the active page including their siblings are shown regardless of any settings
- immediate children entries of the active page are shown regardless of any settings
- if not overridden, all other first level entries behave like they would have been given `alwaysopen=false`
- if not overridden, all other entries of levels besides the first behave like they would have been given `alwaysopen=true`
- all visible entries show their immediate children entries if `alwaysopen=true`; this proceeds recursively
- all remaining entries are not shown

You can see this feature in action on the example page for [children shortcode](shortcodes/children) and its children pages.

## Disable Section Pages

You may want to structure your pages in a hierachical way but don't want to generate pages for those sections? The theme got you covered.

To stay with the initial example: Suppose you want `level-one` appear in the sidebar but don't want to generate a page for it. So the entry in the sidebar should not be clickable but should show an expander.

For this, open `content/level-one/_index.md` and add the following frontmatter

````toml
+++
collapsibleMenu = true # this adds the expander to the menu entry if not already set in your hugo.toml
[_build]
  render = "never" # no page will be generated so the page does not have a url
+++
````
