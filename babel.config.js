// TODO: para cada path criado, adicionar no alias
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
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}