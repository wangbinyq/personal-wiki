import numpy as np
import matplotlib.pyplot as plt

a = np.ones((4,4))
a[2, 3] = 2
a[3, 1] = 6

b = np.diag(np.arange(2, 7), k=-1)[:, :-1]

c = np.tile([[4,3], [2,1]], (2, 3))

is_prime = np.ones((100,), bool)
is_prime[:2] = 0

N_max = int(np.sqrt(len(is_prime) - 1))
for j in range(2, N_max + 1):
    is_prime[2*j::j] = False

np.random.seed(3)
d = np.random.randint(0, 21, 15)
print(d)
print(d % 3 == 0)
d[d % 3 == 0] = -1

e = np.arange(6) + np.arange(0, 51, 10)[:, None]
e[np.arange(5), np.arange(1, 6)]
e[3:, [0, 2, 5]]