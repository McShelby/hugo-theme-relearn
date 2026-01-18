+++
categories = ['howto', 'reference']
description = 'Nice icons for your page'
title = 'Icon'
+++

The `icon` shortcode displays icons using the [Font Awesome](https://fontawesome.com) library.

{{% multishortcode name="icon" print="false" format="%s\n%s\n%s\n%s\n" %}}
- icon: "heart"
- icon: "skull-crossbones"
  style: "blue"
- style: "warning"
- icon: "angle-double-up"
  color: "blue"
{{% /multishortcode %}}

## Usage

{{% multishortcode name="icon" execute="false" format="%s\n%s\n%s\n%s\n" %}}
- icon: "heart"
- icon: "skull-crossbones"
  style: "blue"
- style: "warning"
- icon: "angle-double-up"
  color: "blue"
{{% /multishortcode %}}

### Parameters

| Name                  | Position | Default         | Notes       |
|-----------------------|----------|-----------------|-------------|
| **icon**              | 1        | _&lt;empty&gt;_ | [Font Awesome icon name](#finding-an-icon) to be displayed. It will be displayed in the text color of its according context. |
| **style**             | 2        | _&lt;empty&gt;_ | The style scheme used for the icon.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code`, `link`, `action`, `inline`<br><br>You can also [define your own styles](shortcodes/notice#defining-own-styles). |
| **color**             |          | _&lt;empty&gt;_ | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color<br><br> |

### Finding an icon

Browse through the available icons in the [Font Awesome Gallery](https://fontawesome.com/v7/search?ic=free-collection). Notice that the **free** filter is enabled, as only the free icons are available by default.

Once on the Font Awesome page for a specific icon, for example the page for the [heart](https://fontawesome.com/v7/icons/heart?s=solid), copy the icon name and paste into the Markdown content.

### Customizing Icons

Font Awesome provides many ways to modify the icon

- Change color (by default the icon will inherit the parent color)
- Increase or decrease size
- Rotate
- Combine with other icons

Check the full documentation on [web fonts with CSS](https://docs.fontawesome.com/web/style/styling) for more.

## Examples

### Standard Usage

{{% multishortcode name="icon" format="Built with %s by Relearn and Hugo" %}}
icon: "heart"
{{% /multishortcode %}}

### With Color

{{% multishortcode name="icon" format="Built with %s by Relearn and Hugo" %}}
- icon: "heart"
  style: "red"
{{% /multishortcode %}}

### Advanced HTML Usage

While the shortcode simplifies using standard icons, the icon customization and other advanced features of the Font Awesome library require you to use HTML directly. Paste the `<i>` HTML into markup, and Font Awesome will load the relevant icon.

````html
Built with <i class="fas fa-heart"></i> by Relearn and Hugo
````

Built with <i class="fas fa-heart"></i> by Relearn and Hugo

To use these native HTML elements in your Markdown, add this in your `hugo.toml`:

````toml
[markup.goldmark.renderer]
  unsafe = true
````

### Style

#### By Severity

{{% multishortcode name="icon" format="%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- style: "caution"
- style: "important"
- style: "info"
- style: "note"
- style: "tip"
- style: "warning"
{{% /multishortcode %}}

#### By Brand Colors

{{% multishortcode name="icon" format="%s\n%s\n%s\n" %}}
- icon: "bullhorn"
  style: "primary"
- icon: "bullhorn"
  style: "secondary"
- icon: "bullhorn"
  style: "accent"
{{% /multishortcode %}}

#### By Color

{{% multishortcode name="icon" format="%s\n%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- icon: "palette"
  style: "blue"
- icon: "palette"
  style: "cyan"
- icon: "palette"
  style: "green"
- icon: "palette"
  style: "grey"
- icon: "palette"
  style: "magenta"
- icon: "palette"
  style: "orange"
- icon: "palette"
  style: "red"
{{% /multishortcode %}}

#### By Special Color

{{% multishortcode name="icon" format="%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- icon: "palette"
  style: "default"
- icon: "palette"
  style: "transparent"
- icon: "palette"
  style: "code"
- icon: "palette"
  style: "link"
- icon: "palette"
  style: "action"
- icon: "palette"
  style: "inline"
{{% /multishortcode %}}
