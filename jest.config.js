module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'plugins', 'static'],
  transform: {
    "^.+\\.js?$": 'babel-jest',
  }
}
