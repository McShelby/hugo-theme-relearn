+++
description = "Initializing your website in a few simple steps"
title = "Getting Started"
weight = 1
+++

With following steps you are initializing your new website. If you don't know Hugo, we strongly suggest you learn more about it in Hugo's great [documentation for starters](https://gohugo.io/getting-started/).

## Install Hugo

Install Hugo {{% badge color="fuchsia" icon="fa-fw fab fa-hackerrank" title=" " %}}0.126.0{{% /badge %}} or higher for your OS [according to the documentation](https://gohugo.io/installation/).

## Create your Project

Hugo provides the `new site` command to create a new website

````shell
hugo new site my-new-site
````

After that change into the directory

````shell
cd my-new-site
````

Every upcoming command will be executed from inside this directory.

## Install the Theme

### Downloading as Archive

You can [download the theme as .zip archive](https://github.com/McShelby/hugo-theme-relearn/archive/main.zip) and extract its content into the `themes/hugo-theme-relearn` directory.

Afterwards add this at the top of your `hugo.toml`

{{< multiconfig file=hugo >}}
theme = "hugo-theme-relearn"
{{< /multiconfig >}}

### Using with Hugo's Module System

You can install the Relearn theme following [the official documentation](https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme) using Hugo's module system

````shell
hugo mod init example.com
````

Afterwards add this at the end of your `hugo.toml`

{{< multiconfig file=hugo >}}
[module]
  [[module.imports]]
    path = 'github.com/McShelby/hugo-theme-relearn'
{{< /multiconfig >}}

### Using as Git Submodule

If you plan to store your project in a [Git](https://git-scm.com/) repository you can create one now with

````shell
git init
````

Now you can add the theme as a Git submodule by

````shell
git submodule add --depth 1 https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn
````

Afterwards add this at the top of your `hugo.toml`

{{< multiconfig file=hugo >}}
theme = "hugo-theme-relearn"
{{< /multiconfig >}}

## Create your Home Page

Start your journey by creating a home page

````shell
hugo new --kind home _index.md
````

The newly created home page file `content/_index.md` is structured in two parts, the meta information of this page like the `title`, called [front matter](https://gohugo.io/content-management/front-matter/) and the text of the page itself.

## Create your First Chapter Page

Chapters are meant to be top level pages that contain other child pages. They have a special layout.

Create your first chapter page

````shell
hugo new --kind chapter basics/_index.md
````

The newly created file `content/basics/_index.md`, contains the `weight` front matter set to a number. This will be used to generate the subtitle of that chapter page, and for ordering your chapters in the menu.

## Create your First Content Pages

Now create content pages inside the previously created chapter. Here are three ways to create content in the chapter

````shell
hugo new basics/first-content/_index.md
hugo new basics/second-content/index.md
hugo new basics/third-content.md
````

Due to their file name, all three files are handled a bit differently by Hugo. You can read more about that in [Hugo's documentation](https://gohugo.io/content-management/).

Feel free to edit those files by replacing the `title` or adding an optional `weight` value in the front matter and changing the text to your liking.

## Test your Website Locally

Launch your new web site locally by using the following command

````shell
hugo serve
````

Go to [`http://localhost:1313`](http://localhost:1313) in your browser.

You can leave the web server running while editing your pages. The browser will reload automatically every time you save your files.

{{% figure src="magic.gif" link="https://gohugo.io" alt="Magic" caption="It's a kind of magic" %}}

## Build and Deploy your Website

When your site is ready to be deployed, run the following command:

````shell
hugo
````

A `public` directory will be generated, containing all content and assets for your web site.

It now can be deployed to any web server by simply uploading its contents or you can check out one of [Hugo's many other deployment options](https://gohugo.io/hosting-and-deployment/).

## Further Steps

Your site is now fully functional.

Next, you can start [configuring your site](configuration) to your liking by setting options in your `hugo.toml`.

Also page authors are able to [configure many aspects of a page](content) using front matter while creating content.
