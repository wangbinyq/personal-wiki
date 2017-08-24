free text book: http://abstract.ups.edu/download/aata-20170805.pdf

# 1 Preliminaries

## 1.1  proofs

Definition:
1. *axioms*: Some rules about a collection of objects S's structure.
2. *statement*: An assertion that is either true or false.
3. *proof*: A convincing argument about the acuracy of a statement.
4. *proposition*: an statement can be proved to be true.
5. *theorem*: a proposition of major importance.
6. *lemmas*: 
7. *corollaries*: 

# 1.2 Set and Equivalence Relations
Defintion:
1. *set*: is a well-defined collection of objects; that is, it is defined in such a manner that we can determine for any given object $x$ whether or not $x$ belongs to the set.
2. *objects* or *members*: belong to a set, if $a$ is an element of the set $A$, then $a \in A$
3. some of the important sets
  ```math
  \begin{equation}\begin{split}
  &N = \{n: n \text{ is a natural number} \} = \{1,2,3,...\}\\
  &Z = \{n: n \text{ is an integer} \} = \{...-1,0,1,2,...\}\\
  &Q = \{r: r \text{ is a rational number} \} = \{p/q:p,q \in Z \text{ where } q \ne 0\}\\
  &R = \{x: x \text{ is an real number} \}\\
  &C = \{z: z \text{ is an complex number} \}\\
  \end{split}\end{equation}  
  ```
4. *subset*: a set $A$ is a subset of $B$, written $A \subset B$ or $B \supset A$
  $$ N \subset Z \subset Q \subset R \subset C $$
5. proper subset: a set $B$ is a proper subset of a set $A$ if $B \subset A$ but $B \ne A$.
6. *equal*: if $A \subset B$ and $B \subset A$, wrtten $A = B$.
7. *empty set* is denoted by $\emptyset$
8. *union* and *intersection*
  ```math
    A \cap B = \{x: x \in A \text{ or } x \in B\}\\
    A \cup B = \{x: x \in A \text{ and } x \in B\}
  ```
9. *disjoint*: $A \cap B = \emptyset$
1. For an fixed set $U$, called the *universal set*. For any set $A \subset U$, we define the *complement* of $A$, denoted $A'$
  $$A' = \{x:x \in U \text{ and } x \notin A\} $$
11. *difference*: $A \setminus B = A \cap B' = \{x:x \in A \text{ and } x \notin B\}$


**Proposition 1.2** Let $A$, $B$, and $C$ be sets. Then
1. $A \cup A = A, A \cap A = A, \text{ and } A \setminus A = \emptyset$
2. $A \cup \emptyset = A \text{ and } A \cap \emptyset = \emptyset$
1. $A \cup (B \cup C) = (A \cup B) \cup C \text{ and } A \cap (B \cap C) = (A \cap B) \cap C$
1. $A \cup B = B \cup A \text{ and } A \cap B = B \cap A$
1. $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$
1. $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$

**Theorem 1.3** Let $A$ and $B$ be sets. Then
1. $(A \cup B)' = A' \cap B'$
1. $(A \cap B)' = A' \cup B'$

**example 1.4** $(A \setminus B) \cap (B \setminus A) = \emptyset$
proof:
```math
\begin{equation}\begin{split}
(A \setminus B) \cap (B \setminus A) &= (A \cap B') \cap (B \cap A')\\
&= A \cap A' \cap B \cap B' \\
&= \emptyset
\end{split}\end{equation}
```

**Cartesian Products and Mappings**

Given sets $A$ and $B$, we can define a new set $A \times B$, called the **Cartesian product** of $A$ and $B$, as a set of ordered parirs.

$$ A \times B = \{(a,b): a \in A \text{a nd } b \in B\} $$

If $A=A_1=A_2=\cdots=A_n$ we often write $A^n$ for $A \times \cdots \times A$. For example, the set $R^3$ consists of all 3-tuples of real numbers.

Subsets of $A /times B$ are called **relations**. We will define a **mapping** pr **function** $f \subset A \times B$ from a set $A$ to a set $B$ to be the special type of relation where $(a,b) \in f$ if for every element $a \in A$ there exists a unique element $b \in B$. Written: $f: A \rightarrow B \text{ or } A \overset{f}\rightarrow B$. Instead of writing down ordered pairs $(a,b) \in A \times B$, we write $f(a) = b \text( or ) f : a \mapsto b$. The set $A$ is called the **domain** of $f$ and
  $$ f(A) = \{ f(a): a \in A \} \subset B $$
is called the **range** or **image** of $f$.

A realtion if **well-defined** if each element in the domain is assigned the a *unique* element in the range. For expample: $f: Q \rightarrow Z \text{ given by }f(q/p) = p$ is not **well-defined**, because $f(0.5) = f(1/2) = f(2/4) = 1 \text{ or } 2$.