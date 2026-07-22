---
title: Using VSCode with Amarel
category: coding-and-version-control
order: 2
summary: How to connect Visual Studio Code to Amarel with Remote SSH on Windows, macOS, and Linux.
---

Author: Laurence Giordano and Chelsea Sisule

Visual Studio Code, usually called VSCode, is a handy editor for coding. With the Remote SSH extension, you can edit files on Amarel from your local computer while using the VSCode interface.

Before setting this up, configure password-free SSH for Amarel. See [Terminal Basics](#terminal-basics) and [Getting Started on Amarel](#getting-started-on-amarel) for terminal and SSH background.

## Install VSCode

Install [Visual Studio Code](https://code.visualstudio.com/).

Some newer versions of VSCode may not connect cleanly to Amarel. Version 1.88 from March 2024 has worked, and version 1.96 from November 2024 has also worked.

Before setting up Remote SSH, turn off automatic updates so VSCode does not update itself into an incompatible version:

1. Open VSCode.
2. Click the gear icon in the lower-left corner.
3. Choose `Settings`.
4. Search for `Update`.
5. Disable automatic updates, or set updates to manual.

## Install Remote SSH Extensions

Open the Extensions panel in VSCode and install:

- `Remote - SSH`
- `Remote Explorer`
- `Remote - SSH: Editing Configuration Files`

## Connect To Amarel

Open the command palette:

- Windows and Linux: `Ctrl + Shift + P`
- macOS: `Cmd + Shift + P`

Search for and select:

```text
Remote-SSH: Connect to Host
```

Enter your Amarel SSH command using your own NetID:

```bash
ssh <NetID>@amarel.rutgers.edu
```

VSCode may ask which SSH configuration file to use.

On Windows, choose a path like:

```text
C:\Users\<you>\.ssh\config
```

On macOS and Linux, choose:

```bash
~/.ssh/config
```

If VSCode asks for the remote platform, choose `Linux`. If there is a host key prompt, accept it.

After setup, connect through:

```text
Remote-SSH: Connect to Host -> amarel.rutgers.edu
```

## Add Amarel Folders To Your Workspace

After connecting to Amarel, add folders to your VSCode workspace:

```text
File -> Add Folder to Workspace
```

VSCode will usually start in your Amarel home directory. You can add your home directory, project directory, or scratch directory depending on what you are working on.
