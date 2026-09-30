+++
aliases = '/shortcodes/tab'
categories = ['howto', 'reference']
description = 'Show content in tabbed views'
title = 'Tabs'
+++

The `tabs` shortcode displays arbitrary content in an unlimited number of tabs.

{{% multishortcode name="tabs" print="false" %}}
content:
  - title: "Python"
    content: "The AI native programming language."
  - title: "Bash"
    content: |
      ````bash
      echo "For guys who like to tinker."
      ````
  - title: "C"
    color: "fuchsia"
    content: "For the connoisseur of programming."
{{% /multishortcode %}}

## Usage

{{% multishortcode name="tabs" execute="false" %}}
content:
  - title: "Python Saying"
    content: "The AI native programming language."
  - title: "Terminal Sourcecode"
    content: |
      ```bash
      echo "For guys who like to tinker."
      ```
  - title: "C Ramblings"
    color: "fuchsia"
    content: "For the connoisseur of programming."
  - title: "C++ Ramblings++"
    color: "red"
    content: "For the guys that can cope with syntax."
  - title: "C# ~~GC is cool~~"
    content: "For guys that need two destructors."
{{% /multishortcode %}}

### Parameters

| Name                  | Default              | Notes       |
|-----------------------|----------------------|-------------|
| **groupid**           | _&lt;random&gt;_     | Arbitrary name of the group the tab view belongs to.<br><br>Tab views with the same **groupid** synchronize their selected tab. The tab selection is restored automatically based on the `groupid` for tab view. If the selected tab cannot be found in a tab group the first tab is selected instead.<br><br>This synchronization applies to the whole site! |
| **style**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [tab parameters](#tab-parameters) for possible values. |
| **color**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [tab parameters](#tab-parameters) for possible values. |
| **title**             | _&lt;empty&gt;_      | Arbitrary title written in front of the tab view. |
| **icon**              | _&lt;empty&gt;_      | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary number of tabs defined with the [`tab` sub-shortcode](#tab-parameters). |

### Tab Parameters

Each tab of the view is defined with the `tab` shortcode.

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **style**             | see notes       | The style scheme used for the tab. If you don't set a style and you display a single code block inside of the tab, its default styling will adapt to that of a `code` block. Otherwise `default` is used.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code`, `link`, `action`, `inline`<br><br>You can also [define your own styles](shortcodes/notice#defining-own-styles). |
| **color**             | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **title**             | see notes       | Arbitrary title for the tab. Depending on the **style** there may be a default title. Any given value will overwrite the default.<br><br>- for severity styles: the matching title for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no title for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| **icon**              | see notes       | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. Depending on the **style** there may be a default icon. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching icon for the severity<br>- for all other styles: _&lt;empty&gt;_<br><br>If you want no icon for a severity style, you have to set this parameter to `" "` (a non empty string filled with spaces) |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_ | Arbitrary text to be displayed in the tab. |

### Single Tab

If you just want a single tab, you can call the `tab` shortcode standalone, without the enclosing `tabs` shortcode.

{{% multishortcode name="tab" %}}
- title: "c"
  content: |
    ```c
    printf("Hello World!");
    ```
{{% /multishortcode %}}

If you want further options when using a single code tab, you can also use the [`highlight` shortcode](shortcodes/highlight).

## Examples

### Behavior of the `groupid`

See what happens to the tab views while you select different tabs.

While pressing a tab of Group A switches all tab views of Group A in sync (if the tab is available), the tabs of Group B are left untouched.

> [!note]
> The selected tab will be [stored in the reader's browser](configuration/sitemanagement/storedinformation).

#### Group A, Tabs 1

{{% multishortcode name="tabs" execute="false" %}}
groupid: "tab-example-a"
title: Group A, Tabs 1
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "_**XML**_"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
  - title: "Text"
    content: "    World"
{{% /multishortcode %}}

#### Group A, Tabs 2

{{% multishortcode name="tabs" execute="false" %}}
groupid: "tab-example-a"
title: Group A, Tabs 2
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "XML"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
{{% /multishortcode %}}

#### Group B

{{% multishortcode name="tabs" execute="false" %}}
groupid: "tab-example-b"
title: Group B
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "XML"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
{{% /multishortcode %}}

#### Rendered Example

{{% multishortcode name="tabs" print="false" %}}
groupid: "tab-example-a"
title: Group A, Tabs 1
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "_**XML**_"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
  - title: "Text"
    content: "    World"
{{% /multishortcode %}}

{{% multishortcode name="tabs" print="false" %}}
groupid: "tab-example-a"
title: Group A, Tabs 2
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "XML"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
{{% /multishortcode %}}

{{% multishortcode name="tabs" print="false" %}}
groupid: "tab-example-b"
title: Group B
content:
  - title: "JSON"
    content: |
      ```json
      { "Hello": "World" }
      ```
  - title: "XML"
    content: |
      ```xml
      <Hello>World</Hello>
      ```
{{% /multishortcode %}}

### Nested Tab Views and Color

In case you want to nest tab views, the parent tab that contains nested tab views needs to be declared with `{{</* tab */>}}` instead of `{{%/* tab */%}}`. Note, that in this case it is not possible to put markdown in the parent tab.

You can also set style and color parameter for all tabs and overwrite them on tab level. See the [tab parameters](#tab-parameters) for possible values.

{{% multishortcode name="tabs" execute="false" %}}
groupid: "main"
style: "primary"
title: "Rationale"
icon: "thumbtack"
content:
  - title: "Text"
    content: "Simple text is possible here..."
    multishortcode:
      name: "tabs"
      groupid: "tabs-example-language"
      content:
        - title: "python"
          content: |
            Python is **super** easy.

            - most of the time.
            - if you don't want to output unicode
        - title: "bash"
          content: "Bash is for **hackers**."
  - title: "Code"
    style: "default"
    color: "darkorchid"
    content: "...but no markdown"
    multishortcode:
      name: "tabs"
      groupid: "tabs-example-language"
      content:
        - title: "python"
          content: |
            ```python
            print("Hello World!")
            ```
        - title: "bash"
          content: |
            ```bash
            echo "Hello World!"
            ```
{{% /multishortcode %}}

{{% multishortcode name="tabs" print="false" %}}
groupid: "main"
style: "primary"
title: "Rationale"
icon: "thumbtack"
content:
  - title: "Text"
    content: "Simple text is possible here..."
    multishortcode:
      name: "tabs"
      groupid: "tabs-example-language"
      content:
        - title: "python"
          content: |
            Python is **super** easy.

            - most of the time.
            - if you don't want to output unicode
        - title: "bash"
          content: "Bash is for **hackers**."
  - title: "Code"
    style: "default"
    color: "darkorchid"
    content: "...but no markdown"
    multishortcode:
      name: "tabs"
      groupid: "tabs-example-language"
      content:
        - title: "python"
          content: |
            ```python
            print("Hello World!")
            ```
        - title: "bash"
          content: |
            ```bash
            echo "Hello World!"
            ```
{{% /multishortcode %}}

### Single Code Block with Collapsed Margins

{{% multishortcode name="tab" %}}
- title: "Code"
  content: |
    ```python
    printf("Hello World!");
    ```
{{% /multishortcode %}}

### Mixed Markdown Content

{{% multishortcode name="tab" %}}
- title: "_**Mixed**_"
  content: |
    A tab cannot only contain code but arbitrary text. In this case text **and** code will get a margin.
    ```python
    printf("Hello World!");
    ```
{{% /multishortcode %}}

### Understanding `style` and `color` Behavior

The `style` parameter affects how the `color` parameter is applied.

{{% multishortcode name="tabs" %}}
content:
  - title: "just colored style"
    style: "blue"
    content: |
      The `style` parameter is set to a color style.

      This will set the background to a lighter version of the chosen style color as configured in your theme variant.
  - title: "just color"
    color: "blue"
    content: |
      Only the `color` parameter is set.

      This will set the background to a lighter version of the chosen CSS color value.
  - title: "default style and color"
    style: "default"
    color: "blue"
    content: |
      The `style` parameter affects how the `color` parameter is applied.

      The `default` style will set the background to your `--MAIN-BG-color` as configured for your theme variant resembling the default style but with different color.
  - title: "just severity style"
    style: "info"
    content: |
      The `style` parameter is set to a severity style.

      This will set the background to a lighter version of the chosen style color as configured in your theme variant and also affects the chosen icon.
  - title: "severity style and color"
    style: "info"
    color: "blue"
    content: |
      The `style` parameter affects how the `color` parameter is applied.

      This will set the background to a lighter version of the chosen CSS color value and also affects the chosen icon.
{{% /multishortcode %}}
