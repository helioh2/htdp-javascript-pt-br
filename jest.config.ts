import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testMatch: ["**/src/**/*.ts"],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;
