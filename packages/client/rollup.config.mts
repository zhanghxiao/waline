import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import vue from '@vitejs/plugin-vue';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json' assert { type: 'json' };

const { version } = pkg;

const commonOptions = {
  plugins: [
    vue({
      isProduction: true,
      template: { compilerOptions: { comments: false } },
    }),
    esbuild({
      charset: 'utf8',
      target: ['chrome79', 'firefox79', 'edge79', 'safari13', 'node16'],
      minify: true,
    }),
    // typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env["NODE_ENV"]': JSON.stringify('production'),
      "process.env['NODE_ENV']": JSON.stringify('production'),
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      VERSION: JSON.stringify(version),
      preventAssignment: false,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    // terser(),
  ],
  treeshake: 'smallest',
};

const babelPlugin = getBabelOutputPlugin({
  moduleId: 'Waline',
  presets: [['@babel/preset-env', { modules: 'umd' }]],
});

export default [
  // full package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/waline.js',
        format: 'umd',
        name: 'Waline',
        sourcemap: true,
        // plugins: [babelPlugin, terser()],
      },
      {
        file: './dist/waline.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/waline.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // full declaration files
  {
    input: './src/entries/full.ts',
    output: [
      { file: './dist/waline.d.ts', format: 'esm' },
      { file: './dist/waline.d.cts', format: 'esm' },
      { file: './dist/waline.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // shim package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/shim.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/shim.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    external: [
      '@vueuse/core',
      '@waline/api',
      'autosize',
      'marked',
      'recaptcha-v3',
      'vue',
    ],
  },

  // shim declaration files
  {
    input: './src/entries/full.ts',
    output: [
      { file: './dist/shim.d.cts', format: 'esm' },
      { file: './dist/shim.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // components
  {
    input: './src/entries/components.ts',
    output: [
      {
        file: './dist/component.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['@vueuse/core', '@waline/api', 'autosize', 'marked', 'vue'],
    ...commonOptions,
  },

  // components declaration files
  // TODO: Generate declaration files

  // comment
  {
    input: './src/entries/comment.ts',
    output: [
      {
        file: './dist/comment.js',
        format: 'umd',
        name: 'Waline',
        sourcemap: true,
      },
      {
        file: './dist/comment.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/comment.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // comment declaration files
  {
    input: './src/entries/comment.ts',
    output: [
      { file: './dist/comment.d.ts', format: 'esm' },
      { file: './dist/comment.d.cts', format: 'esm' },
      { file: './dist/comment.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // pageview
  {
    input: './src/entries/pageview.ts',
    output: [
      {
        file: './dist/pageview.js',
        format: 'umd',
        name: 'Waline',
        sourcemap: true,
      },
      {
        file: './dist/pageview.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/pageview.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // pageview declaration files
  {
    input: './src/entries/pageview.ts',
    output: [
      { file: './dist/pageview.d.ts', format: 'esm' },
      { file: './dist/pageview.d.cts', format: 'esm' },
      { file: './dist/pageview.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];
