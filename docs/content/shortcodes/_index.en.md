+++
categories = ['reference']
title = 'Shortcodes'
type = 'chapter'
weight = 4

[params]
  menuPre = "<i class='fa-fw fas fa-shapes'></i> "
  ordersectionsby = 'title'
+++

Hugo uses Markdown as its content format. However, there are a lot of things that Markdown doesn't support well. To overcome those limitations, Hugo created the concept of [shortcodes](https://gohugo.io/content-management/shortcodes/).

On top of [Hugo's built-in shortcodes](https://gohugo.io/content-management/shortcodes/#embedded-shortcodes) the Relearn theme supplies the following additional shortcodes.

{{% children type="card" description=true %}}

---

## Testing the Cards Shortcode

### Empty Cards

{{< cards >}}
{{< /cards >}}

{{< cards >}}
{{< card >}}
{{< /card >}}
{{< /cards >}}

---

### Title

{{< cards >}}
{{% card title="Just a title" %}}
{{% /card %}}
{{% card title="Typical" %}}
Some title and a text
{{% /card %}}
{{% card title="Code" %}}
```c
printf("Hello World!");
```
{{% /card %}}
{{% card title="Image & title" image="/images/magic.gif" %}}
{{% /card %}}
{{% card title="Everything" image="/images/magic.gif" %}}
Image, title and a text
{{% /card %}}
{{% card title="Everything code" image="/images/magic.gif" %}}
```c
printf("Hello Code!");
```
{{% /card %}}
{{% card title="Lots of everything" image="/images/magic.gif" %}}
Image, title and a text

```c
printf("Hello Code!");
```

And a bullet list

---

reallylongwordthatdoesnotwraparoundandbehaveslikeaprick

- blue
- red
- yellow
- marshmallow
- cardboard box
- sandals
- kumi ichi
- random stuff
- just made up
- i guess i reached the end
- really?
- you can stop now
{{% /card %}}
{{< /cards >}}

---

### Content

{{< cards >}}
{{% card %}}
Just some content
{{% /card %}}
{{% card %}}
```c
printf("Hello Content!");
```
{{% /card %}}
{{% card image="/images/magic.gif" %}}
Content & image
{{% /card %}}
{{% card titleimage="/images/magic.gif" %}}
```c
printf("Hello Content & Image!");
```
{{% /card %}}
{{% card image="/images/magic.gif" %}}
Image and a text

```c
printf("Hello Code!");
```

And a bullet list

---

reallylongwordthatdoesnotwraparoundandbehaveslikeaprick

- blue
- red
- yellow
- marshmallow
- cardboard box
- sandals
- kumi ichi
- random stuff
- just made up
- i guess i reached the end
- really?
- you can stop now
{{% /card %}}
{{< /cards >}}

---

### Image

{{< cards >}}
{{% card image="/images/magic.gif" %}}
{{% /card %}}
{{< /cards >}}

---

### Link

{{< cards >}}
{{% card href="/introduction" title="Linkcard with internal link" %}}
{{% /card %}}
{{% card href="http://example.com" title="Linkcard with Code" %}}
```c
printf("Hello World!");
```
{{% /card %}}
{{% card href="http://example.com" title="Linkcard with a title" %}}
{{% /card %}}
{{% card href="http://example.com" image="/images/magic.gif" %}}
{{% /card %}}
{{% card href="http://example.com" title="Linkcard with link" %}}
Some title and a [link](http://exmaple.com)

This is not allowed and will cause your layout to mess up.
{{% /card %}}
{{< /cards >}}

---

### Parameter & Template

{{< cards >}}
{{% card template="debug" params={"blub":"bla"} %}}
Give arbitrary parameter as string (JSON, TOML, YAML) or map.

Show those parameter with the custom `debug` card template or use them in your own card template stored in `layouts/partials/cards`.
{{% /card %}}
{{< /cards >}}

## Testing the Children-Shortcode

### With Default Card

{{% children type="card" description=true %}}

---

### With rcastley Card

{{% children type="card" description=true depth=2 cardtemplate="rcastley" %}}

---

### Original Children-Cards-Shortcode of rcastley

{{% children-cards description=true depth=3 %}}
