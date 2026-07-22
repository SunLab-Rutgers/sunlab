---
title: Terminal Basics
category: amarel
order: 0
summary: A short introduction to terminals, shells, and startup files for working with remote clusters.
---

A terminal is an essential platform for programmers. While IDEs are familiar and useful, a terminal is often more convenient for working with remote clusters.

You can also connect to a remote cluster with other applications, including Visual Studio Code, PyCharm, Atom, and Cursor. Find the tools that feel most comfortable for your workflow.

## Getting A Terminal

Depending on your operating system, there are different choices for a terminal.

### Linux And MacOS

A terminal is natively supported and usually already installed. If not, look for the terminal application through your system app store or software manager.

### Windows

Install Windows Subsystem for Linux following the [Microsoft WSL installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install).

## Working With A Terminal

In a terminal, you type commands into the command line. There are slight differences between operating systems, but most common commands are shared across Linux, macOS, and WSL.

For a starter list, see [Common Terminal Commands](#common-terminal-commands).

## Shell Startup Files

Each time you start a terminal, your shell settings are initialized from a startup file. The file depends on which shell you use.

For many Linux systems, the default shell is Bash, which uses:

```bash
~/.bashrc
```

For many macOS systems, the default shell is Zsh, which uses:

```bash
~/.zshrc
```

These files are located in your home directory. By customizing the appropriate file, you can make terminal work easier with a highlighted interface, useful aliases, and customized paths.
