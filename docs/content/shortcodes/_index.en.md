+++
categories = ['reference']
title = 'Shortcodes'
type = 'chapter'
weight = 4

[params]
  menuPre = "<i class='fa-fw fas fa-shapes'></i> "
  ordersectionsby = 'title'
+++

Hugo uses Markdown as its content format. However, there are a lot of things that Markdown doesn't support well.

You could use pure HTML to expand your possibilities. But this happens to be a bad idea. Everyone uses Markdown because it's pure and simple to read. You should avoid HTML to keep it as simple and portable as possible.

To avoid Markdown's limitations, Hugo created [shortcodes](https://gohugo.io/content-management/shortcodes/). A shortcode is a simple snippet inside of a page.

The Relearn theme provides many shortcodes on top of [Hugo's existing ones](https://gohugo.io/content-management/shortcodes/#embedded-shortcodes).

{{< cards >}}
{{< /cards >}}

{{< cards >}}
{{< card >}}
{{< /card >}}
{{< /cards >}}

---

## Title

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

## Content

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

## Image

{{< cards >}}
{{% card image="/images/magic.gif" %}}
{{% /card %}}
{{< /cards >}}

---

## Link

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

## Parameter & Template

{{< cards >}}
{{% card template="debug" params={"blub":"bla"} %}}
Give arbitrary parameter as string (JSON, TOML, YAML) or map.

Show those parameter with the custom `debug` card template or use them in your own card template stored in `layouts/partials/cards`.
{{% /card %}}
{{< /cards >}}

---

## Theme

{{% children type="card" description=true cardtemplate="default" %}}

## Original rcastley

{{% children-cards description=true depth=3 %}}
