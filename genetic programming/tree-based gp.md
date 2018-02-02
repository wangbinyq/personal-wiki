## Representation

- programm are expressed as syntax tree.
- leaves: terminals, internal nodes: functions, = primitive set of a GP system
- sub-tree: branches = architecture of the program
- if all functions have a fixed number of arguments, then the tree can be represented as simple linear sequences.

## Initialising

### full and grow method
- both have a maximum depth.
- full: nodes are taken random from the function set, all leaves have same depth.
- grow: nodes are selected (expect leaves) from the whole primitive set.

### ramped half-and-half
Half of the initial population is constructed using full and half is constructed using grow. This is doing using a range of depth limits.

## Selection

### tournament selection

### fitness-proportionate select

## Recombination and Mutation

crossover: subtree crossover.
Two parents, randomly selects a crossover point (a node) in each tree. It creates the offspring by replacing the subtree rooted at the corssover point in a copy of the first parent with a copy of the subtree rooted at the crossover point in the second parent.
crossover point is not selected uniformly. it's about 90% functions and 10% leaves.

mutation: 
subtree mutation: randomly selects a mutation point in a tree and substitues with a randomly generated subtree.

point mutation: a random node is selected and the primitive stored there is replaced with a different random primitive of the same arity.