+++
description = "Configuring titles and breadcrumbs to your needs"
options = ["breadcrumbSeparator", "disableRootBreadcrumb", "disableTermBreadcrumbs", "titleSeparator"]
title = "Titles & Breadcrumbs"
weight = 2
+++

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableRootBreadcrumb=true` to remove the root breadcrumb which often feels redundant. This will also apply to the breadcrumbs of the search results and taxonomy pages.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Further, you can override the breadcrumb separator by using `breadcrumbSeparator='/'`. This separator will also be used in the breadcrumbs of the search results and taxonomy pages.

{{< multiconfig file=hugo >}}
[params]
  disableRootBreadcrumb = true
  breadcrumbSeparator = '/'
{{< /multiconfig >}}
