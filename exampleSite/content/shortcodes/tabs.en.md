+++
description = "Show content in tabbed views"
title = "Tabs"
+++

The `tabs` shortcode displays arbitrary content in an unlimited number of tabs.

This comes in handy eg. for providing code snippets for multiple languages.

If you just want a single tab you can instead call the [`tab` shortcode]({{% relref "shortcodes/tab" %}}) standalone.

{{< tabs title="hello." >}}
{{% tab title="py" %}}

```python
print("Hello World!")
```

{{% /tab %}}
{{% tab title="sh" %}}

```bash
echo "Hello World!"
```

{{% /tab %}}
{{% tab title="c" %}}

```c
printf("Hello World!");
```

{{% /tab %}}
{{< /tabs >}}

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

See the [`tab` shortcode]({{% relref "shortcodes/tab" %}}) for a description of the parameter for nested tabs.

{{< tabs groupid="shortcode-parameter">}}
{{% tab title="shortcode" %}}

````go
{{</* tabs title="hello." */>}}
{{%/* tab title="py" */%}}
```python
print("Hello World!")
```
{{%/* /tab */%}}
{{%/* tab title="sh" */%}}
```bash
echo "Hello World!"
```
{{%/* /tab */%}}
{{%/* tab title="c" */%}}
```c
printf"Hello World!");
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{% /tab %}}
{{% tab title="partial" %}}

````go
{{ partial "shortcodes/tabs.html" (dict
  "context" .
  "title" "hello."
  "content" (slice
    (dict
      "title" "py"
      "content" ("```python\nprint(\"Hello World!\")\n```" | .RenderString)
    )
    (dict
      "title" "sh"
      "content" ("```bash\necho \"Hello World!\"\n```" | .RenderString)
    )
    (dict
      "title" "c"
      "content" ("```c\nprintf(\"Hello World!\");\n```" | .RenderString)
    )
  )
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                  | Default              | Notes       |
|:----------------------|:---------------------|:------------|
| **groupid**           | _&lt;random&gt;_     | Arbitrary name of the group the tab view belongs to.<br><br>Tab views with the same **groupid** sychronize their selected tab. The tab selection is restored automatically based on the `groupid` for tab view. If the selected tab can not be found in a tab group the first tab is selected instead.<br><br>This sychronization applies to the whole site! |
| **style**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [`tab` shortcode]({{% relref "shortcodes/tab#parameter" %}}) for possible values. |
| **color**             | _&lt;empty&gt;_      | Sets a default value for every contained tab. Can be overridden by each tab. See the [`tab` shortcode]({{% relref "shortcodes/tab#parameter" %}}) for possible values. |
| **title**             | _&lt;empty&gt;_      | Arbitrary title written in front of the tabs. |
| **icon**              | _&lt;empty&gt;_      | [Font Awesome icon name]({{%relref "shortcodes/icon#finding-an-icon" %}}) set to the left of the title. |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_      | Arbitrary number of tabs defined with the `tab` sub-shortcode. |

## Examples

### Behavior of the `groupid`

See what happens to the tab views while you select different tabs.

While pressing a tab of group A switches all tab views of group A in sync (if the tab is available), the tabs of group B are left untouched.

