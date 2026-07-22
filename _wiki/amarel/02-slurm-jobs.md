---
title: SLURM Job Templates
category: amarel
order: 2
summary: Default place for batch-script examples and queue guidance.
---

Add tested SLURM scripts here as the group settles on standard workflows.

```bash
#!/bin/bash
#SBATCH --job-name=test-job
#SBATCH --time=01:00:00
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --mem=4G

module purge
module list

echo "Running on $(hostname)"
```
