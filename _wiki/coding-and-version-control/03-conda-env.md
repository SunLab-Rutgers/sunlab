---
title: Python Environments with Miniconda
category: coding-and-version-control
order: 3
summary: How to set up a conda environment.
author: Chong Sun
created: 2026-08-19
updated: 2026-08-19
---

Author: Chong Sun


[Conda](https://docs.conda.io/) is a package and environment manager. It is useful for scientific computing because it can manage both Python versions and software dependencies.

**Miniconda** is a minimal installation of Conda. It is generally sufficient for research computing and avoids installing the large collection of packages included with Anaconda.

## 1. Install Miniconda

Go to the official Miniconda download page:

https://www.anaconda.com/docs/getting-started/miniconda/install

For a Linux machine, first check the CPU architecture:

```bash
uname -m
```

Typical results are:

```text
x86_64
```

for an Intel/AMD machine, or

```text
aarch64
```

for an ARM machine.

Download the appropriate Linux installer from the Miniconda website.

For example, on an x86-64 Linux machine:

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

Run the installer:

```bash
bash Miniconda3-latest-Linux-x86_64.sh
```

Follow the prompts. When asked whether to initialize Miniconda, choose:

```text
yes
```

After installation, close and reopen the terminal.

Check that Conda is available:

```bash
conda --version
```

You should see something similar to:

```text
conda 25.x.x
```

## 2. Create a Conda Environment

Do not install research packages directly into the `base` environment.

Instead, create a separate environment for each project:

```bash
conda create -n my-project python=3.11
```

Here:

- `my-project` is the environment name.
- `python=3.11` specifies the Python version.

Conda will show the packages it plans to install. Enter:

```text
y
```

to continue.

## 3. Activate the Environment

Activate it with:

```bash
conda activate my-project
```

The terminal prompt should change to something similar to:

```text
(my-project) user@computer:~$
```

Check the Python interpreter:

```bash
which python
```

It should point somewhere inside your Miniconda installation, for example:

```text
~/miniconda3/envs/my-project/bin/python
```

Also check the Python version:

```bash
python --version
```

## 4. Install Packages

Packages can be installed using Conda:

```bash
conda install numpy scipy matplotlib
```

You can search for a package with:

```bash
conda search numpy
```

You can also use `pip` inside a Conda environment:

```bash
python -m pip install some-package
```

A useful rule is:

> Install as much as possible with Conda first. Use `pip` afterward for packages that are unavailable or more conveniently installed through PyPI.

For example:

```bash
conda install numpy scipy matplotlib
python -m pip install torch-geometric
```

Avoid repeatedly alternating between `conda install` and `pip install` after the environment becomes complicated, since this can make dependency resolution harder.

## 5. List Environments

To see your Conda environments:

```bash
conda env list
```

For example:

```text
base                  *  /home/user/miniconda3
my-project               /home/user/miniconda3/envs/my-project
```

The `*` indicates the currently active environment.

## 6. Leave and Return to an Environment

When finished working:

```bash
conda deactivate
```

Later, reactivate the environment with:

```bash
conda activate my-project
```

You do not need to recreate the environment each time.

## 7. Record the Environment

For reproducible research, save the environment configuration:

```bash
conda env export > environment.yml
```

The file contains information about the Python version and installed packages.

Another user can recreate the environment with:

```bash
conda env create -f environment.yml
```

Then activate it:

```bash
conda activate my-project
```

For a cleaner, more portable specification containing mainly the packages you explicitly requested, use:

```bash
conda env export --from-history > environment.yml
```

This is often preferable for sharing an environment between different computers or operating systems.

## 8. Remove an Environment

If an environment is no longer needed:

```bash
conda deactivate
conda env remove -n my-project
```

This removes the environment and its installed packages.

## 9. Use the Environment in VS Code

Open your project:

```bash
code .
```

In VS Code:

1. Open the Command Palette with `Ctrl+Shift+P`.
2. Search for `Python: Select Interpreter`.
3. Select the interpreter associated with your Conda environment.

It should look similar to:

```text
Python 3.11 ('my-project': conda)
```

You can verify the interpreter from the VS Code terminal:

```bash
which python
```

## Recommended Workflow

For a new research project:

```bash
conda create -n my-project python=3.11
conda activate my-project

conda install numpy scipy matplotlib
```

Install any additional packages required by the project:

```bash
python -m pip install package-name
```

Record the environment:

```bash
conda env export --from-history > environment.yml
```

When returning to the project:

```bash
conda activate my-project
```

When finished:

```bash
conda deactivate
```

## Important Rules

- Create a separate environment for each research project.
- Do not install project dependencies into the `base` environment.
- Specify the Python version when creating an environment.
- Use Conda for major scientific dependencies when practical.
- Use `pip` inside the activated environment when needed.
- Save an `environment.yml` file for reproducibility.
- Before installing packages, check which environment is active:

```bash
conda env list
which python
```