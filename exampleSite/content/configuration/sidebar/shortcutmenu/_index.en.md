+++
description = "Add additional shortcut links to the sidebar"
options = ["disableShortcutsTitle"]
title = "Shortcut Menu"
weight = 5
+++

The sidebar contains the navigation menu of your content files but you can also add additional menu entries or shortcuts below the navigation menu.

You can read more about [Hugo's menu configuration](https://gohugo.io/content-management/menus/#define-in-site-configuration) in its documenation.

## Title

By default, the shortcut menu is preceded by a title. This title can be disabled by setting `params.disableShortcutsTitle=true`. However, if you want to keep the title but change its value, it can be overridden by changing your local i18n translation string configuration.

For example, in your local `i18n/en.toml` file, add the following content

````toml {title="en.toml"}
[Shortcuts-Title]
other = "Other Great Stuff"
````

## Single Language Example

Edit the `hugo.toml` and add a `[[menu.shortcuts]]` entry for each link your want to add.

{{< multiconfig file=hugo >}}
[[menu.shortcuts]]
name = "<i class='fa-fw fab fa-github'></i> GitHub repo"
identifier = "ds"
url = "https://github.com/McShelby/hugo-theme-relearn"
weight = 10

[[menu.shortcuts]]
name = "<i class='fa-fw fas fa-camera'></i> Showcases"
url = "showcase/"
weight = 11

[[menu.shortcuts]]
name = "<i class='fa-fw fas fa-bookmark'></i> Hugo Documentation"
identifier = "hugodoc"
url = "https://gohugo.io/"
weight = 20

[[menu.shortcuts]]
name = "<i class='fa-fw fas fa-bullhorn'></i> Credits"
url = "more/credits/"
weight = 30

[[menu.shortcuts]]
name = "<i class='fa-fw fas fa-tags'></i> Tags"
url = "tags/"
weight = 40
{{< /multiconfig >}}

## Multilingual Example

When using a multilingual website, you can set different menus for each language. In the `hugo.toml` file, prefix your menu configuration by `Languages.<language-id>`.

{{< multiconfig file=hugo >}}
[languages]
  [languages.en]
    title = "Hugo Relearn Theme"
    weight = 1
    languageName = "English"
    [languages.en.params]
      landingPageName = "<i class='fa-fw fas fa-home'></i> Home"

  [[languages.en.menu.shortcuts]]
    name = "<i class='fa-fw fab fa-github'></i> GitHub repo"
    identifier = "ds"
    url = "https://github.com/McShelby/hugo-theme-relearn"
    weight = 10

  [[languages.en.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-camera'></i> Showcases"
    pageRef = "showcase/"
    weight = 11

  [[languages.en.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-bookmark'></i> Hugo Documentation"
    identifier = "hugodoc"
    url = "https://gohugo.io/"
    weight = 20

  [[languages.en.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-bullhorn'></i> Credits"
    pageRef = "more/credits/"
    weight = 30

  [[languages.en.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-tags'></i> Tags"
    pageRef = "tags/"
    weight = 40

  [languages.pir]
    title = "Cap'n Hugo Relearrrn Theme"
    weight = 1
    languageName = "Arrr! Pirrratish"
    [languages.pir.params]
      landingPageName = "<i class='fa-fw fas fa-home'></i> Arrr! Home"

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fa-fw fab fa-github'></i> GitHub repo"
    identifier = "ds"
    url = "https://github.com/McShelby/hugo-theme-relearn"
    weight = 10

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-camera'></i> Showcases"
    pageRef = "showcase/"
    weight = 11

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-bookmark'></i> Cap'n Hugo Documentat'n"
    identifier = "hugodoc"
    url = "https://gohugo.io/"
    weight = 20

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-bullhorn'></i> Crrredits"
    pageRef = "more/credits/"
    weight = 30

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fa-fw fas fa-tags'></i> Arrr! Tags"
    pageRef = "tags/"
    weight = 40
{{< /multiconfig >}}

## Shortcuts to Pages Inside of your Project

If you have shortcuts to pages inside of your project and you don't want them to show up in your navigation menu, you have two choices:

1. Make the page file for the shortcut a [headless branch bundle](https://gohugo.io/content-management/page-bundles/#headless-bundle) (contained in its own subdirectory and called `_index.md`) and add the following frontmatter configuration to the file (see exampleSite's `content/showcase/_index.en.md`). This causes its content to **not** be contained in the sitemap.

    {{< multiconfig fm=true >}}
    title = "Showcase"
    [_build]
      render = "always"
      list = "never"
      publishResources = true
    {{< /multiconfig >}}

2. Store the page file for the shortcut below a parent headless branch bundle and add the following frontmatter to he **parent** (see exampleSite's `content/more/_index.en.md`). **Don't give this page a `title`** as this will cause it to be shown in the breadcrumbs - a thing you most likely don't want.

    {{< multiconfig fm=true >}}
    [_build]
      render = "never"
      list = "never"
      publishResources = false
    {{< /multiconfig >}}

    In this case, the file itself can be a branch bundle, leaf bundle or simple page (see exampleSite's `content/more/credits.en.md`). This causes its content to be contained in the sitemap.

    {{< multiconfig fm=true >}}
    title = "Credits"
    {{< /multiconfig >}}
