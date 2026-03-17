---
layout: post
title: Self-learning of DFT (1)
date: 2026-3-17 09:30:00+0800
description: Record of my self-learning process of DFT
tags: Record
categories: Research
---

# Density Functional Theory - A Partical Introduction

## Section 1 What is DFT

1. Schrödinger equation:

   $$
       \hat{H}\Psi=E\Psi
   $$

   where $\hat{H}$ is Hamiltonian operator, $\Psi$ is a set of solutions, $E$ is the ground-state energy.

   The more complete description:

   $$
           [\underbrace{-\frac{\hbar^2}{2m}\sum^N_{i=1}\nabla^2_i}_\text{Kinetic energy} +\underbrace{\sum^N_{i=1}V(\mathbf{r}_i)}_\text{Potential}+\underbrace{\sum^N_{i=1}\sum_{j<i}U(\mathbf{r}_i,\mathbf{r}_j)}_\text{interaction of electrons}]\Psi=E\Psi
   $$

2. The density of electrons at a particular position in space:

   $$
       n(\mathbf{r})=2\sum^{N/2}_i\psi^*_i(\mathbf{r})\psi_i(\mathbf{r})
   $$

3. "Functional": A **_functional_** takes a function and defines a single number form the function (e.g. $F[f]=\int^1_1f(x)dx$).

4. Simplify by the Hohenberg-Kohn therorem:

   $$
       E[\{\psi_i\}]=E_{known}[\{\psi_i\}]+E_{xc}[\{\psi_i\}]\\
   \begin{align*}
       E_{known}[\{\psi_i\}]&=-\frac{\hbar^2}{2m}\sum_i\int\psi^*_i\nabla^2\psi_i d^3r+\int V(\mathbf{r})n(\mathbf{r})d^3r\\
       &+\frac{e^2}{2}\int\int\frac{n(\mathbf{r})n(\mathbf{r}')}{\lvert r-r' \rvert}d^3rd^3r'+E_{ion}
   \end{align*}
   $$

5. The Kohn - Sham equation:

   $$
        [-\frac{\hbar^2}{2m}\nabla^2+V(\mathbf{r})+V_H(\mathbf{r})+V_{XC}(\mathbf{r})]\psi_i(\mathbf{r})=\varepsilon_i\psi_i(\mathbf{r})
   $$
   - The interaction between an electron and the collection of nuclei: $V(\mathbf{r})$
   - Hartree potential (Coulomb repulsion between electron and electron density):

     $$
        V_H(\mathbf{r})=e^2\int \frac{n(r')}{\lvert r-r' \rvert}d^3r'
     $$

   - Functional derivative of the exchange-correlation energy:
     $$
        V_{XC}(\mathbf{r})=\frac{\delta E_{XC}(\mathbf{r})}{\delta n(\mathbf{r})}
     $$

6. Iterative algorithm:
   1. Define an initial, trial electron density, $n(\mathbf{r})$
   2. Solve Kohn-Sham equation to find the single-particle wave function, $\psi(\mathbf{r})$
   3. Calculate the electron density, $n_{KS}(\mathbf{r})=2\sum_i\psi^*_i(\mathbf{r})\psi_i(\mathbf{r})$
   4. Compare the electron density, updated trial electron density or start step 2.

```mermaid
   graph LR
   A[single-electron wave function]
   B[electron density]
   C[Hartree potential]
   D[Kohn-Sham equation]
   C--->D
   B--->C
   A--->B
   D--->A
```
