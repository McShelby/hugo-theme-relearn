+++
description = "Configure search and the search form"
title = "Search"
weight = 3
+++

## Configure Search

The theme comes with three levels of search, all provided through the search form in the menu

- in-page search: a search term will be marked if found in the currently displayed page
- search popup: a popup will open during typing if the term is found in other pages of your site
- dedicated search page: you can access a dedicated search page by either clicking on the magnifier glass or by typing and pressing <kbd>ENTER</kbd>

Each level depends on the previous level to be enabled, eg. the dedicated search page is only available, if you have search popup and in-page search enabled. If no search level is configured, the search form will not be displayed.

By default all three levels are enabled. You can disable each level by the following settings in your `hugo.toml`:

- in-page search: `disableSearch=true`
- search popup: `disableSearchIndex=true`
- dedicated search page: `disableSearchPage=true`

By default the following files will be created, relative to each languages home page but can be overwritten:

- search popup: `searchindex.js`, configured by `searchIndexURL`
- dedicated search page: `search/index.html`, configured by `searchPageURL`

{{% notice note %}}
You only need to reconfigure the file / page URLs if you have own content at those URLs in your project. Eg. this can happen if you set `uglyURLs=true` in your `hugo.toml` and defining a Markdown file `content/search.md`.

To make sure, there is no duplicate content for any given URL of your project, run `hugo --printPathWarnings`.
{{% /notice %}}

## Supported Languages

In case each page's content is written in one single language only, the above configuration will already configure the site's search functionality correctly.

{{% notice warning %}}
Although the theme supports a wide variety of supported languages, the site's search via the [Lunr](https://lunrjs.com) search library does not.
You'll see error reports in your browsers console log for each unsupported language. Currently unsupported are:

- Czech
- Indonesian
- Polish
- Swahili
{{% /notice %}}

### Search with Mixed Language Support

In case your page's content contains text in multiple languages (e.g. you are writing a Russian documentation for your english API), you can add those languages to your `hugo.toml` to broaden search.

{{< multiconfig file=hugo >}}
[params]
  additionalContentLanguage = [ "en" ]
{{< /multiconfig >}}

As this is an array, you can add multiple additional languages.

{{% notice note %}}
Keep in mind that the language code required here, is the base language code. E.g. if you have additional content in `zh-CN`, you have to add just `zh` to this parameter.
{{% /notice %}}
