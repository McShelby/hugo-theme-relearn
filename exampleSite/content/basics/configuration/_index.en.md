+++
tags = ["config"]
title = "Configuration"
weight = 20
+++

## Global site parameters

On top of [Hugo global configuration](https://gohugo.io/overview/configuration/), the Relearn theme lets you define the following parameters in your `config.toml` (here, values are default).

Note that some of these parameters are explained in details in other sections of this documentation.

```toml
[params]
  # This controls whether submenus will be expanded (true), or collapsed (false) in the
  # menu; if no setting is given, the first menu level is set to false, all others to true;
  # this can be overridden in the pages frontmatter
  alwaysopen = true
  # Prefix URL to edit current page. Will display an "Edit" button on top right hand corner of every page.
  # Useful to give opportunity to people to create merge request for your doc.
  # See the config.toml file from this documentation site to have an example.
  editURL = ""
  # Author of the site, will be used in meta information
  author = ""
  # Description of the site, will be used in meta information
  description = ""
  # Shows a checkmark for visited pages on the menu
  showVisitedLinks = false
  # Disable search function. It will hide search bar
  disableSearch = false
  # Disable search in hidden pages, otherwise they will be shown in search box
  disableSearchHiddenPages = false
  # Disables hidden pages from showing up in the sitemap and on Google (et all), otherwise they may be indexed by search engines
  disableSeoHiddenPages = false
  # Disables hidden pages from showing up on the tags page although the tag term will be displayed even if all pages are hidden
  disableTagHiddenPages = false
  # Javascript and CSS cache are automatically busted when new version of site is generated.
  # Set this to true to disable this behavior (some proxies don't handle well this optimization)
  disableAssetsBusting = false
  # Set this to true if you want to disable generation for generator version meta tags of hugo and the theme;
  # don't forget to also set Hugo's disableHugoGeneratorInject=true, otherwise it will generate a meta tag into your home page
  disableGeneratorVersion = false
  # Set this to true to disable copy-to-clipboard button for inline code.
  disableInlineCopyToClipBoard = false
  # Set this to true to disable the hover effect for copy-to-clipboard buttons for block code.
  disableHoverBlockCopyToClipBoard = false
  # A title for shortcuts in menu is set by default. Set this to true to disable it.
  disableShortcutsTitle = false
  # If set to false, a Home button will appear below the search bar on the menu.
  # It is redirecting to the landing page of the current language if specified. (Default is "/")
  disableLandingPageButton = true
  # When using mulitlingual website, disable the switch language button.
  disableLanguageSwitchingButton = false
  # Hide breadcrumbs in the header and only show the current page title
  disableBreadcrumb = true
  # If set to true, hide table of contents menu in the header of all pages
  disableToc = false
  # If set to false, load the MathJax module on every page regardless if a MathJax shortcode is present
  disableMathJax = false
  # Specifies the remote location of the MathJax js
  customMathJaxURL = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
  # Initialization parameter for MathJax, see MathJax documentation
  mathJaxInitialize = "{}"
  # If set to false, load the Mermaid module on every page regardless if a Mermaid shortcode or Mermaid codefence is present
  disableMermaid = false
  # Specifies the remote location of the Mermaid js
  customMermaidURL = "https://unpkg.com/mermaid/dist/mermaid.min.js"
  # Initialization parameter for Mermaid, see Mermaid documentation
  mermaidInitialize = "{ \"theme\": \"default\" }"
  # If set to false, load the OpenAPI module on every page regardless if a OpenAPI shortcode is present
  disableOpenapi = false
  # Specifies the remote location of the swagger-ui js
  customOpenapiURL = "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"
  # Hide Next and Previous page buttons normally displayed full height beside content
  disableNextPrev = true
  # Order sections in menu by "weight" or "title". Default to "weight";
  # this can be overridden in the pages frontmatter
  ordersectionsby = "weight"
  # Change default color scheme with a variant one. Eg. can be "auto", "red", "blue", "green" or an array like [ "blue", "green" ].
  themeVariant = "auto"
  # Change the breadcrumb separator. Default to ">".
  breadcrumbSeparator = "|"
  # Change the title separator. Default to "::".
  titleSeparator = "-"
  # If set to true, the menu in the sidebar will be displayed in a collapsible tree view. Although the functionality works with old browsers (IE11), the display of the expander icons is limited to modern browsers
  collapsibleMenu = false
  # If a single page can contain content in multiple languages, add those here
  additionalContentLanguage = [ "en" ]
  # If set to true, no index.html will be appended to prettyURLs; this will cause pages not
  # to be servable from the file system
  disableExplicitIndexURLs = false
  # For external links you can define how they are opened in your browser; this setting will only be applied to the content area but not the shortcut menu
  externalLinkTarget = "_blank"
```

## Serving your page from a subfolder

If your site is served from a subfolder, eg. `https://example.com/mysite/`, you have to set the following lines to your `config.toml`

````toml
baseURL = "https://example.com/mysite/"
canonifyURLs = true
relativeURLs = true
````

Without `canonifyURLs=true` URLs in sublemental pages (like `sitemap.xml`, `rss.xml`) will be generated falsly while your HTML files will still work. See https://github.com/gohugoio/hugo/issues/5226.

## Serving your page from the filesystem

If you want your page served from the filesystem by using URLs starting with `file://` you'll need the following configuration in your `config.toml`:

````toml
relativeURLs = true
````

The theme will append an additional `index.html` to all branch bundle links by default to make the page be servable from the file system. If you don't care about the file system and only serve your page via a webserver you can also generate the links without this change by adding this to your `config.toml`

````toml
[params]
  disableExplicitIndexURLs = true
````

{{% notice note %}}
If you want to use the search feature from the file system using an older installation of the theme make sure to change your outputformat for the homepage from the now deprecated `JSON` to `SEARCH` [as seen below](#activate-search).
{{% /notice %}}

## Activate search

If not already present, add the following lines in the same `config.toml` file.

```toml
[outputs]
  home = ["HTML", "RSS", "SEARCH"]
```

This will generate a search index file at the root of your public folder ready to be consumed by the Lunr search library. Note that the `SEARCH` outputformat was named `JSON` in previous releases but was implemented differently. Although `JSON` still works, it is now deprecated.

### Activate dedicated search page

You can add a dedicated search page for your page by adding the `SEARCHPAGE` outputformat to your home page by adding the following lines in your `config.toml` file.

```toml
[outputs]
  home = ["HTML", "RSS", "SEARCH", "SEARCHPAGE"]
```

You can access this page by either clicking on the magnifier glass or by typing some search term and pressing `ENTER` inside of the menu's search box .

![Screenshot of the dedicated search page](search_page.png?&width=60pc)

## Activate print support

You can activate print support to add the capability to print whole chapters or even the complete site. Just add the `PRINT` output format to your home, section and page in your `config.toml` as seen below:

```toml
[outputs]
  home = ["HTML", "RSS", "PRINT", "SEARCH"]
  section = ["HTML", "RSS", "PRINT"]
  page = ["HTML", "RSS", "PRINT"]
```

This will add a little printer icon in the top bar. It will switch the page to print preview when clicked. You can then send this page to the printer by using your browser's usual print functionality.

{{% notice note %}}
The resulting URL will not be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) in terms of [Hugo's URL handling](https://gohugo.io/content-management/urls/#ugly-urls) even if you've set `uglyURLs=true` in your `config.toml`. This is due to the fact that for one mime type only one suffix can be configured.

Nevertheless, if you're unhappy with the resulting URLs you can manually redefine `outputFormats.PRINT` in your own `config.toml` to your liking.
{{% /notice %}}

## MathJax

The MathJax configuration parameters can also be set on a specific page. In this case, the global parameter would be overwritten by the local one. See [Math]({{< relref "shortcodes/math" >}}) for additional documentation.

### Example {#math-example}

MathJax is globally disabled. By default it won't be loaded by any page.

On page "Physics" you coded some JavaScript for a dynamic formulae. You can set the MathJax parameters locally to load mathJax on this page.

You also can disable MathJax for specific pages while globally enabled.

## Mermaid

The Mermaid configuration parameters can also be set on a specific page. In this case, the global parameter would be overwritten by the local one. See [Mermaid]({{< relref "shortcodes/mermaid" >}}) for additional documentation.

### Example {#mermaid-example}

Mermaid is globally disabled. By default it won't be loaded by any page.

On page "Architecture" you coded some JavaScript to dynamically generate a class diagram. You can set the Mermaid parameters locally to load mermaid on this page.

You also can disable Mermaid for specific pages while globally enabled.

## Home Button Configuration

If the `disableLandingPageButton` option is set to `false`, a Home button will appear
on the left menu. It is an alternative for clicking on the logo. To edit the
appearance, you will have to configure two parameters for the defined languages:

```toml
[languages]
[languages.en]
...
[languages.en.params]
landingPageName = "<i class='fas fa-home'></i> Home"
...
[languages.pir]
...
[languages.pir.params]
landingPageName = "<i class='fas fa-home'></i> Arrr! Homme"
...
```

If those params are not configured for a specific language, they will get their
default values:

```toml
landingPageName = "<i class='fas fa-home'></i> Home"
```

The home button is going to look like this:

![Default Home Button](home_button_defaults.png?classes=shadow&width=18.75rem)
