+++
categories = ['howto', 'reference']
description = 'Clickable buttons'
title = 'Button'
+++

The `button` shortcode displays a clickable button with adjustable color, title and icon.

{{% multishortcode name="button" print="false" format="%s\n%s\n" %}}
- content: "Go Hugo"
  href: "https://gohugo.io/"
- content: "Download Magic"
  href: "images/magic.gif?download"
  style: "tip"
  icon: "hand-sparkles"
{{% /multishortcode %}}

## Usage

{{% multishortcode name="button" execute="false" format="%s\n%s\n" %}}
- content: "Go Hugo"
  href: "https://gohugo.io/"
- content: "Download Magic"
  href: "images/magic.gif?download"
  style: "tip"
  icon: "hand-sparkles"
{{% /multishortcode %}}

### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **href**              | _&lt;empty&gt;_ | Either the destination URL for the button or JavaScript code to be executed on click. If this parameter is not set, the button will do nothing but is still displayed as clickable.<br><br>- if starting with `javascript:` all following text will be executed in your browser<br>- every other string will be interpreted as URL, you can use [link effects](authoring/markdown#link-effects) as well. |
| **type**              | see notes       | The [button type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) if **href** is JavaScript. Otherwise the parameter is not used. If the parameter is not given it defaults to `button`. |
| **borderless**        | `false`         | When `true`, no border will be shown around the button. |
| **hint**              | _&lt;empty&gt;_ | Tooltip for the button. |
| **style**             | `transparent`   | The style scheme used for the button.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code`, `link`, `action`, `inline`<br><br>You can also [define your own styles](shortcodes/notice#defining-own-styles). |
| **color**             | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **icon**              | see notes       | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **iconposition**      | `left`          | Places the icon to the `left` or `right` of the title. |
| _**&lt;content&gt;**_ | see notes       | Arbitrary text for the button title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |

## Examples

### Style

#### By Severity

{{% multishortcode name="button" format="%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "caution"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "important"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "info"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "note"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "tip"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "warning"
{{% /multishortcode %}}


#### By Brand Colors

{{% multishortcode name="button" format="%s\n%s\n%s\n" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "primary"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "secondary"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "accent"
{{% /multishortcode %}}

#### By Color

{{% multishortcode name="button" format="%s\n%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "blue"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "cyan"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "green"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "grey"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "magenta"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "orange"
- content: "Get Hugo"
  href: "https://gohugo.io/"
  style: "red"
{{% /multishortcode %}}

#### By Special Color

{{% multishortcode name="button" format="%s\n%s\n%s\n%s\n%s\n%s\n\n%s\n%s\n%s\n%s\n%s\n%s\n\n%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "default"
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "transparent"
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "code"
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "link"
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "action"
- content: "Open Link"
  href: "https://gohugo.io/"
  style: "inline"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "default"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "transparent"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "code"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "link"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "action"
- content: "Run JavaScript"
  href: "javascript:alert('Some JavaScript')"
  style: "inline"
- content: "Fake Button"
  style: "default"
- content: "Fake Button"
  style: "transparent"
- content: "Fake Button"
  style: "code"
- content: "Fake Button"
  style: "link"
- content: "Fake Button"
  style: "action"
- content: "Fake Button"
  style: "inline"
{{% /multishortcode %}}

### Icon

#### Empty

{{% multishortcode name="button" format="%s" %}}
- content: ""
  href: "https://gohugo.io/"
  icon: " "
{{% /multishortcode %}}  

#### Only with Hint

Mouse-over the button to see the hint.

{{% multishortcode name="button" format="%s" %}}
- content: ""
  href: "https://gohugo.io/"
  icon: "download"
  hint: "Go to Hugo's homepage"
{{% /multishortcode %}}  

#### To the Left

{{% multishortcode name="button" format="%s" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  icon: "download"
{{% /multishortcode %}}

#### To the Right

{{% multishortcode name="button" format="%s" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  icon: "download"
  iconposition: "right"
{{% /multishortcode %}}

#### Override for Severity

{{% multishortcode name="button" format="%s" %}}
- content: "Get Hugo"
  href: "https://gohugo.io/"
  icon: "dragon"
  style: "warning"
{{% /multishortcode %}}

### Link Effects (Target, Download)

You can use [link effects](authoring/markdown#link-effects) with your `href` to open the link in a different tab or starting a download.

{{% multishortcode name="button" format="%s\n%s\n" %}}
- content: "Go Hugo"
  href: "https://gohugo.io/?target=_blank"
- content: "Download Magic"
  href: "images/magic.gif?download"
  style: "tip"
  icon: "hand-sparkles"
{{% /multishortcode %}}

### Other

#### Borderless

{{% multishortcode name="button" format="%s\n%s\n%s\n" %}}
- content: "Get Hugo"
  borderless: "true"
  href: "https://gohugo.io/"
  style: "primary"
- content: "Get Hugo"
  borderless: "true"
  href: "https://gohugo.io/"
  style: "default"
- content: "Get Hugo"
  borderless: "true"
  href: "https://gohugo.io/"
  style: "transparent"
{{% /multishortcode %}}

#### With User-Defined Color, Font Awesome Brand Icon and Markdown Title

{{% multishortcode name="button" format="%s" %}}
- content: "Get **Hugo**"
  href: "https://gohugo.io/"
  color: "fuchsia"
  icon: "fa-fw fab fa-hackerrank"
{{% /multishortcode %}}

#### Severity Style with All Defaults

{{% multishortcode name="button" format="%s" %}}
- content: ""
  href: "https://gohugo.io/"
  style: "tip"
{{% /multishortcode %}}  

#### Button to Internal Page

{{% multishortcode name="button" format="%s" %}}
- content: "Home"
  href: "/index.html"
{{% /multishortcode %}}

#### Button with JavaScript Action

If your JavaScript action does not change the focus afterwards, make sure to call `this.blur()` in the end to unselect the button.

{{% multishortcode name="button" format="%s" %}}
- content: "Shout it out"
  style: "primary"
  icon: "bullhorn"
  href: "javascript:alert('Hello world!');this.blur();"
{{% /multishortcode %}}

#### Button within a `form` Element

To use native HTML elements in your Markdown, add this in your `hugo.toml`

````toml
[markup.goldmark.renderer]
  unsafe = true
````

````html
<form action="../../search.html" method="get">
  <input name="search-by-detail" class="search-by" type="search">
  {{%/* button type="submit" style="secondary" icon="search" %}}Search{{% /button */%}}
</form>
````

<form action="../../search.html" method="get">
  <div class="searchform" style="width: 20vw;">
    <input name="search-by-detail" class="search-by" type="search" placeholder="Search...">
    {{% button type="submit" style="secondary" icon="search" %}}Search{{% /button %}}
  </div>
</form>
