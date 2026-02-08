+++
categories = ['howto', 'reference']
description = 'Boxes to help you structure your page'
options = ['boxStyle']
title = 'Notice'
+++

The `notice` shortcode shows boxes with configurable color, title and icon.

{{% multishortcode name="notice" print="false" %}}
style: "primary"
title: "There may be pirates"
icon: "skull-crossbones"
content: |

  It is all about the boxes.
{{% /multishortcode %}}

## Usage

{{% multishortcode name="notice" execute="false" %}}
style: "primary"
title: "There may be pirates"
icon: "skull-crossbones"
content: |

  It is all about the boxes.
{{% /multishortcode %}}

If you want to display a transparent expandable box without any border, you can also use the [`expand` shortcode](/shortcodes/expand).

### Parameters

| Name                  | Position | Default         | Notes       |
|-----------------------|----------|-----------------|-------------|
| **groupid**           |          | _&lt;empty&gt;_ | Arbitrary name of the group the box belongs to.<br><br>Expandable boxes with the same **groupid** synchronize their open state. |
| **style**             | 1        | `default`       | The style scheme used for the box.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code`, `link`, `action`, `inline`<br><br>You can also [define your own styles](#defining-own-styles). |
| **color**             |          | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **title**             | 2        | see notes       | Arbitrary text for the box title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**              | 3        | see notes       | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **expanded**          |          | _&lt;empty&gt;_ | Whether to draw an expander and how the content is displayed.<br><br>- _&lt;empty&gt;_: no expander is drawn and the content is permanently shown<br>- `true`: the expander is drawn and the content is initially shown<br>- `false`: the expander is drawn and the content is initially hidden |
| _**&lt;content&gt;**_ |          | _&lt;empty&gt;_ | Arbitrary text to be displayed in box. |

## Settings

### Defining own Styles

{{% badge style="option" %}}Option{{% /badge %}} Besides the predefined `style` values [from above](#parameters), you are able to define your own.

{{< multiconfig file=hugo section=params >}}
boxStyle = [
	{ identifier = 'magic', i18n = '', title = 'Magic', icon = 'hand-sparkles', color = 'violet' },
	{ identifier = 'new', title = ' ', style = 'info', icon = 'plus-circle' }
]
{{< /multiconfig >}}

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **identifier**        | _&lt;empty&gt;_ | This must match the `style` parameter used in a shortcode. |
| **style**             | _&lt;empty&gt;_ | If you define this optional parameter, this is where default values for **title**, **icon** and **color** are taken from if **style** exists beforehand. You can reference predefined styles as also your own styles. |
| **title**             | _&lt;empty&gt;_ | The default title used. If you have set **style** and don't want any title at all, you have to set this parameter to " ". See the parameter **i18n** if you use multiple languages in your site. |
| **i18n**              | _&lt;empty&gt;_ | If no **title** is given but **i18n** is set, the title will be taken from the translation files by that key. |
| **icon**              | _&lt;empty&gt;_ | The default icon used. If you have set **style** and don't want any icon at all, you have to set this parameter to " ". |
| **color**             | _&lt;empty&gt;_ | The default color used. If you have set **style** and don't want any color at all, you have to set this parameter to " ". |

Below is a [usage example](#user-defined-style).

## Examples

### By Severity Using Markdown Callout Syntax

{{% multishortcode name="notice" %}}
- style: "caution"
  content: |
    Advises about risks or negative outcomes of certain actions.

- style: "important"
  content: |
    Key information users need to know to achieve their goal.

- style: "info"
  content: |
    Information that users <ins>_might_</ins> find interesting.

- style: "note"
  content: |
    Useful information that users should know, even when skimming content.

- style: "tip"
  content: |
    Helpful advice for doing things better or more easily.

- style: "warning"
  content: |
    Urgent info that needs immediate user attention to avoid problems.
{{% /multishortcode %}}

### By Brand Colors with Title and Icon Variantion

{{% multishortcode name="notice" %}}
- style: "primary"
  title: "Primary"
  content: |
    A **primary** disclaimer

- style: "secondary"
  title: "Secondary"
  content: |
    A **secondary** disclaimer

- style: "accent"
  icon: "stopwatch"
  content: |
    An **accent** disclaimer
{{% /multishortcode %}}

### By Color

{{% multishortcode name="notice" %}}
- style: "blue"
  title: "Blue"
  content: |
    A **blue** disclaimer

- style: "cyan"
  title: "Cyan"
  content: |
    A **cyan** disclaimer

- style: "green"
  title: "Green"
  content: |
    A **green** disclaimer

- style: "grey"
  icon: "bug"
  content: |
    A **grey** disclaimer

- style: "magenta"
  title: "Magenta"
  content: |
    A **magenta** disclaimer

- style: "orange"
  title: "Orange"
  icon: "bug"
  content: |
    A **orange** disclaimer

- style: "red"
  title: "Red"
  content: |
    A **red** disclaimer
{{% /multishortcode %}}

### By Special Color

{{% multishortcode name="notice" %}}
- style: "default"
  title: "Default"
  icon: "skull-crossbones"
  content: |
    Just some default color.

- style: "transparent"
  title: "Transparent"
  icon: "skull-crossbones"
  content: |
    No visible borders.

- style: "code"
  title: "Code"
  icon: "skull-crossbones"
  content: |
    Colored like a code fence.

- style: "link"
  title: "Link"
  icon: "skull-crossbones"
  content: |
    Style of topbar buttons

- style: "action"
  title: "Action"
  icon: "skull-crossbones"
  content: |
    Style of action buttons like Mermaid zoom or block code copy-to-clipboard

- style: "inline"
  title: "Inline"
  icon: "skull-crossbones"
  content: |
    Style of inline buttons like inline code copy-to-clipboard
{{% /multishortcode %}}

### Various Features

#### With User-Defined Color, Font Awesome Brand Icon and Markdown in Title and Content

{{% multishortcode name="notice" %}}
color: "fuchsia"
title: "**Hugo** is _awesome_"
icon: "fa-fw fab fa-hackerrank"
content: |
  {{%/* include "shortcodes/include/INCLUDE_ME.md" */%}}
{{% /multishortcode %}}

#### Expandable Content Area with `groupid`

If you give multiple expandable boxes the same `groupid`, at most one will be open at any given time. If you open one of the boxes, all other boxes of the same group will close.

{{% multishortcode name="notice" %}}
- style: "green"
  title: "Expand me..."
  groupid: "notice-toggle"
  expanded: "true"
  content: |

    No need to press you!

- style: "red"
  title: "Expand me..."
  groupid: "notice-toggle"
  expanded: "false"
  content: |

    Thank you!
{{% /multishortcode %}}

#### No Content or No Title

{{% multishortcode name="notice" %}}
- style: "accent"
  title: "Just a bar"

- style: "accent"
  content: |

    Just a box
{{% /multishortcode %}}

#### Various Markdown Callouts

{{% multishortcode name="notice" %}}
- style: "caution"
  title: "Callouts can have custom titles"
  content: |
    Like this one.

- style: "caution"
  title: "Title-only callout"

- style: "note"
  title: "Are callouts foldable?"
  expanded: "false"
  content: |
    Yes! In a foldable callout, the contents are hidden when the callout is collapsed

- style: "note"
  title: "Are callouts foldable?"
  expanded: "true"
  content: |
    Yes! In a foldable callout, the contents are hidden when the callout is collapsed

- style: "info"
  title: "Can callouts be nested?"
  content: |
    > [!important] Yes!, they can.
    > > [!tip] You can even use multiple layers of nesting.
{{% /multishortcode %}}

#### Code with Collapsed Colored Borders

{{% multishortcode name="notice" %}}
style: "secondary"
content: '```
  printf("Hello World!");
  ```'
{{% /multishortcode %}}

#### User-defined Style

Self-defined styles can be [configured](#defining-own-styles) in your `hugo.toml` and used for every shortcode, that accepts a `style` parameter.

{{< multiconfig file=hugo section=params >}}
boxStyle = [
	{ identifier = 'magic', i18n = '', title = 'Magic', icon = 'hand-sparkles', color = 'violet' },
]
{{< /multiconfig >}}

{{% multishortcode name="notice" %}}
style: "magic"
content: |
  It's a kind of...

  Maaagic!
{{% /multishortcode %}}
