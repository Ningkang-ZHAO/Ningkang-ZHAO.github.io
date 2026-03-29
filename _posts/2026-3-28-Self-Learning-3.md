---
layout: post
title: Self-learning of DFT: Section 3
date: 2026-3-28 15:06:00+0800
description: Record of my self-learning process of DFT
tags: Record
categories: Research
---

# Density Functional Theory - A Practical Introduction

## Section 3 Nuts and Bolts of DFT Calculations

1. Bloch's theorem:

   $$
   \phi_k(\mathbf{r})=\underbrace{e^{i\mathbf{k}\cdot \mathbf{r}}}_{\text{plane waves}}u_k(\mathbf{r})
   $$

2. reciprocal lattice vectors:

   for lattice vectors in real space, $\mathbf{a_1}, \mathbf{a_2}, \mathbf{a_3}$:

   define:

   $$
   \mathbf{a_i}\cdot \mathbf{b_i}=
    \begin{cases}
       2\pi, & i=j\\
       0   , & else\\
   \end{cases}
   $$

   so the reciprocal lattice vectors $\mathbf{b_1},\mathbf{b_2},\mathbf{b_3}$:

   $$
     \mathbf{b_1}=2\pi \frac{\mathbf{a_2}\times \mathbf{a_3}}{\mathbf{a_1}\cdot (\mathbf{a_2}\times \mathbf{a_3})}
     \qquad
     \mathbf{b_2}=2\pi \frac{\mathbf{a_1}\times \mathbf{a_3}}{\mathbf{a_2}\cdot (\mathbf{a_1}\times \mathbf{a_3})}
     \qquad
     \mathbf{b_3}=2\pi \frac{\mathbf{a_1}\times \mathbf{a_2}}{\mathbf{a_3}\cdot (\mathbf{a_1}\times \mathbf{a_2})}
   $$

3. Wigner-Seitz cell: the minimal in terms of volume but still contains all information need.

4. Brillouin zone (BZ): same define as Wigner-Seitz cell in reciprocal space.

   $\Gamma$ point: $k=0$ in Brillouin zone

   $V_{BZ}=\frac{2\pi}{V_{cell}}$

5. irreducible Brillouin Zone (IBZ): A reduced region in BZ that can be extended without approximation to fill entire BZ using symmetry.

6. Choose of $k$ points: Calculations that have similar densities of $k$ points in reciprocal space will have similar levels of convergence.

7. For metal, the functions that are integrated change discontinuously from nonzero values to zero at the Fermi surface.
   - tetrahedron method.
   - smearing method.

8. Energy cutoffs: whenever DFT calculations for multipe systems are compared to calculate energy differences, the same energy cutoff should be used in all calculations.

