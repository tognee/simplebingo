import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser'

export default {
  input: "src/js/main.js",
  output: {
    file: "public/js/bundle.js",
    format: "cjs",
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    terser()
  ]
};