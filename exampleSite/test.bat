@echo off
setlocal enabledelayedexpansion
set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.log
hugo --environment testing --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version% >> metrics.%version%.log

set "start_dir=%CD%\public.%version%"
set "output_file=dir.%version%.log"
if exist "%output_file%" del "%output_file%"
for /r "%start_dir%" %%F in (*) do (
    set "file=%%F"
    echo !file:%start_dir%\=! >> "%output_file%"
)
move /Y dir.%version%.log public.%version%\dir.log 2>&1 >NUL

move /Y metrics.%version%.log public.%version%\metrics.log 2>&1 >NUL
For /F "UseBackQ Delims==" %%A In ("public.%version%\metrics.log") Do Set "lastline=%%A"
echo %lastline%
