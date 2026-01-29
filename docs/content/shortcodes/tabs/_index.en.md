+++
categories = ['howto', 'reference']
description = 'Show content in tabbed views'
title = 'Tabs'
+++

The `tabs` shortcode displays arbitrary content in an unlimited number of tabs.

{{% multishortcode name="tabs" print="false" %}}
content:
  - title: "Python Saying"
    content: "The AI native programming language."
  - title: "Terminal Sourcecode"
    content: |
      ````bash
      echo "For guys who like to tinker."
      ````
  - title: "C Ramblings"
    color: "fuchsia"
    content: "For the connoisseur of programming."
  - title: "C++ Ramblings++"
    color: "red"
    content: "For the guys that can cope with syntax."
  - title: "C# ~~GC is cool~~"
    content: "For guys that need two destructors."
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

If you just want a single tab you can instead call the [`tab` shortcode](shortcodes/tab) standalone.

Also follow the above link to see the parameter for each nested tab.

### Parameters

| Name                  | Default              | Notes       |
|-----------------------|----------------------|-------------|
| **groupid**           | _&lt;random&gt;_     | Arbitrary name of the group the tab view belongs to.<br><br>Tab views with the same **groupid** synchronize their selected tab. The tab selection is restored automatically based on the `groupid` for tab view. If the selected tab cannot be found in a tab group the first tab is selected instead.<br><br>This synchronization applies to the whole site! |
| **style**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [`tab` shortcode](shortcodes/tab#parameters) for possible values. |
| **color**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [`tab` shortcode](shortcodes/tab#parameters) for possible values. |
| **title**             | _&lt;empty&gt;_      | Arbitrary title written in front of the tab view. |
| **icon**              | _&lt;empty&gt;_      | [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the title. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary number of tabs defined with the `tab` sub-shortcode. |

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

You can also set style and color parameter for all tabs and overwrite them on tab level. See the [`tab` shortcode](shortcodes/tab#parameters) for possible values.

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
