import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/cli.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    minify: true,
    outDir: 'dist',
    splitting: false,
    sourcemap: true,
    clean: true,
})