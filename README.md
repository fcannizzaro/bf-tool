# bf-tool
Simple Bison, Flex and GCC Utility

[![npm version](https://badge.fury.io/js/bf-tool.svg)](https://badge.fury.io/js/bf-tool)

        ____  ______   ______            __
       / __ )/ ____/  /_  __/___  ____  / /
      / __  / /_       / / / __ \/ __ \/ / 
     / /_/ / __/      / / / /_/ / /_/ / /  
    /_____/_/        /_/  \____/\____/_/  

## Windows
It uses custom binaries for gcc, flex and bison.

## Install
`npm i -g bf-tool`

## Usage

### new 
Create and init a new project.

`bf-tool new "project"`

### init
Auto generate .l and .y files.

`bf-tool init`

### run
Compile Bison, Flex, GCC and print error / result.

`bf-tool run <expression> <flags>`

### --v | --version
CLI info.

## Flags

### -f | -file
Use a file as input.

`-f in.txt `

### -c | -compile
Add other files that should be compiled.

`-c "path/to/file1.c path/to/file2.c"`

### -d
Use default input file (**in.txt**).

### -w | -watch
Build/Run on files change.

### -o | -only
Compile but not run executable.

### -v | -verbose
Bison -v flag.

## License
MIT License