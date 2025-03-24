+++
categories = ['howto']
description = 'Configure search and the search form'
options = ['additionalContentLanguage', 'disableSearch', 'disableSearchIndex', 'disableSearchPage', 'searchIndexURL', 'searchPageURL']
title = 'Search'
weight = 3
+++

## Configure Search

The theme offers three levels of search through the menu's search form:

1. In-page search: Highlights search terms on the current page
2. Search popup: Opens a popup with results from other pages
3. Dedicated search page: Accessible by clicking the magnifier glass or pressing <kbd>ENTER</kbd>

Each level requires the previous one to be enabled. If no search is configured, the search form won't appear.

> [!note]
> The search term will be [stored in the reader's browser](configuration/sitemanagement/storedinformation) as long as it is present.

{{%badge style="cyan" icon="gears" title=" "%}}Option{{%/badge%}} All levels are enabled by default. Disable them in `hugo.toml`:

- In-page search: `disableSearch=true`
- Search popup: `disableSearchIndex=true`
- Dedicated search page: `disableSearchPage=true`

{{< multiconfig file=hugo section=params >}}
disableSearch = true
disableSearchIndex = true
disableSearchPage = true
{{< /multiconfig >}}

{{%badge style="cyan" icon="gears" title=" "%}}Option{{%/badge%}} Default URLs can be changed with the following parameter

- Search popup: `searchindex.js` set by `searchIndexURL`
- Dedicated search page: `search/index.html` set by `searchPageURL`

{{< multiconfig file=hugo section=params >}}
searchIndexURL = 'omnisearchindex.js'
searchPageURL = 'omnisearch'
{{< /multiconfig >}}

{{% notice note %}}
You only need to change these if you have other own content created for those URLs. This can happen with `uglyURLs=true` in `hugo.toml` and having a content file at `content/search.md`.

Check for duplicate URLs by running `hugo --printPathWarnings`.
{{% /notice %}}

## Supported Languages

The [Lunr](https://lunrjs.com) search library doesn't support all languages of the theme. Unsupported languages will show errors in the browser console. Currently unsupported are

- Czech
- Indonesian
- Persian
- Polish
- Swahili
- Ukrainian

## Mixed Language Support

{{%badge style="cyan" icon="gears" title=" "%}}Option{{%/badge%}} In case your page's content contains text in multiple languages (for example, you are writing a Piratish documentation for your English API), you can set those languages in `additionalContentLanguage` to broaden the search.

{{< multiconfig file=hugo section=params >}}
additionalContentLanguage = [ "en" ]
{{< /multiconfig >}}

You can add multiple languages to this array.

{{% notice note %}}
Use the base language code. For example, if your page is using `zh-CN`, add `zh` to this parameter.
{{% /notice %}}
