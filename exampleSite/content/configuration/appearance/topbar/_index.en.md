+++
description = "Configure the site's topbar"
options = ["breadcrumbSeparator", "disableBreadcrumb", "disableNextPrev", "disableRootBreadcrumb", "disableToc", "editURL"]
title = "Topbar"
weight = 2
+++

This page is about how to configure the topbar using configuration options. If you want to add further buttons or functionality, [see this section](configuration/modifications/topbar).

Your topbar contains the following elements. Some of them are configuarable:

- {{% button style="transparent" icon="bars" %}}{{% /button %}} **sidebar**: opens the sidebar flyout if in mobile layout
- {{% button style="transparent" icon="list-alt" %}}{{% /button %}} **toc**: [opens the table of contents in an overlay](#table-of-contents)
- {{% button style="transparent" icon="empty" %}}{{% /button %}} **breadcrumb**: shows the clickable [breadcrumbs](#breadcrumbs)
- {{% button style="transparent" icon="pen" %}}{{% /button %}} **edit**: browses to the editable page if the `editURL` [parameter is set](#edit-button)
- {{% button style="transparent" icon="print" %}}{{% /button %}} **print**: browses to the chapters printable page if [print support](#print-support) was activated
- {{% button style="transparent" icon="chevron-left" %}}{{% /button %}} **prev**: browses to the [previous page](#arrow-navigation) if there is one
- {{% button style="transparent" icon="chevron-right" %}}{{% /button %}} **next**: browses to the [next page](#arrow-navigation) if there is one
- {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} **more**: opens the overlay if screen space is limited


## Table of Contents

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableToc=true` to hide the TOC button on all pages. If the button is hidden, also the keyboard shortcut is disabled. This can be overridden in a page's front matter.

{{< multiconfig file=hugo >}}
[params]
  disableToc = true
{{< /multiconfig >}}

## Breadcrumbs

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableBreadcrumb=true` to hide the breadcrumb in the topbar.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableRootBreadcrumb=true` to remove the root breadcrumb which often feels redundant. This will also apply to the breadcrumbs of the search results and taxonomy pages.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Further, you can override the breadcrumb separator by using `breadcrumbSeparator='/'`. This separator will also be used in the breadcrumbs of the search results and taxonomy pages.

{{< multiconfig file=hugo >}}
[params]
  disableBreadcrumb = true
  disableRootBreadcrumb = true
  breadcrumbSeparator = '/'
{{< /multiconfig >}}

## Edit Button

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If `editURL` is set to a URL, an edit button will be shown in the topbar. If the button is hidden, also the keyboard shortcut is disabled.

The value can contain the macro `${FilePath}` which will be replaced by the file path of your displayed page. If no `${FilePath}` is given in the value, the value is treated as if the `${FilePath}` was appended at the end of the value. This can be overridden in the pages front matter.

{{< multiconfig file=hugo >}}
[params]
  editURL = 'https://github.com/McShelby/hugo-theme-relearn/edit/main/exampleSite/content/${FilePath}'
{{< /multiconfig >}}

## Print Support

If you have [activated print support](configuration/sitemanagement/outputformats#print-support), a printer icon will be displayed to access the print preview.

## Arrow Navigation

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} You can hide the previous/next buttons by setting `disableNextPrev=true`. If the buttons are hidden, also the keyboard shortcuts are disabled.

{{< multiconfig file=hugo >}}
[params]
  disableNextPrev = true
{{< /multiconfig >}}
