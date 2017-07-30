---
title: Getting started
weight: 15
---

{{% expand "Oulala" %}}

The following steps are here to help you initialize your new website. If you don't know Hugo at all, we strongly suggest you to train by following this [great documentation for beginners](https://gohugo.io/overview/quickstart/).
{{% /expand %}}

## Flowchart example
{{%expand "Show code ..."%}}
	{{</*mermaid align="left"*/>}}
	graph LR;
		A[Hard edge] -->|Link text| B(Round edge)
    	B --> C{Decision}
    	C -->|One| D[Result one]
    	C -->|Two| E[Result two]
    {{</* /mermaid */>}}
{{%/expand%}}

{{<mermaid align="left">}}
graph LR;
	A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}

{{< mermaid >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{< /mermaid >}}

## Create your project

Hugo provides a `new` command to create a new website.

```
hugo new site <new_project>
```

## Install the theme

Install the **Hugo-theme-learn** theme by following [this documentation](https://gohugo.io/themes/installing/)

The theme's repository is: https://github.com/matcornic/hugo-theme-learn.git

## Basic configuration

When building the website, you can set a theme by using `--theme` option. We suggest you to edit your configuration file and set the theme by default. Example with `config.toml` format.

```toml
theme = "hugo-theme-learn"
```

## Create your first chapter page

**Hugo-theme-learn** provides archetypes to create skeletons for your website. Begin by creating your first chapter page with the following command

```
# _index.md files are considered as chapters
hugo new --kind chapter basics/_index.md
```

## Create your first content pages

Then, create content pages inside the previous chapter. Here are two ways to create content in the chapter :

```
hugo new basics/first-content.md
hugo new basics/second-content/index.md
```

## Enable search functionality

As the index generation is not yet supported by Hugo ([PR #1853](https://github.com/spf13/hugo/pull/1853)),
we decided to use `lunr` index.
As soon as the generation of the index will be supported by hugo, we will use the official format.

So to use the `search` functionality, you just have to put a `lunr` index which respects this format :
```json
[
    {
        "uri": "/docs/01-start/index",
        "title": "Get started",
        "content": "\n\nGet started\n\nAll you need to know...\n",
        "tags": ["start", "intro"]
    },
    ...
]
```

into a `static/json/search.json` file in your hugo project.

And set `search = true` in your config.toml

To generate your lunr index, you can see this project https://github.com/gwleclerc/lunr-hugo which parse your markdown files and extract toml and yaml headers to create index with corresponding format.

In order to generate the index of your static site launch the following comand after installing `lunr-hugo` using `npm`
```
    lunr-hugo -i "<content directory>/**/*.md" -o static/json/search.json -l <header format (yaml or toml)>
```

## Launching the website

Launch the following command

```
hugo serve
```

Go to `http://localhost:1313/basics`

If you are curious, at the home page (http://localhost:1313/), you should see an empty homepage. It's because this theme does not really provide a default homepage.

You typically have 2 choices :

1. Create an [overview homepage](https://gohugo.io/templates/homepage/) for your project. Write an `index.html` file in *layouts/* folder.
2. Create a redirection to one your documentation page. Either by:
  1. Configuring your server to automatically redirect homepage to one your documentation page - *Recommended*
  2. Creating an empty html page with the following code in the head tag :  

  ```html
  <meta http-equiv="refresh" content="0; url=http://example.com/"/>
  ```
