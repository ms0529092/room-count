module.exports = {
    content: [
      './src/**/*.{js,jsx}',
      'node_modules/preline/dist/*.js'
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('preline/plugin')
    ],
}