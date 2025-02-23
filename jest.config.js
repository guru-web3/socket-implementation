const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map the @ alias to the src directory
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(wagmi|viem)/)", // Allow Jest to transform ESM dependencies
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ESM
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(ts|tsx)$': 'babel-jest',
//     '^.+\\.(js|jsx)$': 'babel-jest', // Add this line to transform JS files
//   },
//   transformIgnorePatterns: [
//     '/node_modules/(?!(wagmi|viem)/)', // Add this line to transform specific node_modules
//   ],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   setupFiles: ['./jest.setup.js'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1', // Add this line to map the @ alias
//   },
// };