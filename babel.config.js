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

        '@config': './src/modules',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}