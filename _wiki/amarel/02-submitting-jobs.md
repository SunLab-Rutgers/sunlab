---
title: Submitting Jobs on Amarel
category: amarel
order: 2
summary: Software modules, useful SLURM commands, and a starter job submission script for Amarel.
---

Read the Amarel instruction page carefully before submitting your first job.

## Installing Packages

Install personal packages in your home directory. You will not be able to use system package managers such as `yum` or `apt` on Amarel.

## Loading Modules

Before installing a package, check whether it already exists in the shared modules. Amarel has different module directories. To access more shared modules, add this line to your `~/.bashrc`:

```bash
module use /projects/community/modulefiles
```

Then list available modules:

```bash
module av
```

Load a module with:

```bash
module load <name/version>
```

Load all necessary modules in your job submission file. Many default packages on the login node, such as `gcc` and `cmake`, are quite old, so look for newer versions in the module system.

## Useful Cluster Commands

Check available nodes:

```bash
sinfo
```

This prints information including:

- `PARTITION`: the partition name you specify when submitting a job.
- `TIMELIMIT`: the maximum job time you can request.
- `STATE`: whether nodes are available.
- `NODELIST`: the specific nodes in the partition.

To request specific nodes in a submission file, add:

```bash
#SBATCH --nodelist=nodename1,nodename2,nodename3
```

Check resources for a partition:

```bash
sinfo -N -p $partition_name -o "%N %c %m %G %t"
```

This reports node name, number of cores, maximum total memory, number of GPUs, and node state.

## Example Submission File

Save a file such as `submit.sh`:

```bash
#!/bin/bash
#SBATCH --partition=main,main-redhat
#SBATCH --job-name=jobname
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem=12000
#SBATCH --time=10:00:00
#SBATCH --export=ALL
#SBATCH --requeue

# Threading limits
export OMP_NUM_THREADS=8
export MKL_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1

# Load Python environment
module purge
module load gcc
source ~/.bashrc
conda activate <YourCondaEnv>

# Run the job
srun python main.py
```

Submit the job with:

```bash
sbatch submit.sh
```
