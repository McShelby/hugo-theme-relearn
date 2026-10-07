# Pages

The `pages` shortcode lists pages of your site in various display layouts, optionally grouped and ordered.

{{% multishortcode name="pages" print="false" %}}
- pageref: "fruits"
{{% /multishortcode %}}

## Usage

{{% multishortcode name="pages" execute="false" %}}
- pageref: "fruits"
{{% /multishortcode %}}

A listing is made in two steps. First, a query retrieves the pages, filters, orders and groups them. Second, a display layout renders the result. Each parameter below belongs to one of the two. All parameters can also be set in the [front matter](#front-matter).

The [taxonomy and term pages](authoring/taxterm) are using this shortcode internally, and by using front matter you can modify the apperance. So everything described here applies to the taxonomy and term pages as well.

### Query Parameters

The query assembles the pages as a internal tree structure, similar to the menu. A page dropped from the tree structure by `hidden`, `kind` or `where` takes all pages below it with it. If you want to list pages from any level, set `flatten=true`: the pages become one list and each page is kept or dropped on its own.

| Name           | Default           | Notes       |
|----------------|-------------------|-------------|
| **pageref**    | _&lt;empty&gt;_   | A reference to the page whose pages are listed and whose front matter is read, like `/shortcodes/pages/fruits` or relative to the current page like `fruits`.<br><br>If set and it doesn't resolve to a page, the build fails. If not set, the current page is used or, if called as partial, the page given in `page`. |
| **axis**       | see notes         | Along which axis the pages are collected, seen from the page.<br><br>- `descendants`: the children of the page, and with `levels` above `1` their descendants down to that many levels<br>- `siblings`: the other children of the page's parent<br>- `ancestors`: the parent, its parent and so on, up to `levels` levels<br>- `taxonomy`: the terms of a taxonomy page<br>- `term`: the pages of a term page<br><br>Defaults to `taxonomy` on taxonomy pages, `term` on term pages and `descendants` everywhere else. |
| **levels**     | `1`               | For `axis=descendants`, how many levels to go down, for `axis=ancestors`, how many levels to go up. For example, `axis=ancestors` with `levels=1` lists just the parent. To get all of them, set this to a high number, eg. `999`. |
| **flatten**    | `false`           | When `true`, lists all collected pages as one list instead of a tree. Without `orderby` the pages keep the order of the tree, a parent before the pages below it; with `orderby` all pages are ordered together, and with `groupby` each page is grouped on its own. |
| **kind**       | `all`             | Which kind of pages to keep.<br><br>- `all`: every page<br>- `leaf`: only pages without pages of their own<br>- `branch`: only pages with pages of their own<br><br>In a tree, a page not kept is dropped together with the pages below it. |
| **hidden**     | `false`           | What to do with [hidden pages](configuration/content/hidden).<br><br>- `false`: drop them, together with all pages below them<br>- `true`: keep them<br><br>For taxonomy and term pages this has no effect, as the `disableTagHiddenPages` {{% badge style="option" %}}Option{{% /badge %}} decides here. |
| **where**      | _&lt;empty&gt;_   | Keeps only pages matching the condition `<expression> <operator> <value>`, [see expressions](#expressions).<br><br>- `=`, `!=`: equal, not equal<br>- `<`, `<=`, `>`, `>=`: less, greater<br>- `in`: equal to one of a comma separated list of values<br><br>A value may be delimited by `"`, `'` or a backtick, which a value in the list of `in` needs if it contains a comma. Numbers and dates are compared by their value, everything else as text. A page missing the value only matches `!=`.<br><br>In a tree, a page not matching is dropped together with the pages below it. |
| **groupby**    | see notes         | Groups the pages by the value of an [expression](#expressions). Without a value, the pages are not grouped.<br><br>Defaults to `linktitle \| left 1 \| upper` on taxonomy and term pages [without `pages` front matter](#front-matter) and to no grouping everywhere else.<br><br>Pages for which the expression has no value are put into a last group of their own, labelled `Other`. |
| **grouplabel** | _&lt;the value&gt;_ | The heading of each group, as an [expression](#expressions) evaluated for the group's first page. |
| **grouporder** | `asc`             | The order of the groups.<br><br>- `asc`: ascending<br>- `desc`: descending |
| **orderby**    | see notes         | The order of the pages, as a comma separated list of [expressions](#expressions), each optionally followed by `asc` or `desc`. The first expression decides, the next ones break ties. An argument containing a comma has to be [delimited](#expressions), like `date \| format 'January 2, 2006'`.<br><br>- `auto` keeps the order given by `ordersectionsby` of the page's {{% badge style="frontmatter" %}}Front Matter{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or by `ordersectionsby` of the configuration {{% badge style="option" %}}Option{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or Hugo's default order<br><br>Defaults to `auto`, except on taxonomy and term pages, which have no order of their own: there it defaults to `linktitle`, regardless of `ordersectionsby`.<br><br>Pages for which an expression has no value are put last. |
| **limit**      | _&lt;empty&gt;_   | Keeps only the first pages after ordering. |

### Display Parameters

The display renders the pages the query found, group by group if they were grouped. Grouping is optional: without `groupby`, all pages form one group without a heading. The shortcode writes each group's heading, the display the pages below it, showing their level in the tree in its own way. The display parameters only decide how the pages look, never which pages are listed or in what order.

| Name             | Default         | Notes       |
|------------------|-----------------|-------------|
| **display**      | `tree`          | How the pages are displayed, [see how the displays differ](#displays).<br><br>- `tree`: a nested, unordered list of normal text<br>- `headings`: a non-nested list of headings depending on the page's level<br>- `sections`: a heading for each page of the first level, a nested, unordered list of normal text for pages below<br>- `list`: a non-nested list of normal text<br>- `cards`: a card for each page, [see below for details](#remarks-for-the-cards-display)<br><br>You can [write your own display](#display-template-parameters). |
| **headinglevel** | `2`             | The starting heading level. Headings of the `headings` and `sections` displays start one level below if the pages are grouped. |
| **columns**      | see notes       | The number of columns in full width mode. Accepts values from `1` to `5`. Numbers are reduced when width gets smaller.<br><br>Defaults to `3` on taxonomy and term pages [without `pages` front matter](#front-matter) and for `display=cards`, and to `1` everywhere else. Has no effect for `display=sections`. |
| **description**  | `false`         | When `true` shows a short text under each page. When no description or summary exists for the page, the first 70 words of the content is taken - [read more info about summaries on gohugo.io](https://gohugo.io/content/summaries/). |
| **breadcrumb**   | see notes       | When `true` shows the breadcrumb under each page.<br><br>Defaults to `true` on term pages unless the `disableTermBreadcrumbs` {{% badge style="option" %}}Option{{% /badge %}} is set, and to `false` everywhere else. |
| **image**        | `true`          | For `display=cards` decides whether to put an image on the card. |
| **cardtemplate** | `default`       | For `display=cards` the template to be used to display a card, [see below for details](#own-card-templates). |
| **params**       | _&lt;empty&gt;_ | Arbitrary additional parameter for [your own display](#display-template-parameters) or [card template](#own-card-templates) as string (JSON, TOML, YAML) or in a `dict`, like with the [`cards` shortcode](shortcodes/cards#card-parameters). |

### Configuration

To use this shortcode you need to enable block attributes in your `hugo.toml`.

{{< multiconfig file=hugo >}}
[markup.goldmark.parser.attribute]
  block = true
{{< /multiconfig >}}

### Front Matter

Every parameter but `pageref` can also be set in the front matter of the page whose pages are listed, as `params.pages.<name>`, eg. `params.pages.display`. The front matter adds to the parameters given to the shortcode. If a parameter is given in both, the shortcode wins. If you want to reset a parameter set elsewhere to no value, set it to a string containing only whitespace like `" "`.

Taxonomy and term pages are grouped by the first letter and shown in columns only as long as their front matter sets no `pages` parameter at all. Once it sets any, `groupby` and `columns` default to the same values as everywhere else, so you only get what you ask for.

As front matter works on every page, you can use Hugo's `cascade` to give all listings of a subtree the same look, for example all cards in two columns.

{{< multiconfig fm=true >}}
[[cascade]]
  [cascade.params.pages]
    display = 'cards'
    columns = 2
{{< /multiconfig >}}

## Expressions

The parameters `where`, `groupby`, `grouplabel` and `orderby` take expressions. An expression reads a value of a page and passes it through a pipeline of functions, each separated by `|`.

````
<field> [| <function> [<argument>]]...
````

In this notation, `<…>` stands for something you fill in, square brackets `[…]` mark something as optional, and `...` means the part before may be repeated.

Everything after a function's name is its argument. An argument is either a number, written as is like `left 1`, or a text, delimited by `"`, `'` or a backtick like `format 'January 2, 2006'`. The delimiters keep a `|` or a comma inside the text from separating the pipeline or the expressions of `orderby`. Inside a shortcode parameter delimited by `"`, use `'` or a backtick.

### Fields

| Name                                          | Value |
|-----------------------------------------------|-------|
| `title`                                       | the page's title as shown in its heading, like `Tag :: Foo` for a term page |
| `linktitle`                                   | the title as shown in the menu, which is the page's `linkTitle` or else its `title` |
| `weight`                                      | the weight; like for Hugo, a weight of `0` has no value |
| `length`                                      | the length of the content in characters |
| `path`                                        | the logical path |
| `section`                                     | the top-level section |
| `date`, `lastmod`, `publishdate`, `expirydate`| the respective date; a date that is not set has no value |
| `params.<name>`                               | a value of the page's front matter `params`; use dots to reach deeper, like `params.author.name`; a list or a map has no value |

### Functions

A text argument is shown with its delimiters, like `'<layout>'`, a number argument without, like `<n>`.

| Name                   | Result |
|------------------------|--------|
| `upper`                | the text in upper case |
| `lower`                | the text in lower case |
| `trim`                 | the text without leading and trailing whitespace |
| `left <n>`             | the first n characters of the text |
| `right <n>`            | the last n characters of the text |
| `translate ['<prefix>']` | the text translated by your [translation files](https://gohugo.io/content-management/multilingual/#translation-of-strings), looked up by the optional prefix followed by the text |
| `year`                 | the year of a date |
| `month`                | the month of a date as a number from 1 to 12 |
| `day`                  | the day of the month of a date |
| `weekday`              | the day of the week of a date as a number from 1 for Monday to 7 for Sunday |
| `format '<layout>'`    | a date formatted by a [Hugo date layout](https://gohugo.io/functions/time/format/#layout-string), including the localized ones like `:date_long` |
| `coalesce '<value>'`   | the value if the expression has no value so far |
| `default '<value>'`    | the value if the expression has no value so far or it is zero or false |

Where an expression yields numbers for some pages and text for others, the numbers come first, ordered by value, followed by the text, ordered as text - in both directions. A date counts as a number, while a number written as text in front matter, like `'10'`, is text.

A group is always ordered by the value it was grouped by, never by its heading. For `groupby` ending in `format`, that value is the parts of the date the layout shows, so the groups come in calendar order - `date | format '2006-01'` orders its groups by year and month, and `date | format 'January'` orders them January to December, even for pages from different years.

So to show translated group headings while keeping the order of the untranslated values, use `translate` in `grouplabel` rather than in `groupby`. To order the groups alphabetically by their translation in each language instead, use `translate` in `groupby`.

In `orderby`, an expression ending in `format` orders the same way - `date | format '2. January'` orders by day and month, whatever the year.

## Displays

The displays differ in how they show a page's level below the listed page. With `flatten=true` all pages are on the same level, so every display shows them side by side.

| Display    | List                                                                  | Titles                                           | Levels shown by                                                 | Output   |
|------------|-----------------------------------------------------------------------|--------------------------------------------------|-----------------------------------------------------------------|----------|
| `tree`     | a nested, unordered list                                              | standard text                                    | indentation                                                     | Markdown |
| `headings` | a non-nested list                                                     | headings, listed in the table of contents        | heading size, starting at `headinglevel`                        | Markdown |
| `sections` | a non-nested list for the first level, a nested, unordered list below | headings on the first level, standard text below | first level as headings at `headinglevel`, below by indentation | Markdown |
| `list`     | a non-nested list                                                     | standard text                                    | not shown                                                       | Markdown |
| `cards`    | a card for each page                                                  | card titles                                      | not shown                                                       | HTML, see [below](#remarks-for-the-cards-display) |

### Display Template Parameters

A display is a partial in `layouts/partials/pages`, called once for each group. If you place a file `layouts/partials/pages/mine.html` into your site, you can use it with `display=mine`. The group heading is written by the shortcode, not by your display.

The partial is called with the following parameters:

| Name             | Value |
|------------------|-------|
| **page**         | the page whose pages are listed |
| **group**        | the group, with its `Key`, its heading as `Label`, `Fallback` being `true` for the group of pages without a value, and its `Pages` |
| **pages**        | the group's pages, each with the `Page` itself, its display text as `Label` and its `Level` below the listed page, starting at `1` |
| **headinglevel** | the heading level to start with; already one level below the group heading if the pages are grouped |
| **class**        | the CSS classes to put on your outermost element |
| **columns**      | the `columns` parameter value, as a number |
| **description**  | the `description` parameter value, as `true` or `false` |
| **breadcrumb**   | the `breadcrumb` parameter value, as `true` or `false` |
| **image**        | the `image` parameter value, as `true` or `false` |
| **cardtemplate** | the `cardtemplate` parameter value |
| **levels**       | the `levels` parameter value, as a number |
| **hidden**       | the `hidden` parameter value, as `true` or `false` |
| **params**       | the `params` parameter value, already turned into a `dict` |

### Remarks for the Cards Display

The `cards` display uses the [`cards` shortcode](shortcodes/cards) to show each page as a card, using the `default` cardtemplate. With it the card will display

- if `image=true` a featured image at the start [selected by Hugo](https://gohugo.io/templates/embedded/#configuration-open-graph)
- the title of the page as card title
- if `description=true` the summary

The `cards` display writes HTML. If you have `goldmark.renderer.unsafe=false` (which is the default if you don't set it), you have to use `{{</* pages */>}}` instead of `{{%/* pages */%}}`.

### Own Card Templates

`cardtemplate` selects a [card template](shortcodes/cards#card-templates) as the `template` parameter of the `cards` shortcode does. Besides the [card parameters](shortcodes/cards#card-parameters), its `params` hold:

- `params.page`: the displayed page
- `params.level`: the displayed page's level below the listed page
- `params.description`: the `description` parameter value
- every value of the `params` parameter of the `pages` shortcode; one with the same name as one above loses

## Examples

The examples list the demo pages of the hidden [_Fruits_ section](shortcodes/pages/fruits), which keeps them out of the menu.

### Site Map

Every page of a section at any depth, hidden ones included, each with its description. The pages are ordered alphabetically by the title shown in the menu, as `orderby` is set; the `weight` the demo pages carry is ignored.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  hidden: "true"
  description: "true"
  orderby: "linktitle"
{{% /multishortcode %}}

### Chapter Overview

A heading for each chapter with its description, and the pages of the chapter listed below it. Unlike the site map above, it sets no `orderby`, so the pages come in the default order, the same as in the menu: by `weight`, which the demo pages deliberately set against the alphabet.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "2"
  display: "sections"
  headinglevel: "4"
  description: "true"
{{% /multishortcode %}}

### Glossary

All pages at any depth in an A-Z index, grouped by the first letter of the title shown. Only the pages of the first level are grouped; the pages below them are listed under their parent, so _Cranberry_ appears in the group of _Berries_ rather than under `C`. Set `flatten=true` to group every page by its own letter.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  groupby: "linktitle | left 1 | upper"
  headinglevel: "4"
  levels: "999"
{{% /multishortcode %}}

### What's New

The two most recent published pages, from any depth.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  where: "params.status = published"
  orderby: "date desc"
  limit: "2"
  display: "headings"
  headinglevel: "4"
{{% /multishortcode %}}

### Blog Archive

All pages the menu shows, from any depth, newest first, grouped by year and month with the newest month first. The pages below the hidden _Citrus_ section are left out, just as in the menu.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  groupby: "date | format '2006-01'"
  grouporder: "desc"
  orderby: "date desc"
  display: "list"
  headinglevel: "4"
{{% /multishortcode %}}

### Seasonal Calendar

The pages by the month they were published in, pooled across years. The layout shows only the month's name, so the groups come in calendar order, January to December, whatever the year of their pages.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  groupby: "date | format 'January'"
  headinglevel: "4"
{{% /multishortcode %}}

### Status Board

Every page by its workflow status, hidden ones included, so drafts are easy to spot. With `columns` each group is spread over two columns in full width mode, keeping the long `published` group short.

The front matter holds the status as a plain key like `draft`. The headings show it translated by `translate`: with the prefix `status-` it looks up `status-draft` for `draft` and `status-published` for `published` in the site's translation files. A status without a translation would show as it is. As the translation is only used as `grouplabel`, the groups keep the order of the keys. With `translate` in `groupby` instead, they would be ordered alphabetically by the translation of each language.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  hidden: "true"
  groupby: "params.status"
  grouplabel: "params.status | translate 'status-'"
  orderby: "linktitle"
  headinglevel: "4"
  columns: "2"
{{% /multishortcode %}}

### Top Picks by Flavor

The pages grouped by a front matter parameter, the best ones first. The demo page without a `flavor` has no value for the expression and is put into a last group of its own, labelled `Other`. To give it a value of its own instead, like `groupby: "params.flavor | coalesce 'neutral'"`, use `coalesce`; its group is then ordered among the others. `default` does the same, but also replaces a value of zero or false. Within each group the pages are ordered by `priority` descending and by title if they have the same priority.

{{% multishortcode name="pages" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  groupby: "params.flavor"
  orderby: "params.priority desc, title"
  headinglevel: "4"
  columns: "2"
{{% /multishortcode %}}

### Related Pages

The other pages next to a page, for a "see also" at its end.

{{% multishortcode name="pages" %}}
- pageref: "fruits/apple"
  axis: "siblings"
{{% /multishortcode %}}

### Where Am I

The sections a page sits in, the closest first. The _Fruits_ section is hidden, so it is only listed with `hidden`.

{{% multishortcode name="pages" %}}
- pageref: "fruits/berries/blueberry"
  axis: "ancestors"
  levels: "3"
  hidden: "true"
{{% /multishortcode %}}

### Landing Page Tiles

The sections and pages of a chapter as cards with their description, ordered alphabetically by the title shown instead of by `weight`. Each demo page is a page bundle containing a `featured.png`, which [Hugo selects](https://gohugo.io/templates/embedded/#configuration-open-graph) as the image of its card.

{{% multishortcode name="pages" outputtype="html" %}}
- pageref: "fruits"
  display: "cards"
  description: "true"
  orderby: "linktitle"
{{% /multishortcode %}}

### Picture Index

All pages at any depth, hidden ones included, as cards in an A-Z index. Within a letter the cards are ordered alphabetically by the title shown instead of by `weight`.

{{% multishortcode name="pages" outputtype="html" %}}
- pageref: "fruits"
  levels: "999"
  kind: "leaf"
  flatten: "true"
  hidden: "true"
  display: "cards"
  groupby: "linktitle | left 1 | upper"
  orderby: "linktitle"
  headinglevel: "4"
{{% /multishortcode %}}
