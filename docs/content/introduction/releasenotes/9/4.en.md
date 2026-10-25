---
params:
  disableToc: false
  hidden: true
  minHugoVersion: 0.166.0
title: Version 9.4
type: releasenotes
weight: -4
---

## 9.4.0 (2026-10-25) {#9-4-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} The text of your content is now better readable.

  If you have changed the font, your text is now shown in the weights most fonts offer: 400 for normal, 500 for medium and 700 for bold text, where it was 300 and 400 for normal and medium text before. If you have set font weights for the theme's own font, check them, as the same values now result in lighter text.

- {{% badge style="change" %}}Change{{% /badge %}} The theme now escapes all values you pass to it before writing them into your pages.

  Like Hugo's own templates, the theme now removes `javascript:` URLs from links, images and menu entries and warns about each one during the build. This applies even if your project configuration allows raw HTML. [Buttons](shortcodes/button) and [cards](shortcodes/cards) with a `javascript:` URL as `href` still run that code.

- {{% badge style="change" %}}Change{{% /badge %}} A [custom search index template](configuration/sidebar/search#customizing-the-search-index-generation) set by `search.index.template` now returns only the JSON data of the index, in a file ending in `.json`.

  A template ending in `.js` that assigns the index to `relearn_searchindex` still works but issues a deprecation warning. Rename it to `.json` and remove everything except the JSON data.

### New

- {{% badge style="new" %}}New{{% /badge %}} Your readers can now [sort a table](authoring/markdown#sortable-columns) by its columns, also by several of them at once. Rows joined by merged cells stay together.

  Tables are not sortable by default. Give a single table the class `sortable`, or make all tables sortable with the new `table.sortable` option in your project configuration or a page's front matter. A single table can then be excluded by the class `nosortable`.

- {{% badge style="new" %}}New{{% /badge %}} The search index can now be [published as JSON](configuration/sidebar/search#publishing-the-search-index-as-json) for other tools to read by setting `search.index.json` to `true` in your project configuration.

- {{% badge style="new" %}}New{{% /badge %}} The new color style `purple` can be used wherever a style is accepted, like in [callouts](shortcodes/callout#by-color). Your theme variant can set its color with the variables `BOX-PURPLE-color` and `BOX-PURPLE-TEXT-color`.
