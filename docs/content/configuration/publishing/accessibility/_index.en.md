+++
categories = ['explanation', 'howto']
description = 'What the theme does to be usable by everyone'
options = ['link.underline']
title = 'Accessibility'
weight = 1
+++

The theme wants your documentation to be usable by everyone, whether they read it with their eyes, a screen reader or a magnifier, and whether they move through it with a mouse, a keyboard or by touch. Accessibility is a supported feature of the theme: what doesn't work for you or your readers is a bug and [welcome to be reported](https://github.com/McShelby/hugo-theme-relearn/issues).

The theme takes the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) as its yardstick.

## What Is Up to You

The theme can only care for what it writes itself. The rest is yours.

- **Colors**: The contrast of text depends on the [color variant](configuration/branding/colors) you choose or write. Not every shipped variant has enough of it in every place.
- **Headings**: The theme writes the title of a page as its first heading, so start the headings of your content one level below and don't skip a level. The headings the theme writes for you fit in on their own. The exception is the [`pages` shortcode](shortcodes/pages), whose `headinglevel` you have to set to match the place you call it from.
- **Images**: Give each image an alternative text.
- **Links**: Write link texts that tell where they lead even if read on their own.

## Underlined Links

{{% badge style="option" %}}Option{{% /badge %}} By default, links in your content are told apart from the text around them only by their color. Readers who can not distinguish these colors don't see that there is a link.

Set `link.underline=true` to also underline them. This affects the links in your content, not the menu or the topbar, and not what looks like a control of its own, like buttons or cards.

{{< multiconfig file=hugo section=params >}}
link.underline = true
{{< /multiconfig >}}

The theme marks the page with the class `link-underline` on the `body` element, in case your own styles want to react on it.

## Keyboard Shortcuts

Besides the keys every browser knows, the theme brings shortcuts of its own. Those of a button are also shown in its tooltip.

| Shortcut                                     | Action |
|----------------------------------------------|--------|
| <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>n</kbd>  | Shows or hides the menu in the mobile layout. |
| <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>f</kbd>  | Puts the focus into the search box, pressed again back into the content. |
| <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>t</kbd>  | Shows or hides the table of contents. |
| <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>w</kbd>  | Opens the page for editing, if [configured](configuration/customization/topbar). |
| <kbd>CTRL</kbd> <kbd>ALT</kbd> <kbd>p</kbd>  | Opens the print view, if [configured](configuration/customization/topbar). |
| <kbd>🡐</kbd> / <kbd>🡒</kbd>                  | Goes to the previous or next page. |
| <kbd>ALT</kbd> <kbd>🡑</kbd> / <kbd>ALT</kbd> <kbd>🡓</kbd> | Scrolls to the previous or next heading of the page. |
| <kbd>ESC</kbd>                               | Closes what was opened, like the menu of the mobile layout, the table of contents or an enlarged image, and clears the search. |
