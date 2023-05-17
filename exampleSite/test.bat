@echo off
set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.txt
echo disableAssetsBusting=true>>config.toml
echo disableGeneratorVersion=true>>config.toml
echo disableRandomIds=true>>config.toml
hugo --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version% >> metrics.%version%.txt
move /Y metrics.%version%.txt public.%version%\metrics.txt 2>&1 >NUL
git restore config.toml
For /F "UseBackQ Delims==" %%A In ("public.%version%\metrics.txt") Do Set "lastline=%%A"
echo %lastline%
