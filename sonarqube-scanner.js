const scanner = require('sonarqube-scanner');
// Currently, following this issue, the way to make it work is by wsl -d docker-desktop and sysctl -w vm.max_map_count=262144 there.
scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'squ_3563f755ac6bdf07500909b9aab2b0b8a6d6ffb2',
    login: 'admin',
    password: 'ejie1234',
    options: {
      'sonar.sources': './src',
      //'sonar.exclusions': '**/*.test.tsx',
      //'sonar.tests': './src',
      //'sonar.test.inclusions': '**/*.test.tsx,**/*.test.ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.eslint.reportPaths': 'eslint-report.json',
    },
  },
  () => process.exit(),
);