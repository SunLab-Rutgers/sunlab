---
title: PyTorch on Amarel
category: scientific-packages
order: 3
summary: How to create a PyTorch environment on Amarel for GPU jobs using CUDA 11.8.
---

These instructions create a PyTorch environment that runs on Amarel GPUs with CUDA 11.8. CUDA 11.8 is useful because some Amarel GPUs may not support CUDA 12.

Run the installation steps from a compute node, not from the login node.

## Request A CPU Node

Request an interactive CPU session with 2 CPUs and 16 GB RAM for 1 hour:

```bash
srun --cpus-per-task=2 --ntasks=1 --mem=16G --time=01:00:00 --pty bash
```

Adjust CPUs, memory, and time as needed.

## Create A Fresh Conda Environment

Unload any currently loaded CUDA module so you do not accidentally mix toolkits:

```bash
module unload cuda 2>/dev/null || true
```

Create and activate a clean environment:

```bash
conda create -n torch-cu118 python=3.10 -y
conda activate torch-cu118
```

## Install PyTorch With CUDA 11.8

Use the PyTorch CUDA 11.8 pip wheels. This avoids many conda solver conflicts that can happen on HPC systems.

```bash
python -m pip install --upgrade pip
pip install --no-cache-dir torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu118
```

## Verify GPU Access

GPU verification should be done on a GPU node. Request one GPU for 30 minutes:

```bash
srun -p gpu --gres=gpu:1 --mem=16G --time=00:30:00 --pty bash
```

Activate the environment:

```bash
conda activate torch-cu118
```

Run this check:

```bash
python - <<'PY'
import torch

print("torch:", torch.__version__)
print("torch.version.cuda:", torch.version.cuda)
print("cuda available:", torch.cuda.is_available())

if torch.cuda.is_available():
    print("GPU:", torch.cuda.get_device_name(0))
    x = torch.rand(1024, 1024, device="cuda")
    y = x @ x.T
    print("ok:", float(y.sum()) > 0)
PY
```

If `cuda available` is `True` and the matrix multiplication finishes, the environment is working.

## Save The Working Environment

After the environment works, save both conda and pip package information:

```bash
conda list --explicit > torch-cu118-spec.txt
pip freeze > requirements-cu118.txt
```

These files make it easier to recreate or debug the environment later.

## Optional Run Script

You can create a small helper script called `torchcu118_run` to submit Python training jobs with the `torch-cu118` environment.

Create `~/bin` if it does not exist:

```bash
mkdir -p ~/bin
```

Create the file `~/bin/torchcu118_run` with the following content. Replace `<NetID>` with your Rutgers NetID so SLURM email updates go to you.

```bash
#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "Usage: torchcu118_run script.py [script arguments...]"
  exit 1
fi

SCRIPT="$1"
shift

sbatch <<SBATCH
#!/bin/bash
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --job-name=torch-cu118
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=24:00:00
#SBATCH --mail-type=END,FAIL
#SBATCH --mail-user=<NetID>@rutgers.edu
#SBATCH --export=ALL

module purge
source ~/.bashrc
conda activate torch-cu118

srun python "$SCRIPT" "$@"
SBATCH
```

Make the script executable:

```bash
chmod +x ~/bin/torchcu118_run
```

Make sure `~/bin` is on your `PATH`. If needed, add this line to `~/.bashrc`:

```bash
export PATH="$HOME/bin:$PATH"
```

Then reload your shell settings:

```bash
source ~/.bashrc
```

## Submit A Training Job

Go to the directory containing your Python training script and run:

```bash
torchcu118_run <file>.py
```

Replace `<file>.py` with the actual name of your Python script.

You can adjust the requested runtime, memory, CPU count, and GPU count inside `~/bin/torchcu118_run`. The maximum allowed runtime may depend on the partition policy.
