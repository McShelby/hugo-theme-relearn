@echo off
setlocal enabledelayedexpansion
set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.log
echo disableAssetsBusting=true>>config.toml
echo disableGeneratorVersion=true>>config.toml
echo disableRandomIds=true>>config.toml
hugo --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version% >> metrics.%version%.log

set "start_dir=%CD%\public.%version%"
set "output_file=dir.%version%.log"
if exist "%output_file%" del "%output_file%"
for /r "%start_dir%" %%F in (*) do (
    set "file=%%F"
    echo !file:%start_dir%\=! >> "%output_file%"
)
move /Y dir.%version%.log public.%version%\dir.log 2>&1 >NUL

move /Y metrics.%version%.log public.%version%\metrics.log 2>&1 >NUL
git restore config.toml
For /F "UseBackQ Delims==" %%A In ("public.%version%\metrics.log") Do Set "lastline=%%A"
echo %lastline%
