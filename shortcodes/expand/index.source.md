+++
categories = ['howto', 'reference']
description = 'Expandable/collapsible sections of text'
title = 'Expand'

[params]
  hidden = true
+++

> [!warning]
> This shortcode is deprecated in favor of Hugo's [`details` shortcode](shortcodes/details). See [migration instructions](#migration) below.
>
> The examples on this page were removed.

The `expand` shortcode displays an expandable/collapsible section of text.

## Migration

While this shortcode will still be available for some time, it does not receive support anymore. Start to migrate early, as it will be removed with the next major update of the theme.

Each use of the `expand` shortcode issues a warning during the build.

The [`details` shortcode](shortcodes/details) displays the same section but is called differently. A call can not just be renamed.

| `expand`                         | `details`                        |
|----------------------------------|----------------------------------|
| `title` or first parameter       | `summary`                        |
| `expanded` or second parameter   | `open`                           |
| `{{%/* expand */%}}`             | `{{</* details */>}}`            |
| `{{</* expand */>}}`             | `{{</* details raw=true */>}}`   |

- The `details` shortcode takes no positional parameters. Name them.
- Don't keep `title`. The `details` shortcode knows this parameter too, but displays it as a tooltip. Your section would silently be titled `Details`.
- Call the `details` shortcode with `{{</* details */>}}`. It renders its content as Markdown in this notation, where the `expand` shortcode wrote it as it is.
- If you called the `expand` shortcode with `{{</* expand */>}}`, your content is HTML or contains other shortcodes. Set `raw=true` to keep it written as it is.
- The content of the `details` shortcode is rendered apart from the rest of your page. If it defines footnotes, contains headings or calls other shortcodes, see [the consequences](shortcodes/details#raw-content).

If you call the shortcode from your own partials, rename `shortcodes/expand.html` to `shortcodes/details.html`, rename the parameters as above and set `raw` to `true` if your content is HTML already.

## Usage

{{% multishortcode name="expand" execute="false" %}}
title: "Expand me..."
content: |
  Thank you!
{{% /multishortcode %}}

### Parameters

| Name                  | Position | Default          | Notes       |
|-----------------------|----------|------------------|-------------|
| **title**             | 1        | `"Details"` | Arbitrary text to appear next to the expand/collapse icon. |
| **expanded**          | 2        | `false`          | How the content is displayed.<br><br>- `true`: the content is initially shown<br>- `false`: the content is initially hidden |
| _**&lt;content&gt;**_ |          | _&lt;empty&gt;_  | Arbitrary text to be displayed on expand. |
