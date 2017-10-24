import numpy as np
import matplotlib.pyplot as plt

x = np.arange(-2 * np.pi, 2 * np.pi, 0.001)
y = np.cos(x)

plt.subplot(211)
plt.plot(x, y)

plt.subplot(2, 1, 2)
image = np.random.rand(30, 30)
plt.imshow(image, cmap='gray')
plt.colorbar()

plt.show()