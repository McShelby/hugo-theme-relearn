+++
categories = ['howto', 'reference']
description = 'Marker badges to display in your text'
title = 'Badge'
+++

The `badge` shortcode displays colorful markers in your text with optional icons.

{{% multishortcode name="badge" print="false" format="%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Important"
- content: "6.6.6"
  style: "primary"
  title: "Version"
- content: "Captain"
  style: "red"
  icon: "angle-double-up"
- content: "New"
  style: "info"
- content: "Awesome"
  color: "fuchsia"
  icon: "fa-fw fab fa-hackerrank"
{{% /multishortcode %}}

## Usage

{{% multishortcode name="badge" execute="false" format="%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Important"
- content: "6.6.6"
  style: "primary"
  title: "Version"
- content: "Captain"
  style: "red"
  icon: "angle-double-up"
- content: "New"
  style: "info"
- content: "Awesome"
  color: "fuchsia"
  icon: "fa-fw fab fa-hackerrank"
{{% /multishortcode %}}

### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **style**             | `default`       | The style scheme used for the badge.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code`, `link`, `action`, `inline`<br><br>You can also [define your own styles](shortcodes/notice#defining-own-styles). |
| **color**             | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **title**             | see notes       | Arbitrary text for the badge title. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**              | see notes       | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_ | Arbitrary text for the badge. |

## Examples

### Style

#### By Severity

{{% multishortcode name="badge" format="%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Magenta"
  style: "caution"
- content: "Cyan"
  style: "important"
- content: "Blue"
  style: "info"
- content: "Orange"
  style: "note"
- content: "Green"
  style: "tip"
- content: "Red"
  style: "warning"
{{% /multishortcode %}}

#### By Brand Colors

{{% multishortcode name="badge" format="%s\n%s\n%s\n" %}}
- content: "Mandatory"
  style: "primary"
  icon: "bullhorn"
  title: "Announcement"
- content: "Optional"
  style: "secondary"
  icon: "bullhorn"
  title: "Announcement"
- content: "Special"
  style: "accent"
  icon: "bullhorn"
  title: "Announcement"
{{% /multishortcode %}}

#### By Color

{{% multishortcode name="badge" format="%s\n%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Blue"
  style: "blue"
  icon: "palette"
  title: "Color"
- content: "Cyan"
  style: "cyan"
  icon: "palette"
  title: "Color"
- content: "Green"
  style: "green"
  icon: "palette"
  title: "Color"
- content: "Grey"
  style: "grey"
  icon: "palette"
  title: "Color"
- content: "Magenta"
  style: "magenta"
  icon: "palette"
  title: "Color"
- content: "Orange"
  style: "orange"
  icon: "palette"
  title: "Color"
- content: "Red"
  style: "red"
  icon: "palette"
  title: "Color"
{{% /multishortcode %}}

#### By Special Color

{{% multishortcode name="badge" format="%s\n%s\n%s\n%s\n%s\n%s\n" %}}
- content: "Default"
  style: "default"
  icon: "palette"
  title: "Color"
- content: "Transparent"
  style: "transparent"
  icon: "palette"
  title: "Color"
- content: "Code"
  style: "code"
  icon: "palette"
  title: "Color"
- content: "Link"
  style: "link"
  icon: "palette"
  title: "Color"
- content: "Action"
  style: "action"
  icon: "palette"
  title: "Color"
- content: "Inline"
  style: "inline"
  icon: "palette"
  title: "Color"
{{% /multishortcode %}}

### Variants

#### Without Icon and Title Text

{{% multishortcode name="badge" format="%s\n%s\n%s\n" %}}
- content: "6.6.6"
- content: "Awesome"
  style: "info"
  icon: " "
  title: " "
- content: "Captain"
  style: "red"
{{% /multishortcode %}}

#### Without Icon

{{% multishortcode name="badge" format="%s\n%s\n%s\n" %}}
- content: "6.6.6"
  title: "Version"
- content: "Awesome"
  style: "info"
  icon: " "
- content: "Captain"
  style: "red"
  title: "Rank"
{{% /multishortcode %}}

#### Without Title Text

{{% multishortcode name="badge" format="%s\n%s\n%s\n" %}}
- content: "6.6.6"
  icon: "star"
- content: "Awesome"
  style: "info"
  title: " "
- content: "Captain"
  style: "red"
  icon: "angle-double-up"
{{% /multishortcode %}}

#### All Set

{{% multishortcode name="badge" format="%s\n%s\n%s\n" %}}
- content: "6.6.6"
  icon: "star"
  title: "Version"
- content: "Awesome"
  style: "info"
- content: "Captain"
  style: "red"
  icon: "angle-double-up"
  title: "Rank"
{{% /multishortcode %}}

#### Override for Severity

{{% multishortcode name="badge" format="%s\n" %}}
- content: "Awesome"
  style: "info"
  icon: "rocket"
  title: "Feature"
{{% /multishortcode %}}

### Other

#### With User-Defined Color, Font Awesome Brand Icon and Markdown Title and Content

{{% multishortcode name="badge" format="%s\n" %}}
- content: "**Awesome**"
  color: "fuchsia"
  icon: "fa-fw fab fa-hackerrank"
  title: "**Font**"
{{% /multishortcode %}}

#### With Icon Content

You can combine the badge with the [`icon` shortcode](shortcodes/icon) to create even more stunning visuals.

In this case you need to declare `{{</* badge */>}}` instead of `{{%/* badge */%}}`. Note, that in this case it is not possible to put markdown in the content.

{{% multishortcode name="badge" format="%s  \n%s  \n%s  \n%s  \n%s  \n%s  " %}}
- multishortcode:
    name: "icon"
    content:
      icon: "skull-crossbones"
  style: "primary"
  icon: "angle-double-up"
- multishortcode:
    name: "icon"
    format: "%s Pirate"
    content:
      icon: "skull-crossbones"
  style: "primary"
  icon: "angle-double-up"
- multishortcode:
    name: "icon"
    content:
      icon: "skull-crossbones"
  style: "primary"
  title: "Rank"
- multishortcode:
    name: "icon"
    format: "%s Pirate"
    content:
      icon: "skull-crossbones"
  style: "primary"
  title: "Rank"
- multishortcode:
    name: "icon"
    content:
      icon: "skull-crossbones"
  style: "primary"
  icon: "angle-double-up"
  title: "Rank"
- multishortcode:
    name: "icon"
    format: "%s Pirate"
    content:
      icon: "skull-crossbones"
  style: "primary"
  icon: "angle-double-up"
  title: "Rank"
{{% /multishortcode %}}

#### Inside of Text

{{% multishortcode name="badge" format="Lorem ipsum dolor sit amet, graecis denique ei vel, at duo primis mandamus. %s Et legere ocurreret pri, animal tacimates complectitur ad cum. Cu eum inermis inimicus efficiendi. Labore officiis his ex, soluta officiis concludaturque ei qui, vide sensibus vim ad." %}}
- content: "Awesome"
  style: "blue"
  icon: "rocket"
{{% /multishortcode %}}
