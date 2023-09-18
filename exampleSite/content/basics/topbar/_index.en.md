+++
title = "Topbar Modification"
weight = 27
+++

The theme comes with a reasonably configured topbar.

![Topbar on mobile devices](topbar-closed.png)

Nevertheless, your requirements may differ from this configuration. Luckily the theme got you covered as the themebar, its buttons and the functionality behind these buttons is fully configurable by you.

## Areas

The default configuration comes with three predefined areas that may contain an arbitrary set of buttons.

![Topbar with default areas marked](topbar-areas.png)

- **start**: shown between menu and breadcrumb
- **end**: shown on the opposite breadcrumb side in comparison to the _start_ area
- **more**: shown when pressing the {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} _more_ button in the topbar

While you can not add additional areas in the topbar, you are free to configure addtional buttons that behave like the _more_ button, providing further user defined areas.

## Buttons

The theme ships with the following predefined buttons (from left to right in the screenshot)

- {{% button style="transparent" icon="bars" %}}{{% /button %}} **sidebar**: opens the sidebar flyout if in mobile layout
- {{% button style="transparent" icon="list-alt" %}}{{% /button %}} **toc**: opens the table of contents in an overlay
- {{% button style="transparent" icon="pen" %}}{{% /button %}} **edit**: browses to the editable page if the `editURL` [parameter is set]({{% relref "/basics/configuration/#global-site-parameters" %}})
- {{% button style="transparent" icon="print" %}}{{% /button %}} **print**: browses to the chapters printable page if [print support]({{% relref "/basics/configuration/#activate-print-support" %}}) was activated
- {{% button style="transparent" icon="chevron-left" %}}{{% /button %}} **prev**: browses to the previous page if there is one
- {{% button style="transparent" icon="chevron-right" %}}{{% /button %}} **next**: browses to the next page if there is one
- {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} **more**: opens the overlay for the _more_ area

Not all buttons are displayed at every given time. This is configurable (see below if interested).

## Redefining Areas

Each predefined area and button comes in their own file. By that it is easy for you to overwrite an area file in your installation reusing only the buttons you like.

Eg. you can redefine the predefined _end_ area by adding the file `layouts/partials/topbar/area/end.html` in your installtion (not in the theme itself) to remove all but the _more_ button.

````go
{{ partial "topbar/button/more.html" (dict
    "page" .
)}}
````

## Defining own Buttons

### Button Types

The theme distingushies between two types of buttons:

- **button**: a clickable button that either browses to another site or triggers a user defined script
- **area-button**: the template for the {{% button style="transparent" icon="ellipsis-v" %}}{{% /button %}} _more_ button, to define your own area overlay buttons

### Button Parameter

#### Screen Widths and Actions

Depending on the screen width you can configure how the button should behave. Screen width is divided into three classes:

- **s**: (controlled by the `onwidths` parameter) mobile layout where the menu sidebar is hidden
- **m**: (controlled by the `onwidthm` parameter) desktop layout with visible sidebar while the content area width still resizes
- **l**: (controlled by the `onwidthl` parameter) desktop layout with visible sidebar once the content area reached its maximum width

For each width class, you can configure one of the following actions:

- **show**: the button is displayed in its configured area
- **hide**: the button is hidden
- **area-XXX**: the button is moved from its configured area into the area `XXX`; eg. this is used to move buttons to the _more_ area in the mobile layout

#### Hiding and Disabling Stuff

While hiding a button dependend on the screen size can be configured with the above described _hide_ action, you may want to hide the button on certain other conditions aswell.

For example, the _print_ button in its default configuration should only be displayed if print support was configured. This is done in your button template by checking the conditions first before displaying the button (see `layouts/partials/topbar/button/print.html`).

Another prefered condition for hiding a button is, if the displayed overlay is empty. This is the case for the _toc_ (see `layouts/partials/topbar/button/toc.html`) aswell as the _more_ button (see `layouts/partials/topbar/button/more.html`) and controlled by the parameter `onempty`.

This parameter can have one of the following values:

- **hide**: the button is hidden if the overlay is empty
- **disable**: the button is disabled if the overlay is empty

If you want to disable a button containing _no overlay_, this can be achieved by an empty `href` parameter. An example can be seen in the _prev_ button (see `layouts/partials/topbar/button/prev.html`) where the URL for the previous site may be empty.

## Reference

### Button

