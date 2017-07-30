---
date: 2016-04-09T16:50:16+02:00
title: Configuration
weight: 20
---

## Site configuration

On top of [Hugo global configuration](https://gohugo.io/overview/configuration/), **Hugo-theme-learn** lets you define the following parameters :

```toml
[params]
  # Prefix URL to edit current page. Useful to give opportunity to people to create merge request for your doc.
  # See the config.toml file from this documentation site to have an example.
  editURL = ""
  # Author of the site, will be used in meta information
  author = ""
  # Description of the site, will be used in meta information
  description = ""
  # Shows a checkmark for visited pages on the menu. Default to false
  showVisitedLinks = false
  # Automatically generates prev and next arrows
  autoNav = false
  # Activate search. Don't forget to generate the JSON index file (go check get started page)
  search = false
```

{{% notice tip %}}
Assets are based on the `baseurl` of the site. So, don't forget to configure yours in the `config.toml` file. Absolutely needed for Github pages like http://userid.github.io/project.
{{% /notice %}}

## Style customization

**Hugo-theme-learn** has been built to be as configurable as possible by defining multiple [partials](https://gohugo.io/templates/partials/)

In `themes/hugo-theme-learn/layouts/partials/`, you will find all the partials defined for this theme. If you need to overwrite something, don't change the code directly. Instead [follow this page](https://gohugo.io/themes/customizing/). You'd create a new partial in the `layouts/partials` folder of your local project. This partial will have the priority.

This theme defines the following partials :

- *header*: the header of the content page (contains the breadcrumbs)
- *style*: CSS imports, in case you want to override the style
- *footer*: the footer of the content page (contains the arrows)
- *script*:  Javacript includes, in case you want to add Javascript on top of provided ones
- *favicon*: the favicon
- *logo*: the logo, on top left hand corner.
- *meta*: HTML meta tags, if you want to change default behavior
- *toc*: table of contents

### Change the logo

Create a new file in `layouts/partials/` named `logo.html`. Then write any HTML you want.
You could use an `img` HTML tag and reference an image created under the *static* folder, or you could paste a SVG definition !

{{% notice note %}}
The size of the logo will adapt automatically
{{% /notice %}}

### Change the favicon

If your favicon is a png, just drop off your image in your local `static/images/` folder and names it `favicon.png`

If you need to change this default behavior, create a new file in `layouts/partials/` named `favicon.html`. Then write something like this:

```html
<link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
```

### Change default colors

To change default colors, you will have to add a new css file. In order to do that :

1. Create a css file in your local `static/css/` folder
2. Create a partial HTML in your local `layouts/partials/` named `style.html` and add the following line

```html
<link href="/css/yourfile.css" rel="stylesheet">
```

Then, create CSS in the new file, overwriting default behavior. Don't panic, we give you, just below, colors that are commonly changed.

```css
/* background behind the logo*/
#header {
    background: <color>;
    border-color: <color>;
}

/* Background color of the menu */
#sidebar {
  background-color: <color>;
}

/* Background color of the menu, when clicked */
#sidebar ul.topics > li.parent, #sidebar ul.topics > li.active {
  background-color: <color>;
}

/* Color of all links, including arrows to get to previous and next pages */
a {
    color: <color>;
}
a:hover {
   color: <color>;
}
```
