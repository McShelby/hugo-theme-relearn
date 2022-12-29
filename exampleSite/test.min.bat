@echo off
set hugo_major=0
set hugo_minor=95
set hugo_patch=0
set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.txt
echo disableAssetsBusting=true>>config.toml
echo disableGeneratorVersion=true>>config.toml
hugo.%hugo_major%.%hugo_minor%.%hugo_patch% --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch% >> metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.txt
move /Y metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.txt public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%\metrics.txt 2>&1 >NUL
git restore config.toml
For /F "UseBackQ Delims==" %%A In ("public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%\metrics.txt") Do Set "lastline=%%A"
echo %lastline%
