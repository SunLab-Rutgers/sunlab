---
title: Python Virtual Environment
category: coding-and-version-control
order: 4
summary: How to set up a virtual environment for a project.
author: Chong Sun
created: 2026-08-19
updated: 2026-08-19
---

Author: Chong Sun

A **virtual environment** creates an isolated Python installation for a project. It allows each project to have its own Python packages without interfering with other projects or the system Python.

## 1. Create a project directory

```bash
mkdir my-project
cd my-project
```

## 2. Check Python

```bash
python3 --version
```

For new projects, Python 3.11 or newer is generally a good choice.

On Ubuntu/Debian, if `venv` is not installed:

```bash
sudo apt install python3-venv
```

## 3. Create a virtual environment

Inside the project directory:

```bash
python3 -m venv .venv
```

This creates a directory called `.venv` containing an isolated Python environment.

Your project will look like:

```text
my-project/
├── .venv/
└── ...
```

## 4. Activate the environment

```bash
source .venv/bin/activate
```

The terminal prompt will usually change to something like:

```text
(.venv) user@computer:~/my-project$
```

Check which Python is being used:

```bash
which python
```

It should point to:

```text
.../my-project/.venv/bin/python
```

## 5. Install packages

After activating the environment, install packages normally:

```bash
pip install numpy scipy matplotlib
```

For a PyTorch project:

```bash
pip install torch
```

Check installed packages:

```bash
pip list
```

A useful habit is to use:

```bash
python -m pip install numpy
```

instead of `pip install numpy`. This guarantees that `pip` belongs to the Python interpreter you are currently using.

## 6. Leave the environment

When finished:

```bash
deactivate
```

You do **not** need to delete or recreate the environment.

The next time you work on the project:

```bash
cd my-project
source .venv/bin/activate
```

## 7. Record dependencies

To save the packages used by a project:

```bash
pip freeze > requirements.txt
```

The project now contains:

```text
my-project/
├── .venv/
├── requirements.txt
└── ...
```

Another user can reproduce the environment with:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 8. Git

Do **not** commit `.venv` to Git.

Add it to `.gitignore`:

```text
.venv/
```

Commit `requirements.txt` instead.

## 9. VS Code

Open the project directory in VS Code:

```bash
code .
```

Then select the virtual environment:

1. Open the Command Palette with `Ctrl+Shift+P`.
2. Search for `Python: Select Interpreter`.
3. Select the Python interpreter inside `.venv`.

It should look similar to:

```text
./.venv/bin/python
```

VS Code will then use the packages installed in that environment.

## Recommended Workflow

For every new Python project:

```bash
mkdir my-project
cd my-project

python3 -m venv .venv
source .venv/bin/activate

python -m pip install --upgrade pip
python -m pip install numpy scipy matplotlib
```

When returning to the project later:

```bash
cd my-project
source .venv/bin/activate
```

When finished:

```bash
deactivate
```

## Important Rules

- Use one virtual environment per project.
- Do not install research packages into the system Python.
- Do not commit `.venv` to Git.
- Record project dependencies in `requirements.txt`.
- Before installing packages, check that the correct environment is activated:

```bash
which python
```

If it points inside your project's `.venv` directory, you are using the correct environment.