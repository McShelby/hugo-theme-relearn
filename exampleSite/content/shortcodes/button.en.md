+++
description = "Clickable buttons"
title = "Button"
+++

The `button` shortcode displays a clickable button with adjustable color, title and icon.

{{% button href="https://gohugo.io/" icon="download" icon-position="right" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="default" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" icon="dragon" style="warning" %}}Get Hugo{{% /button %}}

## Usage

Once the button is clicked, it opens another browser tab for the given URL.

````go
{{%/* button href="https://gohugo.io/" icon="download" %}}Get Hugo{{% /button */%}}
````

### Parameter

| Name                  | Optional  | Default         | Notes       |
|:----------------------|:----------|:----------------|:------------|
| **href**              | yes       | _&lt;empty&gt;_ | The destination URL for the button. If this parameter is not set, the button will do nothing but is still displayed as clickable. |
| **style**             | yes       | `transparent`   | The color scheme used to paint the button.<br/><br/>- by severity: `info`, `note`, `tip`, `warning`<br/>- by brand color: `primary`, `secondary`<br/>- by color: `blue`, `green`, `grey`, `orange`, `red`<br/>- by special color: `default`, `transparent` |
| **icon**              | yes       | see notes       | [Font Awesome icon name]({{%relref "cont/icons#finding-an-icon" %}}) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br/><br/>- for severity styles: a nice matching icon for the severity<br/>- for all other colors: _&lt;empty&gt;_<br/><br/>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **iconposition**      | yes       | `left`          | Places the icon to the `left` or `right` of the title. |
| _**&lt;content&gt;**_ | yes       | see notes       | Arbitray text for the button title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br/><br/>- for severity styles: the matching title for the severity<br/>- for all other colors: _&lt;empty&gt;_<br/><br/>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |

## Examples

### Style

#### by Severity

{{% button href="https://gohugo.io/" style="info" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="note" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="tip" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="warning" %}}Get Hugo{{% /button %}}

#### by Brand Colors

{{% button href="https://gohugo.io/" style="primary" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="secondary" %}}Get Hugo{{% /button %}}

#### by Color

{{% button href="https://gohugo.io/" style="blue" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="green" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="grey" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="orange" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="red" %}}Get Hugo{{% /button %}}

#### by Special Color

{{% button href="https://gohugo.io/" style="default" %}}Get Hugo{{% /button %}}
{{% button href="https://gohugo.io/" style="transparent" %}}Get Hugo{{% /button %}}

### Icon

#### to the left

{{% button href="https://gohugo.io/" icon="download" %}}Get Hugo{{% /button %}}

#### to the right

{{% button href="https://gohugo.io/" icon="download" icon-position="right" %}}Get Hugo{{% /button %}}

#### Override for Severity

{{% button href="https://gohugo.io/" icon="dragon" style="warning" %}}Get Hugo{{% /button %}}

### Other

#### Severity Style with all Defaults

{{% button href="https://gohugo.io/" style="tip" %}}{{% /button %}}
