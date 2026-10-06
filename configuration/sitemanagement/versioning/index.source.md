+++
categories = ['howto']
description = 'How to keep older versions of your site'
options = ['disableVersioningWarning']
title = 'Versioning'
weight = 3
+++

The theme supports [Hugo's versions](https://gohugo.io/configuration/versions/) of your site. This is useful if you want to keep older versions of your site available while also providing links to the current version. All versions are generated together in one build of your project.

A version switcher will be displayed at the top of the sidebar if more than one version is configured. If the user selects a different version, the theme will navigate to the same page in the selected version. If this page does not exist in the selected version, the home page of that version will be displayed.

If you want to have more control, where the version switcher is positioned or you want to configure a different icon, see the [chapter on sidebar configuration](configuration/sidebar/menus#defining-sidebar-menus).

## Example: Versioning an Existing Nonversioned Site

Assume, you have written a documentation for an app. At some point you are a releasing a new major version. This new version requires enhanced documentation while the older documentation must still be available for users of the older app version.

Your content resides in the directory `content` of your project. The current URL of your site (the value set in `baseURL` in your `hugo.toml`) is `https://example.com/`. When done, the URL of the latest version of your site should not change. The archived version of your site should be available at the URL `https://example.com/v1.0.0/`.

To setup versioning, you have to do the following steps:

1. Copy the directory `content` to a new directory `content-v1.0.0` for the archived version
2. Prepare your `hugo.toml` for versioning.
    - add all available `versions`
    - add information, which of these versions is the latest by setting `defaultContentVersion` (here to `v2.0.0`)
    - mount each content directory to the version it belongs to

    After the modifications the config file looks like:

      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/'
      defaultContentVersion = 'v2.0.0'

      [versions]
        [versions.'v2.0.0']
        [versions.'v1.0.0']

      [[module.mounts]]
        source = 'content-v1.0.0'
        target = 'content'
        [module.mounts.sites.matrix]
          versions = ['v1.0.0']
      [[module.mounts]]
        source = 'content'
        target = 'content'
        [module.mounts.sites.matrix]
          versions = ['v2.0.0']
      {{< /multiconfig >}}
3. Generate your site and deploy the resulting directory to `baseURL` as before
4. Now you're ready to edit the content of your current version and proceed with your usual workflow.

**A few things to note here:**

- the version switcher shows the names of your versions as they are configured
- the default version is generated to the root of your site, all other versions into a subdirectory named like the version; set Hugo's `defaultContentVersionInSubdir=true` if you want the default version in a subdirectory, too
- once you define a mount, Hugo no longer applies its default mounts for that component; if your project has further mounts, keep them in the list
- only content, layouts and static files can be mounted for a version; everything else, like your configuration and the theme, is shared by all versions
- the source of a mount is not limited to your project and can also be a directory of a different checkout of your version control system
- for a multilingual site, no further configuration is necessary; each version is generated for each language
- copying the whole content is the easiest way but not necessary; you can also [store only what has changed](#example-storing-only-what-has-changed)

See Hugo's documentation for the [version configuration](https://gohugo.io/configuration/versions/) and the [mount configuration](https://gohugo.io/configuration/module/#mounts) for all available settings.

## Example: Add a New Version to a Versioned Site

At some point, your version 2 of the app may be deprecated, too, as you've released a new version 3.

1. Copy the directory `content` to a new directory `content-v2.0.0` for the new archived version
2. Add the new version to your `hugo.toml`
    - add the new version to the `versions`
    - change `defaultContentVersion` to the new version (here to `v3.0.0`)
    - change the mount of `content` to the new version and add a mount for the new archived version

    After the modifications the config file looks like:

      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/'
      defaultContentVersion = 'v3.0.0'

      [versions]
        [versions.'v3.0.0']
        [versions.'v2.0.0']
        [versions.'v1.0.0']

      [[module.mounts]]
        source = 'content-v1.0.0'
        target = 'content'
        [module.mounts.sites.matrix]
          versions = ['v1.0.0']
      [[module.mounts]]
        source = 'content-v2.0.0'
        target = 'content'
        [module.mounts.sites.matrix]
          versions = ['v2.0.0']
      [[module.mounts]]
        source = 'content'
        target = 'content'
        [module.mounts.sites.matrix]
          versions = ['v3.0.0']
      {{< /multiconfig >}}
3. Generate your site and deploy the resulting directory to `baseURL`

## Example: Storing Only What Has Changed

Copying the whole content for each archived version is the easiest way to start, but most pages usually don't differ between two versions. Instead, an archived version can share the content of the current version and store only the pages that are different.

To stay with the first example, the directory `content-v1.0.0` then only contains

- the pages that have changed since, in the state they had in version 1
- the pages that were removed since

The configuration is the same, with one further mount at the end that adds the shared content to the archived version. The added lines are highlighted:

{{< multiconfig file=hugo >}}
baseURL = 'https://example.com/'
defaultContentVersion = 'v2.0.0'

[versions]
  [versions.'v2.0.0']
  [versions.'v1.0.0']

[[module.mounts]]
  source = 'content-v1.0.0'
  target = 'content'
  [module.mounts.sites.matrix]
    versions = ['v1.0.0']
[[module.mounts]]
  source = 'content'
  target = 'content'
  [module.mounts.sites.matrix]
    versions = ['v2.0.0']
# <mark>
[[module.mounts]]
  source = 'content'
  target = 'content'
  files = ['! whats-new-in-v2/**']
  [module.mounts.sites.matrix]
    versions = ['v1.0.0']
# </mark>
{{< /multiconfig >}}

**A few things to note here:**

- if two mounts of a version contain the same file, the mount listed first is used; this is why the mount of `content-v1.0.0` comes before the mounts of `content` in the examples
- the pages that were added after version 1 would show up in the archived version as well; leave them out with the `files` option of the shared mount
- a shared page that links to a page not available in the archived version will cause a warning during the build; store a copy of the shared page in `content-v1.0.0` and adjust its link
- with each further archived version, an older version can be put together from its own directory, followed by the directories of the newer archived versions, followed by `content`

## Moved Pages

If a page moved between two versions, the version switcher can not find it by its path. Add the former path to the [`aliases`](https://gohugo.io/content-management/urls/#aliases) front matter of the page in the newer version, which you may have done anyway to keep old links working.

{{< multiconfig fm=true file="content/publishing/gdpr/_index.md" >}}
aliases = '/sitemanagement/gdpr'
{{< /multiconfig >}}

The version switcher then navigates between both pages in either direction. If a page moves again, add the further path and keep the former ones.

A page at the same path always takes precedence over a page found by an alias.

## Linking to Other Versions

Your content can [link to a page of another version](authoring/linking/pages#links-to-other-page-versions) by giving the query parameter `version`, containing the name of the version, e.g. `[some archived page](my-page?version=v1.0.0)`.

Unlike the version switcher, such a link does not follow aliases. The page has to exist in the given version under the path you link to.

## Hiding the Versioning Warning

{{% badge style="option" %}}Option{{% /badge %}} If visitors navigate to an archived version of your site, they will see a versioning warning at the top of each page.

You can disable it be setting the `disableVersioningWarning` option to `true` in your `hugo.toml`.

{{< multiconfig file=hugo section=params >}}
disableVersioningWarning = true
{{< /multiconfig >}}

## Adjusting the Versioning Warning

### Method 1

You can adjust the text of the versioning warning by overriding the key `Versioning-warning` in your i18n files.

The following parameters are available to be included in the text:

- `pageVersion` - the displayed page's version
- `pageUrl` - the URL of the displayed page
- `latestVersion` - the default version
- `latestUrl` - the URL of the displayed page in the default version, or of its home page if the page does not exist there

A version has the following fields:

- `identifier` - the name of the version
- `title` - the text shown in the version switcher
- `baseURL` - the URL of the home page of the version

### Method 2

You can override `layouts/partials/versioning-warning.html`. This is called once a version conflict was recognized. So the only thing for you to do is writing the message.

The following parameters are available in this partial:

- `page` - the current [Page](https://gohugo.io/methods/page/)
- `pageVersion` - the displayed page's version
- `pageUrl` - the URL of the displayed page
- `latestVersion` - the default version
- `latestUrl` - the URL of the displayed page in the default version, or of its home page if the page does not exist there

## Migration for Relearn 9

Previously, versions were configured with the theme's options `versions`, `version` and `versionIndexURL`. Each version was a separate project that had to be generated and deployed on its own, and an archived version asked the latest version for the list of available versions when a page was displayed.

Your configuration is still honored as long as your project has not more than one of Hugo's versions configured, but your build will give you a deprecation warning. Start to migrate early, as this will be removed with the next major update of the theme.

To migrate

- bring the content of your separate projects into one project and mount it as shown in the [example above](#example-versioning-an-existing-nonversioned-site)
- name Hugo's `versions` in a way that the subdirectories of your archived versions stay the same, so links from other sites into your archived versions don't break
- remove `versions`, `version` and `versionIndexURL` from the `params` of your `hugo.toml`
- deploy all versions from the one build and stop deploying your archived versions separately
