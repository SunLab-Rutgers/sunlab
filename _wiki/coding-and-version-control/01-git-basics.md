---
title: Using GitHub
category: coding-and-version-control
order: 1
summary: Basic Git commands, branch workflows, and GitHub account setup for group projects.
---

We use Git for version control and GitHub for sharing code, collaborating on projects, and keeping track of changes.

When you are unsure what to do, search online first and check the state of your repository before running commands that modify files.

## Git Commands

To get started, you will need the following commands.

## Basics

Initialize a Git repository in the current directory:

```bash
git init
```

This creates a `.git` tracker, and your directory becomes a repository.

Stage a file:

```bash
git add FILE_NAME
```

Create a commit:

```bash
git commit -m "MESSAGE"
```

After you stage files, this command creates a timestamped commit containing the tracked changes.

Check repository status:

```bash
git status
```

This shows your current branch, modified files, and staged files.

Show previous commits:

```bash
git log
```

Show unstaged changes:

```bash
git diff
```

Show unstaged changes for one file:

```bash
git diff FILE_NAME
```

## Branches

Sometimes you already have a good version of a package, but you want to add features without disturbing the current working version. The best practice is to start a new branch.

Show all branches:

```bash
git branch
```

Switch to an existing branch:

```bash
git checkout BRANCH_NAME
```

Create a new branch from your current branch and switch to it:

```bash
git checkout -b BRANCH_NAME
```

## GitHub Basics

Create a GitHub account:

[Creating an account on GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)

Set up your account locally:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Add SSH keys to your GitHub account:

[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

Clone a repository to your local device or server:

[Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## Basic Workflow

```bash
git status
git pull
git checkout -b feature/my-change
git add .
git commit -m "Describe the change"
git push
```

Prefer small commits with clear messages.
