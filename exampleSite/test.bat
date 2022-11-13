set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.txt
echo disableAssetsBusting=true>>config.toml
echo disableGeneratorVersion=true>>config.toml
hugo --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version% >> metrics.%version%.txt
move /Y metrics.%version%.txt public.%version%\metrics.txt
git restore config.toml
