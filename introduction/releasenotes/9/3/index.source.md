+++
title = 'Version 9.3'
type = 'releasenotes'
weight = -3

[params]
  disableToc = false
  hidden = true
  minHugoVersion = '0.166.0'
+++

## 9.3.0 (XXXX-XX-XX) {#9-3-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} The borders of tables and the border of a zoomable Mermaid diagram, as well as the backgrounds of table headers and every second table row, now take their color from the [theme variant](configuration/branding/colors#modifying-variants) variable `BOX-NEUTRAL-color`, which inherits from `BOX-GREY-color`. Formerly they were a fixed gray that could not be changed by a variant and was too faint in the high contrast variants. The same goes for the border of tabs with `style=transparent`.

  The border of code blocks, `CODE-BLOCK-BORDER-color`, now inherits from `BOX-NEUTRAL-color` instead of `CODE-BLOCK-BG-color`. The shipped variants were adjusted to this.

  If your own variant does not set `CODE-BLOCK-BORDER-color`, its code blocks now get a visible border in the neutral color. As code boxes take their color from it, the title and frame of callouts and tabs with `style=code` change as well. To restore the previous look, set `CODE-BLOCK-BORDER-color` in your variant to the value of `CODE-BLOCK-BG-color`, or set `BOX-CODE-color` to only change code boxes.

  If your variant sets `BOX-NEUTRAL-color` or `BOX-GREY-color` to a strong color, your tables, Mermaid diagrams and transparent tabs now show it as well.

- {{% badge style="change" %}}Change{{% /badge %}} The color variant `relearn-bright` is deprecated and will be removed with the next major release. You'll get a warning if you use it.

  To keep it, copy `assets/css/theme-relearn-bright.css` from the theme into your site's `assets/css` directory under a different name, like `theme-my-bright.css`, and use that name in the [`themeVariant` option](configuration/branding/colors#changing-the-variant).

- {{% badge style="change" %}}Change{{% /badge %}} The [logo of a variant](configuration/branding/logo#variant-specific-logos) is now set in the new [`params` of the variant](configuration/branding/colors#variant-parameters), which holds the values that override the site's `params` while the variant is active. Setting `logo` directly on the variant is deprecated and you'll get a warning; it still works for now.

  Change `{ identifier = 'neon', logo = { src = '/images/logo-neon.svg' } }` to `{ identifier = 'neon', params = { logo = { src = '/images/logo-neon.svg' } } }`.

- {{% badge style="change" %}}Change{{% /badge %}} Level one headings, the section titles of the sidebar menu and the title of the [`openapi` shortcode](shortcodes/openapi) are no longer forced to uppercase but show as written. The uppercase look, inherited from the Learn theme, became iconic for this theme, but it is strongly opinionated and looks strange with many fonts, especially script and serif fonts.

  If you want to keep the iconic look for headings and the sidebar menu, add the following to your [`assets/css/custom.css`](configuration/customization/extending#simple-solution):

  ````css {title="assets/css/custom.css"}
  h1,
  #R-sidebar .nav-title {
    text-transform: uppercase;
  }
  ````

- {{% badge style="change" %}}Change{{% /badge %}} Printing a page and its print version now use a [print variant](configuration/branding/colors#theme-variant-print) for colors and fonts, by default the new `relearn-print`. Formerly they used a fixed look that no variant could change.

  You can choose the print variant of your site with the new `themeVariantPrint` option, or one for each variant with its new `print` parameter.

  The variables `PRINT-MERMAID-theme`, `PRINT-OPENAPI-theme` and `PRINT-OPENAPI-CODE-theme` were removed. If you've set them, set `MERMAID-theme`, `OPENAPI-theme` and `OPENAPI-CODE-theme` in your print variant instead.

### New

- {{% badge style="new" %}}New{{% /badge %}} The entries of the variant switcher can now be grouped by putting [dividers](configuration/branding/colors#dividers) into the `themeVariant` option. A divider with a name labels its group.
