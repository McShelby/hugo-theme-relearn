+++
categories = ['howto', 'reference']
description = 'Displays content from other Marrrkdown files'
frontmatter = ['include.errorlevel']
options = ['include.errorlevel']
title = 'Include'

[[cascade]]
  [cascade.params]
    [cascade.params.build]
      render = 'never'
      list = 'never'
  [cascade.target]
    path = '/shortcodes/include/*'
+++
{{< piratify >}}