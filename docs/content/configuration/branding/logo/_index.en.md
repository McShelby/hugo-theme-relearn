+++
categories = ['howto']
description = 'Provide your own logo and favicon'
options = ['logo']
title = 'Logo'
weight = 1
+++

## Change the Favicon

If your favicon is an SVG, PNG, or ICO, just drop your image in your site's `assets/images/` or `static/images/` directory and name it `favicon.svg`, `favicon.png`, or `favicon.ico` respectively.

If you want to adjust your favicon according to your OS settings for light/dark mode, add the image files `assets/images/favicon-light.svg` and `assets/images/favicon-dark.svg` to your site's directory, respectively, corresponding to your file format. In case some of the files are missing, the theme falls back to `favicon.svg` for each missing file. All supplied favicons must be of the same file format.

If no favicon file is found, the theme will look up the alternative filename `logo` in the same location and will repeat the search for the list of supported file types.

If you need to change this default behavior, create a new file `layouts/partials/favicon.html` in your site's directory and write something like this:

````html {title="layouts/partials/favicon.html"}
<link rel="icon" href="/images/favicon.bmp" type="image/bmp">
````

## Change the Logo

{{% badge style="option" %}}Option{{% /badge %}} The theme displays a logo in the sidebar menu. By default, it automatically detects logos in your site's `assets/images/`.

### Auto-Detection

If you don't configure a logo explicitly, the theme automatically searches for a logo file in the global `/assets` directory and all its subdirectories named `*logo*`.

If no logo is found, only [your site title](configuration/sidebar/headerfooter#title) will be shown.

The size of the logo will adapt automatically to an opinionated default.

### Manual Configuration

You can explicitly configure a logo in your site's `params.toml`. This will override automatic detection:

{{< multiconfig file=hugo section=params >}}
logo = { src = '/images/magic.gif' }
{{< /multiconfig >}}

To disable the logo entirely, set `src` to a string containing only whitespace:

{{< multiconfig file=hugo section=params >}}
logo = { src = ' ' }  # No logo, only site title
{{< /multiconfig >}}

#### Logo Direction

You can control the layout direction of the logo and title:

{{< multiconfig file=hugo section=params >}}
logo = { direction = 'column' }
{{< /multiconfig >}}

Valid values are:

- `row` (default) - Logo and title side by side
- `column` - Logo above title

### Variant-Specific Logos

The theme supports displaying different logos for different color variants. This allows you to have logos that match each theme variant's color scheme (e.g., light logo for dark themes, dark logo for light themes).

Variant-specific logos take precedence over the global `logo.src` setting. If a variant doesn't specify a logo, the global logo setting will be used.

To configure variant-specific logos, use the `logo` field within your `themeVariant` configuration:

{{< multiconfig file=hugo section=params >}}
themeVariant = [
  { identifier = 'relearn-light', logo = { src = '/images/logo-dark.svg' } },
  { identifier = 'relearn-dark',  logo = { src = '/images/logo-light.svg' } },
  { identifier = 'neon',          logo = { src = '/images/logo-neon.svg' } }
]
{{< /multiconfig >}}

The theme automatically switches between logos when the user selects a different variant. Logos with the same `src` are grouped together for performance optimization, reducing the number of images loaded.

To disable the logo for a specific variant while keeping the default logo for others, set the variant's `src` to a whitespace string:

{{< multiconfig file=hugo section=params >}}
themeVariant = [
  { identifier = 'relearn-light', logo = { src = ' ' } },  # No logo for this variant
  { identifier = 'relearn-dark' }                          # Uses default logo
]
{{< /multiconfig >}}

### Coloring SVG logos

If you have a monochrome SVG logo and want to display it in the variants color for the logo text, it is mandatory to give it the `inlinecontent` [image effect](authoring/linking/imageeffects). This is not set in the automatic logo detection. The recoloring applies to all black elements in your SVG:

{{< multiconfig file=hugo section=params >}}
logo = { src = '/images/logo.svg?inlinecontent' }
{{< /multiconfig >}}

### Custom Logo Partial

For advanced customization beyond configuration options, you can override the logo partial entirely.

Create a new file `layouts/partials/logo.html` in your site's directory. Then write any HTML you want. You could use an `img` HTML tag and reference an image, or you could paste an SVG definition!

#### Example

Suppose you've stored your logo as `static/images/logo.png` and want full control over the HTML:

````html {title="layouts/partials/logo.html"}
<a id="R-logo" href="{{ partial "permalink.gotmpl" (dict "to" .Site.Home) }}">
  <img src="{{"images/logo.png" | relURL}}" alt="brand logo">
</a>
````

> [!warning]
> When overriding the logo partial, you replace all built-in logo functionality including auto-detection and variant-specific logos. Use this only when the configuration options don't meet your needs.
