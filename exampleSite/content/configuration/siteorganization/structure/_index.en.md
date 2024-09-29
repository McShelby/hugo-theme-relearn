+++
description = "Your site's directory structure"
title = "Basic Structure"
weight = 1
+++

## Structure

If you've followed the [Getting Started](introduction/quickstart/) guide, you are resulting in a directory layout similar to this

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

Hugo creates a [union file system](https://gohugo.io/getting-started/directory-structure/#union-file-system), allowing you to mount two or more directories to the same location.

By default, it overlays your root directory on top of the directory of the Relearn theme. Files contained in your root directory will replace files in the Relearn theme's directory of the same location.

For example, the theme defines a file `themes/hugo-theme-relearn/layouts/partials/heading.html`, you can override it by defining your own file in `layouts/partials/heading.html`.

This makes it easy to customize the theme without having to edit files inside of the `themes` directory and so making it easier for you in the future to update the theme to a newer version.

> [!WARNING]
> If you are editing files inside the `themes/hugo-theme-relearn` directory, you're doing it wrong.
>
> See the [above paragraphs](#structure).

> [!WARNING]
> If you have cloned the theme repository and start editing files for your site in this clone, you're doing it wrong.
>
> Follow the [Getting Started](introduction/quickstart/) guide.
