+++
title = "Menu extra shortcuts"
weight = 5
+++

You can define additional menu entries or shortcuts in the navigation menu without any link to content.

## Basic configuration

Edit the website configuration `config.toml` and add a `[[menu.shortcuts]]` entry for each link your want to add.

Example from the current website:

````toml
[[menu.shortcuts]]
name = "<i class='fab fa-fw fa-github'></i> GitHub repo"
identifier = "ds"
url = "https://github.com/McShelby/hugo-theme-relearn"
weight = 10

[[menu.shortcuts]]
name = "<i class='fas fa-fw fa-camera'></i> Showcases"
url = "showcase/"
weight = 11

[[menu.shortcuts]]
name = "<i class='fas fa-fw fa-bookmark'></i> Hugo Documentation"
identifier = "hugodoc"
url = "https://gohugo.io/"
weight = 20

[[menu.shortcuts]]
name = "<i class='fas fa-fw fa-bullhorn'></i> Credits"
url = "more/credits/"
weight = 30

[[menu.shortcuts]]
name = "<i class='fas fa-fw fa-tags'></i> Tags"
url = "tags/"
weight = 40
````

By default, shortcuts are preceded by a title. This title can be disabled by setting `disableShortcutsTitle=true`.
However, if you want to keep the title but change its value, it can be overridden by changing your local i18n translation string configuration.

For example, in your local `i18n/en.toml` file, add the following content

````toml
[Shortcuts-Title]
other = "<Your value>"
````

Read more about [hugo menu](https://gohugo.io/extras/menus/) and [hugo i18n translation strings](https://gohugo.io/content-management/multilingual/#translation-of-strings)

## Configuration for Multilingual mode {#i18n}

When using a multilingual website, you can set different menus for each language. In the `config.toml` file, prefix your menu configuration by `Languages.<language-id>`.

Example from the current website:

````toml
[languages]
  [languages.en]
    title = "Hugo Relearn Theme"
    weight = 1
    languageName = "English"
    [languages.en.params]
      landingPageName = "<i class='fas fa-home'></i> Home"

  [[languages.en.menu.shortcuts]]
    name = "<i class='fab fa-fw fa-github'></i> GitHub repo"
    identifier = "ds"
    url = "https://github.com/McShelby/hugo-theme-relearn"
    weight = 10

  [[languages.en.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-camera'></i> Showcases"
    pageRef = "showcase/"
    weight = 11

  [[languages.en.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-bookmark'></i> Hugo Documentation"
    identifier = "hugodoc"
    url = "https://gohugo.io/"
    weight = 20

  [[languages.en.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-bullhorn'></i> Credits"
    pageRef = "more/credits/"
    weight = 30

  [[languages.en.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-tags'></i> Tags"
    pageRef = "tags/"
    weight = 40

  [languages.pir]
    title = "Cap'n Hugo Relearrrn Theme"
    weight = 1
    languageName = "Arrr! Pirrrates"
    [languages.pir.params]
      landingPageName = "<i class='fas fa-home'></i> Arrr! Home"

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fab fa-fw fa-github'></i> GitHub repo"
    identifier = "ds"
    url = "https://github.com/McShelby/hugo-theme-relearn"
    weight = 10

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-camera'></i> Showcases"
    pageRef = "showcase/"
    weight = 11

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-bookmark'></i> Cap'n Hugo Documentat'n"
    identifier = "hugodoc"
    url = "https://gohugo.io/"
    weight = 20

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-bullhorn'></i> Crrredits"
    pageRef = "more/credits/"
    weight = 30

  [[languages.pir.menu.shortcuts]]
    name = "<i class='fas fa-fw fa-tags'></i> Arrr! Tags"
    pageRef = "tags/"
    weight = 40
````

Read more about [hugo menu](https://gohugo.io/extras/menus/) and [hugo multilingual menus](https://gohugo.io/content-management/multilingual/#menus)

## Shortcuts to pages inside of your project

If you have shortcuts to pages inside of your project and you don't want them to show up in page menu section, you have two choices:

1. Make the page file for the shortcut section a [headless branch bundle](https://gohugo.io/content-management/age-bundles/#headless-bundle) (contained in its own subdirectory and called `_index.md`) and add the following frontmatter configuration to the file (see exampleSite's `content/showcase`). This causes its content to **not** be ontained in the sitemap.

    ````toml
    [_build]
      render = "never"
      list = "never"
      publishResources = false
    ````

2. Store the page file for the shortcut section below a parent headless branch bundle and add the following frontmatter to he **parent**. In this case, the file itself can be a branch bundle, leaf bundle or simple page (see exampleSite's content/more/` and `content/more/credits`). This causes its content to be contained in the sitemap.

    ````toml
    [_build]
      render = "always"
      list = "never"
      publishResources = true
    ````
