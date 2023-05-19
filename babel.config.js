module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@user': './src/user',
        '@core': './src/core',
        '@transaction': './src/transaction',
        '@main': './src/main',
        '@history': './src/history',
        '@tag': './src/tag',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}