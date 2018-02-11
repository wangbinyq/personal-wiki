import numpy as np
from sklearn.svm import LinearSVC as ModelClass
from sklearn.externals import joblib


training_data = np.load('data.npy')[0]

X = np.array([x[0] for x in training_data])
y = np.array([x[1] for x in training_data])

regr = ModelClass()
regr.fit(X, y)

joblib.dump(regr, 'model.pkl')
