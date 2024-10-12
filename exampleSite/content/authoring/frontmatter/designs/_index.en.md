+++
categories = ["howto"]
description = "How to vary layouts by using page designs"
title = "Page Designs"
weight = 1
+++

A page is displayed by exactly one page design and represented by [Hugo's reserved `type` front matter](https://gohugo.io/content-management/front-matter/#type).

The Relearn theme offers the page designs `home`, `chapter`, and `default` but you can [define further custom page designs](configuration/customization/designs).

Regardless of shipped or custom page design, you are using them in the same way.

- If you have an [archetype file](https://gohugo.io/content-management/archetypes/), you can just do

    ````shell
	hugo new --kind chapter chapter1/_index.md
    ````

- If you are creating your Markdown files manually, you can achieve the same by just setting `type='chapter'` in the front matter.

Your resulting Markdown file needs to have at least the `type` front matter set to the value of the page design

````toml {title="_index.md"}
+++
title = "Chapter 1"
type = "chapter"
+++
````


## Predefined Designs

### Home {#archetypes-home}

A **Home** page is the starting page of your project. It's best to have only one page of this kind in your project.

To create a home page, run the following command

````shell
hugo new --kind home _index.md
````

![Home page](pages-home.png?width=60pc)

### Chapter {#archetypes-chapter}

A **Chapter** displays a page meant to be used as introduction for a set of child pages.

Commonly, it contains a title front matter and a short description in the content.

To create a chapter page, run the following command

````shell
hugo new --kind chapter chapter1/_index.md
````

If a numerical `weight` front matter is set, it will be used to generate the subtitle of the chapter page. Set the number to a consecutive value starting at 1 for each new chapter on the same directory level.

![Chapter page](pages-chapter.png?width=60pc)

### Default {#archetypes-default}

A **Default** page is any other content page.

To create a default page, run either one of the following commands

````shell
hugo new chapter1/page1/_index.md
````

or

````shell
hugo new chapter1/page1.md
````

![Default page](pages-default.png?width=60pc)
