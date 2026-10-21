# Version 9.3

## 9.3.0 (2026-10-21) {#9-3-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} Level one headings, the section titles of the sidebar menu and the title of the [`openapi` shortcode](shortcodes/openapi) are no longer forced to uppercase but show as written. The uppercase look, inherited from the Learn theme, became iconic for this theme, but it is strongly opinionated and looks strange with many fonts, especially script and serif fonts.

  If you want to keep the iconic look for headings and the sidebar menu, add the following to your [`assets/css/custom.css`](configuration/customization/extending#simple-solution):

  ````css {title="assets/css/custom.css"}
  h1,
  #R-sidebar .nav-title {
    text-transform: uppercase;
  }
  ````

- {{% badge style="change" %}}Change{{% /badge %}} The greys of the theme now carry the tint of your [theme variant](configuration/branding/colors#modifying-variants).

  The borders and stripes of tables, the borders of a zoomable Mermaid diagram and of tabs with `style=transparent`, the shadows of cards and images, the hover of buttons, the titles of badges and the tracks of scrollbars now take their color from the variables `BOX-NEUTRAL-color` and `BOX-GREY-color`. `BOX-NEUTRAL-color` inherits from `BOX-GREY-color`. Formerly they were a fixed grey that could not be changed by a variant and was too faint in the high contrast variants.

  The border of code blocks, `CODE-BLOCK-BORDER-color`, now inherits from `BOX-NEUTRAL-color` instead of `CODE-BLOCK-BG-color`. The shipped variants were adjusted to this.

  If your own variant does not set `CODE-BLOCK-BORDER-color`, its code blocks now get a visible border in the neutral color. As code boxes take their color from it, the title and frame of callouts and tabs with `style=code` change as well. To restore the previous look, set `CODE-BLOCK-BORDER-color` in your variant to the value of `CODE-BLOCK-BG-color`, or set `BOX-CODE-color` to only change code boxes.

  If your variant sets `BOX-NEUTRAL-color` or `BOX-GREY-color` to a strong color, all these greys now show it as well.

- {{% badge style="change" %}}Change{{% /badge %}} The [logo of a variant](configuration/branding/logo#variant-specific-logos) is now set in the new [`params` of the variant](configuration/branding/colors#variant-parameters), which holds the values that override the site's `params` while the variant is active. Setting `logo` directly on the variant is deprecated and you'll get a warning; it still works for now.

  Change `{ identifier = 'neon', logo = { src = '/images/logo-neon.svg' } }` to `{ identifier = 'neon', params = { logo = { src = '/images/logo-neon.svg' } } }`.

- {{% badge style="change" %}}Change{{% /badge %}} Printing a page and its print version now use a [print variant](configuration/branding/colors#theme-variant-print), by default `relearn-light`, with the theme's print variables made for paper on top of it. Formerly the print used a fixed look that no variant could change.

  Printed pages now also show the logo and title of your site.

  You can choose the print variant of your site with the new `themeVariantPrint` option, or one for each variant with its new `print` parameter. A variant that names itself as its print variant keeps its own fonts on paper.

  The variables `PRINT-MERMAID-theme`, `PRINT-OPENAPI-theme` and `PRINT-OPENAPI-CODE-theme` were removed. If you've set them, set `MERMAID-theme`, `OPENAPI-theme` and `OPENAPI-CODE-theme` in your copy of the [print variables](configuration/branding/colors#theme-variant-print) instead, or mark them `!important` in your print variant.

- {{% badge style="change" %}}Change{{% /badge %}} The color variant `relearn-bright` is deprecated and will be removed with the next major release. You'll get a warning if you use it.

  To keep it, copy `assets/css/theme-relearn-bright.css` from the theme into your site's `assets/css` directory under a different name, like `theme-my-bright.css`, and use that name in the [`themeVariant` option](configuration/branding/colors#changing-the-variant).

- {{% badge style="change" %}}Change{{% /badge %}} The color variant `relearn` has only been kept for compatibility since 3.0.0, where `relearn-light` replaced it. It will be removed with the next major release and you'll now get a warning if you use it.

  It is identical to `relearn-light`, use that name in the [`themeVariant` option](configuration/branding/colors#changing-the-variant) instead.

### New

- {{% badge style="new" %}}New{{% /badge %}} The new [color variants](configuration/branding/colors#shipped-variants) [`tome-light`](configuration/branding/colors?variant=tome-light#shipped-variants) and [`tome-dark`](configuration/branding/colors?variant=tome-dark#shipped-variants) give your site the look of a book, with calligraphic titles. They are the first shipped variants with tinted instead of grey content backgrounds, and show how colors the theme derives, like shadows, follow such a tint. Use them as a starting point for your own tinted variant.

  Many of the changes in this release were made to support this variant.

- {{% badge style="new" %}}New{{% /badge %}} The new color `yellow` can be used as `style` in [every shortcode taking one](shortcodes/callout#parameters) and set with `BOX-YELLOW-color` in your [theme variant](configuration/branding/colors#modifying-variants). Each shipped variant picks a yellow that is readable with its title and text colors.

  To keep it apart from yellow, `orange` - and with it the `note` severity - is now a true orange instead of an amber, and darker so its titles are readable as well.

- {{% badge style="new" %}}New{{% /badge %}} The entries of the variant switcher can now be grouped by putting [dividers](configuration/branding/colors#dividers) into the `themeVariant` option. A divider with a name labels its group.
