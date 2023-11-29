@echo off
setlocal enabledelayedexpansion

set hugo_prefix=
set hugo_version=
if not "%~1"=="" (
    set hugo_prefix=.hugo
    set hugo_version=.%1
)

set "versionFile=..\layouts\partials\version.txt"
if not exist "%versionFile%" (
    set "versionFile=..\hugo-theme-relearn\layouts\partials\version.txt"
)
set /p version=<"%versionFile%"
echo %version%>"metrics.%version%%hugo_prefix%%hugo_version%.log"

set config=--environment testing
if exist "config\testing" (
    rem Seems we are in the themes exampleSite, no need to copy anything
) else if exist "config.toml" (
    set config=--config config.toml,..\hugo-theme-relearn\exampleSite\config\testing\hugo.toml
) else if exist "hugo.toml" (
    set config=--config hugo.toml,..\hugo-theme-relearn\exampleSite\config\testing\hugo.toml
) else if exist "config" (
    copy /e /i /y "..\hugo-theme-relearn\exampleSite\config\testing" "config\testing"
) else if exist "hugo" (
    copy /e /i /y "..\hugo-theme-relearn\exampleSite\config\testing" "hugo\testing"
)

hugo%hugo_version% %config% --templateMetrics --templateMetricsHints --printI18nWarnings --printPathWarnings --printUnusedTemplates --cleanDestinationDir --destination "public.%version%%hugo_prefix%%hugo_version%" >> "metrics.%version%%hugo_prefix%%hugo_version%.log"

set "start_dir=%CD%\public.%version%%hugo_prefix%%hugo_version%"
set "output_file=dir.%version%%hugo_prefix%%hugo_version%.log"
if exist "%output_file%" del "%output_file%"
for /r "%start_dir%" %%F in (*) do (
    set "file=%%F"
    echo !file:%start_dir%\=! >> "%output_file%"
)
move /Y "dir.%version%%hugo_prefix%%hugo_version%.log" "public.%version%%hugo_prefix%%hugo_version%\dir.log" 2>&1 >NUL

move /Y "metrics.%version%%hugo_prefix%%hugo_version%.log" "public.%version%%hugo_prefix%%hugo_version%\metrics.log" 2>&1 >NUL
For /F "UseBackQ Delims==" %%A In ("public.%version%%hugo_prefix%%hugo_version%\metrics.log") Do Set "lastline=%%A"
echo %lastline%
