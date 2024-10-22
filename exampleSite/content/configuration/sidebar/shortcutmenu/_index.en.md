+++
categories = ["howto"]
description = "Add additional shortcut links to the sidebar"
options = ["disableShortcutsTitle"]
title = "Shortcut Menu"
weight = 4
+++

The sidebar contains your content's navigation menu, but you can also add extra menu entries or shortcuts in a separate section.

For internal links, use the `pageRef` property instead of `url`. Learn more about [Hugo's menu configuration](https://gohugo.io/content-management/menus/#define-in-site-configuration).

## Title

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default, the shortcut menu has a title ("_More_" in English).

You can disable this title with `disableShortcutsTitle=true`.

{{< multiconfig file=hugo >}}
[params]
  disableShortcutsTitle = true
{{< /multiconfig >}}

To change the title, update your local i18n translation file.

````toml {title="i18n/en.toml"}
[shortcuts-menuTitle]
other = "Other Great Stuff"
````

## Single Language Example

Edit `hugo.toml` and add `[[menu.shortcuts]]` entries for each link:

{{< multiconfig file=hugo >}}
[[menu.shortcuts]]
  pre = '<i class="fa-fw fab fa-github"></i> '
  name = 'GitHub Repo'
  url = 'https://github.com/McShelby/hugo-theme-relearn'
  weight = 10

[[menu.shortcuts]]
  name = 'Showcases'
  pageRef = '/showcase'
  weight = 20

[[menu.shortcuts]]
  name = 'Credits'
  pageRef = '/more/credits'
  weight = 30

[[menu.shortcuts]]
  pre = '<i class="fa-fw fas fa-tags"></i> '
  name = 'Tags'
  pageRef = '/tags'
  weight = 40

[[menu.shortcuts]]
  pre = '<i class="fa-fw fas fa-layer-group"></i> '
  name = 'Categories'
  pageRef = '/categories'
  weight = 50
{{< /multiconfig >}}

## Multilingual Example

For multilingual sites, set different menus for each language in `hugo.toml`:

{{< multiconfig file=hugo >}}
[languages]
  [languages.en]
    title = 'Hugo Relearn Theme'
    weight = 1
    languageName = 'English'

  [[languages.en.menu.shortcuts]]
    pre = '<i class="fa-fw fab fa-github"></i> '
    name = 'GitHub Repo'
    url = 'https://github.com/McShelby/hugo-theme-relearn'
    weight = 10

  [[languages.en.menu.shortcuts]]
    name = 'Showcases'
    pageRef = '/showcase'
    weight = 20

  [[languages.en.menu.shortcuts]]
    name = 'Credits'
    pageRef = '/more/credits'
    weight = 30

  [[languages.en.menu.shortcuts]]
    pre = '<i class="fa-fw fas fa-tags"></i> '
    name = 'Tags'
    pageRef = '/tags'
    weight = 40

  [[languages.en.menu.shortcuts]]
    pre = '<i class="fa-fw fas fa-layer-group"></i> '
    name = 'Categories'
    pageRef = '/categories'
    weight = 50

  [languages.pir]
    title = 'Captain Hugo Relearrrn Theme'
    weight = 2
    languageName = 'Arrr! Pirrratish'

  [[languages.pir.menu.shortcuts]]
    name = '<i class="fa-fw fab fa-github"></i> GitHub Repo'
    identifier = 'ds'
    url = 'https://github.com/McShelby/hugo-theme-relearn'
    weight = 10

  [[languages.pir.menu.shortcuts]]
    name = '<i class="fa-fw fas fa-camera"></i> Showcases'
    pageRef = '/showcase'
    weight = 11

  [[languages.pir.menu.shortcuts]]
    pre = '<i class="fa-fw fab fa-github"></i> '
    name = 'GitHub Repo'
    url = 'https://github.com/McShelby/hugo-theme-relearn'
    weight = 10

  [[languages.pir.menu.shortcuts]]
    name = 'Showcases'
    pageRef = '/showcase'
    weight = 20

  [[languages.pir.menu.shortcuts]]
    name = 'Crrredits'
    pageRef = '/more/credits'
    weight = 30

  [[languages.pir.menu.shortcuts]]
    pre = '<i class="fa-fw fas fa-tags"></i> '
    name = 'Arrr! Tags'
    pageRef = '/tags'
    weight = 40

  [[languages.pir.menu.shortcuts]]
    pre = '<i class="fa-fw fas fa-layer-group"></i> '
    name = 'Categorrries'
    pageRef = '/categories'
    weight = 50
{{< /multiconfig >}}

## Displaying Pages Only in the Shortcuts Menu

To show pages only in the shortcuts menu you have two choices

1. Create a [headless branch bundle](https://gohugo.io/content-management/page-bundles/#headless-bundle), `_index.md` in its own folder with the below front matter. The branch bundle will **not** be contained in the sitemap.

    {{< multiconfig fm=true file="content/showcase/_index.en.md" >}}
    title = 'Showcase'
    [_build]
      render = 'always'
      list = 'never'
      publishResources = true
    {{< /multiconfig >}}

2. Or, put a child page inside a headless branch bundle with the following front matter in the bundle. This causes the child but not the branch bundle to be contained in the sitemap.

    {{< multiconfig fm=true file="content/more/_index.en.md" >}}
    [_build]
      render = 'never'
      list = 'never'
      publishResources = false
    {{< /multiconfig >}}

    The child page can be any type of content.

    {{< multiconfig fm=true file="content/more/credits_index.en.md" >}}
    title = 'Credits'
    {{< /multiconfig >}}
