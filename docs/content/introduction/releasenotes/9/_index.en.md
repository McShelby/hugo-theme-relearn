+++
title = 'Version 9'
type = 'releasenotes'
weight = -9

[params]
  disableToc = false
  hidden = true
  minHugoVersion = '0.166.0'
+++

> [!primary]+ Heads-up for the upcoming 10.0.0 version, the Decade Release – Clearing Out Ten Years of Baggage
>
> The Relearn theme has come a long way. Its predecessor, the Learn theme, was started more than ten years ago, and Relearn was forked from it over five years ago. Since then, a lot has been added to the theme, and Hugo itself has evolved tremendously.
>
> All that history left its marks, and the source code still carries a lot of it along: options and features that have long been replaced and forgotten but are kept alive for compatibility, and remnants whose only remaining job is to print a warning. In other places, the theme got there first, and Hugo later added similar functionality of its own, often under a different name. Today it is hard to argue why the theme should do things differently from Hugo, and two terms for the same thing (like `menuTitle` vs. `linkTitle`, or the `expand` shortcode vs. `details`) only cause confusion.
>
> Version 10.0.0 is about cleaning this up. It removes everything that currently triggers a `DEPRECATED` or `UNSUPPORTED` message during a build. That covers deprecated features that still work as well as the hints for features that were already dropped.
>
> **What you should do now**
>
> - **No messages, no work:** if your site builds on the latest 9.x release without `DEPRECATED`, `UNSUPPORTED` or `WARNING` messages from the theme, you can update to 10.0.0 without changing anything.
> - **Messages? Fix them now:** each message names the replacement and links to the release notes describing the migration.
> - **Don't wait:** with 10.0.0, these messages are gone. Old usages will simply stop working, either silently or with a build error.

{{% pages display="content" hidden="true" %}}
