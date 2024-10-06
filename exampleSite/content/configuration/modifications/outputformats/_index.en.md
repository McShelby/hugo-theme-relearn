+++
description = "Adding Custom Output Formats"
title = "Custom Output Formats"
weight = 5
+++

Besides the `print` output format supoorted by the theme, you can write your own [output formats](https://gohugo.io/templates/output-formats/).

## From Scratch

Suppoe you want to add a new output format `myformat` that outputs HTML. You want to ignore everything the theme provides and implement the whole format by yourself.

For that, add a file `layouts/_default/baseof.myformat.html` and implement everything from scratch.

## Using the Theme's Frame

If you want to keep the general framework and want to change only aspects of it, you can override some of following files

- `layouts/_default/views/article.html` - how one page content, including the title heading should be displayed
- `layouts/_default/views/body.html` - how the body of the page should be composed; usually you either call `bodys/single.html` to show a single page's content or `bodys/tree.html` to show the page's content and the content of every subpages recursivley
- `layouts/_default/views/menu.html` - how the sidebar menu should be assembled
- `layouts/_default/views/storeOutputFormat.html` - this stores the name of the output format in a variable to later be used by the framework; this makes it possible to write CSS specific to your output format

For an live example, see the implementations for the shipped `print` output format, that overrides [`layouts/_default/views/body.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/body.print.html), [`layouts/_default/views/menu.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/menu.print.html) and [`layouts/_default/views/storeOutputFormat.print.html`](https://github.com/McShelby/hugo-theme-relearn/blob/main/layouts/_default/views/storeOutputFormat.print.html).
