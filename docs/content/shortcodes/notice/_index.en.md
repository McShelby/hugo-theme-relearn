+++
categories = ['howto', 'reference']
description = 'Boxes to help you structure your page'
title = 'Notice'

[params]
  hidden = true
+++

> [!warning]
> This shortcode is deprecated in favor of the new [`callout` shortcode](shortcodes/callout). See [migration instructions](#migration) below.
>
> The examples on this page were removed.

The `notice` shortcode shows boxes with configurable color, title and icon.

## Migration

While this shortcode will still be available for some time, it does not receive support anymore. Start to migrate early, as it will be removed with the next major update of the theme.

Each use of the `notice` shortcode issues a warning during the build.

The [`callout` shortcode](shortcodes/callout) is the same shortcode under a new name. It takes the same parameters at the same positions.

To migrate your pages, rename the calls from `notice` to `callout`. If you call the shortcode from your own partials, rename `shortcodes/notice.html` to `shortcodes/callout.html`.

The box written by the `callout` shortcode carries the CSS class `callout` instead of `notices`. If you styled the box in your own CSS, adapt your selectors.

## Usage

{{% multishortcode name="notice" execute="false" %}}
style: "primary"
title: "There may be pirates"
icon: "skull-crossbones"
content: |

  It is all about the boxes.
{{% /multishortcode %}}

### Parameters

The parameters are the same as for the [`callout` shortcode](shortcodes/callout#parameters).
