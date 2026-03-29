---
layout: post
title: Self-learning of DFT (2)
date: 2026-3-16 21:30:00+0800
description: Record of my self-learning process of DFT
tags: Record
categories: Research
---

# Density Functional Theory - A Practical Introduction

## Section 2 DFT Calculations for Simple Solids

1. super cell:
   1. structure of the cubic material and side length
   2. position of the atom

2. e.g. face-centered cubic(FCC) materials:
   1. side length: $a$
   2. atoms position: (0, 0, 0), (0, $\frac{a}{2}$, $\frac{a}{2}$), ($\frac{a}{2}$, $\frac{a}{2}$, 0)
   3. cell vector:

   $$
      \mathbf{a_1}=a(\frac{1}{2}, \frac{1}{2}, 0)
      \mathbf{a_2}=a(0, \frac{1}{2}, \frac{1}{2})
      \mathbf{a_3}=a(\frac{1}{2}, 0, \frac{1}{2})
   $$
   4. distance between nearest-neighbor atoms: $\frac{a}{\sqrt 2}$

3. Gibbs free energy:

   $$
   G(P, T)=E_{coh} + PV - TS
   $$

   where $E_{coh}$ is the cohesive energy

4. Exercise:
   1. Perform calculations to determine whether Pt prefers the simple cubic, fcc, or hcp crystal structure. Compare your DFT-predicted lattice parameter(s) of the preferred structure with experimental observations.
   2. Hf is experimentally observed to be an hcp metal with $c/a=1.58$.Perform calculations to predict the lattice parameters for Hf and compare them with experimental observations.
   3. A large number of solids with stoichiometry AB form the CsCl structure. In this structure, atoms of A define a simple cubic structure and atoms of B reside in the center of each cube of A atoms. Define the cell vectors 46 DFT CALCULATIONS FOR SIMPLE SOLIDS and fractional coordinates for the CsCl structure, then use this structure to predict the lattice constant of ScAl.
   4. Another common structure for AB compounds is the NaCl structure. In this structure, A and B atoms alternate along any axis of the simple cubic structure. Predict the lattice parameter for ScAl in this structure and show by comparison to your results from the previous exercise that ScAl does not prefer the NaCl structure.

The process and results of [exercise](../Self-Learning-Exercise2) will be posted in next blog.
