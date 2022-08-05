+++
title = "Multilingual and i18n"
weight = 7
+++

The Relearn theme is fully compatible with Hugo multilingual mode.

It provides:

- Translation strings for default values (English, Piratized English, Arabic, Simplified Chinese, Traditional Chinesse, Dutch, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Turkish, Vietnamese). Feel free to contribute!
- Automatic menu generation from multilingual content
- In-browser language switching

![I18n menu](i18n-menu.gif?classes=shadow&width=300px)

## Basic configuration

After learning [how Hugo handle multilingual websites](https://gohugo.io/content-management/multilingual), define your languages in your `config.toml` file.

For example with current English and Piratized English website.

```toml
# English is the default language
defaultContentLanguage = "en"

[Languages]
[Languages.en]
title = "Hugo Relearn Theme"
weight = 1
languageName = "English"

[Languages.pir]
title = "Cap'n Hugo Relearrrn Theme"
weight = 2
languageName = "Arrr! Pirrrates"
```

Then, for each new page, append the *id* of the language to the file.

- Single file `my-page.md` is split in two files:
    - in English: `my-page.md`
    - in Piratized English: `my-page.pir.md`
- Single file `_index.md` is split in two files:
    - in English: `_index.md`
    - in Piratized English: `_index.pir.md`

{{% notice info %}}
Be aware that only translated pages are displayed in menu. It's not replaced with default language content.
{{% /notice %}}

{{% notice tip %}}
Use [slug](https://gohugo.io/content-management/multilingual/#translate-your-content) frontmatter parameter to translate urls too.
{{% /notice %}}

## Search

In case each page's content is written in one single language only, the above configuration will already configure the site's search functionality correctly.

{{% notice warning %}}
Although the theme supports a wide variety of supported languages, the site's search does not.
You'll see error reports in your browsers console log for each unsupported language. Currently unsupported are:

- Indonesian
- Korean
- Polish
{{% /notice %}}

### Search with mixed language support

In case your page's content contains text in multiple languages (e.g. you are writing a russian documentation for your english API), you can add those languages to your `config.toml` to broaden search.

```toml
[params]
  additionalContentLanguage = [ "en" ]
````

As this is an array, you can add multiple additional languages.

{{% notice note %}}
Keep in mind that the language code required here, is the base language code. E.g. if you have additonal content in `zh-CN`, you have to add just `zh` to this parameter.
{{% /notice %}}

## Overwrite translation strings

Translations strings are used for common default values used in the theme (*Edit* button, *Search placeholder* and so on). Translations are available in English and Piratized English but you may use another language or want to override default values.

To override these values, create a new file in your local i18n folder `i18n/<idlanguage>.toml` and inspire yourself from the theme `themes/hugo-theme-relearn/i18n/en.toml`

## Disable language switching

Switching the language in the browser is a great feature, but for some reasons you may want to disable it.

Just set `disableLanguageSwitchingButton=true` in your `config.toml`

```toml
[params]
  # When using mulitlingual website, disable the switch language button.
  disableLanguageSwitchingButton = true
```
