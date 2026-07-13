@echo off
echo ================================
echo   FuPanBao - Quick Start
echo ================================
echo.

findstr "your_api_key_here" "backend\.env" >nul 2>&1
if %errorlevel%==0 (
    echo [WARNING] Please set Fuyao API Key in backend\.env
    echo.
)

echo [1/2] Starting backend ^(port 8000^)...
start "FuPanBao-Backend" cmd /k "cd /d D:\py project\fupanbao\backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/2] Starting frontend ^(port 5173^)...
start "FuPanBao-Frontend" cmd /k "cd /d D:\py project\fupanbao\frontend && npx vite --host 0.0.0.0 --port 5173"

echo.
echo ================================
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8000
echo   API Docs : http://localhost:8000/docs
echo ================================
echo.
pause
