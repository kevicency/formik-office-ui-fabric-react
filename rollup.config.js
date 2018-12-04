import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const external = ['react']

export default [
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        tsconfig: 'tsconfig.package.json',
      }),
    ],
    external: external.concat(Object.keys(pkg.dependencies || [])),
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
]