9. Two methods to find extreme point (in one dimension):
   1. bisection method:

      for two point $x_1 = a$, $x_2 = b$, if $f'(x_1)f'(x_2) < 0$,

      there is some $x$ between $a$ and $b$ where $f'(x) = 0$.

      for a point $x^* = \frac{x_1 + x_2}{2}$, if $f'(x_1)f'(x^*) < 0$,

      there is some $x$ between $x_1$ and $x^*$ where $f'(x) = 0$.

      (Alternatively, the same process for range $[x^*, x_2]$.)

   2. Newton's method:

      define a function $g(x) = f'(x)$, according to Taylor expansion:

      $$
         g(x+h) = g(x) + h g'(x)
      $$

      neglects higher orders terms. For where $g(x)\neq 0$, there is

      $$
         x^* = x + h = x - \frac{g(x)}{g'(x)}
      $$

      to make $g(x^*) \approx 0$.

10. Tow methods in more than one dimension:
    1. quasi-Newton:

       $$
       x_{i+1}=x_i - A^{-1}_i(x_i)g(x_i)\\
       A_i=A_{i-1}+F[x_i,x_{i-1},G(x),g(x_{i-1})]
       $$

    2. conjugate-gradient (e.g. 2-D):

       function $E(\mathbf{x})=3x^2+y^2$, $\mathbf{x} = (x,y)$

       starting from $\mathbf{x_o}=(1,1)$, negative of the gradient of the function $-\nabla E(\mathbf{x})$

       there is

       $$
       \mathbf{x_1}=\mathbf{x_0} - \alpha_0 \nabla E(\mathbf{x_0})=(1-6\alpha_0 , 1-2\alpha_0)
       $$

       to find the best choice of $\alpha_0$:

       $$
       \begin{align*}
       f(\alpha_0) &=E(\mathbf{x_1})=3(1-6\alpha_0)^2+(1-2\alpha_0)^2\\
                   &=112\alpha_0^2-40\alpha_0+4
       \end{align*}
       $$

       so we can make:

       $$
       f'(\alpha_0) = 224\alpha_0 - 40 = 0
       $$

       there $\alpha_0=\frac{5}{28}$, and $\nabla E(\mathbf{x_1})=(-\frac{3}{7}, \frac{9}{7}), \nabla E(\mathbf{x_0})=(6,2).$

       we can easily find that $\nabla E(\mathbf{x_1})\cdot \nabla E(\mathbf{x_0}) = 0$

       in N - dimension, sometimes, it's hard to choose the best value of $\alpha_0$, we can use:

       $$
       \mathbf{d_1}=-\nabla E(\mathbf{x_1})+\frac{(\nabla E(\mathbf{x_1})\cdot \mathbf{d_0})}{(\mathbf{d_0}\cdot \mathbf{d_0})}\mathbf{d_0}
       $$

       and

       $$
       \mathbf{x_2}=\mathbf{x_1}-\alpha_1 \mathbf{d_1}
       $$

## Exercise & Results

##### 1. In the exercises for Chapter 2 we suggested calculations for several materials, including Pt in the cubic and fcc crystal structures and ScAl in the CsCl structure. Repeat these calculations, this time developing numerical evidence that your results are well converged in terms of sampling $k$ space and energy cutoff.

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

To prove the convergation in terms of the $k$ points and energy cutoff we choosed, there are lots of input we need to calculated. One simplified method is to use Python for batch computing. For example:

```python
import os, re, subprocess

p_cal = "Pt_sc" # the folder of the input file
Template = "Pt.in" # modify here to change the template file

ecutwfc_list = [20,30,40,50,60,70,80] # Energy cutoff lists.
k_points_list = [2,4,6,8,10,12,14,16] # k point lists.

# test ecutwfc
print("Testing ecut...")
for ecut in ecutwfc_list:
   with open(p_cal + "/" + Template, "r") as f:
      content = f.read()
   content = re.sub(r'(ecutwfc\s*=\s*)\d+', rf'\g<1>{ecut}', content)
   with open(p_cal + "/" + Template, "w") as f:
      f.write(content)
   outfile = f"{p_cal}/ecut_{ecut}.out"
   subprocess.run(f"pw.x < {p_cal}/{Template} > {outfile}", shell=True, check=True)
   subprocess.run(f"grep '!' {outfile} >> {p_cal}/ecut_data.txt", shell=True)
   print(f"ecut = {ecut} Ry completed.")

print("Testing k-point...")

for k in k_points_list:
   with open(p_cal + "/" + Template, "r") as f:
      content = f.read()
   content = re.sub(r'(\d+)\s+(\d+)\s+(\d+)(?=\s+0\s+0\s+0)', f'{k} {k} {k}', content)
   with open(p_cal + "/" + Template, "w") as f:
      f.write(content)
   outfile = f"{p_cal}/k_{k}.out"
   subprocess.run(f"pw.x < {p_cal}/{Template} > {outfile}", shell=True, check=True)
   subprocess.run(f"grep '!' {outfile} >> {p_cal}/k_data.txt", shell=True)
   print(f"k = {k} completed.")

```

after runnning the code above, we will obtain two files named "`ecut_data.txt`" and "`k_data.txt`", which stored the energy cutoff data and k points data (with total energy calculated). During the calculating process with energy cutoff, we set k points at 12.

To better compare the changes across different parameter values, we can use Python to plot the total energy differences in a single figure:

```python
import matplotlib.pyplot as plt
import numpy as np

p_cal = "Pt_fcc"
ecut_list = [20, 30, 40, 50, 60, 70, 80]  # ecutwfc
energies_ecut = []
k_list = [2, 4, 6, 8, 10, 12, 14, 16]  # k-point
energies_k = []

with open(f"{p_cal}/Pt_ecut_data.txt", "r") as f:
   for line in f:
      if "!" in line:
            parts = line.split()
            energy = float(parts[4])
            energies_ecut.append(energy)

with open(f"{p_cal}/Pt_k_data.txt", "r") as f:
   for line in f:
      if "!" in line:
            parts = line.split()
            energy = float(parts[4])
            energies_k.append(energy)

plt.figure(1)
plt.plot(ecut_list[:len(energies_ecut)], energies_ecut, 'o-')
plt.xlabel('ecutwfc (Ry)')
plt.ylabel('Energy (Ry)')
plt.title('Convergence with ecutwfc')
plt.grid(True)

plt.figure(2)
plt.plot(k_list[:len(energies_k)], energies_k, 'o-')
plt.xlabel('k-points')
plt.ylabel('Energy (Ry)')
plt.title('Convergence with k-points')
plt.grid(True)

plt.show()
```

And the results are shown below:

<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/Pt_sc_ecutoff.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/Pt_sc_k.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>
</div>
<div class="caption">
      The convergation of the calculation of Pt-SC.
</div>
<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/Pt_fcc_ecutoff.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/Pt_fcc_k.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>
</div>

<div class="caption">
      The convergation of the calculation of Pt-FCC.
</div>

<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/ScAl_ecutoff.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/ScAl_k.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>
</div>

<div class="caption">
      The convergation of the calculation of ScAl.
</div>

Therefore, we can conclude that our calculation in Chapter 2 is converged.

---

##### 2. We showed how to find a minimum of $f(x)=e^{-x}cosx$ using the bisection method and Newton’s method. Apply both of these methods to find the same minimum as was discussed above but using different initial estimates for the solution. How does this change the convergence properties illustrated in Fig. 3.6? This function has multiple minima. Use Newton’s method to find at least two more of them.

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

There are many ways to achive bisection method and Newton's method, and I just present the funcional moduels here:

For bisection:

```python
def bisection(diffunc, a, b, tol=1e-5, max_iter=1000):
   iteration = 0
   iters = []

   if diffunc(a) * diffunc(b) >= 0:
      raise ValueError("The function must have different signs at a and b.")
   while iteration < max_iter:
      c = (a + b) / 2
      iters.append(abs(c-true_root))
      if diffunc(c) == 0 or abs(b - a) < tol or abs(c - true_root) < tol:
         return c , iters
      elif diffunc(c) * diffunc(a) < 0:
         b = c
      else:
         a = c
      iteration += 1
```

For Newton's:

```python
def newton(gfunc, diffgunc, x0, tol=1e-9, max_iter=1000):
    iteration = 0
    iters = []
    x = x0
    while iteration < max_iter:
        f_prime = diffgunc(x)
        if f_prime == 0:
            raise ValueError("Derivative is zero. No solution found.")
        x_new = x - gfunc(x) / f_prime
        iters.append(abs(x-true_root))
        if abs(x_new - true_root) < tol:
            return x_new, iters
        x = x_new
        iteration += 1
    return x, iters
```

For the first part, we can easily find that the true root should be $\frac{3}{4}\pi \approx 2.356$, so here I calculated different inital value, $x_0 = 1.8, 2, 2.35$:

<div class="row mt-3">
   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/x0_1.8.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/x0_2.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>

   <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/x0_2.35.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>
</div>

<div class="caption">
      The convergation of the calculation of different inital value($x_0=1.8, x_0=2, x_0=2.35$).
</div>

From the rults, it is obviously that Newton's method converges much faster than bisection method. In addition, a closer initial value reduces the number of iterations.

For the second part, we can easily find that the positions of function's local minima exhibit a certain "periodicity", so we can write down the positions of its local minima $x = \frac{3}{4} \pi + 2n\pi, ( n\in \mathbb{Z} )$, we can select some of them, as $x=\frac{3}{4}\pi,\frac{11}{4}\pi,\frac{19}{4}\pi,\frac{27}{4}\pi\approx 2.356,8.639,14.923,21.206$, so we can start from $x_0=2.35, 8.5, 15, 20$. Since the true root varies in each calculation case, we can use the difference between $x_i$ and $x_{i+1}$ as the stopping criterion. The results are shown below:

| True Root                       | Iteration Times | Initial value $x_0$ | Final Approximate $x$ |
| ------------------------------- | --------------- | ------------------- | --------------------- |
| $\frac{3}{4} \pi\approx 2.356$  | 3               | 2.35                | 2.35619               |
| $\frac{11}{4}\pi\approx 8.639$  | 4               | 8.5                 | 8.63938               |
| $\frac{19}{4}\pi\approx 14.923$ | 4               | 15                  | 14.9226               |
| $\frac{27}{4}\pi\approx 21.206$ | 6               | 20                  | 21.2058               |

---

##### 3. Newton’s method is only guaranteed to converge for initial estimates that are sufficiently close to a solution. To see this for yourself, try applying Newton’s method to find values of $x$ for which $g(x) = tan^{-1}x = 0$. In this case, Newton’s method is $x_{i+1} = x_i - (1+x_i^2)tan^{-1}x_i$. Explore how well this method converges for initial estimates including $x_0 = 0.1$, $x_0 = 1$, and $x_0=10$.

As stated in the exercise, divergence may occur. To handle this, we can use Python's "`try-except`" block to simplify our code. Here is an example:

```python
   import math
   import matplotlib.pyplot as plt

   def newton_with_partial(gfunc, diffgunc, x0, tol=1e-9, max_iter=100):
      iteration = 0
      iters = []
      x_history = [x0]
      x = x0

      MAX_SAFE_X = 1e50  # bound to prevent overflow.

      while iteration < max_iter:
         try:
               f_val = gfunc(x)
               f_prime = diffgunc(x)
         except (OverflowError, ValueError) as e:
               return x, iters, False

         try:
               x_new = x - f_val / f_prime
         except (OverflowError, ZeroDivisionError) as e:
               return x, iters, False

         if abs(x) > MAX_SAFE_X or not math.isfinite(x) or abs(f_prime) < 1e-15 or not math.isfinite(f_prime):
               return x, iters, False

         step = abs(x_new - x)
         iters.append(step)
         x_history.append(x_new)

         if step < tol:
               return x_new, iters, True

         x = x_new
         iteration += 1

      return x, iters, False

   gfunc = math.atan
   diffgunc = lambda x: 1 / (1 + x**2)

   initial_guesses = [0.1, 1.0, 10.0]

   results = []

   for x0 in initial_guesses:
      final_x, iters, converged = newton_with_partial(gfunc, diffgunc, x0, max_iter=100)
      results.append((x0, final_x, iters, converged))

   plt.figure()

   colors = ['blue', 'green', 'red']
   markers = ['o', 's', '^']

   for (x0, final_x, iters, converged), color, marker in zip(results, colors, markers):
      if iters:
         label = f'x0 = {x0}'
         max_len = max(max_len, len(iters)) if 'max_len' in locals() else len(iters)
         if not converged:
               label += f' (divergent, {len(iters)} times)'
         plt.semilogy(range(1, len(iters) + 1), iters,marker=marker, linestyle='-', color=color, label=label)

   plt.xlabel('Iterations')
   plt.xticks(range(1, max_len + 1))
   plt.xlim(1, max_len)
   plt.ylabel('Difference')
   plt.title("Convergence of Newton's Method")
   plt.legend()
   plt.grid()
   plt.tight_layout()
   plt.show()
```

And here is the result:

<div class="row mt-3">
   <div class="col-md-6 mx-auto mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/blog_img/self-learning_of_DFT_3/ex3.3.png" class="img-fluid z-depth-1" zoomable=true %}
   </div>
