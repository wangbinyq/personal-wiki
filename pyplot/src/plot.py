import numpy as np
from matplotlib import pyplot as plt

t = np.arange(0, 2, 0.01)
s = 1 + np.sin(2 * np.pi * t)

fig, ax = plt.subplots()
ax.plot(t, s)

ax.set(xlabel='time (s)', ylabel='voltage (mV)',
  title='About as simple as it gets, folks')

ax.grid()
plt.show()