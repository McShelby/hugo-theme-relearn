+++
categories = ['explanation', 'reference']
description = 'How to extend the topbar'
frontmatter = ['topbarend', 'topbarmore', 'topbarstart']
options = ['editURL', 'topbarend', 'topbarmore', 'topbarstart']
outputs = ['html', 'rss', 'print', 'markdown', 'source']
title = 'Topbar'
weight = 5
+++

The theme comes with a reasonably configured topbar. You can learn how to [configure the defaults in this section](authoring/frontmatter/topbar).

![topbar on mobile devices](topbar-closed.png)

Nevertheless, your requirements may differ from this configuration. Luckily, the theme has you covered as the topbar, its buttons, and the functionality behind these buttons are fully configurable by you.

{{% notice tip %}}
All mentioned file names below can be clicked and show you the implementation for a better understanding.
{{% /notice %}}

## Areas

The default configuration comes with three predefined areas that may contain an arbitrary set of buttons.

![topbar with default areas marked](topbar-areas.png)

- **start**: shown between menu and breadcrumb
- **end**: shown on the opposite breadcrumb side in comparison to the _start_ area
- **more**: shown when pressing the {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} _more_ button in the topbar

While you cannot add additional areas in the topbar, you are free to configure additional [area buttons](#area) that behave like the _more_ button, providing further user-defined areas.

## Buttons

The theme ships with the following predefined buttons (from left to right in the screenshot). Each is identified by its type:

- {{% button style="transparent" icon="bars" %}}{{% /button %}} [**sidebar**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/sidebar.html): opens the sidebar flyout if in mobile layout
- {{% button style="transparent" icon="table-list" %}}{{% /button %}} [**toc**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/toc.html): [opens the table of contents in an overlay](authoring/frontmatter/topbar#table-of-contents)
- {{% button style="transparent" icon="search" %}}{{% /button %}} [**search**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/search.html): the search box itself, shown if [configured to be in the topbar](configuration/sidebar/search#position-of-the-search-form); in mobile layout it collapses into a button opening the search box in an overlay
- {{% button style="transparent" icon="pen" %}}{{% /button %}} [**edit**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/edit.html): browses to the editable page if the `editURL` [parameter is set](authoring/frontmatter/topbar#edit-button)
- {{% button style="transparent" icon="code" %}}{{% /button %}} [**source**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/source.html): shows the page's source code if [source support](configuration/sitemanagement/outputformats#source-support) was activated
- {{% button style="transparent" icon="fa-fw fab fa-markdown" %}}{{% /button %}} [**markdown**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/markdown.html): shows the page's markdown source if [markdown support](configuration/sitemanagement/outputformats#markdown-support) was activated
- {{% button style="transparent" icon="print" %}}{{% /button %}} [**print**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/print.html): browses to the chapter's printable page if [print support](configuration/sitemanagement/outputformats#print-support) was activated
- {{% button style="transparent" icon="chevron-left" %}}{{% /button %}} [**prev**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/prev.html): browses to the [previous page](authoring/frontmatter/topbar#arrow-navigation) if there is one
- {{% button style="transparent" icon="chevron-right" %}}{{% /button %}} [**next**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/next.html): browses to the [next page](authoring/frontmatter/topbar#arrow-navigation) if there is one
- {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} [**more**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/more.html): opens the overlay for the _more_ area
- [**area**](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/area.html): opens the overlay for an area you define yourself, see [below](#area)

Not all buttons are displayed at every given time. This is configurable (see below if interested).

## Defining Topbar Buttons

{{% badge style="option" %}}Option{{% /badge %}} {{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The buttons are defined for each area of the topbar:

- `topbarstart`: the _start_ area
- `topbarend`: the _end_ area
- `topbarmore`: the _more_ area

As these options are arrays, you can define as many buttons as you like in each area. The buttons are displayed in the given order. Each button is identified by its `type` and may be given further parameters, depending on the button.

If you don't set these options in your `hugo.toml`, the theme defaults to the following configuration. The _more_ area is empty by default; some buttons are moved there depending on the screen width.

{{< multiconfig section=params >}}
topbarstart = [
  { type = 'sidebar' },
  { type = 'toc' }
]

topbarend = [
  { type = 'search' },
  { type = 'edit' },
  { type = 'source' },
  { type = 'markdown' },
  { type = 'print' },
  { type = 'prev' },
  { type = 'next' },
  { type = 'more' }
]

topbarmore = []
{{< /multiconfig >}}

> [!note]
> If you want to reconfigure an area, you have to copy over every button from the default configuration you want to keep, as reconfiguration will reset all buttons of that area.

### Example

The following example

- removes all buttons but the _more_ button from the _end_ area
- displays the _more_ button even if its overlay is empty by explicitly setting the `onempty` parameter, overriding the specific default value for this button (these defaults vary depending on the button)
- puts the _print_ button into the _more_ area on all screen widths

{{< multiconfig section=params >}}
topbarend = [
  { type = 'more', onempty = 'disable' }
]
topbarmore = [
  { type = 'print' }
]
{{< /multiconfig >}}

## Defining Own Buttons

Besides the predefined buttons, you can write your own. Store its template in `layouts/partials/topbar/button/<TYPE>.html` of your site and add it with `{ type = '<TYPE>' }` to one of the topbar areas.

Your template receives every parameter of its configuration, and additionally the displayed page as `page`. Use the [button](#button) function to display it.

````go {title="layouts/partials/topbar/button/home.html"}
{{- with .page }}
  {{- partial "topbar/func/button.html" (dict
    "page" .
    "class" "topbar-button-home"
    "href" (partial "permalink.gotmpl" (dict "to" site.Home))
    "icon" "home"
    "hint" "Home"
  )}}
{{- end }}
````

### Button Types

The theme distinguishes between two types of buttons:

- [**button**](#button): a clickable button that either browses to another site, triggers a user-defined script or opens an overlay containing user-defined content
- [**area-button**](#area-button): the template for the {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} _more_ button, to define your own area overlay buttons

### Button Parameter

#### Screen Widths and Actions

Depending on the screen width, you can configure how the button should behave. Screen width is divided into three classes:

- **s**: (controlled by the `onwidths` parameter) mobile layout where the menu sidebar is hidden
- **m**: (controlled by the `onwidthm` parameter) desktop layout with visible sidebar while the content area width still resizes
- **l**: (controlled by the `onwidthl` parameter) desktop layout with visible sidebar once the content area reached its maximum width

For each width class, you can configure one of the following actions:

- `show`: the button is displayed in its given area
- `hide`: the button is removed
- `area-XXX`: the button is moved from its given area into the area `XXX`; for example, this is used to move buttons to the _more_ area overlay in the mobile layout

#### Hiding and Disabling Stuff

While hiding a button depending on the screen size can be configured with the above-described _hide_ action, you may want to hide the button on certain other conditions as well.

For example, the _print_ button in its default configuration should only be displayed if print support was configured. This is done in your button template by checking the conditions first before displaying the button (see [`layouts/partials/topbar/button/print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/print.html)).

Another preferred condition for hiding a button is if the displayed overlay is empty. This is the case for the _toc_ (see [`layouts/partials/topbar/button/toc.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/toc.html)) as well as the _more_ button (see [`layouts/partials/topbar/button/more.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/more.html)) and controlled by the parameter `onempty`.

This parameter can have one of the following values:

- `disable`: the button is displayed in a disabled state if the overlay is empty
- `hide`: the button is removed if the overlay is empty

If you want to disable a button containing _no overlay_, this can be achieved by an empty `href` parameter. An example can be seen in the _prev_ button (see `layouts/partials/topbar/button/prev.html`) where the URL for the previous site may be empty.

## Reference

### Predefined Buttons

The predefined buttons by the theme (all other buttons besides the _more_, _toc_ and _area_ button).

The _&lt;varying&gt;_ parameter values are different for each button and configured for standard behavior as seen on this page.

| Name                  | Default           | Notes       |
|-----------------------|-------------------|-------------|
| **type**              | _&lt;empty&gt;_   | Mandatory name of the button. |
| **onwidths**          | _&lt;varying&gt;_ | The action that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its given area<br>- `hide`: The button is removed.<br>- `area-XXX`: The button is moved from its given area into the area `XXX`. |
| **onwidthm**          | _&lt;varying&gt;_ | See above. |
| **onwidthl**          | _&lt;varying&gt;_ | See above. |

### Predefined Overlay-Buttons

The predefined buttons by the theme that open an overlay (the _more_ and _toc_ button).

The _&lt;varying&gt;_ parameter values are different for each button and configured for standard behavior as seen on this page.

| Name                  | Default           | Notes       |
|-----------------------|-------------------|-------------|
| **type**              | _&lt;empty&gt;_   | Mandatory name of the button. |
| **onempty**           | `hide`            | Defines what to do with the button if the content overlay is empty:<br><br>- `disable`: The button is displayed in a disabled state.<br>- `hide`: The button is removed. |
| **onwidths**          | _&lt;varying&gt;_ | The action that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its given area<br>- `hide`: The button is removed.<br>- `area-XXX`: The button is moved from its given area into the area `XXX`. |
| **onwidthm**          | _&lt;varying&gt;_ | See above. |
| **onwidthl**          | _&lt;varying&gt;_ | See above. |

### Area

A button opening the overlay of an area you define yourself, like the _more_ button does for the _more_ area ([`layouts/partials/topbar/button/area.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/area.html)).

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **type**              | _&lt;empty&gt;_ | `area`, required |
| **identifier**        | _&lt;empty&gt;_ | Mandatory unique name for this area. Displaying two areas with the same value for **identifier** is undefined. Other buttons move into this area with the `area-<IDENTIFIER>` action. |
| **buttons**           | _&lt;empty&gt;_ | The buttons displayed in this area, configured the same way as the buttons of the topbar's areas. |
| **icon**              | _&lt;empty&gt;_ | [Font Awesome icon name](shortcodes/icon#finding-an-icon). |
| **onempty**           | `disable`       | Defines what to do with the button if the content overlay is empty:<br><br>- `disable`: The button is displayed in a disabled state.<br>- `hide`: The button is removed. |
| **onwidths**          | `show`          | The action that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its given area<br>- `hide`: The button is removed.<br>- `area-XXX`: The button is moved from its given area into the area `XXX`. |
| **onwidthm**          | `show`          | See above. |
| **onwidthl**          | `show`          | See above. |
| **hint**              | _&lt;empty&gt;_ | Arbitrary text displayed in the tooltip. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text for the button. |

### Button

Contains the basic button functionality and is used as a base implementation for all other buttons ([`layouts/partials/topbar/func/button.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/func/button.html)).

Call this from your own button templates if you want to implement a button without an overlay like the _print_ button ([`layouts/partials/topbar/button/print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/print.html)) or with an overlay containing arbitrary content like the _toc_ button ([`layouts/partials/topbar/button/toc.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/toc.html)).

For displaying an area in the button's overlay, see [Area-Button](#area-button).

#### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **class**             | _&lt;empty&gt;_ | Mandatory unique class name for this button. Displaying two buttons with the same value for **class** is undefined. |
| **href**              | _&lt;empty&gt;_ | Either the destination URL for the button or JavaScript code to be executed on click.<br><br>- If starting with `javascript:` all following text will be executed in your browser<br>- Every other string will be interpreted as URL<br>- If empty and no **action** is set, the button will be displayed in a disabled state regardless of its **content** |
| **action**            | _&lt;empty&gt;_ | Name of the action to execute on click, handled by a script instead of inline JavaScript, so it works with a strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). If set, **href** is not needed.<br><br>- `toggle-flyout`: shows or hides the content overlay<br>- `toggle-nav`: shows or hides the sidebar menu<br>- any other name: execute your own code, see the [button shortcode](shortcodes/button#button-with-own-action) |
| **icon**              | _&lt;empty&gt;_ | [Font Awesome icon name](shortcodes/icon#finding-an-icon). |
| **onempty**           | `disable`       | Defines what to do with the button if the content parameter was set but ends up empty:<br><br>- `disable`: The button is displayed in a disabled state.<br>- `hide`: The button is removed. |
| **onwidths**          | `show`          | The action that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its given area<br>- `hide`: The button is removed.<br>- `area-XXX`: The button is moved from its given area into the area `XXX`. |
| **onwidthm**          | `show`          | See above. |
| **onwidthl**          | `show`          | See above. |
| **hint**              | _&lt;empty&gt;_ | Arbitrary text displayed in the tooltip. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text for the button. |
| **content**           | _&lt;empty&gt;_ | Arbitrary HTML to put into the content overlay. This parameter may be empty. In this case, no overlay will be generated. |

### Area-Button

Contains the basic functionality to display area overlay buttons ([`layouts/partials/topbar/func/area-button.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/func/area-button.html)).

Call this from your own button templates if you want to implement a button with an area overlay like the _more_ button ([`layouts/partials/topbar/button/more.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/partials/topbar/button/more.html)). If you only need a different icon or title, configure an [area](#area) button instead.

#### Parameters

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **area**              | _&lt;empty&gt;_ | Mandatory unique area name for this area. Displaying two areas with the same value for **area** is undefined. |
| **buttons**           | _&lt;empty&gt;_ | The buttons displayed in this area, configured the same way as the buttons of the topbar's areas. |
| **icon**              | _&lt;empty&gt;_ | [Font Awesome icon name](shortcodes/icon#finding-an-icon). |
| **onempty**           | `disable`       | Defines what to do with the button if the content overlay is empty:<br><br>- `disable`: The button is displayed in a disabled state.<br>- `hide`: The button is removed. |
| **onwidths**          | `show`          | The action that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its given area<br>- `hide`: The button is removed.<br>- `area-XXX`: The button is moved from its given area into the area `XXX`. |
| **onwidthm**          | `show`          | See above. |
| **onwidthl**          | `show`          | See above. |
| **hint**              | _&lt;empty&gt;_ | Arbitrary text displayed in the tooltip. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text for the button. |
