@echo off
setlocal enabledelayedexpansion
set hugo_major=0
set hugo_minor=95
set hugo_patch=0
set /p version=<..\layouts\partials\version.txt
echo %version%>metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.log
hugo.%hugo_major%.%hugo_minor%.%hugo_patch% --environment testing --templateMetrics --templateMetricsHints --cleanDestinationDir --destination public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch% >> metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.log

set "start_dir=%CD%\public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%"
set "output_file=dir.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.log"
if exist "%output_file%" del "%output_file%"
for /r "%start_dir%" %%F in (*) do (
    set "file=%%F"
    echo !file:%start_dir%\=! >> "%output_file%"
)
move /Y dir.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.log public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%\dir.log 2>&1 >NUL

move /Y metrics.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%.log public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%\metrics.log 2>&1 >NUL
For /F "UseBackQ Delims==" %%A In ("public.%version%.hugo.%hugo_major%.%hugo_minor%.%hugo_patch%\metrics.log") Do Set "lastline=%%A"
echo %lastline%
