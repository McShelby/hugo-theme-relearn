+++
description = "How to set up a multilingual site"
options = ["disableLanguageSwitchingButton"]
title = "Multilingual"
weight = 2
+++

The Relearn theme works with [Hugo's multilingual mode](https://gohugo.io/content-management/multilingual/).

It supports many languages, including right-to-left languages.

{{% expand "Supported languages" %}}
- Arabic
- Simplified Chinese
- Traditional Chinese
- Czech
- Dutch
- English
- Finnish
- French
- German
- Hindi
- Hungarian
- Indonesian
- Italian
- Japanese
- Korean
- Polish
- Portuguese
- Romanian
- Russian
- Spanish
- Swahili
- Turkish
- Vietnamese
{{% /expand %}}

## Translation by File Name

Here's how to make your site multilingual using [translations by file name](https://gohugo.io/content-management/multilingual/#translation-by-file-name):

1. Set up languages in your `hugo.toml` file:

    {{< multiconfig file=hugo >}}
    defaultContentLanguage = "en"

    [languages]
      [languages.en]
        title = "My Website"
        weight = 1
        languageName = "English"

      [languages.pir]
        title = "Arrr, my Website"
        weight = 2
        languageName = "Pirrratish"
    {{< /multiconfig >}}

2. Duplicate your content files and add language codes to their file names:

    ````plaintext
    ├── content
    │   ├── basics
    │   │   ├── first-content
    |   |   |   ├── _index.en.md
    |   |   |   └── _index.pir.md
    │   │   ├── second-content
    |   |   |   ├── _index.en.md
    |   |   |   └── _index.pir.md
    │   │   ├── third-content.en.md
    │   │   └── third-content.pir.md
    │   ├── _index.en.md
    │   └── _index.pir.md
    ├── themes
    │   └── hugo-theme-relearn
    │       └── ...
    └── hugo.toml
    ````

## Translation by Content Directory

The theme also support [translations by content directory](https://gohugo.io/content-management/multilingual/#translation-by-content-directory) which can be configured in a similar way. This is not used in further examples of this documentation.

## Search Settings

Check the [search configuration](configuration/sidebar/search) for multilingual options.

## Turn Off Language Switching

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default the theme shows a language switcher in the lower part of the menu.

To disable the language switcher set `disableLanguageSwitchingButton=true`

{{< multiconfig file=hugo >}}
[params]
  disableLanguageSwitchingButton = true
{{< /multiconfig >}}
