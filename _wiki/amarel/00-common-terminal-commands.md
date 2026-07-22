---
title: Common Terminal Commands
category: amarel
order: 0.5
summary: Keyboard shortcuts, navigation, file operations, text viewing, search, and editor basics for terminal users.
---

This wiki is copied and adapted from a GitHub Gist by Brad Traversy.

## Key Commands And Navigation

Before looking at common terminal commands, here are a few helpful keyboard shortcuts.

- `Up Arrow`: show your previous command.
- `Down Arrow`: show your next command.
- `Tab`: auto-complete your command.
- `Ctrl + L`: clear the screen.
- `Ctrl + C`: cancel a command.
- `Ctrl + R`: search command history.
- `Ctrl + D`: exit the terminal.

## Manual Pages

On Linux and macOS, the `man` command shows the manual page for a command:

```bash
man ls
```

If you are on Windows and using Git Bash, `man` may not be available. Instead, use `--help` after a command:

```bash
ls --help
```

Use the arrow keys or `Page Up` / `Page Down` to scroll. Press `q` to exit.

## Information

```bash
whoami  # Show the current user
date    # Display the current date and time
```

## File System Navigation

```bash
pwd                                  # Show the full path to the current directory
ls                                   # List directory contents
ls -a                                # List contents including hidden files
ls -l                                # List contents with details
ls -r                                # List contents in reverse order
cd                                   # Change to home directory
cd [dirname]                         # Change to a specific directory
cd ~                                 # Change to home directory
cd ..                                # Change to parent directory
cd -                                 # Change to previous directory
find [dirtosearch] -name [filename]  # Find a file by name
```

## Modifying Files And Directories

```bash
mkdir [dirname]              # Make directory
touch [filename]             # Create file
rm [filename]                # Remove file
rm -i [filename]             # Remove file with confirmation
rm -r [dirname]              # Remove directory
rm -rf [dirname]             # Remove directory with contents
rm ./*                       # Remove everything in the current folder
cp [filename] [dirname]      # Copy file
mv [filename] [dirname]      # Move file
mv [dirname] [dirname]       # Move directory
mv [filename] [filename]     # Rename file or folder
mv [filename] [filename] -v  # Rename verbosely
```

You can also chain commands:

```bash
cd test2 && mkdir test3
```

## Reading And Editing Files

Common command-line text editors include `vim` / `vi`, `emacs`, and `nano`.

To edit a file with Vim:

```bash
vim filename
```

Each editor has its own commands. If you get stuck, these shortcuts exit without saving:

- Vim: press `Esc` to enter command mode, then type `:q!`.
- Emacs: type `Ctrl + X`, then `Ctrl + C`.
- Nano: type `Ctrl + X`.

## Reading Files Without Editors

```bash
cat [filename]       # Display file contents
less [filename]      # Scroll through a file; press q to exit
head [filename]      # Display the first 10 lines
head -n 5 [filename] # Display the first 5 lines
tail [filename]      # Display the last 10 lines
tail -n 15 [filename]# Display the last 15 lines
```

## The Grep Command

`grep` locates a keyword in one file or many files. It is especially useful when you are looking for a function, line of code, or setting inside a directory.

```bash
grep [keyword] [filename]  # Find where keyword appears in a file
grep [keyword] -r *        # Find where keyword appears in the current directory
```

## The Find Command

Use `find` to check whether a file exists inside a directory:

```bash
find [directory] -name [filename]
```

## Conclusion

You can do almost everything you do with a cursor in a terminal. When you are unsure, search for "how do I do xxx in a terminal" and try the command on a small test file or directory first.
