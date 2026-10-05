+++
categories = ['explanation']
description = 'How to link to pages and resources'
title = 'Pages & Resources'
weight = 1
+++

## Standard Links

The usual way to link to a page or a resource is to use a Markdown link in the form of `[some page](a-page)` or `![some image](an-image)`.

Images are searched in the resources of the current page and your global `assets` directory.

## Links to Other Page Translations

By giving the query parameter `lang`, containing the language code, you can link to pages of other translations of your site, e.g. `[some translated page](my-page?lang=pir)`.

## Links to Other Page Versions

If your site is [versioned](configuration/sitemanagement/versioning), you can link to pages of other versions by giving the query parameter `version`, containing the name of the version, e.g. `[some archived page](my-page?version=v1.0.0)`.

The page is searched in the given version, so it has to exist there under the path you link to.

You can combine it with the `lang` query parameter, e.g. `[some archived translated page](my-page?lang=pir&version=v1.0.0)`.

## Links to Other Page Output Formats

You can link to different output formats of a page by adding the query parameter `format`. For example to link to the print format of a page, write `[a printable page](my-page?format=print)`.
