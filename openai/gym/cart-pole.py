import time
import gym
from sklearn.externals import joblib

env = gym.make('CartPole-v0')
model = joblib.load('model.pkl')

while True:
    observation = env.reset()
    score = 0
    while True:
        env.render()
        time.sleep(0.01)
        action = model.predict([observation])[0]
        observation, reward, done, info = env.step(action)
        score += reward
        if done:
            print(f'score: {score}')
            break
        