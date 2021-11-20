+++
disableToc = false
title = "What's new"
weight = 2
+++

This document shows you what's new in the latest release. For a detailed list of changes, see the [history page]({{%relref "basics/history" %}}).

**Breaking**: A change that requires action by you after upgrading to assure the site is still functional.

**Change**: A change in default behavior. This may requires action by you / may or may not be revertable by configuration.

**New**: Marks new behavior you might find interesting or comes configurable.

---


## 2.9.0

- **Breaking**: This release removes the themes implementation of `ref`/`relref` in favor for Hugos standard implementation. This is because of inconsistencies with the themes implementation. In advantage, your project becomes standard complient and exchanging this theme in your project to some other theme will be effortless.

  In a standard complient form you must not link to the `*.md` file but to its logical name. You'll see, referencing other pages becomes much easier. All three types result in the same reference:

  | Type          | Non-Standard                     | Standard               |
  | ------------- | -------------------------------- | ---------------------- |
  | Branch bundle | `basics/configuration/_index.md` | `basics/configuration` |
  | Leaf bundle   | `basics/configuration/index.md`  | `basics/configuration` |
  | Page          | `basics/configuration.md`        | `basics/configuration` |

  If you've linked from a page of one language to a page of another language, conversion is a bit more difficult but [Hugo got you covered](https://gohugo.io/content-management/cross-references/#link-to-another-language-version) as well.

  Also, the old themes implementation allowed refs to non-existing content. This will cause Hugos implementation to show the error below and abort the generation. If your project relies on this old behavior, you can [reconfigure the error handling](https://gohugo.io/content-management/cross-references/#link-to-another-language-version) of Hugos implementation.

  In the best case your usage of the old implementation is already standard complient and you don't need to change anything. You'll notice this very easily once you've started `hugo server` after an upgrade and no errors are written to the console.

  You may see errors on the console after the update in the form:

  ````sh
  ERROR 2021/11/19 22:29:10 [en] REF_NOT_FOUND: Ref "basics/configuration/_index.md": "hugo-theme-relearn\exampleSite\content\_index.en.md:19:22": page not found
  ````

  In this case, you must apply one of two options:

  1. Copy the old implementation files `theme/hugo-theme-relearn/layouts/shortcode/ref.html` and `theme/hugo-theme-relearn/layouts/shortcode/relref.html` to your own projects `layouts/shortcode/ref.html` and `layouts/shortcode/relref.html` respectively. **This is not recommended** as your project will still rely on non-standard behavior afterwards.

  2. Start up a text editor with regular expression support for search and replace. Apply the following conversions in the given order on all `*.md` files. **This is the recommended choice**.

    | Type          | Search                       | Replace by |
    | ------------- | ---------------------------- | ---------- |
    | Branch bundle | `(ref\s+"[^"]*)/_index\.md"` | `$1"`      |
    | Leaf bundle   | `(ref\s+"[^"]*)/index\.md"`  | `$1"`      |
    | Page          | `(ref\s+"[^"]*)\.md"`        | `$1"`      |

## 2.8.0

- **Change**: Although never officially documented, this release removes the font `Novacento`/`Novecento` from the release. If you use it in an overwritten CSS please replace it with `Work Sans`. This change was necessary as Novacento did not provide all Latin special characters and lead to mixed styled character text eg. for czech.

- **New**: The theme now supports favicons served from `static/images/` named as `favicon` or `logo` in SVG, PNG or ICO format [out of the box]({{% relref "basics/customization/#change-the-favicon" %}}). An overridden partial `layouts/partials/favicon.html` may not be necessary anymore in most cases.

- **New**: You can hide the table of contents menu for the whole site by setting the `disableToc` option in your `config.toml`. For an example see [the example configuration]({{%relref "basics/configuration/#global-site-parameters" %}}).

---

## 2.7.0

- **New**: Optional second parameter for [`notice`]({{% relref "shortcodes/notice" %}}) shortcode to set title in box header.

---

## 2.6.0

- **New**: Your site can now be served from a subfolder if you set `baseURL` and `canonifyURLs=true` in your `config.toml`. See the [documentation]({{% relref "basics/configuration/#a-word-on-running-your-site-in-a-subfolder" %}}) for a detailed example.

---

## 2.5.0

- **Change**: Add new colors `--MAIN-CODE-color` and `--MAIN-CODE-BG-color` for syntax highlightning fallback in your stylesheet in case `guessSyntax=true` is set. Ideally they are set to the same values as the ones from your chosen chroma style.

---

## 2.4.0

- **Change**: Creation of customized stylesheets was simplified down to only contain the CSS variables. Everything else can and should be deleted from your custom stylesheet to assure everything works fine. For the predefined stylesheet variants, this change is already included. The [documentation]({{%relref "basics/customization/#mine-variant" %}}) was adjusted accordingly.

- **New**: Hidden pages are displayed by default in their according tags page. You can now turn off this behavior by setting `disableTagHiddenPages=true` in your `config.toml`.

- **New**: You can define the expansion state of your menus for the whole site by setting the `alwaysopen` option in your `config.toml`. Please see further [documentation]({{%relref "cont/pages/#override-expand-state-rules-for-menu-entries" %}}) for possible values and default behavior.

- **New**: New frontmatter `ordersectionsby` option to change immediate children sorting in menu and `children` shortcode. Possible values are `title` or `weight`.

- **New**: Alternate content of a page is now advertised in the HTML meta tags. See [Hugo documentation](https://gohugo.io/templates/rss/#reference-your-rss-feed-in-head).

---

## 2.2.0

- **New**: Hidden pages are displayed by default in the sitemap generated by Hugo and are therefore visible for search engine indexing. You can now turn off this behavior by setting `disableSeoHiddenPages=true` in your `config.toml`.

---

## 2.1.0

- **Change**: In case the site's structure contains addional *.md files not part of the site (eg files that are meant to be included by site pages - see CHANGELOG.md in exampleSite), they will now be ignored by the search.

- **New**: Hidden pages are indexed for the site search by default. You can now turn off this behavior by setting `disableSearchHiddenPages=true` in your `config.toml`.

- **New**: If a search term is found in an `expand` shortcode, the expand will be opened.

- **New**: The menu will scroll the active item into view on load.

---

## 2.0.0

- **Change**: Syntaxhighlightning was switched to [built in Hugo mechanism](https://gohugo.io/content-management/syntax-highlighting/). You may need to configure a new stylesheet or decide to roll you own as describedd on in the Hugo documentation

- **Change**: In the predefined stylesheets there was a typo and `--MENU-HOME-LINK-HOVERED-color` must be changed to `--MENU-HOME-LINK-HOVER-color`.

- **Change**: `--MENU-HOME-LINK-color` and `--MENU-HOME-LINK-HOVER-color` were missing in the documentation. You should add them to your custom stylesheets.

- **Change**: Arrow navigation and `children` shortcode were ignoring setting for `ordersectionsby`. This is now changed and may result in different sorting order of your sub pages.

- **Change**: If hidden pages are accessed directly by typing their URL, they will be exposed in the menu.

- **Change**: A page without a `title` will be treated as `hidden=true`.

- **New**: You can define the expansion state of your menus in the frontmatter. Please see further [documentation]({{%relref "cont/pages/#override-expand-state-rules-for-menu-entries" %}}) for possible values and default behavior.

- **New**: New partials for defining pre/post content for menu items and the content. See [documentation]({{% relref "basics/customization" %}}) for further reading.

- **New**: Shortcode [`children`]({{% relref "shortcodes/children" %}}) with new parameter `containerstyle`.

- **New**: New shortcode [`include`]({{% relref "shortcodes/include" %}}) to include arbitrary file content into a page.

---

## 1.2.0

- **New**: Shortcode [`expand`]({{% relref "shortcodes/expand" %}}) with new parameter to open on page load.

---

## 1.1.0

- **New**: [`Mermaid`]({{% relref "shortcodes/mermaid#configuration" %}}) config options can be set in `config.toml`.
