+++
categories = ["howto"]
description = "How to keep older versions of your site"
options = ["disableVersionWarning", "version", "versionIndexURL", "versions"]
title = "Versioning"
weight = 3
+++

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} The theme offers a way to version your site. This is useful if you want to keep older versions of your site available while also providing links to the current version. Each site version needs to be created separately and is functional independent of each other.

A version switcher will be displayed at the top of the sidebar if versioning is configured. If the user selects a different version, the theme will navigate to the actual page location but in the selected version. If this page does not exist in the selected version, the 404 page will be displayed.

If you want to have more control, where the version switcher is positioned or you want to configure a different icon, see the [chapter on sidebar configuration](configuration/sidebar/menus#defining-sidebar-menus).

## Example: Versioning an Existing Site

Assume, you are writing a documentation for an app. At some point you are a releasing a new major version. This new version requires enhanced documentation while the older documentation must still be available for users of the older app version.

This is your intial `hugo.toml` file:

{{< multiconfig file=hugo >}}
baseURL = 'https://example.com/'
{{< /multiconfig >}}

To setup versioning, you have to do the following steps:

1. Prepare your old site for versioning.
    - add an array of all available `versions` to your `hugo.toml`
    - add information, which of these versions is the latest by setting the `isLatest` option on **one** item in the `versions` array
    - add information, which of these versions your site actually is, by setting the `version` option
    - change your `baseURL` to the version specific URL
      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/v1.0/'
      params = { version = 'v1.0', versions = [
        { identifier = 'v2.0', title = 'Latest', baseURL = 'https://example.com/', isLatest = true },
        { identifier = 'v1.0', title = 'v1.0', baseURL = 'https://example.com/v1.0/' }
      ]}
      {{< /multiconfig >}}
2. Generate your old site into the `baseURL` (in our case `https://example.com/v1.0/`)
3. Copy you Hugo project into a new directory
4. Make changes to the documentation for the new version
5. Prepare your new site for release.
    - leave the previously set array of available `versions` as is
    - change the information, which of the versions your site actually is, by setting the `version` option
    - change your `baseURL` back to the original URL
      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/'
      params = { version = 'v2.0', versions = [
        { identifier = 'v2.0', title = 'Latest', baseURL = 'https://example.com/', isLatest = true },
        { identifier = 'v1.0', title = 'v1.0', baseURL = 'https://example.com/v1.0/' }
      ]}
      {{< /multiconfig >}}
6. Generate your new site to the chosen location (in our case `https://example.com/`)

A few things to note here:

- `version` must be an `identifier` of one of the entries in the `versions` array
- you are not limited with the `baseURL`, these can be absolute or relative to your server root
- you can generate your old versions into the directory of the new version

## Example: Add New Versions to a Versioned Site

At some point, your version 2 of the app may be deprecated, too, as you've released a new version 3.

You only need to create two versions of your site, the former current one and the new current one.

1. Prepare your old site.
    - add the new version to the array of available `versions` in your `hugo.toml`
    - revise information, which of these versions is the latest by setting the `isLatest` option on **one** item in the `versions` array
    - change your `baseURL` to the version specific URL
      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/v2.0/'
      params = { version = 'v2.0', versions = [
        { identifier = 'v3.0', title = 'Latest', baseURL = 'https://example.com/', isLatest = true },
        { identifier = 'v2.0', title = 'v2.0', baseURL = 'https://example.com/v2.0/' },
        { identifier = 'v1.0', title = 'v1.0', baseURL = 'https://example.com/v1.0/' }
      ]}
      {{< /multiconfig >}}
2. Generate your old site into the `baseURL` (in our case `https://example.com/v2.0/`)
3. Copy you Hugo project into a new directory
4. Make changes to the documentation for the new version
5. Prepare your new site for release.
    - leave the previously set array of available `versions` as is
    - change the information, which of the versions your site actually is, by setting the `version` option
    - change your `baseURL` back to the original URL
      {{< multiconfig file=hugo >}}
      baseURL = 'https://example.com/'
      params = { version = 'v3.0', versions = [
        { identifier = 'v3.0', title = 'Latest', baseURL = 'https://example.com/', isLatest = true },
        { identifier = 'v2.0', title = 'v2.0', baseURL = 'https://example.com/v2.0/' },
        { identifier = 'v1.0', title = 'v1.0', baseURL = 'https://example.com/v1.0/' }
      ]}
      {{< /multiconfig >}}
6. Generate your new site to the chosen location (in our case `https://example.com/`)

A few things to note here:

- you **don't need to recreate version 1** of your site as long as the `baseURL` for the entry marked with `isLatest=true` hasn't changed. The old versions will access the version index of the latest site to display all available versions in the version switcher

## Hiding the Deprecation Warning

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If visitors navigate to an old version of your site, they will see a deprecation warning at the top of each page.

You can disable it be setting the `disableVersionWarning` option to `true` in your `hugo.toml`.

{{< multiconfig file=hugo >}}
[params]
  disableVersionWarning = true
{{< /multiconfig >}}

## Change URL of the Version Index

{{%badge style="cyan" icon="gears" title=" "%}}Option{{%/badge%}} The default URL for the version index can be changed with the `versionIndexURL` parameter

{{< multiconfig file=hugo >}}
[params]
  versionIndexURL = 'myversionindex.js'
{{< /multiconfig >}}

{{% notice note %}}
You only need to change these if you have other own content created for those URLs.

Check for duplicate URLs by running `hugo --printPathWarnings`.
{{% /notice %}}
