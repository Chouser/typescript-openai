import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts',
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
  onwarn: (warning, warn) => {
    if (warning.code === 'MISSING_NODE_BUILTINS'
        && warning.ids.length === 1
        && warning.ids[0] === 'stream') {
      return;
    }
    warn(warning);
  }
};
