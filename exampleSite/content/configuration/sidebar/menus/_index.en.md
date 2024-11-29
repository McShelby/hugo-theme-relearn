+++
categories = ["howto"]
description = "Configure all things menus"
frontmatter = ["alwaysopen", "collapsibleMenu", "linkTitle", "menuPageRef", "menuPost", "menuPre", "menuUrl", "ordersectionsby", "sidebarmenus"]
options = ["alwaysopen", "collapsibleMenu", "disableShortcutsTitle", "ordersectionsby",  "sidebarmenus"]
title = "Menus"
weight = 4
+++

The theme can build menu trees from [the structure of your page files](authoring/structure) or from [Hugo's build in menu feature](https://gohugo.io/content-management/menus/).

- {{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} All configuration options in your `hugo.toml` apply to all menus but can be changed individually.

- {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} In case of page structure menus, individual configuration is done via a page's front matter.

- {{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}}. In case of Hugo menus, individual configuration is done via a menu entry's configuration.

## Expand State of Submenus

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} You can change how submenus appear with `alwaysopen`.

{{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} For Hugo menus, you have to set `params.alwaysopen` instead.

If `alwaysopen=false` for any given entry, its children will not be shown in the menu as long as it is not necessary for the sake of navigation.

The theme generates the expand state based on the following rules:

- all parent entries of the active page including their [visible](authoring/meta#hidden) siblings are shown regardless of any settings
- immediate child entries of the active entry are shown regardless of any settings
- if not overridden, all other first level entries behave like they would have been given `alwaysopen=false`
- if not overridden, all other entries of levels besides the first behave like they would have been given `alwaysopen=true`
- all [visible](authoring/meta#hidden) entries show their immediate child entries if `alwaysopen=true`; this proceeds recursively
- all remaining entries are not shown

{{< multiconfig >}}
alwaysopen = false
{{< /multiconfig >}}

## Expander for Submenus

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Set `collapsibleMenu=true` to show submenus as collapsible trees with a clickable expander.

{{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} For Hugo menus, you have to set `params.collapsibleMenu=true` instead.

{{< multiconfig >}}
collapsibleMenu = true
{{< /multiconfig >}}

> [!WARNING]
> Using this option may cause degraded build performance by slowing down your build process.
>
> This is usually the case for menus with many entries and happens for page menus as well as for Hugo menus.
>
> We've seen builds taking 2 minutes with 1000+ pages, and over 30 minutes with 5000+ pages when using a page menu.
>
> This happens because each new page affects all other pages, leading to exponentially longer build times.

## Ordering Menu Entries

### By Weight

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} {{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} Hugo provides a [simple way](https://gohugo.io/getting-started/glossary/#weight) to handle order of your entries by setting the `weight` front matter to a number.

Hugo menus can only be sorted using the weight method.

{{< multiconfig>}}
weight = 5
{{< /multiconfig >}}

### By Other

Using the `weight` for sorting can get cumbersome if you, for example, just want to sort alphabetically. Each time you add a new page in the set of pages, you may have to renumber some or all of them to make space for the new page.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Use `ordersectionsby` to sort by other aspects. See the [children shortcode](shortcodes/children#parameter) for a complete list.

{{< multiconfig >}}
ordersectionsby = 'linktitle'
{{< /multiconfig >}}

## Title for Menu Entries

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} A page's `linkTitle` or `title` front matter will be used for naming a menu entry of a page menu, in that order if both are defined. Using `linkTitle` helps to shorten the text for menu entries if the page’s title is too descriptive.

{{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} A menu entry's `title` or `name` will be used for naming a menu entry of a Hugo menu, in that order if both are defined.

For example for a page named `install/linux.md`

{{< multiconfig fm=true >}}
title = 'Install on Linux'
linkTitle = 'Linux'
{{< /multiconfig >}}

## Icons for Menu Entries

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} For page menus, add a `menuPre` to insert any HTML code before the menu label. You can also set `menuPost` to insert HTML code after the menu label.

{{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} For Hugo menus, add a `pre` to insert any HTML code before the menu label. You can also set `post` to insert HTML code after the menu label.

If `pageRef` is set for the menu entry and no `pre` or `post` was configured, `menuPre` and `menuPost` of the referenced page will be taken.

The example below uses the GitHub icon for an entry of a page menu.

{{< multiconfig fm=true >}}
title = 'GitHub Repo'
menuPre = '<i class="fab fa-github"></i> '
{{< /multiconfig >}}

## Disable Menu Entries

You may want to structure your entries in a hierarchical way but don't want to generate clickable parent entries? The theme got you covered.

### For Page Menus

To stay with the [initial example](authoring/structure): Suppose you want `first-chapter/first-page` appear in the sidebar but don't want to generate a page for it. So the entry in the sidebar should not be clickable but should be expandable.

For this, open `content/first-chapter/first-page/_index.md` and add the following front matter

{{< multiconfig fm=true >}}
[_build]
  render = 'never'
{{< /multiconfig >}}

### For Hugo Menus

Just don't give your parent menu entry configuration a `url` or `pageRef`. See the [next section](#title-for-menus) for a special case.

If you want to learn how to configure different Hugo menus for each language, [see the official docs](https://gohugo.io/content-management/multilingual/#menus).

{{< multiconfig fm=true >}}
[[menu.addendum]]
  name = 'Parent 1'
  weight = 1

[[menu.addendum]]
  parent = 'Parent 1'
  name = 'Child 1'
  url = 'https://example.com/1'

[[menu.addendum]]
  name = 'Parent 2'
  weight = 2

[[menu.addendum]]
  parent = 'Parent 2'
  name = 'Child 2'
  url = 'https://example.com/2'
{{< /multiconfig >}}

## Title for Menus

Each menu may have an optional title above its tree. This must be activated for each [menu by setting `disableMenuTitle=false` for each sidebar menu configuration](#parameter).

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} For page menus, set the `menuTitle` front matter for the root page of the menu. For example in the home page for the default sidebar menu. If no `menuTitle` was set, the title will be taken from your translation files by the key `<identifier>-menuTitle`, where `<identifier>` is the identifier of your sidebar menu configuration.

{{% badge color="blueviolet" icon="bars" title=" " %}}Menu{{% /badge %}} For Hugo menus, the title will be taken from your translation files by the key `<identifier>-menuTitle`, where `<identifier>` is the identifier of your sidebar menu configuration.

If you don't want to fiddle around with your translation files, you also have the possibility to let the title be taken from the menu definition. For that, define a nested menu that only has one top-level entry without `url` or `pageRef`.

In this case, the `title` or `name` is taken for the menu heading.

If you want to learn how to configure different Hugo menus for each language, [see the official docs](https://gohugo.io/content-management/multilingual/#menus).

{{< multiconfig fm=true >}}
[[menu.addendum]]
  name = 'A Menu Title for the Whole Menu'

[[menu.addendum]]
  parent = 'Parent'
  name = 'A Menu Entry Title for Child 1'
  url = 'https://example.com/1'
  weight = 1

[[menu.addendum]]
  parent = 'Parent'
  name = 'A Menu Entry Title for Child 2'
  url = 'https://example.com/2'
  weight = 2
{{< /multiconfig >}}

## Title for the Predefined Shortcut Menu

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default, the predefined shortcut menu has a the title _More_ (in the English translation).

You can disable this title with `disableShortcutsTitle=true`.

{{< multiconfig file=hugo >}}
[params]
  disableShortcutsTitle = true
{{< /multiconfig >}}

To change the title, override your translation file.

````toml {title="i18n/en.toml"}
[shortcuts-menuTitle]
other = "Other Great Stuff"
````

## Defining Sidebar Menus

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Menus are defined using the `sidebarmenus` option.

You can define as many menus, as you like. If you don't overwrite this option, the theme defaults to

{{< multiconfig >}}
sidebarmenus = [
  { type = 'page', identifier = 'home', main = true, disableTitle = true, pageRef = '' },
  { type = 'menu', identifier = 'shortcuts', main = false, disableTitle = false },
]
{{< /multiconfig >}}

### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| type                  | _&lt;empty&gt;_ | The type of menu.<br><br>- `page` for a page menu<br>- `menu` for a Hugo menu |
| identifier            | _&lt;empty&gt;_ | A unique identifier for this entry<br><br>- for `type=page` an arbitrary name<br>- for `page=menu` the identifier of the menu definition in your `hugo.toml` |
| main                  | see notes       | Whether to add additional spacing and larger text to the menu<br><br>- for `type=page` defaults to `true`<br>- for `page=menu` defaults to `false` |
| disableTitle          | see notes       | Whether to print a title above the menu<br><br>- for `type=page` defaults to `true`<br>- for `page=menu` defaults to `false` |
| pageRef               | _&lt;empty&gt;_ | Only for `type=page`, the page path to start the menu tree. If not set, defaults to the home page. |

## Redefining Sidebar Menus for Certain Pages

Suppose you are building a site that contains a topmost `blog` and `documentation` section.

When the user is on one of the blog pages he should only see a menu containing all blog pages, while on a documentation page he should only see a menu containing all doc pages.

Directory structure:

````plaintext
content
├── blog
│   ├── post-1.md
│   ├── post-2.md
│   ├── post-3.md
│   └── _index_.md
├── docs
│   ├── topic-1.md
│   ├── topic-2.md
│   ├── topic-3.md
│   └── _index_.md
└── _index.md
````

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Using [Hugo's cascade feature](https://gohugo.io/content-management/front-matter/#cascade), we can redefine the menus once in `blog/_index.md` and `docs/_index.md` setting `sidebarmenus` so they will be used in all children pages.

{{< multiconfig fm=true file="blog/_index.md">}}
title = 'Blog'
[[cascade]]
  [cascade.params]
    sidebarmenus = [
      { type = 'page', identifier = 'blog', pageRef = '/blog' },
    ]
{{< /multiconfig >}}

{{< multiconfig fm=true file="docs/_index.md">}}
title = 'Documentation'
[[cascade]]
  [cascade.params]
    sidebarmenus = [
      { type = 'page', identifier = 'docs', pageRef = '/docs' },
    ]
{{< /multiconfig >}}

## Displaying Arbitrary Links in a Page Menu

You may have the need to add arbitrary links at some point in your menu that are initially not backed by a page. These are called crosslinks.

Assume the following structure

````plaintext
content
├── reference
│   ├── ref-a.md
│   ├── ref-b.md
│   ├── ref-c.md
│   └── _index_.md
├── topic-blue.md
├── topic-red.md
├── topic-yellow.md
└── _index_.md
````

You now want to include `ref-b` as separate `topic-green` entry after `topic-blue` in your menu.

For that create a new page with the following front matter

{{< multiconfig fm=true file="content/topic-green.md" >}}
title = 'Topic Green'
menuPageRef = '/reference/ref-b'
{{< /multiconfig >}}

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} If you want to link to an external page instead, you can use `menuUrl` instead of `menuPageRef`.

Pages defining a crosslink are never part of the arrow navigation and are skipped instead.

So with the above example and alphabetical sorting of the menu entries, pressing {{% button style="transparent" icon="chevron-right" %}}{{% /button %}} on `topic-blue` will skip the newly added `topic-green` and instead will load `topic-red`.

Having sub pages below a page that has `menuUrl` or `menuPageRef` set in their front matter is undefined.

## Displaying Pages Exclusively in a Hugo Menu

Sometimes you want to hide pages from the page menu but instead want to show them in a Hugo menu. For that you have two choices

1. Create a [headless branch bundle](https://gohugo.io/content-management/page-bundles/#headless-bundle), `_index.md` in its own folder with the below front matter. The branch bundle will **not** be contained in the sitemap.

    {{< multiconfig fm=true file="content/showcase/_index.en.md" >}}
    title = 'Showcase'
    [_build]
      render = 'always'
      list = 'never'
      publishResources = true
    {{< /multiconfig >}}

2. Or, put a child page _inside_ a headless branch bundle with the following front matter in the bundle. This causes the child but not the branch bundle to be contained in the sitemap.

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