</div>

<div class="caption">
      Calculation of different inital value($x_0=0.1, 1, 10$).
</div>

From the graph, we can easily find that the initial value $x_0 = 10$ divergent.

---

##### 4. We did not define a stopping criterion for the multidimensional version of Newton’s method. How would you define such a criterion?

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

For a multidimensional calculation of Newton's method, we can use similar stopping criterion, for example:

- Gradient:$\lvert \nabla f(\mathbf{x_k}) \rvert < \varepsilon$
- Similar root: $\lvert \mathbf{x_{k+1}}-\mathbf{x}_{k} \rvert < \varepsilon$
- Function value: $\lvert f(\mathbf{x_{k+1}}) - f(\mathbf{x}_k) \rvert < \varepsilon$
- Iteration: $ k \geq k\_{maximum}$

---

##### 5. Use methods similar to those in Section 3.5.1 to optimize the geometry of $H_2 O$ and hydrogen cyanide, $HCN$. $HCN$ is a highly toxic gas that is nonetheless manufactured in large quantities because of its use as a chemical precursor in a wide range of industrial processes. Ensure that you have sampled all relevant degrees of freedom by showing that multiple initial geometries for each molecule converge to the same final state. Compare your calculated geometries with experimental data.

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

To process molecular calculation with DFT based on periodic supercells, we can:

