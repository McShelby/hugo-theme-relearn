+++
description = "List of files attached to a page"
title = "Attachments"
+++

The `attachments` shortcode displays a list of files attached to a page with adjustable color, title and icon.

{{% attachments /%}}

## Usage

The shortcurt lists files found in a **specific folder**.

````go
{{%/* attachments /*/%}}
````


Currently, it support two implementations for pages

1. If your page is a Markdown file, attachements must be placed in a **folder** named like your page and ending with **.files**.

    > * content
    >   * _index.md
    >   * page.files
    >      * attachment.pdf
    >   * page.md

2. If your page is a **folder**, attachements must be placed in a nested **'files'** folder.

    > * content
    >   * _index.md
    >   * page
    >      * index.md
    >      * files
    >          * attachment.pdf

Be aware that if you use a multilingual website, you will need to have as many folders as languages.


### Parameter

| Name        | Optional  | Default       | Notes       |
|:------------|:----------|:--------------|:------------|
| **style**   | yes       | `transparent` | The color scheme used to highlight the box content.<br/><br/>- by severity: `info`, `note`, `tip`, `warning`<br/>- by brand color: `primary`, `secondary`<br/>- by color: `blue`, `green`, `grey`, `orange`, `red`<br/>- by special color: `default`, `transparent` |
| **title**   | yes       | see notes     | Arbitray text for the box title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br/><br/>- for severity styles: the matching title for the severity<br/>- for all other colors: `Attachments`<br/><br/>If you want no title, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**    | yes       | see notes     | [Font Awesome icon name]({{%relref "cont/icons#finding-an-icon" %}}) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br/><br/>- for severity styles: a nice matching icon for the severity<br/>- for all other colors: `paperclip`<br/><br/>If you want no icon, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **sort**    | yes       | `asc`         | Sorting the output in `asc`ending or `desc`ending order. |
| **pattern** | yes       | `.*`          | A [regular expressions](https://en.wikipedia.org/wiki/Regular_expression), used to filter the attachments by file name. For example:<br/><br/>- to match a file suffix of 'jpg', use `.*jpg` (not `*.jpg`)<br/>- to match file names ending in `jpg` or `png`, use `.*(jpg\|png)` |

## Examples

### Custom title, list of attachments ending in pdf or mp4

{{% attachments title="Related files" pattern=".*(pdf|mp4)" /%}}

{{% expand "Show markup" %}}

````go
{{%/* attachments title="Related files" pattern=".*(pdf|mp4)" /*/%}}
````

{{% /expand %}}

### Info styled box, descending sort order

{{% attachments style="info" sort="desc" /%}}

{{% expand "Show markup" %}}

````go
{{%/* attachments style="info" sort="desc" /*/%}}
````

{{% /expand %}}

### Style and icons

For further examples for **style**, **title** and **icon**, see the [`notice` shortcode]({{% relref "shortcodes/notice" %}}) documentation. The parameter are working the same way for both shortcodes, besides having different defaults.
