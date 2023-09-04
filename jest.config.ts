import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testMatch: ["**/src/**/*.ts"],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
  }
};

export default config;
