---
layout: post
title: "Self-learning of DFT: Section 4"
date: 2026-05-06 17:30:00+0800
description: Record of my self-learning process of DFT
tags: Record
categories: Research
---

# Density Functional Theory - A Practical Introduction

## Section 4 DFT Calculations for Surfaces of Solids

1. Periodic boundry conditions and slab models:
   Design a supercell using vectors conincident with the Cartesian axes.

   (Remain enough empty in the axis that we don't want periodic boundry conditions)

2. Surface energy: the energy needed to cleave the bulk crtstal.

   $$
       \sigma = \frac{1}{A}[E_{slab}-nE_{bulk}]
   $$

3. adsorption energy:
   $$
       E_{ads}^{surface} = E_{AB/surface} - E_{AB} - E_{surface}
   $$

## Exercise & Results

##### 1. Develop supercells suitable for performing calculations with the (100), (110), and (111) surfaces of an fcc metal. What size surface unit cell is needed for each surface to examine surface relaxation of each surface?

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

To simplify the process of surface construction, we can use the package `ase` (atomic simulation environment) of `python`:

```python
from ase.build import fcc100, fcc110, fcc111
from ase.io import write

a = 3.92  # Pt lattice constant (Å)

# -------- (100) --------
slab_100 = fcc100('Pt', size=(1,1,6), a=a, vacuum=12)

# -------- (110) --------
slab_110 = fcc110('Pt', size=(1,1,6), a=a, vacuum=12)

# -------- (111) --------
slab_111 = fcc111('Pt', size=(1,1,6), a=a, vacuum=12)

write('slab_100.cif', slab_100)
write('slab_110.cif', slab_110)
write('slab_111.cif', slab_111)
```

After that, we can use the application `VESTA` to check the surface we built, as shown below:

<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_4/slab_100.svg" class="img-fluid z-depth-1" zoomable=true caption="surface (100)" %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_4/slab_110.svg" class="img-fluid z-depth-1" zoomable=true caption="surface (110)"%}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_4/slab_111.svg" class="img-fluid z-depth-1" zoomable=true caption="surface (111)"%}
   </div>
</div>

<div class="caption">
      The results of surface construction with spective C overhead view.
</div>

By observing the surfaces, we can see that all three surfaces possess considerable symmetry, so using a $1 \times 1$ surface unit cell is sufficient.

Here are my calculation results of different surfaces (Pt as example):

| Surface type | $E_{slab}(Ry)$   |
| ------------ | ---------------- |
| Pt(100)      | -1471.9944392211 |
| Pt(110)      | -1471.9259856375 |
| Pt(111)      | -1472.0418987856 |

---

##### 2. Extend your calculations from Exercise 1 to calculate the surface energy of Pt(100), Pt(110), and Pt(111).

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

In [Section 3 Exercise 3.1]({% post_url 2026-03-28-Self-Learning-3%}#Pt_calculation), we have already calculated the energy of Pt atom. According to the Equation:

$$
       \sigma = \frac{1}{A}[E_{slab}-nE_{bulk}]
$$

We can calculate different surface energy as shown below ($E_{Pt}=-210.31075246\ Ry$):

| Surface type | $E_{slab}(Ry)$   | n   | a ($Å$) | b a ($Å$) | $\gamma (^\circ)$ | A($Å^2$) | $\sigma (J/m^2)$ |
| ------------ | ---------------- | --- | ------- | --------- | ----------------- | -------- | ---------------- |
| Pt(100)      | -1471.9944392211 | 7   | 2.77186 | 2.77186   | 90                | 7.683    | 2.57             |
| Pt(110)      | -1471.925834264  | 7   | 3.92    | 2.77186   | 90                | 10.866   | 2.50             |
| Pt(111)      | -1472.0418987856 | 7   | 2.77186 | 2.77186   | 60                | 6.654    | 2.18             |

---

#### 3. Pt(110) is known experimentally to reconstruct into the so-called missing row reconstruction. In this reconstruction, alternate rows from the top layer of the surface in a ($2\times 1$) surface unit cell are missing. Use a supercell defined by a ($2\times 1$) surface unit cell of Pt(110) to compute the surface energy of the unreconstructed and reconstructed surfaces. Why does this comparison need to be made based on surface energy rather than simply based on the total energy of the supercells? Are your results consistent with the experimental observations? Use similar calculations to predict whether a similar reconstruction would be expected to exist for Cu(110).

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

With the help of VESTA, we can easily modify the surface we need. After deleating the so-called missing row, we can obtain the structure below:

<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_4/Pt110_re.jpg" class="img-fluid z-depth-1" zoomable=true caption="Pt(110) with missing row" %}
   </div>
</div>

I built a 7‑layer Pt slab with the middle layer fixed. A quick note on K‑points: try to keep the sampling density similar in all directions, or at least make them close.

The surface energy of Pt(110) missing row can be calculated with the total energy $E_{total} = -2523.2598635503 Ry$, and the result is $\sigma_{mr}= 2.353\ J/m^2$.

So why compare via surface energy rather than total energy? Because the two models have different numbers of atoms and different cell parameters. Total energy is an extensive quantity and cannot be compared directly. Surface energy $\sigma$, however, subtracts the bulk energy and normalizes by area, allowing a fair comparison.

Given the limited computing power of my equipment, redundant calculations are omitted from this discussion.

---

#### 4. Perform calculations to determine the preferred binding site foratomic O on Pt(111) using ordered overlayers with coverages of 0.25 and 0.33 ML. Does the adsorption energy increase or decrease as the surface coverage is increased?

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

After trying the calculation of Pt(111) with O at fcc position, the computation took about 3 hours, even with GPU acceleration. Therefore, I only present the result for O on Pt(111) at the fcc position with a coverage of 0.25 ML.

| Calculation Type                    | Total Energy($Ry$) |
| ----------------------------------- | ------------------ |
| Pt(111) slabe                       | -3364.4749839062   |
| Pt(111) slab with O at fcc position | -3396.6554546353   |
| O atom                              | -31.8241795199     |

So we can calculate the adsorbtion energy with equation:

$$
   E^{atomic}_{ads}=E_{O/slab} - E_O - E_{slab} = -0.3562912092\ Ry \approx -4.85\ eV
$$

Likewise, restricted by the computing power of my hardware, the rest of the calculations are not presented.