1.  build a supercell that is mainly empty space.
    - Define a cubic supercell with side length $L$ angstroms.
    - Place two atoms in the super cell with fractional coordinates $(0, 0, 0)$ and $(+d/L, 0, 0)$, where $L$ is considerably longer than $d$.
2.  fixing the size and shape of the supercell but allowing the fractional coordinates of the atoms to vary.
3.  define the stopping criterion
    - The magnitude of the forces on the two atoms is less than $0.01 eV/Å$
4.  choose the initial position of atoms
5.  choose an initial bond angle

The input files of $H_2O$ and $HCN$ are present here, the further calculation results are omit.

For $H_2O$

```fortran
&control
    calculation = 'relax'
    prefix = 'H2O'
    outdir = './'
    pseudo_dir = '../../PBE/'
    tprnfor = .true.
    tstress = .true.
/
&system
    ibrav = 1
    celldm(1) = 35
    nat = 3     ! number of atoms (simple cubic)
    ntyp = 2    ! number of the type of atom
    ecutwfc = 50
    assume_isolated = 'mt'
/
&ELECTRONS
  conv_thr = 1.0d-8
  mixing_beta = 0.7
  diagonalization = 'david'
/
&IONS
  ion_dynamics = 'bfgs'          ! BFGS
/
ATOMIC_SPECIES
  O  15.999  O.pbe-n-kjpaw_psl.0.1.UPF
  H   1.008  H.pbe-rrkjus_psl.1.0.0.UPF

ATOMIC_POSITIONS {angstrom}
  O   0.0   0.0   0.0
  H   0.96  0.0   0.0
  H   -0.24  0.93  0.0
K_POINTS gamma
```

