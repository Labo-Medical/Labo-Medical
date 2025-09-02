// declarations.d.ts
declare module 'rollup-plugin-terser' {
  import { Plugin } from 'rollup'
  export function terser(options?: Record<string, unknown>): Plugin
}
