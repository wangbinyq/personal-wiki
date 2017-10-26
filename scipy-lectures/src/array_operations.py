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

# data = np.loadtxt('data/populations.txt')
# year, hares, lynxes, carrots = data.T

# plt.axes([0.2, 0.1, 0.5, 0.8])

# plt.plot(year, hares, year, lynxes, year, carrots)
# plt.legend(('Hare', 'Lynx', 'Carrot'), loc=(1.05, 0.5))

# n_stories = 1000
# t_max = 200
# t = np.arange(t_max)
# steps = 2 * np.random.randint(0, 1 + 1, (n_stories, t_max)) - 1
# positions = np.cumsum(steps, axis=1)
# sq_distance = positions ** 2
# mean_sq_distance = np.mean(sq_distance, axis=0)

# plt.figure(figsize=(4, 3)) 
# plt.plot(t, np.sqrt(mean_sq_distance), 'g.', t, np.sqrt(t), 'y-') 
# plt.xlabel(r"$t$") 
# plt.ylabel(r"$\sqrt{\langle (\delta x)^2 \rangle}$") 
# plt.tight_layout() # provide sufficient space for labels
# plt.show()


# broadcasting
# http://www.scipy-lectures.org/_images/numpy_broadcasting.png

# mileposts = np.array([0, 198, 303, 736, 871, 1175, 1475, 1544,
#     1913, 2448])
# distance_array = np.abs(mileposts - mileposts[:, np.newaxis])

# x = np.arange(0, 5)
# y = x[:, np.newaxis]

# distance = np.sqrt(x ** 2 + y ** 2)
# plt.pcolor(distance)
# plt.colorbar()
# plt.show()

# grid create
x, y = np.ogrid[0:5, 0:5]
x, y = np.mgrid[0:5, 0:5]

# shape

# face
from scipy import misc
face = misc.face(gray=True)

# face = face[100:-100, 100:-100]

# sy, sx = face.shape
# y, x = np.ogrid[0:sy, 0:sx]
# centerx, centery = 660, 300
# mask = (((y - centery) / 3) ** 2 + ((x - centerx) / 4) ** 2) > (230 / 5) ** 2
# face[mask] = 0

# plt.imshow(face, cmap='gray')
# plt.show()

def f(a, b, c):
    np.power(a, b) - c

# mandelbrot
def compute_mandelbrot(N_max, some_threshold, nx, ny):
    # A grid of c-values
    x = np.linspace(-2, 1, nx)
    y = np.linspace(-1.5, 1.5, ny)

    c = x[:,np.newaxis] + 1j*y[np.newaxis,:]

    # Mandelbrot iteration

    z = c
    for j in range(N_max):
        z = z**2 + c

    mandelbrot_set = (abs(z) < some_threshold)

    return mandelbrot_set

mandelbrot_set = compute_mandelbrot(50, 50., 601, 401)

plt.imshow(mandelbrot_set.T, extent=[-2, 1, -1.5, 1.5])
plt.gray()