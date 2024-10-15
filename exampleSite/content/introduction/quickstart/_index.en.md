+++
categories = ["tutorial"]
description = "Initialize your website in a few simple steps"
title = "Getting Started"
weight = 1
+++

Here's how to start your new website. If you're new to Hugo, we recommend learning more about it in its excellent [starter's guide](https://gohugo.io/getting-started/).

## Install Hugo

Download and install Hugo {{% badge color="fuchsia" icon="fa-fw fab fa-hackerrank" title=" " %}}0.126.0{{% /badge %}} or newer for your operating system [following the instructions](https://gohugo.io/installation/).

The _standard_ edition of Hugo is sufficient but you can also use the _extended_ edition.

## Create your Project

Use Hugo's `new site` command to make a new website

````shell
hugo new site my-new-site
````

Then move into the new directory

````shell
cd my-new-site
````

Run all future commands from this directory.

## Install the Theme

### Download as a Zip File

You can [download the theme as a .zip file](https://github.com/McShelby/hugo-theme-relearn/archive/main.zip) and unzip it into the `themes/hugo-theme-relearn` directory.

Then add this at the top of your `hugo.toml`

{{< multiconfig file=hugo >}}
theme = 'hugo-theme-relearn'
{{< /multiconfig >}}

### Use Hugo's Module System

Install the Relearn theme using [Hugo's module system](https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme)

````shell
hugo mod init example.com
````

Then add this at the end of your `hugo.toml`

{{< multiconfig file=hugo >}}
[module]
  [[module.imports]]
    path = 'github.com/McShelby/hugo-theme-relearn'
{{< /multiconfig >}}

### Use as a Git Submodule

If you're using [Git](https://git-scm.com/) for your project, you can create a repository now

````shell
git init
````

Add the theme as a Git submodule

````shell
git submodule add --depth 1 https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn
````

Then add this at the top of your `hugo.toml`

{{< multiconfig file=hugo >}}
theme = 'hugo-theme-relearn'
{{< /multiconfig >}}

## Create your Home Page

Start by making a home page

````shell
hugo new --kind home _index.md
````

The new home page file `content/_index.md` has two parts: the page info (like `title`) at the top, called [front matter](https://gohugo.io/content-management/front-matter/), and the page content below.

## Create your First Chapter Page

Chapters are top-level pages that contain other pages. They have a special layout.

Make your first chapter page

````shell
hugo new --kind chapter first-chapter/_index.md
````

The new file `content/first-chapter/_index.md` has a `weight` number in the front matter. This sets the chapter's subtitle and its order in the menu.

## Create your First Content Pages

Now make content pages inside the chapter. Here are three ways to do this

````shell
hugo new first-chapter/first-page/_index.md
hugo new first-chapter/second-page/index.md
hugo new first-chapter/third-page.md
````

Hugo treats these files differently based on their file names. Learn more in [Hugo's guide](https://gohugo.io/content-management/).

Feel free to edit these files. Change the `title`, add a `weight` if you want, and write your content.

## Test your Website Locally

Start your new website on your computer with this command

````shell
hugo serve
````

Open [http://localhost:1313](http://localhost:1313) in your web browser.

You can keep the server running while you edit. The browser will update automatically when you save changes.

{{% figure src="magic.gif" link="https://gohugo.io" alt="Magic" caption="It's a kind of magic" %}}

## Build and Deploy your Website

When your site is ready to go live, run this command

````shell
hugo
````

This creates a `public` directory with all your website files.

You can upload this directory to any web server, or use one of [Hugo's many other ways to publish](https://gohugo.io/hosting-and-deployment/).

## Next Steps

Your site is now fully functional.

You can continue [configuring your site](configuration) to your needs.

Or just start [authoring content](authoring) and discover what's possible.
