+++
categories = ['howto']
description = 'Provide your own logo, favicon and menu title'
options = ['linkTitle', 'logo']
title = 'Logo & Title'
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

## Change the Menu Title

{{% badge style="option" %}}Option{{% /badge %}} The site `title` of your `hugo.toml` will be used for the text at the top of the sidebar. If you want to show a different text in the sidebar, you can overwrite it by setting `params.linkTitle`.

If the title is to long to fit on a single line it is automatically wrapped. If you want manual control over the line breaks, you can insert newline characters.

{{< multiconfig file=hugo section=params >}}
linkTitle = "Relearn\nis the greatest\ntheme since\nsliced bread"
{{< /multiconfig >}}

### Changing the Font Settings

You can change font settings with the following CSS variables

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --LOGO-font: 'Georgia', serif;
    --LOGO-font-size: 2rem;
}
</style>
````

On smaller screens the logo font size is automatically reduced to 80% of the configured value for better mobile display. This is not configurable.

### Changing the Colors

The logo inherits its colors from the menu header by default. You can customize the normal and hover states

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --LOGO-LINK-color: #ff6600;
    --LOGO-LINK-HOVER-color: #ff9933;
}
</style>
````

The `--LOGO-LINK-color` variable sets the color of the logo link text, while `--LOGO-LINK-HOVER-color` sets the color when hovering over the logo.

### Set Direction of Title & Logo

You can control the layout direction of the logo and title:

{{< multiconfig file=hugo section=params >}}
logo = { direction = 'column' }
{{< /multiconfig >}}

Valid values are:

- `row` (default) - Logo and title side by side
- `column` - Logo above title

## Change the Logo

{{% badge style="option" %}}Option{{% /badge %}} The theme displays a logo in the sidebar menu if found. By default, it automatically detects logos in your site's `assets/images/`.

### Auto-Detection

If you don't configure a logo explicitly, the theme automatically searches for a logo file in the global `/assets` directory and all its subdirectories named `*logo*`.

If no logo is found, only your site title will be shown.

The size of the logo will adapt automatically to an opinionated default. See below on [how to resize it](#customizing-size).

### Manual Configuration

You can explicitly configure a logo in your site's `params.toml`. This will override automatic detection:

{{< multiconfig file=hugo section=params >}}
logo = { src = '/images/magic.gif' }
{{< /multiconfig >}}

To disable the logo entirely, set `src` to a string containing only whitespace:

{{< multiconfig file=hugo section=params >}}
logo = { src = ' ' }  # No logo, only site title
{{< /multiconfig >}}

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

### Customizing Size

The theme provides CSS variables to customize the logo's size. You can add these to `layouts/partials/custom-header.html`. The logo image has a default width of `4em`. The height is determined by the aspect ratio of the logo.

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --LOGO-IMAGE-width: 6rem;
}
</style>
````

### Coloring SVG Logos

If you have a monochrome SVG logo and want to display it in the variants color for the logo text, it is mandatory to give it the `inlinecontent` [image effect](authoring/linking/imageeffects). This is not set in the automatic logo detection.

The recoloring applies to all black elements in your SVG:

{{< multiconfig file=hugo section=params >}}
logo = { src = '/images/logo.svg?inlinecontent' }
{{< /multiconfig >}}

#### Changing the SVG Logo Colors

A SVG logo inherits its color from the menu title by default. You can customize both the normal and hover states

````html {title="layouts/partials/custom-header.html"}
<style>
:root {
    --LOGO-IMAGE-color: #0066cc;
    --LOGO-IMAGE-HOVER-color: #0088ff;
}
</style>
````

## Custom Title & Logo Partial

For advanced customization beyond configuration options, you can override the logo partial entirely.

Create a new file `layouts/partials/logo.html` in your site's directory. Then write any HTML you want. You could use an `img` HTML tag and reference an image, or you could paste an SVG definition!

### Example

Suppose you've stored your logo as `static/images/logo.png` and want full control over the HTML:

````html {title="layouts/partials/logo.html"}
<a id="R-logo" href="{{ partial "permalink.gotmpl" (dict "to" .Site.Home) }}">
  <img src="{{"images/logo.png" | relURL}}" alt="brand logo">
</a>
````

> [!warning]
> When overriding the logo partial, you replace all built-in logo functionality including auto-detection and variant-specific logos. Use this only when the configuration options don't meet your needs.
