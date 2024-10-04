+++
description = "Configure the header and footer of the sidebar"
options = ["disableLandingPageButton", "showVisitedLinks"]
title = "Header & Footer"
weight = 2
+++

## Home Button Configuration

If `params.disableLandingPageButton=true`, the Home button will be hidden  on the left menu.

If you display the Home button, it is an alternative for clicking on the logo. To edit its logo or text, you will have to configure the `landingPageName` for the defined languages

{{< multiconfig file=hugo >}}
[languages]
[languages.en]
[languages.en.params]
landingPageName = "<i class='fa-fw fas fa-home'></i> Home"
[languages.pir]
[languages.pir.params]
landingPageName = "<i class='fa-fw fas fa-home'></i> Arrr! Homme"
{{< /multiconfig >}}

If this option is not configured for a specific language, they will get their default values of

{{< multiconfig >}}
[params]
landingPageName = "<i class='fa-fw fas fa-home'></i> Home"
{{< /multiconfig >}}

The home button is going to look like this:

![Default Home Button](home_button_defaults.png?width=18.75rem)

## History

Set `params.showVisitedLinks=true` to show checkmarks for visited pages of the main menu. This also causes the display of the `Clear History` entry in the lower part of the menu to remove all checkmarks. The checkmarks will also been removed if you regenerate your site as the used ids are not stable.

## Footer

You can change the menu footer by overriding the partial `layouts/partials/menu-footer.html`. See the [Partials section](configuration/modifications/partials) for more customization options.
