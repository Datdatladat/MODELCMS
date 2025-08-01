@echo off

REM Set environment variables for Docker registry
set IMAGE_NAME=registry.gitlab.com/ai-agent7302829/agent-code-fe
set IMAGE_TAG=1.0.2

echo Cleaning previous build...
if exist ".next" rmdir /s /q ".next"
if exist "out" rmdir /s /q "out"

echo Building Next.js application...
call npm run build

REM Check if the Next.js build was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Next.js build failed. Exiting...
    exit /b %ERRORLEVEL%
)

echo Building Docker image %IMAGE_NAME%:%IMAGE_TAG%...
call docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

REM Check if the build was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Docker build failed. Exiting...
    exit /b %ERRORLEVEL%
)

REM Push the Docker image to the registry
echo Pushing Docker image to %IMAGE_NAME%:%IMAGE_TAG%...
call docker push %IMAGE_NAME%:%IMAGE_TAG%

REM Check if the push was successful
IF %ERRORLEVEL% NEQ 0 (
    echo Docker push failed. Exiting...
    exit /b %ERRORLEVEL%
)

echo Docker image %IMAGE_NAME%:%IMAGE_TAG% built and pushed successfully.
pause