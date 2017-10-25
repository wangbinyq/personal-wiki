import numpy as np
from matplotlib import pyplot as plt

# elementwise operations
a = np.arange(5)

c = np.ones((3, 3))
np.array_equal(c, c * c)
c.dot(c)

# broadcast

try:
    np.arange(4) + np.array([1, 2])
except ValueError as e:
    print(e)


# reduction
c.sum()
## take axis=
c.sum(axis=1)
## min, max, argmin, argmax, all, any, mean, median, std

data = np.loadtxt('data/populations.txt')
year, hares, lynxes, carrots = data.T

plt.axes([0.2, 0.1, 0.5, 0.8])

plt.plot(year, hares, year, lynxes, year, carrots)
plt.legend(('Hare', 'Lynx', 'Carrot'), loc=(1.05, 0.5))

n_stories = 1000