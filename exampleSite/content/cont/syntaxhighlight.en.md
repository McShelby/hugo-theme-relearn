+++
title = "Code highlighting"
weight = 16
icon = "file-code"
+++

The Relearn theme uses [Hugo's built-in syntax highlighting](https://gohugo.io/content-management/syntax-highlighting/) for code.

## Markdown syntax

Wrap the code block with three backticks and the name of the language. Highlight will try to auto detect the language if one is not provided.

<!-- markdownlint-disable MD046 -->
````plaintext
```json
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": {"text": "...", "sensitive": false}
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": {"text": "...", "sensitive": false}
  }
]
```
````
<!-- markdownlint-disable MD046 -->

Renders to:

```json
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": {"text": "...", "sensitive": false}
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": {"text": "...", "sensitive": false}
  }
]
```

## Supported languages

Hugo comes with a [remarkable list](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages) of supported languages.

## Recommended configuration

You can choose a color theme from the [list of supported themes](https://xyproto.github.io/splash/docs/all.html) and add it in your `config.toml`

````toml
[markup]
  [markup.highlight]
    style = "base16-snazzy" # choose a color theme or create your own
    guessSyntax = false     # if set to true, avoid unstyled code if no language was given but mermaid code fences will not work anymore
````
