import numpy as np
import gym

env = gym.make('CartPole-v0')

games = 10000000
targe_step = 100

training_data = []

for i in range(games):
    prev_observation = env.reset()
    game_memory = []
    while True:
        action = env.action_space.sample()
        observation, reward, done, info = env.step(action)
        if done:
            if len(game_memory) >= targe_step:
                training_data.append(game_memory)
            break
        game_memory.append([prev_observation, action])
        prev_observation = observation
    if i % (games / 100) == 0:
        print(f'{i / games * 100}%')

print(f'generate data: {len(training_data)}')
np.save('data.npy', training_data)
