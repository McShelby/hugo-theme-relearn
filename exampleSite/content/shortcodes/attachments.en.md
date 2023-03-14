+++
description = "List of files attached to a page"
title = "Attachments"
+++

The `attachments` shortcode displays a list of files attached to a page with adjustable color, title and icon.

{{% attachments sort="asc" /%}}

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

{{< tabs groupId="shortcode-parameter">}}
{{% tab name="shortcode" %}}

````go
{{%/* attachments sort="asc" /*/%}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/attachments.html" (dict
  "context" .
  "sort" "asc"
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name        | Default         | Notes       |
|:------------|:----------------|:------------|
| **style**   | `transparent`   | The style scheme used for the box.<br><br>- by severity: `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `green`, `grey`, `orange`, `red`<br>- by special color: `default`, `transparent` |
| **color**   | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **title**   | see notes       | Arbitrary text for the box title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: `Attachments`<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**    | see notes       | [Font Awesome icon name]({{%relref "shortcodes/icon#finding-an-icon" %}}) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: `paperclip`<br><br>If you want no icon, you have to set this parameter to `" "` (a non empty d with spaces) |
| **sort**    | `asc`           | Sorting the output in `asc`ending or `desc`ending order. |
| **pattern** | `.*`            | A [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), used to filter the attachments by file name. For example:<br><br>- to match a file suffix of 'jpg', use `.*\.jpg` (not `*.\.jpg`)<br>- to match file names ending in `jpg` or `png`, use `.*\.(jpg\|png)` |

## Setup

### Single language

The shortcode lists files found in a specific folder. The name of the folder depends on your page type (either branch bundle, leaf bundle or page).

1. For simple pages, attachments must be placed in a folder named like your page and ending with `.files`.

    > * content
    >   * _index.md
    >   * **page.files**
    >      * attachment.pdf
    >   * page.md

2. If your page is a branch or leaf bundle, attachments must be placed in a nested `_index.files` or `index.files` folder, accordingly.

    For branch bundles:

    > * content
    >   * _index.md
    >   * page
    >      * index.md
    >      * **index.files**
    >          * attachment.pdf

    For leaf bundles:

    > * content
    >   * _index.md
    >   * page
    >      * _index.md
    >      * **_index.files**
    >          * attachment.pdf

### Multilingual

Be aware that if you use a multilingual website, you will need to have as many folders as languages and the language code must be part of the folder name.

Eg. for a site in English and Piratish:

  > * content
  >   * _index.en.md
  >   * _index.pir.md
  >   * **page.en.files**
  >      * attachment.pdf
  >   * **page.pir.files**
  >      * attachment.pdf
  >   * page.en.md
  >   * page.pir.md

## Examples

### Custom Title, List of Attachments Ending in pdf or mp4

````go
{{%/* attachments title="Related **files**" pattern=".*\.(pdf|mp4)" /*/%}}
````

{{% attachments title="Related **files**" pattern=".*\.(pdf|mp4)" /%}}

### Info Styled Box, Descending Sort Order

````go
{{%/* attachments style="info" sort="desc" /*/%}}
````

{{% attachments style="info" sort="desc" /%}}

### With User-Defined Color and Font Awesome Brand Icon

````go
{{%/* attachments color="fuchsia" icon="fab fa-hackerrank" /*/%}}
````

{{% attachments color="fuchsia" icon="fab fa-hackerrank" /%}}

### Style, Color, Title and Icons

For further examples for **style**, **color**, **title** and **icon**, see the [`notice` shortcode]({{% relref "shortcodes/notice" %}}) documentation. The parameter are working the same way for both shortcodes, besides having different defaults.
