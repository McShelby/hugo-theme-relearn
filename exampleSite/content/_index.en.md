+++
archetype = "home"
title = "Hugo Relearn Theme"
+++

A theme for [Hugo](https://gohugo.io/) designed for documentation.

[★ What's new in the latest release ★]({{% relref "basics/migration" %}})

![Image of the Relearn theme in light and dark mode on phone, tablet and desktop](images/hero.png?classes=shadow&width=100%&height=100%)

## Motivation

The theme is a fork of the great [Learn theme](https://github.com/matcornic/hugo-theme-learn) with the aim of fixing long outstanding bugs and adepting to latest Hugo features. As far as possible this theme tries to be a drop-in replacement for the Learn theme.

## Features

- **Wide set of usage scenarios**
  - Responsive design for mobile usage
  - Looks nice on paper (if you have to)
  - Usable offline, no external dependencies
  - [Usable from your local file system via `file://` protocol]({{%relref "basics/configuration#serving-your-page-from-the-filesystem" %}})
  - Support for the [VSCode Front Matter extension](https://github.com/estruyf/vscode-front-matter) for on-premise CMS capabilities
  - Support for Internet Explorer 11
- **Configurable theming and visuals**
  - [Configurable brand images]({{%relref "basics/customization#change-the-logo" %}})
  - [Automatic switch for light/dark variant dependend on your OS settings]({{%relref "basics/customization#adjusting-to-os-settings" %}})
  - Predefined light, dark and color variants
  - [User selectable variants]({{%relref "basics/customization#multiple-variants" %}})
  - [Stylesheet generator]({{%relref "basics/generator" %}})
  - [Configurable syntax highlighting]({{%relref "shortcodes/highlight" %}})
- **Unique theme features**
  - [Print whole chapters or even the complete site]({{%relref "basics/configuration#activate-print-support" %}})
  - In page search
  - [Site search]({{%relref "basics/configuration#activate-search" %}})
  - [Dedicated search page]({{%relref "basics/configuration#activate-dedicated-search-page" %}})
  - [Taxonomy support]({{%relref "cont/taxonomy" %}})
  - Hidden pages
  - Unlimited nested menu dependend on your site structure
  - Navigation buttons dependend on your site structure
  - [Configurable shortcut links]({{%relref "cont/menushortcuts" %}})
- **Multi language support**
  - [Full support for languages written right to left]({{%relref "cont/i18n" %}})
  - [Available languages]({{%relref "cont/i18n#basic-configuration" %}}): Arabic, Simplified Chinese, Traditional Chinese, Czech, Dutch, English, Finnish, French, German, Hindi, Hungarian, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Turkish, Vietnamese
  - [Search support for mixed language content]({{%relref "cont/i18n#search" %}})
- **Additional Markdown features**
  - [Support for GFM (GitHub Flavored Markdown]({{%relref "cont/markdown" %}})
  - [Image styling like sizing, shadow, border and alignment]({{%relref "cont/markdown#further-image-formatting" %}})
  - [Image lightbox]({{%relref "cont/markdown#further-image-formatting#lightbox" %}})
- **Shortcodes galore**
  - [Display files attached to page bundles]({{%relref "shortcodes/attachments" %}})
  - [Marker badges]({{%relref "shortcodes/badge" %}})
  - [Configurable buttons]({{%relref "shortcodes/button" %}})
  - [List child pages]({{%relref "shortcodes/children" %}})
  - [Expand areas to reveal content]({{%relref "shortcodes/expand" %}})
  - [Font Awesome icons]({{%relref "shortcodes/icon" %}})
  - [Inclusion of other files]({{%relref "shortcodes/include" %}})
  - [Math and chemical formulae using MathJax]({{%relref "shortcodes/math" %}})
  - [Mermaid diagrams for flowcharts, sequences, gantts, pie, etc.]({{%relref "shortcodes/mermaid" %}})
  - [Colorful boxes]({{%relref "shortcodes/notice" %}})
  - [OpenAPI specifications using Swagger UI]({{%relref "shortcodes/openapi" %}})
  - [Reveal you site's configuration parameter]({{%relref "shortcodes/siteparam" %}})
  - [Tabbed panels]({{%relref "shortcodes/tabs" %}})
  - [Single tabbed panels]({{%relref "shortcodes/tab" %}}) and [multiple tabbed panels]({{%relref "shortcodes/tabs" %}})

## Support

To get support, feel free to open a new [discussion topic](https://github.com/McShelby/hugo-theme-relearn/discussions) or [issue report](https://github.com/McShelby/hugo-theme-relearn/issues) in the official repository on GitHub.

## Contributions

Feel free to contribute to this documentation by just clicking the {{% button style="transparent" icon="pen" %}}{{% /button %}} button displayed on top right of each page.

You are most welcome to contribute bugfixes or new features by making pull requests to the [official repository](https://github.com/McShelby/hugo-theme-relearn). Check the [contribution guidelines]({{%relref "dev/contributing" %}}) first before starting.

## License

The Relearn theme is licensed under the [MIT License](https://github.com/McShelby/hugo-theme-relearn/blob/main/LICENSE).

## Credits

This theme would not be possible without the work of [many others]({{%relref "more/credits" %}}).
