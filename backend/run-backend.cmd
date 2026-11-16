@echo off
setlocal

echo ========================================================
echo   Iniciando TechInventory ^& CashFlow - Backend Spring Boot
echo ========================================================

REM 1. Configurar JAVA_HOME si no existe
if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Java\jdk-24" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-24"
        set "PATH=C:\Program Files\Java\jdk-24\bin;%PATH%"
    ) else if exist "C:\Program Files\Java\jdk-21" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-21"
        set "PATH=C:\Program Files\Java\jdk-21\bin;%PATH%"
    ) else if exist "C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot" (
        set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
        set "PATH=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot\bin;%PATH%"
    )
)

REM 2. Intentar ejecutar con Maven Wrapper
if exist mvnw.cmd (
    echo Compilando y ejecutando con Maven Wrapper...
    call mvnw.cmd spring-boot:run
    if %ERRORLEVEL% equ 0 goto :eof
)

REM 3. Fallback directo con Java y las clases compiladas
echo Ejecutando via Java directo...
set "CP=target\classes"
for /r "%USERPROFILE%\.m2\repository" %%i in (*.jar) do (
    call set "CP=%%CP%%;%%i"
)
java -cp "%CP%" com.almacen.it.InventarioApplication

