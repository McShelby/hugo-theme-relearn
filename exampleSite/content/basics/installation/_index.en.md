+++
tags = ["documentation"]
title = "Installation"
weight = 15
+++

The following steps are here to help you initialize your new website. If you don't know Hugo at all, we strongly suggest you learn more about it by following this [great documentation for beginners](https://gohugo.io/overview/quickstart/).

{{% notice tip %}}
The following tutorial leads you through the steps of creating a first, minimal new site.

You don't need to edit any files besides your `hugo.toml` and only need to execute the commands in the given order.
{{% /notice %}}

## Create your Project

Hugo provides the `new` command to create a new website:

````shell
hugo new site my-new-site
````

After that change into the directory:

````shell
cd my-new-site
````

Every upcoming command will be executed from inside your new site's root.

## Install the Theme

### Downloading as Archive

You can [download the theme as .zip archive](https://github.com/McShelby/hugo-theme-relearn/archive/main.zip) and extract its content into them `themes/hugo-theme-relearn` directory.

Afterwards add this at the end of your `hugo.toml`.

{{< multiconfig file=hugo >}}
theme = "hugo-theme-relearn"
{{< /multiconfig >}}

### Using Hugo's Module System

You can install the Relearn theme by following [the standard documentation](https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme) using Hugo's module system:

````shell
hugo mod init example.com
````

Afterwards add this at the end of your `hugo.toml`.

{{< multiconfig file=hugo >}}
[module]
  [[module.imports]]
    path = 'github.com/McShelby/hugo-theme-relearn'
{{< /multiconfig >}}

### Using Git Submodules

If you plan to store your project in a git repository you can create one with:

````shell
git init
````

Now add the theme as a submodule by:

````shell
git submodule add --depth 1 https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn
````

Afterwards add this at the end of your `hugo.toml`.

{{< multiconfig file=hugo >}}
theme = "hugo-theme-relearn"
{{< /multiconfig >}}

## Create your Home Page

If you don't create a home page, yet, the theme will generate a placeholder text with instructions on how to proceed.

Start your journey by creating a home page:

````shell
hugo new --kind home _index.md
````

The newly created home page `content/_index.md` is empty and you obviously should add some meaningful content.

## Create your First Chapter Page

Chapters are meant to be top level pages that contain other child pages. They have a special layout style and often just contain the _title_ and a _brief abstract_ of the section.

Now create your first chapter page with the following command:

````shell
hugo new --kind chapter basics/_index.md
````

When opening the newly created file `content/basics/_index.md`, you should see the `weight` frontmatter with a number. This will be used to generate the subtitle of the chapter page, and should be set to a consecutive value starting at `1` for each chapter level.

## Create your First Content Pages

Then create content pages inside the previously created chapter. Here are three ways to create content in the chapter:

````shell
hugo new basics/first-content/_index.md
hugo new basics/second-content/index.md
hugo new basics/third-content.md
````

Feel free to edit those files by adding some sample content and replacing the `title` value in the beginning of the files.

{{% notice note %}}
Please note that Hugo overrides the default archetype template coming with this theme when using `hugo new site my-new-site`. To actually see your page later, you have to remove the `draft=true` from the page's frontmatter.
{{% /notice %}}

## Testing your Website Locally

Launch your new web site by using the following command:

````shell
hugo serve
````

Go to [`http://localhost:1313`](http://localhost:1313) in your browser.

You should notice a few things:

1. The home page contains your provided text.
2. You have the menu **Basics** in the sidebar. Clicking on it reveals three submenus with names equal to the `title` properties in the previously created content pages.
3. While you are running `hugo serve` your page refreshes automatically when you change a content page. Neat!

## Build and Deploy your Website

When your site is ready to be deployed, run the following command:

````shell
hugo
````

A `public` directory will be generated, containing all content and assets for your web site.

It now can be deployed to any web server by simply uploading its contents or you can check out one of [Hugo's many other deployment options](https://gohugo.io/hosting-and-deployment/).

{{% notice note %}}
If you are storing your web site in git, commit all but the `public` directory.
{{% /notice %}}
