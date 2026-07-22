---
title: Quantum ESPRESSO on Amarel
category: scientific-packages
order: 4
summary: How to load Quantum ESPRESSO, organize pseudopotentials, and submit QE jobs on Amarel.
---

These notes describe how to set up and run Quantum ESPRESSO on Amarel.

Before doing setup or computational work, request an interactive compute session instead of working on the login node:

```bash
srun --cpus-per-task=2 --time=03:00:00 --pty bash
```

This requests 2 CPUs for 3 hours.

## Add A QE Loader To Bash

Open your `~/.bashrc` file:

```bash
nano ~/.bashrc
```

Add this function at the bottom:

```bash
# Load Quantum ESPRESSO environment on Amarel
function qeload() {
  module purge
  module use /projects/community/modulefiles
  module load intel/19.0.3
  module load QE/6.4.1_intel19.0.3-kholodvl
}
```

If you are using `nano`, press `Ctrl + O`, then `Enter` to save. Press `Ctrl + X` to exit.

Reload your shell settings:

```bash
source ~/.bashrc
```

Whenever you want to run Quantum ESPRESSO, load the environment with:

```bash
qeload
```

You can then run a QE input file manually:

```bash
pw.x -in inputfile.pwi | tee inputfile.pwo
```

## Prepare Pseudopotentials

Quantum ESPRESSO needs access to the correct pseudopotential files, usually `.UPF` files.

Useful sources include:

- [Quantum ESPRESSO pseudopotentials](http://www.quantum-espresso.org/pseudopotentials)
- [SSSP efficiency table](https://www.materialscloud.org/discover/sssp/table/efficiency)
- [PseudoDojo](https://www.pseudo-dojo.org/)

For most jobs, place the pseudopotential files in a folder near your `.pwi` input files.

Use your scratch directory for computational work:

```bash
cd /scratch/<NetID>
```

Create a QE working directory and a pseudopotential directory:

```bash
mkdir -p qe/pseudo
cd qe
```

Upload the relevant `.UPF` files into:

```bash
/scratch/<NetID>/qe/pseudo
```

Make sure your `.pwi` input file points to the correct pseudopotential directory.

## Optional Run Script

You can create a helper command called `qe_run` to submit QE input files to SLURM.

Create `~/bin` if it does not exist:

```bash
mkdir -p ~/bin
```

Create `~/bin/qe_run` with the following content. Replace `<NetID>` with your Rutgers NetID.

```bash
#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "Usage: qe_run inputfile.pwi"
  exit 1
fi

INPUT="$1"
BASENAME="${INPUT%.pwi}"

sbatch <<SBATCH
#!/bin/bash
#SBATCH --partition=main
#SBATCH --job-name=qe-${BASENAME}
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --mem=8G
#SBATCH --time=24:00:00
#SBATCH --mail-type=END,FAIL,REQUEUE
#SBATCH --mail-user=<NetID>@rutgers.edu
#SBATCH --requeue
#SBATCH --export=ALL

source ~/.bashrc
qeload

pw.x -in "$INPUT" | tee "${BASENAME}.pwo"
SBATCH
```

Make the script executable:

```bash
chmod +x ~/bin/qe_run
```

Make sure `~/bin` is on your `PATH`. If needed, add this to `~/.bashrc`:

```bash
export PATH="$HOME/bin:$PATH"
```

Then reload:

```bash
source ~/.bashrc
```

## Submit A QE Job

Go to the directory containing your `.pwi` file:

```bash
cd /scratch/<NetID>/qe
```

Submit the job:

```bash
qe_run <filename>.pwi
```

The script submits the job to the queue and sends email updates when the job ends, fails, or is requeued. If a job is preempted, SLURM can requeue it and run it again when resources become available.
