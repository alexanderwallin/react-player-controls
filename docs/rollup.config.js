import babel from 'rollup-plugin-babel'

module.exports = {
  entry: 'src/js/demos.js',
  dest: 'build/scripts.js',
  plugins: [babel()],
  format: 'iife',
}
