---
title: Gaussian on Amarel
category: scientific-packages
order: 5
summary: How to set up a Gaussian job helper script, work in scratch, submit jobs, and manage Gaussian files on Amarel.
---

These notes describe a clean workflow for running Gaussian jobs on Amarel.

## One-Time Setup

Put Gaussian helper scripts in your personal `~/bin` folder.

If you do not already have a `bin` folder, create one and add it to your `PATH`:

```bash
cd ~
mkdir -p ~/bin
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Then move into the folder:

```bash
cd ~/bin
```

Create or upload the Gaussian submission helper script named:

```text
g16_run
```

If you copied the script from a Windows-formatted file and it gives line-ending errors, convert it to Unix line endings:

```bash
sed -i 's/\r//' g16_run
```

Make the script executable:

```bash
chmod +x g16_run
```

Open `g16_run` and replace any placeholder NetID, email address, name, or account information with your own information.

## Work In Scratch

Use your scratch directory for Gaussian calculations:

```bash
cd /scratch/<NetID>
```

Create a project folder if needed:

```bash
mkdir -p gaussian
cd gaussian
```

## Request An Interactive Session

Do not run calculations on the login node. Request an interactive compute session before preparing or testing jobs:

```bash
srun --cpus-per-task=2 --time=03:00:00 --pty bash
```

This requests 2 CPUs for 3 hours. Adjust CPU count and runtime as needed. The maximum runtime depends on the partition policy.

## Load Gaussian

Load Gaussian before running jobs:

```bash
module load gaussian
```

You can check whether GaussView is available with:

```bash
gv
```

If Gaussian is not loaded correctly, output files such as `.chk` and `.log` may not be written properly.

## Submit A Gaussian Job

Gaussian input files should be saved as `.com` files.

Submit a job with:

```bash
g16_run <filename.com>
```

Replace `<filename.com>` with the actual Gaussian input file. The job should produce a `.log` output file and a `.chk` checkpoint file.

## Monitor And Cancel Jobs

Check your running jobs:

```bash
squeue -u <NetID>
```

Cancel a job:

```bash
scancel <jobID>
```

## Editing Input Files

You can edit `.com` files locally and upload them, or edit them directly on Amarel.

To edit with `vi`:

```bash
vi <filename.com>
```

Basic `vi` reminders:

- Press `i` to enter insert mode.
- Press `Esc`, then type `:w` to save.
- Press `Esc`, then type `:wq` to save and quit.
- Press `Esc`, then type `:q!` to quit without saving.

## File Safety Tips

- Temporary `.out` files and `Gau*` files can usually be deleted after jobs finish.
- Do not delete `.com`, `.chk`, or `.log` files unless you are certain they are no longer needed.
- Always save Gaussian input files from GaussView as `.com` files.
- Avoid editing `.log` files in a way that saves accidental changes.
- Do not clean up temporary Gaussian files while related jobs are still running.