{{< tabs >}}
{{% tab title="Group A, Tab View 1" %}}
````go
{{</* tabs groupid="a" */>}}
{{%/* tab title="json" */%}}
```json
{ "Hello": "World" }
```
{{%/* /tab */%}}
{{%/* tab title="_**XML**_ stuff" */%}}
```xml
<Hello>World</Hello>
```
{{%/* /tab */%}}
{{%/* tab title="properties" */%}}
```properties
Hello = World
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````
{{% /tab %}}
{{% tab title="Group A, Tab View 2" %}}
````go
{{</* tabs groupid="a" */>}}
{{%/* tab title="json" */%}}
```json
{ "Hello": "World" }
```
{{%/* /tab */%}}
{{%/* tab title="XML stuff" */%}}
```xml
<Hello>World</Hello>
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````
{{% /tab %}}
{{% tab title="Group B" %}}
````go
{{</* tabs groupid="b" */>}}
{{%/* tab title="json" */%}}
```json
{ "Hello": "World" }
```
{{%/* /tab */%}}
{{%/* tab title="XML stuff" */%}}
```xml
<Hello>World</Hello>
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````
{{% /tab %}}
{{< /tabs >}}


#### Group A, Tab View 1

{{< tabs groupid="tab-example-a" >}}
{{% tab title="json" %}}
```json
{ "Hello": "World" }
```
{{% /tab %}}
{{% tab title="_**XML**_ stuff" %}}
```xml
<Hello>World</Hello>
```
{{% /tab %}}
{{% tab title="properties" %}}
```ini
Hello = World
```
{{% /tab %}}
{{< /tabs >}}

#### Group A, Tab View 2

{{< tabs groupid="tab-example-a" >}}
{{% tab title="json" %}}
```json
{ "Hello": "World" }
```
{{% /tab %}}
{{% tab title="XML stuff" %}}
```xml
<Hello>World</Hello>
```
{{% /tab %}}
{{< /tabs >}}

#### Group B

{{< tabs groupid="tab-example-b" >}}
{{% tab title="json" %}}
```json
{ "Hello": "World" }
```
{{% /tab %}}
{{% tab title="XML stuff" %}}
```xml
<Hello>World</Hello>
```
{{% /tab %}}
{{< /tabs >}}

### Nested Tabs and Color

In case you want to nest tabs, the parent tab that contains the subtabs needs to be declared with `{{</* tab */>}}` instead of `{{%/* tab */%}}`. Note, that in this case it is not possible to put markdown in the parent tab.

You can also set various color parameter for all tabs or just selected ones. See the [`tab` shortcode]({{% relref "shortcodes/tab#parameter" %}}) for possible values.

````go
{{</* tabs groupid="main" style="primary" title="Rationale" icon="thumbtack" */>}}
{{</* tab title="Text" */>}}
  Simple text is possible here...
  {{</* tabs groupid="tabs-example-language" */>}}
  {{%/* tab title="python" */%}}
  Python is **super** easy.

  - most of the time.
  - if you don't want to output unicode
  {{%/* /tab */%}}
  {{%/* tab title="bash" */%}}
  Bash is for **hackers**.
  {{%/* /tab */%}}
  {{</* /tabs */>}}
{{</* /tab */>}}

{{</* tab title="Code" style="default" color="darkorchid" */>}}
  ...but no markdown
  {{</* tabs groupid="tabs-example-language" */>}}
  {{%/* tab title="python" */%}}
  ```python
  print("Hello World!")
  ```
  {{%/* /tab */%}}
  {{%/* tab title="bash" */%}}
  ```bash
  echo "Hello World!"
  ```
  {{%/* /tab */%}}
  {{</* /tabs */>}}
{{</* /tab */>}}
{{</* /tabs */>}}
````

{{< tabs groupid="main" style="primary" title="Rationale" icon="thumbtack" >}}
{{< tab title="Text" >}}
  Simple text is possible here...
  {{< tabs groupid="tabs-example-language" >}}
  {{% tab title="python" %}}
  Python is **super** easy.

  - most of the time.
  - if you don't want to output unicode
  {{% /tab %}}
  {{% tab title="bash" %}}
  Bash is for **hackers**.
  {{% /tab %}}
  {{< /tabs >}}
{{< /tab >}}

{{< tab title="Code" style="default" color="darkorchid" >}}
  ...but no markdown
  {{< tabs groupid="tabs-example-language" >}}
  {{% tab title="python" %}}
  ```python
  print("Hello World!")
  ```
  {{% /tab %}}
  {{% tab title="bash" %}}
  ```bash
  echo "Hello World!"
  ```
  {{% /tab %}}
  {{< /tabs >}}
{{< /tab >}}
{{< /tabs >}}
