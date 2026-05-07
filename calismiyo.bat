@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js yok: https://nodejs.org
  pause
  exit /b 1
)
if not exist "node_modules\" (
  echo npm install...
  call npm install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Aciliyor: http://127.0.0.1:5173/
call npm start
pause
