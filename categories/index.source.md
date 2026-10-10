+++
[params]
  [params.pages]
    columns = 2
    description = true
    display = 'cards'

[[cascade]]
  [cascade.params]
    [cascade.params.pages]
      breadcrumb = false
      columns = 3
      description = true
      groupby = 'linktitle | left 1 | upper'
+++

The categories follow the [Diátaxis](https://diataxis.fr/) documentation framework, which sorts each page by what the reader needs: learning, solving a task, understanding or looking something up.

This taxonmy page and their term pages are configured differently in comparison to the [default](tags). See [the docs](authoring/taxterm) for what's possible.
