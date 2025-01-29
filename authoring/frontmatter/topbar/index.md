# Topbar

This page is about how to configure the topbar using configuration options. If you want to add further buttons or functionality, [see this section](configuration/customization/topbar).

Your topbar contains the following elements. Some of them are configuarable:

- {{% button style=&#34;transparent&#34; icon=&#34;bars&#34; %}}{{% /button %}} **sidebar**: opens the sidebar flyout if in mobile layout
- {{% button style=&#34;transparent&#34; icon=&#34;list-alt&#34; %}}{{% /button %}} **toc**: [opens the table of contents in an overlay](#table-of-contents)
- {{% button style=&#34;transparent&#34; icon=&#34;empty&#34; %}}{{% /button %}} **breadcrumb**: shows the clickable [breadcrumbs](#breadcrumbs)
- {{% button style=&#34;transparent&#34; icon=&#34;pen&#34; %}}{{% /button %}} **edit**: browses to the editable page if the `editURL` [parameter is set](#edit-button)
- {{% button style=&#34;transparent&#34; icon=&#34;file-code&#34; %}}{{% /button %}} **source**: browses to the [chapters source code](#source-button) if [source support](configuration/sitemanagement/outputformats#source-support) was activated
- {{% button style=&#34;transparent&#34; icon=&#34;fa-fw fab fa-markdown&#34; %}}{{% /button %}} **markdown**: browses to the [chapters Markdown source](#markdown-button) if [markdown support](configuration/sitemanagement/outputformats#markdown-support) was activated
- {{% button style=&#34;transparent&#34; icon=&#34;print&#34; %}}{{% /button %}} **print**: browses to the [chapters printable page](#print-button) if [print support](configuration/sitemanagement/outputformats#print-support) was activated
- {{% button style=&#34;transparent&#34; icon=&#34;chevron-left&#34; %}}{{% /button %}} **prev**: browses to the [previous page](#arrow-navigation) if there is one
- {{% button style=&#34;transparent&#34; icon=&#34;chevron-right&#34; %}}{{% /button %}} **next**: browses to the [next page](#arrow-navigation) if there is one
- {{% button style=&#34;transparent&#34; icon=&#34;ellipsis-v&#34; %}}{{% /button %}} **more**: opens the overlay if screen space is limited

## Table of Contents

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} Set `disableToc=true` to hide the TOC button on all pages. If the button is hidden, also the keyboard shortcut is disabled. This can be overridden in a page&#39;s front matter.

{{&lt; multiconfig &gt;}}
disableToc = true
{{&lt; /multiconfig &gt;}}

## Breadcrumbs

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} Set `disableBreadcrumb=true` to hide the breadcrumb in the topbar.

Further breadcrumbs settings can be found in the [content configuration section](configuration/content/titles).

{{&lt; multiconfig &gt;}}
disableBreadcrumb = true
{{&lt; /multiconfig &gt;}}

## Edit Button

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} If `editURL` is set to a URL, an edit button will be shown in the topbar. If the button is hidden, also the keyboard shortcut is disabled.

The value can contain the macro `${FilePath}` which will be replaced by the file path of your displayed page. If no `${FilePath}` is given in the value, the value is treated as if the `${FilePath}` was appended at the end of the value. This can be overridden in the pages front matter.

{{&lt; multiconfig &gt;}}
editURL = &#39;https://github.com/McShelby/hugo-theme-relearn/edit/main/exampleSite/content/${FilePath}&#39;
{{&lt; /multiconfig &gt;}}

## Markdown Button

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} You can hide the Markdown button if the [Markdown output format](configuration/sitemanagement/outputformats/#markdown-support) is active by setting `disableMarkdownButton=true`.

{{&lt; multiconfig &gt;}}
disableMarkdownButton = true
{{&lt; /multiconfig &gt;}}

## Source Button

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} You can hide the Source button if the [Source output format](configuration/sitemanagement/outputformats/#source-support) is active by setting `disableSourceButton=true`.

{{&lt; multiconfig &gt;}}
disableSourceButton = true
{{&lt; /multiconfig &gt;}}

## Print Button

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} You can hide the print button if the [print output format](configuration/sitemanagement/outputformats/#print-support) is active by setting `disablePrintButton=true`.

{{&lt; multiconfig &gt;}}
disablePrintButton = true
{{&lt; /multiconfig &gt;}}

## Arrow Navigation

{{% badge style=&#34;cyan&#34; icon=&#34;gears&#34; title=&#34; &#34; %}}Option{{% /badge %}} {{% badge style=&#34;green&#34; icon=&#34;fa-fw fab fa-markdown&#34; title=&#34; &#34; %}}Front Matter{{% /badge %}} You can hide the previous/next buttons by setting `disableNextPrev=true`. If the buttons are hidden, also the keyboard shortcuts are disabled.

{{&lt; multiconfig &gt;}}
disableNextPrev = true
{{&lt; /multiconfig &gt;}}
