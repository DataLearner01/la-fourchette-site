@echo off
rem Builds the site and serves it on this computer. Double-click to start;
rem close this window to stop. The browser opens once the site is ready.
cd /d "%~dp0"
title La Fourchette - site en cours
echo.
echo  Preparation du site (environ une minute)...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo  La preparation a echoue. Envoyez ce message a Claude.
  pause
  exit /b 1
)
echo.
echo  Le site est ouvert sur http://127.0.0.1:4322/
echo  Gardez cette fenetre ouverte. Fermez-la pour arreter le site.
echo.
start "" cmd /c "timeout /t 4 >nul & start http://127.0.0.1:4322/"
call npx astro preview --port 4322 --host 127.0.0.1
pause
