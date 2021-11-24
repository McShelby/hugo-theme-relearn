+++
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
  # Prefix URL to edit current page. Will display an "Edit this page" button on top right hand corner of every page.
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
  # Set this to true to disable copy-to-clipboard button for inline code.
  disableInlineCopyToClipBoard = false
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
  # If set to true, prevents Hugo from including the Mermaid module if not needed (will reduce load times and traffic)
  disableMermaid = false
  # Specifies the remote location of the Mermaid js
  customMermaidURL = "https://unpkg.com/mermaid@8.8.0/dist/mermaid.min.js"
  # Initialization parameter for Mermaid, see Mermaid documentation
  mermaidInitialize = "{ \"theme\": \"default\" }"
  # Hide Next and Previous page buttons normally displayed full height beside content
  disableNextPrev = true
  # Order sections in menu by "weight" or "title". Default to "weight";
  # this can be overridden in the pages frontmatter
  ordersectionsby = "weight"
  # Change default color scheme with a variant one. Can be "red", "blue", "green".
  themeVariant = ""
  # Provide a list of custom css files to load relative from the `static/` folder in the site root.
  custom_css = ["css/foo.css", "css/bar.css"]
  # Change the title separator. Default to "::".
  titleSeparator = "-"
```

## A word on running your site in a subfolder

The theme runs best if your site is installed in the root of your webserver. If your site is served from a subfolder, eg. `https://example.com/mysite/`, you have to set the following lines to your `config.toml`

````toml
baseURL = "https://example.com/mysite/"
canonifyURLs = true
````

Without `canonifyURLs=true` URLs in sublemental pages (like `sitemap.xml`, `rss.xml`) will be generated falsly while your HTML files will still work. See https://github.com/gohugoio/hugo/issues/5226.

## Activate search

If not already present, add the follow lines in the same `config.toml` file.

```toml
[outputs]
home = [ "HTML", "RSS", "JSON"]
```

Relearn theme uses the last improvement available in hugo version 20+ to generate a json index file ready to be consumed by lunr.js javascript search engine.

> Hugo generate lunrjs index.json at the root of public folder.
> When you build the site with `hugo server`, hugo generates it internally and of course it doesn’t show up in the filesystem

## Mermaid

The Mermaid configuration parameters can also be set on a specific page. In this case, the global parameter would be overwritten by the local one. See [Mermaid]({{< relref "shortcodes/mermaid.md" >}}) for additional documentation.

> Example:
>
> Mermaid is globally disabled. By default it won't be loaded by any page.
> On page "Architecture" you need a class diagram. You can set the Mermaid parameters locally to only load mermaid on this page (not on the others).

You also can disable Mermaid for specific pages while globally enabled.

## Home Button Configuration

If the `disableLandingPageButton` option is set to `false`, a Home button will appear
on the left menu. It is an alternative for clicking on the logo. To edit the
appearance, you will have to configure two parameters for the defined languages:

```toml
[Languages]
[Languages.en]
...
landingPageURL = "/"
landingPageName = "<i class='fas fa-home'></i> Home"
...
[Languages.pir]
...
landingPageURL = "/pir/"
landingPageName = "<i class='fas fa-home'></i> Arrr! Homme"
...
```

If those params are not configured for a specific language, they will get their
default values:

```toml
landingPageURL = "/"
landingPageName = "<i class='fas fa-home'></i> Home"
```

The home button is going to look like this:

![Default Home Button](/basics/configuration/images/home_button_defaults.png?width=100%)
