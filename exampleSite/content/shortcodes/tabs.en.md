+++
description = "Show content in tabbed views"
title = "Tabbed views"
+++

The `tabs` shortcode displays arbitrary content in unlimited number of tabs. This comes in handy eg. for providing code snippets for multiple languages or providing configuration in different formats.

{{< tabs groupid="tabs-example-language" >}}
{{% tab name="python" %}}

```python
print("Hello World!")
```

{{% /tab %}}
{{% tab name="bash" %}}

```bash
echo "Hello World!"
```

{{% /tab %}}
{{< /tabs >}}

## Usage

While the examples are using shortcodes with named parameter you are free to also call this shortcode from your own partials.

{{< tabs groupid="shortcode-parameter">}}
{{% tab name="shortcode" %}}

````go
{{</* tabs */>}}
{{%/* tab name="python" */%}}
```python
print("Hello World!")
```
{{%/* /tab */%}}
{{%/* tab name="bash" */%}}
```bash
echo "Hello World!"
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{% /tab %}}
{{% tab name="partial" %}}

````go
{{ partial "shortcodes/tabs.html" (dict
  "context" .
  "tabs" (slice
    (dict
      "name" "python"
      "content" ("```python\nprint(\"Hello World!\")\n```" | markdownify)
    )
    (dict
      "name" "bash"
      "content" ("```bash\necho \"Hello World!\"\n```" | markdownify)
    )
  )
)}}
````

{{% /tab %}}
{{< /tabs >}}

### Parameter

| Name                  | Default          | Notes       |
|:----------------------|:-----------------|:------------|
| **groupid**           | `default`        | Arbitrary name of the group the tab view belongs to.<br/><br/>Tab views with the same **groupid** sychronize their selected tab. This sychronization applies to the whole site! |
| _**&lt;content&gt;**_ | _&lt;empty&gt;_  | Arbitrary number of tabs defined with the `tab` sub-shortcode. |

{{% notice note %}}
When using tab views with different content sets, make sure to use a common `groupid` for equal sets of tabs but distinct `groupid` for different sets.

The tab selection is restored automatically based on the `groupid` and if it cannot find a tab item because it came from the `'default'` group on a different page then the first tab is selected instead.
{{% /notice %}}

## Examples

### Distinct `groupid`

````go
{{</* tabs groupid="config" */>}}
{{%/* tab name="json" */%}}
```json
{
  "Hello": "World"
}
```
{{%/* /tab */%}}
{{%/* tab name="XML" */%}}
```xml
<Hello>World</Hello>
```
{{%/* /tab */%}}
{{%/* tab name="properties" */%}}
```properties
Hello = World
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{< tabs groupid="tabs-example-config" >}}
{{% tab name="json" %}}
```json
{
  "Hello": "World"
}
```
{{% /tab %}}
{{% tab name="XML" %}}
```xml
<Hello>World</Hello>
```
{{% /tab %}}
{{% tab name="properties" %}}
```ini
Hello = World
```
{{% /tab %}}
{{< /tabs >}}

### Non-Distinct `groupid`

See what happens to this tab view if you select **properties** tab from the previous example.

````go
{{</* tabs groupid="config" */>}}
{{%/* tab name="json" */%}}
```json
{
  "Hello": "World"
}
```
{{%/* /tab */%}}
{{%/* tab name="XML" */%}}
```xml
<Hello>World</Hello>
```
{{%/* /tab */%}}
{{</* /tabs */>}}
````

{{< tabs groupid="tabs-example-config" >}}
{{% tab name="json" %}}
```json
{
  "Hello": "World"
}
```
{{% /tab %}}
{{% tab name="XML" %}}
```xml
<Hello>World</Hello>
```
{{% /tab %}}
{{< /tabs >}}
