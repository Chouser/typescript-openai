import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'myLibrary',
    sourcemap: true,
    globals: {
      stream: 'ignore_stream'
    }
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs()
  ],
  paths: {
    'typed-html': './node_modules/typed-html/dist/src/elements.js'
  },
  onwarn: (warning, warn) => {
    if (warning.code === 'MISSING_NODE_BUILTINS'
        && warning.ids.length === 1
        && warning.ids[0] === 'stream') {
      return;
    }
    warn(warning);
  }
};
