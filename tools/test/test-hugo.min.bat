@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

call "%~dp0test-hugo.bat" 0.141.0
