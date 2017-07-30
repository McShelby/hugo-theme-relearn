---
date: 2016-04-09T16:50:16+02:00
title: Shortcodes
weight: 15
---

Hugo uses Markdown for its simple content format. However, there are a lot of things that Markdown doesn’t support well. You could use pure HTML to expand possibilities.

But this happens to be a bad idea. Everyone uses Markdown because it's pure and simple to read even non-rendered. You should avoid HTML to keep it as simple as possible.

To avoid this limitations, Hugo created [shortcodes](https://gohugo.io/extras/shortcodes/). A shortcode is a simple snippet inside a page.

**Hugo-theme-learn** provides multiple shortcodes on top of existing ones.

## Notice

The notice shortcode shows 4 types of disclaimers to help you structure your page.

### Note

```
{{%/* notice note */%}}
A notice disclaimer
{{%/* /notice */%}}
```

renders as

{{% notice note %}}
A notice disclaimer
{{% /notice %}}

### Info

```
{{%/* notice info */%}}
An information disclaimer
{{%/* /notice */%}}
```

renders as

{{% notice info %}}
An information disclaimer
{{% /notice %}}

### Tip

```
{{%/* notice tip */%}}
A tip disclaimer
{{%/* /notice */%}}
```

renders as

{{% notice tip %}}
A tip disclaimer
{{% /notice %}}

### Warning

```
{{%/* notice warning */%}}
An warning disclaimer
{{%/* /notice */%}}
```

renders as

{{% notice warning %}}
A warning disclaimer
{{% /notice %}}

## Button

Button is a just a clickable button with optional icon.

```
{{%/* button href="https://getgrav.org/" */%}}Get Grav{{%/* /button */%}}
{{%/* button href="https://getgrav.org/" icon="fa fa-play" */%}}Get Grav with icon{{%/* /button */%}}
{{%/* button href="https://getgrav.org/" icon="fa fa-share" icon-position="right" */%}}Get Grav with icon right{{%/* /button */%}}
```

{{% button href="https://getgrav.org/" %}}Get Grav{{% /button %}}
{{% button href="https://getgrav.org/" icon="fa fa-play" %}}Get Grav with icon{{% /button %}}
{{% button href="https://getgrav.org/" icon="fa fa-share" icon-position="right" %}}Get Grav with icon right{{% /button %}}
