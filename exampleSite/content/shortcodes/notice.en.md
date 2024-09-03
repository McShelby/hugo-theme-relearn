+++
description = "Disclaimers to help you structure your page"
title = "Notice"
+++

The `notice` shortcode shows various types of disclaimers with adjustable color, title and icon to help you structure your page.

{{% notice style="primary" title="There may be pirates" icon="skull-crossbones" %}}
It is all about the boxes.
{{% /notice %}}

## Usage

While the examples are using shortcodes with named parameter you are free to use positional as well, use it as [GitHub](/cont/markdown#github-styled-alerts) or [Obsidian](/cont/markdown#obsidian-styled-alerts) styled alerts and also call this shortcode from your own partials.

{{< tabs groupid="shortcode-parameter">}}
{{% tab title="markdown" %}}

````md
> [!NOTE]
> It is all about the boxes.
````

{{% /tab %}}
{{% tab title="shortcode" %}}

````go
{{%/* notice style="primary" title="There may be pirates" icon="skull-crossbones" */%}}
It is all about the boxes.
{{%/* /notice */%}}
````

{{% /tab %}}
{{% tab title="shortcode (positional)" %}}

````go
{{%/* notice primary "There may be pirates" "skull-crossbones" */%}}
It is all about the boxes.
{{%/* /notice */%}}
````

{{% /tab %}}
{{% tab title="partial" %}}

````go
{{ partial "shortcodes/notice.html" (dict
  "page"  .
  "style" "primary"
  "title" "There may be pirates"
  "icon" "skull-crossbones"
  "content" "It is all about the boxes."
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                  | Position | Default         | Notes       |
|-----------------------|----------|-----------------|-------------|
| **style**             | 1        | `default`       | The style scheme used for the box.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code` |
| **color**             |          | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **title**             | 2        | see notes       | Arbitrary text for the box title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**              | 3        | see notes       | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **expanded**          |          | _&lt;empty&gt;_ | Whether to draw an expander and how the content is displayed.<br><br>- _&lt;empty&gt;_: the content is shown but not collapsible<br>- `true`: the expander is drawn and the content is initially shown<br>- `false`: the expander is drawn and the content is initially hidden |
| _**&lt;content&gt;**_ |          | _&lt;empty&gt;_ | Arbitrary text to be displayed in box. |

## Examples

### By Severity Using Markdown Syntax

````md
> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!INFO]
> Information that users <ins>_might_</ins> find interesting.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.
````

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!INFO]
> Information that users <ins>_might_</ins> find interesting.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

### By Brand Colors with Title and Icon Variantion

````go
{{%/* notice style="primary" title="Primary" */%}}
A **primary** disclaimer
{{%/* /notice */%}}

{{%/* notice style="secondary" title="Secondary" */%}}
A **secondary** disclaimer
{{%/* /notice */%}}

{{%/* notice style="accent" icon="stopwatch" */%}}
An **accent** disclaimer
{{%/* /notice */%}}
````

{{% notice style="primary" title="Primary" %}}
A **primary** disclaimer
{{% /notice %}}

{{% notice style="secondary" title="Secondary" %}}
A **secondary** disclaimer
{{% /notice %}}

{{% notice style="accent" icon="stopwatch" %}}
An **accent** disclaimer
{{% /notice %}}

### By Color

````go
{{%/* notice style="blue" title="Blue"*/%}}
A **blue** disclaimer
{{%/* /notice */%}}

{{%/* notice style="cyan" title="Cyan" */%}}
A **cyan** disclaimer
{{%/* /notice */%}}

{{%/* notice style="green" title="Green" */%}}
A **green** disclaimer
{{%/* /notice */%}}

{{%/* notice style="grey" icon="bug" */%}}
A **grey** disclaimer
{{%/* /notice */%}}

{{%/* notice style="magenta" title="Magenta" */%}}
A **magenta** disclaimer
{{%/* /notice */%}}

{{%/* notice style="orange" title="Orange" icon="bug" */%}}
A **orange** disclaimer
{{%/* /notice */%}}

{{%/* notice style="red" title="Red" */%}}
A **red** disclaimer
{{%/* /notice */%}}
````

{{% notice style="blue" title="Blue" %}}
A **blue** disclaimer
{{% /notice %}}

{{% notice style="cyan" title="Cyan" %}}
A **cyan** disclaimer
{{% /notice %}}

{{% notice style="green" title="Green" %}}
A **green** disclaimer
{{% /notice %}}

{{% notice style="grey" icon="bug" %}}
A **grey** disclaimer
{{% /notice %}}

{{% notice style="magenta" title="Magenta" %}}
A **magenta** disclaimer
{{% /notice %}}

{{% notice style="orange" title="Orange" icon="bug" %}}
A **orange** disclaimer
{{% /notice %}}

{{% notice style="red" title="Red" %}}
A **red** disclaimer
{{% /notice %}}

### By Special Color

````go
{{%/* notice style="default" title="Default" icon="skull-crossbones" */%}}
Just some grey default color.
{{%/* /notice */%}}

{{%/* notice style="code" title="Code" icon="skull-crossbones" */%}}
Colored like a code fence.
{{%/* /notice */%}}

{{%/* notice style="transparent" title="Transparent" icon="skull-crossbones" */%}}
No visible borders.
{{%/* /notice */%}}
````

{{% notice style="default" title="Default" icon="skull-crossbones" %}}
Just some grey default color.
{{% /notice %}}

{{% notice style="code" title="Code" icon="skull-crossbones" %}}
Colored like a code fence.
{{% /notice %}}

{{% notice style="transparent" title="Transparent" icon="skull-crossbones" %}}
No visible borders.
{{% /notice %}}

### Various Features

#### With User-Defined Color, Font Awesome Brand Icon and Markdown in Title and Content

````go
{{%/* notice color="fuchsia" title="**Hugo** is _awesome_" icon="fa-fw fab fa-hackerrank" */%}}
{{% include "shortcodes/include/INCLUDE_ME.md" %}}
{{%/* /notice */%}}
````

{{% notice color="fuchsia" title="**Hugo** is _awesome_" icon="fa-fw fab fa-hackerrank" %}}
{{% include "shortcodes/include/INCLUDE_ME.md" %}}
{{% /notice %}}

#### Expandable Content Area

````go
{{%/* notice style="green" title="Expand me..." expanded="true" */%}}
No need to press you!
{{%/* /notice */%}}

{{%/* notice style="red" title="Expand me..." expanded="false" */%}}
Thank you!
{{%/* /notice */%}}
````

{{% notice style="green" title="Expand me..." expanded="true" %}}
No need to press you!
{{% /notice %}}

{{% notice style="red" title="Expand me..." expanded="false" %}}
Thank you!
{{% /notice %}}

#### No Content or No Title

````go
{{%/* notice style="accent" title="Just a bar" */%}}
{{%/* /notice */%}}

{{%/* notice style="accent" */%}}
Just a box
{{%/* /notice */%}}
````

{{% notice style="accent" title="Just a bar" %}}
{{% /notice %}}

{{% notice style="accent" %}}
Just a box
{{% /notice %}}

#### Obsidian Styled Alerts

````go
> [!tip] Callouts can have custom titles
> Like this one.

> [!tip] Title-only callout

> [!note]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed

> [!note]+ Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed

> [!important] Can callouts be nested?
> > [!note] Yes!, they can.
> > > [!important]  You can even use multiple layers of nesting.
````

> [!tip] Callouts can have custom titles
> Like this one.

> [!tip] Title-only callout

> [!note]- Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed

> [!note]+ Are callouts foldable?
> Yes! In a foldable callout, the contents are hidden when the callout is collapsed

> [!important] Can callouts be nested?
> > [!note] Yes!, they can.
> > > [!important]  You can even use multiple layers of nesting.
