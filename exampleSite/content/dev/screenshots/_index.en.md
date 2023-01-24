+++
description = "Recipe to create various documentation screenshots"
title = "Screenshots"
+++

Sometimes screenshots need to be redone. This page explains how to create the different screenshots, tools and settings

## Common

- Use English translation
- Empty search
- Remove history checkmarks but leave it on the page thats used for the screenshot

## Screenshot

**Content**:

A meaningful full-screen screenshot of an interesting page.

The content should be:

- timeless: not showing any dates or often edited content
- interesting: show a bunch of interesting elements like headings, code, etc
- balanced: no cluttering with overpresent elements or coloring
- aligned: aligned outlines

**Used by**:

- Hugo Themes info: https://themes.gohugo.io/themes/hugo-theme-relearn/ _1000 x 1500 @ 1_

**Page URL**: [Screenshot Link]({{% relref "/shortcodes/include" %}})

**Location**: `images/screenshot.png`

**Remarks**:

The location is mandatory due to Hugo's theme site builder.

**Preview**:

![Screenshot](/images/screenshot.png?classes=shadow&width=100%25&height=100%25)

## Hero Image

**Content**:

Show the screenshot page on different devices and different themes. Composition of different images.

What to show:

- always use the same page for all variations
- use a delightful background

**Used by**:

- Hugo Themes notes: https://themes.gohugo.io/themes/hugo-theme-relearn/               _1500 x 1000_
- Hugo Themes gallery: https://themes.gohugo.io/tags/docs/                              _900 x 600_
- GitHub project site: https://github.com/McShelby/hugo-theme-relearn                  _1500 x 1000_
- GitHub social media preview: https://github.com/McShelby/hugo-theme-relearn/settings _1280 x 640_

**Page URL**: [Screenshot Link]({{% relref "/shortcodes/include" %}})

**Location**: `images/hero.xcf`

**Creation**:

- Template: http://www.pixeden.com/psd-web-elements/psd-screen-web-showcase
- Desktop: light theme _1440 x 900 @ 1_
- Tablet: light theme _778 x 1038 @ 1_
- Phone: dark theme _450 x 801 @ .666_
- Resize template centered to _3000 x 2000_
- Scale to _1500 x 1000_ and save as `images/hero.png`
- Scale to _900 x 600_ and save as `images/tn.png`
- Scale to _1280 x 853_, resize template _1280 x 640_ offset y: _-140_ and save as `images/social.png`

**Preview**:

![Hero](/images/hero.png?classes=shadow&width=100%25&height=100%25)
![tn](/images/tn.png?classes=shadow&width=100%25&height=100%25)
![Social](/images/social.png?classes=shadow&width=100%25&height=100%25)
