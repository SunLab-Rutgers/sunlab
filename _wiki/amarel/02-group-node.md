---
title: Group Node
category: amarel
order: 3
summary: Sun Lab group node access, storage, and SLURM settings on Amarel.
---
We have one CPU and one GPU node on Amarel dedicated to the Sun Lab. The partition name and project name are shared inside the group.
To be added to the group nodes, send a request to Chong. 

To see the information of the nodes, type
```bash
sinfo -N -l -p <partition_name>
```

We also have 2TB storage under the path `/projects/<project_name>`.

## Submitting Jobs to the group node
In your slurm submission script, set the partition name to the group nodes:
```bash
#SBATCH --partition=<partition_name>
```
Since both CPU and GPU nodes are under the same partition name, please specify the node to use in your script:

If your task does not need GPU, add the following line in your submission script:
```bash
#SBATCH --nodelist=halk0121
```
Else,
```bash
#SBATCH --nodelist=gpuk015
```

## Making your own directory in the group storage
```bash
cd /projects/<project_name>
mkdir $YOUR_DIR_NAME
chgrp $(whoami) $YOUR_DIR_NAME
```
Note that the last line is important so that other people cannot make changes to your files.

### Rules

1. If you are not in hurry and the group node is full, use the free nodes on Amarel.
2. Only use the GPU node when your job needs GPUs.
3. The group project directory should be used to keep important files, scripts, and outputs. For temporary computation outputs, use `/scratch/`.
You can use this path to share files with the group members putting the files outside of your private directory.