For $HCN$:

```fortran
&control
    calculation = 'relax'
    prefix = 'HCN'
    outdir = './'
    pseudo_dir = '../../PBE/'
    tprnfor = .true.
    tstress = .true.
/
&system
    ibrav = 1
    celldm(1) = 35
    nat = 3     ! number of atoms (simple cubic)
    ntyp = 3    ! number of the type of atom
    ecutwfc = 50
    assume_isolated = 'mt'
/
&ELECTRONS
  conv_thr = 1.0d-8
  mixing_beta = 0.7
  diagonalization = 'david'
/
&IONS
  ion_dynamics = 'bfgs'          ! BFGS
/
ATOMIC_SPECIES
  N  14.007  N.pbe-n-radius_5.UPF
  C  12.011  C.pbe-n-kjpaw_psl.1.0.0.UPF
  H   1.008  H.pbe-rrkjus_psl.1.0.0.UPF

ATOMIC_POSITIONS {angstrom}
  H   0.0   0.0   0.0
  C   1.065  0.0   0.0
  N   2.221  0.05  0.0
K_POINTS gamma
```

---

##### 6. In the exercises for Chapter 2, we suggested you compute the lattice constants, $a$ and $c$, for hexagonal $Hf$. Repeat this calculation using an approach that optimizes the supercell volume and shape within your calculation. Is your result consistent with the result obtained more laboriously in Chapter 2? How large is the distortion of $c/a$ away from the ideal spherical packing value?

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

We have already used "`vc-relax`" in our former calculations, the supercell vulume and shape was optimized. For more details, please refer [Exercise 2]({% post_url 2026-03-17-Self-Learning-Exercise2 %}#exercise-2).

---

##### 7. Perform the calculations necessary to estimate the energy difference associated with forming an ordered bcc CuPd alloy from fcc Pd and fcc Cu. The ordered alloy is formed by defining a bcc crystal with Cu atoms at the corners of each cube and Pd atoms in the center of each cube (or vice versa). This ordered alloy is known to be the favored low temperature crystal structure of Pd and Cu when they are mixed with this stoichiometry. What does this observation tell you about the sign of the energy difference you are attempting to calculate? To calculate this energy difference you will need to optimize the lattice constant for each material and pay careful attention to how your energy cutoffs and k points are chosen.

_**<u style="color:var(--global-theme-color)">Reference Results:</u>**_

According to the define of formation energy:

$$
   \Delta E_{form} = E_{CuPd} - E_{Cu} - E_{Pd}
$$

The question says the item $CuPd$ is a low-temperature stability item, indicating that the total energy of a $Cu-Pd$ pair in CuPd structure should be lower than that in pure Pd and pure Cu. Here are the calculation results:

|             | $\Delta E_{form}(eV/pair)$ |
| ----------- | -------------------------- |
| Calcultaion | -0.2301977628              |
| Experiment  | -0.24                      |
| Error       | 4.08%                      |

Note that the energy cutoffs and k-point mesh must be converged and kept identical for all calculations.
