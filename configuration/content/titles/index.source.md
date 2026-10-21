---
categories:
- howto
description: Configuring titles and breadcrumbs to your needs
options:
- breadcrumbSeparator
- disableRootBreadcrumb
- disableTermBreadcrumbs
- titleSeparator
title: Titles & Breadcrumbs
weight: 2
---

## Breadcrumbs

Learn how to turn off the breadcrumbs completely and further [configure the topbar](authoring/frontmatter/topbar).

{{% badge style="option" %}}Option{{% /badge %}} Set `disableRootBreadcrumb` to `true` to remove the root breadcrumb which often feels redundant. This will also apply to the breadcrumbs of the search results and taxonomy pages.

{{% badge style="option" %}}Option{{% /badge %}} You can override the default breadcrumb separator by setting `breadcrumbSeparator` to `/`. This separator will also be used in the breadcrumbs of the search results and taxonomy pages.

{{% badge style="option" %}}Option{{% /badge %}} By default the term pages of a taxonomy will display the breadcrumb for each page. Set `disableTermBreadcrumbs` to `true` to remove the breadcrumb if the term pages look to cluttered.

{{< multiconfig file=hugo section=params >}}
disableRootBreadcrumb = true
breadcrumbSeparator = '/'
disableTermBreadcrumbs = true
{{< /multiconfig >}}

## Titles

{{% badge style="option" %}}Option{{% /badge %}} You can override the default title separator by setting `titleSeparator` to `|`.

{{< multiconfig file=hugo section=params >}}
titleSeparator = '|'
{{< /multiconfig >}}
