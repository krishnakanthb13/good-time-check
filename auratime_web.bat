@echo off
title AuraTime - PWA Web Server
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

:: ─── Launch Browser and Server ───────────────────────────────────
echo  Starting AuraTime Web Server...
echo  Opening http://localhost:3003/pwa in your default browser...
echo.
echo  ------------------------------------------------
echo  [INFO] Press Ctrl + C, then Y to close the server cleanly.
echo  ------------------------------------------------

:: Open the browser asynchronously after a 3-second delay to let the server start
start /b cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3003/pwa"

:: Start the server locally via npm to preserve correct shutdown handling
cd /d "%~dp0"
call npm run serve
