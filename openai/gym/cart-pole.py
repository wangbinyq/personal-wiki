import time
import gym

env = gym.make('CartPole-v0')

while True:
    observation = env.reset()
    for t in range(100):
        env.render()
        time.sleep(0.01)
        print(observation)
        action = env.action_space.sample()
        observation, reward, done, info = env.step(action)
        if done:
            print(f'Episode finished after {t+1} timesteps')
            break