import numpy as np
import matplotlib.mlab as mlab
import matplotlib.pyplot as plt

np.random.seed(19680801)


mu = 100
sigma = 15
x = mu + sigma * np.random.randn(437)

num_bins = 50

fig, ax = plt.subplots()

n, bins, patches = ax.hist(x, num_bins, normed=1)

y = mlab.normpdf(bins, mu, sigma)
ax.plot(bins, y, '--')
ax.set(xlabel='Smarts', ylabel='Probability density',
  title=r'Histogram of IQ: $\mu=100$, $\sigma=15$')

fig.tight_layout()
plt.show()