Contains the basic button functionality and is used as a base implementation for all other buttons (`layouts/partials/topbar/func/button.html`). Call this from your own button templates if you want to implement a button with _no overlay_ area.

#### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **class**             | _&lt;empty&gt;_ | Mandatory unique class name for this button. Displaying two buttons with the same value for **class** is undefined. |
| **href**              | _&lt;empty&gt;_ | Either the destination URL for the button or JavaScript code to be executed on click.<br><br>- if starting with `javascript:` all following text will be executed in your browser<br>- every other string will be interpreted as URL<br><br>If this parameter is not set, the button will be displayed<br><br>- as disabled if no **content** is specified<br>- according to **onempty** if any **content** is given. |
| **icon**              | _&lt;empty&gt;_ | Mandatory [Font Awesome icon name]({{%relref "shortcodes/icon#finding-an-icon" %}}). |
| **onempty**           | `disable`       | Defines what to do with the button if its content overlay is empty:<br><br>- `disable`: The button is displayed in disabled state.<br>- `hide`: The button is not displayed. The next button will move into the gap. |
| **onwidths**          | `show`          | The action, that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its configured area<br>- `hide`: The button is hidden.<br>- `area-XXX`: The button is moved from its configured area into the area `XXX`. |
| **onwidthm**          | `show`          | See above. |
| **onwidthl**          | `show`          | See above. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text for title, displayed in the tooltip. |
| **content**           | see notes       | Arbitrary HTML to put into the content overlay. This parameter may be empty. In this case no overlay will be generated. |

### Area-Button

Contains the basic functionality to display area overlay buttons (`layouts/partials/topbar/func/area-button.html`). Call this from your own button templates if you want to implement a button with an overlay area like the _more_ button.

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **area**              | _&lt;empty&gt;_ | Mandatory unique area name for this area. Displaying two areas with the same value for **area** is undefined. |
| **icon**              | _&lt;empty&gt;_ | Mandatory [Font Awesome icon name]({{%relref "shortcodes/icon#finding-an-icon" %}}). |
| **onempty**           | `disable`       | Defines what to do with the button if its content overlay is empty:<br><br>- `disable`: The button is displayed in disabled state.<br>- `hide`: The button is not displayed. The next button will move into the gap. |
| **onwidths**          | `show`          | The action, that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its configured area<br>- `hide`: The button is hidden.<br>- `area-XXX`: The button is moved from its configured area into the area `XXX`. |
| **onwidthm**          | `show`          | See above. |
| **onwidthl**          | `show`          | See above. |
| **title**             | _&lt;empty&gt;_ | Arbitrary text for title, displayed in the tooltip. |

### Predefined Buttons

The predefined buttons by the theme (all other buttons besides the _more_ and _toc_ button in `layouts/partials/topbar/button`). Call these from your own redefined area templates if you want to offer some of the default button behavior.

| Name                  | Default           | Notes       |
|-----------------------|-------------------|-------------|
| **page**              | _&lt;empty&gt;_   | Mandatory reference to the page. |
| **onwidths**          | _&lt;varying&gt;_ | The action, that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its configured area<br>- `hide_&lt;varying&gt;_ is hidden.<br>- `area-XXX`: The button is moved from its configured area into the area `XXX`. |
| **onwidthm**          | _&lt;varying&gt;_ | See above. |
| **onwidthl**          | _&lt;varying&gt;_ | See above. |

### Predefined Overlay-Buttons

The predefined buttons by the theme that open an overlay (the _more_ and _toc_ button in `layouts/partials/topbar/button`). Call these from your own redefined area templates if you want to offer some of the default area button behavior.

| Name                  | Default           | Notes       |
|-----------------------|-------------------|-------------|
| **page**              | _&lt;empty&gt;_   | Mandatory reference to the page. |
| **onempty**           | _&lt;varying&gt;_ | Defines what to do with the button if its content overlay is empty:<br><br>- `disable`: The button is displayed in disabled state.<br>- `hide`: The button is not displayed. The next button will move into the gap. |
| **onwidths**          | _&lt;varying&gt;_ | The action, that should be executed if the site is displayed in the given width:<br><br>- `show`: The button is displayed in its configured area<br>- `hide`: The button is hidden.<br>- `area-XXX`: The button is moved from its configured area into the area `XXX`. |
| **onwidthm**          | _&lt;varying&gt;_ | See above. |
| **onwidthl**          | _&lt;varying&gt;_ | See above. |
