@echo off
setlocal

if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Java\jdk-24" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-24"
        set "PATH=C:\Program Files\Java\jdk-24\bin;%PATH%"
    )
)

set "MAVEN_BIN="
for /r "%USERPROFILE%\.m2\wrapper" %%i in (mvn.cmd) do (
    if exist "%%i" if not defined MAVEN_BIN set "MAVEN_BIN=%%i"
)
if not defined MAVEN_BIN (
    if exist "C:\Users\josec\.m2\wrapper\dists\apache-maven-3.9.16\0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0\bin\mvn.cmd" (
        set "MAVEN_BIN=C:\Users\josec\.m2\wrapper\dists\apache-maven-3.9.16\0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0\bin\mvn.cmd"
    )
)

if defined MAVEN_BIN (
    call "%MAVEN_BIN%" %*
) else (
    mvn %*
)


