---
title: Quantum ESPRESSO tutorial
category: scientific-packages
order: 4
summary: A Quantum ESPRESSO workflow for relaxing a structure and calculating its electronic band structure and density of states.
author: Stanley Tan
created: 2026-10-15
updated: 2026-10-15
---

This tutorial introduces a typical Quantum ESPRESSO workflow for density functional theory (DFT) calculations. It uses cubic boron nitride (BN) as an example and assumes that Quantum ESPRESSO is already installed. For Amarel-specific setup instructions, see [Quantum ESPRESSO on Amarel](04-quantum-espresso-on-amarel.md).

For a concise introduction to DFT, see [L. Rademaker's DFT lecture notes](http://loukrademaker.nl/wp-content/uploads/2020/05/Toolbox-DFT.pdf). For the complete list of input variables, see the [Quantum ESPRESSO `pw.x` input documentation](https://www.quantum-espresso.org/Doc/INPUT_PW.html).

## Workflow

The workflow used in this tutorial is:

```text
pw.x (relax) → pw.x (scf) → pw.x (bands) → bands.x →dos.x
```

- `pw.x` performs the relaxation, self-consistent-field (SCF), and band calculations.
- A `relax` calculation performs repeated SCF calculations while changing the atomic positions to minimize the forces.
- An `scf` calculation iteratively solves the Kohn–Sham equations until the electron density and total energy are self-consistent.
- A `bands` calculation is non-self-consistent: it uses the converged charge density from an SCF calculation to calculate eigenvalues along a selected path through the Brillouin zone.
- `bands.x` processes the band calculation output for plotting.
- `dos.x` calculates the density of states (DOS).

The examples below use the following directory layout:

```text
bn/
├── pseudo/
├── out/
├── bn.relax.in
├── bn.scf.in
├── bn.bands.in
├── submit_pw.sh
└── submit_bands.sh
```

Create the working directories before starting:

```bash
mkdir -p bn/{pseudo,out}
cd bn
```

Place the boron and nitrogen pseudopotentials in `pseudo/`. The examples use the PBEsol pseudopotentials `B.pbesol-n-kjpaw_psl.0.1.UPF` and `N.pbesol-n-kjpaw_psl.0.1.UPF`. See [Quantum ESPRESSO on Amarel](04-quantum-espresso-on-amarel.md) for pseudopotential sources.

## General `pw.x` input

The following is a template for a `pw.x` input file:

```text
&CONTROL
  calculation = 'scf'
  etot_conv_thr = 2.0d-9
  forc_conv_thr = 1.0d-9
  prefix = 'prefix'
  outdir = './out/'
  pseudo_dir = './pseudo/'
  restart_mode = 'from_scratch'
  max_seconds = 7.2d+4
  tprnfor = .true.
  tstress = .true.
  verbosity = 'high'
/
&SYSTEM
  ibrav = 2
  celldm(1) = 6.852150
  nat = 2
  ntyp = 2
  nbnd = 20
  nosym = .false.
  ecutwfc = 60.0
  ecutrho = 480.0
  occupations = 'fixed'
/
&ELECTRONS
  diagonalization = 'david'
  conv_thr = 4.0d-9
  electron_maxstep = 100
  mixing_beta = 0.4
/
&IONS
/
ATOMIC_SPECIES
  B  10.811000  B.pbesol-n-kjpaw_psl.0.1.UPF
  N  14.006700  N.pbesol-n-kjpaw_psl.0.1.UPF
ATOMIC_POSITIONS crystal
  B  0.00000000  0.00000000  0.00000000
  N  0.25000000  0.25000000  0.25000000
K_POINTS automatic
  7 7 7 0 0 0
```

Change the values for `calculation`, `prefix`, the lattice, atom counts, cutoffs, occupations, atomic species, atomic positions, and k-point mesh to match the system. For a band calculation, set `nbnd` high enough to include the conduction bands of interest.

## Submit `pw.x` jobs on Amarel

The following SLURM script runs `pw.x` with MPI:

```bash
#!/bin/bash

#SBATCH --job-name=qe_pw
#SBATCH --partition=main
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=16
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4GB
#SBATCH --time=24:00:00
#SBATCH --output=stdout

source ~/.bashrc
module purge
module load gcc
conda activate qe

INPUT="$1"

export OMP_NUM_THREADS=1
export MKL_NUM_THREADS=1
export OPENBLAS_NUM_THREADS=1

mpiexec -np 16 pw.x < "$INPUT" > "${INPUT%.*}.out"
```

Submit a calculation with:

```bash
sbatch submit_pw.sh bn.relax.in
```

The number of MPI processes should match the number of allocated tasks. In this example, one node with 16 tasks per node and one CPU per task provides 16 MPI processes. If you request four nodes, change `--nodes=4` and use 64 MPI processes:

```bash
mpiexec -np 64 pw.x < "$INPUT" > "${INPUT%.*}.out"
```

These examples use one CPU per task and one thread for OpenMP, MKL, and OpenBLAS. The best settings depend on the system and the Quantum ESPRESSO build.

## Example: cubic boron nitride

This example uses cubic BN, Materials Project material [mp-1639](https://next-gen.materialsproject.org/materials/mp-1639?formula=BN). The structure has a face-centered cubic conventional cell with a lattice constant of 3.626002 Å.

The `celldm(1)` parameter in Quantum ESPRESSO is in Bohr, not Å. Use:

```text
1 Å = 1.88973 Bohr
```

Thus, the lattice constant used below is:

```text
3.626002 × 1.88973 = 6.852150 Bohr
```

The two-atom primitive cell is:

```text
B  0.00000000  0.00000000  0.00000000
N  0.25000000  0.25000000  0.25000000
```

The `ibrav = 2` setting specifies a face-centered cubic lattice.

### 1. Relax the structure

Save the following as `bn.relax.in`:

```text
&CONTROL
  calculation = 'relax'
  etot_conv_thr = 2.0d-9
  forc_conv_thr = 1.0d-9
  prefix = 'bn'
  outdir = './out/'
  pseudo_dir = './pseudo/'
  restart_mode = 'from_scratch'
  tprnfor = .true.
  tstress = .true.
  verbosity = 'high'
/
&SYSTEM
  ibrav = 2
  celldm(1) = 6.852150
  nat = 2
  ntyp = 2
  nosym = .false.
  ecutwfc = 60.0
  ecutrho = 480.0
  occupations = 'fixed'
/
&ELECTRONS
  diagonalization = 'david'
  conv_thr = 4.0d-9
  electron_maxstep = 100
  mixing_beta = 0.4
/
&IONS
/
ATOMIC_SPECIES
  B  10.811000  B.pbesol-n-kjpaw_psl.0.1.UPF
  N  14.006700  N.pbesol-n-kjpaw_psl.0.1.UPF
ATOMIC_POSITIONS crystal
  B  0.00000000  0.00000000  0.00000000
  N  0.25000000  0.25000000  0.25000000
K_POINTS automatic
  7 7 7 0 0 0
```

Submit it with:

```bash
sbatch submit_pw.sh bn.relax.in
```

The final atomic positions are printed near the end of `bn.relax.out`. Use those positions in the subsequent SCF and bands inputs.

### 2. Run an SCF calculation

Save the following as `bn.scf.in`. Replace the positions with the final positions from the relaxation output when they have changed.

```text
&CONTROL
  calculation = 'scf'
  etot_conv_thr = 2.0d-9
  forc_conv_thr = 1.0d-9
  prefix = 'bn'
  outdir = './out/'
  pseudo_dir = './pseudo/'
  restart_mode = 'from_scratch'
  tprnfor = .true.
  tstress = .true.
  verbosity = 'high'
/
&SYSTEM
  ibrav = 2
  celldm(1) = 6.852150
  nat = 2
  ntyp = 2
  nosym = .false.
  ecutwfc = 60.0
  ecutrho = 480.0
  occupations = 'fixed'
/
&ELECTRONS
  diagonalization = 'david'
  conv_thr = 4.0d-9
  electron_maxstep = 100
  mixing_beta = 0.4
/
&IONS
/
ATOMIC_SPECIES
  B  10.811000  B.pbesol-n-kjpaw_psl.0.1.UPF
  N  14.006700  N.pbesol-n-kjpaw_psl.0.1.UPF
ATOMIC_POSITIONS crystal
  B  0.00000000  0.00000000  0.00000000
  N  0.25000000  0.25000000  0.25000000
K_POINTS automatic
  7 7 7 0 0 0
```

Submit it with:

```bash
sbatch submit_pw.sh bn.scf.in
```

The SCF calculation creates the converged charge density in `out/`. The later bands calculation must use the same `prefix` and `outdir` so it can read this data.

### 3. Calculate bands along a k-path

Save the following as `bn.bands.in`:

```text
&CONTROL
  calculation = 'bands'
  prefix = 'bn'
  outdir = './out/'
  pseudo_dir = './pseudo/'
  restart_mode = 'from_scratch'
  verbosity = 'high'
/
&SYSTEM
  ibrav = 2
  celldm(1) = 6.852150
  nat = 2
  ntyp = 2
  nbnd = 20
  nosym = .false.
  ecutwfc = 60.0
  ecutrho = 480.0
  occupations = 'fixed'
/
&ELECTRONS
  diagonalization = 'david'
  conv_thr = 4.0d-9
  electron_maxstep = 100
  mixing_beta = 0.4
/
&IONS
/
ATOMIC_SPECIES
  B  10.811000  B.pbesol-n-kjpaw_psl.0.1.UPF
  N  14.006700  N.pbesol-n-kjpaw_psl.0.1.UPF
ATOMIC_POSITIONS crystal
  B  0.00000000  0.00000000  0.00000000
  N  0.25000000  0.25000000  0.25000000
```

The number of bands, `nbnd`, must be large enough to include the conduction bands that you want to plot. A `bands` input also needs a k-path. The easiest way to select one interactively is with [XCrySDen](http://www.xcrysden.org/).

For cubic BN, the path used by Materials Project is:

```text
Γ → X → W → K → Γ → L → U → W → L → K | U → X
```

The vertical bar indicates a break between path segments. In XCrySDen, open the SCF output file with **File → Open PWscf → Open PWscf Output File**, then select **Tools → k-path Selection**. Choose the high-symmetry points for the face-centered cubic Brillouin zone, select the number of points along the path, and save the result as a PWscf k-point file, such as `kpath.pwscf`.

<img src="/assets/images/wiki/k-path-BN.png" alt="Cubic boron nitride Brillouin zone k-path" style="max-width: 100%;">

Append the k-path to the bands input:

```bash
cat kpath.pwscf >> bn.bands.in
```

Submit the bands calculation:

```bash
sbatch submit_pw.sh bn.bands.in
```

### 4. Process the bands and DOS

Use the following script as `submit_bands.sh`:

```bash
#!/bin/bash

#SBATCH --job-name=qe_bands
#SBATCH --partition=main
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --mem-per-cpu=4GB
#SBATCH --time=4:00:00
#SBATCH --output=stdout

source ~/.bashrc
module purge
module load gcc
conda activate qe

PREFIX="$1"

mkdir -p bands
cd bands

cat << EOF > bands.in
&BANDS
  prefix = '$PREFIX'
  outdir = '../out/'
  filband = 'bands.dat'
/
EOF

bands.x < bands.in > bands.out

cat << EOF > dos.in
&DOS
  prefix = '$PREFIX'
  outdir = '../out/'
/
EOF

dos.x < dos.in > dos.out
```

Submit it with the same prefix used in the `pw.x` inputs:

```bash
sbatch submit_bands.sh bn
```

The script writes `bands.in` and `dos.in` inside `bands/`. The processed band data are written to `bands.dat.gnu`, and the DOS data are written to `bn.dos`. Depending on the number of bands, you may need to increase `--mem-per-cpu`.

The high-symmetry points can be extracted from the `bands.x` output:

```bash
grep high-symmetry bands/bands.out
```

The first line of the DOS file contains the field names and the Fermi energy:

```bash
head bn.dos
```

## Plotting and interpreting the result

The `bands.dat.gnu` file can be plotted with Python, gnuplot, or another plotting tool. The DOS file is whitespace-delimited and can be read directly with NumPy or pandas.

For comparison, Materials Project reports a 4.45 eV band gap for this BN structure. Experimental and higher-level theoretical values for cubic BN are substantially larger. Standard DFT calculations commonly underestimate band gaps because of the approximate exchange-correlation functional.

## Conda installation

If Quantum ESPRESSO is not already available on the system, create an environment with the required packages:

```bash
conda create -n qe
conda activate qe

conda install conda-forge::gcc
conda install conda-forge::gfortran
conda install conda-forge::openmpi
conda install conda-forge::mpi4py
conda install conda-forge::openblas
conda install conda-forge::scalapack
conda install conda-forge::fftw
conda install 'conda-forge::h5py=*=mpi*'
conda install conda-forge::libstdcxx-ng
conda install conda-forge::qe
```

Optional packages for analysis and plotting are:

```bash
conda install conda-forge::numpy
conda install conda-forge::scipy
conda install conda-forge::matplotlib-base
```

Activate the environment and check that the executable is available:

```bash
conda activate qe
pw.x < bn.scf.in > bn.scf.out
which pw.x
```
