# Version 9.5

## 9.5.0 (XXXX-XX-XX) {#9-5-0}

### Change

- {{% badge style="change" %}}Change{{% /badge %}} Your own [topbar elements](configuration/customization/topbar#defining-own-elements) now receive the parameters of their configuration as `element`, like the elements of the sidebar menus do. The area they are written into is available as `config`.

  If your element template reads a parameter like `.onwidths`, change it to `.element.onwidths`. Reading the parameters directly still works but is deprecated and will stop working with 10.0.0. Templates only reading `.page` don't need to be changed.

  If your templates call one of the theme's elements like `topbar/element/editbutton.html` themselves, pass its parameters as `element`. Parameters given next to `page` still work but issue a deprecation warning.

- {{% badge style="change" %}}Change{{% /badge %}} The `iconposition` parameter of the [`button` shortcode](shortcodes/button) is deprecated. The icon is always shown in front of the title.

  The parameter still works but issues a deprecation warning and will stop working with 10.0.0.

### New

- {{% badge style="new" %}}New{{% /badge %}} The [image effects](authoring/linking/imageeffects) `height` and `width` can now be set in your project configuration or a page's front matter, to give all images of your site or page a default size.

- {{% badge style="new" %}}New{{% /badge %}} [Topbar buttons](configuration/customization/topbar#screen-widths-and-titles) can show their title next to their icon depending on the width of the screen, using the new options `titleonwidths`, `titleonwidthm` and `titleonwidthl`. The theme's buttons keep showing only their icon unless you set these options.
