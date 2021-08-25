+++
description = "Disclaimers to help you structure your page"
title = "Notice"
+++

The notice shortcode shows four types of disclaimers to help you structure your page.

## Usage

````go
{{%/* notice [ note | info | tip | warning ] */%}}
Some markup
{{%/* /notice */%}}
````

## Examples

### Note

{{% notice note %}}
A **notice** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{% /notice %}}

{{% expand "Show markup" %}}
````go
{{%/* notice note */%}}
A **notice** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{%/* /notice */%}}
````
{{% /expand %}}

### Info

{{% notice info %}}
An **information** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{% /notice %}}

{{% expand "Show markup" %}}
````go
{{%/* notice info */%}}
An **information** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{%/* /notice */%}}
````
{{% /expand %}}

### Tip

{{% notice tip %}}
A **tip** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{% /notice %}}

{{% expand "Show markup" %}}
````go
{{%/* notice tip */%}}
A **tip** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{%/* /notice */%}}
````
{{% /expand %}}

### Warning

{{% notice warning %}}
A **warning** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{% /notice %}}

{{% expand "Show markup" %}}
````go
{{%/* notice warning */%}}
A **warning** disclaimer

You can add:

- multiple paragraphs
- bullet point lists
- _emphasized_, **bold** and even ***bold emphasized*** text
- [links](https://example.com)
- other shortcodes besides `notice`
- etc.

```plaintext
...and even source code
```

> the possiblities are endless
{{%/* /notice */%}}
````
{{% /expand %}}
