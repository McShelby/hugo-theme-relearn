+++
description = "How to configure your site to be multilingual"
title = "Multilingual"
weight = 2
+++

The Relearn theme is compatible with [Hugo's multilingual mode](https://gohugo.io/content-management/multilingual/).

The theme supports a wide set of languages, also supporting languages written right to left.

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

## Basic Configuration

This example will show you, how to convert your site created in the [Getting Started](introduction/quickstart) section to be multilingual using [translation by file name](https://gohugo.io/content-management/multilingual/#translation-by-file-name). You can also use [translation by content directory](https://gohugo.io/content-management/multilingual/#translation-by-content-directory), but this is out of the scope of this documentation.

Define your languages in your `hugo.toml` file. For example with English and Piratish English website.

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

Then, for each new page, append the _id_ of the language to the file.

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

## Configure Search

You may want to take a look into [search configuration](configuration/sidebar/search/). It has some additional options for multilingual websites.

## Disable Language Switching

Switching the language in the browser is a great feature, but for some reasons you may want to disable it.

Just set `params.disableLanguageSwitchingButton=true` in your `hugo.toml`

{{< multiconfig file=hugo >}}
[params]
  disableLanguageSwitchingButton = true
{{< /multiconfig >}}
