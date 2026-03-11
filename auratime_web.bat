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
echo.
echo  Starting AuraTime Web Server...
echo  Opening http://localhost:3000/pwa in your default browser...
echo.

:: Open the browser asynchronously
start http://localhost:3000/pwa

:: Start the server locally in the current directory
cd /d "%~dp0"
call npx -y serve . -l 3000

if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Failed to start the server.
    pause
)
