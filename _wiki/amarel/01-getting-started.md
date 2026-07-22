---
title: Getting Started on Amarel
category: amarel
order: 1
summary: Account access, login etiquette, interactive nodes, modules, support, and a starter SLURM submission file for Rutgers Amarel.
---

[Amarel](https://it.rutgers.edu/research-computing/amarel/) is the campus-wide computational cluster offered by Rutgers. This page collects the basic steps for getting access, connecting to the cluster, using compute nodes responsibly, and submitting your first jobs.

## Access Requirements

### RU Network Access

Amarel requires a Rutgers IP address. If you are connected through `RUWireless` or another Rutgers network, you should be able to connect directly. If you are off campus, connect to the [Rutgers VPN](https://it.rutgers.edu/virtual-private-network/) first.

### Requesting An Account

Request Amarel access through the Rutgers Amarel access [request form](https://it.rutgers.edu/research-computing/amarel-cluster-access-request/). After access is approved, you will log in with your Rutgers NetID and password.

## Connecting With SSH

Open a terminal and connect with:

```bash
ssh <NetID>@amarel-new.hpc.rutgers.edu
```

You will be prompted for your NetID password. If you want to avoid entering your password each time, set up SSH key-based login following the Rutgers/Amarel instructions.

### SSH without password
Here is an [instruction](https://sites.google.com/view/cluster-user-guide/amarel#h.jgwrkm9e9rwg) on how to skip entering password every time you log in.


## Cluster Etiquette

When you first connect to Amarel, you are on a login node. Use login nodes only for light tasks such as editing files, organizing directories, checking jobs, and installing small user-space software.

Do not run large calculations on login nodes. For large output or data, use your scratch directory:

```bash
/scratch/<NetID>
```

## Interactive Compute Node

For interactive work, request a compute node with `srun`:

```bash
srun --partition=main --mem=16G --time=5:00:00 --pty bash
```

You can adjust the partition, memory, and wall time. Use `sinfo` to see available partitions.

If you get disconnected from an interactive session, check your running jobs:

```bash
squeue -u $USER
```

Then reconnect to the node shown in the queue:

```bash
ssh <NodeName>
```

For repeated or production calculations, use a submission script instead of interactive sessions.

## Useful Cluster Commands

Check available partitions and nodes:

```bash
sinfo
```

This reports partition name, availability, time limit, node state, and node list. The partition name is what you use when submitting jobs.

Check detailed resources for a partition:

```bash
sinfo -N -p <partition_name> -o "%N %c %m %G %t"
```

This shows node name, CPU cores, memory, GPU resources, and state.

To request specific nodes in a SLURM submission file, add:

```bash
#SBATCH --nodelist=nodename1,nodename2,nodename3
```

## Software And Modules

Install personal packages in your home directory. You will not have permission to use system package managers such as `yum` or `apt`.

Before installing software yourself, check whether it already exists as a shared module. Add the community module directory to your `~/.bashrc`:

```bash
module use /projects/community/modulefiles
```

List available modules:

```bash
module av
```

Load a module:

```bash
module load <name/version>
```

Load necessary modules inside your job submission file. Many default tools on login nodes, such as `gcc` and `cmake`, can be old, so look for newer versions through the module system.

## Example SLURM Submission File

Save a file such as `submit.sh`:

```bash
#!/bin/bash
#SBATCH --partition=main
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
# export MKL_NUM_THREADS=1
# export OPENBLAS_NUM_THREADS=1

# Load Python environment
module purge
module load gcc
source ~/.bashrc
conda activate <YourCondaEnv>

# The command to run
srun python main.py
```

Submit the job with:

```bash
sbatch submit.sh
```

## Getting Technical Support

First try searching online or asking group members. If the issue still needs IT support, send an email to help@oarc.rutgers.edu
