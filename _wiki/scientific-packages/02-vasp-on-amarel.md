---
title: VASP on Amarel
category: scientific-packages
order: 2
summary: Notes for setting up, compiling, and testing VASP on the Rutgers Amarel cluster.
---

## Getting VASP

You need to be added to a group license to use VASP. Once access is ready, extract the VASP tar file and place it in your Amarel home directory.

Example version:

```text
VASP 6.5.0
```

Official installation wiki:

[Installing VASP 6.X.X](https://vasp.at/wiki/Installing_VASP.6.X.X)

## Environment Settings

Load the Intel module. Add these lines to your job submission script or to a module configuration file:

```bash
module purge
module load intel/oneapi_2022.3.1-sw1088
module load gcc
```

If you cannot find the Intel module, first use the larger community module library. Add this line to your `~/.bashrc`:

```bash
module use /projects/community/modulefiles
```

If the environment is loaded successfully, you should have paths to the following commands:

```bash
which ifx
which ifort
which icx
which mpif90
which mpicc
```

## Installing VASP

Do the following steps inside the VASP root directory. You should see subdirectories such as `arch`, `bin`, `build`, `src`, `testsuite`, and `tools`.

Copy the Intel OpenMP-compatible `makefile.include`:

```bash
cp arch/makefile.include.intel_omp ./makefile.include
```

Compile the standard VASP executable:

```bash
make std
```

Compilation will take a while. Once it finishes, check the `bin` directory:

```bash
ls bin
```

You should see:

```text
vasp_std
```

For spin-orbit coupling calculations, compile the noncollinear executable:

```bash
make ncl
```

To build every target, use:

```bash
make all
```

You can accelerate compilation with parallelization:

```bash
make DEPS=1 -jN <target>
```

Here, `N` is the number of threads to use.

## Add VASP To Your Path

Add the VASP `bin` directory to your `~/.bashrc`:

```bash
export PATH=$VASP_ROOT/bin:$PATH
```

Here, `$VASP_ROOT` is the VASP root directory containing `bin`, `src`, and the other VASP subdirectories.

## Test The Installation

From the VASP root directory, run:

```bash
make test
```

If the tests run successfully, your VASP installation is ready to use.
