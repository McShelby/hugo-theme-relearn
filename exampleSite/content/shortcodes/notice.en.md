+++
description = "Disclaimers to help you structure your page"
title = "Notice"
+++

The notice shortcode shows four types of disclaimers to help you structure your page.

## Usage

````go
{{%/* notice ( note | info | tip | warning ) [ <string> ] */%}}
Some markup
{{%/* /notice */%}}
````

The first parameter is required and indicates the type of notice.

The second parameter is optional. If provided, it will be used as the title of the notice. If not provided, then the type of notice will be used as the title. For example, the title of a warning notice will be "Warning".

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

### Notice with Custom Title

You can customize the title of the notice by passing it as a second parameter.

{{% notice note "Pay Attention to this Note!" %}}
The title is now the parameter that was provided.
{{% /notice %}}

{{% expand "Show markup" %}}
````go
{{%/* notice note "Pay Attention to this Note!" */%}}
The title is now the parameter that was provided.
{{%/* /notice */%}}
````
{{% /expand %}}
