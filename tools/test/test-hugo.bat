@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set hvm_version=latest
set hugo_prefix=
set hugo_environment=testing
if not "%~1"=="" (
    set hvm_version=%1
    set hugo_prefix=.hugo
)

if not exist "content" (
    echo No content directory found.
    exit /b
)

rem Relearn theme docs & exampleSite
set "themeDir=%CD%\.."
if not exist "%themeDir%\layouts\partials\version.txt" (
    rem other sites stored parallel to Relearn themes directory
    set "themeDir=%CD%\..\hugo-theme-relearn"
)
if not exist "%themeDir%\layouts\partials\version.txt" (
    rem other sites stored inside of repos directory parallel to Relearn theme directory
    set "themeDir=..\..\hugo-theme-relearn"
)
if not exist "%themeDir%\layouts\partials\version.txt" (
    rem regular theme users
    set "themeDir=%CD%\themes\hugo-theme-relearn"
)
if not exist "%themeDir%\layouts\partials\version.txt" (
    rem theme users with custom theme name
    set "themeDir=%CD%\themes\relearn"
)
if not exist "%themeDir%\layouts\partials\version.txt" (
    echo Relearn theme not found.
    exit /b
)

set "configDir="
if "%hugo_environment%"=="" (
    rem No environment given, which is fine
) else if exist "%themeDir%\docs\config\%hugo_environment%\hugo.toml" (
    rem New themes docs
    set "configDir=%themeDir%\docs\config\%hugo_environment%"
) else if exist "%themeDir%\exampleSite\config\%hugo_environment%\hugo.toml" (
    rem Old themes docs inside of exampleSite
    set "configDir=%themeDir%\exampleSite\config\%hugo_environment%"
) else (
    echo Environment configuration %hugo_environment% not found.
    exit /b
)

set "config="
if "%hugo_environment%"=="" (
    rem No environment given, which is fine
) else if exist "%CD%\config\%hugo_environment%" (
    rem seems we are in the themes docs, no need to copy anything
    set config=--environment %hugo_environment%
) else if exist "%CD%\config.toml" (
    set config=--config config.toml,%configDir%\hugo.toml
) else if exist "%CD%\hugo.toml" (
    set config=--config hugo.toml,%configDir%\hugo.toml
) else if exist "config" (
    copy /e /i /y "%configDir%" "%CD%\config\%hugo_environment%"
    set config=--environment %hugo_environment%
) else if exist "%CD%\hugo" (
    copy /e /i /y "%configDir%" "%CD%\hugo\%hugo_environment%"
    set config=--environment %hugo_environment%
) else (
    echo Environment configuration can not be applied.
    exit /b
)

hvm use %hvm_version% 2>&1 >NUL
set /p hvm_content=<".hvm"
set "hugo_version=+hugo.%hvm_content:~1%"

set /p version=<"%themeDir%\layouts\partials\version.txt"
set "theme_version=.%version%"
echo %version%>"%CD%\metrics%theme_version%%hugo_prefix%%hugo_version%.log"

echo on
start /d "%CD%" /wait /b cmd /c hugo %config% --printPathWarnings --printI18nWarnings --templateMetrics --templateMetricsHints --cleanDestinationDir --logLevel info --destination "%CD%\public%theme_version%%hugo_prefix%%hugo_version%" >> "%CD%\metrics%theme_version%%hugo_prefix%%hugo_version%.log" 2>&1
@echo off

set "start_dir=%CD%\public%theme_version%%hugo_prefix%%hugo_version%"
set "output_file=%CD%\dir%theme_version%%hugo_prefix%%hugo_version%.log"
if exist "%output_file%" del "%output_file%"
for /r "%start_dir%" %%F in (*) do (
    set "file=%%F"
    echo !file:%start_dir%\=! >> "%output_file%"
)
move /Y "%CD%\dir%theme_version%%hugo_prefix%%hugo_version%.log" "%CD%\public%theme_version%%hugo_prefix%%hugo_version%\dir.log" 2>&1 >NUL

move /Y "%CD%\metrics%theme_version%%hugo_prefix%%hugo_version%.log" "%CD%\public%theme_version%%hugo_prefix%%hugo_version%\metrics.log" 2>&1 >NUL
for /F "UseBackQ Delims==" %%A In ("%CD%\public%theme_version%%hugo_prefix%%hugo_version%\metrics.log") do Set "lastline=%%A"
echo %lastline%
