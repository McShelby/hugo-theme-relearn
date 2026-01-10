+++
categories = ['howto', 'reference']
description = "Group, order 'n list th' planks o' yer ship"
frontmatter = ['ordersectionsby', 'pages']
options = ['ordersectionsby']
title = 'Pages'

[params]
  alwaysopen = false

[[cascade]]
  outputs = ['html', 'print', 'source']
  [cascade.target]
    path = '/shortcodes/pages/fruits**'
+++
{{< piratify >}}
