const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node14',
    outfile: 'dist/index.js',
    external: Object.keys(require('./package.json').dependencies || {}),
    minify: true,
    sourcemap: true,
    format: 'cjs',
    loader: {
        '.ts': 'ts'
    }
}).catch((err) => {
    process.exit(1)
});
