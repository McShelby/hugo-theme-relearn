+++
date = '2018-02-14'
description = 'A hidden demo section with pages of its own'
tags = ['fruits', 'the hidden']
title = 'Citrus (hidden)'
weight = 60

[params]
  alwaysopen = false
  flavor = 'sour'
  hidden = true
  priority = 6
  status = 'published'
+++

This is a **hidden** demo section for the `pages` shortcode. It and all pages below it only show up in listings with `hidden=true`, but you can still access them directly or via the search.

{{< pages display="cards" hidden="true" >}}
