@echo off
title AuraTime - Good Time / Bad Time Checker
color 0F

:: ─── Check for Node.js ───────────────────────────────────────────
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: ─── Run the CLI ─────────────────────────────────────────────────
node "%~dp0cli\interface.js" %*
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] AuraTime encountered an error.
    pause
)
