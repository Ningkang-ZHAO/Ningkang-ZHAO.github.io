---
layout: post
title: Self-learning of DFT (2) - Exercise Part of Section 2
date: 2026-3-17 23:30:00+0800
description: Record of my self-learning process of DFT
tags: Record
categories: Research
---

# Preface

As a beginner of DFT, let's start with the installation. If you just want to find the answers of my exercise, please jump to [results](#results).

I will present the details of my device first:

- PCPU: 12th Gen Intel(R) Core(TM) i7-12700H (2.30 GHz)
- Graphics Card: Nvidia GeForce RTX 3060 Laptop
- Installed RAM: 16.0 GB
- System Type: 64-bit operating system, x64-based processor

If you are familiar with WSL, or you are using Linux system, you can jump to [Quantum Espresso](#quantum-espresso-taking-serial-communication-as-an-example).

# Windows Subsystem for Linux (WSL) and Ubuntu

For a formal guide, you can find it at [official guidance](https://learn.microsoft.com/en-us/windows/wsl/install). Here will present some simple suggestions.

1. Open Powershell in administrator mode and enter the `wsl --install ` command.
2. Install **Ubuntu** with **Microsoft Store**.

   (If you can't use **Microsoft Store**, the [official website](https://ubuntu.com/desktop/wsl) and the official [guidance](https://documentation.ubuntu.com/wsl/latest/howto/install-ubuntu-wsl2/) of **Ubuntu** would be useful.)

3. Open Ubuntu in Powershell with the command `wsl -d Ubuntu` and complete the account configuration.

4. (Option) For better experience, you can use command `sudo apt update` and command `sudo apt upgrade` to update all the software.

# Quantum Espresso (Taking serial communication as an example)

1. Download `.tar.gz` source film:`http://www.quantum-espresso.org/` and decompress: <code>tar -zxvf <span style="color: red;"> qe-7.5.tar.gz </span></code>.

   Please note that the <code><span style="color: red;"> qe-7.5.tar.gz </span></code> here should match the name of the installation package you downloaded. (Someone could install Quantum Espresso with command `sudo apt install quantum-espresso`, **but** in some version of Ubuntu, it may result in unespect warning when run the calculation.)

2. Install fundamental inveroment:
   - Install `gfortran`: `sudo apt install gfortran`
   - Install `git`: `sudo apt install git`
   - Install `make`: `sudo apt install make`
3. Enter the folder of QE, e.g. `qe-7.5`. Serial compilation:
   - Configuration: `./configure`
   - Compilation: `make all`
4. (Option) If you want to use QW directly every time when you start Linux, open the file `~/.bashrc` and add the path to `./QE/bin` at the end of the file, e.g. `export PATH=~/QE-7.5/bin:$PATH`.

# Results

## Exercise 1

1. Creat `input.in`, here is mine (e.g. Simple Cubic):

```fortran
&control
calculation = 'vc-relax' ! vc-relax will freely adjust the cell size
prefix = 'exercise.section_2.1_sc' ! name of the calculation
outdir = './' ! output path
pseudo_dir = '../UPF/' ! the path to the pseudopotential
/
&system ibrav = 1 ! cell parameters of sc (2-fcc, 4-hcp)
celldm(1) = 5.3 ! side length
nat = 1 ! number of atoms (simple cubic)
ntyp = 1 ! number of the type of atom
ecutwfc = 50
ecutrho = 400
input_dft = 'pbesol'
occupations = 'smearing'
smearing = 'mv'
degauss = 0.02
/
&electrons
conv_thr = 1.0d-8
/
&ions
/
&cell
/
ATOMIC_SPECIES
Pt 195.084
pt_pbesol_v1.4.uspp.F.UPF
ATOMIC_POSITIONS {crystal}
Pt 0.0 0.0 0.0
K_POINTS {automatic}
12 12 12 0 0 0
```

2. Run the calculation: `pw.x< input.in >output.out`
3. Compare the results.

```fortran
sc
total energy = -210.26936190 Ry
fcc
total energy = -210.30964469 Ry
hcp
total energy = -420.60960121 Ry (for each atom, -210.304800605)
```

So we can get the table (the experimental data is obtained from [Springer Materials](https://materials.springer.com/isp/crystallographic/docs/sd_0250899)):

| Structure  | Initial $a(nm)$ | Final $a(nm)$ | Final $c(nm)$ | $c/a$ | Energy($Ry/atom$) |
| ---------- | --------------- | ------------- | ------------- | ----- | ----------------- |
| SC         | 0.28            | 0.25853780359 | -             | -     | -210.26936190     |
| FCC        | 0.392           | 0.39165598084 | -             | -     | -210.30964469     |
| HCP        | 0.28            | 0.27261677639 | 0.46971563967 | 1.723 | -210.304800605    |
| Experiment | -               | 0.39235       | -             | -     | -                 |

According to the calculation results, Pt prefers the FCC crystal structure. The optimized lattice constant of FCC Pt is 0.39166 nm, which agrees well with the experimental value of 0.39235 nm, with a deviation of only -0.18%.

To ensure the reliability of the results, single-point energy calculations were performed using the optimized structures obtained from vc-relax. The single-point energies (**FCC: -210.30964116 Ry/atom**, **HCP: -210.304800565 Ry/atom**) are consistent with the final vc-relax energies, confirming that the calculations are well converged.

# Exercise 2

The process is similar to [Exercise 1](#exercise-1), so only the results are presented here.

| Label       | a($nm$)       | b($nm$)       | c($nm$)       | c/a    |
| ----------- | ------------- | ------------- | ------------- | ------ |
| Calculation | 0.31827459983 | 0.31827459983 | 0.50312942604 | 1.5808 |
| Experiment  | 0.31964       | 0.31964       | 0.50511       | 1.5802 |
| Deviation   | -0.42%        | -0.42%        | -0.39%        | +0.04% |

# Exercise 3

The process is similar to [Exercise 1](#exercise-1), too. The differet is that the atoms' types and the positions need to be modified.

Here is the calculation results:

| Label       | a($nm$)       |
| ----------- | ------------- |
| Calculation | 0.33797257568 |
| Experiment  | 0.345         |
| Deviation   | -2.04%        |

Although the deviation seems a bit high, I found that some students from PSU obtained similar [result](https://sites.psu.edu/dftap/2018/01/).

# Exercise 4

The process is similar to [Exercise 3](#exercise-3). The differet is that the atoms' types and the positions need to be modified.

Here is the calculation results:

| Structure      | a($nm$)       | Energy (pre atom, $Ry/atom$) |
| -------------- | ------------- | ---------------------------- |
| CsCl Structure | 0.33797257568 | -65.714723715                |
| NaCl Structure | 0.46528488001 | -65.541039335                |
| Experiment     | 0.345         | -                            |

From the _**Energy**_ result, we find that CsAl prefers the CsCl structure, and the _**Cell parameters**_ of the NaCl Structure deviate significantly from the experimental value.
