+++
categories = ["explanation"]
description = "Your content's directory structure"
title = "Directory Structure"
weight = 1
+++

In **Hugo**, pages are the core of your site.

The theme generates the navigation menu out of the given directory structure.

Organize your site like [any other Hugo project](https://gohugo.io/content/structure/). Typically, you will have a _content_ directory with all your pages.

````plaintext
content
├── first-chapter
│   ├── first-page
|   |   |── _index.md
|   │   ├── first-sub-page
|   |   |   |── _index.md
|   |   |   |── picture1.png
|   |   |   └── plain.txt
│   ├── second-page
|   |   |── index.md
|   |   |── picture1.png
|   |   └── picture2.png
│   └── third-page.md
└── _index.md
````

> [!note]
> While you can also go different, `_index.md` (with an underscore) is recommended for each directory, it's your _directory's home page_.
>
> See [Hugo's guide for content ](https://gohugo.io/content-management/) to learn more.
