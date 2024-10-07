+++
description = "Your site's directory structure"
title = "Basic Structure"
weight = 1
+++

If you've followed the [Getting Started](introduction/quickstart) guide, your directory layout will look similar to this:

````plaintext
├── content
│   ├── basics
│   │   ├── first-content
|   |   |   └── _index.md
│   │   ├── second-content
|   |   |   └── _index.md
│   │   └── third-content.md
│   └── _index.md
├── themes
│   └── hugo-theme-relearn
│       └── ...
└── hugo.toml
````

Hugo uses a [union file system](https://gohugo.io/getting-started/directory-structure/#union-file-system), which lets you combine multiple directories.

By default, it puts your root directory on top of the Relearn theme directory. Files in your root directory will replace theme files in the same location.

For example, if you create a file at `layouts/partials/heading.html`, it will override the theme's `themes/hugo-theme-relearn/layouts/partials/heading.html`.

[See this list](configuration/modifications/partials), to learn which files are allowed to be modified by you.

This makes it easy to customize the theme without changing files in the `themes` directory, making future theme updates simpler.

> [!WARNING]
> Don't edit files inside the `themes/hugo-theme-relearn` directory. That's not the recommended way to customize! Refer to the explanation above.
>
> Don't clone the theme repository and edit files there for your site.  That's not the recommended way to customize! Instead, follow the [Getting Started](introduction/quickstart) guide.
